/**
 * Multivariate polynomials with numeric coefficients, built from parsed expressions.
 * Used to check whether an answer is "expanded", "fully factored", etc.
 */
import { type Node, unparen } from './expr.ts';
import { gcdAll, isPerfectSquare } from './numbers.ts';

/** Monomial key: sorted "x^2*y" style string; "" for the constant term. */
export type Poly = Map<string, number>;

const EPS = 1e-9;

export function monoKey(vars: Record<string, number>): string {
  return Object.keys(vars)
    .filter((v) => vars[v] !== 0)
    .sort()
    .map((v) => (vars[v] === 1 ? v : `${v}^${vars[v]}`))
    .join('*');
}

export function parseMonoKey(key: string): Record<string, number> {
  const out: Record<string, number> = {};
  if (!key) return out;
  for (const part of key.split('*')) {
    const [v, e] = part.split('^');
    out[v] = e ? Number(e) : 1;
  }
  return out;
}

function clean(p: Poly): Poly {
  for (const [k, c] of p) if (Math.abs(c) < EPS) p.delete(k);
  return p;
}

export function polyConst(c: number): Poly {
  return clean(new Map([['', c]]));
}

export function polyAdd(a: Poly, b: Poly, sign = 1): Poly {
  const out = new Map(a);
  for (const [k, c] of b) out.set(k, (out.get(k) ?? 0) + sign * c);
  return clean(out);
}

export function polyMul(a: Poly, b: Poly): Poly {
  const out: Poly = new Map();
  for (const [ka, ca] of a) {
    const va = parseMonoKey(ka);
    for (const [kb, cb] of b) {
      const vb = parseMonoKey(kb);
      const v: Record<string, number> = { ...va };
      for (const [x, e] of Object.entries(vb)) v[x] = (v[x] ?? 0) + e;
      const k = monoKey(v);
      out.set(k, (out.get(k) ?? 0) + ca * cb);
    }
  }
  return clean(out);
}

export function polyPow(a: Poly, n: number): Poly {
  let out = polyConst(1);
  for (let i = 0; i < n; i++) out = polyMul(out, a);
  return out;
}

export function polyDegree(p: Poly): number {
  let d = 0;
  for (const k of p.keys()) {
    const v = parseMonoKey(k);
    d = Math.max(d, Object.values(v).reduce((s, e) => s + e, 0));
  }
  return d;
}

export function polyVars(p: Poly): string[] {
  const s = new Set<string>();
  for (const k of p.keys()) for (const v of Object.keys(parseMonoKey(k))) s.add(v);
  return [...s].sort();
}

export function polyEquals(a: Poly, b: Poly): boolean {
  const diff = polyAdd(a, b, -1);
  return diff.size === 0;
}

/** Convert an expression tree to a polynomial, or null if it is not a polynomial. */
export function toPoly(n: Node): Poly | null {
  switch (n.t) {
    case 'num':
      return polyConst(n.v);
    case 'var':
      return new Map([[n.name, 1]]);
    case 'pi':
      return polyConst(Math.PI);
    case 'paren':
      return toPoly(n.a);
    case 'neg': {
      const a = toPoly(n.a);
      return a && polyAdd(new Map(), a, -1);
    }
    case 'add':
    case 'sub': {
      const a = toPoly(n.a);
      const b = toPoly(n.b);
      return a && b ? polyAdd(a, b, n.t === 'add' ? 1 : -1) : null;
    }
    case 'mul': {
      const a = toPoly(n.a);
      const b = toPoly(n.b);
      return a && b ? polyMul(a, b) : null;
    }
    case 'div': {
      const a = toPoly(n.a);
      const b = toPoly(n.b);
      if (!a || !b || b.size !== 1 || !b.has('')) return null;
      const d = b.get('')!;
      if (Math.abs(d) < EPS) return null;
      return clean(new Map([...a].map(([k, c]) => [k, c / d])));
    }
    case 'pow': {
      const a = toPoly(n.a);
      const e = toPoly(n.b);
      if (!a || !e || e.size > 1 || (e.size === 1 && !e.has(''))) return null;
      const k = e.get('') ?? 0;
      if (!Number.isInteger(k) || k < 0 || k > 12) return null;
      return polyPow(a, k);
    }
    case 'fn':
      return null;
  }
}

