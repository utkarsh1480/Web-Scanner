import axios from 'axios';
import { generateCodeReview } from './geminiService.js';

const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json'];
const IGNORED_PATHS = ['node_modules', 'dist', 'build', '.git', 'package-lock.json', 'yarn.lock'];

/**
 * Checks if a file path should be analyzed
 */
/**
 * Checks if a file path should be analyzed and matches optional targetFolder filter
 */
const shouldAnalyzeFile = (path, targetFolder) => {
    // Check if it's in an ignored directory
    if (IGNORED_PATHS.some(ignored => path.includes(`${ignored}/`) || path === ignored)) {
        return false;
    }

    // Check target folder filter
    if (targetFolder && targetFolder.trim() !== '') {
        const cleanFolder = targetFolder.trim().replace(/^\/+|\/+$/g, '');
        if (!path.startsWith(`${cleanFolder}/`) && path !== cleanFolder) {
            return false;
        }
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
 * Analyzes the repository source code (or a specific folder)
 */
export const analyzeRepository = async (repoFullName, defaultBranch, token, targetFolder = null) => {
    const [owner, repo] = repoFullName.split('/');
    
    // 1. Get the full tree
    const tree = await getRepositoryTree(owner, repo, defaultBranch, token);

    // 2. Filter for files we care about (and optionally match target folder)
    const relevantFiles = tree.filter(item => item.type === 'blob' && shouldAnalyzeFile(item.path, targetFolder));

    if (relevantFiles.length === 0) {
        if (targetFolder) {
            throw new Error(`No supported files found to analyze in the folder "${targetFolder}".`);
        }
        throw new Error('No supported files found to analyze in this repository.');
    }

    // Limit to 20 relevant files per scan session
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
    const contextLabel = targetFolder ? `${repoFullName} (Folder: ${targetFolder})` : repoFullName;
    const analysisResults = await generateCodeReview(fileContents, contextLabel);

    return analysisResults;
};
