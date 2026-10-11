/** Helpers for writing question generators concisely and consistently. */
import { Rng, mixSeed } from '../rng.ts';
import type { AnswerSpec, Choice, Difficulty, Figure, Item, Part, SkillDef } from '../types.ts';
import { fmt, fracLatex, toFrac } from '../math/numbers.ts';

export type GenOutput = {
  prompt: string;
  parts: Part[];
  hints: string[];
  solution: string[];
  figure?: Figure;
  calculator?: boolean;
  answerDisplay?: string;
};

export type Gen = (rng: Rng, difficulty: Difficulty) => GenOutput;

export interface SkillInput {
  id: string;
  name: string;
  description: string;
  outcomes: string[];
  lessonId: string;
  format?: 'mc' | 'free';
  calculator?: boolean;
  gen: Gen;
}

export function skill(input: SkillInput): SkillDef {
  const { gen, ...meta } = input;
  return {
    ...meta,
    format: input.format ?? 'free',
    generate(seed: number, difficulty: Difficulty): Item {
      const rng = new Rng(mixSeed(input.id, seed, difficulty));
      const out = gen(rng, difficulty);
      return {
        id: `${input.id}:${seed}:${difficulty}`,
        skillId: input.id,
        difficulty,
        calculator: out.calculator ?? input.calculator,
        ...out,
      };
    },
  };
}

const IDS = 'abcdefghij';

/**
 * Multiple choice from a correct answer and distractors (Markdown strings).
 * Duplicates (after normalisation) are removed; choices are shuffled deterministically.
 */
export function mc(rng: Rng, correct: string, distractors: string[], opts: { keepOrder?: boolean; max?: number } = {}): AnswerSpec {
  const seen = new Set<string>([norm(correct)]);
  const ds: string[] = [];
  for (const d of distractors) {
    const k = norm(d);
    if (seen.has(k)) continue;
    seen.add(k);
    ds.push(d);
    if (ds.length >= (opts.max ?? 4) - 1) break;
  }
  const all = [correct, ...ds];
  const ordered = opts.keepOrder ? all : rng.shuffle(all);
  const choices: Choice[] = ordered.map((md, i) => ({ id: IDS[i], md }));
  return { kind: 'mc', choices, correct: choices[ordered.indexOf(correct)].id };
}

/** Multiple choice where options carry figures. */
export function mcFigures(rng: Rng, options: Array<{ md: string; figure?: Figure; correct?: boolean }>, keepOrder = false): AnswerSpec {
  const ordered = keepOrder ? options : rng.shuffle(options);
  const choices: Choice[] = ordered.map((o, i) => ({ id: IDS[i], md: o.md, figure: o.figure }));
  const idx = ordered.findIndex((o) => o.correct);
  return { kind: 'mc', choices, correct: choices[idx].id, layout: 'grid' };
}

/** Select-all-that-apply. */
export function multi(rng: Rng, options: Array<{ md: string; correct: boolean }>, keepOrder = false): AnswerSpec {
  const ordered = keepOrder ? options : rng.shuffle(options);
  const choices: Choice[] = ordered.map((o, i) => ({ id: IDS[i], md: o.md }));
  return { kind: 'multi', choices, correct: choices.filter((_, i) => ordered[i].correct).map((c) => c.id) };
}

/** Fixed-order choice set (Yes/No, True/False, Function/Not a function ...). */
export function fixedChoice(options: string[], correctIndex: number): AnswerSpec {
  const choices: Choice[] = options.map((md, i) => ({ id: IDS[i], md }));
  return { kind: 'mc', choices, correct: choices[correctIndex].id };
}

function norm(s: string) {
  return s.replace(/\s+/g, '').replace(/\\left|\\right/g, '');
}

export function numeric(value: number, opts: Omit<Extract<AnswerSpec, { kind: 'numeric' }>, 'kind' | 'value'> = {}): AnswerSpec {
  return { kind: 'numeric', value, ...opts };
}

export function part(answer: AnswerSpec, extra: Omit<Part, 'answer'> = {}): Part {
  return { answer, ...extra };
}

/** One numeric part, rounded to `decimals` (or exact when undefined). */
export function numPart(value: number, opts: { decimals?: number; suffix?: string; label?: string; exact?: boolean; tolerance?: number; display?: 'fraction' | 'decimal' } = {}): Part {
  return {
    label: opts.label,
    suffix: opts.suffix,
    answer: {
      kind: 'numeric',
      value,
      decimals: opts.decimals,
      tolerance: opts.tolerance,
      allowExpression: opts.exact ?? opts.decimals === undefined,
      ...(opts.display && { display: opts.display }),
    },
  };
}

/** "to the nearest tenth" style phrase. */
export function roundingPhrase(decimals: number): string {
  return ['to the nearest whole number', 'to the nearest tenth', 'to the nearest hundredth', 'to the nearest thousandth'][decimals] ?? `to ${decimals} decimal places`;
}

/** LaTeX for a number that may be a nice fraction. */
export function niceNum(x: number): string {
  const f = toFrac(x, 100);
  if (f && f.d !== 1) return fracLatex(f);
  return fmt(x);
}

export const unitSq = (u: string) => `\\text{${u}}^2`;
export const unitCu = (u: string) => `\\text{${u}}^3`;

/** Pick a difficulty-scaled range: [easy, medium, hard]. */
export function byDifficulty<T>(d: Difficulty, easy: T, medium: T, hard: T): T {
  return d === 1 ? easy : d === 2 ? medium : hard;
}

/** Ensure a value is not one of the excluded values by regenerating. */
export function retry<T>(make: () => T, okay: (v: T) => boolean, tries = 50): T {
  let v = make();
  for (let i = 0; i < tries && !okay(v); i++) v = make();
  return v;
}

/** Format a coordinate pair in LaTeX. */
export function pt(x: number | string, y: number | string): string {
  return `(${typeof x === 'number' ? fmt(x) : x},\\ ${typeof y === 'number' ? fmt(y) : y})`;
}

/** Format a coordinate pair as a student would type it. */
export function ptText(x: number, y: number): string {
  return `(${fmt(x)}, ${fmt(y)})`;
}
