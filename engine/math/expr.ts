/**
 * A small, forgiving math-expression parser built for student input.
 *
 * Supports: + - * / ^, parentheses (also [] and {}), implicit multiplication (2x, 3(x+1),
 * (x+1)(x-2), xy), sqrt / cbrt / root(n, x) / abs, the trigonometric functions (radians;
 * sin^2(x) means (sin x)^2), ln / log (base 10) / exp, the constants pi and e, unicode symbols
 * (√ ∛ π × ÷ − ² ³), and equations (one "=").
 */

export type Node =
  | { t: 'num'; v: number; raw: string }
  | { t: 'var'; name: string }
  | { t: 'pi' }
  | { t: 'neg'; a: Node }
  | { t: 'add'; a: Node; b: Node }
  | { t: 'sub'; a: Node; b: Node }
  | { t: 'mul'; a: Node; b: Node; implicit?: boolean }
  | { t: 'div'; a: Node; b: Node }
  | { t: 'pow'; a: Node; b: Node }
  | { t: 'fn'; name: FnName; args: Node[] }
  | { t: 'paren'; a: Node };

export type FnName = 'sqrt' | 'cbrt' | 'root' | 'abs' | TrigName | 'ln' | 'log' | 'exp';
export type TrigName = 'sin' | 'cos' | 'tan' | 'sec' | 'csc' | 'cot';
const TRIG: readonly string[] = ['sin', 'cos', 'tan', 'sec', 'csc', 'cot'];
const RADICALS: readonly string[] = ['sqrt', 'cbrt', 'root', 'abs'];

export class ParseError extends Error {
  constructor(
    message: string,
    public pos: number,
  ) {
    super(message);
  }
}

type Tok =
  | { k: 'num'; v: number; raw: string; pos: number }
  | { k: 'id'; v: string; pos: number }
  | { k: 'fn'; v: FnName; pos: number }
  | { k: 'pi'; pos: number }
  | { k: 'op'; v: string; pos: number }
  | { k: 'end'; pos: number };

/** Names read as a unit before single letters; e on its own is Euler's number. */
const KNOWN: Array<[string, 'fn' | 'pi' | 'e']> = [
  ['sqrt', 'fn'],
  ['cbrt', 'fn'],
  ['root', 'fn'],
  ['abs', 'fn'],
  ['sin', 'fn'],
  ['cos', 'fn'],
  ['tan', 'fn'],
  ['sec', 'fn'],
  ['csc', 'fn'],
  ['cot', 'fn'],
  ['ln', 'fn'],
  ['log', 'fn'],
  ['exp', 'fn'],
  ['pi', 'pi'],
  ['e', 'e'],
];

export function normalizeInput(src: string): string {
  return src
    .replace(/[−–—﹣－]/g, '-')
    .replace(/[×·⋅∙✕]/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .replace(/∛/g, 'cbrt')
    .replace(/\*\*/g, '^')
    .replace(/⁰/g, '^0')
    .replace(/¹/g, '^1')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁴/g, '^4')
    .replace(/⁵/g, '^5')
    .replace(/[[{]/g, '(')
    .replace(/[\]}]/g, ')')
    .replace(/ /g, ' ')
    .trim();
}

function tokenize(input: string): Tok[] {
  const s = input;
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === ' ' || c === '\t' || c === '\n') {
      i++;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      const start = i;
      while (i < s.length && /[0-9]/.test(s[i])) i++;
      if (s[i] === '.') {
        i++;
        while (i < s.length && /[0-9]/.test(s[i])) i++;
      }
      const raw = s.slice(start, i);
      if (raw === '.') throw new ParseError('A decimal point needs digits.', start);
      out.push({ k: 'num', v: Number(raw), raw, pos: start });
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      const lower = s.slice(i).toLowerCase();
      const known = KNOWN.find(([name]) => lower.startsWith(name));
      if (known) {
        const [name, kind] = known;
        out.push(kind === 'fn' ? { k: 'fn', v: name as FnName, pos: i } : kind === 'pi' ? { k: 'pi', pos: i } : { k: 'num', v: Math.E, raw: 'e', pos: i });
        i += name.length;
        continue;
      }
      out.push({ k: 'id', v: c, pos: i });
      i++;
      continue;
    }
    if ('+-*/^(),=|'.includes(c)) {
      out.push({ k: 'op', v: c, pos: i });
      i++;
      continue;
    }
    throw new ParseError(`Unexpected symbol "${c}".`, i);
  }
  out.push({ k: 'end', pos: s.length });
  return out;
}

