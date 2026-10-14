import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-4-4',
  lessonId: 'm202-4-4',
  title: 'Radical Equations, Part 1: Isolate, Then Undo',
  thumbnailTitle: 'Solving Radical Equations',
  thumbnail: 'm',
  summary: 'Solving radical equations by isolating the radical and then squaring or cubing both sides: √x + 4 = 9, the cube root equation ∛(x − 2) = −3, and 2√(x − 1) + 3 = 11, with a check in the original equation every time.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.4 · Part 1', title: 'Solving Radical Equations', subtitle: 'Isolate, then undo' }],
      lines: [
        { say: 'A pebble dropped from a footbridge in Edmonton’s river valley hits the water 2.5 seconds later. How high is the bridge? Answering that means solving an equation with a radical in it.', show: 'title' },
        { say: 'In this video, you will solve radical equations by isolating the radical and undoing it, and check every answer.' },
      ],
    },
    {
      chapter: 'Undoing a square root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{x} + 4 = 9', '\\sqrt{x} = 5', 'x = 25', '\\text{Check: } \\sqrt{25} + 4 = 5 + 4 = 9 \\;\\checkmark'] }],
      lines: [
        { say: 'To solve a radical equation, isolate the radical, and then undo it. Squaring undoes a square root. Solve root x, plus four, equals nine.', show: 'm.0', focus: 'm.0' },
        { say: 'First, isolate the radical by subtracting four from both sides: root x equals five.', show: 'm.1', focus: 'm.1' },
        { say: 'Now square both sides. Root x, squared, is x, and five squared is twenty-five. So x is twenty-five.', show: 'm.2', focus: 'm.2' },
        { say: 'Always check the answer in the original equation. Root twenty-five is five, and five plus four is nine. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Undoing a cube root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt[3]{x - 2} = -3', 'x - 2 = (-3)^3 = -27', 'x = -25', '\\text{Check: } \\sqrt[3]{-27} = -3 \\;\\checkmark'] }],
      lines: [
        { say: 'Cubing undoes a cube root. Solve the cube root of x minus two, equals negative three. The radical is already alone.', show: 'm.0', focus: 'm.0' },
        { say: 'Cube both sides. Negative three, cubed, is negative twenty-seven, so x minus two is negative twenty-seven, and x is negative twenty-five.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Check: the cube root of negative twenty-seven is negative three. A cube root can be negative, because negative three cubed is negative twenty-seven. A square root never is.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Isolate first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2\\sqrt{x - 1} + 3 = 11', '2\\sqrt{x - 1} = 8', '\\sqrt{x - 1} = 4', 'x - 1 = 16,\\quad x = 17', '\\text{Check: } 2\\sqrt{16} + 3 = 8 + 3 = 11 \\;\\checkmark'] }],
      lines: [
        { say: 'When the radical has a number in front, or a number added to it, undo those first, in the reverse order of operations. Solve two root x minus one, plus three, equals eleven.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract three from both sides, then divide both sides by two. Now the radical is alone: root x minus one equals four.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Square both sides: x minus one is sixteen, so x is seventeen.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: two root sixteen, plus three, is eight plus three, which is eleven.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $3\\sqrt{x + 2} - 1 = 11$.',
          choices: ['$x = 14$', '$x = 16$', '$x = 2$', '$x = 18$'],
          answer: 0,
          working: '$3\\sqrt{x + 2} = 12$, so $\\sqrt{x + 2} = 4$ and $x + 2 = 16$, giving $x = 14$. Check: $3\\sqrt{16} - 1 = 11$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. Solve three root x plus two, minus one, equals eleven. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Add one, and divide by three: root x plus two equals four. Square: x plus two is sixteen, so x is fourteen. And three root sixteen, minus one, is eleven.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Isolate the radical first, in reverse order of operations.', 'Square to undo a square root; cube to undo a cube root.', 'Check every answer in the original equation.'] }],
      lines: [
        { say: 'Let’s sum up. Isolate the radical first, undoing the other operations in reverse order.', show: 'sum.0' },
        { say: 'Then square both sides to undo a square root, or cube both sides to undo a cube root.', show: 'sum.1' },
        { say: 'And check every answer in the original equation. In part two, we see why that check really matters. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
