// The story page's chapters, in both languages. The roll's popovers link to them by id.
import type { L } from "./i18n";
import type { Track } from "./timeline";

export interface Chapter {
  id: string;
  /** The hand the chapter belongs to, for its note in the chapter list. */
  track: Track;
  title: L;
  location?: { label: L; href: L };
  body: L[];
  /** Facts the paragraphs don't already say. */
  milestones?: L[];
  /** A case study that tells this chapter in full. */
  work?: string;
}

const wiki = (en: string, de: string): L => ({ en: `https://en.wikipedia.org/wiki/${en}`, de: `https://de.wikipedia.org/wiki/${de}` });

export const chapters: Chapter[] = [
  {
    id: "start",
    track: "both",
    title: { en: "Where it started", de: "Wo es begann" },
    location: { label: { en: "Jodhpur, India", de: "Jodhpur, Indien" }, href: wiki("Jodhpur", "Jodhpur") },
    body: [
      {
        en: "I am Kunal. I care about innovation, digitalization, and IT management that changes how organizations operate.",
        de: "Ich bin Kunal. Mich treiben Innovation, Digitalisierung und ein IT-Management, das spürbar verändert, wie Organisationen arbeiten.",
      },
      {
        en: "My journey began in India during my Bachelor’s in Computer Science Engineering. I was not just studying. I was building communities, bringing people together, setting learning goals, and keeping the energy alive.",
        de: "Meine Reise begann in Indien mit dem Bachelor in Computer Science Engineering. Ich habe nicht nur studiert. Ich habe Communities aufgebaut, Menschen zusammengebracht, Lernziele gesetzt und die Energie hochgehalten.",
      },
      {
        en: "That early phase shaped how I work today. I learn fast, build systems, and focus on creating environments where people grow.",
        de: "Diese Zeit hat geprägt, wie ich heute arbeite. Ich lerne schnell, baue Systeme und schaffe Umgebungen, in denen Menschen wachsen.",
      },
    ],
    milestones: [
      { en: "Hackathons, the largest with 400+ participants", de: "Hackathons, der größte mit über 400 Teilnehmenden" },
    ],
  },
  {
    id: "school",
    track: "lead",
    title: { en: "School years in Jodhpur", de: "Schulzeit in Jodhpur" },
    body: [
      {
        en: "I studied at Delhi Public School in Jodhpur. It gave me structure, discipline, and a strong academic base.",
        de: "Ich war auf der Delhi Public School in Jodhpur. Sie gab mir Struktur, Disziplin und eine starke schulische Grundlage.",
      },
      {
        en: "It was also where I began balancing academics with leadership and extracurricular work.",
        de: "Dort habe ich auch angefangen, Schule mit Verantwortung und Engagement außerhalb des Unterrichts zu verbinden.",
      },
    ],
  },
  {
    id: "entrepreneurship",
    track: "eng",
    title: { en: "Getting my hands dirty with entrepreneurship", de: "Erste Schritte als Unternehmer" },
    body: [
      {
        en: "Alongside my studies, I wanted to build something of my own. I started freelancing and delivering software services.",
        de: "Neben dem Studium wollte ich etwas Eigenes aufbauen. Ich habe freiberuflich gearbeitet und Software-Dienstleistungen angeboten.",
      },
      {
        en: "It was not only about code. I learned client management, requirements, and how to run projects in the real world.",
        de: "Es ging nicht nur um Code. Ich habe gelernt, mit Kunden zu arbeiten, Anforderungen aufzunehmen und Projekte in der Praxis zu steuern.",
      },
      {
        en: "Working with a development agency pushed me toward product and project management thinking early.",
        de: "Die Zusammenarbeit mit einer Entwicklungsagentur hat mich früh an Produkt- und Projektmanagement herangeführt.",
      },
    ],
    milestones: [
      { en: "Real-time facial-AI research with the senior architect at Agora.io", de: "Forschung zu Echtzeit-KI für Gesichtsanalyse mit dem Senior Architect von Agora.io" },
      { en: "A $12,000+ proof of concept for a UK client, delivered with a development agency", de: "Ein Proof of Concept über mehr als 12.000 US-Dollar für einen britischen Kunden, umgesetzt mit einer Agentur" },
    ],
  },
  {
    id: "health",
    track: "eng",
    title: { en: "Health tech and data work", de: "Health-Tech und Daten" },
    location: { label: { en: "Bangalore, India", de: "Bangalore, Indien" }, href: wiki("Bangalore", "Bangalore") },
    work: "health-vectors",
    body: [
      {
        en: "After graduating, I joined Health Vectors in Bangalore as a Software Engineer in Data Science.",
        de: "Nach dem Abschluss bin ich bei Health Vectors in Bangalore als Software Engineer im Bereich Data Science eingestiegen.",
      },
      {
        en: "I built SmartReader, which reads medical values out of PDF reports in hundreds of layouts, and the pipelines that turn them into structured data.",
        de: "Ich habe SmartReader gebaut, das medizinische Werte aus PDF-Berichten in Hunderten von Layouts liest, und die Pipelines, die daraus strukturierte Daten machen.",
      },
      {
        en: "SmartReader became the core of HealthCIBYL, our health-risk score for insurance underwriting.",
        de: "SmartReader wurde zum Kern von HealthCIBYL, unserem Gesundheits-Score für das Versicherungs-Underwriting.",
      },
    ],
    milestones: [
      { en: "96% accuracy, solving a problem the company had had for seven years", de: "96 % Genauigkeit, für ein Problem, das das Unternehmen seit sieben Jahren hatte" },
      { en: "More than 100,000 medical records a year", de: "Mehr als 100.000 medizinische Datensätze im Jahr" },
    ],
  },
  {
    id: "chatgpt",
    track: "both",
    title: { en: "When AI shifted the lens", de: "Als KI den Blick verschob" },
    body: [
      {
        en: "When GPT-3.5 launched, it shifted how I thought about what teams could deliver.",
        de: "Als GPT-3.5 erschien, hat sich mein Blick darauf verändert, was Teams leisten können.",
      },
      {
        en: "I started focusing more on innovation, digitalization, and how organizations can move faster without chaos.",
        de: "Ich habe mich stärker mit Innovation und Digitalisierung beschäftigt und damit, wie Organisationen schneller werden, ohne im Chaos zu versinken.",
      },
      {
        en: "That is when management became as exciting as engineering.",
        de: "Ab da fand ich Management genauso spannend wie Softwareentwicklung.",
      },
      {
        en: "I never stopped working with it: prototypes on the GPT-3.5 API at Health Vectors, a harness that fits an AI coding agent to the work at EPG, and OpenTiles, a full web app written with an LLM under my direction.",
        de: "Seitdem arbeite ich damit: Prototypen auf der GPT-3.5-API bei Health Vectors, eine Umgebung, die einen KI-Coding-Agenten bei EPG auf die Arbeit zuschneidet, und OpenTiles, eine komplette Web-App, die ein LLM unter meiner Anleitung geschrieben hat.",
      },
    ],
  },
  {
    id: "germany",
    track: "lead",
    title: { en: "Germany and the MBA chapter", de: "Deutschland und der MBA" },
    location: { label: { en: "Aachen, Germany", de: "Aachen, Deutschland" }, href: wiki("Aachen", "Aachen") },
    body: [
      {
        en: "I learned German for 2.5 years while working because I wanted to study in Germany.",
        de: "Ich habe zweieinhalb Jahre lang neben der Arbeit Deutsch gelernt, weil ich in Deutschland studieren wollte.",
      },
      {
        en: "I moved to RWTH Aachen for my MBA in Digitalization and Industrial Change and received the Entrepreneurial Mindset Scholarship.",
        de: "Für den MBA in Digitalization and Industrial Change bin ich an die RWTH Aachen gegangen und habe das Entrepreneurial Mindset Scholarship erhalten.",
      },
      {
        en: "At RWTH I immersed myself in strategy, innovation, and industry labs with a strong focus on execution.",
        de: "An der RWTH ging es um Strategie, Innovation und Labs mit Industriepartnern, immer mit klarem Blick auf die Umsetzung.",
      },
    ],
    milestones: [
      { en: "Grade 1.6; Strategy Lab graded 1.0", de: "Note 1,6; Strategy Lab mit 1,0" },
    ],
  },
  {
    id: "generali",
    track: "eng",
    title: { en: "Seeing enterprise innovation up close", de: "Innovation im Konzern aus der Nähe" },
    body: [
      {
        en: "During my master’s, I worked part time as a Network Automation Engineer at Assicurazioni Generali.",
        de: "Während des Masters habe ich als Werkstudent in der Netzwerkautomatisierung bei Assicurazioni Generali gearbeitet.",
      },
      {
        en: "It showed me how innovation looks inside a large organization and why governance matters when you want innovation to scale.",
        de: "Dort habe ich gesehen, wie Innovation in einer großen Organisation aussieht und warum Governance zählt, wenn Innovation skalieren soll.",
      },
      {
        en: "That made the topic of my thesis feel real, not academic.",
        de: "Dadurch wurde das Thema meiner Masterarbeit für mich greifbar statt akademisch.",
      },
    ],
    milestones: [
      { en: "Innovation Champion, Ninety & Generali, 2024", de: "Innovation Champion, Ninety & Generali, 2024" },
    ],
  },
  {
    id: "capstone",
    track: "lead",
    title: { en: "Capstone with Infineon", de: "Capstone mit Infineon" },
    body: [
      {
        en: "My final semester centred on a capstone with Infineon, on sustainable innovation and business model design for the circular economy.",
        de: "Im letzten Semester stand ein Capstone-Projekt mit Infineon im Mittelpunkt: nachhaltige Innovation und Geschäftsmodelle für die Kreislaufwirtschaft.",
      },
      {
        en: "We ran a workshop on all 55 business-model patterns and four sprints in a single day, and narrowed the field to eight models.",
        de: "An einem einzigen Tag haben wir einen Workshop zu allen 55 Geschäftsmodellmustern und vier Sprints durchgeführt und das Feld auf acht Modelle eingegrenzt.",
      },
      {
        en: "We presented them at a company all-hands, and the project earned an internal innovation award.",
        de: "Wir haben sie bei einem All-Hands im Unternehmen vorgestellt, und das Projekt hat einen internen Innovationspreis gewonnen.",
      },
    ],
    milestones: [
      { en: "Graded 1.0", de: "Note 1,0" },
    ],
  },
  {
    id: "thesis",
    track: "lead",
    title: { en: "Thesis with Generali Group", de: "Masterarbeit mit der Generali Group" },
    work: "generali-innovation",
    body: [
      {
        en: "For my thesis I worked with Generali’s Group Head Office in Milan and its central innovation team.",
        de: "Für meine Masterarbeit habe ich mit der Konzernzentrale von Generali in Mailand und ihrem zentralen Innovationsteam gearbeitet.",
      },
      {
        en: "Together we mapped how innovation happens across a group that runs through country units, where initiatives get duplicated and lessons don’t travel.",
        de: "Gemeinsam haben wir erfasst, wie Innovation in einem Konzern entsteht, der über Ländergesellschaften geführt wird, wo Initiativen doppelt laufen und Erkenntnisse nicht weiterwandern.",
      },
      {
        en: "I interviewed country heads of innovation, attended the Group Innovation Summit in Paris, and proposed a model for governing, funding and measuring innovation at group scale.",
        de: "Ich habe Innovationsverantwortliche der Länder interviewt, am Group Innovation Summit in Paris teilgenommen und ein Modell vorgeschlagen, um Innovation konzernweit zu steuern, zu finanzieren und zu messen.",
      },
    ],
  },
  {
    id: "now",
    track: "both",
    title: { en: "Where I am now", de: "Wo ich jetzt stehe" },
    location: { label: { en: "Alzenau, Germany", de: "Alzenau, Deutschland" }, href: wiki("Alzenau", "Alzenau") },
    body: [
      {
        en: "At EPG I learned COBOL and IBM i from scratch and now run customer projects on our warehouse platform.",
        de: "Bei EPG habe ich COBOL und IBM i von Grund auf gelernt und betreue heute Kundenprojekte auf unserer Lagerverwaltungsplattform.",
      },
      {
        en: "I’m also building the harness that lets an AI coding agent take on that legacy work with our processes and context, and in my own time I build OpenTiles.",
        de: "Außerdem baue ich die Umgebung, mit der ein KI-Coding-Agent diese Legacy-Arbeit mit unseren Abläufen und unserem Kontext übernehmen kann, und in meiner Freizeit OpenTiles.",
      },
      {
        en: "Next, I want to lead AI and data solutions that change how a business runs, where engineering and the transformation work from my MBA meet.",
        de: "Als Nächstes möchte ich KI- und Datenlösungen verantworten, die verändern, wie ein Unternehmen arbeitet: dort, wo Softwareentwicklung und die Transformationsarbeit aus meinem MBA zusammenkommen.",
      },
    ],
  },
];
