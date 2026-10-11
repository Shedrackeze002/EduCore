/** Curriculum registry. New courses (grades 5–12) register here. */
import type { CourseMeta, SkillDef } from '../types.ts';
import { MATH10C } from './math10c/course.ts';
import { MATH10C_SKILLS } from './math10c/skills.ts';
import { MATH10_3 } from './math10-3/course.ts';
import { MATH10_3_SKILLS } from './math10-3/skills.ts';
import { MATH10_4 } from './math10-4/course.ts';
import { MATH10_4_SKILLS } from './math10-4/skills.ts';
import { MATH20_4 } from './math20-4/course.ts';
import { MATH20_4_SKILLS } from './math20-4/skills.ts';

export const COURSES: CourseMeta[] = [MATH10C, MATH10_3, MATH10_4, MATH20_4];

const SKILLS = new Map<string, SkillDef>();
for (const s of [...MATH10C_SKILLS, ...MATH10_3_SKILLS, ...MATH10_4_SKILLS, ...MATH20_4_SKILLS]) {
  if (SKILLS.has(s.id)) throw new Error(`Duplicate skill id ${s.id}`);
  SKILLS.set(s.id, s);
}

export function getSkill(id: string): SkillDef | undefined {
  return SKILLS.get(id);
}

export function allSkills(): SkillDef[] {
  return [...SKILLS.values()];
}

export function getCourse(id: string): CourseMeta | undefined {
  return COURSES.find((c) => c.id === id);
}

/** The course a lesson belongs to. */
export function courseOfLesson(lessonId: string): CourseMeta | undefined {
  return COURSES.find((c) => c.lessons.some((l) => l.id === lessonId));
}

export function lessonById(id: string) {
  for (const c of COURSES) {
    const l = c.lessons.find((x) => x.id === id);
    if (l) return l;
  }
  return undefined;
}

export function unitById(id: string) {
  for (const c of COURSES) {
    const u = c.units.find((x) => x.id === id);
    if (u) return u;
  }
  return undefined;
}

/** Skills of a course, ordered by lesson. */
export function courseSkillIds(courseId: string): string[] {
  const c = getCourse(courseId);
  if (!c) return [];
  return c.lessons.flatMap((l) => l.skills);
}

export function unitSkillIds(unitId: string): string[] {
  for (const c of COURSES) {
    const u = c.units.find((x) => x.id === unitId);
    if (u) return u.lessons.flatMap((lid) => c.lessons.find((l) => l.id === lid)?.skills ?? []);
  }
  return [];
}

export function skillName(id: string): string {
  return SKILLS.get(id)?.name ?? id;
}
