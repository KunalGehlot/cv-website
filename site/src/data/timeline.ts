// Every role, degree, project and volunteer post, with dates. This one list drives the piano roll,
// the experience, education and leadership lists, the case-study facts and the CV.
import type { End, L, When } from "./i18n";

/** The two hands: engineering, innovation and leadership, or both at once. */
export type Track = "eng" | "lead" | "both";
export type Kind = "work" | "education" | "project" | "volunteer";

export interface Bullet {
  /** Stable id, so a CV variant can pick and reorder bullets. */
  id: string;
  text: L;
}

export interface Entry {
  id: string;
  kind: Kind;
  track: Track;
  /** Unknown dates stay `undefined`: the entry then stays out of the roll and the dated lists. */
  start?: When;
  end?: End;
  /** Role, degree or project name. */
  title: L;
  org: L | string;
  place?: L;
  /** The short name printed on the roll's note. */
  label: L;
  /** One line for the roll's popover. */
  line: L;
  /** Where the popover leads: a case study, or a chapter of the story page. */
  link?: { work: string } | { story: string };
  /** Shown in the roll (default true). */
  roll?: false;
  /** The CV only: a grade and a reference printed under a degree. */
  cv?: { grade?: string; reference?: { text: string; href: string }; bullets?: string[] };
  /** Dated steps listed in the note's popover, each with an optional case study. */
  milestones?: { when: When; text: L; link?: { work: string } }[];
  bullets?: Bullet[];
}

const alzenau = { en: "Alzenau", de: "Alzenau" };
const aachen = { en: "Aachen", de: "Aachen" };
const bangalore = { en: "Bangalore", de: "Bangalore" };
const milan = { en: "Milan", de: "Mailand" };
const jodhpur = { en: "Jodhpur", de: "Jodhpur" };

