/** Math 6 Unit 3 — Prime Factorization and Powers (N3). Prime and composite numbers, factor trees, powers, common factors and divisibility. */
import { fixedChoice, mc, multi, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { divisors, gcd, isPrime, primeFactorList, primeFactorMap } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

/** A whole-number answer typed as a number, not a calculation. */
const intPart = (v: number, opts: { label?: string; suffix?: string } = {}): Part => numPart(v, { ...opts, exact: false });
const YES_NO = ['Yes', 'No'];

/** Prime factors with repetition, in LaTeX: 2 \times 2 \times 3. */
const timesList = (n: number) => primeFactorList(n).join(' \\times ');
/** Prime factorization with powers, in LaTeX: 2^{2} \times 3. */
function powerTex(n: number): string {
  return [...primeFactorMap(n)].map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join(' \\times ');
}
/** Prime factorization as the student types it: 2*2*3 or 2^2*3. */
const typed = (n: number, powers: boolean) =>
  powers ? [...primeFactorMap(n)].map(([p, e]) => (e === 1 ? `${p}` : `${p}^${e}`)).join(' * ') : primeFactorList(n).join(' * ');
/** A list of factors in LaTeX: 1,\ 2,\ 3. */
const listTex = (xs: number[]) => xs.join(',\\ ');

/** Steps that split off the smallest prime each time: 60 = 2 × 30, 30 = 2 × 15, 15 = 3 × 5. */
function divideSteps(n: number): string[] {
  const steps: string[] = [];
  let m = n;
  while (!isPrime(m) && m > 1) {
    const p = primeFactorList(m)[0];
    steps.push(`$${m} = ${p} \\times ${m / p}$${isPrime(m / p) ? '' : ` (keep going: $${m / p}$ is composite)`}`);
    m /= p;
  }
  return steps;
}

// ---- Factor trees ---------------------------------------------------------

interface TreeNode {
  v: number;
  kids?: [TreeNode, TreeNode];
}

/** Factor pairs a × b of n with 1 < a ≤ b. */
function factorPairs(n: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let a = 2; a * a <= n; a++) if (n % a === 0) out.push([a, n / a]);
  return out;
}

function buildTree(rng: Rng, n: number, first?: [number, number]): TreeNode {
  if (isPrime(n)) return { v: n };
  const [a, b] = first ?? rng.pick(factorPairs(n));
  return { v: n, kids: [buildTree(rng, a), buildTree(rng, b)] };
}

function treeDepth(t: TreeNode): number {
  return t.kids ? 1 + Math.max(treeDepth(t.kids[0]), treeDepth(t.kids[1])) : 0;
}

/** Steps that read a factor tree from the top: 60 = 6 × 10, 6 = 2 × 3, ... */
function treeSteps(t: TreeNode): string[] {
  if (!t.kids) return [];
  return [`$${t.v} = ${t.kids[0].v} \\times ${t.kids[1].v}$`, ...treeSteps(t.kids[0]), ...treeSteps(t.kids[1])];
}

/**
 * A factor tree drawn on a blank canvas. Composite numbers are purple dots, prime numbers
 * (the ends of the branches) are orange. The `hide` node is labelled "?".
 */
function treeFigure(t: TreeNode, hide?: TreeNode): Figure {
  const points: PlanePoint[] = [];
  const segments: PlaneSegment[] = [];
  let slot = 0;
  const dy = 1.4;
  const place = (node: TreeNode, depth: number): number => {
    let x: number;
    const y = -depth * dy;
    if (!node.kids) x = 2 * slot++;
    else {
      const xl = place(node.kids[0], depth + 1);
      const xr = place(node.kids[1], depth + 1);
      x = (xl + xr) / 2;
      segments.push({ from: [x, y], to: [xl, y - dy], color: 'muted' }, { from: [x, y], to: [xr, y - dy], color: 'muted' });
    }
    points.push({ x, y, label: node === hide ? '?' : String(node.v), color: node.kids ? 'brand' : 'accent' });
    return x;
  };
  place(t, 0);
  const D = treeDepth(t);
  const xMax = Math.max(2 * (slot - 1) + 1.6, 3);
  return {
    type: 'plane',
    grid: { xMin: -1, xMax, yMin: -D * dy - 0.6, yMax: 0.9, step: 100 },
    points,
    segments,
    hideTickLabels: true,
    caption: `A factor tree for ${t.v}`,
  };
}

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
const COMPOSITES = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 21, 22, 25, 26, 27, 33, 34, 35, 38, 39, 45, 49, 51, 55, 57];
/** Odd composites that are easy to mistake for primes. */
const LOOK_PRIME = [15, 21, 25, 27, 33, 35, 39, 45, 49, 51, 55, 57];
/** Composite numbers with at least three prime factors (counting repeats), 12 to 100. */
const SMALL_COMPOSITES = Array.from({ length: 89 }, (_, i) => i + 12).filter((n) => primeFactorList(n).length >= 3);
/** Composite numbers 100 to 400 whose prime factors are at most 13, with at least four prime factors. */
const BIG_COMPOSITES = Array.from({ length: 301 }, (_, i) => i + 100).filter((n) => {
  const l = primeFactorList(n);
  return l.length >= 4 && l[l.length - 1] <= 13;
});
const DEF_PRIME = 'A prime number has exactly two factors: $1$ and itself. A composite number has more than two factors.';

