import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-5, 3.5], y: [-8, 6], every: 4, width: 8.5, height: 10 });

/** The name of the asymptote, above the dashed line at the right edge of the graph. */
const name: Part = { points: { an: g.map(3.4, 5) }, items: [{ kind: 'label', id: 'asy-name', at: 'an', tex: 'y = 5', tone: 'theta', place: 'above left' }] };

/** The label of (1, −1), up and to the right of its dot, clear of the steep curve and the x-axis. */
const q1: Part = { points: { q1t: g.map(1.35, -0.75) }, items: [{ kind: 'label', id: 'Q1-tex', at: 'q1t', tex: '(1, -1)', tone: 'opp', place: 'right' }] };

const video: Explainer = {
  id: 'm301-7-2-b',
  lessonId: 'm301-7-2',
  title: 'Transformations of Exponential Functions, Part 2: Image Points',
  thumbnailTitle: 'Image Points',
  thumbnail: 'map',
  summary: 'The mapping rule (x, y) → (x/b + h, ay + k) for y = a(c)^(b(x − h)) + k, finding the image of (2, 4) on y = −3(2)^(½(x + 1)) + 5, graphing it from its key points and asymptote, and why b = ½ is a horizontal stretch by a factor of 2. Part 3 writes equations from a description and from a graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.2 · Part 2', title: 'Image Points', subtitle: 'Stretch and reflect first, then translate' }],
      lines: [
        { say: 'To graph a transformed exponential function, you do not need to transform every point. Move a few key points, move the asymptote, and join them with a smooth curve.', show: 'title' },
        { say: 'In this video, you will use a mapping rule to find image points, and avoid a common mistake with horizontal stretches.' },
      ],
    },
    {
      chapter: 'The mapping rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = a(c)^{b(x - h)} + k', '(x, y) \\to \\left(\\dfrac{x}{b} + h,\\ ay + k\\right)'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Stretch first, then translate', md: 'For $x$, divide by $b$, then add $h$. For $y$, multiply by $a$, then add $k$.' },
      ],
      lines: [
        { say: 'Each point x, y on y equals c to the power x moves to a point on the transformed graph.', show: 'm.0' },
        { say: 'Its x-coordinate is divided by b, and then h is added. Its y-coordinate is multiplied by "a", and then k is added.', show: 'm.1', focus: 'm.1' },
        { say: 'The order matters: stretches and reflections come first, and translations last.', show: 'tip' },
      ],
    },
    {
      chapter: 'Find an image point',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = -3(2)^{\\frac{1}{2}(x + 1)} + 5', 'a = -3,\\quad b = \\tfrac{1}{2},\\quad h = -1,\\quad k = 5', 'x:\\ \\dfrac{2}{\\frac{1}{2}} + (-1) = 4 - 1 = 3', 'y:\\ {-3}(4) + 5 = -7', '(2, 4) \\to (3, -7)'] },
      ],
      lines: [
        { say: 'The point at two, four, is on y equals two to the power x. Find its image on y equals negative three times two to the power one half of x plus one, plus five.', show: 'm.0', focus: 'm.0' },
        { say: 'Read the parameters. "a" is negative three, b is one half, h is negative one, and k is five.', show: 'm.1', focus: 'm.1' },
        { say: 'For x, divide two by one half. Dividing by one half is the same as multiplying by two, so that gives four. Then add negative one: three.', show: 'm.2', focus: 'm.2' },
        { say: 'For y, multiply four by negative three, which gives negative twelve. Then add five: negative seven.', show: 'm.3', focus: 'm.3' },
        { say: 'So the image is three, negative seven. Check it in the equation: three plus one is four, half of four is two, and two squared is four. Negative three times four, plus five, is negative seven.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Graphing from key points',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('map', [
          g,
          polyline(g, { id: 'asy', points: [[-5, 5], [3.5, 5]], tone: 'theta', dashed: true }),
          name,
          plot(g, { id: 'image', f: (x) => -3 * 2 ** ((x + 1) / 2) + 5, samples: 200 }),
          q1,
          dots(g, [
            { id: 'Q0', x: -1, y: 2, tex: '(-1, 2)', tone: 'opp', place: 'below left' },
            { id: 'Q1', x: 1, y: -1, tone: 'opp' },
            { id: 'Q2', x: 3, y: -7, tex: '(3, -7)', tone: 'opp', place: 'left' },
          ]),
        ]),
      ],
      right: [{ kind: 'table', id: 't', head: ['$y = 2^{x}$', '$(2x - 1,\\ -3y + 5)$'], rows: [['$(0, 1)$', '$(-1, 2)$'], ['$(1, 2)$', '$(1, -1)$'], ['$(2, 4)$', '$(3, -7)$']] }],
      lines: [
        { say: 'For this function, dividing by one half doubles x, so the mapping rule becomes: x, y goes to two x minus one, negative three y plus five.', show: ['map.grid', 'map.axes'] },
        { say: 'Zero, one goes to negative one, two. One, two goes to one, negative one. And two, four goes to three, negative seven.', show: ['t', 'map.Q0', 'map.Q1', 'map.Q1-tex', 'map.Q2'], focus: ['map.Q0', 'map.Q1', 'map.Q1-tex', 'map.Q2'] },
        { say: 'The asymptote y equals zero moves up five units, to y equals five.', show: ['map.asy', 'map.asy-name'], focus: 'map.asy' },
        { say: 'Join the points, getting closer to the asymptote on the left. Because "a" is negative, the curve falls away below the asymptote.', show: 'map.image', focus: 'map.image' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The horizontal stretch factor', md: 'A value of $b = \\frac{1}{2}$ is a horizontal stretch by a factor of $2$, not $\\frac{1}{2}$: the $x$-coordinates are **divided** by $b$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['b = \\tfrac{1}{2}:\\quad x \\div \\tfrac{1}{2} = 2x \\quad (\\text{twice as wide})', 'b = 3:\\quad x \\div 3 = \\tfrac{x}{3} \\quad (\\text{one third as wide})'] },
      ],
      lines: [
        { say: 'A common mistake is to read b as the stretch factor. A value of b equals one half is not a stretch by a factor of one half.', show: 'oops' },
        { say: 'The x-coordinates are divided by b. Dividing by one half doubles them, so the graph becomes twice as wide: a horizontal stretch by a factor of two.', show: 'm.0', focus: 'm.0' },
        { say: 'In the same way, b equals three divides every x-coordinate by three. The graph is compressed to one third of its width.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(1, 3)$ is on $y = 3^{x}$. Find its image on $y = 2(3)^{\\frac{1}{3}(x - 2)} - 1$.',
          choices: ['$\\left(\\frac{7}{3}, 5\\right)$', '$(5, 7)$', '$(5, 5)$', '$(1, 5)$'],
          answer: 2,
          working: '$a = 2$, $b = \\frac{1}{3}$, $h = 2$, $k = -1$. $x$: $\\dfrac{1}{\\frac{1}{3}} + 2 = 3 + 2 = 5$. $y$: $2(3) - 1 = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at one, three, is on y equals three to the power x. Find its image on y equals two times three to the power one third of x minus two, minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. One divided by one third is three, plus two is five. And two times three, minus one, is five. Choice A multiplies x by one third instead of dividing by it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mapping rule: $(x, y) \\to \\left(\\frac{x}{b} + h,\\ ay + k\\right)$.', 'Stretches and reflections first, then translations.', 'Divide the $x$-coordinates by $b$: $b = \\frac{1}{2}$ stretches by a factor of $2$.', 'Graph from a few image points and the asymptote $y = k$.'] }],
      lines: [
        { say: 'Let’s sum up. Each point x, y maps to x over b plus h, "a" y plus k.', show: 'sum.0' },
        { say: 'Stretches and reflections come first, then translations.', show: 'sum.1' },
        { say: 'The x-coordinates are divided by b, so b equals one half stretches the graph by a factor of two.', show: 'sum.2' },
        { say: 'To graph, plot a few image points and the asymptote, y equals k. In part three, we write the equation from a description and from a graph. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
