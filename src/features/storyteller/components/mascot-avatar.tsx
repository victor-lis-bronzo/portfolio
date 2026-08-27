"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

export interface MascotAvatarProps {
	isSpeaking: boolean;
	animated: boolean;
}

/**
 * Pure presentation component: a simple 2D mascot placeholder rendered as an
 * emoji inside a blob-like circle. Does not access any store — all state is
 * received via props.
 */
export function MascotAvatar({ isSpeaking, animated }: MascotAvatarProps) {
	const className = cn(
		"flex size-16 items-center justify-center rounded-full border border-border/50 bg-primary/10 text-3xl shadow-md transition-shadow",
		isSpeaking && "ring-4 ring-primary/40 shadow-primary/30",
	);

	if (animated) {
		return (
			<motion.div
				className={className}
				animate={{ y: [0, -4, 0] }}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				role="img"
				aria-label="Mascote"
			>
				🤖
			</motion.div>
		);
	}

	return (
		<div className={className} role="img" aria-label="Mascote">
			🤖
		</div>
	);
}
