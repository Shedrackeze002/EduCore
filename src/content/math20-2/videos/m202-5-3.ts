import type { DiagramItem, DiagramTone, Explainer } from '@/video/script.ts';
import { normalCurve } from '@/video/charts.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

const HEIGHTS = ['144', '152', '160', '168', '176', '184', '192'];
const W = 1.6;
const H = 5.5;

/** A line from the axis up to a normal curve (W wide, H tall) at `z`, with a label at its top. */
function marker(id: string, z: number, tex: string, tone: DiagramTone, place: 'above left' | 'above right'): Part {
  const top: P = [z * W, H * Math.exp((-z * z) / 2)];
  const points: Record<string, P> = { [`${id}-a`]: [z * W, 0], [`${id}-b`]: top };
  const items: DiagramItem[] = [
    { kind: 'line', id: `${id}-line`, from: `${id}-a`, to: `${id}-b`, tone, weight: 3, group: id },
    { kind: 'label', id: `${id}-tex`, at: `${id}-b`, tex, tone, place, group: id },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm202-5-3',
  lessonId: 'm202-5-3',
  title: 'Z-Scores, Part 1: Standard Deviations from the Mean',
  thumbnailTitle: 'Z-Scores',
  thumbnail: 'zs',
  summary: 'What a z-score measures, z = (x − μ)/σ for heights of 180 cm and 158 cm, positive and negative z-scores, and turning a z-score back into a value with x = μ + zσ for a 33 cm trout.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.3 · Part 1', title: 'Z-Scores', subtitle: 'How unusual is a value?' }],
      lines: [
        { say: 'Maya scored seventy-eight on her chemistry exam, and eighty-four on her English exam. Which was her better result? It depends on how everyone else did.', show: 'title' },
        { say: 'A z-score measures a value against its own distribution. In this video, you will find z-scores, and turn them back into values.' },
      ],
    },
    {
      chapter: 'What a z-score measures',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Z-score', md: 'A **z-score** tells you how many standard deviations a value $x$ is above or below the mean. Positive is above the mean, negative is below, and the mean itself has $z = 0$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['z = \\dfrac{x - \\mu}{\\sigma}'] },
      ],
      lines: [
        { say: 'A z-score tells you how many standard deviations a value is above or below the mean.', show: 'def' },
        { say: 'Subtract the mean from the value, to find how far it is from the mean, and divide by the standard deviation, to count that distance in standard deviations.', show: 'm.0', focus: 'm.0' },
        { say: 'A positive z-score is above the mean, a negative z-score is below it, and the mean itself has a z-score of zero.' },
      ],
    },
    {
      chapter: 'Heights',
      layout: 'split',
      leftWidth: 560,
      left: [figure('zs', [normalCurve({ labels: HEIGHTS, width: W, height: H }), marker('hi', 1.5, 'z = 1.5', 'opp', 'above right'), marker('lo', -1.25, 'z = -1.25', 'adj', 'above left')], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['z = \\dfrac{180 - 168}{8} = 1.5', 'z = \\dfrac{158 - 168}{8} = -1.25'] }],
      lines: [
        { say: 'The heights of Grade 11 students are normally distributed, with a mean of 168 centimetres and a standard deviation of eight. Find the z-scores for 180 centimetres and 158 centimetres.', show: ['zs.axis', 'zs.curve', 'zs.mean'] },
        { say: 'For 180: 180 minus 168 is twelve, and twelve over eight is 1.5. So 180 centimetres is 1.5 standard deviations above the mean.', show: ['m.0', 'zs.hi'], focus: ['m.0', 'zs.hi'] },
        { say: 'For 158: 158 minus 168 is negative ten, and negative ten over eight is negative 1.25. So 158 centimetres is 1.25 standard deviations below the mean.', show: ['m.1', 'zs.lo'], focus: ['m.1', 'zs.lo'] },
      ],
    },
    {
      chapter: 'From a z-score to a value',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x = \\mu + z\\sigma', 'x = 40 + (-1.4)(5)', 'x = 40 - 7 = 33\\text{ cm}'] }],
      lines: [
        { say: 'To go the other way, from a z-score to a value, rearrange the formula: x equals mu, plus z times sigma. Start at the mean, and move z standard deviations.', show: 'm.0', focus: 'm.0' },
        { say: 'The lengths of trout in a lake have a mean of forty centimetres, and a standard deviation of five. One trout’s length has a z-score of negative 1.4. How long is it?', show: 'm.1', focus: 'm.1' },
        { say: 'Negative 1.4 times five is negative seven, so the trout is forty minus seven, which is thirty-three centimetres long. A negative z-score gives a value below the mean, as expected.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Battery lives have $\\mu = 50$ h and $\\sigma = 4$ h. What is the z-score of a battery that lasts $44$ h?',
          choices: ['$-1.5$', '$1.5$', '$-6$', '$-0.67$'],
          answer: 0,
          working: '$z = \\dfrac{44 - 50}{4} = \\dfrac{-6}{4} = -1.5$. It is below the mean, so the z-score is negative.',
        },
      ],
      lines: [
        { say: 'Your turn. Battery lives have a mean of fifty hours, and a standard deviation of four hours. What is the z-score of a battery that lasts forty-four hours? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Forty-four minus fifty is negative six, and negative six over four is negative 1.5. The battery is below the mean, so its z-score is negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$z = \\dfrac{x - \\mu}{\\sigma}$ counts standard deviations from the mean.', 'Positive is above the mean; negative is below.', '$x = \\mu + z\\sigma$ turns a z-score back into a value.'] }],
      lines: [
        { say: 'Let’s sum up. A z-score counts how many standard deviations a value is from the mean.', show: 'sum.0' },
        { say: 'A positive z-score is above the mean, and a negative one is below.', show: 'sum.1' },
        { say: 'And x equals mu plus z sigma turns a z-score back into a value. In part two, we use z-scores to compare results. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
