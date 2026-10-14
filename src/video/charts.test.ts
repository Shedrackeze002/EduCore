import { describe, expect, it } from 'vitest';
import { barGraph, circleGraph, marbles, normalCurve, SLICE_TONES, tally } from './charts.ts';
import { itemPoints } from './script.ts';
import type { Part } from './solids.ts';

const figures: Record<string, Part> = {
  bars: barGraph({ categories: ['Mon', 'Tue', 'Wed'], values: [25, 40, 35], max: 70, step: 10, titles: { x: 'Day', y: 'Lunches sold' } }),
  named: barGraph({ name: 'g', categories: ['A', 'B'], values: [1.5, 3], max: 4, step: 0.5, height: 4, at: [2, 1] }),
  pie: circleGraph({ slices: [{ label: 'Pizza', value: 35 }, { label: 'Burgers', value: 25 }, { label: 'Tacos', value: 20 }, { label: 'Salad', value: 10 }, { label: 'Soup', value: 10 }], percent: true }),
  tally: tally({ count: 12, label: 'Car' }),
  bag: marbles({ groups: [{ id: 'red', count: 3, tone: 'bad' }, { id: 'blue', count: 5, tone: 'adj' }], perRow: 4 }),
  spinner: circleGraph({ name: 'sp', slices: [1, 2, 3, 4, 5].map((k) => ({ label: String(k), value: 1 })), namesOnly: true }),
  normal: normalCurve({ name: 'nc', labels: ['144', '152', '160', '168', '176', '184', '192'], regions: [{ id: 'mid', from: -1, to: 1, label: '68\\%' }, { id: 'tail', from: 1, to: Infinity, tone: 'opp', label: '16\\%', labelAt: [2, 1] }] }),
};

const part = (p: Part, id: string) => p.items.find((i) => i.id === id);

describe('chart figures', () => {
  it.each(Object.entries(figures))('%s uses only its own points and unique ids', (_, p) => {
    const ids = p.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of p.items) for (const name of itemPoints(item)) expect(p.points).toHaveProperty([name]);
  });

  it('draws each bar to its value on the scale, with a grid line every step', () => {
    const b = figures.bars;
    // 6 units for 70: Wednesday's 35 reaches half way up.
    expect(b.points['b2-top'][1]).toBeCloseTo(3);
    expect(b.points['b1-top'][1]).toBeCloseTo((40 / 70) * 6);
    expect(b.items.filter((i) => i.id.startsWith('grid'))).toHaveLength(7);
    expect(part(b, 'num3')).toMatchObject({ tex: '30', place: 'left', group: 'scale' });
    expect(part(b, 'b0-name')).toMatchObject({ tex: '\\text{Mon}', place: 'below', group: 'b0' });
    expect(part(b, 'v1')).toMatchObject({ tex: '40' });
    // The reading line runs from the top of the bar across to the scale.
    expect(part(b, 'r2')).toMatchObject({ from: 'b2-3', to: 'b2-axis', dashed: true });
    expect(b.points['b2-axis']).toEqual([0, b.points['b2-top'][1]]);
    expect(part(b, 'y-title')).toMatchObject({ tex: '\\text{Lunches sold}' });
  });

  it('names its parts and moves with `at`', () => {
    const g = figures.named;
    expect(g.points['g-o']).toEqual([2, 1]);
    expect(g.points['g-b1-top'][1]).toBeCloseTo(4);
    expect(part(g, 'g-num1')).toMatchObject({ tex: '0.5' });
    expect(part(g, 'g-b0-fill')).toMatchObject({ group: 'g-b0' });
  });

  it('cuts the circle into slices clockwise from the top, in the fixed colour order', () => {
    const c = figures.pie;
    // Pizza starts at the top and turns 35% of the way round, clockwise.
    expect(c.points['s0-0'][0]).toBeCloseTo(0);
    expect(c.points['s0-0'][1]).toBeCloseTo(3);
    const last = c.items.find((i) => i.id === 's0-fill');
    const end = last && last.kind === 'region' ? last.points[last.points.length - 1] : '';
    const a = 90 - 0.35 * 360;
    expect(c.points[end][0]).toBeCloseTo(3 * Math.cos((a * Math.PI) / 180));
    expect(c.points[end][1]).toBeCloseTo(3 * Math.sin((a * Math.PI) / 180));
    expect(part(c, 's0-fill')).toMatchObject({ tone: SLICE_TONES[0] });
    expect(part(c, 's1-fill')).toMatchObject({ tone: SLICE_TONES[1] });
    // Labels sit outside each slice, facing out: Pizza's middle points up and to the right.
    expect(part(c, 's0-label')).toMatchObject({ tex: '\\text{Pizza }35\\%', place: 'above right' });
    // The last slice ends back at the top.
    const soup = c.items.find((i) => i.id === 's4-fill');
    const top = soup && soup.kind === 'region' ? soup.points[soup.points.length - 1] : '';
    expect(c.points[top][0]).toBeCloseTo(0);
    expect(c.points[top][1]).toBeCloseTo(3);
  });

  it('labels a spinner with only the names of its equal sections', () => {
    const s = figures.spinner;
    expect(part(s, 'sp-s3-label')).toMatchObject({ tex: '\\text{4}' });
    expect(s.items.filter((i) => i.kind === 'region')).toHaveLength(5);
  });

  it('lays out marbles in rows, grouped by colour', () => {
    const b = figures.bag;
    expect(b.items.filter((i) => i.kind === 'region')).toHaveLength(8);
    expect(b.items.filter((i) => i.group === 'red')).toHaveLength(6);
    // The fifth marble starts the second row, one unit down.
    expect(b.points['m4-0']).toEqual([0.4, -1]);
    expect(part(b, 'm3')).toMatchObject({ tone: 'adj', group: 'blue' });
  });

  it('bundles tally marks in fives, each fifth mark across the other four', () => {
    const t = figures.tally;
    expect(t.items.filter((i) => i.kind === 'line')).toHaveLength(12);
    expect(t.items.filter((i) => i.group === 't0')).toHaveLength(5);
    expect(t.items.filter((i) => i.group === 't2')).toHaveLength(2);
    // The fifth mark slants across the bundle.
    expect(t.points.t0m4a).toEqual([-0.15, 0.2]);
    expect(t.points.t0m4b).toEqual([1.05, 0.8]);
    expect(part(t, 'label')).toMatchObject({ tex: '\\text{Car}', place: 'left' });
  });
  it('shades the area under a normal curve between two numbers of standard deviations', () => {
    const c = figures.normal;
    // 2 units per standard deviation, 4 units tall at the mean.
    expect(c.points['nc-top']).toEqual([0, 4]);
    expect(part(c, 'nc-num1')).toMatchObject({ tex: '176', place: 'below', group: 'nc-axis' });
    const mid = part(c, 'nc-mid-fill');
    expect(mid).toMatchObject({ kind: 'region', group: 'nc-mid' });
    // The region runs along the axis from -1 to 1 and up over the curve between them.
    expect(c.points['nc-mid-a']).toEqual([-2, 0]);
    expect(c.points['nc-mid-b']).toEqual([2, 0]);
    expect(c.points['nc-mid-0'][1]).toBeCloseTo(4 * Math.exp(-0.5));
    // A tail stops where the curve is drawn to, and its label goes where it is put.
    expect(c.points['nc-tail-b']).toEqual([7.2, 0]);
    expect(c.points['nc-tail-at']).toEqual([4, 1]);
  });
});
