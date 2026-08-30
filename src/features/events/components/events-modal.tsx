"use client";

import { TECH_EVENTS } from "../data";
import { EventBadge } from "./event-badge";
import { useEventsStore } from "../state/events-store";
import { AnimatePresence, motion } from "framer-motion";

export function EventsModal() {
	const isOpen = useEventsStore((state) => state.isOpen);
	const close = useEventsStore((state) => state.close);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex flex-col bg-slate-900/95 backdrop-blur-md items-center justify-start pointer-events-auto overflow-y-auto"
					style={{
						backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
						backgroundSize: "24px 24px",
					}}
				>
					<div className="w-full max-w-5xl px-8 py-12">
						{/* Header */}
						<div className="w-full mb-8 border-b-2 border-slate-700/50 pb-6 flex items-end justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md pt-4 z-10">
							<div>
								<h2 className="text-4xl font-black text-slate-100 tracking-tight">
									Tech Events & Conferências
								</h2>
								<span className="text-slate-400 font-medium mt-2 block">
									{TECH_EVENTS.length} eventos documentados
								</span>
							</div>
							<button
								type="button"
								onClick={close}
								className="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg font-bold"
							>
								Fechar Painel
							</button>
						</div>

						{/* Grid */}
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 w-full pb-16">
							{TECH_EVENTS.map((event) => (
								<EventBadge key={event.id} event={event} />
							))}
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
