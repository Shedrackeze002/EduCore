import type { Explainer } from '@/video/script.ts';
import { dots, piTex, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

const g = plane({ x: [-2 * Math.PI, 2 * Math.PI], y: [-1.5, 1.5], xStep: Math.PI / 2, yStep: 0.5, every: 2, width: 12, height: 4.2, xTex: piTex });
const pi = Math.PI;

/** The line y = x through the unit circle (drawn 4 units across), meeting it at π/4 and 5π/4. */
const diagonal: Part = {
  points: { 'd-a': [-4.4, -4.4], 'd-b': [4.4, 4.4], 'l45-at': [3.94, 2.56], 'l225-at': [-3.94, -2.56] },
  items: [
    { kind: 'line', id: 'diag', from: 'd-a', to: 'd-b', tone: 'opp', dashed: true, weight: 2.5 },
    // The two angles, set off the line so it does not run through them.
    { kind: 'label', id: 'l45', at: 'l45-at', tex: '\\tfrac{\\pi}{4}', tone: 'brand', place: 'center', group: 'pts' },
    { kind: 'label', id: 'l225', at: 'l225-at', tex: '\\tfrac{5\\pi}{4}', tone: 'brand', place: 'center', group: 'pts' },
  ],
};

const video: Explainer = {
  id: 'm301-4-4-c',
  lessonId: 'm301-4-4',
  title: 'Introduction to Trigonometric Equations, Part 3: Larger Domains and the General Solution',
  thumbnailTitle: 'The General Solution',
  thumbnail: 'two',
  summary: 'Extending solutions beyond one rotation by adding or subtracting 2π: 2 sin θ − 1 = 0 on −2π ≤ θ ≤ 2π has four solutions. The general solution θ = π/6 + 2πn or 5π/6 + 2πn, n ∈ I, and θ = π/4 + πn for tan θ = 1, whose solutions are half a turn apart.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.4 · Part 3', title: 'The General Solution', subtitle: 'Larger domains, and every solution at once' }],
      lines: [
        { say: 'An angle can keep turning, past two pi, or backward below zero. So an equation like sine theta equals one half has infinitely many solutions.', show: 'title' },
        { say: 'In this video, you will solve over a larger domain, and write every solution at once: the general solution.' },
      ],
    },
    {
      chapter: 'Two rotations',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\sin\\theta - 1 = 0, \\quad {-2\\pi} \\le \\theta \\le 2\\pi', '\\sin\\theta = \\dfrac{1}{2}: \\quad \\theta = \\dfrac{\\pi}{6} \\text{ or } \\theta = \\dfrac{5\\pi}{6}', '\\dfrac{\\pi}{6} - 2\\pi = -\\dfrac{11\\pi}{6} \\qquad \\dfrac{5\\pi}{6} - 2\\pi = -\\dfrac{7\\pi}{6}', '\\theta = -\\dfrac{11\\pi}{6},\\ -\\dfrac{7\\pi}{6},\\ \\dfrac{\\pi}{6},\\ \\dfrac{5\\pi}{6}'] },
      ],
      lines: [
        { say: 'Solve two sine theta minus one equals zero, for theta from negative two pi to two pi. That is two full rotations.', show: 'm.0', focus: 'm.0' },
        { say: 'Isolate the sine: sine theta equals one half. The reference angle is pi over six, and the sine is positive in quadrants one and two. So in one rotation, theta is pi over six or five pi over six.', show: 'm.1', focus: 'm.1' },
        { say: 'Every full turn gives the same values again. Subtract two pi from each: pi over six minus two pi is negative eleven pi over six, and five pi over six minus two pi is negative seven pi over six.', show: 'm.2', focus: 'm.2' },
        { say: 'Adding two pi would take both solutions past two pi, outside the domain. So there are four solutions: negative eleven pi over six, negative seven pi over six, pi over six and five pi over six.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'center',
      main: [
        figure('two', [
          g,
          plot(g, { id: 'sine', f: Math.sin, samples: 300 }),
          polyline(g, { id: 'half', points: [[-2 * pi, 0.5], [2 * pi, 0.5]], tone: 'opp', dashed: true }),
          dots(g, [
            { id: 'a', x: pi / 6, y: 0.5, tex: '\\tfrac{\\pi}{6}', tone: 'theta', place: 'below right', group: 'one' },
            { id: 'b', x: (5 * pi) / 6, y: 0.5, tex: '\\tfrac{5\\pi}{6}', tone: 'theta', place: 'above right', group: 'one' },
            { id: 'c', x: pi / 6 - 2 * pi, y: 0.5, tex: '-\\tfrac{11\\pi}{6}', tone: 'adj', place: 'above left', group: 'back' },
            { id: 'd', x: (5 * pi) / 6 - 2 * pi, y: 0.5, tex: '-\\tfrac{7\\pi}{6}', tone: 'adj', place: 'above right', group: 'back' },
          ]),
        ]),
      ],
      lines: [
        { say: 'The graph shows all four. Here is y equals sine theta from negative two pi to two pi, and the line y equals one half.', show: ['two.grid', 'two.axes', 'two.sine', 'two.half'] },
        { say: 'In the first rotation, from zero to two pi, the line crosses the curve at pi over six and five pi over six.', show: 'two.one', focus: 'two.one' },
        { say: 'The curve repeats every two pi, so the crossings repeat too. One turn back, they are at negative eleven pi over six and negative seven pi over six.', show: 'two.back', focus: 'two.back' },
      ],
    },
    {
      chapter: 'The general solution',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'General solution', md: 'Every solution, using $n \\in \\mathbb{I}$ to count full turns.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\theta = \\dfrac{\\pi}{6} + 2\\pi n \\quad \\text{or} \\quad \\theta = \\dfrac{5\\pi}{6} + 2\\pi n, \\qquad n \\in \\mathbb{I}', 'n = 0:\\ \\dfrac{\\pi}{6},\\ \\dfrac{5\\pi}{6} \\qquad n = -1:\\ -\\dfrac{11\\pi}{6},\\ -\\dfrac{7\\pi}{6}'] },
      ],
      lines: [
        { say: 'When the domain has no limits at all, you cannot list every solution. Instead, write the general solution, using an integer n to count full turns.', show: 'def' },
        { say: 'For two sine theta minus one equals zero, theta equals pi over six plus two pi n, or theta equals five pi over six plus two pi n, where n is an integer.', show: 'm.0', focus: 'm.0' },
        { say: 'Each value of n gives two solutions. n equals zero gives pi over six and five pi over six. n equals negative one gives negative eleven pi over six and negative seven pi over six, the solutions you just found. n equals one gives the next pair, one turn further on.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Half a turn apart',
      layout: 'split',
      leftWidth: 540,
      left: [figure('tan', [unitCircle({ points: [{ deg: 45 }, { deg: 225 }] }), diagonal])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan\\theta = 1', '\\theta = \\dfrac{\\pi}{4} \\text{ or } \\theta = \\dfrac{5\\pi}{4}', '\\dfrac{5\\pi}{4} - \\dfrac{\\pi}{4} = \\pi', '\\theta = \\dfrac{\\pi}{4} + \\pi n, \\quad n \\in \\mathbb{I}'] }],
      lines: [
        { say: 'Write the general solution of tangent theta equals one.', show: 'm.0', focus: 'm.0' },
        { say: 'The reference angle is pi over four, and the tangent is positive in quadrants one and three. So in one rotation, theta is pi over four or five pi over four.', show: ['tan.axes', 'tan.circle', 'tan.pts', 'm.1'], focus: ['tan.pts', 'm.1'] },
        { say: 'These two points are exactly opposite each other on the circle, on the line y equals x. They are pi apart: half a turn.', show: ['tan.diag', 'm.2'], focus: ['tan.diag', 'm.2'] },
        { say: 'So one family covers both. Start at pi over four and add half turns: theta equals pi over four plus pi n, where n is an integer.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'When to use πn',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin\\theta = \\dfrac{1}{2}: \\quad \\dfrac{\\pi}{6} + \\pi = \\dfrac{7\\pi}{6}, \\text{ but } \\sin\\dfrac{7\\pi}{6} = -\\dfrac{1}{2}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using half turns too soon', md: 'Use $\\pi n$ only when the two solutions are exactly half a turn apart. Otherwise, add $2\\pi n$ to each solution.' },
      ],
      lines: [
        { say: 'Be careful not to use pi n everywhere. For sine theta equals one half, pi over six plus pi is seven pi over six. But the sine of seven pi over six is negative one half, so it is not a solution.', show: 'm.0', focus: 'm.0' },
        { say: 'Use pi n only when the two solutions are exactly half a turn apart. Otherwise, add two pi n to each solution.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write the general solution of $\\sqrt{3}\\tan\\theta - 1 = 0$, where $n \\in \\mathbb{I}$.',
          choices: ['$\\theta = \\dfrac{\\pi}{6} + 2\\pi n$', '$\\theta = \\dfrac{\\pi}{6} + \\pi n$', '$\\theta = \\dfrac{\\pi}{3} + \\pi n$', '$\\theta = \\dfrac{\\pi}{6} + 2\\pi n$ or $\\dfrac{5\\pi}{6} + 2\\pi n$'],
          answer: 1,
          working: '$\\tan\\theta = \\dfrac{1}{\\sqrt{3}}$, so $\\theta_R = \\dfrac{\\pi}{6}$. Tangent is positive in quadrants I and III: $\\dfrac{\\pi}{6}$ and $\\dfrac{7\\pi}{6}$, which are $\\pi$ apart.',
        },
      ],
      lines: [
        { say: 'Your turn. Write the general solution of root three tangent theta minus one equals zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Tangent theta equals one over root three, so the reference angle is pi over six. The tangent is positive in quadrants one and three: pi over six and seven pi over six, exactly pi apart, so one family covers both. Choice A misses seven pi over six, and D uses the quadrants where the sine is positive.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add or subtract $2\\pi$ (or $360^\\circ$) to reach the rest of a larger domain.', 'General solution: add $2\\pi n$ to each solution, $n \\in \\mathbb{I}$.', 'Use $\\pi n$ when the two solutions are half a turn apart.'] }],
      lines: [
        { say: 'Let’s sum up. Once you have the solutions for one rotation, add or subtract two pi, or 360 degrees, to reach the rest of a larger domain.', show: 'sum.0' },
        { say: 'The general solution adds two pi n to each solution, where n is an integer.', show: 'sum.1' },
        { say: 'When the two solutions are exactly half a turn apart, one family, plus pi n, covers both. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
