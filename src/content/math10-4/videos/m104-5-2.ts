import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-5-2',
  lessonId: 'm104-5-2',
  title: 'Expressions and Formulas, Part 1: Variables and Expressions',
  thumbnailTitle: 'Variables and Expressions',
  summary: 'Variables and expressions, a number beside a letter meaning multiply (12n), key words for each operation, the order in a subtraction (50 − s), and an expression with an hourly part and a one-time bonus. Part 2 uses formulas.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 5.2 · Part 1', title: 'Variables and Expressions', subtitle: 'A maths sentence that does the job every time' }],
      lines: [
        { say: 'At work, the same kind of calculation comes up again and again: the cost of some tickets, or the pay for some hours. A short maths sentence with a letter in it can do the job every time.', show: 'title' },
        { say: 'In this video, you will write expressions with variables.' },
      ],
    },
    {
      chapter: 'Variables and expressions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Variable and expression', md: 'A **variable** is a letter that stands for a number that can change. An **expression** is a maths phrase made of numbers, variables and operations, like $12n$. It has no equal sign.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\text{ tickets: } 12 \\times 2, \\quad 3 \\text{ tickets: } 12 \\times 3', 'n \\text{ tickets: } 12 \\times n = 12n'] },
      ],
      lines: [
        { say: 'A variable is a letter that stands for a number that can change, like the number of tickets or the number of hours. An expression is a maths phrase made of numbers, variables and operations. It has no equal sign.', show: 'def' },
        { say: 'Movie tickets cost twelve dollars each. Two tickets cost twelve times two, and three tickets cost twelve times three.', show: 'm.0', focus: 'm.0' },
        { say: 'So n tickets cost twelve times n. A number written right beside a letter means multiply, so we write twelve n.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Key words',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Words', 'Operation', 'Example'], rows: [['each, per, every', 'multiply', '\\$16 per hour for $h$ hours: $16h$'], ['more than, plus, fee added', 'add', '3 years older than $a$: $a + 3$'], ['less, spent, drops, left', 'subtract', '\\$50 minus $s$ spent: $50 - s$'], ['shared equally, split', 'divide', '\\$60 shared by $p$ people: $\\tfrac{60}{p}$']] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Order in subtraction', md: 'Mila has \\$50 and spends $s$ dollars. The money left is $50 - s$, not $s - 50$.' },
      ],
      lines: [
        { say: 'Key words tell you which operation to use. Each, per and every mean multiply: sixteen dollars per hour for h hours is sixteen h.', show: 't.0', focus: 't.0' },
        { say: 'More than, plus, or a fee added mean add: three years older than "a" is "a" plus three.', show: 't.1', focus: 't.1' },
        { say: 'Less, spent and left mean subtract, and shared equally or split mean divide.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Mind the order in a subtraction. Mila has fifty dollars and spends s dollars. The money left is fifty minus s, not s minus fifty. Start with the amount you have, then take away.', show: 'oops' },
      ],
    },
    {
      chapter: 'Two parts',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{hourly part: } 15h', '\\text{bonus, once: } +\\,20', '15h + 20', '15 \\times 6 + 20 = 90 + 20 = 110'] }],
      lines: [
        { say: 'Many jobs pay an amount for each hour, plus a one-time amount. Jamal earns fifteen dollars per hour, plus a twenty-dollar bonus for working on a holiday.', show: 'm.0' },
        { say: 'The hourly part changes with the hours: fifteen h. The bonus is paid once: plus twenty. So his pay is fifteen h plus twenty.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'For six hours, that is fifteen times six, plus twenty: 110 dollars.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gym charges a \\$25 sign-up fee plus \\$30 per month. Which expression gives the cost for $m$ months?',
          choices: ['$30m + 25$', '$25m + 30$', '$55m$', '$30 + 25 + m$'],
          answer: 0,
          working: 'The monthly part changes with $m$: $30m$. The sign-up fee is paid once: $+\\,25$.',
        },
      ],
      lines: [
        { say: 'Your turn. A gym charges a 25-dollar sign-up fee, plus thirty dollars per month. Which expression gives the cost for m months? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The monthly part changes with m: thirty m. The sign-up fee is paid once: plus 25. B charges the sign-up fee every month.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A variable is a letter for a number. An expression has no equal sign.', 'A number beside a letter means multiply: $12n = 12 \\times n$.', 'Each or per: multiply. A one-time fee is added once.'] }],
      lines: [
        { say: 'Let’s sum up. A variable is a letter that stands for a number, and an expression has no equal sign.', show: 'sum.0' },
        { say: 'A number beside a letter means multiply.', show: 'sum.1' },
        { say: 'And each or per means multiply, while a one-time fee is added once. In part two, we use formulas. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
