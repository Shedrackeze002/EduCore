import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseLesson, referencedSkills } from './lessonParser.ts';
import { getSkill, COURSES } from '@engine/curriculum/index.ts';

const dir = join(__dirname, 'math10c', 'lessons');

describe('lesson content', () => {
  const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  it('has a lesson file for every lesson in the course', () => {
    const ids = new Set(files.map((f) => f.replace('.md', '')));
    for (const l of COURSES[0].lessons) expect(ids.has(l.id), l.id).toBe(true);
  });
  for (const f of files) {
    it(`${f} parses, references real skills, and practises every lesson skill`, () => {
      const content = parseLesson(readFileSync(join(dir, f), 'utf8'));
      expect(content.sections.length).toBeGreaterThan(1);
      const refs = referencedSkills(content);
      for (const r of refs) expect(getSkill(r), `${f}: unknown skill ${r}`).toBeTruthy();
      const meta = COURSES[0].lessons.find((l) => l.id === f.replace('.md', ''))!;
      for (const s of meta.skills) expect(refs, `${f} never checks ${s}`).toContain(s);
      const all = [...content.intro, ...content.sections.flatMap((s) => s.blocks)];
      expect(all.some((b) => b.type === 'example'), `${f} has no worked example`).toBe(true);
      expect(all.some((b) => b.type === 'callout' && b.variant === 'summary'), `${f} has no summary`).toBe(true);
    });
  }
});
