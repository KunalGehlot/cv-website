// Skills, grouped. Plain text on the site and the CV; no levels, no pill clouds.
import type { L } from "./i18n";
import { az104, examStatus } from "./credentials";

export interface SkillGroup {
  id: string;
  name: L;
  items: (L | string)[];
}

export const skills: SkillGroup[] = [
  {
    id: "ai",
    name: { en: "Generative AI and ML", de: "Generative KI und ML" },
    items: [
      { en: "Harnesses for AI coding agents", de: "Arbeitsumgebungen für KI-Agenten" },
      { en: "Prompt engineering", de: "Prompt Engineering" },
      { en: "AI-assisted software delivery", de: "KI-gestützte Softwareentwicklung" },
      "TensorFlow, Keras",
      "PyTorch",
      "scikit-learn",
      "TensorFlow.js",
      { en: "ML document extraction", de: "Dokumentenextraktion mit ML" },
    ],
  },
  {
    id: "engineering",
    name: { en: "Engineering", de: "Softwareentwicklung" },
    items: ["Python", "SQL", "TypeScript, JavaScript", "React", "COBOL", "C/C++", "FastAPI", "Flask", "Django", "Node.js"],
  },
  {
    id: "cloud",
    name: { en: "Cloud and DevOps", de: "Cloud und DevOps" },
    items: [
      { en: `Azure (AZ-104 ${examStatus(az104, "en")})`, de: `Azure (AZ-104 ${examStatus(az104, "de")})` },
      "Docker",
      "Terraform",
      "Ansible",
      "GitHub Actions",
      "GitLab CI",
      { en: "Git workflows", de: "Git-Workflows" },
      "PyTest",
      "Vitest",
      "Playwright",
    ],
  },
  {
    id: "data",
    name: { en: "Data", de: "Daten" },
    items: ["PostgreSQL", "MySQL", "MongoDB", "Tableau", "Streamlit"],
  },
  {
    id: "transformation",
    name: { en: "Transformation and delivery", de: "Transformation und Umsetzung" },
    items: [
      { en: "AI and innovation use-case scoping", de: "Zuschnitt von KI- und Innovations-Use-Cases" },
      { en: "Innovation governance and KPIs", de: "Innovations-Governance und KPIs" },
      { en: "Business model innovation", de: "Geschäftsmodellinnovation" },
      { en: "Design thinking and design sprints", de: "Design Thinking und Design Sprints" },
      { en: "Stakeholder workshops", de: "Stakeholder-Workshops" },
      { en: "Agile delivery", de: "Agile Umsetzung" },
    ],
  },
];
