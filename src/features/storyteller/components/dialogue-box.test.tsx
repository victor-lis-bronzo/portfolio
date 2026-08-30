import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, useLocaleStore } from "@/shared/state/locale-store";
import { useDialogueStore } from "../state/dialogue-store";
import { DialogueBox } from "./dialogue-box";

describe("DialogueBox", () => {
	beforeEach(() => {
		useDialogueStore.getState().clear();
		useLocaleStore.setState({ locale: DEFAULT_LOCALE });
	});

	it("renders nothing when dialogue text is empty", () => {
		const { container } = render(<DialogueBox />);
		expect(container.firstChild).toBeNull();
	});

	it("renders dialogue text inside an accessible live region", () => {
		useDialogueStore.getState().say({
			en: "Hi, welcome to the studio.",
			pt: "Oi, bem-vindo ao estúdio.",
		});
		render(
			<DialogueBox chapterTitle="Chapter 1: Origins" stepInfo="Step 1 of 16" />,
		);

		const statusRegion = screen.getByRole("status");
		expect(statusRegion).toBeInTheDocument();
		expect(statusRegion).toHaveTextContent("Hi, welcome to the studio.");
		expect(statusRegion).toHaveAttribute("aria-live", "polite");
		expect(statusRegion).toHaveAttribute("aria-atomic", "true");

		expect(screen.getByText("Chapter 1: Origins")).toBeInTheDocument();
		expect(screen.getByText("Step 1 of 16")).toBeInTheDocument();
	});

	it("defaults to English and swaps the phrase in place when the locale changes", () => {
		useDialogueStore.getState().say({
			en: "Hi, welcome to the studio.",
			pt: "Oi, bem-vindo ao estúdio.",
		});
		useDialogueStore.getState().setCtas([
			{
				label: {
					en: "Open the recruiter view",
					pt: "Abrir a visão do recrutador",
				},
				href: "/recruiter",
			},
		]);

		render(<DialogueBox />);

		expect(screen.getByRole("status")).toHaveTextContent(
			"Hi, welcome to the studio.",
		);
		expect(
			screen.getByRole("link", { name: /Open the recruiter view/i }),
		).toBeInTheDocument();

		act(() => {
			useLocaleStore.getState().setLocale("pt");
		});

		expect(screen.getByRole("status")).toHaveTextContent(
			"Oi, bem-vindo ao estúdio.",
		);
		expect(
			screen.getByRole("link", { name: /Abrir a visão do recrutador/i }),
		).toBeInTheDocument();
	});

	it("renders CTA button when a single cta is provided", () => {
		useDialogueStore
			.getState()
			.say({ en: "Have a look.", pt: "Conheça mais." });
		useDialogueStore.getState().setCtas([
			{
				label: { en: "Recruiter view", pt: "Ver Recrutador" },
				href: "/recruiter",
			},
		]);

		render(<DialogueBox />);
		const ctaLink = screen.getByRole("link", { name: /Recruiter view/i });
		expect(ctaLink).toBeInTheDocument();
		expect(ctaLink).toHaveAttribute("href", "/recruiter");
	});

	it("renders one button per cta when several are provided", () => {
		useDialogueStore
			.getState()
			.say({ en: "Meet the project.", pt: "Conheça o projeto." });
		useDialogueStore.getState().setCtas([
			{
				label: {
					en: "Read: what FETEPS taught me",
					pt: "Publicação: o que a FETEPS me ensinou",
				},
				href: "https://www.linkedin.com/posts/feteps",
			},
			{
				label: {
					en: "Read: the first public demo",
					pt: "Publicação: a primeira demo pública do TCC",
				},
				href: "https://www.linkedin.com/posts/previa-tcc",
			},
			{
				label: {
					en: "Read: Eco-Play took the top capstone grade",
					pt: "Publicação: nota máxima no TCC com o Eco-Play",
				},
				href: "https://www.linkedin.com/posts/nota-maxima",
			},
		]);

		render(<DialogueBox />);
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(3);
		expect(links.map((link) => link.getAttribute("href"))).toEqual([
			"https://www.linkedin.com/posts/feteps",
			"https://www.linkedin.com/posts/previa-tcc",
			"https://www.linkedin.com/posts/nota-maxima",
		]);

		for (const link of links) {
			expect(link).toHaveAttribute("target", "_blank");
			expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
		}
	});

	it("renders no CTA buttons when the step has none", () => {
		useDialogueStore
			.getState()
			.say({ en: "No links here.", pt: "Sem links por aqui." });
		useDialogueStore.getState().setCtas(undefined);

		render(<DialogueBox />);
		expect(screen.queryAllByRole("link")).toHaveLength(0);
	});
});
