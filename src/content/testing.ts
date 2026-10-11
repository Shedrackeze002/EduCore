/** Shared checks for lesson Markdown files (used by lessons.test.ts and per-unit work-in-progress tests). */
import { expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseLesson, referencedSkills } from './lessonParser.ts';
import { FIGURE_TYPES, type LessonMeta } from '@engine/types.ts';

/** Parses a lesson file and checks it references only known skills, checks every lesson skill, and has an example and a summary. */
export function checkLessonFile(path: string, meta: LessonMeta, skillExists: (id: string) => boolean, label = path) {
  const content = parseLesson(readFileSync(path, 'utf8'));
  expect(content.sections.length, `${label} needs at least two sections`).toBeGreaterThan(1);
  const refs = referencedSkills(content);
  for (const r of refs) expect(skillExists(r), `${label}: unknown skill ${r}`).toBe(true);
  for (const s of meta.skills) expect(refs, `${label} never checks ${s}`).toContain(s);
  const all = [...content.intro, ...content.sections.flatMap((s) => s.blocks)];
  expect(all.some((b) => b.type === 'example'), `${label} has no worked example`).toBe(true);
  expect(all.some((b) => b.type === 'callout' && b.variant === 'summary'), `${label} has no summary`).toBe(true);
  for (const b of all) if (b.type === 'figure') expect(FIGURE_TYPES, `${label}: unknown figure type`).toContain(b.figure.type);
  return content;
}
