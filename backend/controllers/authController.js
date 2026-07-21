import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../Models/User.model.js';
import TokenBlackList from '../Models/token.blackList.js';
import { generateAccessToken } from '../services/authService.js';

// POST /api/auth/register
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        const token = generateAccessToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar }
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to register user", error: error.message });
    }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = generateAccessToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar }
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to login", error: error.message });
    }
};

// POST /api/auth/logout
export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (token) {
            await TokenBlackList.create({ token });
        }
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to logout", error: error.message });
    }
};

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a random reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Save hashed token to DB with 15 min expiry
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        // In production you'd email this link. For now return it directly for testing.
        const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
        const resetUrl = `${baseUrl}/api/auth/reset-password/${resetToken}`;

        res.status(200).json({
            message: "Password reset token generated",
            resetUrl   // ← copy this URL and use it in Postman
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Hash the incoming token and compare with DB
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }  // not expired
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Update password and clear reset token
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/auth/currentUser
export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/auth/update-profile
export const updateProfile = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.username = username;
        await user.save();
        res.status(200).json({
            message: "Profile updated successfully",
            user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/auth/upload-avatar
export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image file" });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Convert the file buffer to a base64 Data URI
        const base64Image = req.file.buffer.toString('base64');
        const avatarUrl = `data:${req.file.mimetype};base64,${base64Image}`;
        user.avatar = avatarUrl;
        await user.save();

        res.status(200).json({
            message: "Avatar uploaded successfully",
            avatar: avatarUrl,
            user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




