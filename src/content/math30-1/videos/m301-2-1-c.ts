import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const root = (x: number) => Math.sqrt(Math.max(0, x));

/** A small plane with its endpoint at the origin, one of the four ways a radical graph can open, and its signs below it. */
function direction(name: string, at: number, f: (x: number) => number, from: number, to: number, signs: string): Part[] {
  const p = plane({ name, x: [-3, 3], y: [-2, 2], every: 0, at: [at, 0] });
  const label: Part = { points: { [p.n('tt')]: [at, -2] }, items: [{ kind: 'label', id: p.n('signs'), at: p.n('tt'), tex: signs, place: 'below' }] };
  return [p, plot(p, { id: 'c', f, from, to, samples: 200 }), dots(p, [{ id: 'E', x: 0, y: 0, tone: 'opp' }]), label];
}

const g = plane({ x: [-2, 5], y: [-4, 5], every: 2 });

const video: Explainer = {
  id: 'm301-2-1-c',
  lessonId: 'm301-2-1',
  title: 'Radical Functions and Transformations, Part 3: Domain and Range',
  thumbnailTitle: 'Domain and Range',
  thumbnail: 'ex',
  summary: 'Reading the domain and range of y = a√(b(x − h)) + k from its endpoint (h, k) and the signs of a and b, for y = −3√(2(x + 1)) + 4, and the hidden reflection in y = √(6 − 2x), whose radicand must be factored before reading h.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.1 · Part 3', title: 'Domain and Range', subtitle: 'An endpoint and two signs' }],
      lines: [
        { say: 'You do not need to draw a radical function to know where its graph lives. Its endpoint and two signs tell you everything.', show: 'title' },
        { say: 'In this video, you will read the domain and range straight from the equation, and spot a reflection that hides inside the radical.' },
      ],
    },
    {
      chapter: 'Four directions',
      layout: 'center',
      main: [
        figure('dir', [
          ...direction('q1', 0, (x) => root(x), 0, 3, 'a > 0,\\ b > 0'),
          ...direction('q2', 8, (x) => root(-x), -3, 0, 'a > 0,\\ b < 0'),
          ...direction('q3', 16, (x) => -root(x), 0, 3, 'a < 0,\\ b > 0'),
          ...direction('q4', 24, (x) => -root(-x), -3, 0, 'a < 0,\\ b < 0'),
        ]),
        { kind: 'bullets', id: 'b', items: ['$b > 0$: opens right, domain $x \\ge h$. $\\;b < 0$: opens left, domain $x \\le h$.', '$a > 0$: rises, range $y \\ge k$. $\\;a < 0$: falls, range $y \\le k$.'] },
      ],
      lines: [
        { say: 'The graph of y equals "a" times the square root of b times x minus h, plus k, starts at its endpoint, h, k. From there, it can head off in four directions.', show: 'dir' },
        { say: 'The sign of b decides left or right. If b is positive, the graph opens to the right, so the domain is x greater than or equal to h.', show: 'b.0', focus: ['dir.q1-c', 'dir.q3-c'] },
        { say: 'If b is negative, the graph is reflected in the y-axis. It opens to the left, and the domain is x less than or equal to h.', focus: ['dir.q2-c', 'dir.q4-c'] },
        { say: 'The sign of "a" decides up or down. If "a" is positive, the graph rises from the endpoint, so the range is y greater than or equal to k.', show: 'b.1', focus: ['dir.q1-c', 'dir.q2-c'] },
        { say: 'If "a" is negative, the graph is reflected in the x-axis. It falls from the endpoint, and the range is y less than or equal to k.', focus: ['dir.q3-c', 'dir.q4-c'] },
      ],
    },
    {
      chapter: 'Reading domain and range',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('ex', [
          g,
          polyline(g, { id: 'guide', points: [[0, 4], [-1, 4], [-1, 0]], tone: 'muted', dashed: true }),
          plot(g, { id: 'curve', f: (x) => -3 * root(2 * (x + 1)) + 4, from: -1, to: 5, samples: 300 }),
          polyline(g, { id: 'dom', points: [[-1, 0], [5, 0]], tone: 'good' }),
          polyline(g, { id: 'ran', points: [[0, 4], [0, -4]], tone: 'adj' }),
          dots(g, [{ id: 'E', x: -1, y: 4, tex: '(-1, 4)', tone: 'opp', place: 'above left' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -3\\sqrt{2(x + 1)} + 4', '\\text{Endpoint: } (-1, 4)', 'b > 0:\\ \\{x \\mid x \\ge -1,\\ x \\in \\mathbb{R}\\}', 'a < 0:\\ \\{y \\mid y \\le 4,\\ y \\in \\mathbb{R}\\}', '[-1, \\infty) \\text{ and } (-\\infty, 4]'] }],
      lines: [
        { say: 'State the domain and range of y equals negative three times the square root of two times x plus one, plus four.', show: ['m.0', 'ex.grid', 'ex.axes'], focus: 'm.0' },
        { say: 'First, the endpoint. x plus one is x minus negative one, so h is negative one, and k is four. The endpoint is negative one, four.', show: ['m.1', 'ex.E', 'ex.guide'], focus: ['m.1', 'ex.E'] },
        { say: 'b is two, which is positive, so the graph opens to the right. The domain is all real x greater than or equal to negative one.', show: ['m.2', 'ex.curve', 'ex.dom'], focus: ['m.2', 'ex.dom'] },
        { say: '"a" is negative three, which is negative, so the graph falls from the endpoint. The range is all real y less than or equal to four.', show: ['m.3', 'ex.ran'], focus: ['m.3', 'ex.ran'] },
        { say: 'In interval notation, the domain is a square bracket at negative one, to infinity, and the range is from negative infinity to four, with a square bracket at four.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A hidden reflection',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\sqrt{6 - 2x}', '6 - 2x = -2(x - 3):\\quad b = -2,\\ h = 3', '6 - 2x \\ge 0 \\;\\Rightarrow\\; -2x \\ge -6 \\;\\Rightarrow\\; x \\le 3'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A hidden reflection', md: 'For $y = \\sqrt{6 - 2x}$, the domain is **not** $x \\ge 3$. Factor the radicand first: $b < 0$, so the graph opens to the left, and the domain is $x \\le 3$.' },
      ],
      lines: [
        { say: 'Here is a trap. What is the domain of y equals the square root of six minus two x?', show: 'm.0', focus: 'm.0' },
        { say: 'It is tempting to see the numbers and say x is at least three. But look at the x-term: it is negative. Factor the radicand, the expression under the root. Six minus two x is negative two times x minus three. So h is three, and b is negative two.', show: 'm.1', focus: 'm.1' },
        { say: 'b is negative, so the graph is reflected in the y-axis. It opens to the left, and the domain is x less than or equal to three.' },
        { say: 'You can check by solving six minus two x greater than or equal to zero. Negative two x is at least negative six. Dividing by a negative number reverses the inequality, so x is at most three.', show: 'm.2', focus: 'm.2' },
        { say: 'So always factor the radicand before you read h and the direction.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the domain and range of $y = 2\\sqrt{8 - 2x} - 1$.',
          choices: ['Domain $x \\le 4$; range $y \\ge -1$', 'Domain $x \\ge 4$; range $y \\ge -1$', 'Domain $x \\le 8$; range $y \\ge -1$', 'Domain $x \\le 4$; range $y \\le -1$'],
          answer: 0,
          working: '$8 - 2x = -2(x - 4)$, so the endpoint is $(4, -1)$. $b = -2 < 0$: domain $\\{x \\mid x \\le 4,\\ x \\in \\mathbb{R}\\}$. $a = 2 > 0$: range $\\{y \\mid y \\ge -1,\\ y \\in \\mathbb{R}\\}$.',
        },
      ],
      lines: [
        { say: 'Your turn. State the domain and range of y equals two times the square root of eight minus two x, minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Factor the radicand: eight minus two x is negative two times x minus four, so the endpoint is four, negative one. b is negative, so the domain is x at most four. "a" is positive, so the range is y at least negative one. B misses the hidden reflection.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The graph starts at its endpoint $(h, k)$.', 'The sign of $b$ gives the domain: $x \\ge h$ or $x \\le h$.', 'The sign of $a$ gives the range: $y \\ge k$ or $y \\le k$.', 'Factor the radicand before reading $h$.'] }],
      lines: [
        { say: 'Let’s sum up. A radical graph starts at its endpoint, h, k.', show: 'sum.0' },
        { say: 'The sign of b gives the domain: x at least h when b is positive, and x at most h when b is negative.', show: 'sum.1' },
        { say: 'The sign of "a" gives the range: y at least k when "a" is positive, and y at most k when "a" is negative.', show: 'sum.2' },
        { say: 'And factor the radicand before you read h. In part four, we work backwards, from a graph to its equation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
