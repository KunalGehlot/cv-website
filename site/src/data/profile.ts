// Who Kunal is and how to reach him. The website and the CV both read this file.
import type { L } from "./i18n";

export const profile = {
  name: "Kunal Gehlot",
  givenName: "Kunal",
  familyName: "Gehlot",
  pronouns: "he/him",
  /** The job title in the JSON-LD `Person`. */
  jobTitle: "Software Developer",
  location: {
    en: "Offenbach am Main, Frankfurt area",
    de: "Offenbach am Main, Rhein-Main-Gebiet",
  } satisfies L,
  site: "https://gehlot.site",
  email: "kunal.gehlot@rwth-aachen.de",
  linkedin: { url: "https://www.linkedin.com/in/gehlotk", handle: "gehlotk" },
  github: { url: "https://github.com/KunalGehlot", handle: "KunalGehlot" },
  /** Topics for the schema.org Person; each is backed by the experience, projects or skills. */
  knowsAbout: [
    "Generative AI",
    "AI coding agents",
    "Machine learning",
    "Document extraction",
    "Python",
    "TypeScript",
    "COBOL",
    "IBM i",
    "Azure",
    "CI/CD",
    "Digital transformation",
    "Innovation management",
    "Innovation governance",
    "Business model innovation",
  ],
  languages: [
    { name: { en: "English", de: "Englisch" }, level: "C2" },
    { name: { en: "German", de: "Deutsch" }, level: "C1" },
    { name: { en: "Hindi", de: "Hindi" }, level: "C2" },
  ] satisfies { name: L; level: string }[],
  /** The CV's profile paragraph. */
  summary: {
    en: "Software engineer and RWTH Aachen MBA who fits generative AI and data to real business processes. More than five years in software, including two-plus years of production machine learning in health-tech: document extraction and health-risk scores used in insurance underwriting. At EPG I develop COBOL on IBM i and build a harness that gives an AI coding agent our processes and organisational context. OpenTiles, my open-source web app, was built with an LLM under my direction (about 75,000 lines, full CI). I bridge engineering and business: my thesis with Generali's Group Head Office designed how to govern and measure innovation across country units.",
    de: "Softwareentwickler und MBA der RWTH Aachen, der generative KI und Daten auf echte Geschäftsprozesse zuschneidet. Mehr als fünf Jahre Softwareentwicklung, davon über zwei Jahre Machine Learning im Produktivbetrieb in der Health-Tech-Branche: Dokumentenextraktion und Gesundheitsrisiko-Scores für die Risikoprüfung von Versicherern. Bei EPG entwickle ich COBOL auf IBM i und baue eine Umgebung, die einem KI-Coding-Agenten unsere Abläufe und den organisatorischen Kontext mitgibt. OpenTiles, meine Open-Source-Web-App, hat ein LLM unter meiner Anleitung gebaut (rund 75.000 Zeilen, vollständige CI). Ich verbinde Technik und Business: In meiner Masterarbeit mit der Generali-Konzernzentrale habe ich entworfen, wie sich Innovation über Ländergesellschaften steuern und messen lässt.",
  } satisfies L,
  /**
   * Printed in the CV's personal details block only. The website pages never show these, and no
   * page or CV shows a phone number or the street address (that is only in the Impressum).
   */
  cvPersonal: {
    city: "63067 Offenbach am Main",
    drivingLicence: { en: "Class B", de: "Klasse B" } satisfies L,
    dateOfBirth: "14.06.1999",
  },
};
