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

const authRouter = express.Router();


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
authRouter.post('/upload-avatar', requireUserAuth, uploadAvatar);

export default authRouter;
