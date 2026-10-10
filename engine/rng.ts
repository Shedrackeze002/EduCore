/**
 * Deterministic pseudo-random number generation.
 *
 * Every generated question is reproducible from (skillId, seed, difficulty), so the
 * server can regenerate exactly what a student saw and grade it authoritatively.
 */

export function hashString(input: string): number {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function mixSeed(...parts: Array<string | number>): number {
  return hashString(parts.join('|'));
}

export class Rng {
  private state: number;

  constructor(seed: number | string) {
    this.state = (typeof seed === 'string' ? hashString(seed) : seed >>> 0) || 0x9e3779b9;
  }

  /** Uniform float in [0, 1). Mulberry32. */
  next(): number {
    let t = (this.state = (this.state + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Integer in [min, max] inclusive. */
  int(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min + 1));
  }

  /** Non-zero integer in [min, max]. */
  nonZero(min: number, max: number): number {
    let v = 0;
    let guard = 0;
    while (v === 0 && guard++ < 100) v = this.int(min, max);
    return v === 0 ? 1 : v;
  }

  /** Integer in [min, max] excluding the given values. */
  intExcept(min: number, max: number, exclude: number[]): number {
    for (let i = 0; i < 200; i++) {
      const v = this.int(min, max);
      if (!exclude.includes(v)) return v;
    }
    return min;
  }

  /** Float in [min, max) rounded to the given number of decimals. */
  float(min: number, max: number, decimals = 1): number {
    const f = 10 ** decimals;
    return Math.round((min + this.next() * (max - min)) * f) / f;
  }

  chance(p: number): boolean {
    return this.next() < p;
  }

  sign(): 1 | -1 {
    return this.next() < 0.5 ? -1 : 1;
  }

  pick<T>(items: readonly T[]): T {
    return items[Math.floor(this.next() * items.length)];
  }

  /** Pick n distinct items. */
  sample<T>(items: readonly T[], n: number): T[] {
    return this.shuffle(items).slice(0, n);
  }

  shuffle<T>(items: readonly T[]): T[] {
    const out = items.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  /** Weighted pick: weights need not sum to 1. */
  weighted<T>(entries: ReadonlyArray<readonly [T, number]>): T {
    const total = entries.reduce((s, [, w]) => s + w, 0);
    let r = this.next() * total;
    for (const [v, w] of entries) {
      r -= w;
      if (r <= 0) return v;
    }
    return entries[entries.length - 1][0];
  }

  /** Derive an independent child generator. */
  fork(label: string | number): Rng {
    return new Rng(mixSeed(this.int(0, 2 ** 31), label));
  }
}

/** Random 31-bit seed for new attempts (not deterministic; only used to create seeds). */
export function freshSeed(): number {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0] >>> 1;
  }
  return Math.floor(Math.random() * 2 ** 31);
}
