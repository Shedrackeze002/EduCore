/** Unit 3 — Factors, Roots and Powers (A1, A2, A3). */
import { byDifficulty, fixedChoice, mc, multi, numPart, part, skill } from '../../helpers.ts';
import {
  type Frac,
  frac,
  fracAdd,
  fracLatex,
  fracMul,
  fracText,
  fmt,
  fmtFixed,
  gcd,
  gcdAll,
  isPerfectCube,
  isPerfectSquare,
  lcm,
  lcmAll,
  primeFactorLatex,
  primeFactorMap,
} from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Choice, SkillDef } from '../../../types.ts';

function productOfPrimes(rng: Rng, count: number, primes = [2, 2, 2, 3, 3, 5, 7]): number {
  let n = 1;
  for (let i = 0; i < count; i++) n *= rng.pick(primes);
  return n;
}

function factorText(n: number): string {
  return [...primeFactorMap(n)].map(([p, e]) => (e === 1 ? `${p}` : `${p}^${e}`)).join('*');
}

function factorTree(n: number): string[] {
  const steps: string[] = [];
  let m = n;
  const list: number[] = [];
  for (let p = 2; m > 1 && p <= m; p++) {
    while (m % p === 0) {
      steps.push(`$${m} = ${p} \\times ${m / p}$`);
      list.push(p);
      m /= p;
    }
  }
  return steps;
}

// ---------------------------------------------------------------------------
// A1
// ---------------------------------------------------------------------------

const primeFactorization = skill({
  id: 'a1-prime-factorization',
  name: 'Prime factorization',
  description: 'Write the prime factorization of a whole number, and explain why 0 and 1 have no prime factors.',
  outcomes: ['A1'],
  lessonId: 'm10c-3-1',
  gen(rng, d) {
    if (d === 1 && rng.chance(0.2)) {
      const n = rng.pick([0, 1]);
      return {
        prompt: `Why does the number $${n}$ have no prime factors?`,
        parts: [
          {
            answer: mc(
              rng,
              n === 1 ? '1 is not prime, and it cannot be written as a product of prime numbers.' : '0 is a multiple of every number, so it cannot be written as a unique product of primes; and 0 is not prime.',
              n === 1
                ? ['1 is a prime number, so it is its own factor.', '1 is an even number.', '1 has two factors: 1 and itself.']
                : ['0 is a prime number.', '0 has exactly two factors.', '0 is an odd number.'],
            ),
          },
        ],
        hints: ['A prime number has exactly two distinct factors: 1 and itself.'],
        solution: [n === 1 ? '1 has only one factor (itself), so it is not prime, and no product of primes equals 1.' : '0 times any number is 0, so 0 has infinitely many factors and no prime factorization.'],
      };
    }
    const n = byDifficulty(d, productOfPrimes(rng, rng.int(3, 4)), productOfPrimes(rng, rng.int(4, 6)), productOfPrimes(rng, rng.int(5, 7), [2, 2, 3, 3, 5, 7, 11, 13]));
    return {
      prompt: `Write the prime factorization of $${n}$. Use exponents for repeated factors, for example $2^3 \\times 5$ (type it as 2^3*5).`,
      parts: [part({ kind: 'expression', expected: factorText(n), form: 'prime-factorization' }, { placeholder: 'e.g. 2^3*5' })],
      hints: ['Divide by the smallest prime that works (2, 3, 5, 7, ...), and keep dividing the quotient.', 'Stop when the quotient is 1. Every divisor you used is a prime factor.'],
      solution: [...factorTree(n), `$${n} = ${primeFactorLatex(n)}$`],
      answerDisplay: `$${primeFactorLatex(n)}$`,
    };
  },
});

function gcfSet(rng: Rng, count: number, d: number): number[] {
  for (let tries = 0; tries < 100; tries++) {
    const g = byDifficulty(d as 1 | 2 | 3, rng.pick([2, 3, 4, 5, 6, 8, 9, 10, 12]), rng.pick([6, 8, 12, 14, 15, 18, 21, 24]), rng.pick([12, 16, 18, 24, 28, 36, 45]));
    const cof = rng.sample([2, 3, 4, 5, 7, 9, 11, 13], count);
    if (gcdAll(cof) !== 1) continue;
    const nums = cof.map((c) => c * g);
    if (new Set(nums).size === count) return nums.sort((a, b) => a - b);
  }
  return [12, 18];
}

const gcf = skill({
  id: 'a1-gcf',
  name: 'Greatest common factor',
  description: 'Determine the GCF of a set of whole numbers using prime factors or listing.',
  outcomes: ['A1'],
  lessonId: 'm10c-3-1',
  gen(rng, d) {
    const nums = gcfSet(rng, d === 1 ? 2 : 3, d);
    const g = gcdAll(nums);
    return {
      prompt: `Determine the greatest common factor of $${nums.join('$, $')}$.`,
      parts: [numPart(g, { exact: false })],
      hints: ['Write each number as a product of primes.', 'The GCF is the product of the prime factors common to every number (use the lowest power of each).'],
      solution: [...nums.map((n) => `$${n} = ${primeFactorLatex(n)}$`), `Common prime factors (lowest powers): $${g === 1 ? '1' : primeFactorLatex(g)}$`, `$\\text{GCF} = ${g}$`],
    };
  },
});

const lcmSkill = skill({
  id: 'a1-lcm',
  name: 'Least common multiple',
  description: 'Determine the LCM of a set of whole numbers using prime factors or listing multiples.',
  outcomes: ['A1'],
  lessonId: 'm10c-3-1',
  gen(rng, d) {
    let nums: number[] = [];
    for (let i = 0; i < 50; i++) {
      nums = byDifficulty(
        d,
        rng.sample([4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20], 2),
        rng.sample([12, 15, 18, 20, 24, 28, 30, 36, 40, 42], 2),
        rng.sample([6, 8, 9, 10, 12, 14, 15, 18, 20, 21, 24, 27], 3),
      ).sort((a, b) => a - b);
      const l = lcmAll(nums);
      if (l !== nums[nums.length - 1] && l <= 2000) break;
    }
    const l = lcmAll(nums);
    return {
      prompt: `Determine the least common multiple of $${nums.join('$, $')}$.`,
      parts: [numPart(l, { exact: false })],
      hints: ['Write each number as a product of primes.', 'The LCM uses every prime that appears, raised to its highest power.'],
      solution: [...nums.map((n) => `$${n} = ${primeFactorLatex(n)}$`), `Highest power of each prime: $${primeFactorLatex(l)}$`, `$\\text{LCM} = ${l}$`],
    };
  },
});

