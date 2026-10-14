import { describe, expect, it } from 'vitest';
import { factorTree, numberLine, pattern, realNumbers, SETS, strip, tiles, venn, type Tree } from './numbers.ts';
import { itemPoints } from './script.ts';
import type { Part } from './solids.ts';

const tree: Tree = [360, [36, [6, 2, 3], [6, 2, 3]], [10, 2, 5]];

const figures: Record<string, Part> = {
  factorTree: factorTree({ tree }),
  namedTree: factorTree({ name: 'a', tree: [360, [8, 2, [4, 2, 2]], [45, 5, [9, 3, 3]]], at: [11, 0] }),
  venn: venn({ titles: ['72', '120'], left: ['3'], both: ['2', '2', '2', '3'], right: ['5'] }),
  numberLine: numberLine({ min: 4, max: 5, step: 0.1, every: 2, points: [{ id: 'p', value: 4.3, tex: '4.3' }], spans: [{ id: 's', from: 4, to: 4.5, label: 'x' }] }),
  tiles: tiles({ cols: 7, rows: 5, labels: { width: 'w', height: 'h', side: 's', area: 'a' } }),
  realNumbers: realNumbers(),
  pattern: pattern({ top: ['2^1', '2^0', '2^{-1}'], values: ['2', '1', '\\tfrac12'], step: '\\div 2' }),
  strip: strip({ parts: 4, shaded: 3, label: '\\tfrac34', pieces: '5\\text{ L}' }),
  later: strip({ name: 's', parts: 8, shaded: 2, from: 3, at: [0, -2] }),
};

const label = (part: Part, id: string) => part.items.find((i) => i.id === id);

describe('number figures', () => {
  it.each(Object.entries(figures))('%s uses only its own points and unique ids', (_, part) => {
    const ids = part.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of part.items) for (const p of itemPoints(item)) expect(part.points).toHaveProperty([p]);
  });

  it('grows a factor tree level by level, circling the primes', () => {
    const t = figures.factorTree;
    expect(label(t, 'n')).toMatchObject({ tex: '360', group: 'level0' });
    expect(label(t, 'n01')).toMatchObject({ tex: '6', group: 'level2', tone: 'ink' });
    expect(label(t, 'n011')).toMatchObject({ tex: '3', group: 'level3', tone: 'good' });
    expect(label(t, 'b011')).toMatchObject({ group: 'level3' });
    // The primes are the ends of the branches, and each one is circled.
    const rings = t.items.filter((i) => i.group === 'primes').map((i) => i.id);
    expect(rings).toEqual(['ring000', 'ring001', 'ring010', 'ring011', 'ring10', 'ring11']);
    // A number sits midway over its two factors.
    expect(t.points.n0[0]).toBeCloseTo((t.points.n00[0] + t.points.n01[0]) / 2);
    expect(figures.namedTree.items.every((i) => i.id.startsWith('a-'))).toBe(true);
  });

  it('sorts the primes into the left, the overlap and the right', () => {
    const v = figures.venn;
    expect(v.items.filter((i) => i.group === 'both').map((i) => i.kind === 'label' && i.tex)).toEqual(['2', '2', '2', '3']);
    // The overlap's primes sit between the circles' inner edges, the others outside them.
    for (const [id, inside] of [['both0', true], ['left0', false], ['right0', false]] as const) expect(Math.abs(v.points[id][0]) < 1.1).toBe(inside);
  });

  it('places points along a number line by value', () => {
    const l = figures.numberLine;
    expect(l.points.p[0]).toBeCloseTo(0.3 * 12);
    expect(l.items.filter((i) => /^num\d+$/.test(i.id)).map((i) => i.kind === 'label' && i.tex)).toEqual(['4', '4.2', '4.4', '4.6', '4.8', '5']);
    expect(l.items.filter((i) => /^t\d+$/.test(i.id))).toHaveLength(11);
  });

  it('tiles a rectangle with a grid between the squares', () => {
    const t = figures.tiles;
    expect(t.items.filter((i) => i.group === 'grid')).toHaveLength(6 + 4);
    expect(t.points.oC).toEqual([7, 5]);
  });

  it('nests the sets of the real numbers', () => {
    const r = figures.realNumbers;
    // Each set's box lies inside the next one's.
    const box = (s: string) => [r.points[`${s}-A`], r.points[`${s}-C`]];
    for (const [inner, outer] of SETS.slice(0, -1).map((s, i) => [s, SETS[i + 1]])) {
      const [a, c] = box(inner);
      const [A, C] = box(outer);
      expect(a[0] > A[0] && a[1] > A[1] && c[0] < C[0] && c[1] < C[1]).toBe(true);
    }
    // The irrational numbers sit beside the rational numbers, inside the real numbers.
    expect(r.points['Qbar-A'][0]).toBeGreaterThan(r.points['Q-C'][0]);
    expect(r.points['Qbar-C'][0]).toBeLessThan(r.points['R-C'][0]);
    expect(r.items.filter((i) => i.group === 'Qbar-ex')).toHaveLength(3);
  });

  it('links each value in a pattern to the one before', () => {
    const p = figures.pattern;
    expect(p.items.filter((i) => i.group === 'c0').map((i) => i.id)).toEqual(['top0', 'value0']);
    expect(p.items.filter((i) => i.group === 'c2').map((i) => i.id)).toEqual(['top2', 'value2', 'step2']);
  });

  it('cuts a fraction strip into equal pieces and shades some of them', () => {
    const s = figures.strip;
    expect(s.items.filter((i) => i.id.startsWith('cut'))).toHaveLength(3);
    // Three of four pieces of a bar 12 long: the shading ends at 9.
    expect(s.points.s1).toEqual([9, 0]);
    expect(s.items.filter((i) => i.group === 'pieces')).toHaveLength(4);
    expect(figures.later.points['s-s0']).toEqual([4.5, -2]);
    expect(figures.later.points['s-s1']).toEqual([7.5, -2]);
  });
});
