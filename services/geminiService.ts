import { GoogleGenAI } from "@google/genai";
import { Firm, QuizPreferences } from "../types";

// In a real app, this should be in an env variable
// Since this is a generated demo, we assume the environment provides it or the user knows.
// We'll proceed assuming process.env.API_KEY is available or gracefully fail.

export const generateMatchExplanation = async (firm: Firm, prefs: QuizPreferences): Promise<string> => {
  if (!process.env.API_KEY) {
    return `Based on your ${prefs.tradingStyle} style and budget of $${prefs.budget}, ${firm.name} is a strong match due to its ${firm.evaluationType} model and ${firm.profitSplit} profit split.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';

    const prompt = `
      You are an expert prop trading consultant for PropFirms Plaza.
      
      User Profile:
      - Experience: ${prefs.experienceLevel}
      - Style: ${prefs.tradingStyle}
      - Budget: $${prefs.budget}
      - Risk: ${prefs.riskAppetite}
      - Preferred Platform: ${prefs.preferredPlatform}

      Matched Firm:
      - Name: ${firm.name}
      - Type: ${firm.evaluationType}
      - Profit Split: ${firm.profitSplit}
      - Max Drawdown: ${firm.maxDrawdown}
      - Special Features: ${firm.features.join(', ')}

      Write a concise, persuasive 2-3 sentence explanation directly to the user about why this specific firm is their perfect match. Focus on how the firm's specific features solve the user's specific needs (e.g., if they are aggressive, mention high leverage or drawdown).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Based on your preferences, ${firm.name} stands out with its ${firm.profitSplit} split and ${firm.evaluationType} evaluation model.`;
  }
};
