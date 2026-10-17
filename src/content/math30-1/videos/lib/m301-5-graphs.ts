/**
 * Helpers for the Math 30-1 Unit 5 videos (graphs of sine, cosine and tangent), built only from
 * the standard graph parts in `src/video/graph.ts`, so they go into a diagram with `figure`.
 *
 * A wave crosses the x-axis at π, 2π… exactly where `plane` writes its numbers, and runs through
 * them. So these graphs are drawn with `every: 0` and numbered by `edgeNumbers` along the bottom
 * and left edges of the plane instead, clear of every curve.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import { piTex, plot, type Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

/** The numbers from `from` to `to` in steps of `step` (rounded, so π/2 steps land on multiples of π/2). */
export function steps(from: number, to: number, step: number): number[] {
  const list: number[] = [];
  for (let k = Math.ceil(from / step - 1e-9); k * step <= to + 1e-9; k++) list.push(k * step);
  return list;
}

/**
 * Axis numbers along the plane's bottom edge (`xs`, in multiples of π unless `xTex` says
 * otherwise) and left edge (`ys`), in the plane's `axes` group, so showing `d.axes` shows them.
 * Parts: `ex0`, `ex1`… and `ey0`, `ey1`… (prefixed with the plane's name).
 */
export function edgeNumbers(g: Plane, o: { xs?: number[]; ys?: number[]; xTex?: (x: number) => string; yTex?: (y: number) => string }): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  (o.xs ?? []).forEach((x, i) => {
    const id = g.n(`ex${i}`);
    points[id] = g.map(x, g.y[0]);
    items.push({ kind: 'label', id, at: id, tex: (o.xTex ?? piTex)(x), tone: 'muted', place: 'below', group: g.n('axes') });
  });
  // A little left of the edge, so a curve that runs to the edge does not touch them.
  const dx = 0.02 * (g.map(g.x[1], 0)[0] - g.map(g.x[0], 0)[0]);
  (o.ys ?? []).forEach((y, j) => {
    const id = g.n(`ey${j}`);
    const [px, py] = g.map(g.x[0], y);
    points[id] = [px - dx, py];
    items.push({ kind: 'label', id, at: id, tex: (o.yTex ?? String)(y), tone: 'muted', place: 'left', group: g.n('axes') });
  });
  return { points, items };
}

/**
 * A vertical line across the whole plane at `x`, dashed (an asymptote, or a time to read off), as
 * the part `id`, with an optional label at its top.
 */
export function vline(g: Plane, o: { id: string; x: number; tone?: DiagramTone; dashed?: boolean; label?: string; group?: string }): Part {
  const [a, b] = [g.n(`${o.id}-a`), g.n(`${o.id}-b`)];
  const points: Record<string, P> = { [a]: g.map(o.x, g.y[0]), [b]: g.map(o.x, g.y[1]) };
  const items: DiagramItem[] = [{ kind: 'line', id: g.n(o.id), from: a, to: b, tone: o.tone ?? 'muted', dashed: o.dashed ?? true, weight: 2, ...(o.group ? { group: g.n(o.group) } : {}) }];
  if (o.label) items.push({ kind: 'label', id: g.n(`${o.id}-t`), at: b, tex: o.label, tone: o.tone ?? 'muted', place: 'above', ...(o.group ? { group: g.n(o.group) } : {}) });
  return { points, items };
}

/**
 * A horizontal line across the whole plane at height `y` (a midline, a maximum, a level to reach),
 * as the part `id`, with an optional label at its right-hand end.
 */
export function hline(g: Plane, o: { id: string; y: number; tone?: DiagramTone; dashed?: boolean; label?: string; group?: string }): Part {
  const [a, b] = [g.n(`${o.id}-a`), g.n(`${o.id}-b`)];
  const points: Record<string, P> = { [a]: g.map(g.x[0], o.y), [b]: g.map(g.x[1], o.y) };
  const items: DiagramItem[] = [{ kind: 'line', id: g.n(o.id), from: a, to: b, tone: o.tone ?? 'muted', dashed: o.dashed ?? true, weight: 2, ...(o.group ? { group: g.n(o.group) } : {}) }];
  if (o.label) items.push({ kind: 'label', id: g.n(`${o.id}-t`), at: b, tex: o.label, tone: o.tone ?? 'muted', place: 'right', ...(o.group ? { group: g.n(o.group) } : {}) });
  return { points, items };
}

/** A label (TeX) placed by hand at the plane's (x, y), as the part `id`, clear of the curves. */
export function note(g: Plane, o: { id: string; x: number; y: number; tex: string; tone?: DiagramTone; place?: 'center' | 'above' | 'below' | 'left' | 'right'; group?: string }): Part {
  const at = g.n(`${o.id}-at`);
  return {
    points: { [at]: g.map(o.x, o.y) },
    items: [{ kind: 'label', id: g.n(o.id), at, tex: o.tex, tone: o.tone ?? 'ink', place: o.place ?? 'center', ...(o.group ? { group: g.n(o.group) } : {}) }],
  };
}

/** An arrow on the plane from (x1, y1) to (x2, y2), as the part `id`, with an optional label beside its middle. */
export function arrow(g: Plane, o: { id: string; from: [number, number]; to: [number, number]; tone?: DiagramTone; label?: string; side?: 'left' | 'right'; dashed?: boolean; group?: string }): Part {
  const [a, b] = [g.n(`${o.id}-a`), g.n(`${o.id}-b`)];
  return {
    points: { [a]: g.map(...o.from), [b]: g.map(...o.to) },
    items: [{ kind: 'line', id: g.n(o.id), from: a, to: b, tone: o.tone ?? 'theta', arrow: true, dashed: o.dashed, weight: 3, ...(o.label ? { label: o.label, labelSide: o.side ?? ('left' as const) } : {}), ...(o.group ? { group: g.n(o.group) } : {}) }],
  };
}

/**
 * A curve with vertical asymptotes, such as y = tan x: `f` plotted on each interval between the
 * `poles` (the asymptotes' x-values), as the parts `<id>0`, `<id>1`… in the group `id`.
 */
export function branches(g: Plane, o: { id: string; f: (x: number) => number; poles: number[]; tone?: DiagramTone; samples?: number }): Part {
  const inside = o.poles.filter((p) => p > g.x[0] && p < g.x[1]).sort((a, b) => a - b);
  const cuts = [g.x[0], ...inside, g.x[1]];
  const parts = cuts.slice(1).map((to, k) =>
    plot(g, { id: `${o.id}${k}`, f: o.f, from: k === 0 ? cuts[0] : cuts[k] + 1e-3, to: k === cuts.length - 2 ? to : to - 1e-3, tone: o.tone, samples: o.samples ?? 240 }),
  );
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items.map((i) => ({ ...i, group: g.n(o.id) }))) };
}

/** Dashed vertical asymptotes at each x in `xs` inside the plane, as the parts `<id>0`, `<id>1`… in the group `id`. */
export function asymptotes(g: Plane, o: { id: string; xs: number[]; tone?: DiagramTone }): Part {
  const parts = o.xs.filter((x) => x > g.x[0] && x < g.x[1]).map((x, k) => vline(g, { id: `${o.id}${k}`, x, tone: o.tone ?? 'bad', group: o.id }));
  return { points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) };
}
