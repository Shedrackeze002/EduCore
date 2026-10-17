import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

// The three shapes at a zero: y = x, y = x² and y = x³ near the origin, side by side.
const shapes: [string, (x: number) => number, string, string][] = [
  ['m1', (x) => x, '\\text{multiplicity } 1', '\\text{crosses}'],
  ['m2', (x) => x ** 2, '\\text{multiplicity } 2', '\\text{touches, turns back}'],
  ['m3', (x) => x ** 3, '\\text{multiplicity } 3', '\\text{crosses, flattened}'],
];
const three: Part[] = shapes.flatMap(([id, f, mult, shape], i) => {
  const p = plane({ name: id, x: [-1.6, 1.6], y: [-2, 2], every: 0, width: 3.2, height: 3.2, at: [5.6 * i, 0] });
  const text: Part = {
    points: { [`${id}-k`]: [5.6 * i, -2.15], [`${id}-s`]: [5.6 * i, -2.95] },
    items: [
      { kind: 'label', id: `${id}-mult`, at: `${id}-k`, tex: mult, place: 'center', group: `${id}-text` },
      { kind: 'label', id: `${id}-shape`, at: `${id}-s`, tex: shape, tone: 'theta', place: 'center', group: `${id}-text` },
    ],
  };
  return [p, plot(p, { id: 'curve', f, tone: 'brand' }), dots(p, [{ id: 'z', x: 0, y: 0, tone: 'adj' }]), text];
});

const p1 = plane({ name: 'a', x: [-5, 3], y: [-12, 12], yStep: 2, every: 0, width: 8, height: 9 });
const p2 = plane({ name: 'b', x: [-4, 3], y: [-10, 10], yStep: 2, every: 0, width: 7, height: 9, at: [10.5, 0] });
const names: Part = {
  points: { e1: [-1, -5.3], e2: [10, -5.3] },
  items: [
    { kind: 'label', id: 'e1', at: 'e1', tex: 'y = (x + 3)(x - 1)^2', place: 'center', tone: 'brand' },
    { kind: 'label', id: 'e2', at: 'e2', tex: 'y = (x + 2)(x - 1)^3', place: 'center', tone: 'brand' },
  ],
};

