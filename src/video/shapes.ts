/**
 * Flat shapes for video diagrams: a floor, a yard or a garden bed drawn as an outline, with its
 * sides labelled, for perimeter and area. Like the solids (`solids.ts`), it returns points and
 * named parts to put into a diagram with `figure`.
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
