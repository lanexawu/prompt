
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { GEMINI_API_MODEL_TEXT, GEMINI_API_MODEL_VISION } from '../constants';

const apiKeyFromEnv = process.env.API_KEY;

if (!apiKeyFromEnv) {
  console.error(
    "ERROR: The API_KEY environment variable is not set. " +
    "This application requires an API key to communicate with the Gemini API. " +
    "Please ensure the API_KEY is configured in your environment."
  );
  // The application will likely fail at SDK initialization or API calls if the key is missing.
  // This is the expected behavior as per guidelines if the key is not pre-configured.
}

// Initialize directly using process.env.API_KEY.
// The `!` asserts apiKeyFromEnv is non-null, based on the assumption that it's pre-configured.
// If it's undefined at runtime, the SDK constructor or subsequent calls will error out.
const ai = new GoogleGenAI({ apiKey: apiKeyFromEnv! });

const parseGeminiResponse = (responseText: string): { indonesian: string; english: string } => {
  // responseText is guaranteed to be a string (could be empty) due to `?? ""` usage before calling this.
  const indoEnhancedMarker = "--- INDONESIAN ENHANCED ---";
  const engTranslationMarker = "--- ENGLISH TRANSLATION ---";
  const indoPromptMarker = "--- INDONESIAN PROMPT ---";
  const engPromptMarker = "--- ENGLISH PROMPT ---";

  let indonesian = "";
  let english = "";

  if (responseText.trim() === "") {
    indonesian = "Tidak ada konten yang diterima dari API atau respons kosong.";
    english = "No content received from API or response was empty.";
    return { indonesian, english };
  }

  // Check for Veo/Image prompt generation (enhanced) format
  if (responseText.includes(indoEnhancedMarker) && responseText.includes(engTranslationMarker)) {
    indonesian = responseText.split(indoEnhancedMarker)[1]?.split(engTranslationMarker)[0]?.trim() || "";
    english = responseText.split(engTranslationMarker)[1]?.trim() || "";
  }
  // Check for Image-to-Prompt format
  else if (responseText.includes(indoPromptMarker) && responseText.includes(engPromptMarker)) {
    indonesian = responseText.split(indoPromptMarker)[1]?.split(engPromptMarker)[0]?.trim() || "";
    english = responseText.split(engPromptMarker)[1]?.trim() || "";
  }
  // Fallback if specific markers are not found but responseText is not empty
  else {
    english = responseText; // Put the whole raw response in English field for debugging.
    indonesian = "Format respons tidak terduga atau tidak mengandung penanda yang diharapkan. Output mentah ada di kolom Bahasa Inggris.";
  }

  // Provide default messages if parsing failed to populate from a non-empty response
  if (responseText.trim() !== "") {
    if (indonesian.trim() === "") {
        indonesian = "Gagal mem-parsing prompt Bahasa Indonesia dari respons API. Output mentah ada di kolom Bahasa Inggris.";
    }
    if (english.trim() === "" && responseText.trim() !== "") { 
        // This condition implies the raw responseText wasn't even assigned to 'english' in the else block.
        // This should be rare if the logic above is correct.
        english = "Gagal mem-parsing prompt Bahasa Inggris. Respons mentah: " + responseText;
    }
  }
  
  return { indonesian, english };
};


export const generateEnhancedPrompt = async (
  basePrompt: string,
  promptType: 'veo' | 'image'
): Promise<{ indonesian: string; english: string }> => {
  try {
    const modelInstruction = `You are an expert prompt engineer. Take the following basic Indonesian prompt elements and expand them into a rich, detailed, and evocative full prompt sentence or paragraph in Indonesian. Then, translate this enhanced Indonesian prompt into fluent, high-quality English, suitable for an AI ${promptType} generator.
Basic Indonesian elements:
${basePrompt}

Respond with the enhanced Indonesian prompt and the English translation. Use the following format EXACTLY:
--- INDONESIAN ENHANCED ---
[Enhanced Indonesian Prompt Here]
--- ENGLISH TRANSLATION ---
[English Translation of Enhanced Indonesian Prompt Here]`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_API_MODEL_TEXT,
        contents: modelInstruction,
    });

    const rawText = response.text ?? ""; // Ensure rawText is a string, default to empty if undefined
    return parseGeminiResponse(rawText);

  } catch (error) {
    console.error(`Error generating ${promptType} prompt:`, error);
    if (error instanceof Error && (error.message.toLowerCase().includes("api key") || error.message.includes("permission denied"))) {
        throw new Error("Terjadi masalah dengan kunci API atau izin. Harap periksa konfigurasi Anda.");
    }
    throw new Error(`Gagal menghubungi layanan AI untuk prompt ${promptType}. Detail: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getPromptFromImage = async (
  base64Image: string,
  mimeType: string
): Promise<{ indonesian: string; english: string }> => {
  try {
    const imagePart: Part = {
      inlineData: {
        mimeType: mimeType,
        data: base64Image,
      },
    };

    const textPart: Part = {
        text: `Analyze this image. Generate a detailed and evocative prompt in Indonesian that could be used to recreate or inspire a similar image with an AI image generator. Also, provide an English translation of this Indonesian prompt.
Respond with the Indonesian prompt and the English translation. Use the following format EXACTLY:
--- INDONESIAN PROMPT ---
[Generated Indonesian Prompt Here]
--- ENGLISH PROMPT ---
[Generated English Prompt Here]`,
    };
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_API_MODEL_VISION,
        contents: { parts: [imagePart, textPart] },
    });
    
    const rawText = response.text ?? ""; // Ensure rawText is a string, default to empty if undefined
    return parseGeminiResponse(rawText);

  } catch (error) {
    console.error("Error generating prompt from image:", error);
    if (error instanceof Error && (error.message.toLowerCase().includes("api key") || error.message.includes("permission denied"))) {
        throw new Error("Terjadi masalah dengan kunci API atau izin. Harap periksa konfigurasi Anda.");
    }
    throw new Error(`Gagal menghubungi layanan AI untuk prompt dari gambar. Detail: ${error instanceof Error ? error.message : String(error)}`);
  }
};
