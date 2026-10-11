/** Math 20-3 Unit 3 — Volume and Capacity (M2, A1): prisms, cylinders, pyramids, cones, spheres, capacity, applied problems and rearranging formulas. */
import { numPart, retry, roundingPhrase, skill } from '../../helpers.ts';
import { fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { PlaneFigure, SkillDef } from '../../../types.ts';
import { NAMES, TOWNS, UNIT, cap, cash, cylFig, endViewFig, exact, len, moneyPart, n, nearHalf, nf, notWhole, r3, rPart, tag, tx, xPart } from './surfacearea.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

const cu = (u: string) => `\\text{${u}}^3`;
/** Exact volume, e.g. $1250\ \text{cm}^3$. */
const vol = (x: number, u: string) => `$${n(x)}\\ ${cu(u)}$`;
/** Rounded volume with exactly `dec` decimals. */
const volR = (x: number, u: string, dec: number) => `$${nf(x, dec)}\\ ${cu(u)}$`;
/** Capacity such as $45.6\ \text{L}$ (exact) or rounded to `dec` places. */
const capX = (x: number, u: string) => `$${n(x)}\\ \\text{${u}}$`;
const capR = (x: number, u: string, dec: number) => `$${nf(x, dec)}\\ \\text{${u}}$`;
/** Prices per litre are written to a tenth of a cent, as at the pump: \$1.479 */
const perLitre = (p: number) => `\\$${fmtFixed(p, 3)}`;

/** "to the nearest tenth of a cubic metre", "to the nearest cubic foot". */
function cuRound(dec: number, u: string): string {
  const w = `cubic ${UNIT[u].one}`;
  return dec === 0 ? `to the nearest ${w}` : `${roundingPhrase(dec)} of a ${w}`;
}
const CAP_WORD: Record<string, string> = { L: 'litre', mL: 'millilitre', gal: 'gallon' };
/** "to the nearest litre", "to the nearest tenth of a litre". */
function capRound(dec: number, u: string): string {
  return dec === 0 ? `to the nearest ${CAP_WORD[u]}` : `${roundingPhrase(dec)} of a ${CAP_WORD[u]}`;
}
const cuSuffix = (u: string) => `${u}³`;

/** Imperial gallons in one cubic foot (rounded; always stated in the question). */
const GAL_PER_FT3 = 6.229;
const GAL_FACT = `$1\\ \\text{ft}^3 \\approx 6.229$ imperial gallons`;

/** π-multiple coefficient for display (up to 6 decimals so it is never cut short). */
const k6 = (x: number) => n(exact(x), 6);
/** "16\pi", or just "\pi" when the coefficient is 1. */
const piK = (x: number) => (exact(x) === 1 ? '\\pi' : `${k6(x)}\\pi`);
/** True when x has at most 3 decimal places, so a π-multiple such as 2.25π reads cleanly. */
const shortDec = (x: number) => Math.abs(exact(x) * 1000 - Math.round(exact(x) * 1000)) < 1e-6;
/** " = 16\pi" for a clean coefficient; otherwise nothing, and the working goes straight to the decimal. */
const eqPi = (x: number) => (shortDec(x) ? ` = ${piK(x)}` : '');
/** Inches as feet: a decimal when it ends (0.75), otherwise a fraction (\tfrac{8}{12}). */
const inFt = (inches: number) => (((inches * 1000) / 12) % 1 === 0 ? n(inches / 12) : `\\tfrac{${inches}}{12}`);

/** Side view of a pool with a sloping floor (a trapezoid), drawn schematically on a blank canvas. */
function poolSideFig(L: number, a: number, b: number, caption: string): PlaneFigure {
  const x0 = 1.6;
  const x1 = 8.4;
  const top = 5.2;
  const deep = 3.6;
  const ya = top - (deep * a) / b;
  const yb = top - deep;
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 10, yMin: 0, yMax: 6.2, step: 10 },
    hideTickLabels: true,
    polylines: [{ points: [[x0, top], [x1, top], [x1, r3(yb)], [x0, r3(ya)], [x0, top]], color: 'brand' }],
    points: [tag(4.4, top + 0.3, `${n(L)} m`), tag(0.1, (top + ya) / 2 - 0.35, `${n(a)} m`), tag(x1 + 0.25, (top + yb) / 2 - 0.35, `${n(b)} m`)],
    caption,
  };
}

// ---------------------------------------------------------------------------
// Lesson 3.1 — Prisms
// ---------------------------------------------------------------------------

