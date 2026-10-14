import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-1-c',
  lessonId: 'm204-1-1',
  title: 'Integers and the Order of Operations, Part 3: Integers at Work and at Home',
  thumbnailTitle: 'Integers at Work and Home',
  thumbnail: 't',
  summary: 'The mean of negative temperatures (five overnight lows in Fort McMurray average −10°C), checking that a mean makes sense, and tracking a loan balance with the order of operations (−150 + 4 × 25 = −50).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.1 · Part 3', title: 'Integers at Work and Home', subtitle: 'Averages and money owed' }],
      lines: [
        { say: 'Two everyday jobs for integers are finding an average temperature and keeping track of money you owe.', show: 'title' },
        { say: 'In this video, you will find a mean with negative numbers, and track a loan balance.' },
      ],
    },
    {
      chapter: 'The mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mean', md: 'The **mean** (or average) is the total of the numbers divided by how many numbers there are.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{mean} = \\dfrac{\\text{total}}{\\text{how many}}'] },
      ],
      lines: [
        { say: 'The mean, or average, is the total of the numbers, divided by how many numbers there are.', show: ['def', 'f'] },
        { say: 'It works the same way with negative numbers. Just keep track of the signs when you add.' },
      ],
    },
    {
      chapter: 'Mean overnight low',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Night', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'], rows: [['Low (°C)', '$-12$', '$-8$', '$-15$', '$-5$', '$-10$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['-12 + (-8) + (-15) + (-5) + (-10) = -50', '-50 \\div 5 = -10'] },
      ],
      lines: [
        { say: 'The table shows the overnight lows in Fort McMurray for five nights. What is the mean low?', show: 't' },
        { say: 'Add the temperatures. Adding negatives moves you further below zero: negative twelve, plus negative eight, plus negative fifteen, plus negative five, plus negative ten, is negative fifty.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the number of nights, five. Negative fifty divided by five is negative ten, because the signs are different. The mean low is negative ten degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the mean', md: 'A mean is always between the smallest and the largest number. Here, $-10$ is between the coldest night, $-15$, and the warmest, $-5$.' }],
      lines: [
        { say: 'Check that a mean makes sense. It is always between the smallest number and the largest. Here, negative ten is between the coldest night, negative fifteen, and the warmest, negative five.', show: 'tip' },
        { say: 'If you had forgotten a sign and got positive ten, this check would catch it: positive ten is warmer than every night in the table.' },
      ],
    },
    {
      chapter: 'Paying back a loan',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['-150 + 4 \\times 25', '= -150 + 100', '= -50'] }],
      lines: [
        { say: 'Owen borrowed 150 dollars from his aunt, so his balance is negative 150. He pays back 25 dollars a week for four weeks. What is his balance now?', show: 'm.0', focus: 'm.0' },
        { say: 'Use the order of operations: multiply first. Four payments of 25 dollars is 100 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add: negative 150 plus 100 is negative fifty. His balance is negative fifty, so Owen still owes fifty dollars.', show: 'm.2', focus: 'm.2' },
        { say: 'At 25 dollars a week, fifty dollars is two more payments. After two more weeks, his balance will be zero.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The overnight lows for four nights were $-4$, $-9$, $3$ and $-6$ degrees. What is the mean low?',
          choices: ['$-4$ degrees', '$4$ degrees', '$-5.5$ degrees', '$-16$ degrees'],
          answer: 0,
          working: 'Total: $-4 + (-9) + 3 + (-6) = -16$. Mean: $-16 \\div 4 = -4$. C treats the $3$ as $-3$, and D forgets to divide.',
        },
      ],
      lines: [
        { say: 'Your turn. The overnight lows for four nights were negative four, negative nine, positive three, and negative six degrees. What is the mean low? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The total is negative sixteen, and negative sixteen divided by four is negative four. C treats the three as negative, and D forgets to divide.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mean = total ÷ how many, keeping track of signs.', 'A mean is between the smallest and largest values.', 'A negative balance is money owed.'] }],
      lines: [
        { say: 'Let’s sum up. The mean is the total divided by how many numbers there are. Keep track of the signs when you add.', show: 'sum.0' },
        { say: 'A mean is always between the smallest and largest values, which makes a quick check.', show: 'sum.1' },
        { say: 'And a negative balance is money owed. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
