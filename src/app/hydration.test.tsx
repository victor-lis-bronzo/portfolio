import { act } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	DEFAULT_MODE,
	MODE_STORAGE_KEY,
	useModeStore,
} from "@/core/state/mode-store";
import { ModeHydrationBoundary } from "@/shared/components/mode-hydration-boundary";
import Home from "./page";

describe("Home hydration", () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		useModeStore.setState({ mode: DEFAULT_MODE });
		window.localStorage.setItem(
			MODE_STORAGE_KEY,
			JSON.stringify({ state: { mode: "RECRUITER" }, version: 0 }),
		);
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.removeChild(container);
	});

	it("hydrates on the client without hydration mismatch warnings", async () => {
		const app = (
			<ModeHydrationBoundary>
				<Home />
			</ModeHydrationBoundary>
		);

		const html = renderToStaticMarkup(app);
		container.innerHTML = html;

		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		await act(async () => {
			hydrateRoot(container, app);
		});

		const hydrationErrors = errorSpy.mock.calls.filter((call) =>
			call.some((arg) => typeof arg === "string" && /hydrat/i.test(arg)),
		);

		expect(hydrationErrors).toHaveLength(0);

		errorSpy.mockRestore();
	});

	it("rehydrates the persisted mode from localStorage after mounting on the client", async () => {
		const app = (
			<ModeHydrationBoundary>
				<Home />
			</ModeHydrationBoundary>
		);

		const html = renderToStaticMarkup(app);
		container.innerHTML = html;

		await act(async () => {
			hydrateRoot(container, app);
		});

		expect(useModeStore.getState().mode).toBe("RECRUITER");
	});
});
