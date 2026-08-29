import { describe, expect, it } from "vitest";
import { getAspectZoomFactor } from "./use-camera-controller";

const MIN_ASPECT_ZOOM_FACTOR = 0.2;
const REFERENCE_CANVAS_WIDTH = 1280;
const REFERENCE_CANVAS_HEIGHT = 720;

describe("getAspectZoomFactor", () => {
	it("keeps the authored framing on canvases at or above the reference size", () => {
		expect(
			getAspectZoomFactor(REFERENCE_CANVAS_WIDTH, REFERENCE_CANVAS_HEIGHT),
		).toBe(1);
		expect(getAspectZoomFactor(1920, 1080)).toBe(1);
		expect(getAspectZoomFactor(2560, 1440)).toBe(1);
	});

	it("zooms out further than the pure contain fit on a phone-sized canvas", () => {
		const containFit = 390 / REFERENCE_CANVAS_WIDTH;
		const factor = getAspectZoomFactor(390, 844);

		expect(factor).toBeLessThan(containFit);
		expect(factor).toBeGreaterThanOrEqual(MIN_ASPECT_ZOOM_FACTOR);
	});

	it("never drops below the floor even when the extra margin would push it under", () => {
		// 300/1280 ≈ 0.234 sits above the floor, but the extra margin alone would
		// take it below it.
		expect(getAspectZoomFactor(300, 844)).toBe(MIN_ASPECT_ZOOM_FACTOR);
		expect(getAspectZoomFactor(120, 200)).toBe(MIN_ASPECT_ZOOM_FACTOR);
	});

	it("returns 1 for degenerate canvas sizes", () => {
		expect(getAspectZoomFactor(0, 844)).toBe(1);
		expect(getAspectZoomFactor(390, 0)).toBe(1);
		expect(getAspectZoomFactor(0, 0)).toBe(1);
		expect(getAspectZoomFactor(-390, 844)).toBe(1);
		expect(getAspectZoomFactor(390, -844)).toBe(1);
		expect(getAspectZoomFactor(Number.NaN, Number.NaN)).toBe(1);
	});
});
