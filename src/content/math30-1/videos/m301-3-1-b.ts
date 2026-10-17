import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

// The four cases of end behaviour, side by side: a small plane each, with its case written below.
const cases: [string, (x: number) => number, string, string][] = [
  ['c1', (x) => x ** 3 - 3 * x, '\\text{odd},\\ a_n > 0', '\\text{III to I}'],
  ['c2', (x) => -(x ** 3) + 3 * x, '\\text{odd},\\ a_n < 0', '\\text{II to IV}'],
  ['c3', (x) => x ** 4 - 3 * x ** 2, '\\text{even},\\ a_n > 0', '\\text{II to I}'],
  ['c4', (x) => -(x ** 4) + 3 * x ** 2, '\\text{even},\\ a_n < 0', '\\text{III to IV}'],
];
const four: Part[] = cases.flatMap(([id, f, kind, quads], i) => {
  const g = plane({ name: id, x: [-2.2, 2.2], y: [-4, 4], every: 0, width: 4.4, height: 4.4, at: [6.4 * i, 0] });
  const below: Part = {
    points: { [`${id}-k`]: [6.4 * i, -2.85], [`${id}-q`]: [6.4 * i, -3.75] },
    items: [
      { kind: 'label', id: `${id}-kind`, at: `${id}-k`, tex: kind, place: 'center', group: `${id}-text` },
      { kind: 'label', id: `${id}-quads`, at: `${id}-q`, tex: quads, tone: 'theta', place: 'center', group: `${id}-text` },
    ],
  };
  return [g, plot(g, { id: 'curve', f, tone: 'brand' }), below];
});

const q1 = plane({ name: 'q1', x: [-4, 4], y: [-8, 8], yStep: 2, every: 0, width: 8, height: 8 });
const q2 = plane({ name: 'q2', x: [-4, 4], y: [-6, 6], yStep: 2, every: 0, width: 8, height: 8, at: [11, 0] });
// Muted quadrant numbers, so "quadrant III to quadrant I" can be read off the graph.
const quadrants = (g: typeof q1, x: number, y: number): Part => ({
  points: { [g.n('I')]: g.map(x, y), [g.n('II')]: g.map(-x, y), [g.n('III')]: g.map(-x, -y), [g.n('IV')]: g.map(x, -y) },
  items: (['I', 'II', 'III', 'IV'] as const).map((q) => ({ kind: 'label', id: g.n(`Q${q}`), at: g.n(q), tex: `\\text{${q}}`, tone: 'muted', place: 'center', group: g.n('quads') })),
});
const names: Part = {
  points: { 'e1': [0, -4.7], 'e2': [11, -4.7] },
  items: [
    { kind: 'label', id: 'e1', at: 'e1', tex: 'y = x^3 - 4x', place: 'center', tone: 'brand' },
    { kind: 'label', id: 'e2', at: 'e2', tex: 'y = -x^4 + 5x^2 - 4', place: 'center', tone: 'brand' },
  ],
};

