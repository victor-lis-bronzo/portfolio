"use client";

import React from "react";
import { Hand, PenTool, RotateCcw, X, Sparkles } from "lucide-react";
import { ToolType } from "../_types";

interface ToolbarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  onClearDraft: () => void;
  resetBoard: () => void;
  stopGeneration: () => void;
  loading?: boolean;
}

export function Toolbar({
  activeTool,
  setActiveTool,
  onClearDraft,
  resetBoard,
  stopGeneration,
  loading,
}: ToolbarProps) {
  if (loading) {
    return (
      <div className="absolute top-1/2 right-6 -translate-y-1/2 z-30 flex flex-col items-center gap-3 bg-white/95 backdrop-blur-md px-3 py-4 rounded-2xl shadow-lg border border-gray-200/50 select-none">
        <div className="p-2.5 rounded-xl bg-indigo-50 flex items-center justify-center gap-1.5 w-10 h-10 shadow-inner">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1s" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms", animationDuration: "1s" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms", animationDuration: "1s" }} />
        </div>
        <button
          className="p-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:bg-red-50 hover:text-red-600 text-gray-500 hover:scale-105"
          onClick={stopGeneration}
          title="Cancelar"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 right-6 -translate-y-1/2 z-30 flex flex-col items-center gap-3 bg-white/95 backdrop-blur-md px-3 py-4 rounded-2xl shadow-lg border border-gray-200/50 select-none">
      <button
        className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${activeTool === "pan" ? "bg-indigo-100 text-indigo-700 shadow-inner scale-95" : "hover:bg-gray-100 text-gray-600 hover:scale-105"}`}
        onClick={() => {
          setActiveTool("pan");
          onClearDraft();
        }}
        title="Mover Quadro (Mãozinha)"
      >
        <Hand size={20} />
      </button>
      <button
        className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${activeTool === "text" ? "bg-indigo-100 text-indigo-700 shadow-inner scale-95" : "hover:bg-gray-100 text-gray-600 hover:scale-105"}`}
        onClick={() => setActiveTool("text")}
        title="Escrever (Texto)"
      >
        <PenTool size={20} />
      </button>
      <button
        className="p-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:bg-red-50 hover:text-red-600 text-gray-500 hover:scale-105"
        onClick={resetBoard}
        title="Limpar Quadro"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
}
