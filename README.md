# gehlot.site

Kunal Gehlot's website and CV, live at [gehlot.site](https://gehlot.site). A static
[Astro](https://astro.build) site in English and German. The CV PDFs are rendered from the same data
on every build, so the site and the CV never disagree.

## Where things live

| Path                     | What                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `site/src/data/`         | All content: profile, roles and projects (`timeline.ts`), case studies, skills, the story |
| `site/src/components/`   | The pages' building blocks; `PianoRoll.astro` is the career roll on the home page         |
| `site/src/lib/cv.ts`     | Writes the CV as LaTeX from the data, and the checks that stop a bad CV from shipping     |
| `site/cv/`               | The CV template (Deedy, Apache-2.0), its fonts (Lato and Raleway, OFL) and the photo      |
| `site/scripts/`          | `render-cv.mjs` compiles the CVs with Tectonic after the site is built                    |
| `site/public/`           | Served as is: `CNAME`, `robots.txt`, the ZAB certificate, book covers, share images        |

## Editing

Change a fact once, in `site/src/data/`, and the next build updates the pages and both CVs. A
timeline entry's `cv.bullets` picks which bullets the CV prints, and in what order. CV PDFs are
build output: never commit them (`zab.pdf` is the only PDF in `site/public/cv/`).

The build fails when a CV runs past two A4 pages, shows a `TODO`, spells Ehrhardt wrong, shows
AZ-104 as passed before it is, or when the English and German CVs list different entries.

The share images in `site/public/img/og/` are screenshots of the home page's headline and roll.
Take them again when either changes.

## Commands

Run them from `site/`. The build needs [Tectonic](https://tectonic-typesetting.github.io)
(`brew install tectonic`).

```sh
pnpm install   # dependencies
pnpm dev       # dev server on http://localhost:4321
pnpm cv        # build, and copy the CV PDFs into public/cv/ for the dev server
pnpm build     # the site and the CV PDFs, into dist/
pnpm preview   # serve the build
```

## Publishing

A push to `main` runs `.github/workflows/deploy.yml`: it installs a pinned Tectonic, builds, and
publishes to GitHub Pages. If a CV check fails, nothing is published.

## Licence

All rights reserved; see `LICENSE`. The CV template keeps its Apache-2.0 licence
(`site/cv/LICENSE-deedy-resume`), and the fonts keep theirs (OFL).
