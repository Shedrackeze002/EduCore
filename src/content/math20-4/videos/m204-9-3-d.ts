import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-9-3-d',
  lessonId: 'm204-9-3',
  title: 'Probability, Part 4: Comparing Predictions with Results',
  thumbnailTitle: 'Predictions and Results',
  thumbnail: 't',
  summary: 'Comparing 120 real rolls of a die with the prediction of 20 of each number: 24 fours (4 more than predicted, 20% against the theoretical 16.7%), and why small differences like this are normal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.3 · Part 4', title: 'Predictions and Results', subtitle: 'Close, not exact' }],
      lines: [
        { say: 'You made a prediction. Then you ran the test. How close did it come, and is the difference a problem?', show: 'title' },
        { say: 'In this video, you will compare real results with a prediction.' },
      ],
    },
    {
      chapter: 'Real rolls',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Number rolled', '$1$', '$2$', '$3$', '$4$', '$5$', '$6$'], rows: [['Times', '$18$', '$22$', '$19$', '$24$', '$17$', '$20$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{predicted: } \\dfrac{1}{6} \\times 120 = 20', '\\text{real: } 24, \\;\\; 24 - 20 = 4 \\text{ more}'] },
      ],
      lines: [
        { say: 'Kai rolled a die 120 times. The table shows how many times each number came up. Compare the number of fours with the prediction.', show: 't' },
        { say: 'The prediction for each number is one sixth of 120: twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'Four came up 24 times. That is 24 minus twenty: four more than predicted.', show: 'm.1', focus: ['t', 'm.1'] },
      ],
    },
    {
      chapter: 'As percents',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{experimental: } \\dfrac{24}{120} = 0.2 = 20\\%', '\\text{theoretical: } \\dfrac{1}{6} \\approx 0.167 = 16.7\\%'] }],
      lines: [
        { say: 'You can also compare the probabilities. The experimental probability of a four was 24 out of 120: 0.2, or twenty percent.', show: 'm.0', focus: 'm.0' },
        { say: 'The theoretical probability is one sixth: about 16.7 percent.', show: 'm.1', focus: 'm.1' },
        { say: 'So the real result was a little higher than the theory. Is the die unfair? Probably not.' },
      ],
    },
    {
      chapter: 'Is that normal?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Close, not exact', md: 'Real results are usually **close** to the prediction, but not exactly the same. In $120$ rolls, every number came up between $17$ and $24$ times: all near $20$. With more rolls, the results usually get closer.' }],
      lines: [
        { say: 'Look at the whole table. In 120 rolls, every number came up between seventeen and 24 times: all near twenty. Being four more than predicted is normal for 120 rolls.', show: 'tip' },
        { say: 'If a four came up sixty times, that would be a sign that something was wrong with the die. And with more rolls, the results usually get closer to the theory, as we saw in part two.' },
      ],
    },
    {
      chapter: 'A fair coin?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['10 \\text{ flips: } 7 \\text{ heads} = 70\\%', '1000 \\text{ flips: } 700 \\text{ heads} = 70\\%'] }],
      lines: [
        { say: 'Here is a harder question. A coin is flipped ten times and lands heads seven times: seventy percent, not fifty. Is the coin unfair?', show: 'm.0', focus: 'm.0' },
        { say: 'Probably not. With only ten flips, seven heads happens quite often by chance.', },
        { say: 'But if the coin landed heads 700 times in 1,000 flips, that would be very suspicious. With many trials, a fair coin should be close to fifty percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In Kai’s $120$ rolls, a $5$ came up $17$ times. The prediction was $20$. How does the real result compare?',
          choices: ['$3$ fewer than predicted', '$3$ more than predicted', '$17$ fewer than predicted', 'exactly as predicted'],
          answer: 0,
          working: '$20 - 17 = 3$, so $3$ fewer than predicted. That is normal for $120$ rolls.',
        },
      ],
      lines: [
        { say: 'Your turn. In Kai’s 120 rolls, a five came up seventeen times. The prediction was twenty. How does the real result compare? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twenty minus seventeen is three, so three fewer than predicted. That is normal for 120 rolls: close, but not exact.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Compare the real count with the predicted count.', 'Or compare experimental and theoretical percents.', 'Small differences are normal; more trials get closer.'] }],
      lines: [
        { say: 'Let’s sum up. Compare the real count with the predicted count.', show: 'sum.0' },
        { say: 'Or compare the experimental and theoretical probabilities as percents.', show: 'sum.1' },
        { say: 'And remember that small differences are normal, and more trials usually get closer. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
