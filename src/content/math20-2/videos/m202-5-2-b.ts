import type { Explainer } from '@/video/script.ts';
import { normalCurve } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const HEIGHTS = ['144', '152', '160', '168', '176', '184', '192'];

/** The eight regions one standard deviation wide, labelled on the right and in the middle. */
const SPLIT = [
  { id: 'l3', from: -Infinity, to: -3, tone: 'theta' as const },
  { id: 'l2', from: -3, to: -2, tone: 'good' as const },
  { id: 'l1', from: -2, to: -1, tone: 'opp' as const, label: '13.5\\%' },
  { id: 'l0', from: -1, to: 0, tone: 'adj' as const, label: '34\\%' },
  { id: 'r0', from: 0, to: 1, tone: 'adj' as const, label: '34\\%' },
  { id: 'r1', from: 1, to: 2, tone: 'opp' as const, label: '13.5\\%' },
  { id: 'r2', from: 2, to: 3, tone: 'good' as const, label: '2.35\\%', labelAt: [2.5, 1.3] as [number, number] },
  { id: 'r3', from: 3, to: Infinity, tone: 'theta' as const, label: '0.15\\%', labelAt: [3.95, 0.6] as [number, number] },
];

const video: Explainer = {
  id: 'm202-5-2-b',
  lessonId: 'm202-5-2',
  title: 'The Normal Distribution, Part 2: The 68–95–99.7 Rule',
  thumbnailTitle: 'The 68–95–99.7 Rule',
  thumbnail: 'sp',
  summary: 'The 68–95–99.7 rule for data within 1, 2 and 3 standard deviations of the mean, 95% of students between 152 cm and 184 cm, splitting each side of the curve into 34%, 13.5%, 2.35% and 0.15%, and 16% of students taller than 176 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.2 · Part 2', title: 'The 68–95–99.7 Rule', subtitle: 'Percents under the curve' }],
      lines: [
        { say: 'Every normal curve has the same shape. So the percent of data within one, two or three standard deviations of the mean is always the same.', show: 'title' },
        { say: 'In this video, you will learn the 68, 95, 99.7 rule, and use it to find the percent of data in any region.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'split',
      leftWidth: 600,
      left: [figure('rl', [normalCurve({ labels: HEIGHTS, width: 1.6, height: 5.5, regions: [{ id: 's1', from: -1, to: 1, label: '68\\%' }, { id: 's2', from: -2, to: 2, label: '95\\%' }, { id: 's3', from: -3, to: 3, label: '99.7\\%' }] })], 300)],
      right: [{ kind: 'bullets', id: 'b', items: ['about $68\\%$ within $1\\sigma$ of the mean', 'about $95\\%$ within $2\\sigma$', 'about $99.7\\%$ within $3\\sigma$'] }],
      lines: [
        { say: 'In a normal distribution, about sixty-eight percent of the data is within one standard deviation of the mean. For the heights, that is from 160 to 176 centimetres.', show: ['rl.axis', 'rl.curve', 'rl.s1', 'b.0'], focus: 'rl.s1' },
        { say: 'About ninety-five percent is within two standard deviations, from 152 to 184.', show: ['rl.s2', 'b.1'], hide: 'rl.s1', focus: 'rl.s2' },
        { say: 'And about 99.7 percent is within three standard deviations, from 144 to 192. Almost all of the data.', show: ['rl.s3', 'b.2'], hide: 'rl.s2', focus: 'rl.s3' },
      ],
    },
    {
      chapter: 'Between 152 and 184',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['152 = 168 - 2(8):\\quad 2\\sigma \\text{ below}', '184 = 168 + 2(8):\\quad 2\\sigma \\text{ above}', '\\text{within } 2\\sigma\\text{: about } 95\\%'] }],
      lines: [
        { say: 'What percent of the students are between 152 and 184 centimetres tall? First, find how many standard deviations each height is from the mean.', show: 'm.0', focus: 'm.0' },
        { say: '152 is 168 minus two times eight: two standard deviations below the mean. And 184 is two standard deviations above.', show: 'm.1', focus: 'm.1' },
        { say: 'So the interval is within two standard deviations, and holds about ninety-five percent of the students.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Splitting the regions',
      layout: 'center',
      main: [
        figure('rg', [normalCurve({ labels: HEIGHTS, width: 2.4, height: 5.5, regions: SPLIT })], 330),
        { kind: 'math', id: 'm', size: 'md', lines: ['34 + 13.5 + 2.35 + 0.15 = 50\\%'] },
      ],
      lines: [
        { say: 'For other regions, split the curve into strips one standard deviation wide. The curve is symmetric, so each side holds half of each percent in the rule.', show: ['rg.axis', 'rg.curve'] },
        { say: 'From the mean to one standard deviation is half of sixty-eight: thirty-four percent.', show: ['rg.l0', 'rg.r0'], focus: ['rg.l0', 'rg.r0'] },
        { say: 'From one to two standard deviations is half of ninety-five minus sixty-eight: 13.5 percent. From two to three is 2.35 percent, and beyond three is only 0.15 percent.', show: ['rg.l1', 'rg.r1', 'rg.l2', 'rg.r2', 'rg.l3', 'rg.r3'], focus: ['rg.r1', 'rg.r2', 'rg.r3'] },
        { say: 'Each side adds to fifty percent. To find the percent in any region, add the strips it covers.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Taller than 176 cm',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['176 = 168 + 8:\\quad 1\\sigma \\text{ above}', '13.5\\% + 2.35\\% + 0.15\\% = 16\\%', '\\text{Check: } 50\\% - 34\\% = 16\\%'] }],
      lines: [
        { say: 'What percent of the students are taller than 176 centimetres? 176 is one standard deviation above the mean.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the strips above it: 13.5 plus 2.35 plus 0.15 is sixteen percent.', show: 'm.1', focus: 'm.1' },
        { say: 'Check another way: half of the students are above the mean, and thirty-four percent are between 168 and 176. Fifty minus thirty-four is sixteen percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The heights have $\\mu = 168$ cm and $\\sigma = 8$ cm. What percent of the students are shorter than $152$ cm?',
          choices: ['$2.5\\%$', '$5\\%$', '$13.5\\%$', '$47.5\\%$'],
          answer: 0,
          working: '$152$ is $2\\sigma$ below the mean. Below it: $2.35\\% + 0.15\\% = 2.5\\%$. B counts both tails.',
        },
      ],
      lines: [
        { say: 'Your turn. What percent of the students are shorter than 152 centimetres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 152 is two standard deviations below the mean. Below that are 2.35 and 0.15 percent, which make 2.5 percent. B counts both tails.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['About $68\\%$, $95\\%$ and $99.7\\%$ within $1$, $2$ and $3$ standard deviations.', 'Each side: $34\\%$, $13.5\\%$, $2.35\\%$ and $0.15\\%$.', 'Add the strips that a region covers.'] }],
      lines: [
        { say: 'Let’s sum up. About sixty-eight, ninety-five and 99.7 percent of normal data is within one, two and three standard deviations of the mean.', show: 'sum.0' },
        { say: 'Each side of the mean splits into thirty-four, 13.5, 2.35 and 0.15 percent.', show: 'sum.1' },
        { say: 'And to find the percent in a region, add the strips it covers. In part three, we use the rule with real data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
