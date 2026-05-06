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

export function getFormattedDate2(date: Date | string | number): string {
  const d = new Date(date);
  const year = d.getFullYear();
  // 使用 padStart 强制保证始终为两位数
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
}
