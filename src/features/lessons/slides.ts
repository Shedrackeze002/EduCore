/**
 * The slide deck for present mode, built from a lesson's blocks.
 *
 * Every lesson block appears on a slide: lessons stay complete and the teacher hides what they
 * do not want. Blocks get keys from their content, so a teacher's choice to hide one survives
 * edits elsewhere in the lesson; if the block itself is edited it gets a new key and shows
 * again, which errs on the side of students seeing the content.
 *
 * Text is split into paragraphs and list items so a slide builds point by point, the way a
 * teacher reveals a PowerPoint slide; a worked example builds one step at a time.
 */
import type { Block, LessonContent } from '@/content/lessonParser.ts';
import { skillInfo } from '@engine/curriculum/index.ts';

export type SlideKind = 'title' | 'hook' | 'content' | 'example' | 'check' | 'summary' | 'video' | 'link' | 'questions' | 'end';

export interface SlideItem {
  /** Unique within the deck. */
  key: string;
  /** The lesson block this item comes from (what "hide" acts on). */
  blockKey: string;
  block: Block;
}

export interface Slide {
  id: string;
  kind: SlideKind;
  title: string;
  /** The lesson section this slide belongs to (1-based), with the section count and its title. */
  part?: { n: number; of: number; first: boolean; title: string };
  items: SlideItem[];
  /** A link resource shown as an embedded activity. */
  url?: string;
  /** The lesson's explainer video this slide plays. */
  explainer?: SlideExplainer;
}

/** One part of a lesson's explainer video, for its slide in present mode. */
export interface SlideExplainer {
  id: string;
  title: string;
  /** Seconds. */
  duration: number;
  /** Chapter titles, in order. */
  chapters: string[];
  /** Which part this is (1-based), of how many. */
  part: number;
  parts: number;
  /** The video on YouTube; a part that is not uploaded yet keeps its place but has no slide. */
  youtubeId?: string;
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

/**
 * Splits Markdown into the pieces a slide reveals one at a time: paragraphs, list items,
 * tables and display maths stay whole.
 */
export function splitMarkdown(md: string): string[] {
  const paras: string[] = [];
  let cur: string[] = [];
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  for (const line of lines) {
    if (line.trim() === '') {
      if (cur.length) paras.push(cur.join('\n'));
      cur = [];
    } else cur.push(line);
  }
  if (cur.length) paras.push(cur.join('\n'));
  // Display maths with a blank line inside it belongs to one piece.
  const merged: string[] = [];
  for (const p of paras) {
    const last = merged[merged.length - 1];
    if (last !== undefined && (last.match(/\$\$/g)?.length ?? 0) % 2 === 1) merged[merged.length - 1] = `${last}\n\n${p}`;
    else merged.push(p);
  }
  const out: string[] = [];
  const item = /^(\s{0,3})([-*+]|\d+[.)])\s+/;
  for (const p of merged) {
    const ls = p.split('\n');
    if (!item.test(ls[0]) || /^\s*\|/.test(ls[0])) {
      out.push(p);
      continue;
    }
    // A list: one piece per top-level item, with its continuation lines.
    let it: string[] = [];
    for (const l of ls) {
      const m = item.exec(l);
      if (m && m[1].length === 0 && it.length) {
        out.push(it.join('\n'));
        it = [];
      }
      it.push(l);
    }
    if (it.length) out.push(it.join('\n'));
  }
  return out;
}

function keyer() {
  const seen = new Map<string, number>();
  return (b: Block): string => {
    const base = `${b.type}-${hashText(JSON.stringify(b))}`;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };
}

/** The pieces of one block: Markdown splits into paragraphs and list items. */
function itemsOf(block: Block, blockKey: string): SlideItem[] {
  if (block.type !== 'md') return [{ key: blockKey, blockKey, block }];
  const parts = splitMarkdown(block.md);
  return parts.map((md, i) => ({ key: parts.length > 1 ? `${blockKey}#${i}` : blockKey, blockKey, block: { type: 'md', md } }));
}

/** Rough amount of text, to keep slides from overflowing. */
function weight(items: SlideItem[]): number {
  let w = 0;
  for (const { block: b } of items) {
    if (b.type === 'md') w += b.md.length + (b.md.includes('|') ? 200 : 0) + (b.md.includes('$$') ? 120 : 0);
    else if (b.type === 'callout') w += b.md.length + 90;
    else w += 0;
  }
  return w;
}

