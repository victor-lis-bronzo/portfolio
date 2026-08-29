"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

export interface MascotAvatarProps {
	isSpeaking?: boolean;
	className?: string;
}

export function MascotAvatar({
	isSpeaking = false,
	className = "",
}: MascotAvatarProps) {
	const prefersReducedMotion = usePrefersReducedMotion();

	return (
		<motion.div
			className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25 ring-2 ring-white/20 backdrop-blur-md ${className}`}
			animate={
				prefersReducedMotion || !isSpeaking
					? undefined
					: {
							scale: [1, 1.05, 1],
							rotate: [0, -2, 2, 0],
						}
			}
			transition={{
				duration: 2.2,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			}}
			aria-hidden="true"
		>
			<div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950/80">
				<svg
					className="h-7 w-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<title>Avatar do Mascote</title>
					<rect width="18" height="12" x="3" y="6" rx="3" />
					<circle cx="9" cy="12" r="1.5" fill="currentColor" />
					<circle cx="15" cy="12" r="1.5" fill="currentColor" />
					<path d="M12 2v4" />
					<path d="M7 18v2" />
					<path d="M17 18v2" />
				</svg>
			</div>
			{isSpeaking && !prefersReducedMotion && (
				<span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
					<span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-cyan-500 ring-2 ring-slate-950" />
				</span>
			)}
		</motion.div>
	);
}
