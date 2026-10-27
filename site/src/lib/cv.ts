// Writes the CV as LaTeX for the Deedy template in cv/, from the same data as the site. The build
// emits it as /cv/cv-<lang>.tex (src/pages/cv/) and scripts/render-cv.mjs turns it into the PDF.
//
// checkCv() is the gate: a CV with a visible TODO, the misspelt "Erhardt", AZ-104 shown as passed
// before it is, or English and German that don't match in shape fails the build.
import { az104, credentials, examStatus } from "../data/credentials";
import { formatRange, langs, t, type Lang } from "../data/i18n";
import { profile } from "../data/profile";
import { skills } from "../data/skills";
import { dated, entry, type Entry } from "../data/timeline";

const words = {
  en: {
    mail: "Mail",
    address: "Address",
    licence: "Licence",
    born: "D.O.B.",
    links: "Links",
    education: "Education",
    grade: "Grade",
    skills: "Skills",
    languages: "Languages",
    profile: "Profile",
    experience: "Work Experience",
    projects: "Projects",
    credentials: "Certificates and Awards",
    leadership: "Leadership and Volunteering",
  },
  de: {
    mail: "Mail",
    address: "Adresse",
    licence: "Führerschein",
    born: "Geburtsdatum",
    links: "Links",
    education: "Ausbildung",
    grade: "Note",
    skills: "Kenntnisse",
    languages: "Sprachen",
    profile: "Profil",
    experience: "Berufserfahrung",
    projects: "Projekte",
    credentials: "Zertifikate und Auszeichnungen",
    leadership: "Engagement und Führung",
  },
} satisfies Record<Lang, Record<string, string>>;

/** The projects on the CV, in this order. */
const projects = ["opentiles", "thesis", "infineon"];

/** LaTeX-safe text. Lato has no rupee sign, so amounts in rupees are written out. */
function esc(text: string): string {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/[&%$#_{}]/g, (c) => `\\${c}`)
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/₹\s?([\d.,]+)/g, "INR $1")
    .replace(/([\d.,]+)\s?₹/g, "$1 INR");
}

const href = (url: string, text: string) => `\\href{${url}}{${esc(text)}}`;

/** A role or project: heading, descriptor, dates and place, then the bullets the CV picks. */
function role(e: Entry, lang: Lang, heading: string, descriptor: string) {
  const place = e.place ? ` | ${esc(t(e.place, lang))}` : "";
  const picked = e.cv?.bullets ? e.cv.bullets.map((id) => e.bullets!.find((b) => b.id === id)!) : (e.bullets ?? []);
  const bullets = picked.map((b) => `- ${esc(t(b.text, lang))}`).join(" \\\\\n");
  return [
    `\\runsubsection{${esc(heading)}}`,
    `\\descript{| ${esc(descriptor)}}`,
    `\\location{${esc(formatRange(e.start!, e.end!, lang))}${place}}`,
    bullets,
    "\\sectionsep",
  ].join("\n");
}