export interface SlideResource {
  id: string;
  kind: 'video' | 'link';
  url: string;
  title: string;
}

const TEXT_LIMIT = 1100;
const TEXT_LIMIT_WITH_VISUAL = 680;
/** Short text before a worked example or a question introduces it on the same slide. */
const LEAD_LIMIT = 360;
/** A short warning or tip after a worked example stays with it. */
const TAIL_LIMIT = 420;
/** Text this short never gets a slide of its own when a neighbour has room. */
const SCRAP_LIMIT = 200;

interface Group {
  kind: SlideKind;
  items: SlideItem[];
  title?: string;
}

const hasVisual = (items: SlideItem[]) => items.some((x) => x.block.type === 'figure' || x.block.type === 'video');
const onlyCallouts = (items: SlideItem[]) => items.every((x) => x.block.type === 'callout' && x.block.variant !== 'summary');

/**
 * Packs a section's groups so no slide is left nearly empty: short text before a worked example or
 * a question becomes its introduction, a short warning after it stays with it, and scraps join a neighbour.
 */
function pack(groups: Group[]): Group[] {
  const out: Group[] = [];
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    const next = groups[i + 1];
    const prev = out[out.length - 1];
    if (g.kind === 'content' && prev?.kind === 'example' && onlyCallouts(g.items) && weight(g.items) <= TAIL_LIMIT) {
      prev.items.push(...g.items);
      continue;
    }
    if (g.kind === 'content' && (next?.kind === 'example' || next?.kind === 'check') && !hasVisual(g.items) && weight(g.items) <= LEAD_LIMIT) {
      next.items.unshift(...g.items);
      continue;
    }
    if (g.kind === 'content' && prev?.kind === 'content' && !hasVisual(g.items) && weight(g.items) <= SCRAP_LIMIT && weight([...prev.items, ...g.items]) <= (hasVisual(prev.items) ? TEXT_LIMIT_WITH_VISUAL : TEXT_LIMIT) + SCRAP_LIMIT) {
      prev.items.push(...g.items);
      continue;
    }
    out.push(g);
  }
  return out;
}

