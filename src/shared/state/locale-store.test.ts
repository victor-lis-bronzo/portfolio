import { beforeEach, describe, expect, it } from "vitest";
import {
	DEFAULT_LOCALE,
	LOCALE_STORAGE_KEY,
	useLocaleStore,
} from "./locale-store";

describe("useLocaleStore", () => {
	beforeEach(() => {
		window.localStorage.clear();
		useLocaleStore.setState({ locale: DEFAULT_LOCALE });
	});

	it("defaults to English", () => {
		expect(DEFAULT_LOCALE).toBe("en");
		expect(useLocaleStore.getState().locale).toBe("en");
	});

	it("sets an explicit locale", () => {
		useLocaleStore.getState().setLocale("pt");
		expect(useLocaleStore.getState().locale).toBe("pt");

		useLocaleStore.getState().setLocale("en");
		expect(useLocaleStore.getState().locale).toBe("en");
	});

	it("toggles between the two locales", () => {
		useLocaleStore.getState().toggleLocale();
		expect(useLocaleStore.getState().locale).toBe("pt");

		useLocaleStore.getState().toggleLocale();
		expect(useLocaleStore.getState().locale).toBe("en");
	});

	it("resets back to the default", () => {
		useLocaleStore.getState().setLocale("pt");
		useLocaleStore.getState().reset();
		expect(useLocaleStore.getState().locale).toBe(DEFAULT_LOCALE);
	});

	it("persists the choice under a stable storage key", () => {
		useLocaleStore.getState().setLocale("pt");

		const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
		expect(raw).not.toBeNull();
		expect(JSON.parse(raw as string).state.locale).toBe("pt");
	});

	it("rehydrates a persisted locale rather than trusting the first paint", () => {
		window.localStorage.setItem(
			LOCALE_STORAGE_KEY,
			JSON.stringify({ state: { locale: "pt" }, version: 0 }),
		);

		// `skipHydration: true` — the server always renders the default, so nothing
		// is read until the client explicitly rehydrates.
		expect(useLocaleStore.getState().locale).toBe("en");

		useLocaleStore.persist.rehydrate();

		expect(useLocaleStore.getState().locale).toBe("pt");
	});
});
