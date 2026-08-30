import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Guarded: route-handler tests opt into the `node` environment, where there is
// no `window` to patch.
if (typeof window !== "undefined" && !window.matchMedia) {
	window.matchMedia = (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	});
}

afterEach(() => {
	if (typeof window === "undefined") {
		return;
	}
	cleanup();
	window.localStorage.clear();
});
