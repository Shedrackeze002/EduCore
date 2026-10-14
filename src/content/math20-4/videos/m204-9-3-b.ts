import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-9-3-b',
  lessonId: 'm204-9-3',
  title: 'Probability, Part 2: Experimental Probability',
  thumbnailTitle: 'Experimental Probability',
  thumbnail: 't',
  summary: 'Experimental probability from real records (52 large drinks out of 200 customers is 26%), trials, and why more trials bring the experimental probability closer to the theoretical probability.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.3 · Part 2', title: 'Experimental Probability', subtitle: 'What did happen' }],
      lines: [
        { say: 'There is no formula for how likely a customer is to order a large coffee. But the shop’s records can tell you.', show: 'title' },
        { say: 'In this video, you will find an experimental probability from real data.' },
      ],
    },
    {
      chapter: 'Experimental probability',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Experimental probability', md: '**Experimental probability** is what *did* happen in a test or in real records. Each test is called a **trial**.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['P(\\text{event}) = \\dfrac{\\text{number of times it happened}}{\\text{number of trials}}'] },
      ],
      lines: [
        { say: 'Experimental probability is what did happen, in a test or in real records. Each test is called a trial.', show: 'def' },
        { say: 'P of an event is the number of times it happened, divided by the number of trials.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Drink sizes',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Size', 'Count'], rows: [['Small', '$46$'], ['Medium', '$84$'], ['Large', '$52$'], ['Extra large', '$18$']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['46 + 84 + 52 + 18 = 200', 'P(\\text{large}) = \\dfrac{52}{200} = 0.26 = 26\\%'] }],
      lines: [
        { say: 'A coffee shop recorded the drink size for its last 200 customers. What is the experimental probability that a customer orders a large?', show: 't' },
        { say: 'Each customer is a trial. 46 plus 84 plus 52 plus eighteen is 200 trials.', show: 'm.0', focus: 'm.0' },
        { say: 'Large was ordered 52 times. So P of large is 52 out of 200, which is 0.26, or 26 percent.', show: 'm.1', focus: ['t.2', 'm.1'] },
        { say: 'About one customer in four orders a large. The shop can use that to plan.' },
        { say: 'Notice that the four sizes are not equally likely, so there is no theory to use here. Real records are the only way to find this probability.' },
      ],
    },
    {
      chapter: 'More trials, better results',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'More trials, better results', md: 'With only a few trials, results can be far from the theory. With many trials, the experimental probability usually gets close to the theoretical probability.' }],
      lines: [
        { say: 'With only a few trials, results can be far from the theory. Flip a coin four times, and you might get heads three times: 75 percent, not fifty.', show: 'tip' },
        { say: 'With many trials, the experimental probability usually gets close to the theoretical probability. Flip it a thousand times, and you will get close to fifty percent. That is why the shop used 200 customers, not just ten.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use the coffee shop data: $84$ of $200$ customers ordered a medium. What is the experimental probability of a medium?',
          choices: ['$42\\%$', '$84\\%$', '$25\\%$', '$58\\%$'],
          answer: 0,
          working: '$\\dfrac{84}{200} = 0.42 = 42\\%$. B forgets to divide by $200$, C assumes the four sizes are equally likely, and D is the percent who did not order a medium.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the coffee shop data: 84 of 200 customers ordered a medium. What is the experimental probability of a medium? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 84 out of 200 is 0.42, or 42 percent. B forgets to divide by 200, C assumes the four sizes are equally likely, and D is the percent who did not order a medium.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Experimental probability: what did happen.', 'P = times it happened ÷ number of trials.', 'More trials get closer to the theory.'] }],
      lines: [
        { say: 'Let’s sum up. Experimental probability is what did happen.', show: 'sum.0' },
        { say: 'It is the number of times an event happened, divided by the number of trials.', show: 'sum.1' },
        { say: 'And more trials usually get closer to the theoretical probability. In part three, we use probability to make predictions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
