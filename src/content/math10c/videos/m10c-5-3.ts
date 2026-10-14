import type { Explainer } from '@/video/script.ts';
import { arrowDiagram, dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-6, 6], y: [-6, 6], every: 2 });
const curve = (x: number) => 0.12 * x ** 3 + 0.3 * x + 0.5;
const r = 4;

const video: Explainer = {
  id: 'm10c-5-3',
  lessonId: 'm10c-5-3',
  title: 'Functions, Domain and Range, Part 1: What Is a Function?',
  thumbnailTitle: 'What Is a Function?',
  thumbnail: 'f',
  summary: 'A function pairs each input with exactly one output: deciding from ordered pairs and arrow diagrams, why repeated outputs are fine, and the vertical line test on graphs. Part 2 covers domain and range.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 5.3 · Part 1', title: 'What Is a Function?', subtitle: 'Exactly one output for each input' }],
      lines: [
        { say: 'A vending machine is a good picture of a function. Press one button, and you always get exactly one item.', show: 'title' },
        { say: 'In this video, you will learn what makes a relation a function, and test graphs with the vertical line test. In part two, we describe the domain and range.' },
      ],
    },
    {
      chapter: 'A function',
      layout: 'split',
      leftWidth: 520,
      left: [figure('yes', [arrowDiagram({ left: ['1', '2', '3'], right: ['3', '5'], pairs: [[0, 0], [1, 1], [2, 0]], titles: ['x', 'y'] })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Function', md: 'A relation in which each input is paired with **exactly one** output.' },
        { kind: 'math', id: 'm', lines: ['\\{(1, 3), (2, 5), (3, 3)\\}'] },
      ],
      lines: [
        { say: 'A function is a relation in which each input is paired with exactly one output. Every function is a relation, but not every relation is a function.', show: 'def' },
        { say: 'Look at one, three; two, five; and three, three. Each input has exactly one arrow.', show: ['m.0', 'yes.left', 'yes.right', 'yes.arrows'] },
        { say: 'The output three is used twice, but that is fine. This relation is a function.', focus: ['yes.a0', 'yes.a2'] },
      ],
    },
    {
      chapter: 'Not a function',
      layout: 'split',
      leftWidth: 520,
      left: [figure('no', [arrowDiagram({ left: ['1', '2'], right: ['3', '5', '7'], pairs: [[0, 0], [0, 1], [1, 2]], titles: ['x', 'y'] })])],
      right: [
        { kind: 'math', id: 'm', lines: ['\\{(1, 3), (1, 5), (2, 7)\\}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Repeated outputs are allowed', md: 'A function can send two inputs to the same output. It can never send one input to two outputs.' },
      ],
      lines: [
        { say: 'Now one, three; one, five; and two, seven.', show: ['m.0', 'no.left', 'no.right', 'no.arrows'] },
        { say: 'The input one has two arrows: it is paired with both three and five. So this relation is not a function.', focus: ['no.a0', 'no.a1'] },
        { say: 'Remember: a function can send two inputs to the same output, like two students who share a birthday. It can never send one input to two outputs.', show: 'oops' },
      ],
    },
    {
      chapter: 'The vertical line test',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('f', [
          g,
          plot(g, { id: 'c', f: curve, label: 'y = f(x)', labelAt: 0.9, side: 'right' }),
          polyline(g, { id: 'v', points: [[1, -6], [1, 6]], tone: 'theta', dashed: true }),
          dots(g, [{ id: 'hit', x: 1, y: curve(1), place: 'right' }]),
        ]),
      ],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Vertical line test', md: 'A graph is a function if **no vertical line** crosses it more than once.' }],
      lines: [
        { say: 'On a graph, an input with two outputs means two points stacked one above the other, on the same vertical line.', show: ['f.grid', 'f.axes', 'f.c'] },
        { say: 'So here is the vertical line test: a graph is a function if no vertical line crosses it more than once.', show: 'def' },
        { say: 'This curve passes. The dashed line crosses it once, and so would every other vertical line. So it is a function.', show: ['f.v', 'f.hit'], focus: ['f.v', 'f.hit'] },
      ],
    },
    {
      chapter: 'A circle fails',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('o', [
          g,
          plot(g, { id: 'top', f: (x) => Math.sqrt(Math.max(0, r * r - x * x)), from: -r, to: r, samples: 160 }),
          plot(g, { id: 'bottom', f: (x) => -Math.sqrt(Math.max(0, r * r - x * x)), from: -r, to: r, samples: 160 }),
          polyline(g, { id: 'v', points: [[2, -6], [2, 6]], tone: 'theta', dashed: true }),
          dots(g, [
            { id: 'h1', x: 2, y: Math.sqrt(12), place: 'above right' },
            { id: 'h2', x: 2, y: -Math.sqrt(12), place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['x = 2\\text{: two points}', '\\text{not a function}'] }],
      lines: [
        { say: 'A circle fails the test.', show: ['o.grid', 'o.axes', 'o.top', 'o.bottom'] },
        { say: 'This vertical line crosses it twice, so the input two has two outputs, one above the other.', show: ['o.v', 'o.h1', 'o.h2', 'm.0'], focus: ['o.h1', 'o.h2'] },
        { say: 'So a circle is not a function, and neither is a parabola lying on its side.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which relation is a function?',
          choices: ['$\\{(2, 1), (3, 1), (4, 1)\\}$', '$\\{(1, 2), (1, 3), (1, 4)\\}$', '$\\{(0, 5), (2, 6), (0, 7)\\}$', 'A circle'],
          answer: 0,
          working: 'In A each input appears once; repeated outputs are fine. B and C repeat an input with different outputs.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these relations is a function? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Each input appears once, and it does not matter that every output is one. B and C each repeat an input with different outputs, and a circle fails the vertical line test.', show: 'q.answer' },
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
          items: ['A function gives exactly one output for each input.', 'Repeated outputs are fine; one input with two outputs is not.', 'Vertical line test: no vertical line crosses the graph more than once.'],
        },
      ],
      lines: [
        { say: "Let's sum up. A function gives exactly one output for each input.", show: 'sum.0' },
        { say: 'Repeated outputs are fine, but one input with two outputs is not.', show: 'sum.1' },
        { say: 'And on a graph, use the vertical line test. In part two, we describe the domain and range of a function. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
