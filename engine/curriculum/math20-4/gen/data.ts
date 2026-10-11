/** Math 20-4 Unit 9 — Data and Probability (SP1, SP2). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };
type Lvl = Difficulty;

/** A number inside maths (thousands grouped). */
const num = (x: number, dp = 4) => fmtGroupTex(x, dp);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const lower = (c: string) => c.toLowerCase();

function group(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** Money in prose, always with cents: \$12.50. Never inside $...$. */
const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** Whole dollars print without cents (\$60), otherwise \$59.50. */
const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)))}` : money(x));
/** A money amount inside maths, without a dollar sign. */
const mv = (x: number) => (isWhole(x) ? num(Math.round(x)) : group(fmtFixed(x, 2)).replace(/,/g, '{,}'));
/** Money answer graded to the cent. */
const moneyPart = (v: number): Part => numPart(v, { decimals: 2, tolerance: 0.011, label: '\\$' });

const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const asc = (a: number[]) => [...a].sort((p, q) => p - q);
function median(a: number[]): number {
  const s = asc(a);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}
/** True when v sits too close to a rounding boundary at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
/** "= 12.5" when exact to `dp` places, otherwise "\approx 12.4567". */
function eq(v: number, dp = 4): string {
  return Math.abs(roundTo(v, dp) - v) < 1e-9 ? `= ${num(v, dp)}` : `\\approx ${num(v, dp)}`;
}
const plus = (a: number[]) => a.map((x) => num(x)).join(' + ');
const listTex = (a: number[]) => `$${a.map((x) => num(x)).join(',\\ \\ ')}$`;
const fr = (n: number, d: number) => `\\frac{${n}}{${d}}`;
/** Percents that add to 100: `k` parts, each a multiple of `unit` and at least `min`, all different. */
function percents(rng: Rng, k: number, unit: number, min: number): number[] {
  return retry(
    () => {
      const slots = 100 / unit - 1;
      const cuts = rng.sample([...Array(slots).keys()].map((i) => (i + 1) * unit), k - 1).sort((a, b) => a - b);
      return [...cuts, 100].map((c, i) => c - (i ? cuts[i - 1] : 0));
    },
    (ps) => ps.every((p) => p >= min) && new Set(ps).size === ps.length,
    400,
  );
}
/** A percent answer: exact when it is, otherwise to the nearest whole percent. */
function pctPart(p: number): Part {
  return isWhole(p) ? numPart(p, { suffix: '%' }) : numPart(p, { decimals: 0, suffix: '%' });
}
const pctText = (p: number) => (isWhole(p) ? `$${num(p)}\\%$` : `about $${fmtFixed(p, 0)}\\%$`);

// ---------------------------------------------------------------------------
// 9.1 Displaying data: line graphs, circle graphs and percents
// ---------------------------------------------------------------------------

interface LineCtx {
  intro: (name: string) => string;
  xs: number[];
  xStep: number;
  xLabel: string;
  yLabel: string;
  /** Grid step; values sit on a grid line (d1) or halfway between two (d2+). */
  yStep: number;
  yTop: number;
  shape: 'walk' | 'up' | 'hill';
  money?: boolean;
  unit: string;
  /** "in week 3", "at the end of month 4" */
  when: (x: number) => string;
  /** "How many iced coffees did the café sell" */
  ask: string;
  /** "weekly sales", "the balance" */
  what: string;
  /** "per week" */
  per: string;
}

const LINES: LineCtx[] = [
  {
    intro: () => 'The line graph shows how many iced coffees a café in Red Deer sold each week this summer.',
    xs: [1, 2, 3, 4, 5, 6, 7, 8], xStep: 1, xLabel: 'Week', yLabel: 'Iced coffees sold',
    yStep: 20, yTop: 200, shape: 'walk', unit: 'coffees',
    when: (x) => `in week ${x}`, ask: 'How many iced coffees did the café sell', what: 'weekly sales', per: 'per week',
  },
  {
    intro: (name) => `The line graph shows ${name}’s savings account balance at the end of each month.`,
    xs: [1, 2, 3, 4, 5, 6], xStep: 1, xLabel: 'Month', yLabel: 'Balance ($)',
    yStep: 200, yTop: 2000, shape: 'up', money: true, unit: '',
    when: (x) => `at the end of month ${x}`, ask: 'What was the balance', what: 'the balance', per: 'per month',
  },
  {
    intro: () => 'The line graph shows the temperature in Lethbridge on a summer day. The hours use the 24-hour clock.',
    xs: [6, 8, 10, 12, 14, 16, 18], xStep: 2, xLabel: 'Hour of the day', yLabel: 'Temperature (°C)',
    yStep: 4, yTop: 36, shape: 'hill', unit: '°C',
    when: (x) => `at ${x}:00`, ask: 'What was the temperature', what: 'the temperature', per: 'per hour',
  },
  {
    intro: () => 'The line graph shows how many members a gym in Fort McMurray had at the start of each year.',
    xs: [2019, 2020, 2021, 2022, 2023, 2024, 2025], xStep: 1, xLabel: 'Year', yLabel: 'Members',
    yStep: 100, yTop: 1000, shape: 'walk', unit: 'members',
    when: (x) => `in ${x}`, ask: 'How many members did the gym have', what: 'the number of members', per: 'per year',
  },
  {
    intro: (name) => `${name} measured a sunflower plant at the end of each week. The line graph shows its height.`,
    xs: [1, 2, 3, 4, 5, 6, 7, 8], xStep: 1, xLabel: 'Week', yLabel: 'Height (cm)',
    yStep: 20, yTop: 200, shape: 'up', unit: 'cm',
    when: (x) => `at the end of week ${x}`, ask: 'How tall was the sunflower', what: 'the height', per: 'per week',
  },
  {
    intro: () => 'The line graph shows how many customers came into a coffee shop in Medicine Hat each hour on Saturday morning.',
    xs: [7, 8, 9, 10, 11, 12, 13, 14], xStep: 1, xLabel: 'Hour of the day', yLabel: 'Customers',
    yStep: 10, yTop: 70, shape: 'hill', unit: 'customers',
    when: (x) => `in the hour starting at ${x}:00`, ask: 'How many customers came in', what: 'the number of customers', per: 'per hour',
  },
];

function lineValues(rng: Rng, ctx: LineCtx, d: Lvl): number[] {
  const unit = d === 1 ? ctx.yStep : ctx.yStep / 2;
  const lo = ctx.yStep;
  const hi = ctx.yTop - ctx.yStep;
  const n = ctx.xs.length;
  const clamp = (v: number) => Math.max(lo, Math.min(hi, v));
  const steps = Math.round((hi - lo) / unit);
  return retry(
    () => {
      const out: number[] = [];
      if (ctx.shape === 'up') {
        let v = lo + unit * rng.int(0, 2);
        for (let i = 0; i < n; i++) {
          out.push(clamp(v));
          v += unit * rng.int(0, Math.max(1, Math.floor(steps / (n - 1)) + 1));
        }
      } else if (ctx.shape === 'hill') {
        const peak = rng.int(Math.floor(n / 2) - 1, Math.floor(n / 2) + 1);
        let v = lo + ctx.yStep * rng.int(1, 3);
        for (let i = 0; i < n; i++) {
          out.push(clamp(v));
          v += (i < peak ? 1 : -1) * unit * rng.int(1, Math.max(2, Math.floor(steps / n) + 1));
        }
      } else {
        let v = lo + unit * rng.int(1, steps - 1);
        for (let i = 0; i < n; i++) {
          out.push(clamp(v));
          v += unit * rng.int(-3, 3);
        }
      }
      return out;
    },
    (vs) => new Set(vs).size >= n - 2 && (d === 1 || vs.some((v) => v % ctx.yStep !== 0)),
    300,
  );
}

function lineFigure(ctx: LineCtx, values: number[]): PlaneFigure {
  const pts = ctx.xs.map((x, i) => [x, values[i]] as [number, number]);
  return {
    type: 'plane',
    grid: { xMin: ctx.xs[0], xMax: ctx.xs[ctx.xs.length - 1], yMin: 0, yMax: ctx.yTop, xStep: ctx.xStep, yStep: ctx.yStep, xLabel: ctx.xLabel, yLabel: ctx.yLabel },
    polylines: [{ points: pts }],
    points: pts.map(([x, y]) => ({ x, y })),
  };
}

const lineVal = (ctx: LineCtx, v: number) => (ctx.money ? tag(v) : ctx.unit === '°C' ? `$${num(v)}^\\circ\\text{C}$` : `$${num(v)}$ ${ctx.unit}`);
const linePart = (ctx: LineCtx, v: number, decimals?: number): Part =>
  ctx.money ? (decimals === undefined ? numPart(v, { label: '\\$' }) : moneyPart(v)) : numPart(v, { suffix: ctx.unit, decimals });

function lineItem(rng: Rng, d: Lvl, name: string): Out {
  const ctx = rng.pick(LINES);
  const values = lineValues(rng, ctx, d);
  const figure = lineFigure(ctx, values);
  const n = ctx.xs.length;
  const READ = 'Find the time on the bottom axis. Go straight up to the line, then straight across to the scale on the left.';
  const HALF = 'A point halfway between two grid lines is halfway between their numbers.';
  if (d === 1) {
    const i = rng.int(0, n - 1);
    return {
      prompt: `${ctx.intro(name)} ${ctx.ask} ${ctx.when(ctx.xs[i])}?`,
      figure,
      parts: [linePart(ctx, values[i])],
      hints: [READ, `The grid lines on the left go up by $${num(ctx.yStep)}$.`],
      solution: [`Find ${ctx.xs[i]} on the bottom axis (${ctx.xLabel.toLowerCase()}).`, `The point above it is level with $${num(values[i])}$ on the left scale.`, `The answer is ${lineVal(ctx, values[i])}.`],
    };
  }
  if (d === 2) {
    const [i, j] = retry(() => rng.sample([...Array(n).keys()], 2).sort((a, b) => a - b), ([a, b]) => values[a] !== values[b]);
    const up = values[j] > values[i];
    const diff = Math.abs(values[j] - values[i]);
    return {
      prompt: `${ctx.intro(name)} By how much did ${ctx.what} ${up ? 'go up' : 'go down'} from ${ctx.when(ctx.xs[i]).replace(/^(in|at) /, '')} to ${ctx.when(ctx.xs[j]).replace(/^(in|at) /, '')}?`,
      figure,
      parts: [linePart(ctx, diff)],
      hints: [READ, `Read both points, then subtract the smaller value from the larger one. ${HALF}`],
      solution: [
        `${ctx.when(ctx.xs[i]).replace(/^./, (c) => c.toUpperCase())}: $${num(values[i])}$`,
        `${ctx.when(ctx.xs[j]).replace(/^./, (c) => c.toUpperCase())}: $${num(values[j])}$`,
        `Change: $${num(Math.max(values[i], values[j]))} - ${num(Math.min(values[i], values[j]))} = ${num(diff)}$`,
        `${ctx.what.replace(/^./, (c) => c.toUpperCase())} went ${up ? 'up' : 'down'} by ${lineVal(ctx, diff)}.`,
      ],
    };
  }
  // d3: greatest one-step increase, or average change per step.
  const incs = values.slice(1).map((v, k) => v - values[k]);
  const best = Math.max(...incs);
  if (best > 0 && incs.filter((x) => x === best).length === 1 && rng.chance(0.5)) {
    const k = incs.indexOf(best);
    const between = (a: number, b: number) => `${ctx.xLabel.toLowerCase()} ${a} to ${b}`;
    return {
      prompt: `${ctx.intro(name)} What was the greatest increase from one point on the graph to the next?`,
      figure,
      parts: [linePart(ctx, best)],
      hints: ['The steepest part of the line going up shows the greatest increase.', `Read the values at both ends of the steepest rising piece and subtract. ${HALF}`],
      solution: [
        `Read every point: ${values.map((v) => `$${num(v)}$`).join(', ')}.`,
        `The changes from one point to the next are ${incs.map((x) => `$${x > 0 ? '+' : ''}${num(x)}$`).join(', ')}.`,
        `The greatest increase is from ${between(ctx.xs[k], ctx.xs[k + 1])}: $${num(values[k + 1])} - ${num(values[k])} = ${num(best)}$`,
        `The greatest increase is ${lineVal(ctx, best)}.`,
      ],
    };
  }
  const first = values[0];
  const last = values[n - 1];
  const span = ctx.xs[n - 1] - ctx.xs[0];
  const rate = (last - first) / span;
  const exact = isWhole(rate * 10);
  if (!exact && onEdge(rate, 1)) return lineItem(rng.fork('again'), d, name);
  const unitWord = ctx.per.replace('per ', '');
  return {
    prompt: `${ctx.intro(name)} From ${ctx.when(ctx.xs[0]).replace(/^(in|at) /, '')} to ${ctx.when(ctx.xs[n - 1]).replace(/^(in|at) /, '')}, what was the average change ${ctx.per}?${exact ? '' : ' Round to the nearest tenth.'}${rate < 0 ? ' Use a negative number for a decrease.' : ''}`,
    figure,
    parts: [linePart(ctx, rate, exact ? undefined : 1)],
    hints: ['Find the total change: last value minus first value.', `Divide the total change by the number of ${unitWord}s between the first and last points.`],
    solution: [
      `First value: $${num(first)}$. Last value: $${num(last)}$.`,
      `Total change: $${num(last)} - ${num(first)} = ${num(last - first)}$`,
      `Number of ${unitWord}s: $${ctx.xs[n - 1]} - ${ctx.xs[0]} = ${span}$`,
      `Average change: $${num(last - first)} \\div ${span} ${eq(rate)}$`,
      `The average change is ${exact ? '' : 'about '}${ctx.money ? (rate < 0 ? `−${tag(-rate)}` : tag(rate)) : `$${exact ? num(rate) : fmtFixed(rate, 1)}$ ${ctx.unit === '°C' ? '°C' : ctx.unit}`} ${ctx.per}.`,
    ],
  };
}

interface PieCtx {
  intro: (name: string, total: number) => string;
  /** Listed from the usual largest share to the usual smallest. */
  cats: string[];
  /** Largest realistic share. */
  top: number;
  t1: number[];
  t2: number[];
  money?: boolean;
  unit: string;
  ask: (c: string) => string;
  more: (a: string, b: string) => string;
  /** Difficulty 3 extra: a whole year (budget) or "not" (survey). */
  year?: (c: string) => string;
  not?: (c: string) => string;
}

const PIES: PieCtx[] = [
  {
    intro: (name, t) => `${name} takes home ${tag(t)} a month. The circle graph shows ${name}’s monthly budget.`,
    cats: ['Rent', 'Food', 'Transport', 'Savings', 'Other', 'Phone'],
    top: 50,
    t1: [2000, 3000, 4000], t2: [2400, 2650, 2850, 3150, 3300, 3450], money: true, unit: '',
    ask: (c) => `How much is budgeted for ${lower(c)} each month?`,
    more: (a, b) => `How much more is budgeted for ${lower(a)} than for ${lower(b)} each month?`,
    year: (c) => `How much is budgeted for ${lower(c)} in a whole year?`,
  },
  {
    intro: (_n, t) => `A café in Calgary took in ${tag(t)} on Saturday. The circle graph shows the sales for each kind of item.`,
    cats: ['Coffee', 'Sandwiches', 'Baked goods', 'Smoothies', 'Tea'],
    top: 60,
    t1: [1000, 1500, 2000], t2: [1850, 2240, 2460, 2750], money: true, unit: '',
    ask: (c) => `How much money came from ${lower(c)}?`,
    more: (a, b) => `How much more money came from ${lower(a)} than from ${lower(b)}?`,
    not: (c) => `How much of the money did **not** come from ${lower(c)}?`,
  },
  {
    intro: (_n, t) => `A grocery store in Red Deer asked $${num(t)}$ shoppers how they like to pay. The circle graph shows the results.`,
    cats: ['Debit', 'Credit', 'Phone', 'Cash', 'Gift card'],
    top: 60,
    t1: [200, 400, 500], t2: [250, 350, 450, 650], unit: 'shoppers',
    ask: (c) => `How many shoppers chose ${lower(c)}?`,
    more: (a, b) => `How many more shoppers chose ${lower(a)} than ${lower(b)}?`,
    not: (c) => `How many shoppers did **not** choose ${lower(c)}?`,
  },
  {
    intro: (_n, t) => `A farm near Lethbridge has $${num(t)}$ hectares of land. The circle graph shows how the land is used.`,
    cats: ['Wheat', 'Canola', 'Barley', 'Pasture', 'Peas'],
    top: 60,
    t1: [400, 500, 800], t2: [640, 720, 960, 1250], unit: 'ha',
    ask: (c) => `How many hectares are used for ${lower(c)}?`,
    more: (a, b) => `How many more hectares are used for ${lower(a)} than for ${lower(b)}?`,
    not: (c) => `How many hectares are **not** used for ${lower(c)}?`,
  },
];

const PCT_OF = 'To find a percent of an amount, change the percent to a decimal and multiply.';
const amt = (ctx: PieCtx, v: number) => (ctx.money ? tag(v) : `$${num(v)}$ ${ctx.unit === 'ha' ? 'hectares' : ctx.unit}`);
const amtPart = (ctx: PieCtx, v: number): Part => (ctx.money ? (isWhole(v) ? numPart(v, { label: '\\$' }) : moneyPart(v)) : numPart(v, { suffix: ctx.unit }));
const pctOf = (p: number, t: number) => `$${p}\\% \\times ${num(t)} = ${num(p / 100)} \\times ${num(t)} = ${num((p * t) / 100)}$`;

function pieItem(rng: Rng, d: Lvl, name: string): Out {
  const ctx = rng.pick(PIES);
  const k = d === 1 ? rng.int(3, 4) : rng.int(4, Math.min(5, ctx.cats.length));
  // Keep the usual order: the first listed category gets the largest share.
  const cats = rng.sample(ctx.cats.slice(1), k - 1).concat(ctx.cats[0]).sort((a, b) => ctx.cats.indexOf(a) - ctx.cats.indexOf(b));
  const total = rng.pick(d === 1 ? ctx.t1 : ctx.t2);
  // Counts and hectares must be whole numbers.
  const pcts = retry(
    () => percents(rng, k, d === 1 ? 5 : 1, d === 1 ? 10 : 5).sort((a, b) => b - a),
    (ps) => ps[0] <= ctx.top && (ctx.money || ps.every((p) => isWhole((p * total) / 100))),
    400,
  );
  const figure: Figure = { type: 'circleGraph', slices: cats.map((c, i) => ({ label: c, value: pcts[i] })), show: 'percent' };
  const intro = ctx.intro(name, total);
  const val = (i: number) => (pcts[i] * total) / 100;
  if (d < 3) {
    const i = rng.int(0, k - 1);
    return {
      prompt: `${intro} ${ctx.ask(cats[i])}`,
      figure,
      parts: [amtPart(ctx, val(i))],
      hints: [`Find the percent for ${cats[i]} in the legend. The whole circle is ${amt(ctx, total)}.`, PCT_OF],
      solution: [`${cats[i]} is $${pcts[i]}\\%$ of ${amt(ctx, total)}.`, pctOf(pcts[i], total), `The answer is ${amt(ctx, val(i))}.`],
    };
  }
  const mode = rng.pick(['more', ctx.year ? 'year' : 'not'] as const);
  if (mode === 'more') {
    const [i, j] = retry(() => rng.sample([...Array(k).keys()], 2), ([a, b]) => pcts[a] > pcts[b]);
    const diff = val(i) - val(j);
    return {
      prompt: `${intro} ${ctx.more(cats[i], cats[j])}`,
      figure,
      parts: [amtPart(ctx, diff)],
      hints: [PCT_OF, `Find both amounts, then subtract. Or subtract the percents first: $${pcts[i]}\\% - ${pcts[j]}\\%$.`],
      solution: [`${cats[i]}: ${pctOf(pcts[i], total)}`, `${cats[j]}: ${pctOf(pcts[j], total)}`, `Subtract: $${num(val(i))} - ${num(val(j))} = ${num(diff)}$`, `The difference is ${amt(ctx, diff)}.`],
    };
  }
  const i = rng.int(0, k - 1);
  if (mode === 'year') {
    const y = val(i) * 12;
    return {
      prompt: `${intro} ${ctx.year!(cats[i])}`,
      figure,
      parts: [amtPart(ctx, y)],
      hints: ['First find the amount for one month.', 'There are $12$ months in a year, so multiply by $12$.'],
      solution: [`One month: ${pctOf(pcts[i], total)}`, `One year: $${mv(val(i))} \\times 12 = ${mv(y)}$`, `The answer is ${amt(ctx, y)}.`],
    };
  }
  const notPct = 100 - pcts[i];
  const v = (notPct * total) / 100;
  return {
    prompt: `${intro} ${ctx.not!(cats[i])}`,
    figure,
    parts: [amtPart(ctx, v)],
    hints: [`The whole circle is $100\\%$. Find the percent that is not ${lower(cats[i])} first.`, PCT_OF],
    solution: [`Not ${lower(cats[i])}: $100\\% - ${pcts[i]}\\% = ${notPct}\\%$`, pctOf(notPct, total), `The answer is ${amt(ctx, v)}.`],
  };
}

const ANGLE_CTX: Array<{ intro: string; head: string; cats: string[]; pct: (c: string) => string }> = [
  { intro: 'A staff survey at a hotel in Jasper asked workers which shift they like best.', head: 'Shift', cats: ['Day', 'Evening', 'Night', 'Split'], pct: (c) => `What percent of the workers chose the ${lower(c)} shift?` },
  { intro: 'A pizza shop in Grande Prairie counted the pizzas it sold one evening.', head: 'Size', cats: ['Small', 'Medium', 'Large', 'Party'], pct: (c) => `What percent of the pizzas sold were ${lower(c)} size?` },
  { intro: 'A car wash in Edmonton counted the washes it sold on Saturday.', head: 'Wash', cats: ['Basic', 'Deluxe', 'Premium', 'Interior'], pct: (c) => `What percent of the washes were ${lower(c)} washes?` },
  {
    intro: 'A school in Red Deer asked students how they get to school.', head: 'Travel', cats: ['Bus', 'Car', 'Walk', 'Bike', 'Other'],
    pct: (c) => `What percent of the students ${({ Bus: 'take the bus', Car: 'come by car', Walk: 'walk', Bike: 'ride a bike', Other: 'chose “Other”' } as Record<string, string>)[c]}?`,
  },
];

function angleItem(rng: Rng, d: Lvl): Out {
  const ctx = rng.pick(ANGLE_CTX);
  const k = Math.min(rng.int(3, 4), ctx.cats.length);
  const cats = ctx.cats.slice(0, k);
  const hints = ['A full circle has $360^\\circ$.', 'The slice angle is the same part of $360^\\circ$ as the category is of the whole.'];
  if (d === 2) {
    const pcts = percents(rng, k, 5, 10);
    const i = rng.int(0, k - 1);
    const ang = (pcts[i] * 360) / 100;
    return {
      prompt: `${ctx.intro} The table shows the results as percents. To draw a circle graph, how many degrees should the ${lower(cats[i])} slice be?`,
      figure: { type: 'table', headers: [ctx.head, 'Percent'], rows: cats.map((c, j) => [c, `${pcts[j]}%`]) },
      parts: [numPart(ang, { suffix: '°' })],
      hints,
      solution: [`${cats[i]} is $${pcts[i]}\\%$ of the circle.`, `$${pcts[i]}\\%$ of $360^\\circ$: $${num(pcts[i] / 100)} \\times 360 = ${num(ang)}$`, `The ${lower(cats[i])} slice should be $${num(ang)}^\\circ$.`],
    };
  }
  const total = rng.pick([36, 40, 60, 72, 90, 120, 180]);
  const counts = retry(
    () => {
      const cuts = rng.sample([...Array(total - 1).keys()].map((x) => x + 1), k - 1).sort((a, b) => a - b);
      return [...cuts, total].map((c, j) => c - (j ? cuts[j - 1] : 0));
    },
    (cs) => cs.every((c) => c >= total / 12 && c <= total / 2) && new Set(cs).size === cs.length,
    300,
  );
  const i = rng.int(0, k - 1);
  const ang = (counts[i] * 360) / total;
  return {
    prompt: `${ctx.intro} The table shows the counts. To draw a circle graph, how many degrees should the ${lower(cats[i])} slice be?`,
    figure: { type: 'table', headers: [ctx.head, 'Count'], rows: cats.map((c, j) => [c, String(counts[j])]) },
    parts: [numPart(ang, { suffix: '°' })],
    hints: ['First add the counts to find the total.', 'Slice angle $= \\dfrac{\\text{count}}{\\text{total}} \\times 360^\\circ$'],
    solution: [`Total: $${plus(counts)} = ${total}$`, `${cats[i]}: $${fr(counts[i], total)} \\times 360 = ${num(ang)}$`, `The ${lower(cats[i])} slice should be $${num(ang)}^\\circ$.`],
  };
}

const COUNT_CTX: Array<{ whole: (t: number) => string; part: string; q: string }> = [
  { whole: (t) => `A food truck served $${t}$ customers at lunch.`, part: 'paid with cash', q: 'What percent of the customers paid with cash?' },
  { whole: (t) => `A hiring manager in Calgary got $${t}$ job applications.`, part: 'came from people with a Class 5 driver’s licence', q: 'What percent of the applications came from people with a driver’s licence?' },
  { whole: (t) => `A hotel in Banff had $${t}$ rooms booked last night.`, part: 'were booked online', q: 'What percent of the rooms were booked online?' },
  { whole: (t) => `A warehouse shipped $${t}$ orders on Monday.`, part: 'went to addresses in Edmonton', q: 'What percent of the orders went to Edmonton?' },
  { whole: (t) => `A landscaping company in Lethbridge has $${t}$ regular customers.`, part: 'want weekly mowing', q: 'What percent of the customers want weekly mowing?' },
];

function percentCountItem(rng: Rng, d: Lvl): Out {
  if (d === 1) {
    const ctx = rng.pick(COUNT_CTX);
    const t = rng.pick([20, 25, 40, 50, 200]);
    const c = retry(() => rng.int(Math.ceil(t * 0.1), Math.floor(t * 0.9)), (x) => isWhole((x * 100) / t));
    const p = (c * 100) / t;
    return {
      prompt: `${ctx.whole(t)} Of these, $${c}$ ${ctx.part}. ${ctx.q}`,
      parts: [pctPart(p)],
      hints: ['Write the part over the whole as a fraction.', 'Divide, then multiply by $100$ to get a percent.'],
      solution: [`Fraction: $${fr(c, t)}$`, `Divide: $${c} \\div ${t} = ${num(c / t)}$`, `Multiply by $100$: $${num(c / t)} \\times 100 = ${num(p)}\\%$`, `The answer is $${num(p)}\\%$.`],
    };
  }
  if (d === 2) {
    const ctx = rng.pick(ANGLE_CTX);
    const k = Math.min(rng.int(3, 4), ctx.cats.length);
    const cats = ctx.cats.slice(0, k);
    const { counts, i } = retry(
      () => {
        const counts = cats.map(() => rng.int(8, 60));
        return { counts, i: rng.int(0, k - 1) };
      },
      (o) => new Set(o.counts).size === k && !onEdge((o.counts[o.i] * 100) / sum(o.counts), 0),
      300,
    );
    const t = sum(counts);
    const p = (counts[i] * 100) / t;
    return {
      prompt: `${ctx.intro} The table shows the counts. ${ctx.pct(cats[i])}${isWhole(p) ? '' : ' Round to the nearest whole percent.'}`,
      figure: { type: 'table', headers: [ctx.head, 'Count'], rows: cats.map((c, j) => [c, String(counts[j])]) },
      parts: [pctPart(p)],
      hints: ['First add all the counts to find the total.', 'Percent $= \\dfrac{\\text{part}}{\\text{total}} \\times 100$'],
      solution: [`Total: $${plus(counts)} = ${t}$`, `$${fr(counts[i], t)} \\times 100 ${eq(p)}$`, `The answer is ${pctText(p)}.`],
    };
  }
  // d3: percent of a bar graph's total.
  const ctx = rng.pick([
    { intro: 'The bar graph shows how many cars a car wash in Edmonton washed each day last week.', cats: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], label: 'Cars washed', cl: 'Day', what: (c: string) => `What percent of the week’s cars were washed on ${({ Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' } as Record<string, string>)[c]}?` },
    { intro: 'The bar graph shows the number of each kind of pizza a shop in Grande Prairie sold on Friday.', cats: ['Cheese', 'Pepperoni', 'Hawaiian', 'Veggie', 'Meat'], label: 'Pizzas sold', cl: 'Pizza', what: (c: string) => `What percent of the pizzas sold were ${c === 'Hawaiian' ? 'Hawaiian' : lower(c)}?` },
    { intro: 'The bar graph shows how many hours each employee at a hardware store in Medicine Hat worked last week.', cats: ['Ava', 'Ben', 'Chen', 'Dina', 'Eli', 'Femi'], label: 'Hours worked', cl: 'Employee', what: (c: string) => `What percent of all the hours did ${c} work?` },
  ]);
  const step = 10;
  const n = ctx.cats.length;
  const [lo, hi] = ctx.label === 'Hours worked' ? [3, 9] : [2, 11];
  const { vs, i } = retry(
    () => ({ vs: ctx.cats.map(() => 5 * rng.int(lo, hi)), i: rng.int(0, n - 1) }),
    (o) => !onEdge((o.vs[o.i] * 100) / sum(o.vs), 0) && o.vs.some((v) => v % 10 !== 0),
    300,
  );
  const t = sum(vs);
  const p = (vs[i] * 100) / t;
  const max = (Math.floor(Math.max(...vs) / step) + 1) * step;
  return {
    prompt: `${ctx.intro} ${ctx.what(ctx.cats[i])}${isWhole(p) ? '' : ' Round to the nearest whole percent.'}`,
    figure: { type: 'barChart', categories: ctx.cats, values: vs, valueLabel: ctx.label, categoryLabel: ctx.cl, max, step },
    parts: [pctPart(p)],
    hints: ['Read every bar and add them to find the total.', 'Percent $= \\dfrac{\\text{one bar}}{\\text{total}} \\times 100$'],
    solution: [`Read the bars: ${ctx.cats.map((c, j) => `${c} $${vs[j]}$`).join(', ')}.`, `Total: $${plus(vs)} = ${t}$`, `$${fr(vs[i], t)} \\times 100 ${eq(p)}$`, `The answer is ${pctText(p)}.`],
  };
}

const displayData = skill({
  id: 'm204-display-data',
  name: 'Reading and making graphs',
  description: 'Read line graphs and circle graphs, find an amount from a circle-graph percent, find a percent from counts, and find the angle for a circle-graph slice.',
  outcomes: ['SP1'],
  lessonId: 'm204-9-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const kind = d === 1
      ? rng.pick(['line', 'pie', 'count'] as const)
      : rng.weighted([['line', 3], ['pie', 3], ['count', 2], ['angle', 2]] as const);
    if (kind === 'line') return lineItem(rng, d, name);
    if (kind === 'pie') return pieItem(rng, d, name);
    if (kind === 'angle') return angleItem(rng, d);
    return percentCountItem(rng, d);
  },
});

export const DATA_SKILLS: SkillDef[] = [displayData];
