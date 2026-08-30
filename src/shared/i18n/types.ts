/**
 * The two languages the whole site is authored in. English is the default and
 * the one server-rendered metadata is built from (see `app/recruiter/page.tsx`).
 */
export type Locale = "en" | "pt";

export const LOCALES: readonly Locale[] = ["en", "pt"] as const;

/**
 * A content value that exists in both languages.
 *
 * Applied only to fields that carry meaning for the reader — titles, prose,
 * labels. Never to `id`s, `href`s, or technical enums, which stay language
 * agnostic so links and lookups keep working across a locale switch.
 */
export type Localized<T = string> = { en: T; pt: T };
