"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { TechEvent } from "../data";

interface EventBadgeProps {
	event: TechEvent;
}

export function EventBadge({ event }: EventBadgeProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* The Badge (Lanyard style) */}
			<motion.div
				layoutId={`badge-${event.id}`}
				onClick={() => setIsOpen(true)}
				whileHover={{ scale: 1.05, y: -5, rotateZ: (Math.random() - 0.5) * 4 }}
				whileTap={{ scale: 0.95 }}
				className="relative flex flex-col items-center cursor-pointer select-none group"
			>
				{/* The "hole" for the lanyard */}
				<div className="w-8 h-2 bg-slate-800/80 border border-slate-700 rounded-full z-10 -mb-3 relative mx-auto shadow-inner" />

				<div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-lg p-1 shadow-md border-2 border-slate-300 w-full max-w-[140px] aspect-[2/3] flex flex-col overflow-hidden relative">
					{/* Badge Header Pattern */}
					<div className="h-10 bg-indigo-600 w-full flex items-center justify-center text-white text-xs font-bold tracking-widest shrink-0">
						{event.date}
					</div>

					{/* Badge Content */}
					<div className="flex-1 flex flex-col items-center justify-center p-2 text-center text-slate-800 space-y-2">
						<h3 className="font-bold text-sm leading-tight">{event.name}</h3>
						<span className="text-[10px] uppercase font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
							{event.role}
						</span>
					</div>

					{/* Barcode / Footer */}
					<div className="h-8 shrink-0 flex items-center justify-center opacity-30 gap-[1px]">
						{[...Array(12)].map((_, i) => (
							<div
								key={`barcode-${i}`}
								className="bg-slate-900 h-4"
								style={{ width: Math.random() > 0.5 ? "2px" : "1px" }}
							/>
						))}
					</div>
				</div>
			</motion.div>

			{/* The expanded Modal */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
						onClick={() => setIsOpen(false)}
					>
						<motion.div
							layoutId={`badge-${event.id}`}
							className="bg-slate-100 rounded-xl p-8 max-w-md w-full shadow-2xl flex flex-col gap-4 border-t-8 border-indigo-600"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex justify-between items-start">
								<div>
									<span className="text-indigo-600 font-bold tracking-wider text-sm">
										{event.date}
									</span>
									<h2 className="text-3xl font-black text-slate-900">
										{event.name}
									</h2>
								</div>
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="text-slate-400 hover:text-slate-700 transition-colors"
								>
									X
								</button>
							</div>

							<div className="bg-indigo-100 text-indigo-800 font-semibold px-3 py-1 rounded-full w-fit text-sm">
								{event.role}
							</div>

							<p className="text-slate-600 text-lg leading-relaxed mt-2">
								{event.description}
							</p>

							{event.link && (
								<a
									href={event.link}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg text-center hover:bg-indigo-700 transition-colors"
								>
									Ver mais detalhes
								</a>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
