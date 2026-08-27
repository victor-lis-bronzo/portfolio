"use client";

const KEY_LIGHT_POSITION: [number, number, number] = [12, 16, 12];
const FILL_LIGHT_POSITION: [number, number, number] = [-10, 10, -10];
const RIM_LIGHT_POSITION: [number, number, number] = [-8, 14, 8];

/** Rich isometric three-light studio setup with balanced key, cool fill and warm rim light. */
export function IsometricLighting() {
	return (
		<>
			<ambientLight intensity={0.75} color="#e2e8f0" />
			<directionalLight
				position={KEY_LIGHT_POSITION}
				intensity={1.4}
				color="#ffffff"
			/>
			<directionalLight
				position={FILL_LIGHT_POSITION}
				intensity={0.5}
				color="#93c5fd"
			/>
			<directionalLight
				position={RIM_LIGHT_POSITION}
				intensity={0.35}
				color="#fef08a"
			/>
		</>
	);
}
