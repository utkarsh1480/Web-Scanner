const importantAudits = [
    "render-blocking-resources",
    "uses-responsive-images",
    "unused-css-rules",
    "unused-javascript",
    "largest-contentful-paint",
    "cumulative-layout-shift",
    "total-blocking-time",
    "dom-size",
    "meta-description",
    "image-alt"
];

export function extractIssues(audits) {
    const issues = [];

    Object.keys(audits).forEach((key) => {
        if (importantAudits.includes(key)) {
            const audit = audits[key];
            if (audit.score !== 1 && audit.score !== null) {
                issues.push({
                    id: audit.id,
                    title: audit.title,
                    description: audit.description,
                    score: audit.score,
                    displayValue: audit.displayValue
                });
            }
        }
    });

    return issues;
}
