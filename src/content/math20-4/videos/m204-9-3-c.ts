import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-9-3-c',
  lessonId: 'm204-9-3',
  title: 'Probability, Part 3: Making Predictions',
  thumbnailTitle: 'Making Predictions',
  thumbnail: 'm',
  summary: 'Expected number = probability × number of trials: about 20 fives in 120 rolls of a die, about 130 large drinks for 500 customers using an experimental probability of 26%, and why a prediction is not a promise.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.3 · Part 3', title: 'Making Predictions', subtitle: 'Probability × trials' }],
      lines: [
        { say: 'Probability is most useful when you use it to plan: how many cups to order, how many staff to schedule, how many parts to keep in stock.', show: 'title' },
        { say: 'In this video, you will use probability to predict how many times something will happen.' },
      ],
    },
    {
      chapter: 'Predictions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Prediction', md: 'A **prediction** is a careful guess about what will happen, based on probability.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{expected number} = P(\\text{event}) \\times \\text{number of trials}'] },
      ],
      lines: [
        { say: 'A prediction is a careful guess about what will happen, based on probability.', show: 'def' },
        { say: 'To predict how many times something will happen, multiply the probability by the number of trials.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Rolling a die',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A regular die is rolled $120$ times.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(5) = \\dfrac{1}{6}', '\\dfrac{1}{6} \\times 120 = 20'] },
      ],
      lines: [
        { say: 'A regular die is rolled 120 times. About how many times should a five come up?', show: 'q' },
        { say: 'The theoretical probability of a five is one out of six.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply by the number of trials: one sixth of 120 is twenty. Expect about twenty fives.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Ordering cups',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'The coffee shop expects $500$ customers on Saturday. From its records, $P(\\text{large}) = 26\\%$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['26\\% = 0.26', '0.26 \\times 500 = 130'] },
      ],
      lines: [
        { say: 'The coffee shop from part two expects 500 customers on Saturday. About how many will order a large?', show: 'q' },
        { say: 'There is no theory for coffee orders, so use the experimental probability from the records: 26 percent, or 0.26.', show: 'm.0', focus: 'm.0' },
        { say: '0.26 times 500 is 130. The shop should plan for about 130 large drinks, and order a few extra cups to be safe.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Not a promise',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A prediction is not a promise', md: '"About $20$ fives" does not mean exactly $20$. Real results go up and down a little. That is why we say **about**.' }],
      lines: [
        { say: 'A common mistake is to treat a prediction as a promise. About twenty fives does not mean exactly twenty. Real results go up and down a little: you might get eighteen, or 23. That is why we say about.', show: 'oops' },
      ],
    },
    {
      chapter: 'Planning staff',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'In this example, a clinic’s records show that $15\\%$ of patients need an X-ray. The clinic expects $80$ patients tomorrow.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.15 \\times 80 = 12'] },
      ],
      lines: [
        { say: 'Here is one more. In this example, a clinic’s records show that fifteen percent of patients need an X-ray. The clinic expects 80 patients tomorrow. About how many X-rays should it plan for?', show: 'q' },
        { say: '0.15 times 80 is twelve. Plan for about twelve X-rays, and schedule the staff to match.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The coffee shop’s records show $P(\\text{small}) = 23\\%$. About how many of $300$ customers will order a small?',
          choices: ['about $69$', 'about $23$', 'about $230$', 'about $75$'],
          answer: 0,
          working: '$0.23 \\times 300 = 69$. B is the percent, C multiplies by $10$, and D assumes the four sizes are equally likely.',
        },
      ],
      lines: [
        { say: 'Your turn. The coffee shop’s records show the probability of a small is 23 percent. About how many of 300 customers will order a small? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 0.23 times 300 is 69, so about 69 smalls. B is just the percent, and D assumes the four sizes are equally likely.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Expected number = probability × number of trials.', 'Use theory or real records for the probability.', 'A prediction is about, not exact.'] }],
      lines: [
        { say: 'Let’s sum up. The expected number is the probability times the number of trials.', show: 'sum.0' },
        { say: 'Use the theoretical probability, or the experimental probability from real records.', show: 'sum.1' },
        { say: 'And a prediction is about, not exact. In part four, we compare predictions with real results. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
