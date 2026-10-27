// Lays out the career piano roll at build time, so the page needs no JavaScript to draw it.
//
// Time runs from January 2017 to the build date (the playhead). Each track stacks overlapping notes
// into lanes, like a chord. The two hands mirror each other: innovation and leadership above the
// middle, engineering below it, lane 0 next to the middle, and notes that belong to both hands on
// the middle line itself.
import { buildDate, nowMonth, t, toMonth, type Lang } from "../data/i18n";
import { timeline, type Entry, type Kind, type Track } from "../data/timeline";

export const firstYear = 2017;
const first = toMonth(`${firstYear}-01`);
/** The playhead, in months, at the build date. */
const playhead = nowMonth + (buildDate.getDate() - 1) / 31;
const span = playhead - first;

/** Horizontal roll: the plot width the labels are fitted to. The roll never gets narrower than this. */
export const H_PLOT = 760;
/** The top-left corner of the leadership lanes, as a fraction of the axis, holds Play on wide screens. */
const TRANSPORT = 0.25;
/** Room after the playhead for the labels of notes that are still sounding. */
export const H_AFTER = 104;
/** Vertical roll (phones): pixels per month, and the narrowest label column it is fitted to. */
export const V_MONTH = 5.6;
export const V_LABEL_MIN = 92;
export const V_LINE = 15;

export type HLabel = "inside" | "right" | "left" | "after" | "none";

export interface Note {
  entry: Entry;
  /** Position in time order, for the arrow keys. */
  order: number;
  track: Track;
  lane: number;
  ongoing: boolean;
  /** Start and width as fractions of the time axis (0 is January 2017, 1 is the playhead). */
  x: number;
  w: number;
  hLabel: HLabel;
  /** Vertical roll: where the label sits (px from the top) and how many lines it wraps to. */
  vLabelY: number;
  vLines: number;
}

export interface Roll {
  notes: Note[];
  lanes: Record<Track, number>;
  years: { year: number; x: number }[];
  /** Length of the time axis in months, January 2017 to the playhead. */
  months: number;
  /** Height of the vertical roll's plot, in px. */
  vHeight: number;
}

const kindRank: Record<Kind, number> = { work: 0, education: 1, volunteer: 2, project: 3 };

/**
 * Rough width of a label in px at 13px IBM Plex Sans (12px on the vertical roll). It errs wide, so
 * a label that doesn't quite fit moves outside its note instead of being clipped.
 */
