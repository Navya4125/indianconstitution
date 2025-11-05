// services/geminiService.ts
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { ProblemSolverResult, Law, Language } from '../types';

// Helper functions for base64 encoding/decoding for audio (from Gemini API guidance)
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  // Declare the 'bytes' variable before use
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Function to create a new GoogleGenAI instance right before API calls
// to ensure the latest API key is used, especially for Veo models.
const getGeminiClient = (): GoogleGenAI => {
  // Ensure process.env.API_KEY is available in the environment.
  // The API key MUST be obtained exclusively from process.env.API_KEY.
  if (!process.env.API_KEY) {
    // According to guidelines, API key must be available.
    // In a real deployed app, this condition should not be met.
    // For local development or if environment isn't properly configured,
    // this error will be more explicit.
    throw new Error("Gemini API Key (process.env.API_KEY) is not configured. This is a mandatory environment variable.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// --- Chatbot Functionality ---
let activeChatSession: Chat | null = null;

export const startNewChatSession = (): Chat => {
  const ai = getGeminiClient();
  activeChatSession = ai.chats.create({
    model: 'gemini-2.5-flash', // Optimized for real-time conversation
    config: {
      systemInstruction: `You are Samvidhan Setu, an AI legal assistant in India. Provide accurate, simplified explanations of Indian laws and legal concepts. Always advise users to consult a legal professional for specific advice. Keep answers concise and helpful. When asked in Hindi, respond in Hindi.`,
    },
  });
  return activeChatSession;
};

export const resetActiveChatSession = () => {
  activeChatSession = null;
};

export const sendMessageToChatbot = async (
  message: string,
  onNewChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> => {
  if (!activeChatSession) {
    activeChatSession = startNewChatSession(); // Start if not already started
  }

  try {
    const responseStream = await activeChatSession.sendMessageStream({ message: message });
    let fullResponse = '';
    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullResponse += chunk.text;
        onNewChunk(fullResponse); // Send accumulated text for streaming effect
      }
    }
    onComplete();
  } catch (error: any) {
    console.error("Error sending message to chatbot:", error);
    let errorMessage = "An error occurred with the chatbot.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = (error as any).message;
    }
    onError(errorMessage);
    // If the error is due to an invalid API key or session, reset the session
    if (errorMessage.includes("API Key") || errorMessage.includes("Requested entity was not found.") || errorMessage.includes("failed to fetch")) {
      activeChatSession = null;
      console.warn("Gemini API key might be invalid or session expired/network issue. Resetting chat session.");
    }
  }
};

// --- Problem Solver Functionality ---

// This function uses Gemini to extract legal concepts from a user's problem description.
// It explicitly requests a JSON array of strings for easy parsing.
export const analyzeProblemForKeywords = async (problemDescription: string): Promise<string[]> => {
  try {
    const ai = getGeminiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro', // Using Pro for more complex reasoning
      contents: [
        {
          parts: [
            { text: `Given the following real-life problem or incident in India, identify 3-7 key legal concepts, keywords, or areas of Indian law that are most relevant. For example, if the problem is "my landlord is trying to evict me illegally", relevant concepts might be "landlord-tenant dispute", "eviction law", "property rights". Return these concepts as a JSON array of strings. Do not include any other text or formatting, just the JSON array. \n\nProblem: ${problemDescription}` },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        temperature: 0.2, // Lower temperature for more focused keyword extraction
      },
    });

    const jsonText = response.text.trim();
    console.log("Gemini Raw Response for Keywords:", jsonText);
    const keywords = JSON.parse(jsonText);
    if (!Array.isArray(keywords) || keywords.some(k => typeof k !== 'string')) {
      throw new Error("Gemini returned an invalid JSON array of strings for keywords.");
    }
    return keywords;
  } catch (error: any) {
    console.error("Error analyzing problem for keywords:", error);
    let errorMessage = "Failed to analyze problem: Unknown error.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = `Failed to analyze problem: ${(error as any).message}`;
    }
    throw new Error(errorMessage);
  }
};

