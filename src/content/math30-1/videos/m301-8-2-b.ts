import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { branches, numbers, tag, vAsym } from './lib/m301-8-graphs.ts';

// Stretched upward, so the small values between the asymptotes can be seen.
const g = plane({ x: [-6, 6], y: [-3, 3], yStep: 0.5, every: 0, width: 12, height: 12 });
const sq = plane({ x: [-3, 5], y: [-1, 6], every: 0 });

const video: Explainer = {
  id: 'm301-8-2-b',
  lessonId: 'm301-8-2',
  title: 'Analyzing Rational Functions, Part 2: Two Vertical Asymptotes',
  thumbnailTitle: 'Two Vertical Asymptotes',
  thumbnail: 'sk',
  summary: 'Sketching f(x) = (x − 1)/(x² − 4), which has two vertical asymptotes and three branches, using a sign chart to place each branch, and why a squared factor such as (x − 1)² does not change sign.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.2 · Part 2', title: 'Two Vertical Asymptotes', subtitle: 'Using a sign chart' }],
      lines: [
        { say: 'With two vertical asymptotes, the graph of a rational function splits into three branches. Which way does each one go?', show: 'title' },
        { say: 'In this video, you will use a sign chart to place every branch, and see what changes when a factor is squared.' },
      ],
    },
    {
      chapter: 'The features',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = \\dfrac{x - 1}{x^2 - 4} = \\dfrac{x - 1}{(x - 2)(x + 2)}',
            '\\text{vertical asymptotes: } x = -2 \\text{ and } x = 2',
            '\\text{horizontal asymptote: } y = 0',
            'x\\text{-intercept: } 1 \\qquad y\\text{-intercept: } f(0) = \\dfrac{-1}{-4} = \\dfrac{1}{4}',
          ],
        },
      ],
      lines: [
        { say: 'Sketch f of x equals x minus one, over x squared minus four.', show: 'm.0' },
        { say: 'Factor the denominator: x minus two, times x plus two. Nothing cancels, so there are no holes.', focus: 'm.0' },
        { say: 'Both factors remain, so there are two vertical asymptotes: x equals negative two and x equals two.', show: 'm.1', focus: 'm.1' },
        { say: 'The numerator has degree one, and the denominator has degree two, so the horizontal asymptote is y equals zero: the x-axis.', show: 'm.2', focus: 'm.2' },
        { say: 'The x-intercept is one. And f of zero is negative one over negative four, so the y-intercept is one quarter.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A sign chart',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Region 1', 'Region 2', 'Region 3', 'Region 4'],
          rows: [
            ['Interval', '$x < -2$', '$-2 < x < 1$', '$1 < x < 2$', '$x > 2$'],
            ['Test value', '$f(-3) = -0.8$', '$f(0) = 0.25$', '$f(1.5) \\approx -0.29$', '$f(3) = 0.4$'],
            ['Sign of $f$', 'negative', 'positive', 'negative', 'positive'],
          ],
        },
        { kind: 'text', id: 'm', md: 'Below the $x$-axis, then above, below and above again.', size: 'md', align: 'center' },
      ],
      lines: [
        { say: 'The graph can only switch between above and below the x-axis at a zero, or at a vertical asymptote. So the values negative two, one and two split the number line into four intervals.', show: 't.0', focus: 't.0' },
        { say: 'Test one value in each interval. f of negative three is negative four over five: negative 0.8. f of zero is one quarter. f of 1.5 is about negative 0.29. And f of three is two fifths: 0.4.', show: 't.1', focus: 't.1' },
        { say: 'Only the signs matter: negative, positive, negative, positive.', show: 't.2', focus: 't.2' },
        { say: 'So the graph is below the x-axis on the far left, above it between negative two and one, below it between one and two, and above it on the right.', show: 'm' },
      ],
    },
    {
      chapter: 'Sketching the branches',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('sk', [
          g,
          numbers(g, 2, 1),
          vAsym(g, 'va1', -2),
          vAsym(g, 'va2', 2),
          tag(g, 'va1-name', -2, 2.7, 'x = -2', 'left'),
          tag(g, 'va2-name', 2, -2.6, 'x = 2', 'right'),
          branches(g, { id: 'c', f: (x) => (x - 1) / (x * x - 4), breaks: [-2, 2] }),
          dots(g, [
            { id: 'X', x: 1, y: 0, tone: 'adj', group: 'ints' },
            { id: 'Y', x: 0, y: 0.25, tone: 'adj', group: 'ints' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x < -2:\\ \\text{below}', '-2 < x < 1:\\ \\text{above}', '1 < x < 2:\\ \\text{below}', 'x > 2:\\ \\text{above}'] }],
      lines: [
        { say: 'Now draw it. Start with the asymptotes, x equals negative two and x equals two, and the intercepts.', show: ['sk.grid', 'sk.axes', 'sk.va1', 'sk.va2', 'sk.va1-name', 'sk.va2-name', 'sk.ints'], focus: ['sk.va1', 'sk.va2', 'sk.ints'] },
        { say: 'On the far left, the graph is below the x-axis. It approaches y equals zero from below, and drops down beside x equals negative two.', show: ['sk.c-0', 'm.0'], focus: ['sk.c-0', 'm.0'] },
        { say: 'In the middle, it comes down from the top just right of x equals negative two, passes through one quarter on the y-axis, crosses the x-axis at one, and drops toward x equals two.', show: ['sk.c-1', 'm.1', 'm.2'], focus: ['sk.c-1', 'm.1', 'm.2'] },
        { say: 'On the right, the graph is positive again. It comes down from the top, and approaches the x-axis from above.', show: ['sk.c-2', 'm.3'], focus: ['sk.c-2', 'm.3'] },
        { say: 'Three branches, one for each region between the asymptotes.', focus: 'sk.c' },
      ],
    },
    {
      chapter: 'Where the sign changes',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('sq', [
          sq,
          numbers(sq, 1, 1),
          vAsym(sq, 'va', 1),
          tag(sq, 'va-name', 1, -0.5, 'x = 1', 'right'),
          branches(sq, { id: 'c', f: (x) => 1 / (x - 1) ** 2, breaks: [1] }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\dfrac{1}{(x - 1)^2}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Where the sign changes', md: 'A single factor $(x - a)$ changes sign at $x = a$. A squared factor $(x - a)^2$ never changes sign: both branches beside its asymptote go the same way.' },
      ],
      lines: [
        { say: 'Why did the sign change at every one of those values? A single factor, like x minus two, is negative just left of two and positive just right of it, so it flips the sign of f.', show: 'tip' },
        { say: 'A squared factor never changes sign, because a square is never negative. So beside an asymptote that comes from a factor that is squared, both branches go the same way.' },
        { say: 'For example, y equals one over x minus one, squared, is positive on both sides of x equals one. Both branches rise up beside the asymptote.', show: ['sq.grid', 'sq.axes', 'sq.va', 'sq.va-name', 'sq.c', 'm'], focus: 'sq.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = \\dfrac{x + 1}{(x - 3)(x + 4)}$, where is the graph above the $x$-axis?',
          choices: ['$x < -4$ and $-1 < x < 3$', '$-4 < x < 3$', '$-4 < x < -1$ and $x > 3$', '$x > 3$ only'],
          answer: 2,
          working: 'Split at $-4$, $-1$ and $3$. $f(-5) = -0.5 < 0$, $f(-2) = 0.1 > 0$, $f(0) = -\\tfrac{1}{12} < 0$ and $f(4) = \\tfrac{5}{8} > 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals x plus one, over x minus three, times x plus four, where is the graph above the x-axis? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Split the number line at negative four, negative one and three, and test a value in each interval. f of negative five is negative, f of negative two is positive, f of zero is negative, and f of four is positive. Choice A gives the intervals where the graph is below the axis.', show: 'q.answer' },
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
            'Two vertical asymptotes split the graph into three branches.',
            'Sign chart: test one value in each interval between the zeros and the asymptotes.',
            'A single factor changes sign; a squared factor does not.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two vertical asymptotes split the graph into three branches.', show: 'sum.0' },
        { say: 'To place them, make a sign chart: test one value in each interval between the zeros and the vertical asymptotes.', show: 'sum.1' },
        { say: 'A single factor changes sign, but a factor that is squared does not. In part three, we work backwards, and write an equation from a graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
