import type { Options } from "roughjs/bin/core";

export const DEFAULT_ROUGH_OPTIONS: Options = {
	roughness: 1.5,
	stroke: "#1e1e1e",
	strokeWidth: 2,
	fill: undefined,
};

export function getColorOptions(color?: string): Options {
	if (!color) {
		return { ...DEFAULT_ROUGH_OPTIONS };
	}

	return {
		...DEFAULT_ROUGH_OPTIONS,
		stroke: color,
		fill: color,
		fillStyle: "hachure",
	};
}
