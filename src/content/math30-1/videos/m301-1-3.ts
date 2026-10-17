import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-3, 3], y: [0, 9], every: 0 });

const video: Explainer = {
  id: 'm301-1-3',
  lessonId: 'm301-1-3',
  title: 'Combining Transformations, Part 1: The General Form',
  thumbnailTitle: 'Combining Transformations',
  thumbnail: 'st',
  summary: 'The general transformation y − k = af(b(x − h)), what each of a, b, h and k does, the mapping (x, y) → (x/b + h, ay + k), why stretches and reflections come before translations, and the image of (6, −2) on y = 3f(−½(x − 1)) + 4. Parts 2 and 3 describe and write transformed functions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.3 · Part 1', title: 'Combining Transformations', subtitle: 'y − k = af(b(x − h))' }],
      lines: [
        { say: 'Engineers who design a cable, an arch or a signal rarely use just one transformation. They stretch, flip and shift a basic shape all at once.', show: 'title' },
        { say: 'In this video, you will meet one equation that keeps track of everything, see why the order of the steps matters, and use it to find image points.' },
      ],
    },
    {
      chapter: 'One equation for everything',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y - k = af(b(x - h))', 'y = af(b(x - h)) + k'] },
        { kind: 'bullets', id: 'b', items: ['$a$: vertical stretch by a factor of $|a|$ about the $x$-axis; if $a < 0$, also a reflection in the $x$-axis.', '$b$: horizontal stretch by a factor of $\\frac{1}{|b|}$ about the $y$-axis; if $b < 0$, also a reflection in the $y$-axis.', '$h$ and $k$: a translation of $h$ units horizontally and $k$ units vertically.'] },
      ],
      lines: [
        { say: 'Everything from the last two lessons fits into one equation: y minus k equals "a" times f of b, times x minus h. It is also written y equals "a" times f of b, times x minus h, plus k.', show: ['m.0', 'm.1'] },
        { say: '"a" gives a vertical stretch by a factor of the absolute value of "a", about the x-axis. If "a" is negative, it also reflects the graph in the x-axis.', show: 'b.0', focus: 'b.0' },
        { say: 'b gives a horizontal stretch by a factor of one over the absolute value of b, about the y-axis. If b is negative, it also reflects the graph in the y-axis.', show: 'b.1', focus: 'b.1' },
        { say: 'And h and k translate the graph: h units horizontally, and k units vertically, just as in lesson one.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'The mapping',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(x, y) \\to \\left(\\dfrac{x}{b} + h,\\ ay + k\\right)'] },
        { kind: 'bullets', id: 'b', items: ['For $x$: divide by $b$, then add $h$.', 'For $y$: multiply by $a$, then add $k$.'] },
      ],
      lines: [
        { say: 'The mapping combines all of these. The point x, y maps to x over b, plus h, and "a" y, plus k.', show: 'm.0' },
        { say: 'For the x-coordinate: divide by b, then add h.', show: 'b.0', focus: 'b.0' },
        { say: 'For the y-coordinate: multiply by "a", then add k.', show: 'b.1', focus: 'b.1' },
        { say: 'Notice the order in each one. The multiplying or dividing comes first, and the adding comes last.' },
      ],
    },
    {
      chapter: 'Stretch first, then translate',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('st', [
          g,
          plot(g, { id: 'base', f: (x) => x * x, tone: 'muted' }),
          plot(g, { id: 'stretch', f: (x) => 2 * x * x, tone: 'adj', dashed: true }),
          plot(g, { id: 'image', f: (x) => 2 * x * x + 3, tone: 'brand' }),
          dots(g, [
            { id: 'P', x: 1, y: 1, tone: 'muted' },
            { id: 'Q', x: 1, y: 2, tone: 'adj' },
            { id: 'R', x: 1, y: 5, tone: 'opp' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 2f(x) + 3,\\quad f(x) = x^2', '\\text{stretch: } (1, 1) \\to (1, 2)', '\\text{translate: } (1, 2) \\to (1, 5)', '2(5) + 3 = 13\\ \\checkmark', '2(5 + 3) = 16\\ \\times'] }],
      lines: [
        { say: 'Order matters. Stretches and reflections come first, then translations. Let’s see why with y equals two f of x, plus three, where f of x is x squared.', show: ['st.grid', 'st.axes', 'st.base', 'm.0'], focus: 'm.0' },
        { say: 'The equation first multiplies each output by two. The point at one, one, on the grey graph, goes to one, two, on the dashed blue graph.', show: ['st.P', 'st.stretch', 'st.Q', 'm.1'], focus: ['st.Q', 'm.1'] },
        { say: 'Then it adds three, so one, two, goes up to one, five, on the final graph.', show: ['st.image', 'st.R', 'm.2'], focus: ['st.R', 'm.2'] },
        { say: 'Follow any output the same way. A y-coordinate of five becomes two times five, plus three: thirteen.', show: 'm.3', focus: 'm.3' },
        { say: 'Translating first would add three before doubling: two times eight, which is sixteen, a different point. Stretches and reflections are multiplications, so they happen before the additions, exactly as in the order of operations.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Applying the mapping',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(6, -2) \\text{ on } y = f(x)', 'y = 3f\\left(-\\tfrac{1}{2}(x - 1)\\right) + 4', 'a = 3,\\quad b = -\\tfrac{1}{2},\\quad h = 1,\\quad k = 4', 'x:\\ \\dfrac{6}{-\\frac{1}{2}} + 1 = -12 + 1 = -11', 'y:\\ 3(-2) + 4 = -2'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Image point', md: '$(6, -2) \\to (-11, -2)$' },
      ],
      lines: [
        { say: 'The point at six, negative two, is on the graph of y equals f of x. Find the corresponding point on y equals three f of negative one half, times x minus one, plus four.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Read the parameters. "a" is three, b is negative one half, h is one, and k is four.', show: 'm.2', focus: 'm.2' },
        { say: 'For x, divide six by negative one half. Dividing by negative one half is the same as multiplying by negative two, so that is negative twelve. Then add one: negative eleven.', show: 'm.3', focus: 'm.3' },
        { say: 'For y, multiply negative two by three, which is negative six, then add four: negative two.', show: 'm.4', focus: 'm.4' },
        { say: 'So the image point is negative eleven, negative two.', show: 'ans' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(4, 3)$ is on the graph of $y = f(x)$. What is the corresponding point on the graph of $y = 2f(4(x + 1)) - 5$?',
          choices: ['$(0, 1)$', '$(2, 1)$', '$(15, 1)$', '$(0, -4)$'],
          answer: 0,
          working: '$a = 2$, $b = 4$, $h = -1$, $k = -5$. $x$: $\\frac{4}{4} - 1 = 0$. $y$: $2(3) - 5 = 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at four, three, is on the graph of y equals f of x. What is the corresponding point on y equals two f of four, times x plus one, minus five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. "a" is two, b is four, h is negative one, and k is negative five. For x, four divided by four is one, minus one is zero. For y, two times three is six, minus five is one. C multiplies x by four instead of dividing.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y - k = af(b(x - h))$: stretches by $|a|$ and $\\frac{1}{|b|}$, translations by $h$ and $k$.', '$(x, y) \\to \\left(\\frac{x}{b} + h,\\ ay + k\\right)$.', 'Stretch and reflect first, then translate.'] }],
      lines: [
        { say: 'Let’s sum up. y minus k equals "a" f of b, times x minus h, stretches by the absolute value of "a" and by one over the absolute value of b, and translates by h and k.', show: 'sum.0' },
        { say: 'Its mapping sends x, y to x over b, plus h, and "a" y, plus k.', show: 'sum.1' },
        { say: 'And always stretch and reflect first, then translate. In part two, we describe the transformations in an equation, and factor before reading h. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
