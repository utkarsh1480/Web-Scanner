import axios from 'axios';

// Ensure cookies are sent with requests
axios.defaults.withCredentials = true;

const API_BASE = import.meta.env.PROD
    ? ''  // In production (Vercel), API routes are on the same domain
    : 'http://localhost:3000';  // In development, the Express server

export async function analyzeWebsite(url) {
    const response = await axios.post(`${API_BASE}/api/analyze`, { url });
    return response.data;
}

export async function checkGitHubAuth() {
    try {
        const response = await axios.get(`${API_BASE}/api/github/status`);
        return response.data.authenticated;
    } catch (error) {
        return false;
    }
}

export async function getGitHubRepositories() {
    const response = await axios.get(`${API_BASE}/api/github/repos`);
    return response.data.repositories;
}

export async function analyzeGitHubRepository(repoFullName, defaultBranch) {
    const response = await axios.post(`${API_BASE}/api/github/analyze`, { 
        repo: repoFullName,
        defaultBranch
    });
    return response.data;
}

export function getGitHubLoginUrl() {
    return `${API_BASE}/api/github/login`;
}

export async function logoutGitHub() {
    const response = await axios.post(`${API_BASE}/api/github/logout`);
    return response.data;
}
