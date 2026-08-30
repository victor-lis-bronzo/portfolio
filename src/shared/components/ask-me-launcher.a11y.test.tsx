import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as matchers from "vitest-axe/matchers";
import { AskMeLauncher } from "./ask-me-launcher";

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

describe("AskMeLauncher accessibility", () => {
	it("has no axe violations", async () => {
		const { container } = render(<AskMeLauncher />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	}, 15000);
});
