import { describe, expect, it } from 'vitest';
import { itemPoints } from './script.ts';
import type { Part } from './solids.ts';
import { rectangle, squaresOnSides, triangle } from './triangles.ts';

const figures: Record<string, Part> = {
  squares: squaresOnSides({ a: 3, b: 4, labels: { a: '3', b: '4', c: '5' }, areas: { a: '9', b: '16', c: '25' } }),
  uneven: squaresOnSides({ name: 'u', a: 2.5, b: 4 }),
  triangle: triangle({ A: [0, 0], B: [4, 0], C: [0, 3], right: 'A', names: ['A', 'B', 'C'], sides: { AB: '8', BC: '10', CA: '6' } }),
  rectangle: rectangle({ w: 48, h: 27, labels: { w: '48', h: '27', d: 'd' } }),
  oblique: triangle({ name: 'o', A: [0, 0], B: [6, 0], C: [2.5, 4], angles: { A: '48^\\circ', B: '65^\\circ' }, angleTones: { B: 'opp' }, altitude: 'C', altitudeLabel: 'h' }),
};

const part = (p: Part, id: string) => p.items.find((i) => i.id === id);

describe('triangle figures', () => {
  it.each(Object.entries(figures))('%s uses only its own points and unique ids', (_, p) => {
    const ids = p.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of p.items) for (const name of itemPoints(item)) expect(p.points).toHaveProperty([name]);
  });

  it('builds each square outward from its side, split into unit squares', () => {
    const s = figures.squares;
    // The square on the left leg goes left, on the bottom leg down, and on the hypotenuse up and right.
    expect(s.points['sq-a2']).toEqual([-3, 3]);
    expect(s.points['sq-b2']).toEqual([0, -4]);
    expect(s.points['sq-c2']).toEqual([7, 4]);
    expect(s.items.filter((i) => i.group === 'sq-c' && i.kind === 'line')).toHaveLength(8);
    expect(part(s, 'sq-c-area')).toMatchObject({ tex: '25', place: 'center' });
    // A side that is not a whole number gets no grid.
    expect(figures.uneven.items.filter((i) => i.group === 'u-sq-a' && i.kind === 'line')).toHaveLength(0);
  });

  it('labels the sides of a triangle on the outside, and marks its right angle', () => {
    const t = figures.triangle;
    expect(part(t, 'AB')).toMatchObject({ label: '8', labelSide: 'right' });
    // Looking from B to C, up and to the left, the outside is on the right.
    expect(part(t, 'BC')).toMatchObject({ label: '10', labelSide: 'right' });
    expect(part(t, 'right')).toMatchObject({ kind: 'right', at: 'A', from: 'B', to: 'C' });
    expect(part(t, 'nA')).toMatchObject({ place: 'below left' });
  });

  it('draws a rectangle with its diagonal', () => {
    expect(part(figures.rectangle, 'd')).toMatchObject({ from: 'P', to: 'R', label: 'd' });
    expect(figures.rectangle.points.R).toEqual([48, 27]);
  });

  it('labels angles inside their corners and drops a height to the opposite side', () => {
    const t = figures.oblique;
    expect(part(t, 'o-aA')).toMatchObject({ kind: 'angle', at: 'o-A', from: 'o-B', to: 'o-C', label: '48^\\circ', tone: 'theta' });
    expect(part(t, 'o-aB')).toMatchObject({ tone: 'opp' });
    expect(part(t, 'o-aC')).toBeUndefined();
    // The foot of the height from C is straight below it, on AB.
    expect(t.points['o-H'][0]).toBeCloseTo(2.5);
    expect(t.points['o-H'][1]).toBeCloseTo(0);
    expect(part(t, 'o-h')).toMatchObject({ from: 'o-C', to: 'o-H', dashed: true, label: 'h', group: 'o-alt' });
    expect(part(t, 'o-h-mark')).toMatchObject({ kind: 'right', at: 'o-H' });
  });
});