export const timeline: Entry[] = [
  {
    id: "btech",
    kind: "education",
    track: "eng",
    start: "2017-07",
    end: "2021-07",
    title: { en: "B.Tech Computer Science and Engineering", de: "B.Tech Informatik (Computer Science and Engineering)" },
    org: "Rajasthan Technical University",
    place: jodhpur,
    label: { en: "B.Tech", de: "B.Tech" },
    line: {
      en: "Computer Science and Engineering, Rajasthan Technical University",
      de: "Informatik, Rajasthan Technical University",
    },
    link: { story: "start" },
    cv: { grade: "2.5", reference: { text: "ZAB: LN2025/70187-1", href: "https://zab.kmk.org/de/app/validation" } },
    bullets: [
      {
        id: "zab",
        text: { en: "Recognised in Germany by the ZAB.", de: "Zeugnisbewertung der ZAB liegt vor." },
      },
    ],
  },
  {
    id: "freelance",
    kind: "work",
    track: "eng",
    // No dates yet, so this stays out of the roll and the dated lists.
    title: { en: "Freelance software developer", de: "Freiberuflicher Softwareentwickler" },
    org: "Upwork, Clutch",
    label: { en: "Freelance", de: "Freelance" },
    line: {
      en: "Facial-AI research with Agora.io; a $12,000+ proof of concept for a UK client",
      de: "KI-Forschung zur Gesichtsanalyse mit Agora.io; ein Proof of Concept über 12.000 US-Dollar für einen britischen Kunden",
    },
    link: { story: "entrepreneurship" },
    bullets: [
      {
        id: "agora",
        text: {
          en: "Real-time facial-AI research with the senior architect at Agora.io.",
          de: "Forschung zu Echtzeit-KI für Gesichtsanalyse, gemeinsam mit dem Senior Architect von Agora.io.",
        },
      },
      {
        id: "poc",
        text: {
          en: "Led a $12,000+ proof of concept for a UK client, managing requirements, the client relationship and delivery with a development agency.",
          de: "Proof of Concept über mehr als 12.000 US-Dollar für einen britischen Kunden geleitet: Anforderungen, Kundenbeziehung und Umsetzung mit einer Entwicklungsagentur.",
        },
      },
    ],
  },
  {
    id: "mlsa",
    kind: "volunteer",
    track: "lead",
    start: "2019-09",
    end: "2021-08",
    title: { en: "Microsoft Learn Student Ambassador", de: "Microsoft Learn Student Ambassador" },
    org: "Microsoft",
    place: jodhpur,
    label: { en: "Microsoft ambassador", de: "Microsoft-Ambassador" },
    line: {
      en: "Azure and Microsoft developer technologies for students",
      de: "Azure und Microsoft-Entwicklertechnologien für Studierende",
    },
    bullets: [
      {
        id: "summary",
        text: {
          en: "Led the programme for Azure and Microsoft developer technologies at my university.",
          de: "Programm für Azure und Microsoft-Entwicklertechnologien an meiner Universität geleitet.",
        },
      },
    ],
  },
  {
    id: "charity",
    kind: "volunteer",
    track: "lead",
    start: "2019-09",
    end: "2020-08",
    title: { en: "Charity co-founder", de: "Mitgründer einer Hilfsinitiative" },
    org: { en: "Charity", de: "Hilfsinitiative" },
    place: jodhpur,
    label: { en: "Charity", de: "Spenden" },
    line: {
      en: "₹200,000 raised for children in need, with the Taj Group of Hotels",
      de: "200.000 ₹ für bedürftige Kinder gesammelt, mit der Taj Group of Hotels",
    },
    bullets: [
      {
        id: "summary",
        text: {
          en: "Raised ₹200,000 for children in need with the Taj Group of Hotels.",
          de: "200.000 ₹ für bedürftige Kinder gesammelt, gemeinsam mit der Taj Group of Hotels.",
        },
      },
    ],
  },
  {
    id: "gdsc",
    kind: "volunteer",
    track: "lead",
    start: "2020-08",
    end: "2021-07",
    title: { en: "Google Developer Student Clubs lead", de: "Leitung Google Developer Student Club" },
    org: "Google Developer Student Clubs",
    place: jodhpur,
    label: { en: "GDSC lead", de: "GDSC-Leitung" },
    line: {
      en: "Google Developer Student Club: hackathons, the largest with 400+ participants",
      de: "Google Developer Student Club: Hackathons, der größte mit über 400 Teilnehmenden",
    },
    bullets: [
      {
        id: "summary",
        text: {
          en: "Workshops, ML and competitive-programming coaching, and hackathons, the largest with 400+ participants.",
          de: "Workshops, Coaching in ML und Competitive Programming sowie Hackathons, der größte mit über 400 Teilnehmenden.",
        },
      },
    ],
  },
  {
    id: "health-vectors",
    kind: "work",
    track: "eng",
    start: "2021-05",
    end: "2023-08",
    title: { en: "Software Engineer, Data Science", de: "Softwareentwickler, Data Science" },
    org: "Health Vectors",
    place: bangalore,
    label: { en: "Health Vectors", de: "Health Vectors" },
    line: {
      en: "ML that reads medical reports; health-risk scores for insurance underwriting",
      de: "ML, das medizinische Befunde liest; Gesundheitsrisiko-Scores für die Risikoprüfung von Versicherern",
    },
    link: { work: "health-vectors" },
    cv: { bullets: ["smartreader", "healthcibyl", "pipeline", "gpt", "workshops"] },
    bullets: [
      {
        id: "smartreader",
        text: {
          en: "Built SmartReader over 16 months: machine learning and algorithms that extract medical values from PDF reports with 96% accuracy, solving a seven-year-old problem and enabling the company's move from B2B to B2C.",
          de: "SmartReader in 16 Monaten entwickelt: maschinelles Lernen und Algorithmen, die medizinische Werte mit 96 % Genauigkeit aus PDF-Befunden extrahieren. Damit war ein sieben Jahre altes Problem gelöst und der Schritt des Unternehmens von B2B zu B2C möglich.",
        },
      },
      {
        id: "pipeline",
        text: {
          en: "Led back-end and data-pipeline work for more than 100,000 medical records a year, supporting a 10% revenue increase.",
          de: "Backend- und Datenpipeline-Entwicklung für über 100.000 medizinische Datensätze pro Jahr geleitet; Beitrag zu einem Umsatzplus von 10 %.",
        },
      },
      {
        id: "healthcibyl",
        text: {
          en: "SmartReader feeds HealthCIBYL, a health-risk score designed for insurance underwriting.",
          de: "SmartReader liefert die Daten für HealthCIBYL, einen Gesundheitsrisiko-Score für die Risikoprüfung von Versicherern.",
        },
      },
      {
        id: "gpt",
        text: {
          en: "Built prototypes on the GPT-3.5 API as soon as ChatGPT launched.",
          de: "Prototypen auf der GPT-3.5-API gebaut, sobald ChatGPT erschien.",
        },
      },
      {
        id: "workshops",
        text: {
          en: "Ran company-wide workshops on GitLab workflows, semantic versioning and conventional commits.",
          de: "Unternehmensweite Workshops zu GitLab-Workflows, Semantic Versioning und Conventional Commits geleitet.",
        },
      },
    ],
  },
  {
    id: "gpt",
    kind: "project",
    track: "eng",
    // From ChatGPT's launch (30 Nov 2022), as Kunal confirmed, to leaving Health Vectors.
    start: "2022-11",
    end: "2023-08",
    title: { en: "First GPT-3.5 prototypes", de: "Erste GPT-3.5-Prototypen" },
    org: "Health Vectors",
    label: { en: "GPT-3.5", de: "GPT-3.5" },
    line: {
      en: "Prototypes on the GPT-3.5 API from its release",
      de: "Prototypen auf der GPT-3.5-API, gleich ab ihrer Veröffentlichung",
    },
    link: { work: "health-vectors" },
    // Drawn as part of the generative-AI note.
    roll: false,
  },
  {
    // One note for all of it: Kunal has built with generative AI, at work and in his own time, since
    // ChatGPT launched. The entries it stands for stay out of the roll.
    id: "genai",
    kind: "project",
    track: "both",
    start: "2022-11",
    end: "now",
    title: { en: "Putting generative AI to work", de: "Generative KI im Einsatz" },
    org: { en: "At work and in my own time", de: "Im Job und in meiner Freizeit" },
    label: { en: "Generative AI", de: "Generative KI" },
    line: { en: "Since ChatGPT launched.", de: "Seit es ChatGPT gibt." },
    milestones: [
      {
        when: "2022-11",
        text: { en: "GPT-3.5 prototypes at Health Vectors", de: "GPT-3.5-Prototypen bei Health Vectors" },
        link: { work: "health-vectors" },
      },
      {
        when: "2026",
        text: { en: "A harness that fits an AI coding agent to EPG’s work", de: "Eine Umgebung, die einen KI-Coding-Agenten auf die Arbeit bei EPG zuschneidet" },
        link: { work: "ai-tool-at-epg" },
      },
      {
        when: "2026-10",
        text: { en: "OpenTiles, my piano trainer", de: "OpenTiles, mein Klaviertrainer" },
        link: { work: "opentiles" },
      },
    ],
  },
  {
    id: "mba",
    kind: "education",
    track: "lead",
    start: "2023-10",
    end: "2025-06",
    title: { en: "MBA Digitalization and Industrial Change", de: "MBA Digitalization and Industrial Change" },
    org: "RWTH Aachen University",
    place: aachen,
    label: { en: "MBA", de: "MBA" },
    line: {
      en: "Digitalization and Industrial Change, grade 1.6",
      de: "Digitalization and Industrial Change, Note 1,6",
    },
    link: { story: "germany" },
    cv: { grade: "1.6" },
    bullets: [
      {
        id: "grade",
        text: {
          en: "Grade 1.6. Strategy Lab and Infineon capstone graded 1.0.",
          de: "Note 1,6. Strategy Lab und Infineon-Capstone mit 1,0 bewertet.",
        },
      },
      {
        id: "scholarship",
        text: { en: "Entrepreneurial Mindset Scholarship.", de: "Entrepreneurial Mindset Scholarship." },
      },
    ],
  },
  {
    id: "unibuddy",
    kind: "volunteer",
    track: "lead",
    start: "2023-12",
    end: "now",
    title: { en: "Unibuddy", de: "Unibuddy" },
    org: "RWTH Business School",
    place: aachen,
    label: { en: "Unibuddy", de: "Unibuddy" },
    line: {
      en: "Advising prospective students of RWTH Business School",
      de: "Beratung von Studieninteressierten der RWTH Business School",
    },
    roll: false,
    bullets: [
      {
        id: "summary",
        text: { en: "Advising prospective students.", de: "Beratung von Studieninteressierten." },
      },
    ],
  },
  {
    id: "generali",
    kind: "work",
    track: "eng",
    start: "2023-12",
    end: "2025-06",
    title: { en: "Network Automation Engineer (working student)", de: "Werkstudent Netzwerkautomatisierung" },
    org: "Generali",
    place: aachen,
    label: { en: "Generali", de: "Generali" },
    line: {
      en: "Network automation for the EU central data centres, Aachen",
      de: "Netzwerkautomatisierung für die zentralen EU-Rechenzentren, Aachen",
    },
    link: { story: "generali" },
    // The thesis has its own entry under the CV's projects.
    cv: { bullets: ["automation", "award"] },
    bullets: [
      {
        id: "automation",
        text: {
          en: "Built automation scripts that test the operational efficiency of Generali's central European data centres.",
          de: "Automatisierungsskripte entwickelt, die die operative Effizienz der zentralen europäischen Rechenzentren von Generali testen.",
        },
      },
      {
        id: "thesis",
        text: {
          en: "Wrote my master's thesis with the Group Head Office in Milan.",
          de: "Masterarbeit mit der Konzernzentrale in Mailand geschrieben.",
        },
      },
      {
        id: "award",
        text: {
          en: "Innovation Champion award, Ninety & Generali, 2024.",
          de: "Auszeichnung als Innovation Champion, Ninety & Generali, 2024.",
        },
      },
    ],
  },
  {
    id: "infineon",
    kind: "project",
    track: "lead",
    start: "2024-10",
    end: "2025-01",
    title: { en: "Capstone: circular-economy business models", de: "Capstone: Geschäftsmodelle für die Kreislaufwirtschaft" },
    org: "Infineon",
    place: aachen,
    label: { en: "Infineon", de: "Infineon" },
    line: {
      en: "Circular-economy business models for returned power modules; innovation award",
      de: "Geschäftsmodelle für zurückkommende Leistungsmodule; Innovationspreis",
    },
    link: { story: "capstone" },
    bullets: [
      {
        id: "models",
        text: {
          en: "Eight business models for returned power modules, chosen from all 55 business-model patterns in one day of four sprints.",
          de: "Acht Geschäftsmodelle für zurückkommende Leistungsmodule, ausgewählt aus allen 55 Geschäftsmodellmustern in vier Sprints an einem Tag.",
        },
      },
      {
        id: "award",
        text: {
          en: "Presented at a company all-hands; won an internal innovation award; graded 1.0.",
          de: "Im Rahmen eines unternehmensweiten All-Hands vorgestellt; interner Innovationspreis; Note 1,0.",
        },
      },
    ],
  },
  {
    id: "thesis",
    kind: "project",
    track: "lead",
    start: "2024-11",
    end: "2025-04",
    title: { en: "Master's thesis: innovation governance", de: "Masterarbeit: Innovations-Governance" },
    org: { en: "Generali Group Head Office", de: "Generali-Konzernzentrale" },
    place: milan,
    label: { en: "Thesis", de: "Masterarbeit" },
    line: {
      en: "With Generali Group HQ: governing and measuring innovation across countries",
      de: "Mit der Generali-Konzernzentrale: Innovation über Ländergrenzen steuern und messen",
    },
    link: { work: "generali-innovation" },
    bullets: [
      {
        id: "research",
        text: {
          en: "Mapped innovation across a decentralised multinational through a literature review and interviews with country heads of innovation; attended the Group Innovation Summit in Paris.",
          de: "Innovation in einem dezentral organisierten Konzern erfasst, mit Literaturanalyse und Interviews mit den Innovationsverantwortlichen der Länder; Teilnahme am Group Innovation Summit in Paris.",
        },
      },
      {
        id: "model",
        text: {
          en: "Designed an operating model on three pillars, culture, governance and measurement, to reduce fragmentation and align strategy.",
          de: "Ein Betriebsmodell auf drei Säulen entworfen, Kultur, Governance und Messung, um Zersplitterung abzubauen und die Strategie auszurichten.",
        },
      },
      {
        id: "kpis",
        text: {
          en: "Proposed an innovation thesis, staged portfolio decisions and innovation accounting that pairs learning metrics with business KPIs before scale-up.",
          de: "Eine Innovationsthese, gestufte Portfolio-Entscheidungen und Innovation Accounting vorgeschlagen, das Lernkennzahlen vor dem Skalieren mit Business-KPIs verbindet.",
        },
      },
    ],
  },
  {
    id: "epg",
    kind: "work",
    track: "eng",
    start: "2025-10",
    end: "now",
    title: { en: "Junior Software Developer", de: "Junior-Softwareentwickler" },
    org: "Ehrhardt + Partner Group (EPG)",
    place: alzenau,
    label: { en: "EPG", de: "EPG" },
    line: {
      en: "LFS warehouse software: COBOL on IBM i for logistics customers",
      de: "Lagerverwaltung LFS: COBOL auf IBM i für Logistikkunden",
    },
    // The CV leads with the harness.
    cv: { bullets: ["ai-tool", "lfs", "learned"] },
    bullets: [
      {
        id: "lfs",
        text: {
          en: "Develop customer-specific features in the LFS warehouse management system (COBOL on IBM i) for international logistics customers, increasingly owning projects from requirements to rollout.",
          de: "Entwicklung kundenspezifischer Funktionen im Lagerverwaltungssystem LFS (COBOL auf IBM i) für internationale Logistikkunden, zunehmend eigenverantwortlich von der Anforderung bis zur Einführung.",
        },
      },
      {
        id: "learned",
        text: {
          en: "Learned COBOL, IBM i and XSLFast from scratch after joining.",
          de: "COBOL, IBM i und XSLFast nach dem Einstieg von Grund auf gelernt.",
        },
      },
      {
        id: "ai-tool",
        text: {
          en: "Building a harness, now in alpha, that gives an AI coding agent our processes and organisational context, so it can automate recurring work and help maintain the legacy codebase.",
          de: "Aufbau einer Umgebung (derzeit im Alpha-Stadium), die einem KI-Coding-Agenten unsere Abläufe und den organisatorischen Kontext mitgibt, damit er wiederkehrende Arbeit automatisieren und bei der Wartung der Legacy-Codebasis helfen kann.",
        },
      },
    ],
  },
  {
    id: "epg-ai-tool",
    kind: "project",
    track: "both",
    // Only the year is known.
    start: "2026",
    end: "now",
    title: { en: "A harness for an AI coding agent", de: "Eine Umgebung für einen KI-Coding-Agenten" },
    org: "Ehrhardt + Partner Group (EPG)",
    label: { en: "AI harness", de: "KI-Umgebung" },
    line: {
      en: "Fits an AI coding agent to our processes and COBOL codebase; in alpha",
      de: "Schneidet einen KI-Coding-Agenten auf unsere Abläufe und die COBOL-Codebasis zu; im Alpha-Stadium",
    },
    link: { work: "ai-tool-at-epg" },
    roll: false,
  },
  {
    id: "opentiles",
    kind: "project",
    track: "eng",
    start: "2026-10",
    end: "now",
    title: { en: "OpenTiles", de: "OpenTiles" },
    org: { en: "Side project", de: "Eigenes Projekt" },
    label: { en: "OpenTiles", de: "OpenTiles" },
    line: {
      en: "Open-source piano trainer, built with an LLM",
      de: "Open-Source-Klaviertrainer, mit einem LLM entwickelt",
    },
    link: { work: "opentiles" },
    roll: false,
    bullets: [
      {
        id: "direction",
        text: {
          en: "Wrote the specification and the plan (task IDs, definition of done), directed an LLM through the build and reviewed every change.",
          de: "Spezifikation und Plan geschrieben (Aufgaben-IDs, Definition of Done), ein LLM durch die Entwicklung geführt und jede Änderung geprüft.",
        },
      },
      {
        id: "stack",
        text: {
          en: "TypeScript and React; a note detector in Rust, compiled to WebAssembly, for acoustic pianos; Spotify's Basic Pitch on TensorFlow.js; offline-first, with optional end-to-end-encrypted sync.",
          de: "TypeScript und React; ein Notendetektor in Rust, nach WebAssembly kompiliert, für akustische Klaviere; Spotifys Basic Pitch mit TensorFlow.js; offline-first, mit optionaler Ende-zu-Ende-verschlüsselter Synchronisierung.",
        },
      },
      {
        id: "checks",
        text: {
          en: "About 75,000 lines and 126 test files; lint, type checks, unit tests and end-to-end tests in Chromium, Firefox and WebKit on every change. Live at opentiles.site.",
          de: "Rund 75.000 Zeilen und 126 Testdateien; Linting, Typprüfung, Unit-Tests und End-to-End-Tests in Chromium, Firefox und WebKit bei jeder Änderung. Live auf opentiles.site.",
        },
      },
    ],
  },
];

export const entry = (id: string): Entry => {
  const found = timeline.find((e) => e.id === id);
  if (!found) throw new Error(`timeline: no entry "${id}"`);
  return found;
};

/** Entries with known dates, newest first: the order of the experience and education lists. */
export const dated = (kind: Kind) =>
  timeline
    .filter((e): e is Entry & { start: When; end: End } => e.kind === kind && !!e.start && !!e.end)
    .sort((a, b) => (a.start < b.start ? 1 : -1));
