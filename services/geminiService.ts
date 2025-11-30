import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { QuizQuestion } from '../types';

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!genAI) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing in environment variables.");
      throw new Error("API Key missing");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const initializeChat = () => {
  try {
    const ai = getAI();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.9, // Higher temperature for more creative/spooky responses
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
  }
};

export const sendMessageToDrCadaverson = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }
  if (!chatSession) {
    return "The spirits are silent... (Check API Key)";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "*Ghostly silence*";
  } catch (error) {
    console.error("Error sending message:", error);
    return "A disturbance in the ether prevents me from answering... (API Error)";
  }
};

export const generateQuizQuestion = async (difficulty: 'easy' | 'medium' | 'hard'): Promise<QuizQuestion | null> => {
  const ai = getAI();
  const prompt = `Generate a unique, ${difficulty} multiple-choice anatomy question. 
  The tone should be spooky and fit the persona of Dr. Cadaverson.
  Return JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            difficulty: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text) as QuizQuestion;
    }
    return null;
  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
};
