"use client";

import { useEffect } from "react";
import { useModeStore } from "@/core/state/mode-store";

export function ModeHydrationBoundary({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		useModeStore.persist.rehydrate();
	}, []);
	return <>{children}</>;
}
