import jwt from 'jsonwebtoken';
import User from '../Models/User.model.js';
import TokenBlackList from '../Models/token.blackList.js';

export const requireGitHubAuth = (req, res, next) => {
    // Check for token in cookies first, then auth header as fallback
    const token = req.cookies?.github_session || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. Please connect your GitHub account.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev');
        
        if (!decoded.accessToken) {
            return res.status(401).json({ error: 'Invalid session token' });
        }

        // Attach the real github access token to the request
        req.githubToken = decoded.accessToken;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err);
        return res.status(401).json({ error: 'Session expired or invalid.' });
    }
};

export const requireUserAuth = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No session token provided.' });
    }

    try {
        // Check blacklist
        const isBlacklisted = await TokenBlackList.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ error: 'Session expired. Please log in again.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev');
        if (!decoded.id) {
            return res.status(401).json({ error: 'Invalid token payload.' });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('User auth verification error:', err.message || err);
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });
        return res.status(401).json({ error: 'Session expired or invalid token.' });
    }
};

