import type { Explainer } from '@/video/script.ts';
import { plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const g = plane({ x: [-0.3, 2 * PI + 0.3], y: [-1.5, 1.5], xStep: PI / 4, every: 0, width: 10, height: 3.2 });

const video: Explainer = {
  id: 'm301-5-1-d',
  lessonId: 'm301-5-1',
  title: 'Graphing Sine and Cosine Functions, Part 4: Period, the Effect of b',
  thumbnailTitle: 'Period: the Effect of b',
  thumbnail: 'sq',
  summary: 'Why y = sin bx completes one cycle while x goes from 0 to 2π/b, the period 2π/|b| (or 360°/|b|), the amplitude and period of y = 4 cos (1/3)x, finding b from a period of 2π/3, and why a larger b gives a shorter period.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.1 · Part 4', title: 'Period: the Effect of b', subtitle: '$y = \\sin bx$ and $y = \\cos bx$' }],
      lines: [
        { say: 'A high note and a low note can be equally loud. What changes is how quickly the wave repeats: its period.', show: 'title' },
        { say: 'In this video, you will see what the number b does in y equals sine b x, find the period of a sinusoidal function, and work backwards from a period to b.' },
      ],
    },
    {
      chapter: 'One cycle of bx',
      layout: 'split',
      leftWidth: 520,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['$x$', '$2x$', '$\\sin 2x$'],
          rows: [
            ['$0$', '$0$', '$0$'],
            ['$\\frac{\\pi}{4}$', '$\\frac{\\pi}{2}$', '$1$'],
            ['$\\frac{\\pi}{2}$', '$\\pi$', '$0$'],
            ['$\\frac{3\\pi}{4}$', '$\\frac{3\\pi}{2}$', '$-1$'],
            ['$\\pi$', '$2\\pi$', '$0$'],
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\sin 2x', '2x \\text{ goes from } 0 \\text{ to } 2\\pi', '\\text{while } x \\text{ goes from } 0 \\text{ to } \\pi.', '\\text{period} = \\pi'] }],
      lines: [
        { say: 'Look at y equals sine two x. Here, the angle is two x, not x.', show: 'm.0', focus: 'm.0' },
        { say: 'One full cycle of sine happens while the angle goes from zero to two pi. So follow the angle, two x, as x grows.' },
        { say: 'When x is zero, two x is zero, and sine is zero. When x is pi over four, two x is pi over two, and sine is already at its maximum, one.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'At pi over two, two x is pi, and sine is zero. At three pi over four, two x is three pi over two, and sine is negative one.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'And at x equals pi, two x is two pi: one full cycle is done. The angle went from zero to two pi while x only went from zero to pi.', show: ['t.4', 'm.1', 'm.2'], focus: ['t.4', 'm.1', 'm.2'] },
        { say: 'So y equals sine two x completes a whole cycle by x equals pi. Its period is pi: half of two pi.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Squeezed sideways',
      layout: 'center',
      main: [
        figure(
          'sq',
          [
            g,
            edgeNumbers(g, { xs: steps(0, 2 * PI, PI / 2), ys: [-1, 0, 1] }),
            plot(g, { id: 'base', f: Math.sin, tone: 'muted', samples: 240 }),
            plot(g, { id: 'curve', f: (x) => Math.sin(2 * x), samples: 300 }),
            polyline(g, { id: 'per', points: [[0, 1.3], [PI, 1.3]], tone: 'theta', labels: ['\\text{period } \\pi'] }),
          ],
          420,
        ),
      ],
      lines: [
        { say: 'Here is y equals sine two x in purple, with y equals sine x in grey.', show: ['sq.grid', 'sq.axes', 'sq.base', 'sq.curve'] },
        { say: 'The purple graph completes two cycles while the grey one completes one. Its period is pi.', show: 'sq.per', focus: ['sq.curve', 'sq.per'] },
        { say: 'Nothing changes vertically: the amplitude is still one. The graph is squeezed horizontally, by a factor of one half.' },
        { say: 'In general, the graph of y equals sine b x is stretched horizontally by a factor of one over the absolute value of b.' },
      ],
    },
    {
      chapter: 'The period formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Period of y = a sin bx and y = a cos bx', md: '$\\text{period} = \\dfrac{2\\pi}{|b|}$ radians, or $\\dfrac{360^\\circ}{|b|}$' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 4\\cos\\tfrac{1}{3}x', '\\text{amplitude} = |a| = 4', '\\text{period} = \\dfrac{2\\pi}{1/3} = 6\\pi', '\\text{or } \\dfrac{360^\\circ}{1/3} = 1080^\\circ'] },
      ],
      lines: [
        { say: 'For y equals "a" sine b x, and y equals "a" cosine b x, the period is two pi over the absolute value of b, in radians, or 360 degrees over the absolute value of b, in degrees.', show: 'def' },
        { say: 'Determine the amplitude and the period of y equals four cosine one third x.', show: 'm.0', focus: 'm.0' },
        { say: 'The amplitude is the absolute value of "a": four.', show: 'm.1', focus: 'm.1' },
        { say: 'The period is two pi divided by one third. Dividing by one third is the same as multiplying by three, so the period is six pi.', show: 'm.2', focus: 'm.2' },
        { say: 'In degrees, that is 360 degrees divided by one third: 1,080 degrees. A value of b between zero and one stretches the graph, so the period is longer than two pi.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'From the period to b',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\sin bx,\\ b > 0,\\ \\text{period } \\tfrac{2\\pi}{3}', '\\text{period} = \\dfrac{2\\pi}{b} \\quad\\Rightarrow\\quad b = \\dfrac{2\\pi}{\\text{period}}', 'b = \\dfrac{2\\pi}{2\\pi/3} = 2\\pi \\times \\dfrac{3}{2\\pi} = 3'] },
      ],
      lines: [
        { say: 'You can also work backwards. The graph of y equals sine b x, with b greater than zero, has a period of two pi over three. Determine b.', show: 'm.0', focus: 'm.0' },
        { say: 'Rearrange the formula. If the period is two pi over b, then b is two pi over the period.', show: 'm.1', focus: 'm.1' },
        { say: 'So b is two pi divided by two pi over three. Dividing by a fraction means multiplying by its reciprocal: two pi times three over two pi, which is three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Multiplying instead of dividing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = \\sin 3x:\\quad \\text{period} = \\dfrac{2\\pi}{3},\\ \\text{not } 6\\pi'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying instead of dividing', md: 'A larger $b$ squeezes the graph: $y = \\sin 3x$ has a **shorter** period, $\\frac{2\\pi}{3}$, not $6\\pi$. Divide $2\\pi$ by $b$.' },
      ],
      lines: [
        { say: 'A common mistake is to multiply by b instead of dividing. For y equals sine three x, the period is not two pi times three, which is six pi.', show: 'm' },
        { say: 'A larger b squeezes the graph, so the period gets shorter. The period is two pi over three.', show: 'oops' },
        { say: 'A quick check: when b is bigger than one, the period must be shorter than two pi.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Determine the period of $y = 5\\sin 4x$.',
          choices: ['$\\dfrac{\\pi}{2}$', '$8\\pi$', '$\\dfrac{2\\pi}{5}$', '$4$'],
          answer: 0,
          working: '$b = 4$, so the period is $\\frac{2\\pi}{4} = \\frac{\\pi}{2}$. The $5$ is the amplitude; it does not change the period.',
        },
      ],
      lines: [
        { say: 'Your turn. Determine the period of y equals five sine four x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. b is four, so the period is two pi over four, which is pi over two. B multiplies two pi by four instead of dividing. And the five is the amplitude, so it does not change the period.', show: 'q.answer' },
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
            'The period of $y = a\\sin bx$ or $y = a\\cos bx$ is $\\frac{2\\pi}{|b|}$, or $\\frac{360^\\circ}{|b|}$.',
            'A larger $|b|$ squeezes the graph: the period is shorter.',
            'Work backwards with $b = \\frac{2\\pi}{\\text{period}}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The period of y equals "a" sine b x, or "a" cosine b x, is two pi over the absolute value of b, or 360 degrees over the absolute value of b.', show: 'sum.0' },
        { say: 'A larger b squeezes the graph, so the period is shorter.', show: 'sum.1' },
        { say: 'And to work backwards, b is two pi over the period. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
