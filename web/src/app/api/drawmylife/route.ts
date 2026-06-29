import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { GenerativeAIService } from "../services/generative-ai/generative-ai.service";
import { FirebaseService } from "../services/firebase/firebase.service";
import { firebaseConfig } from "../config/firebase-config";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { BoardNodeData } from "@/app/drawmylife/_types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const aIService = new GenerativeAIService(genAI);
const firebaseService = new FirebaseService(db);

type RequestParams = {
  userText: string;
  x: number;
  y: number;
  lastNodes: BoardNodeData[];
};

export async function POST(req: Request) {
  try {
    const { userText, x, y, lastNodes } = (await req.json()) as RequestParams;

    const { response } = await aIService.generateNode({
      prompt: userText,
      lastNodes,
    });

    if (process.env.NODE_ENV === "production") {
      await firebaseService.savePromptAndReponse({
        prompt: userText,
        response,
      });
    }

    return NextResponse.json({ text: response });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
