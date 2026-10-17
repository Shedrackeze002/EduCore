/**
 * Figures for the Math 30-1 Unit 9 videos (counting, permutations, combinations and the binomial
 * theorem). Like `division.ts`, they are built only from standard diagram parts (labels, lines,
 * curves and shaded regions), so each goes into a diagram with `figure`:
 *
 * - `tree`: a tree diagram of two stages of choices (a shirt, then pants).
 * - `slots`: a row of boxes, one for each position to fill, with the number of choices in each.
 * - `roads`: several roads between two towns.
 * - `pascal`: Pascal's triangle, row by row, with arrows for the adding rule.
 * - `streets`: a grid of streets for shortest routes, with one route or the number of routes to
 *   each corner.
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** n choose r. */
export function choose(n: number, r: number): number {
  let v = 1;
  for (let i = 1; i <= r; i++) v = (v * (n - r + i)) / i;
  return Math.round(v);
}

/**
 * A tree diagram for choosing one of `first` and then one of `second`, drawn left to right: a
 * branch from the start to each first choice, and from each first choice a branch to each second
 * choice. The outcomes are numbered down the right.
 *
 * Parts: `start`; the first branches `b0`, `b1`… with their labels `l0`, `l1`… (group `s1`); the
 * branches from first choice i, `b<i>-0`, `b<i>-1`…, with their labels `l<i>-0`… (group `s2-<i>`);
 * and the outcome numbers `k1`, `k2`… (group `count`).
 */
export function tree(o: { name?: string; first: string[]; second: string[]; room?: number }): Part {
  const n = namer(o.name);
  const room = o.room ?? 2;
  const [x1, x2] = [2.2, 2.2 + room];
  const x3 = x2 + 2;
  const x4 = x3 + room + 0.7;
  const leaves = o.first.length * o.second.length;
  const mid = (leaves - 1) / 2;
  const points: Record<string, P> = { [n('S')]: [0, mid], [n('edge-l')]: [-1, mid], [n('edge-r')]: [x4 + 0.3, mid] };
  const items: DiagramItem[] = [{ kind: 'label', id: n('start'), at: n('S'), tex: '\\text{Start}', tone: 'muted', place: 'left' }];
  o.first.forEach((f, i) => {
    const ys = o.second.map((_, j) => leaves - 1 - (i * o.second.length + j));
    points[n(`F${i}`)] = [x1, (ys[0] + ys[ys.length - 1]) / 2];
    points[n(`G${i}`)] = [x2, (ys[0] + ys[ys.length - 1]) / 2];
    items.push(
      { kind: 'line', id: n(`b${i}`), from: n('S'), to: n(`F${i}`), tone: 'muted', weight: 3, group: n('s1') },
      { kind: 'label', id: n(`l${i}`), at: n(`F${i}`), tex: `\\text{${f}}`, tone: 'theta', place: 'right', group: n('s1') },
    );
    o.second.forEach((s, j) => {
      const id = `${i}-${j}`;
      const k = i * o.second.length + j + 1;
      points[n(`T${id}`)] = [x3, ys[j]];
      points[n(`K${id}`)] = [x4, ys[j]];
      items.push(
        { kind: 'line', id: n(`b${id}`), from: n(`G${i}`), to: n(`T${id}`), tone: 'muted', weight: 3, group: n(`s2-${i}`) },
        { kind: 'label', id: n(`l${id}`), at: n(`T${id}`), tex: `\\text{${s}}`, tone: 'adj', place: 'right', group: n(`s2-${i}`) },
        { kind: 'label', id: n(`k${k}`), at: n(`K${id}`), tex: String(k), tone: 'good', place: 'center', group: n('count') },
      );
    });
  });
  return { points, items };
}

/**
 * A row of boxes, one for each position to fill (the characters of a licence plate, the digits of
 * a number, the medals of a race), with the number of choices written in each box and what the box
 * is for written under it. Boxes are `size` wide unless `widths` widens some (a block of people
 * taped together); an empty value or caption is left out.
 *
 * Parts: every box's sides (group `boxes`); the values `v0`, `v1`… (group `values`); the captions
 * `c0`, `c1`… (group `captions`); the multiplication signs between boxes `x1`, `x2`… (group
 * `times`); and for each box listed in `shade`, a yellow shading `f<i>`, shown on its own to mark a
 * box with a rule.
 */
