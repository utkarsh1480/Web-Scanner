import axios from 'axios';
import { generateCodeReview } from './geminiService.js';

const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json'];
const IGNORED_PATHS = ['node_modules', 'dist', 'build', '.git', 'package-lock.json', 'yarn.lock'];

/**
 * Checks if a file path should be analyzed
 */
const shouldAnalyzeFile = (path) => {
    // Check if it's in an ignored directory
    if (IGNORED_PATHS.some(ignored => path.includes(`${ignored}/`) || path === ignored)) {
        return false;
    }

    // Check extension
    const ext = path.substring(path.lastIndexOf('.'));
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return false;
    }

    // Skip minified files
    if (path.includes('.min.')) {
        return false;
    }

    return true;
};

/**
 * Fetches the entire repository tree recursively
 */
const getRepositoryTree = async (owner, repo, defaultBranch, token) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });
        return response.data.tree;
    } catch (error) {
        console.error('Error fetching repo tree:', error.message);
        throw new Error('Failed to fetch repository structure');
    }
};

/**
 * Fetches the content of a specific file blob
 */
const getFileContent = async (owner, repo, fileSha, token) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/blobs/${fileSha}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });
        
        // GitHub API returns blob content as base64
        return Buffer.from(response.data.content, 'base64').toString('utf-8');
    } catch (error) {
        console.error(`Error fetching blob ${fileSha}:`, error.message);
        return null;
    }
};

/**
 * Analyzes the repository source code
 */
export const analyzeRepository = async (repoFullName, defaultBranch, token) => {
    const [owner, repo] = repoFullName.split('/');
    
    // 1. Get the full tree
    const tree = await getRepositoryTree(owner, repo, defaultBranch, token);

    // 2. Filter for files we care about
    const relevantFiles = tree.filter(item => item.type === 'blob' && shouldAnalyzeFile(item.path));

    if (relevantFiles.length === 0) {
        throw new Error('No supported files found to analyze in this repository.');
    }

    // To prevent hitting rate limits or creating massive prompts, 
    // let's limit to the first 20 relevant files for now (Phase 2 MVP)
    const filesToAnalyze = relevantFiles.slice(0, 20);

    // 3. Fetch contents for each file
    const fileContents = [];
    for (const file of filesToAnalyze) {
        const content = await getFileContent(owner, repo, file.sha, token);
        if (content) {
            fileContents.push({ path: file.path, content });
        }
    }

    // 4. Send to AI for Code Review
    const analysisResults = await generateCodeReview(fileContents, repoFullName);

    return analysisResults;
};
