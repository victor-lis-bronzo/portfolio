"use client";
import type { Mode } from "@/core/state/mode-store";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useMode } from "@/shared/hooks/use-mode";

export function ModeSwitcher() {
	const { mode, setMode } = useMode();
	return (
		<Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
			<TabsList aria-label="Selecionar modo de visualização">
				<TabsTrigger value="IMMERSIVE">Imersivo</TabsTrigger>
				<TabsTrigger value="RECRUITER">Recrutador</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
