import type { Explainer } from '@/video/script.ts';
import { normalCurve } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const HEIGHTS = ['144', '152', '160', '168', '176', '184', '192'];

const video: Explainer = {
  id: 'm202-5-2',
  lessonId: 'm202-5-2',
  title: 'The Normal Distribution, Part 1: The Normal Curve',
  thumbnailTitle: 'The Normal Distribution',
  thumbnail: 'nc',
  summary: 'The bell-shaped normal curve and its properties (mean, median and mode at the centre, symmetry, area of 100%), how the mean sets its centre and the standard deviation its width, and using symmetry to find the median height and the percent of students below the mean.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.2 · Part 1', title: 'The Normal Distribution', subtitle: 'The bell-shaped curve' }],
      lines: [
        { say: 'Measure the heights of a thousand Grade 11 students, and most of them bunch up near the middle, while very short and very tall students are rare.', show: 'title' },
        { say: 'That bell shape appears in heights, exam marks, birth masses, and machine-filled bottles. In this video, you will meet the normal distribution.' },
      ],
    },
    {
      chapter: 'The normal curve',
      layout: 'split',
      leftWidth: 600,
      left: [figure('nc', [normalCurve({ labels: HEIGHTS, width: 1.6, height: 5.5 })], 300)],
      right: [{ kind: 'bullets', id: 'b', items: ['Mean, median and mode are equal, at the centre.', 'Symmetric about the mean.', 'Gets closer to the axis, but never touches it.', 'Total area under the curve: $100\\%$ of the data.'] }],
      lines: [
        { say: 'A normal distribution has a symmetric, bell-shaped graph, called a normal curve. This one models the heights of Grade 11 students in centimetres.', show: ['nc.axis', 'nc.curve'] },
        { say: 'The mean, median and mode are all equal, at the centre of the curve: here, 168 centimetres.', show: ['b.0', 'nc.mean'], focus: 'nc.mean' },
        { say: 'The curve is symmetric about the mean, so half of the data is below the mean, and half is above.', show: 'b.1' },
        { say: 'The curve gets closer and closer to the axis, but never touches it. And the total area under the curve represents 100 percent of the data.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Centre and width',
      layout: 'center',
      main: [
        figure('cw', [normalCurve({ name: 'n', width: 1.2, height: 5 }), normalCurve({ name: 'w', width: 3, height: 2 })], 280),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\mu \\text{ sets the centre;}\\quad \\sigma \\text{ sets the width}'] },
      ],
      lines: [
        { say: 'Two numbers describe a normal curve. The mean, mu, sets where its centre is.', show: ['cw.w-axis', 'cw.w-mean', 'm.0'] },
        { say: 'The standard deviation, sigma, sets how wide it is. With a small standard deviation, the data is close to the mean, so the curve is tall and narrow.', show: 'cw.n-curve', focus: 'cw.n-curve' },
        { say: 'With a large standard deviation, the data is spread out, so the curve is low and wide. Both curves enclose the same area: all of the data.', show: 'cw.w-curve', focus: 'cw.w-curve' },
      ],
    },
    {
      chapter: 'Using symmetry',
      layout: 'split',
      leftWidth: 600,
      left: [figure('sy', [normalCurve({ labels: HEIGHTS, width: 1.6, height: 5.5, regions: [{ id: 'low', from: -Infinity, to: 0, label: '50\\%', labelAt: [-1, 1.6] }] })], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\mu = 168,\\quad \\sigma = 8', '\\text{median} = \\mu = 168\\text{ cm}', '\\text{below } 168\\text{: } 50\\%'] }],
      lines: [
        { say: 'The heights have a mean of 168 centimetres, and a standard deviation of eight centimetres. The tick marks on the axis are one standard deviation apart.', show: ['sy.axis', 'sy.curve', 'm.0'], focus: 'sy.axis' },
        { say: 'What is the median height? In a normal distribution, the median equals the mean, so the median is 168 centimetres.', show: ['sy.mean', 'm.1'], focus: 'm.1' },
        { say: 'And what percent of the students are shorter than 168? The curve is symmetric, so half of the area is on each side: about fifty percent.', show: ['sy.low', 'm.2'], focus: ['sy.low', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Exam marks are normally distributed with a mean of $72\\%$. What percent of students scored above the mean?',
          choices: ['$50\\%$', '$68\\%$', '$34\\%$', '$72\\%$'],
          answer: 0,
          working: 'The normal curve is symmetric about the mean, so half of the data is above it.',
        },
      ],
      lines: [
        { say: 'Your turn. Exam marks are normally distributed, with a mean of seventy-two percent. What percent of students scored above the mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The normal curve is symmetric about the mean, so half of the students, fifty percent, scored above it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A normal curve is symmetric and bell-shaped.', 'Mean, median and mode are at the centre; the area is $100\\%$.', '$\\mu$ sets the centre, and $\\sigma$ sets the width.'] }],
      lines: [
        { say: 'Let’s sum up. A normal curve is symmetric and bell-shaped.', show: 'sum.0' },
        { say: 'Its mean, median and mode are at the centre, and the area under it is 100 percent of the data.', show: 'sum.1' },
        { say: 'And the mean sets its centre, while the standard deviation sets its width. In part two, we find the percent of data in any region. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
