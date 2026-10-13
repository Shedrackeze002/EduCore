import { describe, expect, it } from 'vitest';
import { getCourse } from './curriculum/index.ts';
import { PREREQUISITE, placementResult, placementSkills, recommendCourse } from './placement.ts';

describe('course placement', () => {
  it('gives Grades 5 to 9 their grade’s course', () => {
    for (const g of [5, 6, 7, 8, 9]) expect(recommendCourse({ grade: g }).courseId).toBe(`math-${g}`);
    expect(recommendCourse({ grade: 5 }).prerequisite).toBeNull();
    expect(recommendCourse({ grade: 9 }).prerequisite).toBe('math-8');
  });

  it('follows the Grade 10 to 12 course sequences from the student’s plans', () => {
    expect(recommendCourse({ grade: 10, plan: 'university-stem' }).courseId).toBe('math-10c');
    expect(recommendCourse({ grade: 10, plan: 'work' }).courseId).toBe('math-10-3');
    expect(recommendCourse({ grade: 10, support: true }).courseId).toBe('math-10-4');
    expect(recommendCourse({ grade: 11, plan: 'university-stem' }).courseId).toBe('math-20-1');
    expect(recommendCourse({ grade: 11, plan: 'university-other' }).courseId).toBe('math-20-2');
    expect(recommendCourse({ grade: 11, plan: 'college-trades' }).courseId).toBe('math-20-3');
    expect(recommendCourse({ grade: 11, support: true }).courseId).toBe('math-20-4');
    expect(recommendCourse({ grade: 12, plan: 'university-stem', calculus: true }).alternatives.map((a) => a.courseId)).toContain('math-31');
    expect(recommendCourse({ grade: 12, plan: 'not-sure' }).courseId).toBe('math-30-2');
    expect(recommendCourse({ grade: 12, plan: 'work' }).courseId).toBe('math-30-3');
  });

  it('only recommends courses that exist, with reasons, and a prerequisite that exists', () => {
    const plans = ['university-stem', 'university-other', 'college-trades', 'work', 'not-sure'] as const;
    for (const grade of [5, 6, 7, 8, 9, 10, 11, 12])
      for (const plan of plans)
        for (const support of [false, true])
          for (const calculus of [false, true]) {
            const r = recommendCourse({ grade, plan, support, calculus });
            expect(getCourse(r.courseId), `${grade} ${plan}`).toBeTruthy();
            expect(r.reasons.length).toBeGreaterThan(0);
            for (const a of r.alternatives) expect(getCourse(a.courseId)).toBeTruthy();
            if (r.prerequisite) expect(getCourse(r.prerequisite)).toBeTruthy();
          }
    for (const [course, before] of Object.entries(PREREQUISITE)) {
      expect(getCourse(course)).toBeTruthy();
      if (before) expect(getCourse(before)).toBeTruthy();
    }
  });

  it('checks skills spread across the course before', () => {
    const skills = placementSkills('math-10c');
    expect(skills).toHaveLength(6);
    expect(new Set(skills).size).toBe(6);
    expect(placementSkills('math-5').length).toBeGreaterThan(0);
    expect(placementSkills('nope')).toEqual([]);
  });

  it('turns a placement score into advice', () => {
    expect(placementResult(6, 6)).toBe('ready');
    expect(placementResult(4, 6)).toBe('ready');
    expect(placementResult(3, 6)).toBe('review');
    expect(placementResult(2, 6)).toBe('review');
    expect(placementResult(1, 6)).toBe('start-earlier');
    expect(placementResult(0, 0)).toBe('ready');
  });
});
