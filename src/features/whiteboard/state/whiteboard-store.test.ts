import { beforeEach, describe, expect, it } from "vitest";
import { D1_LEARNING_TRACK } from "@/core/data/story";
import type { DiagramElement } from "@/core/entities";
import type { IWhiteboardDriver } from "@/core/interfaces";
import { useWhiteboardStore } from "./whiteboard-store";

const NEXT_ELEMENTS: DiagramElement[] = [
	{
		id: "test-box",
		type: "box",
		x: 100,
		y: 100,
		width: 120,
		height: 60,
		label: "Test",
	},
];

describe("useWhiteboardStore", () => {
	beforeEach(() => {
		useWhiteboardStore.setState({ elements: D1_LEARNING_TRACK });
	});

	it("starts with the idle board diagram", () => {
		expect(useWhiteboardStore.getState().elements).toEqual(D1_LEARNING_TRACK);
	});

	it("render replaces the elements", () => {
		useWhiteboardStore.getState().render(NEXT_ELEMENTS);

		expect(useWhiteboardStore.getState().elements).toEqual(NEXT_ELEMENTS);
	});

	it("clear empties the elements", () => {
		useWhiteboardStore.getState().render(NEXT_ELEMENTS);
		useWhiteboardStore.getState().clear();

		expect(useWhiteboardStore.getState().elements).toEqual([]);
	});

	it("reset restores the idle board diagram", () => {
		useWhiteboardStore.getState().clear();
		useWhiteboardStore.getState().reset();

		expect(useWhiteboardStore.getState().elements).toEqual(D1_LEARNING_TRACK);
	});

	/**
	 * The store is not typed as `IWhiteboardDriver` on purpose — `reset()` is a
	 * store-local convenience that the port deliberately does not expose (ISP).
	 * This guards that the `render`/`clear` pair the port does require stays
	 * structurally compatible, which is what `useWhiteboardDriver` relies on.
	 */
	it("exposes a render/clear pair assignable to IWhiteboardDriver", () => {
		const { render, clear } = useWhiteboardStore.getState();
		const driver: IWhiteboardDriver = { render, clear };

		expect(typeof driver.render).toBe("function");
		expect(typeof driver.clear).toBe("function");
	});
});
