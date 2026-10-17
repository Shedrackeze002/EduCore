import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-3, 7], y: [0, 9], every: 0 });

const video: Explainer = {
  id: 'm301-1-3-b',
  lessonId: 'm301-1-3',
  title: 'Combining Transformations, Part 2: Describing and Factoring',
  thumbnailTitle: 'Describing and Factoring',
  thumbnail: 'fb',
  summary: 'Describing every transformation in y + 2 = −½f(3(x + 4)), why b must be factored out before reading h, the image of (8, 5) on y = f(2x − 6) + 1, and why y = f(2x − 6) moves 3 units right, not 6. Part 3 writes equations from descriptions and graphs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.3 · Part 2', title: 'Describing and Factoring', subtitle: 'Factor out b before you read h' }],
      lines: [
        { say: 'One short equation can hide four transformations at once. To see them all, you need to read it carefully, in the right form.', show: 'title' },
        { say: 'In this video, you will describe each transformation in an equation, and learn to factor the inside of the brackets before you read h.' },
      ],
    },
    {
      chapter: 'Describing the transformations',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y + 2 = -\\tfrac{1}{2}f(3(x + 4))', 'a = -\\tfrac{1}{2}:\\ \\text{vertical stretch by } \\tfrac{1}{2},\\ \\text{reflect in the } x\\text{-axis}', 'b = 3:\\ \\text{horizontal stretch by } \\tfrac{1}{3}', 'h = -4,\\ k = -2:\\ 4 \\text{ left},\\ 2 \\text{ down}'] },
      ],
      lines: [
        { say: 'Describe how the graph of y plus two equals negative one half f of three, times x plus four, is related to the graph of y equals f of x.', show: 'm.0', focus: 'm.0' },
        { say: '"a" is negative one half. That is a vertical stretch by a factor of one half about the x-axis, and a reflection in the x-axis.', show: 'm.1', focus: 'm.1' },
        { say: 'b is three. That is a horizontal stretch by a factor of one third about the y-axis.', show: 'm.2', focus: 'm.2' },
        { say: 'x plus four is x minus negative four, so h is negative four. And y plus two is y minus negative two, so k is negative two. That is a translation of four units left and two units down.', show: 'm.3', focus: 'm.3' },
        { say: 'Put together, in order: stretch vertically by one half, reflect in the x-axis, stretch horizontally by one third, and then translate four left and two down.' },
      ],
    },
    {
      chapter: 'Factor b first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(8, 5) \\text{ on } y = f(x)', 'y = f(2x - 6) + 1', '2x - 6 = 2(x - 3)', 'y = f(2(x - 3)) + 1:\\quad b = 2,\\ h = 3,\\ k = 1', 'x:\\ \\tfrac{8}{2} + 3 = 7 \\qquad y:\\ 5 + 1 = 6'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Image point', md: '$(8, 5) \\to (7, 6)$' },
      ],
      lines: [
        { say: 'You can only read h once the inside of the brackets has the form b times x minus h. If it does not, factor out b first.' },
        { say: 'The point at eight, five, is on the graph of y equals f of x. Find its image on y equals f of two x minus six, plus one.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The inside is two x minus six. Factor out the two: two x minus six is two times x minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'Now the equation is y equals f of two, times x minus three, plus one. So b is two, h is three, and k is one.', show: 'm.3', focus: 'm.3' },
        { say: 'For x: eight divided by two is four, plus three is seven. For y: five plus one is six.', show: 'm.4', focus: 'm.4' },
        { say: 'So the image point is seven, six.', show: 'ans' },
      ],
    },
    {
      chapter: 'Reading h too early',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('fb', [
          g,
          plot(g, { id: 'base', f: (x) => x * x, tone: 'muted' }),
          plot(g, { id: 'image', f: (x) => (2 * x - 6) ** 2, tone: 'brand' }),
          dots(g, [
            { id: 'V', x: 3, y: 0, tex: '(3, 0)', tone: 'good', place: 'below' },
            { id: 'X', x: 6, y: 0, tex: '(6, 0)', tone: 'bad', place: 'below', open: true },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reading h too early', md: 'In $y = f(2x - 6)$ the graph does **not** move 6 units right. Factoring gives $f(2(x - 3))$: a horizontal stretch by a factor of $\\frac{1}{2}$, then 3 units right.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = (2x - 6)^2 = (2(x - 3))^2'] },
      ],
      lines: [
        { say: 'A common mistake is to read h too early. In y equals f of two x minus six, the horizontal translation is not six units right.', show: 'oops' },
        { say: 'Factoring gives f of two, times x minus three. The graph is squeezed by a factor of one half, and then moved three units right.' },
        { say: 'Here is an example, with f of x equal to x squared, in grey. The graph of y equals two x minus six, all squared, is the narrow parabola in colour.', show: ['fb.grid', 'fb.axes', 'fb.base', 'fb.image', 'm.0'], focus: ['fb.image', 'm.0'] },
        { say: 'Its vertex is at three, zero, not at six, zero. The vertex is where the inside is zero, and two x minus six is zero when x is three.', show: ['fb.V', 'fb.X'], focus: ['fb.V', 'fb.X'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the horizontal translation in $y = f(3x + 12)$?',
          choices: ['$4$ units right', '$12$ units left', '$4$ units left', '$12$ units right'],
          answer: 2,
          working: '$3x + 12 = 3(x + 4) = 3(x - (-4))$, so $h = -4$: 4 units left.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the horizontal translation in y equals f of three x plus twelve, with all of three x plus twelve inside the brackets? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Factor out three: three x plus twelve is three times x plus four. So h is negative four: four units left. B reads h before factoring.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read $a$, $b$, $h$ and $k$ to describe each transformation.', 'Factor the inside to $b(x - h)$ before reading $h$.', '$f(2x - 6) = f(2(x - 3))$: stretch by $\\frac{1}{2}$, then 3 units right.'] }],
      lines: [
        { say: 'Let’s sum up. Read "a", b, h and k to describe each transformation, and list the stretches and reflections before the translations.', show: 'sum.0' },
        { say: 'Factor the inside of the brackets to the form b times x minus h, before you read h.', show: 'sum.1' },
        { say: 'So f of two x minus six is a horizontal stretch by one half, then a translation three units right. In part three, we write equations from a description and from a graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
