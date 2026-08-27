import { beforeEach, describe, expect, it } from "vitest";
import { IDLE_BOARD_DIAGRAM } from "@/core/data/story-scripts";
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
		useWhiteboardStore.setState({
			elements: IDLE_BOARD_DIAGRAM,
			revision: 0,
		});
	});

	it("starts with IDLE_BOARD_DIAGRAM and revision 0", () => {
		const state = useWhiteboardStore.getState();
		expect(state.elements).toEqual(IDLE_BOARD_DIAGRAM);
		expect(state.revision).toBe(0);
	});

	it("render replaces the elements and increments revision by 1", () => {
		useWhiteboardStore.getState().render(NEXT_ELEMENTS);

		const state = useWhiteboardStore.getState();
		expect(state.elements).toEqual(NEXT_ELEMENTS);
		expect(state.revision).toBe(1);
	});

	it("render increments revision on every call", () => {
		useWhiteboardStore.getState().render(NEXT_ELEMENTS);
		useWhiteboardStore.getState().render(IDLE_BOARD_DIAGRAM);

		const state = useWhiteboardStore.getState();
		expect(state.elements).toEqual(IDLE_BOARD_DIAGRAM);
		expect(state.revision).toBe(2);
	});

	it("clear empties the elements and increments revision", () => {
		useWhiteboardStore.getState().clear();

		const state = useWhiteboardStore.getState();
		expect(state.elements).toEqual([]);
		expect(state.revision).toBe(1);
	});

	it("clear after render keeps incrementing revision", () => {
		useWhiteboardStore.getState().render(NEXT_ELEMENTS);
		useWhiteboardStore.getState().clear();

		const state = useWhiteboardStore.getState();
		expect(state.elements).toEqual([]);
		expect(state.revision).toBe(2);
	});

	it("conforms to the IWhiteboardDriver port", () => {
		const driver: IWhiteboardDriver = useWhiteboardStore.getState();

		expect(typeof driver.render).toBe("function");
		expect(typeof driver.clear).toBe("function");
	});
});
