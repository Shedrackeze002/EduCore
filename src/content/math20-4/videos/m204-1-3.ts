import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-1-3',
  lessonId: 'm204-1-3',
  title: 'Ratios, Rates and Proportions, Part 1: Ratios',
  thumbnailTitle: 'Ratios',
  thumbnail: 'bg',
  summary: 'What a ratio is, writing 12 cashiers to 18 clerks in simplest form (2 : 3), why the order matters, simplifying by a common factor, and comparing a part with the whole (2 : 5).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.3 · Part 1', title: 'Ratios', subtitle: 'Comparing amounts of the same kind' }],
      lines: [
        { say: 'Concrete, two-stroke fuel and frozen juice all come with mixing instructions like one to two to three, or fifty to one. Get the mix wrong, and the concrete cracks, the engine seizes, or the juice tastes like water.', show: 'title' },
        { say: 'In this video, you will write ratios, and simplify them.' },
      ],
    },
    {
      chapter: 'What a ratio is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ratio', md: 'Compares two amounts of the **same kind**. The ratio $2 : 3$ is read “2 to 3”. It can also be written as the fraction $\\tfrac23$.' },
        { kind: 'callout', id: 'simp', tone: 'definition', title: 'Simplest form', md: 'No number except $1$ divides into both terms. To simplify, **divide both terms** by the same number, just like simplifying a fraction.' },
      ],
      lines: [
        { say: 'A ratio compares two amounts of the same kind, such as people and people, or buckets and buckets. The ratio two to three can also be written as the fraction two thirds.', show: 'def' },
        { say: 'A ratio is in simplest form when no number except one divides into both terms. To simplify, divide both terms by the same number, just like simplifying a fraction.', show: 'simp' },
      ],
    },
    {
      chapter: 'Cashiers to clerks',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bg', [barGraph({ categories: ['Cashiers', 'Clerks'], values: [12, 18], max: 20, step: 2, height: 4, titles: { y: 'Workers' } })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['12 : 18', '12 \\div 6 = 2, \\quad 18 \\div 6 = 3', '2 : 3'] }],
      lines: [
        { say: 'A grocery store has twelve cashiers and eighteen stock clerks. What is the ratio of cashiers to clerks, in simplest form?', show: ['bg.scale', 'bg.b0', 'bg.b1', 'bg.v0', 'bg.v1'] },
        { say: 'Write the ratio in the order asked: cashiers first, twelve to eighteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Both numbers divide by six: twelve divided by six is two, and eighteen divided by six is three.', show: 'm.1', focus: 'm.1' },
        { say: 'So the ratio is two to three. For every two cashiers, there are three clerks.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The order matters',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The order matters', md: '“Cashiers to clerks” is $2 : 3$. “Clerks to cashiers” is $3 : 2$. Always write the terms in the order the question names them.' }],
      lines: [
        { say: 'A common mistake is to mix up the order. Cashiers to clerks is two to three, but clerks to cashiers is three to two. Always write the terms in the order the question names them.', show: 'oops' },
      ],
    },
    {
      chapter: 'A part and the whole',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['12 + 18 = 30 \\text{ workers}', '12 : 30 = 2 : 5', '15 : 25 = 3 : 5'] }],
      lines: [
        { say: 'A ratio can also compare a part with the whole. The store has twelve plus eighteen, thirty workers in all.', show: 'm.0', focus: 'm.0' },
        { say: 'Cashiers to all workers is twelve to thirty. Both divide by six, so it is two to five: two out of every five workers are cashiers.', show: 'm.1', focus: 'm.1' },
        { say: 'If you do not see the biggest number that divides both, divide in steps. For fifteen to 25, both divide by five, which gives three to five, in simplest form.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A crew has $15$ carpenters and $10$ labourers. What is the ratio of labourers to carpenters, in simplest form?',
          choices: ['$2 : 3$', '$3 : 2$', '$10 : 15$', '$2 : 5$'],
          answer: 0,
          working: 'Labourers first: $10 : 15$. Both divide by $5$: $2 : 3$. B has the terms in the wrong order, and C is not in simplest form.',
        },
      ],
      lines: [
        { say: 'Your turn. A crew has fifteen carpenters and ten labourers. What is the ratio of labourers to carpenters, in simplest form? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Labourers come first: ten to fifteen. Both divide by five, which gives two to three. B has the terms in the wrong order, and C is not in simplest form.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A ratio compares amounts of the same kind.', 'Keep the order the question names.', 'Simplify by dividing both terms by the same number.'] }],
      lines: [
        { say: 'Let’s sum up. A ratio compares amounts of the same kind.', show: 'sum.0' },
        { say: 'Keep the terms in the order the question names them.', show: 'sum.1' },
        { say: 'And simplify by dividing both terms by the same number. In part two, we look at rates and unit rates. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