class Parser {
  private i = 0;
  /** How many |…| bars are open: inside one, a bar closes it rather than starting a new one. */
  private absDepth = 0;
  constructor(private toks: Tok[]) {}

  private peek(): Tok {
    return this.toks[this.i];
  }
  private next(): Tok {
    return this.toks[this.i++];
  }
  private isOp(v: string): boolean {
    const t = this.peek();
    return t.k === 'op' && t.v === v;
  }
  private expectOp(v: string): void {
    const t = this.next();
    if (t.k !== 'op' || t.v !== v) {
      throw new ParseError(v === ')' ? 'A bracket is missing a closing ")".' : `Expected "${v}".`, t.pos);
    }
  }

  parseAll(): Node {
    if (this.peek().k === 'end') throw new ParseError('Enter an answer.', 0);
    const n = this.sum();
    const t = this.peek();
    if (t.k !== 'end') {
      if (t.k === 'op' && t.v === ')') throw new ParseError('There is an extra ")".', t.pos);
      if (t.k === 'op' && t.v === '=') throw new ParseError('Unexpected "=".', t.pos);
      throw new ParseError('Something is out of place here.', t.pos);
    }
    return n;
  }

  sum(): Node {
    let left = this.product();
    while (this.isOp('+') || this.isOp('-')) {
      const op = (this.next() as { v: string }).v;
      const right = this.product();
      left = op === '+' ? { t: 'add', a: left, b: right } : { t: 'sub', a: left, b: right };
    }
    return left;
  }

  product(): Node {
    let left = this.unary();
    for (;;) {
      if (this.isOp('*') || this.isOp('/')) {
        const op = (this.next() as { v: string }).v;
        const right = this.unary();
        left = op === '*' ? { t: 'mul', a: left, b: right } : { t: 'div', a: left, b: right };
        continue;
      }
      const t = this.peek();
      if (t.k === 'id' || t.k === 'fn' || t.k === 'pi' || (t.k === 'num' && t.raw === 'e') || (t.k === 'op' && (t.v === '(' || (t.v === '|' && this.absDepth === 0)))) {
        const right = this.power();
        left = { t: 'mul', a: left, b: right, implicit: true };
        continue;
      }
      if (t.k === 'num') {
        throw new ParseError('Two numbers are next to each other. Add an operation such as * or +.', t.pos);
      }
      return left;
    }
  }

  unary(): Node {
    if (this.isOp('-')) {
      this.next();
      return { t: 'neg', a: this.unary() };
    }
    if (this.isOp('+')) {
      this.next();
      return this.unary();
    }
    return this.power();
  }

  power(): Node {
    const base = this.primary();
    if (this.isOp('^')) {
      const t = this.next();
      if (this.peek().k === 'end') throw new ParseError('An exponent is missing after "^".', t.pos);
      const exp = this.unary();
      return { t: 'pow', a: base, b: exp };
    }
    return base;
  }

