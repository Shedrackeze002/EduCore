import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 6], y: [-5, 4], every: 0 });

/** The half-plane below the dashed boundary y = 2x/3 − 2, inside the plane. */
const below: Part = {
  points: { h1: g.map(-3, -4), h2: g.map(6, 2), h3: g.map(6, -5), h4: g.map(-3, -5) },
  items: [{ kind: 'region', id: 'shade', points: ['h1', 'h2', 'h3', 'h4'], tone: 'opp', shade: 0.22 }],
};

const video: Explainer = {
  id: 'm201-9-1',
  lessonId: 'm201-9-1',
  title: 'Linear Inequalities in Two Variables, Part 1: Graphing',
  thumbnailTitle: 'Linear Inequalities',
  thumbnail: 'li',
  summary: 'What a solution of a linear inequality in two variables is, testing points in 3x − 2y ≤ 6, and graphing 2x − 3y > 6 with a dashed boundary and a test point to decide which side to shade. Part 2 checks by solving for y and models ticket sales.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 9.1 · Part 1', title: 'Linear Inequalities', subtitle: 'A whole region of solutions' }],
      lines: [
        { say: 'The drama club in Lethbridge needs to raise at least 1,500 dollars from ticket sales. Many combinations of adult and student tickets work: far too many to list.', show: 'title' },
        { say: 'An inequality in two variables describes all of them at once, and its graph is a whole region of the plane. In this video, you will test points, and graph a linear inequality.' },
      ],
    },
    {
      chapter: 'Solutions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Linear inequality in two variables', md: 'An inequality such as $3x - 2y \\le 6$ that uses $<$, $>$, $\\le$ or $\\ge$. A **solution** is a point $(x, y)$ that makes it true; all of them form the **solution region**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(2, -1):\\quad 3(2) - 2(-1) = 8,\\quad 8 \\le 6\\,?\\ \\text{No}', '(0, 0):\\quad 3(0) - 2(0) = 0,\\quad 0 \\le 6\\,?\\ \\text{Yes}'] },
      ],
      lines: [
        { say: 'A linear inequality in two variables, such as three x minus two y is at most six, uses one of the four inequality signs, with a linear expression in x and y.', show: 'def' },
        { say: 'A solution is an ordered pair that makes it true, and all the solutions together form the solution region.' },
        { say: 'To test a point, substitute its coordinates. For two, negative one: three times two, minus two times negative one, is eight. Is eight at most six? No, so it is not a solution.', show: 'm.0', focus: 'm.0' },
        { say: 'For zero, zero: the left side is zero, and zero is at most six. So zero, zero is a solution.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The boundary and the shading',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'bullets', id: 'b', items: ['**Boundary**: replace the sign with $=$.', '**Solid** for $\\le$ or $\\ge$; **dashed** for $<$ or $>$.', 'Test a point, such as $(0, 0)$: if it is true, shade its side; if not, the other side.'] }],
      right: [
        figure('li', [
          g,
          below,
          polyline(g, { id: 'line', points: [[-3, -4], [6, 2]], tone: 'opp', dashed: true }),
          dots(g, [
            { id: 'xi', x: 3, y: 0, tex: '3', tone: 'adj', place: 'above left', group: 'ints' },
            { id: 'yi', x: 0, y: -2, tex: '-2', tone: 'adj', place: 'above left', group: 'ints' },
            { id: 'O', x: 0, y: 0, tex: '(0, 0)', tone: 'good', place: 'above left' },
          ]),
        ]),
      ],
      lines: [
        { say: 'To graph an inequality, first graph the boundary, by replacing the inequality sign with an equals sign. The boundary splits the plane into two half-planes: the inequality is true on one side, and false on the other.', show: 'b.0' },
        { say: 'Draw the boundary solid for at most or at least, because points on the line are solutions, and dashed for less than or greater than, because they are not.', show: 'b.1' },
        { say: 'Graph two x minus three y is greater than six. The boundary, two x minus three y equals six, has intercepts three, and negative two. The sign is greater than, so the line is dashed.', show: ['li.grid', 'li.axes', 'li.line', 'li.ints'], focus: ['li.line', 'li.ints'] },
        { say: 'Then substitute a test point that is not on the line, such as zero, zero. Two times zero, minus three times zero, is zero. Is zero greater than six? No.', show: ['b.2', 'li.O'], focus: 'li.O' },
        { say: 'So shade the side that does not contain zero, zero: below the line.', show: 'li.shade', focus: 'li.shade' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Is $(4, 1)$ a solution of $2x - 3y > 6$?',
          choices: ['No', 'Yes', 'Only if the boundary is solid', 'It is on the boundary'],
          answer: 0,
          working: '$2(4) - 3(1) = 5$, and $5 > 6$ is false, so $(4, 1)$ is not a solution.',
        },
      ],
      lines: [
        { say: 'Your turn. Is four, one a solution of two x minus three y greater than six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, no. Two times four, minus three times one, is five, and five is not greater than six. It is not on the boundary either, because five is not six.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A solution makes the inequality true; the solutions form a region.', 'The boundary is solid for $\\le$ and $\\ge$, dashed for $<$ and $>$.', 'Use a test point to decide which side to shade.'] }],
      lines: [
        { say: 'Let’s sum up. A solution of an inequality in two variables is a point that makes it true, and the solutions form a region.', show: 'sum.0' },
        { say: 'The boundary is solid for at most or at least, and dashed for less than or greater than.', show: 'sum.1' },
        { say: 'And use a test point to decide which side to shade. In part two, we check by solving for y, and write an inequality for a situation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
