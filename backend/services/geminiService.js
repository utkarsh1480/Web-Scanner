import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export async function generateAIRecommendations(issues) {
    if (!issues || issues.length === 0) {
        return [];
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            title: { type: SchemaType.STRING },
                            priority: { type: SchemaType.STRING, description: "High, Medium, Low" },
                            suggestion: { type: SchemaType.STRING },
                            codeExample: { type: SchemaType.STRING },
                            impact: { type: SchemaType.STRING }
                        },
                        required: ["title", "priority", "suggestion", "impact"]
                    }
                }
            }
        });

        const prompt = `You are a senior web performance engineer.

Analyze these Lighthouse issues:

${JSON.stringify(issues, null, 2)}

For each issue:
1. Explain the problem.
2. Assign priority: High, Medium, Low.
3. Suggest improvements.
4. Give code examples.
5. Estimate performance impact.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const recommendations = JSON.parse(responseText);
        return recommendations;

    } catch (error) {
        console.error('Error generating AI recommendations:', error);
        throw new Error('Failed to generate AI recommendations');
    }
}

export async function generateCodeReview(fileContents, repoName) {
    if (!fileContents || fileContents.length === 0) {
        return { performance: [], seo: [], accessibility: [], bestPractices: [], security: [] };
    }

    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured. Please add a valid API key to your .env file.');
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", // use flash for large context (faster & lower quota)
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.OBJECT,
                    properties: {
                        performance: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    file: { type: SchemaType.STRING },
                                    issue: { type: SchemaType.STRING },
                                    solution: { type: SchemaType.STRING },
                                    priority: { type: SchemaType.STRING, description: "High, Medium, Low" },
                                    codeExample: { type: SchemaType.STRING }
                                },
                                required: ["file", "issue", "solution", "priority"]
                            }
                        },
                        seo: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    file: { type: SchemaType.STRING },
                                    issue: { type: SchemaType.STRING },
                                    solution: { type: SchemaType.STRING },
                                    priority: { type: SchemaType.STRING, description: "High, Medium, Low" },
                                    codeExample: { type: SchemaType.STRING }
                                },
                                required: ["file", "issue", "solution", "priority"]
                            }
                        },
                        accessibility: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    file: { type: SchemaType.STRING },
                                    issue: { type: SchemaType.STRING },
                                    solution: { type: SchemaType.STRING },
                                    priority: { type: SchemaType.STRING, description: "High, Medium, Low" },
                                    codeExample: { type: SchemaType.STRING }
                                },
                                required: ["file", "issue", "solution", "priority"]
                            }
                        },
                        security: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    file: { type: SchemaType.STRING },
                                    issue: { type: SchemaType.STRING },
                                    solution: { type: SchemaType.STRING },
                                    priority: { type: SchemaType.STRING, description: "High, Medium, Low" },
                                    codeExample: { type: SchemaType.STRING }
                                },
                                required: ["file", "issue", "solution", "priority"]
                            }
                        },
                        bestPractices: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    file: { type: SchemaType.STRING },
                                    issue: { type: SchemaType.STRING },
                                    solution: { type: SchemaType.STRING },
                                    priority: { type: SchemaType.STRING, description: "High, Medium, Low" },
                                    codeExample: { type: SchemaType.STRING }
                                },
                                required: ["file", "issue", "solution", "priority"]
                            }
                        }
                    }
                }
            }
        });

        const filesContext = fileContents.map(f => `File: ${f.path}\n\`\`\`\n${f.content}\n\`\`\``).join("\n\n");

        const prompt = `You are a senior full-stack engineer. Analyze this repository: ${repoName}
        
Here are the files:
${filesContext}

Analyze the codebase and provide file-level suggestions for:
1. Performance improvements
2. SEO improvements
3. Accessibility improvements
4. Security improvements
5. Best practices

For each issue, cite the specific file, explain the issue, provide a solution, assign a priority, and include code examples where applicable.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        return JSON.parse(responseText);

    } catch (error) {
        console.error('Error generating AI code review:', error.message || error);
        // Provide a more descriptive error message
        if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('401') || error.message?.includes('403')) {
            throw new Error('Invalid Gemini API Key. Please check your GEMINI_API_KEY in the .env file.');
        }
        throw new Error(error.message || 'Failed to generate AI code review');
    }
}
