import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_MODE, MODE_STORAGE_KEY, useModeStore } from "./mode-store";

describe("useModeStore", () => {
	beforeEach(() => {
		useModeStore.setState({ mode: DEFAULT_MODE });
		window.localStorage.clear();
	});

	it("setMode updates the mode to RECRUITER", () => {
		useModeStore.getState().setMode("RECRUITER");
		expect(useModeStore.getState().mode).toBe("RECRUITER");
	});

	it("setMode updates the mode back to IMMERSIVE", () => {
		useModeStore.getState().setMode("RECRUITER");
		useModeStore.getState().setMode("IMMERSIVE");
		expect(useModeStore.getState().mode).toBe("IMMERSIVE");
	});

	it("toggleMode alternates between IMMERSIVE and RECRUITER", () => {
		expect(useModeStore.getState().mode).toBe("IMMERSIVE");

		useModeStore.getState().toggleMode();
		expect(useModeStore.getState().mode).toBe("RECRUITER");

		useModeStore.getState().toggleMode();
		expect(useModeStore.getState().mode).toBe("IMMERSIVE");
	});

	it("reset returns the mode to DEFAULT_MODE", () => {
		useModeStore.getState().setMode("RECRUITER");
		useModeStore.getState().reset();
		expect(useModeStore.getState().mode).toBe(DEFAULT_MODE);
	});

	it("persists the new mode to localStorage synchronously after setMode", () => {
		useModeStore.getState().setMode("RECRUITER");

		const raw = window.localStorage.getItem(MODE_STORAGE_KEY);
		expect(raw).not.toBeNull();

		const parsed = JSON.parse(raw as string);
		expect(parsed.state.mode).toBe("RECRUITER");
	});

	it("persists toggled mode to localStorage", () => {
		useModeStore.getState().toggleMode();

		const raw = window.localStorage.getItem(MODE_STORAGE_KEY);
		const parsed = JSON.parse(raw as string);
		expect(parsed.state.mode).toBe("RECRUITER");
	});
});
