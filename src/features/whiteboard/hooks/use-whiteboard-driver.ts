import { useMemo } from "react";
import type { IWhiteboardDriver } from "@/core/interfaces/whiteboard-driver";
import { useWhiteboardStore } from "../state/whiteboard-store";

export function useWhiteboardDriver(): IWhiteboardDriver {
	const render = useWhiteboardStore((state) => state.render);
	const clear = useWhiteboardStore((state) => state.clear);

	return useMemo(
		() => ({
			render,
			clear,
		}),
		[render, clear],
	);
}
