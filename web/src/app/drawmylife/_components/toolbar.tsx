"use client";

import React from "react";
import { Circle, Dot, Hand, PenTool, RotateCcw, X } from "lucide-react";
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
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-200 select-none animate-pulse">
        <div className="flex justify-center items-center gap-1">
          <Circle
            size={12}
            className="animate-[bounce_1s_0ms_infinite] fill-gray-200 bg-gray-200"
          />
          <Circle
            size={12}
            className="animate-[bounce_1s_100ms_infinite] fill-gray-200"
          />
          <Circle
            size={12}
            className="animate-[bounce_1s_200ms_infinite] fill-gray-200"
          />
        </div>
        <button
          className={`p-2.5 rounded-xl transition-all cursor-pointer`}
          onClick={stopGeneration}
          title="Cancelar"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-200 select-none">
      <button
        className={`p-2.5 rounded-xl transition-all cursor-pointer ${activeTool === "pan" ? "bg-indigo-100 text-indigo-700 shadow-inner" : "hover:bg-gray-100 text-gray-600"}`}
        onClick={() => {
          setActiveTool("pan");
          onClearDraft();
        }}
        title="Mover Quadro (Mãozinha)"
      >
        <Hand size={20} />
      </button>
      <button
        className={`p-2.5 rounded-xl transition-all cursor-pointer ${activeTool === "text" ? "bg-indigo-100 text-indigo-700 shadow-inner" : "hover:bg-gray-100 text-gray-600"}`}
        onClick={() => setActiveTool("text")}
        title="Escrever (Texto)"
      >
        <PenTool size={20} />
      </button>
      <button
        className={`p-2.5 rounded-xl transition-all cursor-pointer`}
        onClick={resetBoard}
        title="Limpar Quadro"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
}
