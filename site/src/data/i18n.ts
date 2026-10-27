// Languages, localised strings and dates shared by the site and the CV.

export type Lang = "en" | "de";
export const langs: readonly Lang[] = ["en", "de"];

/** A string in both site languages. */
export type L = Record<Lang, string>;

/** Picks the string for `lang`; plain strings are the same in every language. */
export const t = (value: L | string, lang: Lang): string => (typeof value === "string" ? value : value[lang]);

/** A date with month precision ("2021-05") or, when only the year is known, year precision ("2026"). */
export type When = `${number}-${number}${number}` | `${number}`;
/** The end of something that is still going on. */
export type End = When | "now";

/** The month the site is built in. Everything that runs until "now" ends here. */
export const buildDate = new Date();
export const nowMonth = buildDate.getFullYear() * 12 + buildDate.getMonth();

/** Months since year 0, so ranges can be compared and laid out. A bare year counts from January. */
export function toMonth(when: End): number {
  if (when === "now") return nowMonth;
  const [year, month = "1"] = when.split("-");
  return Number(year) * 12 + Number(month) - 1;
}

const monthNames: Record<Lang, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  de: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."],
};
const nowWord: Record<Lang, { short: string; long: string }> = {
  en: { short: "now", long: "present" },
  de: { short: "heute", long: "heute" },
};

/** "Oct 2025" / "Okt. 2025", or just the year when that is all we know. */
export function formatMonth(when: End, lang: Lang): string {
  if (when === "now") return nowWord[lang].long;
  const [year, month] = when.split("-");
  return month ? `${monthNames[lang][Number(month) - 1]} ${year}` : year;
}

/** "Oct 2025 – present": for the roll's popovers, the case studies and the CV. */
export function formatRange(start: When, end: End, lang: Lang): string {
  return `${formatMonth(start, lang)} – ${formatMonth(end, lang)}`;
}

/** "2021–23", "2025–now", "2024": the narrow year column of the experience list. */
export function formatYears(start: When, end: End, lang: Lang): string {
  const from = start.slice(0, 4);
  if (end === "now") return `${from}–${nowWord[lang].short}`;
  const to = end.slice(0, 4);
  if (to === from) return from;
  return to.slice(0, 2) === from.slice(0, 2) ? `${from}–${to.slice(2)}` : `${from}–${to}`;
}
