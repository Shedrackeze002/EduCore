import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-2-1-b',
  lessonId: 'm104-2-1',
  title: 'Fractions, Part 2: Lowest Terms and Comparing',
  thumbnailTitle: 'Comparing Fractions',
  thumbnail: 'nl',
  summary: 'Writing a fraction in lowest terms by dividing by the biggest number that goes into both, the right wrench for a 10/16 inch bolt, and comparing and ordering fractions and mixed numbers with a common denominator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 2.1 · Part 2', title: 'Lowest Terms and Comparing', subtitle: 'Which fraction is bigger?' }],
      lines: [
        { say: 'Which is bigger: a three-eighths-inch wrench, or a five-sixteenths-inch wrench? Bigger numbers do not always mean a bigger fraction.', show: 'title' },
        { say: 'In this video, you will write fractions in lowest terms, and compare and order them.' },
      ],
    },
    {
      chapter: 'Lowest terms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{18}{24} = \\dfrac{18 \\div 6}{24 \\div 6} = \\dfrac{3}{4}', '\\dfrac{10}{16} = \\dfrac{10 \\div 2}{16 \\div 2} = \\dfrac{5}{8}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping too soon', md: 'Dividing $\\dfrac{18}{24}$ by $2$ gives $\\dfrac{9}{12}$, but $9$ and $12$ can still both be divided by $3$. Keep going.' },
      ],
      lines: [
        { say: 'A fraction is in lowest terms when no whole number bigger than one divides both the top and the bottom. To get there, divide both by the biggest number that goes into both.' },
        { say: 'Rosa sold eighteen of the 24 raffle tickets: eighteen over 24. The biggest number that divides both is six, so she sold three quarters of the tickets.', show: 'm.0', focus: 'm.0' },
        { say: 'Dividing by two gives nine twelfths. That is equivalent, but nine and twelve can still both be divided by three. Keep going until nothing else divides both.', show: 'oops' },
        { say: 'Wrenches are labelled in lowest terms. If a bolt head measures ten sixteenths of an inch, divide both by two: you need the five-eighths-inch wrench.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Comparing fractions',
      layout: 'center',
      main: [
        figure('nl', [numberLine({ min: 0, max: 1, step: 0.0625, every: 16, length: 15, points: [{ id: 'a', value: 0.3125, tex: '\\tfrac{5}{16}', tone: 'opp', below: true }, { id: 'b', value: 0.375, tex: '\\tfrac{3}{8} = \\tfrac{6}{16}', tone: 'adj' }] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{3}{8} = \\dfrac{6}{16} > \\dfrac{5}{16}'] },
      ],
      lines: [
        { say: 'When the denominators are the same, the pieces are the same size, so the bigger numerator wins: five eighths is more than three eighths.' },
        { say: 'When the numerators are both one, think about pizza. A pizza cut into three slices has bigger slices than one cut into eight, so one third is more than one eighth.' },
        { say: 'When the denominators are different, write the fractions with the same denominator first. Change three eighths to sixteenths: six sixteenths.', show: 'm.0' },
        { say: 'Six sixteenths is more than five sixteenths, so the three-eighths-inch wrench is bigger. On this number line in sixteenths of an inch, you can see it.', show: ['nl.axis', 'nl.a', 'nl.b'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Ordering',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{3}{4} = \\tfrac{6}{8}, \\quad \\tfrac{3}{8}, \\quad \\tfrac{1}{2} = \\tfrac{4}{8}', '2\\tfrac{3}{8} < 2\\tfrac{1}{2} < 2\\tfrac{3}{4}\\text{ ft}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Whole numbers first', md: '$3\\tfrac{1}{8}$ is longer than $2\\tfrac{7}{8}$, because $3 > 2$.' },
      ],
      lines: [
        { say: 'Put these boards in order from shortest to longest: two and three quarter feet, two and three eighths, and two and a half.' },
        { say: 'The whole numbers are all two, so compare the fractions. Write them in eighths: six eighths, three eighths and four eighths.', show: 'm.0', focus: 'm.0' },
        { say: 'So the order is two and three eighths, two and a half, then two and three quarters.', show: 'm.1', focus: 'm.1' },
        { say: 'For mixed numbers, always compare the whole numbers first. Three and one eighth is longer than two and seven eighths, because three is more than two.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is bigger: $\\dfrac{3}{4}$ inch or $\\dfrac{11}{16}$ inch?',
          choices: ['$\\dfrac{3}{4}$ inch', '$\\dfrac{11}{16}$ inch', 'They are equal.', 'You cannot tell.'],
          answer: 0,
          working: '$\\dfrac{3}{4} = \\dfrac{12}{16}$, and $12 > 11$, so $\\dfrac{3}{4}$ inch is bigger.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is bigger: three quarters of an inch, or eleven sixteenths of an inch? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three quarters is twelve sixteenths, and twelve is more than eleven. B has the bigger numbers, but it is the smaller fraction.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Lowest terms: divide by the biggest number that goes into both.', 'To compare, give the fractions the same denominator.', 'For mixed numbers, compare the whole numbers first.'] }],
      lines: [
        { say: 'Let’s sum up. For lowest terms, divide the top and bottom by the biggest number that goes into both.', show: 'sum.0' },
        { say: 'To compare fractions, give them the same denominator, then compare the numerators.', show: 'sum.1' },
        { say: 'And for mixed numbers, compare the whole numbers first. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
