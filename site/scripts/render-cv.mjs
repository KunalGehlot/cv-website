// Renders the CV PDFs after `astro build`: compiles dist/cv/cv-<lang>.tex (written from src/data by
// src/pages/cv/) with Tectonic next to the template in cv/, checks the page count, and leaves only
// the PDFs in dist/cv/. With --public it also copies them into public/cv/ for the dev server.
//
// Needs Tectonic on the PATH (brew install tectonic; CI installs it in the deploy workflow).
import { execFileSync } from "node:child_process";
import { copyFileSync, cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const maxPages = 2;
const toPublic = process.argv.includes("--public");

for (const lang of ["en", "de"]) {
  const source = `dist/cv/cv-${lang}.tex`;
  const work = mkdtempSync(join(tmpdir(), `cv-${lang}-`));
  try {
    cpSync("cv", work, { recursive: true });
    writeFileSync(join(work, "cv.tex"), readFileSync(source));
    execFileSync("tectonic", ["--keep-logs", "--chatter", "minimal", "cv.tex"], { cwd: work, stdio: ["ignore", "ignore", "inherit"] });

    const log = readFileSync(join(work, "cv.log"), "utf8");
    const pages = Number(/Output written on cv\.\w+ \((\d+) pages?/.exec(log)?.[1]);
    if (!(pages >= 1 && pages <= maxPages)) throw new Error(`CV (${lang}): ${pages || "no"} pages, at most ${maxPages} allowed`);

    copyFileSync(join(work, "cv.pdf"), `dist/cv/cv-${lang}.pdf`);
    if (toPublic) copyFileSync(join(work, "cv.pdf"), `public/cv/cv-${lang}.pdf`);
    rmSync(source);
    console.log(`CV (${lang}): ${pages} pages`);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}