  primary(): Node {
    const t = this.next();
    switch (t.k) {
      case 'num':
        return { t: 'num', v: t.v, raw: t.raw };
      case 'id':
        return { t: 'var', name: t.v };
      case 'pi':
        return { t: 'pi' };
      case 'fn': {
        // sin^2(x) and sin^2 x mean (sin x)^2.
        if (TRIG.includes(t.v) && this.isOp('^')) {
          this.next();
          const exp = this.primary();
          const arg = this.fnArgs(t);
          return { t: 'pow', a: arg, b: exp };
        }
        if (this.isOp('(')) {
          this.next();
          const args: Node[] = [this.sum()];
          while (this.isOp(',')) {
            this.next();
            args.push(this.sum());
          }
          this.expectOp(')');
          const want = t.v === 'root' ? 2 : 1;
          if (args.length !== want) {
            throw new ParseError(
              t.v === 'root' ? 'root needs two inputs: root(index, number).' : `${t.v} takes one input.`,
              t.pos,
            );
          }
          return { t: 'fn', name: t.v, args };
        }
        if (t.v === 'root') throw new ParseError('Write root(index, number), e.g. root(4, 81).', t.pos);
        if (!RADICALS.includes(t.v)) return this.fnArgs(t);
        // Prefix form without brackets: √12, sqrtx; √(x+1) is handled above.
        const nt = this.peek();
        if (nt.k === 'num' || nt.k === 'id' || nt.k === 'pi') {
          return { t: 'fn', name: t.v, args: [this.primary()] };
        }
        throw new ParseError(`${t.v === 'sqrt' ? '√' : t.v} needs something to act on.`, t.pos);
      }
      case 'op':
        if (t.v === '(') {
          if (this.isOp(')')) throw new ParseError('Empty brackets.', t.pos);
          const inner = this.sum();
          this.expectOp(')');
          return { t: 'paren', a: inner };
        }
        if (t.v === '|') {
          if (this.isOp('|')) throw new ParseError('Empty absolute value bars.', t.pos);
          this.absDepth++;
          const inner = this.sum();
          this.absDepth--;
          if (!this.isOp('|')) throw new ParseError('An absolute value bar "|" is missing.', t.pos);
          this.next();
          return { t: 'fn', name: 'abs', args: [inner] };
        }
        if (t.v === ')') throw new ParseError('There is an extra ")".', t.pos);
        throw new ParseError(`"${t.v}" is missing a number or variable.`, t.pos);
      case 'end':
        throw new ParseError('The expression ends too early.', t.pos);
    }
  }

  /**
   * A trigonometric, log or exponential function applied to its argument: sin(2x), or without
   * brackets the whole term that follows, as textbooks write it (sin 2x, ln x^2, sin x cos x).
   */
  private fnArgs(t: Extract<Tok, { k: 'fn' }>): Node {
    if (this.isOp('(')) {
      this.next();
      const arg = this.sum();
      this.expectOp(')');
      return { t: 'fn', name: t.v, args: [arg] };
    }
    const nt = this.peek();
    if (nt.k !== 'num' && nt.k !== 'id' && nt.k !== 'pi') throw new ParseError(`${t.v} needs something to act on.`, t.pos);
    let arg = this.power();
    for (let k = this.peek(); k.k === 'id' || k.k === 'pi' || (k.k === 'num' && k.raw === 'e'); k = this.peek()) {
      arg = { t: 'mul', a: arg, b: this.power(), implicit: true };
    }
    return { t: 'fn', name: t.v, args: [arg] };
  }
}

export function parseExpr(src: string): Node {
  const norm = normalizeInput(src);
  if (norm.includes('=')) throw new ParseError('Enter an expression, not an equation.', norm.indexOf('='));
  return new Parser(tokenize(norm)).parseAll();
}

export interface Equation {
  lhs: Node;
  rhs: Node;
}

export function parseEquation(src: string): Equation {
  const norm = normalizeInput(src);
  const parts = norm.split('=');
  if (parts.length !== 2) {
    throw new ParseError(parts.length === 1 ? 'An equation needs an "=" sign.' : 'Use only one "=" sign.', 0);
  }
  if (!parts[0].trim()) throw new ParseError('The left side of the equation is empty.', 0);
  if (!parts[1].trim()) throw new ParseError('The right side of the equation is empty.', norm.length);
  return {
    lhs: new Parser(tokenize(parts[0])).parseAll(),
    rhs: new Parser(tokenize(parts[1])).parseAll(),
  };
}

