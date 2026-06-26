import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { GenerativeAIService } from "../services/generative-ai.service";
import { FirebaseService } from "../services/firebase.service";
import { firebaseConfig } from "../config/firebase-config";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const aIService = new GenerativeAIService(genAI);
const firebaseService = new FirebaseService(db);

export async function POST(req: Request) {
  try {
    const { userText, x, y } = await req.json();

    const { response } = await aIService.generateNode({ prompt: userText });

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
