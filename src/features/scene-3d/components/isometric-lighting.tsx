"use client";

const KEY_LIGHT_POSITION: [number, number, number] = [10, 12, 8];
const FILL_LIGHT_POSITION: [number, number, number] = [-6, 8, -4];

/** Classic isometric two-light setup. No shadow maps in this phase. */
export function IsometricLighting() {
	return (
		<>
			<ambientLight intensity={0.6} />
			<directionalLight position={KEY_LIGHT_POSITION} intensity={1.1} />
			<directionalLight position={FILL_LIGHT_POSITION} intensity={0.4} />
		</>
	);
}
