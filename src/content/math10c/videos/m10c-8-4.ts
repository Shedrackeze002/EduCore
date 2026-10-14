import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

/** One, none and infinitely many solutions, side by side. */
const cases: [string, string, (x: number) => number, (x: number) => number, number][] = [
  ['one', '\\text{one}', (x) => x + 1, (x) => 1 - x, 0],
  ['none', '\\text{none}', (x) => 0.5 * x + 2, (x) => 0.5 * x - 2, 11],
  ['many', '\\text{infinitely many}', (x) => 1 - x, (x) => 1 - x, 22],
];
const three: Part[] = cases.flatMap(([name, title, f1, f2, at]) => {
  const g = plane({ name, x: [-4, 4], y: [-4, 4], every: 0, at: [at, 0] });
  const label: Part = { points: { [`${name}-tt`]: [at, -4.6] }, items: [{ kind: 'label', id: `${name}-title`, at: `${name}-tt`, tex: title, place: 'below', group: name }] };
  return [g, plot(g, { id: 'l1', f: f1, tone: 'adj' }), plot(g, { id: 'l2', f: f2, tone: 'opp', dashed: name === 'many' }), label];
});

const video: Explainer = {
  id: 'm10c-8-4',
  lessonId: 'm10c-8-4',
  title: 'The Number of Solutions, Part 1: One, None or Infinitely Many',
  thumbnailTitle: 'How Many Solutions?',
  thumbnail: 'three',
  summary: 'Why a system of two linear equations has one, no or infinitely many solutions, telling which from the slopes and intercepts, and what a false or true statement means when you solve. Part 2 solves problems with systems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 8.4 · Part 1', title: 'How Many Solutions?', subtitle: 'One, none or infinitely many' }],
      lines: [
        { say: 'Two lines in a plane can cross once, never meet, or lie on top of each other.', show: 'title' },
        { say: 'So a system of two linear equations has exactly one, no, or infinitely many solutions. In this video, you will tell which from the equations. In part two, you will solve problems with systems.' },
      ],
    },
    {
      chapter: 'Three possibilities',
      layout: 'center',
      main: [figure('three', three)],
      lines: [
        { say: 'Lines that intersect cross at exactly one point, so the system has one solution.', show: ['three.one-grid', 'three.one-axes', 'three.one-l1', 'three.one-l2', 'three.one'] },
        { say: 'Parallel lines never meet, so there is no solution.', show: ['three.none-grid', 'three.none-axes', 'three.none-l1', 'three.none-l2', 'three.none'] },
        { say: 'And if both equations describe the same line, every point on it is a solution. There are infinitely many.', show: ['three.many-grid', 'three.many-axes', 'three.many-l1', 'three.many-l2', 'three.many'] },
      ],
    },
    {
      chapter: 'From the equations',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Slopes and intercepts', 'Solutions'],
          rows: [
            ['different slopes', 'one'],
            ['same slope, different $y$-intercepts', 'none'],
            ['same slope, same $y$-intercept', 'infinitely many'],
          ],
        },
      ],
      lines: [
        { say: 'You can tell which from the equations. Different slopes mean the lines cross: one solution.', show: 't.0', focus: 't.0' },
        { say: 'The same slope with different y intercepts means parallel lines: no solution.', show: 't.1', focus: 't.1' },
        { say: 'And the same slope with the same y intercept means the same line: infinitely many solutions.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Classifying systems',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\begin{cases} y = 2x + 1 \\\\ y = -x + 4 \\end{cases} \\;\\to\\; \\text{one}',
            '\\begin{cases} 2x - y = 3 \\\\ 4x - 2y = 10 \\end{cases} \\;\\to\\; \\begin{cases} y = 2x - 3 \\\\ y = 2x - 5 \\end{cases} \\;\\to\\; \\text{none}',
            '\\begin{cases} x + 3y = 6 \\\\ 2x + 6y = 12 \\end{cases} \\;\\to\\; \\text{the same line} \\;\\to\\; \\text{infinitely many}',
          ],
        },
      ],
      lines: [
        { say: 'In the first system, the slopes are two and negative one. They are different, so there is one solution.', show: 'm.0', focus: 'm.0' },
        { say: 'In the second, solve both for y: y equals two x minus three, and y equals two x minus five. The same slope, but different intercepts, so there is no solution.', show: 'm.1', focus: 'm.1' },
        { say: 'In the third, the second equation is the first multiplied by two. They describe the same line, so there are infinitely many solutions.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'What algebra shows',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['(4x - 2y) - 2(2x - y) = 10 - 2(3) \\;\\to\\; 0 = 4', '0 = 4\\text{: false} \\;\\to\\; \\text{no solution}', '0 = 0\\text{: true} \\;\\to\\; \\text{infinitely many}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'True is not none', md: 'A true statement like $0 = 0$ means the **same line**: infinitely many solutions. And equal slopes alone are not enough: compare the intercepts too.' },
      ],
      lines: [
        { say: 'Algebra shows it too. Try to eliminate from the second system: subtract twice the first equation from the second. Every variable disappears, leaving zero equals four.', show: 'm.0', focus: 'm.0' },
        { say: 'That statement is false, so there is no solution.', show: 'm.1', focus: 'm.1' },
        { say: 'For two equations of the same line, eliminating leaves a true statement, like zero equals zero. Then there are infinitely many solutions.', show: 'm.2', focus: 'm.2' },
        { say: 'So a true statement does not mean no solution. And equal slopes are not enough on their own: compare the intercepts too.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many solutions does the system $3x + y = 4$ and $6x + 2y = 8$ have?',
          choices: ['Infinitely many', 'None', 'One', 'Two'],
          answer: 0,
          working: 'The second equation is the first multiplied by $2$, so both describe the same line.',
        },
      ],
      lines: [
        { say: 'Your turn. How many solutions does three x plus y equals four, and six x plus two y equals eight, have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The second equation is the first multiplied by two, so both describe the same line, and every point on it is a solution.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Different slopes: one. Parallel: none. The same line: infinitely many.', 'When solving, a false statement means none; a true one means infinitely many.', 'Compare the intercepts as well as the slopes.'] }],
      lines: [
        { say: 'Let’s sum up. Different slopes give one solution, parallel lines give none, and the same line gives infinitely many.', show: 'sum.0' },
        { say: 'When you solve, a false statement means no solution, and a true statement means infinitely many.', show: 'sum.1' },
        { say: 'And compare the intercepts as well as the slopes. In part two, we solve problems with systems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
