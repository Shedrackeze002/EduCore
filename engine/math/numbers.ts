/** Number-theory and formatting helpers shared by generators and graders. */

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) [a, b] = [b, a % b];
  return a;
}

export function gcdAll(values: number[]): number {
  return values.reduce((g, v) => gcd(g, v), 0);
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a / gcd(a, b)) * b);
}

export function lcmAll(values: number[]): number {
  return values.reduce((l, v) => lcm(l, v), 1);
}

export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}

export const SMALL_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

/** Prime factorization as a map prime -> exponent, ascending primes. */
export function primeFactorMap(n: number): Map<number, number> {
  const out = new Map<number, number>();
  let m = Math.abs(Math.round(n));
  for (let p = 2; p * p <= m; p++) {
    while (m % p === 0) {
      out.set(p, (out.get(p) ?? 0) + 1);
      m /= p;
    }
  }
  if (m > 1) out.set(m, (out.get(m) ?? 0) + 1);
  return out;
}

/** List of prime factors with repetition, ascending. */
export function primeFactorList(n: number): number[] {
  const out: number[] = [];
  for (const [p, e] of primeFactorMap(n)) for (let i = 0; i < e; i++) out.push(p);
  return out;
}

/** LaTeX for a prime factorization using exponents, e.g. 2^{3} \times 3^{2}. */
export function primeFactorLatex(n: number, useExponents = true): string {
  const map = primeFactorMap(n);
  if (!useExponents) return primeFactorList(n).join(' \\times ');
  return [...map].map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join(' \\times ');
}

export function isPerfectSquare(n: number): boolean {
  if (n < 0 || !Number.isInteger(n)) return false;
  const r = Math.round(Math.sqrt(n));
  return r * r === n;
}

export function isPerfectCube(n: number): boolean {
  if (!Number.isInteger(n)) return false;
  const r = Math.round(Math.cbrt(n));
  return r * r * r === n;
}

export function isPerfectPower(n: number, k: number): boolean {
  if (!Number.isInteger(n)) return false;
  if (n < 0 && k % 2 === 0) return false;
  const r = Math.round(Math.sign(n) * Math.abs(n) ** (1 / k));
  return r ** k === n;
}

/**
 * Split n into outside^k * inside where inside has no k-th power factor > 1.
 * e.g. radicalSplit(72, 2) = { outside: 6, inside: 2 } because 72 = 6^2 * 2.
 */
export function radicalSplit(n: number, k = 2): { outside: number; inside: number } {
  let outside = 1;
  let inside = Math.abs(n);
  for (const [p, e] of primeFactorMap(inside)) {
    const q = Math.floor(e / k);
    outside *= p ** q;
    inside /= p ** (q * k);
  }
  if (n < 0 && k % 2 === 1) outside = -outside;
  return { outside, inside };
}

export function isSquareFree(n: number): boolean {
  return radicalSplit(n, 2).outside === 1;
}

export interface Frac {
  n: number;
  d: number;
}

export function frac(n: number, d = 1): Frac {
  if (d === 0) throw new Error('zero denominator');
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
}

export function fracAdd(a: Frac, b: Frac): Frac {
  return frac(a.n * b.d + b.n * a.d, a.d * b.d);
}
export function fracSub(a: Frac, b: Frac): Frac {
  return frac(a.n * b.d - b.n * a.d, a.d * b.d);
}
export function fracMul(a: Frac, b: Frac): Frac {
  return frac(a.n * b.n, a.d * b.d);
}
export function fracDiv(a: Frac, b: Frac): Frac {
  return frac(a.n * b.d, a.d * b.n);
}
export function fracValue(a: Frac): number {
  return a.n / a.d;
}
export function fracEq(a: Frac, b: Frac): boolean {
  return a.n * b.d === b.n * a.d;
}

/** LaTeX for a fraction: integers print plainly, negatives put the sign in front. */
export function fracLatex(a: Frac, opts: { dfrac?: boolean } = {}): string {
  if (a.d === 1) return `${a.n}`;
  const cmd = opts.dfrac ? '\\dfrac' : '\\frac';
  return `${a.n < 0 ? '-' : ''}${cmd}{${Math.abs(a.n)}}{${a.d}}`;
}

