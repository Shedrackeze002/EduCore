/**
 * Text for the video stage: Markdown with $inline maths$, and [[tone:words]] to colour words with
 * the fixed video colours (for example [[opp:opposite]]). In maths, \opp{…}, \adj{…}, \hyp{…},
 * \thc{…} (θ), \brand{…}, \good{…} and \bad{…} do the same.
 */
import katex from 'katex';
import { marked } from 'marked';

export const TONES = {
  theta: '#FFD166',
  opp: '#FF8A4C',
  adj: '#4DA3FF',
  hyp: '#F472B6',
  brand: '#A78BFA',
  good: '#34D399',
  bad: '#F87171',
} as const;

// "##" is a literal "#" inside a KaTeX macro (a single "#" starts an argument).
const color = (hex: string) => `\\textcolor{##${hex.slice(1)}}{#1}`;
const MACROS: Record<string, string> = {
  '\\opp': color(TONES.opp),
  '\\adj': color(TONES.adj),
  '\\hyp': color(TONES.hyp),
  '\\thc': color(TONES.theta),
  '\\brand': color(TONES.brand),
  '\\good': color(TONES.good),
  '\\bad': color(TONES.bad),
};

const cache = new Map<string, string>();

export function tex(src: string, display = false): string {
  const key = `${display ? 'D' : 'I'}:${src}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  const html = katex.renderToString(src, { displayMode: display, throwOnError: true, strict: 'ignore', output: 'html', macros: { ...MACROS } });
  cache.set(key, html);
  return html;
}

/** Inline Markdown with maths and tones. */
export function rich(md: string): string {
  const key = `R:${md}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  const maths: string[] = [];
  let src = md.replace(/\$([^$\n]+?)\$/g, (_, t: string) => {
    maths.push(tex(t.trim()));
    return `\u0000M${maths.length - 1}\u0000`;
  });
  src = src.replace(/\[\[(\w+):([^\]]+)\]\]/g, (_, tone: string, words: string) => {
    if (!(tone in TONES)) throw new Error(`Unknown tone "${tone}" in "${md}".`);
    return `<span class="tone-${tone}">${words}</span>`;
  });
  const html = (marked.parseInline(src) as string).replace(/\u0000M(\d+)\u0000/g, (_, i: string) => maths[Number(i)]);
  cache.set(key, html);
  return html;
}
