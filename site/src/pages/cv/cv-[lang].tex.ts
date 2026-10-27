// The CV's LaTeX source, one file per language. scripts/render-cv.mjs compiles it to the PDF after
// the build and removes it from the output.
import type { APIRoute } from "astro";
import { langs, type Lang } from "../../data/i18n";
import { checkCv } from "../../lib/cv";

export const getStaticPaths = () => langs.map((lang) => ({ params: { lang } }));

export const GET: APIRoute = ({ params }) =>
  new Response(checkCv()[params.lang as Lang], { headers: { "Content-Type": "application/x-tex; charset=utf-8" } });
