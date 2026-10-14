import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-2, 7], y: [-2, 5], every: 2 });

const video: Explainer = {
  id: 'm10c-7-3-b',
  lessonId: 'm10c-7-3',
  title: 'General Form, Part 2: Slopes, Intercepts and Equivalent Forms',
  thumbnailTitle: 'Using General Form',
  thumbnail: 'gf',
  summary: 'Converting general form to slope-intercept form, the slope −A/B and the intercepts of Ax + By + C = 0, graphing with intercepts, deciding whether two equations describe the same line, and which form to use when.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.3 · Part 2', title: 'Using General Form', subtitle: 'Slopes, intercepts and equivalent forms' }],
      lines: [
        { say: 'General form hides the slope, but it makes the intercepts quick to find.', show: 'title' },
        { say: 'In this video, you will change general form to slope-intercept form, find slopes and intercepts, and compare equations.' },
      ],
    },
    {
      chapter: 'To slope-intercept form',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['4x - 2y + 6 = 0', '-2y = -4x - 6', 'y = 2x + 3'] }],
      lines: [
        { say: 'To change general form to slope-intercept form, isolate y. Write four x minus two y plus six equals zero in slope-intercept form.', show: 'm.0' },
        { say: 'Move the four x and the six to the right: negative two y equals negative four x minus six.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide every term by negative two: y equals two x plus three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Slope and intercepts',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('gf', [
          g,
          plot(g, { id: 'line', f: (x) => 3 - 0.6 * x }),
          dots(g, [
            { id: 'X', x: 5, y: 0, tex: '(5,\\,0)', tone: 'opp', place: 'above right' },
            { id: 'Y', x: 0, y: 3, tex: '(0,\\,3)', tone: 'adj', place: 'above right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3x + 5y - 15 = 0', 'm = -\\dfrac{A}{B} = -\\dfrac35', 'y = 0\\text{: } 3x = 15,\\ x = 5', 'x = 0\\text{: } 5y = 15,\\ y = 3'] }],
      lines: [
        { say: 'Solve "A" x plus B y plus C equals zero for y, and the coefficient of x is negative "A" over B. That is the slope.', show: 'm.0' },
        { say: 'So for three x plus five y minus fifteen equals zero, the slope is negative three fifths.', show: 'm.1', focus: 'm.1' },
        { say: 'For the x intercept, set y to zero: three x equals fifteen, so x is five.', show: ['m.2', 'gf.grid', 'gf.axes', 'gf.X'], focus: ['m.2', 'gf.X'] },
        { say: 'For the y intercept, set x to zero: five y equals fifteen, so y is three.', show: ['m.3', 'gf.Y'], focus: ['m.3', 'gf.Y'] },
        { say: 'That is why general form is so quick for graphing. Join the two intercepts, and the line is drawn.', show: 'gf.line', focus: 'gf.line' },
      ],
    },
    {
      chapter: 'Watch the sign',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['3x + 4y - 12 = 0 \\;\\to\\; m = -\\dfrac34'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Negative A over B', md: 'The slope is $-\\tfrac34$, not $\\tfrac34$. If you are unsure, solve for $y$ and read the slope.' },
      ],
      lines: [
        { say: 'Do not drop the negative. For three x plus four y minus twelve equals zero, the slope is negative three quarters, not three quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'If you are unsure, solve for y, and read the slope.', show: 'oops' },
      ],
    },
    {
      chapter: 'Equivalent forms',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['y - 1 = 2(x + 3) \\;\\to\\; y = 2x + 7', '2x - y + 7 = 0 \\;\\to\\; y = 2x + 7'] }],
      lines: [
        { say: 'The same line can be written in many ways. Is the line y minus one equals two, times x plus three, the same as the line two x minus y plus seven equals zero? To find out, rewrite both in slope-intercept form.' },
        { say: 'The first: y minus one equals two x plus six, so y equals two x plus seven.', show: 'm.0', focus: 'm.0' },
        { say: 'The second: add y to both sides, and y equals two x plus seven. The equations are equivalent: they describe the same line.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Which form?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Form', 'Best for'],
          rows: [
            ['$y = mx + b$', 'reading the slope and $y$-intercept'],
            ['$y - y_1 = m(x - x_1)$', 'writing an equation from a point and a slope'],
            ['$Ax + By + C = 0$', 'intercepts, no fractions, and vertical lines'],
          ],
        },
      ],
      lines: [
        { say: 'So which form should you use? Slope-intercept form is best for reading the slope and y intercept, and graphing from zero, b.', show: 't.0', focus: 't.0' },
        { say: 'Slope-point form is best for writing an equation from a point and a slope.', show: 't.1', focus: 't.1' },
        { say: 'And general form is best for intercepts, has no fractions, and can describe vertical lines.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the slope of $2x - 6y + 3 = 0$?',
          choices: ['$\\tfrac13$', '$-\\tfrac13$', '$3$', '$-3$'],
          answer: 0,
          working: '$m = -\\dfrac{A}{B} = -\\dfrac{2}{-6} = \\dfrac13$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the slope of two x minus six y plus three equals zero? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The slope is negative "A" over B: negative two over negative six, which is one third. B loses the negative sign on the y term, and C and D flip the fraction.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['To slope-intercept form: isolate $y$.', 'From general form: $m = -\\tfrac{A}{B}$; set $x$ or $y$ to $0$ for the intercepts.', 'Compare equations by rewriting them the same way.'] }],
      lines: [
        { say: 'Let’s sum up. To change general form to slope-intercept form, isolate y.', show: 'sum.0' },
        { say: 'From general form, the slope is negative "A" over B, and you find the intercepts by setting x or y to zero.', show: 'sum.1' },
        { say: 'And to compare two equations, rewrite them in the same form. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
