import type { Explainer } from '@/video/script.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-2-1',
  lessonId: 'm104-2-1',
  title: 'Fractions, Part 1: Parts of a Whole',
  thumbnailTitle: 'What Fractions Mean',
  thumbnail: 'eq',
  summary: 'The numerator and denominator of a fraction, mixed numbers like 2½, and equivalent fractions made by multiplying or dividing the top and bottom by the same number. Part 2 covers lowest terms and comparing fractions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 2.1 · Part 1', title: 'What Fractions Mean', subtitle: 'Parts of a whole' }],
      lines: [
        { say: 'A mechanic picks a nine-sixteenths-inch wrench. A cook measures three quarters of a cup of milk. Fractions are part of many jobs.', show: 'title' },
        { say: 'In this video, you will learn what a fraction means, and how to write the same amount in different ways.' },
      ],
    },
    {
      chapter: 'Numerator and denominator',
      layout: 'center',
      main: [
        figure('s', [strip({ parts: 4, shaded: 3, label: '\\dfrac{3}{4}' })], 200),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Numerator and denominator', md: 'The **denominator** (bottom) is how many equal parts the whole is cut into. The **numerator** (top) is how many of those parts you have.' },
      ],
      lines: [
        { say: 'A fraction names part of a whole, cut into equal parts. This strip is cut into four equal parts.', show: 's.frame' },
        { say: 'Three parts are shaded, so the shaded part is three quarters of the strip.', show: ['s.shade', 's.label'] },
        { say: 'The bottom number is the denominator: how many equal parts the whole is cut into. The top number is the numerator: how many of those parts you have.', show: 'def' },
        { say: 'A pizza is cut into eight equal slices, and Amara eats three. The denominator is eight and the numerator is three: she eats three eighths of the pizza.' },
      ],
    },
    {
      chapter: 'Mixed numbers',
      layout: 'center',
      main: [
        figure('mx', [strip({ name: 'a', parts: 2, shaded: 2 }), strip({ name: 'b', parts: 2, shaded: 2, at: [13, 0] }), strip({ name: 'c', parts: 2, shaded: 1, at: [26, 0] })], 140),
        { kind: 'math', id: 'm', lines: ['2\\tfrac{1}{2} = 2 + \\tfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Measurements often have a whole number and a fraction together. A carpenter cuts a board two and a half feet long.', show: ['mx.a-frame', 'mx.a-shade', 'mx.b-frame', 'mx.b-shade', 'mx.c-frame', 'mx.c-shade'] },
        { say: 'Two and a half is a mixed number. It means two wholes, plus one half of another whole.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Equivalent fractions',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('eq', [
          strip({ name: 'h', parts: 2, shaded: 1, at: [0, 4], label: '\\dfrac{1}{2}' }),
          strip({ name: 'q', parts: 4, shaded: 2, at: [0, 2], label: '\\dfrac{2}{4}' }),
          strip({ name: 'e', parts: 8, shaded: 4, at: [0, 0], label: '\\dfrac{4}{8}' }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}', '\\dfrac{12}{16} = \\dfrac{12 \\div 4}{16 \\div 4} = \\dfrac{3}{4}'] }],
      lines: [
        { say: 'These strips are all the same size. The top shows one half, the middle two quarters, and the bottom four eighths. The same amount is shaded in each.', show: ['eq.h-frame', 'eq.h-shade', 'eq.h-label', 'eq.q-frame', 'eq.q-shade', 'eq.q-label', 'eq.e-frame', 'eq.e-shade', 'eq.e-label'] },
        { say: 'They are equivalent fractions: they name the same amount. To make one, multiply or divide the numerator and the denominator by the same number.' },
        { say: 'Three quarters equals how many eighths? The bottom changed from four to eight: times two. Do the same to the top: six eighths.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve sixteenths equals three over what? The top changed from twelve to three: divided by four. Do the same to the bottom: three quarters.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Multiply, do not add',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding instead of multiplying', md: '$\\dfrac{3}{4}$ is **not** equal to $\\dfrac{5}{6}$. Adding $2$ to the top and bottom changes the amount. Only multiplying or dividing both by the same number keeps it the same.' }],
      lines: [
        { say: 'Three quarters is not equal to five sixths. Adding two to the top and the bottom changes the amount.', show: 'oops' },
        { say: 'Only multiplying or dividing both parts by the same number keeps the amount the same.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Fill in the missing number: $\\dfrac{2}{3} = \\dfrac{?}{12}$',
          choices: ['$8$', '$11$', '$6$', '$4$'],
          answer: 0,
          working: 'The bottom changed from $3$ to $12$, which is $\\times 4$. Do the same to the top: $2 \\times 4 = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two thirds equals how many twelfths? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The bottom changed from three to twelve: times four. Do the same to the top: two times four is eight. B adds nine to both, which changes the amount.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Denominator: how many equal parts. Numerator: how many you have.', 'A mixed number is wholes plus a fraction.', 'Equivalent fractions: multiply or divide the top and bottom by the same number.'] }],
      lines: [
        { say: 'Let’s sum up. The denominator is how many equal parts make the whole, and the numerator is how many parts you have.', show: 'sum.0' },
        { say: 'A mixed number is wholes plus a fraction.', show: 'sum.1' },
        { say: 'And equivalent fractions name the same amount: multiply or divide the top and the bottom by the same number. In part two, we write fractions in lowest terms, and compare them. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
