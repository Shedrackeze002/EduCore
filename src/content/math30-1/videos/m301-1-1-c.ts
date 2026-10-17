import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-5, 6], y: [-9, 5], every: 0 });
const g2 = plane({ x: [-6, 4], y: [-1, 6], every: 0 });

const f = [[-3, 1], [-1, 4], [2, -2], [5, 3]] as [number, number][];
const moved = f.map(([x, y]) => [x - 1, y - 6]) as [number, number][];

const video: Explainer = {
  id: 'm301-1-1-c',
  lessonId: 'm301-1-1',
  title: 'Horizontal and Vertical Translations, Part 3: Domain, Range and Graphs',
  thumbnailTitle: 'Domain, Range and Graphs',
  thumbnail: 'dr',
  summary: 'How a translation shifts the domain by h and the range by k, the domain and range of y = f(x + 1) − 6, and reading h and k from two graphs by following a corner and checking with a second point.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.1 · Part 3', title: 'Domain, Range and Graphs', subtitle: 'Shift the domain by h and the range by k' }],
      lines: [
        { say: 'When a graph slides, the set of x-values it covers slides with it, and so does the set of y-values.', show: 'title' },
        { say: 'In this video, you will find the domain and range of a translated function, and read a translation from two graphs.' },
      ],
    },
    {
      chapter: 'Domain and range move too',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('dr', [
          g1,
          polyline(g1, { id: 'f', points: f, tone: 'muted' }),
          polyline(g1, { id: 'image', points: moved, tone: 'brand' }),
          dots(g1, [
            { id: 'a', x: -3, y: 1, tone: 'muted', group: 'ends' },
            { id: 'b', x: 5, y: 3, tone: 'muted', group: 'ends' },
            { id: 'a2', x: -4, y: -5, tone: 'opp', group: 'ends2' },
            { id: 'b2', x: 4, y: -3, tone: 'opp', group: 'ends2' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['A horizontal translation shifts the **domain** by $h$.', 'A vertical translation shifts the **range** by $k$.', 'The shape does not change, so neither does the width of the domain or the range.'] }],
      lines: [
        { say: 'A horizontal translation moves every x-value by h. So it moves the domain, the set of all the x-values, by h as well.', show: 'b.0', focus: 'b.0' },
        { say: 'A vertical translation moves every y-value by k, so it moves the range by k.', show: 'b.1', focus: 'b.1' },
        { say: 'Here, the grey graph of f runs from x equals negative three to x equals five. Its lowest point is at y equals negative two, and its highest at y equals four.', show: ['dr.grid', 'dr.axes', 'dr.f', 'dr.ends'] },
        { say: 'The coloured graph is y equals f of x plus one, minus six: one unit left and six units down. Every endpoint, peak and valley moves the same way.', show: ['dr.image', 'dr.ends2'], focus: 'dr.image' },
        { say: 'The shape does not change, so the domain is still eight units wide, and the range is still six units tall. They have just moved.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Finding the domain and range',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{domain of } f:\\ \\{x \\mid -3 \\le x \\le 5,\\ x \\in \\mathbb{R}\\}', '\\text{range of } f:\\ \\{y \\mid -2 \\le y \\le 4,\\ y \\in \\mathbb{R}\\}', 'y = f(x + 1) - 6:\\quad h = -1,\\quad k = -6', '{-3} - 1 = -4,\\qquad 5 - 1 = 4', '{-2} - 6 = -8,\\qquad 4 - 6 = -2'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'Domain $\\{x \\mid -4 \\le x \\le 4,\\ x \\in \\mathbb{R}\\}$; range $\\{y \\mid -8 \\le y \\le -2,\\ y \\in \\mathbb{R}\\}$' },
      ],
      lines: [
        { say: 'Now with symbols. y equals f of x has domain from negative three to five, and range from negative two to four. Find the domain and range of y equals f of x plus one, minus six.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'x plus one gives h equals negative one, and minus six gives k equals negative six.', show: 'm.2', focus: 'm.2' },
        { say: 'Shift the domain by h. Negative three minus one is negative four, and five minus one is four.', show: 'm.3', focus: 'm.3' },
        { say: 'Shift the range by k. Negative two minus six is negative eight, and four minus six is negative two.', show: 'm.4', focus: 'm.4' },
        { say: 'So the domain is all real x from negative four to four, and the range is all real y from negative eight to negative two.', show: 'ans' },
      ],
    },
    {
      chapter: 'Reading h and k from graphs',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('rd', [
          g2,
          plot(g2, { id: 'base', f: (x) => Math.abs(x), tone: 'muted' }),
          plot(g2, { id: 'image', f: (x) => Math.abs(x + 3) + 2, tone: 'brand' }),
          dots(g2, [
            { id: 'O', x: 0, y: 0, tex: '(0, 0)', tone: 'muted', place: 'below right' },
            { id: 'V', x: -3, y: 2, tex: '(-3, 2)', tone: 'opp', place: 'below' },
            { id: 'P', x: 1, y: 1, tex: '(1, 1)', tone: 'muted', place: 'right' },
            { id: 'Q', x: -2, y: 3, tex: '(-2, 3)', tone: 'opp', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(0, 0) \\to (-3, 2)', 'h = -3,\\quad k = 2', '(1, 1) \\to (-2, 3)\\ \\checkmark', 'y = |x + 3| + 2'] }],
      lines: [
        { say: 'To read a translation from two graphs, pick a corner, or another clear point, on the original graph, and find its image.', show: ['rd.grid', 'rd.axes', 'rd.base', 'rd.image'] },
        { say: 'Here, the grey graph is y equals the absolute value of x. Its corner, the vertex at zero, zero, moves to negative three, two.', show: ['rd.O', 'rd.V', 'm.0'], focus: ['rd.O', 'rd.V', 'm.0'] },
        { say: 'The change in x is h: negative three. The change in y is k: two.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with a second point, because in a translation every point moves by the same amount. One, one, moves three left and two up, to negative two, three. That point is on the coloured graph.', show: ['rd.P', 'rd.Q', 'm.2'], focus: ['rd.P', 'rd.Q', 'm.2'] },
        { say: 'So the equation of the coloured graph is y equals the absolute value of x plus three, plus two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$y = f(x)$ has domain $\\{x \\mid 0 \\le x \\le 6,\\ x \\in \\mathbb{R}\\}$ and range $\\{y \\mid 1 \\le y \\le 3,\\ y \\in \\mathbb{R}\\}$. What is the range of $y = f(x - 2) + 5$?',
          choices: ['$1 \\le y \\le 3$', '$3 \\le y \\le 5$', '$-4 \\le y \\le -2$', '$6 \\le y \\le 8$'],
          answer: 3,
          working: '$k = 5$, so the range moves up 5: $1 + 5 = 6$ and $3 + 5 = 8$. The horizontal shift, $h = 2$, changes only the domain.',
        },
      ],
      lines: [
        { say: 'Your turn. y equals f of x has domain zero to six, and range one to three. What is the range of y equals f of x minus two, plus five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. k is five, so the range moves up five: one plus five is six, and three plus five is eight. B shifts the range by h, but h changes only the domain.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A translation shifts the domain by $h$ and the range by $k$.', 'To read $h$ and $k$, follow one clear point to its image.', 'Check with a second point: every point moves the same amount.'] }],
      lines: [
        { say: 'Let’s sum up. A translation shifts the domain by h, and the range by k.', show: 'sum.0' },
        { say: 'To read h and k from two graphs, follow one clear point, like a corner, to its image.', show: 'sum.1' },
        { say: 'And check with a second point, because in a translation every point moves the same amount. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
