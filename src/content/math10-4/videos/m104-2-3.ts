import type { Explainer } from '@/video/script.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-2-3',
  lessonId: 'm104-2-3',
  title: 'Adding and Subtracting Fractions, Part 1: Common Denominators',
  thumbnailTitle: 'Adding Fractions',
  thumbnail: 'add',
  summary: 'Adding and subtracting fractions with the same denominator, finding a common denominator when they differ, and writing an improper fraction like 5/4 as a mixed number. Part 2 adds and subtracts mixed numbers and measurements.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 2.3 · Part 1', title: 'Adding and Subtracting Fractions', subtitle: 'Same-size pieces first' }],
      lines: [
        { say: 'A cook adds half a cup of milk and three quarters of a cup of water. How much liquid is that?', show: 'title' },
        { say: 'In this video, you will add and subtract fractions, with the same denominator and with different ones.' },
      ],
    },
    {
      chapter: 'Same denominators',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('add', [
          strip({ name: 'a', parts: 8, shaded: 3, at: [0, 4], label: '\\dfrac{3}{8}' }),
          strip({ name: 'b', parts: 8, shaded: 2, from: 3, at: [0, 2], tone: 'opp', label: '\\dfrac{2}{8}' }),
          strip({ name: 'c', parts: 8, shaded: 5, at: [0, 0], tone: 'good', label: '\\dfrac{5}{8}' }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tfrac{3}{8} + \\tfrac{2}{8} = \\tfrac{5}{8}', '\\tfrac{7}{10} - \\tfrac{3}{10} = \\tfrac{4}{10} = \\tfrac{2}{5}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the denominators', md: '$\\tfrac{3}{8} + \\tfrac{2}{8}$ is **not** $\\tfrac{5}{16}$. The pieces are still eighths.' },
      ],
      lines: [
        { say: 'When the denominators are the same, the pieces are the same size. Add or subtract the numerators, and keep the denominator.' },
        { say: 'Hana uses three eighths of a can of paint on a door, and two eighths on the trim. Put them together: five eighths of the can.', show: ['add.a-frame', 'add.a-shade', 'add.a-label', 'add.b-frame', 'add.b-shade', 'add.b-label', 'add.c-frame', 'add.c-shade', 'add.c-label', 'm.0'], focus: 'm.0' },
        { say: 'It is not five sixteenths. The pieces are still eighths, so only the numerators are added.', show: 'oops' },
        { say: 'Seven tenths minus three tenths is four tenths. Simplify: divide the top and bottom by two, two fifths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Different denominators',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('cd', [
          strip({ name: 'h', parts: 2, shaded: 1, at: [0, 4], label: '\\dfrac{1}{2}' }),
          strip({ name: 'q', parts: 4, shaded: 2, at: [0, 2], label: '\\dfrac{2}{4}' }),
          strip({ name: 'w', parts: 4, shaded: 3, at: [0, 0], tone: 'opp', label: '\\dfrac{3}{4}' }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tfrac{1}{2} + \\tfrac{3}{4} = \\tfrac{2}{4} + \\tfrac{3}{4}', '= \\tfrac{5}{4} = 1\\tfrac{1}{4}\\text{ cups}'] }],
      lines: [
        { say: 'You cannot add halves and quarters directly: the pieces are different sizes. First, write both with a common denominator: a number both denominators divide into. For halves and quarters, use four.', show: ['cd.h-frame', 'cd.h-shade', 'cd.h-label', 'cd.w-frame', 'cd.w-shade', 'cd.w-label'] },
        { say: 'One half is the same as two quarters. Now both amounts are in quarters.', show: ['cd.q-frame', 'cd.q-shade', 'cd.q-label'], focus: ['cd.h-shade', 'cd.q-shade'] },
        { say: 'So half a cup of milk and three quarters of a cup of water are two quarters plus three quarters: five quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Five quarters is an improper fraction: its numerator is bigger than its denominator. It is four quarters, one whole, plus one more quarter: one and a quarter cups.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Thirds and quarters',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{2}{3} - \\tfrac{1}{4} = \\tfrac{8}{12} - \\tfrac{3}{12} = \\tfrac{5}{12}'] }],
      lines: [
        { say: 'For thirds and quarters, use twelve. Two thirds is eight twelfths, and one quarter is three twelfths.', show: 'm.0' },
        { say: 'So two thirds minus one quarter is eight twelfths minus three twelfths: five twelfths.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{1}{2} + \\dfrac{1}{3}$.',
          choices: ['$\\dfrac{5}{6}$', '$\\dfrac{2}{5}$', '$\\dfrac{2}{6}$', '$\\dfrac{1}{6}$'],
          answer: 0,
          working: 'Common denominator $6$: $\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find one half plus one third. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Use six: one half is three sixths and one third is two sixths, so the sum is five sixths. B adds the tops and the bottoms, which never works.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same denominators: add or subtract the numerators.', 'Different denominators: find a common denominator first.', 'An improper fraction like $\\tfrac{5}{4}$ is the mixed number $1\\tfrac{1}{4}$.'] }],
      lines: [
        { say: 'Let’s sum up. With the same denominators, add or subtract the numerators, and keep the denominator.', show: 'sum.0' },
        { say: 'With different denominators, rewrite the fractions with a common denominator first.', show: 'sum.1' },
        { say: 'And an improper fraction like five quarters can be written as a mixed number: one and a quarter. In part two, we add and subtract mixed numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
