/** Math 30-1 Unit 3 — Polynomial Functions (RF11, RF12). */
import { fixedChoice, mc, mcFigures, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { divisors, fmt, fmtFixed, fracLatex, gcdAll, isPerfectSquare, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Part, PlaneFigure, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Polynomial helpers. A polynomial is its coefficients in descending order:
// [a_n, ..., a_1, a_0].
// ---------------------------------------------------------------------------

type P = number[];
type Fn = (x: number) => number;
type Pt = [number, number];

const z0 = (x: number) => x + 0;
const deg = (p: P) => p.length - 1;

function trimP(p: P): P {
  let i = 0;
  while (i < p.length - 1 && Math.abs(p[i]) < 1e-12) i++;
  return p.slice(i);
}

function mul(p: P, q: P): P {
  const out: number[] = new Array(p.length + q.length - 1).fill(0);
  p.forEach((a, i) => q.forEach((b, j) => (out[i + j] += a * b)));
  return out.map(z0);
}

function addP(p: P, q: P): P {
  const n = Math.max(p.length, q.length);
  const pp = [...new Array(n - p.length).fill(0), ...p];
  const qq = [...new Array(n - q.length).fill(0), ...q];
  return trimP(pp.map((c, i) => z0(c + qq[i])));
}

const scaleP = (p: P, k: number): P => p.map((c) => z0(c * k));
const evalP = (p: P, x: number): number => p.reduce((s, c) => s * x + c, 0);

function fromRoots(lead: number, roots: number[]): P {
  return roots.reduce<P>((acc, r) => mul(acc, [1, -r]), [lead]);
}

/** A number in LaTeX: integers plainly, simple fractions as fractions. */
function texNum(x: number): string {
  if (Number.isInteger(x)) return fmt(x);
  const f = toFrac(x, 100);
  return f ? fracLatex(f) : fmt(x);
}

/** A polynomial in LaTeX (or as typed text when plain), highest power first. */
function ptex(p: P, v = 'x', plain = false): string {
  const n = deg(p);
  let out = '';
  p.forEach((c, i) => {
    if (c === 0) return;
    const e = n - i;
    const body = e === 0 ? '' : e === 1 ? v : plain ? `${v}^${e}` : `${v}^{${e}}`;
    const abs = Math.abs(c);
    const k = body && abs === 1 ? '' : fmt(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  });
  return out || '0';
}
const ptext = (p: P) => ptex(p, 'x', true);

/** A polynomial in LaTeX with its terms in the given order of exponents. */
function ptexOrder(p: P, exps: number[]): string {
  const n = deg(p);
  let out = '';
  for (const e of exps) {
    const c = p[n - e];
    if (!c) continue;
    const body = e === 0 ? '' : e === 1 ? 'x' : `x^{${e}}`;
    const abs = Math.abs(c);
    const k = body && abs === 1 ? '' : fmt(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out;
}

/** The leading term, e.g. -3x^{4}. */
function leadTermTex(p: P): string {
  return ptex([p[0], ...new Array(deg(p)).fill(0)]);
}

/** Signed sum of numbers: 8 - 12 + 5. */
function sumTex(vals: number[]): string {
  return vals.map((v, i) => (i === 0 ? fmt(v) : v < 0 ? ` - ${fmt(-v)}` : ` + ${fmt(v)}`)).join('');
}

/** P(a) worked out term by term: P(-2) = 2(-2)^3 - 3(-2)^2 + 5 = -16 - 12 + 5 = -23. */
function substTex(p: P, a: number, name = 'P'): string {
  const n = deg(p);
  const A = `(${fmt(a)})`;
  let s1 = '';
  const vals: number[] = [];
  p.forEach((c, i) => {
    if (c === 0) return;
    const e = n - i;
    const body = e === 0 ? '' : e === 1 ? A : `${A}^{${e}}`;
    const abs = Math.abs(c);
    const k = body && abs === 1 ? '' : fmt(abs);
    s1 += s1 === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
    vals.push(z0(c * a ** e));
  });
  const total = evalP(p, a);
  return vals.length > 1 ? `${name}(${fmt(a)}) = ${s1} = ${sumTex(vals)} = ${fmt(total)}` : `${name}(${fmt(a)}) = ${s1} = ${fmt(total)}`;
}

/** x - a as LaTeX: x - 3, x + 2, or x. */
const divisorTex = (a: number) => (a === 0 ? 'x' : a > 0 ? `x - ${fmt(a)}` : `x + ${fmt(-a)}`);
/** Why a has the sign it has. */
const aNote = (a: number) => (a < 0 ? `Write $x + ${fmt(-a)}$ as $x - (${fmt(a)})$, so $a = ${fmt(a)}$.` : `Here $a = ${fmt(a)}$.`);

/** Synthetic division of p by x - a. */
function synth(p: P, a: number) {
  const bottom: number[] = [p[0]];
  const mids: number[] = [];
  for (let i = 1; i < p.length; i++) {
    const m = z0(bottom[i - 1] * a);
    mids.push(m);
    bottom.push(z0(p[i] + m));
  }
  return { q: bottom.slice(0, -1), r: bottom[bottom.length - 1], mids, bottom };
}

/** The synthetic-division layout as display maths, with the remainder boxed. */
function synthTex(p: P, a: number): string {
  const { mids, bottom } = synth(p, a);
  const n = p.length;
  const top = [fmt(a), ...p.map((c) => fmt(c))].join(' & ');
  const mid = ['', '', ...mids.map((c) => fmt(c))].join(' & ');
  const bot = ['', ...bottom.slice(0, -1).map((c) => fmt(c)), `\\boxed{${fmt(bottom[n - 1])}}`].join(' & ');
  return `$$\\begin{array}{r|${'r'.repeat(n)}} ${top} \\\\ ${mid} \\\\ \\hline ${bot} \\end{array}$$`;
}

// ---------------------------------------------------------------------------
// Terms with unknown coefficients (k, m, n)
// ---------------------------------------------------------------------------

/** c·x^e, or c·s·x^e when s names an unknown coefficient. */
interface Term {
  e: number;
  c: number;
  s?: string;
}

function termsTex(ts: Term[]): string {
  let out = '';
  for (const t of ts) {
    if (t.c === 0) continue;
    const body = t.e === 0 ? '' : t.e === 1 ? 'x' : `x^{${t.e}}`;
    const abs = Math.abs(t.c);
    const k = t.s ? `${abs === 1 ? '' : fmt(abs)}${t.s}` : body && abs === 1 ? '' : fmt(abs);
    out += out === '' ? `${t.c < 0 ? '-' : ''}${k}${body}` : ` ${t.c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out;
}

/** The value at x = a as B + Σ A[s]·s. */
function evalTerms(ts: Term[], a: number): { B: number; A: Record<string, number> } {
  let B = 0;
  const A: Record<string, number> = {};
  for (const t of ts) {
    const v = t.c * a ** t.e;
    if (t.s) A[t.s] = (A[t.s] ?? 0) + v;
    else B += v;
  }
  return { B: z0(B), A };
}

/** A linear expression such as 4k + 4 or 4m + 2n - 3. */
function linSymTex(A: Record<string, number>, B: number, syms: string[]): string {
  let out = '';
  for (const s of syms) {
    const c = A[s] ?? 0;
    if (!c) continue;
    const k = Math.abs(c) === 1 ? '' : fmt(Math.abs(c));
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${s}` : ` ${c < 0 ? '-' : '+'} ${k}${s}`;
  }
  if (B !== 0 || out === '') out += out === '' ? fmt(B) : ` ${B < 0 ? '-' : '+'} ${fmt(Math.abs(B))}`;
  return out;
}

const symsOf = (ts: Term[]) => [...new Set(ts.filter((t) => t.s).map((t) => t.s!))].sort();

/** P(2) = (2)^3 + k(2)^2 - 5(2) + 6 = 8 + 4k - 10 + 6 = 4k + 4. */
function substTermsTex(ts: Term[], a: number, name = 'P'): string {
  const A = `(${fmt(a)})`;
  let s1 = '';
  let s2 = '';
  for (const t of ts) {
    if (t.c === 0) continue;
    const pw = t.e === 0 ? '' : t.e === 1 ? A : `${A}^{${t.e}}`;
    const abs = Math.abs(t.c);
    const coef = t.s ? `${abs === 1 ? '' : fmt(abs)}${t.s}` : pw && abs === 1 ? '' : fmt(abs);
    s1 += (s1 === '' ? (t.c < 0 ? '-' : '') : ` ${t.c < 0 ? '-' : '+'} `) + coef + pw;
    const v = z0(t.c * a ** t.e);
    const absV = Math.abs(v);
    const vs = t.s ? `${absV === 1 ? '' : fmt(absV)}${t.s}` : fmt(absV);
    s2 += (s2 === '' ? (v < 0 ? '-' : '') : ` ${v < 0 ? '-' : '+'} `) + vs;
  }
  const { A: AA, B } = evalTerms(ts, a);
  return `${name}(${fmt(a)}) = ${s1} = ${s2} = ${linSymTex(AA, B, symsOf(ts))}`;
}

// ---------------------------------------------------------------------------
// Factored form
// ---------------------------------------------------------------------------

/** A linear factor (p·x − q) raised to the power m; its zero is q/p. */
interface Fac {
  p: number;
  q: number;
  m: number;
}
const lin = (r: number, m = 1): Fac => ({ p: 1, q: r, m });
const zeroOf = (f: Fac) => z0(f.q / f.p);

function facBase(f: Fac): string {
  if (f.q === 0) return 'x';
  if (f.p === -1) return `(${fmt(-f.q)} - x)`; // (3 - x): used only for positive zeros
  const px = f.p === 1 ? 'x' : `${f.p}x`;
  return `(${px} ${f.q > 0 ? '-' : '+'} ${fmt(Math.abs(f.q))})`;
}

function facTex(f: Fac, plain = false): string {
  const b = facBase(f);
  if (f.m === 1) return b;
  return plain ? `${b}^${f.m}` : `${b}^{${f.m}}`;
}

/** a(x + 2)(x - 1)^2 in LaTeX, or as typed text when plain. */
function factoredTex(a: number, fs: Fac[], plain = false, quad?: P | null): string {
  const lead = a === 1 ? '' : a === -1 ? '-' : fmt(a);
  const body = fs.map((f) => facTex(f, plain)).join('') + (quad ? `(${plain ? ptext(quad) : ptex(quad)})` : '');
  return body ? lead + body : fmt(a);
}

function facsPoly(a: number, fs: Fac[]): P {
  let out: P = [a];
  for (const f of fs) for (let i = 0; i < f.m; i++) out = mul(out, [f.p, -f.q]);
  return out;
}

const facsFn = (a: number, fs: Fac[]): Fn => (x) => fs.reduce((s, f) => s * (f.p * x - f.q) ** f.m, a);

/** x first, then the other factors in order of their zeros. */
function sortFacs(fs: Fac[]): Fac[] {
  return [...fs].sort((u, v) => (u.q === 0 && v.q === 0 ? 0 : u.q === 0 ? -1 : v.q === 0 ? 1 : zeroOf(u) - zeroOf(v)));
}

/** Combine equal factors into powers. */
function groupFacs(fs: Fac[]): Fac[] {
  const out: Fac[] = [];
  for (const f of fs) {
    const same = out.find((g) => g.p === f.p && g.q === f.q);
    if (same) same.m += f.m;
    else out.push({ ...f });
  }
  return out;
}

/** f(0) worked out from the factored form. */
function factoredAt0(a: number, fs: Fac[], name = 'f'): string {
  const value = facsFn(a, fs)(0);
  const lhs = name === 'y' ? 'y' : `${name}(0)`;
  const when = name === 'y' ? ' when $x = 0$' : '';
  if (fs.some((f) => f.q === 0)) return `$${lhs} = 0$${when}, because $x$ is a factor.`;
  const lead = a === 1 ? '' : a === -1 ? '-' : fmt(a);
  const body = fs.map((f) => `(${fmt(z0(-f.q))})${f.m > 1 ? `^{${f.m}}` : ''}`).join('');
  return `$${lhs} = ${lead}${body} = ${fmt(value)}$${when}.`;
}

const pmList = (n: number) =>
  divisors(Math.abs(n))
    .map((d) => `\\pm ${d}`)
    .join(', ');

/** Integral-zero candidates in the order students test them: 1, -1, 2, -2, ... */
const candidates = (c0: number) => divisors(Math.abs(c0)).flatMap((d) => [d, -d]);

interface Factored {
  g: number;
  xPow: number;
  facs: Fac[];
  quad: P | null;
  steps: string[];
  /** Every real zero (rational), without repeats. */
  zeros: number[];
  tex: string;
  text: string;
}

/**
 * Factor a polynomial with integer coefficients whose zeros are integers, except for at most one
 * rational zero or one irreducible quadratic factor. The steps use the integral zero theorem,
 * the factor theorem and synthetic division.
 */
function factorize(p0: P, name = 'P', opts: { given?: number; noList?: boolean } = {}): Factored {
  const steps: string[] = [];
  let p = trimP(p0);
  let xPow = 0;
  while (p.length > 1 && p[p.length - 1] === 0) {
    p = p.slice(0, -1);
    xPow++;
  }
  const g = gcdAll(p) * Math.sign(p[0]);
  let R = p.map((c) => z0(c / g));
  let nm = name;
  if (g !== 1 || xPow > 0) {
    const gx = (g === 1 ? '' : g === -1 ? '-' : fmt(g)) + (xPow === 0 ? '' : xPow === 1 ? 'x' : `x^{${xPow}}`);
    steps.push(`Remove the common factor first: $${name}(x) = ${gx}(${ptex(R)})$.`);
    if (deg(R) > 2) {
      nm = 'R';
      steps.push(`Let $R(x) = ${ptex(R)}$ and factor it.`);
    }
  }
  const facs: Fac[] = [];
  let round = 0;
  while (deg(R) > 2) {
    const c0 = R[R.length - 1];
    let root: number | undefined;
    let intro = '';
    if (round === 0 && opts.given !== undefined && evalP(R, opts.given) === 0) {
      root = opts.given;
      intro = `$${divisorTex(root)}$ is a factor, so the division leaves no remainder.`;
    } else {
      if (round === 0 && !opts.noList) intro = `By the integral zero theorem, any integral zero of $${nm}(x)$ is a factor of the constant term $${fmt(c0)}$: $${pmList(c0)}$. `;
      else if (round > 0) intro = 'Look for a zero of the quotient (a zero can repeat). ';
      const tried: string[] = [];
      for (const c of candidates(c0)) {
        if (evalP(R, c) === 0) {
          root = c;
          break;
        }
        tried.push(`${nm}(${c}) = ${fmt(evalP(R, c))}`);
      }
      if (root === undefined) throw new Error(`no integral zero for ${ptext(R)}`);
      const shown = tried.length > 4 ? ['\\dots', ...tried.slice(-2)] : tried;
      intro += `${shown.length ? `Test the candidates: $${shown.join(',\\ ')}$ (not zero), then ` : 'Test: '}$${substTex(R, root, nm)}$, so $${divisorTex(root)}$ is a factor.`;
    }
    const { q } = synth(R, root);
    steps.push(`${intro} Divide by $${divisorTex(root)}$ with synthetic division:\n${synthTex(R, root)}\nThe quotient is $${ptex(q)}$.`);
    facs.push(lin(root));
    R = q;
    nm = 'Q';
    round++;
  }
  let quad: P | null = null;
  let mult = 1;
  if (deg(R) === 2) {
    const [A, B, C] = R;
    const disc = B * B - 4 * A * C;
    if (disc >= 0 && isPerfectSquare(disc)) {
      const s = Math.sqrt(disc);
      const two: Fac[] = [(-B - s) / (2 * A), (-B + s) / (2 * A)].map((u) => {
        const f = toFrac(u, 100)!;
        return { p: f.d, q: f.n, m: 1 };
      });
      mult = A / (two[0].p * two[1].p);
      const tTex = factoredTex(mult, groupFacs(sortFacs(two)));
      steps.push(`Factor the quadratic: $${ptex(R)} = ${tTex}$.`);
      facs.push(...two);
    } else {
      quad = R;
      steps.push(`The quadratic factor $${ptex(R)}$ does not factor over the integers (${disc < 0 ? 'its discriminant is negative, so it has no real zeros' : 'its discriminant is not a perfect square'}).`);
    }
  } else if (deg(R) === 1) {
    const f = toFrac(-R[1] / R[0], 100)!;
    mult = R[0] / f.d;
    facs.push({ p: f.d, q: f.n, m: 1 });
  }
  const all = groupFacs(sortFacs([...(xPow ? [{ p: 1, q: 0, m: xPow }] : []), ...facs]));
  const lead = z0(g * mult);
  const zeros = all.map(zeroOf);
  return { g: lead, xPow, facs: all, quad, steps, zeros, tex: factoredTex(lead, all, false, quad), text: factoredTex(lead, all, true, quad) };
}

// ---------------------------------------------------------------------------
// Graphs
// ---------------------------------------------------------------------------

const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;

/** x-coordinates of the turning points of f in [x0, x1]. */
function turningXs(f: Fn, x0: number, x1: number): number[] {
  const N = 800;
  const h = (x1 - x0) / N;
  const ys = Array.from({ length: N + 1 }, (_, i) => f(x0 + i * h));
  const out: number[] = [];
  for (let i = 1; i < N; i++) {
    const d1 = ys[i] - ys[i - 1];
    const d2 = ys[i + 1] - ys[i];
    if ((d1 > 0 && d2 <= 0) || (d1 < 0 && d2 >= 0)) {
      // refine with a ternary search on [x - h, x + h]
      let lo = x0 + (i - 1) * h;
      let hi = x0 + (i + 1) * h;
      const isMax = d1 > 0;
      for (let k = 0; k < 60; k++) {
        const m1 = lo + (hi - lo) / 3;
        const m2 = hi - (hi - lo) / 3;
        if ((f(m1) < f(m2)) === isMax) lo = m1;
        else hi = m2;
      }
      const x = (lo + hi) / 2;
      if (!out.length || x - out[out.length - 1] > 2 * h) out.push(x);
    }
  }
  return out;
}

/** Sample f across the grid as polylines clipped to the window. */
function curve(f: Fn, g: GridSpec, extra: number[] = []): Pt[][] {
  const m = 160;
  const raw: number[] = [];
  for (let k = 0; k <= m; k++) raw.push(g.xMin + ((g.xMax - g.xMin) * k) / m);
  for (const e of extra) if (e > g.xMin && e < g.xMax) raw.push(e);
  raw.sort((p, q) => p - q);
  const xs = raw.filter((x, i) => i === 0 || x - raw[i - 1] > 1e-6);
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const out: Pt[][] = [];
  let cur: Pt[] = [];
  for (let k = 0; k < xs.length; k++) {
    const y = f(xs[k]);
    const inNow = inside(y);
    if (k > 0) {
      const yp = f(xs[k - 1]);
      const inPrev = inside(yp);
      if (inPrev !== inNow) {
        const outside = inNow ? yp : y;
        const target = outside > g.yMax ? g.yMax : g.yMin;
        let lo = xs[k - 1];
        let hi = xs[k];
        for (let it = 0; it < 60; it++) {
          const mid = (lo + hi) / 2;
          if (inside(f(mid)) === inPrev) lo = mid;
          else hi = mid;
        }
        const cross: Pt = [r3(inPrev ? lo : hi), target];
        if (inPrev) {
          cur.push(cross);
          if (cur.length > 1) out.push(cur);
          cur = [];
        } else cur = [cross];
      }
    }
    if (inNow) cur.push([r3(xs[k]), r3(y)]);
  }
  if (cur.length > 1) out.push(cur);
  return out;
}

const Y_STEPS = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];

/** A window that shows every zero and turning point of the given functions. */
function polyWindow(fs: Fn[], zeros: number[], extraYs: number[] = []): GridSpec {
  const zs = zeros.length ? zeros : [0];
  let xMin = Math.min(-1, Math.floor(Math.min(...zs)) - 1);
  let xMax = Math.max(1, Math.ceil(Math.max(...zs)) + 1);
  while (xMax - xMin < 8) {
    if (xMax <= -xMin) xMax++;
    else xMin--;
  }
  let M = 2;
  for (const f of fs) {
    M = Math.max(M, Math.abs(f(0)));
    for (const x of turningXs(f, xMin, xMax)) M = Math.max(M, Math.abs(f(x)));
  }
  for (const y of extraYs) M = Math.max(M, Math.abs(y));
  const target = M * 1.15;
  const step = Y_STEPS.find((s) => target / s <= 6) ?? 2000;
  const yMax = Math.ceil(target / step) * step;
  // Widen until every graph is clearly heading off the grid at both edges, so the end behaviour shows.
  for (let i = 0; i < 3 && fs.some((f) => Math.abs(f(xMin)) < 0.5 * yMax); i++) xMin--;
  for (let i = 0; i < 3 && fs.some((f) => Math.abs(f(xMax)) < 0.5 * yMax); i++) xMax++;
  return step === 1 ? { xMin, xMax, yMin: -yMax, yMax } : { xMin, xMax, yMin: -yMax, yMax, xStep: 1, yStep: step };
}

/** Every turning point is inside the window and not squashed against the x-axis. */
function turnsVisible(f: Fn, g: GridSpec, minFrac = 0.18): boolean {
  for (const x of turningXs(f, g.xMin, g.xMax)) {
    const y = Math.abs(f(x));
    if (y < 1e-6) continue; // touching the axis at a repeated zero
    if (y < minFrac * g.yMax || y > g.yMax) return false;
  }
  return true;
}

const minus = (s: string) => s.replace(/-/g, '−');
const ptLabel = (x: number, y: number) => minus(`(${fmt(x)}, ${fmt(y)})`);

function polyFigure(f: Fn, g: GridSpec, opts: { zeros?: number[]; points?: PlanePoint[] } = {}): PlaneFigure {
  const extra = [...(opts.zeros ?? []), ...turningXs(f, g.xMin, g.xMax)];
  const fig: PlaneFigure = { type: 'plane', grid: g, polylines: curve(f, g, extra).map((points) => ({ points })) };
  if (opts.points?.length) fig.points = opts.points;
  return fig;
}

// ---------------------------------------------------------------------------
// End behaviour and shared wording
// ---------------------------------------------------------------------------

const QUAD_TEXT: Record<string, string> = {
  'odd,1': 'quadrant III to quadrant I',
  'odd,-1': 'quadrant II to quadrant IV',
  'even,1': 'quadrant II to quadrant I',
  'even,-1': 'quadrant III to quadrant IV',
};
const endKey = (n: number, a: number) => `${n % 2 ? 'odd' : 'even'},${a > 0 ? 1 : -1}`;
const endChoice = (k: string) => `Extends from ${QUAD_TEXT[k]}`;

function endMc(rng: Rng, n: number, a: number) {
  const k = endKey(n, a);
  return mc(rng, endChoice(k), Object.keys(QUAD_TEXT).filter((x) => x !== k).map(endChoice));
}

function endWhy(n: number, a: number): string {
  const k = endKey(n, a);
  const sign = a > 0 ? 'positive' : 'negative';
  if (n % 2)
    return `The degree, $${n}$, is odd, so the two ends point in opposite directions. The leading coefficient is ${sign}, so the graph ${a > 0 ? 'falls to the left and rises to the right' : 'rises to the left and falls to the right'}: it extends from ${QUAD_TEXT[k]}.`;
  return `The degree, $${n}$, is even, so both ends point the same way. The leading coefficient is ${sign}, so both ends ${a > 0 ? 'rise' : 'fall'}: the graph extends from ${QUAD_TEXT[k]}.`;
}

const PARITY_SIGN = [
  'Odd degree, positive leading coefficient',
  'Odd degree, negative leading coefficient',
  'Even degree, positive leading coefficient',
  'Even degree, negative leading coefficient',
];
const paritySignIndex = (n: number, a: number) => (n % 2 ? 0 : 2) + (a > 0 ? 0 : 1);

const BEHAVIOUR = [
  'Crosses the $x$-axis (like a line)',
  'Touches the $x$-axis and turns back (like a parabola)',
  'Crosses the $x$-axis with a flattened, S-shaped bend (like a cubic)',
];
const behaviourWords = (m: number) =>
  m === 1 ? 'crosses the $x$-axis' : m === 2 ? 'touches the $x$-axis and turns back' : 'crosses the $x$-axis with a flattened bend';

const NAMES = ['Aiyana', 'Mateo', 'Priya', 'Liam', 'Mei', 'Kwame', 'Sofia', 'Arjun', 'Chloé', 'Tariq', 'Noah', 'Amara', 'Jasmine', 'Ethan', 'Nadia', 'Owen', 'Leila', 'Dakota', 'Hamid', 'Grace'];

/** Distinct integers in [lo, hi]. */
function distinctInts(rng: Rng, n: number, lo: number, hi: number, exclude: number[] = []): number[] {
  const pool: number[] = [];
  for (let i = lo; i <= hi; i++) if (!exclude.includes(i)) pool.push(i);
  return rng.sample(pool, n);
}

const orList = (xs: number[]) => (xs.length === 1 ? `only $${xs[0]}$` : `${xs.slice(0, -1).map((x) => `$${x}$`).join(', ')} or $${xs[xs.length - 1]}$`);
const rangeInts = (a: number, b: number) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const zerosPart = (vals: number[], label = 'Zeros:'): Part => part({ kind: 'numbers', values: vals }, { label, placeholder: 'e.g. -2, 1, 3' });
const sortedZeros = (fs: Fac[]) => fs.map(zeroOf).sort((u, v) => u - v);
const xList = (vals: number[]) => vals.map((x) => `$x = ${texNum(x)}$`).join(', ');

/** A random polynomial of degree n with the given leading coefficient. */
function randPoly(rng: Rng, n: number, lead: number, zeroP = 0.3, max = 9): P {
  const p: P = [lead];
  for (let e = n - 1; e >= 0; e--) p.push(rng.chance(zeroP) ? 0 : rng.nonZero(-max, max));
  if (p.filter((c) => c !== 0).length < 3) p[n] = p[n] || rng.nonZero(-max, max);
  return p;
}

/** A polynomial with all-integer zeros whose turning points show clearly in its window. */
function nicePoly(make: () => { a: number; fs: Fac[] }, extraCheck: (g: GridSpec, f: Fn, fs: Fac[]) => boolean = () => true) {
  for (let i = 0; i < 80; i++) {
    const { a, fs } = make();
    const f = facsFn(a, fs);
    const g = polyWindow([f], fs.map(zeroOf));
    if (turnsVisible(f, g) && g.yMax <= 120 && extraCheck(g, f, fs)) return { a, fs, f, g };
  }
  const a = 1;
  const fs = [lin(-2), lin(1), lin(3)];
  const f = facsFn(a, fs);
  return { a, fs, f, g: polyWindow([f], fs.map(zeroOf)) };
}

const FN_NAMES = ['f', 'g', 'h', 'P'];

// ---------------------------------------------------------------------------
// 3.1 — Characteristics of polynomial functions
// ---------------------------------------------------------------------------

const polyFeatures = skill({
  id: 'm301-poly-features',
  name: 'Characteristics of polynomial functions',
  description: 'State the degree, leading coefficient, end behaviour, y-intercept and the possible numbers of x-intercepts and turning points of a polynomial function, and match polynomial graphs with equations.',
  outcomes: ['RF12'],
  lessonId: 'm301-3-1',
  gen(rng, d): GenOutput {
    const name = rng.pick(FN_NAMES);
    if (d === 1) {
      const n = rng.int(2, 5);
      const lead = rng.nonZero(-5, 5);
      const p = randPoly(rng, n, lead);
      if (rng.chance(0.5)) {
        // Degree, leading coefficient and y-intercept, sometimes with the terms out of order.
        const exps = p.map((_, i) => n - i).filter((e) => p[n - e] !== 0);
        let order = exps;
        if (rng.chance(0.6)) for (let t = 0; t < 10 && order[0] === n; t++) order = rng.shuffle(exps);
        const shuffled = order[0] !== n;
        const tex = ptexOrder(p, order);
        return {
          prompt: `For the polynomial function $${name}(x) = ${tex}$, state the degree, the leading coefficient and the $y$-intercept.`,
          parts: [numPart(n, { label: 'Degree:' }), numPart(lead, { label: 'Leading coefficient:' }), numPart(p[n], { label: '$y$-intercept:' })],
          hints: ['The degree is the greatest exponent of $x$. The leading coefficient is the coefficient of that term, wherever it is written.', 'The $y$-intercept is the value of the function at $x = 0$: the constant term.'],
          solution: [
            ...(shuffled ? [`Write the terms in descending order of degree: $${name}(x) = ${ptex(p)}$.`] : []),
            `The term with the greatest exponent is $${leadTermTex(p)}$, so the degree is $${n}$ and the leading coefficient is $${lead}$.`,
            `At $x = 0$ every term containing $x$ is $0$, so $${name}(0) = ${p[n]}$${p[n] === 0 ? ' (there is no constant term)' : ''}.`,
            `Degree $${n}$, leading coefficient $${lead}$, $y$-intercept $${p[n]}$.`,
          ],
        };
      }
      return {
        prompt: `Describe the end behaviour of the graph of $y = ${ptex(p)}$.`,
        parts: [part(endMc(rng, n, lead))],
        hints: ['Look only at the leading term: its degree (odd or even) and the sign of its coefficient.', 'Odd degree: the ends go in opposite directions. Even degree: both ends go the same way. A positive leading coefficient makes the right end rise.'],
        solution: [`The leading term is $${leadTermTex(p)}$: degree $${n}$, leading coefficient $${lead}$.`, endWhy(n, lead), `The graph extends from ${QUAD_TEXT[endKey(n, lead)]}.`],
      };
    }

    if (d === 2) {
      if (rng.chance(0.5)) {
        // End behaviour, possible numbers of x-intercepts, maximum turning points.
        const n = rng.int(3, 5);
        const lead = rng.nonZero(-4, 4);
        const p = randPoly(rng, n, lead);
        const exps = p.map((_, i) => n - i).filter((e) => p[n - e] !== 0);
        const order = rng.chance(0.4) ? rng.shuffle(exps) : exps;
        const tex = ptexOrder(p, order);
        const odd = n % 2 === 1;
        const correct = orList(rangeInts(odd ? 1 : 0, n));
        const wrong = [orList(rangeInts(odd ? 0 : 1, n)), `only $${n}$`, orList(rangeInts(0, n - 1)), orList(rangeInts(1, n - 1))];
        return {
          prompt: `For $${name}(x) = ${tex}$:`,
          parts: [
            part(endMc(rng, n, lead), { label: 'End behaviour:' }),
            part(mc(rng, correct, wrong), { label: 'Possible numbers of $x$-intercepts:' }),
            numPart(n - 1, { label: 'Maximum number of turning points:' }),
          ],
          hints: [
            'Find the degree $n$ and the leading coefficient first.',
            'A polynomial function of degree $n$ has at most $n$ $x$-intercepts and at most $n - 1$ turning points. An odd-degree graph must cross the $x$-axis at least once; an even-degree graph might not cross it at all.',
          ],
          solution: [
            `The leading term is $${leadTermTex(p)}$: degree $${n}$, leading coefficient $${lead}$.`,
            endWhy(n, lead),
            odd
              ? `The degree is odd, so the two ends are on opposite sides of the $x$-axis and the graph must cross it at least once. With degree $${n}$ it has at most $${n}$ $x$-intercepts: ${correct}.`
              : `The degree is even, so both ends are on the same side of the $x$-axis and the graph may never cross it. With degree $${n}$ it has at most $${n}$ $x$-intercepts: ${correct}.`,
            `A polynomial function of degree $${n}$ has at most $${n} - 1 = ${n - 1}$ turning points.`,
          ],
        };
      }
      // From a graph: parity and sign, x-intercepts, turning points.
      const { a, fs, f, g } = nicePoly(() => {
        const n = rng.pick([3, 3, 4, 4, 5]);
        const roots = distinctInts(rng, n, -4, 4);
        const a = n === 3 ? rng.pick([1, -1, 2, -2]) : rng.pick([1, -1]);
        return { a, fs: roots.map((r) => lin(r)), };
      });
      const n = fs.length;
      return {
        prompt: 'The graph of a polynomial function is shown.',
        figure: polyFigure(f, g, { zeros: fs.map(zeroOf) }),
        parts: [
          part(fixedChoice(PARITY_SIGN, paritySignIndex(n, a)), { label: 'Degree and leading coefficient:' }),
          numPart(n, { label: 'Number of $x$-intercepts:' }),
          numPart(n - 1, { label: 'Number of turning points:' }),
        ],
        hints: ['Look at the two ends of the graph. Opposite directions means odd degree; the same direction means even degree.', 'If the right end rises, the leading coefficient is positive. A turning point is where the graph changes from rising to falling or from falling to rising.'],
        solution: [
          `The graph extends from ${QUAD_TEXT[endKey(n, a)]}. ${n % 2 ? 'The ends point in opposite directions, so the degree is odd' : 'Both ends point the same way, so the degree is even'}; the right end ${a > 0 ? 'rises' : 'falls'}, so the leading coefficient is ${a > 0 ? 'positive' : 'negative'}.`,
          `The graph crosses the $x$-axis at ${xList(sortedZeros(fs))}: $${n}$ $x$-intercepts.`,
          `It changes direction $${n - 1}$ times, so it has $${n - 1}$ turning points.`,
          `${PARITY_SIGN[paritySignIndex(n, a)]}; $${n}$ $x$-intercepts; $${n - 1}$ turning points.`,
        ],
      };
    }

    // d === 3
    const kind = rng.pick(['whichEq', 'whichGraph', 'leastDegree'] as const);
    if (kind === 'leastDegree') {
      const { a, fs, f, g } = nicePoly(
        () => {
          const pattern = rng.pick([[2, 1], [1, 2], [2, 1, 1], [1, 2, 1], [1, 1, 2], [2, 2]]);
          const roots = distinctInts(rng, pattern.length, -4, 4);
          const a = pattern.length === 2 && pattern[0] + pattern[1] === 3 ? rng.pick([1, -1, 2, -2]) : rng.pick([1, -1]);
          return { a, fs: roots.map((r, i) => lin(r, pattern[i])) };
        },
        (gg, ff, fs) => turningXs(ff, gg.xMin, gg.xMax).length + 1 === fs.reduce((s, x) => s + x.m, 0),
      );
      const n = fs.reduce((s, x) => s + x.m, 0);
      const t = turningXs(f, g.xMin, g.xMax).length;
      const xs = sortFacs(fs).map(zeroOf);
      return {
        prompt: 'The graph of a polynomial function is shown. What is the least possible degree of the function, and what is the sign of its leading coefficient?',
        figure: polyFigure(f, g, { zeros: xs }),
        parts: [numPart(t + 1, { label: 'Least possible degree:' }), part(fixedChoice(['Positive', 'Negative'], a > 0 ? 0 : 1), { label: 'Sign of the leading coefficient:' })],
        hints: [
          'Count the turning points, including any on the $x$-axis where the graph touches it and turns back.',
          'A polynomial function of degree $n$ has at most $n - 1$ turning points, so the degree is at least one more than the number of turning points. The right end shows the sign of the leading coefficient.',
        ],
        solution: [
          `The graph has $${t}$ turning points. (A point where the graph touches the $x$-axis and turns back is a turning point too.)`,
          `A function of degree $n$ has at most $n - 1$ turning points, so $n - 1 \\ge ${t}$ and $n \\ge ${t + 1}$.`,
          `Check the ends: the graph extends from ${QUAD_TEXT[endKey(n, a)]}, which ${n % 2 ? 'needs an odd degree' : 'needs an even degree'}, and $${t + 1}$ is ${n % 2 ? 'odd' : 'even'}. It only has $${xs.length}$ $x$-intercepts because the graph touches the axis without crossing.`,
          `The right end ${a > 0 ? 'rises' : 'falls'}, so the leading coefficient is ${a > 0 ? 'positive' : 'negative'}.`,
          `Least possible degree $${t + 1}$; ${a > 0 ? 'positive' : 'negative'} leading coefficient.`,
        ],
      };
    }

    const { a, fs, f, g } = nicePoly(() => {
      const n = rng.pick([3, 3, 4, 4]);
      const roots = distinctInts(rng, n, -4, 4);
      const a = n === 3 ? rng.pick([1, -1, 2, -2]) : rng.pick([1, -1]);
      return { a, fs: roots.map((r) => lin(r)) };
    });
    const p = facsPoly(a, fs);
    const n = deg(p);
    const c = p[n];
    const zs = fs.map(zeroOf);

    const whichEq = (): GenOutput => {
      let delta = rng.pick([-6, -4, -3, 3, 4, 6]);
      if (c + delta === -c || c + delta === 0) delta = -delta;
      const shifted = [...p.slice(0, n), c + delta];
      const alt = [p[0], 0, ...p.slice(1)];
      const opts = [p, scaleP(p, -1), shifted, alt].map((q) => `$y = ${ptex(q)}$`);
      return {
        prompt: 'Which equation could represent the polynomial function graphed below?',
        figure: polyFigure(f, g, { zeros: zs, points: [{ x: 0, y: c, label: ptLabel(0, c) }] }),
        parts: [part(mc(rng, opts[0], opts.slice(1)))],
        hints: ['Use the end behaviour to decide whether the degree is odd or even and whether the leading coefficient is positive or negative.', 'Then check the $y$-intercept, which is the constant term.'],
        solution: [
          `The graph extends from ${QUAD_TEXT[endKey(n, a)]}, so the degree is ${n % 2 ? 'odd' : 'even'} and the leading coefficient is ${a > 0 ? 'positive' : 'negative'}.`,
          `The $y$-intercept is $${c}$, so the constant term is $${c}$.`,
          `$y = ${ptex(scaleP(p, -1))}$ has the wrong sign of leading coefficient, $y = ${ptex(alt)}$ has ${(n + 1) % 2 ? 'odd' : 'even'} degree, and $y = ${ptex(shifted)}$ has $y$-intercept $${c + delta}$.`,
          `The equation is $y = ${ptex(p)}$.`,
        ],
      };
    };
    if (kind === 'whichEq') return whichEq();

    // whichGraph: the equation is given in standard form.
    for (let t = 0; t < 8; t++) {
      const s = rng.pick([1, -1]);
      const shiftFs = fs.map((x) => lin(x.q + s));
      const fShift = facsFn(a, shiftFs);
      const shiftC = fShift(0);
      if (shiftC === c) continue;
      const extraRoot = rng.pick([1, -1, 2, -2, 3, -3].filter((r) => !zs.includes(r)));
      const altFs = [...fs, lin(extraRoot)];
      const fAlt = facsFn(a, altFs);
      const fNeg: Fn = (x) => -f(x);
      const gg = polyWindow([f, fNeg, fShift], [...zs, ...shiftFs.map(zeroOf)], [fAlt(0)]);
      const fig = (fn: Fn, zz: number[]) => polyFigure(fn, gg, { zeros: zz, points: [{ x: 0, y: fn(0), label: ptLabel(0, fn(0)) }] });
      const opts = [
        { md: '', figure: fig(f, zs), correct: true },
        { md: '', figure: fig(fNeg, zs) },
        { md: '', figure: fig(fShift, shiftFs.map(zeroOf)) },
        { md: '', figure: fig(fAlt, altFs.map(zeroOf)) },
      ];
      return {
        prompt: `Which graph could be the graph of $y = ${ptex(p)}$?`,
        parts: [part(mcFigures(rng, opts))],
        hints: ['Use the leading term to find the end behaviour.', 'The constant term is the $y$-intercept. Each graph has its $y$-intercept labelled.'],
        solution: [
          `The leading term is $${leadTermTex(p)}$. ${endWhy(n, a)}`,
          `The constant term is $${c}$, so the $y$-intercept is $${c}$.`,
          `Only one graph has both. The graph through $(0, ${fmt(shiftC)})$ has the right end behaviour but the wrong $y$-intercept, and the other two have the wrong end behaviour.`,
          `The correct graph extends from ${QUAD_TEXT[endKey(n, a)]} and has $y$-intercept $${c}$.`,
        ],
      };
    }
    return whichEq();
  },
});

// ---------------------------------------------------------------------------
// 3.2 — Dividing polynomials and the remainder theorem
// ---------------------------------------------------------------------------

function divisionSolution(p: P, a: number, name = 'P'): string[] {
  const { q, r } = synth(p, a);
  const coeffs = p.map((c) => fmt(c)).join(', ');
  const missing = p.slice(1).some((c) => c === 0);
  return [
    `Write the coefficients of $${name}(x)$ in descending order${missing ? ', with $0$ for each missing term' : ''}: $${coeffs}$. ${aNote(a)}`,
    `Bring down the first coefficient. Multiply by $${fmt(a)}$, write the product under the next coefficient and add; repeat:\n${synthTex(p, a)}`,
    `The last number is the remainder, $R = ${fmt(r)}$. The other numbers are the coefficients of the quotient, which has degree $${deg(q)}$: $Q(x) = ${ptex(q)}$.`,
    `Check with the division statement: $${name}(x) = (${divisorTex(a)})(${ptex(q)})${r === 0 ? '' : r > 0 ? ` + ${fmt(r)}` : ` - ${fmt(-r)}`}$.`,
    `Quotient $Q(x) = ${ptex(q)}$; remainder $R = ${fmt(r)}$.`,
  ];
}

const quotientPart = (q: P): Part => part({ kind: 'expression', expected: ptext(q), form: 'expanded' }, { label: '$Q(x) =$', placeholder: 'e.g. 2x^2 - 3x + 1' });

const polyDivide = skill({
  id: 'm301-poly-divide',
  name: 'Dividing a polynomial by x − a',
  description: 'Divide a polynomial by a binomial x − a with synthetic or long division, and state the quotient, the remainder and the division statement.',
  outcomes: ['RF11'],
  lessonId: 'm301-3-2',
  gen(rng, d): GenOutput {
    const name = rng.pick(['P', 'P', 'f', 'g']);
    const ask = (p: P, a: number, extra = '') => {
      const { q, r } = synth(p, a);
      return {
        prompt: `${extra}Divide $${name}(x) = ${ptex(p)}$ by $${divisorTex(a)}$. State the quotient $Q(x)$ and the remainder $R$.`,
        parts: [quotientPart(q), numPart(r, { label: '$R =$' })],
        hints: [
          `Use synthetic division with $a = ${fmt(a)}$ (the zero of $${divisorTex(a)}$)${deg(p) > 1 && p.slice(1).some((c) => c === 0) ? ', and write $0$ for each missing power of $x$' : ''}.`,
          'Bring down the first coefficient, multiply by $a$, add to the next coefficient, and repeat. The last number is the remainder; the others are the coefficients of the quotient, one degree lower.',
        ],
        solution: divisionSolution(p, a, name),
        answerDisplay: `$Q(x) = ${ptex(q)}$, $R = ${fmt(r)}$`,
      };
    };

    if (d === 1) {
      const a = rng.pick([1, 2, 3, -1, -2, -3]);
      const Q = [1, rng.int(-5, 5), rng.nonZero(-6, 6)];
      const r = rng.chance(0.3) ? 0 : rng.nonZero(-8, 8);
      const p = addP(mul([1, -a], Q), [r]);
      return ask(p, a);
    }

    if (d === 2) {
      for (let t = 0; t < 60; t++) {
        const n = rng.pick([3, 4]);
        const lead = rng.pick([1, 2, 3, -1, -2]);
        const p = randPoly(rng, n, lead, 0.15, 8);
        const gap = rng.int(1, n - 1);
        p[gap] = 0;
        if (p[n] === 0) p[n] = rng.nonZero(-9, 9);
        const a = rng.pick([1, 2, 3, 4, -1, -2, -3, -4]);
        const { q, r } = synth(p, a);
        if (q.some((c) => Math.abs(c) > 60) || Math.abs(r) > 150 || r === 0) continue;
        return ask(p, a);
      }
      return ask([2, 0, -5, 3], -2);
    }

    // d === 3
    const kind = rng.pick(['big', 'rebuild', 'prism'] as const);
    if (kind === 'big') {
      for (let t = 0; t < 80; t++) {
        const n = rng.pick([4, 5]);
        const lead = rng.pick([1, 2, 3, -1, -2, -3]);
        const p = randPoly(rng, n, lead, 0, 7);
        for (const gap of rng.sample(rangeInts(1, n - 1), 2)) p[gap] = 0;
        const a = rng.pick([1, 2, 3, -1, -2, -3]);
        const { q, r } = synth(p, a);
        if (q.some((c) => Math.abs(c) > 80) || Math.abs(r) > 300) continue;
        return ask(p, a);
      }
      return ask([1, 0, -3, 0, 2], 2);
    }
    if (kind === 'rebuild') {
      const a = rng.pick([1, 2, 3, 4, -1, -2, -3, -4]);
      const Q = randPoly(rng, rng.pick([2, 3]), rng.pick([1, 2, 3, -1, -2]), 0.2, 6);
      const R = rng.nonZero(-9, 9);
      const p = addP(mul([1, -a], Q), [R]);
      const prod = mul([1, -a], Q);
      return {
        prompt: `When the polynomial $P(x)$ is divided by $${divisorTex(a)}$, the quotient is $${ptex(Q)}$ and the remainder is $${fmt(R)}$. Find $P(x)$ in expanded form.`,
        parts: [part({ kind: 'expression', expected: ptext(p), form: 'expanded' }, { label: '$P(x) =$', placeholder: 'e.g. x^3 - 2x^2 + 5' })],
        hints: ['Use the division statement: $P(x) = (x - a)Q(x) + R$.', 'Multiply the divisor by the quotient, then add the remainder and collect like terms.'],
        solution: [
          `Division statement: $P(x) = (${divisorTex(a)})(${ptex(Q)}) ${R < 0 ? '-' : '+'} ${fmt(Math.abs(R))}$.`,
          `Multiply: $(${divisorTex(a)})(${ptex(Q)}) = ${ptex(prod)}$.`,
          `Add the remainder: $P(x) = ${ptex(p)}$.`,
          `Check: $P(${fmt(a)})$ should equal the remainder. $${substTex(p, a)}$ ✓`,
          `$P(x) = ${ptex(p)}$`,
        ],
        answerDisplay: `$P(x) = ${ptex(p)}$`,
      };
    }
    // prism: volume ÷ height = area of the base.
    const h = rng.int(1, 4);
    const u = rng.intExcept(1, 7, [h]);
    const w = rng.intExcept(1, 8, [h, u]);
    const V = fromRoots(1, [-h, -u, -w]);
    const base = fromRoots(1, [-u, -w]);
    const x1 = rng.int(2, 9);
    const area = evalP(base, x1);
    const unit = rng.pick(['cm', 'm']);
    const who = rng.pick(NAMES);
    const thing = rng.pick([
      'a rectangular storage bin',
      'a rectangular concrete form for a footing',
      'a rectangular planter box',
      'a rectangular shipping crate',
    ]);
    return {
      prompt: `${who} is designing ${thing}. Its volume, in cubic ${unit === 'cm' ? 'centimetres' : 'metres'}, is modelled by $V(x) = ${ptex(V)}$, and its height is $x + ${h}$ ${unit}.\n\na) Find an expression for the area of the base.\n\nb) Find the area of the base when $x = ${x1}$.`,
      parts: [
        part({ kind: 'expression', expected: ptext(base), form: 'expanded' }, { label: 'a) Area of the base $=$', placeholder: 'e.g. x^2 + 5x + 6' }),
        numPart(area, { label: 'b)', suffix: `${unit}²` }),
      ],
      hints: ['Volume = (area of the base) × (height), so the area of the base is $V(x) \\div (x + ' + h + ')$.', `Divide by $x + ${h}$ with synthetic division, using $a = ${-h}$. Then substitute $x = ${x1}$ into the quotient.`],
      solution: [
        `Area of the base $= \\dfrac{V(x)}{x + ${h}}$. Divide with $a = ${-h}$:\n${synthTex(V, -h)}`,
        `The remainder is $0$, as it must be, and the quotient is $${ptex(base)}$. So the area of the base is $${ptex(base)}$ ${unit}².`,
        `When $x = ${x1}$: $${ptex(base).replace(/x/g, `(${x1})`)} = ${area}$.`,
        `a) $${ptex(base)}$; b) $${area}$ ${unit}²`,
      ],
      answerDisplay: `a) $${ptex(base)}$; b) $${area}$ ${unit}²`,
    };
  },
});

const remainderTheorem = skill({
  id: 'm301-remainder-theorem',
  name: 'The remainder theorem',
  description: 'Use the remainder theorem to find the remainder when a polynomial is divided by x − a, and find unknown coefficients from given remainders.',
  outcomes: ['RF11'],
  lessonId: 'm301-3-2',
  calculator: true,
  gen(rng, d): GenOutput {
    const remainderQ = (p: P, a: number): GenOutput => ({
      prompt: `Use the remainder theorem to find the remainder when $P(x) = ${ptex(p)}$ is divided by $${divisorTex(a)}$.`,
      parts: [numPart(evalP(p, a), { label: 'Remainder:' })],
      hints: [`The remainder theorem: the remainder when $P(x)$ is divided by $x - a$ is $P(a)$. Here $a = ${fmt(a)}$.`, 'Substitute carefully, with brackets around negative values: $(-2)^3 = -8$ but $(-2)^2 = 4$.'],
      solution: [aNote(a), `By the remainder theorem, the remainder is $P(${fmt(a)})$.`, `$${substTex(p, a)}$`, `The remainder is $${fmt(evalP(p, a))}$.`],
    });

    if (d === 1) {
      const a = rng.pick([1, 2, 3, -1, -2, -3]);
      const p = randPoly(rng, 3, rng.pick([1, 1, 2, -1]), 0.2, 6);
      return remainderQ(p, a);
    }

    const findK = (): GenOutput => {
      for (let t = 0; t < 60; t++) {
        const n = rng.pick([3, 3, 4]);
        const a = rng.pick([1, 2, 3, -1, -2, -3]);
        const k = rng.nonZero(-7, 7);
        const ke = rng.int(1, n - 1);
        const ts: Term[] = [];
        ts.push({ e: n, c: rng.pick([1, 1, 2, -1]) });
        for (let e = n - 1; e >= 0; e--) {
          if (e === ke) ts.push({ e, c: 1, s: 'k' });
          else ts.push({ e, c: e === 0 ? rng.nonZero(-9, 9) : rng.chance(0.25) ? 0 : rng.nonZero(-8, 8) });
        }
        const { A, B } = evalTerms(ts, a);
        const r = z0(B + A.k * k);
        if (Math.abs(r) > 80) continue;
        return {
          prompt: `When $P(x) = ${termsTex(ts)}$ is divided by $${divisorTex(a)}$, the remainder is $${fmt(r)}$. Find the value of $k$.`,
          parts: [numPart(k, { label: '$k =$' })],
          hints: [`By the remainder theorem, $P(${fmt(a)}) = ${fmt(r)}$.`, `Substitute $x = ${fmt(a)}$, simplify to an expression in $k$, set it equal to $${fmt(r)}$ and solve.`],
          solution: [
            `By the remainder theorem, $P(${fmt(a)}) = ${fmt(r)}$.`,
            `$${substTermsTex(ts, a)}$`,
            `$${linSymTex(A, B, ['k'])} = ${fmt(r)}$, so $${linSymTex(A, 0, ['k'])} = ${fmt(z0(r - B))}$.`,
            `$k = ${k}$`,
          ],
        };
      }
      return remainderQ([1, -2, 0, 5], 2);
    };

    if (d === 2) {
      if (rng.chance(0.5)) return findK();
      for (let t = 0; t < 40; t++) {
        const p = randPoly(rng, 4, rng.pick([1, 2, -1, 3]), 0.35, 7);
        const a = rng.pick([1, 2, 3, -1, -2, -3]);
        if (Math.abs(evalP(p, a)) > 400) continue;
        return remainderQ(p, a);
      }
      return remainderQ([1, 0, -3, 2, 1], -2);
    }

    // d === 3
    if (rng.chance(0.5)) {
      // Equal remainders on division by x - a and x - b.
      for (let t = 0; t < 80; t++) {
        const [a, b] = rng.sample([1, 2, 3, -1, -2, -3], 2);
        if (a + b === 0) continue;
        const k = rng.nonZero(-6, 6);
        const c1 = -(a * a + a * b + b * b) - k * (a + b);
        if (c1 === 0 || Math.abs(c1) > 25) continue;
        const c0 = rng.nonZero(-9, 9);
        const ts: Term[] = [{ e: 3, c: 1 }, { e: 2, c: 1, s: 'k' }, { e: 1, c: c1 }, { e: 0, c: c0 }];
        const ea = evalTerms(ts, a);
        const eb = evalTerms(ts, b);
        const r = z0(ea.B + ea.A.k * k);
        return {
          prompt: `When $P(x) = ${termsTex(ts)}$ is divided by $${divisorTex(a)}$ and when it is divided by $${divisorTex(b)}$, the remainders are equal. Find the value of $k$ and the common remainder.`,
          parts: [numPart(k, { label: '$k =$' }), numPart(r, { label: 'Remainder:' })],
          hints: [`By the remainder theorem the remainders are $P(${fmt(a)})$ and $P(${fmt(b)})$, so $P(${fmt(a)}) = P(${fmt(b)})$.`, 'Write both as expressions in $k$, set them equal and solve. Then substitute $k$ back to find the remainder.'],
          solution: [
            `$${substTermsTex(ts, a)}$`,
            `$${substTermsTex(ts, b)}$`,
            `Set them equal: $${linSymTex(ea.A, ea.B, ['k'])} = ${linSymTex(eb.A, eb.B, ['k'])}$, so $${linSymTex({ k: z0(ea.A.k - eb.A.k) }, 0, ['k'])} = ${fmt(z0(eb.B - ea.B))}$ and $k = ${k}$.`,
            `Remainder: $P(${fmt(a)}) = ${linSymTex(ea.A, ea.B, ['k']).replace('k', `(${k})`)} = ${fmt(r)}$.`,
            `$k = ${k}$; the remainder is $${fmt(r)}$.`,
          ],
        };
      }
    }
    // Two unknowns from two remainders.
    for (let t = 0; t < 80; t++) {
      const [a, b] = rng.sample([1, 2, 3, -1, -2, -3], 2);
      const L = rng.pick([1, 1, 2]);
      const m = rng.nonZero(-6, 6);
      const n = rng.nonZero(-8, 8);
      const c0 = rng.nonZero(-9, 9);
      const ts: Term[] = [{ e: 3, c: L }, { e: 2, c: 1, s: 'm' }, { e: 1, c: 1, s: 'n' }, { e: 0, c: c0 }];
      const ea = evalTerms(ts, a);
      const eb = evalTerms(ts, b);
      const r1 = z0(ea.B + ea.A.m * m + ea.A.n * n);
      const r2 = z0(eb.B + eb.A.m * m + eb.A.n * n);
      if (Math.abs(r1) > 60 || Math.abs(r2) > 60) continue;
      const sys = systemSolution(ea, r1, eb, r2, m, n);
      return {
        prompt: `When $P(x) = ${termsTex(ts)}$ is divided by $${divisorTex(a)}$ the remainder is $${fmt(r1)}$, and when it is divided by $${divisorTex(b)}$ the remainder is $${fmt(r2)}$. Find $m$ and $n$.`,
        parts: [numPart(m, { label: '$m =$' }), numPart(n, { label: '$n =$' })],
        hints: [`By the remainder theorem, $P(${fmt(a)}) = ${fmt(r1)}$ and $P(${fmt(b)}) = ${fmt(r2)}$.`, 'Each condition gives a linear equation in $m$ and $n$. Solve the system by elimination or substitution.'],
        solution: [`$${substTermsTex(ts, a)}$, so $${linSymTex(ea.A, ea.B, ['m', 'n'])} = ${fmt(r1)}$.`, `$${substTermsTex(ts, b)}$, so $${linSymTex(eb.A, eb.B, ['m', 'n'])} = ${fmt(r2)}$.`, ...sys, `$m = ${m}$, $n = ${n}$`],
      };
    }
    return remainderQ([1, -2, 0, 5], 2);
  },
});

/** Solve A1·m + B1·n + C = r for two conditions, written out by elimination. */
function systemSolution(e1: { B: number; A: Record<string, number> }, r1: number, e2: { B: number; A: Record<string, number> }, r2: number, m: number, n: number): string[] {
  const norm = (A: number, B: number, C: number) => {
    const g = gcdAll([A, B, C]) || 1;
    const s = A < 0 || (A === 0 && B < 0) ? -1 : 1;
    return [(s * A) / g, (s * B) / g, (s * C) / g].map(z0);
  };
  const [a1, b1, c1] = norm(e1.A.m ?? 0, e1.A.n ?? 0, r1 - e1.B);
  const [a2, b2, c2] = norm(e2.A.m ?? 0, e2.A.n ?? 0, r2 - e2.B);
  const eq = (A: number, B: number, C: number) => `${linSymTex({ m: A, n: B }, 0, ['m', 'n'])} = ${fmt(C)}`;
  const steps = [`Simplify the two equations: (1) $${eq(a1, b1, c1)}$ and (2) $${eq(a2, b2, c2)}$.`];
  // eliminate n
  let how: string;
  let A: number;
  let C: number;
  if (b1 === b2) [how, A, C] = ['Subtract (2) from (1)', a1 - a2, c1 - c2];
  else if (b1 === -b2) [how, A, C] = ['Add (1) and (2)', a1 + a2, c1 + c2];
  else [how, A, C] = [`Multiply (1) by $${fmt(b2)}$ and (2) by $${fmt(b1)}$, then subtract`, a1 * b2 - a2 * b1, c1 * b2 - c2 * b1];
  steps.push(`${how} to eliminate $n$: $${fmt(z0(A))}m = ${fmt(z0(C))}$, so $m = ${m}$.`);
  steps.push(`Substitute $m = ${m}$ into (1): $${fmt(z0(a1 * m))} ${b1 < 0 ? '-' : '+'} ${Math.abs(b1) === 1 ? '' : fmt(Math.abs(b1))}n = ${fmt(c1)}$, so $n = ${n}$.`);
  return steps;
}

// ---------------------------------------------------------------------------
// 3.3 — The factor theorem and factoring
// ---------------------------------------------------------------------------

const factorTheorem = skill({
  id: 'm301-factor-theorem',
  name: 'The factor theorem',
  description: 'Use the factor theorem and the integral zero theorem to test possible factors of a polynomial, and find unknown coefficients so that a binomial is a factor.',
  outcomes: ['RF11'],
  lessonId: 'm301-3-3',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const a = rng.pick([1, 2, 3, -1, -2, -3]);
      const quad = [rng.pick([1, 1, 2]), rng.int(-5, 5), rng.nonZero(-6, 6)];
      const yes = rng.chance(0.5);
      const p = addP(mul([1, -a], quad), [yes ? 0 : rng.nonZero(-6, 6)]);
      const v = evalP(p, a);
      return {
        prompt: `Use the factor theorem to decide whether $${divisorTex(a)}$ is a factor of $P(x) = ${ptex(p)}$.`,
        parts: [numPart(v, { label: `$P(${fmt(a)}) =$` }), part(fixedChoice(['Yes, it is a factor', 'No, it is not a factor'], v === 0 ? 0 : 1), { label: `Is $${divisorTex(a)}$ a factor?` })],
        hints: [`The factor theorem: $x - a$ is a factor of $P(x)$ exactly when $P(a) = 0$. ${aNote(a)}`, 'Substitute with brackets and simplify.'],
        solution: [aNote(a), `$${substTex(p, a)}$`, v === 0 ? `$P(${fmt(a)}) = 0$, so by the factor theorem $${divisorTex(a)}$ is a factor.` : `$P(${fmt(a)}) = ${fmt(v)} \\ne 0$, so $${divisorTex(a)}$ is not a factor (dividing would leave a remainder of $${fmt(v)}$).`, v === 0 ? `Yes, $${divisorTex(a)}$ is a factor.` : `No, $${divisorTex(a)}$ is not a factor.`],
      };
    }

    const findK = (): GenOutput => {
      for (let t = 0; t < 80; t++) {
        const n = rng.pick([3, 3, 4]);
        const a = rng.pick([1, 2, 3, -1, -2, -3]);
        const k = rng.nonZero(-8, 8);
        const ke = rng.int(1, n - 1);
        const ts: Term[] = [{ e: n, c: rng.pick([1, 1, 2, -1]) }];
        for (let e = n - 1; e >= 1; e--) ts.push(e === ke ? { e, c: 1, s: 'k' } : { e, c: rng.chance(0.25) ? 0 : rng.nonZero(-8, 8) });
        const { A, B } = evalTerms([...ts], a);
        const c0 = z0(-(B + A.k * k));
        if (c0 === 0 || Math.abs(c0) > 40) continue;
        ts.push({ e: 0, c: c0 });
        const full = evalTerms(ts, a);
        return {
          prompt: `Find the value of $k$ so that $${divisorTex(a)}$ is a factor of $P(x) = ${termsTex(ts)}$.`,
          parts: [numPart(k, { label: '$k =$' })],
          hints: [`By the factor theorem, $${divisorTex(a)}$ is a factor exactly when $P(${fmt(a)}) = 0$.`, `Substitute $x = ${fmt(a)}$, simplify, set the result equal to $0$ and solve for $k$.`],
          solution: [`$${divisorTex(a)}$ is a factor when $P(${fmt(a)}) = 0$.`, `$${substTermsTex(ts, a)}$`, `$${linSymTex(full.A, full.B, ['k'])} = 0$, so $${linSymTex(full.A, 0, ['k'])} = ${fmt(z0(-full.B))}$.`, `$k = ${k}$`],
        };
      }
      return { prompt: 'Find $k$ so that $x - 1$ is a factor of $P(x) = x^{3} + kx - 3$.', parts: [numPart(2, { label: '$k =$' })], hints: ['$P(1) = 0$.'], solution: ['$P(1) = 1 + k - 3 = k - 2 = 0$', '$k = 2$'] };
    };

    if (d === 2) {
      const kind = rng.pick(['possible', 'which', 'k'] as const);
      if (kind === 'k') return findK();
      if (kind === 'possible') {
        for (let t = 0; t < 60; t++) {
          const n = rng.pick([3, 4]);
          const lead = rng.pick([1, 1, 2, 3, -1]);
          const p = randPoly(rng, n, lead, 0.2, 9);
          p[n] = rng.pick([4, 6, 8, 9, 10, 12, 15, 18, 20, -4, -6, -8, -10, -12, -15, -18, -20]);
          const c0 = Math.abs(p[n]);
          const ds = divisors(c0);
          const correct = `$${ds.map((x) => `\\pm ${x}`).join(', ')}$`;
          const positive = `$${ds.join(', ')}$`;
          const missing = `$${ds.slice(0, -1).map((x) => `\\pm ${x}`).join(', ')}$`;
          const other = Math.abs(p[n - 1]) > 1 && Math.abs(p[n - 1]) !== c0 ? Math.abs(p[n - 1]) : Math.abs(lead) > 1 ? Math.abs(lead) : 0;
          const otherList = other ? `$${divisors(other).map((x) => `\\pm ${x}`).join(', ')}$` : `$${[...ds, 2 * c0].map((x) => `\\pm ${x}`).join(', ')}$`;
          return {
            prompt: `According to the integral zero theorem, which list gives all the possible integral zeros of $P(x) = ${ptex(p)}$?`,
            parts: [part(mc(rng, correct, [positive, missing, otherList]))],
            hints: ['The integral zero theorem: an integral zero of a polynomial with integer coefficients must be a factor of the constant term.', 'Include both positive and negative factors.'],
            solution: [
              `The constant term is $${fmt(p[n])}$.`,
              `The factors of $${c0}$ are $${ds.join(', ')}$. A zero can be positive or negative, so the possible integral zeros are $${ds.map((x) => `\\pm ${x}`).join(', ')}$.`,
              `Possible integral zeros: ${correct}. (Only some of these, or none, will actually be zeros; test them with the factor theorem.)`,
            ],
          };
        }
      }
      // which binomial is a factor
      for (let t = 0; t < 80; t++) {
        const pool = rng.pick([[1, -1, 2, -2], [1, -1, 3, -3], [2, -2, 3, -3]]);
        const r = rng.pick(pool);
        const quad = [1, rng.int(-6, 6), rng.nonZero(-9, 9)];
        const p = mul([1, -r], quad);
        if (pool.some((c) => c !== r && evalP(p, c) === 0)) continue;
        if (p.some((c) => Math.abs(c) > 40)) continue;
        const others = pool.filter((c) => c !== r);
        return {
          prompt: `Which binomial is a factor of $P(x) = ${ptex(p)}$?`,
          parts: [part(mc(rng, `$${divisorTex(r)}$`, others.map((c) => `$${divisorTex(c)}$`)))],
          hints: ['By the factor theorem, $x - a$ is a factor exactly when $P(a) = 0$.', 'For each choice, find the value of $a$ that makes the binomial zero, and evaluate $P(a)$.'],
          solution: [
            ...others.map((c) => `$${divisorTex(c)}$: $${substTex(p, c)} \\ne 0$`),
            `$${divisorTex(r)}$: $${substTex(p, r)}$ ✓`,
            `Only $P(${r}) = 0$, so $${divisorTex(r)}$ is a factor.`,
          ],
        };
      }
      return findK();
    }

    // d === 3
    if (rng.chance(0.5)) {
      // k appears in two terms.
      for (let t = 0; t < 120; t++) {
        const a = rng.pick([2, 3, -1, -2, -3]);
        const [e1, e2] = rng.pick([[2, 1], [2, 0], [1, 0]]);
        const s1 = rng.pick([1, -1, 2]);
        const s2 = rng.pick([1, -1, -2, 2]);
        const Ak = s1 * a ** e1 + s2 * a ** e2;
        if (Ak === 0) continue;
        const k = rng.nonZero(-6, 6);
        const L = rng.pick([1, 2, -1]);
        const ts: Term[] = [{ e: 3, c: L }];
        // the remaining numeric coefficient makes P(a) = 0
        const free = [2, 1, 0].filter((e) => e !== e1 && e !== e2)[0];
        const partial = L * a ** 3 + Ak * k;
        if (partial % a ** free !== 0) continue;
        const cf = z0(-partial / a ** free);
        if (cf === 0 || Math.abs(cf) > 30) continue;
        for (const e of [2, 1, 0]) ts.push(e === e1 ? { e, c: s1, s: 'k' } : e === e2 ? { e, c: s2, s: 'k' } : { e, c: cf });
        const full = evalTerms(ts, a);
        return {
          prompt: `Find the value of $k$ so that $${divisorTex(a)}$ is a factor of $P(x) = ${termsTex(ts)}$.`,
          parts: [numPart(k, { label: '$k =$' })],
          hints: [`By the factor theorem, $P(${fmt(a)}) = 0$.`, 'Substitute, collect the terms in $k$ and the number terms separately, and solve.'],
          solution: [`$${divisorTex(a)}$ is a factor exactly when $P(${fmt(a)}) = 0$.`, `$${substTermsTex(ts, a)}$`, `$${linSymTex(full.A, full.B, ['k'])} = 0$, so $${linSymTex(full.A, 0, ['k'])} = ${fmt(z0(-full.B))}$.`, `$k = ${k}$`],
        };
      }
    }
    // Two unknowns: one factor plus one remainder (or two factors).
    for (let t = 0; t < 80; t++) {
      const [a, b] = rng.sample([1, 2, 3, -1, -2, -3], 2);
      const m = rng.nonZero(-6, 6);
      const n = rng.nonZero(-9, 9);
      const L = rng.pick([1, 1, 2]);
      const c0 = z0(-(L * a ** 3 + m * a * a + n * a));
      if (c0 === 0 || Math.abs(c0) > 40) continue;
      const ts: Term[] = [{ e: 3, c: L }, { e: 2, c: 1, s: 'm' }, { e: 1, c: 1, s: 'n' }, { e: 0, c: c0 }];
      const ea = evalTerms(ts, a);
      const eb = evalTerms(ts, b);
      const r2 = z0(eb.B + eb.A.m * m + eb.A.n * n);
      if (Math.abs(r2) > 60) continue;
      const cond2 = r2 === 0 ? `$${divisorTex(b)}$ is also a factor` : `the remainder on division by $${divisorTex(b)}$ is $${fmt(r2)}$`;
      return {
        prompt: `For $P(x) = ${termsTex(ts)}$, $${divisorTex(a)}$ is a factor and ${cond2}. Find $m$ and $n$.`,
        parts: [numPart(m, { label: '$m =$' }), numPart(n, { label: '$n =$' })],
        hints: [`Factor theorem: $P(${fmt(a)}) = 0$. ${r2 === 0 ? 'Factor' : 'Remainder'} theorem: $P(${fmt(b)}) = ${fmt(r2)}$.`, 'Each condition gives a linear equation in $m$ and $n$. Solve the system.'],
        solution: [
          `$P(${fmt(a)}) = 0$: $${substTermsTex(ts, a)}$, so $${linSymTex(ea.A, ea.B, ['m', 'n'])} = 0$.`,
          `$P(${fmt(b)}) = ${fmt(r2)}$: $${substTermsTex(ts, b)}$, so $${linSymTex(eb.A, eb.B, ['m', 'n'])} = ${fmt(r2)}$.`,
          ...systemSolution(ea, 0, eb, r2, m, n),
          `$m = ${m}$, $n = ${n}$`,
        ],
      };
    }
    return findK();
  },
});

const factorPart = (f: Factored, placeholder = 'e.g. (x - 1)(x + 2)(x + 3)'): Part => part({ kind: 'expression', expected: f.text, form: 'factored' }, { label: '$P(x) =$', placeholder });

const polyFactor = skill({
  id: 'm301-poly-factor',
  name: 'Factoring polynomials completely',
  description: 'Factor polynomials of degree 3 to 5 completely using the factor theorem, the integral zero theorem, synthetic division and grouping.',
  outcomes: ['RF11'],
  lessonId: 'm301-3-3',
  gen(rng, d): GenOutput {
    const finish = (f: Factored, prompt: string, hints: string[]): GenOutput => ({
      prompt,
      parts: [factorPart(f)],
      hints,
      solution: [...f.steps, `$P(x) = ${f.tex}$`],
      answerDisplay: `$P(x) = ${f.tex}$`,
    });

    if (d === 1) {
      const roots = distinctInts(rng, 3, -5, 5, [0]);
      const p = fromRoots(1, roots);
      const given = roots[0];
      const f = factorize(p, 'P', { given });
      const intro = rng.chance(0.5) ? `Given that $${divisorTex(given)}$ is a factor of $P(x) = ${ptex(p)}$, factor $P(x)$ completely.` : `Given that $P(${given}) = 0$ for $P(x) = ${ptex(p)}$, factor $P(x)$ completely.`;
      return finish(f, intro, [`${intro.includes('P(' + given + ') = 0') ? `By the factor theorem, $${divisorTex(given)}$ is a factor. ` : ''}Divide $P(x)$ by $${divisorTex(given)}$ with synthetic division.`, 'Factor the quadratic quotient, then write $P(x)$ as a product of three linear factors.']);
    }

    if (d === 2) {
      const kind = rng.pick(['three', 'irreducible', 'grouping'] as const);
      if (kind === 'grouping') {
        const pVal = rng.nonZero(-6, 6);
        const q = rng.intExcept(1, 6, [Math.abs(pVal)]);
        // (x + pVal)(x^2 - q^2) = x^3 + pVal x^2 - q^2 x - pVal q^2
        const p = [1, pVal, -q * q, -pVal * q * q];
        const fac = factoredTex(1, sortFacs([lin(-pVal), lin(q), lin(-q)]));
        return {
          prompt: `Factor completely: $P(x) = ${ptex(p)}$`,
          parts: [part({ kind: 'expression', expected: factoredTex(1, sortFacs([lin(-pVal), lin(q), lin(-q)]), true), form: 'factored' }, { label: '$P(x) =$', placeholder: 'e.g. (x - 1)(x + 2)(x + 3)' })],
          hints: ['Group the first two terms and the last two terms, and remove a common factor from each group.', 'A difference of squares $x^2 - b^2$ factors as $(x - b)(x + b)$.'],
          solution: [
            `Group in pairs: $P(x) = (${ptex([1, pVal, 0, 0])}) ${-q * q < 0 ? '-' : '+'} (${ptex([q * q, pVal * q * q])})$.`,
            `Remove a common factor from each group: $x^{2}(${divisorTex(-pVal)}) - ${q * q}(${divisorTex(-pVal)}) = (${divisorTex(-pVal)})(x^{2} - ${q * q})$.`,
            `$x^{2} - ${q * q}$ is a difference of squares: $(x - ${q})(x + ${q})$.`,
            `(The factor theorem gives the same result: $P(${-pVal}) = 0$.)`,
            `$P(x) = ${fac}$`,
          ],
          answerDisplay: `$P(x) = ${fac}$`,
        };
      }
      if (kind === 'irreducible') {
        for (let t = 0; t < 60; t++) {
          const r = rng.nonZero(-4, 4);
          const b = rng.int(-4, 4);
          const c = rng.nonZero(-8, 9);
          const disc = b * b - 4 * c;
          if (disc >= 0 && isPerfectSquare(disc)) continue;
          const p = mul([1, -r], [1, b, c]);
          if (p.some((x) => Math.abs(x) > 40)) continue;
          const f = factorize(p);
          return finish(f, `Factor completely: $P(x) = ${ptex(p)}$`, ['List the possible integral zeros (the factors of the constant term) and test them until $P(a) = 0$.', 'Divide by the factor you found. A quadratic quotient that cannot be factored over the integers stays as it is.']);
        }
      }
      for (let t = 0; t < 60; t++) {
        const roots = rng.chance(0.3) ? (() => { const [u, v] = distinctInts(rng, 2, -5, 5, [0]); return [u, u, v]; })() : distinctInts(rng, 3, -5, 5, [0]);
        const p = fromRoots(1, roots);
        if (Math.abs(p[3]) > 60) continue;
        const f = factorize(p);
        return finish(f, `Factor completely: $P(x) = ${ptex(p)}$`, ['Use the integral zero theorem: test the factors of the constant term until you find $a$ with $P(a) = 0$.', 'Divide by $x - a$ with synthetic division, then factor the quadratic quotient.']);
      }
      const p = fromRoots(1, [-2, 1, 3]);
      return finish(factorize(p), `Factor completely: $P(x) = ${ptex(p)}$`, ['Test the factors of the constant term.']);
    }

    // d === 3
    const kind = rng.pick(['quartic', 'gcf', 'nonmonic', 'quintic', 'quarticIrr'] as const);
    for (let t = 0; t < 80; t++) {
      let p: P;
      if (kind === 'quartic') {
        const roots = rng.chance(0.4) ? (() => { const [u, v, w] = distinctInts(rng, 3, -4, 4, [0]); return [u, u, v, w]; })() : distinctInts(rng, 4, -4, 4, [0]);
        p = fromRoots(1, roots);
      } else if (kind === 'gcf') {
        const g = rng.pick([2, 3, -2, -1, 2]);
        const roots = distinctInts(rng, 3, -5, 5, [0]);
        p = rng.chance(0.5) ? mul([g, 0], fromRoots(1, roots)) : fromRoots(g, roots);
      } else if (kind === 'nonmonic') {
        const den = rng.pick([2, 3]);
        const num = rng.pick([1, -1, 2 * den - 1, 1 - 2 * den].filter((u) => u % den !== 0));
        const roots = distinctInts(rng, 2, -4, 4, [0]);
        p = mul([den, -num], fromRoots(1, roots));
      } else if (kind === 'quintic') {
        const [u, v] = distinctInts(rng, 2, 1, 4);
        p = mul([1, 0], mul([1, 0, -u * u], [1, 0, -v * v]));
      } else {
        const roots = distinctInts(rng, 2, -4, 4, [0]);
        const c = rng.pick([1, 2, 3, 4, 5, 9]);
        p = mul(fromRoots(1, roots), [1, 0, c]);
      }
      if (p.some((x) => Math.abs(x) > 150)) continue;
      const f = factorize(p);
      return finish(f, `Factor completely: $P(x) = ${ptex(p)}$`, [
        'Remove any common factor first. Then use the integral zero theorem to find a zero, and divide.',
        'Keep going: after each division, test the quotient again. Stop when every factor is linear or a quadratic that cannot be factored over the integers.',
      ]);
    }
    const p = fromRoots(1, [-2, -1, 1, 3]);
    return finish(factorize(p), `Factor completely: $P(x) = ${ptex(p)}$`, ['Test the factors of the constant term.']);
  },
});

// ---------------------------------------------------------------------------
// 3.4 — Equations and graphs of polynomial functions
// ---------------------------------------------------------------------------

/** Random factors with distinct integer zeros and the given multiplicities. */
function randFacs(rng: Rng, mults: number[], lo = -4, hi = 4, exclude: number[] = []): Fac[] {
  return distinctInts(rng, mults.length, lo, hi, exclude).map((r, i) => lin(r, mults[i]));
}

function zerosWhy(fs: Fac[]): string {
  return sortFacs(fs)
    .map((f) => `${f.q === 0 ? '$x = 0$' : `$${facBase(f).slice(1, -1)} = 0$ gives $x = ${texNum(zeroOf(f))}$`}${f.m > 1 ? ` (multiplicity $${f.m}$)` : ''}`)
    .join('; ');
}

const polyGraph = skill({
  id: 'm301-poly-graph',
  name: 'Graphs of polynomial functions in factored form',
  description: 'Use the factored form of a polynomial function to find its zeros and their multiplicities, the behaviour of the graph at each zero, the y-intercept and the end behaviour, and match it to its graph.',
  outcomes: ['RF12'],
  lessonId: 'm301-3-4',
  gen(rng, d): GenOutput {
    const name = rng.pick(['f', 'g', 'h', 'y']);
    const fx = name === 'y' ? 'y' : `${name}(x)`;
    const nm0 = name === 'y' ? 'y' : name;

    const whichGraph = (mults: number[], aChoices: number[]): GenOutput | null => {
      for (let t = 0; t < 60; t++) {
        const a = rng.pick(aChoices);
        const fs = randFacs(rng, mults, -3, 3);
        const zs = fs.map(zeroOf);
        // swap two multiplicities (or change 2 <-> 3 when they are equal)
        const swapped = fs.map((f, i) => ({ ...f, m: mults[(i + 1) % mults.length] }));
        const changed = fs.map((f, i) => (i === 0 ? { ...f, m: f.m === 2 ? 3 : f.m === 3 ? 2 : 2 } : f));
        const alt = mults.every((m) => m === mults[0]) ? changed : swapped;
        const negZ = fs.map((f) => lin(-f.q, f.m));
        const fns = [facsFn(a, fs), facsFn(-a, fs), facsFn(a, alt), facsFn(a, negZ)];
        const g = polyWindow(fns, [...zs, ...zs.map((z) => -z)]);
        if (!turnsVisible(fns[0], g, 0.1)) continue;
        const figs = fns.map((fn, i) => polyFigure(fn, g, { zeros: i === 3 ? zs.map((z) => -z) : zs }));
        const keys = new Set(figs.map((x) => JSON.stringify(x)));
        if (keys.size < 4) continue;
        const n = mults.reduce((s, m) => s + m, 0);
        const opts = figs.map((figure, i) => ({ md: '', figure, correct: i === 0 }));
        return {
          prompt: `Which graph shows $${fx} = ${factoredTex(a, sortFacs(fs))}$?`,
          parts: [part(mcFigures(rng, opts))],
          hints: ['Find the zeros from the factors, and the multiplicity of each zero from its exponent.', 'At a zero of multiplicity 1 the graph crosses the axis; multiplicity 2, it touches and turns back; multiplicity 3, it crosses with a flattened bend. Then check the end behaviour.'],
          solution: [
            `Zeros: ${zerosWhy(fs)}.`,
            ...sortFacs(fs).map((f) => `At $x = ${texNum(zeroOf(f))}$ the graph ${behaviourWords(f.m)}.`),
            `The degree is $${n}$ and the leading coefficient is $${a}$. ${endWhy(n, a)}`,
            `The correct graph has these zeros and shapes and extends from ${QUAD_TEXT[endKey(n, a)]}.`,
          ],
        };
      }
      return null;
    };

    if (d === 1) {
      if (rng.chance(0.5)) {
        const mults = rng.pick([[1, 1, 1], [1, 1, 1], [2, 1], [1, 2], [1, 1]]);
        const fs = sortFacs(randFacs(rng, mults, -5, 5));
        const a = rng.pick([1, -1, 2, -2, 3]);
        const zs = sortedZeros(fs);
        const y0 = facsFn(a, fs)(0);
        return {
          prompt: `For $${fx} = ${factoredTex(a, fs)}$, state the zeros and the $y$-intercept.`,
          parts: [zerosPart(zs), numPart(y0, { label: '$y$-intercept:' })],
          hints: ['A product is zero when one of its factors is zero. Set each factor equal to zero.', 'For the $y$-intercept, substitute $x = 0$.'],
          solution: [`Set each factor equal to zero: ${zerosWhy(fs)}.`, factoredAt0(a, fs, nm0), `Zeros: ${xList(zs)}; $y$-intercept $${fmt(y0)}$.`],
        };
      }
      const mults = rng.pick([[1, 2], [2, 1], [3, 1], [1, 3], [2, 2], [1, 1, 2], [3, 2], [1, 2, 1]]);
      const fs = sortFacs(randFacs(rng, mults, -5, 5));
      const a = rng.pick([1, -1, 2, -2]);
      const target = rng.pick(fs);
      const r = zeroOf(target);
      return {
        prompt: `For $${fx} = ${factoredTex(a, fs)}$, state the multiplicity of the zero $x = ${r}$ and describe the shape of the graph there.`,
        parts: [numPart(target.m, { label: 'Multiplicity:' }), part(fixedChoice(BEHAVIOUR, target.m - 1), { label: `At $x = ${r}$, the graph:` })],
        hints: ['The multiplicity of a zero is the exponent on its factor.', 'Multiplicity 1: crosses. Multiplicity 2: touches and turns back. Multiplicity 3: crosses with a flattened bend.'],
        solution: [
          `The factor that gives $x = ${r}$ is $${facBase(target)}$, and its exponent is $${target.m}$: the multiplicity is $${target.m}$.`,
          target.m === 1 ? 'With multiplicity $1$ the sign of the function changes at the zero, and near it the graph looks like a straight line through the axis.' : target.m === 2 ? 'With an even multiplicity the factor is never negative, so the function does not change sign: near the zero the graph looks like a parabola that touches the axis.' : 'With multiplicity $3$ the sign changes, but the graph is flat at the zero, like $y = x^3$ at the origin.',
          `Multiplicity $${target.m}$: the graph ${behaviourWords(target.m)} at $x = ${r}$.`,
        ],
      };
    }

    if (d === 2) {
      const kind = rng.pick(['zerosDegEnds', 'whichGraph', 'eachZero'] as const);
      if (kind === 'whichGraph') {
        const out = whichGraph(rng.pick([[2, 1], [1, 2], [1, 1, 1], [2, 1]]), [1, -1, 2, -2]);
        if (out) return out;
      }
      if (kind === 'eachZero') {
        const mults = rng.pick([[1, 2], [2, 3], [3, 1], [1, 2, 3], [2, 1, 1], [3, 2]]);
        const fs = sortFacs(randFacs(rng, mults, -5, 5));
        const a = rng.pick([1, -1, 2, -2]);
        return {
          prompt: `Describe the behaviour of the graph of $${fx} = ${factoredTex(a, fs)}$ at each of its zeros.`,
          parts: fs.map((f) => part(fixedChoice(BEHAVIOUR, f.m - 1), { label: `At $x = ${zeroOf(f)}$:` })),
          hints: ['The exponent on each factor is the multiplicity of that zero.', 'Odd multiplicity: the graph crosses the axis (flattened if the multiplicity is 3). Even multiplicity: it touches and turns back.'],
          solution: [...fs.map((f) => `$${facBase(f)}$ has exponent $${f.m}$, so $x = ${zeroOf(f)}$ has multiplicity $${f.m}$: the graph ${behaviourWords(f.m)}.`), fs.map((f) => `At $x = ${zeroOf(f)}$: ${behaviourWords(f.m)}`).join('; ') + '.'],
        };
      }
      const mults = rng.pick([[1, 2], [2, 1], [3, 1], [1, 1, 2], [2, 2], [1, 3], [1, 1, 3], [2, 1, 2]]);
      const fs = sortFacs(randFacs(rng, mults, -5, 5));
      const a = rng.pick([1, -1, 2, -2, -3]);
      const n = mults.reduce((s, m) => s + m, 0);
      return {
        prompt: `For $${fx} = ${factoredTex(a, fs)}$, state the zeros, the degree and the end behaviour.`,
        parts: [zerosPart(sortedZeros(fs)), numPart(n, { label: 'Degree:' }), part(endMc(rng, n, a), { label: 'End behaviour:' })],
        hints: ['Set each factor equal to zero for the zeros.', 'The degree is the sum of the exponents on the factors. Every factor here starts with $x$, so the leading coefficient is the number in front, $' + a + '$.'],
        solution: [
          `Zeros: ${zerosWhy(fs)}.`,
          `If you expanded, the highest power would be $x^{${fs.map((f) => f.m).join(' + ')}} = x^{${n}}$, so the degree is $${n}$, and the leading coefficient is $${a}$.`,
          endWhy(n, a),
          `Zeros ${xList(sortedZeros(fs))}; degree $${n}$; extends from ${QUAD_TEXT[endKey(n, a)]}.`,
        ],
      };
    }

    // d === 3
    if (rng.chance(0.5)) {
      const out = whichGraph(rng.pick([[2, 1, 1], [1, 2, 1], [3, 1], [1, 3], [2, 2], [2, 1], [1, 3, 1]]), [1, -1]);
      if (out) return out;
    }
    // Factors with leading coefficients other than 1, e.g. (2x - 1) or (3 - x).
    for (let t = 0; t < 60; t++) {
      const fs: Fac[] = [];
      const pool = rangeInts(-4, 4);
      const used = new Set<number>();
      const pickZero = () => {
        const r = rng.pick(pool.filter((x) => !used.has(x)));
        used.add(r);
        return r;
      };
      const special = rng.pick(['half', 'third', 'flip'] as const);
      if (special === 'half') fs.push({ p: 2, q: rng.pick([1, -1, 3, -3, 5]), m: rng.pick([1, 2]) });
      else if (special === 'third') fs.push({ p: 3, q: rng.pick([1, -1, 2, -2]), m: 1 });
      else {
        const r = rng.int(1, 4);
        used.add(r);
        fs.push({ p: -1, q: -r, m: rng.pick([1, 2, 3]) });
      }
      const more = rng.pick([1, 2]);
      for (let i = 0; i < more; i++) fs.push(lin(pickZero(), rng.pick([1, 1, 2])));
      const n = fs.reduce((s, f) => s + f.m, 0);
      if (n > 5 || n < 3) continue;
      if (new Set(fs.map(zeroOf)).size < fs.length) continue;
      fs.splice(0, fs.length, ...sortFacs(fs));
      const a = rng.pick([1, -1, 2]);
      const lead = fs.reduce((s, f) => s * f.p ** f.m, a);
      const y0 = facsFn(a, fs)(0);
      const zs = sortedZeros(fs);
      const leadWork = `${a === 1 ? '' : `${fmt(a)}`}${fs.map((f) => `(${fmt(f.p)})${f.m > 1 ? `^{${f.m}}` : ''}`).join('')}`;
      return {
        prompt: `For $${fx} = ${factoredTex(a, fs)}$, state the zeros, the $y$-intercept and the end behaviour.`,
        parts: [zerosPart(zs), numPart(y0, { label: '$y$-intercept:' }), part(endMc(rng, n, lead), { label: 'End behaviour:' })],
        hints: [
          'Set each factor equal to zero; some zeros are fractions. Substitute $x = 0$ for the $y$-intercept.',
          'The leading coefficient is the product of the constant in front and the coefficient of $x$ in each factor, each raised to its exponent. Watch for factors like $(3 - x)$, where the coefficient of $x$ is $-1$.',
        ],
        solution: [
          `Zeros: ${zerosWhy(fs)}.`,
          factoredAt0(a, fs, nm0),
          `Degree: $${fs.map((f) => f.m).join(' + ')} = ${n}$. Leading coefficient: $${leadWork} = ${fmt(lead)}$.`,
          endWhy(n, lead),
          `Zeros ${xList(zs)}; $y$-intercept $${fmt(y0)}$; extends from ${QUAD_TEXT[endKey(n, lead)]}.`,
        ],
      };
    }
    return whichGraph([2, 1], [1, -1])!;
  },
});

/** Interval notation for the x-values where the sign of P matches. */
function intervalsTex(roots: number[], signs: number[], want: 1 | -1, closed: boolean): string {
  const parts: string[] = [];
  for (let i = 0; i < signs.length; i++) {
    if (signs[i] !== want) continue;
    const left = i === 0 ? '(-\\infty' : `${closed ? '[' : '('}${texNum(roots[i - 1])}`;
    const right = i === signs.length - 1 ? '\\infty)' : `${texNum(roots[i])}${closed ? ']' : ')'}`;
    parts.push(`${left}, ${right}`);
  }
  return parts.length ? parts.join(' \\cup ') : '\\varnothing';
}

/** Signs of a·∏(x − r) on each interval between the sorted simple roots. */
function signsOf(lead: number, roots: number[]): number[] {
  const n = roots.length;
  return Array.from({ length: n + 1 }, (_, i) => {
    const neg = n - i; // factors that are negative on interval i
    return (lead > 0 ? 1 : -1) * (neg % 2 ? -1 : 1);
  });
}

const BOX_SHEETS: Array<[number, number]> = [[30, 20], [24, 16], [40, 30], [36, 24], [28, 20], [32, 18], [26, 14]];

function safeRound(x: number, decimals: number): boolean {
  const s = Math.abs(x) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.05;
}

const polyEquation = skill({
  id: 'm301-poly-equation',
  name: 'Polynomial equations and equations from graphs',
  description: 'Solve polynomial equations and inequalities by factoring, write the equation of a polynomial function from its graph, and solve problems modelled by polynomial equations.',
  outcomes: ['RF11', 'RF12'],
  lessonId: 'm301-3-4',
  calculator: true,
  gen(rng, d): GenOutput {
    const solveFrom = (p: P, prompt: string, hints: string[]): GenOutput => {
      const f = factorize(p, 'P');
      const zs = [...f.zeros].sort((u, v) => u - v);
      return {
        prompt,
        parts: [zerosPart(zs, 'Solutions:')],
        hints,
        solution: [`Let $P(x) = ${ptex(p)}$.`, ...f.steps, `So $${f.tex} = 0$. Set each factor equal to zero: ${zerosWhy(f.facs)}.`, `${xList(zs)}`],
      };
    };

    const fromGraph = (patterns: number[][], aChoices: number[]): GenOutput => {
      for (let t = 0; t < 120; t++) {
        const mults = rng.pick(patterns);
        const n0 = mults.reduce((s, m) => s + m, 0);
        const fs = sortFacs(randFacs(rng, mults, n0 > 3 ? -3 : -4, n0 > 3 ? 3 : 4));
        const a = rng.pick(aChoices);
        const f = facsFn(a, fs);
        const zs = fs.map(zeroOf);
        let g = polyWindow([f], zs);
        if (!turnsVisible(f, g, 0.12) || g.yMax > 100) continue;
        // the labelled point: the y-intercept, or another lattice point
        let px = 0;
        if (zs.includes(0)) {
          const cands = rangeInts(g.xMin + 1, g.xMax - 1).filter((x) => !zs.includes(x) && Math.abs(f(x)) <= g.yMax * 0.9);
          if (!cands.length) continue;
          px = rng.pick(cands);
        }
        const py = f(px);
        if (!Number.isInteger(py) || py === 0 || Math.abs(py) > g.yMax) continue;
        g = polyWindow([f], zs, [py]);
        const unit = facsFn(1, fs)(px);
        const pts: PlanePoint[] = [...zs.map((z) => ({ x: z, y: 0 })), { x: px, y: py, label: ptLabel(px, py), color: 'accent' as const }];
        const expected = factoredTex(a, fs, true);
        const n = mults.reduce((s, m) => s + m, 0);
        const form = factoredTex(1, fs).replace(/^/, 'a');
        return {
          prompt: 'Write the equation, in factored form, of the polynomial function of least degree shown in the graph. The zeros are integers, and the labelled point is on the graph.',
          figure: polyFigure(f, g, { zeros: zs, points: pts }),
          parts: [part({ kind: 'expression', expected, form: 'factored' }, { label: '$y =$', placeholder: 'e.g. 2(x + 1)^2(x - 3)' })],
          hints: [
            'Read each zero from the graph and decide its multiplicity from the shape there: crosses (1), touches and turns back (2), or crosses with a flattened bend (3).',
            `Write $y = a(\\dots)$ with those factors, then substitute the labelled point to find $a$.`,
          ],
          solution: [
            ...fs.map((x) => `At $x = ${zeroOf(x)}$ the graph ${behaviourWords(x.m)}, so the factor is $${facTex(x)}$.`),
            `The equation has the form $y = ${form}$ (degree $${n}$).`,
            `Substitute $(${fmt(px)}, ${fmt(py)})$: $${fmt(py)} = a${fs.map((x) => `(${fmt(z0(px - x.q))})${x.m > 1 ? `^{${x.m}}` : ''}`).join('')} = ${fmt(unit)}a$, so $a = ${fmt(a)}$.`,
            `$y = ${factoredTex(a, fs)}$`,
          ],
          answerDisplay: `$y = ${factoredTex(a, fs)}$`,
        };
      }
      return fromGraph([[1, 1, 1]], [1]);
    };

    if (d === 1) {
      if (rng.chance(0.5)) {
        const mults = rng.pick([[1, 1, 1], [2, 1], [1, 1], [1, 1, 2]]);
        const fs = sortFacs(randFacs(rng, mults, -6, 6));
        const a = rng.pick([1, 2, -1, 3]);
        const zs = sortedZeros(fs);
        return {
          prompt: `Solve $${factoredTex(a, fs)} = 0$.`,
          parts: [zerosPart(zs, 'Solutions:')],
          hints: ['A product is zero exactly when one of its factors is zero.', 'Set each bracket (and any factor of $x$) equal to zero. A repeated factor gives the same solution twice; list it once.'],
          solution: [`Set each factor equal to zero: ${zerosWhy(fs)}.`, xList(zs)],
        };
      }
      // common factor x, then a trinomial or a difference of squares
      const [r, s] = rng.chance(0.3) ? (() => { const u = rng.int(1, 6); return [u, -u]; })() : distinctInts(rng, 2, -6, 6, [0]);
      const g = rng.pick([1, 1, 2, -1]);
      const p = mul([g, 0], fromRoots(1, [r, s]));
      return solveFrom(p, `Solve $${ptex(p)} = 0$.`, ['Every term has a common factor. Remove it first.', 'Factor what is left, then set each factor equal to zero.']);
    }

    if (d === 2) {
      const kind = rng.pick(['graph', 'graph', 'cubic', 'grouping'] as const);
      if (kind === 'graph') return fromGraph([[1, 1, 1], [2, 1], [1, 2]], [1, -1, 2, -2]);
      if (kind === 'grouping') {
        const pv = rng.nonZero(-6, 6);
        const q = rng.intExcept(1, 6, [Math.abs(pv)]);
        const p = [1, pv, -q * q, -pv * q * q];
        const zs = [-pv, q, -q].sort((u, v) => u - v);
        return {
          prompt: `Solve $${ptex(p)} = 0$.`,
          parts: [zerosPart(zs, 'Solutions:')],
          hints: ['Factor by grouping: group the first two terms and the last two terms.', 'Look for a difference of squares, then set each factor equal to zero.'],
          solution: [
            `Group: $x^{2}(${divisorTex(-pv)}) - ${q * q}(${divisorTex(-pv)}) = 0$.`,
            `Factor: $(${divisorTex(-pv)})(x^{2} - ${q * q}) = 0$, and $x^{2} - ${q * q} = (x - ${q})(x + ${q})$.`,
            `$(${divisorTex(-pv)})(x - ${q})(x + ${q}) = 0$, so ${xList(zs)}.`,
            xList(zs),
          ],
        };
      }
      for (let t = 0; t < 40; t++) {
        const roots = rng.chance(0.25) ? (() => { const [u, v] = distinctInts(rng, 2, -5, 5, [0]); return [u, u, v]; })() : distinctInts(rng, 3, -5, 5, [0]);
        const p = fromRoots(1, roots);
        if (Math.abs(p[3]) > 60) continue;
        return solveFrom(p, `Solve $${ptex(p)} = 0$.`, ['Use the integral zero theorem: test factors of the constant term to find one solution $a$.', 'Divide by $x - a$, factor the quadratic quotient, and set each factor equal to zero.']);
      }
      return solveFrom(fromRoots(1, [-1, 2, 3]), 'Solve $x^{3} - 4x^{2} + x + 6 = 0$.', ['Test factors of $6$.']);
    }

    // d === 3
    const kind = rng.pick(['graph', 'inequality', 'box'] as const);
    if (kind === 'graph') return fromGraph([[2, 1, 1], [1, 2, 1], [3, 1], [1, 3], [2, 2], [2, 3], [1, 1, 2]], [1, -1, 2, -2]);

    if (kind === 'inequality') {
      for (let t = 0; t < 60; t++) {
        const n = rng.pick([3, 3, 4]);
        const roots = distinctInts(rng, n, -5, 5).sort((u, v) => u - v);
        const lead = n === 3 ? rng.pick([1, -1, 2, -1]) : rng.pick([1, -1]);
        const p = fromRoots(lead, roots);
        if (p.some((c) => Math.abs(c) > 80)) continue;
        const op = rng.pick(['>', '\\ge', '<', '\\le'] as const);
        const want: 1 | -1 = op === '>' || op === '\\ge' ? 1 : -1;
        const closed = op === '\\ge' || op === '\\le';
        const signs = signsOf(lead, roots);
        const correct = `$${intervalsTex(roots, signs, want, closed)}$`;
        const negRoots = roots.map((r) => -r).sort((u, v) => u - v);
        const distractors = [
          `$${intervalsTex(roots, signs, want === 1 ? -1 : 1, closed)}$`,
          `$${intervalsTex(roots, signs, want, !closed)}$`,
          `$${intervalsTex(negRoots, signsOf(lead, negRoots), want, closed)}$`,
          `$${intervalsTex(roots, signs, want === 1 ? -1 : 1, !closed)}$`,
        ];
        const f = factorize(p, 'P');
        const intervalNames = signs.map((_, i) => {
          const L = i === 0 ? '-\\infty' : texNum(roots[i - 1]);
          const R = i === signs.length - 1 ? '\\infty' : texNum(roots[i]);
          return `$(${L}, ${R})$`;
        });
        const tests = signs.map((_, i) => (i === 0 ? roots[0] - 1 : i === signs.length - 1 ? roots[roots.length - 1] + 1 : roots[i] - roots[i - 1] >= 2 ? roots[i - 1] + 1 : (roots[i - 1] + roots[i]) / 2));
        return {
          prompt: `Solve $${ptex(p)} ${op} 0$.`,
          parts: [part(mc(rng, correct, distractors))],
          hints: ['Factor the polynomial completely to find its zeros.', `The zeros split the number line into intervals. Test one value in each interval to find where the polynomial is ${want === 1 ? 'positive' : 'negative'}.${closed ? ' The zeros themselves are included.' : ' The zeros themselves are not included.'}`],
          solution: [
            `Let $P(x) = ${ptex(p)}$ and factor it.`,
            ...f.steps,
            `So $P(x) = ${f.tex}$, with zeros ${xList(roots)}.`,
            `Signs on each interval: ${intervalNames.map((nm, i) => `${nm}: $P(${texNum(tests[i])}) ${signs[i] > 0 ? '> 0' : '< 0'}$`).join('; ')}.`,
            `$P(x) ${op} 0$ on ${correct}${closed ? ', including the zeros' : ''}.`,
            `$x \\in ${intervalsTex(roots, signs, want, closed)}$`,
          ],
        };
      }
    }

    // box
    if (rng.chance(0.5)) {
      for (let t = 0; t < 60; t++) {
        const [L, W] = rng.pick(BOX_SHEETS);
        const x0 = rng.int(1, W / 2 - 1);
        const V0 = x0 * (L - 2 * x0) * (W - 2 * x0);
        const cubic = [1, -(L + W) / 2, (L * W) / 4, -V0 / 4];
        const { q } = synth(cubic, x0);
        const [, B, C] = q;
        const disc = B * B - 4 * C;
        let others: number[] = [];
        if (disc >= 0) others = [(-B - Math.sqrt(disc)) / 2, (-B + Math.sqrt(disc)) / 2];
        const valid = others.filter((x) => x > 1e-9 && x < W / 2 - 1e-9);
        if (valid.some((x) => Math.abs(x - x0) < 0.2 || !safeRound(x, 1))) continue;
        const all = [x0, ...valid].sort((u, v) => u - v);
        const who = rng.pick(NAMES);
        const exp = [4, -2 * (L + W), L * W, 0];
        return {
          prompt: `${who} makes an open-top box from a ${L} cm by ${W} cm sheet of cardboard by cutting a square with sides of $x$ cm from each corner and folding up the sides. The volume of the box is $V(x) = x(${L} - 2x)(${W} - 2x)$ cubic centimetres. Find every value of $x$ that gives a volume of $${V0}$ cm³. Give each answer to the nearest tenth of a centimetre.`,
          parts: [part({ kind: 'numbers', values: all, decimals: 1 }, { label: '$x =$', suffix: 'cm', placeholder: 'e.g. 2.0, 6.2' })],
          hints: [
            `Expand $V(x)$, set it equal to $${V0}$, and rearrange to $P(x) = 0$. Divide every term by $4$.`,
            `Use the integral zero theorem to find one whole-number solution, divide, and use the quadratic formula on the quotient. Keep only values with $0 < x < ${W / 2}$.`,
          ],
          solution: [
            `Expand: $V(x) = ${ptex(exp)}$. The sides must have positive length, so $0 < x < ${W / 2}$.`,
            `Set $${ptex(exp)} = ${V0}$ and divide by $4$: $${ptex(cubic)} = 0$.`,
            `Test factors of $${V0 / 4}$: $${substTex(cubic, x0)}$, so $x = ${x0}$ is a solution. Divide by $x - ${x0}$:\n${synthTex(cubic, x0)}`,
            disc >= 0
              ? `Solve $${ptex(q)} = 0$ with the quadratic formula: $x = \\dfrac{${fmt(-B)} \\pm \\sqrt{${fmt(disc)}}}{2}$, so ${others.map((x) => (Number.isInteger(x) ? `$x = ${x}$` : `$x \\approx ${fmtFixed(x, 2)}$`)).join(' or ')}.`
              : `$${ptex(q)} = 0$ has no real solutions (its discriminant is negative).`,
            `Only values with $0 < x < ${W / 2}$ make sense${others.length && valid.length < others.length ? `, so reject ${others.filter((x) => !valid.includes(x)).map((x) => `$${Number.isInteger(x) ? x : fmtFixed(x, 2)}$`).join(' and ')}` : ''}.`,
            `$x = ${all.map((x) => fmtFixed(x, 1)).join('$ cm or $x = ')}$ cm`,
          ],
          answerDisplay: all.map((x) => `$${fmtFixed(x, 1)}$ cm`).join(' or '),
        };
      }
    }
    // a box whose dimensions are x, x + p and x + q
    const x0 = rng.int(2, 9);
    const pp = rng.int(1, 5);
    const qq = rng.int(pp + 1, 8);
    const V0 = x0 * (x0 + pp) * (x0 + qq);
    const cubic = [1, pp + qq, pp * qq, -V0];
    const { q } = synth(cubic, x0);
    const who = rng.pick(NAMES);
    const what = rng.pick(['a gift box', 'a jewellery box', 'a box for a set of headphones', 'a box for a board game', 'a box of chocolates']);
    const unit = 'cm';
    const tried = candidates(V0).filter((c) => c > 0 && c < x0).slice(-2);
    return {
      prompt: `${who} is designing ${what} in the shape of a rectangular prism. Its width is ${pp} ${unit} more than its height, and its length is ${qq} ${unit} more than its height. The volume must be $${V0}$ ${unit}³. Find the height, $x$.`,
      parts: [numPart(x0, { label: 'Height $x =$', suffix: unit })],
      hints: [`Write the volume as $x(x + ${pp})(x + ${qq})$ and set it equal to $${V0}$.`, 'Expand, rearrange to $P(x) = 0$, and use the integral zero theorem to find a positive whole-number solution. Check that the other zeros are not possible heights.'],
      solution: [
        `Volume: $x(x + ${pp})(x + ${qq}) = ${V0}$, so $${ptex([1, pp + qq, pp * qq, 0])} = ${V0}$ and $P(x) = ${ptex(cubic)} = 0$.`,
        `The height is positive, so test positive factors of $${V0}$${tried.length ? `: $${tried.map((c) => `P(${c}) = ${fmt(evalP(cubic, c))}`).join(',\\ ')}$, and` : ':'} $${substTex(cubic, x0)}$.`,
        `Divide by $x - ${x0}$:\n${synthTex(cubic, x0)}\nThe quotient $${ptex(q)}$ has only positive coefficients, so it is positive for every $x > 0$: there is no other positive solution.`,
        `Check: $${x0} \\times ${x0 + pp} \\times ${x0 + qq} = ${V0}$ ✓`,
        `The height is $${x0}$ ${unit}.`,
      ],
    };
  },
});

export const POLYNOMIALS_SKILLS: SkillDef[] = [polyFeatures, polyDivide, remainderTheorem, factorTheorem, polyFactor, polyGraph, polyEquation];
