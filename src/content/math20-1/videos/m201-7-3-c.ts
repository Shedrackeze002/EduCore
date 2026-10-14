import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-4, 4], y: [-6, 7], every: 0 });

const video: Explainer = {
  id: 'm201-7-3-c',
  lessonId: 'm201-7-3',
  title: 'Absolute Value Equations, Part 3: Quadratic Expressions',
  thumbnailTitle: 'Quadratic Absolute Value Equations',
  thumbnail: 'w',
  summary: 'Absolute value equations with quadratic expressions: four solutions for |x² − 5| = 4, shown on a graph, a case with no real roots in |x² − 2x − 3| = 5, and rejecting roots of |x² − 4| = 3x that make the right side negative.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.3 · Part 3', title: 'Quadratic Expressions', subtitle: 'Up to four solutions' }],
      lines: [
        { say: 'With a quadratic inside the absolute value, each case is a quadratic equation, and each might have two, one, or no real roots.', show: 'title' },
        { say: 'In this video, you will solve absolute value equations with quadratic expressions, using square roots, factoring and the discriminant.' },
      ],
    },
    {
      chapter: 'Up to four solutions',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('w', [
          g,
          polyline(g, { id: 'level', points: [[-4, 4], [4, 4]], tone: 'opp', dashed: true }),
          plot(g, { id: 'f', f: (x) => Math.abs(x * x - 5), tone: 'brand' }),
          dots(g, [
            { id: 'a', x: -3, y: 4, tex: '', tone: 'good', group: 'meet' },
            { id: 'b', x: -1, y: 4, tex: '', tone: 'good', group: 'meet' },
            { id: 'c', x: 1, y: 4, tex: '', tone: 'good', group: 'meet' },
            { id: 'd', x: 3, y: 4, tex: '', tone: 'good', group: 'meet' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['|x^2 - 5| = 4', 'x^2 - 5 = 4:\\quad x^2 = 9,\\ x = \\pm 3', 'x^2 - 5 = -4:\\quad x^2 = 1,\\ x = \\pm 1', 'x = -3,\\ -1,\\ 1,\\ 3'] }],
      lines: [
        { say: 'Solve the absolute value of x squared minus five equals four. In case one, x squared minus five is four, so x squared is nine, and x is plus or minus three.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'In case two, x squared minus five is negative four, so x squared is one, and x is plus or minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'So there are four solutions. On the graph, the line y equals four meets the W shape of y equals the absolute value of x squared minus five four times.', show: ['m.3', 'w.grid', 'w.axes', 'w.f', 'w.level', 'w.meet'], focus: ['w.meet', 'm.3'] },
      ],
    },
    {
      chapter: 'A case with no real roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['|x^2 - 2x - 3| = 5', 'x^2 - 2x - 8 = 0:\\quad (x - 4)(x + 2) = 0,\\ x = 4 \\text{ or } x = -2', 'x^2 - 2x + 2 = 0:\\quad b^2 - 4ac = 4 - 8 = -4 < 0', 'x = -2 \\text{ or } x = 4'] }],
      lines: [
        { say: 'Solve the absolute value of x squared, minus two x, minus three, equals five. In case one, subtract five: x squared, minus two x, minus eight, equals zero, which factors to give four, and negative two.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'In case two, add five: x squared, minus two x, plus two, equals zero. It does not factor, so check the discriminant: four minus eight is negative four. There are no real roots.', show: 'm.2', focus: 'm.2' },
        { say: 'So the only solutions are negative two and four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Rejecting roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['|x^2 - 4| = 3x,\\quad 3x \\ge 0', 'x^2 - 3x - 4 = 0:\\quad x = 4 \\text{ or } x = -1', 'x^2 + 3x - 4 = 0:\\quad x = -4 \\text{ or } x = 1', 'x = 1 \\text{ or } x = 4'] }],
      lines: [
        { say: 'Solve the absolute value of x squared minus four equals three x. The right side cannot be negative, so x must be at least zero.', show: 'm.0', focus: 'm.0' },
        { say: 'In case one, x squared, minus three x, minus four, equals zero, so x is four, or negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'In case two, x squared minus four equals negative three x, so x squared, plus three x, minus four, equals zero, and x is negative four, or one.', show: 'm.2', focus: 'm.2' },
        { say: 'Reject negative one and negative four, which make the right side negative. Check four: twelve equals twelve. And one: the absolute value of negative three is three. So x is one, or four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $|x^2 - 10| = 6$.',
          choices: ['$x = \\pm 2$ or $x = \\pm 4$', '$x = \\pm 4$', '$x = \\pm 2$', 'No solution'],
          answer: 0,
          working: '$x^2 - 10 = 6$ gives $x^2 = 16$ and $x = \\pm 4$; $x^2 - 10 = -6$ gives $x^2 = 4$ and $x = \\pm 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the absolute value of x squared minus ten equals six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. In case one, x squared is sixteen, so x is plus or minus four. In case two, x squared is four, so x is plus or minus two. That makes four solutions. B forgets the second case.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each case is a quadratic equation: up to four solutions in all.', 'Use the discriminant when a case will not factor.', 'With a variable on the right, reject answers that make it negative.'] }],
      lines: [
        { say: 'Let’s sum up. With a quadratic expression, each case is a quadratic equation, so there can be up to four solutions.', show: 'sum.0' },
        { say: 'Use the discriminant when a case will not factor.', show: 'sum.1' },
        { say: 'And with a variable on the right, reject any answer that makes it negative. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
