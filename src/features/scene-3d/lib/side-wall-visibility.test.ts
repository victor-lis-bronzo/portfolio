import { describe, expect, it } from "vitest";
import { resolveSideWall } from "./side-wall-visibility";

describe("resolveSideWall", () => {
	it("hides nothing on the left when looking toward -X", () => {
		expect(resolveSideWall(-1)).toBe("LEFT");
		expect(resolveSideWall(-0.0001)).toBe("LEFT");
	});

	it("keeps the right wall when looking toward +X", () => {
		expect(resolveSideWall(1)).toBe("RIGHT");
		expect(resolveSideWall(0.0001)).toBe("RIGHT");
	});

	it("is total at the edge-on singularity", () => {
		expect(resolveSideWall(0)).toBe("RIGHT");
		expect(resolveSideWall(-0)).toBe("RIGHT");
	});

	it("never returns a third state", () => {
		const samples = [-10, -1, -0.5, -0, 0, 0.5, 1, 10];

		for (const sample of samples) {
			expect(["LEFT", "RIGHT"]).toContain(resolveSideWall(sample));
		}
	});
});
