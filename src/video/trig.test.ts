import { describe, expect, it } from 'vitest';
import { itemPoints } from './script.ts';
import type { Part } from './solids.ts';
import { cast, referenceAngle, standardAngle } from './trig.ts';

const figures: Record<string, Part> = {
  plain: standardAngle({ deg: 135, label: '135^\\circ', quadrants: true }),
  bare: standardAngle({ name: 'b', deg: 140, ref: '40^\\circ', axes: false, arc: false }),
  cast: cast(),
  full: standardAngle({ name: 's', deg: 210, label: '210^\\circ', ref: '30^\\circ', drop: true, point: 'P', sides: { x: '-\\sqrt{3}', y: '-1', r: '2' } }),
};

const part = (p: Part, id: string) => p.items.find((i) => i.id === id);

describe('trigonometry figures', () => {
  it.each(Object.entries(figures))('%s uses only its own points and unique ids', (_, p) => {
    const ids = p.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of p.items) for (const name of itemPoints(item)) expect(p.points).toHaveProperty([name]);
  });

  it('finds the reference angle in each quadrant', () => {
    expect([30, 150, 210, 300, 90, 180, 360, 405].map(referenceAngle)).toEqual([30, 30, 30, 60, 90, 0, 0, 45]);
  });

  it('puts the terminal arm at the angle and sweeps the arc anticlockwise past 180°', () => {
    const f = figures.full;
    expect(f.points['s-P'][0]).toBeCloseTo(4 * Math.cos((210 * Math.PI) / 180));
    expect(f.points['s-P'][1]).toBeCloseTo(-2);
    // The arc ends on the arm, near the origin.
    const curve = part(f, 's-arc-curve');
    const last = curve && curve.kind === 'curve' ? curve.points[curve.points.length - 1] : '';
    expect(f.points[last][0]).toBeCloseTo(0.6 * Math.cos((210 * Math.PI) / 180));
    expect(f.points[last][1]).toBeCloseTo(-0.3);
  });

  it('measures the reference angle to the nearer half of the x-axis, and drops the perpendicular', () => {
    const f = figures.full;
    expect(part(f, 's-ref')).toMatchObject({ kind: 'angle', at: 's-O', from: 's-near', to: 's-P', label: '30^\\circ' });
    expect(f.points['s-near']).toEqual([-4, 0]);
    expect(f.points['s-F'][1]).toBe(0);
    expect(part(f, 's-drop-mark')).toMatchObject({ kind: 'right', at: 's-F' });
    expect(part(f, 's-y')).toMatchObject({ label: '-1', tone: 'opp' });
    expect(part(f, 's-r')).toMatchObject({ from: 's-O', to: 's-P', label: '2', tone: 'hyp', labelSide: 'left' });
    // At 210°, x and y are both negative: the legs' labels go on their right, away from the triangle.
    expect(part(f, 's-x')).toMatchObject({ labelSide: 'right' });
    expect(part(f, 's-y')).toMatchObject({ labelSide: 'right' });
    expect(part(f, 's-P-dot')).toMatchObject({ tex: 'P', place: 'below left' });
  });

  it('can leave out the axes and the arc, to share axes with another arm', () => {
    const b = figures.bare;
    expect(part(b, 'b-x-axis')).toBeUndefined();
    expect(part(b, 'b-arc-curve')).toBeUndefined();
    expect(part(b, 'b-ref')).toMatchObject({ label: '40^\\circ', from: 'b-near' });
    expect(b.points['b-near']).toEqual([-4, 0]);
  });

  it('shortens the axes the arm does not reach when compact', () => {
    const c = standardAngle({ deg: 150, compact: true });
    expect(c.points.xl).toEqual([-4.6, 0]);
    expect(c.points.xr[0]).toBeCloseTo(1.8);
    expect(c.points.yu).toEqual([0, 4.6]);
    expect(c.points.yd[1]).toBeCloseTo(-1.8);
  });

  it('marks the positive ratios in each quadrant: All, Sine, Tangent, Cosine', () => {
    const c = figures.cast;
    expect(c.points['S-at'][0]).toBeLessThan(0);
    expect(c.points['S-at'][1]).toBeGreaterThan(0);
    expect(c.points['C-at'][0]).toBeGreaterThan(0);
    expect(c.points['C-at'][1]).toBeLessThan(0);
    expect(part(c, 'T-ratio')).toMatchObject({ tex: '\\tan\\theta > 0', group: 'T' });
  });

  it('numbers the quadrants anticlockwise', () => {
    const f = figures.plain;
    expect(f.points.q1[0]).toBeLessThan(0);
    expect(f.points.q1[1]).toBeGreaterThan(0);
    expect(part(f, 'qIII')).toMatchObject({ tex: '\\text{III}', group: 'quads' });
  });
});
