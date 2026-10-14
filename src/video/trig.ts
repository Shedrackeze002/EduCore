/**
 * Trigonometry figures for video diagrams: an angle in standard position, with its reference
 * angle and the reference triangle made by dropping a perpendicular from a point on the terminal
 * arm. Like the solids (`solids.ts`), it returns points and named parts to put into a diagram with
 * `figure`. Angles are in degrees, anticlockwise from the positive x-axis; arcs are yellow, x
 * blue, y orange and r pink, as for SOH CAH TOA in every video.
 */
import type { DiagramItem } from './script.ts';
import type { Part } from './solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const rad = (deg: number) => (deg * Math.PI) / 180;

/** The reference angle of `deg` (0 to 360): the acute angle between its terminal arm and the x-axis. */
export function referenceAngle(deg: number): number {
  const d = ((deg % 360) + 360) % 360;
  if (d <= 90) return d;
  if (d <= 180) return 180 - d;
  if (d <= 270) return d - 180;
  return 360 - d;
}

/**
 * The angle `deg` in standard position: the x and y axes, the terminal arm from the origin to P
 * (`len` units long, 4 by default), and an arc turning anticlockwise from the positive x-axis,
 * labelled `label`. `quadrants` numbers the quadrants I to IV. `ref` (a label) marks the reference
 * angle between the arm and the nearer half of the x-axis, and `drop` draws the dashed
 * perpendicular from P to the x-axis, making the reference triangle. `point` names P (TeX), and
 * `sides` labels the triangle: `x` along the axis, `y` up the perpendicular, `r` along the arm.
 * `axes: false` and `arc: false` leave out the axes and the arc, to draw more arms on one set of
 * axes (one reference angle in all four quadrants). `compact` shortens the halves of the axes the
 * arm does not reach, so the reference triangle is drawn bigger.
 *
 * Parts: `axes` (a group: the axes and their names), `arm` (the terminal arm), `arc` (a group:
 * the arc and its label), `quads` (a group), `ref` (the reference angle), `tri` (a group: the
 * perpendicular and its right-angle mark), `P`, and the side labels `x`, `y` and `r`.
 */
export function standardAngle(o: { name?: string; deg: number; len?: number; label?: string; quadrants?: boolean; ref?: string; drop?: boolean; point?: string; sides?: { x?: string; y?: string; r?: string }; axes?: boolean; arc?: boolean; compact?: boolean }): Part {
  const n = namer(o.name);
  const L = o.len ?? 4;
  const a = rad(o.deg);
  const Pt: P = [L * Math.cos(a), L * Math.sin(a)];
  const right = Math.cos(a) >= 0;
  const up = Math.sin(a) >= 0;
  const full = L + 0.6;
  const short = o.compact ? 0.45 * L : full;
  const points: Record<string, P> = {
    [n('O')]: [0, 0],
    [n('xl')]: [right ? -short : -full, 0],
    [n('xr')]: [right ? full : short, 0],
    [n('yd')]: [0, up ? -short : -full],
    [n('yu')]: [0, up ? full : short],
    [n('P')]: Pt,
    [n('F')]: [Pt[0], 0],
    // The end of the x-axis the reference angle is measured to.
    [n('near')]: [right ? L : -L, 0],
  };
  const axes = n('axes');
  const items: DiagramItem[] = [];
  if (o.axes !== false) {
    items.push(
      { kind: 'line', id: n('x-axis'), from: n('xl'), to: n('xr'), tone: 'muted', weight: 2, arrow: true, group: axes },
      { kind: 'line', id: n('y-axis'), from: n('yd'), to: n('yu'), tone: 'muted', weight: 2, arrow: true, group: axes },
      { kind: 'label', id: n('x-name'), at: n('xr'), tex: 'x', tone: 'muted', place: 'right', group: axes },
      { kind: 'label', id: n('y-name'), at: n('yu'), tex: 'y', tone: 'muted', place: 'above', group: axes },
    );
  }
  if (o.quadrants) {
    (['I', 'II', 'III', 'IV'] as const).forEach((q, i) => {
      // Low in each quadrant, clear of arms at 45°, 135°… and of the arm's end.
      const [sx, sy] = [i === 0 || i === 3 ? 1 : -1, i < 2 ? 1 : -1];
      points[n(`q${i}`)] = [0.8 * L * sx, 0.4 * L * sy];
      items.push({ kind: 'label', id: n(`q${q}`), at: n(`q${i}`), tex: `\\text{${q}}`, tone: 'muted', place: 'center', group: n('quads') });
    });
  }
  // The arc from the positive x-axis to the arm, drawn as a curve so it can pass 180°.
  const arc = n('arc');
  if (o.arc !== false) {
    const steps = Math.max(8, Math.ceil(Math.abs(o.deg) / 6));
    const names: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = rad((o.deg * i) / steps);
      points[n(`a${i}`)] = [0.15 * L * Math.cos(t), 0.15 * L * Math.sin(t)];
      names.push(n(`a${i}`));
    }
    items.push({ kind: 'curve', id: n('arc-curve'), points: names, tone: 'theta', weight: 3, group: arc });
  }
  if (o.label && o.arc !== false) {
    const mid = rad(o.deg / 2);
    points[n('arc-at')] = [0.3 * L * Math.cos(mid), 0.3 * L * Math.sin(mid)];
    items.push({ kind: 'label', id: n('arc-label'), at: n('arc-at'), tex: o.label, tone: 'theta', place: 'center', group: arc });
  }
  if (o.drop) {
    items.push(
      { kind: 'line', id: n('drop'), from: n('P'), to: n('F'), tone: 'opp', dashed: true, group: n('tri') },
      { kind: 'right', id: n('drop-mark'), at: n('F'), from: n('O'), to: n('P'), group: n('tri') },
    );
  }
  items.push({ kind: 'line', id: n('arm'), from: n('O'), to: n('P'), tone: 'brand', weight: 3.5 });
  if (o.ref) items.push({ kind: 'angle', id: n('ref'), at: n('O'), from: n('near'), to: n('P'), tone: 'hyp', label: o.ref, r: 58, labelDist: 108 });
  // Side labels go outside the reference triangle O–F–P. Looking along x (O to F) or y (F to P),
  // the triangle is on the left when x and y have the same sign; along r (O to P), it is the
  // other way round.
  const same = Pt[0] * Pt[1] > 0;
  const outside = same ? 'right' : 'left';
  if (o.sides?.x) items.push({ kind: 'line', id: n('x'), from: n('O'), to: n('F'), tone: 'adj', weight: 3.5, label: o.sides.x, labelSide: outside });
  if (o.sides?.y) items.push({ kind: 'line', id: n('y'), from: n('F'), to: n('P'), tone: 'opp', weight: 3.5, label: o.sides.y, labelSide: outside });
  if (o.sides?.r) items.push({ kind: 'line', id: n('r'), from: n('O'), to: n('P'), tone: 'hyp', weight: 3.5, label: o.sides.r, labelSide: same ? 'left' : 'right' });
  items.push({ kind: 'label', id: n('P-dot'), at: n('P'), tex: o.point ?? '', tone: 'brand', dot: true, place: Pt[1] >= 0 ? (right ? 'above right' : 'above left') : right ? 'below right' : 'below left', group: n('P') });
  return { points, items };
}