const video: Explainer = {
  id: 'm301-3-4-b',
  lessonId: 'm301-3-4',
  title: 'Equations and Graphs of Polynomial Functions, Part 2: Multiplicity',
  thumbnailTitle: 'Multiplicity',
  thumbnail: false,
  summary: 'The multiplicity of a zero, and what it does to the graph: crossing at multiplicity 1, touching and turning back at multiplicity 2, crossing with a flattened bend at multiplicity 3, why squares cannot change sign, and the graphs of y = (x + 3)(x − 1)² and y = (x + 2)(x − 1)³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.4 · Part 2', title: 'Multiplicity', subtitle: 'Cross, touch, or flatten' }],
      lines: [
        { say: 'A factor can appear more than once. In y equals x plus three, times x minus one, squared, the factor x minus one appears twice.', show: 'title' },
        { say: 'In this video, you will see how the number of times a factor repeats decides what the graph does at each zero.' },
      ],
    },
    {
      chapter: 'Multiplicity',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Multiplicity', md: 'If $(x - a)^n$ is a factor of $P(x)$, but $(x - a)^{n+1}$ is not, then $a$ is a zero of **multiplicity** $n$.' },
        { kind: 'table', id: 't', head: ['Function', 'Zeros and multiplicities'], rows: [['$y = (x + 3)(x - 1)^2$', '$-3$ (multiplicity $1$), $\\ 1$ (multiplicity $2$)'], ['$y = (x + 2)(x - 1)^3$', '$-2$ (multiplicity $1$), $\\ 1$ (multiplicity $3$)']] },
      ],
      lines: [
        { say: 'If x minus "a", to the power n, is a factor of P of x, but x minus "a", to the power n plus one, is not, then "a" is a zero of multiplicity n. The multiplicity counts how many times the factor appears.', show: 'def' },
        { say: 'In y equals x plus three, times x minus one, squared, the zero negative three has multiplicity one, and the zero one has multiplicity two.', show: 't.0', focus: 't.0' },
        { say: 'In y equals x plus two, times x minus one, cubed, the zero negative two has multiplicity one, and the zero one has multiplicity three.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Three shapes',
      layout: 'center',
      main: [figure('sh', three)],
      lines: [
        { say: 'The multiplicity controls what the graph does at the zero.', show: ['sh.m1-grid', 'sh.m1-axes', 'sh.m2-grid', 'sh.m2-axes', 'sh.m3-grid', 'sh.m3-axes'] },
        { say: 'With multiplicity one, the graph crosses the x-axis, like a line. The sign of P of x changes from one side of the zero to the other.', show: ['sh.m1-curve', 'sh.m1-z', 'sh.m1-text'], focus: 'sh.m1-curve' },
        { say: 'With multiplicity two, the graph touches the x-axis and turns back, like a parabola. The sign does not change.', show: ['sh.m2-curve', 'sh.m2-z', 'sh.m2-text'], focus: 'sh.m2-curve' },
        { say: 'With multiplicity three, the graph crosses with a flattened bend, like y equals x cubed. The sign changes.', show: ['sh.m3-curve', 'sh.m3-z', 'sh.m3-text'], focus: 'sh.m3-curve' },
      ],
    },
    {
      chapter: 'Why',
      layout: 'center',
      main: [
        { kind: 'text', id: 'txt', size: 'md', md: 'Near $x = a$, the other factors stay close to a fixed number that is not zero, so the graph looks like a multiple of $(x - a)^n$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(x - a)^2 \\ge 0 \\text{ for every } x\\text{, so no change of sign}', '(x - a)^1 \\text{ and } (x - a)^3 \\text{ change sign at } x = a'] },
      ],
      lines: [
        { say: 'Why does this happen? Near x equals "a", the other factors stay close to a fixed number that is not zero. So close to the zero, the graph looks like a multiple of x minus "a", to the n.', show: 'txt' },
        { say: 'A square is never negative, so x minus "a", squared, cannot change sign. The graph touches the axis and turns back.', show: 'm.0', focus: 'm.0' },
        { say: 'But x minus "a", to the first or the third power, is negative on one side of "a", and positive on the other. So the graph crosses.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two examples',
      layout: 'center',
      main: [
        figure('ex', [
          p1,
          plot(p1, { id: 'curve', f: (x) => (x + 3) * (x - 1) ** 2, tone: 'brand' }),
          dots(p1, [
            { id: 'z1', x: -3, y: 0, tex: '-3', tone: 'adj', place: 'above left' },
            { id: 'z2', x: 1, y: 0, tex: '1', tone: 'opp', place: 'below right' },
          ]),
          p2,
          plot(p2, { id: 'curve', f: (x) => (x + 2) * (x - 1) ** 3, tone: 'brand' }),
          dots(p2, [
            { id: 'z1', x: -2, y: 0, tex: '-2', tone: 'adj', place: 'below left' },
            { id: 'z2', x: 1, y: 0, tex: '1', tone: 'opp', place: 'above left' },
          ]),
          names,
        ]),
      ],
      lines: [
        { say: 'Here is y equals x plus three, times x minus one, squared.', show: ['ex.a-grid', 'ex.a-axes', 'ex.a-curve', 'ex.e1'] },
        { say: 'At negative three, the multiplicity is one, and the graph crosses the x-axis. At one, the multiplicity is two, so the graph touches the axis and turns back.', show: ['ex.a-z1', 'ex.a-z2'], focus: ['ex.a-z1', 'ex.a-z2'] },
        { say: 'And here is y equals x plus two, times x minus one, cubed.', show: ['ex.b-grid', 'ex.b-axes', 'ex.b-curve', 'ex.e2'], focus: 'ex' },
        { say: 'It crosses at negative two, where the multiplicity is one. At one, the multiplicity is three, so it crosses with a flattened bend.', show: ['ex.b-z1', 'ex.b-z2'], focus: ['ex.b-z1', 'ex.b-z2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplicity is not the number of zeros', md: '$y = (x - 1)^3$ has only one zero, $x = 1$, of multiplicity $3$. The zeros of $(x + 3)(x - 1)^2$ are $-3$ and $1$: the exponent changes the shape, not the list.' }],
      lines: [
        { say: 'Multiplicity is not the number of zeros. y equals x minus one, cubed, has only one zero, x equals one, with multiplicity three.', show: 'oops' },
        { say: 'When you list the zeros of x plus three, times x minus one, squared, list negative three and one. The exponent changes the shape of the graph, not the list of zeros.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At which zero does $y = (x - 4)^2(x + 1)$ touch the $x$-axis?',
          choices: ['$x = 1$', '$x = -4$', '$x = -1$', '$x = 4$'],
          answer: 3,
          working: '$(x - 4)^2$ gives the zero $4$ with multiplicity $2$, so the graph touches there. At $-1$ the multiplicity is $1$, so it crosses.',
        },
      ],
      lines: [
        { say: 'Your turn. At which zero does the graph of y equals x minus four, squared, times x plus one, touch the x-axis and turn back? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The factor x minus four is squared, so four is a zero of multiplicity two, and the graph touches there. At negative one, choice C, the multiplicity is one, so the graph crosses.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiplicity $1$: the graph crosses the $x$-axis.', 'Multiplicity $2$: it touches the axis and turns back.', 'Multiplicity $3$: it crosses with a flattened bend.'] }],
      lines: [
        { say: 'Let’s sum up. At a zero of multiplicity one, the graph crosses the x-axis.', show: 'sum.0' },
        { say: 'At a zero of multiplicity two, it touches the axis and turns back.', show: 'sum.1' },
        { say: 'And at a zero of multiplicity three, it crosses with a flattened bend. In part three, we sketch a polynomial function from its factored form. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
