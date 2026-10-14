import type { Explainer } from '@/video/script.ts';
import { circleGraph, marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-9-3',
  lessonId: 'm204-9-3',
  title: 'Probability, Part 1: Theoretical Probability',
  thumbnailTitle: 'Theoretical Probability',
  thumbnail: 'sp',
  summary: 'Theoretical probability as favourable outcomes over total outcomes, a spinner with 4 equal sections (P(3 or 4) = 2/4 = 1/2, or 50%), and probability as a fraction, a decimal or a percent from 0 to 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.3 · Part 1', title: 'Theoretical Probability', subtitle: 'What should happen' }],
      lines: [
        { say: 'A coffee shop has to guess how many large cups to order. An insurance company has to guess how many claims it will get. Both use probability to predict what will happen.', show: 'title' },
        { say: 'In this video, you will find a theoretical probability: what should happen.' },
      ],
    },
    {
      chapter: 'Theoretical probability',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theoretical probability', md: '**Theoretical probability** is what *should* happen, worked out by thinking about the equally likely outcomes.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['P(\\text{event}) = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}'] },
      ],
      lines: [
        { say: 'Theoretical probability is what should happen, worked out by thinking about the outcomes that are equally likely.', show: 'def' },
        { say: 'P of an event is the number of favourable outcomes, the ones you want, divided by the total number of outcomes.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'A spinner',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sp', [circleGraph({ slices: [{ label: '1', value: 1 }, { label: '2', value: 1 }, { label: '3', value: 1 }, { label: '4', value: 1 }], namesOnly: true })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{favourable: } 3, 4 \\to 2', '\\text{total: } 4', 'P(3 \\text{ or } 4) = \\dfrac{2}{4} = \\dfrac{1}{2} = 50\\%'] }],
      lines: [
        { say: 'This spinner has four equal sections, numbered one to four. What is the theoretical probability of spinning a three or a four?', show: 'sp' },
        { say: 'The favourable outcomes are three and four: two outcomes.', show: 'm.0', focus: ['sp.s2', 'sp.s3', 'm.0'] },
        { say: 'There are four outcomes in all, and they are equally likely, because the sections are the same size.', show: 'm.1', focus: 'm.1' },
        { say: 'So P of three or four is two out of four, which is one half, or fifty percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'From 0 to 1',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Probability is between 0 and 1', md: 'A probability can be a fraction, a decimal or a percent: $\\dfrac{1}{2} = 0.5 = 50\\%$. A probability of $0$ means **impossible**, and $1$ ($100\\%$) means **certain**.' }],
      lines: [
        { say: 'A probability can be written as a fraction, a decimal or a percent: one half, 0.5, and fifty percent all mean the same thing.', show: 'tip' },
        { say: 'A probability is always between zero and one. Zero means impossible, like spinning a five on this spinner. One, or 100 percent, means certain, like spinning a number less than five.' },
      ],
    },
    {
      chapter: 'A bag of marbles',
      layout: 'split',
      leftWidth: 520,
      left: [figure('mb', [marbles({ groups: [{ id: 'r', count: 3, tone: 'bad' }, { id: 'b', count: 5, tone: 'adj' }, { id: 'g', count: 2, tone: 'good' }], perRow: 5 })], 260)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{blue}) = \\dfrac{5}{10} = \\dfrac{1}{2}', 'P(\\text{red}) = \\dfrac{3}{10} = 30\\%'] }],
      lines: [
        { say: 'A bag holds three red marbles, five blue and two green: ten marbles in all. One is picked without looking, so each marble is equally likely.', show: 'mb' },
        { say: 'Five of the ten are blue, so P of blue is five tenths, or one half.', show: 'm.0', focus: ['mb.b', 'm.0'] },
        { say: 'Three of the ten are red, so P of red is three tenths: thirty percent.', show: 'm.1', focus: ['mb.r', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A regular die is rolled once. What is the theoretical probability of rolling a number greater than $4$?',
          choices: ['$\\dfrac{1}{3}$', '$\\dfrac{1}{2}$', '$\\dfrac{2}{3}$', '$\\dfrac{1}{6}$'],
          answer: 0,
          working: 'Favourable: $5$ and $6$, so $2$. Total: $6$. $P = \\dfrac{2}{6} = \\dfrac{1}{3}$. C counts the numbers $4$ or less, and D counts only one number.',
        },
      ],
      lines: [
        { say: 'Your turn. A regular die is rolled once. What is the theoretical probability of rolling a number greater than four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The favourable outcomes are five and six: two out of six, which is one third. C counts the numbers four or less, and D counts only one number.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Theoretical probability: what should happen.', 'P = favourable outcomes ÷ total outcomes.', '0 is impossible; 1 is certain.'] }],
      lines: [
        { say: 'Let’s sum up. Theoretical probability is what should happen.', show: 'sum.0' },
        { say: 'It is the number of favourable outcomes divided by the total number of outcomes.', show: 'sum.1' },
        { say: 'And it is always between zero, impossible, and one, certain. In part two, we find probability from real data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
