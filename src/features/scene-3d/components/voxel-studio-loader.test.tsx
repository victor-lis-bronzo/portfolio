import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VoxelStudioLoader } from "./voxel-studio-loader";

describe("VoxelStudioLoader", () => {
	it("renders the loading fallback while the 3D chunk loads", () => {
		render(<VoxelStudioLoader />);
		expect(screen.getByTestId("voxel-studio-loading")).toBeInTheDocument();
	});
});