const gcfLcmProblems = skill({
  id: 'a1-gcf-lcm-problems',
  name: 'GCF and LCM problems',
  description: 'Decide whether a problem calls for the GCF or the LCM and solve it.',
  outcomes: ['A1'],
  lessonId: 'm10c-3-1',
  gen(rng, d) {
    const kind = rng.pick(d === 1 ? (['tiles', 'buses'] as const) : (['tiles', 'buses', 'bags', 'cube', 'lights'] as const));
    switch (kind) {
      case 'tiles': {
        const [a, b] = gcfSet(rng, 2, 2);
        const g = gcd(a, b);
        return {
          prompt: `A rectangular floor measures $${a}$ cm by $${b}$ cm. What is the side length of the largest square tile that can cover the floor exactly, with no cutting?`,
          parts: [numPart(g, { suffix: 'cm', exact: false })],
          hints: ['The side length must divide both dimensions exactly.', 'You want the largest such number: GCF or LCM?'],
          solution: [`The tile side must be a common factor of $${a}$ and $${b}$; the largest is the GCF.`, `$\\text{GCF}(${a}, ${b}) = ${g}$, so the tiles are $${g}$ cm by $${g}$ cm.`],
        };
      }
      case 'buses': {
        const a = rng.pick([8, 10, 12, 15, 18, 20]);
        let b = rng.pick([12, 14, 16, 20, 24, 25, 30]);
        if (b === a) b += 6;
        const l = lcm(a, b);
        return {
          prompt: `Route A buses leave the terminal every $${a}$ minutes and Route B buses every $${b}$ minutes. Both leave together at 7:00 a.m. After how many minutes will they next leave together?`,
          parts: [numPart(l, { suffix: 'min', exact: false })],
          hints: ['They leave together at times that are multiples of both intervals.', 'You want the first such time: GCF or LCM?'],
          solution: [`Common departure times are common multiples of $${a}$ and $${b}$; the first is the LCM.`, `$\\text{LCM}(${a}, ${b}) = ${l}$ minutes.`],
        };
      }
      case 'bags': {
        const [a, b] = gcfSet(rng, 2, 1);
        const g = gcd(a, b);
        return {
          prompt: `A teacher has $${a}$ pencils and $${b}$ erasers. She wants to make identical supply bags with no items left over. What is the greatest number of bags she can make?`,
          parts: [numPart(g, { suffix: 'bags', exact: false })],
          hints: ['The number of bags must divide both amounts.'],
          solution: [`$\\text{GCF}(${a}, ${b}) = ${g}$, so she can make $${g}$ bags (each with $${a / g}$ pencils and $${b / g}$ erasers).`],
        };
      }
      case 'cube': {
        const dims = rng.sample([2, 3, 4, 5, 6, 8, 9, 10], 3).sort((x, y) => x - y);
        const l = lcmAll(dims);
        return {
          prompt: `Bricks measure $${dims[0]}$ cm by $${dims[1]}$ cm by $${dims[2]}$ cm. What is the side length of the smallest solid cube that can be built from these bricks, all placed in the same orientation?`,
          parts: [numPart(l, { suffix: 'cm', exact: false })],
          hints: ['The side length must be a multiple of every brick dimension.'],
          solution: [`The cube’s side must be a common multiple of $${dims.join(', ')}$. The smallest is $\\text{LCM} = ${l}$ cm.`],
        };
      }
      default: {
        const a = rng.pick([4, 6, 8, 9]);
        const b = rng.pick([10, 12, 15]);
        const c = rng.pick([14, 18, 20]);
        const l = lcmAll([a, b, c]);
        return {
          prompt: `Three lights flash every $${a}$, $${b}$ and $${c}$ seconds. They flash together at time $0$. After how many seconds do all three next flash together?`,
          parts: [numPart(l, { suffix: 's', exact: false })],
          hints: ['Find the first common multiple of all three intervals.'],
          solution: [`$\\text{LCM}(${a}, ${b}, ${c}) = ${l}$ seconds.`],
        };
      }
    }
  },
});

const squareCubeClassify = skill({
  id: 'a1-square-cube-classify',
  name: 'Perfect squares and perfect cubes',
  description: 'Use prime factorization to decide whether a number is a perfect square, a perfect cube, both, or neither.',
  outcomes: ['A1'],
  lessonId: 'm10c-3-2',
  format: 'mc',
  gen(rng, d) {
    const type = rng.pick(['square', 'cube', 'both', 'neither'] as const);
    let n = 0;
    const base = byDifficulty(d, rng.int(4, 15), rng.int(11, 40), rng.int(20, 60));
    switch (type) {
      case 'square':
        do n = (base + rng.int(0, 5)) ** 2;
        while (isPerfectCube(n));
        break;
      case 'cube':
        do n = rng.int(3, d === 3 ? 22 : 12) ** 3;
        while (isPerfectSquare(n));
        break;
      case 'both':
        n = rng.pick(d === 1 ? [64, 729] : [64, 729, 4096, 15625, 46656]);
        break;
      default:
        do n = rng.int(30, d === 3 ? 5000 : 900);
        while (isPerfectSquare(n) || isPerfectCube(n));
    }
    const idx = { square: 0, cube: 1, both: 2, neither: 3 }[type];
    const pf = primeFactorLatex(n);
    return {
      prompt: `Is $${n}$ a perfect square, a perfect cube, both, or neither?`,
      parts: [{ answer: fixedChoice(['Perfect square only', 'Perfect cube only', 'Both a perfect square and a perfect cube', 'Neither'], idx) }],
      hints: ['Write the prime factorization.', 'A perfect square has every exponent divisible by 2; a perfect cube has every exponent divisible by 3.'],
      solution: [`$${n} = ${pf}$`, type === 'neither' ? 'Not every exponent is a multiple of 2, and not every exponent is a multiple of 3, so it is neither.' : type === 'both' ? 'Every exponent is a multiple of 6, so it is both a perfect square and a perfect cube.' : type === 'square' ? `Every exponent is even, so ${n} is a perfect square ($${Math.round(Math.sqrt(n))}^2$), but not every exponent is a multiple of 3.` : `Every exponent is a multiple of 3, so ${n} is a perfect cube ($${Math.round(Math.cbrt(n))}^3$), but not every exponent is even.`],
    };
  },
});

const sqrtCbrt = skill({
  id: 'a1-sqrt-cbrt',
  name: 'Square roots and cube roots',
  description: 'Find square roots of perfect squares and cube roots of perfect cubes using prime factorization.',
  outcomes: ['A1'],
  lessonId: 'm10c-3-2',
  gen(rng, d) {
    const cube = d === 1 ? false : rng.chance(0.5);
    const r = cube ? byDifficulty(d, rng.int(2, 6), rng.int(4, 14), rng.int(12, 30)) : byDifficulty(d, rng.int(4, 20), rng.int(15, 60), rng.int(40, 99));
    const n = cube ? r ** 3 : r * r;
    const neg = cube && d === 3 && rng.chance(0.4);
    const val = neg ? -r : r;
    const sym = cube ? '\\sqrt[3]' : '\\sqrt';
    const map = primeFactorMap(n);
    const k = cube ? 3 : 2;
    return {
      prompt: `Evaluate $${sym}{${neg ? '-' : ''}${n}}$ without a calculator.`,
      parts: [numPart(val, { exact: false })],
      hints: ['Write the number as a product of primes.', `Group the prime factors into ${cube ? 'three' : 'two'} identical groups. One group is the root.`],
      solution: [
        `$${n} = ${primeFactorLatex(n)}$`,
        `Split into ${cube ? 'three' : 'two'} equal groups: each group is $${[...map].map(([p, e]) => (e / k === 1 ? `${p}` : `${p}^{${e / k}}`)).join(' \\times ')} = ${r}$`,
        `$${sym}{${neg ? '-' : ''}${n}} = ${val}$${neg ? ' (the cube root of a negative number is negative)' : ''}`,
      ],
    };
  },
});

