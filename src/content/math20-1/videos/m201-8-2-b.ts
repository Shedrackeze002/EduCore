import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-2, 4], y: [-2, 8], every: 0 });

const video: Explainer = {
  id: 'm201-8-2-b',
  lessonId: 'm201-8-2',
  title: 'Solving Systems Algebraically, Part 2: Tangents and Elimination',
  thumbnailTitle: 'Tangents and Elimination',
  thumbnail: 't',
  summary: 'Using the discriminant after substituting to count solutions, the tangent line y = 2x + 2 to y = x² + 3 and a line that misses it, and solving two quadratic equations by elimination, subtracting every term.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 8.2 · Part 2', title: 'Tangents and Elimination', subtitle: 'How many solutions, and two parabolas' }],
      lines: [
        { say: 'After you substitute, the discriminant of the quadratic equation tells you how many solutions the system has, before you solve it.', show: 'title' },
        { say: 'In this video, you will use the discriminant to spot tangent lines, and solve systems of two parabolas by elimination.' },
      ],
    },
    {
      chapter: 'One solution or none',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('t', [
          g,
          plot(g, { id: 'q', f: (x) => x * x + 3, tone: 'brand' }),
          plot(g, { id: 'tan', f: (x) => 2 * x + 2, tone: 'opp' }),
          plot(g, { id: 'miss', f: (x) => x, tone: 'muted', dashed: true }),
          dots(g, [{ id: 'T', x: 1, y: 4, tex: '(1, 4)', tone: 'good', place: 'right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^2 + 3 = 2x + 2:\\quad x^2 - 2x + 1 = 0', 'b^2 - 4ac = 4 - 4 = 0', '(x - 1)^2 = 0:\\quad (1, 4)', 'y = x:\\quad x^2 - x + 3 = 0,\\ \\ 1 - 12 < 0'] }],
      lines: [
        { say: 'After substituting, the discriminant of the quadratic equation counts the solutions: positive, two; zero, one; and negative, none.' },
        { say: 'Solve y equals x squared plus three, and y equals two x plus two. Substitute, and collect the terms: x squared, minus two x, plus one, equals zero.', show: ['t.grid', 't.axes', 't.q', 't.tan', 'm.0'], focus: 'm.0' },
        { say: 'The discriminant is four minus four, which is zero, so there is exactly one solution: the line is tangent to the parabola.', show: 'm.1', focus: 'm.1' },
        { say: 'x minus one, squared, is zero, so x is one, and y is two times one, plus two, which is four. The solution is one, four.', show: ['m.2', 't.T'], focus: ['m.2', 't.T'] },
        { say: 'If the line were y equals x instead, substituting would give x squared, minus x, plus three, equals zero. Its discriminant, one minus twelve, is negative, so the line misses: no solution.', show: ['m.3', 't.miss'], focus: ['m.3', 't.miss'] },
      ],
    },
    {
      chapter: 'Elimination',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 2x^2 + x - 3,\\quad y = x^2 + 4x + 1', '0 = (2x^2 + x - 3) - (x^2 + 4x + 1) = x^2 - 3x - 4', '(x - 4)(x + 1) = 0:\\quad x = 4 \\text{ or } x = -1', '(-1, -2),\\quad (4, 33)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting only the first term', md: 'The minus sign applies to **every** term: $-(x^2 + 4x + 1) = -x^2 - 4x - 1$.' },
      ],
      lines: [
        { say: 'For two parabolas, use elimination: add or subtract the equations, so that one variable cancels. When both are solved for y, subtract them, and y cancels.' },
        { say: 'Solve y equals two x squared, plus x, minus three, and y equals x squared, plus four x, plus one. Subtract the second from the first: zero equals x squared, minus three x, minus four.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Subtract every term of the second equation: negative x squared, minus four x, minus one.', show: 'oops' },
        { say: 'It factors as x minus four, times x plus one, so x is four, or negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'Substitute into either equation. In the second, negative one gives negative two, and four gives thirty-three. The solutions are negative one, negative two, and four, thirty-three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'When the x² terms cancel',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'When the x² terms cancel', md: 'If both parabolas have the same $a$, subtracting leaves a linear equation: at most **one** solution. If the $x$-terms cancel too, leaving a non-zero constant, there is **no** solution.' }],
      lines: [
        { say: 'If both parabolas have the same value of "a", subtracting cancels the x squared terms, and leaves a linear equation. So there is at most one solution.', show: 'tip' },
        { say: 'And if the x terms cancel too, leaving only a constant that is not zero, the equation is false, so there is no solution.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve the system $y = x^2 + 1$ and $y = 2x^2 - 3$.',
          choices: ['$(2, 5)$ and $(-2, 5)$', '$(2, 5)$ only', '$(4, 17)$', 'No solution'],
          answer: 0,
          working: 'Subtract: $0 = (2x^2 - 3) - (x^2 + 1) = x^2 - 4$, so $x = \\pm 2$, and $y = 2^2 + 1 = 5$ for both.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the system y equals x squared plus one, and y equals two x squared minus three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtracting gives x squared minus four equals zero, so x is plus or minus two, and y is five for both. B forgets the negative root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['After substituting, the discriminant counts the solutions.', 'Two parabolas: subtract the equations to eliminate $y$.', 'Subtract every term, then substitute back for $y$.'] }],
      lines: [
        { say: 'Let’s sum up. After substituting, the discriminant tells you whether there are two, one or no solutions.', show: 'sum.0' },
        { say: 'For two parabolas, subtract the equations to eliminate y.', show: 'sum.1' },
        { say: 'Subtract every term, then substitute back to find y. In part three, we solve problems with systems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
