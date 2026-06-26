"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { BoardNode } from "./_components/board-node";
import { Toolbar } from "./_components/toolbar";
import { DRAFT_HEIGHT, DRAFT_WIDTH } from "./_constants";
import { useCanvas } from "./_hooks/use-canvas";
import { useDraft } from "./_hooks/use-draft";
import { useGeminiChat } from "./_hooks/use-gemini-chat";
import type { ToolType } from "./_types";

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>("text");

  const { nodes, loading, addNode, askGemini, resetChat, stopGeneration } =
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

  const onSubmit = useCallback(
    ({ text, x, y }: { text: string; x: number; y: number }) => {
      const newNode = addNode({ text, x, y, type: "user" });
      askGemini({ userText: newNode.text, x: newNode.x, y: newNode.y });
    },
    [addNode, askGemini],
  );

  const {
    draft,
    inputRef,
    startDraft,
    clearDraft,
    updateDraftText,
    submitDraft,
    handleKeyDown,
  } = useDraft({
    onSubmit,
  });

  const resetBoard = useCallback(() => {
    resetChat();
    resetCamera();
    clearDraft();
  }, [resetChat, resetCamera, clearDraft]);

  const getCursorStyle = () => {
    if (activeTool === "pan") return "cursor-grab active:cursor-grabbing";
    return "cursor-crosshair";
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const CONTENT_POSITION_X = window.innerWidth / 2;
    const CONTENT_POSITION_Y = window.innerHeight / 2;

    onSubmit({
      text: "Quem é você? Como você pode me ajudar?",
      x: CONTENT_POSITION_X,
      y: CONTENT_POSITION_Y,
    });

    moveCameraTo({ x: CONTENT_POSITION_X, y: CONTENT_POSITION_Y });

    return () => {
      document.head.removeChild(link);
      resetBoard();
    };
  }, [moveCameraTo, onSubmit, resetBoard]);

  return (
    <div
      className={`relative w-full h-screen overflow-hidden bg-[#f8f9fa] text-gray-800 font-sans select-none touch-none ${getCursorStyle()}`}
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
      onPointerLeave={(e) => handlePointerUp({ e })}
      onPointerCancel={(e) => handlePointerUp({ e })}
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
        resetBoard={resetBoard}
        loading={loading}
        stopGeneration={stopGeneration}
      />

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
              className="absolute z-20  pointer-events-none"
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
                  fontSize: "1.25rem",
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
