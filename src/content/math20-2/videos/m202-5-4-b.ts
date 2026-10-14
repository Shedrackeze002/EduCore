import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** Where 20 repeated polls landed, relative to the true value (in margins of error). One misses. */
const OFFSETS = [0.3, -0.5, 0.1, 0.7, -0.2, -0.8, 0.4, 1.4, -0.1, 0.6, -0.6, 0.2, -0.3, 0.9, -0.4, 0.05, 0.5, -0.7, 0.15, -0.15];

/** Twenty confidence intervals from repeated samples, stacked, with the true value as a dashed line. */
function repeats(): Part {
  const w = 2;
  const points: Record<string, P> = { t0: [0, -0.4], t1: [0, OFFSETS.length * 0.4 + 0.1] };
  const items: DiagramItem[] = [{ kind: 'line', id: 'truth', from: 't0', to: 't1', tone: 'good', dashed: true }];
  points.tl = [0, OFFSETS.length * 0.4 + 0.1];
  items.push({ kind: 'label', id: 'truth-l', at: 'tl', tex: '\\text{true value}', tone: 'good', place: 'above' });
  OFFSETS.forEach((o, i) => {
    const y = i * 0.4;
    const miss = Math.abs(o) > 1;
    Object.assign(points, { [`a${i}`]: [(o - 1) * w, y], [`b${i}`]: [(o + 1) * w, y], [`c${i}`]: [o * w, y] });
    items.push({ kind: 'line', id: `i${i}`, from: `a${i}`, to: `b${i}`, tone: miss ? 'bad' : 'adj', weight: 3, group: miss ? 'miss' : 'hits' });
    items.push({ kind: 'label', id: `d${i}`, at: `c${i}`, tex: '', tone: miss ? 'bad' : 'adj', dot: true, group: miss ? 'miss' : 'hits' });
  });
  return { points, items };
}

const video: Explainer = {
  id: 'm202-5-4-b',
  lessonId: 'm202-5-4',
  title: 'Confidence Intervals, Part 2: Confidence Level and Sample Size',
  thumbnailTitle: 'Confidence Level and Sample Size',
  thumbnail: 'rp',
  summary: 'What "19 times out of 20" means, why a 95% confidence level is not the percent of people who agree, how a larger sample shrinks the margin of error and a higher confidence level widens it, and why quadrupling the sample only halves the margin.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.4 · Part 2', title: 'Confidence Level and Sample Size', subtitle: 'Nineteen times out of twenty' }],
      lines: [
        { say: 'Polls end with a phrase like nineteen times out of twenty. It describes how trustworthy the method is, and it is often misread.', show: 'title' },
        { say: 'In this video, you will learn what the confidence level means, and what changes the margin of error.' },
      ],
    },
    {
      chapter: 'Nineteen times out of twenty',
      layout: 'split',
      leftWidth: 520,
      left: [figure('rp', [repeats()], 420)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Confidence level', md: 'How often the polling method gives an interval that contains the true population value. "19 times out of 20" means $\\dfrac{19}{20} = 95\\%$. Polls also use $90\\%$ and $99\\%$.' }],
      lines: [
        { say: 'The confidence level tells how often the polling method gives an interval that contains the true population value. Nineteen times out of twenty is nineteen over twenty, or ninety-five percent.', show: 'def' },
        { say: 'Imagine repeating the arena poll twenty times, each time with a new random sample. Each poll gives its own interval.', show: ['rp.hits', 'rp.truth', 'rp.truth-l'] },
        { say: 'About nineteen of the twenty intervals contain the true percent of all voters. About one in twenty misses it.', show: 'rp.miss', focus: 'rp.miss' },
        { say: 'So we say: we can be ninety-five percent confident that between 50.5 and 57.5 percent of all voters support the arena.' },
      ],
    },
    {
      chapter: 'What 95% does not mean',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'What 95% does not mean', md: 'The confidence level is **not** the percent of people who agree, and it does not make the interval certain. "$95\\%$ of voters support the arena" is wrong, and so is "the true percent is definitely between $50.5\\%$ and $57.5\\%$".' }],
      lines: [
        { say: 'Be careful. The confidence level is not the percent of people who agree. Saying ninety-five percent of voters support the arena is wrong.', show: 'oops' },
        { say: 'And it does not make the interval certain. About one time in twenty, the true value is outside the interval.' },
      ],
    },
    {
      chapter: 'What changes the margin of error',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Sample size (95%)', '500', '1000', '2000'], rows: [['Margin of error', '$4.4$', '$3.1$', '$2.2$']] },
        { kind: 'table', id: 'u', head: ['Confidence level (1000 people)', '90%', '95%', '99%'], rows: [['Margin of error', '$2.6$', '$3.1$', '$4.1$']] },
      ],
      lines: [
        { say: 'Two things change the margin of error. The first is sample size. For a result near fifty percent, at ninety-five percent confidence, the margin is about 4.4 points with 500 people, 3.1 with 1,000, and 2.2 with 2,000.', show: 't' },
        { say: 'A larger random sample gives a more precise estimate, so the margin of error is smaller. But it costs more time and money.' },
        { say: 'The second is the confidence level. With the same 1,000 people, the margin is about 2.6 points at ninety percent, 3.1 at ninety-five, and 4.1 at ninety-nine. Being more confident needs a wider interval.', show: 'u' },
      ],
    },
    {
      chapter: 'Diminishing returns',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Diminishing returns', md: 'Doubling the sample does not halve the margin of error. From $500$ to $2000$ people, four times as many, only cuts the margin from $4.4$ to $2.2$ points.' }],
      lines: [
        { say: 'The town wants a margin of error close to two points, still at ninety-five percent. Lowering the confidence level is not allowed, so it needs a larger sample: about 2,000 people.', show: 'tip' },
        { say: 'Notice the diminishing returns. Going from 500 to 2,000 people, four times as many, only cuts the margin of error in half.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pollster wants a smaller margin of error while keeping a $95\\%$ confidence level. What should change?',
          choices: ['Survey more people.', 'Raise the confidence level to $99\\%$.', 'Survey fewer people.', 'Report the result to more decimal places.'],
          answer: 0,
          working: 'A larger random sample gives a smaller margin of error. B widens the interval, and C makes it wider too.',
        },
      ],
      lines: [
        { say: 'Your turn. A pollster wants a smaller margin of error, while keeping a ninety-five percent confidence level. What should change? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A larger random sample gives a smaller margin of error. Raising the confidence level, or surveying fewer people, would make the interval wider.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['19 times out of 20 is a $95\\%$ confidence level: about how often the method captures the true value.', 'It is not the percent of people who agree.', 'Larger sample: smaller margin. Higher confidence: wider interval.'] }],
      lines: [
        { say: 'Let’s sum up. Nineteen times out of twenty is a ninety-five percent confidence level: about how often the method captures the true value.', show: 'sum.0' },
        { say: 'It is not the percent of people who agree.', show: 'sum.1' },
        { say: 'And a larger sample gives a smaller margin, while a higher confidence level gives a wider interval. In part three, we make decisions with confidence intervals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
