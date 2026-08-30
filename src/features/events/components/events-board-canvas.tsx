"use client";

import { TECH_EVENTS } from "../data";
import { EventBadge } from "./event-badge";

export function EventsBoardCanvas() {
	return (
		<div
			className="w-full h-full bg-slate-900/95 rounded-xl p-8 border-[12px] border-[#451a03] shadow-[inset_0_4px_40px_rgba(0,0,0,0.8)] flex flex-wrap content-start gap-8 overflow-y-auto relative"
			// Corkboard texture simulation via CSS patterns (optional, but a dark slate is nice for contrast)
			style={{
				backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
				backgroundSize: "24px 24px",
			}}
		>
			<div className="w-full mb-4 border-b-2 border-slate-700/50 pb-6 flex items-baseline justify-between">
				<h2 className="text-4xl font-black text-slate-100 tracking-tight">
					Tech Events & Conferências
				</h2>
				<span className="text-slate-400 font-medium">
					{TECH_EVENTS.length} eventos documentados
				</span>
			</div>

			<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-10 w-full pb-8">
				{TECH_EVENTS.map((event) => (
					<EventBadge key={event.id} event={event} />
				))}
			</div>
		</div>
	);
}
