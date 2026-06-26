import {
  GenerateContentRequest,
  GoogleGenerativeAI,
  SchemaType,
} from "@google/generative-ai";
import { SYSTEM_PROMPT } from "./constants/system-prompt";
import { BoardNodeData } from "@/app/drawmylife/_types";

export class GenerativeAIService implements IGenerativeAIService {
  private genAI: GoogleGenerativeAI;

  constructor(genAI: GoogleGenerativeAI) {
    this.genAI = genAI;
  }

  async generateNode({
    prompt,
    lastNodes = [],
  }: {
    prompt: string;
    lastNodes: BoardNodeData[];
  }) {
    const payload: GenerateContentRequest = {
      systemInstruction: SYSTEM_PROMPT,
      contents: [
        ...lastNodes.map((node) => ({
          role: node.type === "bot" ? "model" : "user",
          parts: [
            {
              text:
                node.type === "user"
                  ? `Pergunta: "${node.text}"`
                  : `Resposta: ${JSON.stringify({
                      texto: node.text,
                      svg: node.svg,
                      color: node.color,
                      layout: node.layout,
                    })}`,
            },
          ],
        })),
        {
          role: "user",
          parts: [{ text: `Pergunta no quadro: "${prompt}"` }],
        },
      ].filter(Boolean),
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
