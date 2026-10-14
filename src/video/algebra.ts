/**
 * Algebra figures for video diagrams: an area model for multiplying and factoring polynomials,
 * which can also be drawn as algebra tiles. Like the solids (`solids.ts`), it returns points and
 * named parts to put into a diagram with `figure`.
 */
import type { DiagramItem, DiagramTone } from './script.ts';
import type { Part } from './solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** How long a side of an x tile is drawn: longer than 3 units, and clearly not a whole number. */
export const X = 3.4;

/** A cell's tone from its product: x² tiles blue, x tiles green, unit tiles orange, negatives red. */
function toneOf(tex: string): DiagramTone {
  if (tex.trim().startsWith('-')) return 'bad';
  if (/\^/.test(tex)) return 'adj';
  if (/[a-z]/i.test(tex)) return 'good';
  return 'opp';
}

/** How many unit tiles a side term stands for (2 for "2" or "-2"), or 1 for a variable term. */
function units(term: string): number {
  const n = Number(term.replace(/[−-]/, ''));
  return Number.isInteger(n) && n > 0 ? n : 1;
}

/** How long a side term is drawn as algebra tiles: X for a term with a variable, its size otherwise. */
function length(term: string): number {
  return /[a-z]/i.test(term) ? X : units(term);
}

/**
 * An area model: a rectangle with the terms of one factor along the top and the other down the
 * left side, so each cell holds the product of its column's and its row's terms. `cells` lists
 * the products row by row.
 *
 * As a table (the default) the columns and rows are all the same size. With `tiles`, it is drawn
 * as algebra tiles instead: a term with a variable is X long and a number is that many units
 * long, and each cell is split into tiles (an x by 3 cell into three x tiles). Cells are coloured
 * by their products: x² blue, x green, numbers orange and negatives red, unless `tones` says
 * otherwise.
 *
 * Parts: the terms `top<i>` and `side<j>` (in the groups `top` and `side`), each cell
 * `c<j>-<i>` (a group: its shading, tile lines and product `p<j>-<i>`), `outline` (a group) and
 * `grid` (the lines between cells).
 */
export function areaModel(o: {
  name?: string;
  top: string[];
  side: string[];
  cells: string[][];
  tiles?: boolean;
  widths?: number[];
  heights?: number[];
  tones?: (DiagramTone | undefined)[][];
  at?: P;
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const widths = o.widths ?? o.top.map((t) => (o.tiles ? length(t) : 3));
  const heights = o.heights ?? o.side.map((t) => (o.tiles ? length(t) : 1.6));
  // Column edges from the left, row edges from the top (rows run downwards).
  const xs = widths.reduce<number[]>((acc, w) => [...acc, acc[acc.length - 1] + w], [x0]);
  const ys = heights.reduce<number[]>((acc, h) => [...acc, acc[acc.length - 1] - h], [y0]);
  const W = xs[xs.length - 1];
  const B = ys[ys.length - 1];
  const points: Record<string, P> = {};
  const fills: DiagramItem[] = [];
  const lines: DiagramItem[] = [];
  const labels: DiagramItem[] = [];

  o.side.forEach((_, j) =>
    o.top.forEach((_, i) => {
      const id = `${j}-${i}`;
      const tex = o.cells[j][i];
      const corners: P[] = [
        [xs[i], ys[j]],
        [xs[i + 1], ys[j]],
        [xs[i + 1], ys[j + 1]],
        [xs[i], ys[j + 1]],
      ];
      corners.forEach((p, k) => (points[n(`c${id}-${k}`)] = p));
      fills.push({ kind: 'region', id: n(`fill${id}`), points: [0, 1, 2, 3].map((k) => n(`c${id}-${k}`)), tone: o.tones?.[j]?.[i] ?? toneOf(tex), shade: 0.22, group: n(`c${id}`) });
      if (o.tiles) {
        // Lines between the tiles of a cell: one tile across a variable term, one per unit otherwise.
        const across = /[a-z]/i.test(o.top[i]) ? 1 : units(o.top[i]);
        const down = /[a-z]/i.test(o.side[j]) ? 1 : units(o.side[j]);
        for (let a = 1; a < across; a++) {
          const x = xs[i] + (a * widths[i]) / across;
          Object.assign(points, { [n(`tv${id}-${a}a`)]: [x, ys[j]], [n(`tv${id}-${a}b`)]: [x, ys[j + 1]] });
          lines.push({ kind: 'line', id: n(`tv${id}-${a}`), from: n(`tv${id}-${a}a`), to: n(`tv${id}-${a}b`), tone: 'muted', weight: 1.5, group: n(`c${id}`) });
        }
        for (let d = 1; d < down; d++) {
          const y = ys[j] - (d * heights[j]) / down;
          Object.assign(points, { [n(`th${id}-${d}a`)]: [xs[i], y], [n(`th${id}-${d}b`)]: [xs[i + 1], y] });
          lines.push({ kind: 'line', id: n(`th${id}-${d}`), from: n(`th${id}-${d}a`), to: n(`th${id}-${d}b`), tone: 'muted', weight: 1.5, group: n(`c${id}`) });
        }
      }
      points[n(`m${id}`)] = [(xs[i] + xs[i + 1]) / 2, (ys[j] + ys[j + 1]) / 2];
      labels.push({ kind: 'label', id: n(`p${id}`), at: n(`m${id}`), tex, place: 'center', group: n(`c${id}`) });
    }),
  );

  // The grid between cells, and the outline.
  xs.slice(1, -1).forEach((x, i) => {
    Object.assign(points, { [n(`gx${i}a`)]: [x, y0], [n(`gx${i}b`)]: [x, B] });
    lines.push({ kind: 'line', id: n(`gx${i}`), from: n(`gx${i}a`), to: n(`gx${i}b`), weight: 2.5, group: n('grid') });
  });
  ys.slice(1, -1).forEach((y, j) => {
    Object.assign(points, { [n(`gy${j}a`)]: [x0, y], [n(`gy${j}b`)]: [W, y] });
    lines.push({ kind: 'line', id: n(`gy${j}`), from: n(`gy${j}a`), to: n(`gy${j}b`), weight: 2.5, group: n('grid') });
  });
  Object.assign(points, { [n('A')]: [x0, y0], [n('B')]: [W, y0], [n('C')]: [W, B], [n('D')]: [x0, B] });
  for (const [a, b] of [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']]) {
    lines.push({ kind: 'line', id: n(`${a}${b}`.toLowerCase()), from: n(a), to: n(b), group: n('outline') });
  }

  // The factors' terms: above each column, and left of each row.
  o.top.forEach((tex, i) => {
    points[n(`t${i}`)] = [(xs[i] + xs[i + 1]) / 2, y0];
    labels.push({ kind: 'label', id: n(`top${i}`), at: n(`t${i}`), tex, tone: 'adj', place: 'above', group: n('top') });
  });
  o.side.forEach((tex, j) => {
    points[n(`s${j}`)] = [x0, (ys[j] + ys[j + 1]) / 2];
    labels.push({ kind: 'label', id: n(`side${j}`), at: n(`s${j}`), tex, tone: 'opp', place: 'left', group: n('side') });
  });
  return { points, items: [...fills, ...lines, ...labels] };
}
