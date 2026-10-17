import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { numbers, tag } from './lib/m301-8-graphs.ts';

const g1 = plane({ x: [-1, 9], y: [-4, 3], every: 0 });
const g2 = plane({ x: [-6, 5], y: [-3, 7], every: 0 });
const root = (x: number) => (x >= 0 ? Math.sqrt(x) : NaN);

const video: Explainer = {
  id: 'm301-8-5-d',
  lessonId: 'm301-8-5',
  title: 'Composite Functions, Part 4: The Domain of a Composite Function',
  thumbnailTitle: 'Domain of a Composite Function',
  thumbnail: 'sq',
  summary: 'The domain of f(g(x)): x must be in the domain of g, and g(x) in the domain of f. The domains of √(x − 3) and √x − 3 for f(x) = √x and g(x) = x − 3, and how f(g(x)) = x + 2 for f(x) = x² and g(x) = √(x + 2) hides the restriction x ≥ −2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.5 · Part 4', title: 'The Domain of a Composite Function', subtitle: 'Both steps must work' }],
      lines: [
        { say: 'A composite function is a chain of two steps, and both steps have to work. If either one breaks, that value of x is not in the domain.', show: 'title' },
        { say: 'In this video, you will find the domain of a composite function, and see how a simplified form can hide a restriction.' },
      ],
    },
    {
      chapter: 'Two conditions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The domain of f(g(x))', md: '$x$ is in the domain of $f(g(x))$ when $x$ is in the domain of $g$ **and** $g(x)$ is in the domain of $f$. Find the domain before you simplify.' },
      ],
      lines: [
        { say: 'x is in the domain of f of g of x when two things are true.', show: 'key' },
        { say: 'First, x must be in the domain of g, so that the inner function can accept it.' },
        { say: 'Second, g of x must be in the domain of f, so that the outer function can accept the inner function’s output.' },
        { say: 'And find the domain before you simplify.' },
      ],
    },
    {
      chapter: 'Square roots',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('sq', [
          g1,
          numbers(g1, 1, 1),
          plot(g1, { id: 'fg', f: (x) => root(x - 3), from: 3, samples: 300 }),
          plot(g1, { id: 'gf', f: (x) => root(x) - 3, from: 0, tone: 'opp', samples: 300 }),
          tag(g1, 'fg-name', 6, 1.75, 'y = \\sqrt{x - 3}', 'above left', 'brand'),
          tag(g1, 'gf-name', 4, -1.3, 'y = \\sqrt{x} - 3', 'below right', 'opp'),
          dots(g1, [
            { id: 'A', x: 3, y: 0, tone: 'brand' },
            { id: 'B', x: 0, y: -3, tone: 'opp' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['f(x) = \\sqrt{x} \\qquad g(x) = x - 3', 'f(g(x)) = \\sqrt{x - 3}', '\\{x \\mid x \\ge 3,\\ x \\in \\mathbb{R}\\}', 'g(f(x)) = \\sqrt{x} - 3', '\\{x \\mid x \\ge 0,\\ x \\in \\mathbb{R}\\}'],
        },
      ],
      lines: [
        { say: 'Let f of x equal the square root of x, and g of x equal x minus three. Write f of g of x and g of f of x, and state their domains.', show: 'm.0', focus: 'm.0' },
        { say: 'f of g of x is the square root of x minus three. g accepts any x, but the input of f must not be negative. So x minus three is at least zero, and x is at least three.', show: ['m.1', 'm.2', 'sq.grid', 'sq.axes', 'sq.fg', 'sq.fg-name', 'sq.A'], focus: ['m.1', 'm.2', 'sq.A'] },
        { say: 'g of f of x is the square root of x, minus three. Here f is applied first, and it needs x to be at least zero. Then g accepts any input, so the domain is x greater than or equal to zero.', show: ['m.3', 'm.4', 'sq.gf', 'sq.gf-name', 'sq.B'], focus: ['m.3', 'm.4', 'sq.B'] },
        { say: 'Different orders, different functions, and different domains: one graph starts at x equals three, the other at x equals zero.', focus: ['sq.A', 'sq.B'] },
      ],
    },
    {
      chapter: 'A hidden restriction',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('hid', [
          g2,
          numbers(g2, 2, 1),
          plot(g2, { id: 'gone', f: (x) => x + 2, to: -2, tone: 'muted', dashed: true }),
          plot(g2, { id: 'c', f: (x) => x + 2, from: -2 }),
          dots(g2, [{ id: 'E', x: -2, y: 0, tex: '(-2, 0)', tone: 'good', place: 'above left' }]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['f(x) = x^2 \\qquad g(x) = \\sqrt{x + 2}', 'f(g(x)) = (\\sqrt{x + 2})^2 = x + 2', 'g:\\ x + 2 \\ge 0,\\ \\text{so } x \\ge -2', '\\{x \\mid x \\ge -2,\\ x \\in \\mathbb{R}\\}'],
        },
      ],
      lines: [
        { say: 'A simplified form can hide a restriction. Let f of x equal x squared, and g of x equal the square root of x plus two.', show: 'm.0', focus: 'm.0' },
        { say: 'f of g of x is the square root of x plus two, squared, which simplifies to x plus two.', show: 'm.1', focus: 'm.1' },
        { say: 'That looks like a whole line. But g only accepts values where x plus two is zero or more: x at least negative two. Smaller values of x never get through the first step.', show: 'm.2', focus: 'm.2' },
        { say: 'So the graph is only the part of the line that starts at negative two, zero, and the domain is x greater than or equal to negative two.', show: ['m.3', 'hid.grid', 'hid.axes', 'hid.gone', 'hid.c', 'hid.E'], focus: ['m.3', 'hid.c', 'hid.E'] },
      ],
    },
    {
      chapter: 'Find the domain first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Simplifying first', md: 'Finding the domain of $f(g(x)) = x + 2$ from the simplified form gives all real numbers, which is wrong. Check the inner function first, then check that its outputs are allowed in the outer function.' }],
      lines: [
        { say: 'If you found the domain from x plus two alone, you would say all real numbers, and that is wrong.', show: 'oops' },
        { say: 'So find the domain before you simplify. Check the inner function first, then check that its outputs are allowed in the outer function.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $f(x) = \\sqrt{x}$ and $g(x) = x + 5$. What is the domain of $f(g(x))$?',
          choices: [
            '$\\{x \\mid x \\ge 0,\\ x \\in \\mathbb{R}\\}$',
            '$\\{x \\mid x \\ge 5,\\ x \\in \\mathbb{R}\\}$',
            '$\\{x \\mid x \\in \\mathbb{R}\\}$',
            '$\\{x \\mid x \\ge -5,\\ x \\in \\mathbb{R}\\}$',
          ],
          answer: 3,
          working: '$f(g(x)) = \\sqrt{x + 5}$. The input of $f$ must not be negative: $x + 5 \\ge 0$, so $x \\ge -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Let f of x equal the square root of x, and g of x equal x plus five. What is the domain of f of g of x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. f of g of x is the square root of x plus five, so x plus five must be at least zero: x is at least negative five. Choice A is the domain of g of f of x, where the square root comes first.', show: 'q.answer' },
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
          items: ['$x$ must be in the domain of $g$, and $g(x)$ in the domain of $f$.', 'The order of composition changes the domain.', 'Find the domain before you simplify.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For f of g of x, x must be in the domain of g, and g of x must be in the domain of f.', show: 'sum.0' },
        { say: 'The order of composition can change the domain.', show: 'sum.1' },
        { say: 'And find the domain before you simplify. In part five, we work backwards, and split a function into two. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
