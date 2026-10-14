import { describe, expect, it } from 'vitest';
import { ruler, unitSquare, vernier } from './measure.ts';
import { checkScript, itemPoints, type Explainer } from './script.ts';
import { box, boxNet, cone, cylinder, cylinderNet, figure, hemisphere, isometricBox, sphere, squareColumns, squarePyramid, squarePyramidNet, triangularPrism, triangularPrismNet, type Part } from './solids.ts';

const solids: Record<string, Part> = {
  box: box({ l: 8, w: 5, h: 4, labels: { l: 'l', w: 'w', h: 'h' } }),
  triangularPrism: triangularPrism({ b: 6, t: 4, l: 10, labels: { b: 'b', t: 't', l: 'l' } }),
  cylinder: cylinder({ r: 3, h: 8, labels: { r: 'r', h: 'h' } }),
  cone: cone({ r: 3, h: 7, labels: { r: 'r', h: 'h', s: 's' } }),
  coneDown: cone({ r: 3, h: 9, down: true, rim: 'front', labels: { r: 'r', h: 'h' } }),
  squarePyramid: squarePyramid({ b: 6, h: 5, labels: { b: 'b', h: 'h', s: 's', half: '3' } }),
  sphere: sphere({ r: 4, labels: { r: 'r' } }),
  hemisphere: hemisphere({ r: 4, labels: { r: 'r' } }),
  ruler: ruler({ system: 'imperial', length: 4, start: 0, end: 2.6875, reading: 'x' }),
  vernier: vernier({ reading: 23.7 }),
  unitSquare: unitSquare({ split: 10, labels: { side: 's', cells: 'c' } }),
  boxWithHole: box({ l: 20, w: 40, h: 20, hole: { r: 5, label: '5' }, cells: 2, tone: 'muted' }),
  boxNet: boxNet({ l: 12, w: 5, h: 8, labels: { l: 'l', w: 'w', h: 'h' }, areas: { front: 'a', top: 'b' } }),
  triangularPrismNet: triangularPrismNet({ a: 6, b: 8, c: 10, l: 15, labels: { a: 'a', b: 'b', c: 'c', l: 'l', perimeter: 'p' }, areas: { strip: 's', base: 'b' } }),
  cylinderNet: cylinderNet({ r: 3, h: 7, labels: { c: 'c', h: 'h', r: 'r' }, areas: { rect: 'a', circle: 'b' } }),
  squarePyramidNet: squarePyramidNet({ b: 10, s: 13, labels: { b: 'b', s: 's' }, areas: { base: 'a', side: 'b' } }),
  squareColumns: squareColumns({ name: 'v', heights: [3, 1, 2], label: '\\text{Front}' }),
  isometricBox: isometricBox({ l: 5, w: 3, h: 2.5, labels: { l: '5', w: '3', h: '2.5' } }),
};

