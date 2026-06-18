import { useState } from "react";
import { BoardNodeData } from "../_types";
import { SYSTEM_PROMPT, INITIAL_NODES } from "../_constants";

export function useGeminiChat() {
  const [nodes, setNodes] = useState<BoardNodeData[]>(INITIAL_NODES);
  const [loading, setLoading] = useState<boolean>(false);

  const askGemini = async ({
    userText,
    x,
    y,
  }: {
    userText: string;
    x: number;
    y: number;
  }) => {
    setLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ parts: [{ text: `Pergunta no quadro: "${userText}"` }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            texto: { type: "STRING" },
            svg: { type: "STRING" },
          },
          required: ["texto", "svg"],
        },
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Falha na API");

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (rawText) {
        const parsed = JSON.parse(rawText) as { texto: string; svg: string };
        setNodes((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            x: x + 40,
            y: y + 80, // Coloca a resposta perto da pergunta
            type: "bot",
            text: parsed.texto,
            svg: parsed.svg,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setNodes((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          x: x + 40,
          y: y + 80,
          type: "bot",
          text: "Puts, minha caneta falhou! A IA deve estar ocupada. Tenta de novo?",
          svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><path d="M30 30 L70 70 M70 30 L30 70" /><circle cx="50" cy="50" r="40" stroke-dasharray="10 10"/></svg>`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addUserNode = ({
    text,
    x,
    y,
  }: {
    text: string;
    x: number;
    y: number;
  }): BoardNodeData => {
    const newNode: BoardNodeData = {
      id: Date.now().toString(),
      x,
      y,
      type: "user",
      text,
    };
    setNodes((prev) => [...prev, newNode]);
    return newNode;
  };

  const resetChat = () => {
    setNodes(INITIAL_NODES);
  };

  return {
    nodes,
    loading,
    askGemini,
    addUserNode,
    resetChat,
  };
}
