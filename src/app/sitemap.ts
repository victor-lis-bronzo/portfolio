import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	return [
		{
			url: SITE_URL,
			lastModified,
		},
		{
			url: `${SITE_URL}/recruiter`,
			lastModified,
		},
	];
}
