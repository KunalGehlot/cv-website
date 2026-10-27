// Selected work: the rows on the home page and the case-study pages behind them. Anything not yet
// confirmed is left out rather than shown.
import type { L } from "./i18n";
import type { Track } from "./timeline";

export interface Fact {
  term: L;
  value: L | string;
  href?: string;
}

export interface Section {
  heading: L;
  paragraphs?: L[];
  list?: L[];
}

export interface Work {
  slug: string;
  /** The timeline entry it belongs to, for its dates. */
  entryId: string;
  track: Track;
  title: L;
  /** One line on the home page. */
  summary: L;
  /** Without a case study, the row links to its story chapter instead. */
  story?: string;
  lede?: L;
  facts?: Fact[];
  sections?: Section[];
}

const repo = "https://github.com/KunalGehlot/OpenTiles";

export const opentiles = {
  url: "https://opentiles.site",
  repo,
  /** The OpenTiles artefacts that the "How I build with AI" steps point to. */
  artefacts: {
    spec: `${repo}/blob/main/docs/spec/project-plan.md`,
    plan: `${repo}/blob/main/PLAN.md`,
    ci: `${repo}/blob/main/.github/workflows/ci.yml`,
    credits: `${repo}/blob/main/CREDITS.md`,
  },
};

export const work: Work[] = [
  {
    slug: "opentiles",
    entryId: "opentiles",
    track: "eng",
    title: { en: "OpenTiles", de: "OpenTiles" },
    summary: {
      en: "A free, open-source piano trainer that runs in the browser.",
      de: "Ein kostenloser Open-Source-Klaviertrainer, der im Browser läuft.",
    },
    lede: {
      en: "Piano apps lock even public-domain classics behind subscriptions. I wanted a free practice tool, and I wanted to find out how far an LLM can go when it is directed like a team.",
      de: "Klavier-Apps verlangen selbst für gemeinfreie Klassiker ein Abo. Ich wollte ein kostenloses Übungswerkzeug und herausfinden, wie weit ein LLM kommt, wenn man es führt wie ein Team.",
    },
    facts: [
      { term: { en: "Role", de: "Rolle" }, value: { en: "Spec, plan, direction and review", de: "Spezifikation, Plan, Steuerung und Review" } },
      { term: { en: "Stack", de: "Stack" }, value: "TypeScript, React, Rust (WebAssembly), TensorFlow.js" },
      { term: { en: "Size", de: "Umfang" }, value: { en: "About 75,000 lines, 126 test files", de: "Rund 75.000 Zeilen, 126 Testdateien" } },
      { term: { en: "Licence", de: "Lizenz" }, value: "AGPL-3.0" },
      { term: { en: "Live", de: "Live" }, value: "opentiles.site", href: "https://opentiles.site" },
      { term: { en: "Source", de: "Quellcode" }, value: "GitHub", href: repo },
    ],
    sections: [
      {
        heading: { en: "What I did", de: "Was ich gemacht habe" },
        list: [
          {
            en: "Wrote the specification, and a plan in which every task has an ID and a definition of done.",
            de: "Die Spezifikation geschrieben und einen Plan, in dem jede Aufgabe eine ID und eine Definition of Done hat.",
          },
          { en: "Directed an LLM through the build, one task at a time.", de: "Ein LLM Aufgabe für Aufgabe durch die Entwicklung geführt." },
          {
            en: "Made CI the gate: lint, type checks, unit tests and end-to-end tests in Chromium, Firefox and WebKit on every change.",
            de: "CI zum Tor gemacht: Linting, Typprüfung, Unit-Tests und End-to-End-Tests in Chromium, Firefox und WebKit bei jeder Änderung.",
          },
          { en: "Reviewed every change before it merged.", de: "Jede Änderung vor dem Merge selbst geprüft." },
          {
            en: "Checked the licence and provenance of every dependency and every piece in the catalogue, and audited the code against Sightread, the closest open-source app. They share no code.",
            de: "Lizenz und Herkunft jeder Abhängigkeit und jedes Stücks im Katalog geprüft und den Code mit Sightread verglichen, der ähnlichsten Open-Source-App. Gemeinsamen Code gibt es nicht.",
          },
          {
            en: "Disclosed the LLM's part in CREDITS.md and on the About page.",
            de: "Die Rolle des LLM in CREDITS.md und auf der Info-Seite offengelegt.",
          },
        ],
      },
      {
        heading: { en: "Under the hood", de: "Unter der Haube" },
        list: [
          {
            en: "It listens to an acoustic piano through the microphone. The app knows which notes come next, so the detector only has to check whether those notes are sounding. It is written in Rust, compiled to WebAssembly and runs in an AudioWorklet.",
            de: "Die App hört einem akustischen Klavier über das Mikrofon zu. Sie weiß, welche Noten als Nächstes kommen, also muss der Detektor nur prüfen, ob genau diese klingen. Er ist in Rust geschrieben, nach WebAssembly kompiliert und läuft in einem AudioWorklet.",
          },
          {
            en: "Spotify's Basic Pitch model runs in the browser on TensorFlow.js and turns a piano recording into notes.",
            de: "Spotifys Modell Basic Pitch läuft mit TensorFlow.js im Browser und macht aus einer Klavieraufnahme Noten.",
          },
          {
            en: "It works offline and keeps your library on your device, with optional end-to-end-encrypted sync.",
            de: "Sie funktioniert offline und hält die Bibliothek auf dem eigenen Gerät, mit optionaler Ende-zu-Ende-verschlüsselter Synchronisierung.",
          },
        ],
      },
      {
        heading: { en: "Outcome", de: "Ergebnis" },
        paragraphs: [
          {
            en: "A working pre-release within a few weeks, live at opentiles.site and deployed on every merge, with 81 reviewed public-domain pieces, in English and German.",
            de: "Eine funktionierende Vorabversion in wenigen Wochen, live auf opentiles.site und bei jedem Merge ausgeliefert, mit 81 geprüften gemeinfreien Stücken, auf Deutsch und Englisch.",
          },
        ],
      },
      {
        heading: { en: "What it taught me", de: "Was ich daraus gelernt habe" },
        paragraphs: [
          {
            en: "The leverage is in the spec, the plan and the checks. The model is fast; direction and verification decide whether the result is any good.",
            de: "Der Hebel liegt in Spezifikation, Plan und Prüfungen. Das Modell ist schnell; ob das Ergebnis etwas taugt, entscheiden Führung und Kontrolle.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-tool-at-epg",
    entryId: "epg-ai-tool",
    track: "both",
    title: { en: "Fitting an AI coding agent to legacy work at EPG", de: "Ein KI-Coding-Agent für die Legacy-Arbeit bei EPG" },
    summary: {
      en: "A harness that gives an AI coding agent EPG's processes and organisational context, so it can automate recurring work and help maintain a COBOL codebase for customer installations.",
      de: "Eine Umgebung, die einem KI-Coding-Agenten die Abläufe und den organisatorischen Kontext von EPG mitgibt, damit er wiederkehrende Arbeit automatisieren und bei der Wartung einer COBOL-Codebasis für Kundeninstallationen helfen kann.",
    },
    lede: {
      en: "EPG's LFS warehouse platform runs on COBOL and IBM i and serves logistics customers who each have their own customisations. An AI coding agent knows none of that out of the box: not our processes, and not the organisational context around each installation. I'm building the harness that gives it that context, so it can automate recurring processes and help maintain the code.",
      de: "Die Lagerverwaltung LFS von EPG läuft auf COBOL und IBM i und bedient Logistikkunden mit jeweils eigenen Anpassungen. Ein KI-Coding-Agent weiß davon zunächst nichts: weder unsere Abläufe noch den organisatorischen Kontext rund um jede Installation. Ich baue die Umgebung, die ihm diesen Kontext gibt, damit er wiederkehrende Abläufe automatisieren und bei der Wartung des Codes helfen kann.",
    },
    facts: [
      { term: { en: "Role", de: "Rolle" }, value: { en: "I build the harness", de: "Ich baue die Umgebung" } },
      { term: { en: "Where", de: "Wo" }, value: "Ehrhardt + Partner Group, Alzenau" },
      { term: { en: "Status", de: "Status" }, value: { en: "Alpha", de: "Alpha" } },
    ],
    sections: [
      {
        heading: { en: "What the job takes", de: "Was die Arbeit verlangt" },
        paragraphs: [
          {
            en: "The agent writes code. What it lacks is how the work is done here: the processes, the people and the history behind each customer's installation. I know those from running customer projects on the platform, and my MBA was about how organisations change. That is what lets me shape the harness to fit the job.",
            de: "Der Agent schreibt Code. Was ihm fehlt, ist, wie hier gearbeitet wird: die Abläufe, die Menschen und die Geschichte hinter jeder Kundeninstallation. Das kenne ich aus den Kundenprojekten auf der Plattform, und in meinem MBA ging es darum, wie Organisationen sich verändern. Deshalb kann ich die Umgebung so zuschneiden, dass sie zur Arbeit passt.",
          },
        ],
      },
      {
        heading: { en: "Where it stands", de: "Wo es steht" },
        paragraphs: [
          {
            en: "It is in alpha. I develop it, and so far I am its only user.",
            de: "Die Umgebung ist im Alpha-Stadium. Ich entwickle sie und bin bisher ihr einziger Nutzer.",
          },
        ],
      },
    ],
  },
  {
    slug: "generali-innovation",
    entryId: "thesis",
    track: "lead",
    title: { en: "Innovation governance for Generali Group", de: "Innovations-Governance für die Generali Group" },
    summary: {
      en: "Master's thesis with the Group Head Office in Milan: how a decentralised insurer can govern, fund and measure innovation across its country units.",
      de: "Masterarbeit mit der Konzernzentrale in Mailand: wie ein dezentral organisierter Versicherer Innovation über seine Ländergesellschaften steuern, finanzieren und messen kann.",
    },
    lede: {
      en: "How should a decentralised multinational govern, fund and measure innovation? I spent my master's thesis answering that with Generali's Group Head Office.",
      de: "Wie sollte ein dezentral organisierter Konzern Innovation steuern, finanzieren und messen? Dieser Frage bin ich in meiner Masterarbeit mit der Konzernzentrale von Generali nachgegangen.",
    },
    facts: [
      {
        term: { en: "Thesis", de: "Masterarbeit" },
        value: "Optimising Innovation: Governing, Fostering and Measuring Innovation in Decentralized Multinational Corporations",
      },
      {
        term: { en: "Partner", de: "Partner" },
        value: {
          en: "Generali Group Head Office (Chief Transformation Office), Milan",
          de: "Generali-Konzernzentrale (Chief Transformation Office), Mailand",
        },
      },
      { term: { en: "Programme", de: "Studiengang" }, value: "MBA, RWTH Aachen" },
    ],
    sections: [
      {
        heading: { en: "Context", de: "Ausgangslage" },
        paragraphs: [
          {
            en: "Generali runs its business through country units, and each has its own innovation activity. Seen from the centre, that makes innovation hard to see. Initiatives get duplicated across countries, lessons don't travel, and central funding and support don't reach every team equally.",
            de: "Generali führt sein Geschäft über Ländergesellschaften, und jede hat ihre eigenen Innovationsaktivitäten. Aus der Zentrale ist Innovation dadurch schwer zu überblicken. Initiativen entstehen in mehreren Ländern doppelt, Erkenntnisse wandern nicht weiter, und zentrale Mittel und Unterstützung erreichen nicht jedes Team gleich.",
          },
        ],
      },
      {
        heading: { en: "What I did", de: "Was ich gemacht habe" },
        list: [
          {
            en: "Worked with the Group's central innovation team to build an overview of how innovation actually happens across the group.",
            de: "Mit dem zentralen Innovationsteam einen Überblick erarbeitet, wie Innovation im Konzern tatsächlich entsteht.",
          },
          { en: "Interviewed heads of innovation in the country units.", de: "Innovationsverantwortliche der Ländergesellschaften interviewt." },
          { en: "Attended the Group Innovation Summit in Paris.", de: "Am Group Innovation Summit in Paris teilgenommen." },
          {
            en: "Compared what I found with research on corporate innovation governance.",
            de: "Die Ergebnisse mit der Forschung zu Innovations-Governance in Konzernen abgeglichen.",
          },
        ],
      },
      {
        heading: { en: "Outcome", de: "Ergebnis" },
        paragraphs: [
          {
            en: "An operating model on three pillars: culture, governance and measurement. It proposes an innovation thesis that focuses effort, staged portfolio decisions so promising ideas are funded step by step, and innovation accounting that pairs learning metrics with business KPIs before anything scales.",
            de: "Ein Betriebsmodell auf drei Säulen: Kultur, Governance und Messung. Es schlägt eine Innovationsthese vor, die die Kräfte bündelt, gestufte Portfolio-Entscheidungen, damit vielversprechende Ideen Schritt für Schritt finanziert werden, und Innovation Accounting, das Lernkennzahlen mit Business-KPIs verbindet, bevor etwas skaliert.",
          },
        ],
      },
      {
        heading: { en: "What it taught me", de: "Was ich daraus gelernt habe" },
        paragraphs: [
          {
            en: "Scaling AI across business units is the same problem: many teams, duplicated pilots, and no shared way to decide what gets funded or how success is measured. This model is how I approach it.",
            de: "KI über viele Geschäftseinheiten zu skalieren ist dasselbe Problem: viele Teams, doppelte Piloten und kein gemeinsamer Weg zu entscheiden, was finanziert wird und wie Erfolg gemessen wird. Mit diesem Modell gehe ich das an.",
          },
        ],
      },
    ],
  },
  {
    slug: "health-vectors",
    entryId: "health-vectors",
    track: "eng",
    title: { en: "SmartReader and HealthCIBYL at Health Vectors", de: "SmartReader und HealthCIBYL bei Health Vectors" },
    summary: {
      en: "Machine learning that turns PDF medical reports into structured data, feeding a health-risk score for insurance underwriting.",
      de: "Machine Learning, das medizinische PDF-Berichte in strukturierte Daten verwandelt und einen Gesundheits-Score für das Versicherungs-Underwriting speist.",
    },
    lede: {
      en: "Medical reports arrive as PDFs in hundreds of layouts. Health Vectors needed them as structured data, both to score health risk for insurers and to serve consumers directly.",
      de: "Medizinische Berichte kommen als PDFs in Hunderten von Layouts. Health Vectors brauchte sie als strukturierte Daten, um Gesundheitsrisiken für Versicherer zu bewerten und Kunden direkt zu bedienen.",
    },
    facts: [
      { term: { en: "Role", de: "Rolle" }, value: "Software Engineer, Data Science" },
      { term: { en: "Where", de: "Wo" }, value: { en: "Health Vectors, Bangalore", de: "Health Vectors, Bangalore" } },
    ],
    sections: [
      {
        heading: { en: "What I did", de: "Was ich gemacht habe" },
        list: [
          {
            en: "Built SmartReader over 16 months: machine learning and algorithms that extract medical values from PDF reports with 96% accuracy. It solved a problem the company had had for seven years and made its move from B2B to B2C possible.",
            de: "SmartReader in 16 Monaten gebaut: Machine Learning und Algorithmen, die medizinische Werte mit 96 % Genauigkeit aus PDF-Berichten lesen. Das löste ein Problem, das das Unternehmen seit sieben Jahren hatte, und ermöglichte den Schritt von B2B zu B2C.",
          },
          {
            en: "Led back-end and data-pipeline work for more than 100,000 medical records a year, supporting a 10% increase in revenue.",
            de: "Backend und Datenpipelines für mehr als 100.000 medizinische Datensätze im Jahr verantwortet, was 10 % mehr Umsatz unterstützte.",
          },
          {
            en: "SmartReader is the core of HealthCIBYL, a health-risk score designed for insurance underwriting.",
            de: "SmartReader ist der Kern von HealthCIBYL, einem Gesundheits-Score für das Versicherungs-Underwriting.",
          },
          {
            en: "Built prototypes on the GPT-3.5 API as soon as ChatGPT launched.",
            de: "Prototypen auf der GPT-3.5-API gebaut, sobald ChatGPT erschien.",
          },
          {
            en: "Ran company-wide workshops on GitLab workflows, semantic versioning and conventional commits. The scripts that enforce them are still in use.",
            de: "Unternehmensweite Workshops zu GitLab-Workflows, Semantic Versioning und Conventional Commits gegeben. Die Skripte, die das durchsetzen, sind noch im Einsatz.",
          },
        ],
      },
    ],
  },
  {
    slug: "infineon",
    entryId: "infineon",
    track: "lead",
    story: "capstone",
    title: { en: "Circular-economy business models for Infineon", de: "Geschäftsmodelle für die Kreislaufwirtschaft bei Infineon" },
    summary: {
      en: "Capstone: eight business models for returned power modules, chosen from all 55 patterns in one day of sprints. Won an internal innovation award.",
      de: "Capstone: acht Geschäftsmodelle für zurückkommende Leistungsmodule, an einem Tag voller Sprints aus allen 55 Mustern ausgewählt. Mit einem internen Innovationspreis ausgezeichnet.",
    },
  },
];

export const workBySlug = (slug: string): Work => {
  const found = work.find((w) => w.slug === slug);
  if (!found) throw new Error(`work: no entry "${slug}"`);
  return found;
};

/** The ones with a page of their own under /[lang]/work/. */
export const caseStudies = work.filter((w) => w.sections);
