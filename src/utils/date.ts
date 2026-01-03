import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
	date: Date | string | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (!date) return "Invalid Date";

	const parsedDate = typeof date === "string" ? new Date(date) : date;
	if (isNaN(parsedDate.getTime())) return "Invalid Date";

	return new Intl.DateTimeFormat(siteConfig.date.locale, {
		...(siteConfig.date.options as Intl.DateTimeFormatOptions),
		...options,
	}).format(parsedDate);
}

export function collectionDateSort(
	a: CollectionEntry<"post" | "note">,
	b: CollectionEntry<"post" | "note">,
) {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}
