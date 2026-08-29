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
			className={`flex max-w-lg flex-col gap-5 rounded-3xl border border-white/15 bg-slate-950/80 p-6 text-slate-100 shadow-2xl backdrop-blur-2xl md:p-8 ${className}`}
		>
			{/* Top tag */}
			<div className="flex items-center gap-2">
				<span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
				<span className="text-xs font-semibold tracking-wider uppercase text-cyan-300">
					Portfólio Interativo 3D
				</span>
			</div>

			{/* Heading and bio */}
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
					Victor Lis Bronzo
				</h2>
				<p className="text-sm font-medium text-slate-300">
					Desenvolvedor Full Stack, IoT & Iniciação Científica
				</p>
				<p className="mt-1 text-xs leading-relaxed text-slate-400 md:text-sm">
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
						className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-white/10"
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
					className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
				>
					<svg
						className="h-4 w-4 transition-transform group-hover:scale-110"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<title>Iniciar</title>
						<polygon points="5 3 19 12 5 21 5 3" />
					</svg>
					<span>▶ Iniciar Minha História</span>
				</button>

				<Link
					href="/recruiter"
					className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
