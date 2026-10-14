import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-8-1',
  lessonId: 'm10c-8-1',
  title: 'Systems of Linear Equations, Part 1: Modelling and Verifying',
  thumbnailTitle: 'Systems of Equations',
  summary: 'What a system of linear equations and its solution are, writing a system from a situation with one equation for each fact, and checking a solution in every equation. Part 2 solves systems by graphing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 8.1 · Part 1', title: 'Systems of Linear Equations', subtitle: 'Two equations, solved together' }],
      lines: [
        { say: 'A school sells 150 tickets to a play, some for adults and some for students. How many of each were sold? One equation is not enough to answer. But two equations, solved together, are.', show: 'title' },
        { say: 'In this video, you will write a system of equations for a situation, and check whether a point is its solution. In part two, you will solve systems by graphing.' },
      ],
    },
    {
      chapter: 'Systems and solutions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sys', tone: 'definition', title: 'System of linear equations', md: 'Two or more linear equations that involve the same variables, considered together.' },
        { kind: 'callout', id: 'sol', tone: 'definition', title: 'Solution of a system', md: 'An ordered pair that makes **every** equation in the system true. Graphically, it is the **point of intersection** of the lines.' },
      ],
      lines: [
        { say: 'A system of linear equations is two or more linear equations with the same variables, considered together.', show: 'sys' },
        { say: 'A solution of the system is an ordered pair that makes every equation true. On a graph, it is the point where the lines intersect.', show: 'sol' },
      ],
    },
    {
      chapter: 'Writing a system',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A school sells 150 tickets. Adult tickets cost \\$12, student tickets cost \\$8, and the total is \\$1480.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['a = \\text{adult tickets}, \\quad s = \\text{student tickets}', 'a + s = 150', '12a + 8s = 1480'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'How many and how much', md: 'Many problems have one equation that counts things (how many) and one that adds their values (how much).' },
      ],
      lines: [
        { say: 'Adult tickets cost twelve dollars, student tickets cost eight dollars, and the total is 1,480 dollars. How many of each were sold?', show: 'q' },
        { say: 'First, define the variables. Let "a" be the number of adult tickets, and s the number of student tickets.', show: 'm.0', focus: 'm.0' },
        { say: 'Then write one equation for each fact. There are 150 tickets, so "a" plus s equals 150.', show: 'm.1', focus: 'm.1' },
        { say: 'And the total is 1,480 dollars. Each adult ticket brings in twelve dollars, and each student ticket eight. So twelve "a" plus eight s equals 1,480.', show: 'm.2', focus: 'm.2' },
        { say: 'Many problems are like this one: one equation counts how many, and the other adds up how much.', show: 'tip' },
      ],
    },
    {
      chapter: 'Verifying a solution',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['(a,\\ s) = (70,\\ 80)', '70 + 80 = 150 \\ \\checkmark', '12(70) + 8(80) = 840 + 640 = 1480 \\ \\checkmark'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Check both equations', md: '$(10, 140)$ makes $150$ tickets, but $12(10) + 8(140) = 1240$, not $1480$. It is not a solution.' },
      ],
      lines: [
        { say: 'Is seventy, eighty the solution? Substitute it into both equations.', show: 'm.0' },
        { say: 'Seventy plus eighty is 150. True.', show: 'm.1', focus: 'm.1' },
        { say: 'Twelve times seventy, plus eight times eighty, is 840 plus 640, which is 1,480. Also true. So the school sold seventy adult tickets and eighty student tickets.', show: 'm.2', focus: 'm.2' },
        { say: 'Always check both equations. Ten, 140 makes 150 tickets, but twelve times ten plus eight times 140 is only 1,240 dollars. So it is not a solution.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Is $(3, -1)$ the solution of the system $x + y = 2$ and $2x - y = 5$?',
          choices: ['No: it does not satisfy $2x - y = 5$.', 'Yes: it satisfies both equations.', 'No: it does not satisfy $x + y = 2$.', 'Yes: one equation is enough.'],
          answer: 0,
          working: '$3 + (-1) = 2$ is true, but $2(3) - (-1) = 7$, not $5$. So $(3, -1)$ is not the solution.',
        },
      ],
      lines: [
        { say: 'Your turn. Is three, negative one, the solution of x plus y equals two, and two x minus y equals five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three plus negative one is two, which is true. But two times three, minus negative one, is seven, not five. A solution must satisfy both equations.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A solution of a system makes every equation true.', 'To model: define the variables, then write one equation per fact.', 'Always verify a solution in every equation.'] }],
      lines: [
        { say: 'Let’s sum up. A solution of a system makes every equation true: on a graph, it is where the lines intersect.', show: 'sum.0' },
        { say: 'To model a situation, define the variables, then write one equation for each fact.', show: 'sum.1' },
        { say: 'And always verify a solution in every equation. In part two, we solve systems by graphing. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
