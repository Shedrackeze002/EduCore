/**
 * Figure helpers for the Unit 6 (trigonometric identities) videos: numbers along the edges of a
 * graph, clear of curves that cross the x-axis; vertical lines for asymptotes; and points on a
 * unit circle with their labels placed by hand, clear of the axes and their names.
 */
import type { DiagramItem, DiagramTone, Place } from '@/video/script.ts';
import type { Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

/** Degrees to radians. */
export const rad = (deg: number) => (deg * Math.PI) / 180;

/** An angle in degrees, as TeX. */
export const degTex = (x: number) => `${x}^\\circ`;

/**
 * Numbers for a plane drawn with `every: 0`: the x-values `xs` below its bottom edge and the
 * y-values `ys` left of its left edge, in the group `axes`.
 */
export function edgeNumbers(g: Plane, o: { xs?: number[]; ys?: number[]; xTex?: (x: number) => string; yTex?: (y: number) => string }): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  (o.xs ?? []).forEach((x, i) => {
    const id = g.n(`ex${i}`);
    points[id] = g.map(x, g.y[0]);
    items.push({ kind: 'label', id, at: id, tex: (o.xTex ?? degTex)(x), tone: 'muted', place: 'below', group: g.n('axes') });
  });
  (o.ys ?? []).forEach((y, j) => {
    const id = g.n(`ey${j}`);
    points[id] = g.map(g.x[0], y);
    items.push({ kind: 'label', id, at: id, tex: (o.yTex ?? String)(y), tone: 'muted', place: 'left', group: g.n('axes') });
  });
  return { points, items };
}

/** A dashed vertical line across the plane at `x` (an asymptote), as the part `id`. */
export function vline(g: Plane, o: { id: string; x: number; tone?: DiagramTone; group?: string }): Part {
  const [a, b] = [g.n(`${o.id}-a`), g.n(`${o.id}-b`)];
  return {
    points: { [a]: g.map(o.x, g.y[0]), [b]: g.map(o.x, g.y[1]) },
    items: [{ kind: 'line', id: g.n(o.id), from: a, to: b, tone: o.tone ?? 'muted', dashed: true, weight: 2, ...(o.group ? { group: g.n(o.group) } : {}) }],
  };
}

/**
 * Points on a circle of radius `r` about the origin (a unit circle drawn `r` units across), at
 * angles in degrees, each a dot with its label at `place`. Each is a part `m<deg>`, in `group`
 * when given.
 */
export function circleMarks(r: number, list: { deg: number; tex: string; tone?: DiagramTone; place: Place; group?: string }[]): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = list.map((m) => {
    const id = `m${m.deg}`;
    points[id] = [r * Math.cos(rad(m.deg)), r * Math.sin(rad(m.deg))];
    return { kind: 'label', id, at: id, tex: m.tex, tone: m.tone ?? 'opp', place: m.place, dot: true, ...(m.group ? { group: m.group } : {}) };
  });
  return { points, items };
}

/**
 * A circle of radius `r` centred at `at`, with two radii to the angles `from` and `to` (degrees),
 * the angle between them labelled `label`, and the chord joining their ends. Parts (prefixed with
 * `name`): `circle`, `arms` (a group: both radii and their end dots, with `fromTex` and `toTex`
 * beside the dots), `angle` and `chord`.
 */
export function chordCircle(o: { name: string; at: P; r: number; from: number; to: number; label: string; fromTex?: string; toTex?: string; tone?: DiagramTone; labelDist?: number }): Part {
  const n = (s: string) => `${o.name}-${s}`;
  const [cx, cy] = o.at;
  const on = (deg: number, k = 1): P => [cx + k * o.r * Math.cos(rad(deg)), cy + k * o.r * Math.sin(rad(deg))];
  const points: Record<string, P> = { [n('O')]: [cx, cy], [n('F')]: on(o.from), [n('T')]: on(o.to) };
  const ring: string[] = [];
  for (let i = 0; i < 96; i++) {
    points[n(`c${i}`)] = on(i * 3.75);
    ring.push(n(`c${i}`));
  }
  const side = (deg: number): Place => {
    const [x, y] = [Math.cos(rad(deg)), Math.sin(rad(deg))];
    return `${y > 0.3 ? 'above' : y < -0.3 ? 'below' : ''}${Math.abs(y) > 0.3 && Math.abs(x) > 0.3 ? ' ' : ''}${x > 0.3 ? 'right' : x < -0.3 ? 'left' : ''}` as Place;
  };
  const items: DiagramItem[] = [
    { kind: 'curve', id: n('circle'), points: ring, closed: true, tone: 'muted', weight: 2.5 },
    { kind: 'line', id: n('arm-from'), from: n('O'), to: n('F'), tone: 'brand', weight: 3, group: n('arms') },
    { kind: 'line', id: n('arm-to'), from: n('O'), to: n('T'), tone: 'brand', weight: 3, group: n('arms') },
    { kind: 'label', id: n('F-dot'), at: n('F'), tex: o.fromTex ?? '', tone: 'brand', dot: true, place: side(o.from) || 'right', group: n('arms') },
    { kind: 'label', id: n('T-dot'), at: n('T'), tex: o.toTex ?? '', tone: 'brand', dot: true, place: side(o.to) || 'right', group: n('arms') },
    { kind: 'angle', id: n('angle'), at: n('O'), from: n('F'), to: n('T'), tone: 'theta', label: o.label, r: 26, labelDist: o.labelDist ?? 50 },
    { kind: 'line', id: n('chord'), from: n('F'), to: n('T'), tone: o.tone ?? 'opp', weight: 4 },
  ];
  return { points, items };
}

/**
 * A solution read off a graph: a dashed line from the point (x, y) up to the top of the plane, with
 * `tex` above it, clear of the curves. Parts (in `group`): `id` (the line) and `id-t` (the label).
 */
export function readUp(g: Plane, o: { id: string; x: number; y: number; tex: string; tone?: DiagramTone; group?: string; place?: Place }): Part {
  const [a, b] = [g.n(`${o.id}-a`), g.n(`${o.id}-b`)];
  const extra = o.group ? { group: g.n(o.group) } : {};
  return {
    points: { [a]: g.map(o.x, o.y), [b]: g.map(o.x, g.y[1]) },
    items: [
      { kind: 'line', id: g.n(o.id), from: a, to: b, tone: o.tone ?? 'good', dashed: true, weight: 2, ...extra },
      { kind: 'label', id: g.n(`${o.id}-t`), at: b, tex: o.tex, tone: o.tone ?? 'good', place: o.place ?? 'above', ...extra },
    ],
  };
}
