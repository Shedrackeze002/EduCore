/**
 * Data displays for video diagrams: a bar graph, a circle graph and tally marks. Like the solids
 * (`solids.ts`), each returns points and named parts to put into a diagram with `figure`.
 *
 * A bar graph has one colour for every bar (one series); a circle graph colours its slices in a
 * fixed order, so the same slice keeps its colour from scene to scene.
 */
import type { DiagramItem, DiagramTone } from './script.ts';
import type { Part } from './solids.ts';
import { facing } from './angles.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** The slice colours of a circle graph, in order. */
export const SLICE_TONES: DiagramTone[] = ['adj', 'opp', 'good', 'theta', 'hyp', 'brand'];

/** TeX for a word or two of plain text. */
const text = (s: string) => `\\text{${s}}`;

/**
 * A bar graph: a bar for each category, as tall as its value on a scale from 0 to `max`, with a
 * grid line and a number every `step`. The scale is `height` diagram units tall (6 by default),
 * and each bar is 1 unit wide, 1.6 apart. `at` moves the corner where the axes meet.
 *
 * Parts: `scale` (a group: the axes, grid lines, numbers and titles), a group `b<i>` for each bar
 * (the bar and its category name below it), `v<i>` (bar i's value above it) and `r<i>` (a dashed
 * line from the top of bar i across to the scale, for reading its value).
 */
export function barGraph(o: { name?: string; categories: string[]; values: number[]; max: number; step: number; height?: number; tone?: DiagramTone; titles?: { x?: string; y?: string }; at?: P }): Part {
  const n = namer(o.name);
  const [ox, oy] = o.at ?? [0, 0];
  const H = o.height ?? 6;
  const k = H / o.max;
  const W = 0.4 + o.categories.length * 1.6;
  const tone = o.tone ?? 'adj';
  const points: Record<string, P> = { [n('o')]: [ox, oy], [n('xe')]: [ox + W, oy], [n('ye')]: [ox, oy + H + 0.4] };
  const scale = n('scale');
  const items: DiagramItem[] = [];
  for (let v = o.step, i = 1; v <= o.max + 1e-9; v += o.step, i++) {
    const y = oy + v * k;
    Object.assign(points, { [n(`g${i}a`)]: [ox, y], [n(`g${i}b`)]: [ox + W, y] });
    items.push(
      { kind: 'line', id: n(`grid${i}`), from: n(`g${i}a`), to: n(`g${i}b`), tone: 'muted', weight: 1, group: scale },
      { kind: 'label', id: n(`num${i}`), at: n(`g${i}a`), tex: String(Number(v.toFixed(6))), tone: 'muted', place: 'left', group: scale },
    );
  }
  items.push(
    { kind: 'line', id: n('x-axis'), from: n('o'), to: n('xe'), weight: 2.5, group: scale },
    { kind: 'line', id: n('y-axis'), from: n('o'), to: n('ye'), weight: 2.5, group: scale },
    { kind: 'label', id: n('zero'), at: n('o'), tex: '0', tone: 'muted', place: 'left', group: scale },
  );
  if (o.titles?.y) items.push({ kind: 'label', id: n('y-title'), at: n('ye'), tex: text(o.titles.y), place: 'above', group: scale });
  if (o.titles?.x) {
    points[n('xt')] = [ox + W / 2, oy - 0.16 * H];
    items.push({ kind: 'label', id: n('x-title'), at: n('xt'), tex: text(o.titles.x), place: 'below', group: scale });
  }
  o.categories.forEach((cat, i) => {
    const c = ox + 0.4 + 1.6 * i + 0.5;
    const top = oy + o.values[i] * k;
    const corners: P[] = [[c - 0.5, oy], [c + 0.5, oy], [c + 0.5, top], [c - 0.5, top]];
    const ids = corners.map((q, j) => {
      points[n(`b${i}-${j}`)] = q;
      return n(`b${i}-${j}`);
    });
    Object.assign(points, { [n(`b${i}-base`)]: [c, oy], [n(`b${i}-top`)]: [c, top], [n(`b${i}-axis`)]: [ox, top] });
    items.push(
      { kind: 'region', id: n(`b${i}-fill`), points: ids, tone, shade: 0.55, group: n(`b${i}`) },
      { kind: 'curve', id: n(`b${i}-edge`), points: ids, closed: true, tone, weight: 2, group: n(`b${i}`) },
      { kind: 'label', id: n(`b${i}-name`), at: n(`b${i}-base`), tex: text(cat), place: 'below', group: n(`b${i}`) },
      { kind: 'label', id: n(`v${i}`), at: n(`b${i}-top`), tex: String(o.values[i]), place: 'above' },
      { kind: 'line', id: n(`r${i}`), from: n(`b${i}-3`), to: n(`b${i}-axis`), tone: 'theta', dashed: true },
    );
  });
  return { points, items };
}

/**
 * A circle graph (a pie chart) of radius `r` (3 by default): a slice for each value, clockwise
 * from the top, in the colours of SLICE_TONES unless a slice sets its own, each labelled outside
 * with its name and its value (a percent when `percent` is set), or with only its name when
 * `namesOnly` is set (the numbered sections of a spinner).
 *
 * Parts: a group `s<i>` for each slice (the slice, its edge and its label). The figure leaves room
 * beside the circle for the labels.
 */