const rootsProblems = skill({
  id: 'a1-roots-problems',
  name: 'Problems with squares, cubes and roots',
  description: 'Solve problems involving areas of squares and volumes or surface areas of cubes.',
  outcomes: ['A1'],
  lessonId: 'm10c-3-2',
  gen(rng, d) {
    const kind = byDifficulty(d, rng.pick(['area', 'volume'] as const), rng.pick(['volume', 'sa'] as const), rng.pick(['sa', 'perimeter'] as const));
    const s = rng.int(4, 30);
    switch (kind) {
      case 'area':
        return {
          prompt: `A square garden has an area of $${s * s}\\ \\text{m}^2$. What is its side length?`,
          parts: [numPart(s, { suffix: 'm', exact: false })],
          hints: ['Area of a square $= s^2$, so $s = \\sqrt{A}$.'],
          solution: [`$s = \\sqrt{${s * s}} = ${s}\\ \\text{m}$`],
        };
      case 'volume':
        return {
          prompt: `A cube-shaped box has a volume of $${s ** 3}\\ \\text{cm}^3$. What is the length of each edge?`,
          parts: [numPart(s, { suffix: 'cm', exact: false })],
          hints: ['Volume of a cube $= s^3$, so $s = \\sqrt[3]{V}$.'],
          solution: [`$s = \\sqrt[3]{${s ** 3}} = ${s}\\ \\text{cm}$`],
        };
      case 'sa':
        return {
          prompt: `The surface area of a cube is $${6 * s * s}\\ \\text{cm}^2$. What is its volume?`,
          parts: [numPart(s ** 3, { suffix: 'cm³', exact: false })],
          hints: ['A cube has 6 congruent square faces. Find the area of one face first.', 'Then find the edge length, then the volume.'],
          solution: [`One face: $${6 * s * s} \\div 6 = ${s * s}\\ \\text{cm}^2$`, `Edge: $\\sqrt{${s * s}} = ${s}\\ \\text{cm}$`, `Volume: $${s}^3 = ${s ** 3}\\ \\text{cm}^3$`],
        };
      default:
        return {
          prompt: `A square has an area of $${s * s}\\ \\text{cm}^2$. What is its perimeter?`,
          parts: [numPart(4 * s, { suffix: 'cm', exact: false })],
          hints: ['Find the side length first.'],
          solution: [`$s = \\sqrt{${s * s}} = ${s}$`, `$P = 4s = ${4 * s}\\ \\text{cm}$`],
        };
    }
  },
});

// ---------------------------------------------------------------------------
// A2
// ---------------------------------------------------------------------------

interface NumCase {
  md: string;
  value: number;
  sets: Array<'N' | 'W' | 'I' | 'Q' | 'Qbar'>;
}

function numberCases(rng: Rng): NumCase[] {
  const sq = rng.int(2, 12);
  const nonSq = rng.pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 17, 20]);
  const cb = rng.int(2, 5);
  const nonCb = rng.pick([2, 3, 4, 5, 6, 7, 9, 10, 12]);
  const p = rng.int(1, 9);
  const q = rng.pick([2, 3, 4, 5, 7, 9, 11]);
  return [
    { md: `$\\sqrt{${sq * sq}}$`, value: sq, sets: ['N', 'W', 'I', 'Q'] },
    { md: `$\\sqrt{${nonSq}}$`, value: Math.sqrt(nonSq), sets: ['Qbar'] },
    { md: `$\\sqrt[3]{${cb ** 3}}$`, value: cb, sets: ['N', 'W', 'I', 'Q'] },
    { md: `$\\sqrt[3]{-${cb ** 3}}$`, value: -cb, sets: ['I', 'Q'] },
    { md: `$\\sqrt[3]{${nonCb}}$`, value: Math.cbrt(nonCb), sets: ['Qbar'] },
    { md: '$\\pi$', value: Math.PI, sets: ['Qbar'] },
    { md: `$\\dfrac{${p}}{${q}}$`, value: p / q, sets: gcd(p, q) === q ? ['N', 'W', 'I', 'Q'] : ['Q'] },
    { md: `$-${p}$`, value: -p, sets: ['I', 'Q'] },
    { md: '$0$', value: 0, sets: ['W', 'I', 'Q'] },
    { md: `$0.${p}${p}${p}\\ldots$ (repeating)`, value: p / 9, sets: ['Q'] },
    { md: `$${p}.${q}5$`, value: Number(`${p}.${q}5`), sets: ['Q'] },
    { md: '$0.1010010001\\ldots$ (pattern never repeats)', value: 0.101001, sets: ['Qbar'] },
    { md: `$\\sqrt{\\dfrac{${sq * sq}}{${(sq + 1) ** 2}}}$`, value: sq / (sq + 1), sets: ['Q'] },
    { md: `$-\\sqrt{${nonSq}}$`, value: -Math.sqrt(nonSq), sets: ['Qbar'] },
  ];
}

const classify = skill({
  id: 'a2-classify',
  name: 'Rational or irrational?',
  description: 'Classify numbers as rational or irrational and justify the classification.',
  outcomes: ['A2'],
  lessonId: 'm10c-3-3',
  format: 'mc',
  gen(rng, d) {
    const cases = numberCases(rng);
    if (d === 1) {
      const c = rng.pick(cases);
      const irr = c.sets.includes('Qbar');
      return {
        prompt: `Is ${c.md} rational or irrational?`,
        parts: [{ answer: fixedChoice(['Rational', 'Irrational'], irr ? 1 : 0) }],
        hints: ['A rational number can be written as a fraction of two integers; its decimal terminates or repeats.', 'The square root of a number that is not a perfect square is irrational.'],
        solution: [irr ? `${c.md} cannot be written as a fraction of integers; its decimal never terminates or repeats. It is irrational.` : `${c.md} can be written as a fraction of integers, so it is rational.`],
      };
    }
    const chosen = rng.sample(cases, d === 2 ? 5 : 6);
    if (!chosen.some((c) => c.sets.includes('Qbar'))) chosen[0] = cases[1];
    return {
      prompt: 'Select **all** of the irrational numbers.',
      parts: [{ answer: multi(rng, chosen.map((c) => ({ md: c.md, correct: c.sets.includes('Qbar') }))) }],
      hints: ['Check each number: can it be written as $\\dfrac{a}{b}$ with integers $a$ and $b \\ne 0$?', 'Simplify roots first: $\\sqrt{49} = 7$ is rational.'],
      solution: chosen.map((c) => `${c.md}: ${c.sets.includes('Qbar') ? 'irrational' : 'rational'}`),
    };
  },
});

const SET_NAMES: Record<string, string> = {
  N: 'Natural numbers $\\mathbb{N}$',
  W: 'Whole numbers $\\mathbb{W}$',
  I: 'Integers $\\mathbb{I}$',
  Q: 'Rational numbers $\\mathbb{Q}$',
  Qbar: 'Irrational numbers $\\overline{\\mathbb{Q}}$',
};

const numberSets = skill({
  id: 'a2-number-sets',
  name: 'The real number system',
  description: 'Identify every subset of the real numbers to which a number belongs.',
  outcomes: ['A2'],
  lessonId: 'm10c-3-3',
  format: 'mc',
  gen(rng, d) {
    const cases = numberCases(rng);
    const c = d === 1 ? rng.pick([cases[0], cases[7], cases[6], cases[1]]) : rng.pick(cases);
    const keys = ['N', 'W', 'I', 'Q', 'Qbar'];
    return {
      prompt: `Select **every** set that ${c.md} belongs to. (Every option is a subset of the real numbers.)`,
      parts: [{ answer: multi(rng, keys.map((k) => ({ md: SET_NAMES[k], correct: c.sets.includes(k as NumCase['sets'][number]) })), true) }],
      hints: ['$\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$, $\\mathbb{W} = \\{0, 1, 2, \\ldots\\}$, $\\mathbb{I} = \\{\\ldots, -1, 0, 1, \\ldots\\}$.', 'Every integer is rational. A number is either rational or irrational, never both.'],
      solution: [`${c.md}${Number.isInteger(c.value) ? ` $= ${c.value}$` : ''} belongs to: ${c.sets.map((s) => SET_NAMES[s]).join(', ')}, and the real numbers $\\mathbb{R}$.`],
    };
  },
});

