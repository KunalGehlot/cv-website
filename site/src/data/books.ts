// The four books on the home page, with the covers already stored in public/img/books/.
import type { L } from "./i18n";

export interface Book {
  title: string;
  author: string;
  topic: L;
  note: L;
  cover: string;
  goodreads: string;
}

export const goodreadsProfile = "https://www.goodreads.com/user/show/186180596-kunal-gehlot";

export const books: Book[] = [
  {
    title: "The Corporate Startup",
    author: "Viki et al.",
    topic: { en: "Venture building", de: "Corporate Venture Building" },
    note: {
      en: "Playbook for running venture portfolios inside enterprises with clear governance and metrics.",
      de: "Struktur für Venture-Portfolios im Konzern, mit klarer Governance und messbaren KPIs.",
    },
    cover: "img/books/corporate-startup.jpg",
    goodreads: "https://www.goodreads.com/book/show/57338463-the-corporate-startup",
  },
  {
    title: "The Business Model Navigator",
    author: "Gassmann et al.",
    topic: { en: "Business model patterns", de: "Geschäftsmodellmuster" },
    note: {
      en: "50+ patterns that quickly reframe value creation and capture for new offers.",
      de: "Über 50 Muster, die neue Wege für Wertschöpfung und Erlöse aufzeigen.",
    },
    cover: "img/books/business-model-navigator.jpg",
    goodreads: "https://www.goodreads.com/book/show/22776635-the-business-model-navigator",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    topic: { en: "Experimentation and iteration", de: "Experimente und Iteration" },
    note: {
      en: "Systematically tests assumptions early so the right product emerges before scaling.",
      de: "Annahmen früh und systematisch testen, damit die richtige Lösung vor dem Skalieren entsteht.",
    },
    cover: "img/books/lean-startup.jpg",
    goodreads: "https://www.goodreads.com/book/show/10127019-the-lean-startup",
  },
  {
    title: "Sprint",
    author: "Jake Knapp",
    topic: { en: "Rapid problem-solving", de: "Probleme schnell lösen" },
    note: {
      en: "A crisp five-day loop to align a team and test a risky idea with users fast.",
      de: "Eine fokussierte Fünf-Tage-Schleife, um ein Team auszurichten und eine riskante Idee schnell mit Nutzern zu testen.",
    },
    cover: "img/books/sprint.jpg",
    goodreads: "https://www.goodreads.com/book/show/25814544-sprint",
  },
];
