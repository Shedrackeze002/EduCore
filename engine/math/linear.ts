/** Linear relation utilities: slopes, forms, and formatting. */
import type { Line } from '../types.ts';
import { type Frac, frac, fracLatex, fracMul, fracSub, fracAdd, gcdAll, fmt, fracText } from './numbers.ts';

export type Pt = [number, number];

/** Slope between two points as a reduced fraction, or null for a vertical line. */
export function slopeOf(p: Pt, q: Pt): Frac | null {
  const run = q[0] - p[0];
  if (run === 0) return null;
  return frac(q[1] - p[1], run);
}

/** Integer general-form coefficients, normalized (A > 0, or A = 0 and B > 0), gcd 1. */
export function normalizeLine(l: Line): Line {
  let { A, B, C } = l;
  // Clear fractions if coefficients are rational with small denominators.
  for (let d = 1; d <= 1000; d++) {
    if ([A, B, C].every((v) => Math.abs(v * d - Math.round(v * d)) < 1e-9)) {
      A = Math.round(A * d);
      B = Math.round(B * d);
      C = Math.round(C * d);
      break;
    }
  }
  const g = gcdAll([A, B, C]) || 1;
  A /= g;
  B /= g;
  C /= g;
  if (A < 0 || (A === 0 && B < 0)) {
    A = -A;
    B = -B;
    C = -C;
  }
  return { A: A + 0, B: B + 0, C: C + 0 };
}

export function lineThrough(p: Pt, q: Pt): Line {
  // (y2 - y1)x - (x2 - x1)y + (x2 - x1)y1 - (y2 - y1)x1 = 0
  const A = q[1] - p[1];
  const B = -(q[0] - p[0]);
  const C = (q[0] - p[0]) * p[1] - (q[1] - p[1]) * p[0];
  return normalizeLine({ A, B, C });
}

/** Line from slope m (fraction) and y-intercept b (fraction). */
export function lineFromSlopeIntercept(m: Frac, b: Frac): Line {
  // y = (mn/md)x + bn/bd  ->  mn*bd x - md*bd y + bn*md = 0
  return normalizeLine({ A: m.n * b.d, B: -m.d * b.d, C: b.n * m.d });
}

export function lineFromSlopePoint(m: Frac, p: Pt): Line {
  const b = fracSub(frac(p[1]), fracMul(m, frac(p[0])));
  return lineFromSlopeIntercept(m, b);
}

export function lineSlope(l: Line): Frac | null {
  if (l.B === 0) return null;
  return frac(-l.A, l.B);
}

export function lineYIntercept(l: Line): Frac | null {
  if (l.B === 0) return null;
  return frac(-l.C, l.B);
}

export function lineXIntercept(l: Line): Frac | null {
  if (l.A === 0) return null;
  return frac(-l.C, l.A);
}

export function evalLineY(l: Line, x: number): number {
  return (-l.C - l.A * x) / l.B;
}

/** Coefficient times x in LaTeX, e.g. 1 -> "x", -1 -> "-x", 2/3 -> "\frac{2}{3}x". */
export function coefX(m: Frac, v = 'x'): string {
  if (m.n === 0) return '0';
  if (m.d === 1) return m.n === 1 ? v : m.n === -1 ? `-${v}` : `${m.n}${v}`;
  return `${m.n < 0 ? '-' : ''}\\frac{${Math.abs(m.n)}}{${m.d}}${v}`;
}

/** "+ 3", "- \frac{1}{2}", or "" for zero. */
export function signedFracLatex(b: Frac): string {
  if (b.n === 0) return '';
  const abs = frac(Math.abs(b.n), b.d);
  return `${b.n < 0 ? ' - ' : ' + '}${fracLatex(abs)}`;
}

/** y = mx + b in LaTeX. */
export function slopeInterceptLatex(m: Frac, b: Frac, y = 'y', x = 'x'): string {
  if (m.n === 0) return `${y} = ${fracLatex(b)}`;
  return `${y} = ${coefX(m, x)}${signedFracLatex(b)}`;
}