const indexSkill = skill({
  id: 'a2-index',
  name: 'Index of a radical',
  description: 'Explain and use the index of a radical, including odd and even indices.',
  outcomes: ['A2'],
  lessonId: 'm10c-3-3',
  gen(rng, d) {
    if (d === 3 && rng.chance(0.5)) {
      const n = rng.pick([2, 4, 6]);
      const a = rng.pick([16, 64, 81]);
      return {
        prompt: `Why is $${n === 2 ? `\\sqrt{-${a}}` : `\\sqrt[${n}]{-${a}}`}$ not a real number, while $\\sqrt[3]{-${a === 81 ? 27 : 64}}$ is?`,
        parts: [{ answer: mc(rng, 'No real number raised to an even power is negative, but a negative number raised to an odd power is negative.', ['Negative numbers never have roots.', 'The index must always be 2.', 'Cube roots can only be taken of perfect cubes.']) }],
        hints: ['Try squaring a positive and a negative number. Can the result be negative?'],
        solution: ['Any real number to an even power is positive (or zero), so an even root of a negative number is not real.', `Odd powers keep the sign: $(-${a === 81 ? 3 : 4})^3 = -${a === 81 ? 27 : 64}$, so $\\sqrt[3]{-${a === 81 ? 27 : 64}} = -${a === 81 ? 3 : 4}$.`],
      };
    }
    const k = byDifficulty(d, rng.pick([3, 4]), rng.pick([3, 4, 5]), rng.pick([4, 5, 6]));
    const b = byDifficulty(d, rng.int(2, 4), rng.int(2, 5), rng.int(2, 3));
    const neg = k % 2 === 1 && rng.chance(0.5);
    const n = b ** k;
    return {
      prompt: `Evaluate $\\sqrt[${k}]{${neg ? '-' : ''}${n}}$.`,
      parts: [numPart(neg ? -b : b, { exact: false })],
      hints: [`The index ${k} asks: which number, used as a factor ${k} times, gives ${neg ? '-' : ''}${n}?`],
      solution: [`$(${neg ? '-' : ''}${b})^{${k}} = ${neg ? '-' : ''}${n}$`, `So $\\sqrt[${k}]{${neg ? '-' : ''}${n}} = ${neg ? '-' : ''}${b}$.`],
    };
  },
});

const approximate = skill({
  id: 'a2-approximate',
  name: 'Approximating irrational numbers',
  description: 'Locate and approximate square roots and cube roots using benchmarks.',
  outcomes: ['A2'],
  lessonId: 'm10c-3-3',
  gen(rng, d) {
    const cube = d === 3;
    let n = 0;
    do n = cube ? rng.int(10, 900) : rng.int(5, 300);
    while (cube ? isPerfectCube(n) : isPerfectSquare(n));
    const v = cube ? Math.cbrt(n) : Math.sqrt(n);
    const lo = Math.floor(v);
    const sym = cube ? '\\sqrt[3]' : '\\sqrt';
    if (d === 1 || cube) {
      return {
        prompt: `$${sym}{${n}}$ lies between which two consecutive whole numbers?`,
        parts: [numPart(lo, { label: 'Between', exact: false }), numPart(lo + 1, { label: 'and', exact: false })],
        hints: [`List perfect ${cube ? 'cubes' : 'squares'} near ${n}.`],
        solution: [`$${lo}^${cube ? 3 : 2} = ${lo ** (cube ? 3 : 2)}$ and $${lo + 1}^${cube ? 3 : 2} = ${(lo + 1) ** (cube ? 3 : 2)}$`, `$${lo ** (cube ? 3 : 2)} < ${n} < ${(lo + 1) ** (cube ? 3 : 2)}$, so $${lo} < ${sym}{${n}} < ${lo + 1}$.`],
      };
    }
    return {
      prompt: `Estimate $\\sqrt{${n}}$ to the nearest tenth. (Use benchmarks, then check with a calculator.)`,
      parts: [numPart(v, { decimals: 1 })],
      hints: [`$${lo}^2 = ${lo * lo}$ and $${lo + 1}^2 = ${(lo + 1) ** 2}$.`, `${n} is ${n - lo * lo} of the ${(lo + 1) ** 2 - lo * lo} steps from ${lo * lo} to ${(lo + 1) ** 2}.`],
      solution: [`$\\sqrt{${n}}$ is between $${lo}$ and $${lo + 1}$, about $\\dfrac{${n - lo * lo}}{${2 * lo + 1}}$ of the way.`, `$\\sqrt{${n}} \\approx ${fmtFixed(v, 1)}$`],
      calculator: true,
    };
  },
});

const order = skill({
  id: 'a2-order',
  name: 'Ordering real numbers',
  description: 'Order a set of irrational and rational numbers from least to greatest.',
  outcomes: ['A2'],
  lessonId: 'm10c-3-3',
  gen(rng, d) {
    for (let tries = 0; tries < 100; tries++) {
      const pool: Array<{ md: string; v: number }> = [];
      const a = rng.int(5, 60);
      pool.push({ md: `$\\sqrt{${a}}$`, v: Math.sqrt(a) });
      const b = rng.int(10, 200);
      pool.push({ md: `$\\sqrt[3]{${b}}$`, v: Math.cbrt(b) });
      const c = rng.int(20, 80) / 10;
      pool.push({ md: `$${fmt(c)}$`, v: c });
      const p = rng.int(5, 30);
      const q = rng.pick([2, 3, 4, 5]);
      pool.push({ md: `$\\dfrac{${p}}{${q}}$`, v: p / q });
      if (d >= 2) {
        const m = rng.int(2, 4);
        const r = rng.pick([2, 3, 5, 6, 7]);
        pool.push({ md: `$${m}\\sqrt{${r}}$`, v: m * Math.sqrt(r) });
      }
      if (d === 3) {
        const m = rng.int(2, 3);
        const r = rng.pick([2, 3, 4, 5]);
        pool.push({ md: `$${m}\\sqrt[3]{${r}}$`, v: m * Math.cbrt(r) });
        pool.push({ md: '$\\pi$', v: Math.PI });
      }
      const items = rng.sample(pool, d === 1 ? 4 : 5);
      const sorted = [...items].sort((x, y) => x.v - y.v);
      if (sorted.some((x, i) => i > 0 && x.v - sorted[i - 1].v < 0.08)) continue;
      const choices: Choice[] = items.map((x, i) => ({ id: 'abcdefg'[i], md: x.md }));
      const idOf = (x: { md: string }) => choices[items.indexOf(x as (typeof items)[number])].id;
      return {
        prompt: 'Arrange the numbers from **least to greatest**.',
        parts: [{ answer: { kind: 'order', items: choices, correctOrder: sorted.map(idOf) } }],
        hints: ['Convert each number to an approximate decimal.', 'For mixed radicals, rewrite them as entire radicals or use a calculator.'],
        solution: [...items.map((x) => `${x.md} $\\approx ${fmt(x.v, 2)}$`), `Order: ${sorted.map((x) => x.md).join(', ')}`],
        calculator: true,
      };
    }
    throw new Error('order generator failed');
  },
});