/** Integer content (gcd of coefficients); returns 0 if any coefficient is non-integer. */
export function polyContent(p: Poly): number {
  const coeffs = [...p.values()];
  if (coeffs.some((c) => Math.abs(c - Math.round(c)) > 1e-9)) return 0;
  return gcdAll(coeffs.map((c) => Math.round(c)));
}

/** True if every term shares a variable (e.g. x^2 + 3x share x). */
export function hasCommonVariable(p: Poly): boolean {
  if (p.size < 2) return false;
  const vars = polyVars(p);
  return vars.some((v) => [...p.keys()].every((k) => (parseMonoKey(k)[v] ?? 0) > 0));
}

/** Coefficients of a univariate polynomial, highest degree first. */
function univariateCoeffs(p: Poly, v: string): number[] | null {
  const deg = polyDegree(p);
  const out = new Array(deg + 1).fill(0);
  for (const [k, c] of p) {
    const m = parseMonoKey(k);
    const keys = Object.keys(m);
    if (keys.length > 1 || (keys.length === 1 && keys[0] !== v)) return null;
    const e = m[v] ?? 0;
    out[deg - e] = c;
  }
  return out;
}

/** For a homogeneous polynomial in two variables, dehomogenize by setting y = 1. */
function dehomogenize(p: Poly): { coeffs: number[] } | null {
  const vars = polyVars(p);
  if (vars.length !== 2) return null;
  const deg = polyDegree(p);
  const [x, y] = vars;
  const out = new Array(deg + 1).fill(0);
  for (const [k, c] of p) {
    const m = parseMonoKey(k);
    const ex = m[x] ?? 0;
    const ey = m[y] ?? 0;
    if (ex + ey !== deg) return null;
    out[deg - ex] = c;
  }
  return { coeffs: out };
}

function hasRationalRoot(coeffs: number[]): boolean {
  // Rational root theorem on integer coefficients (highest degree first).
  while (coeffs.length && Math.abs(coeffs[0]) < EPS) coeffs = coeffs.slice(1);
  if (coeffs.length <= 1) return false;
  if (Math.abs(coeffs[coeffs.length - 1]) < EPS) return true; // x is a factor
  const lead = Math.abs(Math.round(coeffs[0]));
  const last = Math.abs(Math.round(coeffs[coeffs.length - 1]));
  const ps: number[] = [];
  const qs: number[] = [];
  for (let i = 1; i <= last; i++) if (last % i === 0) ps.push(i);
  for (let i = 1; i <= lead; i++) if (lead % i === 0) qs.push(i);
  for (const pp of ps)
    for (const q of qs)
      for (const s of [1, -1]) {
        const r = (s * pp) / q;
        let val = 0;
        for (const c of coeffs) val = val * r + c;
        if (Math.abs(val) < 1e-7) return true;
      }
  return false;
}

/**
 * Whether a primitive polynomial factor can be factored further over the integers.
 * Handles linear factors (never), quadratics via the discriminant, and higher degree
 * univariate / homogeneous bivariate polynomials via rational roots.
 */
export function isReducibleOverIntegers(p: Poly): boolean {
  const deg = polyDegree(p);
  if (deg <= 1) return false;
  const vars = polyVars(p);
  let coeffs: number[] | null = null;
  if (vars.length === 1) coeffs = univariateCoeffs(p, vars[0]);
  else if (vars.length === 2) coeffs = dehomogenize(p)?.coeffs ?? null;
  if (!coeffs) {
    // Mixed non-homogeneous multivariate: look for a quadratic in one variable like x^2 - y^2 + ...
    return false;
  }
  if (coeffs.length === 3) {
    const [a, b, c] = coeffs;
    const disc = b * b - 4 * a * c;
    return disc >= 0 && isPerfectSquare(Math.round(disc)) && Math.abs(disc - Math.round(disc)) < 1e-9;
  }
  if (hasRationalRoot(coeffs)) return true;
  // Quartic biquadratic a x^4 + b x^2 + c may split into two quadratics.
  if (coeffs.length === 5 && Math.abs(coeffs[1]) < EPS && Math.abs(coeffs[3]) < EPS) {
    const [a, , b, , c] = coeffs;
    const disc = b * b - 4 * a * c;
    if (disc >= 0 && isPerfectSquare(Math.round(disc))) return true;
  }
  return false;
}

