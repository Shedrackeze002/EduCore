/** Unit 5 — Relations and Functions (R1, R2, R4, R8). */
import { byDifficulty, fixedChoice, mc, mcFigures, numPart, part, skill } from '../../helpers.ts';
import { fmt, frac, fracLatex } from '../../../math/numbers.ts';
import { coefX, lineFromSlopeIntercept, signedFracLatex, slopeInterceptLatex, slopeInterceptText } from '../../../math/linear.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, GridSpec, PlaneFigure, SkillDef } from '../../../types.ts';

const LABELS = ['A', 'B', 'C', 'D', 'E'];

// ---------------------------------------------------------------------------
// R1 — interpreting graphs
// ---------------------------------------------------------------------------

type SegKind = 'away-slow' | 'away-fast' | 'stop' | 'return';

function buildTrip(rng: Rng) {
  for (let tries = 0; tries < 200; tries++) {
    const kinds = rng.shuffle<SegKind>(['away-slow', 'away-fast', 'stop', 'return']);
    if (kinds[0] === 'return' || kinds[0] === 'stop') continue;
    const durations = kinds.map(() => rng.int(2, 6) * 2);
    const slow = rng.pick([40, 50, 60]);
    const fast = rng.pick([100, 120, 150]);
    const ys = [0];
    let ok = true;
    for (let i = 0; i < kinds.length; i++) {
      const y = ys[i];
      const t = durations[i];
      let next = y;
      if (kinds[i] === 'away-slow') next = y + slow * t;
      else if (kinds[i] === 'away-fast') next = y + fast * t;
      else if (kinds[i] === 'return') {
        const rate = rng.pick([70, 80, 90]);
        next = y - rate * t;
        if (next < 0) {
          // shorten the return so it ends at home
          next = 0;
        }
        if (y === 0) ok = false;
      }
      ys.push(next);
    }
    if (!ok) continue;
    const xs = [0];
    durations.forEach((t, i) => xs.push(xs[i] + t));
    const slopes = kinds.map((_, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
    const abs = slopes.map(Math.abs);
    if (new Set(abs.map((a) => a.toFixed(3))).size !== abs.length) continue;
    return { kinds, xs, ys, slopes };
  }
  throw new Error('trip');
}

function tripFigure(xs: number[], ys: number[]): PlaneFigure {
  const yMax = Math.ceil(Math.max(...ys) / 500) * 500 || 500;
  const xMax = Math.ceil(xs[xs.length - 1] / 4) * 4;
  return {
    type: 'plane',
    grid: { xMin: 0, xMax, yMin: 0, yMax, xStep: 4, yStep: yMax / 5, xLabel: 'Time (min)', yLabel: 'Distance from home (m)' },
    polylines: [{ points: xs.map((x, i) => [x, ys[i]] as [number, number]) }],
    segmentLabels: LABELS.slice(0, xs.length - 1),
  };
}

const interpretGraph = skill({
  id: 'r1-interpret-graph',
  name: 'Interpreting graphs',
  description: 'Describe what each part of a graph means in context (rate, stops, direction).',
  outcomes: ['R1'],
  lessonId: 'm10c-5-1',
  format: 'mc',
  gen(rng, d) {
    const { kinds, xs, ys, slopes } = buildTrip(rng);
    const fig = tripFigure(xs, ys);
    const segChoices = LABELS.slice(0, kinds.length).map((l) => `Segment ${l}`);
    const q = byDifficulty(d, rng.pick(['stop', 'return'] as const), rng.pick(['fastest', 'return', 'stop'] as const), rng.pick(['speed', 'distance'] as const));
    if (q === 'speed') {
      const i = rng.int(0, kinds.length - 1);
      const sp = Math.abs(slopes[i]);
      return {
        prompt: `The graph shows Nadia’s distance from home during a walk. What was her speed during segment ${LABELS[i]}, in metres per minute?`,
        figure: fig,
        parts: [numPart(sp, { suffix: 'm/min' })],
        hints: ['Speed = change in distance ÷ change in time for that segment.', 'Read the coordinates at the start and end of the segment.'],
        solution: [`Segment ${LABELS[i]}: from $(${xs[i]}, ${ys[i]})$ to $(${xs[i + 1]}, ${ys[i + 1]})$.`, `Speed $= \\dfrac{|${ys[i + 1]} - ${ys[i]}|}{${xs[i + 1]} - ${xs[i]}} = ${fmt(sp)}$ m/min${sp === 0 ? ' (she was stopped)' : ''}.`],
      };
    }
    if (q === 'distance') {
      const i = rng.int(1, kinds.length);
      return {
        prompt: `The graph shows Nadia’s distance from home during a walk. How far from home was she after $${xs[i]}$ minutes?`,
        figure: fig,
        parts: [numPart(ys[i], { suffix: 'm' })],
        hints: [`Find $${xs[i]}$ on the horizontal axis and read the height of the graph.`],
        solution: [`At $t = ${xs[i]}$ min the graph is at $${ys[i]}$ m.`],
      };
    }
    let idx = 0;
    let why = '';
    let question = '';
    if (q === 'stop') {
      idx = kinds.indexOf('stop');
      question = 'During which segment was Nadia stopped?';
      why = 'A horizontal segment means the distance from home did not change, so she was stopped.';
    } else if (q === 'return') {
      idx = kinds.indexOf('return');
      question = 'During which segment was Nadia walking toward home?';
      why = 'A segment that goes down means the distance from home is decreasing.';
    } else {
      const abs = slopes.map(Math.abs);
      idx = abs.indexOf(Math.max(...abs));
      question = 'During which segment was Nadia moving fastest?';
      why = 'The steepest segment has the greatest change in distance per minute.';
    }
    return {
      prompt: `The graph shows Nadia’s distance from home during a walk. ${question}`,
      figure: fig,
      parts: [{ answer: fixedChoice(segChoices, idx) }],
      hints: ['Horizontal means no change; up means moving away; down means moving toward home.', 'Steeper means faster.'],
      solution: [why, `So the answer is segment ${LABELS[idx]}.`],
    };
  },
});

const CONTEXTS = [
  {
    intro: 'A bathtub',
    y: 'Volume of water',
    events: [
      { text: 'fills at a steady rate', s: 2 },
      { text: 'stays at the same level while someone bathes', s: 0 },
      { text: 'drains quickly', s: -3 },
      { text: 'drains slowly', s: -1 },
      { text: 'fills slowly', s: 1 },
    ],
  },
  {
    intro: 'Sam',
    y: 'Distance from home',
    events: [
      { text: 'walks away from home', s: 1 },
      { text: 'jogs away from home', s: 3 },
      { text: 'stops to talk with a friend', s: 0 },
      { text: 'runs back home', s: -3 },
      { text: 'walks back toward home', s: -1 },
    ],
  },
  {
    intro: 'A plane',
    y: 'Altitude',
    events: [
      { text: 'climbs quickly after take-off', s: 3 },
      { text: 'cruises at a constant altitude', s: 0 },
      { text: 'descends slowly', s: -1 },
      { text: 'climbs gradually', s: 1 },
      { text: 'drops quickly', s: -3 },
    ],
  },
];

function shapeFigure(slopes: number[]): Figure {
  const raw: Array<[number, number]> = [[0, 0]];
  let y = 0;
  slopes.forEach((sl, i) => {
    y += sl * 2;
    raw.push([(i + 1) * 2, y]);
  });
  const minY = Math.min(...raw.map((p) => p[1]));
  const pts = raw.map(([x, yy]) => [x, yy - minY + 1] as [number, number]);
  const top = Math.max(10, Math.max(...pts.map((p) => p[1])) + 1);
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: slopes.length * 2, yMin: 0, yMax: top, xLabel: 'Time', yLabel: '' },
    polylines: [{ points: pts }],
    hideTickLabels: true,
  };
}

