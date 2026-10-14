/**
 * Flat shapes for video diagrams: a floor, a yard or a garden bed drawn as an outline, with its
 * sides labelled, for perimeter and area, and two map pieces, a lettered grid map and a compass
 * rose. Like the solids (`solids.ts`), each returns points and named parts to put into a diagram
 * with `figure`.
 */
import type { DiagramItem, DiagramTone, Place } from './script.ts';
import type { Part } from './solids.ts';

type P = [number, number];

/**
 * A closed shape through `corners`, shaded, with `labels` (TeX at a point) and dashed `guides`
 * (a height, or a line that splits the shape into parts). `cutouts` are smaller shapes drawn
 * inside it in another colour, such as a flower bed in a lawn.
 *
 * Parts: `shape` (a group: the fill and the outline), and each label, guide and cutout by its `id`.
 * With a `name`, each id starts with it ("lawn-shape").
 */
export function outline(o: {
  name?: string;
  corners: P[];
  tone?: DiagramTone;
  labels?: { id: string; at: P; tex: string; place?: Place; tone?: DiagramTone }[];
  guides?: { id: string; from: P; to: P; tone?: DiagramTone }[];
  cutouts?: { id: string; corners: P[]; tone?: DiagramTone }[];
}): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const points: Record<string, P> = {};
  const ids = o.corners.map((p, i) => {
    points[n(`v${i}`)] = p;
    return n(`v${i}`);
  });
  const tone = o.tone ?? 'brand';
  const items: DiagramItem[] = [
    { kind: 'region', id: n('fill'), points: ids, tone, shade: 0.18, group: n('shape') },
    { kind: 'curve', id: n('edge'), points: ids, closed: true, tone, weight: 3, group: n('shape') },
  ];
  for (const c of o.cutouts ?? []) {
    const cids = c.corners.map((p, i) => {
      points[n(`${c.id}-v${i}`)] = p;
      return n(`${c.id}-v${i}`);
    });
    items.push(
      { kind: 'region', id: n(`${c.id}-fill`), points: cids, tone: c.tone ?? 'good', shade: 0.45, group: n(c.id) },
      { kind: 'curve', id: n(`${c.id}-edge`), points: cids, closed: true, tone: c.tone ?? 'good', weight: 2.5, group: n(c.id) },
    );
  }
  for (const g of o.guides ?? []) {
    Object.assign(points, { [n(`${g.id}-a`)]: g.from, [n(`${g.id}-b`)]: g.to });
    items.push({ kind: 'line', id: n(g.id), from: n(`${g.id}-a`), to: n(`${g.id}-b`), tone: g.tone ?? 'opp', dashed: true, weight: 2.5 });
  }
  for (const l of o.labels ?? []) {
    points[n(`${l.id}-at`)] = l.at;
    items.push({ kind: 'label', id: n(l.id), at: n(`${l.id}-at`), tex: l.tex, place: l.place ?? 'center', tone: l.tone ?? 'ink' });
  }
  return { points, items };
}

/** The points of a circle (or the arc from `from` to `to` degrees) of radius `r` about `c`. */
export function arc(c: P, r: number, from = 0, to = 360, steps = 48): P[] {
  const out: P[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
    out.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]);
  }
  return to - from >= 360 ? out.slice(0, -1) : out;
}

/**
 * A grid map: `cols` columns lettered A, B, C… along the bottom and `rows` rows numbered 1, 2,
 * 3… up the left, each square 1 unit, with `places` marked by a dot and a name in their squares
 * (`col` and `row` count from 0), and a north arrow at the top right.
 *
 * Parts: `grid` (a group: the lines), `letters` and `numbers` (groups), `north` (a group: the arrow
 * and its N), and each place by its `id`.
 */
export function gridMap(o: { name?: string; cols: number; rows: number; places: { id: string; col: number; row: number; tex: string }[] }): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let c = 0; c <= o.cols; c++) {
    Object.assign(points, { [n(`c${c}a`)]: [c, 0], [n(`c${c}b`)]: [c, o.rows] });
    items.push({ kind: 'line', id: n(`gc${c}`), from: n(`c${c}a`), to: n(`c${c}b`), tone: 'muted', weight: 1.5, group: n('grid') });
    if (c < o.cols) {
      points[n(`L${c}`)] = [c + 0.5, -0.45];
      items.push({ kind: 'label', id: n(`letter${c}`), at: n(`L${c}`), tex: `\\text{${String.fromCharCode(65 + c)}}`, place: 'center', tone: 'adj', group: n('letters') });
    }
  }
  for (let r = 0; r <= o.rows; r++) {
    Object.assign(points, { [n(`r${r}a`)]: [0, r], [n(`r${r}b`)]: [o.cols, r] });
    items.push({ kind: 'line', id: n(`gr${r}`), from: n(`r${r}a`), to: n(`r${r}b`), tone: 'muted', weight: 1.5, group: n('grid') });
    if (r < o.rows) {
      points[n(`N${r}`)] = [-0.45, r + 0.5];
      items.push({ kind: 'label', id: n(`number${r}`), at: n(`N${r}`), tex: String(r + 1), place: 'center', tone: 'opp', group: n('numbers') });
    }
  }
  Object.assign(points, { [n('na')]: [o.cols + 0.6, o.rows - 1.2], [n('nb')]: [o.cols + 0.6, o.rows - 0.2] });
  items.push(
    { kind: 'line', id: n('north-arrow'), from: n('na'), to: n('nb'), arrow: true, weight: 2.5, group: n('north') },
    { kind: 'label', id: n('north-n'), at: n('nb'), tex: '\\text{N}', place: 'above', group: n('north') },
  );
  for (const p of o.places) {
    points[n(p.id)] = [p.col + 0.5, p.row + 0.62];
    items.push({ kind: 'label', id: n(p.id), at: n(p.id), tex: p.tex, place: 'below', dot: true, tone: 'ink' });
  }
  return { points, items };
}

/**
 * A compass rose: eight arrows from the centre, north on top, with the letters N, NE, E, SE, S,
 * SW, W and NW at their tips.
 *
 * Parts: `main` (a group: the N, E, S and W arrows and letters), `between` (the other four), and
 * each arrow and letter by its direction (`N`, `NE`… and `N-label`, `NE-label`…).
 */
export function compassRose(o: { name?: string; r?: number } = {}): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const r = o.r ?? 2.4;
  const points: Record<string, P> = { [n('o')]: [0, 0] };
  const items: DiagramItem[] = [];
  const dirs = ['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'];
  dirs.forEach((d, i) => {
    const a = (i * Math.PI) / 4;
    const len = i % 2 === 0 ? r : r * 0.7;
    points[n(`${d}-tip`)] = [len * Math.cos(a), len * Math.sin(a)];
    points[n(`${d}-at`)] = [(len + 0.45) * Math.cos(a), (len + 0.45) * Math.sin(a)];
    const group = n(i % 2 === 0 ? 'main' : 'between');
    items.push(
      { kind: 'line', id: n(d), from: n('o'), to: n(`${d}-tip`), arrow: true, tone: d === 'N' ? 'opp' : 'brand', weight: i % 2 === 0 ? 3 : 2, group },
      { kind: 'label', id: n(`${d}-label`), at: n(`${d}-at`), tex: `\\text{${d}}`, place: 'center', tone: d === 'N' ? 'opp' : 'ink', group },
    );
  });
  return { points, items };
}
