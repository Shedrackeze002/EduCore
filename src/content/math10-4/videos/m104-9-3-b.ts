import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-9-3-b',
  lessonId: 'm104-9-3',
  title: 'Probability, Part 2: Percents and Comparing Chances',
  thumbnailTitle: 'Percents and Comparing Chances',
  thumbnail: 'ab',
  summary: 'Turning a probability into a decimal and a percent (a heart from a deck of cards, a food bank raffle), the probability of not picking red, and comparing two bags of marbles by their probabilities rather than their counts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 9.3 · Part 2', title: 'Percents and Chances', subtitle: 'Which chance is better?' }],
      lines: [
        { say: 'A weather app says there is a thirty percent chance of rain. A raffle says one in forty. Which is more likely? Percents make chances easy to compare.', show: 'title' },
        { say: 'In this video, you will write a probability as a decimal and a percent, and compare two chances.' },
      ],
    },
    {
      chapter: 'Decimals and percents',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('deck', [
          strip({ parts: 4, shaded: 1, tone: 'bad', pieces: '13' }),
          { points: { 'title-at': [6, 1.6] }, items: [{ kind: 'label', id: 'title', at: 'title-at', tex: '\\text{52 cards: 4 suits of 13}', place: 'above' }] },
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{heart}) = \\dfrac{13}{52}', '13 \\div 52 = 0.25', '0.25 \\times 100 = 25\\%'] }],
      lines: [
        { say: 'To change a probability to a decimal, divide the top by the bottom. To change the decimal to a percent, multiply by 100.' },
        { say: 'A standard deck has 52 cards in four suits: hearts, diamonds, clubs and spades. Each suit has thirteen cards. What is the probability of picking a heart?', show: 'deck' },
        { say: 'Thirteen of the 52 cards are hearts, so the probability is thirteen over 52.', show: 'm.0', focus: ['deck.shade', 'm.0'] },
        { say: 'Divide: thirteen divided by 52 is 0.25. Multiply by 100: 25 percent. That makes sense, because hearts are one of four equal suits: one quarter of the deck.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'A raffle',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{win}) = \\dfrac{5}{200}', '5 \\div 200 = 0.025', '0.025 \\times 100 = 2.5\\%'] }],
      lines: [
        { say: 'A raffle for the food bank sold 200 tickets, and Kiona bought five. What is her chance of winning, as a percent?', show: 'm.0', focus: 'm.0' },
        { say: 'Five divided by 200 is 0.025. Multiply by 100: Kiona has a 2.5 percent chance of winning.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Check: one ticket in 200 is half of one percent, so five tickets is five halves: 2.5 percent.' },
      ],
    },
    {
      chapter: 'Not red',
      layout: 'split',
      leftWidth: 560,
      left: [figure('bag', [marbles({ groups: [{ id: 'red', count: 4, tone: 'bad' }, { id: 'blue', count: 6, tone: 'adj' }, { id: 'yellow', count: 5, tone: 'theta' }], perRow: 5 })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 + 6 + 5 = 15', '15 - 4 = 11', 'P(\\text{not red}) = \\dfrac{11}{15}'] }],
      lines: [
        { say: 'A bag has four red, six blue and five yellow marbles. What is the probability of not picking red?', show: 'bag' },
        { say: 'The total is four plus six plus five: fifteen marbles.', show: 'm.0', focus: 'm.0' },
        { say: 'The marbles that are not red are fifteen minus four: eleven. So the probability of not red is eleven fifteenths.', show: ['m.1', 'm.2'], focus: ['bag.blue', 'bag.yellow', 'm.2'] },
        { say: 'Notice that red and not red together make the whole bag: four fifteenths plus eleven fifteenths is one.' },
      ],
    },
    {
      chapter: 'Which bag is better?',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('ab', [
          marbles({ name: 'a', groups: [{ id: 'red', count: 3, tone: 'bad' }, { id: 'other', count: 7, tone: 'muted' }], perRow: 5, at: [0, 0] }),
          marbles({ name: 'b', groups: [{ id: 'red', count: 5, tone: 'bad' }, { id: 'other', count: 15, tone: 'muted' }], perRow: 5, at: [7, 0] }),
          { points: { 'a-at': [2, 0.7], 'b-at': [9, 0.7] }, items: [{ kind: 'label', id: 'a-name', at: 'a-at', tex: '\\text{Bag A}', place: 'above' }, { kind: 'label', id: 'b-name', at: 'b-at', tex: '\\text{Bag B}', place: 'above' }] },
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{A: } \\dfrac{3}{10} = 30\\%', '\\text{B: } \\dfrac{5}{20} = 25\\%'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'More is not always better', md: 'Bag B has more red marbles, but more marbles in all. Compare the **probabilities**, not the counts.' },
      ],
      lines: [
        { say: 'Bag A has ten marbles, and three are red. Bag B has twenty marbles, and five are red. Which bag gives a better chance of red?', show: 'ab' },
        { say: 'Bag A: three tenths, which is thirty percent.', show: 'm.0', focus: ['ab.a-red', 'm.0'] },
        { say: 'Bag B: five twentieths, which is 25 percent. So bag A gives the better chance.', show: 'm.1', focus: ['ab.b-red', 'm.1'] },
        { say: 'Bag B has more red marbles, but it also has more marbles in all. Compare the probabilities, not just the counts.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Bag C has $8$ marbles and $2$ are red. Bag D has $12$ marbles and $4$ are red. Which bag gives the better chance of red?',
          choices: ['Bag D', 'Bag C', 'They are the same', 'You cannot tell'],
          answer: 0,
          working: 'Bag C: $\\dfrac{2}{8} = 25\\%$. Bag D: $\\dfrac{4}{12} \\approx 33.3\\%$. Bag D is better.',
        },
      ],
      lines: [
        { say: 'Your turn. Bag C has eight marbles, and two are red. Bag D has twelve marbles, and four are red. Which bag gives the better chance of red? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Bag C is two eighths, 25 percent. Bag D is four twelfths, about 33.3 percent. So bag D gives the better chance.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Divide for a decimal; multiply by $100$ for a percent.', '$P(\\text{not A})$: count the outcomes that are not A, then divide by the total.', 'Compare chances by their probabilities, not their counts.'] }],
      lines: [
        { say: 'Let’s sum up. Divide the top by the bottom to get a decimal, and multiply by 100 to get a percent.', show: 'sum.0' },
        { say: 'For the probability of not A, count the outcomes that are not A, then divide by the total.', show: 'sum.1' },
        { say: 'And compare chances by their probabilities, not their counts. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
