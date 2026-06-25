import express from 'express';
import { 
    loginWithGitHub, 
    githubCallback, 
    fetchRepositories,
    checkAuth,
    analyzeRepo,
    logoutGitHub
} from '../controllers/githubController.js';
import { requireGitHubAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get the GitHub OAuth login URL
router.get('/login', loginWithGitHub);

// Route to logout and clear session
router.post('/logout', logoutGitHub);

// Route for GitHub to redirect back to with the authorization code
router.get('/callback', githubCallback);

// Route to check if user is currently authenticated
router.get('/status', requireGitHubAuth, checkAuth);

// Route to fetch repositories (requires auth)
router.get('/repos', requireGitHubAuth, fetchRepositories);

// Route to trigger analysis on a specific repo
router.post('/analyze', requireGitHubAuth, analyzeRepo);

export default router;
