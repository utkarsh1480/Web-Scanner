import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    updateProfile,
    uploadAvatar
} from '../controllers/authController.js';
import { requireUserAuth } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const authRouter = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed'));
    }
});



/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 */
authRouter.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 */
authRouter.post('/login', loginUser);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 */
authRouter.post('/logout', logoutUser);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Generate password reset token
 */
authRouter.post('/forgot-password', forgotPassword);

/**
 * @route   POST /api/auth/reset-password/:token
 * @desc    Reset password using token from URL
 */
authRouter.post('/reset-password/:token', resetPassword);

/**
 * @route   GET /api/auth/currentUser
 * @desc    Get current logged in user details
  */
authRouter.get('/currentUser', requireUserAuth, getCurrentUser);

/**
 * @route   PUT /api/auth/update-profile
 * @desc    Update user profile username
 */
authRouter.put('/update-profile', requireUserAuth, updateProfile);

/**
 * @route   POST /api/auth/upload-avatar
 * @desc    Upload profile avatar picture
 */
authRouter.post('/upload-avatar', requireUserAuth, upload.single('avatar'), uploadAvatar);

export default authRouter;
