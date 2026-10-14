import type { Explainer } from '@/video/script.ts';
import { normalCurve } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const HEIGHTS = ['144', '152', '160', '168', '176', '184', '192'];

const video: Explainer = {
  id: 'm202-5-3-c',
  lessonId: 'm202-5-3',
  title: 'Z-Scores, Part 3: Areas under the Normal Curve',
  thumbnailTitle: 'Areas with a Z-Score Table',
  thumbnail: 'ar',
  summary: 'Reading a z-score table for the area to the left of z, and finding the percent of students shorter than 180 cm (93.3%), taller than 180 cm (6.7%), and between 158 cm and 180 cm (82.8%), with a sketch first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.3 · Part 3', title: 'Areas under the Normal Curve', subtitle: 'Reading a z-score table' }],
      lines: [
        { say: 'The 68, 95, 99.7 rule only works for whole numbers of standard deviations. For any other value, a z-score table gives the area under the curve.', show: 'title' },
        { say: 'In this video, you will read a z-score table, and find percents below, above and between values.' },
      ],
    },
    {
      chapter: 'A z-score table',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$z$', '$0.00$', '$0.01$', '$0.02$', '$0.03$', '$0.04$', '$0.05$'], rows: [['$1.3$', '$0.9032$', '$0.9049$', '$0.9066$', '$0.9082$', '$0.9099$', '$0.9115$'], ['$1.4$', '$0.9192$', '$0.9207$', '$0.9222$', '$0.9236$', '$0.9251$', '$0.9265$'], ['$1.5$', '$0.9332$', '$0.9345$', '$0.9357$', '$0.9370$', '$0.9382$', '$0.9394$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['z = 1.43:\\ \\text{row } 1.4,\\ \\text{column } 0.03 \\to 0.9236 \\approx 92.4\\%'] },
      ],
      lines: [
        { say: 'For a normal distribution, the area under the curve to the left of a value is the fraction of the data below that value. A z-score table gives the area to the left of each z-score.', show: 't' },
        { say: 'Find the row for the first decimal place, and the column for the second. For z equals 1.43, go to row 1.4 and column 0.03: the area is 0.9236.', show: 'm.0', focus: ['t.1', 'm.0'] },
        { say: 'So about 92.4 percent of the data is below that value. Round each z-score to two decimal places before you use a table. A calculator or spreadsheet can also find the area directly.' },
      ],
    },
    {
      chapter: 'Below, above and between',
      layout: 'split',
      leftWidth: 600,
      left: [figure('bw', [normalCurve({ labels: HEIGHTS, width: 1.6, height: 5.5, regions: [{ id: 'below', from: -Infinity, to: 1.5, label: '93.3\\%', labelAt: [0, 1.8] }, { id: 'above', from: 1.5, to: Infinity, tone: 'opp', label: '6.7\\%', labelAt: [2.6, 1.3] }, { id: 'between', from: -1.25, to: 1.5, tone: 'good', label: '82.8\\%', labelAt: [0.1, 1.8] }] })], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['180\\text{: } z = 1.5 \\to 0.9332', '1 - 0.9332 = 0.0668', '158\\text{: } z = -1.25 \\to 0.1056', '0.9332 - 0.1056 = 0.8276'] }],
      lines: [
        { say: 'For the heights, find the percent of students shorter than 180 centimetres. Its z-score is 1.5, and the table gives 0.9332, so about 93.3 percent.', show: ['bw.axis', 'bw.curve', 'bw.below', 'm.0'], focus: ['bw.below', 'm.0'] },
        { say: 'Taller than 180 is the area to the right. The whole area is one, so it is one minus 0.9332: about 6.7 percent.', show: ['bw.above', 'm.1'], hide: 'bw.below', focus: ['bw.above', 'm.1'] },
        { say: 'Between 158 and 180: the z-score of 158 is negative 1.25, and the table gives 0.1056 to its left.', show: 'm.2', hide: 'bw.above', focus: 'm.2' },
        { say: 'Subtract the smaller area from the larger one: 0.9332 minus 0.1056 is 0.8276, so about 82.8 percent of the students are between 158 and 180 centimetres.', show: ['bw.between', 'm.3'], focus: ['bw.between', 'm.3'] },
      ],
    },
    {
      chapter: 'Sketch first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Sketch first', md: 'Shade the region before you calculate. To the left: the table area. To the right: $1 - \\text{area}$. Between: the larger area minus the smaller one. The sketch also shows whether the answer is more or less than $50\\%$.' }],
      lines: [
        { say: 'Always sketch the curve, and shade the region you want, before you calculate. A region to the left is the table area. A region to the right needs one minus the area. And a region between two values needs the larger area minus the smaller one.', show: 'tip' },
        { say: 'The sketch also tells you whether your answer should be more or less than fifty percent, which catches many slips.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For the heights ($\\mu = 168$ cm, $\\sigma = 8$ cm), what percent of students are taller than $172$ cm? The table gives $0.6915$ for $z = 0.50$.',
          choices: ['$30.9\\%$', '$69.2\\%$', '$50.5\\%$', '$19.2\\%$'],
          answer: 0,
          working: '$z = \\dfrac{172 - 168}{8} = 0.5$, and the area to the left is $0.6915$. Taller is to the right: $1 - 0.6915 = 0.3085$, about $30.9\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. What percent of the students are taller than 172 centimetres? The table gives 0.6915 for a z-score of 0.5. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The z-score is four over eight, which is 0.5. Taller means the area to the right: one minus 0.6915 is 0.3085, about 30.9 percent. B is the area to the left.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A z-score table gives the area to the left of $z$.', 'Above: $1 - \\text{area}$. Between: subtract the two areas.', 'Sketch and shade the region first.'] }],
      lines: [
        { say: 'Let’s sum up. A z-score table gives the area to the left of z, which is the fraction of the data below that value.', show: 'sum.0' },
        { say: 'For above, use one minus the area. For between, subtract the two areas.', show: 'sum.1' },
        { say: 'And sketch and shade the region first. In part four, we work backwards, from a percent to a value. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
