"use client";

import type { Profile } from "@/core/data/profile";
import { CopyEmailButton } from "@/features/recruiter/components/copy-email-button";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

interface QuickActionsProps {
	profile: Profile;
}

export function QuickActions({ profile }: QuickActionsProps) {
	const ui = useUiStrings();

	return (
		<section aria-labelledby="contato" className="mx-auto max-w-3xl px-6 py-10">
			<h2 id="contato" className="text-2xl font-semibold tracking-tight">
				{ui.sectionContact}
			</h2>
			<div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
				<a
					href={profile.cvHref}
					download
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					{ui.downloadCv}
				</a>
				<a
					href={`mailto:${profile.email}`}
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					{profile.email}
				</a>
				<a
					href={profile.githubHref}
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					GitHub
				</a>
				<a
					href={profile.linkedinHref}
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					LinkedIn
				</a>
				<CopyEmailButton email={profile.email} />
			</div>
		</section>
	);
}
