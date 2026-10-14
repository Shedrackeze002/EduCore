import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 6], y: [0, 50], yStep: 10, width: 6, height: 5, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });
const h = (t: number) => -5 * t * t + 30 * t;

const video: Explainer = {
  id: 'm201-9-2-c',
  lessonId: 'm201-9-2',
  title: 'Quadratic Inequalities in One Variable, Part 3: Rearranging and Problems',
  thumbnailTitle: 'Quadratic Inequalities in Context',
  thumbnail: 'rk',
  summary: 'Solving −x² + 2x + 8 > 0 by multiplying by −1 and reversing the sign, finding when a model rocket is more than 25 m high, and why x² < 9 must be factored rather than square-rooted.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 9.2 · Part 3', title: 'Rearranging and Problems', subtitle: 'Zero on one side' }],
      lines: [
        { say: 'Before you find test intervals, you need zero on one side, and that sometimes means multiplying by a negative number.', show: 'title' },
        { say: 'In this video, you will solve an inequality with a negative leading coefficient, find when a rocket is above a set height, and avoid a common square-root trap.' },
      ],
    },
    {
      chapter: 'A negative leading coefficient',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['-x^2 + 2x + 8 > 0', '\\times(-1):\\quad x^2 - 2x - 8 < 0', '(x - 4)(x + 2) < 0:\\quad \\text{roots } {-2},\\ 4', 'x = 0:\\quad (-4)(2) = -8 < 0 \\;\\checkmark', '-2 < x < 4'] }],
      lines: [
        { say: 'Solve negative x squared, plus two x, plus eight, greater than zero. It is easier with a positive leading coefficient, so multiply by negative one, and reverse the sign: x squared, minus two x, minus eight, less than zero.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'It factors as x minus four, times x plus two, with roots negative two and four.', show: 'm.2', focus: 'm.2' },
        { say: 'Test zero, in the middle: negative four times two is negative eight, which is less than zero. So the middle interval works.', show: 'm.3', focus: 'm.3' },
        { say: 'x is between negative two and four, not including them.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A projectile',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('rk', [
          g,
          polyline(g, { id: 'level', points: [[0, 25], [6, 25]], tone: 'muted', dashed: true }),
          plot(g, { id: 'path', f: h, from: 0, to: 6, tone: 'opp' }),
          plot(g, { id: 'high', f: h, from: 1, to: 5, tone: 'good' }),
          dots(g, [
            { id: 'A', x: 1, y: 25, tex: '', tone: 'good', group: 'cross' },
            { id: 'B', x: 5, y: 25, tex: '', tone: 'good', group: 'cross' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-5t^2 + 30t > 25', 't^2 - 6t + 5 < 0', '(t - 1)(t - 5) < 0', '1 < t < 5'] }],
      lines: [
        { say: 'In this example, a model rocket’s height is h equals negative five t squared, plus thirty t, in metres, t seconds after launch. When is it more than twenty-five metres high?', show: ['rk.grid', 'rk.axes', 'rk.path', 'rk.level'] },
        { say: 'Write the inequality, and subtract twenty-five. Then divide by negative five, and reverse the sign: t squared, minus six t, plus five, less than zero.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'It factors as t minus one, times t minus five. Test three: two times negative two is negative four, less than zero. At three seconds, the rocket is at forty-five metres.', show: ['m.2', 'rk.cross'], focus: ['m.2', 'rk.cross'] },
        { say: 'So the rocket is above twenty-five metres between one second and five seconds after launch.', show: ['m.3', 'rk.high'], focus: ['m.3', 'rk.high'] },
      ],
    },
    {
      chapter: 'Square roots of inequalities',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 < 9:\\quad x = -5\\,?\\ \\ 25 < 9 \\text{ is false}', 'x^2 - 9 < 0:\\quad (x - 3)(x + 3) < 0', '-3 < x < 3'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Square roots of inequalities', md: 'From $x^2 < 9$ you cannot conclude $x < \\pm 3$, or just $x < 3$. Move everything to one side, and factor.' },
      ],
      lines: [
        { say: 'From x squared less than nine, you cannot conclude that x is less than plus or minus three, or just less than three. Try x equals negative five: it is less than three, but twenty-five is not less than nine.', show: ['m.0', 'oops'], focus: 'm.0' },
        { say: 'Instead, rewrite it as x squared minus nine, less than zero. That factors as x minus three, times x plus three, so the solution is x between negative three and three.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x^2 \\ge 16$.',
          choices: ['$x \\le -4$ or $x \\ge 4$', '$x \\ge 4$', '$-4 \\le x \\le 4$', '$x \\ge \\pm 4$'],
          answer: 0,
          working: '$x^2 - 16 = (x - 4)(x + 4) \\ge 0$, which is true outside the roots: $x \\le -4$ or $x \\ge 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared, at least sixteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Write x squared minus sixteen at least zero, which factors as x minus four, times x plus four. The product is positive outside the roots, so x is at most negative four, or at least four. B takes a square root, and loses half the solution.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Get zero on one side first.', 'Multiplying or dividing by a negative reverses the sign.', 'Never take the square root of an inequality: factor instead.'] }],
      lines: [
        { say: 'Let’s sum up. Get zero on one side first.', show: 'sum.0' },
        { say: 'Multiplying or dividing by a negative number reverses the inequality sign.', show: 'sum.1' },
        { say: 'And never take the square root of an inequality: factor instead. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