const mixedRadical = skill({
  id: 'a2-mixed-radical',
  name: 'Entire radicals to mixed radicals',
  description: 'Express a radical as a mixed radical in simplest form.',
  outcomes: ['A2'],
  lessonId: 'm10c-3-4',
  gen(rng, d) {
    const cube = d === 3 && rng.chance(0.5);
    const k = cube ? 3 : 2;
    const inside = rng.pick(cube ? [2, 3, 4, 5, 6, 7] : [2, 3, 5, 6, 7, 10, 11, 13, 14, 15]);
    const out = byDifficulty(d, rng.int(2, 5), rng.int(3, 10), cube ? rng.int(2, 5) : rng.int(4, 12));
    const coef = d === 3 && !cube && rng.chance(0.5) ? rng.int(2, 5) : 1;
    const n = out ** k * inside;
    const sym = cube ? '\\sqrt[3]' : '\\sqrt';
    const fn = cube ? 'cbrt' : 'sqrt';
    const total = coef * out;
    const largest = out ** k;
    return {
      prompt: `Write $${coef > 1 ? coef : ''}${sym}{${n}}$ as a mixed radical in simplest form.`,
      parts: [part({ kind: 'expression', expected: `${total}${fn}(${inside})`, form: 'simplified-radical', radicalIndex: k }, { placeholder: `e.g. 3√2` })],
      hints: [`Find the largest perfect ${cube ? 'cube' : 'square'} factor of ${n}.`, `Write $${n} = ${largest} \\times ${inside}$ and take the ${cube ? 'cube' : 'square'} root of ${largest}.`],
      solution: [
        `$${sym}{${n}} = ${sym}{${largest} \\times ${inside}} = ${sym}{${largest}} \\times ${sym}{${inside}} = ${out}${sym}{${inside}}$`,
        ...(coef > 1 ? [`$${coef} \\times ${out}${sym}{${inside}} = ${total}${sym}{${inside}}$`] : []),
      ],
      answerDisplay: `$${total}${sym}{${inside}}$`,
    };
  },
});