// New function to explain the problem in detail using Gemini, incorporating found laws.
export const explainProblemInDetail = async (problemDescription: string, relevantLaws: Law[], language: Language): Promise<string> => {
  try {
    const ai = getGeminiClient();
    const lawSummaries = relevantLaws.map(law => {
        const title = language === Language.ENGLISH ? law.title : law.hindiTitle;
        const article = language === Language.ENGLISH ? law.articleOrSection : law.hindiArticleOrSection;
        const explanation = language === Language.ENGLISH ? law.explanation : law.hindiExplanation;
        return `${title} (${article}): ${explanation}`;
    }).join('\n\n');

    const instruction = language === Language.ENGLISH
        ? `You are Samvidhan Setu, an AI legal assistant in India. Based on the user's problem and the provided Indian laws from our database, explain how these laws relate to the problem in simple, easy-to-understand language. Do not introduce new laws outside the provided list. Always advise users to consult a legal professional for specific advice. Be concise and helpful.`
        : `आप संविधान सेतु, भारत में एक AI कानूनी सहायक हैं। उपयोगकर्ता की समस्या और हमारे डेटाबेस से दिए गए भारतीय कानूनों के आधार पर, समझाएं कि ये कानून समस्या से कैसे संबंधित हैं, सरल, आसानी से समझने वाली भाषा में। दी गई सूची के बाहर नए कानूनों का परिचय न दें। हमेशा उपयोगकर्ताओं को विशिष्ट सलाह के लिए एक कानूनी पेशेवर से परामर्श करने की सलाह दें। संक्षिप्त और सहायक रहें।`;

    const userPrompt = language === Language.ENGLISH
        ? `Here is a real-life problem: "${problemDescription}".
           Here are some potentially relevant Indian laws from our database:
           ${lawSummaries || "No specific laws were found in our database related to the keywords extracted from the problem. Provide general guidance or state that specific laws could not be found based on the information."}
           Please explain the legal aspects related to the problem, focusing on how these provided laws might apply. If no laws were provided, explain general steps to take.`
        : `यहाँ एक वास्तविक जीवन की समस्या है: "${problemDescription}"।
           यहाँ हमारे डेटाबेस से कुछ संभावित संबंधित भारतीय कानून दिए गए हैं:
           ${lawSummaries || "समस्या से निकाले गए कीवर्ड से संबंधित हमारे डेटाबेस में कोई विशिष्ट कानून नहीं मिला। सामान्य मार्गदर्शन प्रदान करें या बताएं कि जानकारी के आधार पर विशिष्ट कानून नहीं मिल सके।"}
           कृपया समस्या से संबंधित कानूनी पहलुओं को समझाएं, इस बात पर ध्यान केंद्रित करते हुए कि ये दिए गए कानून कैसे लागू हो सकते हैं। यदि कोई कानून प्रदान नहीं किया गया था, तो सामान्य कदम बताएं।`;

    console.log("Gemini Explanation Prompt:", userPrompt);

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-pro', // Using Pro for detailed explanation
        contents: [{ parts: [{ text: userPrompt }] }],
        config: {
            systemInstruction: instruction,
            temperature: 0.5, // Balance creativity and factual accuracy
        },
    });
    console.log("Gemini Explanation Response:", response.text);
    return response.text;
  } catch (error: any) {
    console.error("Error explaining problem in detail:", error);
    let errorMessage = "Failed to get detailed explanation: Unknown error.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = `Failed to get detailed explanation: ${(error as any).message}`;
    }
    throw new Error(errorMessage);
  }
};

/*
export const explainLawsInContext = async (laws: ProblemSolverResult[], problemDescription: string): Promise<string> => {
  try {
    const ai = getGeminiClient();
    const lawDetails = laws.map(l => `${l.lawName} (${l.articleOrSection})`).join(', ');
    const prompt = `Explain the following Indian laws in simple, easy-to-understand language. Relate them to the user's problem if possible.
    \n\nLaws identified: ${lawDetails}
    \nUser's Problem: ${problemDescription}`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error: any) {
    console.error("Error explaining laws in context:", error);
    throw new Error(`Failed to explain laws: ${error.message || "Unknown error"}`);
  }
};
*/