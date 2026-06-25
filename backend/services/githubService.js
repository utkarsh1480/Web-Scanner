import axios from 'axios';

/**
 * Exchange the OAuth code for a GitHub Access Token
 */
export const exchangeCodeForToken = async (code) => {
    const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.GITHUB_CALLBACK_URL
        },
        {
            headers: {
                Accept: 'application/json'
            }
        }
    );

    if (response.data.error) {
        throw new Error(response.data.error_description || 'Failed to exchange token');
    }

    return response.data.access_token;
};

/**
 * Fetch the authenticated user's repositories
 */
export const getUserRepositories = async (accessToken) => {
    // We fetch repositories the user owns or is a collaborator on.
    const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github.v3+json'
        },
        params: {
            sort: 'updated',
            per_page: 100
        }
    });

    return response.data.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        private: repo.private,
        html_url: repo.html_url,
        description: repo.description,
        updated_at: repo.updated_at,
        default_branch: repo.default_branch
    }));
};