const matchSituation = skill({
  id: 'r1-match-situation',
  name: 'Matching graphs and situations',
  description: 'Choose or sketch the graph that represents a described situation.',
  outcomes: ['R1'],
  lessonId: 'm10c-5-1',
  format: 'mc',
  gen(rng, d) {
    const ctx = rng.pick(CONTEXTS);
    for (let tries = 0; tries < 100; tries++) {
      const events = rng.sample(ctx.events, d === 1 ? 2 : 3);
      if (ctx.y === 'Distance from home' && events[0].s < 0) continue;
      if (ctx.y === 'Volume of water' && events[0].s < 0) continue;
      const slopes = events.map((e) => e.s);
      const variants: number[][] = [slopes];
      variants.push(slopes.map((s) => -s));
      variants.push([...slopes].reverse());
      variants.push(slopes.map((s) => (s === 0 ? 1 : s > 0 ? 0 : s)));
      const mags = new Set(slopes.filter((x) => x !== 0).map(Math.abs));
      if (mags.size > 1) variants.push(slopes.map((x) => (Math.abs(x) === 3 ? Math.sign(x) : Math.abs(x) === 1 ? Math.sign(x) * 3 : x)));
      const uniq: number[][] = [];
      for (const v of variants) if (!uniq.some((u) => u.join() === v.join())) uniq.push(v);
      if (uniq.length < 4) continue;
      const opts = uniq.slice(0, 4).map((v, i) => ({ md: '', figure: shapeFigure(v), correct: i === 0 }));
      const answer = mcFigures(rng, opts);
      if (answer.kind === 'mc') answer.choices.forEach((c, i) => (c.md = `Graph ${i + 1}`));
      const story = `${ctx.intro} ${events.map((e) => e.text).join(', then ')}.`;
      return {
        prompt: `${story}\n\nWhich graph best shows **${ctx.y.toLowerCase()}** over time?`,
        parts: [{ answer }],
        hints: ['Break the story into parts. For each part decide: increasing, constant, or decreasing? Fast (steep) or slow (gentle)?'],
        solution: events.map((e) => `“${e.text}”: ${e.s > 0 ? (e.s > 1 ? 'steep increase' : 'gentle increase') : e.s < 0 ? (e.s < -1 ? 'steep decrease' : 'gentle decrease') : 'horizontal segment'}`),
      };
    }
    throw new Error('match');
  },
});

