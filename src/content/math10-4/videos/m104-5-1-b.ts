import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-5-1-b',
  lessonId: 'm104-5-1',
  title: 'Patterns, Part 2: Goals and Rules',
  thumbnailTitle: 'Writing a Rule',
  summary: 'Finding when a savings pattern reaches a goal (how much more, divided by the jump), and writing a rule like y = 3n + 2 from a table, with the jump in front of n, then using it to jump straight to the 20th term.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 5.1 · Part 2', title: 'Goals and Rules', subtitle: 'Jump straight to any term' }],
      lines: [
        { say: 'When will you have saved enough for that bike? How many people do twenty tables seat? You do not have to count every step.', show: 'title' },
        { say: 'In this video, you will find when a pattern reaches a goal, and write a rule for a pattern.' },
      ],
    },
    {
      chapter: 'Working toward a goal',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['260 - 110 = 150', '150 \\div 25 = 6 \\text{ more weeks}', '4 + 6 = \\text{week } 10', '110 + 6 \\times 25 = 260 \\;\\checkmark'] }],
      lines: [
        { say: 'Sometimes you know the goal, and need to find when you will reach it. Ava has 110 dollars after week four, and adds 25 each week. When will she reach 260 dollars?', show: 'm.0' },
        { say: 'How much more does she need? 260 minus 110 is 150 dollars.', focus: 'm.0' },
        { say: 'How many more weeks? 150 divided by 25 is six.', show: 'm.1', focus: 'm.1' },
        { say: 'Four weeks plus six more is week ten. Check: 110 plus six times 25 is 260.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Writing a rule',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'table', id: 't', head: ['$n$', '$y$'], rows: [['1', '5'], ['2', '8'], ['3', '11'], ['4', '14'], ['5', '17']] }],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{jump } 3 \\;\\to\\; 3n', '3 \\times 1 = 3, \\quad 5 - 3 = 2', 'y = 3n + 2', '3 \\times 4 + 2 = 14 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'A rule tells you how to find any term. In words, this pattern is: start at five, and add three each time. A rule with letters lets you jump straight to any term. Here, n is the term number and y is the term.', show: ['t.0', 't.1', 't.2', 't.3', 't.4'] },
        { say: 'Each time n goes up by one, y goes up by three. So the rule starts with three n, three times n.', show: 'm.0', focus: 'm.0' },
        { say: 'When n is one, three n is three, but the table shows five. So add two.', show: 'm.1', focus: ['m.1', 't.0'] },
        { say: 'The rule is y equals three n plus two. Check with n equals four: three times four plus two is fourteen. It matches.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3', 't.3'] },
      ],
    },
    {
      chapter: 'Using the rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the jump', md: 'The jump goes **in front of** $n$. The rule $y = n + 3$ gives $4, 5, 6, \\ldots$, which does not match the table.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['p = 2t + 2', 'p = 2 \\times 20 + 2 = 42 \\text{ people}'] },
      ],
      lines: [
        { say: 'The jump goes in front of n, as a multiplier. The rule y equals n plus three gives four, five, six, which does not match the table.', show: 'oops' },
        { say: 'For the tables and chairs, each table adds two people, and there are two more at the ends. The rule is p equals two t plus two.', show: 'm.0', focus: 'm.0' },
        { say: 'So twenty tables seat two times twenty, plus two: 42 people. No need to count every table!', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pattern goes $7, \\; 11, \\; 15, \\; 19, \\; \\ldots$ for $n = 1, 2, 3, 4$. Which rule fits?',
          choices: ['$y = 4n + 3$', '$y = n + 4$', '$y = 4n + 7$', '$y = 3n + 4$'],
          answer: 0,
          working: 'The jump is $4$, so the rule starts with $4n$. When $n = 1$, $4n = 4$, and $7 - 4 = 3$. So $y = 4n + 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pattern goes seven, eleven, fifteen, nineteen. Which rule fits? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The jump is four, so the rule starts with four n. When n is one, four n is four, and seven minus four is three. B adds the jump instead of multiplying, and C uses the first term.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['To reach a goal: how much more, divided by the jump.', 'A rule like $y = 3n + 2$: the jump times $n$, plus a start-up amount.', 'Always check a rule with the table.'] }],
      lines: [
        { say: 'Let’s sum up. To reach a goal, find how much more you need, then divide by the jump.', show: 'sum.0' },
        { say: 'A rule like y equals three n plus two comes from the jump, three, and a start-up amount, two.', show: 'sum.1' },
        { say: 'And always check the rule with the table. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
