import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [0, 120], y: [0, 180], xStep: 20, yStep: 30, width: 6, height: 6, titles: { x: 'a', y: 's' } });

/** The region on or above 15a + 10s = 1500, in the first quadrant. */
const above: Part = {
  points: { h1: g.map(0, 150), h2: g.map(100, 0), h3: g.map(120, 0), h4: g.map(120, 180), h5: g.map(0, 180) },
  items: [{ kind: 'region', id: 'shade', points: ['h1', 'h2', 'h3', 'h4', 'h5'], tone: 'good', shade: 0.2 }],
};

const video: Explainer = {
  id: 'm201-9-1-b',
  lessonId: 'm201-9-1',
  title: 'Linear Inequalities in Two Variables, Part 2: Checking and Modelling',
  thumbnailTitle: 'Inequalities in Context',
  thumbnail: 'tk',
  summary: 'Checking a graph by solving 2x − 3y > 6 for y and reversing the sign when dividing by a negative, where to shade when y is alone, and writing and graphing 15a + 10s ≥ 1500 for a drama club’s ticket sales.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 9.1 · Part 2', title: 'Checking and Modelling', subtitle: 'Solve for y, then write your own' }],
      lines: [
        { say: 'Solving an inequality for y gives a quick check on your shading, as long as you remember one rule about negative numbers.', show: 'title' },
        { say: 'In this video, you will check a graph by solving for y, and write an inequality for a real situation.' },
      ],
    },
    {
      chapter: 'Solving for y',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2x - 3y > 6', '-3y > -2x + 6', 'y < \\tfrac{2}{3}x - 2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by a negative', md: 'Dividing or multiplying by a negative number **reverses** the sign: $y < \\tfrac{2}{3}x - 2$, not $y > \\tfrac{2}{3}x - 2$.' },
      ],
      lines: [
        { say: 'Check the graph of two x minus three y greater than six, by solving for y. Subtract two x: negative three y is greater than negative two x, plus six.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Now divide by negative three. Dividing or multiplying an inequality by a negative number reverses the sign, so y is less than two thirds x, minus two.', show: ['m.2', 'oops'], focus: 'm.2' },
        { say: 'y is less than the line, so the solution region is below it, which matches the test point.' },
      ],
    },
    {
      chapter: 'When y is alone',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'When y is alone', md: 'For $y > mx + b$ or $y \\ge mx + b$, shade **above** the line. For $y < mx + b$ or $y \\le mx + b$, shade **below** it. For a vertical boundary such as $x \\ge 2$, shade to the **right**.' }],
      lines: [
        { say: 'When y is alone on one side, the sign tells you where to shade. For y greater than, or at least, m x plus b, shade above the line. For less than, or at most, shade below it.', show: 'tip' },
        { say: 'And for a vertical boundary, such as x at least two, shade to the right of the line.' },
      ],
    },
    {
      chapter: 'Ticket sales',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('tk', [
          g,
          above,
          polyline(g, { id: 'line', points: [[0, 150], [100, 0]], tone: 'brand' }),
          dots(g, [{ id: 'P', x: 60, y: 70, tex: '(60, 70)', tone: 'opp', place: 'right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{at least: } \\ge;\\quad \\text{at most: } \\le', '15a + 10s \\ge 1500', '(60, 70):\\quad 900 + 700 = 1600 \\;\\checkmark'] }],
      lines: [
        { say: 'Translate the words carefully. At least means greater than or equal to. At most, or no more than, means less than or equal to.', show: 'm.0', focus: 'm.0' },
        { say: 'In this example, adult tickets cost fifteen dollars, and student tickets cost ten dollars, and the club needs at least 1,500 dollars. Let "a" be the number of adult tickets, and s the number of student tickets.', show: ['tk.grid', 'tk.axes'] },
        { say: 'The money raised is fifteen "a" plus ten s, so fifteen "a" plus ten s is at least 1,500. The boundary is solid, and the region is on and above it.', show: ['m.1', 'tk.line', 'tk.shade'], focus: ['m.1', 'tk.shade'] },
        { say: 'Is selling sixty adult and seventy student tickets enough? Fifteen times sixty is 900, and ten times seventy is 700, for 1,600 dollars. That is at least 1,500, so yes.', show: ['m.2', 'tk.P'], focus: ['m.2', 'tk.P'] },
        { say: 'In a situation like this, only whole-number points where neither count is negative make sense, even though the graph shades a whole region.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In this example, a bake sale sells muffins at \\$2 and cookies at \\$1, and must take in more than \\$80. Which inequality fits, for $m$ muffins and $c$ cookies?',
          choices: ['$2m + c > 80$', '$2m + c \\ge 80$', '$2m + c < 80$', '$m + 2c > 80$'],
          answer: 0,
          working: 'The money taken in is $2m + c$, and "more than" means $>$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bake sale sells muffins at two dollars, and cookies at one dollar, and must take in more than eighty dollars. Which inequality fits? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The money taken in is two m plus c, and more than means greater than. B would mean at least, and D swaps the prices.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Dividing or multiplying by a negative reverses the sign.', 'With $y$ alone: $>$ or $\\ge$ shades above, $<$ or $\\le$ below.', '"At least" is $\\ge$, "at most" is $\\le$; check the context.'] }],
      lines: [
        { say: 'Let’s sum up. Dividing or multiplying an inequality by a negative number reverses the sign.', show: 'sum.0' },
        { say: 'With y alone, greater than shades above the line, and less than shades below.', show: 'sum.1' },
        { say: 'And at least means greater than or equal to, while at most means less than or equal to. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
