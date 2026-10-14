import type { DiagramItem, Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

const A = [28, 30, 31, 29, 32];
const B = [22, 35, 30, 38, 25];

/** A route's name to the left of its number line. */
function name(id: string, tex: string, at: P): Part {
  const points: Record<string, P> = { [id]: at };
  const items: DiagramItem[] = [{ kind: 'label', id, at: id, tex, place: 'left' }];
  return { points, items };
}

const video: Explainer = {
  id: 'm202-5-1',
  lessonId: 'm202-5-1',
  title: 'Standard Deviation, Part 1: Measuring Spread',
  thumbnailTitle: 'Standard Deviation',
  thumbnail: 'rt',
  summary: 'Two bus routes with the same mean but different spread, dispersion and the range, the population standard deviation σ = √(Σ(x − μ)²/N), and finding it step by step for five travel times (σ ≈ 1.4 min).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.1 · Part 1', title: 'Standard Deviation', subtitle: 'How spread out is the data?' }],
      lines: [
        { say: 'Two bus routes from a Calgary suburb to downtown both take thirty minutes on average. But one is reliable, and the other is not. The mean alone cannot tell them apart.', show: 'title' },
        { say: 'In this video, you will measure how spread out data is, with the standard deviation.' },
      ],
    },
    {
      chapter: 'Same mean, different spread',
      layout: 'center',
      main: [
        figure('rt', [
          numberLine({ name: 'a', min: 20, max: 40, step: 1, every: 5, length: 14, at: [0, 2.2], points: A.map((v, i) => ({ id: `p${i}`, value: v, tex: '', tone: 'adj' as const })) }),
          numberLine({ name: 'b', min: 20, max: 40, step: 1, every: 5, length: 14, at: [0, 0], points: B.map((v, i) => ({ id: `p${i}`, value: v, tex: '', tone: 'opp' as const })) }),
          name('na', '\\text{Route A}', [-0.5, 2.2]),
          name('nb', '\\text{Route B}', [-0.5, 0]),
        ], 220),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dispersion', md: '**Dispersion**, or spread, describes how far the values are from each other and from the mean. The **range**, greatest minus least, uses only the two extreme values.' },
      ],
      lines: [
        { say: 'Here are five trips on each route, in minutes. Route A’s times are all close to thirty.', show: ['rt.a-axis', 'rt.na', 'rt.a-p0', 'rt.a-p1', 'rt.a-p2', 'rt.a-p3', 'rt.a-p4'] },
        { say: 'Route B’s times swing from twenty-two to thirty-eight. Both sets have a mean of thirty.', show: ['rt.b-axis', 'rt.nb', 'rt.b-p0', 'rt.b-p1', 'rt.b-p2', 'rt.b-p3', 'rt.b-p4'] },
        { say: 'The mean tells you where the centre is. Dispersion, or spread, describes how far the values are from each other and from the mean. The range is a quick measure, but it uses only the two most extreme values.', show: 'def' },
      ],
    },
    {
      chapter: 'Standard deviation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\sigma = \\sqrt{\\dfrac{\\Sigma(x - \\mu)^2}{N}}'] },
        { kind: 'bullets', id: 'b', items: ['Find the mean, $\\mu$.', 'Find each deviation, $x - \\mu$, and square it.', 'Add the squares, divide by $N$, and take the square root.'] },
      ],
      lines: [
        { say: 'The standard deviation measures how far the data values typically are from the mean. For a population of N values with mean mu, it is sigma, the square root of the sum of x minus mu, squared, over N.', show: 'm.0', focus: 'm.0' },
        { say: 'Mu and sigma are Greek letters, and the capital sigma means add them all up. To find the standard deviation, first find the mean.', show: 'b.0' },
        { say: 'Then subtract the mean from each value, to get its deviation, and square each deviation.', show: 'b.1' },
        { say: 'Finally, add the squares, divide by N, and take the square root.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Route A',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'table', id: 't', head: ['$x$', '$x - \\mu$', '$(x - \\mu)^2$'], rows: [['$28$', '$-2$', '$4$'], ['$30$', '$0$', '$0$'], ['$31$', '$1$', '$1$'], ['$29$', '$-1$', '$1$'], ['$32$', '$2$', '$4$']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\mu = \\dfrac{150}{5} = 30', '\\Sigma(x - \\mu)^2 = 10', '\\sigma = \\sqrt{\\dfrac{10}{5}} = \\sqrt{2} \\approx 1.41'] }],
      lines: [
        { say: 'Route A’s times were twenty-eight, thirty, thirty-one, twenty-nine and thirty-two minutes. They add to 150, so the mean is thirty.', show: ['t', 'm.0'], focus: 'm.0' },
        { say: 'The deviations from thirty are negative two, zero, one, negative one, and two. Squaring makes them all positive: four, zero, one, one, and four.' },
        { say: 'The squares add to ten.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by five, and take the square root: sigma is root two, about 1.41. So Route A’s trips are typically about 1.4 minutes from the mean.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the population standard deviation of $4,\\ 6,\\ 8,\\ 10,\\ 12$.',
          choices: ['$2.83$', '$8$', '$3.16$', '$40$'],
          answer: 0,
          working: '$\\mu = 8$. The squared deviations are $16, 4, 0, 4, 16$, which add to $40$. $\\sigma = \\sqrt{\\dfrac{40}{5}} = \\sqrt{8} \\approx 2.83$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the population standard deviation of four, six, eight, ten and twelve. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The mean is eight. The squared deviations are sixteen, four, zero, four and sixteen, which add to forty. Forty over five is eight, and root eight is about 2.83.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Dispersion describes how spread out the data is.', '$\\sigma = \\sqrt{\\dfrac{\\Sigma(x - \\mu)^2}{N}}$', 'Mean, deviations, squares, add, divide by $N$, square root.'] }],
      lines: [
        { say: 'Let’s sum up. Dispersion describes how spread out data is, and the range uses only the extremes.', show: 'sum.0' },
        { say: 'The population standard deviation is the square root of the mean of the squared deviations.', show: 'sum.1' },
        { say: 'To find it: the mean, the deviations, their squares, add, divide by N, and take the square root. In part two, we use a calculator and frequency tables. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