const DISCRETE = [
  { ctx: 'the number of concert tickets sold and the money collected', cont: false, why: 'You cannot sell part of a ticket, so only whole-number points make sense.' },
  { ctx: 'the temperature outside and the time of day', cont: true, why: 'Time and temperature change continuously, so every value between points is possible.' },
  { ctx: 'the number of people at a party and the number of pizzas ordered', cont: false, why: 'People and pizzas are counted in whole numbers.' },
  { ctx: 'the height of a growing plant and the number of days since planting', cont: true, why: 'The plant grows continuously, so heights between the data points are meaningful.' },
  { ctx: 'the number of bus passes bought and their total cost', cont: false, why: 'You can only buy a whole number of bus passes.' },
  { ctx: 'the distance a car travels and the amount of gas used', cont: true, why: 'Distance and gas can take any value in an interval.' },
  { ctx: 'the number of hours worked and the pay earned at an hourly rate (paid by the minute)', cont: true, why: 'Pay accumulates continuously with time worked.' },
  { ctx: 'the number of cars washed and the money raised at a car wash', cont: false, why: 'You cannot wash part of a car for the fundraiser.' },
];

const continuousDiscrete = skill({
  id: 'r1-continuous-discrete',
  name: 'Continuous and discrete data',
  description: 'Explain whether data points should be connected on a graph.',
  outcomes: ['R1'],
  lessonId: 'm10c-5-1',
  format: 'mc',
  gen(rng) {
    const c = rng.pick(DISCRETE);
    return {
      prompt: `A graph shows the relationship between ${c.ctx}. Should the data points be connected with a line?`,
      parts: [{ answer: fixedChoice(['Yes — the data is continuous', 'No — the data is discrete'], c.cont ? 0 : 1) }],
      hints: ['Ask: do values between the points make sense? Can the variable be a fraction?'],
      solution: [c.why, c.cont ? 'Connect the points (continuous data).' : 'Do not connect the points (discrete data).'],
    };
  },
});

// ---------------------------------------------------------------------------
// R2 — relations and functions
// ---------------------------------------------------------------------------

function pairsLatex(pairs: Array<[number | string, number | string]>): string {
  return `\\{${pairs.map(([a, b]) => `(${a}, ${b})`).join(', ')}\\}`;
}

