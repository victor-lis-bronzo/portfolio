import { VoxelStudioLoader } from "@/features/scene-3d";
import { StorytellerOverlay } from "@/features/storyteller";

export default function Home() {
	return (
		<>
			<VoxelStudioLoader />
			<StorytellerOverlay />
		</>
	);
}