function factorsSentence(n: number): string {
  const ds = divisors(n);
  return `The factors of $${n}$ are $${listTex(ds)}$.`;
}

// ---------------------------------------------------------------------------
// 3.1 Prime factorization
// ---------------------------------------------------------------------------

function pfD1(rng: Rng): Out {
  const kind = rng.pick(['type', 'type', 'which', 'tree'] as const);
  if (kind === 'type') {
    const n = rng.chance(0.1) ? 1 : rng.chance(0.45) ? rng.pick(PRIMES) : rng.pick(COMPOSITES);
    const idx = n === 1 ? 2 : isPrime(n) ? 0 : 1;
    const pairs = factorPairs(n);
    return {
      prompt: `Is $${n}$ a prime number, a composite number, or neither?`,
      parts: [{ answer: fixedChoice(['Prime', 'Composite', 'Neither prime nor composite'], idx) }],
      hints: [DEF_PRIME, 'Try dividing by $2$, $3$, $5$ and $7$. Does any of them divide the number evenly?'],
      solution:
        n === 1
          ? ['$1$ has only one factor: $1$.', 'A prime number needs exactly two factors, and a composite number needs more than two.', '$1$ is neither prime nor composite.']
          : isPrime(n)
            ? [`No whole number other than $1$ and $${n}$ divides $${n}$ evenly.`, `$${n}$ has exactly two factors, $1$ and $${n}$, so it is prime.`]
            : [`$${n} = ${pairs[0][0]} \\times ${pairs[0][1]}$, so $${pairs[0][0]}$ is a factor of $${n}$.`, factorsSentence(n), `$${n}$ has more than two factors, so it is composite.`],
    };
  }
  if (kind === 'which') {
    const p = rng.pick(PRIMES.filter((x) => x > 10));
    const cs = rng.sample(LOOK_PRIME, 3);
    return {
      prompt: 'Which number is prime?',
      parts: [{ answer: mc(rng, `$${p}$`, cs.map((c) => `$${c}$`)) }],
      hints: [DEF_PRIME, 'Odd numbers can still be composite. Try dividing each number by $3$, $5$ and $7$.'],
      solution: [...cs.map((c) => `$${c} = ${factorPairs(c)[0][0]} \\times ${factorPairs(c)[0][1]}$, so $${c}$ is composite.`), `$${p}$ has only the factors $1$ and $${p}$, so $${p}$ is prime.`],
    };
  }
  const n = rng.pick([24, 30, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 70, 72, 75, 84, 90]);
  const [a, b] = rng.pick(factorPairs(n));
  const swap = rng.chance(0.5);
  const tree = buildTree(rng, n, swap ? [b, a] : [a, b]);
  const hidden = tree.kids![swap ? 0 : 1];
  const known = tree.kids![swap ? 1 : 0].v;
  return {
    prompt: `Complete the factor tree for $${n}$. What number goes where the $?$ is?`,
    figure: treeFigure(tree, hidden),
    parts: [intPart(hidden.v, { label: '$? =$' })],
    hints: ['Each number in a factor tree is the product of the two numbers just below it.', `What number times $${known}$ equals $${n}$?`],
    solution: [`$${known} \\times ? = ${n}$`, `$${n} \\div ${known} = ${hidden.v}$`, `The missing number is $${hidden.v}$, because $${known} \\times ${hidden.v} = ${n}$.`],
  };
}

function pfAnswer(n: number, powers: boolean): Part {
  return part({ kind: 'expression', expected: typed(n, powers), form: 'prime-factorization' }, { placeholder: powers ? 'e.g. 2^3*5' : 'e.g. 2*2*3', label: `$${n} =$` });
}

