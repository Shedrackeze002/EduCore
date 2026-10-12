/**
 * Slides for present mode, built from a lesson's blocks.
 *
 * Every block gets a key from its content, so a teacher's choice to hide a block survives
 * changes elsewhere in the lesson; if the block itself is edited it gets a new key and shows
 * again, which errs on the side of students seeing the content.
 *
 * With step-by-step reveal on, each press of Next shows one more block, and a worked example
 * shows its steps and answer one at a time before the next block appears.
 */
import type { Block, LessonContent } from '@/content/lessonParser.ts';

export interface SlideBlock {
  key: string;
  block: Block;
}

export interface Slide {
  id: string;
  kind: 'title' | 'content' | 'video';
  title: string;
  blocks: SlideBlock[];
}

/** FNV-1a, enough to tell lesson blocks apart. */
export function hashText(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

function keyer() {
  const seen = new Map<string, number>();
  return (b: Block): SlideBlock => {
    const base = `${b.type}-${hashText(JSON.stringify(b))}`;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return { key: n === 1 ? base : `${base}-${n}`, block: b };
  };
}

export interface SlideVideo {
  id: string;
  url: string;
  title: string;
}

export function buildSlides(content: LessonContent, lessonTitle: string, videos: SlideVideo[] = []): Slide[] {
  const key = keyer();
  const slides: Slide[] = [{ id: 'title', kind: 'title', title: lessonTitle, blocks: content.intro.map(key) }];
  content.sections.forEach((s, si) => {
    // Split long sections so each slide stays readable: break before worked examples and checks.
    let cur: SlideBlock[] = [];
    let part = 0;
    const push = () => {
      if (cur.length) {
        slides.push({ id: `s${si}-${part}`, kind: 'content', title: part ? `${s.title} (cont.)` : s.title, blocks: cur });
        part++;
      }
      cur = [];
    };
    for (const b of s.blocks) {
      const big = b.type === 'example' || b.type === 'check';
      if (big && cur.length) push();
      cur.push(key(b));
      if (big) push();
    }
    push();
  });
  for (const v of videos) slides.push({ id: `video-${v.id}`, kind: 'video', title: v.title, blocks: [{ key: `res-${v.id}`, block: { type: 'video', url: v.url } }] });
  return slides;
}

/** The slides to present: hidden blocks removed, and slides left with nothing to show dropped. */
export function presentedSlides(slides: Slide[], hidden: ReadonlySet<string>): Slide[] {
  if (!hidden.size) return slides;
  return slides
    .map((s) => ({ ...s, blocks: s.blocks.filter((b) => !hidden.has(b.key)) }))
    .filter((s) => s.kind === 'title' || s.blocks.length > 0);
}

/** How many presses a block takes: one to appear, plus one per worked-example step and answer. */
export function revealUnits(b: Block): number {
  return b.type === 'example' ? 1 + b.steps.length + (b.answer ? 1 : 0) : 1;
}

/** The title slide starts with only its title and goals; other slides start with their first block. */
const freeUnits = (s: Slide) => (s.kind === 'title' ? 0 : 1);

/** The last step of a slide (0 when the slide has nothing more to reveal). */
export function lastStep(s: Slide): number {
  const units = s.blocks.reduce((n, b) => n + revealUnits(b.block), 0);
  return Math.max(0, units - freeUnits(s));
}

export interface BlockReveal {
  visible: boolean;
  /** Worked-example steps shown (the answer counts as one more). */
  shown: number;
}

export function revealAt(s: Slide, step: number): BlockReveal[] {
  let budget = step + freeUnits(s);
  return s.blocks.map(({ block }) => {
    if (budget <= 0) return { visible: false, shown: 0 };
    budget -= 1;
    if (block.type !== 'example') return { visible: true, shown: 0 };
    const shown = Math.min(budget, revealUnits(block) - 1);
    budget -= shown;
    return { visible: true, shown };
  });
}

/** The step at which block `index` is showing exactly `shown` of its example steps. */
export function stepFor(s: Slide, index: number, shown: number): number {
  let units = 0;
  for (let i = 0; i < index; i++) units += revealUnits(s.blocks[i].block);
  return Math.max(0, units + 1 + shown - freeUnits(s));
}