function cvTex(lang: Lang): string {
  const w = words[lang];
  const p = profile.cvPersonal;
  const personal = [
    [w.mail, href(`mailto:${profile.email}`, profile.email)],
    [w.address, esc(p.city)],
    [w.licence, esc(t(p.drivingLicence, lang))],
    [w.born, esc(p.dateOfBirth)],
  ]
    .map(([k, v]) => `${esc(k)}: & ${v} \\\\`)
    .join("\n");

  const education = dated("education")
    .map((e) =>
      [
        `\\subsection{${esc(t(e.title, lang))}}`,
        `\\textit{${esc(t(e.org, lang))}} \\\\`,
        `\\location{${esc(formatRange(e.start, e.end, lang))}}`,
        e.cv?.grade ? `\\textit{${w.grade}: ${esc(lang === "de" ? e.cv.grade.replace(".", ",") : e.cv.grade)}} \\\\` : "",
        e.id === "mba" ? `\\faTrophy\\hspace{2pt}\\textbf{Entrepreneurial Mindset Scholarship} \\\\` : "",
        e.cv?.reference ? `\\textit{${href(e.cv.reference.href, e.cv.reference.text)}} \\\\` : "",
        "\\sectionsep",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

  const skillGroups = skills
    .map((g) => `\\subsection{${esc(t(g.name, lang))}}\n${g.items.map((i) => esc(t(i, lang))).join(" \\textbullet{} ")}\n\\vspace{5pt}`)
    .join("\n\n");

  const languages = profile.languages.map((l) => `\\textbullet{} ${esc(t(l.name, lang))} | \\textit{${l.level}}`).join(" \\\\\n");

  const experience = dated("work")
    .map((e) => role(e, lang, t(e.org, lang), t(e.title, lang)))
    .join("\n\n");

  const projectBlocks = projects
    .map((id) => {
      const e = entry(id);
      return role(e, lang, t(e.title, lang), t(e.org, lang));
    })
    .join("\n\n");

  const certs = credentials
    .map((c) => {
      const when = examStatus(c, lang) ?? (c.date ? c.date.slice(0, 4) : undefined);
      const name = c.credentialUrl ? href(c.credentialUrl, t(c.name, lang)) : esc(t(c.name, lang));
      return `\\textbullet{} ${name}${c.issuer ? `, ${esc(c.issuer)}` : ""}${when ? `, ${esc(when)}` : ""} \\\\[2pt]`;
    })
    .join("\n");

  const leadership = dated("volunteer")
    .map((e) => {
      const place = e.place ? ` | ${esc(t(e.place, lang))}` : "";
      return [
        `\\runsubsection{${esc(t(e.org, lang))}}`,
        `\\descript{| ${esc(t(e.title, lang))}}`,
        `\\location{${esc(formatRange(e.start, e.end, lang))}${place}}`,
        e.bullets ? esc(t(e.bullets[0].text, lang)) : "",
        "\\sectionsep",
      ].join("\n");
    })
    .join("\n\n");

  return `% Generated from src/data by src/lib/cv.ts. Edit the data, not this file.
\\documentclass[10pt,a4paper]{deedy-resume-openfont}
\\usepackage{fancyhdr}
\\usepackage{geometry}
\\usepackage{fontawesome}
\\usepackage{graphicx}
\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\geometry{top=8mm, bottom=8mm}
% Narrow columns read better ragged than hyphenated, headings included.
\\hyphenpenalty=10000
\\exhyphenpenalty=10000
\\titleformat{\\subsection}{\\color{subheadings}\\fontspec[Path = fonts/lato/]{Lato-Bol}\\fontsize{10pt}{11pt}\\selectfont\\bfseries\\raggedright\\uppercase}{}{0em}{}
\\hypersetup{pdftitle={${esc(profile.name)}, CV}, pdfauthor={${esc(profile.name)}}, pdflang={${lang}}}
\\newcommand{\\photo}[1]{\\begin{textblock}{25}(166,5)\\centering\\includegraphics[height=3.4cm,keepaspectratio]{#1}\\end{textblock}}

\\begin{document}
\\photo{photo.jpg}
\\begin{flushleft}

% The details sit in a box as tall as the photo beside them, so the divider always runs below the
% photo.
\\namesection{${esc(profile.givenName)}}{${esc(profile.familyName)}}{
\\parbox[t][22mm][t]{0.7\\textwidth}{\\vspace{4pt}
\\begin{tabular}{@{}l@{\\hspace{5mm}}l@{}}
${personal}
\\end{tabular}}
}

\\begin{minipage}[t]{0.3\\textwidth}
\\raggedright
\\vspace{10pt}
\\section{${w.links}}
Website://  ${href(profile.site, "gehlot.site")} \\\\
LinkedIn://  ${href(profile.linkedin.url, profile.linkedin.handle)} \\\\
GitHub://  ${href(profile.github.url, profile.github.handle)} \\\\
\\sectionsep

\\section{${w.skills}}
${skillGroups}

\\section{${w.education}}
${education}
\\end{minipage}
\\hspace{0.5cm}
\\begin{minipage}[t]{0.66\\textwidth}
\\raggedright
\\vspace{10pt}
\\section{${w.profile}}
\\textbf{${esc(t(profile.summary, lang))}}
\\sectionsep

\\section{${w.experience}}
${experience}
\\end{minipage}

\\newpage
\\begin{minipage}[t]{0.3\\textwidth}
\\raggedright
\\vspace{10pt}
\\section{${w.languages}}
${languages}
\\sectionsep

\\section{${w.credentials}}
${certs}
\\end{minipage}
\\hspace{0.5cm}
\\begin{minipage}[t]{0.66\\textwidth}
\\raggedright
\\vspace{10pt}
\\section{${w.projects}}
${projectBlocks}

\\section{${w.leadership}}
${leadership}
\\end{minipage}

\\end{flushleft}
\\end{document}
`;
}

/** The shape of a CV, to compare the two languages. */
const shape = (tex: string) =>
  ["\\section{", "\\subsection{", "\\runsubsection{", "\n- ", "\\textbullet{}"].map((m) => tex.split(m).length - 1).join(",");

/** Fails the build when a CV must not be published. */
export function checkCv(): Record<Lang, string> {
  const out = Object.fromEntries(langs.map((l) => [l, cvTex(l)])) as Record<Lang, string>;
  for (const lang of langs) {
    const tex = out[lang];
    if (/TODO/i.test(tex)) throw new Error(`CV (${lang}): contains a TODO`);
    if (/Erhardt/.test(tex)) throw new Error(`CV (${lang}): "Erhardt" should be "Ehrhardt"`);
    if (az104.status !== "passed" && /AZ-104[^\n]*(certified|zertifiziert)/i.test(tex)) {
      throw new Error(`CV (${lang}): AZ-104 shown as passed, but its status is "${az104.status}"`);
    }
  }
  if (shape(out.en) !== shape(out.de)) throw new Error(`CV: English and German differ (${shape(out.en)} vs ${shape(out.de)})`);
  return out;
}
