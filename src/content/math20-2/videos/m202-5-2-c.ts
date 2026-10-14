import type { Explainer } from '@/video/script.ts';
import { normalCurve } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const HEIGHTS = ['144', '152', '160', '168', '176', '184', '192'];

const video: Explainer = {
  id: 'm202-5-2-c',
  lessonId: 'm202-5-2',
  title: 'The Normal Distribution, Part 3: Using the Normal Model',
  thumbnailTitle: 'Using the Normal Model',
  thumbnail: 'tw',
  summary: 'Percents for intervals that are not centred on the mean (83.85% between 160 and 192 cm), estimating how many of 600 students are taller than 184 cm, why the rule’s big percents cannot be added, checking whether data is approximately normal, and finding μ and σ from a 95% interval.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.2 · Part 3', title: 'Using the Normal Model', subtitle: 'Counts, checks and working backwards' }],
      lines: [
        { say: 'The 68, 95, 99.7 rule turns a mean and a standard deviation into percents, and percents into counts of people or items.', show: 'title' },
        { say: 'In this video, you will handle intervals that are not centred on the mean, check whether data is normal, and work backwards.' },
      ],
    },
    {
      chapter: 'Two different distances',
      layout: 'center',
      main: [
        figure('tw', [normalCurve({ labels: HEIGHTS, width: 2, height: 5.5, regions: [{ id: 'mid', from: -1, to: 3, label: '83.85\\%' }, { id: 'top', from: 2, to: Infinity, tone: 'opp', label: '2.5\\%', labelAt: [2.9, 1.4] }] })], 270),
        { kind: 'math', id: 'm', size: 'md', lines: ['34 + 34 + 13.5 + 2.35 = 83.85\\%', '\\text{above } 184\\text{: } 2.35 + 0.15 = 2.5\\%,\\quad 0.025 \\times 600 = 15'] },
      ],
      lines: [
        { say: 'What percent of the students are between 160 and 192 centimetres tall? 160 is one standard deviation below the mean, and 192 is three above it.', show: ['tw.axis', 'tw.curve'] },
        { say: 'Add the strips the interval covers: thirty-four, thirty-four, 13.5 and 2.35. That is 83.85 percent.', show: ['tw.mid', 'm.0'], focus: ['tw.mid', 'm.0'] },
        { say: 'Of 600 students, about how many are taller than 184 centimetres? 184 is two standard deviations above the mean, and above it are 2.35 and 0.15 percent: 2.5 percent.', show: 'tw.top', hide: 'tw.mid', focus: 'tw.top' },
        { say: 'Multiply the percent by the total: 0.025 times 600 is fifteen students.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Adding the big percents',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the rule’s big percents', md: '$68\\%$, $95\\%$ and $99.7\\%$ are for regions **centred on the mean**. From $152$ cm to $176$ cm is not $95\\% + 68\\%$. Add the strips instead: $13.5\\% + 34\\% + 34\\% = 81.5\\%$.' }],
      lines: [
        { say: 'Be careful: sixty-eight, ninety-five and 99.7 percent are for regions centred on the mean. From 152 to 176 centimetres is not ninety-five plus sixty-eight percent, which would be more than 100.', show: 'oops' },
        { say: 'Add the strips instead: 13.5 plus thirty-four plus thirty-four is 81.5 percent.' },
      ],
    },
    {
      chapter: 'Is the data normal?',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['The histogram is roughly bell-shaped and symmetric.', 'The mean and the median are close together.', 'The percents within $1$, $2$ and $3$ standard deviations are close to $68\\%$, $95\\%$ and $99.7\\%$.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Flour: } 67\\%,\\ 96\\%,\\ 100\\% \\approx 68\\%,\\ 95\\%,\\ 99.7\\%'] },
      ],
      lines: [
        { say: 'The rule only works for data that is approximately normal. Before you use it, check that the histogram is roughly bell-shaped and symmetric, and that the mean and median are close together.', show: ['b.0', 'b.1'] },
        { say: 'Also check that the percents within one, two and three standard deviations are close to sixty-eight, ninety-five and 99.7 percent.', show: 'b.2' },
        { say: 'A mill weighed 300 bags of flour: sixty-seven percent were within one standard deviation, ninety-six percent within two, and 100 percent within three. Those are close to the rule, so the masses are approximately normal. Real data never matches exactly.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['95\\%\\text{: } 990 \\text{ g to } 1010 \\text{ g}', '\\mu = \\dfrac{990 + 1010}{2} = 1000\\text{ g}', '4\\sigma = 1010 - 990 = 20,\\quad \\sigma = 5\\text{ g}'] }],
      lines: [
        { say: 'You can also work backwards. About ninety-five percent of the bags are between 990 and 1,010 grams. Find the mean and the standard deviation.', show: 'm.0', focus: 'm.0' },
        { say: 'The interval is centred on the mean, so the mean is halfway: 1,000 grams.', show: 'm.1', focus: 'm.1' },
        { say: 'Ninety-five percent is within two standard deviations on each side, so the interval is four standard deviations wide. Four sigma is twenty, so sigma is five grams.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Test scores are normally distributed, and about $68\\%$ of them are between $85$ and $115$. Find the mean and the standard deviation.',
          choices: ['$\\mu = 100$, $\\sigma = 15$', '$\\mu = 100$, $\\sigma = 30$', '$\\mu = 100$, $\\sigma = 7.5$', '$\\mu = 115$, $\\sigma = 15$'],
          answer: 0,
          working: 'The mean is halfway: $100$. $68\\%$ is within $1\\sigma$ each side, so the interval is $2\\sigma = 30$ wide, and $\\sigma = 15$.',
        },
      ],
      lines: [
        { say: 'Your turn. Test scores are normally distributed, and about sixty-eight percent are between eighty-five and 115. Find the mean and the standard deviation. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The mean is halfway, at 100. Sixty-eight percent is within one standard deviation on each side, so the interval is two sigma wide. Two sigma is thirty, so sigma is fifteen.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add the strips a region covers; multiply by the total for a count.', 'The big percents only work for regions centred on the mean.', 'Check that data is approximately normal before using the rule.'] }],
      lines: [
        { say: 'Let’s sum up. Add the strips that a region covers, and multiply by the total to estimate a count.', show: 'sum.0' },
        { say: 'The big percents, sixty-eight, ninety-five and 99.7, only work for regions centred on the mean.', show: 'sum.1' },
        { say: 'And check that data is approximately normal before you use the rule. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
