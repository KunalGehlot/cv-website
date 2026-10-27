// Certificates and awards. AZ-104 carries a status, so it can be flipped after the exam without
// touching any page: set `status: "passed"` and add `date` and `credentialUrl`.
import type { L, Lang, When } from "./i18n";
import { formatMonth } from "./i18n";

export type ExamStatus = "preparing" | "scheduled" | "passed";

export interface Credential {
  id: string;
  name: L | string;
  issuer?: string;
  date?: When;
  status?: ExamStatus;
  credentialUrl?: string;
}

export const az104: Credential = {
  id: "az-104",
  name: "AZ-104 Microsoft Azure Administrator",
  issuer: "Microsoft",
  status: "preparing",
};

export const credentials: Credential[] = [
  az104,
  { id: "innovation-champion", name: "Innovation Champion", issuer: "Ninety & Generali", date: "2024-11" },
  {
    id: "infineon-award",
    name: { en: "Internal innovation award, Infineon capstone team", de: "Interner Innovationspreis, Infineon-Capstone-Team" },
    issuer: "Infineon",
  },
  { id: "scholarship", name: "Entrepreneurial Mindset Scholarship", issuer: "RWTH Aachen" },
  { id: "udacity", name: "AI Nanodegree", issuer: "Udacity", date: "2020-05" },
  { id: "datacamp", name: { en: "Data Scientist career path", de: "Data Scientist Career Path" }, issuer: "DataCamp", date: "2020-03" },
  { id: "coursera", name: "Machine Learning (Stanford, Andrew Ng)", issuer: "Coursera", date: "2019-12" },
  { id: "arctic", name: "GitHub Arctic Code Vault Contributor", issuer: "GitHub" },
];

const statusText: Record<ExamStatus, L> = {
  preparing: { en: "preparing for the exam", de: "in Vorbereitung" },
  scheduled: { en: "exam scheduled", de: "Prüfung angesetzt" },
  passed: { en: "certified", de: "zertifiziert" },
};

/** "preparing for the exam", "exam scheduled for Mar 2027", "certified, Mar 2027". */
export function examStatus(c: Credential, lang: Lang): string | undefined {
  if (!c.status) return undefined;
  const text = statusText[c.status][lang];
  if (!c.date) return text;
  if (c.status === "scheduled") return lang === "en" ? `exam scheduled for ${formatMonth(c.date, lang)}` : `Prüfung im ${formatMonth(c.date, lang)}`;
  return `${text}, ${formatMonth(c.date, lang)}`;
}
