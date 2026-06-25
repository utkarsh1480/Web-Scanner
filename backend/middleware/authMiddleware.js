import jwt from 'jsonwebtoken';

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