export function slots(o: { name?: string; values: string[]; captions?: string[]; size?: number; widths?: number[]; gap?: number; at?: P; tone?: DiagramTone; shade?: number[] }): Part {
  const n = namer(o.name);
  const s = o.size ?? 1.4;
  const g = o.gap ?? 0.8;
  const [x0, y0] = o.at ?? [0, 0];
  const points: Record<string, P> = {};
  const shades: DiagramItem[] = [];
  const items: DiagramItem[] = [];
  let l = x0;
  o.values.forEach((v, i) => {
    const w = o.widths?.[i] ?? s;
    const r = l + w;
    const c = (k: string) => n(`B${i}${k}`);
    Object.assign(points, { [c('a')]: [l, y0], [c('b')]: [r, y0], [c('c')]: [r, y0 + s], [c('d')]: [l, y0 + s], [c('m')]: [l + w / 2, y0 + s / 2], [c('u')]: [l + w / 2, y0] });
    if (o.shade?.includes(i)) shades.push({ kind: 'region', id: n(`f${i}`), points: [c('a'), c('b'), c('c'), c('d')], tone: 'theta', shade: 0.2 });
    for (const [a, b] of [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'a']]) {
      items.push({ kind: 'line', id: n(`e${i}${a}${b}`), from: c(a), to: c(b), tone: 'ink', weight: 3, group: n('boxes') });
    }
    if (v) items.push({ kind: 'label', id: n(`v${i}`), at: c('m'), tex: v, tone: o.tone ?? 'brand', place: 'center', group: n('values') });
    const cap = o.captions?.[i];
    if (cap) items.push({ kind: 'label', id: n(`c${i}`), at: c('u'), tex: cap, tone: 'muted', place: 'below', group: n('captions') });
    if (i > 0) {
      points[n(`X${i}`)] = [l - g / 2, y0 + s / 2];
      items.push({ kind: 'label', id: n(`x${i}`), at: n(`X${i}`), tex: '\\times', tone: 'muted', place: 'center', group: n('times') });
    }
    l = r + g;
  });
  return { points, items: [...shades, ...items] };
}

/**
 * `count` roads from one town to another, each a curve bowed out from the straight line by its
 * entry in `bows` (in diagram units; positive bows to the left, looking from `from` to `to`).
 * Parts: the roads `<id>0`, `<id>1`… (group `<id>`).
 */
export function roads(o: { id: string; from: P; to: P; bows: number[]; tone?: DiagramTone }): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const [dx, dy] = [o.to[0] - o.from[0], o.to[1] - o.from[1]];
  const len = Math.hypot(dx, dy);
  const nrm: P = [-dy / len, dx / len];
  const mid = lerp(o.from, o.to, 0.5);
  o.bows.forEach((bow, i) => {
    const ctrl: P = [mid[0] + nrm[0] * 2 * bow, mid[1] + nrm[1] * 2 * bow];
    const names: string[] = [];
    for (let k = 0; k <= 16; k++) {
      const t = k / 16;
      const name = `${o.id}${i}-${k}`;
      // A quadratic Bézier curve through the two towns, pulled toward the control point.
      points[name] = [(1 - t) ** 2 * o.from[0] + 2 * (1 - t) * t * ctrl[0] + t ** 2 * o.to[0], (1 - t) ** 2 * o.from[1] + 2 * (1 - t) * t * ctrl[1] + t ** 2 * o.to[1]];
      names.push(name);
    }
    items.push({ kind: 'curve', id: `${o.id}${i}`, points: names, tone: o.tone ?? 'muted', weight: 3, group: o.id });
  });
  return { points, items };
}

/**
 * Pascal's triangle: row n (0 at the top, rows `dy` apart) holds entries r = 0 to n, centred, `dx` apart, each
 * written by `entry(n, r)` (the number itself by default, or for example `{}_{n}C_{r}`).
 *
 * Parts: each entry `r<n>-<r>` (group `row<n>`); for each [n, r] in `adds`, two arrows from the
 * two entries above into entry r of row n (group `add<n>-<r>`); and with `sums`, each row's sum
 * `s<n>` in a column on the right under the heading `sum` (group `sums`).
 */
