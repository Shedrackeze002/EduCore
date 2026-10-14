import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const p1 = plane({ name: 'p1', x: [-2, 4], y: [-4, 6], every: 0 });
const p2 = plane({ name: 'p2', x: [-2, 4], y: [-4, 6], every: 0, at: [10, 0] });
const p3 = plane({ name: 'p3', x: [-1, 5], y: [-4, 6], every: 0, at: [19, 0] });

/** The sign of the discriminant under each of the three planes. */
const captions: Part = {
  points: { n1: [1, -4.2], n2: [11, -4.2], n3: [21, -4.2] },
  items: [
    { kind: 'label', id: 'n1-t', at: 'n1', tex: 'b^2 - 4ac > 0', place: 'below' },
    { kind: 'label', id: 'n2-t', at: 'n2', tex: 'b^2 - 4ac = 0', place: 'below' },
    { kind: 'label', id: 'n3-t', at: 'n3', tex: 'b^2 - 4ac < 0', place: 'below' },
  ],
};

const video: Explainer = {
  id: 'm201-4-4',
  lessonId: 'm201-4-4',
  title: 'The Discriminant and Applications, Part 1: The Discriminant',
  thumbnailTitle: 'The Discriminant',
  thumbnail: 'dc',
  summary: 'How the discriminant b² − 4ac decides whether a quadratic equation has two, one or no real roots, predicting the roots of three equations, rational roots from a perfect-square discriminant, and reading a, b and c from standard form. Parts 2 and 3 find unknown coefficients and solve problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.4 · Part 1', title: 'The Discriminant', subtitle: 'b² − 4ac' }],
      lines: [
        { say: 'Before you solve a quadratic equation, you can predict how many real roots it has, from a single number under the square root in the quadratic formula.', show: 'title' },
        { say: 'In this video, you will use the discriminant to count real roots, and to tell whether an equation factors.' },
      ],
    },
    {
      chapter: 'The discriminant',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'] },
        figure('dc', [
          p1,
          p2,
          p3,
          captions,
          plot(p1, { id: 'c1', f: (x) => x * x - 2 * x - 3, tone: 'brand' }),
          plot(p2, { id: 'c2', f: (x) => (x - 1) ** 2, tone: 'opp' }),
          plot(p3, { id: 'c3', f: (x) => x * x - 4 * x + 6, tone: 'adj' }),
          dots(p1, [
            { id: 'd1', x: -1, y: 0, tex: '', tone: 'brand', group: 'two' },
            { id: 'd2', x: 3, y: 0, tex: '', tone: 'brand', group: 'two' },
          ]),
          dots(p2, [{ id: 'd3', x: 1, y: 0, tex: '', tone: 'opp' }]),
        ]),
      ],
      lines: [
        { say: 'In the quadratic formula, everything depends on the value under the radical sign: b squared, minus four "a" c. It is called the discriminant.', show: 'm.0', focus: 'm.0' },
        { say: 'If the discriminant is positive, plus or minus its square root gives two different values: two distinct real roots. The parabola crosses the x-axis twice.', show: ['dc.p1-grid', 'dc.p1-axes', 'dc.p1-c1', 'dc.p1-two', 'dc.n1-t'], focus: ['dc.p1-c1', 'dc.p1-two'] },
        { say: 'If it is zero, both values are negative b over two "a": one real root, or two equal roots. The vertex touches the x-axis.', show: ['dc.p2-grid', 'dc.p2-axes', 'dc.p2-c2', 'dc.p2-d3', 'dc.n2-t'], focus: ['dc.p2-c2', 'dc.p2-d3'] },
        { say: 'And if it is negative, its square root is not a real number: no real roots. The parabola misses the x-axis.', show: ['dc.p3-grid', 'dc.p3-axes', 'dc.p3-c3', 'dc.n3-t'], focus: 'dc.p3-c3' },
        { say: 'Also, when the discriminant is a perfect square, the roots are rational, and the equation factors over the integers.' },
      ],
    },
    {
      chapter: 'Predicting the roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x^2 - 3x + 5 = 0:\\quad 9 - 40 = -31 < 0', '4x^2 + 12x + 9 = 0:\\quad 144 - 144 = 0', 'x^2 - 5x + 2 = 0:\\quad 25 - 8 = 17 > 0'] }],
      lines: [
        { say: 'Describe the roots of two x squared, minus three x, plus five, equals zero. The discriminant is negative three, squared, minus four times two times five: nine minus forty, which is negative thirty-one. It is negative, so there are no real roots.', show: 'm.0', focus: 'm.0' },
        { say: 'For four x squared, plus twelve x, plus nine, equals zero, the discriminant is 144 minus 144, which is zero. So there is one real root: negative twelve over eight, or negative three halves.', show: 'm.1', focus: 'm.1' },
        { say: 'And for x squared, minus five x, plus two, equals zero, it is twenty-five minus eight, which is seventeen. That is positive, so there are two distinct real roots. Seventeen is not a perfect square, so the roots are irrational.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Standard form first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Standard form first', md: 'For $4x^2 + 9 = 12x$, rearrange to $4x^2 - 12x + 9 = 0$ before you read the coefficients: $b = -12$, not $12$ or $0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['4x^2 + 9 = 12x \\;\\Rightarrow\\; 4x^2 - 12x + 9 = 0', '(-12)^2 - 4(4)(9) = 144 - 144 = 0'] },
      ],
      lines: [
        { say: 'Read "a", b and c only from standard form. For four x squared, plus nine, equals twelve x, subtract twelve x first: four x squared, minus twelve x, plus nine, equals zero.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'So b is negative twelve, not twelve, and not zero. The discriminant is 144 minus 144, which is zero: one real root.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many real roots does $3x^2 + 2x + 1 = 0$ have?',
          choices: ['No real roots', 'One real root', 'Two distinct real roots', 'Two rational roots'],
          answer: 0,
          working: '$b^2 - 4ac = 2^2 - 4(3)(1) = 4 - 12 = -8 < 0$, so there are no real roots.',
        },
      ],
      lines: [
        { say: 'Your turn. How many real roots does three x squared, plus two x, plus one, equals zero, have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The discriminant is two squared, minus four times three times one: four minus twelve, which is negative eight. It is negative, so there are no real roots.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$b^2 - 4ac$ positive: two real roots; zero: one; negative: none.', 'A perfect-square discriminant gives rational roots.', 'Read $a$, $b$ and $c$ from standard form.'] }],
      lines: [
        { say: 'Let’s sum up. If the discriminant, b squared minus four "a" c, is positive, there are two real roots. If it is zero, one. And if it is negative, none.', show: 'sum.0' },
        { say: 'A perfect-square discriminant gives rational roots.', show: 'sum.1' },
        { say: 'And read "a", b and c from standard form. In part two, we find unknown coefficients, and solve a first problem. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