const representRelation = skill({
  id: 'r2-represent-relation',
  name: 'Representing relations',
  description: 'Translate a relation between arrow diagrams, ordered pairs, tables and words.',
  outcomes: ['R2'],
  lessonId: 'm10c-5-2',
  format: 'mc',
  gen(rng, d) {
    const left = rng.sample([1, 2, 3, 4, 5, 6, 7], 4).sort((a, b) => a - b);
    const right = rng.sample([2, 4, 5, 6, 8, 9, 10, 12], 3).sort((a, b) => a - b);
    const arrows: Array<[number, number]> = left.map((_, i) => [i, rng.int(0, right.length - 1)]);
    if (d >= 2) arrows.push([rng.int(0, 3), rng.int(0, 2)]);
    const uniqueArrows = arrows.filter((a, i) => arrows.findIndex((b) => b[0] === a[0] && b[1] === a[1]) === i);
    const pairs = uniqueArrows.map(([i, j]) => [left[i], right[j]] as [number, number]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const correct = `$${pairsLatex(pairs)}$`;
    const swapped = `$${pairsLatex(pairs.map(([a, b]) => [b, a]))}$`;
    const dropped = `$${pairsLatex(pairs.slice(0, -1))}$`;
    const altered = `$${pairsLatex(pairs.map(([a, b], k) => (k === 0 ? [a, right.find((r) => r !== b) ?? b + 1] : [a, b])))}$`;
    const fig: Figure =
      d === 3
        ? { type: 'table', headers: ['$x$', '$y$'], rows: pairs.map(([a, b]) => [`${a}`, `${b}`]) }
        : { type: 'arrowDiagram', leftTitle: 'x', rightTitle: 'y', left: left.map(String), right: right.map(String), arrows: uniqueArrows };
    return {
      prompt: `Which set of ordered pairs represents the relation shown?`,
      figure: fig,
      parts: [{ answer: mc(rng, correct, [swapped, dropped, altered]) }],
      hints: ['Each arrow (or table row) gives one ordered pair (first element, second element).', 'The first element comes from the first set (x).'],
      solution: [`Reading every arrow from left to right gives ${correct}.`],
    };
  },
});

const IND_DEP = [
  { s: 'The cost of renting a canoe depends on the number of hours it is rented.', ind: 'number of hours', dep: 'cost' },
  { s: 'The distance a car travels depends on the time it has been driving.', ind: 'time driving', dep: 'distance travelled' },
  { s: 'The amount of paint needed depends on the area of the wall.', ind: 'area of the wall', dep: 'amount of paint' },
  { s: 'A student’s earnings depend on the number of lawns mowed.', ind: 'number of lawns mowed', dep: 'earnings' },
  { s: 'The temperature of a cup of tea decreases as time passes.', ind: 'time', dep: 'temperature of the tea' },
  { s: 'The height of a candle decreases as it burns for more minutes.', ind: 'minutes burned', dep: 'height of the candle' },
];

const independentDependent = skill({
  id: 'r4-independent-dependent',
  name: 'Independent and dependent variables',
  description: 'Identify the independent and dependent variables in a context.',
  outcomes: ['R4'],
  lessonId: 'm10c-5-2',
  format: 'mc',
  gen(rng) {
    const c = rng.pick(IND_DEP);
    const askInd = rng.chance(0.5);
    return {
      prompt: `${c.s}\n\nWhat is the **${askInd ? 'independent' : 'dependent'}** variable?`,
      parts: [{ answer: fixedChoice([`The ${c.ind}`, `The ${c.dep}`], askInd ? 0 : 1) }],
      hints: ['The dependent variable depends on the other one. The independent variable is the one you choose or that changes on its own.', 'The independent variable goes on the horizontal axis.'],
      solution: [`The ${c.dep} depends on the ${c.ind}.`, `Independent: ${c.ind}. Dependent: ${c.dep}.`],
    };
  },
});

const isFunctionPairs = skill({
  id: 'r2-is-function-pairs',
  name: 'Is it a function? (ordered pairs)',
  description: 'Decide whether a set of ordered pairs, a table or an arrow diagram represents a function.',
  outcomes: ['R2'],
  lessonId: 'm10c-5-3',
  format: 'mc',
  gen(rng, d) {
    const isFn = rng.chance(0.5);
    const xs = rng.sample([-3, -2, -1, 0, 1, 2, 3, 4, 5], 5);
    const pairs: Array<[number, number]> = xs.map((x) => [x, rng.int(-5, 9)]);
    if (!isFn) {
      const j = rng.int(1, pairs.length - 1);
      let y = rng.int(-5, 9);
      if (y === pairs[0][1]) y += 1;
      pairs[j] = [pairs[0][0], y];
    } else if (d >= 2) {
      // repeated y-values are fine in a function
      pairs[1] = [pairs[1][0], pairs[0][1]];
    }
    const shuffled = rng.shuffle(pairs);
    const rep = byDifficulty(d, 'set', 'table', 'arrows');
    const ls = [...new Set(shuffled.map((p) => p[0]))].sort((a, b) => a - b);
    const rs = [...new Set(shuffled.map((p) => p[1]))].sort((a, b) => a - b);
    const fig: Figure | undefined =
      rep === 'table'
        ? { type: 'table', headers: ['$x$', '$y$'], rows: shuffled.map(([a, b]) => [`${a}`, `${b}`]) }
        : rep === 'arrows'
          ? { type: 'arrowDiagram', leftTitle: 'Domain', rightTitle: 'Range', left: ls.map(String), right: rs.map(String), arrows: shuffled.map(([a, b]) => [ls.indexOf(a), rs.indexOf(b)]) }
          : undefined;
    const repeated = shuffled.find((p, i) => shuffled.findIndex((q) => q[0] === p[0]) !== i);
    return {
      prompt: rep === 'set' ? `Does the relation $${pairsLatex(shuffled)}$ represent a function?` : 'Does this relation represent a function?',
      figure: fig,
      parts: [{ answer: fixedChoice(['Yes, it is a function', 'No, it is not a function'], isFn ? 0 : 1) }],
      hints: ['A function pairs each element of the domain (each x) with exactly one element of the range.', 'Look for an x-value that appears with two different y-values.', 'It is fine for two different x-values to have the same y-value.'],
      solution: isFn
        ? ['Every x-value appears exactly once, so each x has exactly one y. It is a function.']
        : [`The x-value $${repeated?.[0]}$ is paired with two different y-values, so it is not a function.`],
    };
  },
});

function curvePoints(f: (x: number) => number, x0: number, x1: number, n = 40): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    pts.push([x, f(x)]);
  }
  return pts;
}

