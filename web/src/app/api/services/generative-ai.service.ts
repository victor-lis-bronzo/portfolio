import {
  GenerateContentRequest,
  GoogleGenerativeAI,
  SchemaType,
} from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/app/drawmylife/_constants";

export class GenerativeAIService implements IGenerativeAIService {
  private genAI: GoogleGenerativeAI;

  constructor(genAI: GoogleGenerativeAI) {
    this.genAI = genAI;
  }

  async generateNode({ prompt }: { prompt: string }) {
    const payload: GenerateContentRequest = {
      systemInstruction: SYSTEM_PROMPT,
      contents: [
        {
          role: "user",
          parts: [{ text: `Pergunta no quadro: "${prompt}"` }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            texto: { type: SchemaType.STRING },
            svg: { type: SchemaType.STRING },
            color: { type: SchemaType.STRING },
            layout: { type: SchemaType.STRING },
          },
          required: ["texto", "svg", "color", "layout"],
        },
      },
    };

    const model = this.genAI.getGenerativeModel({
      model: process.env.GEMINI_AI_MODEL! || "gemma-4-26b-a4b-it",
    });
    const result = await model.generateContent(payload);
    const responseText = result.response.text();

    return { response: responseText };
  }
}
