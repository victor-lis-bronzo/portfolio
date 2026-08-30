import { profile } from "@/core/data/profile";
import { TECH_EVENTS } from "@/features/events/data";

export function PortfolioJsonLd() {
	// Build the main Person schema for Victor
	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: profile.name,
		jobTitle: profile.role.pt,
		description: profile.summary.pt,
		email: profile.email,
		url: profile.linkedinHref,
		sameAs: [profile.githubHref, profile.linkedinHref],
		birthDate: profile.birthDate,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Atibaia",
			addressRegion: "SP",
			addressCountry: "BR",
		},
		// Link all events attended by this person
		performerIn: TECH_EVENTS.map((event) => ({
			"@type": "Event",
			name: event.name,
			startDate: event.date,
			description: event.description.pt,
			url: event.link,
			eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
		})),
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
		/>
	);
}