/** Plain-text fraction, e.g. "-3/4". */
export function fracText(a: Frac): string {
  return a.d === 1 ? `${a.n}` : `${a.n}/${a.d}`;
}

/** Try to express x as a fraction with a small denominator. */
export function toFrac(x: number, maxDen = 1000): Frac | null {
  if (!Number.isFinite(x)) return null;
  for (let d = 1; d <= maxDen; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) < 1e-9) return frac(n, d);
  }
  return null;
}

export function roundTo(x: number, decimals: number): number {
  const f = 10 ** decimals;
  // Add a tiny epsilon in the direction of x to defeat binary representation (e.g. 1.005).
  return Math.round((x + Math.sign(x) * 1e-12) * f) / f;
}

/** Format a number without trailing zeros, using at most `decimals` places. */
export function fmt(x: number, decimals = 4): string {
  if (!Number.isFinite(x)) return String(x);
  const r = roundTo(x, decimals);
  const s = r.toFixed(decimals).replace(/\.?0+$/, '');
  return s === '-0' ? '0' : s;
}

/** Format with exactly `decimals` places (for "round to the nearest tenth" answers). */
export function fmtFixed(x: number, decimals: number): string {
  const s = roundTo(x, decimals).toFixed(decimals);
  return s.startsWith('-') && Number(s) === 0 ? s.slice(1) : s;
}

/** Thousands separators for readability in prose, e.g. 12 345.6 (SI style thin space). */
export function fmtGroup(x: number, decimals = 4): string {
  const s = fmt(x, decimals);
  const [i, f] = s.split('.');
  const neg = i.startsWith('-');
  const digits = neg ? i.slice(1) : i;
  const grouped = digits.length > 4 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : digits;
  return `${neg ? '-' : ''}${grouped}${f ? '.' + f : ''}`;
}

/** LaTeX-safe version of fmtGroup (commas need braces in KaTeX to avoid extra space). */
export function fmtGroupTex(x: number, decimals = 4): string {
  return fmtGroup(x, decimals).replace(/,/g, '{,}');
}

export function approxEqual(a: number, b: number, abs = 1e-9, rel = 1e-9): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  const diff = Math.abs(a - b);
  return diff <= abs || diff <= rel * Math.max(Math.abs(a), Math.abs(b));
}

export function divisors(n: number): number[] {
  const out: number[] = [];
  const m = Math.abs(n);
  for (let i = 1; i <= m; i++) if (m % i === 0) out.push(i);
  return out;
}

/** Signed term for building polynomial strings: coefficient with sign, e.g. "+ 3x", "- x". */
export function signedTerm(coef: number, body: string, first = false): string {
  if (coef === 0) return '';
  const abs = Math.abs(coef);
  const c = body && abs === 1 ? '' : fmt(abs);
  const sign = coef < 0 ? '-' : '+';
  if (first) return `${coef < 0 ? '-' : ''}${c}${body}`;
  return ` ${sign} ${c}${body}`;
}

/**
 * Build a polynomial string (LaTeX or plain) from [coef, body] pairs, skipping zeros.
 * e.g. polyString([[2,'x^2'],[-3,'x'],[1,'']]) -> "2x^2 - 3x + 1"
 */
export function polyString(terms: Array<[number, string]>): string {
  let out = '';
  for (const [c, b] of terms) {
    if (c === 0) continue;
    out += signedTerm(c, b, out === '');
  }
  return out === '' ? '0' : out;
}

/** "+ 3" / "- 3" helper for writing (x + 3) style factors. */
export function plusMinus(n: number): string {
  return n < 0 ? `- ${fmt(-n)}` : `+ ${fmt(n)}`;
}

/** Wrap negatives in parentheses for substitution displays: -3 -> (-3). */
export function paren(n: number | string): string {
  const s = typeof n === 'number' ? fmt(n) : n;
  return s.startsWith('-') ? `(${s})` : s;
}

export const DEG = Math.PI / 180;
export const sinD = (deg: number) => Math.sin(deg * DEG);
export const cosD = (deg: number) => Math.cos(deg * DEG);
export const tanD = (deg: number) => Math.tan(deg * DEG);
export const asinD = (x: number) => Math.asin(x) / DEG;
export const acosD = (x: number) => Math.acos(x) / DEG;
export const atanD = (x: number) => Math.atan(x) / DEG;
