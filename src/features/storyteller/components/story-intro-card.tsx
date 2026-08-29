"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

export interface StoryIntroCardProps {
	onStartTour: () => void;
	className?: string;
}

export function StoryIntroCard({
	onStartTour,
	className = "",
}: StoryIntroCardProps) {
	const prefersReducedMotion = usePrefersReducedMotion();

	return (
		<motion.div
			initial={
				prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }
			}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className={`flex max-w-lg flex-col gap-5 rounded-3xl border border-border bg-card p-6 text-card-foreground md:p-8 ${className}`}
		>
			{/* Top tag */}
			<div className="flex items-center gap-2">
				<span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
				<span className="text-xs font-semibold tracking-wider uppercase text-foreground/70">
					Portfólio Interativo 3D
				</span>
			</div>

			{/* Heading and bio */}
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
					Victor Lis Bronzo
				</h2>
				<p className="text-sm font-medium text-foreground/80">
					Desenvolvedor Full Stack, IoT & Iniciação Científica
				</p>
				<p className="mt-1 text-xs leading-relaxed text-foreground/60 md:text-sm">
					Acompanhe uma narrativa guiada através do estúdio tridimensional,
					conhecendo minhas origens na lógica, projetos de hardware, carreira e
					pesquisa.
				</p>
			</div>

			{/* Trajectory highlights */}
			<div className="flex flex-wrap gap-1.5">
				{[
					"🎮 Redstone & Lógica",
					"🏫 Etec DS",
					"🌱 Eco-Play & IoT",
					"🏢 StarSeg",
					"🔬 IFSP / IC MQTT",
				].map((tag) => (
					<span
						key={tag}
						className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
					>
						{tag}
					</span>
				))}
			</div>

			{/* CTAs */}
			<div className="flex flex-col gap-3 pt-2 sm:flex-row">
				<button
					type="button"
					onClick={onStartTour}
					className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<svg
						className="h-4 w-4 transition-transform group-hover:scale-110"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<title>Iniciar</title>
						<polygon points="5 3 19 12 5 21 5 3" />
					</svg>
					<span>Iniciar Minha História</span>
				</button>

				<Link
					href="/recruiter"
					className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground transition-colors duration-200 hover:bg-secondary/80 hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<span>Visão do Recrutador</span>
					<svg
						className="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Seta</title>
						<path d="M5 12h14" />
						<path d="m12 5 7 7-7 7" />
					</svg>
				</Link>
			</div>
		</motion.div>
	);
}
