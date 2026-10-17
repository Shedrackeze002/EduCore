import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-3, 6], y: [0, 8] });
const g2 = plane({ x: [-6, 3], y: [0, 8], every: 0 });

const video: Explainer = {
  id: 'm301-1-1',
  lessonId: 'm301-1-1',
  title: 'Horizontal and Vertical Translations, Part 1: Sliding a Graph',
  thumbnailTitle: 'Translations',
  thumbnail: 'tr',
  summary: 'What a translation is, how y − k = f(x − h) slides the graph of y = f(x) h units across and k units up or down, why x − h moves a graph right when h is positive, and the equation of y = x² translated 2 left and 3 up. Parts 2 and 3 cover image points, equations, domain and range.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.1 · Part 1', title: 'Translations', subtitle: 'y − k = f(x − h)' }],
      lines: [
        { say: 'A sound engineer who delays a recording by two seconds, and turns the volume up by a fixed amount, moves the whole sound wave without changing its shape.', show: 'title' },
        { say: 'That is a translation. In this video, you will see how one equation slides any graph left or right, and up or down.' },
      ],
    },
    {
      chapter: 'What a translation is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Translation', md: 'A transformation that slides every point of a graph the same distance in the same direction. The shape and orientation do not change.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y - k = f(x - h)', 'y = f(x - h) + k'] },
        { kind: 'bullets', id: 'b', items: ['$h$ units horizontally: right if $h > 0$, left if $h < 0$.', '$k$ units vertically: up if $k > 0$, down if $k < 0$.'] },
      ],
      lines: [
        { say: 'A translation slides every point of a graph the same distance in the same direction. The shape does not change, and neither does the way the graph faces.', show: 'def' },
        { say: 'The graph of y minus k equals f of x minus h, is the graph of y equals f of x, translated h units horizontally and k units vertically.', show: 'm.0', focus: 'm.0' },
        { say: 'h moves the graph right when h is positive, and left when h is negative.', show: 'b.0', focus: 'b.0' },
        { say: 'k moves the graph up when k is positive, and down when k is negative.', show: 'b.1', focus: 'b.1' },
        { say: 'You will often see the same equation with k moved to the right side: y equals f of x minus h, plus k. Both forms say the same thing: replace x with x minus h, and y with y minus k.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Why x − h moves right',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('why', [
          g1,
          plot(g1, { id: 'base', f: (x) => x * x, tone: 'muted' }),
          plot(g1, { id: 'image', f: (x) => (x - 3) ** 2, tone: 'brand' }),
          dots(g1, [
            { id: 'O', x: 0, y: 0, tone: 'muted' },
            { id: 'V', x: 3, y: 0, tone: 'opp' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = x^2:\\ \\text{vertex at } x = 0', 'y = (x - 3)^2:', '\\text{vertex where } x - 3 = 0', 'x = 3:\\ \\text{right } 3'] }],
      lines: [
        { say: 'Why does x minus h move a graph to the right when h is positive? It can look backwards, so let’s test it with y equals x squared, in grey.', show: ['why.grid', 'why.axes', 'why.base'] },
        { say: 'On y equals x squared, the lowest point, the vertex, is where x is zero. The output there is zero.', show: ['why.O', 'm.0'], focus: ['why.O', 'm.0'] },
        { say: 'On y equals x minus three, all squared, that same output, zero, comes when x minus three is zero: that is, when x is three.', show: ['m.1', 'm.2', 'why.image', 'why.V'], focus: ['m.1', 'm.2', 'why.V'] },
        { say: 'Every output arrives three units later than before, so the whole graph slides three units right.', show: 'm.3', focus: ['m.3', 'why.image'] },
        { say: 'In general, the output that f produced at x equals zero now appears where x minus h is zero: at x equals h.' },
      ],
    },
    {
      chapter: 'Translating y = x²',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('tr', [
          g2,
          plot(g2, { id: 'base', f: (x) => x * x, tone: 'muted' }),
          plot(g2, { id: 'image', f: (x) => (x + 2) ** 2 + 3, tone: 'brand' }),
          dots(g2, [
            { id: 'O', x: 0, y: 0, tex: '(0, 0)', tone: 'muted', place: 'below right', group: 'old' },
            { id: 'P', x: 1, y: 1, tex: '(1, 1)', tone: 'muted', place: 'right', group: 'old' },
            { id: 'V', x: -2, y: 3, tex: '(-2, 3)', tone: 'opp', place: 'below left', group: 'new' },
            { id: 'Q', x: -1, y: 4, tex: '(-1, 4)', tone: 'opp', place: 'right', group: 'new' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{left } 2:\\ h = -2', '\\text{up } 3:\\ k = 3', 'y - 3 = (x - (-2))^2', 'y - 3 = (x + 2)^2', 'y = (x + 2)^2 + 3'] }],
      lines: [
        { say: 'The graph of y equals x squared, in grey, is translated two units left and three units up. Write the equation of the image.', show: ['tr.grid', 'tr.axes', 'tr.base'] },
        { say: 'Left two means h is negative two. Up three means k is three.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Replace x with x minus negative two, which is x plus two, and replace y with y minus three. So y minus three equals x plus two, all squared.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Add three to both sides: y equals x plus two, all squared, plus three.', show: ['m.4', 'tr.image'], focus: ['m.4', 'tr.image'] },
        { say: 'Check with points. The vertex moves from zero, zero, to negative two, three. And one, one, moves two left and three up, to negative one, four.', show: ['tr.old', 'tr.new'], focus: ['tr.new'] },
      ],
    },
    {
      chapter: 'Reading h and k',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Equation', '$h$', '$k$', 'Translation'],
          rows: [
            ['$y = f(x - 5)$', '$5$', '$0$', '5 right'],
            ['$y = f(x) - 4$', '$0$', '$-4$', '4 down'],
            ['$y - 2 = f(x + 1)$', '$-1$', '$2$', '1 left, 2 up'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s practise reading h and k. In y equals f of x minus five, h is five and k is zero. The graph moves five units right.', show: 't.0', focus: 't.0' },
        { say: 'In y equals f of x, minus four, nothing changes inside, so h is zero. k is negative four, so the graph moves four units down.', show: 't.1', focus: 't.1' },
        { say: 'In y minus two equals f of x plus one, write x plus one as x minus negative one. So h is negative one, and k is two: one unit left and two units up.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The graph of $y = x^2$ is translated 4 units right and 1 unit down. Which is the equation of the image?',
          choices: ['$y = (x - 4)^2 - 1$', '$y = (x + 4)^2 - 1$', '$y = (x - 4)^2 + 1$', '$y = (x - 1)^2 + 4$'],
          answer: 0,
          working: 'Right 4: $h = 4$, so replace $x$ with $x - 4$. Down 1: $k = -1$, so subtract 1.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of y equals x squared is translated four units right and one unit down. Which is the equation of the image? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Right four means h is four, so x becomes x minus four. Down one means k is negative one, so subtract one. B moves the graph left instead of right.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A translation slides a graph; its shape does not change.', '$y - k = f(x - h)$, or $y = f(x - h) + k$: $h$ across, $k$ up or down.', '$x - h$ moves the graph right when $h > 0$.'] }],
      lines: [
        { say: 'Let’s sum up. A translation slides every point of a graph the same distance in the same direction, so its shape does not change.', show: 'sum.0' },
        { say: 'The graph of y minus k equals f of x minus h, is translated h units horizontally and k units vertically.', show: 'sum.1' },
        { say: 'And x minus h moves the graph right when h is positive. In part two, we follow single points with mapping notation, and write the equations of translated graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