const G10: GridSpec = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };

function graphCase(rng: Rng): { fig: PlaneFigure; fn: boolean; why: string } {
  const k = rng.int(0, 7);
  switch (k) {
    case 0: {
      const m = rng.pick([-2, -1, 1, 2, 0.5]);
      const b = rng.int(-3, 3);
      return { fig: { type: 'plane', grid: G10, lines: [{ line: lineFromSlopeIntercept(frac(m * 2, 2), frac(b)) }] }, fn: true, why: 'Every vertical line crosses this line exactly once.' };
    }
    case 1: {
      const x = rng.int(-4, 4);
      return { fig: { type: 'plane', grid: G10, lines: [{ line: { A: 1, B: 0, C: -x } }] }, fn: false, why: 'The vertical line itself meets the graph at infinitely many points.' };
    }
    case 2: {
      const h = rng.int(-2, 2);
      const kk = rng.int(-4, 0);
      return { fig: { type: 'plane', grid: G10, polylines: [{ points: curvePoints((x) => (x - h) ** 2 + kk, h - 3, h + 3) }] }, fn: true, why: 'Each vertical line crosses the parabola at most once.' };
    }
    case 3: {
      const k2 = rng.int(-2, 2);
      const pts = curvePoints((y) => y, -2.4, 2.4).map(([t]) => [t * t - 3, t + k2] as [number, number]);
      return { fig: { type: 'plane', grid: G10, polylines: [{ points: pts }] }, fn: false, why: 'A vertical line to the right of the vertex crosses this curve twice.' };
    }
    case 4: {
      const r = rng.int(2, 4);
      const pts = curvePoints((t) => t, 0, 2 * Math.PI, 60).map(([t]) => [r * Math.cos(t), r * Math.sin(t)] as [number, number]);
      return { fig: { type: 'plane', grid: G10, polylines: [{ points: pts }] }, fn: false, why: 'A vertical line through the inside of the circle crosses it twice.' };
    }
    case 5: {
      const pts = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], 5).map((x) => ({ x, y: rng.int(-5, 5) }));
      return { fig: { type: 'plane', grid: G10, points: pts }, fn: true, why: 'No two points share the same x-coordinate.' };
    }
    case 6: {
      const xs = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], 4);
      const pts = xs.map((x) => ({ x, y: rng.int(-5, 5) }));
      pts.push({ x: xs[0], y: pts[0].y === 5 ? 3 : pts[0].y + 2 });
      return { fig: { type: 'plane', grid: G10, points: pts }, fn: false, why: `Two points have the same x-coordinate, $x = ${xs[0]}$.` };
    }
    default: {
      return { fig: { type: 'plane', grid: G10, polylines: [{ points: curvePoints((x) => Math.abs(x) - 2, -6, 6) }] }, fn: true, why: 'Each vertical line crosses this V-shaped graph exactly once.' };
    }
  }
}

const verticalLine = skill({
  id: 'r2-vertical-line',
  name: 'Vertical line test',
  description: 'Use the vertical line test to decide whether a graph represents a function.',
  outcomes: ['R2'],
  lessonId: 'm10c-5-3',
  format: 'mc',
  gen(rng) {
    const g = graphCase(rng);
    return {
      prompt: 'Does this graph represent a function?',
      figure: g.fig,
      parts: [{ answer: fixedChoice(['Yes, it is a function', 'No, it is not a function'], g.fn ? 0 : 1) }],
      hints: ['Imagine sliding a vertical line across the graph.', 'If any vertical line crosses the graph more than once, it is not a function.'],
      solution: [g.why, g.fn ? 'It passes the vertical line test: it is a function.' : 'It fails the vertical line test: it is not a function.'],
    };
  },
});

function setLatex(vals: number[]): string {
  return `\\{${[...new Set(vals)].sort((a, b) => a - b).join(', ')}\\}`;
}

