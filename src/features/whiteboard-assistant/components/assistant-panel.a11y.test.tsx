import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as matchers from "vitest-axe/matchers";
import { useAssistantStore } from "../state/assistant-store";
import { AssistantPanel } from "./assistant-panel";

// vitest-axe ships its matcher types against the legacy global `Vi` namespace,
// which Vitest 4 no longer reads. Augment the `vitest` module directly instead
// (same pattern @testing-library/jest-dom uses) so `next build`'s tsc step
// typechecks this file.
declare module "vitest" {
	// biome-ignore lint/suspicious/noExplicitAny: must match Vitest's own `Assertion<T = any>` signature to augment it
	interface Assertion<T = any> extends matchers.AxeMatchers {}
	interface AsymmetricMatchersContaining extends matchers.AxeMatchers {}
}

expect.extend(matchers);

const stubClient = { ask: async () => "An answer." };

describe("AssistantPanel accessibility", () => {
	it("has no axe violations when idle", async () => {
		useAssistantStore.getState().reset();
		const { container } = render(<AssistantPanel client={stubClient} />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	}, 15000);

	it("has no axe violations while showing an answer", async () => {
		useAssistantStore.getState().reset();
		useAssistantStore.setState({
			question: "What did you build at StarSeg?",
			answer: "I unified the backend architecture and the IoT integration.",
		});
		const { container } = render(<AssistantPanel client={stubClient} />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	}, 15000);

	it("has no axe violations in the error state", async () => {
		useAssistantStore.getState().reset();
		useAssistantStore.setState({ status: "error", error: "boom" });
		const { container } = render(<AssistantPanel client={stubClient} />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	}, 15000);
});
