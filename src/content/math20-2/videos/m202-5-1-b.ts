import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm202-5-1-b',
  lessonId: 'm202-5-1',
  title: 'Standard Deviation, Part 2: Calculators and Frequency Tables',
  thumbnailTitle: 'Standard Deviation from a Frequency Table',
  thumbnail: 'gl',
  summary: 'Which of the two standard deviations a calculator shows to use (σx, not Sx), and finding the mean and standard deviation of a ringette team’s goals per game from a frequency table: μ = 2.1 and σ = 1.3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.1 · Part 2', title: 'Calculators and Frequency Tables', subtitle: 'Standard deviation, faster' }],
      lines: [
        { say: 'Finding a standard deviation by hand shows what it means. But with real data, a calculator does the work, as long as you read the right number.', show: 'title' },
        { say: 'In this video, you will choose the right standard deviation on a calculator, and work from a frequency table.' },
      ],
    },
    {
      chapter: 'Two standard deviations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two standard deviations on your calculator', md: 'One-variable statistics shows two. $\\sigma x$ divides by $N$: the **population** standard deviation used in this course. $Sx$ divides by $N - 1$ and is used for samples.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Route A: } \\sigma x = \\sqrt{\\tfrac{10}{5}} \\approx 1.41,\\quad Sx = \\sqrt{\\tfrac{10}{4}} \\approx 1.58'] },
      ],
      lines: [
        { say: 'When you run one-variable statistics on a calculator, it shows two standard deviations.', show: 'oops' },
        { say: 'Sigma x divides by N, the number of values. That is the population standard deviation, the one used in this course. S x divides by N minus one, and is used for samples.' },
        { say: 'For Route A, sigma x is about 1.41, but S x is about 1.58. Read sigma x.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Goals per game',
      layout: 'split',
      leftWidth: 470,
      left: [figure('gl', [barGraph({ categories: ['0', '1', '2', '3', '4', '5'], values: [2, 5, 6, 4, 2, 1], max: 6, step: 2, height: 5, titles: { x: 'Goals', y: 'Games' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['N = 2 + 5 + 6 + 4 + 2 + 1 = 20', '\\Sigma fx = 5 + 12 + 12 + 8 + 5 = 42', '\\mu = \\dfrac{42}{20} = 2.1'] }],
      lines: [
        { say: 'A ringette team in St. Albert recorded how many goals it scored in each game of its season. When values repeat like this, the data is shown in a bar graph, or a frequency table.', show: ['gl.scale', 'gl.b0', 'gl.b1', 'gl.b2', 'gl.b3', 'gl.b4', 'gl.b5', 'gl.v0', 'gl.v1', 'gl.v2', 'gl.v3', 'gl.v4', 'gl.v5'] },
        { say: 'Each value must be counted as often as it happened. The frequencies add to twenty games, so N is twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply each value by its frequency, and add: zero, five, twelve, twelve, eight and five make forty-two goals. So the mean is forty-two over twenty, which is 2.1 goals per game.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'The standard deviation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2(-2.1)^2 + 5(-1.1)^2 + 6(-0.1)^2', '+\\ 4(0.9)^2 + 2(1.9)^2 + 1(2.9)^2 = 33.8', '\\sigma = \\sqrt{\\dfrac{33.8}{20}} = \\sqrt{1.69} = 1.3'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Let the calculator do the work', md: 'Put the values in one list and the frequencies in a second list. Run one-variable statistics with the frequency list, and check that $n = 20$ before you read $\\sigma x$.' },
      ],
      lines: [
        { say: 'For the standard deviation, multiply each squared deviation by its frequency too, then add, divide by N, and take the square root.' },
        { say: 'The deviations from 2.1 are negative 2.1, negative 1.1, and so on. Squared, and multiplied by their frequencies, they add to 33.8.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Divide by twenty, and take the square root: sigma is 1.3 goals.', show: 'm.2', focus: 'm.2' },
        { say: 'On a calculator, put the values in one list and the frequencies in another, and run one-variable statistics with the frequency list. Check that n is twenty before you read sigma x.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The value $1$ occurs twice, $2$ occurs four times and $3$ occurs twice. Find the population standard deviation.',
          choices: ['$0.71$', '$0.82$', '$0.76$', '$2$'],
          answer: 0,
          working: '$N = 8$ and $\\mu = \\dfrac{2 + 8 + 6}{8} = 2$. $\\Sigma f(x - \\mu)^2 = 2(1) + 4(0) + 2(1) = 4$, so $\\sigma = \\sqrt{\\dfrac{4}{8}} \\approx 0.71$.',
        },
      ],
      lines: [
        { say: 'Your turn. The value one occurs twice, two occurs four times, and three occurs twice. Find the population standard deviation. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. N is eight, and the mean is two. The weighted squared deviations add to four, so sigma is the square root of four over eight, about 0.71. B ignores the frequencies, and C divides by seven.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use $\\sigma x$, which divides by $N$, not $Sx$.', 'From a frequency table: $\\mu = \\dfrac{\\Sigma fx}{N}$.', '$\\sigma = \\sqrt{\\dfrac{\\Sigma f(x - \\mu)^2}{N}}$'] }],
      lines: [
        { say: 'Let’s sum up. On a calculator, use sigma x, which divides by N.', show: 'sum.0' },
        { say: 'From a frequency table, multiply each value by its frequency to find the mean.', show: 'sum.1' },
        { say: 'And multiply each squared deviation by its frequency to find sigma. In part three, we compare data sets. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