const domainRangeSet = skill({
  id: 'r1-domain-range-set',
  name: 'Domain and range of discrete relations',
  description: 'State the domain and range of a set of ordered pairs, a table, or a discrete graph.',
  outcomes: ['R1', 'R2'],
  lessonId: 'm10c-5-3',
  format: 'mc',
  gen(rng, d) {
    const xs = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 4);
    const pairs: Array<[number, number]> = xs.map((x) => [x, rng.int(-4, 6)]);
    const ask = rng.pick(['domain', 'range'] as const);
    const D = setLatex(pairs.map((p) => p[0]));
    const R = setLatex(pairs.map((p) => p[1]));
    const correct = `$${ask === 'domain' ? D : R}$`;
    const wrong = [`$${ask === 'domain' ? R : D}$`, `$${setLatex([...pairs.map((p) => p[0]), ...pairs.map((p) => p[1])])}$`, `$\\{x \\mid ${Math.min(...xs)} \\le x \\le ${Math.max(...xs)},\\ x \\in \\mathbb{R}\\}$`];
    const fig: Figure | undefined =
      d === 1
        ? undefined
        : d === 2
          ? { type: 'table', headers: ['$x$', '$y$'], rows: pairs.map(([a, b]) => [`${a}`, `${b}`]) }
          : { type: 'plane', grid: G10, points: pairs.map(([x, y]) => ({ x, y })) };
    return {
      prompt: d === 1 ? `What is the **${ask}** of $${pairsLatex(pairs)}$?` : `What is the **${ask}** of the relation shown?`,
      figure: fig,
      parts: [{ answer: mc(rng, correct, wrong) }],
      hints: ['The domain is the set of first coordinates (x-values). The range is the set of second coordinates (y-values).', 'List each value once, in order. The points are not connected, so the domain is not an interval.'],
      solution: [`Domain: $${D}$`, `Range: $${R}$`],
    };
  },
});

function intervalLatex(lo: number | null, hi: number | null, loClosed: boolean, hiClosed: boolean, v = 'x'): { interval: string; setb: string } {
  const L = lo === null ? '(-\\infty' : `${loClosed ? '[' : '('}${lo}`;
  const H = hi === null ? '\\infty)' : `${hi}${hiClosed ? ']' : ')'}`;
  const parts: string[] = [];
  if (lo !== null) parts.push(`${lo} ${loClosed ? '\\le' : '<'}`);
  parts.push(v);
  if (hi !== null) parts.push(`${hiClosed ? '\\le' : '<'} ${hi}`);
  const cond = lo === null && hi === null ? `${v} \\in \\mathbb{R}` : `${parts.join(' ')},\\ ${v} \\in \\mathbb{R}`;
  return { interval: `${L}, ${H}`, setb: `\\{${v} \\mid ${cond}\\}` };
}

const domainRangeGraph = skill({
  id: 'r1-domain-range-graph',
  name: 'Domain and range of continuous graphs',
  description: 'State the domain and range of a graph using set notation and interval notation.',
  outcomes: ['R1'],
  lessonId: 'm10c-5-3',
  format: 'mc',
  gen(rng, d) {
    const x1 = rng.int(-5, 0);
    const x2 = rng.int(1, 5);
    let y1 = rng.int(-5, 5);
    let y2 = rng.int(-5, 5);
    if (y1 === y2) y2 = y1 + 2 > 5 ? y1 - 2 : y1 + 2;
    const openStart = d >= 2 && rng.chance(0.5);
    const closedEnd = !(d >= 2 && rng.chance(0.5));
    const arrowEnd = d === 3 && rng.chance(0.5);
    const ask = rng.pick(['domain', 'range'] as const);
    const fig: PlaneFigure = {
      type: 'plane',
      grid: G10,
      segments: [{ from: [x1, y1], to: [x2, y2], openStart, closedStart: !openStart, closedEnd: closedEnd && !arrowEnd, openEnd: !closedEnd && !arrowEnd, arrowEnd }],
    };
    if (arrowEnd) {
      // extend to the edge of the grid
      const m = (y2 - y1) / (x2 - x1);
      fig.segments![0].to = [6, y1 + m * (6 - x1)];
    }
    type Spec = { lo: number | null; hi: number | null; loC: boolean; hiC: boolean; v: string };
    const xSpec: Spec = { lo: x1, hi: arrowEnd ? null : x2, loC: !openStart, hiC: closedEnd, v: 'x' };
    const inc = y2 > y1;
    const ySpec: Spec = arrowEnd
      ? inc
        ? { lo: y1, hi: null, loC: !openStart, hiC: false, v: 'y' }
        : { lo: null, hi: y1, loC: false, hiC: !openStart, v: 'y' }
      : inc
        ? { lo: y1, hi: y2, loC: !openStart, hiC: closedEnd, v: 'y' }
        : { lo: y2, hi: y1, loC: closedEnd, hiC: !openStart, v: 'y' };
    const spec = ask === 'domain' ? xSpec : ySpec;
    const other = ask === 'domain' ? ySpec : xSpec;
    const useInterval = rng.chance(0.5);
    const show = (sp: Spec, v = sp.v) => {
      const r = intervalLatex(sp.lo, sp.hi, sp.loC, sp.hiC, v);
      return `$${useInterval ? r.interval : r.setb}$`;
    };
    const res = intervalLatex(spec.lo, spec.hi, spec.loC, spec.hiC, spec.v);
    const correct = show(spec);
    const wrong = [show({ ...spec, loC: !spec.loC, hiC: !spec.hiC }), show(other, spec.v), show({ lo: null, hi: null, loC: false, hiC: false, v: spec.v }), show({ ...spec, loC: !spec.loC })];
    return {
      prompt: `What is the **${ask}** of the graph?`,
      figure: fig,
      parts: [{ answer: mc(rng, correct, wrong) }],
      hints: [ask === 'domain' ? 'Domain: all the x-values the graph covers, from left to right.' : 'Range: all the y-values the graph covers, from bottom to top.', 'A closed dot is included (≤, square bracket); an open dot is not (<, round bracket). An arrow means the graph continues forever (∞).'],
      solution: [`Interval notation: $${res.interval}$`, `Set notation: $${res.setb}$`],
    };
  },
});

