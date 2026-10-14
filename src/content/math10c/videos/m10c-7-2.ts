import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const gen = plane({ x: [-1, 9], y: [-1, 7], every: 0 });
const g = plane({ x: [-2, 8], y: [-2, 8], every: 2 });

const video: Explainer = {
  id: 'm10c-7-2',
  lessonId: 'm10c-7-2',
  title: 'Slope-Point Form, Part 1: Reading and Graphing',
  thumbnailTitle: 'Slope-Point Form',
  thumbnail: 'gen',
  summary: 'Where slope-point form y − y₁ = m(x − x₁) comes from, reading the slope and the point (the signs flip), and graphing a line from slope-point form. Part 2 writes equations from a point and a slope, or from two points.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.2 · Part 1', title: 'Slope-Point Form', subtitle: 'A line from its slope and any point' }],
      lines: [
        { say: 'If you know the slope of a line and any point on it, not only the y intercept, slope-point form lets you write its equation straight away.', show: 'title' },
        { say: 'In this video, you will see where slope-point form comes from, read it, and graph it. In part two, you will write equations with it.' },
      ],
    },
    {
      chapter: 'Where it comes from',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('gen', [
          gen,
          plot(gen, { id: 'line', f: (x) => 2 + 0.75 * (x - 4) }),
          polyline(gen, { id: 'step', points: [[4, 2], [8, 2], [8, 5]], tone: 'opp', labels: ['x - x_1', 'y - y_1'], sides: ['right', 'right'], dashed: true }),
          dots(gen, [
            { id: 'P', x: 4, y: 2, tex: '(x_1,\\,y_1)', tone: 'adj', place: 'above left' },
            { id: 'Q', x: 8, y: 5, tex: '(x,\\,y)', place: 'above left' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{y - y_1}{x - x_1} = m', 'y - y_1 = m(x - x_1)'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Slope-point form', md: '$y - y_1 = m(x - x_1)$, where $m$ is the slope and $(x_1, y_1)$ is a point on the line.' },
      ],
      lines: [
        { say: 'Let x one, y one be a known point on a line with slope m, and let x, y be any other point on the line.', show: ['gen.grid', 'gen.axes', 'gen.line', 'gen.P', 'gen.Q'] },
        { say: 'The run between them is x minus x one, and the rise is y minus y one. So by the slope formula, y minus y one, over x minus x one, equals m.', show: ['gen.step', 'm.0'], focus: ['gen.step', 'm.0'] },
        { say: 'Multiply both sides by x minus x one: y minus y one equals m, times x minus x one.', show: 'm.1', focus: 'm.1' },
        { say: 'This is slope-point form. m is the slope, and x one, y one is a point on the line.', show: 'def' },
      ],
    },
    {
      chapter: 'Reading it',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['y + 3 = -2(x - 5)', 'y - (-3) = -2(x - 5)', 'm = -2, \\quad (x_1,\\ y_1) = (5,\\ {-3})'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The signs flip', md: 'In $y - 4 = 3(x + 1)$, the point is $(-1, 4)$, not $(1, -4)$. The form has minus signs built in.' },
      ],
      lines: [
        { say: 'State the slope and the point for y plus three equals negative two, times x minus five. The slope is the number in front of the brackets: negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'For the point, compare with the form. y plus three is y minus negative three, so y one is negative three. And x minus five gives x one equals five.', show: 'm.1', focus: 'm.1' },
        { say: 'So the slope is negative two, and the point is five, negative three.', show: 'm.2', focus: 'm.2' },
        { say: 'The signs flip. In y minus four equals three, times x plus one, the point is negative one, four, not one, negative four.', show: 'oops' },
      ],
    },
    {
      chapter: 'Graphing it',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('pt', [
          g,
          plot(g, { id: 'line', f: (x) => 2 + (2 / 3) * (x - 1) }),
          polyline(g, { id: 'step', points: [[1, 2], [4, 2], [4, 4]], tone: 'opp', labels: ['\\text{right } 3', '\\text{up } 2'], sides: ['right', 'right'], dashed: true }),
          dots(g, [
            { id: 'P', x: 1, y: 2, tex: 'P', tone: 'adj', place: 'above left' },
            { id: 'Q', x: 4, y: 4, tex: 'Q', place: 'above left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y - 2 = \\tfrac23(x - 1)', 'P(1,\\ 2), \\quad m = \\tfrac23', 'Q = (1 + 3,\\ 2 + 2) = (4,\\ 4)'] }],
      lines: [
        { say: 'Graph y minus two equals two thirds, times x minus one. The point is one, two, and the slope is two thirds.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Plot the point P. Then go right three and up two, to Q, the point four, four.', show: ['pt.grid', 'pt.axes', 'pt.P', 'pt.step', 'pt.Q', 'm.2'], focus: ['pt.step', 'pt.Q', 'm.2'] },
        { say: 'Draw the line through both points.', show: 'pt.line', focus: 'pt.line' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What point and slope does $y - 4 = -3(x + 2)$ show?',
          choices: ['$(-2, 4)$ and $m = -3$', '$(2, -4)$ and $m = -3$', '$(-2, 4)$ and $m = 3$', '$(4, -2)$ and $m = -3$'],
          answer: 0,
          working: '$x + 2 = x - (-2)$, so $x_1 = -2$, and $y_1 = 4$. The slope is $-3$.',
        },
      ],
      lines: [
        { say: 'Your turn. What point and slope does y minus four equals negative three, times x plus two, show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus two is x minus negative two, so x one is negative two, and y one is four. The slope is negative three. B forgets that the signs flip.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y - y_1 = m(x - x_1)$ uses the slope and any point on the line.', 'The signs flip: $x + 3$ means $x_1 = -3$.', 'To graph: plot the point, then use the slope.'] }],
      lines: [
        { say: "Let's sum up. Slope-point form uses the slope and any point on the line.", show: 'sum.0' },
        { say: 'Watch the signs: x plus three means x one is negative three.', show: 'sum.1' },
        { say: 'And to graph it, plot the point, then use the slope. In part two, we write equations in slope-point form. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