/** Split "(a, b)" into two expression strings. Accepts "a, b", "(a,b)", "(a; b)". */
export function splitPoint(src: string): [string, string] | null {
  let s = normalizeInput(src);
  if (s.startsWith('(') && s.endsWith(')')) s = s.slice(1, -1);
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if ((c === ',' || c === ';') && depth === 0) {
      const a = s.slice(0, i).trim();
      const b = s.slice(i + 1).trim();
      if (!a || !b || b.includes(',')) return null;
      return [a, b];
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Evaluation
// ---------------------------------------------------------------------------

export type Env = Record<string, number>;

/** Real power that handles odd roots of negatives, e.g. (-8)^(1/3) = -2. */
export function realPow(base: number, exp: number): number {
  if (base >= 0 || Number.isInteger(exp)) return Math.pow(base, exp);
  for (let q = 3; q <= 15; q += 2) {
    const p = Math.round(exp * q);
    if (Math.abs(p / q - exp) < 1e-12) {
      const r = Math.pow(-base, exp);
      return p % 2 === 0 ? r : -r;
    }
  }
  return NaN;
}

export function evaluate(n: Node, env: Env = {}): number {
  switch (n.t) {
    case 'num':
      return n.v;
    case 'var': {
      const v = env[n.name];
      return v === undefined ? NaN : v;
    }
    case 'pi':
      return Math.PI;
    case 'neg':
      return -evaluate(n.a, env);
    case 'paren':
      return evaluate(n.a, env);
    case 'add':
      return evaluate(n.a, env) + evaluate(n.b, env);
    case 'sub':
      return evaluate(n.a, env) - evaluate(n.b, env);
    case 'mul':
      return evaluate(n.a, env) * evaluate(n.b, env);
    case 'div': {
      const d = evaluate(n.b, env);
      return d === 0 ? NaN : evaluate(n.a, env) / d;
    }
    case 'pow':
      return realPow(evaluate(n.a, env), evaluate(n.b, env));
    case 'fn': {
      const x = evaluate(n.args[n.args.length - 1], env);
      switch (n.name) {
        case 'sqrt':
          return x < 0 ? NaN : Math.sqrt(x);
        case 'cbrt':
          return Math.cbrt(x);
        case 'abs':
          return Math.abs(x);
        case 'root': {
          const k = evaluate(n.args[0], env);
          if (!Number.isInteger(k) || k < 2) return NaN;
          return realPow(x, 1 / k);
        }
        case 'sin':
          return Math.sin(x);
        case 'cos':
          return Math.cos(x);
        case 'tan':
          return Math.abs(Math.cos(x)) < 1e-12 ? NaN : Math.tan(x);
        case 'sec':
          return Math.abs(Math.cos(x)) < 1e-12 ? NaN : 1 / Math.cos(x);
        case 'csc':
          return Math.abs(Math.sin(x)) < 1e-12 ? NaN : 1 / Math.sin(x);
        case 'cot':
          return Math.abs(Math.sin(x)) < 1e-12 ? NaN : Math.cos(x) / Math.sin(x);
        case 'ln':
          return x <= 0 ? NaN : Math.log(x);
        case 'log':
          return x <= 0 ? NaN : Math.log10(x);
        case 'exp':
          return Math.exp(x);
      }
    }
  }
}

export function variablesOf(n: Node, acc = new Set<string>()): Set<string> {
  switch (n.t) {
    case 'var':
      acc.add(n.name);
      break;
    case 'neg':
    case 'paren':
      variablesOf(n.a, acc);
      break;
    case 'add':
    case 'sub':
    case 'mul':
    case 'div':
    case 'pow':
      variablesOf(n.a, acc);
      variablesOf(n.b, acc);
      break;
    case 'fn':
      n.args.forEach((a) => variablesOf(a, acc));
      break;
  }
  return acc;
}

/** Remove grouping parentheses (keeps structure). */
export function unparen(n: Node): Node {
  while (n.t === 'paren') n = n.a;
  return n;
}

/** True if the tree only contains numbers (no variables). */
export function isConstant(n: Node): boolean {
  return variablesOf(n).size === 0;
}

export function containsNode(n: Node, pred: (x: Node) => boolean): boolean {
  if (pred(n)) return true;
  switch (n.t) {
    case 'neg':
    case 'paren':
      return containsNode(n.a, pred);
    case 'add':
    case 'sub':
    case 'mul':
    case 'div':
    case 'pow':
      return containsNode(n.a, pred) || containsNode(n.b, pred);
    case 'fn':
      return n.args.some((a) => containsNode(a, pred));
    default:
      return false;
  }
}

// ---------------------------------------------------------------------------
// LaTeX rendering (used for the live "we read your answer as" preview)
// ---------------------------------------------------------------------------

const PREC: Record<string, number> = { add: 1, sub: 1, mul: 2, div: 2, neg: 3, pow: 4 };

function prec(n: Node): number {
  return PREC[n.t] ?? 5;
}

export function toLatex(n: Node): string {
  switch (n.t) {
    case 'num':
      return n.raw;
    case 'var':
      return n.name;
    case 'pi':
      return '\\pi';
    case 'paren':
      return `\\left(${toLatex(n.a)}\\right)`;
    case 'neg': {
      const inner = toLatex(n.a);
      return prec(n.a) < 3 ? `-\\left(${inner}\\right)` : `-${inner}`;
    }
    case 'add':
      return `${toLatex(n.a)} + ${toLatex(n.b)}`;
    case 'sub': {
      const r = prec(n.b) <= 1 ? `\\left(${toLatex(n.b)}\\right)` : toLatex(n.b);
      return `${toLatex(n.a)} - ${r}`;
    }
    case 'mul': {
      const l = prec(n.a) < 2 ? `\\left(${toLatex(n.a)}\\right)` : toLatex(n.a);
      const r = prec(n.b) <= 2 && n.b.t !== 'paren' ? `\\left(${toLatex(n.b)}\\right)` : toLatex(n.b);
      const needsDot = !n.implicit || startsWithDigit(n.b) || n.b.t === 'neg';
      return needsDot ? `${l} \\cdot ${r}` : `${l}${r}`;
    }
    case 'div':
      return `\\frac{${toLatex(unparen(n.a))}}{${toLatex(unparen(n.b))}}`;
    case 'pow': {
      const base = prec(n.a) < 5 || n.a.t === 'fn' ? `\\left(${toLatex(n.a)}\\right)` : toLatex(n.a);
      return `{${base}}^{${toLatex(unparen(n.b))}}`;
    }
    case 'fn': {
      const arg = toLatex(unparen(n.args[n.args.length - 1]));
      switch (n.name) {
        case 'sqrt':
          return `\\sqrt{${arg}}`;
        case 'cbrt':
          return `\\sqrt[3]{${arg}}`;
        case 'root':
          return `\\sqrt[${toLatex(unparen(n.args[0]))}]{${arg}}`;
        case 'abs':
          return `\\left|${arg}\\right|`;
        case 'exp':
          return `e^{${arg}}`;
        default:
          return `\\${n.name}\\left(${arg}\\right)`;
      }
    }
  }
}

function startsWithDigit(n: Node): boolean {
  switch (n.t) {
    case 'num':
      return true;
    case 'mul':
    case 'div':
    case 'pow':
      return startsWithDigit(n.a);
    default:
      return false;
  }
}

/** Safe preview: returns LaTeX or null with an error message. */
export function previewLatex(
  src: string,
  mode: 'expr' | 'equation' | 'point' = 'expr',
): { latex: string | null; error: string | null } {
  if (!src.trim()) return { latex: null, error: null };
  try {
    if (mode === 'equation') {
      const eq = parseEquation(src);
      return { latex: `${toLatex(eq.lhs)} = ${toLatex(eq.rhs)}`, error: null };
    }
    if (mode === 'point') {
      const pts = splitPoint(src);
      if (!pts) return { latex: null, error: 'Write a point as (x, y).' };
      return { latex: `\\left(${toLatex(parseExpr(pts[0]))},\\ ${toLatex(parseExpr(pts[1]))}\\right)`, error: null };
    }
    return { latex: toLatex(parseExpr(src)), error: null };
  } catch (e) {
    return { latex: null, error: e instanceof ParseError ? e.message : 'We could not read that.' };
  }
}
