import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 6], y: [0, 50], yStep: 10, width: 6, height: 5, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });
const land = (30 + Math.sqrt(920)) / 10;

const video: Explainer = {
  id: 'm201-8-2-c',
  lessonId: 'm201-8-2',
  title: 'Solving Systems Algebraically, Part 3: Problems',
  thumbnailTitle: 'Problems with Systems',
  thumbnail: 'rd',
  summary: 'Setting up systems with one equation for each fact: two positive numbers with a sum of 13 and squares adding to 89, and when a model rocket and a climbing drone are at the same height, then rejecting answers that do not fit.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 8.2 · Part 3', title: 'Problems with Systems', subtitle: 'One equation for each fact' }],
      lines: [
        { say: 'Systems with quadratic equations model numbers with conditions, and objects moving along different paths.', show: 'title' },
        { say: 'In this video, you will set up and solve two problems, and check that each answer makes sense.' },
      ],
    },
    {
      chapter: 'Two numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x + y = 13,\\quad x^2 + y^2 = 89', 'y = 13 - x:\\quad x^2 + (13 - x)^2 = 89', '2x^2 - 26x + 80 = 0:\\quad x^2 - 13x + 40 = 0', '(x - 5)(x - 8) = 0:\\quad 5 \\text{ and } 8', '25 + 64 = 89 \\;\\checkmark'] }],
      lines: [
        { say: 'Define the variables, write one equation for each fact, solve, and check. Two positive numbers have a sum of thirteen, and the sum of their squares is eighty-nine. Let them be x and y.', show: 'm.0', focus: 'm.0' },
        { say: 'From the first equation, y is thirteen minus x. Substitute into the second: x squared, plus thirteen minus x, squared, equals eighty-nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand, and collect: two x squared, minus twenty-six x, plus eighty, equals zero. Divide by two: x squared, minus thirteen x, plus forty, equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'So x is five, with y eight, or x is eight, with y five. Either way, the numbers are five and eight, and twenty-five plus sixty-four is eighty-nine.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'A rocket and a drone',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('rd', [
          g,
          plot(g, { id: 'rocket', f: (t) => -5 * t * t + 30 * t + 1, from: 0, to: land, tone: 'opp' }),
          plot(g, { id: 'drone', f: (t) => 5 * t + 21, from: 0, to: 5.8, tone: 'adj' }),
          dots(g, [
            { id: 'A', x: 1, y: 26, tex: '', tone: 'good', group: 'meet' },
            { id: 'B', x: 4, y: 41, tex: '', tone: 'good', group: 'meet' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-5t^2 + 30t + 1 = 5t + 21', '-5t^2 + 25t - 20 = 0', 't^2 - 5t + 4 = (t - 1)(t - 4) = 0', 't = 1:\\ 26\\text{ m};\\quad t = 4:\\ 41\\text{ m}'] }],
      lines: [
        { say: 'In this example, a model rocket’s height is h equals negative five t squared, plus thirty t, plus one, and a drone’s height is h equals five t plus twenty-one, both in metres, t seconds after launch. When are they at the same height?', show: ['rd.grid', 'rd.axes', 'rd.rocket', 'rd.drone'] },
        { say: 'Set the heights equal, and collect the terms: negative five t squared, plus twenty-five t, minus twenty, equals zero.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Divide by negative five: t squared, minus five t, plus four, equals zero, which factors as t minus one, times t minus four.', show: 'm.2', focus: 'm.2' },
        { say: 'So they are at the same height twice: at one second, both at twenty-six metres, and at four seconds, both at forty-one metres.', show: ['m.3', 'rd.meet'], focus: ['m.3', 'rd.meet'] },
      ],
    },
    {
      chapter: 'Answers that do not fit',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Reject answers that do not fit', md: 'A negative time, a negative length, or a point behind the starting position can be a correct root of the equation, but not an answer to the problem.' }],
      lines: [
        { say: 'Both of these answers fit their situations. But a negative time, a negative length, or a point behind the starting position can be a correct root of the equation, and still not be an answer to the problem.', show: 'tip' },
        { say: 'So always check each answer in both equations, and in the context.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two positive numbers differ by $3$, and their product is $40$. What are they?',
          choices: ['$5$ and $8$', '$-8$ and $-5$', '$4$ and $10$', '$3$ and $40$'],
          answer: 0,
          working: '$x(x + 3) = 40$, so $x^2 + 3x - 40 = (x + 8)(x - 5) = 0$. Both numbers are positive, so $x = 5$, and the numbers are $5$ and $8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two positive numbers differ by three, and their product is forty. What are they? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Let the numbers be x and x plus three. Then x squared, plus three x, minus forty, equals zero, so x is five, or negative eight. The numbers are positive, so they are five and eight. B is the rejected root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Define the variables, and write one equation for each fact.', 'Substitute or eliminate, then solve.', 'Check each answer in both equations, and in the context.'] }],
      lines: [
        { say: 'Let’s sum up. Define the variables, and write one equation for each fact.', show: 'sum.0' },
        { say: 'Substitute or eliminate, then solve.', show: 'sum.1' },
        { say: 'And check each answer in both equations, and in the context. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
