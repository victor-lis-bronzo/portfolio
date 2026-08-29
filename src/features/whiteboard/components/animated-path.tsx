"use client";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

export interface AnimatedPathProps {
	d: string;
	stroke?: string;
	strokeWidth?: number;
	fill?: string;
	delayMs?: number;
}

export function AnimatedPath({
	d,
	stroke,
	strokeWidth,
	fill,
	delayMs,
}: AnimatedPathProps) {
	const prefersReducedMotion = usePrefersReducedMotion();

	if (prefersReducedMotion) {
		return (
			<motion.path
				d={d}
				stroke={stroke}
				strokeWidth={strokeWidth}
				fill={fill}
				initial={false}
				style={{ pathLength: 1 }}
			/>
		);
	}

	return (
		<motion.path
			d={d}
			stroke={stroke}
			strokeWidth={strokeWidth}
			fill={fill}
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{
				duration: 0.6,
				delay: (delayMs ?? 0) / 1000,
				ease: "easeInOut",
			}}
		/>
	);
}