const volPrism = skill({
  id: 'm203-vol-prism',
  name: 'Volume of prisms',
  description: 'Find the volume of rectangular and triangular prisms, and the capacity of rectangular containers in litres.',
  outcomes: ['M2', 'A1'],
  lessonId: 'm203-3-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.25)) {
        const c = rng.pick([
          { thing: 'cube-shaped storage box', u: 'cm', lo: 20, hi: 60 },
          { thing: 'cube-shaped block of ice for a carving contest', u: 'in', lo: 12, hi: 30 },
          { thing: 'cube-shaped wooden crate', u: 'ft', lo: 2, hi: 6 },
          { thing: 'cube-shaped concrete block', u: 'cm', lo: 10, hi: 40 },
        ]);
        const s = rng.int(c.lo, c.hi);
        const V = s ** 3;
        return {
          prompt: `A ${c.thing} has edges that are ${len(s, c.u)} long. What is its volume?`,
          figure: { type: 'solid', shape: 'cube', labels: { l: `${s} ${c.u}` } },
          parts: [xPart(V, cuSuffix(c.u))],
          hints: ['All the edges of a cube are the same length, so the length, width and height are equal.', '$V = s \\times s \\times s = s^3$'],
          solution: [`$V = s^3 = ${s} \\times ${s} \\times ${s}$`, `$= ${n(V)}\\ ${cu(c.u)}$`, `The volume is ${vol(V, c.u)}.`],
        };
      }
      const c = rng.pick([
        { lead: 'A closed cardboard shipping box is', u: 'cm', l: [30, 60], w: [20, 40], h: [15, 40], hw: 'high', ask: 'What is its volume?' },
        { lead: 'A wooden storage crate is', u: 'ft', l: [3, 8], w: [2, 5], h: [2, 4], hw: 'high', ask: 'What is its volume?' },
        { lead: 'A steel job-site toolbox is', u: 'in', l: [24, 48], w: [12, 24], h: [12, 24], hw: 'high', ask: 'What is its volume?' },
        { lead: 'The inside of a chest freezer is', u: 'cm', l: [16, 28], w: [10, 14], h: [12, 17], hw: 'deep', ask: 'What is the volume of the space inside?', step: 5 },
        { lead: 'A raised garden bed is', u: 'ft', l: [4, 12], w: [2, 4], h: [1, 2], hw: 'deep', ask: 'What volume of soil fills it to the top?' },
        { lead: 'A rectangular sandbox is', u: 'ft', l: [5, 10], w: [4, 8], h: [1, 2], hw: 'deep', ask: 'What volume of sand fills it to the top?' },
      ]);
      const k = ('step' in c && c.step) || 1;
      const [l, w, h] = retry(() => [k * rng.int(c.l[0], c.l[1]), k * rng.int(c.w[0], c.w[1]), k * rng.int(c.h[0], c.h[1])], ([x, y]) => x > y);
      const V = l * w * h;
      return {
        prompt: `${c.lead} ${len(l, c.u)} long, ${len(w, c.u)} wide and ${len(h, c.u)} ${c.hw}. ${c.ask}`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${l} ${c.u}`, w: `${w} ${c.u}`, h: `${h} ${c.u}` } },
        parts: [xPart(V, cuSuffix(c.u))],
        hints: ['Volume = area of the base × height. The base is a rectangle.', '$V = lwh$'],
        solution: [`Area of the base: $${l} \\times ${w} = ${n(l * w)}\\ ${tx(c.u)}^2$`, `$V = ${n(l * w)} \\times ${h} = ${n(V)}\\ ${cu(c.u)}$`, `The volume is ${vol(V, c.u)}.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['tri', 'capacity', 'decimal'] as const);
      if (mode === 'tri') {
        if (rng.chance(0.4)) {
          const c = rng.pick([
            { thing: 'A rubber wheel chock', u: 'cm', a: [8, 14], b: [12, 20], L: [12, 25] },
            { thing: 'A wooden door wedge', u: 'cm', a: [2, 4], b: [10, 15], L: [3, 6] },
            { thing: 'A foam safety wedge for a gym', u: 'in', a: [8, 16], b: [24, 48], L: [24, 36] },
            { thing: 'A solid concrete ramp for a curb', u: 'in', a: [4, 7], b: [18, 30], L: [36, 48] },
          ]);
          const a = rng.int(c.a[0], c.a[1]);
          const b = rng.int(c.b[0], c.b[1]);
          const L = rng.int(c.L[0], c.L[1]);
          const T = exact((a * b) / 2);
          const V = exact(T * L);
          return {
            prompt: `${c.thing} is a right triangular prism. Each triangular end has legs of ${len(a, c.u)} (upright) and ${len(b, c.u)} (along the ground), and the prism is ${len(L, c.u)} wide. What is its volume?`,
            figure: { type: 'solid', shape: 'triPrism', labels: { a: `${a} ${c.u}`, b: `${b} ${c.u}`, l: `${L} ${c.u}` } },
            parts: [xPart(V, cuSuffix(c.u))],
            hints: ['For any prism, volume = area of the triangular end × the distance between the ends.', 'Triangle area: $\\tfrac12 \\times$ base $\\times$ height, using the two legs.'],
            solution: [`Area of the triangular end: $\\tfrac12 \\times ${a} \\times ${b} = ${n(T)}\\ ${tx(c.u)}^2$`, `$V = ${n(T)} \\times ${L} = ${n(V)}\\ ${cu(c.u)}$`, `The volume is ${vol(V, c.u)}.`],
          };
        }
        const c = rng.pick([
          { lead: `${name} is setting up an A-frame tent.`, u: 'ft', b: [6, 10], h: [4, 7], L: [7, 12], ask: 'What is the volume of the space inside the tent?' },
          { lead: `An HVAC technician needs the volume of an attic to size a vent fan.`, u: 'ft', b: [24, 36], h: [6, 10], L: [30, 50], ask: 'The attic is a triangular prism. What is its volume?' },
          { lead: `A chocolate bar comes in a triangular box.`, u: 'cm', b: [4, 8], h: [3, 7], L: [15, 30], ask: 'What is the volume of the box?' },
          { lead: `A small A-frame chicken coop is a triangular prism.`, u: 'ft', b: [4, 6], h: [3, 5], L: [5, 8], ask: 'What is the volume of the space inside?' },
        ]);
        const b = rng.int(c.b[0], c.b[1]);
        const h = rng.int(c.h[0], c.h[1]);
        const L = rng.int(c.L[0], c.L[1]);
        const T = exact((b * h) / 2);
        const V = exact(T * L);
        return {
          prompt: `${c.lead} Each triangular end has a base of ${len(b, c.u)} and a height of ${len(h, c.u)}, and it is ${len(L, c.u)} long. ${c.ask}`,
          figure: endViewFig(b, h, { b: `${b} ${c.u}`, h: `${h} ${c.u}`, s: '' }, `End view; the prism is ${L} ${c.u} long`),
          parts: [xPart(V, cuSuffix(c.u))],
          hints: ['The end of the prism is a triangle. Volume = area of the end × length.', 'Triangle area: $\\tfrac12 \\times b \\times h$.'],
          solution: [`Area of the triangular end: $\\tfrac12 \\times ${b} \\times ${h} = ${n(T)}\\ ${tx(c.u)}^2$`, `$V = ${n(T)} \\times ${L} = ${n(V)}\\ ${cu(c.u)}$`, `The volume is ${vol(V, c.u)}.`],
        };
      }
      if (mode === 'capacity') {
        const c = rng.pick([
          { lead: 'The inside of a glass aquarium is', l: [60, 120], w: [30, 45], h: [35, 50] },
          { lead: 'The inside of a camping cooler is', l: [40, 70], w: [25, 40], h: [25, 40] },
          { lead: 'A rectangular kitchen sink basin is', l: [40, 55], w: [35, 45], h: [18, 25] },
          { lead: 'The inside of a plastic storage tote is', l: [50, 70], w: [35, 45], h: [25, 35] },
          { lead: 'The inside of a steel parts-washer tub is', l: [60, 90], w: [40, 55], h: [20, 30] },
        ]);
        const [l, w, h] = retry(() => [rng.int(c.l[0], c.l[1]), rng.int(c.w[0], c.w[1]), rng.int(c.h[0], c.h[1])], ([x, y, z]) => x > y && (x * y * z) % 10 === 0);
        const V = l * w * h;
        const Lt = exact(V / 1000);
        return {
          prompt: `${c.lead} ${len(l, 'cm')} long, ${len(w, 'cm')} wide and ${len(h, 'cm')} deep. What is its volume in cubic centimetres, and how many litres does it hold when full? Use $1000\\ \\text{cm}^3 = 1\\ \\text{L}$.`,
          figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${l} cm`, w: `${w} cm`, h: `${h} cm` } },
          parts: [xPart(V, 'cm³', 'Volume'), xPart(Lt, 'L', 'Capacity')],
          hints: ['$V = lwh$ gives the volume in cubic centimetres.', 'Each litre is $1000\\ \\text{cm}^3$, so divide by 1000.'],
          solution: [`$V = ${l} \\times ${w} \\times ${h} = ${n(V)}\\ \\text{cm}^3$`, `Capacity: $${n(V)} \\div 1000 = ${n(Lt)}\\ \\text{L}$`, `The volume is ${vol(V, 'cm')}, so it holds ${capX(Lt, 'L')}.`],
        };
      }
      const metric = rng.chance(0.5);
      const c = metric
        ? rng.pick([
            { lead: 'A roll-off waste bin is', u: 'm', hw: 'high', ask: 'What is its volume?' },
            { lead: 'The box of a dump truck is', u: 'm', hw: 'deep', ask: 'What volume of gravel fills it level to the top?' },
            { lead: 'A steel storage container is', u: 'm', hw: 'high', ask: 'What is the volume inside?' },
          ])
        : rng.pick([
            { lead: 'The box of a utility trailer is', u: 'ft', hw: 'deep', ask: 'What volume of mulch fills it level to the top?' },
            { lead: 'A pickup truck box is', u: 'ft', hw: 'deep', ask: 'What volume of firewood fills it level to the top?' },
            { lead: 'A wooden grain-sample bin is', u: 'ft', hw: 'deep', ask: 'What is its volume?' },
          ]);
      const [l, w, h] = metric
        ? [rng.int(35, 60) / 10, rng.int(20, 24) / 10, rng.int(10, 18) / 10]
        : retry(() => [rng.int(12, 20) / 2, rng.int(8, 12) / 2, rng.int(3, 5) / 2], ([x, y, z]) => x > y && [x, y, z].some((v) => v % 1 !== 0));
      const base = exact(l * w);
      const V = exact(base * h);
      return {
        prompt: `${c.lead} ${len(l, c.u)} long, ${len(w, c.u)} wide and ${len(h, c.u)} ${c.hw}. ${c.ask}`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${n(l)} ${c.u}`, w: `${n(w)} ${c.u}`, h: `${n(h)} ${c.u}` } },
        parts: [xPart(V, cuSuffix(c.u))],
        hints: ['Volume = area of the base × height.', '$V = lwh$. Keep all the decimals.'],
        solution: [`Area of the base: $${n(l)} \\times ${n(w)} = ${n(base)}\\ ${tx(c.u)}^2$`, `$V = ${n(base)} \\times ${n(h)} = ${n(V)}\\ ${cu(c.u)}$`, `The volume is ${vol(V, c.u)}.`],
      };
    }
    const mode = rng.pick(['pool', 'trough', 'garden'] as const);
    if (mode === 'pool') {
      const [L, W, a, b] = retry(() => [rng.int(8, 16), rng.int(4, 8), rng.int(9, 12) / 10, rng.int(18, 30) / 10], ([x, y]) => x > y);
      const side = exact(((a + b) / 2) * L);
      const V = exact(side * W);
      const Lt = exact(V * 1000);
      const town = rng.pick(TOWNS);
      return {
        prompt: `A community pool in ${town} is ${len(L, 'm')} long and ${len(W, 'm')} wide. The floor slopes evenly from ${len(a, 'm')} deep at the shallow end to ${len(b, 'm')} deep at the deep end. What is the volume of the pool, and how many litres of water fill it to the top? Use $1\\ \\text{m}^3 = 1000\\ \\text{L}$.`,
        figure: poolSideFig(L, a, b, `Side view (not to scale); the pool is ${W} m wide`),
        parts: [xPart(V, 'm³', 'Volume'), xPart(Lt, 'L', 'Capacity')],
        hints: ['The pool is a prism whose end is the trapezoid in the side view. Volume = area of the trapezoid × width.', 'Trapezoid area: $\\tfrac12(a + b) \\times$ length. Then multiply cubic metres by 1000 to get litres.'],
        solution: [
          `Side (trapezoid): $\\tfrac12(${n(a)} + ${n(b)}) \\times ${L} = ${n(exact((a + b) / 2))} \\times ${L} = ${n(side)}\\ \\text{m}^2$`,
          `Volume: $${n(side)} \\times ${W} = ${n(V)}\\ \\text{m}^3$`,
          `Capacity: $${n(V)} \\times 1000 = ${n(Lt)}\\ \\text{L}$`,
          `The pool has a volume of ${vol(V, 'm')} and holds ${capX(Lt, 'L')}.`,
        ],
      };
    }
    if (mode === 'trough') {
      const c = rng.pick([
        { thing: 'A galvanized water trough for cattle', what: 'water' },
        { thing: 'A plastic stock-watering tank for horses', what: 'water' },
        { thing: 'A steel rinse tank in a machine shop', what: 'cleaning solution' },
      ]);
      const L = rng.int(15, 30) / 10;
      const w = 5 * rng.int(10, 16);
      const h = 5 * rng.int(8, 12);
      const gap = rng.pick([5, 10, 15]);
      const Lcm = Math.round(L * 100);
      const depth = h - gap;
      const V = Lcm * w * depth;
      const Lt = exact(V / 1000);
      return {
        prompt: `${c.thing} is ${len(L, 'm')} long, ${len(w, 'cm')} wide and ${len(h, 'cm')} deep. ${name} fills it with ${c.what} to ${len(gap, 'cm')} below the rim. How many litres of ${c.what} are in it? Use $1000\\ \\text{cm}^3 = 1\\ \\text{L}$.`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${n(L)} m`, w: `${w} cm`, h: `${h} cm` } },
        parts: [xPart(Lt, 'L')],
        hints: ['Change the length to centimetres so all three measurements match. The liquid is not as deep as the tank.', 'Depth of liquid = depth of tank − gap. Then $V = lwh$ in $\\text{cm}^3$, and divide by 1000 for litres.'],
        solution: [
          `Length in centimetres: $${n(L)} \\times 100 = ${Lcm}\\ \\text{cm}$`,
          `Depth of ${c.what}: $${h} - ${gap} = ${depth}\\ \\text{cm}$`,
          `$V = ${Lcm} \\times ${w} \\times ${depth} = ${n(V)}\\ \\text{cm}^3$`,
          `In litres: $${n(V)} \\div 1000 = ${n(Lt)}\\ \\text{L}$`,
          `There are ${capX(Lt, 'L')} of ${c.what} in it.`,
        ],
      };
    }
    const bag = rng.pick([1.5, 2]);
    const [l, w, dIn] = retry(
      () => [rng.int(6, 12), rng.int(2, 4), rng.pick([8, 9, 10, 12, 15, 18])],
      ([x, y, z]) => (x * y * z) % 3 === 0 && notWhole((x * y * z) / 12 / bag),
    );
    const V = exact((l * w * dIn) / 12);
    const bags = Math.ceil(V / bag - 1e-9);
    return {
      prompt: `${name} is filling a raised garden bed that is ${len(l, 'ft')} long and ${len(w, 'ft')} wide with soil ${len(dIn, 'in')} deep. Bagged soil holds ${vol(bag, 'ft')} per bag. What volume of soil is needed, in cubic feet, and how many bags should ${name} buy? Use $12\\ \\text{in} = 1\\ \\text{ft}$.`,
      figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${l} ft`, w: `${w} ft`, h: `${dIn} in` } },
      parts: [xPart(V, 'ft³', 'Soil needed'), numPart(bags, { label: 'Bags', suffix: 'bags' })],
      hints: ['Change the depth to feet first, so every measurement is in feet.', '$V = lwh$. Then divide by the volume of one bag and round up: you cannot buy part of a bag.'],
      solution: [
        `Depth in feet: $${dIn}\\ \\text{in} = ${inFt(dIn)}\\ \\text{ft}$`,
        `$V = ${l} \\times ${w} \\times ${inFt(dIn)} = ${n(V)}\\ \\text{ft}^3$`,
        `Bags: $${n(V)} \\div ${n(bag)} ${shortDec(V / bag) ? `= ${n(V / bag)}` : `\\approx ${nf(V / bag, 2)}`}$, so round up to ${bags}.`,
        `${name} needs ${vol(V, 'ft')} of soil, so ${bags} bags.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.1 — Cylinders
// ---------------------------------------------------------------------------

/** One-line working for V = πr²h. */
function cylLine(r: number, h: number, V: number, u: string, dec = 2): string {
  return `$V = \\pi r^2 h = \\pi(${n(r)})^2(${n(h)})${eqPi(r * r * h)} \\approx ${nf(V, dec)}\\ ${cu(u)}$`;
}

const volCylinder = skill({
  id: 'm203-vol-cylinder',
  name: 'Volume of cylinders',
  description: 'Find the volume and capacity of cylinders, including pipes, hollow cylinders and imperial gallons.',
  outcomes: ['M2', 'A1'],
  lessonId: 'm203-3-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const c = rng.pick([
        { thing: 'A soup can', u: 'cm', r: [3, 5], h: [8, 12] },
        { thing: 'A cylindrical water tank', u: 'm', r: [1, 3], h: [2, 5] },
        { thing: 'A steel oil drum', u: 'cm', r: [28, 30], h: [84, 90] },
        { thing: 'A round hay bale', u: 'ft', r: [2, 3], h: [4, 5] },
        { thing: 'A pillar candle', u: 'cm', r: [3, 6], h: [8, 15] },
        { thing: 'A round cake pan', u: 'in', r: [4, 6], h: [2, 3] },
      ]);
      const [r, h] = retry(() => [rng.int(c.r[0], c.r[1]), rng.int(c.h[0], c.h[1])], ([x, y]) => !nearHalf(Math.PI * x * x * y, 1));
      const V = Math.PI * r * r * h;
      return {
        prompt: `${c.thing} has a radius of ${len(r, c.u)} and a height of ${len(h, c.u)}. What is its volume, ${cuRound(1, c.u)}? Use the $\\pi$ key on your calculator.`,
        figure: cylFig(r, h, c.u, false),
        parts: [rPart(V, 1, cuSuffix(c.u))],
        hints: ['Volume = area of the circular base × height.', '$V = \\pi r^2 h$'],
        solution: [`Area of the base: $\\pi r^2 = \\pi(${r})^2 = ${piK(r * r)}\\ ${tx(c.u)}^2$`, `$V = ${piK(r * r)} \\times ${h} = ${piK(r * r * h)} \\approx ${nf(V, 2)}\\ ${cu(c.u)}$`, `The volume is about ${volR(V, c.u, 1)}.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.5)) {
        const c = rng.pick([
          { lead: 'A round hay bale', u: 'ft', d: () => rng.int(4, 6), h: () => rng.int(4, 5), dec: 1, ask: 'What volume of hay is in the bale' },
          { lead: 'A cardboard tube form for a concrete deck pier', u: 'm', d: () => rng.pick([0.2, 0.25, 0.3, 0.35, 0.4]), h: () => rng.int(12, 30) / 10, dec: 2, ask: 'What volume of concrete fills the form' },
          { lead: 'The cylindrical part of a grain bin', u: 'ft', d: () => 2 * rng.int(9, 15), h: () => rng.int(16, 28), dec: 0, ask: 'What is its volume' },
          { lead: 'A hydraulic cylinder on a loader', u: 'in', d: () => rng.int(3, 6), h: () => rng.int(12, 30), dec: 1, ask: 'What volume of oil fills it' },
        ]);
        const [dia, h] = retry(() => [c.d(), c.h()], ([x, y]) => !nearHalf((Math.PI * x * x * y) / 4, c.dec));
        const r = dia / 2;
        const V = Math.PI * r * r * h;
        return {
          prompt: `${c.lead} has a diameter of ${len(dia, c.u)} and a ${c.u === 'in' ? 'length' : 'height'} of ${len(h, c.u)}. ${c.ask}, ${cuRound(c.dec, c.u)}?`,
          figure: cylFig(r, h, c.u, true),
          parts: [rPart(V, c.dec, cuSuffix(c.u))],
          hints: ['The formula uses the radius, which is half the diameter.', '$V = \\pi r^2 h$'],
          solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, cylLine(r, h, V, c.u, c.dec + 2), `The volume is about ${volR(V, c.u, c.dec)}.`],
        };
      }
      const kind = rng.pick(['can', 'barrel', 'tank'] as const);
      if (kind === 'can') {
        const c = rng.pick(['A soup can', 'A can of paint', 'A juice can', 'A coffee can']);
        const [dia, h] = retry(() => [rng.int(65, 160) / 10, rng.int(18, 24) / 2], ([x, y]) => !nearHalf((Math.PI * x * x * y) / 4, 0) && y > x * 0.9);
        const r = dia / 2;
        const V = Math.PI * r * r * h;
        return {
          prompt: `${c} has an inside diameter of ${len(dia, 'cm')} and an inside height of ${len(h, 'cm')}. How many millilitres does it hold, ${capRound(0, 'mL')}? Use $1\\ \\text{cm}^3 = 1\\ \\text{mL}$.`,
          figure: cylFig(r, h, 'cm', true),
          parts: [rPart(V, 0, 'mL')],
          hints: ['Find the volume in cubic centimetres with $V = \\pi r^2 h$, using $r$ = diameter ÷ 2.', 'One cubic centimetre holds one millilitre, so the number does not change.'],
          solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ \\text{cm}$`, cylLine(r, h, V, 'cm', 1), `$${nf(V, 1)}\\ \\text{cm}^3 = ${nf(V, 1)}\\ \\text{mL}$`, `It holds about ${capR(V, 'mL', 0)}.`],
        };
      }
      if (kind === 'barrel') {
        const [dia, h] = retry(() => [rng.int(50, 65), rng.int(80, 95)], ([x, y]) => !nearHalf((Math.PI * x * x * y) / 4000, 1));
        const r = dia / 2;
        const V = Math.PI * r * r * h;
        const Lt = V / 1000;
        return {
          prompt: `${name}'s rain barrel is a cylinder with an inside diameter of ${len(dia, 'cm')} and an inside height of ${len(h, 'cm')}. How many litres does it hold when full, ${capRound(1, 'L')}? Use $1000\\ \\text{cm}^3 = 1\\ \\text{L}$.`,
          figure: cylFig(r, h, 'cm', true),
          parts: [rPart(Lt, 1, 'L')],
          hints: ['Find the volume in cubic centimetres with $V = \\pi r^2 h$.', 'Divide the cubic centimetres by 1000 to get litres.'],
          solution: [`$r = ${dia} \\div 2 = ${n(r)}\\ \\text{cm}$`, cylLine(r, h, V, 'cm', 1), `In litres: $${nf(V, 1)} \\div 1000 \\approx ${nf(Lt, 2)}\\ \\text{L}$`, `The barrel holds about ${capR(Lt, 'L', 1)}.`],
        };
      }
      const [dia, h] = retry(() => [rng.int(12, 24) / 10, rng.int(15, 30) / 10], ([x, y]) => !nearHalf((Math.PI * x * x * y * 1000) / 4, 0));
      const r = dia / 2;
      const V = Math.PI * r * r * h;
      const Lt = V * 1000;
      return {
        prompt: `A cylindrical water cistern on a farm near ${rng.pick(TOWNS)} has an inside diameter of ${len(dia, 'm')} and an inside height of ${len(h, 'm')}. How many litres does it hold, ${capRound(0, 'L')}? Use $1\\ \\text{m}^3 = 1000\\ \\text{L}$.`,
        figure: cylFig(r, h, 'm', true),
        parts: [rPart(Lt, 0, 'L')],
        hints: ['Find the volume in cubic metres with $V = \\pi r^2 h$. Keep all the decimals.', 'Multiply cubic metres by 1000 to get litres.'],
        solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ \\text{m}$`, cylLine(r, h, V, 'm', 4), `In litres: $${nf(V, 4)} \\times 1000 \\approx ${nf(Lt, 1)}\\ \\text{L}$`, `The cistern holds about ${capR(Lt, 'L', 0)}.`],
      };
    }
    const mode = rng.pick(['pipe', 'hollow', 'gallons'] as const);
    if (mode === 'pipe') {
      const c = rng.pick([
        { thing: 'A section of water main', what: 'water' },
        { thing: 'An irrigation pipeline', what: 'water' },
        { thing: 'A steel oil-field flowline', what: 'oil' },
        { thing: 'A storm drain', what: 'water' },
      ]);
      const [dcm, Lm] = retry(() => [rng.pick([5, 7.5, 10, 15, 20, 25, 30]), rng.int(10, 80)], ([x, y]) => {
        const v = (Math.PI * x * x * y * 100) / 4 / 1000;
        return v > 20 && !nearHalf(v, 0);
      });
      const r = dcm / 2;
      const Lcm = Lm * 100;
      const V = Math.PI * r * r * Lcm;
      const Lt = V / 1000;
      return {
        prompt: `${c.thing} is ${len(Lm, 'm')} long and has an inside diameter of ${len(dcm, 'cm')}. How many litres of ${c.what} fill it, ${capRound(0, 'L')}? Use $1000\\ \\text{cm}^3 = 1\\ \\text{L}$.`,
        figure: { type: 'solid', shape: 'cylinder', labels: { d: `${n(dcm)} cm`, h: `${Lm} m` } },
        parts: [rPart(Lt, 0, 'L')],
        hints: ['A pipe is a long cylinder lying on its side: its length is the height $h$. Change the length to centimetres first.', '$V = \\pi r^2 h$ in $\\text{cm}^3$, then divide by 1000 for litres.'],
        solution: [
          `$r = ${n(dcm)} \\div 2 = ${n(r)}\\ \\text{cm}$ and $h = ${Lm} \\times 100 = ${n(Lcm)}\\ \\text{cm}$`,
          cylLine(r, Lcm, V, 'cm', 1),
          `In litres: $${nf(V, 1)} \\div 1000 \\approx ${nf(Lt, 2)}\\ \\text{L}$`,
          `About ${capR(Lt, 'L', 0)} of ${c.what} fill the pipe.`,
        ],
      };
    }
    if (mode === 'hollow') {
      const [D, t, L] = retry(() => [10 * rng.int(6, 15), rng.int(6, 12), rng.int(4, 10) / 4], ([x, y, z]) => {
        const R = x / 200;
        const ri = R - y / 100;
        return !nearHalf(Math.PI * (R * R - ri * ri) * z, 2);
      });
      const R = D / 200;
      const ri = exact(R - t / 100);
      const Vo = Math.PI * R * R * L;
      const Vi = Math.PI * ri * ri * L;
      const V = Vo - Vi;
      return {
        prompt: `A precast concrete culvert section is a hollow cylinder ${len(L, 'm')} long. Its outside diameter is ${len(D, 'cm')} and its wall is ${len(t, 'cm')} thick. What volume of concrete is in one section, ${cuRound(2, 'm')}?`,
        figure: { type: 'solid', shape: 'cylinder', labels: { d: `${D} cm outside`, h: `${n(L)} m` } },
        parts: [rPart(V, 2, 'm³')],
        hints: ['Concrete = the whole cylinder minus the hole. Work in metres.', 'Outside radius $R$ = diameter ÷ 2; inside radius = $R$ − wall thickness. Find $\\pi R^2 h - \\pi r^2 h$.'],
        solution: [
          `Outside radius: $${D} \\div 2 = ${n(D / 2)}\\ \\text{cm} = ${n(R)}\\ \\text{m}$; inside radius: $${n(R)} - ${n(t / 100)} = ${n(ri)}\\ \\text{m}$`,
          `Whole cylinder: $\\pi(${n(R)})^2(${n(L)}) \\approx ${nf(Vo, 4)}\\ \\text{m}^3$`,
          `Hole: $\\pi(${n(ri)})^2(${n(L)}) \\approx ${nf(Vi, 4)}\\ \\text{m}^3$`,
          `Concrete: $${nf(Vo, 4)} - ${nf(Vi, 4)} \\approx ${nf(V, 4)}\\ \\text{m}^3$`,
          `Each section has about ${volR(V, 'm', 2)} of concrete.`,
        ],
      };
    }
    const c = rng.pick([
      { thing: 'A round galvanized stock tank', d: [6, 10], depth: [3, 5], what: 'The water is' },
      { thing: 'A round above-ground pool', d: [12, 24], depth: [7, 9], what: 'The water is' },
      { thing: 'A round fibreglass water tank on a ranch', d: [5, 8], depth: [8, 12], what: 'The water in it is' },
    ]);
    const [dia, dep] = retry(() => [rng.int(c.d[0], c.d[1]), rng.int(c.depth[0], c.depth[1]) / 2], ([x, y]) => {
      const v = (Math.PI * x * x * y) / 4;
      return !nearHalf(v, 1) && !nearHalf(v * GAL_PER_FT3, 0) && Math.round(roundTo(v, 1) * GAL_PER_FT3) === Math.round(v * GAL_PER_FT3);
    });
    const r = dia / 2;
    const V = Math.PI * r * r * dep;
    const gal = V * GAL_PER_FT3;
    return {
      prompt: `${c.thing} has a diameter of ${len(dia, 'ft')}. ${c.what} ${len(dep, 'ft')} deep. Find the volume of water, ${cuRound(1, 'ft')}, and the number of imperial gallons, ${capRound(0, 'gal')}. Use ${GAL_FACT}.`,
      figure: cylFig(r, dep, 'ft', true, `${n(dep)} ft deep`),
      parts: [rPart(V, 1, 'ft³', 'Volume of water'), rPart(gal, 0, 'gal', 'Imperial gallons')],
      hints: ['Only the water counts, so use the water depth as the height: $V = \\pi r^2 h$.', 'Multiply the cubic feet by 6.229 to get imperial gallons.'],
      solution: [
        `$r = ${dia} \\div 2 = ${n(r)}\\ \\text{ft}$`,
        cylLine(r, dep, V, 'ft', 2),
        `Gallons: $${nf(V, 2)} \\times 6.229 \\approx ${nf(gal, 1)}$`,
        `The water has a volume of about ${volR(V, 'ft', 1)}, which is about ${nf(gal, 0)} imperial gallons.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.2 — Pyramids and cones
// ---------------------------------------------------------------------------

const volPyramidCone = skill({
  id: 'm203-vol-pyramid-cone',
  name: 'Volume of pyramids and cones',
  description: 'Find the volume of pyramids and cones with V = ⅓ × base area × height, finding the height from the slant height when needed.',
  outcomes: ['M2', 'A1'],
  lessonId: 'm203-3-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.5)) {
        const c = rng.pick([
          { thing: 'A solid glass paperweight shaped like a square pyramid', u: 'cm', b: [4, 9], h: [3, 9] },
          { thing: 'A concrete garden ornament shaped like a square pyramid', u: 'in', b: [8, 16], h: [8, 18] },
          { thing: 'A square-pyramid tent', u: 'ft', b: [6, 10], h: [5, 8] },
          { thing: 'A pyramid-shaped gift box with a square base', u: 'cm', b: [8, 15], h: [8, 15] },
        ]);
        const [b, h] = retry(() => [rng.int(c.b[0], c.b[1]), rng.int(c.h[0], c.h[1])], ([x, y]) => (x * x * y) % 3 === 0);
        const B = b * b;
        const V = (B * h) / 3;
        return {
          prompt: `${c.thing} has a base side of ${len(b, c.u)} and a height of ${len(h, c.u)}. What is its volume?`,
          figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${b} ${c.u}`, h: `${h} ${c.u}` } },
          parts: [xPart(V, cuSuffix(c.u))],
          hints: ['A pyramid holds one third as much as a prism with the same base and height.', '$V = \\tfrac13 \\times$ base area $\\times$ height $= \\tfrac13 b^2 h$'],
          solution: [`Base area: $${b} \\times ${b} = ${B}\\ ${tx(c.u)}^2$`, `$V = \\tfrac13 \\times ${B} \\times ${h} = ${n(V)}\\ ${cu(c.u)}$`, `The volume is ${vol(V, c.u)}.`],
        };
      }
      const c = rng.pick([
        { thing: 'A cone-shaped paper water cup', u: 'cm', r: [3, 4], h: [7, 10], ask: 'How much water does it hold' },
        { thing: 'A pile of sand on a job site is a cone. It', u: 'm', r: [2, 4], h: [1, 2], ask: 'What is the volume of sand' },
        { thing: 'A solid cone', u: 'in', r: [2, 9], h: [4, 15], ask: 'What is its volume' },
        { thing: 'A cone-shaped funnel', u: 'cm', r: [5, 8], h: [8, 12], ask: 'How much does it hold' },
      ]);
      const [r, h] = retry(() => [rng.int(c.r[0], c.r[1]), rng.int(c.h[0], c.h[1])], ([x, y]) => !nearHalf((Math.PI * x * x * y) / 3, 1));
      const V = (Math.PI * r * r * h) / 3;
      return {
        prompt: `${c.thing} has a radius of ${len(r, c.u)} and a height of ${len(h, c.u)}. ${c.ask}, ${cuRound(1, c.u)}? Use the $\\pi$ key.`,
        figure: { type: 'solid', shape: 'cone', labels: { r: `${r} ${c.u}`, h: `${h} ${c.u}` } },
        parts: [rPart(V, 1, cuSuffix(c.u))],
        hints: ['A cone holds one third as much as a cylinder with the same radius and height.', '$V = \\tfrac13 \\pi r^2 h$'],
        solution: [`$V = \\tfrac13 \\pi r^2 h = \\tfrac13 \\pi(${r})^2(${h})$`, `$= \\tfrac13 \\times ${r * r * h}\\pi \\approx ${nf(V, 2)}\\ ${cu(c.u)}$`, `The volume is about ${volR(V, c.u, 1)}.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['rect', 'cone', 'funnel'] as const);
      if (mode === 'rect') {
        const c = rng.pick([
          { lead: 'The attic under a hip roof is shaped like a rectangular pyramid.', u: 'ft', l: [24, 40], w: [18, 30], h: [6, 10], ask: 'What is the volume of the attic?' },
          { lead: 'A solid rectangular pyramid is cast from concrete for a monument.', u: 'cm', l: [40, 80], w: [30, 60], h: [50, 90], ask: 'What volume of concrete is needed?' },
          { lead: 'A glass skylight is shaped like a rectangular pyramid.', u: 'in', l: [30, 48], w: [24, 36], h: [10, 18], ask: 'What volume of air is inside it?' },
        ]);
        const [l, w, h] = retry(() => [rng.int(c.l[0], c.l[1]), rng.int(c.w[0], c.w[1]), rng.int(c.h[0], c.h[1])], ([x, y, z]) => x > y && (x * y * z) % 3 === 0);
        const B = l * w;
        const V = (B * h) / 3;
        return {
          prompt: `${c.lead} The base is ${len(l, c.u)} by ${len(w, c.u)} and the height is ${len(h, c.u)}. ${c.ask}`,
          figure: { type: 'solid', shape: 'rectPyramid', labels: { l: `${l} ${c.u}`, w: `${w} ${c.u}`, h: `${h} ${c.u}` } },
          parts: [xPart(V, cuSuffix(c.u))],
          hints: ['Find the area of the rectangular base first.', '$V = \\tfrac13 \\times lw \\times h$'],
          solution: [`Base area: $${l} \\times ${w} = ${n(B)}\\ ${tx(c.u)}^2$`, `$V = \\tfrac13 \\times ${n(B)} \\times ${h} = ${n(V)}\\ ${cu(c.u)}$`, `The volume is ${vol(V, c.u)}.`],
        };
      }
      if (mode === 'cone') {
        const c = rng.pick([
          { lead: 'A conical pile of road salt in a maintenance yard', u: 'm', d: () => rng.int(8, 16), h: () => rng.int(25, 50) / 10, dec: 1 },
          { lead: 'A conical pile of gravel', u: 'ft', d: () => rng.int(10, 24), h: () => rng.int(4, 9), dec: 0 },
          { lead: 'A conical pile of grain on a granary floor', u: 'm', d: () => rng.int(4, 9), h: () => rng.int(15, 30) / 10, dec: 1 },
          { lead: 'A conical pile of wood chips', u: 'ft', d: () => rng.int(8, 16), h: () => rng.int(3, 7), dec: 0 },
        ]);
        const [dia, h] = retry(() => [c.d(), c.h()], ([x, y]) => !nearHalf((Math.PI * x * x * y) / 12, c.dec));
        const r = dia / 2;
        const V = (Math.PI * r * r * h) / 3;
        return {
          prompt: `${c.lead} is ${len(dia, c.u)} across the bottom (the diameter) and ${len(h, c.u)} high. What is its volume, ${cuRound(c.dec, c.u)}?`,
          figure: { type: 'solid', shape: 'cone', labels: { d: `${dia} ${c.u}`, h: `${n(h)} ${c.u}` } },
          parts: [rPart(V, c.dec, cuSuffix(c.u))],
          hints: ['Halve the diameter to get the radius.', '$V = \\tfrac13 \\pi r^2 h$'],
          solution: [`$r = ${dia} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, `$V = \\tfrac13 \\pi(${n(r)})^2(${n(h)})${shortDec(r * r * h) ? ` = \\tfrac13 \\times ${piK(r * r * h)}` : ''} \\approx ${nf(V, c.dec + 2)}\\ ${cu(c.u)}$`, `The pile has a volume of about ${volR(V, c.u, c.dec)}.`],
        };
      }
      const c = rng.pick([
        { thing: 'A kitchen funnel', d: [10, 16], h: [8, 12] },
        { thing: 'An oil funnel in an auto shop', d: [12, 20], h: [10, 16] },
        { thing: 'A cone-shaped snow-cone cup', d: [7, 9], h: [9, 12] },
        { thing: 'A cone-shaped piping bag, filled with icing,', d: [8, 12], h: [20, 30] },
      ]);
      const [dia, h] = retry(() => [rng.int(c.d[0], c.d[1]), rng.int(c.h[0], c.h[1])], ([x, y]) => !nearHalf((Math.PI * x * x * y) / 12, 0));
      const r = dia / 2;
      const V = (Math.PI * r * r * h) / 3;
      return {
        prompt: `${c.thing} has a top diameter of ${len(dia, 'cm')} and a depth of ${len(h, 'cm')}, measured to the tip. Treat it as a cone and ignore the opening at the tip. How many millilitres does it hold, ${capRound(0, 'mL')}? Use $1\\ \\text{cm}^3 = 1\\ \\text{mL}$.`,
        figure: { type: 'solid', shape: 'cone', labels: { d: `${dia} cm`, h: `${h} cm` } },
        parts: [rPart(V, 0, 'mL')],
        hints: ['Find the volume in cubic centimetres with $V = \\tfrac13 \\pi r^2 h$, using $r$ = diameter ÷ 2.', 'One cubic centimetre holds one millilitre.'],
        solution: [`$r = ${dia} \\div 2 = ${n(r)}\\ \\text{cm}$`, `$V = \\tfrac13 \\pi(${n(r)})^2(${h}) \\approx ${nf(V, 1)}\\ \\text{cm}^3$`, `$${nf(V, 1)}\\ \\text{cm}^3 = ${nf(V, 1)}\\ \\text{mL}$`, `It holds about ${capR(V, 'mL', 0)}.`],
      };
    }
    const mode = rng.pick(['coneSlant', 'pyrSlant', 'pileMass'] as const);
    if (mode === 'coneSlant') {
      const c = rng.pick([
        { lead: `${name} measures a conical pile of sand.`, u: 'm', what: 'sand' },
        { lead: `${name} measures a conical pile of topsoil.`, u: 'm', what: 'topsoil' },
        { lead: `${name} measures a conical pile of crushed gravel.`, u: 'ft', what: 'gravel' },
      ]);
      const [dia, s] = retry(
        () => (c.u === 'm' ? [rng.int(40, 100) / 10, rng.int(28, 60) / 10] : [rng.int(12, 30), rng.int(8, 20)]),
        ([x, y]) => {
          const hh = Math.sqrt(y * y - (x * x) / 4);
          return y > x / 2 + (c.u === 'm' ? 0.6 : 2) && hh < x && !nearHalf((Math.PI * x * x * hh) / 12, 1);
        },
      );
      const r = dia / 2;
      const h = Math.sqrt(s * s - r * r);
      const V = (Math.PI * r * r * h) / 3;
      return {
        prompt: `${c.lead} It is ${len(dia, c.u)} across the bottom, and the slant height (from the top straight down the side to the edge) is ${len(s, c.u)}. What volume of ${c.what} is in the pile, ${cuRound(1, c.u)}?`,
        figure: { type: 'solid', shape: 'cone', labels: { d: `${n(dia)} ${c.u}`, s: `${n(s)} ${c.u}`, h: 'h' } },
        parts: [rPart(V, 1, cuSuffix(c.u))],
        hints: ['The volume formula needs the height $h$, not the slant height. The radius, the height and the slant height form a right triangle.', '$h = \\sqrt{s^2 - r^2}$, then $V = \\tfrac13 \\pi r^2 h$.'],
        solution: [
          `$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`,
          `Height: $h = \\sqrt{${n(s)}^2 - ${n(r)}^2} = \\sqrt{${n(exact(s * s - r * r))}} \\approx ${nf(h, 3)}\\ ${tx(c.u)}$`,
          `$V = \\tfrac13 \\pi(${n(r)})^2(${nf(h, 3)}) \\approx ${nf(V, 2)}\\ ${cu(c.u)}$`,
          `The pile has about ${volR(V, c.u, 1)} of ${c.what}.`,
        ],
      };
    }
    if (mode === 'pyrSlant') {
      const c = rng.pick([
        { thing: 'A solid square pyramid of granite for a park sculpture', u: 'm', b: () => rng.int(12, 30) / 10, s: () => rng.int(15, 35) / 10 },
        { thing: 'A square-pyramid roof over a gazebo', u: 'ft', b: () => rng.int(8, 14), s: () => rng.int(6, 12) },
        { thing: 'A solid wooden square pyramid for a board game', u: 'cm', b: () => rng.int(3, 8), s: () => rng.int(4, 10) },
      ]);
      const [b, s] = retry(() => [c.b(), c.s()], ([x, y]) => {
        const hh = Math.sqrt(y * y - (x * x) / 4);
        return y > x / 2 + x * 0.25 && Math.abs(hh - Math.round(hh)) > 0.05 && !nearHalf((x * x * hh) / 3, 1);
      });
      const h = Math.sqrt(s * s - (b * b) / 4);
      const B = exact(b * b);
      const V = (B * h) / 3;
      const roof = c.thing.includes('roof');
      return {
        prompt: `${c.thing} has a base side of ${len(b, c.u)} and a slant height of ${len(s, c.u)}. ${roof ? 'What volume of space is under the roof' : 'What is its volume'}, ${cuRound(1, c.u)}?`,
        figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${n(b)} ${c.u}`, s: `${n(s)} ${c.u}`, h: 'h' } },
        parts: [rPart(V, 1, cuSuffix(c.u))],
        hints: ['First find the height. The height, half the base and the slant height form a right triangle (the slant height is the hypotenuse).', '$h = \\sqrt{s^2 - \\left(\\tfrac{b}{2}\\right)^2}$, then $V = \\tfrac13 b^2 h$.'],
        solution: [
          `Half the base: $${n(b)} \\div 2 = ${n(b / 2)}\\ ${tx(c.u)}$`,
          `Height: $h = \\sqrt{${n(s)}^2 - ${n(b / 2)}^2} = \\sqrt{${n(exact(s * s - (b * b) / 4))}} \\approx ${nf(h, 3)}\\ ${tx(c.u)}$`,
          `$V = \\tfrac13 \\times ${n(B)} \\times ${nf(h, 3)} \\approx ${nf(V, 2)}\\ ${cu(c.u)}$`,
          `The volume is about ${volR(V, c.u, 1)}.`,
        ],
      };
    }
    const c = rng.pick([
      { what: 'gravel', rho: 1.6 },
      { what: 'sand', rho: 1.5 },
      { what: 'crushed rock', rho: 1.7 },
    ]);
    const [dia, h] = retry(() => [rng.int(50, 120) / 10, rng.int(15, 35) / 10], ([x, y]) => {
      const v = (Math.PI * x * x * y) / 12;
      return y < x / 2 && !nearHalf(v, 1) && !nearHalf(roundTo(v, 1) * c.rho, 1) && roundTo(roundTo(v, 1) * c.rho, 1) === roundTo(v * c.rho, 1);
    });
    const r = dia / 2;
    const V = (Math.PI * r * r * h) / 3;
    const Vr = roundTo(V, 1);
    const mass = Vr * c.rho;
    return {
      prompt: `A loader piles ${c.what} into a cone ${len(dia, 'm')} across the bottom and ${len(h, 'm')} high at a pit near ${rng.pick(TOWNS)}. Find the volume of the pile, ${cuRound(1, 'm')}. Then, using your rounded volume and assuming that $1\\ \\text{m}^3$ of ${c.what} has a mass of $${n(c.rho)}\\ \\text{t}$, find the mass of the pile ${roundingPhrase(1)} of a tonne.`,
      figure: { type: 'solid', shape: 'cone', labels: { d: `${n(dia)} m`, h: `${n(h)} m` } },
      parts: [rPart(V, 1, 'm³', 'Volume'), rPart(mass, 1, 't', 'Mass')],
      hints: ['$V = \\tfrac13 \\pi r^2 h$, with $r$ = diameter ÷ 2.', `Each cubic metre has a mass of ${n(c.rho)} t, so multiply the volume by ${n(c.rho)}.`],
      solution: [
        `$r = ${n(dia)} \\div 2 = ${n(r)}\\ \\text{m}$`,
        `$V = \\tfrac13 \\pi(${n(r)})^2(${n(h)}) \\approx ${nf(V, 3)}$, which rounds to $${nf(V, 1)}\\ \\text{m}^3$`,
        `Mass: $${nf(V, 1)} \\times ${n(c.rho)} = ${n(exact(mass))}\\ \\text{t}$`,
        `The pile is about ${volR(V, 'm', 1)} and has a mass of about $${nf(mass, 1)}\\ \\text{t}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.2 — Spheres
// ---------------------------------------------------------------------------

const volSphere = skill({
  id: 'm203-vol-sphere',
  name: 'Volume of spheres and hemispheres',
  description: 'Find the volume of spheres and hemispheres, and of objects made from spheres, cylinders and cones.',
  outcomes: ['M2', 'A1'],
  lessonId: 'm203-3-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const c = rng.pick([
        { thing: 'A steel ball bearing', u: 'mm', r: [3, 12] },
        { thing: 'A foam ball', u: 'cm', r: [4, 12] },
        { thing: 'A playground ball', u: 'in', r: [4, 8] },
        { thing: 'A spherical water tank', u: 'm', r: [2, 6] },
        { thing: 'A glass marble', u: 'mm', r: [6, 15] },
      ]);
      const r = retry(() => rng.int(c.r[0], c.r[1]), (x) => !nearHalf((4 * Math.PI * x ** 3) / 3, 1));
      const V = (4 * Math.PI * r ** 3) / 3;
      return {
        prompt: `${c.thing} has a radius of ${len(r, c.u)}. What is its volume, ${cuRound(1, c.u)}? Use the $\\pi$ key.`,
        figure: { type: 'solid', shape: 'sphere', labels: { r: `${r} ${c.u}` } },
        parts: [rPart(V, 1, cuSuffix(c.u))],
        hints: ['Cube the radius: $r^3 = r \\times r \\times r$.', '$V = \\tfrac43 \\pi r^3$'],
        solution: [`$r^3 = ${r}^3 = ${r ** 3}$`, `$V = \\tfrac43 \\pi(${r ** 3}) \\approx ${nf(V, 2)}\\ ${cu(c.u)}$`, `The volume is about ${volR(V, c.u, 1)}.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.5)) {
        const c = rng.pick([
          { thing: 'A basketball', u: 'cm', d: () => rng.int(23, 25), dec: 0 },
          { thing: 'A bowling ball', u: 'in', d: () => rng.pick([8, 8.5]), dec: 1 },
          { thing: 'A snow globe', u: 'cm', d: () => rng.int(8, 15), dec: 1 },
          { thing: 'A spherical propane storage tank', u: 'm', d: () => rng.int(6, 12), dec: 1 },
          { thing: 'A round gumball machine globe', u: 'in', d: () => rng.int(8, 14), dec: 1 },
        ]);
        const dia = retry(c.d, (x) => !nearHalf((Math.PI * x ** 3) / 6, c.dec));
        const r = dia / 2;
        const V = (4 * Math.PI * r ** 3) / 3;
        return {
          prompt: `${c.thing} has a diameter of ${len(dia, c.u)}. What is its volume, ${cuRound(c.dec, c.u)}?`,
          figure: { type: 'solid', shape: 'sphere', labels: { d: `${n(dia)} ${c.u}` } },
          parts: [rPart(V, c.dec, cuSuffix(c.u))],
          hints: ['The formula uses the radius, which is half the diameter.', '$V = \\tfrac43 \\pi r^3$'],
          solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, `$V = \\tfrac43 \\pi(${n(r)})^3${shortDec(r ** 3) ? ` = \\tfrac43 \\pi(${k6(r ** 3)})` : ''} \\approx ${nf(V, c.dec + 2)}\\ ${cu(c.u)}$`, `The volume is about ${volR(V, c.u, c.dec)}.`],
        };
      }
      const kind = rng.pick(['bowl', 'igloo', 'planter'] as const);
      if (kind === 'igloo') {
        const dia = retry(() => rng.int(25, 40) / 10, (x) => !nearHalf((Math.PI * x ** 3) / 12, 1));
        const r = dia / 2;
        const V = (2 * Math.PI * r ** 3) / 3;
        return {
          prompt: `The inside of an igloo is a hemisphere with a diameter of ${len(dia, 'm')}. What volume of air is inside, ${cuRound(1, 'm')}?`,
          figure: { type: 'solid', shape: 'hemisphere', labels: { d: `${n(dia)} m` } },
          parts: [rPart(V, 1, 'm³')],
          hints: ['A hemisphere is half a sphere: $V = \\tfrac12 \\times \\tfrac43 \\pi r^3 = \\tfrac23 \\pi r^3$.', 'Halve the diameter to get the radius.'],
          solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ \\text{m}$`, `$V = \\tfrac23 \\pi(${n(r)})^3${shortDec(r ** 3) ? ` = \\tfrac23 \\pi(${k6(r ** 3)})` : ''} \\approx ${nf(V, 3)}\\ \\text{m}^3$`, `About ${volR(V, 'm', 1)} of air is inside.`],
        };
      }
      const bowl = kind === 'bowl';
      const dia = retry(() => (bowl ? rng.int(18, 32) : 2 * rng.int(15, 30)), (x) => !nearHalf((Math.PI * x ** 3) / 12000, 1));
      const r = dia / 2;
      const V = (2 * Math.PI * r ** 3) / 3;
      const Lt = V / 1000;
      return {
        prompt: bowl
          ? `A stainless-steel mixing bowl is a hemisphere with an inside diameter of ${len(dia, 'cm')}. How many litres does it hold when full, ${capRound(1, 'L')}? Use $1000\\ \\text{cm}^3 = 1\\ \\text{L}$.`
          : `A concrete planter is a hemisphere with an inside diameter of ${len(dia, 'cm')}. How many litres of soil fill it level to the top, ${capRound(1, 'L')}? Use $1000\\ \\text{cm}^3 = 1\\ \\text{L}$.`,
        figure: { type: 'solid', shape: 'hemisphere', labels: { d: `${dia} cm` } },
        parts: [rPart(Lt, 1, 'L')],
        hints: ['A hemisphere is half a sphere: $V = \\tfrac23 \\pi r^3$, with $r$ = diameter ÷ 2.', 'Divide the cubic centimetres by 1000 to get litres.'],
        solution: [`$r = ${dia} \\div 2 = ${n(r)}\\ \\text{cm}$`, `$V = \\tfrac23 \\pi(${n(r)})^3 \\approx ${nf(V, 1)}\\ \\text{cm}^3$`, `In litres: $${nf(V, 1)} \\div 1000 \\approx ${nf(Lt, 2)}\\ \\text{L}$`, `It holds about ${capR(Lt, 'L', 1)}.`],
      };
    }
    const mode = rng.pick(['capsule', 'silo', 'fromC', 'coneHemi'] as const);
    if (mode === 'capsule') {
      const [r, Lc] = retry(() => [rng.int(40, 65) / 100, rng.int(15, 35) / 10], ([x, y]) => {
        const v = (Math.PI * x * x * y + (4 * Math.PI * x ** 3) / 3) * 1000;
        return !nearHalf(v, 0) && !nearHalf(0.8 * v, 0) && Math.round(0.8 * Math.round(v)) === Math.round(0.8 * v);
      });
      const cyl = Math.PI * r * r * Lc;
      const sph = (4 * Math.PI * r ** 3) / 3;
      const V = cyl + sph;
      const Lt = V * 1000;
      const fill = 0.8 * Lt;
      return {
        prompt: `A propane tank on an acreage near ${rng.pick(TOWNS)} is a cylinder with a hemisphere on each end. The inside radius is ${len(r, 'm')} and the cylinder part is ${len(Lc, 'm')} long. (a) How many litres does the tank hold, ${capRound(0, 'L')}? (b) Propane tanks are filled to only 80% of their capacity. How many litres of propane go into a full fill, ${capRound(0, 'L')}? Use $1\\ \\text{m}^3 = 1000\\ \\text{L}$.`,
        figure: { type: 'solid', shape: 'capsule', labels: { r: `${n(r)} m`, h: `${n(Lc)} m` } },
        parts: [rPart(Lt, 0, 'L', '(a) Capacity'), rPart(fill, 0, 'L', '(b) 80% fill')],
        hints: ['The two hemispheres on the ends make one whole sphere. Add the cylinder and the sphere.', '$V = \\pi r^2 h + \\tfrac43 \\pi r^3$ in cubic metres; multiply by 1000 for litres, then by 0.8.'],
        solution: [
          `Cylinder: $\\pi(${n(r)})^2(${n(Lc)}) \\approx ${nf(cyl, 4)}\\ \\text{m}^3$`,
          `Two hemispheres = one sphere: $\\tfrac43 \\pi(${n(r)})^3 \\approx ${nf(sph, 4)}\\ \\text{m}^3$`,
          `Total: $${nf(cyl, 4)} + ${nf(sph, 4)} \\approx ${nf(V, 4)}\\ \\text{m}^3$, which is $${nf(V, 4)} \\times 1000 \\approx ${nf(Lt, 1)}\\ \\text{L}$`,
          `80% fill: $0.8 \\times ${nf(Lt, 1)} \\approx ${nf(fill, 1)}\\ \\text{L}$`,
          `The tank holds about ${capR(Lt, 'L', 0)}, and a full fill is about ${capR(fill, 'L', 0)} of propane.`,
        ],
      };
    }
    if (mode === 'silo') {
      const [D, H] = retry(() => [2 * rng.int(7, 12), rng.int(30, 60)], ([x, y]) => {
        const rr = x / 2;
        return !nearHalf(Math.PI * rr * rr * y + (2 * Math.PI * rr ** 3) / 3, 0);
      });
      const r = D / 2;
      const cyl = Math.PI * r * r * H;
      const dome = (2 * Math.PI * r ** 3) / 3;
      const V = cyl + dome;
      return {
        prompt: `A concrete silo on a dairy farm is a cylinder with a hemispherical dome on top. The silo has a diameter of ${len(D, 'ft')}, and the cylinder part is ${len(H, 'ft')} high. What is the total volume inside the silo, ${cuRound(0, 'ft')}?`,
        figure: { type: 'solid', shape: 'cylinderHemisphere', labels: { d: `${D} ft`, h: `${H} ft` } },
        parts: [rPart(V, 0, 'ft³')],
        hints: ['Add the volume of the cylinder and the volume of the dome (half a sphere).', 'Cylinder: $\\pi r^2 h$. Dome: $\\tfrac23 \\pi r^3$. Use $r$ = diameter ÷ 2.'],
        solution: [
          `$r = ${D} \\div 2 = ${r}\\ \\text{ft}$`,
          `Cylinder: $\\pi(${r})^2(${H}) = ${r * r * H}\\pi \\approx ${nf(cyl, 1)}\\ \\text{ft}^3$`,
          `Dome: $\\tfrac23 \\pi(${r})^3 \\approx ${nf(dome, 1)}\\ \\text{ft}^3$`,
          `Total: $${nf(cyl, 1)} + ${nf(dome, 1)} \\approx ${nf(V, 1)}\\ \\text{ft}^3$`,
          `The silo holds about ${volR(V, 'ft', 0)}.`,
        ],
      };
    }
    if (mode === 'fromC') {
      const c = rng.pick([
        { thing: 'A soccer ball', u: 'cm', C: () => rng.int(68, 70), dec: 0 },
        { thing: 'A basketball', u: 'cm', C: () => rng.int(74, 78), dec: 0 },
        { thing: 'A large exercise ball', u: 'cm', C: () => 5 * rng.int(34, 46), dec: 0 },
        { thing: 'A round hot-air balloon envelope (treat it as a sphere)', u: 'm', C: () => rng.int(45, 60), dec: 0 },
        { thing: 'A spherical tank', u: 'ft', C: () => rng.int(15, 40), dec: 1 },
      ]);
      const C = retry(c.C, (x) => !nearHalf(x ** 3 / (6 * Math.PI ** 2), c.dec));
      const r = C / (2 * Math.PI);
      const V = (4 * Math.PI * r ** 3) / 3;
      return {
        prompt: `${c.thing} has a circumference (the distance around its widest part) of ${len(C, c.u)}. What is its volume, ${cuRound(c.dec, c.u)}? Do not round until the last step.`,
        figure: { type: 'solid', shape: 'sphere', labels: { r: 'r' } },
        parts: [rPart(V, c.dec, cuSuffix(c.u))],
        hints: ['Use $C = 2\\pi r$ to find the radius first: $r = \\dfrac{C}{2\\pi}$.', 'Then $V = \\tfrac43 \\pi r^3$. Keep all the decimals in your calculator.'],
        solution: [`$r = \\dfrac{${C}}{2\\pi} \\approx ${nf(r, 4)}\\ ${tx(c.u)}$`, `$V = \\tfrac43 \\pi(${nf(r, 4)})^3 \\approx ${nf(V, c.dec + 2)}\\ ${cu(c.u)}$`, `The volume is about ${volR(V, c.u, c.dec)}.`],
      };
    }
    const [r, h] = retry(() => [rng.int(25, 35) / 10, rng.int(9, 13)], ([x, y]) => !nearHalf((Math.PI * x * x * y) / 3 + (2 * Math.PI * x ** 3) / 3, 1));
    const cone = (Math.PI * r * r * h) / 3;
    const top = (2 * Math.PI * r ** 3) / 3;
    const V = cone + top;
    return {
      prompt: `${name} fills an ice-cream cone to the rim and adds a hemisphere of ice cream on top. The cone has a radius of ${len(r, 'cm')} and a height of ${len(h, 'cm')}, and the hemisphere has the same radius. What is the total volume of ice cream, ${cuRound(1, 'cm')}?`,
      figure: { type: 'solid', shape: 'coneHemisphere', labels: { r: `${n(r)} cm`, h: `${h} cm` } },
      parts: [rPart(V, 1, 'cm³')],
      hints: ['Add the cone ($\\tfrac13 \\pi r^2 h$) and the hemisphere ($\\tfrac23 \\pi r^3$).', 'Both parts use the same radius. Keep the decimals until the end.'],
      solution: [
        `Cone: $\\tfrac13 \\pi(${n(r)})^2(${h}) \\approx ${nf(cone, 3)}\\ \\text{cm}^3$`,
        `Hemisphere: $\\tfrac23 \\pi(${n(r)})^3 \\approx ${nf(top, 3)}\\ \\text{cm}^3$`,
        `Total: $${nf(cone, 3)} + ${nf(top, 3)} \\approx ${nf(V, 2)}\\ \\text{cm}^3$`,
        `There is about ${volR(V, 'cm', 1)} of ice cream.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.3 — Volume and capacity problems
// ---------------------------------------------------------------------------

const volApply = skill({
  id: 'm203-vol-apply',
  name: 'Volume and capacity problems',
  description: 'Solve volume and capacity problems in SI and imperial units: concrete in cubic metres or cubic yards, filling pools, hot tubs and tanks, loads and trips, and cost.',
  outcomes: ['M2', 'A1'],
  lessonId: 'm203-3-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const mode = rng.pick(['litres', 'yards', 'trips'] as const);
      if (mode === 'litres') {
        const kind = rng.pick(['m3-L', 'L-m3', 'cm3-L', 'L-cm3'] as const);
        if (kind === 'm3-L' || kind === 'L-m3') {
          const toL = kind === 'm3-L';
          const m3 = toL ? rng.int(12, 95) / 10 : rng.int(15, 400) / 100;
          const L = exact(m3 * 1000);
          const thing = rng.pick(['a septic tank', 'a farm water cistern', 'a fuel storage tank', 'a hot tub', 'a rain-water tank']);
          return {
            prompt: toL
              ? `The inside volume of ${thing} is ${vol(m3, 'm')}. Using $1\\ \\text{m}^3 = 1000\\ \\text{L}$, what is its capacity in litres?`
              : `The capacity of ${thing} is ${capX(L, 'L')}. Using $1\\ \\text{m}^3 = 1000\\ \\text{L}$, what is its volume in cubic metres?`,
            parts: [xPart(toL ? L : m3, toL ? 'L' : 'm³')],
            hints: ['A cube $1\\ \\text{m}$ on each side holds $1000$ litres.', toL ? 'Litres are smaller, so the number gets bigger: multiply by 1000.' : 'Cubic metres are bigger, so the number gets smaller: divide by 1000.'],
            solution: [`$1\\ \\text{m}^3 = 1000\\ \\text{L}$`, toL ? `$${n(m3)} \\times 1000 = ${n(L)}$` : `$${n(L)} \\div 1000 = ${n(m3)}$`, toL ? `It holds ${capX(L, 'L')}.` : `Its volume is ${vol(m3, 'm')}.`],
          };
        }
        const toL = kind === 'cm3-L';
        const L = toL ? rng.int(250, 9800) / 1000 : rng.int(5, 200) / 10;
        const cm3 = exact(L * 1000);
        const thing = rng.pick(['a jerry can', 'a cooler', 'a paint pail', 'a camp water jug', 'a bucket']);
        return {
          prompt: toL
            ? `The inside volume of ${thing} is ${vol(cm3, 'cm')}. Using $1000\\ \\text{cm}^3 = 1\\ \\text{L}$, what is its capacity in litres?`
            : `${cap(thing)} holds ${capX(L, 'L')}. Using $1000\\ \\text{cm}^3 = 1\\ \\text{L}$, what is its inside volume in cubic centimetres?`,
          parts: [xPart(toL ? L : cm3, toL ? 'L' : 'cm³')],
          hints: ['One litre is the volume of a cube $10\\ \\text{cm}$ on each side: $10 \\times 10 \\times 10 = 1000\\ \\text{cm}^3$.', toL ? 'Divide by 1000.' : 'Multiply by 1000.'],
          solution: [`$1\\ \\text{L} = 1000\\ \\text{cm}^3$`, toL ? `$${n(cm3)} \\div 1000 = ${n(L)}$` : `$${n(L)} \\times 1000 = ${n(cm3)}$`, toL ? `It holds ${capX(L, 'L')}.` : `Its volume is ${vol(cm3, 'cm')}.`],
        };
      }
      if (mode === 'yards') {
        if (rng.chance(0.5)) {
          const yd = rng.int(2, 24) / 2;
          const ft = exact(yd * 27);
          const what = rng.pick(['topsoil', 'gravel', 'concrete', 'mulch', 'sand']);
          return {
            prompt: `${name} orders ${vol(yd, 'yd')} of ${what}. Using $1\\ \\text{yd}^3 = 27\\ \\text{ft}^3$, how many cubic feet is that?`,
            parts: [xPart(ft, 'ft³')],
            hints: ['A cubic yard is a cube $3\\ \\text{ft}$ on each side: $3 \\times 3 \\times 3 = 27\\ \\text{ft}^3$.', 'Cubic feet are smaller, so multiply by 27.'],
            solution: [`$1\\ \\text{yd}^3 = 3 \\times 3 \\times 3 = 27\\ \\text{ft}^3$`, `$${n(yd)} \\times 27 = ${n(ft)}$`, `That is ${vol(ft, 'ft')} of ${what}.`],
          };
        }
        const ft = retry(() => rng.int(40, 600), (x) => x % 27 !== 0 && !nearHalf(x / 27, 1));
        const yd = ft / 27;
        const what = rng.pick(['a concrete patio', 'a driveway pad', 'a shed floor', 'a set of deck footings', 'a sidewalk']);
        return {
          prompt: `${cap(what)} needs ${vol(ft, 'ft')} of concrete. Ready-mix concrete is sold by the cubic yard. Using $1\\ \\text{yd}^3 = 27\\ \\text{ft}^3$, how many cubic yards is that, ${cuRound(1, 'yd')}?`,
          parts: [rPart(yd, 1, 'yd³')],
          hints: ['A cubic yard is $3 \\times 3 \\times 3 = 27$ cubic feet.', 'Cubic yards are bigger, so divide by 27.'],
          solution: [`$1\\ \\text{yd}^3 = 27\\ \\text{ft}^3$`, `$${ft} \\div 27 \\approx ${nf(yd, 3)}$`, `That is about ${volR(yd, 'yd', 1)}.`],
        };
      }
      const town = rng.pick(TOWNS);
      const c = rng.pick([
        { u: 'm', need: [60, 400], load: [8, 15], lead: (x: string) => `A crew digging a basement near ${town} must haul away ${x} of dirt.`, truck: 'dump truck' },
        { u: 'yd', need: [30, 200], load: [10, 16], lead: (x: string) => `A new gravel road near ${town} needs ${x} of gravel.`, truck: 'gravel truck' },
        { u: 'L', need: [40000, 90000], load: [10000, 20000], lead: (x: string) => `A new backyard pool in ${town} needs ${x} of water, delivered by truck.`, truck: 'water truck' },
        { u: 'm', need: [150, 600], load: [30, 45], lead: (x: string) => `A farmer near ${town} must haul ${x} of grain to the elevator.`, truck: 'grain truck' },
        { u: 'm', need: [20, 90], load: [6, 10], lead: (x: string) => `A footing pour near ${town} needs ${x} of concrete.`, truck: 'ready-mix truck' },
      ]);
      const [need, load] = retry(
        () => (c.u === 'L' ? [1000 * rng.int(c.need[0] / 1000, c.need[1] / 1000), 500 * rng.int(c.load[0] / 500, c.load[1] / 500)] : [rng.int(c.need[0], c.need[1]), rng.int(c.load[0], c.load[1])]),
        ([a, b]) => notWhole(a / b),
      );
      const trips = Math.ceil(need / load);
      const amt = (x: number) => (c.u === 'L' ? capX(x, 'L') : vol(x, c.u));
      return {
        prompt: `${c.lead(amt(need))} A ${c.truck} carries ${amt(load)} per load. How many loads (trips) are needed?`,
        parts: [numPart(trips, { suffix: 'trips' })],
        hints: ['Divide the total amount by the amount in one load.', 'A part-load still needs a trip, so round up.'],
        solution: [`$${n(need)} \\div ${n(load)} \\approx ${nf(need / load, 2)}$`, `Round up: ${trips} trips are needed.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['padM', 'padFt', 'hotTub', 'transfer'] as const);
      if (mode === 'padM') {
        const c = rng.pick(['a garage floor', 'a shed base', 'a patio', 'a hot-tub pad', 'a driveway apron']);
        const [L, W, t] = retry(() => [rng.int(6, 16) / 2, rng.int(5, 12) / 2, rng.pick([10, 12, 15, 20])], ([x, y, z]) => x >= y && !nearHalf((x * y * z) / 100, 2));
        const tm = t / 100;
        const V = L * W * tm;
        return {
          prompt: `${name} is pouring a concrete slab for ${c} near ${rng.pick(TOWNS)}. The slab is ${len(L, 'm')} long, ${len(W, 'm')} wide and ${len(t, 'cm')} thick. How many cubic metres of concrete are needed, ${cuRound(2, 'm')}?`,
          figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${n(L)} m`, w: `${n(W)} m`, h: `${t} cm` } },
          parts: [rPart(V, 2, 'm³')],
          hints: ['Change the thickness to metres first: $100\\ \\text{cm} = 1\\ \\text{m}$.', '$V = lwh$'],
          solution: [`Thickness in metres: $${t} \\div 100 = ${n(tm)}\\ \\text{m}$`, `$V = ${n(L)} \\times ${n(W)} \\times ${n(tm)} = ${n(exact(V))}\\ \\text{m}^3$`, `About ${volR(V, 'm', 2)} of concrete is needed.`],
        };
      }
      if (mode === 'padFt') {
        const c = rng.pick(['a garage floor', 'a shop floor', 'a patio', 'a driveway', 'a shed base']);
        const [L, W, t] = retry(
          () => [rng.int(10, 30), rng.int(8, 24), rng.pick([4, 5, 6])],
          ([x, y, z]) => x >= y && (x * y * z) % 3 === 0 && !nearHalf((x * y * z) / 12 / 27, 1),
        );
        const ft3 = exact((L * W * t) / 12);
        const yd3 = ft3 / 27;
        return {
          prompt: `A concrete slab for ${c} is ${len(L, 'ft')} long, ${len(W, 'ft')} wide and ${len(t, 'in')} thick. Find its volume in cubic feet, then in cubic yards ${roundingPhrase(1)}. Use $12\\ \\text{in} = 1\\ \\text{ft}$ and $1\\ \\text{yd}^3 = 27\\ \\text{ft}^3$.`,
          figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${L} ft`, w: `${W} ft`, h: `${t} in` } },
          parts: [xPart(ft3, 'ft³', 'Volume in cubic feet'), rPart(yd3, 1, 'yd³', 'Volume in cubic yards')],
          hints: ['Change the thickness to feet: divide the inches by 12.', '$V = lwh$ in cubic feet; then divide by 27 for cubic yards.'],
          solution: [
            `Thickness in feet: $${t}\\ \\text{in} = \\tfrac{${t}}{12}\\ \\text{ft}$`,
            `$V = ${L} \\times ${W} \\times \\tfrac{${t}}{12} = \\dfrac{${n(L * W * t)}}{12} = ${n(ft3)}\\ \\text{ft}^3$`,
            `Cubic yards: $${n(ft3)} \\div 27 \\approx ${nf(yd3, 3)}$`,
            `The slab is ${vol(ft3, 'ft')}, or about ${volR(yd3, 'yd', 1)}.`,
          ],
        };
      }
      if (mode === 'hotTub') {
        if (rng.chance(0.5)) {
          const [dia, dep] = retry(() => [rng.int(18, 24) / 10, 5 * rng.int(14, 18)], ([x, y]) => !nearHalf((Math.PI * x * x * y * 10) / 4, 0));
          const r = dia / 2;
          const depm = dep / 100;
          const V = Math.PI * r * r * depm;
          const Lt = V * 1000;
          return {
            prompt: `${name}'s round hot tub has an inside diameter of ${len(dia, 'm')} and is filled to a depth of ${len(dep, 'cm')}. How many litres of water does it take to fill, ${capRound(0, 'L')}? Use $1\\ \\text{m}^3 = 1000\\ \\text{L}$.`,
            figure: cylFig(r, depm, 'm', true, `${dep} cm deep`),
            parts: [rPart(Lt, 0, 'L')],
            hints: ['Change the depth to metres, then use $V = \\pi r^2 h$ with $r$ = diameter ÷ 2.', 'Multiply cubic metres by 1000 to get litres.'],
            solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ \\text{m}$; depth $= ${dep} \\div 100 = ${n(depm)}\\ \\text{m}$`, cylLine(r, depm, V, 'm', 4), `In litres: $${nf(V, 4)} \\times 1000 \\approx ${nf(Lt, 1)}\\ \\text{L}$`, `It takes about ${capR(Lt, 'L', 0)} to fill.`],
          };
        }
        const [s, dIn] = retry(() => [rng.int(6, 8), rng.pick([30, 32, 33, 34, 36])], ([x, y]) => {
          const v = (x * x * y) / 12;
          return !nearHalf(v * GAL_PER_FT3, 0);
        });
        const depFt = dIn / 12;
        const V = exact((s * s * dIn) / 12);
        const gal = V * GAL_PER_FT3;
        return {
          prompt: `A square hot tub is ${len(s, 'ft')} by ${len(s, 'ft')} inside and is filled to a depth of ${len(dIn, 'in')}. Ignoring the seats, how many imperial gallons of water does it hold, ${capRound(0, 'gal')}? Use $12\\ \\text{in} = 1\\ \\text{ft}$ and ${GAL_FACT}.`,
          figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${s} ft`, w: `${s} ft`, h: `${dIn} in` } },
          parts: [rPart(gal, 0, 'gal')],
          hints: ['Change the depth to feet and find the volume in cubic feet.', 'Multiply the cubic feet by 6.229 to get imperial gallons.'],
          solution: [`Depth: $${dIn} \\div 12 = ${n(depFt)}\\ \\text{ft}$`, `$V = ${s} \\times ${s} \\times ${n(depFt)} = ${n(V)}\\ \\text{ft}^3$`, `Gallons: $${n(V)} \\times 6.229 \\approx ${nf(gal, 2)}$`, `The hot tub holds about ${nf(gal, 0)} imperial gallons.`],
        };
      }
      const [l, w, h, p] = retry(
        () => [5 * rng.int(20, 30), 5 * rng.int(8, 12), 5 * rng.int(6, 9), 1 + rng.int(20, 75) / 100 + 0.009],
        ([a, b, c, q]) => !nearHalf((a * b * c * q) / 1000, 2),
      );
      const Lt = exact((l * w * h) / 1000);
      const cost = Lt * p;
      return {
        prompt: `${name} has a rectangular diesel transfer tank in the back of a pickup. Inside, it is ${len(l, 'cm')} long, ${len(w, 'cm')} wide and ${len(h, 'cm')} high. (a) How many litres does it hold? (b) Diesel costs ${perLitre(p)} per litre. What does it cost to fill the empty tank, to the nearest cent? Use $1000\\ \\text{cm}^3 = 1\\ \\text{L}$.`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${l} cm`, w: `${w} cm`, h: `${h} cm` } },
        parts: [xPart(Lt, 'L', '(a) Capacity'), moneyPart(cost, '(b) Cost to fill')],
        hints: ['$V = lwh$ in cubic centimetres; divide by 1000 for litres.', 'Cost = litres × price per litre.'],
        solution: [`$V = ${l} \\times ${w} \\times ${h} = ${n(l * w * h)}\\ \\text{cm}^3$`, `Capacity: $${n(l * w * h)} \\div 1000 = ${n(Lt)}\\ \\text{L}$`, `Cost: $${n(Lt)} \\times ${fmtFixed(p, 3)} \\approx ${nf(cost, 3)}$`, `The tank holds ${capX(Lt, 'L')} and costs ${cash(cost)} to fill.`],
      };
    }
    const mode = rng.pick(['grainBin', 'concreteCost', 'poolFill', 'fuelTank'] as const);
    if (mode === 'grainBin') {
      const [D, H, R, load] = retry(
        () => [rng.int(5, 9), rng.int(5, 10), rng.int(15, 30) / 10, rng.pick([25, 28, 30, 35, 40])],
        ([a, b, c, e]) => {
          const r = a / 2;
          const v = Math.PI * r * r * b + (Math.PI * r * r * c) / 3;
          return !nearHalf(v, 1) && notWhole(v / e) && notWhole(roundTo(v, 1) / e);
        },
      );
      const r = D / 2;
      const cyl = Math.PI * r * r * H;
      const cone = (Math.PI * r * r * R) / 3;
      const V = cyl + cone;
      const trips = Math.ceil(V / load);
      return {
        prompt: `A grain bin near ${rng.pick(TOWNS)} is a cylinder with a cone-shaped top. It is ${len(D, 'm')} across, the wall is ${len(H, 'm')} high, and the grain is piled ${len(R, 'm')} above the top of the wall to the peak. Find the volume of grain, ${cuRound(1, 'm')}. A grain truck hauls ${vol(load, 'm')} per load. How many loads does it take to empty the bin?`,
        figure: { type: 'solid', shape: 'cylinderCone', labels: { d: `${D} m`, h: `${H} m`, h2: `${n(R)} m` } },
        parts: [rPart(V, 1, 'm³', 'Volume of grain'), numPart(trips, { label: 'Loads', suffix: 'loads' })],
        hints: ['Add the cylinder ($\\pi r^2 h$) and the cone on top ($\\tfrac13 \\pi r^2 h$). Both use $r$ = diameter ÷ 2.', 'Divide the volume by one load and round up.'],
        solution: [
          `$r = ${D} \\div 2 = ${n(r)}\\ \\text{m}$`,
          `Cylinder: $\\pi(${n(r)})^2(${H}) \\approx ${nf(cyl, 2)}\\ \\text{m}^3$`,
          `Cone: $\\tfrac13 \\pi(${n(r)})^2(${n(R)}) \\approx ${nf(cone, 2)}\\ \\text{m}^3$`,
          `Total: $${nf(cyl, 2)} + ${nf(cone, 2)} \\approx ${nf(V, 2)}$, about ${volR(V, 'm', 1)}`,
          `Loads: $${nf(V, 2)} \\div ${load} \\approx ${nf(V / load, 2)}$, so ${trips} loads.`,
        ],
      };
    }
    if (mode === 'concreteCost') {
      const c = rng.pick(['a shop floor', 'a garage floor', 'a basketball pad', 'a machine-shed apron']);
      const [L, W, t, p] = retry(
        () => [2 * rng.int(8, 20), 2 * rng.int(6, 14), rng.pick([4, 5, 6]), 5 * rng.int(36, 56)],
        ([x, y, z, q]) => {
          const v = (x * y * z) / 12 / 27;
          return x >= y && (x * y * z) % 3 === 0 && notWhole(v * 2) && !nearHalf((Math.ceil(v * 2) / 2) * q * 1.05, 2);
        },
      );
      const ft3 = exact((L * W * t) / 12);
      const yd3 = ft3 / 27;
      const order = Math.ceil(yd3 * 2) / 2;
      const sub = exact(order * p);
      const cost = sub * 1.05;
      return {
        prompt: `${name} is pouring ${c} that is ${len(L, 'ft')} by ${len(W, 'ft')} and ${len(t, 'in')} thick. The ready-mix plant sells concrete in steps of half a cubic yard ($0.5\\ \\text{yd}^3$), so ${name} rounds the order up to the next half yard. Concrete costs ${cash(p)} per cubic yard, plus 5% GST. How many cubic yards should ${name} order, and what is the total cost, to the nearest cent? Use $1\\ \\text{yd}^3 = 27\\ \\text{ft}^3$.`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${L} ft`, w: `${W} ft`, h: `${t} in` } },
        parts: [numPart(order, { label: 'Concrete to order', suffix: 'yd³', display: 'decimal' }), moneyPart(cost, 'Total cost with GST')],
        hints: ['Find the volume in cubic feet (change the thickness to feet), then divide by 27 for cubic yards.', 'Round up to the next half yard, multiply by the price, then by 1.05 for GST.'],
        solution: [
          `$V = ${L} \\times ${W} \\times \\tfrac{${t}}{12} = ${n(ft3)}\\ \\text{ft}^3$`,
          `In cubic yards: $${n(ft3)} \\div 27 \\approx ${nf(yd3, 3)}\\ \\text{yd}^3$`,
          `Round up to the next half yard: order $${n(order)}\\ \\text{yd}^3$`,
          `Cost: $${n(order)} \\times ${p} = ${n(sub)}$, and with GST $${n(sub)} \\times 1.05 = ${n(exact(cost))}$`,
          `${name} should order $${n(order)}\\ \\text{yd}^3$, costing ${cash(cost)} in total.`,
        ],
      };
    }
    if (mode === 'poolFill') {
      const [dia, dep, rate] = retry(
        () => [rng.pick([3.7, 4.6, 5.5, 6.4, 7.3]), rng.int(9, 13) / 10, 5 * rng.int(4, 10)],
        ([x, y, z]) => {
          const L = (Math.PI * x * x * y * 1000) / 4;
          return !nearHalf(L, 0) && !nearHalf(L / z / 60, 1);
        },
      );
      const r = dia / 2;
      const V = Math.PI * r * r * dep;
      const Lt = V * 1000;
      const mins = Lt / rate;
      const hrs = mins / 60;
      return {
        prompt: `${name} is filling a round above-ground pool with a garden hose. The pool has a diameter of ${len(dia, 'm')} and will be filled to a depth of ${len(dep, 'm')}. The hose delivers ${capX(rate, 'L')} per minute. How many litres of water are needed, ${capRound(0, 'L')}, and how many hours will it take to fill, ${roundingPhrase(1)} of an hour? Use $1\\ \\text{m}^3 = 1000\\ \\text{L}$.`,
        figure: cylFig(r, dep, 'm', true, `${n(dep)} m deep`),
        parts: [rPart(Lt, 0, 'L', 'Water needed'), rPart(hrs, 1, 'h', 'Time to fill')],
        hints: ['$V = \\pi r^2 h$ in cubic metres, using the water depth; multiply by 1000 for litres.', 'Minutes = litres ÷ litres per minute. Divide by 60 for hours.'],
        solution: [
          `$r = ${n(dia)} \\div 2 = ${n(r)}\\ \\text{m}$`,
          cylLine(r, dep, V, 'm', 3),
          `Litres: $${nf(V, 3)} \\times 1000 \\approx ${nf(Lt, 0)}\\ \\text{L}$`,
          `Time: $${nf(Lt, 0)} \\div ${rate} \\approx ${nf(mins, 1)}$ minutes, and $${nf(mins, 1)} \\div 60 \\approx ${nf(hrs, 2)}$ hours`,
          `About ${capR(Lt, 'L', 0)} of water, taking about ${nf(hrs, 1)} hours.`,
        ],
      };
    }
    const [dia, Lm, have, p] = retry(
      () => [rng.int(10, 15) / 10, rng.int(18, 30) / 10, 50 * rng.int(4, 16), 1 + rng.int(25, 75) / 100 + 0.009],
      ([x, y, hv, q]) => {
        const cap = (Math.PI * x * x * y * 1000) / 4;
        return !nearHalf(cap, 0) && hv < cap * 0.4 && !nearHalf((Math.round(cap) - hv) * q, 2);
      },
    );
    const r = dia / 2;
    const V = Math.PI * r * r * Lm;
    const Lt = V * 1000;
    const Lr = Math.round(Lt);
    const fill = Lr - have;
    const cost = fill * p;
    return {
      prompt: `A farm fuel tank near ${rng.pick(TOWNS)} is a cylinder lying on its side. It has an inside diameter of ${len(dia, 'm')} and is ${len(Lm, 'm')} long. (a) What is its capacity, ${capRound(0, 'L')}? (b) The tank now holds ${capX(have, 'L')} of diesel. Using your rounded capacity, what does it cost to fill the tank at ${perLitre(p)} per litre, to the nearest cent? Use $1\\ \\text{m}^3 = 1000\\ \\text{L}$.`,
      figure: { type: 'solid', shape: 'cylinder', labels: { d: `${n(dia)} m`, h: `${n(Lm)} m long` } },
      parts: [rPart(Lt, 0, 'L', '(a) Capacity'), moneyPart(cost, '(b) Cost to fill')],
      hints: ['A tank lying on its side is still a cylinder: its length is the "height" in $V = \\pi r^2 h$.', 'Litres to add = capacity − litres already in the tank. Then multiply by the price per litre.'],
      solution: [
        `$r = ${n(dia)} \\div 2 = ${n(r)}\\ \\text{m}$`,
        cylLine(r, Lm, V, 'm', 4),
        `Capacity: $${nf(V, 4)} \\times 1000 \\approx ${nf(Lt, 1)}$, about ${capR(Lt, 'L', 0)}`,
        `Litres to add: $${Lr} - ${have} = ${fill}\\ \\text{L}$`,
        `Cost: $${fill} \\times ${fmtFixed(p, 3)} \\approx ${nf(cost, 3)}$`,
        `The tank holds about ${capR(Lt, 'L', 0)}, and filling it costs ${cash(cost)}.`,
      ],
    };
  },
});


