/**
 * Explainer video scripts. A script is a list of scenes. Each scene puts elements on the stage, and
 * the narrator reads its lines; each line can show, highlight or hide elements as it is spoken. The
 * build (video/build.ts) voices every line, so all timing comes from the narration, then renders
 * the frames, captions and thumbnail. Scripts live in src/content/<course>/videos/<lesson>.ts.
 *
 * Elements are addressed by id; a part of an element by "id.part": a line, bullet or table row by
 * its index ("steps.0"), a triangle's sides and angles by name ("tri.opp"). Showing an element
 * shows all of it; showing a part shows the element with just that part, so a list of parts can be
 * revealed one at a time.
 */

/** Colours with a fixed meaning in every video (trigonometry uses the first four). */
export type Tone = 'theta' | 'opp' | 'adj' | 'hyp' | 'brand' | 'good' | 'bad';

export interface TitleEl {
  kind: 'title';
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
}

/** A paragraph of Markdown with $inline maths$. */
export interface TextEl {
  kind: 'text';
  id: string;
  md: string;
  size?: 'xl' | 'lg' | 'md';
  align?: 'left' | 'center';
}

/** Display maths, one line per step. */
export interface MathEl {
  kind: 'math';
  id: string;
  lines: string[];
  size?: 'xl' | 'lg' | 'md';
  align?: 'left' | 'center';
}

export interface BulletsEl {
  kind: 'bullets';
  id: string;
  items: string[];
  /** Ticks instead of dots (for summaries). */
  check?: boolean;
}

export interface CalloutEl {
  kind: 'callout';
  id: string;
  tone: 'definition' | 'mistake' | 'tip' | 'key';
  title: string;
  md: string;
}

export interface TableEl {
  kind: 'table';
  id: string;
  head: string[];
  rows: string[][];
}

/** The parts of a right triangle, named from the angle θ. */
export type TriPart = 'theta' | 'other' | 'opp' | 'adj' | 'hyp';

/**
 * A right triangle with θ at the bottom left, the right angle at the bottom right and the other
 * angle at the top. Parts: shape, theta, other, opp, adj, hyp.
 */
export interface TriangleEl {
  kind: 'triangle';
  id: string;
  /** Lengths used for drawing (adjacent along the bottom, opposite up the right side). */
  adj: number;
  opp: number;
  /** TeX labels for the sides and angles. */
  labels?: Partial<Record<TriPart, string>>;
  /** Vertex names: [θ vertex, right-angle vertex, other vertex]. */
  vertices?: [string, string, string];
  /** Draw the triangle in a setting: a ramp, a tree, a ladder against a wall, a building. */
  setting?: 'ramp' | 'tree' | 'ladder' | 'building';
  /** Reflect left to right, so θ is at the bottom right. */
  mirror?: boolean;
}

/** Similar right triangles side by side, all with the same angle θ. Parts: "0", "1", "2"… */
export interface SimilarEl {
  kind: 'similar';
  id: string;
  /** θ in degrees. */
  angle: number;
  /** The adjacent side of each triangle. */
  sizes: number[];
  /** Decimal places for the side labels. */
  decimals?: number;
}

/** A calculator screen: the keys are typed out, then the result appears. */
export interface CalcEl {
  kind: 'calc';
  id: string;
  keys: string;
  result: string;
}

/**
 * "Your turn": a question the viewer tries while the video counts down. In EduCore the player
 * pauses here and asks the question; the answer is shown with the part "answer".
 */
export interface TryEl {
  kind: 'try';
  id: string;
  prompt: string;
  choices?: string[];
  /** The correct choice (its index) or the answer as text. */
  answer: number | string;
  /** How the answer is worked out, shown with "answer". */
  working?: string;
}

export type El = TitleEl | TextEl | MathEl | BulletsEl | CalloutEl | TableEl | TriangleEl | SimilarEl | CalcEl | TryEl;

export interface Line {
  /** What the narrator says, written as it should be spoken. */
  say: string;
  /** The caption, when it should read differently from what is said. */
  caption?: string;
  show?: string | string[];
  hide?: string | string[];
  /**
   * Emphasise parts ("tri.opp"); the parts listed for an element replace its earlier emphasis,
   * and the element id alone ("tri") clears it.
   */
  focus?: string | string[];
  /** Extra seconds after the line, for example while a "Your turn" counts down. */
  wait?: number;
}

export interface Scene {
  /** Starts a chapter (shown at the top and listed in the YouTube description). */
  chapter?: string;
  /** center: one column; split: a figure on the left and text on the right. */
  layout: 'center' | 'split';
  main?: El[];
  left?: El[];
  right?: El[];
  lines: Line[];
}

export interface Explainer {
  /** The video's id, also its file name: the lesson id, with "-b", "-c"… for further videos. */
  id: string;
  lessonId: string;
  title: string;
  /** A shorter title for the thumbnail, when the title is long. */
  thumbnailTitle?: string;
  /** One or two sentences for the YouTube description. */
  summary: string;
  scenes: Scene[];
}

export const asList = (v: string | string[] | undefined): string[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/** Every element of a scene. */
export const sceneElements = (s: Scene): El[] => [...(s.main ?? []), ...(s.left ?? []), ...(s.right ?? [])];

/** Problems with a script: unknown ids, repeated ids, empty lines. Empty when it is fine. */
export function checkScript(x: Explainer): string[] {
  const problems: string[] = [];
  if (!x.scenes.length) problems.push('The script has no scenes.');
  x.scenes.forEach((s, si) => {
    const ids = new Set<string>();
    for (const e of sceneElements(s)) {
      if (ids.has(e.id)) problems.push(`Scene ${si + 1}: the id "${e.id}" is used twice.`);
      ids.add(e.id);
    }
    if (!s.lines.length) problems.push(`Scene ${si + 1} has no lines.`);
    s.lines.forEach((l, li) => {
      if (!l.say.trim()) problems.push(`Scene ${si + 1}, line ${li + 1} says nothing.`);
      for (const target of [...asList(l.show), ...asList(l.hide), ...asList(l.focus)]) {
        if (!ids.has(target.split('.')[0])) problems.push(`Scene ${si + 1}, line ${li + 1}: no element "${target}".`);
      }
    });
  });
  return problems;
}

const TONE_MACRO = /\\(opp|adj|hyp|thc|brand|good|bad)\{/g;

/**
 * Script text as plain lesson Markdown, for showing a video's questions in the app: tones become
 * bold and the colour macros are dropped (the video's colours are for its dark stage).
 */
export function plainMarkdown(md: string): string {
  return md.replace(/\[\[\w+:([^\]]+)\]\]/g, '**$1**').replace(TONE_MACRO, '{');
}
