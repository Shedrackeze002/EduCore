import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-3-3-b',
  lessonId: 'm10c-3-3',
  title: 'The Real Number System, Part 2: Radicals, Estimating and Ordering',
  thumbnailTitle: 'Estimating and Ordering Roots',
  thumbnail: 'order',
  summary: 'The radicand and index of a radical, which roots of negative numbers are real, estimating a square root between perfect-square benchmarks, and ordering irrational numbers on a number line.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.3 · Part 2', title: 'Estimating and Ordering Roots', subtitle: 'Using benchmarks' }],
      lines: [
        { say: 'How big is the square root of thirty? Even without a calculator, you can pin it down.', show: 'title' },
        { say: 'In this video, you will learn the parts of a radical, which roots are real numbers, and how to estimate and order irrational numbers.' },
      ],
    },
    {
      chapter: 'Radicals and their index',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'math', id: 'r', size: 'xl', lines: ['\\sqrt[\\opp{n}]{\\adj{x}}'] }],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Radical', md: 'In $\\sqrt[n]{x}$, $x$ is the **radicand** and $n$ is the **index**. With no index written, it is 2.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt[4]{81} = 3, \\text{ as } 3^4 = 81', '\\sqrt[5]{-32} = -2, \\text{ as } (-2)^5 = -32', '\\sqrt[4]{-16} \\text{ is not real}'] },
      ],
      lines: [
        { say: 'An expression like this is a radical. The number underneath, x, is the radicand, and the small number, n, is the index.', show: ['r.0', 'def'] },
        { say: 'The index tells you which root to take. When no index is written, it is two: a square root.' },
        { say: 'The fourth root of 81 asks: what number, used as a factor four times, makes 81? Three, because three to the fourth is 81.', show: 'm.0', focus: 'm.0' },
        { say: 'The fifth root of negative 32 is negative two, because negative two to the fifth is negative 32. An odd root of a negative number is negative.', show: 'm.1', focus: 'm.1' },
        { say: 'But the fourth root of negative sixteen is not a real number, because no real number to an even power is negative.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Estimating a square root',
      layout: 'center',
      main: [
        figure(
          'lines',
          [
            numberLine({ name: 'sq', min: 25, max: 36, step: 1, length: 14, at: [0, 2.6], points: [{ id: 'thirty', value: 30, tex: '30', tone: 'opp' }] }),
            numberLine({ name: 'rt', min: 5, max: 6, step: 0.1, every: 5, length: 14, points: [{ id: 'root', value: Math.sqrt(30), tex: '\\sqrt{30}', tone: 'opp' }] }),
          ],
          300,
        ),
        { kind: 'math', id: 'm', lines: ['5^2 = 25 < 30 < 36 = 6^2, \\text{ so } 5 < \\sqrt{30} < 6', '5.5^2 = 30.25, \\text{ so } \\sqrt{30} \\approx 5.5'] },
      ],
      lines: [
        { say: 'Estimate the square root of thirty, to one decimal place. Use benchmarks: the perfect squares on either side of thirty.', show: ['lines.sq-axis', 'lines.sq-thirty'] },
        { say: 'Five squared is 25, and six squared is 36. Thirty is between them, so the square root of thirty is between five and six.', show: ['m.0', 'lines.rt-axis'], focus: 'm.0' },
        { say: 'Thirty is five of the eleven steps from 25 to 36, a little under halfway. So try 5.5.', focus: 'lines.sq-thirty' },
        { say: '5.5 squared is 30.25, just a little too big. So the square root of thirty is about 5.5. A calculator gives 5.477.', show: ['m.1', 'lines.rt-root'], focus: ['m.1', 'lines.rt-root'] },
      ],
    },
    {
      chapter: 'Ordering numbers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Order from least to greatest: $\\sqrt{20}$, $4.3$, $\\sqrt[3]{70}$, $\\tfrac92$.', size: 'md' },
        figure(
          'line',
          [
            numberLine({
              min: 4,
              max: 5,
              step: 0.1,
              every: 2,
              length: 14,
              points: [
                { id: 'c70', value: Math.cbrt(70), tex: '\\sqrt[3]{70}', tone: 'adj' },
                { id: 'p43', value: 4.3, tex: '4.3', tone: 'good' },
                { id: 's20', value: Math.sqrt(20), tex: '\\sqrt{20}', tone: 'opp' },
                { id: 'p92', value: 4.5, tex: '\\tfrac92', tone: 'hyp', below: true },
              ],
            }),
          ],
          240,
        ),
        { kind: 'math', id: 'm', lines: ['\\sqrt[3]{70},\\ 4.3,\\ \\sqrt{20},\\ \\tfrac92'] },
      ],
      lines: [
        { say: 'Order these from least to greatest: the square root of twenty, 4.3, the cube root of 70, and nine halves.', show: ['q', 'line.axis'] },
        { say: 'Write each one as a decimal. Four squared is sixteen and five squared is 25, so the square root of twenty is between four and five: about 4.47.', show: 'line.s20', focus: 'line.s20' },
        { say: 'Four cubed is 64 and five cubed is 125, so the cube root of 70 is between four and five as well: about 4.12.', show: 'line.c70', focus: 'line.c70' },
        { say: '4.3 is already a decimal, and nine halves is 4.5.', show: ['line.p43', 'line.p92'], focus: ['line.p43', 'line.p92'] },
        { say: 'On the number line, the order is clear: the cube root of 70, then 4.3, the square root of twenty, and nine halves.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Between which two whole numbers is $\\sqrt{90}$?',
          choices: ['$9$ and $10$', '$8$ and $9$', '$44$ and $46$', '$10$ and $11$'],
          answer: 0,
          working: '$9^2 = 81$ and $10^2 = 100$. Since $81 < 90 < 100$, $9 < \\sqrt{90} < 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Between which two whole numbers is the square root of 90? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Nine squared is 81, and ten squared is 100. 90 is between them, so its square root is between nine and ten. C halves 90 instead of taking its square root.', show: 'q.answer' },
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
            'In $\\sqrt[n]{x}$, $x$ is the radicand and $n$ the index (2 when not written).',
            'Odd roots of negative numbers are negative; even roots of negative numbers are not real.',
            'Estimate with the perfect squares or cubes on either side; order by writing decimals.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. In a radical, the number underneath is the radicand, and the small number is the index, which is two when it is not written.", show: 'sum.0' },
        { say: 'An odd root of a negative number is negative, but an even root of a negative number is not real.', show: 'sum.1' },
        { say: 'To estimate a root, use the perfect squares or cubes on either side, and to order numbers, write them as decimals. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