function pfD2(rng: Rng): Out {
  const kind = rng.pick(['write', 'tree', 'compose'] as const);
  if (kind === 'compose') {
    const n = rng.pick([...SMALL_COMPOSITES, ...BIG_COMPOSITES.filter((x) => x <= 200)]);
    const list = primeFactorList(n);
    return {
      prompt: `The prime factorization of a number is $${timesList(n)}$. What is the number?`,
      parts: [intPart(n)],
      hints: ['Multiply all the prime factors together.', 'You can multiply in any order. Look for friendly pairs, like $2 \\times 5 = 10$.'],
      solution: [`Multiply the factors from left to right: ${list.slice(1).reduce((acc, p) => ({ v: acc.v * p, s: [...acc.s, `$${acc.v} \\times ${p} = ${acc.v * p}$`] }), { v: list[0], s: [] as string[] }).s.join(', ')}.`, `The number is $${n}$.`],
    };
  }
  const n = rng.pick(SMALL_COMPOSITES);
  if (kind === 'tree') {
    const tree = buildTree(rng, n);
    return {
      prompt: `Use the factor tree to write the prime factorization of $${n}$. Type it as a product, like 2*2*3.`,
      figure: treeFigure(tree),
      parts: [pfAnswer(n, false)],
      hints: ['The prime factors are at the ends of the branches (the orange dots).', 'Write all the primes at the ends of the branches, with multiplication signs between them.'],
      solution: [...treeSteps(tree), `The ends of the branches are $${timesList(n)}$.`, `$${n} = ${timesList(n)}$`],
      answerDisplay: `$${timesList(n)}$`,
    };
  }
  return {
    prompt: `Write the prime factorization of $${n}$. Type it as a product of prime numbers, like 2*2*3.`,
    parts: [pfAnswer(n, false)],
    hints: ['Make a factor tree. Split the number into any two factors, then split each composite factor again.', 'Stop when every branch ends in a prime number. Check by multiplying the primes.'],
    solution: [...divideSteps(n), `Every branch now ends in a prime.`, `$${n} = ${timesList(n)}$`],
    answerDisplay: `$${timesList(n)}$`,
  };
}

/** Random groupings of a prime factor list into k factors (each factor a product of some primes). */
function grouping(rng: Rng, primes: number[], k: number): number[] {
  const groups = Array.from({ length: k }, () => 1);
  const shuffled = rng.shuffle(primes);
  shuffled.forEach((p, i) => (groups[i < k ? i : rng.int(0, k - 1)] *= p));
  return groups.sort((a, b) => a - b);
}

function pfD3(rng: Rng): Out {
  const kind = rng.pick(['write', 'notEqual', 'group'] as const);
  if (kind === 'write') {
    const n = rng.pick(BIG_COMPOSITES);
    return {
      prompt: `Write the prime factorization of $${n}$. Type it as a product of prime numbers, like 2*2*3.`,
      parts: [pfAnswer(n, false)],
      hints: [
        n % 10 === 0 ? 'Start with an easy split. A number ending in $0$ can be split as $10 \\times$ something, and $10 = 2 \\times 5$.' : 'Start with an easy split. Try dividing by $2$, then $3$, then $5$ and $7$.',
        'Keep splitting each composite factor until every branch ends in a prime.',
      ],
      solution: [...divideSteps(n), `$${n} = ${timesList(n)}$`, `Check: multiplying the primes gives $${n}$.`],
      answerDisplay: `$${timesList(n)}$`,
    };
  }
  if (kind === 'notEqual') {
    const n = rng.pick([24, 36, 48, 60, 72, 84, 90, 96, 120]);
    const primes = primeFactorList(n);
    const tex = (fs: number[]) => fs.join(' \\times ');
    const show = (fs: number[]) => `$${tex(fs)}$`;
    const ways = new Map<string, number[]>();
    for (let t = 0; t < 40 && ways.size < 3; t++) {
      const k = rng.int(2, Math.min(4, primes.length - 1));
      const g = grouping(rng, primes, k);
      if (g.includes(1)) continue;
      ways.set(show(g), g);
    }
    const base = [...ways.values()][0];
    const wrong = retry(
      () => {
        const g = grouping(rng, primes, 3).filter((x) => x > 1);
        const i = rng.int(0, g.length - 1);
        const w = [...g];
        w[i] = w[i] + (rng.chance(0.5) || w[i] === 2 ? 1 : -1);
        return w.sort((a, b) => a - b);
      },
      (w) => w.reduce((s, x) => s * x, 1) !== n && w.every((x) => x > 1),
    );
    const wv = wrong.reduce((s, x) => s * x, 1);
    return {
      prompt: `Which product is NOT equal to $${n}$?`,
      parts: [{ answer: mc(rng, show(wrong), [...ways.keys(), show(primes)]) }],
      hints: ['Multiply the factors in each product.', 'A product can be made in many ways. Breaking a factor into smaller factors does not change the product.'],
      solution: [
        `Each correct product uses the prime factors of $${n}$: $${timesList(n)}$.`,
        `For example, $${tex(base)} = ${n}$.`,
        `But $${tex(wrong)} = ${wv}$, not $${n}$.`,
        `The product that is NOT equal to $${n}$ is ${show(wrong)}.`,
      ],
    };
  }
  const [a, c] = rng.pick([[2, 5], [5, 2], [4, 25], [25, 4], [20, 5], [5, 20], [50, 2], [2, 50], [4, 5], [5, 4]] as const);
  const b = retry(() => rng.int(3, 19), (x) => x !== 10 && x !== a && x !== c);
  const ac = a * c;
  return {
    prompt: `Find the product without a calculator. Change the order or grouping to make it easier. $$${a} \\times ${b} \\times ${c}$$`,
    parts: [intPart(a * b * c)],
    hints: ['You can multiply three numbers in any order or grouping. The product stays the same.', `Multiply $${a} \\times ${c}$ first. It makes a friendly number.`],
    solution: [
      'The order and grouping of factors do not change the product (the associative property).',
      `Group the friendly pair: $(${a} \\times ${c}) \\times ${b}$.`,
      `$${a} \\times ${c} = ${ac}$, and $${ac} \\times ${b} = ${ac * b}$.`,
      `$${a} \\times ${b} \\times ${c} = ${a * b * c}$`,
    ],
  };
}

