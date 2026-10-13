/**
 * Teacher edits as a layer over the lesson files. A lesson splits into sections exactly as the
 * parser splits it (at "## " headings outside ::: blocks). An approved edit names the section it
 * replaces by a fingerprint of that section's text in the file, so it applies only while the file
 * section is unchanged; if the file is updated later, the edit simply stops applying.
 */
import { parseLesson, type Block, type LessonContent } from './lessonParser.ts';

export interface RawSection {
  title: string;
  /** The section's Markdown, from its "## " heading line. */
  text: string;
  /** Fingerprint of the text as it is in the lesson file. */
  hash: string;
}

export interface SectionEdit {
  baseHash: string;
  markdown: string;
}

const normalize = (s: string) => s.replace(/\r\n/g, '\n').trim();

/** FNV-1a, 32-bit, as 8 hex digits: a fingerprint, not a security measure. */
export function sectionHash(text: string): string {
  let h = 0x811c9dc5;
  const s = normalize(text);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/** The text before the first section, and each section, split as the parser splits them. */
export function splitLesson(raw: string): { head: string; sections: RawSection[] } {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const head: string[] = [];
  const sections: Array<{ title: string; lines: string[] }> = [];
  let inBlock = false;
  for (const line of lines) {
    const target = sections.length ? sections[sections.length - 1].lines : head;
    if (inBlock) {
      target.push(line);
      if (line.trim() === ':::') inBlock = false;
      continue;
    }
    const heading = /^##\s+(.+)$/.exec(line);
    if (heading) {
      sections.push({ title: heading[1].trim(), lines: [line] });
      continue;
    }
    if (/^:::(\w+)\s*(.*)$/.test(line)) inBlock = true;
    target.push(line);
  }
  return {
    head: head.join('\n'),
    sections: sections.map((s) => {
      const text = normalize(s.lines.join('\n'));
      return { title: s.title, text, hash: sectionHash(text) };
    }),
  };
}

export interface EditedLesson {
  content: LessonContent;
  /** Each section's current Markdown and the fingerprint of its text in the file. */
  sources: Array<{ title: string; text: string; baseHash: string; edited: boolean }>;
}

/**
 * The lesson with approved edits applied. An edit applies only to the file section it was made
 * from, and only if it is a valid section; if the result does not parse, the file is used as is.
 */
export function applyEdits(raw: string, edits: SectionEdit[], skillExists?: (id: string) => boolean): EditedLesson {
  const { head, sections } = splitLesson(raw);
  const byHash = new Map(edits.map((e) => [e.baseHash, e.markdown]));
  const sources = sections.map((s) => {
    const md = byHash.get(s.hash);
    const usable = md !== undefined && validateSection(md, skillExists) === null;
    return { title: usable ? (/^##\s+(.+)$/m.exec(md!)?.[1].trim() ?? s.title) : s.title, text: usable ? normalize(md!) : s.text, baseHash: s.hash, edited: usable };
  });
  if (!sources.some((s) => s.edited)) return { content: parseLesson(raw), sources };
  try {
    const content = parseLesson([head, ...sources.map((s) => s.text)].join('\n\n'));
    if (content.sections.length === sources.length) return { content, sources };
  } catch {
    /* fall through to the file */
  }
  const original = splitLesson(raw).sections.map((s) => ({ title: s.title, text: s.text, baseHash: s.hash, edited: false }));
  return { content: parseLesson(raw), sources: original };
}

const VIDEO = /^https?:\/\/\S+$/i;

/** Why a proposed section cannot be used, or null when it is fine. */
export function validateSection(markdown: string, skillExists?: (id: string) => boolean): string | null {
  const md = normalize(markdown);
  if (!md) return 'The section is empty.';
  if (md.length > 20000) return 'The section is too long (at most 20,000 characters).';
  if (!/^##\s+\S/.test(md)) return 'Start the section with its heading, for example "## Worked examples".';
  let parsed: LessonContent;
  try {
    parsed = parseLesson(md);
  } catch (e) {
    return (e as Error).message;
  }
  if (parsed.sections.length !== 1) return 'Keep to one section: only the first line may start with "## ".';
  for (const b of parsed.sections[0].blocks) {
    const problem = blockProblem(b, skillExists);
    if (problem) return problem;
  }
  return null;
}

function blockProblem(b: Block, skillExists?: (id: string) => boolean): string | null {
  if (b.type === 'video' && !VIDEO.test(b.url)) return 'Video links must start with https://.';
  if (b.type === 'check' && skillExists && !skillExists(b.skillId)) return `There is no skill called "${b.skillId}".`;
  return null;
}

export type DiffLine = { kind: 'same' | 'added' | 'removed'; text: string };

/** A line-by-line diff (longest common subsequence), for reviewing an edit. */
export function diffLines(before: string, after: string): DiffLine[] {
  const a = normalize(before).split('\n');
  const b = normalize(after).split('\n');
  const n = a.length;
  const m = b.length;
  const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      out.push({ kind: 'same', text: a[i] });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) out.push({ kind: 'removed', text: a[i++] });
    else out.push({ kind: 'added', text: b[j++] });
  }
  while (i < n) out.push({ kind: 'removed', text: a[i++] });
  while (j < m) out.push({ kind: 'added', text: b[j++] });
  return out;
}
