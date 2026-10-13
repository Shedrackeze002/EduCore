import { describe, expect, it } from 'vitest';
import { ruler, unitSquare, vernier } from './measure.ts';
import { checkScript, itemPoints, type Explainer } from './script.ts';
import { box, cone, cylinder, figure, hemisphere, sphere, squarePyramid, triangularPrism, type Part } from './solids.ts';

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
});
