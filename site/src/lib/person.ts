// The schema.org Person for search engines and the tools recruiters use, built from the same data as
// the pages, so it never says more than they do.
import { t, type Lang } from "../data/i18n";
import { profile } from "../data/profile";
import { entry } from "../data/timeline";

const site = profile.site;

export function personLd(lang: Lang, description: string) {
  const mba = entry("mba");
  const btech = entry("btech");
  const university = (name: string) => ({ "@type": "CollegeOrUniversity", name });
  return {
    "@type": "Person",
    "@id": `${site}/#person`,
    name: profile.name,
    givenName: profile.givenName,
    familyName: profile.familyName,
    jobTitle: profile.jobTitle,
    description,
    url: `${site}/${lang}/`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Offenbach am Main", addressRegion: "Hessen", addressCountry: "DE" },
    worksFor: { "@type": "Organization", name: t(entry("epg").org, lang) },
    alumniOf: [university(t(mba.org, lang)), university(t(btech.org, lang))],
    hasCredential: [mba, btech].map((e) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: t(e.title, lang),
      recognizedBy: university(t(e.org, lang)),
    })),
    knowsAbout: profile.knowsAbout,
    knowsLanguage: profile.languages.map((l) => ({ "@type": "Language", name: t(l.name, "en") })),
    sameAs: [profile.linkedin.url, profile.github.url],
  };
}
