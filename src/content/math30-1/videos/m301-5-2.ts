import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, hline, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const g = plane({ x: [-PI / 2 - 0.3, 2 * PI + 0.3], y: [-1.5, 3.5], xStep: PI / 2, every: 0 });
const f = (x: number) => 2 * Math.sin(2 * (x - PI / 4)) + 1;

const video: Explainer = {
  id: 'm301-5-2',
  lessonId: 'm301-5-2',
  title: 'Transformations of Sinusoidal Functions, Part 1: The Four Parameters',
  thumbnailTitle: 'The Four Parameters',
  thumbnail: 'ex',
  summary: 'What a, b, c and d do in y = a sin b(x − c) + d: the amplitude |a|, the period 2π/|b|, the phase shift c and the vertical displacement d, shown on the graph of y = 2 sin 2(x − π/4) + 1, and read from the equation y = −3 cos(x + π/3) − 1, including the sign of the phase shift.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.2 · Part 1', title: 'The Four Parameters', subtitle: '$y = a\\sin b(x - c) + d$' }],
      lines: [
        { say: 'Real waves are rarely as simple as y equals sine x. A tide is taller, a Ferris wheel is raised off the ground, and a daylight cycle starts in March, not January.', show: 'title' },
        { say: 'In this video, you will meet the four parameters that stretch and slide the basic curve to fit any of them, and read them from an equation.' },
      ],
    },
    {
      chapter: 'The general form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = a\\sin b(x - c) + d \\qquad y = a\\cos b(x - c) + d'] },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '$|a|$ is the **amplitude**, a vertical stretch; $a < 0$ also reflects the graph in the $x$-axis.',
            '$\\frac{2\\pi}{|b|}$ is the **period**, from a horizontal stretch by a factor of $\\frac{1}{|b|}$.',
            '$c$ is the **phase shift**, a horizontal translation: right when $c > 0$, left when $c < 0$.',
            '$d$ is the **vertical displacement**. The **midline** is $y = d$.',
          ],
        },
      ],
      lines: [
        { say: 'A sinusoidal function can be written as y equals "a" sine b, x minus c, plus d, or the same with cosine.', show: 'm' },
        { say: 'You know two of these already. The absolute value of "a" is the amplitude, a vertical stretch, and a negative "a" also reflects the graph in the x-axis.', show: 'b.0' },
        { say: 'And b sets the period: two pi over the absolute value of b.', show: 'b.1' },
        { say: 'The new one, c, is the phase shift: a horizontal translation. The graph moves right when c is positive, and left when c is negative.', show: 'b.2' },
        { say: 'And d is the vertical displacement: it moves the graph up or down. The midline, the line halfway between the maximum and minimum, is y equals d.', show: 'b.3' },
      ],
    },
    {
      chapter: 'All four on one graph',
      layout: 'split',
      leftWidth: 660,
      left: [
        figure('ex', [
          g,
          edgeNumbers(g, { xs: steps(-PI / 2, 2 * PI, PI / 2), ys: [-1, 0, 1, 2, 3] }),
          plot(g, { id: 'base', f: Math.sin, tone: 'muted', samples: 240 }),
          hline(g, { id: 'mid', y: 1, tone: 'adj' }),
          plot(g, { id: 'curve', f, samples: 300 }),
          dots(g, [
            { id: 'S', x: PI / 4, y: 1, tone: 'theta' },
            { id: 'M', x: PI / 2, y: 3, tone: 'theta', group: 'ext' },
            { id: 'N', x: PI, y: -1, tone: 'theta', group: 'ext' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['y = 2\\sin 2\\left(x - \\tfrac{\\pi}{4}\\right) + 1', 'a = 2:\\ \\text{amplitude } 2', 'b = 2:\\ \\text{period } \\tfrac{2\\pi}{2} = \\pi', 'c = \\tfrac{\\pi}{4}:\\ \\tfrac{\\pi}{4} \\text{ to the right}', 'd = 1:\\ \\text{midline } y = 1'],
        },
      ],
      lines: [
        { say: 'Here is y equals two sine two, x minus pi over four, plus one, in purple, with y equals sine x in grey.', show: ['ex.grid', 'ex.axes', 'ex.base', 'ex.curve', 'm.0'], focus: 'm.0' },
        { say: '"a" is two, so the amplitude is two: the curve rises two above its midline and falls two below it.', show: 'm.1', focus: 'm.1' },
        { say: 'b is two, so the period is two pi over two, which is pi. The purple curve repeats every pi.', show: 'm.2', focus: 'm.2' },
        { say: 'c is pi over four, so the graph is shifted pi over four to the right. Its cycle starts at pi over four, instead of at zero.', show: ['m.3', 'ex.S'], focus: ['m.3', 'ex.S'] },
        { say: 'And d is one, so the graph moves up one. The midline is y equals one. The maximum is one plus two, which is three, and the minimum is one minus two, which is negative one.', show: ['m.4', 'ex.mid', 'ex.ext'], focus: ['m.4', 'ex.mid', 'ex.ext'] },
      ],
    },
    {
      chapter: 'Reading the parameters',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'y = -3\\cos\\left(x + \\dfrac{\\pi}{3}\\right) - 1',
            'a = -3:\\ \\text{amplitude } 3,\\ \\text{reflected} \\qquad b = 1:\\ \\text{period } 2\\pi',
            'x + \\tfrac{\\pi}{3} = x - \\left(-\\tfrac{\\pi}{3}\\right):\\quad c = -\\tfrac{\\pi}{3},\\ \\text{so } \\tfrac{\\pi}{3} \\text{ to the left}',
            'd = -1:\\quad \\max = -1 + 3 = 2,\\quad \\min = -1 - 3 = -4',
            '\\text{Range: } \\{y \\mid -4 \\le y \\le 2,\\ y \\in \\mathbb{R}\\}',
          ],
        },
      ],
      lines: [
        { say: 'For y equals negative three cosine, x plus pi over three, minus one, state the amplitude, period, phase shift, vertical displacement and range.', show: 'm.0', focus: 'm.0' },
        { say: '"a" is negative three, so the amplitude is three, and the graph is reflected in the x-axis. There is no number in front of the bracket, so b is one, and the period is two pi.', show: 'm.1', focus: 'm.1' },
        { say: 'The form has x minus c. Here we have x plus pi over three, which is x minus negative pi over three. So c is negative pi over three: a phase shift of pi over three to the left.', show: 'm.2', focus: 'm.2' },
        { say: 'd is negative one, so the graph moves down one. The maximum is negative one plus three, which is two, and the minimum is negative one minus three, which is negative four.', show: 'm.3', focus: 'm.3' },
        { say: 'So the range is all real y from negative four to two.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'The sign of the shift',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = \\sin\\left(x - \\tfrac{\\pi}{6}\\right):\\quad \\tfrac{\\pi}{6} \\text{ to the right}', 'y = \\sin\\left(x + \\tfrac{\\pi}{6}\\right):\\quad \\tfrac{\\pi}{6} \\text{ to the left}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign of the horizontal shift', md: 'The form is $x - c$, so a minus sign in the bracket moves the graph **right**, and a plus sign moves it **left**. To check, find where the bracket is zero: that is where the cycle now starts.' },
      ],
      lines: [
        { say: 'The most common mistake is the sign of the horizontal shift. In y equals sine, x minus pi over six, the graph moves pi over six to the right, even though there is a minus sign.', show: 'm.0', focus: 'm.0' },
        { say: 'And in y equals sine, x plus pi over six, it moves pi over six to the left.', show: 'm.1', focus: 'm.1' },
        { say: 'To check, find where the bracket is zero. x minus pi over six is zero when x is pi over six, so that is where the cycle now starts: to the right of zero.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the phase shift and range of $y = 5\\cos\\left(x + \\frac{\\pi}{4}\\right) - 2$.',
          choices: ['$\\frac{\\pi}{4}$ right; $-7 \\le y \\le 3$', '$\\frac{\\pi}{4}$ left; $-5 \\le y \\le 5$', '$\\frac{\\pi}{4}$ left; $-7 \\le y \\le 3$', '$\\frac{\\pi}{4}$ left; $-3 \\le y \\le 7$'],
          answer: 2,
          working: '$x + \\frac{\\pi}{4} = x - \\left(-\\frac{\\pi}{4}\\right)$, so the graph moves $\\frac{\\pi}{4}$ left. The midline is $y = -2$ and the amplitude is $5$: from $-2 - 5 = -7$ to $-2 + 5 = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. State the phase shift and range of y equals five cosine, x plus pi over four, minus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. x plus pi over four is x minus negative pi over four, so the graph moves pi over four to the left. The midline is y equals negative two, so the range runs from negative two minus five, which is negative seven, to negative two plus five, which is three. A gets the direction of the shift backwards.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'In $y = a\\sin b(x - c) + d$: amplitude $|a|$, period $\\frac{2\\pi}{|b|}$, phase shift $c$, midline $y = d$.',
            'The range is $d - |a| \\le y \\le d + |a|$.',
            '$\\left(x - \\frac{\\pi}{6}\\right)$ moves the graph right; $\\left(x + \\frac{\\pi}{6}\\right)$ moves it left.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In y equals "a" sine b, x minus c, plus d, the amplitude is the absolute value of "a", the period is two pi over the absolute value of b, c is the phase shift, and the midline is y equals d.', show: 'sum.0' },
        { say: 'The range runs from d minus the amplitude to d plus the amplitude.', show: 'sum.1' },
        { say: 'And watch the sign: x minus a number moves the graph right, and x plus a number moves it left. In part two, we find the phase shift when b is not one, by factoring b out of the brackets first. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
