import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm202-5-4',
  lessonId: 'm202-5-4',
  title: 'Confidence Intervals, Part 1: Margin of Error',
  thumbnailTitle: 'Margin of Error',
  thumbnail: 'ci',
  summary: 'Why a survey of a random sample gives an estimate, the margin of error and the confidence interval, the arena poll’s interval of 50.5% to 57.5%, and finding the survey result and margin of error from an interval of 38.6% to 45.4%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.4 · Part 1', title: 'Margin of Error', subtitle: 'Reading a poll' }],
      lines: [
        { say: 'A news report says that fifty-four percent of Okotoks voters support building a new arena. The poll is accurate to within 3.5 percentage points, nineteen times out of twenty.', show: 'title' },
        { say: 'What does that last sentence mean? In this video, you will learn the first part: the margin of error, and the confidence interval.' },
      ],
    },
    {
      chapter: 'Samples and populations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A sample estimates a population', md: 'Pollsters survey a **random sample** and use it to estimate the whole **population**. Different samples give slightly different results, so a survey result is an estimate, not an exact value.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Margin of error and confidence interval', md: 'The **margin of error** tells how far the true population value may reasonably be from the survey result. The **confidence interval** runs from the result minus the margin of error to the result plus it.' },
      ],
      lines: [
        { say: 'Pollsters cannot ask every voter in a town, so they survey a random sample, and use it to estimate the whole population.', show: 'key' },
        { say: 'Different random samples give slightly different results, so a survey result is an estimate, not an exact value. Every good poll reports how precise it is.' },
        { say: 'The margin of error tells how far the true population value may reasonably be from the survey result. The confidence interval is the range from the result minus the margin of error, to the result plus the margin of error.', show: 'def' },
      ],
    },
    {
      chapter: 'The arena poll',
      layout: 'center',
      main: [
        figure('ci', [numberLine({ min: 45, max: 60, step: 1, every: 5, length: 15, points: [{ id: 'r', value: 54, tex: '54\\%', tone: 'opp' }, { id: 'lo', value: 50.5, tex: '50.5\\%', tone: 'adj' }, { id: 'hi', value: 57.5, tex: '57.5\\%', tone: 'adj' }], spans: [{ id: 'span', from: 50.5, to: 57.5, tone: 'adj' }] })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['54 - 3.5 = 50.5,\\quad 54 + 3.5 = 57.5', '\\text{confidence interval: } 50.5\\% \\text{ to } 57.5\\%'] },
      ],
      lines: [
        { say: 'The arena poll found that fifty-four percent of voters support a new arena, with a margin of error of 3.5 percentage points.', show: ['ci.axis', 'ci.r'] },
        { say: 'Subtract and add the margin of error. Fifty-four minus 3.5 is 50.5, and fifty-four plus 3.5 is 57.5.', show: ['m.0', 'ci.lo', 'ci.hi'], focus: 'm.0' },
        { say: 'So the confidence interval is 50.5 percent to 57.5 percent. The survey result sits right in the middle.', show: ['ci.span', 'm.1'], focus: ['ci.span', 'm.1'] },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['38.6\\% \\text{ to } 45.4\\%', '\\text{result} = \\dfrac{38.6 + 45.4}{2} = 42\\%', '\\text{margin} = \\dfrac{45.4 - 38.6}{2} = 3.4'] }],
      lines: [
        { say: 'A survey report says that between 38.6 percent and 45.4 percent of the drivers in a city use winter tires. Find the survey result, and the margin of error.', show: 'm.0', focus: 'm.0' },
        { say: 'The survey result is the midpoint of the interval: 38.6 plus 45.4, over two, is forty-two percent.', show: 'm.1', focus: 'm.1' },
        { say: 'The margin of error is half the width: 45.4 minus 38.6 is 6.8, and half of that is 3.4 percentage points.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A report says that between $27\\%$ and $35\\%$ of students walk to school. What were the survey result and the margin of error?',
          choices: ['$31\\%$, with a margin of $4$ points', '$31\\%$, with a margin of $8$ points', '$27\\%$, with a margin of $8$ points', '$35\\%$, with a margin of $4$ points'],
          answer: 0,
          working: 'Midpoint: $\\dfrac{27 + 35}{2} = 31$. Half the width: $\\dfrac{35 - 27}{2} = 4$. B uses the whole width.',
        },
      ],
      lines: [
        { say: 'Your turn. A report says that between twenty-seven and thirty-five percent of students walk to school. What were the survey result and the margin of error? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The midpoint is thirty-one percent, and half the width of eight is four percentage points. B uses the whole width as the margin.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A random sample gives an estimate of a population value.', 'Confidence interval = survey result $\\pm$ margin of error.', 'The result is the midpoint; the margin is half the width.'] }],
      lines: [
        { say: 'Let’s sum up. A survey of a random sample gives an estimate of a population value.', show: 'sum.0' },
        { say: 'The confidence interval is the survey result, plus or minus the margin of error.', show: 'sum.1' },
        { say: 'And the result is the midpoint of the interval, while the margin is half its width. In part two, we see what nineteen times out of twenty means. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
