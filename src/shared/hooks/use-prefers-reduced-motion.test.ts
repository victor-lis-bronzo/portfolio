import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

function createMatchMedia(matches: boolean) {
	const listeners = new Set<(event: MediaQueryListEvent) => void>();

	const mediaQueryList = {
		matches,
		media: "(prefers-reduced-motion: reduce)",
		addEventListener: (
			_type: "change",
			listener: (event: MediaQueryListEvent) => void,
		) => {
			listeners.add(listener);
		},
		removeEventListener: (
			_type: "change",
			listener: (event: MediaQueryListEvent) => void,
		) => {
			listeners.delete(listener);
		},
		dispatchChange: (nextMatches: boolean) => {
			mediaQueryList.matches = nextMatches;
			for (const listener of listeners) {
				listener({ matches: nextMatches } as MediaQueryListEvent);
			}
		},
	};

	return mediaQueryList;
}

describe("usePrefersReducedMotion", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("returns false when the user has no reduced motion preference", () => {
		const mediaQueryList = createMatchMedia(false);
		vi.stubGlobal("matchMedia", vi.fn().mockReturnValue(mediaQueryList));

		const { result } = renderHook(() => usePrefersReducedMotion());

		expect(result.current).toBe(false);
	});

	it("returns true when the user prefers reduced motion", () => {
		const mediaQueryList = createMatchMedia(true);
		vi.stubGlobal("matchMedia", vi.fn().mockReturnValue(mediaQueryList));

		const { result } = renderHook(() => usePrefersReducedMotion());

		expect(result.current).toBe(true);
	});

	it("updates reactively when the change event fires", () => {
		const mediaQueryList = createMatchMedia(false);
		vi.stubGlobal("matchMedia", vi.fn().mockReturnValue(mediaQueryList));

		const { result } = renderHook(() => usePrefersReducedMotion());
		expect(result.current).toBe(false);

		act(() => {
			mediaQueryList.dispatchChange(true);
		});

		expect(result.current).toBe(true);
	});
});
