import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId) => {
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    return jwt.sign({ id: userId }, secret, { expiresIn: '15m' });
};

export const verifyAccessToken = (token) => {
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    return jwt.verify(token, secret);
};
