"use client";
import { RecruiterPlaceholder } from "@/features/recruiter/recruiter-placeholder";
import { ImmersivePlaceholder } from "@/features/scene-3d/immersive-placeholder";
import { useMode } from "@/shared/hooks/use-mode";

export default function Home() {
	const { mode } = useMode();
	return mode === "IMMERSIVE" ? (
		<ImmersivePlaceholder />
	) : (
		<RecruiterPlaceholder />
	);
}
