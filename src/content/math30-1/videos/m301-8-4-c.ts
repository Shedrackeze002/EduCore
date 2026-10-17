import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { numbers } from './lib/m301-8-graphs.ts';

const g = plane({ x: [-7, 5], y: [-8, 4], every: 0 });

const video: Explainer = {
  id: 'm301-8-4-c',
  lessonId: 'm301-8-4',
  title: 'Sums, Differences, Products and Quotients of Functions, Part 3: The Domain of a Combined Function',
  thumbnailTitle: 'Domain of a Combined Function',
  thumbnail: 'hole',
  summary: 'The domain of a sum, difference or product is where both functions are defined, and a quotient also excludes the zeros of its denominator, for f(x) = √(x − 1) and g(x) = x − 4; and why the domain must be found before simplifying f/g for f(x) = x² − 9 and g(x) = x + 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.4 · Part 3', title: 'The Domain of a Combined Function', subtitle: 'Where both functions are defined' }],
      lines: [
        { say: 'A combined function needs both of its parts. If either function is undefined at some value of x, so is the combination.', show: 'title' },
        { say: 'In this video, you will find the domains of sums and quotients, including a square root, and see how simplifying can hide a restriction.' },
      ],
    },
    {
      chapter: 'Where both are defined',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Domain of $f + g$, $f - g$ and $fg$: the $x$-values in the domain of $f$ **and** in the domain of $g$.',
            'Domain of $\\dfrac{f}{g}$: the same, but also excluding every $x$ with $g(x) = 0$.',
          ],
        },
      ],
      lines: [
        { say: 'To add, subtract or multiply two outputs, you need both of them. So the domain of f plus g, f minus g and f g is the x-values that are in the domain of f, and also in the domain of g.', show: 'b.0', focus: 'b.0' },
        { say: 'A quotient needs one more thing: its denominator cannot be zero. So the domain of f over g also excludes every x where g of x equals zero.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'A square root',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = \\sqrt{x - 1} \\qquad g(x) = x - 4',
            'f:\\ x - 1 \\ge 0,\\ \\text{so } x \\ge 1 \\qquad g:\\ \\text{every real } x',
            'f + g:\\quad \\{x \\mid x \\ge 1,\\ x \\in \\mathbb{R}\\}',
          ],
        },
      ],
      lines: [
        { say: 'Let f of x equal the square root of x minus one, and g of x equal x minus four. State the domains of f plus g, f over g, and g over f.', show: 'm.0', focus: 'm.0' },
        { say: 'f needs x minus one to be zero or more, so x must be greater than or equal to one. g is defined for every real number.', show: 'm.1', focus: 'm.1' },
        { say: 'Both are defined when x is at least one. So the domain of f plus g is x greater than or equal to one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Quotients',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{f}{g} = \\dfrac{\\sqrt{x - 1}}{x - 4}:\\quad g(4) = 0',
            '\\{x \\mid x \\ge 1,\\ x \\ne 4,\\ x \\in \\mathbb{R}\\}',
            '\\dfrac{g}{f} = \\dfrac{x - 4}{\\sqrt{x - 1}}:\\quad f(1) = 0',
            '\\{x \\mid x > 1,\\ x \\in \\mathbb{R}\\}',
          ],
        },
      ],
      lines: [
        { say: 'For f over g, the denominator, g of x, is zero when x is four.', show: 'm.0', focus: 'm.0' },
        { say: 'So exclude four as well. The domain is x greater than or equal to one, with x not equal to four.', show: 'm.1', focus: 'm.1' },
        { say: 'For g over f, the denominator is the square root of x minus one. It is zero when x is one.', show: 'm.2', focus: 'm.2' },
        { say: 'So exclude one. The domain is x greater than one, with no equals sign this time.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Simplifying hides restrictions',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = x^2 - 9 \\qquad g(x) = x + 3',
            '\\left(\\dfrac{f}{g}\\right)(x) = \\dfrac{(x - 3)(x + 3)}{x + 3} = x - 3',
            'g(-3) = 0:\\quad \\{x \\mid x \\ne -3,\\ x \\in \\mathbb{R}\\}',
          ],
        },
      ],
      lines: [
        { say: 'A common mistake is to simplify first, and then find the domain.', show: 'm.0' },
        { say: 'With f of x equals x squared minus nine, and g of x equals x plus three, f over g is x minus three, times x plus three, over x plus three. That simplifies to x minus three.', show: 'm.1', focus: 'm.1' },
        { say: 'The simplified form looks defined everywhere. But g of negative three is zero, so f over g is undefined there. The domain is all real x, except negative three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The graph shows the hole',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('hole', [
          g,
          numbers(g, 2),
          plot(g, { id: 'c', f: (x) => x - 3 }),
          dots(g, [{ id: 'H', x: -3, y: -6, tex: '(-3, -6)', tone: 'opp', place: 'above left', open: true }]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\left(\\dfrac{f}{g}\\right)(x)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Simplifying hides restrictions', md: 'The simplified form $x - 3$ looks defined everywhere, but $g(-3) = 0$. Find the domain **before** you simplify.' },
      ],
      lines: [
        { say: 'The graph of f over g shows it. It is the line y equals x minus three, with a hole at negative three, negative six.', show: ['hole.grid', 'hole.axes', 'hole.c', 'hole.H', 'm'], focus: 'hole.H' },
        { say: 'So find the domain before you simplify. Once a factor has cancelled, the restriction it made is no longer visible in the equation.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $f(x) = \\sqrt{x + 2}$ and $g(x) = x - 3$. What is the domain of $\\left(\\dfrac{f}{g}\\right)(x)$?',
          choices: [
            '$\\{x \\mid x \\ge -2,\\ x \\ne 3,\\ x \\in \\mathbb{R}\\}$',
            '$\\{x \\mid x \\ge -2,\\ x \\in \\mathbb{R}\\}$',
            '$\\{x \\mid x > -2,\\ x \\in \\mathbb{R}\\}$',
            '$\\{x \\mid x \\ne 3,\\ x \\in \\mathbb{R}\\}$',
          ],
          answer: 0,
          working: '$f$ needs $x + 2 \\ge 0$, so $x \\ge -2$. The denominator $g(x) = x - 3$ is $0$ at $x = 3$, so $3$ is excluded too.',
        },
      ],
      lines: [
        { say: 'Your turn. Let f of x equal the square root of x plus two, and g of x equal x minus three. What is the domain of f over g, of x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. f needs x plus two to be zero or more, so x is at least negative two. The denominator, g of x, is zero at three, so three is excluded too. B forgets to exclude the zero of the denominator.', show: 'q.answer' },
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
          items: [
            'The domain of $f + g$, $f - g$ and $fg$ is where both $f$ and $g$ are defined.',
            'For $\\dfrac{f}{g}$, also exclude every zero of $g$.',
            'Find the domain before you simplify.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The domain of f plus g, f minus g and f g is where both f and g are defined.', show: 'sum.0' },
        { say: 'For f over g, also exclude every zero of g.', show: 'sum.1' },
        { say: 'And find the domain before you simplify, so no restriction is lost. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