/**
 * The CAST rule: the x and y axes, with the ratios that are positive in each quadrant (All in I,
 * Sine in II, Tangent in III, Cosine in IV). The axes reach `len` units (4 by default) each way.
 *
 * Parts: `axes` (a group), and `A`, `S`, `T` and `C` (each a group: the quadrant's letter and
 * its ratio).
 */
export function cast(o: { name?: string; len?: number } = {}): Part {
  const n = namer(o.name);
  const L = o.len ?? 4;
  const points: Record<string, P> = { [n('xl')]: [-L, 0], [n('xr')]: [L, 0], [n('yd')]: [0, -L], [n('yu')]: [0, L] };
  const axes = n('axes');
  const items: DiagramItem[] = [
    { kind: 'line', id: n('x-axis'), from: n('xl'), to: n('xr'), tone: 'muted', weight: 2, arrow: true, group: axes },
    { kind: 'line', id: n('y-axis'), from: n('yd'), to: n('yu'), tone: 'muted', weight: 2, arrow: true, group: axes },
    { kind: 'label', id: n('x-name'), at: n('xr'), tex: 'x', tone: 'muted', place: 'right', group: axes },
    { kind: 'label', id: n('y-name'), at: n('yu'), tex: 'y', tone: 'muted', place: 'above', group: axes },
  ];
  const quads = [
    { key: 'A', at: [1, 1], text: '\\text{all} > 0', tone: 'good' },
    { key: 'S', at: [-1, 1], text: '\\sin\\theta > 0', tone: 'opp' },
    { key: 'T', at: [-1, -1], text: '\\tan\\theta > 0', tone: 'theta' },
    { key: 'C', at: [1, -1], text: '\\cos\\theta > 0', tone: 'adj' },
  ] as const;
  for (const q of quads) {
    points[n(`${q.key}-at`)] = [0.5 * L * q.at[0], 0.62 * L * q.at[1]];
    points[n(`${q.key}-note`)] = [0.5 * L * q.at[0], 0.32 * L * q.at[1]];
    items.push(
      { kind: 'label', id: n(`${q.key}-letter`), at: n(`${q.key}-at`), tex: `\\mathbf{${q.key}}`, tone: q.tone, place: 'center', group: n(q.key) },
      { kind: 'label', id: n(`${q.key}-ratio`), at: n(`${q.key}-note`), tex: q.text, tone: q.tone, place: 'center', group: n(q.key) },
    );
  }
  return { points, items };
}
