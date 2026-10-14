import type { Explainer } from '@/video/script.ts';
import { circleGraph, marbles } from '@/video/charts.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-9-3',
  lessonId: 'm104-9-3',
  title: 'Probability, Part 1: How Likely Is It?',
  thumbnailTitle: 'How Likely Is It?',
  thumbnail: 'spin',
  summary: 'Probability from 0 (impossible) to 1 (certain), a bag with one red marble in ten, the rule P = favourable outcomes over total outcomes for marbles and a spinner, and why the bottom of the fraction counts every outcome. Part 2 covers decimals, percents and comparing chances.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 9.3 · Part 1', title: 'How Likely Is It?', subtitle: 'Probability from 0 to 1' }],
      lines: [
        { say: 'Will it snow on your day off? Will you win the door prize at the staff party? Probability is the maths of chance. It helps you decide if something is worth the risk.', show: 'title' },
        { say: 'In this video, you will describe how likely an event is, and write a probability as a fraction.' },
      ],
    },
    {
      chapter: 'From 0 to 1',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Outcome, event and probability', md: 'An **outcome** is one thing that can happen, like rolling a $4$. An **event** is the outcome or outcomes you want, like rolling an even number. **Probability** tells how likely an event is, from $0$ to $1$.' },
        figure('nl', [
          numberLine({
            min: 0,
            max: 1,
            step: 0.25,
            points: [
              { id: 'imp', value: 0, tex: '\\text{impossible}', tone: 'bad' },
              { id: 'un', value: 0.25, tex: '\\text{unlikely}', tone: 'opp' },
              { id: 'eq', value: 0.5, tex: '\\text{equally likely}', tone: 'theta' },
              { id: 'li', value: 0.75, tex: '\\text{likely}', tone: 'adj' },
              { id: 'cer', value: 1, tex: '\\text{certain}', tone: 'good' },
            ],
          }),
        ], 170),
      ],
      lines: [
        { say: 'An outcome is one thing that can happen, like rolling a four. An event is the outcome, or group of outcomes, you want, like rolling an even number. And probability tells how likely an event is.', show: 'def' },
        { say: 'Probability goes from zero to one. At zero, an event is impossible: you can never roll a seven on a regular die. At one, it is certain: you always roll a number from one to six.', show: ['nl.axis', 'nl.imp', 'nl.cer'], focus: ['nl.imp', 'nl.cer'] },
        { say: 'Everything else is in between. One half means equally likely, like a coin landing heads. Less than one half is unlikely, and more than one half is likely.', show: ['nl.un', 'nl.eq', 'nl.li'], focus: ['nl.un', 'nl.eq', 'nl.li'] },
      ],
    },
    {
      chapter: 'Picking from a bag',
      layout: 'split',
      leftWidth: 560,
      left: [figure('bag', [marbles({ groups: [{ id: 'red', count: 1, tone: 'bad' }, { id: 'green', count: 9, tone: 'good' }], perRow: 5 })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 \\text{ red out of } 10', '\\text{less than half: unlikely}'] }],
      lines: [
        { say: 'A bag has nine green marbles and one red marble. Owen picks one without looking. How likely is it that he picks red?', show: 'bag' },
        { say: 'Only one of the ten marbles is red. That is much less than half, so picking red is unlikely. Picking green is likely.', show: ['m.0', 'm.1'], focus: ['bag.red', 'm.1'] },
      ],
    },
    {
      chapter: 'Probability as a fraction',
      layout: 'split',
      leftWidth: 560,
      left: [figure('bag2', [marbles({ groups: [{ id: 'red', count: 3, tone: 'bad' }, { id: 'blue', count: 5, tone: 'adj' }, { id: 'green', count: 2, tone: 'good' }], perRow: 5 })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Probability of an event', md: '$P(\\text{event}) = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}$, when every outcome has the same chance.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 + 5 + 2 = 10', 'P(\\text{red}) = \\dfrac{3}{10}'] },
      ],
      lines: [
        { say: 'When every outcome has the same chance, the probability of an event is the number of favourable outcomes, over the total number of outcomes. A favourable outcome is one that fits the event.', show: 'def' },
        { say: 'A bag has three red, five blue and two green marbles. What is the probability of picking red?', show: 'bag2' },
        { say: 'There are three favourable outcomes: the three red marbles.', focus: 'bag2.red' },
        { say: 'The total is three plus five plus two: ten marbles. So the probability of red is three tenths.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'A spinner',
      layout: 'split',
      leftWidth: 560,
      left: [figure('spin', [circleGraph({ slices: [1, 2, 3, 4, 5].map((k) => ({ label: String(k), value: 1 })), namesOnly: true })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{favourable: } 4, 5', 'P(\\text{greater than } 3) = \\dfrac{2}{5}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The wrong bottom number', md: 'The bottom counts **all** the outcomes. For the bag, $P(\\text{red})$ is $\\dfrac{3}{10}$, not $\\dfrac{3}{7}$.' },
      ],
      lines: [
        { say: 'This spinner has five equal sections, numbered one to five. What is the probability of spinning a number greater than three?', show: 'spin' },
        { say: 'The favourable outcomes are four and five: two outcomes. The total is five sections. So the probability is two fifths.', show: ['m.0', 'm.1'], focus: ['spin.s3', 'spin.s4', 'm.1'] },
        { say: 'The bottom of the fraction is all the outcomes. For the bag of marbles, the probability of red is three tenths, not three sevenths. The seven only counts the marbles that are not red.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box has $4$ cherry, $7$ lemon and $9$ lime candies. What is the probability of picking lemon?',
          choices: ['$\\dfrac{7}{20}$', '$\\dfrac{7}{13}$', '$\\dfrac{7}{9}$', '$\\dfrac{13}{20}$'],
          answer: 0,
          working: 'Total: $4 + 7 + 9 = 20$. Favourable: $7$. $P(\\text{lemon}) = \\dfrac{7}{20}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box has four cherry, seven lemon and nine lime candies. What is the probability of picking lemon? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The total is four plus seven plus nine: twenty candies, and seven are lemon. So the probability is seven twentieths. B puts only the other candies on the bottom.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Probability goes from $0$ (impossible) to $1$ (certain).', '$P(\\text{event}) = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}$', 'The bottom counts all the outcomes.'] }],
      lines: [
        { say: 'Let’s sum up. Probability goes from zero, impossible, to one, certain.', show: 'sum.0' },
        { say: 'The probability of an event is the favourable outcomes over the total outcomes.', show: 'sum.1' },
        { say: 'And the bottom of the fraction counts all the outcomes. In part two, we turn probabilities into percents, and compare chances. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
