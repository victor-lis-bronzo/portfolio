"use client";
import { usePathname, useRouter } from "next/navigation";
import type { Mode } from "@/core/state/mode-store";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useMode } from "@/shared/hooks/use-mode";

export function ModeSwitcher() {
	const { setMode } = useMode();
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
			<TabsList aria-label="Selecionar modo de visualização">
				<TabsTrigger value="IMMERSIVE">Imersivo</TabsTrigger>
				<TabsTrigger value="RECRUITER">Recrutador</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
