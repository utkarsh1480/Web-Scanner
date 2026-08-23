import { exchangeCodeForToken, getUserRepositories } from '../services/githubService.js';
import { analyzeRepository } from '../services/repositoryAnalyzer.js';
import jwt from 'jsonwebtoken';

// Initiates the OAuth flow
export const loginWithGitHub = (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_CALLBACK_URL;
    
    if (!clientId) {
        return res.status(500).json({ error: 'GitHub Client ID is not configured.' });
    }

    // We request 'repo' scope and prompt=consent to require explicit user confirmation on re-authenticating
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo&prompt=consent`;
    
    // Redirect the user to GitHub's OAuth page
    res.redirect(githubAuthUrl);
};

// Handles the OAuth callback from GitHub
export const githubCallback = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code missing' });
    }

    try {
        // Exchange code for GitHub access token
        const accessToken = await exchangeCodeForToken(code);

        // Instead of saving this in a DB, we encrypt it inside a JWT and send it as a cookie
        const jwtToken = jwt.sign(
            { accessToken }, 
            process.env.JWT_SECRET || 'fallback_secret_for_dev', 
            { expiresIn: '24h' } // Token expires in 24 hours
        );

        // In production on Vercel, cookies should be secure. For local dev, we omit 'secure'
        const isProduction = process.env.NODE_ENV === 'production';
        
        res.cookie('github_session', jwtToken, {
            path: '/',
            httpOnly: true, // Prevents XSS
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Redirect back to the frontend's GitHub dashboard
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/github/dashboard`);

    } catch (error) {
        console.error('GitHub OAuth Error:', error.message);
        res.status(500).json({ error: 'Failed to authenticate with GitHub' });
    }
};

// Fetches the user's repositories
export const fetchRepositories = async (req, res) => {
    try {
        const githubToken = req.githubToken; // Injected by authMiddleware
        const repos = await getUserRepositories(githubToken);
        res.json({ repositories: repos });
    } catch (error) {
        console.error('Fetch Repositories Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
};

// Check Auth Status (used by frontend on load)
export const checkAuth = (req, res) => {
    // If it reaches here, the middleware passed, so the user is authenticated
    res.json({ authenticated: true });
};

// Analyzes a specific repository
export const analyzeRepo = async (req, res) => {
    const { repo, defaultBranch, targetFolder } = req.body;
    
    if (!repo) {
        return res.status(400).json({ error: 'Repository name is required' });
    }

    try {
        const githubToken = req.githubToken;
        const branch = defaultBranch || 'main'; 

        const analysisResults = await analyzeRepository(repo, branch, githubToken, targetFolder);
        res.json(analysisResults);
    } catch (error) {
        console.error('Analyze Repo Error:', error.message);
        res.status(500).json({ error: error.message || 'Failed to analyze repository' });
    }
};

// Logs the user out by clearing the session cookie
export const logoutGitHub = (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    };
    res.clearCookie('github_session', { ...cookieOptions, path: '/' });
    res.clearCookie('github_session', cookieOptions);
    res.clearCookie('github_session');
    res.json({ message: 'Logged out successfully' });
};
