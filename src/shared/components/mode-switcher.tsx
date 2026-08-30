"use client";
import { usePathname, useRouter } from "next/navigation";
import type { Mode } from "@/core/state/mode-store";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useMode } from "@/shared/hooks/use-mode";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

export function ModeSwitcher() {
	const { setMode } = useMode();
	const ui = useUiStrings();
	const pathname = usePathname();
	const router = useRouter();
	const activeMode: Mode =
		pathname === "/recruiter" ? "RECRUITER" : "IMMERSIVE";

	function handleValueChange(value: string) {
		const nextMode = value as Mode;
		setMode(nextMode);
		router.push(nextMode === "RECRUITER" ? "/recruiter" : "/");
	}

	return (
		<Tabs value={activeMode} onValueChange={handleValueChange}>
			<TabsList aria-label={ui.modeSwitcherLabel}>
				<TabsTrigger value="IMMERSIVE">{ui.modeImmersive}</TabsTrigger>
				<TabsTrigger value="RECRUITER">{ui.modeRecruiter}</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
