"use client";

import type { Profile } from "@/core/data/profile";
import { useLocalized } from "@/shared/i18n/use-localized";

interface HeroSectionProps {
	profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
	const role = useLocalized(profile.role);
	const summary = useLocalized(profile.summary);
	const location = useLocalized(profile.location);

	return (
		<section aria-labelledby="sobre" className="mx-auto max-w-3xl px-6 py-10">
			<h1 id="sobre" className="text-3xl font-semibold tracking-tight">
				{profile.name}
			</h1>
			<p className="mt-1 text-lg text-muted-foreground">{role}</p>
			<p className="mt-4 leading-relaxed">{summary}</p>
			{location ? (
				<p className="mt-2 text-sm text-muted-foreground">{location}</p>
			) : null}
		</section>
	);
}
