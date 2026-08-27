"use client";

import { AnimatePresence, motion } from "framer-motion";

export interface DialogueBubbleProps {
	text: string;
}

/**
 * Pure presentation component: a comic/tooltip-style speech bubble. Fades in
 * whenever `text` changes, and announces the change to screen readers via
 * `role="status"` + `aria-live="polite"`.
 */
export function DialogueBubble({ text }: DialogueBubbleProps) {
	return (
		<div
			role="status"
			aria-live="polite"
			className="relative max-w-sm rounded-2xl border border-border/50 bg-background px-4 py-3 text-sm shadow-md after:absolute after:bottom-[-8px] after:left-6 after:size-4 after:rotate-45 after:border-r after:border-b after:border-border/50 after:bg-background after:content-['']"
		>
			<AnimatePresence mode="wait">
				<motion.p
					key={text}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="relative z-10"
				>
					{text}
				</motion.p>
			</AnimatePresence>
		</div>
	);
}
