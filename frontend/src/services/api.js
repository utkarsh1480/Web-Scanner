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

export async function analyzeGitHubRepository(repoFullName, defaultBranch, targetFolder = null) {
    const response = await axios.post(`${API_BASE}/api/github/analyze`, { 
        repo: repoFullName,
        defaultBranch,
        targetFolder
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

// User Authentication API calls
export async function registerUser(username, email, password) {
    const response = await axios.post(`${API_BASE}/api/auth/register`, { username, email, password });
    return response.data;
}

export async function loginUser(email, password) {
    const response = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
    return response.data;
}

export async function logoutUser() {
    const response = await axios.post(`${API_BASE}/api/auth/logout`);
    return response.data;
}

export async function forgotPassword(email) {
    const response = await axios.post(`${API_BASE}/api/auth/forgot-password`, { email });
    return response.data;
}

export async function resetPassword(token, password) {
    const response = await axios.post(`${API_BASE}/api/auth/reset-password/${token}`, { password });
    return response.data;
}

export async function getCurrentUser() {
    const response = await axios.get(`${API_BASE}/api/auth/currentUser`);
    return response.data.user;
}

export async function updateProfile(username) {
    const response = await axios.put(`${API_BASE}/api/auth/update-profile`, { username });
    return response.data;
}

export async function uploadAvatar(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const base64 = reader.result; // data:image/jpeg;base64,...
                const response = await axios.post(`${API_BASE}/api/auth/upload-avatar`,
                    { avatar: base64 },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

