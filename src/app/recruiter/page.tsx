import type { Metadata } from "next";
import { profile } from "@/core/data/profile";
import { skills } from "@/core/data/skills";
import { RecruiterView } from "@/features/recruiter/recruiter-view";
import { SITE_URL } from "@/shared/lib/site-config";

const PAGE_TITLE = `${profile.name} — ${profile.role} | Currículo`;
const PAGE_DESCRIPTION =
	profile.summary.length > 160
		? `${profile.summary.slice(0, 157)}...`
		: profile.summary;
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
		jobTitle: profile.role,
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
