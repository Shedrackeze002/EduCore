import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { asymptotes, branches, edgeNumbers, hline, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const g = plane({ x: [-PI / 2 - 0.3, 2 * PI + 0.3], y: [-4.5, 4.5], xStep: PI / 2, every: 0, width: 8, height: 6 });
const poles = [-PI / 2, PI / 2, (3 * PI) / 2, (5 * PI) / 2];
const x0 = Math.atan(-2);

const h = plane({ x: [-0.25, PI + 0.25], y: [-4.5, 4.5], xStep: PI / 4, every: 0, width: 5.5, height: 6 });

const video: Explainer = {
  id: 'm301-5-3-c',
  lessonId: 'm301-5-3',
  title: 'The Tangent Function, Part 3: Solving tan x = k',
  thumbnailTitle: 'Solving tan\u00a0x\u00a0=\u00a0k',
  thumbnail: 'sv',
  summary: 'Each branch of y = tan x crosses a horizontal line once, so tan x = k has one solution per period: find one with the inverse tangent and add or subtract π. Worked example: tan x = −2 for 0 ≤ x ≤ 2π gives x ≈ 2.03 or x ≈ 5.18. Also the period π/|b| of y = tan bx.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.3 · Part 3', title: 'Solving tan x = k', subtitle: 'One solution in every branch' }],
      lines: [
        { say: 'Every branch of the tangent graph rises from negative infinity to positive infinity, so it crosses any horizontal line exactly once.', show: 'title' },
        { say: 'In this video, you will use that to solve equations like tangent x equals negative two, and find the period of y equals tangent b x.' },
      ],
    },
    {
      chapter: 'Solving tan x = −2',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('sv', [
          g,
          edgeNumbers(g, { xs: steps(-PI / 2, 2 * PI, PI / 2), ys: [-4, -2, 0, 2, 4] }),
          asymptotes(g, { id: 'asym', xs: poles }),
          polyline(g, { id: 'dom', points: [[0, 0], [2 * PI, 0]], tone: 'good' }),
          hline(g, { id: 'k', y: -2, tone: 'opp', dashed: false }),
          branches(g, { id: 'tan', f: Math.tan, poles }),
          dots(g, [
            { id: 'A', x: x0, y: -2, tone: 'bad', open: true, group: 'Ag' },
            { id: 'B', x: x0 + PI, y: -2, tex: '2.03', tone: 'good', place: 'below right' },
            { id: 'C', x: x0 + 2 * PI, y: -2, tex: '5.18', tone: 'good', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\tan x = -2,\\quad 0 \\le x \\le 2\\pi', '\\tan^{-1}(-2) \\approx -1.1071', '\\text{(outside the domain)}', '-1.1071 + \\pi \\approx 2.0344', '-1.1071 + 2\\pi \\approx 5.1760', 'x \\approx 2.03 \\ \\text{ or } \\ x \\approx 5.18'],
        },
      ],
      lines: [
        { say: 'Solve tangent x equals negative two, for x from zero to two pi, to the nearest hundredth.', show: ['m.0', 'sv.grid', 'sv.axes', 'sv.asym', 'sv.tan', 'sv.dom'], focus: ['m.0', 'sv.dom'] },
        { say: 'Draw the line y equals negative two. Each branch crosses it exactly once, so expect one solution in each period. From zero to two pi, that means two solutions.', show: 'sv.k', focus: 'sv.k' },
        { say: 'Find one solution with the inverse tangent, in radian mode. The inverse tangent of negative two is about negative 1.1071.', show: ['m.1', 'sv.Ag'], focus: ['m.1', 'sv.Ag'] },
        { say: 'That is outside the domain, so it is not an answer. But it is a starting point.', show: 'm.2', focus: 'm.2' },
        { say: 'The branches repeat every pi, so add pi to move to the next branch: negative 1.1071 plus pi is about 2.0344.', show: ['m.3', 'sv.B'], focus: ['m.3', 'sv.B'] },
        { say: 'Add two pi to reach the branch after that: negative 1.1071 plus two pi is about 5.1760.', show: ['m.4', 'sv.C'], focus: ['m.4', 'sv.C'] },
        { say: 'Adding three pi would go past two pi. So x is about 2.03, or about 5.18.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = \\tan^{-1} k + n\\pi'] },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'One solution per period', md: 'The calculator gives one angle, between $-\\frac{\\pi}{2}$ and $\\frac{\\pi}{2}$. Add or subtract $\\pi$ to move from branch to branch, and keep only the solutions in the domain.' },
      ],
      lines: [
        { say: 'In general, tangent x equals k has one solution in each period: x equals the inverse tangent of k, plus n pi.', show: 'm' },
        { say: 'Your calculator gives only one angle, between negative pi over two and pi over two. Add or subtract pi to move from branch to branch, and keep only the solutions that are in the domain.', show: 'tip' },
      ],
    },
    {
      chapter: 'The period of y = tan bx',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('bx', [
          h,
          edgeNumbers(h, { xs: steps(0, PI, PI / 4), ys: [-4, 0, 4] }),
          asymptotes(h, { id: 'asym', xs: [PI / 4, (3 * PI) / 4] }),
          branches(h, { id: 'tan', f: (x) => Math.tan(2 * x), poles: [PI / 4, (3 * PI) / 4] }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{period of } y = \\tan bx:\\ \\dfrac{\\pi}{|b|}', 'y = \\tan 2x:\\quad \\text{period } \\tfrac{\\pi}{2}', '2x = \\tfrac{\\pi}{2} + n\\pi', 'x = \\tfrac{\\pi}{4} + \\tfrac{n\\pi}{2}'] },
      ],
      lines: [
        { say: 'Just as for sine and cosine, b stretches the tangent graph horizontally. The period of y equals tangent b x is pi over the absolute value of b.', show: 'm.0', focus: 'm.0' },
        { say: 'Here is y equals tangent two x. Its period is pi over two: the branches are half as wide.', show: ['bx.grid', 'bx.axes', 'bx.tan', 'm.1'], focus: ['bx.tan', 'm.1'] },
        { say: 'Its asymptotes are where the angle, two x, equals pi over two, plus n pi.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by two: x equals pi over four, plus n pi over two. So the asymptotes are at pi over four, three pi over four, and every pi over two after that.', show: ['m.3', 'bx.asym'], focus: ['m.3', 'bx.asym'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\tan x = 3$ for $0 \\le x \\le 2\\pi$, to the nearest hundredth.',
          choices: ['$x \\approx 1.25$ only', '$x \\approx 1.25$ or $x \\approx 1.89$', '$x \\approx 1.25$ or $x \\approx 4.39$', '$x \\approx 1.25$ or $x \\approx 7.53$'],
          answer: 2,
          working: '$\\tan^{-1} 3 \\approx 1.2490$, which is in the domain. Adding $\\pi$ gives $\\approx 4.3906$; adding $2\\pi$ gives $\\approx 7.5322$, which is past $2\\pi$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve tangent x equals three, for x from zero to two pi, to the nearest hundredth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The inverse tangent of three is about 1.2490, which is in the domain. Adding pi gives about 4.3906, and adding two pi would go past two pi. So x is about 1.25 or 4.39. D adds two pi instead of pi, and 7.53 is outside the domain.', show: 'q.answer' },
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
          items: ['$\\tan x = k$ has one solution in each period: $x = \\tan^{-1}k + n\\pi$.', 'Use radian mode, then add or subtract $\\pi$, and keep the solutions in the domain.', '$y = \\tan bx$ has period $\\frac{\\pi}{|b|}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Tangent x equals k has one solution in each period: the inverse tangent of k, plus n pi.', show: 'sum.0' },
        { say: 'Use radian mode, then add or subtract pi, and keep only the solutions in the domain.', show: 'sum.1' },
        { say: 'And y equals tangent b x has a period of pi over the absolute value of b. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
