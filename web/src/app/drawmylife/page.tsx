"use client";

import React, { useState, useEffect } from "react";
import { Loader2, RotateCcw, X } from "lucide-react";
import { BoardNode } from "./_components/board-node";
import { Toolbar } from "./_components/toolbar";
import { ToolType } from "./_types";
import { useCanvas } from "./_hooks/use-canvas";
import { useGeminiChat } from "./_hooks/use-gemini-chat";
import { useDraft } from "./_hooks/use-draft";
import dynamic from "next/dynamic";

import { DRAFT_HEIGHT, DRAFT_WIDTH } from "./_constants";

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>("text");

  // Load state and operations from separated hooks
  const { nodes, loading, addUserNode, askGemini, resetChat, stopGeneration } =
    useGeminiChat();

  const {
    camera,
    boardRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    resetCamera,
    moveCameraTo,
  } = useCanvas(activeTool);

  const {
    draft,
    inputRef,
    startDraft,
    clearDraft,
    updateDraftText,
    submitDraft,
    handleKeyDown,
  } = useDraft({
    onSubmit: ({ text, x, y }) => {
      const newNode = addUserNode({ text, x, y });
      askGemini({ userText: newNode.text, x: newNode.x, y: newNode.y });
    },
  });

  // Injetar fonte caligráfica
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const resetBoard = () => {
    resetChat();
    resetCamera();
    clearDraft();
  };

  // Cursor Dinâmico baseado na ferramenta
  const getCursorStyle = () => {
    if (activeTool === "pan") return "cursor-grab active:cursor-grabbing";
    return "cursor-crosshair"; // O crosshair (mirinha) deixa muito com cara de lousa
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden bg-[#f8f9fa] text-gray-800 font-sans select-none ${getCursorStyle()}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(e) =>
        handlePointerUp({
          e,
          onCanvasClick: ({ virtualX, virtualY }) => {
            if (!loading) {
              startDraft({ x: virtualX, y: virtualY });
              moveCameraTo({ x: virtualX, y: virtualY });
            }
          },
        })
      }
      onPointerLeave={(e) => handlePointerUp({ e })} // Garante que zera se o mouse sair da tela
    >
      {/* Fundo Pontilhado que se move com a câmera */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          backgroundPosition: `${camera.x}px ${camera.y}px`,
        }}
      />

      {/* Toolbar */}
      <Toolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        onClearDraft={clearDraft}
      />

      {/* Botão de Reset */}
      <button
        onClick={resetBoard}
        className="absolute bottom-6 left-6 z-30 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-2xl shadow-sm border border-gray-200 transition-colors font-medium text-sm cursor-pointer"
        title="Voltar ao início"
      >
        <RotateCcw size={18} />
        Recomeçar
      </button>

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-lg border border-indigo-100 animate-pulse">
          <Loader2 size={24} className="text-indigo-500 animate-spin" />
          <span
            className="font-medium text-indigo-900"
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "1.2rem",
            }}
          >
            O mascote está escrevendo...
          </span>
          <button
            className="cursor-pointer text-gray-700 hover:text-gray-900"
            title="Cancelar"
            onClick={stopGeneration}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Camada do Quadro Virtual onde os itens habitam */}
      <div ref={boardRef} className="absolute inset-0 z-10 outline-none">
        <div
          className="absolute origin-top-left will-change-transform"
          style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}
        >
          {nodes.map((node) => (
            <BoardNode key={node.id} node={node} />
          ))}

          {/* Textarea onde o usuário digita (Rascunho) */}
          {draft && (
            <div
              className="absolute z-20 pointer-events-auto"
              style={{ left: draft.x, top: draft.y }}
            >
              <textarea
                ref={inputRef}
                value={draft.text}
                onChange={(e) => updateDraftText(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={submitDraft} // Salva se clicar fora
                className="bg-transparent outline-none overflow-hidden text-blue-800 placeholder-blue-300"
                style={{
                  fontFamily: "'Patrick Hand', cursive",
                  fontSize: "1.75rem",
                  minWidth: `${DRAFT_WIDTH}px`,
                  minHeight: `${DRAFT_HEIGHT}px`,
                  resize: "both", // Permite esticar manualmente se necessário
                  whiteSpace: "pre-wrap",
                }}
                placeholder="Escreva algo e aperte Enter..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