function textWidth(text: string, size = 13): number {
  let em = 0;
  for (const ch of text) {
    if (ch === " ") em += 0.27;
    else if (/[.,:;'’!|i]/.test(ch)) em += 0.3;
    else if (/[A-Z]/.test(ch)) em += 0.66;
    else if (/[0-9]/.test(ch)) em += 0.58;
    else if (/[mw]/.test(ch)) em += 0.84;
    else em += 0.55;
  }
  return em * size;
}

export function layoutRoll(lang: Lang): Roll {
  const entries = timeline.filter((e) => e.roll !== false && e.start && e.end);

  // Lanes: main roles claim lane 0 of their track first, then education, volunteering and projects.
  const lanes: Record<Track, number> = { eng: 0, lead: 0, both: 0 };
  const laneSpans: Record<Track, [number, number][][]> = { eng: [], lead: [], both: [] };
  const placed = new Map<string, number>();
  const byPriority = [...entries].sort(
    (a, b) => kindRank[a.kind] - kindRank[b.kind] || toMonth(a.start!) - toMonth(b.start!),
  );
  for (const e of byPriority) {
    const start = toMonth(e.start!);
    // A note's span ends where its last month starts, so back-to-back posts share a lane.
    const end = e.end === "now" ? playhead : toMonth(e.end!);
    const spans = laneSpans[e.track];
    let lane = spans.findIndex((taken) => taken.every(([s, f]) => end <= s || start >= f));
    if (lane === -1) lane = spans.push([]) - 1;
    spans[lane].push([start, end]);
    placed.set(e.id, lane);
    lanes[e.track] = Math.max(lanes[e.track], lane + 1);
  }

  const inTime = [...entries].sort((a, b) => toMonth(a.start!) - toMonth(b.start!) || a.id.localeCompare(b.id));
  const notes: Note[] = inTime.map((entry, order) => {
    const start = toMonth(entry.start!);
    const end = entry.end === "now" ? playhead : toMonth(entry.end!);
    return {
      entry,
      order,
      track: entry.track,
      lane: placed.get(entry.id)!,
      ongoing: entry.end === "now",
      x: (start - first) / span,
      w: Math.max(end - start, 0.6) / span,
      hLabel: "none",
      vLabelY: 0,
      vLines: 1,
    };
  });

  placeHorizontalLabels(notes, lang);
  placeVerticalLabels(notes, lang);

  const years = [];
  for (let year = firstYear; toMonth(`${year}-01`) <= playhead; year++) {
    years.push({ year, x: (toMonth(`${year}-01`) - first) / span });
  }
  return { notes, lanes, years, months: span, vHeight: Math.round(span * V_MONTH) };
}

/** Puts each label inside its note when it fits, else beside it, else leaves it to the popover. */
function placeHorizontalLabels(notes: Note[], lang: Lang) {
  const rows = new Map<string, Note[]>();
  for (const n of notes) {
    const key = `${n.track}:${n.lane}`;
    rows.set(key, [...(rows.get(key) ?? []), n]);
  }
  const gap = 8;
  for (const row of rows.values()) {
    // Occupied stretches of the row, in px: the notes first, then each label as it is placed.
    const taken: { from: number; to: number; owner: Note }[] = row.map((n) => ({
      from: n.x * H_PLOT,
      to: (n.x + n.w) * H_PLOT,
      owner: n,
    }));
    // A label may touch its own note, but must keep `gap` from everything else in the row, and
    // leadership labels stay out of the corner that holds Play.
    const start = row[0].track === "lead" ? TRANSPORT * H_PLOT : 0;
    const free = (a: number, b: number, self: Note) =>
      a >= start && b <= H_PLOT && taken.every(({ from, to, owner }) => owner === self || b + gap <= from || a >= to + gap);
    for (const n of row) {
      const width = textWidth(t(n.entry.label, lang)) + 16;
      const [s, e] = [n.x * H_PLOT, (n.x + n.w) * H_PLOT];
      if (width <= e - s) n.hLabel = "inside";
      else if (n.ongoing) n.hLabel = "after";
      else if (free(e, e + width, n)) {
        n.hLabel = "right";
        taken.push({ from: e, to: e + width, owner: n });
      } else if (free(s - width, s, n)) {
        n.hLabel = "left";
        taken.push({ from: s - width, to: s, owner: n });
      }
    }
  }
}

/**
 * Phones: notes fall toward "now" at the bottom, and each label sits beside its note, pushed down
 * when the label above it in the same column is still in the way.
 */
function placeVerticalLabels(notes: Note[], lang: Lang) {
  // The middle notes label on the leadership side, which is empty in recent years.
  const columns: Record<"eng" | "lead", Note[]> = { eng: [], lead: [] };
  for (const n of notes) columns[n.track === "eng" ? "eng" : "lead"].push(n);
  const height = span * V_MONTH;
  for (const column of Object.values(columns)) {
    let bottom = -Infinity;
    for (const n of column) {
      n.vLines = Math.ceil(textWidth(t(n.entry.label, lang), 12) / V_LABEL_MIN);
      n.vLabelY = Math.max(n.x * height, bottom + 3);
      bottom = n.vLabelY + n.vLines * V_LINE;
    }
    // Labels pushed past "now" climb back up, and push the ones above them up in turn.
    let limit = height;
    for (const n of [...column].reverse()) {
      n.vLabelY = Math.round(Math.min(n.vLabelY, limit - n.vLines * V_LINE));
      limit = n.vLabelY - 3;
    }
  }
}