// ---------------------------------------------------------------------------
// Lesson 3.3 — Rearranging volume formulas
// ---------------------------------------------------------------------------

const volRearrange = skill({
  id: 'm203-vol-rearrange',
  name: 'Find a missing dimension from a volume',
  description: 'Rearrange a volume formula to find a missing height, depth, thickness or radius, using a square root or a cube root where needed.',
  outcomes: ['M2', 'A1'],
  lessonId: 'm203-3-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const c = rng.pick([
        { kind: 'pad', u: 'm', lead: 'A concrete pad', l: () => rng.int(4, 12), w: () => rng.int(3, 8), h: () => rng.pick([0.1, 0.12, 0.15, 0.2]), ask: 'How thick is the pad, in metres', dim: 'thickness', label: 'Thickness' },
        { kind: 'box', u: 'cm', lead: 'A shipping box', l: () => rng.int(20, 60), w: () => rng.int(15, 40), h: () => rng.int(10, 40), ask: 'How high is the box', dim: 'height', label: 'Height' },
        { kind: 'sandbox', u: 'ft', lead: 'A sandbox', l: () => rng.int(5, 10), w: () => rng.int(4, 8), h: () => rng.pick([0.5, 1, 1.5, 2]), ask: 'How deep is the sand, in feet', dim: 'depth', label: 'Depth' },
        { kind: 'tank', u: 'm', lead: 'A rectangular water tank', l: () => rng.int(2, 6), w: () => rng.int(1, 3), h: () => rng.int(1, 3), ask: 'How high is the tank', dim: 'height', label: 'Height' },
      ]);
      const [l, w, h] = retry(() => [c.l(), c.w(), c.h()], ([x, y]) => x > y);
      const V = exact(l * w * h);
      const base = l * w;
      const filled = c.kind === 'pad' ? 'uses' : c.kind === 'sandbox' ? 'holds' : 'has a volume of';
      const tail = c.kind === 'pad' ? 'of concrete' : c.kind === 'sandbox' ? 'of sand, spread evenly' : '';
      return {
        prompt: `${c.lead} is ${len(l, c.u)} long and ${len(w, c.u)} wide. It ${filled} ${vol(V, c.u)}${tail ? ` ${tail}` : ''}. ${c.ask}?`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${l} ${c.u}`, w: `${w} ${c.u}`, h: '?' } },
        parts: [xPart(h, c.u, c.label)],
        hints: ['Start with $V = lwh$ and put in the numbers you know.', `Divide the volume by the base area ($l \\times w$) to get the ${c.dim}.`],
        solution: [`$V = lwh$, so $${n(V)} = ${l} \\times ${w} \\times h = ${base}h$`, `$h = \\dfrac{${n(V)}}{${base}} = ${n(h)}$`, `The ${c.dim} is ${len(h, c.u)}.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['cylH', 'coneH', 'depthL'] as const);
      if (mode === 'cylH') {
        const c = rng.pick([
          { lead: 'A cylindrical water cistern must hold', u: 'm', L: () => 500 * rng.int(4, 20), d: () => rng.int(12, 24) / 10 },
          { lead: 'A round rain-water tank must hold', u: 'm', L: () => 250 * rng.int(4, 16), d: () => rng.int(10, 16) / 10 },
          { lead: 'A cylindrical fuel storage tank must hold', u: 'm', L: () => 1000 * rng.int(5, 25), d: () => rng.int(16, 30) / 10 },
        ]);
        const [Lt, dia] = retry(() => [c.L(), c.d()], ([a, b]) => {
          const hh = a / 1000 / (Math.PI * (b / 2) ** 2);
          return hh > 0.5 && hh < 6 && !nearHalf(hh, 2);
        });
        const V = Lt / 1000;
        const r = dia / 2;
        const B = Math.PI * r * r;
        const h = V / B;
        return {
          prompt: `${c.lead} ${capX(Lt, 'L')}. It has an inside diameter of ${len(dia, 'm')}. How tall must it be inside, to the nearest hundredth of a metre? Use $1\\ \\text{m}^3 = 1000\\ \\text{L}$.`,
          figure: { type: 'solid', shape: 'cylinder', labels: { d: `${n(dia)} m`, h: 'h' } },
          parts: [rPart(h, 2, 'm', '$h =$')],
          hints: ['Change litres to cubic metres first (divide by 1000).', '$V = \\pi r^2 h$, so $h = \\dfrac{V}{\\pi r^2}$.'],
          solution: [`$V = ${n(Lt)} \\div 1000 = ${n(V)}\\ \\text{m}^3$ and $r = ${n(dia)} \\div 2 = ${n(r)}\\ \\text{m}$`, `$${n(V)} = \\pi(${n(r)})^2 h$`, `$h = \\dfrac{${n(V)}}{\\pi(${n(r)})^2} \\approx \\dfrac{${n(V)}}{${nf(B, 4)}} \\approx ${nf(h, 3)}$`, `The tank must be about ${len(Number(fmtFixed(h, 2)), 'm')} tall.`],
        };
      }
      if (mode === 'coneH') {
        if (rng.chance(0.5)) {
          const c = rng.pick([
            { what: 'sand', u: 'm', V: () => rng.int(8, 60), d: () => rng.int(5, 12) },
            { what: 'road salt', u: 'm', V: () => rng.int(40, 200), d: () => rng.int(10, 20) },
            { what: 'gravel', u: 'yd', V: () => rng.int(10, 60), d: () => rng.int(6, 14) },
          ]);
          const [V, dia] = retry(() => [c.V(), c.d()], ([a, b]) => {
            const hh = (3 * a) / (Math.PI * (b / 2) ** 2);
            return hh > 0.8 && hh < b / 1.5 && !nearHalf(hh, 1);
          });
          const r = dia / 2;
          const h = (3 * V) / (Math.PI * r * r);
          return {
            prompt: `A conical pile of ${c.what} has a volume of ${vol(V, c.u)} and is ${len(dia, c.u)} across the bottom. How high is the pile, ${roundingPhrase(1)} of a ${UNIT[c.u].one}?`,
            figure: { type: 'solid', shape: 'cone', labels: { d: `${dia} ${c.u}`, h: 'h' } },
            parts: [rPart(h, 1, c.u, '$h =$')],
            hints: ['Start with $V = \\tfrac13 \\pi r^2 h$, where $r$ = diameter ÷ 2.', 'Multiply both sides by 3, then divide by $\\pi r^2$: $h = \\dfrac{3V}{\\pi r^2}$.'],
            solution: [`$r = ${dia} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, `$${V} = \\tfrac13 \\pi(${n(r)})^2 h$`, `$h = \\dfrac{3 \\times ${V}}{\\pi(${n(r)})^2}${shortDec(r * r) ? ` = \\dfrac{${3 * V}}{${piK(r * r)}}` : ''} \\approx ${nf(h, 3)}$`, `The pile is about ${len(Number(fmtFixed(h, 1)), c.u)} high.`],
          };
        }
        const c = rng.pick([
          { lead: 'A solid square pyramid of concrete', u: 'm', V: () => rng.int(3, 30) / 2, b: () => rng.int(15, 35) / 10 },
          { lead: 'A glass square-pyramid paperweight', u: 'cm', V: () => rng.int(60, 300), b: () => rng.int(5, 9) },
          { lead: 'A square-pyramid tent', u: 'ft', V: () => rng.int(80, 300), b: () => rng.int(7, 12) },
        ]);
        const [V, b] = retry(() => [c.V(), c.b()], ([a, bb]) => {
          const hh = (3 * a) / (bb * bb);
          return hh > 0.4 * bb && hh < 2 * bb && !nearHalf(hh, 1);
        });
        const B = exact(b * b);
        const h = (3 * V) / B;
        return {
          prompt: `${c.lead} has a volume of ${vol(V, c.u)} and a base side of ${len(b, c.u)}. What is its height, ${roundingPhrase(1)} of a ${UNIT[c.u].one}?`,
          figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${n(b)} ${c.u}`, h: 'h' } },
          parts: [rPart(h, 1, c.u, '$h =$')],
          hints: ['Start with $V = \\tfrac13 b^2 h$.', 'Multiply both sides by 3, then divide by $b^2$: $h = \\dfrac{3V}{b^2}$.'],
          solution: [`Base area: $${n(b)}^2 = ${n(B)}\\ ${tx(c.u)}^2$`, `$${n(V)} = \\tfrac13 \\times ${n(B)} \\times h$`, `$h = \\dfrac{3 \\times ${n(V)}}{${n(B)}} = \\dfrac{${n(3 * V)}}{${n(B)}} \\approx ${nf(h, 3)}$`, `The height is about ${len(Number(fmtFixed(h, 1)), c.u)}.`],
        };
      }
      const c = rng.pick([
        { thing: 'a glass aquarium', l: [60, 120], w: [30, 45], h: [40, 55] },
        { thing: 'a rectangular stock-watering tank', l: [150, 250], w: [60, 90], h: [50, 70] },
        { thing: 'a fish-cleaning sink', l: [50, 80], w: [35, 50], h: [25, 35] },
      ]);
      const l = 5 * rng.int(c.l[0] / 5, c.l[1] / 5);
      const w = 5 * rng.int(c.w[0] / 5, c.w[1] / 5);
      const H = rng.int(c.h[0], c.h[1]);
      const Lin = retry(() => rng.int(Math.ceil((l * w * H * 0.4) / 1000), Math.floor((l * w * H * 0.9) / 1000)), (x) => !nearHalf((x * 1000) / (l * w), 1));
      const V = Lin * 1000;
      const depth = V / (l * w);
      return {
        prompt: `${name} pours ${capX(Lin, 'L')} of water into ${c.thing} that is ${len(l, 'cm')} long and ${len(w, 'cm')} wide inside (and ${len(H, 'cm')} deep). How deep is the water, ${roundingPhrase(1)} of a centimetre? Use $1\\ \\text{L} = 1000\\ \\text{cm}^3$.`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${l} cm`, w: `${w} cm`, h: `${H} cm` } },
        parts: [rPart(depth, 1, 'cm', 'Depth')],
        hints: ['Change the litres to cubic centimetres (multiply by 1000).', 'The water is a rectangular prism: depth $= \\dfrac{V}{l \\times w}$.'],
        solution: [`$V = ${Lin} \\times 1000 = ${n(V)}\\ \\text{cm}^3$`, `Base area: $${l} \\times ${w} = ${n(l * w)}\\ \\text{cm}^2$`, `Depth: $${n(V)} \\div ${n(l * w)} \\approx ${nf(depth, 2)}\\ \\text{cm}$`, `The water is about ${len(Number(fmtFixed(depth, 1)), 'cm')} deep.`],
      };
    }
    const mode = rng.pick(['cylR', 'sphereR', 'coneR'] as const);
    if (mode === 'cylR') {
      const c = rng.pick([
        { lead: 'A round planter must hold', u: 'cm', L: () => 10 * rng.int(4, 20), h: () => 5 * rng.int(8, 14), ask: 'radius' },
        { lead: 'A cylindrical form for a concrete column must hold', u: 'm', L: () => 0, h: () => rng.int(24, 36) / 10, ask: 'diameter' },
        { lead: 'A round water tank must hold', u: 'm', L: () => 500 * rng.int(4, 20), h: () => rng.int(15, 25) / 10, ask: 'radius' },
      ]);
      if (c.ask === 'diameter') {
        const [V, h] = retry(() => [rng.int(10, 40) / 100, c.h()], ([a, b]) => {
          const rr = Math.sqrt(a / (Math.PI * b));
          return !nearHalf(2 * rr * 100, 0) && rr > 0.08;
        });
        const r2 = V / (Math.PI * h);
        const r = Math.sqrt(r2);
        const dcm = 2 * r * 100;
        return {
          prompt: `${c.lead} ${vol(V, 'm')} of concrete and be ${len(h, 'm')} tall. What diameter of form is needed, to the nearest centimetre?`,
          figure: { type: 'solid', shape: 'cylinder', labels: { d: 'd', h: `${n(h)} m` } },
          parts: [rPart(dcm, 0, 'cm', '$d =$')],
          hints: ['Solve $V = \\pi r^2 h$ for $r^2$: $r^2 = \\dfrac{V}{\\pi h}$. Then take the square root.', 'The diameter is twice the radius. Change metres to centimetres at the end.'],
          solution: [`$${n(V)} = \\pi r^2 (${n(h)})$`, `$r^2 = \\dfrac{${n(V)}}{\\pi(${n(h)})} \\approx ${nf(r2, 5)}$`, `$r = \\sqrt{${nf(r2, 5)}} \\approx ${nf(r, 4)}\\ \\text{m}$`, `$d = 2r \\approx ${nf(2 * r, 4)}\\ \\text{m} \\approx ${nf(dcm, 1)}\\ \\text{cm}$`, `The form needs a diameter of about ${len(Math.round(dcm), 'cm')}.`],
        };
      }
      const [Lt, h] = retry(() => [c.L(), c.h()], ([a, b]) => {
        const v = c.u === 'cm' ? a * 1000 : a / 1000;
        const rr = Math.sqrt(v / (Math.PI * b));
        return !nearHalf(rr, c.u === 'cm' ? 1 : 2) && (c.u === 'cm' ? rr > 10 && rr < 60 : rr > 0.5 && rr < 2.5);
      });
      const V = c.u === 'cm' ? Lt * 1000 : Lt / 1000;
      const r2 = V / (Math.PI * h);
      const r = Math.sqrt(r2);
      const dec = c.u === 'cm' ? 1 : 2;
      return {
        prompt: `${c.lead} ${capX(Lt, 'L')} and be ${len(h, c.u)} tall inside. What inside radius does it need, ${roundingPhrase(dec)} of a ${UNIT[c.u].one}? Use ${c.u === 'cm' ? '$1\\ \\text{L} = 1000\\ \\text{cm}^3$' : '$1\\ \\text{m}^3 = 1000\\ \\text{L}$'}.`,
        figure: { type: 'solid', shape: 'cylinder', labels: { r: 'r', h: `${n(h)} ${c.u}` } },
        parts: [rPart(r, dec, c.u, '$r =$')],
        hints: [`Change the litres to ${c.u === 'cm' ? 'cubic centimetres' : 'cubic metres'} first.`, 'Solve $V = \\pi r^2 h$ for $r$: $r = \\sqrt{\\dfrac{V}{\\pi h}}$.'],
        solution: [
          c.u === 'cm' ? `$V = ${n(Lt)} \\times 1000 = ${n(V)}\\ \\text{cm}^3$` : `$V = ${n(Lt)} \\div 1000 = ${n(V)}\\ \\text{m}^3$`,
          `$${n(V)} = \\pi r^2 (${n(h)})$, so $r^2 = \\dfrac{${n(V)}}{\\pi(${n(h)})} \\approx ${nf(r2, 4)}$`,
          `$r = \\sqrt{${nf(r2, 4)}} \\approx ${nf(r, dec + 2)}$`,
          `The radius must be about ${len(Number(fmtFixed(r, dec)), c.u)}.`,
        ],
      };
    }
    if (mode === 'sphereR') {
      const c = rng.pick([
        { lead: 'A spherical water tank on a tower must hold', u: 'm', L: () => 1000 * rng.int(50, 400), unitIn: 'L' },
        { lead: 'A spherical propane tank must hold', u: 'm', L: () => 1000 * rng.int(20, 120), unitIn: 'L' },
        { lead: 'A round glass fishbowl (treat it as a whole sphere) must hold', u: 'cm', L: () => rng.int(4, 40), unitIn: 'L' },
        { lead: 'A spherical buoy must have a volume of', u: 'cm', L: () => 0, unitIn: 'cm' },
      ]);
      const buoy = c.unitIn === 'cm';
      const [Lt] = retry(() => [buoy ? 1000 * rng.int(20, 200) : c.L()], ([a]) => {
        const v = buoy ? a : c.u === 'cm' ? a * 1000 : a / 1000;
        const rr = Math.cbrt((3 * v) / (4 * Math.PI));
        return !nearHalf(rr, c.u === 'cm' ? 1 : 2);
      });
      const V = buoy ? Lt : c.u === 'cm' ? Lt * 1000 : Lt / 1000;
      const r3v = (3 * V) / (4 * Math.PI);
      const r = Math.cbrt(r3v);
      const dec = c.u === 'cm' ? 1 : 2;
      const given = buoy ? vol(V, 'cm') : capX(Lt, 'L');
      const conv = buoy ? [] : [c.u === 'cm' ? `$V = ${n(Lt)} \\times 1000 = ${n(V)}\\ \\text{cm}^3$` : `$V = ${n(Lt)} \\div 1000 = ${n(V)}\\ \\text{m}^3$`];
      return {
        prompt: `${c.lead} ${given}. What ${buoy ? '' : 'inside '}radius does it need, ${roundingPhrase(dec)} of a ${UNIT[c.u].one}?${buoy ? '' : ` Use ${c.u === 'cm' ? '$1\\ \\text{L} = 1000\\ \\text{cm}^3$' : '$1\\ \\text{m}^3 = 1000\\ \\text{L}$'}.`}`,
        figure: { type: 'solid', shape: 'sphere', labels: { r: 'r' } },
        parts: [rPart(r, dec, c.u, '$r =$')],
        hints: [buoy ? 'Start with $V = \\tfrac43 \\pi r^3$ and put in the volume.' : `Change the litres to ${c.u === 'cm' ? 'cubic centimetres' : 'cubic metres'}, then use $V = \\tfrac43 \\pi r^3$.`, 'Multiply by 3, divide by $4\\pi$, then take the cube root: $r = \\sqrt[3]{\\dfrac{3V}{4\\pi}}$.'],
        solution: [
          ...conv,
          `$${n(V)} = \\tfrac43 \\pi r^3$, so $r^3 = \\dfrac{3 \\times ${n(V)}}{4\\pi} \\approx ${nf(r3v, 3)}$`,
          `$r = \\sqrt[3]{${nf(r3v, 3)}} \\approx ${nf(r, dec + 2)}$`,
          `The radius must be about ${len(Number(fmtFixed(r, dec)), c.u)}.`,
        ],
      };
    }
    const c = rng.pick([
      { what: 'sand', V: () => rng.int(10, 80), h: () => rng.int(15, 35) / 10 },
      { what: 'road salt', V: () => rng.int(60, 300), h: () => rng.int(30, 60) / 10 },
      { what: 'gravel', V: () => rng.int(20, 120), h: () => rng.int(20, 40) / 10 },
      { what: 'compost', V: () => rng.int(5, 40), h: () => rng.int(12, 25) / 10 },
    ]);
    const [V, h] = retry(() => [c.V(), c.h()], ([a, b]) => {
      const rr = Math.sqrt((3 * a) / (Math.PI * b));
      return !nearHalf(2 * rr, 1) && rr > b;
    });
    const r2 = (3 * V) / (Math.PI * h);
    const r = Math.sqrt(r2);
    return {
      prompt: `A conveyor drops ${vol(V, 'm')} of ${c.what} into a cone-shaped pile ${len(h, 'm')} high. How wide is the pile across the bottom (its diameter), ${roundingPhrase(1)} of a metre?`,
      figure: { type: 'solid', shape: 'cone', labels: { d: 'd', h: `${n(h)} m` } },
      parts: [rPart(2 * r, 1, 'm', '$d =$')],
      hints: ['Solve $V = \\tfrac13 \\pi r^2 h$ for $r$: $r = \\sqrt{\\dfrac{3V}{\\pi h}}$.', 'The diameter is twice the radius.'],
      solution: [
        `$${V} = \\tfrac13 \\pi r^2 (${n(h)})$`,
        `$r^2 = \\dfrac{3 \\times ${V}}{\\pi(${n(h)})} \\approx ${nf(r2, 3)}$`,
        `$r = \\sqrt{${nf(r2, 3)}} \\approx ${nf(r, 3)}\\ \\text{m}$`,
        `$d = 2r \\approx ${nf(2 * r, 2)}\\ \\text{m}$`,
        `The pile is about ${len(Number(fmtFixed(2 * r, 1)), 'm')} across.`,
      ],
    };
  },
});

export const VOLUME_SKILLS: SkillDef[] = [volPrism, volCylinder, volPyramidCone, volSphere, volApply, volRearrange];