const entireRadical = skill({
  id: 'a2-entire-radical',
  name: 'Mixed radicals to entire radicals',
  description: 'Express a mixed radical as an entire radical, and use this to compare radicals.',
  outcomes: ['A2'],
  lessonId: 'm10c-3-4',
  gen(rng, d) {
    if (d === 3 && rng.chance(0.5)) {
      for (let i = 0; i < 50; i++) {
        const a = rng.int(2, 6);
        const b = rng.pick([2, 3, 5, 6, 7, 10]);
        const c = rng.int(2, 6);
        const e = rng.pick([2, 3, 5, 6, 7, 10, 11]);
        const v1 = a * a * b;
        const v2 = c * c * e;
        if (v1 === v2 || (a === c && b === e)) continue;
        const first = v1 > v2;
        return {
          prompt: `Which is greater: $${a}\\sqrt{${b}}$ or $${c}\\sqrt{${e}}$?`,
          parts: [{ answer: fixedChoice([`$${a}\\sqrt{${b}}$`, `$${c}\\sqrt{${e}}$`], first ? 0 : 1) }],
          hints: ['Write each as an entire radical and compare the radicands.'],
          solution: [`$${a}\\sqrt{${b}} = \\sqrt{${a * a} \\times ${b}} = \\sqrt{${v1}}$`, `$${c}\\sqrt{${e}} = \\sqrt{${c * c} \\times ${e}} = \\sqrt{${v2}}$`, `Since $${Math.max(v1, v2)} > ${Math.min(v1, v2)}$, $${first ? `${a}\\sqrt{${b}}` : `${c}\\sqrt{${e}}`}$ is greater.`],
        };
      }
    }
    const cube = d >= 2 && rng.chance(0.4);
    const k = cube ? 3 : 2;
    const a = rng.int(2, cube ? 4 : 9);
    const b = rng.pick([2, 3, 5, 6, 7, 10]);
    const n = a ** k * b;
    const sym = cube ? '\\sqrt[3]' : '\\sqrt';
    return {
      prompt: `Write $${a}${sym}{${b}}$ as an entire radical.`,
      parts: [part({ kind: 'expression', expected: `${cube ? 'cbrt' : 'sqrt'}(${n})`, form: 'entire-radical' }, { placeholder: cube ? 'e.g. ∛54' : 'e.g. √45' })],
      hints: [`Write ${a} as a ${cube ? 'cube' : 'square'} root: $${a} = ${sym}{${a ** k}}$.`, 'Multiply the radicands.'],
      solution: [`$${a} = ${sym}{${a ** k}}$`, `$${a}${sym}{${b}} = ${sym}{${a ** k}} \\times ${sym}{${b}} = ${sym}{${n}}$`],
      answerDisplay: `$${sym}{${n}}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// A3 — exponents
// ---------------------------------------------------------------------------

const negativeZero = skill({
  id: 'a3-negative-zero',
  name: 'Zero and negative exponents',
  description: 'Evaluate powers with zero and negative integral exponents.',
  outcomes: ['A3'],
  lessonId: 'm10c-3-5',
  gen(rng, d) {
    const kind = byDifficulty(d, rng.pick(['neg', 'zero', 'neg'] as const), rng.pick(['fracneg', 'signzero', 'neg'] as const), rng.pick(['sum', 'product', 'fracneg'] as const));
    switch (kind) {
      case 'neg': {
        const b = rng.int(2, 6);
        const n = rng.int(1, b > 3 ? 2 : 4);
        const negBase = d >= 2 && rng.chance(0.4);
        const base = negBase ? -b : b;
        const v = 1 / base ** n;
        return {
          prompt: `Evaluate $${negBase ? `(${base})` : base}^{-${n}}$. Give your answer as a fraction.`,
          parts: [numPart(v, { exact: false })],
          hints: ['$a^{-n} = \\dfrac{1}{a^n}$ — a negative exponent means reciprocal, not a negative number.'],
          solution: [`$${negBase ? `(${base})` : base}^{-${n}} = \\dfrac{1}{${negBase ? `(${base})` : base}^{${n}}} = \\dfrac{1}{${base ** n}} = ${fracLatex(frac(1, base ** n))}$`],
        };
      }
      case 'zero': {
        const b = rng.int(2, 99);
        return {
          prompt: `Evaluate $${b}^0$.`,
          parts: [numPart(1, { exact: false })],
          hints: ['Look at the pattern $b^3, b^2, b^1, b^0$: each step divides by $b$.'],
          solution: [`Any non-zero base to the exponent 0 equals 1: $${b}^0 = 1$.`],
        };
      }
      case 'signzero': {
        const b = rng.int(2, 9);
        const form = rng.pick(['-b^0', '(-b)^0', '-(b)^0 + b^0'] as const);
        const v = form === '-b^0' ? -1 : form === '(-b)^0' ? 1 : 0;
        const tex = form === '-b^0' ? `-${b}^0` : form === '(-b)^0' ? `(-${b})^0` : `-${b}^0 + ${b}^0`;
        return {
          prompt: `Evaluate $${tex}$.`,
          parts: [numPart(v, { exact: false })],
          hints: ['The exponent applies only to what is directly in front of it. In $-3^0$, the base is 3, not $-3$.'],
          solution: [form === '-b^0' ? `$-${b}^0 = -(${b}^0) = -1$` : form === '(-b)^0' ? `The base is $-${b}$, so $(-${b})^0 = 1$.` : `$-${b}^0 + ${b}^0 = -1 + 1 = 0$`],
        };
      }
      case 'fracneg': {
        const p = rng.int(1, 5);
        let q = rng.int(2, 7);
        if (q === p) q++;
        const n = rng.int(1, 3);
        const v = (q / p) ** n;
        return {
          prompt: `Evaluate $\\left(\\dfrac{${p}}{${q}}\\right)^{-${n}}$. Give your answer as a fraction.`,
          parts: [numPart(v, { exact: false })],
          hints: ['$\\left(\\dfrac{a}{b}\\right)^{-n} = \\left(\\dfrac{b}{a}\\right)^{n}$'],
          solution: [`$\\left(\\dfrac{${p}}{${q}}\\right)^{-${n}} = \\left(\\dfrac{${q}}{${p}}\\right)^{${n}} = ${fracLatex(frac(q ** n, p ** n))}$`],
        };
      }
      case 'sum': {
        const a = rng.int(2, 5);
        const b = rng.int(2, 4);
        const v = 1 / a + 1 / b ** 2;
        return {
          prompt: `Evaluate $${a}^{-1} + ${b}^{-2}$. Give your answer as a fraction.`,
          parts: [numPart(v, { exact: false })],
          hints: ['Rewrite each power with a positive exponent, then add the fractions.'],
          solution: [`$${a}^{-1} + ${b}^{-2} = \\dfrac{1}{${a}} + \\dfrac{1}{${b * b}} = ${fracLatex(fracAdd(frac(1, a), frac(1, b * b)))}$`],
        };
      }
      default: {
        const b = rng.int(2, 5);
        const m = rng.int(2, 4);
        const n = rng.int(1, m + 2);
        const v = b ** (m - n);
        return {
          prompt: `Evaluate $${b}^{-${n}} \\times ${b}^{${m}}$.`,
          parts: [numPart(v, { exact: false })],
          hints: ['Same base: add the exponents.'],
          solution: [`$${b}^{-${n}} \\times ${b}^{${m}} = ${b}^{${m - n}} = ${fracLatex(frac(m - n >= 0 ? b ** (m - n) : 1, m - n >= 0 ? 1 : b ** (n - m)))}$`],
        };
      }
    }
  },
});

/** Monomial with rational coefficient and rational exponents. */
interface Mono {
  c: Frac;
  e: Record<string, Frac>;
}

function monoMul(a: Mono, b: Mono): Mono {
  const e: Record<string, Frac> = { ...a.e };
  for (const [v, x] of Object.entries(b.e)) e[v] = e[v] ? fracAdd(e[v], x) : x;
  return { c: fracMul(a.c, b.c), e };
}
function monoPow(a: Mono, n: Frac): Mono {
  const e: Record<string, Frac> = {};
  for (const [v, x] of Object.entries(a.e)) e[v] = fracMul(x, n);
  const cv = Math.pow(Math.abs(a.c.n), n.n / n.d) / Math.pow(a.c.d, n.n / n.d);
  const sign = a.c.n < 0 && n.d === 1 && n.n % 2 !== 0 ? -1 : 1;
  const exact = frac(Math.round(cv * 1e9), 1e9);
  // Simplify floating to a small fraction
  const best = smallFrac(sign * cv) ?? exact;
  return { c: best, e };
}
function monoInv(a: Mono): Mono {
  const e: Record<string, Frac> = {};
  for (const [v, x] of Object.entries(a.e)) e[v] = frac(-x.n, x.d);
  return { c: frac(a.c.d, a.c.n), e };
}
function smallFrac(x: number): Frac | null {
  for (let d = 1; d <= 10000; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) < 1e-9) return frac(n, d);
  }
  return null;
}

function expTex(x: Frac): string {
  return x.d === 1 ? `${x.n}` : `${x.n < 0 ? '-' : ''}\\frac{${Math.abs(x.n)}}{${x.d}}`;
}
function expText(x: Frac): string {
  return x.d === 1 ? `${x.n}` : `(${fracText(x)})`;
}

/** LaTeX of a monomial as written (exponents may be negative). */
function monoRawTex(m: Mono): string {
  const coef = m.c.n === 1 && m.c.d === 1 ? '' : m.c.n === -1 && m.c.d === 1 ? '-' : fracLatex(m.c);
  const vars = Object.keys(m.e)
    .sort()
    .map((v) => (m.e[v].n === 1 && m.e[v].d === 1 ? v : `${v}^{${expTex(m.e[v])}}`))
    .join('');
  return `${coef}${vars}` || '1';
}

/** Simplified result with positive exponents: LaTeX and typed text. */
function monoPositive(m: Mono): { tex: string; text: string } {
  const numV: string[] = [];
  const denV: string[] = [];
  const numT: string[] = [];
  const denT: string[] = [];
  for (const v of Object.keys(m.e).sort()) {
    const x = m.e[v];
    if (x.n === 0) continue;
    const pos = frac(Math.abs(x.n), x.d);
    const tex = pos.n === 1 && pos.d === 1 ? v : `${v}^{${expTex(pos)}}`;
    const txt = pos.n === 1 && pos.d === 1 ? v : `${v}^${expText(pos)}`;
    if (x.n > 0) {
      numV.push(tex);
      numT.push(txt);
    } else {
      denV.push(tex);
      denT.push(txt);
    }
  }
  const cn = Math.abs(m.c.n);
  const cd = m.c.d;
  const sign = m.c.n < 0 ? '-' : '';
  const numTex = `${cn === 1 && numV.length ? '' : cn}${numV.join('')}`;
  const denTex = `${cd === 1 && denV.length ? '' : cd === 1 ? '' : cd}${denV.join('')}`;
  const numText = [cn === 1 && numT.length ? '' : `${cn}`, ...numT].filter(Boolean).join('*');
  const denText = [cd === 1 ? '' : `${cd}`, ...denT].filter(Boolean).join('*');
  if (!denTex) return { tex: `${sign}${numTex}`, text: `${sign}${numText}` };
  return { tex: `${sign}\\dfrac{${numTex}}{${denTex}}`, text: `${sign}${numText}/(${denText})` };
}

function randMono(rng: Rng, vars: string[], expRange: [number, number], coefs: number[], allowNeg = true): Mono {
  const e: Record<string, Frac> = {};
  for (const v of vars) {
    let x = 0;
    while (x === 0) x = rng.int(expRange[0], expRange[1]);
    if (!allowNeg) x = Math.abs(x);
    e[v] = frac(x);
  }
  return { c: frac(rng.pick(coefs)), e };
}

const integralLaws = skill({
  id: 'a3-integral-laws',
  name: 'Exponent laws with integral exponents',
  description: 'Simplify expressions using the exponent laws, writing answers with positive exponents.',
  outcomes: ['A3'],
  lessonId: 'm10c-3-5',
  gen(rng, d) {
    const vars = d === 1 ? [rng.pick(['x', 'a', 'm'])] : rng.pick([['x', 'y'], ['a', 'b'], ['m', 'n']]);
    let expr = '';
    let result: Mono;
    let steps: string[] = [];
    if (d === 1) {
      const a = randMono(rng, vars, [-6, 7], [1]);
      const b = randMono(rng, vars, [-6, 7], [1]);
      const op = rng.pick(['mul', 'div'] as const);
      result = op === 'mul' ? monoMul(a, b) : monoMul(a, monoInv(b));
      expr = op === 'mul' ? `(${monoRawTex(a)})(${monoRawTex(b)})` : `\\dfrac{${monoRawTex(a)}}{${monoRawTex(b)}}`;
      steps = [op === 'mul' ? 'Same base: add the exponents.' : 'Same base: subtract the exponents.', `$${monoRawTex(result)}$`];
    } else if (d === 2) {
      const a = randMono(rng, vars, [-5, 6], [2, 3, 4, 6, 8, 12]);
      const b = randMono(rng, vars, [-5, 6], [1, 2, 3, 4]);
      const op = rng.pick(['mul', 'div'] as const);
      result = op === 'mul' ? monoMul(a, b) : monoMul(a, monoInv(b));
      expr = op === 'mul' ? `\\left(${monoRawTex(a)}\\right)\\left(${monoRawTex(b)}\\right)` : `\\dfrac{${monoRawTex(a)}}{${monoRawTex(b)}}`;
      steps = [
        op === 'mul' ? 'Multiply the coefficients and add the exponents of each variable.' : 'Divide the coefficients and subtract the exponents of each variable.',
        `$${monoRawTex(result)}$`,
      ];
    } else {
      const a = randMono(rng, vars, [-3, 4], [1, 2, 3]);
      const n = rng.pick([-2, -1, 2, 3]);
      const b = randMono(rng, vars, [-4, 5], [1, 2, 3, 4]);
      const powered = monoPow(a, frac(n));
      const op = rng.pick(['mul', 'div'] as const);
      result = op === 'mul' ? monoMul(powered, b) : monoMul(powered, monoInv(b));
      expr = op === 'mul' ? `\\left(${monoRawTex(a)}\\right)^{${n}}\\left(${monoRawTex(b)}\\right)` : `\\dfrac{\\left(${monoRawTex(a)}\\right)^{${n}}}{${monoRawTex(b)}}`;
      steps = [`Power of a product: multiply each exponent by $${n}$ (and raise the coefficient to the power $${n}$): $${monoRawTex(powered)}$`, op === 'mul' ? 'Multiply: add exponents.' : 'Divide: subtract exponents.', `$${monoRawTex(result)}$`];
    }
    const pos = monoPositive(result);
    return {
      prompt: `Simplify. Write your answer using only positive exponents.\n\n$$${expr}$$`,
      parts: [part({ kind: 'expression', expected: pos.text, form: 'positive-exponents', positiveVars: true }, { placeholder: 'e.g. 2x^3/y^2' })],
      hints: ['Product law: $a^m a^n = a^{m+n}$. Quotient law: $\\dfrac{a^m}{a^n} = a^{m-n}$. Power law: $(a^m)^n = a^{mn}$.', 'At the end, move any factor with a negative exponent to the other side of the fraction bar: $a^{-n} = \\dfrac{1}{a^n}$.'],
      solution: [...steps, `Positive exponents: $${pos.tex}$`],
      answerDisplay: `$${pos.tex}$`,
    };
  },
});

const rationalToRadical = skill({
  id: 'a3-rational-to-radical',
  name: 'Rational exponents and radicals',
  description: 'Convert between powers with rational exponents and radicals.',
  outcomes: ['A3'],
  lessonId: 'm10c-3-6',
  gen(rng, d) {
    const n = rng.pick([2, 3, 4, 5]);
    let m = rng.int(1, 5);
    if (gcd(m, n) !== 1) m = 1;
    const base = d === 1 ? rng.pick(['x', 'a', '5', '7']) : rng.pick(['x', 'a', 'y']);
    const toRadical = rng.chance(0.5);
    const rootTex = n === 2 ? `\\sqrt{${base}${m > 1 ? `^{${m}}` : ''}}` : `\\sqrt[${n}]{${base}${m > 1 ? `^{${m}}` : ''}}`;
    const powTex = `${base}^{\\frac{${m}}{${n}}}`;
    const coef = d === 3 ? rng.int(2, 5) : 1;
    const neg = d === 3 && rng.chance(0.5);
    if (toRadical) {
      const expected = neg ? `${coef === 1 ? '' : coef}/root(${n}, ${base}^${m})` : `${coef === 1 ? '' : coef}root(${n}, ${base}^${m})`;
      return {
        prompt: `Write $${coef === 1 ? '' : coef}${base}^{${neg ? '-' : ''}\\frac{${m}}{${n}}}$ in radical form.`,
        parts: [part({ kind: 'expression', expected: expected.replace(/^\//, '1/'), form: 'radical-form', positiveVars: true }, { placeholder: 'use √ or root(n, x)' })],
        hints: ['$a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = \\left(\\sqrt[n]{a}\\right)^m$: the denominator is the index.', ...(neg ? ['A negative exponent means reciprocal.'] : []), 'Type an nth root as root(n, x), for example root(4, x^3).'],
        solution: [neg ? `$${coef === 1 ? '' : coef}${base}^{-\\frac{${m}}{${n}}} = \\dfrac{${coef}}{${rootTex}}$` : `$${coef === 1 ? '' : coef}${powTex} = ${coef === 1 ? '' : coef}${rootTex}$`],
        answerDisplay: neg ? `$\\dfrac{${coef}}{${rootTex}}$` : `$${coef === 1 ? '' : coef}${rootTex}$`,
      };
    }
    return {
      prompt: `Write $${coef === 1 ? '' : coef}${rootTex}$ as a power with a rational exponent.`,
      parts: [part({ kind: 'expression', expected: `${coef === 1 ? '' : coef}${base}^(${m}/${n})`, form: 'exponent-form', positiveVars: true }, { placeholder: 'e.g. x^(2/3)' })],
      hints: ['$\\sqrt[n]{a^m} = a^{\\frac{m}{n}}$: the index becomes the denominator.', 'Type a fractional exponent in brackets: x^(2/3).'],
      solution: [`$${coef === 1 ? '' : coef}${rootTex} = ${coef === 1 ? '' : coef}${powTex}$`],
      answerDisplay: `$${coef === 1 ? '' : coef}${powTex}$`,
    };
  },
});

const evaluateRational = skill({
  id: 'a3-evaluate-rational',
  name: 'Evaluating rational exponents',
  description: 'Evaluate powers with rational exponents without a calculator.',
  outcomes: ['A3'],
  lessonId: 'm10c-3-6',
  gen(rng, d) {
    const n = rng.pick(d === 1 ? [2, 3] : [2, 3, 4, 5]);
    const r = rng.int(2, n >= 4 ? 3 : n === 3 ? 5 : 9);
    const m = d === 1 ? 1 : rng.int(1, 3);
    const neg = d === 3 && rng.chance(0.5);
    const fracBase = d === 3 && !neg && rng.chance(0.5);
    const r2 = fracBase ? rng.intExcept(2, n >= 4 ? 3 : 5, [r]) : 1;
    const baseTex = fracBase ? `\\left(\\dfrac{${r ** n}}{${r2 ** n}}\\right)` : `${r ** n}`;
    const value = fracBase ? (r / r2) ** (neg ? -m : m) : r ** (neg ? -m : m);
    const expTexS = `${neg ? '-' : ''}\\frac{${m}}{${n}}`;
    return {
      prompt: `Evaluate $${baseTex}^{${expTexS}}$ without a calculator.${neg || fracBase ? ' Give a fraction if needed.' : ''}`,
      parts: [numPart(value, { exact: false })],
      hints: ['Take the root first (the denominator), then the power (the numerator) — the numbers stay small.', ...(neg ? ['A negative exponent means reciprocal.'] : [])],
      solution: [
        `$${baseTex}^{\\frac{1}{${n}}} = ${fracBase ? `\\dfrac{${r}}{${r2}}` : r}$`,
        `Raise to the power ${neg ? -m : m}: $${fracLatex(frac(fracBase ? (neg ? r2 ** m : r ** m) : neg ? 1 : r ** m, fracBase ? (neg ? r ** m : r2 ** m) : neg ? r ** m : 1))}$`,
      ],
    };
  },
});

const rationalLaws = skill({
  id: 'a3-rational-laws',
  name: 'Exponent laws with rational exponents',
  description: 'Simplify expressions with rational exponents using the exponent laws.',
  outcomes: ['A3'],
  lessonId: 'm10c-3-6',
  gen(rng, d) {
    const v = rng.pick(['x', 'a', 'y']);
    const fr = () => frac(rng.nonZero(-5, 5), rng.pick([2, 3, 4, 6]));
    let result: Mono = { c: frac(1), e: {} };
    let expr = '';
    for (let tries = 0; tries < 50; tries++) {
      if (d === 1) {
        const a: Mono = { c: frac(1), e: { [v]: fr() } };
        const b: Mono = { c: frac(1), e: { [v]: fr() } };
        result = monoMul(a, b);
        expr = `${monoRawTex(a)} \\cdot ${monoRawTex(b)}`;
      } else if (d === 2) {
        const a: Mono = { c: frac(1), e: { [v]: fr() } };
        const p = frac(rng.nonZero(-3, 3), rng.pick([1, 2, 3]));
        result = monoPow(a, p);
        expr = `\\left(${monoRawTex(a)}\\right)^{${expTex(p)}}`;
      } else {
        const k = rng.pick([2, 3]);
        const r = rng.int(2, 3);
        const base: Mono = { c: frac(r ** k), e: { [v]: frac(k * rng.int(1, 3)) } };
        const p = frac(rng.pick([1, 2, -1, -2]), k);
        result = monoPow(base, p);
        expr = `\\left(${monoRawTex(base)}\\right)^{${expTex(p)}}`;
      }
      if (Object.values(result.e).some((x) => x.n !== 0)) break;
    }
    const pos = monoPositive(result);
    return {
      prompt: `Simplify. Write your answer with positive exponents.\n\n$$${expr}$$`,
      parts: [part({ kind: 'expression', expected: pos.text, form: 'positive-exponents', positiveVars: true }, { placeholder: 'e.g. x^(5/6)' })],
      hints: ['The exponent laws work the same way for rational exponents.', 'Add fractions with a common denominator; multiply fractions straight across.', 'Type fractional exponents in brackets: x^(5/6).'],
      solution: [`$${expr} = ${monoRawTex(result)}$`, `$= ${pos.tex}$`],
      answerDisplay: `$${pos.tex}$`,
    };
  },
});

const errorAnalysis = skill({
  id: 'a3-error-analysis',
  name: 'Finding errors with exponents',
  description: 'Identify and correct errors in simplifications involving powers.',
  outcomes: ['A3'],
  lessonId: 'm10c-3-6',
  format: 'mc',
  gen(rng) {
    const k = rng.int(2, 5);
    const a = rng.int(2, 6);
    const b = rng.int(2, 6);
    const templates = [
      {
        expr: `\\left(${k}x^{${a}}\\right)^{2}`,
        steps: [`$= ${k}x^{${2 * a}}$`],
        error: 'The coefficient was not squared.',
        correct: `$${k * k}x^{${2 * a}}$`,
      },
      {
        expr: `x^{${a}} \\cdot x^{${b}}`,
        steps: [`$= x^{${a * b}}$`],
        error: 'The exponents were multiplied instead of added.',
        correct: `$x^{${a + b}}$`,
      },
      {
        expr: `${k}^{-${a % 3 + 1}}`,
        steps: [`$= -${k ** ((a % 3) + 1)}$`],
        error: 'A negative exponent means a reciprocal, not a negative number.',
        correct: `$\\dfrac{1}{${k ** ((a % 3) + 1)}}$`,
      },
      {
        expr: `${k + 3}x^{0}`,
        steps: [`$= 0$`],
        error: 'Any non-zero base to the exponent 0 is 1, so the expression equals the coefficient.',
        correct: `$${k + 3}$`,
      },
      {
        expr: `\\dfrac{x^{${a + b}}}{x^{${b}}}`,
        steps: [`$= x^{${fmt((a + b) / b, 2)}}$`],
        error: 'The exponents were divided instead of subtracted.',
        correct: `$x^{${a}}$`,
      },
      {
        expr: `\\left(x^{${a}}\\right)^{${b}}`,
        steps: [`$= x^{${a + b}}$`],
        error: 'For a power of a power, multiply the exponents.',
        correct: `$x^{${a * b}}$`,
      },
    ];
    const t = rng.pick(templates);
    const wrongErrors = templates.filter((x) => x.error !== t.error).map((x) => x.error);
    return {
      prompt: `A student simplified $${t.expr}$ like this:\n\n$${t.expr}$ ${t.steps.join(' ')}\n\nWhat error did the student make?`,
      parts: [{ answer: mc(rng, t.error, rng.sample(wrongErrors, 3)) }],
      hints: ['Check each exponent law the student used.'],
      solution: [t.error, `The correct simplification is ${t.correct}.`],
    };
  },
});

const exponentProblems = skill({
  id: 'a3-exponent-problems',
  name: 'Problems with exponents and radicals',
  description: 'Solve applied problems that involve rational exponents or radicals.',
  outcomes: ['A3'],
  lessonId: 'm10c-3-6',
  calculator: true,
  gen(rng, d) {
    const kind = byDifficulty(d, 'cube', rng.pick(['sphere', 'double'] as const), rng.pick(['halflife', 'sphere', 'double'] as const));
    switch (kind) {
      case 'cube': {
        const V = rng.int(30, 900);
        const s = V ** (1 / 3);
        return {
          prompt: `The side length of a cube is $s = V^{\\frac13}$. A cube has volume $${V}\\ \\text{cm}^3$. Determine its side length, to the nearest tenth of a centimetre.`,
          parts: [numPart(s, { decimals: 1, suffix: 'cm' })],
          hints: ['$V^{\\frac13} = \\sqrt[3]{V}$.'],
          solution: [`$s = ${V}^{\\frac13} = \\sqrt[3]{${V}} \\approx ${fmtFixed(s, 1)}\\ \\text{cm}$`],
          calculator: true,
        };
      }
      case 'sphere': {
        const V = rng.int(100, 5000);
        const r = ((3 * V) / (4 * Math.PI)) ** (1 / 3);
        return {
          prompt: `The radius of a sphere is $r = \\left(\\dfrac{3V}{4\\pi}\\right)^{\\frac13}$. Determine the radius of a sphere with volume $${V}\\ \\text{cm}^3$, to the nearest tenth.`,
          parts: [numPart(r, { decimals: 1, suffix: 'cm' })],
          hints: ['Substitute, simplify inside the brackets, then take the cube root.'],
          solution: [`$r = \\left(\\dfrac{3(${V})}{4\\pi}\\right)^{\\frac13} \\approx (${fmt((3 * V) / (4 * Math.PI), 3)})^{\\frac13} \\approx ${fmtFixed(r, 1)}\\ \\text{cm}$`],
          calculator: true,
        };
      }
      case 'double': {
        const P0 = rng.pick([100, 200, 500, 1000]);
        const dt = rng.pick([3, 4, 5, 6]);
        const t = rng.int(2, 20);
        const P = P0 * 2 ** (t / dt);
        return {
          prompt: `A bacteria culture starts with $${P0}$ cells and doubles every $${dt}$ hours, so $P = ${P0}(2)^{\\frac{t}{${dt}}}$. How many cells are there after $${t}$ hours? Round to the nearest whole number.`,
          parts: [numPart(P, { decimals: 0, suffix: 'cells' })],
          hints: ['Substitute $t$ and evaluate the exponent first.'],
          solution: [`$P = ${P0}(2)^{\\frac{${t}}{${dt}}} \\approx ${fmtFixed(P, 0)}$`],
          calculator: true,
        };
      }
      default: {
        const A0 = rng.pick([80, 100, 200, 500]);
        const h = rng.pick([5, 8, 10, 12]);
        const t = rng.int(3, 40);
        const A = A0 * 0.5 ** (t / h);
        return {
          prompt: `A medication has a half-life of $${h}$ hours: $A = ${A0}\\left(\\tfrac12\\right)^{\\frac{t}{${h}}}$ mg remain after $t$ hours. How much remains after $${t}$ hours, to the nearest tenth of a milligram?`,
          parts: [numPart(A, { decimals: 1, suffix: 'mg' })],
          hints: ['Substitute $t$, then evaluate the power.'],
          solution: [`$A = ${A0}(0.5)^{\\frac{${t}}{${h}}} \\approx ${fmtFixed(A, 1)}\\ \\text{mg}$`],
          calculator: true,
        };
      }
    }
  },
});

export const NUMBER_SKILLS: SkillDef[] = [
  primeFactorization,
  gcf,
  lcmSkill,
  gcfLcmProblems,
  squareCubeClassify,
  sqrtCbrt,
  rootsProblems,
  classify,
  numberSets,
  indexSkill,
  approximate,
  order,
  mixedRadical,
  entireRadical,
  negativeZero,
  integralLaws,
  rationalToRadical,
  evaluateRational,
  rationalLaws,
  errorAnalysis,
  exponentProblems,
];
