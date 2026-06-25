import axios from 'axios';

export async function getPageSpeedReport(url) {
    try {
        const apiKey = process.env.PAGESPEED_API_KEY;
        const apiStr = apiKey ? `&key=${apiKey}` : '';
        const response = await axios.get(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&category=accessibility&category=seo&category=best-practices${apiStr}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching PageSpeed report:', error);
        throw new Error('Failed to fetch PageSpeed report');
    }
}
