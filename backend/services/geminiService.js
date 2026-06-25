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