const STOP_WORDS = new Set(['an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'in', 'into', 'is', 'it', 'its', 'of', 'on', 'or', 'part', 'the', 'to', 'what', 'when', 'with', 'you', 'your']);
/** Chapters every video has, which say nothing about where it belongs. */
const GENERIC_CHAPTER = /^(introduction|intro|recap|review|your turn|summary|wrap[- ]?up)$/i;

/** The words of a title that can match another title: lower case, plural "s" dropped. */
function titleWords(s: string): Set<string> {
  const words = s
    .toLowerCase()
    .replace(/[’']s\b/g, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
    .map((w) => w.replace(/ies$/, 'y').replace(/([^s])s$/, '$1'));
  return new Set(words);
}

/**
 * The lesson section each explainer part starts at (an index into `sections`), so its slide comes
 * just before that section. Part 1 opens the lesson. A later part goes to the section that shares
 * most words (the earlier on a tie) with the first idea in its subtitle ("Part 2: Finding Sides
 * and Angles"), or else the whole subtitle, or else its first chapter that names a section's
 * topic; a part that matches nothing goes where an even
 * split of the lesson puts it. Parts keep their order, each after the one before when there are
 * sections enough.
 */
export function placeExplainers(sections: string[], parts: Array<Pick<SlideExplainer, 'title' | 'chapters'>>): number[] {
  const sectionWords = sections.map(titleWords);
  const last = sections.length - 1;
  let prev = 0;
  return parts.map((p, i) => {
    if (!sections.length) return -1;
    if (i === 0) return (prev = 0);
    const from = Math.min(prev + 1, last);
    // A part starts with the first idea its subtitle names ("Circle Graphs and Fair Surveys").
    const subtitle = p.title.replace(/^.*?:\s*/, '');
    const topics = [subtitle.split(/,|\band\b|&/)[0], subtitle, ...p.chapters.filter((c) => !GENERIC_CHAPTER.test(c.trim()))];
    let at = -1;
    for (const topic of topics) {
      const words = titleWords(topic);
      let best = 0;
      for (let j = from; j <= last; j++) {
        const shared = [...words].filter((w) => sectionWords[j].has(w)).length;
        if (shared > best) {
          best = shared;
          at = j;
        }
      }
      if (best > 0) break;
    }
    if (at < 0) at = Math.max(from, Math.min(last, Math.round((i * sections.length) / parts.length)));
    return (prev = at);
  });
}

export function buildSlides(content: LessonContent, lessonTitle: string, resources: SlideResource[] = [], explainers: SlideExplainer[] = []): Slide[] {
  const key = keyer();
  const slides: Slide[] = [{ id: 'title', kind: 'title', title: lessonTitle, items: [] }];
  if (content.intro.length) slides.push({ id: 'hook', kind: 'hook', title: 'Let’s begin', items: content.intro.flatMap((b) => itemsOf(b, key(b))) });
  const of = content.sections.length;
  // Each explainer part plays just before the section it teaches; its key is the video's id, so a
  // teacher's choice to hide it survives a new upload.
  const placed = placeExplainers(
    content.sections.map((s) => s.title),
    explainers,
  );
  const videosAt = (si: number) => {
    explainers.forEach((e, k) => {
      if (placed[k] !== si || !e.youtubeId) return;
      const item: SlideItem = { key: `xv-${e.id}`, blockKey: `xv-${e.id}`, block: { type: 'video', url: `https://www.youtube.com/watch?v=${e.youtubeId}`, title: e.title } };
      const part = si >= 0 ? { n: si + 1, of, first: false, title: content.sections[si].title } : undefined;
      // The deck already names the lesson, so the slide is titled by the part ("Units and Referents").
      const title = e.title.replace(/^.*?\bPart \d+:\s*/, '') || e.title;
      slides.push({ id: `xv-${e.id}`, kind: 'video', title, part, items: [item], explainer: e });
    });
  };
  if (!of) videosAt(-1);
  content.sections.forEach((s, si) => {
    videosAt(si);
    const groups: Group[] = [];
    let cur: SlideItem[] = [];
    const flush = () => {
      if (cur.length) groups.push({ kind: 'content', items: cur });
      cur = [];
    };
    const blocks = s.blocks;
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const k = key(b);
      if (b.type === 'example') {
        // A figure just before a worked example is usually the example's diagram: show them together.
        const lead = cur.length && cur[cur.length - 1].block.type === 'figure' ? cur.splice(cur.length - 1, 1) : [];
        flush();
        groups.push({ kind: 'example', items: [...lead, ...itemsOf(b, k)], title: b.title || 'Worked example' });
      } else if (b.type === 'check') {
        // One question per "Your turn" slide, so it is large enough for the whole class.
        flush();
        groups.push({ kind: 'check', items: itemsOf(b, k), title: skillInfo(b.skillId)?.name ?? 'Your turn' });
      } else if (b.type === 'callout' && b.variant === 'summary') {
        flush();
        groups.push({ kind: 'summary', items: splitMarkdown(b.md).map((md, j) => ({ key: `${k}#${j}`, blockKey: k, block: { type: 'md', md } })), title: b.title || 'Key takeaways' });
      } else if (b.type === 'video') {
        flush();
        groups.push({ kind: 'video', items: itemsOf(b, k), title: b.title || s.title });
      } else {
        const next = itemsOf(b, k);
        const all = [...cur, ...next];
        if (cur.length && weight(all) > (hasVisual(all) ? TEXT_LIMIT_WITH_VISUAL : TEXT_LIMIT)) flush();
        cur.push(...next);
      }
    }
    flush();
    pack(groups).forEach((g, part) => {
      slides.push({ id: `s${si}-${part}`, kind: g.kind, title: g.title ?? (part && g.kind === 'content' ? `${s.title} (continued)` : s.title), part: { n: si + 1, of, first: part === 0, title: s.title }, items: g.items });
    });
  });
  for (const r of resources) {
    const item: SlideItem = { key: `res-${r.id}`, blockKey: `res-${r.id}`, block: r.kind === 'video' ? { type: 'video', url: r.url } : { type: 'md', md: r.title } };
    slides.push({ id: `res-${r.id}`, kind: r.kind, title: r.title, items: [item], url: r.kind === 'link' ? r.url : undefined });
  }
  slides.push({ id: 'end', kind: 'end', title: 'Lesson complete', items: [] });
  return slides;
}

/** Slides whose content the teacher cannot hide. */
export const fixedSlide = (s: Slide) => s.kind === 'title' || s.kind === 'questions' || s.kind === 'end';

/** The "Questions" slide, before the end, lists what the class asked; it is left out when nobody asked anything. */
export function withQuestionsSlide(slides: Slide[], asked: number): Slide[] {
  if (asked <= 0) return slides;
  const q: Slide = { id: 'questions', kind: 'questions', title: 'Questions', items: [] };
  const end = slides.findIndex((s) => s.kind === 'end');
  return end < 0 ? [...slides, q] : [...slides.slice(0, end), q, ...slides.slice(end)];
}

/** The slides to present: hidden blocks removed, and slides left with nothing to show dropped. */
export function presentedSlides(slides: Slide[], hidden: ReadonlySet<string>): Slide[] {
  if (!hidden.size) return slides;
  return slides
    .map((s): Slide => {
      const items = s.items.filter((b) => !hidden.has(b.blockKey));
      // A hidden question or worked example leaves its introduction as an ordinary teaching slide.
      const lost = (s.kind === 'check' && !items.some((x) => x.block.type === 'check')) || (s.kind === 'example' && !items.some((x) => x.block.type === 'example'));
      return lost ? { ...s, kind: 'content', title: s.part?.title ?? s.title, items } : { ...s, items };
    })
    .filter((s) => fixedSlide(s) || s.items.length > 0);
}

/** How many presses an item takes: one to appear, plus one per worked-example step and answer. */
export function revealUnits(b: Block): number {
  return b.type === 'example' ? 1 + b.steps.length + (b.answer ? 1 : 0) : 1;
}

/** Slides open with their first item showing; the title and end slides show everything at once. */
const builds = (s: Slide) => !fixedSlide(s) && s.kind !== 'video' && s.kind !== 'link';

/** The last step of a slide (0 when the slide has nothing more to reveal). */
export function lastStep(s: Slide): number {
  if (!builds(s)) return 0;
  const units = s.items.reduce((n, b) => n + revealUnits(b.block), 0);
  return Math.max(0, units - 1);
}

export interface ItemReveal {
  visible: boolean;
  /** Worked-example steps shown (the answer counts as one more). */
  shown: number;
}

export function revealAt(s: Slide, step: number): ItemReveal[] {
  if (!builds(s)) return s.items.map(({ block }) => ({ visible: true, shown: revealUnits(block) - 1 }));
  let budget = step + 1;
  return s.items.map(({ block }) => {
    if (budget <= 0) return { visible: false, shown: 0 };
    budget -= 1;
    if (block.type !== 'example') return { visible: true, shown: 0 };
    const shown = Math.min(budget, revealUnits(block) - 1);
    budget -= shown;
    return { visible: true, shown };
  });
}

/** The step at which item `index` is showing exactly `shown` of its worked-example steps. */
export function stepFor(s: Slide, index: number, shown: number): number {
  let units = 0;
  for (let i = 0; i < index; i++) units += revealUnits(s.items[i].block);
  return Math.max(0, units + shown);
}

/** Embeddable activity sites; anything else opens in a new tab. */
export function activityEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (u.protocol !== 'https:') return null;
    if (host === 'desmos.com' && /^\/(calculator|geometry|3d|matrix|scientific)(\/|$)/.test(u.pathname)) {
      u.searchParams.set('embed', '');
      return u.toString();
    }
    if (host === 'geogebra.org') {
      const id = /^\/(?:m|material\/show\/id)\/(\w+)/.exec(u.pathname)?.[1];
      if (id) return `https://www.geogebra.org/material/iframe/id/${id}`;
      if (/^\/(classic|graphing|geometry|3d|calculator)(\/|$)/.test(u.pathname)) return u.toString();
    }
    if (host === 'phet.colorado.edu' && /\/sims\/html\/.+\.html$/.test(u.pathname)) return u.toString();
  } catch {
    return null;
  }
  return null;
}
