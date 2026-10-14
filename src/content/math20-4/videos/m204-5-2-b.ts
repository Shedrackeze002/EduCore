import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-5-2-b',
  lessonId: 'm204-5-2',
  title: 'Solving Equations, Part 2: Two-Step Equations',
  thumbnailTitle: 'Two-Step Equations',
  thumbnail: 'm',
  summary: 'Solving two-step equations by undoing the operations in reverse order: 3x + 5 = 26 (x = 7), bowling with 5 + 6g = 29 (4 games), and why you undo the adding before the multiplying.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.2 · Part 2', title: 'Two-Step Equations', subtitle: 'Undo in reverse order' }],
      lines: [
        { say: 'Putting on socks, then shoes, takes two steps. To undo it, you take off the shoes first, then the socks. Two-step equations work the same way.', show: 'title' },
        { say: 'In this video, you will solve equations with two operations, by undoing them in reverse order.' },
      ],
    },
    {
      chapter: 'Reverse order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'tip', title: 'Undo in reverse order', md: 'When an equation has two operations, undo adding or subtracting **first**. Then undo multiplying or dividing.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3x + 5 = 26', '3x = 21', 'x = 7', '\\text{Check: } 3 \\times 7 + 5 = 26'] },
      ],
      lines: [
        { say: 'When an equation has two operations, undo them in reverse order. Undo adding or subtracting first. Then undo multiplying or dividing.', show: 'rule' },
        { say: 'Solve three x plus five equals 26. To build three x plus five, you multiply by three, then add five.', show: 'm.0', focus: 'm.0' },
        { say: 'So undo the plus five first: subtract five from both sides. Three x equals 21.', show: 'm.1', focus: 'm.1' },
        { say: 'Then undo the times three: divide both sides by three. x equals seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: three times seven is 21, plus five is 26. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Bowling',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Bowling costs \\$5 for shoes plus \\$6 per game. Tyler paid \\$29. Solve $5 + 6g = 29$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5 + 6g = 29', '6g = 24', 'g = 4'] },
      ],
      lines: [
        { say: 'In this example, bowling costs five dollars for shoes, plus six dollars per game. Tyler paid 29 dollars. Solve five plus six g equals 29 to find how many games he played.', show: 'q' },
        { say: 'Here is the equation. g is the number of games. The five dollars for shoes is paid only once, so it is the part you undo first.', show: 'm.0', focus: 'm.0' },
        { say: 'Undo the plus five first: subtract five from both sides. Six g equals 24.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide both sides by six: g equals four. Tyler played four games. Check: five plus six times four is 29.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Undo the adding first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing first', md: 'In $3x + 5 = 26$, students often divide $3x$ and $26$ by $3$ but forget the $5$. Then the answer comes out wrong. Undo the adding or subtracting **first**, and the division is easy.' }],
      lines: [
        { say: 'A common mistake is to divide first. In three x plus five equals 26, students often divide three x and 26 by three, but forget to divide the five. Then the answer comes out wrong. Undo the adding or subtracting first, and the division is easy.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $4x - 3 = 25$.',
          choices: ['$x = 7$', '$x = 5.5$', '$x = 112$', '$x = 3.25$'],
          answer: 0,
          working: 'Add $3$ to both sides: $4x = 28$. Divide by $4$: $x = 7$. Check: $4 \\times 7 - 3 = 25$. B subtracts $3$ instead of adding, and D divides first.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four x minus three equals 25. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Undo the minus three first: add three to both sides, so four x equals 28. Then divide by four: x equals seven. Check: four times seven, minus three, is 25. B subtracts three instead of adding it, and D divides first.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Undo in reverse order.', 'Undo adding or subtracting first.', 'Then undo multiplying or dividing, and check.'] }],
      lines: [
        { say: 'Let’s sum up. Undo the operations in reverse order.', show: 'sum.0' },
        { say: 'Undo adding or subtracting first.', show: 'sum.1' },
        { say: 'Then undo multiplying or dividing, and check your answer. In part three, we use formulas backwards. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
