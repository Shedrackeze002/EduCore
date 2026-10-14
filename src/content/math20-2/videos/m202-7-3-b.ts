import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [0, 3], y: [0, 10], xStep: 0.5, yStep: 2, every: 2, width: 7, height: 5, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });
const h = (t: number) => -4.9 * t * t + 12 * t + 1.5;
const land = (12 + Math.sqrt(173.4)) / 9.8;

/** A dashed line at a height of 5 m. */
const five: Part = {
  points: { f0: g.map(0, 5), f1: g.map(3, 5) },
  items: [{ kind: 'line', id: 'h5', from: 'f0', to: 'f1', tone: 'theta', dashed: true }],
};

const video: Explainer = {
  id: 'm202-7-3-b',
  lessonId: 'm202-7-3',
  title: 'Solving Problems with Quadratic Equations, Part 2: Projectiles',
  thumbnailTitle: 'Projectile Problems',
  thumbnail: 'bl',
  summary: 'The projectile model h = −4.9t² + vt + h₀, when a kicked ball lands (about 2.57 s, rejecting a negative time), and the two times it is 5 m high (about 0.34 s and 2.11 s), where both roots make sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 7.3 · Part 2', title: 'Projectiles', subtitle: 'When does it land?' }],
      lines: [
        { say: 'A ball kicked into the air rises, slows, and falls back down along a parabola. A quadratic equation can tell you exactly when it lands.', show: 'title' },
        { say: 'In this video, you will solve projectile problems, and decide which roots make sense.' },
      ],
    },
    {
      chapter: 'The projectile model',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['h = -4.9t^2 + vt + h_0'] },
        { kind: 'bullets', id: 'b', items: ['$t$: time in seconds', '$v$: starting upward speed, in metres per second', '$h_0$: starting height, in metres', '$-4.9$: from gravity, about $9.8$ m/s² near Earth’s surface'] },
      ],
      lines: [
        { say: 'The height of an object thrown or kicked into the air is often modelled by h equals negative 4.9 t squared, plus v t, plus h naught.', show: 'm.0', focus: 'm.0' },
        { say: 'Here t is the time in seconds, v is the starting upward speed in metres per second, and h naught is the starting height in metres.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'The negative 4.9 comes from gravity, which near Earth’s surface is about 9.8 metres per second squared. Half of that, with a negative sign, pulls the ball back down.', show: 'b.3' },
      ],
    },
    {
      chapter: 'When does it land?',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('bl', [
          g,
          plot(g, { id: 'curve', f: h, from: 0, to: land, tone: 'brand' }),
          dots(g, [{ id: 'L', x: land, y: 0, tex: '(2.57, 0)', tone: 'good', place: 'above right' }]),
        ], 400),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-4.9t^2 + 12t + 1.5 = 0', 'b^2 - 4ac = 144 + 29.4 = 173.4', 't = \\dfrac{-12 \\pm \\sqrt{173.4}}{-9.8}', 't \\approx -0.12 \\text{ or } t \\approx 2.57'] }],
      lines: [
        { say: 'Diego kicks a ball, and its height is negative 4.9 t squared, plus twelve t, plus 1.5. When does the ball hit the ground? It hits the ground when the height is zero.', show: ['bl.grid', 'bl.axes', 'bl.curve', 'm.0'], focus: 'm.0' },
        { say: 'This will not factor, so use the formula. b squared minus four "a" c is 144 plus 29.4, which is 173.4.', show: 'm.1', focus: 'm.1' },
        { say: 'Two "a" is negative 9.8, so t is negative twelve, plus or minus root 173.4, over negative 9.8.', show: 'm.2', focus: 'm.2' },
        { say: 'That gives about negative 0.12, or about 2.57. Time after the kick cannot be negative, so reject negative 0.12. The ball lands after about 2.57 seconds.', show: ['m.3', 'bl.L'], focus: ['bl.L', 'm.3'] },
      ],
    },
    {
      chapter: 'Two answers that make sense',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('tw', [
          g,
          plot(g, { id: 'curve', f: h, from: 0, to: land, tone: 'brand' }),
          five,
          dots(g, [
            { id: 'u', x: 0.338, y: 5, tex: '0.34', tone: 'theta', place: 'above left' },
            { id: 'd', x: 2.111, y: 5, tex: '2.11', tone: 'theta', place: 'above right' },
          ]),
        ], 400),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-4.9t^2 + 12t + 1.5 = 5', '-4.9t^2 + 12t - 3.5 = 0', 'b^2 - 4ac = 144 - 68.6 = 75.4', 't \\approx 0.34 \\text{ or } t \\approx 2.11'] }],
      lines: [
        { say: 'When is the same ball five metres above the ground? Set the height equal to five, and rearrange: negative 4.9 t squared, plus twelve t, minus 3.5, equals zero.', show: ['tw.grid', 'tw.axes', 'tw.curve', 'tw.h5', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'b squared minus four "a" c is 144 minus 68.6, which is 75.4.', show: 'm.2', focus: 'm.2' },
        { say: 'So t is about 0.34, or about 2.11 seconds. This time both roots make sense: the line at five metres meets the path twice, once on the way up, and again on the way down.', show: ['m.3', 'tw.u', 'tw.d'], focus: ['tw.u', 'tw.d', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ball’s height is $h = -4.9t^2 + 9.8t + 2$. When does it hit the ground? Round to the nearest hundredth of a second.',
          choices: ['$2.19$ s', '$0.19$ s', '$1.00$ s', '$2.00$ s'],
          answer: 0,
          working: '$b^2 - 4ac = 96.04 + 39.2 = 135.24$, so $t = \\dfrac{-9.8 \\pm \\sqrt{135.24}}{-9.8} \\approx -0.19$ or $2.19$. Reject the negative time. C is when it is highest.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball’s height is negative 4.9 t squared, plus 9.8 t, plus two. When does it hit the ground? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. b squared minus four "a" c is 135.24, and the formula gives about negative 0.19, or 2.19. Reject the negative time: the ball lands after about 2.19 seconds. One second is when it is highest.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$h = -4.9t^2 + vt + h_0$', 'Landing: set $h = 0$. A given height: set $h$ equal to it.', 'Reject negative times; keep both roots when both make sense.'] }],
      lines: [
        { say: 'Let’s sum up. Projectile heights are often modelled by h equals negative 4.9 t squared, plus v t, plus h naught.', show: 'sum.0' },
        { say: 'For landing, set the height to zero. For a given height, set h equal to it, and rearrange.', show: 'sum.1' },
        { say: 'And reject negative times, but keep both roots when both make sense. In part three, we solve border and break-even problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
