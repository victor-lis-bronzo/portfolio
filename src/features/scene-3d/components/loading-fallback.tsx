"use client";

import { useUiStrings } from "@/shared/i18n/use-ui-strings";

export function LoadingFallback() {
	const ui = useUiStrings();

	return (
		<section
			data-testid="voxel-studio-loading"
			className="flex h-full w-full flex-col items-center justify-center gap-4"
		>
			<p className="text-muted-foreground">{ui.loadingStudio}</p>
		</section>
	);
}
