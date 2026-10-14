import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const phone = plane({ x: [0, 6], y: [0, 50], xStep: 1, yStep: 10, width: 9, height: 6.5, titles: { x: '\\text{Data (GB)}', y: '\\text{Cost (\\$)}' } });

const video: Explainer = {
  id: 'm10c-6-1',
  lessonId: 'm10c-6-1',
  title: 'Linear Relations, Part 1: A Constant Rate of Change',
  thumbnailTitle: 'Linear Relations',
  thumbnail: 'phone',
  summary: 'What makes a relation linear: a constant rate of change, found as the change in y over the change in x, with units, and a straight-line graph. Part 2 checks tables and equations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.1 · Part 1', title: 'Linear Relations', subtitle: 'A constant rate of change' }],
      lines: [
        { say: 'A phone plan costs twenty dollars a month, plus five dollars for every gigabyte of data. Every extra gigabyte adds exactly the same amount.', show: 'title' },
        { say: 'Relations like this are called linear relations, because their graphs are straight lines. In this video, you will find their rate of change. In part two, you will spot linear relations in tables and equations.' },
      ],
    },
    {
      chapter: 'A phone plan',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('phone', [
          phone,
          plot(phone, { id: 'line', f: (g) => 20 + 5 * g, from: 0, to: 6 }),
          dots(phone, [0, 1, 2, 3, 4, 5, 6].map((g) => ({ id: `p${g}`, x: g, y: 20 + 5 * g, group: 'pts', place: 'above left' as const }))),
          polyline(phone, { id: 'step', points: [[2, 30], [3, 30], [3, 35]], tone: 'opp', labels: ['+1', '+5'], sides: ['right', 'right'], dashed: true }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C = 20 + 5g', '\\text{each } {+1} \\text{ GB adds } {+\\$5}'] }],
      lines: [
        { say: 'Here is the cost of the phone plan for zero to six gigabytes. With no data, it costs twenty dollars. Each gigabyte adds five dollars.', show: ['phone.grid', 'phone.axes', 'phone.pts', 'm.0'] },
        { say: 'Every step of one gigabyte across adds the same five dollars up.', show: ['phone.step', 'm.1'], focus: 'phone.step' },
        { say: 'Because the change is always the same, the points lie on a straight line.', show: 'phone.line', focus: 'phone.line' },
      ],
    },
    {
      chapter: 'Rate of change',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{rate of change} = \\dfrac{\\text{change in } y}{\\text{change in } x} = \\dfrac{\\Delta y}{\\Delta x}', '\\dfrac{\\$5}{1 \\text{ GB}} = \\$5 \\text{ per gigabyte}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Linear relation', md: 'A relation with a **constant rate of change**. Its graph is a straight line.' },
      ],
      lines: [
        { say: 'The rate of change compares how much the dependent variable changes with how much the independent variable changes. It is the change in y, over the change in x.', show: 'm.0', focus: 'm.0' },
        { say: 'The symbol, delta, means change in. For the phone plan, the rate of change is five dollars per one gigabyte: five dollars per gigabyte. Always give it with units.', show: 'm.1', focus: 'm.1' },
        { say: 'A linear relation is one with a constant rate of change. Its graph is a straight line.', show: 'def' },
      ],
    },
    {
      chapter: 'Four ways to tell',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Representation', 'Linear when…'],
          rows: [
            ['a situation', 'each equal step adds the same amount'],
            ['a table', '$\\Delta y \\div \\Delta x$ is the same between every pair of rows'],
            ['a graph', 'the points lie on a straight line'],
            ['an equation', 'it has no $x^2$, $xy$, $\\tfrac1x$, $\\sqrt{x}$ or other powers'],
          ],
        },
      ],
      lines: [
        { say: 'You can recognise a linear relation in every form. In a situation, each equal step adds the same amount, like the five dollars per gigabyte.', show: 't.0', focus: 't.0' },
        { say: 'In a table, the change in y divided by the change in x is the same between every pair of rows.', show: 't.1', focus: 't.1' },
        { say: 'On a graph, the points lie on a straight line.', show: 't.2', focus: 't.2' },
        { say: 'And in an equation, the variables appear only to the first power: no x squared, no x times y, and no x in a denominator or under a root. In part two, we look closely at tables and equations.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A taxi charges \\$4 plus \\$2 per kilometre. What is the rate of change of the cost?',
          choices: ['\\$2 per km', '\\$4 per km', '\\$6 per km', '\\$2'],
          answer: 0,
          working: 'Each extra kilometre adds \\$2: the rate of change is \\$2 per km. The \\$4 is the starting fee.',
        },
      ],
      lines: [
        { say: 'Your turn. A taxi charges four dollars, plus two dollars per kilometre. What is the rate of change of the cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Each extra kilometre adds two dollars, so the rate of change is two dollars per kilometre. The four dollars is the starting fee, and D forgets the units.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A linear relation has a constant rate of change, and a straight-line graph.', 'Rate of change $= \\dfrac{\\Delta y}{\\Delta x}$, with units.'] }],
      lines: [
        { say: "Let's sum up. A linear relation has a constant rate of change, and its graph is a straight line.", show: 'sum.0' },
        { say: 'The rate of change is the change in y over the change in x, written with units. In part two, we check tables and equations. See you there!', show: 'sum.1' },
      ],
    },
  ],
};

export default video;
