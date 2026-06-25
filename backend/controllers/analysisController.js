import { getPageSpeedReport } from '../services/pageSpeedService.js';
import { extractIssues } from '../services/lighthouseExtractor.js';
import { generateAIRecommendations } from '../services/geminiService.js';

export async function analyzeWebsite(req, res) {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const lighthouseData = await getPageSpeedReport(url);
        
        // Extract scores
        const categories = lighthouseData?.lighthouseResult?.categories || {};
        const performanceScore = parseFloat((categories.performance?.score * 100 || 0).toFixed(1));
        const accessibilityScore = parseFloat((categories.accessibility?.score * 100 || 0).toFixed(1));
        const bestPracticesScore = parseFloat((categories['best-practices']?.score * 100 || 0).toFixed(1));
        const seoScore = parseFloat((categories.seo?.score * 100 || 0).toFixed(1));

        const scores = {
            aggregate: (performanceScore + accessibilityScore + bestPracticesScore + seoScore) / 4,
            details: [
                { label: 'Performance', score: performanceScore, maxScore: 100, color: 'red' },
                { label: 'Accessibility', score: accessibilityScore, maxScore: 100, color: 'orange' },
                { label: 'Best Practices', score: bestPracticesScore, maxScore: 100, color: 'blue' },
                { label: 'SEO', score: seoScore, maxScore: 100, color: 'green' },
            ]
        };

        const audits = lighthouseData?.lighthouseResult?.audits || {};
        
        // Extract additional metrics for the UI
        const metrics = {
            screenshot: audits["final-screenshot"]?.details?.data,
            pageSize: audits["total-byte-weight"]?.displayValue,
            pageRequests: audits["network-requests"]?.details?.items?.length,
            pageSpeed: audits["interactive"]?.displayValue
        };

        // Extract issues and get AI recommendations
        const issues = extractIssues(audits);
        const recommendations = await generateAIRecommendations(issues);

        res.json({
            url,
            scores,
            metrics,
            recommendations
        });
    } catch (error) {
        console.error('Error in analyzeWebsite:', error);
        res.status(500).json({ error: 'An error occurred during analysis' });
    }
}
