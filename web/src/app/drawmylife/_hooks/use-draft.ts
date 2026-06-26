import React, { useState, useRef, useEffect, useCallback } from "react";
import { DraftData } from "../_types";

interface UseDraftOptions {
  onSubmit: (params: { text: string; x: number; y: number }) => void;
}

export function useDraft({ onSubmit }: UseDraftOptions) {
  const [draft, setDraft] = useState<DraftData | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (draft && inputRef.current) {
      inputRef.current.focus();
    }
  }, [draft]);

  const submitDraft = useCallback(() => {
    if (!draft) return;
    const textTrimmed = draft.text.trim();
    setDraft(null);
    if (textTrimmed !== "") {
      onSubmit({ text: textTrimmed, x: draft.x, y: draft.y });
    }
  }, [draft, onSubmit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitDraft();
    }
    if (e.key === "Escape") {
      setDraft(null);
    }
  }, [submitDraft]);

  const startDraft = useCallback(({ x, y }: { x: number; y: number }) => {
    setDraft({ x, y, text: "" });
  }, []);

  const clearDraft = useCallback(() => {
    setDraft(null);
  }, []);

  const updateDraftText = useCallback((text: string) => {
    if (draft) {
      setDraft({ ...draft, text });
    }
  }, [draft]);

  return {
    draft,
    inputRef,
    startDraft,
    clearDraft,
    updateDraftText,
    submitDraft,
    handleKeyDown,
  };
}
