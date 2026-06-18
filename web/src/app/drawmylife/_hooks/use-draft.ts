import React, { useState, useRef, useEffect } from "react";
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

  const submitDraft = () => {
    if (!draft) return;
    const textTrimmed = draft.text.trim();
    setDraft(null);
    if (textTrimmed !== "") {
      onSubmit({ text: textTrimmed, x: draft.x, y: draft.y });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitDraft();
    }
    if (e.key === "Escape") {
      setDraft(null);
    }
  };

  const startDraft = ({ x, y }: { x: number; y: number }) => {
    setDraft({ x, y, text: "" });
  };

  const clearDraft = () => {
    setDraft(null);
  };

  const updateDraftText = (text: string) => {
    if (draft) {
      setDraft({ ...draft, text });
    }
  };

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
