import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-9, 9], y: [-6, 6], every: 0 });
const g2 = plane({ x: [-1, 7], y: [-9, 11], yStep: 2, every: 0, width: 6, height: 7 });

const video: Explainer = {
  id: 'm201-3-2-b',
  lessonId: 'm201-3-2',
  title: 'Writing Quadratic Functions in Vertex Form, Part 2: Intercepts',
  thumbnailTitle: 'Intercepts from Vertex Form',
  thumbnail: 'abc',
  summary: 'Counting the x-intercepts of y = a(x − p)² + q from the signs of a and q, finding the intercepts of y = 2(x − 3)² − 8 with ± square roots, exact irrational intercepts, and why the two x-intercepts are symmetric about the axis.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.2 · Part 2', title: 'Intercepts from Vertex Form', subtitle: 'How many, and where' }],
      lines: [
        { say: 'Where does a parabola cross the x-axis? Vertex form tells you how many times it does, before you solve anything.', show: 'title' },
        { say: 'In this video, you will count the x-intercepts, then find the intercepts exactly.' },
      ],
    },
    {
      chapter: 'How many x-intercepts?',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('abc', [
          g1,
          plot(g1, { id: 'A', f: (x) => (x + 5) ** 2 + 1, tone: 'adj' }),
          plot(g1, { id: 'B', f: (x) => -x * x, tone: 'muted' }),
          plot(g1, { id: 'C', f: (x) => (x - 5) ** 2 - 3, tone: 'opp' }),
          dots(g1, [
            { id: 'vA', x: -5, y: 1, tex: 'A', tone: 'adj', place: 'below' },
            { id: 'vB', x: 0, y: 0, tex: 'B', tone: 'muted', place: 'above right' },
            { id: 'vC', x: 5, y: -3, tex: 'C', tone: 'opp', place: 'below' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['**A**: vertex above, opens up: **none**.', '**B**: vertex on the axis, $q = 0$: **one**.', '**C**: vertex below, opens up: **two**.'] }],
      lines: [
        { say: 'You can count the x-intercepts from where the vertex is, and which way the parabola opens.', show: ['abc.grid', 'abc.axes'] },
        { say: 'Parabola A has its vertex above the x-axis, and opens up, away from the axis. It never reaches the axis: no x-intercepts.', show: ['abc.A', 'abc.vA', 'b.0'], focus: ['abc.A', 'b.0'] },
        { say: 'Parabola B has its vertex on the x-axis, where q is zero: one x-intercept.', show: ['abc.B', 'abc.vB', 'b.1'], focus: ['abc.B', 'b.1'] },
        { say: 'Parabola C has its vertex below the x-axis, and opens up, toward the axis: two x-intercepts.', show: ['abc.C', 'abc.vC', 'b.2'], focus: ['abc.C', 'b.2'] },
      ],
    },
    {
      chapter: 'The signs of a and q',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$a$ and $q$', 'x-intercepts'], rows: [['same sign', 'none'], ['$q = 0$', 'one'], ['opposite signs', 'two']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = -3(x - 1)^2 - 2:\\quad a < 0,\\ q < 0:\\ \\text{none}'] },
      ],
      lines: [
        { say: 'In general, if "a" and q have the same sign, there are no x-intercepts. If q is zero, there is one. And if they have opposite signs, there are two.', show: 't' },
        { say: 'How many x-intercepts does y equals negative three times x minus one, squared, minus two have? The vertex, one, negative two, is below the x-axis, and "a" is negative, so it opens down, away from the axis. Same signs: none.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Finding the intercepts',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('int', [
          g2,
          plot(g2, { id: 'curve', f: (x) => 2 * (x - 3) ** 2 - 8, tone: 'brand' }),
          dots(g2, [
            { id: 'x1', x: 1, y: 0, tex: '1', tone: 'adj', place: 'above left' },
            { id: 'x2', x: 5, y: 0, tex: '5', tone: 'adj', place: 'above right' },
            { id: 'yi', x: 0, y: 10, tex: '10', tone: 'good', place: 'left' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['0 = 2(x - 3)^2 - 8', '(x - 3)^2 = 4', 'x - 3 = \\pm 2,\\quad x = 1 \\text{ or } 5', 'y = 2(0 - 3)^2 - 8 = 10'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the negative root', md: '$(x - 3)^2 = 4$ has two solutions: $2^2 = 4$ and $(-2)^2 = 4$. Taking only $+2$ loses $x = 1$.' },
      ],
      lines: [
        { say: 'Find the intercepts of y equals two times x minus three, squared, minus eight. For the x-intercepts, set y to zero.', show: ['int.grid', 'int.axes', 'int.curve', 'm.0'], focus: 'm.0' },
        { say: 'Isolate the squared bracket: add eight and divide by two, so x minus three, squared, is four.', show: 'm.1', focus: 'm.1' },
        { say: 'Take the square root of both sides, plus or minus: x minus three is two or negative two. So x is five or one.', show: ['m.2', 'int.x1', 'int.x2'], focus: ['m.2', 'int.x1', 'int.x2'] },
        { say: 'For the y-intercept, set x to zero: two times nine, minus eight, is ten.', show: ['m.3', 'int.yi'], focus: ['m.3', 'int.yi'] },
        { say: 'Do not forget the negative root. Taking only plus two loses the intercept at one. Notice the two intercepts are symmetric about the axis, x equals three.', show: 'oops' },
      ],
    },
    {
      chapter: 'Irrational intercepts',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['0 = -(x + 1)^2 + 7', '(x + 1)^2 = 7', 'x + 1 = \\pm\\sqrt{7},\\quad x = -1 \\pm \\sqrt{7}', 'x \\approx 1.65 \\text{ or } x \\approx -3.65'] }],
      lines: [
        { say: 'The intercepts are not always whole numbers. Find the x-intercepts of y equals negative, x plus one, squared, plus seven, exactly and to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'Set y to zero, and isolate the square: x plus one, squared, is seven.', show: 'm.1', focus: 'm.1' },
        { say: 'So x plus one is plus or minus root seven, and x is negative one plus or minus root seven. That is the exact answer.', show: 'm.2', focus: 'm.2' },
        { say: 'To the nearest hundredth, x is about 1.65, or about negative 3.65.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the $x$-intercepts of $y = (x + 2)^2 - 9$?',
          choices: ['$1$ and $-5$', '$1$ only', '$-1$ and $5$', '$7$ and $-11$'],
          answer: 0,
          working: '$(x + 2)^2 = 9$, so $x + 2 = \\pm 3$ and $x = 1$ or $x = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the x-intercepts of y equals x plus two, squared, minus nine? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus two, squared, is nine, so x plus two is plus or minus three. Then x is one, or negative five. B forgets the negative root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$a$ and $q$: same sign, none; $q = 0$, one; opposite signs, two.', '$x$-intercepts: set $y = 0$ and take $\\pm$ square roots.', '$y$-intercept: set $x = 0$.'] }],
      lines: [
        { say: 'Let’s sum up. If "a" and q have the same sign, there are no x-intercepts. If q is zero, one. If they have opposite signs, two.', show: 'sum.0' },
        { say: 'For the x-intercepts, set y to zero and take plus or minus square roots.', show: 'sum.1' },
        { say: 'And for the y-intercept, set x to zero. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