export function pascal(o: { name?: string; rows: number; at?: P; dx?: number; dy?: number; entry?: (n: number, r: number) => string; adds?: [number, number][]; sums?: boolean }): Part {
  const nm = namer(o.name);
  const dx = o.dx ?? 1.3;
  const dy = o.dy ?? 1.15;
  const [x0, y0] = o.at ?? [0, 0];
  const pos = (n: number, r: number): P => [x0 + (r - n / 2) * dx, y0 - n * dy];
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let n = 0; n < o.rows; n++) {
    for (let r = 0; r <= n; r++) {
      points[nm(`R${n}-${r}`)] = pos(n, r);
      items.push({ kind: 'label', id: nm(`r${n}-${r}`), at: nm(`R${n}-${r}`), tex: o.entry ? o.entry(n, r) : String(choose(n, r)), place: 'center', group: nm(`row${n}`) });
    }
  }
  for (const [n, r] of o.adds ?? []) {
    const c = pos(n, r);
    [pos(n - 1, r - 1), pos(n - 1, r)].forEach((p, i) => {
      const id = nm(`add${n}-${r}-${i}`);
      points[`${id}a`] = lerp(p, c, 0.3);
      points[`${id}b`] = lerp(p, c, 0.72);
      items.push({ kind: 'line', id, from: `${id}a`, to: `${id}b`, tone: 'theta', weight: 2.5, arrow: true, group: nm(`add${n}-${r}`) });
    });
  }
  if (o.sums) {
    const x = x0 + ((o.rows - 1) / 2) * dx + 1.6 * dx;
    points[nm('SH')] = [x, y0 + 0.9 * dy];
    items.push({ kind: 'label', id: nm('sum-head'), at: nm('SH'), tex: '\\text{sum}', tone: 'muted', place: 'center', group: nm('sums') });
    for (let n = 0; n < o.rows; n++) {
      points[nm(`S${n}`)] = [x, y0 - n * dy];
      items.push({ kind: 'label', id: nm(`s${n}`), at: nm(`S${n}`), tex: String(2 ** n), tone: 'theta', place: 'center', group: nm('sums') });
    }
  }
  return { points, items };
}

/**
 * A grid of streets `cols` blocks east and `rows` blocks north, from A at the bottom left to B at
 * the top right, for counting shortest routes.
 *
 * Parts: the streets (group `grid`); `A` and `B`; with `route` (a string of E and N moves), its
 * blocks `m0`, `m1`…, each labelled with its letter (group `route`); with `closed`, the closed
 * corner `X`; and with `counts`, the number of routes from A to each corner (i blocks east, j
 * north) as `n<i>-<j>`: each above left of a dot at its corner: the corners along the bottom and the left side in the group `edge`, the
 * closed corner's 0 in `closed`, and the rest in the group `d<i + j>` (a diagonal, since each count
 * adds the counts on its left and below it, which lie on the diagonal before).
 */
export function streets(o: { name?: string; cols: number; rows: number; route?: string; closed?: [number, number]; counts?: boolean }): Part {
  const n = namer(o.name);
  const pt = (i: number, j: number) => n(`P${i}-${j}`);
  const points: Record<string, P> = {};
  for (let i = 0; i <= o.cols; i++) for (let j = 0; j <= o.rows; j++) points[pt(i, j)] = [i, j];
  const items: DiagramItem[] = [];
  for (let i = 0; i <= o.cols; i++) items.push({ kind: 'line', id: n(`v${i}`), from: pt(i, 0), to: pt(i, o.rows), tone: 'muted', weight: 2.5, group: n('grid') });
  for (let j = 0; j <= o.rows; j++) items.push({ kind: 'line', id: n(`h${j}`), from: pt(0, j), to: pt(o.cols, j), tone: 'muted', weight: 2.5, group: n('grid') });
  if (o.route) {
    let [i, j] = [0, 0];
    [...o.route].forEach((m, k) => {
      const from = pt(i, j);
      if (m === 'E') i++;
      else j++;
      items.push({ kind: 'line', id: n(`m${k}`), from, to: pt(i, j), tone: 'brand', weight: 6, label: `\\text{${m}}`, group: n('route') });
    });
  }
  const isClosed = (i: number, j: number) => !!o.closed && o.closed[0] === i && o.closed[1] === j;
  if (o.counts) {
    const ways: number[][] = [];
    for (let i = 0; i <= o.cols; i++) {
      ways.push([]);
      for (let j = 0; j <= o.rows; j++) {
        ways[i][j] = isClosed(i, j) ? 0 : i === 0 && j === 0 ? 1 : (i > 0 ? ways[i - 1][j] : 0) + (j > 0 ? ways[i][j - 1] : 0);
        if (i === 0 && j === 0) continue;
        const end = i === o.cols && j === o.rows;
        const group = isClosed(i, j) ? 'closed' : i === 0 || j === 0 ? 'edge' : `d${i + j}`;
        items.push({ kind: 'label', id: n(`n${i}-${j}`), at: pt(i, j), tex: String(ways[i][j]), tone: isClosed(i, j) ? 'bad' : end ? 'good' : 'ink', place: 'above left', dot: true, group: n(group) });
      }
    }
  }
  // A and B sit clear of the route's letters and of the counts, which are above left of their corners.
  items.push({ kind: 'label', id: n('A'), at: pt(0, 0), tex: '\\text{A}', dot: true, place: o.route ? 'left' : 'below left' });
  items.push({ kind: 'label', id: n('B'), at: pt(o.cols, o.rows), tex: '\\text{B}', dot: true, place: 'right' });
  if (o.closed) items.push({ kind: 'label', id: n('X'), at: pt(...o.closed), tex: '\\text{X}', tone: 'bad', dot: true, place: 'below right' });
  return { points, items };
}
