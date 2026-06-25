import axios from 'axios';

const API_BASE = import.meta.env.PROD
    ? ''  // In production (Vercel), API routes are on the same domain
    : 'http://localhost:3000';  // In development, the Express server

export async function analyzeWebsite(url) {
    const response = await axios.post(`${API_BASE}/api/analyze`, { url });
    return response.data;
}