// ---------------------------------------------------------------------------
// R8 — function notation
// ---------------------------------------------------------------------------

function fnName(rng: Rng) {
  return rng.pick(['f', 'g', 'h']);
}

const convertNotation = skill({
  id: 'r8-convert-notation',
  name: 'Using function notation',
  description: 'Write linear relations in function notation and interpret f(a) = b as a point.',
  outcomes: ['R8'],
  lessonId: 'm10c-5-4',
  gen(rng, d) {
    const m = frac(rng.nonZero(-6, 6), d === 1 ? 1 : rng.pick([1, 1, 2, 3]));
    const b = frac(rng.int(-9, 9));
    const f = fnName(rng);
    if (d === 1) {
      return {
        prompt: `Write $${slopeInterceptLatex(m, b)}$ in function notation, using the function name $${f}$.`,
        parts: [part({ kind: 'equation-fn', expected: slopeInterceptText(m, b).replace('y = ', ''), variable: 'x', fnName: f }, { placeholder: `${f}(x) = ...` })],
        hints: [`Replace $y$ with $${f}(x)$, read “${f} of x”.`],
        solution: [`$${f}(x) = ${coefX(m)}${signedFracLatex(b)}$`],
        answerDisplay: `$${f}(x) = ${coefX(m)}${signedFracLatex(b)}$`,
      };
    }
    if (d === 2) {
      return {
        prompt: `Write $${f}(x) = ${coefX(m)}${signedFracLatex(b)}$ as an equation in two variables, $x$ and $y$.`,
        parts: [part({ kind: 'line', line: lineFromSlopeIntercept(m, b), form: 'slope-intercept' }, { placeholder: 'y = ...' })],
        hints: [`$${f}(x)$ is the output, which is $y$.`],
        solution: [`$${slopeInterceptLatex(m, b)}$`],
      };
    }
    const a = rng.int(-6, 6);
    const v = rng.int(-9, 9);
    return {
      prompt: `For a function $${f}$, $${f}(${a}) = ${v}$. Which point must be on the graph of $y = ${f}(x)$? Enter it as an ordered pair.`,
      parts: [part({ kind: 'point', x: a, y: v }, { placeholder: '(x, y)' })],
      hints: [`$${f}(${a})$ is the y-value when $x = ${a}$.`],
      solution: [`$${f}(${a}) = ${v}$ means when $x = ${a}$, $y = ${v}$: the point $(${a}, ${v})$.`],
    };
  },
});

const evaluateFn = skill({
  id: 'r8-evaluate',
  name: 'Evaluating functions',
  description: 'Determine the range value for a given domain value, e.g. f(−1) for f(x) = 3x − 2.',
  outcomes: ['R8'],
  lessonId: 'm10c-5-4',
  gen(rng, d) {
    const f = fnName(rng);
    const m = frac(rng.nonZero(-7, 7), d === 1 ? 1 : rng.pick([1, 2, 3, 4]));
    const b = frac(rng.int(-10, 10));
    const a = d === 1 ? rng.int(-5, 5) : rng.int(-8, 8) * m.d;
    const val = (m.n * a) / m.d + b.n;
    if (d === 3) {
      const a2 = rng.int(-5, 5) * m.d;
      const val2 = (m.n * a2) / m.d + b.n;
      return {
        prompt: `Given $${f}(x) = ${coefX(m)}${signedFracLatex(b)}$, determine $${f}(${a}) + ${f}(${a2})$.`,
        parts: [numPart(val + val2, { exact: false })],
        hints: ['Evaluate each function value separately, then add.'],
        solution: [`$${f}(${a}) = ${fmt(val)}$`, `$${f}(${a2}) = ${fmt(val2)}$`, `Sum $= ${fmt(val + val2)}$`],
      };
    }
    return {
      prompt: `Given $${f}(x) = ${coefX(m)}${signedFracLatex(b)}$, determine $${f}(${a})$.`,
      parts: [numPart(val, { exact: false })],
      hints: [`Replace every $x$ with $(${a})$.`],
      solution: [`$${f}(${a}) = ${m.d === 1 ? m.n : fracLatex(m)}(${a})${signedFracLatex(b)} = ${fmt(val)}$`],
    };
  },
});

