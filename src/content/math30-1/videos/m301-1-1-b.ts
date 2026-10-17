import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-5, 5], y: [-3, 3], every: 0 });
const root = (x: number) => (x >= 0 ? Math.sqrt(x) : NaN);

const video: Explainer = {
  id: 'm301-1-1-b',
  lessonId: 'm301-1-1',
  title: 'Horizontal and Vertical Translations, Part 2: Image Points and Equations',
  thumbnailTitle: 'Image Points and Equations',
  thumbnail: 'sq',
  summary: 'Image points and the mapping (x, y) → (x + h, y + k), the image of (4, −1) on y + 5 = f(x − 3), the equation of y = √x translated 4 left and 2 down, and why f(x + 3) moves a graph left. Part 3 covers domain, range and reading a translation from graphs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.1 · Part 2', title: 'Image Points and Equations', subtitle: '(x, y) → (x + h, y + k)' }],
      lines: [
        { say: 'A graph is made of points, and a translation moves every one of them by exactly the same amount.', show: 'title' },
        { say: 'In this video, you will follow a single point with mapping notation, and write the equation of a translated graph, watching the sign of h.' },
      ],
    },
    {
      chapter: 'Mapping notation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'img', tone: 'definition', title: 'Image point', md: 'The point a given point moves to under a transformation. The image of $A$ is written $A\'$ ("$A$ prime").' },
        { kind: 'callout', id: 'map', tone: 'definition', title: 'Mapping', md: 'A rule that describes how every point moves. For $y - k = f(x - h)$, the mapping is $(x, y) \\to (x + h,\\ y + k)$.' },
      ],
      lines: [
        { say: 'The point that a given point moves to is called its image point. The image of point "A" is written "A" prime.', show: 'img' },
        { say: 'A mapping is a rule that describes how every point moves. For y minus k equals f of x minus h, the mapping is: x, y maps to x plus h, y plus k.', show: 'map' },
        { say: 'In words: add h to every x-coordinate, and add k to every y-coordinate. The arrow is read as “maps to”.' },
      ],
    },
    {
      chapter: 'Finding an image point',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(4, -1) \\text{ on } y = f(x)', 'y + 5 = f(x - 3):\\quad h = 3,\\quad k = -5', '(x, y) \\to (x + 3,\\ y - 5)', '(4, -1) \\to (4 + 3,\\ {-1} - 5) = (7, -6)'] },
      ],
      lines: [
        { say: 'The point at four, negative one, is on the graph of y equals f of x. Find the corresponding point on the graph of y plus five equals f of x minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Compare with y minus k equals f of x minus h. Inside the brackets, x minus three gives h equals three. On the left, y plus five is y minus negative five, so k is negative five.', show: 'm.1', focus: 'm.1' },
        { say: 'So the mapping is: x, y maps to x plus three, y minus five. That is three units right and five units down.', show: 'm.2', focus: 'm.2' },
        { say: 'Apply it to the point. Four plus three is seven, and negative one minus five is negative six. The image point is seven, negative six.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Writing the equation',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('sq', [
          g,
          plot(g, { id: 'base', f: root, from: 0, to: 5, samples: 400, tone: 'muted' }),
          plot(g, { id: 'image', f: (x) => root(x + 4) - 2, from: -4, to: 5, samples: 400, tone: 'brand' }),
          dots(g, [
            { id: 'O', x: 0, y: 0, tex: '(0, 0)', tone: 'muted', place: 'above left', group: 'old' },
            { id: 'P', x: 4, y: 2, tex: '(4, 2)', tone: 'muted', place: 'above', group: 'old' },
            { id: 'E', x: -4, y: -2, tex: '(-4, -2)', tone: 'opp', place: 'below right', group: 'new' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = -4,\\quad k = -2', 'y + 2 = \\sqrt{x + 4}', 'y = \\sqrt{x + 4} - 2', '(4, 2) \\to (0, 0)', '\\sqrt{0 + 4} - 2 = 0\\ \\checkmark'] }],
      lines: [
        { say: 'To write the equation of a translated function, start from the base function, replace x with x minus h, and add k. This works for any base function: x squared, the absolute value of x, the square root of x, x cubed, or one over x.' },
        { say: 'The graph of y equals the square root of x, in grey, is translated four units left and two units down. Write the equation of the image.', show: ['sq.grid', 'sq.axes', 'sq.base'] },
        { say: 'Left four means h is negative four, and down two means k is negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'Replace x with x plus four, and y with y plus two: y plus two equals the square root of x plus four. So y equals the square root of x plus four, minus two.', show: ['m.1', 'm.2', 'sq.image'], focus: ['m.2', 'sq.image'] },
        { say: 'The endpoint of the graph moves from zero, zero, to negative four, negative two: four left and two down.', show: ['sq.O', 'sq.E'], focus: ['sq.O', 'sq.E'] },
        { say: 'Check with another point. Four, two, is on y equals the square root of x. Four left and two down, it moves to zero, zero. And the square root of zero plus four, minus two, is two minus two, which is zero. It checks.', show: ['sq.P', 'm.3', 'm.4'], focus: ['sq.P', 'm.3', 'm.4'] },
      ],
    },
    {
      chapter: 'The sign of h',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign of h', md: 'In $y = f(x + 3)$, the graph moves 3 units **left**, not right: $x + 3 = x - (-3)$, so $h = -3$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = f(x) + 3:\\quad \\text{up } 3', 'y - 3 = f(x):\\quad \\text{also up } 3'] },
      ],
      lines: [
        { say: 'Watch the sign of h. In y equals f of x plus three, the graph moves three units left, not right.', show: 'oops' },
        { say: 'x plus three is x minus negative three, so h is negative three. The same output now arrives three units sooner.' },
        { say: 'The vertical shift reads the way it looks only when k is on the right side. y equals f of x, plus three, moves the graph up three.', show: 'm.0', focus: 'm.0' },
        { say: 'And y minus three equals f of x also moves it up three, because subtracting three on the left side is the same as adding three on the right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(-2, 6)$ is on the graph of $y = f(x)$. What is the corresponding point on the graph of $y = f(x + 4) - 1$?',
          choices: ['$(2, 5)$', '$(-6, 5)$', '$(-6, 7)$', '$(2, 7)$'],
          answer: 1,
          working: '$h = -4$ and $k = -1$, so $(x, y) \\to (x - 4,\\ y - 1)$: $(-2, 6) \\to (-6, 5)$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at negative two, six, is on the graph of y equals f of x. What is the corresponding point on the graph of y equals f of x plus four, minus one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. x plus four gives h equals negative four, and minus one gives k equals negative one. So subtract four from x and one from y: negative six, five. Choice A moves the point right instead of left.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mapping: $(x, y) \\to (x + h,\\ y + k)$.', 'To write an equation, replace $x$ with $x - h$, then add $k$.', '$f(x + 3)$ moves left 3, because $h = -3$.'] }],
      lines: [
        { say: 'Let’s sum up. A translation maps x, y to x plus h, y plus k: add h to x, and k to y.', show: 'sum.0' },
        { say: 'To write the equation of a translated function, replace x with x minus h, then add k.', show: 'sum.1' },
        { say: 'And f of x plus three moves the graph left three, because h is negative three. In part three, we find the domain and range of a translated function, and read a translation from two graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