const primeFactorization = skill({
  id: 'm6-prime-factorization',
  name: 'Prime factorization',
  description: 'Tell prime and composite numbers apart, complete factor trees, and write a composite number as a product of primes.',
  outcomes: ['N3'],
  lessonId: 'm6-3-1',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? pfD1(rng) : d === 2 ? pfD2(rng) : pfD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.2 Powers
// ---------------------------------------------------------------------------

const repeated = (a: number, n: number) => Array.from({ length: n }, () => `${a}`).join(' \\times ');
const POWER_DEF = 'In a power $A^n$, the base $A$ is the factor that repeats and the exponent $n$ tells how many times it is a factor.';

/** Small powers with friendly values. */
const EVAL_POWERS: Array<[number, number]> = [
  [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2], [5, 3],
  [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [10, 3], [10, 4], [11, 2], [12, 2], [6, 3],
];

function evalSteps(a: number, n: number): string[] {
  const steps: string[] = [`$${a}^{${n}} = ${repeated(a, n)}$`];
  let v = a;
  const chain: string[] = [];
  for (let i = 1; i < n; i++) {
    chain.push(`$${v} \\times ${a} = ${v * a}$`);
    v *= a;
  }
  if (chain.length > 1) steps.push(`Multiply from left to right: ${chain.join(', ')}.`);
  steps.push(`$${a}^{${n}} = ${v}$`);
  return steps;
}

function powD1(rng: Rng): Out {
  const kind = rng.pick(['parts', 'repeated', 'meaning'] as const);
  if (kind === 'parts') {
    const a = rng.int(2, 12);
    const n = retry(() => rng.int(2, 8), (x) => x !== a);
    return {
      prompt: `Look at the power $${a}^{${n}}$. What is the base? What is the exponent?`,
      parts: [intPart(a, { label: 'Base' }), intPart(n, { label: 'Exponent' })],
      hints: ['The base is the big number on the bottom. The exponent is the small raised number.', POWER_DEF],
      solution: [`$${a}^{${n}}$ means $${n}$ factors of $${a}$ multiplied together.`, `The base is $${a}$ (the repeated factor). The exponent is $${n}$ (how many factors).`],
    };
  }
  if (kind === 'repeated') {
    const a = rng.int(2, 13);
    const n = rng.int(2, 7);
    return {
      prompt: `Write $${repeated(a, n)}$ as a power. What are the base and the exponent?`,
      parts: [intPart(a, { label: 'Base' }), intPart(n, { label: 'Exponent' })],
      hints: ['Which factor repeats? That is the base.', 'Count how many times it is a factor. That is the exponent.'],
      solution: [`The factor $${a}$ repeats, so the base is $${a}$.`, `There are $${n}$ factors of $${a}$, so the exponent is $${n}$.`, `$${repeated(a, n)} = ${a}^{${n}}$`],
    };
  }
  const a = rng.int(2, 9);
  const n = retry(() => rng.int(2, 5), (x) => x !== a);
  return {
    prompt: `What does $${a}^{${n}}$ mean?`,
    parts: [{ answer: mc(rng, `$${repeated(a, n)}$`, [`$${a} \\times ${n}$`, `$${repeated(n, a)}$`, `$${Array.from({ length: n }, () => `${a}`).join(' + ')}$`]) }],
    hints: [POWER_DEF, `The exponent $${n}$ tells how many factors of $${a}$ to multiply.`],
    solution: [`The base is $${a}$ and the exponent is $${n}$.`, `So $${a}^{${n}}$ means $${n}$ factors of $${a}$ multiplied: $${repeated(a, n)}$.`, `It does not mean $${a} \\times ${n}$.`],
  };
}

function powD2(rng: Rng): Out {
  const kind = rng.pick(['evaluate', 'evaluate', 'factorPowers', 'writeEval'] as const);
  if (kind === 'evaluate') {
    const [a, n] = rng.pick(EVAL_POWERS);
    return {
      prompt: `Find the value of $${a}^{${n}}$.`,
      parts: [intPart(a ** n)],
      hints: [`Write $${a}^{${n}}$ as a product of $${n}$ factors of $${a}$.`, 'Multiply from left to right.'],
      solution: evalSteps(a, n),
    };
  }
  if (kind === 'factorPowers') {
    const [p, r] = rng.sample([2, 3, 5, 7], 2).sort((x, y) => x - y);
    const [e, f] = retry(() => [rng.int(1, 4), rng.int(1, 4)], ([x, y]) => x !== y && x + y >= 3);
    const prod = [...Array(e).fill(p), ...Array(f).fill(r)].join(' \\times ');
    const pw = (b: number, k: number) => (k === 1 ? `${b}` : `${b}^{${k}}`);
    return {
      prompt: `Which shows $${prod}$ using powers?`,
      parts: [{ answer: mc(rng, `$${pw(p, e)} \\times ${pw(r, f)}$`, [`$${pw(p, f)} \\times ${pw(r, e)}$`, `$${p * r}^{${e + f}}$`, `$${pw(p, e)} + ${pw(r, f)}$`]) }],
      hints: ['Count how many times each prime is a factor.', 'Write each repeated factor as a power: the base is the prime and the exponent is the count.'],
      solution: [`$${p}$ is a factor $${e}$ ${e === 1 ? 'time' : 'times'}, so it is $${pw(p, e)}$.`, `$${r}$ is a factor $${f}$ ${f === 1 ? 'time' : 'times'}, so it is $${pw(r, f)}$.`, `$${prod} = ${pw(p, e)} \\times ${pw(r, f)}$`],
    };
  }
  const [a, n] = rng.pick(EVAL_POWERS.filter(([b, k]) => k >= 3 && b < 10));
  return {
    prompt: `Write $${repeated(a, n)}$ as a power. Then find its value.`,
    parts: [intPart(a, { label: 'Base' }), intPart(n, { label: 'Exponent' }), intPart(a ** n, { label: 'Value' })],
    hints: ['The repeated factor is the base. The number of factors is the exponent.', 'To find the value, multiply from left to right.'],
    solution: [`There are $${n}$ factors of $${a}$, so $${repeated(a, n)} = ${a}^{${n}}$.`, ...evalSteps(a, n).slice(1)],
  };
}

/** Numbers that are a product of two prime powers, for "find the exponents". */
function twoPrimePowers(rng: Rng): { n: number; p: number; r: number; a: number; b: number } {
  return retry(
    () => {
      const [p, r] = rng.pick([[2, 3], [2, 5], [2, 7], [3, 5], [3, 7]] as const);
      const a = rng.int(1, 5);
      const b = rng.int(1, 3);
      return { n: p ** a * r ** b, p, r, a, b };
    },
    (o) => o.n <= 500 && o.n >= 24 && o.a + o.b >= 3 && (o.a >= 2 || o.b >= 2),
  );
}

function powD3(rng: Rng): Out {
  const kind = rng.pick(['exponents', 'pfPowers', 'compare', 'value'] as const);
  if (kind === 'exponents') {
    const { n, p, r, a, b } = twoPrimePowers(rng);
    return {
      prompt: `$${n} = ${p}^{a} \\times ${r}^{b}$. Find the exponents $a$ and $b$.`,
      parts: [intPart(a, { label: '$a =$' }), intPart(b, { label: '$b =$' })],
      hints: [`Divide $${n}$ by $${p}$ as many times as you can. Count the divisions.`, `Then count how many times $${r}$ is a factor of what is left.`],
      solution: [...divideSteps(n), `$${n} = ${timesList(n)}$`, `$${p}$ is a factor $${a}$ ${a === 1 ? 'time' : 'times'} and $${r}$ is a factor $${b}$ ${b === 1 ? 'time' : 'times'}: $${n} = ${powerTex(n)}$.`, `$a = ${a}$ and $b = ${b}$`],
    };
  }
  if (kind === 'pfPowers') {
    const n = rng.pick([...SMALL_COMPOSITES, ...BIG_COMPOSITES].filter((x) => [...primeFactorMap(x).values()].some((e) => e >= 2) && primeFactorMap(x).size >= 2));
    return {
      prompt: `Write the prime factorization of $${n}$. Use powers for repeated factors, for example $2^3 \\times 5$ (type it as 2^3*5).`,
      parts: [pfAnswer(n, true)],
      hints: ['First find all the prime factors with a factor tree.', 'Then write each repeated prime as a power.'],
      solution: [...divideSteps(n), `$${n} = ${timesList(n)}$`, `With powers: $${n} = ${powerTex(n)}$`],
      answerDisplay: `$${powerTex(n)}$`,
    };
  }
  if (kind === 'compare') {
    const [x, y] = rng.pick([[2, 5], [3, 4], [2, 6], [2, 4], [2, 3], [3, 5], [4, 5], [2, 7]] as const);
    const [a, b] = rng.chance(0.5) ? [x, y] : [y, x];
    const va = a ** b;
    const vb = b ** a;
    const idx = va === vb ? 2 : va > vb ? 0 : 1;
    return {
      prompt: `Which is greater: $${a}^{${b}}$ or $${b}^{${a}}$?`,
      parts: [{ answer: fixedChoice([`$${a}^{${b}}$`, `$${b}^{${a}}$`, 'They are equal'], idx) }],
      hints: ['Find the value of each power.', 'Write each power as repeated multiplication, then multiply.'],
      solution: [`$${a}^{${b}} = ${repeated(a, b)} = ${va}$`, `$${b}^{${a}} = ${repeated(b, a)} = ${vb}$`, va === vb ? `Both are $${va}$, so they are equal.` : `$${Math.max(va, vb)} > ${Math.min(va, vb)}$, so $${va > vb ? `${a}^{${b}}` : `${b}^{${a}}`}$ is greater.`],
    };
  }
  const n = rng.pick([...SMALL_COMPOSITES, ...BIG_COMPOSITES].filter((x) => x >= 60 && [...primeFactorMap(x).values()].some((e) => e >= 2) && primeFactorMap(x).size >= 2));
  const parts = [...primeFactorMap(n)].map(([p, e]) => ({ p, e, v: p ** e }));
  return {
    prompt: `What number has the prime factorization $${powerTex(n)}$?`,
    parts: [intPart(n)],
    hints: ['Find the value of each power first.', 'Then multiply the results together.'],
    solution: [
      parts.filter((x) => x.e > 1).map((x) => `$${x.p}^{${x.e}} = ${x.v}$`).join(', '),
      `$${powerTex(n)} = ${parts.map((x) => x.v).join(' \\times ')} = ${n}$`,
      `The number is $${n}$.`,
    ],
  };
}

const powers = skill({
  id: 'm6-powers',
  name: 'Powers',
  description: 'Identify the base and exponent of a power, write repeated factors as a power (including in a prime factorization), and evaluate small powers.',
  outcomes: ['N3'],
  lessonId: 'm6-3-2',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? powD1(rng) : d === 2 ? powD2(rng) : powD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.3 Common factors and divisibility
// ---------------------------------------------------------------------------

/** Numbers for divisibility questions: at least two different primes and four prime factors. */
const DIV_POOL = Array.from({ length: 400 }, (_, i) => i + 24).filter((n) => {
  const m = primeFactorMap(n);
  const l = primeFactorList(n);
  return m.size >= 2 && l.length >= 4 && l[l.length - 1] <= 11;
});

/** Does the prime factorization of n contain every prime factor of d (with repeats)? */
const divides = (d: number, n: number) => n % d === 0;

function cfD1(rng: Rng): Out {
  const kind = rng.pick(['prime', 'power', 'commonPick'] as const);
  if (kind === 'prime') {
    const n = rng.pick(DIV_POOL);
    const m = primeFactorMap(n);
    const yes = rng.chance(0.5);
    const p = yes ? rng.pick([...m.keys()]) : rng.pick([2, 3, 5, 7, 11].filter((x) => !m.has(x)));
    return {
      prompt: `A number is written as a product of primes: $${powerTex(n)}$. Is the number divisible by $${p}$?`,
      parts: [{ answer: fixedChoice(YES_NO, yes ? 0 : 1) }],
      hints: ['A prime number divides the number only if it appears in the prime factorization.', `Look for $${p}$ in $${powerTex(n)}$.`],
      solution: yes
        ? [`$${p}$ is one of the prime factors.`, `So the number is $${p}$ times the other factors, and it is divisible by $${p}$.`, `Yes. ($${powerTex(n)} = ${n}$ and $${n} \\div ${p} = ${n / p}$.)`]
        : [`The only primes in the factorization are $${listTex([...m.keys()])}$.`, `$${p}$ is not one of them, so $${p}$ does not divide the number.`, `No. ($${powerTex(n)} = ${n}$, and $${n} \\div ${p}$ has a remainder.)`],
    };
  }
  if (kind === 'power') {
    const a = rng.pick([2, 3, 5, 6, 7, 10, 11]);
    const n = rng.int(3, 6);
    const yes = rng.chance(0.6);
    const d = yes ? a : rng.pick([2, 3, 5, 7].filter((x) => a % x !== 0));
    return {
      prompt: `Is $${a}^{${n}}$ divisible by $${d}$?`,
      parts: [{ answer: fixedChoice(YES_NO, yes ? 0 : 1) }],
      hints: [`Write $${a}^{${n}}$ as $${repeated(a, n)}$.`, yes ? 'A power is a product of its base, many times.' : `Does the prime $${d}$ appear in any of the factors?`],
      solution: yes
        ? [`$${a}^{${n}} = ${repeated(a, n)}$`, `$${a}$ is one of the factors, so $${a}^{${n}}$ is divisible by $${a}$. A power is always divisible by its base.`, 'Yes.']
        : [`$${a}^{${n}} = ${repeated(a, n)}$`, `${a === 6 ? '$6 = 2 \\times 3$ and ' : a === 10 ? '$10 = 2 \\times 5$ and ' : ''}$${d}$ is not a factor of $${a}$, so it is not a prime factor of $${a}^{${n}}$.`, 'No.'],
    };
  }
  const { x, y, g } = commonPair(rng, [6, 4, 8, 9, 10, 12, 15]);
  const commons = divisors(g).filter((c) => c > 1);
  const right = rng.pick(commons);
  const onlyOne = [...divisors(x), ...divisors(y)].filter((c) => !divides(c, g) && c > 1 && c !== right);
  const wrong = rng.sample([...new Set(onlyOne)], 3);
  return {
    prompt: `$${x} = ${timesList(x)}$ and $${y} = ${timesList(y)}$. Which number is a factor of both $${x}$ and $${y}$?`,
    parts: [{ answer: mc(rng, `$${right}$`, wrong.map((w) => `$${w}$`)) }],
    hints: ['A common factor is made from prime factors that appear in BOTH lists.', `Which primes appear in both $${timesList(x)}$ and $${timesList(y)}$?`],
    solution: [`Both lists contain $${timesList(g)}$.`, `So the common factors are made from $${timesList(g)}$: $${listTex(commons)}$ (and $1$).`, `$${right}$ is a factor of both.`],
  };
}

/** Two numbers with greatest common factor g, from coprime cofactors. */
function commonPair(rng: Rng, gs: number[]): { x: number; y: number; g: number } {
  return retry(
    () => {
      const g = rng.pick(gs);
      const [m1, m2] = rng.sample([2, 3, 4, 5, 7, 9, 11], 2);
      return { g, x: g * Math.min(m1, m2), y: g * Math.max(m1, m2) };
    },
    (o) => gcd(o.x, o.y) === o.g && o.y <= 150,
  );
}

function cfD2(rng: Rng): Out {
  const kind = rng.pick(['list', 'gcf'] as const);
  const { x, y, g } = commonPair(rng, kind === 'list' ? [4, 6, 8, 9, 10, 12, 14, 15, 18] : [6, 8, 10, 12, 14, 15, 18, 20, 24]);
  const commons = divisors(g);
  if (kind === 'list') {
    return {
      prompt: `$${x} = ${timesList(x)}$ and $${y} = ${timesList(y)}$. List all the common factors of $${x}$ and $${y}$. Separate them with commas.`,
      parts: [{ answer: { kind: 'numbers', values: commons } }],
      hints: ['Find the prime factors that are in both lists. Multiply them to get the greatest common factor.', 'Every factor of the greatest common factor is a common factor. Do not forget $1$.'],
      solution: [`The prime factors in both lists are $${timesList(g)}$.`, `Their product is $${g}$, the greatest common factor.`, `The factors of $${g}$ are $${listTex(commons)}$.`, `The common factors of $${x}$ and $${y}$ are $${listTex(commons)}$.`],
    };
  }
  return {
    prompt: `$${x} = ${powerTex(x)}$ and $${y} = ${powerTex(y)}$. What is the greatest common factor of $${x}$ and $${y}$?`,
    parts: [intPart(g)],
    hints: ['Write each number as a list of primes. Find the primes that are in both lists.', 'Multiply the shared primes. Use each shared prime as many times as it appears in BOTH lists.'],
    solution: [`$${x} = ${timesList(x)}$ and $${y} = ${timesList(y)}$.`, `They share $${timesList(g)}$.`, `$${timesList(g)} = ${g}$`, `The greatest common factor is $${g}$.`],
  };
}

function cfD3(rng: Rng): Out {
  const kind = rng.pick(['composite', 'select', 'product'] as const);
  if (kind === 'composite') {
    const n = rng.pick(DIV_POOL);
    const m = primeFactorMap(n);
    const yes = rng.chance(0.5);
    const cands = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 25, 27, 30, 35].filter((c) => divides(c, n) === yes && [...primeFactorMap(c).keys()].some((p) => m.has(p)));
    if (!cands.length) return cfD1(rng);
    const c = rng.pick(cands);
    const cm = primeFactorMap(c);
    const short = [...cm].find(([p, e]) => (m.get(p) ?? 0) < e);
    return {
      prompt: `A number is $${powerTex(n)}$. Without finding the number, decide: is it divisible by $${c}$?`,
      parts: [{ answer: fixedChoice(YES_NO, yes ? 0 : 1) }],
      hints: [`Write $${c}$ as a product of primes: $${timesList(c)}$.`, `The number is divisible by $${c}$ only if all of those primes are in its prime factorization, repeats included.`],
      solution: yes
        ? [`$${c} = ${timesList(c)}$`, `$${powerTex(n)}$ contains $${timesList(c)}$, with factors to spare.`, `So the number is $${c}$ times the leftover factors. Yes, it is divisible by $${c}$.`]
        : [
            `$${c} = ${timesList(c)}$`,
            short && m.has(short[0])
              ? `$${c}$ needs $${short[0]}$ as a factor $${short[1]}$ times, but $${powerTex(n)}$ has it only $${m.get(short[0])}$ ${m.get(short[0]) === 1 ? 'time' : 'times'}.`
              : `$${c}$ needs the prime $${short?.[0]}$, which is not in $${powerTex(n)}$.`,
            `No, it is not divisible by $${c}$.`,
          ],
    };
  }
  if (kind === 'select') {
    const n = rng.pick(DIV_POOL.filter((x) => x <= 300));
    const ds = divisors(n).filter((v) => v > 3 && v < n);
    const nonDs = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 27, 28, 30, 33, 35].filter((v) => !divides(v, n));
    const k = rng.int(2, 3);
    const yes = rng.sample(ds, Math.min(k, ds.length));
    const no = rng.sample(nonDs, 5 - yes.length);
    const options = [...yes.map((v) => ({ md: `$${v}$`, correct: true })), ...no.map((v) => ({ md: `$${v}$`, correct: false }))];
    return {
      prompt: `Which of these numbers are factors of $${powerTex(n)}$? Select all that apply.`,
      parts: [{ answer: multi(rng, options) }],
      hints: ['Write each choice as a product of primes.', `A choice is a factor if all its primes (with repeats) are in $${timesList(n)}$.`],
      solution: [
        `$${powerTex(n)} = ${timesList(n)}$`,
        ...yes.map((v) => (isPrime(v) ? `$${v}$ is one of the prime factors, so $${v}$ is a factor.` : `$${v} = ${timesList(v)}$, and these primes are all in the list, so $${v}$ is a factor.`)),
        ...no.map((v) => `$${v} = ${timesList(v)}$, and these primes are not all in the list, so $${v}$ is not a factor.`),
      ],
    };
  }
  // Is a × b divisible by c? Use the prime factors of both factors.
  const want = rng.chance(0.5);
  const { a, b, c, yes } = retry(
    () => {
      const a = rng.int(6, 25);
      const b = rng.int(6, 35);
      const c = rng.pick([4, 6, 9, 10, 12, 14, 15, 21, 25, 35, 18]);
      return { a, b, c, yes: (a * b) % c === 0 };
    },
    (o) => !isPrime(o.a) && !isPrime(o.b) && o.a !== o.b && o.a % o.c !== 0 && o.b % o.c !== 0 && o.yes === want,
    300,
  );
  return {
    prompt: `Without multiplying, decide: is $${a} \\times ${b}$ divisible by $${c}$?`,
    parts: [{ answer: fixedChoice(YES_NO, yes ? 0 : 1) }],
    hints: [`Write $${a}$ and $${b}$ as products of primes.`, `$${c} = ${timesList(c)}$. Are all of these primes (with repeats) in the product?`],
    solution: [
      `$${a} \\times ${b} = ${timesList(a)} \\times ${timesList(b)}$`,
      `$${c} = ${timesList(c)}$`,
      yes ? `All the prime factors of $${c}$ are in the product, so it is divisible by $${c}$. Yes.` : `The product does not contain all of $${timesList(c)}$, so it is not divisible by $${c}$. No.`,
      yes ? `(Check: $${a} \\times ${b} = ${a * b}$, and $${a * b} \\div ${c} = ${(a * b) / c}$.)` : `(Check: $${a} \\times ${b} = ${a * b}$, and $${a * b} \\div ${c}$ has a remainder.)`,
    ],
  };
}

const commonFactors = skill({
  id: 'm6-common-factors',
  name: 'Common factors and divisibility',
  description: 'Find common factors of two numbers from their prime factorizations, and decide divisibility from a prime factorization.',
  outcomes: ['N3'],
  lessonId: 'm6-3-3',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? cfD1(rng) : d === 2 ? cfD2(rng) : cfD3(rng);
  },
});

export const PRIMES_SKILLS: SkillDef[] = [primeFactorization, powers, commonFactors];
