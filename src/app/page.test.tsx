import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_MODE, useModeStore } from "@/core/state/mode-store";
import Home from "./page";

describe("Home", () => {
	beforeEach(() => {
		useModeStore.setState({ mode: DEFAULT_MODE });
	});

	it("renders the immersive placeholder when mode is IMMERSIVE", () => {
		render(<Home />);
		expect(screen.getByTestId("immersive-placeholder")).toBeInTheDocument();
		expect(
			screen.queryByTestId("recruiter-placeholder"),
		).not.toBeInTheDocument();
	});

	it("renders the recruiter placeholder when mode is RECRUITER", () => {
		useModeStore.getState().setMode("RECRUITER");
		render(<Home />);
		expect(screen.getByTestId("recruiter-placeholder")).toBeInTheDocument();
		expect(
			screen.queryByTestId("immersive-placeholder"),
		).not.toBeInTheDocument();
	});
});
