import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-4-2',
  lessonId: 'm103-4-2',
  title: 'Working with Fractional Measurements, Part 1: Adding and Subtracting Inches',
  thumbnailTitle: 'Adding Fractions of an Inch',
  summary: 'Mixed numbers and common denominators for ruler fractions, adding inches and regrouping, and subtracting by borrowing one inch as sixteen sixteenths. Part 2 covers the saw kerf and feet and inches.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 4.2 · Part 1', title: 'Adding and Subtracting Inches', subtitle: 'Fractions on the job' }],
      lines: [
        { say: 'A carpenter who can add three and five eighths inches to two and three sixteenths without a calculator works faster, and wastes less wood.', show: 'title' },
        { say: 'In this video, you will add and subtract fractional measurements. In part two, you will allow for saw cuts, and work in feet and inches.' },
      ],
    },
    {
      chapter: 'Common denominators',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mixed number', md: 'A whole-number part and a fraction part, such as $5\\tfrac{13}{16}$, which means $5 + \\tfrac{13}{16}$.' },
        { kind: 'math', id: 'm', lines: ['\\tfrac12 = \\tfrac24 = \\tfrac48 = \\tfrac{8}{16}', '\\tfrac34 = \\tfrac68 = \\tfrac{12}{16}'] },
      ],
      lines: [
        { say: 'Measurements in inches are usually written as mixed numbers, with a whole-number part and a fraction part.', show: 'def' },
        { say: 'To add or subtract fractions, you need a common denominator. Ruler fractions have denominators of two, four, eight or sixteen, and each divides evenly into the next.', show: 'm.0', focus: 'm.0' },
        { say: 'So the common denominator is simply the largest denominator in the question. Three quarters, for example, is six eighths, or twelve sixteenths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Adding',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['3\\tfrac58 + 2\\tfrac{3}{16} = 3\\tfrac{10}{16} + 2\\tfrac{3}{16} = 5\\tfrac{13}{16}\\text{ in}', '4\\tfrac34 + 2\\tfrac{7}{16} = 4\\tfrac{12}{16} + 2\\tfrac{7}{16} = 6\\tfrac{19}{16}', '6\\tfrac{19}{16} = 6 + 1\\tfrac{3}{16} = 7\\tfrac{3}{16}\\text{ in}'] },
      ],
      lines: [
        { say: 'A carpenter joins a three and five eighths inch piece of trim to a two and three sixteenths inch piece. Five eighths is ten sixteenths. Add the whole numbers, then the fractions: five and thirteen sixteenths inches.', show: 'm.0', focus: 'm.0' },
        { say: 'A plumber joins a four and three quarter inch pipe nipple to a two and seven sixteenths inch fitting. Three quarters is twelve sixteenths, and the sum is six and nineteen sixteenths.', show: 'm.1', focus: 'm.1' },
        { say: 'But nineteen sixteenths is more than one: it is one and three sixteenths. Regroup it as a whole inch: seven and three sixteenths inches.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Subtracting and borrowing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['6\\tfrac14 - 2\\tfrac{7}{16} = 6\\tfrac{4}{16} - 2\\tfrac{7}{16}', '6\\tfrac{4}{16} = 5 + \\tfrac{16}{16} + \\tfrac{4}{16} = 5\\tfrac{20}{16}', '5\\tfrac{20}{16} - 2\\tfrac{7}{16} = 3\\tfrac{13}{16}\\text{ in}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Borrowing 10 instead of 16', md: 'One inch is $\\tfrac{16}{16}$, not $10$ of anything: $6\\tfrac{4}{16}$ becomes $5\\tfrac{20}{16}$, not $5\\tfrac{14}{16}$.' },
      ],
      lines: [
        { say: 'A welder has a piece of flat bar six and a quarter inches long, and cuts off two and seven sixteenths. One quarter is four sixteenths.', show: 'm.0', focus: 'm.0' },
        { say: 'You cannot take seven sixteenths from four sixteenths, so borrow one whole inch, and write it as sixteen sixteenths. Six and four sixteenths becomes five and twenty sixteenths.', show: 'm.1', focus: 'm.1' },
        { say: 'Now subtract: three and thirteen sixteenths inches are left.', show: 'm.2', focus: 'm.2' },
        { say: 'When you borrow an inch, it is sixteen sixteenths, not ten of anything.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $5\\tfrac38 - 1\\tfrac{11}{16}$ in.',
          choices: ['$3\\tfrac{11}{16}$ in', '$4\\tfrac{5}{16}$ in', '$3\\tfrac{5}{16}$ in', '$4\\tfrac{11}{16}$ in'],
          answer: 0,
          working: '$5\\tfrac38 = 5\\tfrac{6}{16} = 4\\tfrac{22}{16}$, and $4\\tfrac{22}{16} - 1\\tfrac{11}{16} = 3\\tfrac{11}{16}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find five and three eighths, minus one and eleven sixteenths inches. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three eighths is six sixteenths. Borrow an inch: four and 22 sixteenths. Subtract: three and eleven sixteenths inches.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use the largest denominator as the common denominator.', 'Add whole numbers and fractions separately, then regroup.', 'To borrow, write one inch as $\\tfrac{16}{16}$.'] }],
      lines: [
        { say: 'Let’s sum up. Use the largest denominator as the common denominator.', show: 'sum.0' },
        { say: 'Add the whole numbers and the fractions separately, then regroup.', show: 'sum.1' },
        { say: 'And to borrow, write one inch as sixteen sixteenths. In part two, we allow for saw cuts, and work in feet and inches. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
