import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';
import { hline, note } from './lib/m301-5-graphs.ts';

const PI = Math.PI;

/** Three small graphs side by side: where sine, cosine and negative cosine start their cycles. */
const starts: Part[] = (
  [
    ['s', Math.sin, 'y = \\sin x'],
    ['c', Math.cos, 'y = \\cos x'],
    ['n', (x: number) => -Math.cos(x), 'y = -\\cos x'],
  ] as const
).flatMap(([name, f, tex], i) => {
  const p0 = plane({ name, x: [0, 2 * PI], y: [-1.5, 1.5], xStep: PI / 2, every: 0, width: 3.6, height: 2.6, at: [i * 4.9, 0] });
  // No axis names: the title above each graph names it.
  const p = { ...p0, items: p0.items.filter((it) => !it.id.endsWith('-name')) };
  return [p, plot(p, { id: 'curve', f, samples: 160 }), dots(p, [{ id: 'start', x: 0, y: f(0), tone: 'theta' }]), note(p, { id: 'name', x: PI, y: 1.95, tex })];
});

const h = (t: number) => -20 * Math.cos((PI / 30) * t) + 22;
const g = plane({ x: [0, 120], y: [0, 45], xStep: 10, yStep: 5, every: 2, width: 8, height: 5.5, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });

