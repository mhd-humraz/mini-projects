
import { GoogleGenAI } from "@google/genai";
import { RoastIntensity } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getIntensityPrompt = (intensity: RoastIntensity): string => {
  switch (intensity) {
    case RoastIntensity.Mild:
      return 'Keep the roast light, gentle, and playfully teasing.';
    case RoastIntensity.Spicy:
      return 'Make the roast a bit more witty and sharp, but still friendly and fun.';
    case RoastIntensity.Extreme:
      return 'Go for a really funny, over-the-top, and exaggerated roast. Remember to keep it harmless and not mean-spirited.';
    default:
      return 'Keep the roast light and gentle.';
  }
};

export const generateRoast = async (userInput: string, intensity: RoastIntensity): Promise<string> => {
  try {
    const intensityInstruction = getIntensityPrompt(intensity);

    const prompt = `
      You are the "AI Roast Machine". Your task is to generate a short, funny, and sarcastic roast in Manglish (a mix of Malayalam and English).
      The tone must be playful and harmless. Do not use offensive language, rude words, or personal attacks.
      Your roast should be a single, witty paragraph.

      Roast Intensity Guidelines: ${intensityInstruction}

      Here's a great example: If the user says "I am a programmer", a good roast would be: "Programmer aano? Ninte code run aavunnathinekkal speedil ninte Amma chaya undakkumallo!"

      Now, roast the user based on their input.

      User input: "${userInput}"
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from the AI.");
    }
    
    // Clean up potential markdown or unwanted formatting
    return text.trim().replace(/^["']|["']$/g, '');

  } catch (error) {
    console.error("Error generating roast:", error);
    if (error instanceof Error) {
        return `Sorry, the roast machine is taking a tea break! Error: ${error.message}`;
    }
    return "Sorry, the roast machine is taking a tea break! An unknown error occurred.";
  }
};
