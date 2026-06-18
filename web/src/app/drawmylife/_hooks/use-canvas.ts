import React, { useState, useRef, useCallback } from "react";
import { CameraData, PointerStateData, ToolType } from "../_types";

export function useCanvas(activeTool: ToolType) {
  const [camera, setCamera] = useState<CameraData>(() => ({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 500,
  }));

  const pointerState = useRef<PointerStateData>({
    isPanning: false,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0,
  });

  const boardRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target !== boardRef.current) return;

    const shouldPan = activeTool === "pan" || e.button === 1;

    pointerState.current = {
      isPanning: shouldPan,
      isDragging: false,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
    };
  };

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const state = pointerState.current;

    if (state.isPanning) {
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;

      setCamera((prev) => ({ x: prev.x + dx, y: prev.y + dy }));

      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.isDragging = true;
    } else {
      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;
      if (Math.abs(dx) + Math.abs(dy) > 5) {
        state.isDragging = true;
      }
    }
  }, []);

  const handlePointerUp = ({
    e,
    onCanvasClick,
  }: {
    e: React.PointerEvent<HTMLDivElement>;
    onCanvasClick?: (params: { virtualX: number; virtualY: number }) => void;
  }) => {
    const state = pointerState.current;
    const wasDragging = state.isDragging;

    state.isPanning = false;

    if (!wasDragging && e.target === boardRef.current && activeTool === "text") {
      if (onCanvasClick) {
        const rect = boardRef.current.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;

        const virtualX = screenX - camera.x;
        const virtualY = screenY - camera.y;

        onCanvasClick({ virtualX, virtualY });
      }
    }
  };

  const resetCamera = () => {
    setCamera({
      x: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
      y: typeof window !== "undefined" ? window.innerHeight / 2 : 500,
    });
  };

  return {
    camera,
    setCamera,
    boardRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    resetCamera,
  };
}