describe('solids and measuring tools', () => {
  it.each(Object.entries(solids))('%s uses only its own points and unique ids', (_, part) => {
    const ids = part.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of part.items) for (const p of itemPoints(item)) expect(part.points).toHaveProperty([p]);
  });

  it('names every point and part after the solid, so solids combine', () => {
    const silo = figure('d', [cylinder({ name: 'c', r: 3, h: 7, top: 'front', labels: { h: '7' } }), hemisphere({ name: 'm', at: [0, 7], r: 3 })]);
    expect(silo.items.every((i) => i.id.startsWith('c-') || i.id.startsWith('m-'))).toBe(true);
    expect(Object.keys(silo.points).every((p) => p.startsWith('c-') || p.startsWith('m-'))).toBe(true);
    // With something on top, only the front of the cylinder's rim is drawn.
    const rim = silo.items.find((i) => i.id === 'c-top-rim');
    expect(rim).not.toHaveProperty('closed');
    expect(rim && itemPoints(rim)).toHaveLength(25);
  });

  it('dashes the hidden edges', () => {
    const dashed = solids.box.items.filter((i) => i.kind === 'line' && i.dashed).map((i) => i.id);
    expect(dashed).toEqual(['ae', 'ef', 'eh']);
    expect(solids.cone.items.find((i) => i.id === 'base-back')).toMatchObject({ dashed: true });
  });

  it('marks a ruler in its smallest divisions', () => {
    const metric = ruler({ system: 'metric', length: 10, start: 0, end: 6.3 });
    expect(metric.items.filter((i) => /^t\d+$/.test(i.id))).toHaveLength(101);
    expect(metric.points.m63[0]).toBeCloseTo(6.3);
    expect(solids.ruler.items.filter((i) => /^t\d+$/.test(i.id))).toHaveLength(65);
    expect(solids.ruler.points.m43[0]).toBeCloseTo(2 + 11 / 16);
  });

  it('lines up the vernier mark that gives the tenths', () => {
    const v = solids.vernier;
    expect(v.items.find((i) => i.id === 'before')).toMatchObject({ from: 'm23' });
    expect(v.items.find((i) => i.id === 'match-main')).toMatchObject({ from: 'm30' });
    expect(v.items.find((i) => i.id === 'match-vernier')).toMatchObject({ from: 'v7' });
    expect(v.points.v7[0]).toBeCloseTo(v.points.m30[0]);
  });

  it('unfolds nets with faces of the right size', () => {
    // The triangles of a 6-8-10 prism net have those sides, wherever they are drawn.
    const p = solids.triangularPrismNet.points;
    const len = (a: string, b: string) => Math.hypot(p[a][0] - p[b][0], p[a][1] - p[b][1]);
    expect([len('tb0', 'tb1'), len('tb1', 'tb2'), len('tb0', 'tb2')].sort((x, y) => x - y)).toEqual([6, 8, 10].map((v) => expect.closeTo(v)));
    // The cylinder net's rectangle is as long as the circumference.
    const c = solids.cylinderNet.points;
    expect(c.body1[0] - c.body0[0]).toBeCloseTo(2 * Math.PI * 3);
    // Every face of the box net is in a pair's group, with its outline.
    const groups = solids.boxNet.items.filter((i) => i.kind === 'region').map((i) => i.group);
    expect(groups.sort()).toEqual(['ends', 'ends', 'fb', 'fb', 'tb', 'tb']);
  });

  it('splits a unit square into smaller squares', () => {
    expect(solids.unitSquare.items.filter((i) => i.group === 'grid')).toHaveLength(18);
  });

  it('lets a script show a group of parts, and still catches unknown parts', () => {
    const x: Explainer = {
      id: 't',
      lessonId: 't',
      title: 'T',
      summary: 'T',
      scenes: [{ layout: 'center', main: [figure('d', [solids.cylinder])], lines: [{ say: 'A cylinder.', show: ['d.shape', 'd.r', 'd.lateral'] }, { say: 'No.', show: 'd.nothing' }] }],
    };
    expect(checkScript(x)).toEqual(['Scene 1, line 2: diagram "d" has no part "nothing".']);
  });

  it('draws a view of stacked cubes as columns of squares, and a box in isometric', () => {
    const v = solids.squareColumns;
    // Three columns of 3, 1 and 2 squares: six squares, each a fill and an outline.
    expect(v.items.filter((i) => i.kind === 'region')).toHaveLength(6);
    expect(v.items.filter((i) => i.group === 'v-c0' && i.kind === 'region')).toHaveLength(3);
    expect(v.points['v-q2-1-2']).toEqual([3, 2]);
    // Isometric: the length and depth slant up at 30°, so their ends rise by half their lengths.
    const b = solids.isometricBox;
    expect(b.points.A[1]).toBeCloseTo(2.5);
    expect(b.points.B[1]).toBeCloseTo(1.5);
    expect(b.points.At[0]).toBeCloseTo(b.points.A[0]);
  });
});