const video: Explainer = {
  id: 'm301-5-4',
  lessonId: 'm301-5-4',
  title: 'Equations and Graphs of Trigonometric Functions, Part 1: Building a Model',
  thumbnailTitle: 'Building a Sinusoidal Model',
  thumbnail: 'fw',
  summary: 'Modelling a periodic situation with y = a sin b(t − c) + d or y = a cos b(t − c) + d: d is the middle value, |a| the amplitude, b = 2π/period, and the function chosen from where the cycle starts. Worked example: a Ferris wheel, h(t) = −20 cos(πt/30) + 22, and the rider’s height after 25 s, in radian mode.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.4 · Part 1', title: 'Building a Model', subtitle: 'A Ferris wheel as a sinusoidal function' }],
      lines: [
        { say: 'Tides in the Bay of Fundy, the hours of daylight in Edmonton and the height of a Ferris wheel seat all repeat on a regular cycle.', show: 'title' },
        { say: 'In this video, you will turn a cycle like that into an equation, and use it to find a height.' },
      ],
    },
    {
      chapter: 'Four features',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = a\\sin b(t - c) + d \\qquad y = a\\cos b(t - c) + d'] },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '$d$ is the middle value, halfway between the maximum and minimum.',
            '$|a|$ is the amplitude, half the distance between the maximum and minimum.',
            '$b = \\dfrac{2\\pi}{\\text{period}}$, with the period in the units of $t$.',
            'Choose the function and $c$ from the starting point.',
          ],
        },
      ],
      lines: [
        { say: 'To model a periodic situation, use y equals "a" sine b, t minus c, plus d, or the same with cosine. Here, t is time.', show: 'm' },
        { say: 'd is the middle value, halfway between the maximum and the minimum.', show: 'b.0' },
        { say: 'The absolute value of "a" is the amplitude: half the distance between the maximum and the minimum.', show: 'b.1' },
        { say: 'b is two pi over the period, with the period measured in the units of t, such as seconds or days.', show: 'b.2' },
        { say: 'And the function, and c, come from where the cycle starts.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Where the cycle starts',
      layout: 'center',
      main: [figure('st', starts, 380)],
      lines: [
        { say: 'Sine starts its cycle on the midline, going up.', show: ['st.s-grid', 'st.s-axes', 'st.s-curve', 'st.s-start', 'st.s-name'], focus: 'st.s-start' },
        { say: 'Cosine starts at a maximum.', show: ['st.c-grid', 'st.c-axes', 'st.c-curve', 'st.c-start', 'st.c-name'], focus: 'st.c-start' },
        { say: 'And negative cosine starts at a minimum. That is the one for a rider who boards a Ferris wheel at the bottom.', show: ['st.n-grid', 'st.n-axes', 'st.n-curve', 'st.n-start', 'st.n-name'], focus: 'st.n-start' },
      ],
    },
    {
      chapter: 'A Ferris wheel',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A Ferris wheel has a radius of $20$ m, and its centre is $22$ m above the ground. It makes one rotation every $60$ s. A rider boards at the lowest point at $t = 0$. Write an equation for the rider’s height.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['|a| = 20,\\quad d = 22', '\\text{starts at a minimum: } {-\\cos},\\ \\ a = -20', 'b = \\dfrac{2\\pi}{60} = \\dfrac{\\pi}{30}', 'h(t) = -20\\cos\\left(\\dfrac{\\pi}{30}t\\right) + 22'] },
      ],
      lines: [
        { say: 'A Ferris wheel has a radius of twenty metres, and its centre is 22 metres above the ground. It makes one rotation every sixty seconds. A rider boards at the lowest point, at time zero. Write an equation for the rider’s height.', show: 'q' },
        { say: 'The amplitude is the radius: twenty. The middle value is the height of the centre, so d is 22.', show: 'm.0', focus: 'm.0' },
        { say: 'The rider starts at the lowest point: a minimum. So use negative cosine, and "a" is negative twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'One rotation takes sixty seconds, so the period is sixty, and b is two pi over sixty: pi over thirty.', show: 'm.2', focus: 'm.2' },
        { say: 'So h of t equals negative twenty cosine, pi over thirty t, plus 22.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'split',
      leftWidth: 640,
      left: [
        figure('fw', [
          g,
          hline(g, { id: 'mid', y: 22, tone: 'adj' }),
          plot(g, { id: 'curve', f: h, samples: 300 }),
          dots(g, [
            { id: 'A', x: 0, y: 2, tone: 'theta', group: 'low' },
            { id: 'B', x: 30, y: 42, tone: 'theta' },
            { id: 'C', x: 60, y: 2, tone: 'theta', group: 'low' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{bottom: } 22 - 20 = 2 \\text{ m}', '\\text{top: } 22 + 20 = 42 \\text{ m}', '\\text{period: } 60 \\text{ s}'] }],
      lines: [
        { say: 'Here is the graph, with the midline at 22 metres. The rider starts two metres above the ground, at the bottom of the wheel: 22 minus twenty.', show: ['fw.grid', 'fw.axes', 'fw.mid', 'fw.A', 'm.0'], focus: ['fw.A', 'm.0'] },
        { say: 'Thirty seconds later, halfway round, the rider is at the top: 22 plus twenty, which is 42 metres.', show: ['fw.B', 'm.1'], focus: ['fw.B', 'm.1'] },
        { say: 'After sixty seconds, the rider is back at the bottom, and the cycle repeats.', show: ['fw.C', 'fw.curve', 'm.2'], focus: ['fw.curve', 'm.2'] },
      ],
    },
    {
      chapter: 'The height after 25 s',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['h(25) = -20\\cos\\left(\\dfrac{25\\pi}{30}\\right) + 22', '= -20\\cos\\dfrac{5\\pi}{6} + 22', '= -20\\left(-\\dfrac{\\sqrt{3}}{2}\\right) + 22 = 10\\sqrt{3} + 22', '\\approx 39.32'],
        },
      ],
      lines: [
        { say: 'Now find the height after 25 seconds. Substitute 25 for t: h of 25 equals negative twenty cosine of 25 pi over thirty, plus 22.', show: 'm.0', focus: 'm.0' },
        { say: '25 pi over thirty simplifies to five pi over six.', show: 'm.1', focus: 'm.1' },
        { say: 'Cosine of five pi over six is negative root three over two. Negative twenty times negative root three over two is ten root three, so h of 25 is ten root three, plus 22.', show: 'm.2', focus: 'm.2' },
        { say: 'That is about 39.32. After 25 seconds, the rider is about 39.3 metres above the ground: close to the top.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Degree mode',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Degree mode: } h(25) \\approx 2.0 \\text{ m?}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Degree mode', md: 'The angle $\\frac{\\pi}{30}t$ is in radians. In degree mode, $h(25)$ comes out as about $2.0$ m, which cannot be right: after $25$ s the rider is near the top of the wheel.' },
      ],
      lines: [
        { say: 'A common mistake is to evaluate the model in degree mode. The angle, pi over thirty t, is in radians.', show: 'm' },
        { say: 'In degree mode, h of 25 comes out as about 2.0 metres. That cannot be right: after 25 seconds, the rider is nearly at the top of the wheel, not at the bottom.', show: 'oops' },
        { say: 'So set your calculator to radian mode, and check that your answer makes sense with the graph.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A Ferris wheel has a radius of $15$ m, its centre is $17$ m above the ground, and it makes one rotation every $40$ s. A rider boards at the lowest point at $t = 0$. Which equation models the rider’s height?',
          choices: ['$h(t) = -15\\cos\\left(\\frac{\\pi}{20}t\\right) + 17$', '$h(t) = 15\\cos\\left(\\frac{\\pi}{20}t\\right) + 17$', '$h(t) = -15\\cos\\left(\\frac{\\pi}{40}t\\right) + 17$', '$h(t) = -17\\cos\\left(\\frac{\\pi}{20}t\\right) + 15$'],
          answer: 0,
          working: '$|a| = 15$ (the radius) and $d = 17$ (the centre). The rider starts at a minimum, so use $-\\cos$: $a = -15$. $b = \\frac{2\\pi}{40} = \\frac{\\pi}{20}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A Ferris wheel has a radius of fifteen metres, its centre is seventeen metres above the ground, and it makes one rotation every forty seconds. A rider boards at the lowest point, at time zero. Which equation models the rider’s height? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The amplitude is the radius, fifteen, and the midline is the height of the centre, seventeen. The rider starts at a minimum, so use negative cosine. And b is two pi over forty, which is pi over twenty. B uses positive cosine, which would start the rider at the top.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['$d = \\frac{\\max + \\min}{2}$, $|a| = \\frac{\\max - \\min}{2}$, $b = \\frac{2\\pi}{\\text{period}}$.', 'Sine starts on the midline going up, cosine at a maximum, negative cosine at a minimum.', 'Evaluate models in radian mode.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. d is the middle value, the absolute value of "a" is half the distance from the maximum to the minimum, and b is two pi over the period.', show: 'sum.0' },
        { say: 'Sine starts on the midline going up, cosine at a maximum, and negative cosine at a minimum.', show: 'sum.1' },
        { say: 'And evaluate models in radian mode. In part two, we solve the model, to find when the rider reaches a given height. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
