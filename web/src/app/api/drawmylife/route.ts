import { SYSTEM_PROMPT } from "@/app/drawmylife/_constants";
import {
  GoogleGenerativeAI,
  SchemaType,
  GenerateContentRequest,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { userText, x, y } = await req.json();

    const payload: GenerateContentRequest = {
      systemInstruction: SYSTEM_PROMPT,
      contents: [
        {
          role: "user",
          parts: [{ text: `Pergunta no quadro: "${userText}"` }],
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

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_AI_MODEL! || "gemma-4-26b-a4b-it",
    });
    const result = await model.generateContent(payload);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
