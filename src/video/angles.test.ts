import { describe, expect, it } from 'vitest';
import { angle, clock, crossing, facing, protractor, transversal } from './angles.ts';
import { itemPoints } from './script.ts';
import type { Part } from './solids.ts';

const figures: Record<string, Part> = {
  acute: angle({ deg: 35, label: '35^\\circ', names: ['A', 'B', 'C'] }),
  right: angle({ deg: 90, label: '90^\\circ' }),
  reflex: angle({ name: 'r', deg: 220, from: 30, label: '220^\\circ' }),
  bisected: angle({ deg: 70, bisect: true, halves: ['35^\\circ', '35^\\circ'], names: ['A', 'B', 'C'] }),
  crossing: crossing({ deg: 50, labels: { a1: '50^\\circ', a2: 'a' } }),
  parallel: transversal({ deg: 65, labels: { 2: '65^\\circ' } }),
  skewed: transversal({ name: 's', deg: 70, turn: 4 }),
  clock: clock({ h: 2, m: 30, label: '105^\\circ' }),
  protractor: protractor({ deg: 115 }),
};

const part = (p: Part, id: string) => p.items.find((i) => i.id === id);
const direction = (p: Part, from: string, to: string) => {
  const [a, b] = [p.points[from], p.points[to]];
  return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
};

describe('angle figures', () => {
  it.each(Object.entries(figures))('%s uses only its own points and unique ids', (_, p) => {
    const ids = p.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of p.items) for (const name of itemPoints(item)) expect(p.points).toHaveProperty([name]);
  });

  it('marks an angle by its size: an arc, a square corner, or a curve round the long way', () => {
    expect(part(figures.acute, 'arc')).toMatchObject({ kind: 'angle', label: '35^\\circ' });
    expect(direction(figures.acute, 'B', 'C')).toBeCloseTo(35);
    expect(part(figures.right, 'arc')).toMatchObject({ kind: 'right' });
    expect(part(figures.right, 'arc-label')).toMatchObject({ tex: '90^\\circ', group: 'arc' });
    expect(part(figures.reflex, 'r-arc')).toMatchObject({ kind: 'curve', group: 'r-arc' });
    // 30° + 220° = 250°, the same direction as -110°.
    expect(direction(figures.reflex, 'r-B', 'r-C')).toBeCloseTo(-110);
    // The vertex letter sits outside a 35° angle, away from its bisector.
    expect(part(figures.acute, 'nB')).toMatchObject({ place: 'left' });
  });

  it('bisects an angle into two labelled halves', () => {
    expect(direction(figures.bisected, 'B', 'D')).toBeCloseTo(35);
    expect(part(figures.bisected, 'half1')).toMatchObject({ kind: 'angle', from: 'A', to: 'D', label: '35^\\circ' });
    expect(part(figures.bisected, 'half2')).toMatchObject({ kind: 'angle', from: 'D', to: 'C' });
  });

  it('numbers the angles of a transversal as the lessons do', () => {
    const t = figures.parallel;
    expect(direction(t, 'N', 'M')).toBeCloseTo(65);
    expect(part(t, 'a2')).toMatchObject({ at: 'M', from: 'tUp', to: 'mE', label: '65^\\circ' });
    expect(part(t, 'a5')).toMatchObject({ at: 'N', from: 'nW', to: 'M' });
    expect(part(t, 'a8')).toMatchObject({ at: 'N', from: 'nE', to: 'tDown' });
    expect(t.items.filter((i) => i.group === 'marks')).toHaveLength(4);
    // Lines that only look parallel get no arrowheads, and n is tipped.
    expect(figures.skewed.items.some((i) => i.group === 's-marks')).toBe(false);
    expect(direction(figures.skewed, 's-N', 's-nE')).toBeCloseTo(4);
  });

  it('sets the hands of a clock, with the hour hand part way to the next hour', () => {
    const c = figures.clock;
    expect(direction(c, 'O', 'Mn')).toBeCloseTo(-90);
    // 2:30 is 75° past 12, so 15° above the 3 o'clock direction.
    expect(direction(c, 'O', 'H')).toBeCloseTo(15);
    expect(part(c, 'between')).toMatchObject({ kind: 'angle', label: '105^\\circ' });
  });

  it('reads a protractor on both scales, leaving room for the readings', () => {
    const p = figures.protractor;
    expect(part(p, 'read-in')).toMatchObject({ tex: '115' });
    expect(part(p, 'read-out')).toMatchObject({ tex: '65' });
    expect(part(p, 'in30')).toMatchObject({ tex: '30', group: 'inner' });
    expect(part(p, 'out30')).toMatchObject({ tex: '150', group: 'outer' });
    // 120 is too close to the arm at 115.
    expect(part(p, 'in120')).toBeUndefined();
  });

  it('places a label on the side facing a direction', () => {
    expect([0, 45, 90, 180, 270, -45, 350].map(facing)).toEqual(['right', 'above right', 'above', 'left', 'below', 'below right', 'right']);
  });
});
