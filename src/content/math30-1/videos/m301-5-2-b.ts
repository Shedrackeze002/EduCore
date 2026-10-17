import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, hline, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const g = plane({ x: [-0.3, (4 * PI) / 3 + 0.3], y: [-0.5, 7.4], xStep: PI / 6, every: 0, width: 6.4, height: 5.6 });

const video: Explainer = {
  id: 'm301-5-2-b',
  lessonId: 'm301-5-2',
  title: 'Transformations of Sinusoidal Functions, Part 2: Factor b First',
  thumbnailTitle: 'Factor b First',
  thumbnail: 'hs',
  summary: 'Why b must be factored out of the brackets before the phase shift can be read: y = 2 sin(3x − π) + 4 is y = 2 sin 3(x − π/3) + 4, with period 2π/3, a shift of π/3 to the right and range 2 ≤ y ≤ 6; and in degrees, y = cos(2x + 60°) has period 180° and a shift of 30° to the left.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.2 · Part 2', title: 'Factor b First', subtitle: 'Finding a hidden phase shift' }],
      lines: [
        { say: 'In y equals two sine, three x minus pi, plus four, it looks as if the graph moves pi to the right. It does not.', show: 'title' },
        { say: 'In this video, you will factor b out of the brackets to find the true phase shift, in radians and in degrees.' },
      ],
    },
    {
      chapter: 'A hidden phase shift',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('hs', [
          g,
          edgeNumbers(g, { xs: steps(0, (4 * PI) / 3, PI / 3), ys: [0, 2, 4, 6] }),
          hline(g, { id: 'mid', y: 4, tone: 'adj' }),
          plot(g, { id: 'curve', f: (x) => 2 * Math.sin(3 * x - PI) + 4, from: 0, samples: 300 }),
          polyline(g, { id: 'per', points: [[PI / 3, 6.6], [PI, 6.6]], tone: 'theta', labels: ['\\tfrac{2\\pi}{3}'] }),
          dots(g, [
            { id: 'S', x: PI / 3, y: 4, tone: 'theta' },
            { id: 'E', x: PI, y: 4, tone: 'theta', group: 'per' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['y = 2\\sin(3x - \\pi) + 4', '3x - \\pi = 3\\left(x - \\tfrac{\\pi}{3}\\right)', 'y = 2\\sin 3\\left(x - \\tfrac{\\pi}{3}\\right) + 4', '\\text{period } \\tfrac{2\\pi}{3},\\ \\ \\tfrac{\\pi}{3} \\text{ to the right}', '\\{y \\mid 2 \\le y \\le 6,\\ y \\in \\mathbb{R}\\}'],
        },
      ],
      lines: [
        { say: 'For y equals two sine, three x minus pi, plus four, determine the period, the phase shift and the range.', show: 'm.0', focus: 'm.0' },
        { say: 'The phase shift is read from b times, x minus c. But inside these brackets, three x minus pi does not have that form. So factor out the three: three x minus pi equals three times, x minus pi over three.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the equation is y equals two sine three, x minus pi over three, plus four.', show: 'm.2', focus: 'm.2' },
        { say: 'b is three, so the period is two pi over three. And c is pi over three, so the phase shift is pi over three to the right, not pi.', show: ['m.3', 'hs.grid', 'hs.axes', 'hs.curve', 'hs.S'], focus: ['m.3', 'hs.S'] },
        { say: 'On the graph, the cycle starts on the midline, going up, at pi over three. It ends one period later, at pi.', show: 'hs.per', focus: 'hs.per' },
        { say: 'The midline is y equals four, and the amplitude is two, so the graph runs from four minus two, which is two, to four plus two, which is six. That is the range.', show: ['m.4', 'hs.mid'], focus: ['m.4', 'hs.mid'] },
      ],
    },
    {
      chapter: 'In degrees',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['y = \\cos(2x + 60^\\circ)', '2x + 60^\\circ = 2(x + 30^\\circ)', '\\text{period} = \\dfrac{360^\\circ}{2} = 180^\\circ', 'x + 30^\\circ = x - (-30^\\circ):\\quad 30^\\circ \\text{ to the left}'],
        },
      ],
      lines: [
        { say: 'The same idea works in degrees. State the period and phase shift of y equals cosine, two x plus sixty degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor out the two: two x plus sixty degrees equals two times, x plus thirty degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'b is two, so the period is 360 degrees over two, which is 180 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'And x plus thirty degrees is x minus negative thirty degrees. So the phase shift is thirty degrees to the left, not sixty.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Reading the shift before factoring',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = 2\\sin(3x - \\pi) + 4:\\quad \\text{shift } \\tfrac{\\pi}{3},\\ \\text{not } \\pi', '3x - \\pi = 0 \\ \\text{ when } \\ x = \\tfrac{\\pi}{3}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reading the shift before factoring', md: 'Factor $b$ out of the brackets before reading the phase shift. Or set the bracket equal to zero and solve: the cycle starts where the angle is zero.' },
      ],
      lines: [
        { say: 'The common mistake is reading the shift before factoring. In y equals two sine, three x minus pi, plus four, the graph does not move pi to the right. The shift is pi over three.', show: 'm.0', focus: 'm.0' },
        { say: 'There is a quick check. The cycle starts where the whole angle in the bracket is zero, and three x minus pi equals zero when x is pi over three.', show: 'm.1', focus: 'm.1' },
        { say: 'So either factor b out first, or set the bracket equal to zero and solve for x. Both give the phase shift.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the phase shift of $y = \\sin\\left(2x - \\frac{\\pi}{2}\\right)$?',
          choices: ['$\\frac{\\pi}{2}$ to the right', '$\\frac{\\pi}{4}$ to the left', '$\\frac{\\pi}{2}$ to the left', '$\\frac{\\pi}{4}$ to the right'],
          answer: 3,
          working: 'Factor out $2$: $2x - \\frac{\\pi}{2} = 2\\left(x - \\frac{\\pi}{4}\\right)$, so $c = \\frac{\\pi}{4}$: a shift of $\\frac{\\pi}{4}$ to the right.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the phase shift of y equals sine, two x minus pi over two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Factor out the two: two x minus pi over two equals two times, x minus pi over four. So the graph moves pi over four to the right. A reads the shift before factoring.', show: 'q.answer' },
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
          items: ['Factor $b$ out of the brackets before reading the phase shift: $3x - \\pi = 3\\left(x - \\frac{\\pi}{3}\\right)$.', 'Check: the cycle starts where the bracket equals zero.', 'In degrees, the period is $\\frac{360^\\circ}{|b|}$, and the shift is read the same way.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Factor b out of the brackets before you read the phase shift.', show: 'sum.0' },
        { say: 'To check, the cycle starts where the bracket equals zero.', show: 'sum.1' },
        { say: 'In degrees, the period is 360 degrees over the absolute value of b, and the shift is read the same way. In part three, we work the other way round: from a graph to its equation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
