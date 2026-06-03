
import { GoogleGenAI, Type } from "@google/genai";
import { Mood } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A concise, one-sentence summary of the note.'
    },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'An array of relevant keywords or tags, up to 5.'
    },
    mood: {
      type: Type.STRING,
      description: 'The overall mood of the note. Must be one of: "positive", "neutral", or "thoughtful".'
    }
  },
  required: ['summary', 'tags', 'mood']
};

interface GeminiAnalysisResult {
  summary: string;
  tags: string[];
  mood: Mood;
}

export const analyzeNoteContent = async (title: string, content: string): Promise<GeminiAnalysisResult> => {
  if (!process.env.API_KEY) {
    // Mock response if API key is not available
    return {
      summary: content.split(' ').slice(0, 15).join(' ') + '...',
      tags: ['mock', 'data'],
      mood: 'neutral',
    };
  }
  
  try {
    const prompt = `Analyze the following note content and title. Based on the text, provide a concise one-sentence summary, a list of relevant tags (up to 5), and the overall mood.

    Title: "${title}"
    Content: "${content}"

    Return the analysis as a JSON object. The mood must be one of the following: "positive", "neutral", or "thoughtful".`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as GeminiAnalysisResult;

    // Validate mood
    const validMoods: Mood[] = ['positive', 'neutral', 'thoughtful'];
    if (!validMoods.includes(result.mood)) {
      result.mood = 'neutral'; // Default to neutral if invalid
    }

    return result;
  } catch (error) {
    console.error("Error analyzing note content with Gemini:", error);
    // Fallback to a mock response on error
    return {
      summary: `AI analysis failed. Preview: ${content.split(' ').slice(0, 10).join(' ')}...`,
      tags: ['error'],
      mood: 'neutral',
    };
  }
};