const video: Explainer = {
  id: 'm301-3-1-b',
  lessonId: 'm301-3-1',
  title: 'Characteristics of Polynomial Functions, Part 2: End Behaviour',
  thumbnailTitle: 'End Behaviour',
  thumbnail: false,
  summary: 'Why the leading term controls a polynomial graph far from the origin, the four cases of end behaviour from the degree (odd or even) and the sign of the leading coefficient, the graphs of y = x³ − 4x and y = −x⁴ + 5x² − 4, and checking with a large value of x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.1 · Part 2', title: 'End Behaviour', subtitle: 'Where the graph goes at both ends' }],
      lines: [
        { say: 'Far from the origin, every polynomial graph heads up or down forever. Which way it goes at each end depends on just two things.', show: 'title' },
        { say: 'In this video, you will predict the end behaviour of a polynomial function from its leading term, and check it with a graph.' },
      ],
    },
    {
      chapter: 'The leading term wins',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'End behaviour', md: 'The **end behaviour** of a graph describes what happens to the $y$-values as $x$ moves far to the left ($x \\to -\\infty$) and far to the right ($x \\to \\infty$).' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x^3 - 4x = x^3\\left(1 - \\dfrac{4}{x^2}\\right)', 'x = 100\\colon\\quad 1 - \\dfrac{4}{10\\,000} = 0.9996', 'P(x) = a_nx^n\\left(1 + \\dfrac{a_{n-1}}{a_nx} + \\dots + \\dfrac{a_0}{a_nx^n}\\right)'] },
      ],
      lines: [
        { say: 'The end behaviour of a graph describes what happens to the y-values as x moves far to the left, toward negative infinity, and far to the right, toward infinity.', show: 'def' },
        { say: 'For large values of x, the leading term controls everything. Take x cubed minus four x, and factor out the leading term: x cubed, times one minus four over x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'When x is 100, four over x squared is four over 10,000, so the bracket is 0.9996: almost exactly one. The further out you go, the closer the bracket gets to one.', show: 'm.1', focus: 'm.1' },
        { say: 'The same happens for any polynomial. Factor out "a" sub n, x to the n, and every fraction in the bracket shrinks toward zero. So far from the origin, P of x behaves like its leading term.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Four cases',
      layout: 'center',
      main: [
        figure('ends', four),
        { kind: 'callout', id: 'key', tone: 'key', title: 'End behaviour', md: 'Odd degree: the ends go **opposite** ways. Even degree: the **same** way. A positive leading coefficient makes the **right end rise**.' },
      ],
      lines: [
        { say: 'Only two things matter: whether the degree is odd or even, and the sign of the leading coefficient. That gives four cases.', show: ['ends.c1-grid', 'ends.c1-axes', 'ends.c2-grid', 'ends.c2-axes', 'ends.c3-grid', 'ends.c3-axes', 'ends.c4-grid', 'ends.c4-axes'] },
        { say: 'Odd degree with a positive leading coefficient: the graph falls to the left and rises to the right. It extends from quadrant three to quadrant one, like y equals x cubed.', show: ['ends.c1-curve', 'ends.c1-text'], focus: 'ends.c1-curve' },
        { say: 'Odd degree with a negative leading coefficient is the reverse: it rises to the left and falls to the right, from quadrant two to quadrant four.', show: ['ends.c2-curve', 'ends.c2-text'], focus: 'ends.c2-curve' },
        { say: 'Even degree with a positive leading coefficient: both ends rise, from quadrant two to quadrant one, like a parabola that opens up.', show: ['ends.c3-curve', 'ends.c3-text'], focus: 'ends.c3-curve' },
        { say: 'And even degree with a negative leading coefficient: both ends fall, from quadrant three to quadrant four.', show: ['ends.c4-curve', 'ends.c4-text'], focus: 'ends.c4-curve' },
        { say: 'So with an odd degree, the ends go opposite ways, and with an even degree, they go the same way. A positive leading coefficient always makes the right end rise.', show: 'key', focus: 'ends' },
      ],
    },
    {
      chapter: 'Two graphs',
      layout: 'center',
      main: [
        figure('two', [
          q1,
          quadrants(q1, 3.3, 6.5),
          plot(q1, { id: 'curve', f: (x) => x ** 3 - 4 * x, tone: 'brand' }),
          dots(q1, [-2, 0, 2].map((x, i) => ({ id: `z${i}`, x, y: 0, group: 'zeros' }))),
          q2,
          quadrants(q2, 3.3, 4.8),
          plot(q2, { id: 'curve', f: (x) => -(x ** 4) + 5 * x ** 2 - 4, tone: 'brand' }),
          dots(q2, [-2, -1, 1, 2].map((x, i) => ({ id: `z${i}`, x, y: 0, group: 'zeros' }))),
          names,
        ]),
      ],
      lines: [
        { say: 'Here is y equals x cubed minus four x. The degree is three, which is odd, and the leading coefficient is one, which is positive.', show: ['two.q1-grid', 'two.q1-axes', 'two.q1-quads', 'two.q1-curve', 'two.e1'], focus: 'two.q1-curve' },
        { say: 'So the graph falls to the left and rises to the right. It extends from quadrant three to quadrant one.', focus: ['two.q1-QIII', 'two.q1-QI'] },
        { say: 'And here is y equals negative x to the fourth, plus five x squared, minus four. The degree is four, which is even, and the leading coefficient is negative one.', show: ['two.q2-grid', 'two.q2-axes', 'two.q2-quads', 'two.q2-curve', 'two.e2'], focus: 'two.q2-curve' },
        { say: 'So both ends fall. It extends from quadrant three to quadrant four.', focus: ['two.q2-QIII', 'two.q2-QIV'] },
        { say: 'In the middle, each graph bends through its x-intercepts. But far from the origin, only the leading term matters.', show: ['two.q1-zeros', 'two.q2-zeros'], focus: 'two' },
      ],
    },
    {
      chapter: 'Describing end behaviour',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['P(x) = -x^4 + 3x^3 - 2x + 1', '\\text{leading term } {-x^4}\\colon\\ \\text{even degree},\\ a_n < 0', '\\text{both ends fall: quadrant III to quadrant IV}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with a large value of x', md: '$P(10) = -10\\,000 + 3000 - 20 + 1 = -7019$. The value is large and negative, so the right end falls.' },
      ],
      lines: [
        { say: 'Describe the end behaviour of P of x equals negative x to the fourth, plus three x cubed, minus two x, plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'The leading term is negative x to the fourth. The degree is even, so both ends point the same way. The leading coefficient is negative, so both point down.', show: 'm.1', focus: 'm.1' },
        { say: 'So both ends fall: the graph extends from quadrant three to quadrant four.', show: 'm.2', focus: 'm.2' },
        { say: 'You can check with a large value of x. P of ten is negative 10,000, plus 3,000, minus twenty, plus one: negative 7,019. That is large and negative, so the right end does fall.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Even degree with a negative leading coefficient', md: 'A negative leading coefficient does not make the ends go in opposite directions. For an even degree, both ends still point the same way; the negative sign just turns them both downward.' }],
      lines: [
        { say: 'A common mistake is to think a negative leading coefficient makes the ends go in opposite directions. It does not.', show: 'oops' },
        { say: 'For an even degree, both ends still point the same way. The negative sign just turns them both downward. Only an odd degree makes the ends go opposite ways.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Describe the end behaviour of $y = -2x^3 + x^2 + 5$.',
          choices: ['Quadrant II to IV', 'Quadrant III to IV', 'Quadrant III to I', 'Quadrant II to I'],
          answer: 0,
          working: 'The leading term is $-2x^3$. The degree is odd, so the ends go opposite ways; the leading coefficient is negative, so the right end falls. It rises to the left and falls to the right.',
        },
      ],
      lines: [
        { say: 'Your turn. Describe the end behaviour of y equals negative two x cubed, plus x squared, plus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The leading term is negative two x cubed. The degree is odd, so the ends go opposite ways, and the leading coefficient is negative, so the right end falls. B makes both ends fall, but that only happens with an even degree.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Far from the origin, $P(x)$ behaves like its leading term $a_nx^n$.', 'Odd degree: the ends go opposite ways. Even degree: the same way.', 'A positive leading coefficient makes the right end rise.'] }],
      lines: [
        { say: 'Let’s sum up. Far from the origin, a polynomial behaves like its leading term.', show: 'sum.0' },
        { say: 'With an odd degree, the ends go opposite ways. With an even degree, they go the same way.', show: 'sum.1' },
        { say: 'And a positive leading coefficient makes the right end rise. In part three, we count intercepts and turning points, and match graphs to equations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
