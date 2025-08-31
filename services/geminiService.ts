
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function reviewCode(code: string, language: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    As an expert code reviewer specializing in ${language}, please provide a thorough analysis of the following code.
    Your review should be professional, constructive, and formatted in clear Markdown.

    Focus on these key areas:
    1.  **Bugs and Errors**: Identify any potential logical errors, runtime errors, or bugs.
    2.  **Best Practices & Readability**: Suggest improvements for code style, naming conventions, and overall readability.
    3.  **Performance**: Point out any performance bottlenecks or areas for optimization.
    4.  **Security**: Highlight any potential security vulnerabilities.

    Provide actionable suggestions and code examples where necessary to illustrate your points.

    ---
    Code to review (${language}):
    \`\`\`${language}
    ${code}
    \`\`\`
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
}
