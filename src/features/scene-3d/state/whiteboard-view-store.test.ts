import { beforeEach, describe, expect, it } from "vitest";
import { useWhiteboardViewStore } from "./whiteboard-view-store";

describe("useWhiteboardViewStore", () => {
	beforeEach(() => {
		useWhiteboardViewStore.setState({ view: "diagram" });
	});

	it("defaults to the diagram so the narrated story looks untouched", () => {
		expect(useWhiteboardViewStore.getState().view).toBe("diagram");
	});

	it("switches to the assistant with setView()", () => {
		useWhiteboardViewStore.getState().setView("assistant");
		expect(useWhiteboardViewStore.getState().view).toBe("assistant");
	});

	it("switches back to the diagram with setView()", () => {
		useWhiteboardViewStore.getState().setView("assistant");
		useWhiteboardViewStore.getState().setView("diagram");
		expect(useWhiteboardViewStore.getState().view).toBe("diagram");
	});
});
