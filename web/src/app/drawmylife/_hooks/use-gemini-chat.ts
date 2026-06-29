import { useState, useRef, useEffect, useCallback } from "react";
import { BoardNodeData } from "../_types";

export function useGeminiChat() {
  const [nodes, setNodes] = useState<BoardNodeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const addNode = useCallback(
    ({
      text,
      x,
      y,
      type = "user",
      svg,
      layout,
      color,
    }: Omit<BoardNodeData, "id">): BoardNodeData => {
      const newNode: BoardNodeData = {
        id: Date.now().toString(),
        x,
        y,
        type,
        text,
        svg,
        layout,
        color,
      };
      setNodes((prev) => [...prev, newNode]);
      return newNode;
    },
    [],
  );

  const askGemini = useCallback(
    async ({ userText, x, y }: { userText: string; x: number; y: number }) => {
      setLoading(true);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const INTERN_API = "/api/drawmylife";
        const response = await fetch(INTERN_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userText, x, y, lastNodes: nodes.slice(-20) }),
          signal: controller.signal,
        });

        const data = await response.json();
        const rawText = data.text;

        if (rawText && !controller.signal.aborted) {
          const parsed = JSON.parse(rawText) as {
            texto: string;
            svg: string;
            color: string;
            layout: "col" | "col-reverse" | "row" | "row-reverse";
          };
          addNode({
            x: x + 40,
            y: y + 80, // Coloca a resposta perto da pergunta
            type: "bot",
            text: parsed.texto,
            svg: parsed.svg,
            color: parsed.color,
            layout: parsed.layout,
          });
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          return;
        }
        console.error(error);
        if (!controller.signal.aborted) {
          setNodes((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              x: x + 40,
              y: y + 80,
              type: "bot",
              text: "Puts, minha caneta falhou! A IA deve estar ocupada. Tenta de novo?",
              svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><path d="M30 30 L70 70 M70 30 L30 70" /><circle cx="50" cy="50" r="40" stroke-dasharray="10 10"/></svg>`,
              layout: "col",
              color: "text-red-500",
            },
          ]);
        }
      } finally {
        if (abortControllerRef.current === controller) {
          setLoading(false);
        }
      }
    },
    [addNode],
  );

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
  }, []);

  const resetChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setNodes([]);
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    nodes,
    loading,
    askGemini,
    addNode,
    resetChat,
    stopGeneration,
  };
}
