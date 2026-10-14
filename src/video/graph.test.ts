import { describe, expect, it } from 'vitest';
import { arrowDiagram, dots, plane, plot, polyline } from './graph.ts';
import { itemPoints } from './script.ts';
import type { Part } from './solids.ts';

const g = plane({ x: [-6, 6], y: [-6, 6], every: 2 });
const walk = plane({ name: 'w', x: [0, 40], y: [0, 1500], xStep: 5, yStep: 300, width: 12, height: 7, titles: { x: 'T', y: 'D' } });
const figures: Record<string, Part> = {
  plane: g,
  stretched: walk,
  plot: plot(g, { id: 'c', f: (x) => x * x - 3, label: 'y' }),
  polyline: polyline(walk, { id: 'walk', points: [[0, 0], [10, 600], [16, 600]], labels: ['A', 'B'] }),
  dots: dots(g, [{ id: 'p', x: 1, y: 2, tex: 'P', open: true }]),
  arrows: arrowDiagram({ left: ['1', '2'], right: ['3', '5', '7'], pairs: [[0, 0], [0, 1], [1, 2]], titles: ['x', 'y'] }),
};
const merged = (...parts: Part[]): Part => ({ points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) });

describe('graphs', () => {
  it.each(Object.entries(figures))('%s uses only points it has and unique ids', (_, part) => {
    const all = merged(part, g, walk);
    const ids = part.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of part.items) for (const p of itemPoints(item)) expect(all.points).toHaveProperty([p]);
  });

  it('maps a stretched plane onto the diagram', () => {
    const near = (p: [number, number], q: [number, number]) => p.forEach((v, i) => expect(v).toBeCloseTo(q[i], 9));
    near(walk.map(40, 1500), [12, 7]);
    near(walk.map(20, 750), [6, 3.5]);
    expect(g.map(2, 3)).toEqual([2, 3]);
    expect(plane({ x: [0, 5], y: [0, 5], at: [8, 1] }).map(1, 1)).toEqual([9, 2]);
  });

  it('numbers the axes, skipping the origin, every few grid lines', () => {
    const numbers = g.items.filter((i) => i.id.startsWith('numx')).map((i) => i.kind === 'label' && i.tex);
    expect(numbers).toEqual(['-6', '-4', '-2', '2', '4', '6']);
    expect(walk.items.filter((i) => i.id.startsWith('w-numy')).map((i) => i.kind === 'label' && i.tex)).toEqual(['300', '600', '900', '1200', '1500']);
  });

  it('cuts a plot off where it leaves the plane, ending exactly on the edge', () => {
    const parabola = plot(g, { id: 'c', f: (x) => x * x - 3 });
    // y = x² − 3 leaves the top of the plane at x = ±3.
    const ys = Object.values(parabola.points).map((p) => p[1]);
    expect(Math.max(...ys)).toBeCloseTo(6, 6);
    expect(Math.min(...ys)).toBeCloseTo(-3, 1);
    const xs = Object.values(parabola.points).map((p) => p[0]);
    expect(Math.min(...xs)).toBeCloseTo(-3, 6);
    expect(Math.max(...xs)).toBeCloseTo(3, 6);
  });

  it('splits a curve that leaves and comes back into pieces', () => {
    const wave = plot(g, { id: 'w', f: (x) => 8 * Math.sin(x) });
    expect(wave.items.length).toBeGreaterThan(1);
    expect(wave.items.every((i) => i.group === 'w')).toBe(true);
  });

  it('draws an arrow from each pair’s first element to its second', () => {
    const a = figures.arrows;
    const arrow = a.items.find((i) => i.id === 'a1');
    expect(arrow).toMatchObject({ kind: 'line', arrow: true, group: 'arrows' });
    // The second arrow leaves 1 (top left) and reaches 5 (middle right).
    if (arrow?.kind !== 'line') throw new Error('no arrow');
    expect(a.points[arrow.from][1]).toBeCloseTo(a.points.left0[1]);
    expect(a.points[arrow.to][1]).toBeCloseTo(a.points.right1[1]);
  });
});
