import type { Metadata } from "next";
import { profile } from "@/core/data/profile";
import { skills } from "@/core/data/skills";
import { RecruiterView } from "@/features/recruiter/recruiter-view";
import { SITE_URL } from "@/shared/lib/site-config";

// Metadata is generated on the server, which cannot read the client-side locale
// store, so it is always built from the default locale (English). Documented
// tradeoff: the i18n toggle is client-only, with no route-based i18n.
const PAGE_TITLE = `${profile.name} — ${profile.role.en} | Résumé`;
const PAGE_DESCRIPTION =
	profile.summary.en.length > 160
		? `${profile.summary.en.slice(0, 157)}...`
		: profile.summary.en;
const PAGE_URL = `${SITE_URL}/recruiter`;

export function generateMetadata(): Metadata {
	return {
		title: PAGE_TITLE,
		description: PAGE_DESCRIPTION,
		keywords: skills.map((skill) => skill.name),
		openGraph: {
			title: PAGE_TITLE,
			description: PAGE_DESCRIPTION,
			type: "profile",
			url: "/recruiter",
		},
		twitter: {
			card: "summary_large_image",
			title: PAGE_TITLE,
			description: PAGE_DESCRIPTION,
		},
		alternates: {
			canonical: "/recruiter",
		},
	};
}

export default function RecruiterPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: profile.name,
		jobTitle: profile.role.en,
		url: PAGE_URL,
		sameAs: [profile.githubHref, profile.linkedinHref],
		knowsAbout: skills.map((skill) => skill.name),
		email: `mailto:${profile.email}`,
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from static internal data, safely serialized via JSON.stringify
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<RecruiterView />
		</>
	);
}