/** LaTeX for a polynomial in a stable, conventional order (descending degree, alphabetical). */
export function polyLatex(p: Poly, order?: string[]): string {
  if (p.size === 0) return '0';
  const vars = order ?? polyVars(p);
  const keys = [...p.keys()].sort((ka, kb) => {
    const a = parseMonoKey(ka);
    const b = parseMonoKey(kb);
    const da = Object.values(a).reduce((s, e) => s + e, 0);
    const db = Object.values(b).reduce((s, e) => s + e, 0);
    if (da !== db) return db - da;
    for (const v of vars) {
      const d = (b[v] ?? 0) - (a[v] ?? 0);
      if (d !== 0) return d;
    }
    return 0;
  });
  let out = '';
  for (const k of keys) {
    const c = p.get(k)!;
    const m = parseMonoKey(k);
    const body = vars
      .filter((v) => m[v])
      .map((v) => (m[v] === 1 ? v : `${v}^{${m[v]}}`))
      .join('');
    const abs = Math.abs(c);
    const coefStr = body && Math.abs(abs - 1) < EPS ? '' : formatCoef(abs);
    if (out === '') out = `${c < 0 ? '-' : ''}${coefStr}${body}`;
    else out += ` ${c < 0 ? '-' : '+'} ${coefStr}${body}`;
  }
  return out;
}

function formatCoef(x: number): string {
  if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x));
  return String(Number(x.toFixed(6)));
}

/** Plain-text version (for typed answers and AI prompts). */
export function polyText(p: Poly, order?: string[]): string {
  return polyLatex(p, order).replace(/\^\{(\d+)\}/g, '^$1');
}

/** Flatten a top-level sum into signed terms. */
export function sumTerms(n: Node, sign = 1, out: Array<{ node: Node; sign: number }> = []) {
  const u = n.t === 'paren' ? n : n;
  switch (u.t) {
    case 'add':
      sumTerms(u.a, sign, out);
      sumTerms(u.b, sign, out);
      break;
    case 'sub':
      sumTerms(u.a, sign, out);
      sumTerms(u.b, -sign, out);
      break;
    case 'neg':
      sumTerms(u.a, -sign, out);
      break;
    default:
      out.push({ node: u, sign });
  }
  return out;
}

/** Flatten a top-level product into factors (with exponents for powers). */
export function productFactors(n: Node, out: Array<{ node: Node; power: number }> = [], negate = { v: false }) {
  const u = n;
  switch (u.t) {
    case 'mul':
      productFactors(u.a, out, negate);
      productFactors(u.b, out, negate);
      break;
    case 'neg':
      negate.v = !negate.v;
      productFactors(u.a, out, negate);
      break;
    case 'pow': {
      const e = unparen(u.b);
      if (e.t === 'num' && Number.isInteger(e.v) && e.v > 0) out.push({ node: unparen(u.a), power: e.v });
      else out.push({ node: u, power: 1 });
      break;
    }
    default:
      out.push({ node: unparen(u), power: 1 });
  }
  return { factors: out, negated: negate.v };
}

/**
 * Inspect a single term like 3x^2y or -x*y^3/2 and report whether it is a simple monomial.
 * Returns null when the term contains a sum, a radical, or variable division.
 */
export function monomialInfo(
  n: Node,
): { key: string; coef: number; numericLiterals: number; repeatedVar: boolean } | null {
  let numericLiterals = 0;
  let repeatedVar = false;
  const vars: Record<string, number> = {};
  let coef = 1;
  const walk = (x: Node, power: number): boolean => {
    switch (x.t) {
      case 'num':
        numericLiterals++;
        coef *= x.v ** power;
        return true;
      case 'var':
        if (vars[x.name] !== undefined) repeatedVar = true;
        vars[x.name] = (vars[x.name] ?? 0) + power;
        return true;
      case 'neg':
        coef *= -1;
        return walk(x.a, power);
      case 'mul':
        return walk(x.a, power) && walk(x.b, power);
      case 'div': {
        const d = unparen(x.b);
        if (d.t !== 'num') return false;
        numericLiterals++;
        coef /= d.v ** power;
        return walk(x.a, power);
      }
      case 'pow': {
        const e = unparen(x.b);
        const base = unparen(x.a);
        if (e.t !== 'num' || !Number.isInteger(e.v)) return false;
        if (base.t === 'var' || base.t === 'num') return walk(base, power * e.v);
        return false;
      }
      case 'paren': {
        const inner = x.a;
        if (inner.t === 'add' || inner.t === 'sub') return false;
        return walk(inner, power);
      }
      default:
        return false;
    }
  };
  if (!walk(n, 1)) return null;
  return { key: monoKey(vars), coef, numericLiterals, repeatedVar };
}
