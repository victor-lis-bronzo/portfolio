"use client";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";
import { useStorytellerStore } from "../state/storyteller-store";

/**
 * The single point in the codebase that wires the user's motion preference to
 * the storyteller's autoplay (WCAG 2.2.2).
 *
 * The store cannot do this itself — it is a plain, DOM-free state module and
 * calls no React hooks — so a pure side-effect hook bridges the two. Called
 * once by the container component (StorytellerOverlay); it returns nothing on
 * purpose, since `autoAdvance` is read by the store, never by a component.
 */
export function useAutoplayPreference(): void {
	const prefersReducedMotion = usePrefersReducedMotion();
	const setAutoAdvance = useStorytellerStore((s) => s._setAutoAdvance);

	useEffect(() => {
		setAutoAdvance(!prefersReducedMotion);
	}, [prefersReducedMotion, setAutoAdvance]);
}