const solveForX = skill({
  id: 'r8-solve-for-x',
  name: 'Finding x from f(x)',
  description: 'Determine the domain value for a given range value, e.g. find t so that g(t) = 15.',
  outcomes: ['R8'],
  lessonId: 'm10c-5-4',
  gen(rng, d) {
    const f = fnName(rng);
    const v = d === 1 ? 'x' : rng.pick(['x', 't', 'n']);
    const m = rng.nonZero(-6, 6);
    const b = rng.int(-10, 10);
    const x = d === 3 ? frac(rng.int(-12, 12), rng.pick([2, 3, 4])) : frac(rng.int(-8, 8));
    const target = fracAdd1(frac(m * x.n, x.d), b);
    const tTex = fracLatex(target);
    return {
      prompt: `Given $${f}(${v}) = ${m === 1 ? '' : m === -1 ? '-' : m}${v} ${b < 0 ? '-' : '+'} ${Math.abs(b)}$, determine $${v}$ so that $${f}(${v}) = ${tTex}$.`,
      parts: [numPart(x.n / x.d, { label: `$${v} =$`, exact: false })],
      hints: [`Set the expression equal to $${tTex}$ and solve for $${v}$.`],
      solution: [`$${m === 1 ? '' : m === -1 ? '-' : m}${v} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${tTex}$`, `$${m === 1 ? '' : m === -1 ? '-' : m}${v} = ${fracLatex(fracAdd1(target, -b))}$`, `$${v} = ${fracLatex(x)}$`],
    };
  },
});

function fracAdd1(a: { n: number; d: number }, k: number) {
  return frac(a.n + k * a.d, a.d);
}

const fromGraph = skill({
  id: 'r8-from-graph',
  name: 'Function values from a graph',
  description: 'Read function values and solve f(x) = k using a graph.',
  outcomes: ['R8'],
  lessonId: 'm10c-5-4',
  gen(rng, d) {
    const m = frac(rng.nonZero(-3, 3), rng.pick([1, 1, 2]));
    const b = frac(rng.int(-4, 4));
    const f = fnName(rng);
    const xs = [-6, -4, -2, 0, 2, 4, 6].filter((x) => Math.abs((m.n * x) / m.d + b.n) <= 6 && Number.isInteger((m.n * x) / m.d));
    const a = rng.pick(xs.length ? xs : [0]);
    const y = (m.n * a) / m.d + b.n;
    const fig: PlaneFigure = { type: 'plane', grid: G10, lines: [{ line: lineFromSlopeIntercept(m, b), label: `y = ${f}(x)` }] };
    if (d === 1) {
      return {
        prompt: `Use the graph of $y = ${f}(x)$ to determine $${f}(${a})$.`,
        figure: fig,
        parts: [numPart(y, { exact: false })],
        hints: [`Go to $x = ${a}$ on the x-axis, then move up or down to the line.`],
        solution: [`At $x = ${a}$ the line passes through $y = ${y}$, so $${f}(${a}) = ${y}$.`],
      };
    }
    return {
      prompt: `Use the graph of $y = ${f}(x)$ to determine the value of $x$ for which $${f}(x) = ${y}$.`,
      figure: fig,
      parts: [numPart(a, { label: '$x =$', exact: false })],
      hints: [`Go to $y = ${y}$ on the y-axis, move across to the line, then read the x-value.`],
      solution: [`The line reaches $y = ${y}$ at $x = ${a}$.`],
    };
  },
});

export const RELATION_SKILLS: SkillDef[] = [
  interpretGraph,
  matchSituation,
  continuousDiscrete,
  representRelation,
  independentDependent,
  isFunctionPairs,
  verticalLine,
  domainRangeSet,
  domainRangeGraph,
  convertNotation,
  evaluateFn,
  solveForX,
  fromGraph,
];
