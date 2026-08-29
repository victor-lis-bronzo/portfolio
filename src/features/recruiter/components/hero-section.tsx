import type { Profile } from "@/core/data/profile";

interface HeroSectionProps {
	profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
	return (
		<section aria-labelledby="sobre" className="mx-auto max-w-3xl px-6 py-10">
			<h1 id="sobre" className="text-3xl font-semibold tracking-tight">
				{profile.name}
			</h1>
			<p className="mt-1 text-lg text-muted-foreground">{profile.role}</p>
			<p className="mt-4 leading-relaxed">{profile.summary}</p>
			{profile.location ? (
				<p className="mt-2 text-sm text-muted-foreground">{profile.location}</p>
			) : null}
		</section>
	);
}
