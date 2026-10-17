/**
 * Helpers for the Math 30-1 Unit 8 videos (rational functions and combining functions), built
 * only from the standard graph parts in `src/video/graph.ts`, so they go into a diagram with
 * `figure`.
 *
 * A rational function is drawn one branch at a time, between its vertical asymptotes, so a curve
 * never joins across an asymptote. Asymptotes are dashed lines across the whole plane, and their
 * names and other labels are placed by hand, clear of the curves.
 */
import type { DiagramTone, Place } from '@/video/script.ts';
import { plot, polyline, type Plane } from '@/video/graph.ts';
import type { Part } from '@/video/solids.ts';

const join = (parts: Part[]): Part => ({ points: Object.assign({}, ...parts.map((p) => p.points)), items: parts.flatMap((p) => p.items) });

/**
 * The graph of `f`, one branch between each pair of vertical asymptotes `breaks`, drawn finely
 * so it meets the edge of the plane where it really does. Parts: the branches `id-0`, `id-1`…
 * from left to right, all in the group `id`.
 */
export function branches(g: Plane, o: { id: string; f: (x: number) => number; breaks?: number[]; from?: number; to?: number; tone?: DiagramTone; samples?: number }): Part {
  const from = o.from ?? g.x[0];
  const to = o.to ?? g.x[1];
  const cuts = [from, ...[...(o.breaks ?? [])].sort((a, b) => a - b), to];
  const eps = 1e-4 * (to - from);
  const parts = cuts.slice(1).map((end, k) =>
    plot(g, {
      id: `${o.id}-${k}`,
      f: o.f,
      from: k === 0 ? cuts[0] : cuts[k] + eps,
      to: k === cuts.length - 2 ? end : end - eps,
      tone: o.tone,
      samples: o.samples ?? 600,
    }),
  );
  const all = join(parts);
  return { points: all.points, items: all.items.map((it) => ({ ...it, group: g.n(o.id) })) };
}

/** A dashed vertical asymptote x = `x` across the plane: the part `id` (a group). */
export function vAsym(g: Plane, id: string, x: number, tone: DiagramTone = 'theta'): Part {
  return polyline(g, { id, points: [[x, g.y[0]], [x, g.y[1]]], tone, dashed: true });
}

/** A dashed horizontal asymptote y = `y` across the plane: the part `id` (a group). */
export function hAsym(g: Plane, id: string, y: number, tone: DiagramTone = 'theta'): Part {
  return polyline(g, { id, points: [[g.x[0], y], [g.x[1], y]], tone, dashed: true });
}

/** A dashed segment between two points of the plane (reading a value off a graph): the part `id`. */
export function guide(g: Plane, id: string, from: [number, number], to: [number, number], tone: DiagramTone = 'muted', arrow = false): Part {
  const [a, b] = [g.n(`${id}-a`), g.n(`${id}-b`)];
  return { points: { [a]: g.map(...from), [b]: g.map(...to) }, items: [{ kind: 'line', id: g.n(id), from: a, to: b, tone, dashed: true, weight: 2.5, ...(arrow ? { arrow: true } : {}) }] };
}

/**
 * Axis numbers along the plane's bottom edge (`xs`) and left edge (`ys`), in the plane's `axes`
 * group, so showing `d.axes` shows them. A rational function hugs its asymptotes, which are often
 * the axes, so numbers written along the axes would sit under the curve; use these with a plane
 * drawn with `every: 0`. Parts: `ex0`, `ex1`… and `ey0`, `ey1`….
 */
export function edgeNumbers(g: Plane, o: { xs?: number[]; ys?: number[] }): Part {
  const points: Part['points'] = {};
  const items: Part['items'] = [];
  (o.xs ?? []).forEach((x, i) => {
    const id = g.n(`ex${i}`);
    points[id] = g.map(x, g.y[0]);
    items.push({ kind: 'label', id, at: id, tex: String(x), tone: 'muted', place: 'below', group: g.n('axes') });
  });
  (o.ys ?? []).forEach((y, j) => {
    const id = g.n(`ey${j}`);
    points[id] = g.map(g.x[0], y);
    items.push({ kind: 'label', id, at: id, tex: String(y), tone: 'muted', place: 'left', group: g.n('axes') });
  });
  return { points, items };
}

/** Edge numbers at every multiple of `xStep` across and `yStep` up the plane (see `edgeNumbers`). */
export function numbers(g: Plane, xStep: number, yStep = xStep): Part {
  const list = ([a, b]: [number, number], s: number) => {
    const out: number[] = [];
    for (let k = Math.ceil(a / s - 1e-9); k * s <= b + 1e-9; k++) out.push(Number((k * s).toFixed(6)));
    return out;
  };
  return edgeNumbers(g, { xs: list(g.x, xStep), ys: list(g.y, yStep) });
}

/** A label (TeX) with no dot at the plane's point (x, y), such as an asymptote's name: the part `id`. */
export function tag(g: Plane, id: string, x: number, y: number, tex: string, place: Place = 'center', tone: DiagramTone = 'theta'): Part {
  const at = g.n(`${id}-at`);
  return { points: { [at]: g.map(x, y) }, items: [{ kind: 'label', id: g.n(id), at, tex, tone, place }] };
}
