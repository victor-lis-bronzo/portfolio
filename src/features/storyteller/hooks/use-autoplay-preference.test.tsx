import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";
import { useStorytellerStore } from "../state/storyteller-store";
import { useAutoplayPreference } from "./use-autoplay-preference";

vi.mock("@/shared/hooks/use-prefers-reduced-motion", () => ({
	usePrefersReducedMotion: vi.fn(),
}));

describe("useAutoplayPreference", () => {
	beforeEach(() => {
		useStorytellerStore.setState({ autoAdvance: true });
	});

	it("turns autoplay off when the user asked for reduced motion", () => {
		vi.mocked(usePrefersReducedMotion).mockReturnValue(true);

		renderHook(() => useAutoplayPreference());

		expect(useStorytellerStore.getState().autoAdvance).toBe(false);
	});

	it("keeps autoplay on when the user has no motion preference", () => {
		vi.mocked(usePrefersReducedMotion).mockReturnValue(false);

		renderHook(() => useAutoplayPreference());

		expect(useStorytellerStore.getState().autoAdvance).toBe(true);
	});

	it("follows the preference when it changes after mount", () => {
		vi.mocked(usePrefersReducedMotion).mockReturnValue(false);

		const { rerender } = renderHook(() => useAutoplayPreference());
		expect(useStorytellerStore.getState().autoAdvance).toBe(true);

		vi.mocked(usePrefersReducedMotion).mockReturnValue(true);
		rerender();

		expect(useStorytellerStore.getState().autoAdvance).toBe(false);
	});
});
