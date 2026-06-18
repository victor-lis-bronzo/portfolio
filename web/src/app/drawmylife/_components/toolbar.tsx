"use client";

import React from "react";
import { Hand, PenTool, Sparkles } from "lucide-react";
import { ToolType } from "../_types";

interface ToolbarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  onClearDraft: () => void;
}

export function Toolbar({
  activeTool,
  setActiveTool,
  onClearDraft,
}: ToolbarProps) {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-200 select-none">
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
      <div className="w-px h-6 bg-gray-200 mx-2" />
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 px-2 cursor-default">
        <Sparkles size={16} className="text-indigo-500" />
        <span>Victor Lis Bronzo • Portfólio IA</span>
      </div>
    </div>
  );
}