/** y = mx + b in typed form (what a student would type). */
export function slopeInterceptText(m: Frac, b: Frac): string {
  const mt = m.n === 0 ? '' : m.d === 1 ? (m.n === 1 ? 'x' : m.n === -1 ? '-x' : `${m.n}x`) : `(${fracText(m)})x`;
  if (!mt) return `y = ${fracText(b)}`;
  if (b.n === 0) return `y = ${mt}`;
  return `y = ${mt} ${b.n < 0 ? '-' : '+'} ${fracText(frac(Math.abs(b.n), b.d))}`;
}

/** y - y1 = m(x - x1) in LaTeX. */
export function slopePointLatex(m: Frac, p: Pt): string {
  const yPart = p[1] === 0 ? 'y' : `y ${p[1] < 0 ? '+' : '-'} ${fmt(Math.abs(p[1]))}`;
  const xPart = p[0] === 0 ? 'x' : `x ${p[0] < 0 ? '+' : '-'} ${fmt(Math.abs(p[0]))}`;
  const mPart = m.d === 1 ? (m.n === 1 ? '' : m.n === -1 ? '-' : `${m.n}`) : fracLatex(m);
  return `${yPart} = ${mPart}(${xPart})`;
}

export function slopePointText(m: Frac, p: Pt): string {
  const yPart = p[1] === 0 ? 'y' : `y ${p[1] < 0 ? '+' : '-'} ${fmt(Math.abs(p[1]))}`;
  const xPart = p[0] === 0 ? 'x' : `x ${p[0] < 0 ? '+' : '-'} ${fmt(Math.abs(p[0]))}`;
  const mPart = m.d === 1 ? (m.n === 1 ? '' : m.n === -1 ? '-' : `${m.n}`) : `(${fracText(m)})`;
  return `${yPart} = ${mPart}(${xPart})`;
}

/** Ax + By + C = 0 in LaTeX. */
export function generalLatex(l: Line): string {
  const n = normalizeLine(l);
  const parts: string[] = [];
  const term = (c: number, v: string, first: boolean) => {
    if (c === 0) return;
    const abs = Math.abs(c);
    const body = v ? (abs === 1 ? v : `${abs}${v}`) : `${abs}`;
    if (first) parts.push(`${c < 0 ? '-' : ''}${body}`);
    else parts.push(`${c < 0 ? '-' : '+'} ${body}`);
  };
  term(n.A, 'x', true);
  term(n.B, 'y', parts.length === 0);
  term(n.C, '', parts.length === 0);
  return `${parts.join(' ')} = 0`;
}

export function generalText(l: Line): string {
  return generalLatex(l);
}

/** Pretty LaTeX for the equation of any line (vertical lines included). */
export function lineLatex(l: Line): string {
  const m = lineSlope(l);
  if (!m) return `x = ${fracLatex(lineXIntercept(l) ?? frac(0))}`;
  return slopeInterceptLatex(m, lineYIntercept(l)!);
}

export function lineText(l: Line): string {
  const m = lineSlope(l);
  if (!m) return `x = ${fracText(lineXIntercept(l) ?? frac(0))}`;
  return slopeInterceptText(m, lineYIntercept(l)!);
}

export function perpendicularSlope(m: Frac): Frac | null {
  if (m.n === 0) return null;
  return frac(-m.d, m.n);
}

export function midpoint(p: Pt, q: Pt): [Frac, Frac] {
  return [frac(p[0] + q[0], 2), frac(p[1] + q[1], 2)];
}

export function distanceSquared(p: Pt, q: Pt): number {
  return (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2;
}

/** Point on a line at a given x, as fractions. */
export function pointAt(m: Frac, b: Frac, x: number): [Frac, Frac] {
  return [frac(x), fracAdd(fracMul(m, frac(x)), b)];
}
