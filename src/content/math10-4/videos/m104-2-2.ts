import type { Explainer } from '@/video/script.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-2-2',
  lessonId: 'm104-2-2',
  title: 'A Fraction of an Amount',
  thumbnailTitle: 'A Fraction of an Amount',
  thumbnail: 'pail',
  summary: 'Finding a fraction of an amount in two steps (divide by the denominator, then multiply by the numerator) for paint, hours and flour, checking that the answer makes sense, and telling a fraction of the full amount from a fraction of what is left.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 2.2', title: 'A Fraction of an Amount', subtitle: 'Divide, then multiply' }],
      lines: [
        { say: '“Use three quarters of the pail.” “Two thirds of your shift is on the till.” At work, you often need a fraction of an amount.', show: 'title' },
        { say: 'In this video, you will use a simple two-step method that works every time.' },
      ],
    },
    {
      chapter: 'Divide, then multiply',
      layout: 'center',
      main: [
        figure('pail', [strip({ parts: 4, shaded: 3, pieces: '5\\text{ L}', label: '20\\text{ L}' })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['20 \\div 4 = 5\\text{ L}', '3 \\times 5 = 15\\text{ L}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the wrong number', md: 'Divide by the **bottom** number first: $20 \\div 4$, not $20 \\div 3$.' },
      ],
      lines: [
        { say: 'Three quarters of twenty litres means: cut the twenty litres into four equal parts, then take three of those parts.', show: ['pail.frame', 'pail.label'] },
        { say: 'Aiyana has a twenty-litre pail of paint, and uses three quarters of it. Step one: divide by the denominator. Twenty divided by four is five litres in each part.', show: ['pail.pieces', 'm.0'], focus: 'm.0' },
        { say: 'Step two: multiply by the numerator. Three parts is three times five: fifteen litres.', show: ['pail.shade', 'm.1'], focus: 'm.1' },
        { say: 'Always divide by the bottom number first: twenty divided by four, not twenty divided by three.', show: 'oops' },
      ],
    },
    {
      chapter: 'Time and mass',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{2}{3} \\text{ of } 9\\text{ h: } 9 \\div 3 = 3, \\; 2 \\times 3 = 6\\text{ h}', '\\tfrac{3}{8} \\text{ of } 64\\text{ kg: } 64 \\div 8 = 8, \\; 3 \\times 8 = 24\\text{ kg}'] }],
      lines: [
        { say: 'The same two steps work for hours, kilograms, dollars or people. Kwame works a nine-hour shift, and spends two thirds of it at the cash register. Nine divided by three is three hours, and two times three is six hours.', show: 'm.0', focus: 'm.0' },
        { say: 'A bakery uses three eighths of a 64-kilogram sack of flour. 64 divided by eight is eight, and three times eight is 24 kilograms.', show: 'm.1', focus: 'm.1' },
        { say: 'Does that make sense? Three eighths is less than half, and half of 64 is 32. 24 is less than that, so it does.' },
      ],
    },
    {
      chapter: 'What is left?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{rent: } 480 \\div 4 = 120, \\; 480 - 120 = 360', '\\text{groceries: } 360 \\div 3 = 120, \\; 360 - 120 = 240'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the wrong amount', md: '"Of what is left" means one third of **\\$360**, not of \\$480.' },
      ],
      lines: [
        { say: 'Sometimes two fractions are used, one after the other. Read carefully: is each fraction of the full amount, or of what is left?' },
        { say: 'Talia is paid 480 dollars. She spends one quarter of it on rent: 120 dollars, which leaves 360.', show: 'm.0', focus: 'm.0' },
        { say: 'Then she spends one third of what is left on groceries. One third of 360 is 120, which leaves 240 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'The words of what is left tell you to use the new amount, 360 dollars, not the 480 she started with.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A crew of $30$ workers is told that $\\dfrac{2}{5}$ of them work the night shift. How many work nights?',
          choices: ['$12$', '$15$', '$6$', '$75$'],
          answer: 0,
          working: 'One part: $30 \\div 5 = 6$. Two parts: $2 \\times 6 = 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two fifths of a crew of thirty workers work the night shift. How many work nights? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Thirty divided by five is six, and two times six is twelve. C stops after the first step.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Divide by the denominator, then multiply by the numerator.', 'A fraction less than $1$ gives less than the whole amount.', 'Of the full amount, or of what is left?'] }],
      lines: [
        { say: 'Let’s sum up. To find a fraction of an amount, divide by the denominator, then multiply by the numerator.', show: 'sum.0' },
        { say: 'A fraction less than one always gives less than the whole amount.', show: 'sum.1' },
        { say: 'And for two steps, decide whether each fraction is of the full amount, or of what is left. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
