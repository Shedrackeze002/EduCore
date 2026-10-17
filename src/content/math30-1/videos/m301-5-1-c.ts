import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { arrow, edgeNumbers, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const g = plane({ x: [-0.3, 2 * PI + 0.3], y: [-3.5, 3.5], xStep: PI / 2, every: 0 });
const gNums = edgeNumbers(g, { xs: steps(0, 2 * PI, PI / 2), ys: [-3, -2, -1, 0, 1, 2, 3] });
const k = plane({ x: [-0.3, 2 * PI + 0.3], y: [-3, 3], xStep: PI / 2, every: 0 });
const kNums = edgeNumbers(k, { xs: steps(0, 2 * PI, PI / 2), ys: [-2, -1, 0, 1, 2] });

const video: Explainer = {
  id: 'm301-5-1-c',
  lessonId: 'm301-5-1',
  title: 'Graphing Sine and Cosine Functions, Part 3: Amplitude, the Effect of a',
  thumbnailTitle: 'Amplitude: the Effect of a',
  thumbnail: 'st',
  summary: 'In y = a sin x and y = a cos x, every y-value is multiplied by a: the graph is stretched vertically by a factor of |a|, so the amplitude is |a|, and a negative a also reflects it in the x-axis. Worked examples: y = 3 sin x, and the amplitude and range of y = −2.5 cos x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.1 · Part 3', title: 'Amplitude: the Effect of a', subtitle: '$y = a\\sin x$ and $y = a\\cos x$' }],
      lines: [
        { say: 'A loud sound makes a taller wave than a quiet one, with the same rhythm. In maths, that is a vertical stretch.', show: 'title' },
        { say: 'In this video, you will see what the number "a" does in y equals "a" sine x and y equals "a" cosine x, and find the amplitude and range, even when "a" is negative.' },
      ],
    },
    {
      chapter: 'A vertical stretch',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('st', [
          g,
          gNums,
          plot(g, { id: 'base', f: Math.sin, tone: 'muted', samples: 240 }),
          plot(g, { id: 'curve', f: (x) => 3 * Math.sin(x), samples: 240 }),
          arrow(g, { id: 'up', from: [PI / 2, 1.15], to: [PI / 2, 2.8], group: 'top' }),
          arrow(g, { id: 'down', from: [(3 * PI) / 2, -1.15], to: [(3 * PI) / 2, -2.8], group: 'bottom' }),
          dots(g, [
            { id: 'P1', x: PI / 2, y: 1, tone: 'muted', group: 'top' },
            { id: 'Q1', x: PI / 2, y: 3, tone: 'theta', group: 'top' },
            { id: 'P2', x: (3 * PI) / 2, y: -1, tone: 'muted', group: 'bottom' },
            { id: 'Q2', x: (3 * PI) / 2, y: -3, tone: 'theta', group: 'bottom' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 3\\sin x', 'x = \\tfrac{\\pi}{2}:\\quad 3(1) = 3', 'x = \\tfrac{3\\pi}{2}:\\quad 3(-1) = -3', '\\text{amplitude} = |a| = 3'] }],
      lines: [
        { say: 'Start with y equals sine x, in grey. Now multiply every y-value by three, to get y equals three sine x.', show: ['st.grid', 'st.axes', 'st.base', 'm.0'], focus: 'm.0' },
        { say: 'At pi over two, sine x is one, so three sine x is three. The highest point moves up from one to three.', show: ['st.top', 'm.1'], focus: ['st.top', 'm.1'] },
        { say: 'At three pi over two, sine x is negative one, so three sine x is negative three. The lowest point moves down to negative three.', show: ['st.bottom', 'm.2'], focus: ['st.bottom', 'm.2'] },
        { say: 'But wherever sine x is zero, three times zero is still zero. So the zeros stay where they are, and so does the period. Only the height changes.', show: 'st.curve', focus: 'st.curve' },
        { say: 'The graph is stretched vertically by a factor of three. In y equals "a" sine x, or y equals "a" cosine x, the stretch factor is the absolute value of "a", and so is the amplitude.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A negative value of a',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('rf', [
          k,
          kNums,
          plot(k, { id: 'base', f: Math.cos, tone: 'muted', samples: 240 }),
          plot(k, { id: 'curve', f: (x) => -2.5 * Math.cos(x), samples: 240 }),
          dots(k, [
            { id: 'A', x: 0, y: 1, tone: 'muted', group: 'start' },
            { id: 'B', x: 0, y: -2.5, tone: 'theta', group: 'start' },
            { id: 'C', x: PI, y: 2.5, tone: 'theta' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -2.5\\cos x', '\\text{amplitude} = \\lvert -2.5 \\rvert = 2.5', '\\text{Range:}', '\\{y \\mid -2.5 \\le y \\le 2.5,\\ y \\in \\mathbb{R}\\}'] }],
      lines: [
        { say: 'State the amplitude and range of y equals negative 2.5 cosine x.', show: ['m.0', 'rf.grid', 'rf.axes', 'rf.base'], focus: 'm.0' },
        { say: 'Here, "a" is negative 2.5. Multiplying by a negative number turns every y-value upside down, so the graph is also reflected in the x-axis.', show: 'rf.curve', focus: 'rf.curve' },
        { say: 'Where cosine x has its maximum, one, at x equals zero, this graph has its minimum, negative 2.5. And at pi, where cosine x is lowest, this graph is highest, at 2.5.', show: ['rf.start', 'rf.C'], focus: ['rf.start', 'rf.C'] },
        { say: 'The amplitude is the absolute value of negative 2.5, which is 2.5.', show: 'm.1', focus: 'm.1' },
        { say: 'The graph goes from negative 2.5 up to 2.5, so the range is all real y from negative 2.5 to 2.5.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'A negative amplitude',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = -2.5\\cos x:\\quad \\text{amplitude } 2.5,\\ \\text{not } {-2.5}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A negative amplitude', md: 'The amplitude is a distance, so it is never negative. For $y = -2.5\\cos x$ the amplitude is $2.5$, not $-2.5$. The negative sign reflects the graph in the $x$-axis.' },
      ],
      lines: [
        { say: 'A common mistake is to give a negative amplitude.', show: 'm' },
        { say: 'The amplitude is a distance: half the distance between the maximum and the minimum. A distance is never negative. So for y equals negative 2.5 cosine x, the amplitude is 2.5, not negative 2.5.', show: 'oops' },
        { say: 'The negative sign does something else: it reflects the graph in the x-axis.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the amplitude and range of $y = -4\\sin x$.',
          choices: ['Amplitude $-4$; range $-4 \\le y \\le 4$', 'Amplitude $4$; range $0 \\le y \\le 4$', 'Amplitude $8$; range $-4 \\le y \\le 4$', 'Amplitude $4$; range $-4 \\le y \\le 4$'],
          answer: 3,
          working: '$a = -4$, so the amplitude is $\\lvert -4 \\rvert = 4$, and the graph is reflected in the $x$-axis. It goes from $-4$ to $4$: the range is $\\{y \\mid -4 \\le y \\le 4,\\ y \\in \\mathbb{R}\\}$.',
        },
      ],
      lines: [
        { say: 'Your turn. State the amplitude and range of y equals negative four sine x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. "a" is negative four, so the amplitude is its absolute value, four, and the graph goes from negative four to four. A gives a negative amplitude, but an amplitude is a distance, so it is never negative.', show: 'q.answer' },
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
            'In $y = a\\sin x$ and $y = a\\cos x$, every $y$-value is multiplied by $a$: a vertical stretch by a factor of $|a|$.',
            'The amplitude is $|a|$; the zeros and the period do not change.',
            '$a < 0$ also reflects the graph in the $x$-axis. The amplitude is never negative.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In y equals "a" sine x and y equals "a" cosine x, every y-value is multiplied by "a": a vertical stretch by a factor of the absolute value of "a".', show: 'sum.0' },
        { say: 'So the amplitude is the absolute value of "a", and the zeros and the period do not change.', show: 'sum.1' },
        { say: 'A negative "a" also reflects the graph in the x-axis, but the amplitude is never negative. In part four, we squeeze and stretch the graphs sideways, and find the period. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