export function circleGraph(o: { name?: string; slices: { label: string; value: number; tone?: DiagramTone }[]; r?: number; percent?: boolean; namesOnly?: boolean; at?: P }): Part {
  const n = namer(o.name);
  const r = o.r ?? 3;
  const [cx, cy] = o.at ?? [0, 0];
  const total = o.slices.reduce((s, x) => s + x.value, 0);
  // The labels sit outside the circle; these corners keep them inside the figure.
  const points: Record<string, P> = { [n('c')]: [cx, cy], [n('pad-l')]: [cx - 2 * r, cy - 1.3 * r], [n('pad-r')]: [cx + 2 * r, cy + 1.3 * r] };
  const items: DiagramItem[] = [];
  let start = 90;
  o.slices.forEach((s, i) => {
    const sweep = (s.value / total) * 360;
    const steps = Math.max(2, Math.ceil(sweep / 4));
    const ids = [n('c')];
    for (let j = 0; j <= steps; j++) {
      const a = ((start - (sweep * j) / steps) * Math.PI) / 180;
      points[n(`s${i}-${j}`)] = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      ids.push(n(`s${i}-${j}`));
    }
    const mid = start - sweep / 2;
    points[n(`s${i}-at`)] = [cx + 1.12 * r * Math.cos((mid * Math.PI) / 180), cy + 1.12 * r * Math.sin((mid * Math.PI) / 180)];
    const tone = s.tone ?? SLICE_TONES[i % SLICE_TONES.length];
    items.push(
      { kind: 'region', id: n(`s${i}-fill`), points: ids, tone, shade: 0.6, group: n(`s${i}`) },
      { kind: 'curve', id: n(`s${i}-edge`), points: ids, closed: true, tone: 'ink', weight: 2, group: n(`s${i}`) },
      { kind: 'label', id: n(`s${i}-label`), at: n(`s${i}-at`), tex: o.namesOnly ? text(s.label) : `${text(`${s.label} `)}${s.value}${o.percent ? '\\%' : ''}`, place: facing(mid), group: n(`s${i}`) },
    );
    start -= sweep;
  });
  return { points, items };
}

/**
 * Tally marks for `count`: each bundle of five is four upright marks with a fifth across them,
 * then the marks left over. Each mark is 1 unit tall; `at` is the bottom of the first mark, and
 * `label` (plain text) sits to the left of the marks.
 *
 * Parts: a group `t<i>` for each bundle (the last may have fewer than five), and `label`.
 */
export function tally(o: { name?: string; count: number; at?: P; label?: string; tone?: DiagramTone }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const tone = o.tone ?? 'ink';
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const mark = (id: string, a: P, b: P, group: string) => {
    Object.assign(points, { [n(`${id}a`)]: a, [n(`${id}b`)]: b });
    items.push({ kind: 'line', id: n(id), from: n(`${id}a`), to: n(`${id}b`), tone, weight: 3, group });
  };
  for (let bundle = 0; bundle * 5 < o.count; bundle++) {
    const left = x0 + bundle * 1.6;
    const inBundle = Math.min(5, o.count - bundle * 5);
    const group = n(`t${bundle}`);
    for (let m = 0; m < Math.min(4, inBundle); m++) mark(`t${bundle}m${m}`, [left + 0.3 * m, y0], [left + 0.3 * m, y0 + 1], group);
    if (inBundle === 5) mark(`t${bundle}m4`, [left - 0.15, y0 + 0.2], [left + 1.05, y0 + 0.8], group);
  }
  if (o.label) {
    points[n('label-at')] = [x0 - 0.5, y0 + 0.5];
    items.push({ kind: 'label', id: n('label'), at: n('label-at'), tex: text(o.label), place: 'left' });
  }
  return { points, items };
}

/**
 * Marbles in rows of `perRow` (10 by default), coloured in the order given: a bag with 3 red and
 * 7 blue marbles is `[{ id: 'red', count: 3, tone: 'bad' }, { id: 'blue', count: 7, tone: 'adj' }]`.
 * Each marble is 0.8 units across, 1 unit apart; `at` is the centre of the first, and rows go down.
 *
 * Parts: a group for each colour, by its `id`.
 */
export function marbles(o: { name?: string; groups: { id: string; count: number; tone: DiagramTone }[]; perRow?: number; at?: P }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const per = o.perRow ?? 10;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  let k = 0;
  for (const g of o.groups) {
    for (let i = 0; i < g.count; i++, k++) {
      const [cx, cy] = [x0 + (k % per), y0 - Math.floor(k / per)];
      const ids = Array.from({ length: 16 }, (_, j) => {
        const a = (j * Math.PI) / 8;
        points[n(`m${k}-${j}`)] = [cx + 0.4 * Math.cos(a), cy + 0.4 * Math.sin(a)];
        return n(`m${k}-${j}`);
      });
      items.push(
        { kind: 'region', id: n(`m${k}`), points: ids, tone: g.tone, shade: 0.75, group: n(g.id) },
        { kind: 'curve', id: n(`m${k}-edge`), points: ids, closed: true, tone: g.tone, weight: 2, group: n(g.id) },
      );
    }
  }
  return { points, items };
}
