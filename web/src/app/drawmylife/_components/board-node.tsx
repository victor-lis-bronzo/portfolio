"use client";

import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { BoardNodeData } from "../_types";

interface BoardNodeProps {
  node: BoardNodeData;
}

export function BoardNode({ node }: BoardNodeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(node.type === "bot");

  const fontSize = "1.25rem";

  useEffect(() => {
    if (node.type === "bot" && isTyping) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(node.text.slice(0, i + 1));
        i++;
        if (i >= node.text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 20); // Velocidade do efeito da digitação
      return () => clearInterval(interval);
    } else {
      setDisplayedText(node.text);
    }
  }, [node.text, node.type, isTyping]);

  return (
    <div
      className="absolute pointer-events-none flex max-w-2xl w-max"
      style={{ left: node.x, top: node.y }}
    >
      {node.type === "user" ? (
        <div
          className="text-blue-800 whitespace-pre-wrap leading-tight drop-shadow-sm select-text pointer-events-auto"
          style={{ fontFamily: "'Patrick Hand', cursive", fontSize }}
        >
          {node.text}
        </div>
      ) : (
        <div className="flex gap-4 items-start pointer-events-auto">
          <div className="flex-shrink-0 bg-indigo-50 border-2 border-indigo-200 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center shadow-sm relative">
            <Bot size={28} />
            {isTyping && (
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500"></span>
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="text-gray-900 whitespace-pre-wrap leading-snug drop-shadow-sm select-text"
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize,
              }}
            >
              {displayedText}
            </div>

            {node.svg && !isTyping && (
              <div
                className="w-32 h-32 text-indigo-600 animate-draw-svg"
                dangerouslySetInnerHTML={{ __html: node.svg }}
              />
            )}
          </div>
        </div>
      )}

      {/* CSS para o efeito do SVG se "desenhando" sozinho */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .animate-draw-svg svg path, .animate-draw-svg svg circle, .animate-draw-svg svg rect {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `,
        }}
      />
    </div>
  );
}
