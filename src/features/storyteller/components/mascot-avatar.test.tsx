import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MascotAvatar } from "./mascot-avatar";

describe("MascotAvatar", () => {
	it("renders the mascot image", () => {
		render(<MascotAvatar isSpeaking={false} animated={false} />);

		expect(screen.getByRole("img", { name: /mascote/i })).toBeInTheDocument();
	});

	it("applies a speaking highlight when isSpeaking is true", () => {
		render(<MascotAvatar isSpeaking={true} animated={false} />);

		expect(screen.getByRole("img", { name: /mascote/i })).toHaveClass("ring-4");
	});

	it("does not apply the speaking highlight when isSpeaking is false", () => {
		render(<MascotAvatar isSpeaking={false} animated={false} />);

		expect(screen.getByRole("img", { name: /mascote/i })).not.toHaveClass(
			"ring-4",
		);
	});

	it("renders without crashing when animated is true", () => {
		render(<MascotAvatar isSpeaking={false} animated={true} />);

		expect(screen.getByRole("img", { name: /mascote/i })).toBeInTheDocument();
	});
});
