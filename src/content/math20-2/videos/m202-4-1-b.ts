import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-4-1-b',
  lessonId: 'm202-4-1',
  title: 'Mixed and Entire Radicals, Part 2: Mixed to Entire',
  thumbnailTitle: 'Mixed Radicals to Entire Radicals',
  thumbnail: 'm',
  summary: 'Writing a mixed radical such as 5√3 as the entire radical √75, why the square root of x² is x only when x ≥ 0, and simplifying √(18x²) and rewriting 4x√3 with a variable radicand. Part 3 orders radicals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.1 · Part 2', title: 'Mixed to Entire', subtitle: 'Moving a number under the radical sign' }],
      lines: [
        { say: 'Simplifying takes a perfect square out from under the radical sign. Sometimes you need the reverse: putting the number in front back underneath.', show: 'title' },
        { say: 'In this video, you will write mixed radicals as entire radicals, and work with radicals that contain a variable.' },
      ],
    },
    {
      chapter: 'Mixed to entire',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['5 = \\sqrt{25}', '5\\sqrt{3} = \\sqrt{25} \\times \\sqrt{3} = \\sqrt{75}', '3\\sqrt{6} = \\sqrt{9} \\times \\sqrt{6} = \\sqrt{54}', '\\text{Check: } \\sqrt{75} = \\sqrt{25 \\times 3} = 5\\sqrt{3}\\;\\checkmark'] }],
      lines: [
        { say: 'To write five root three as an entire radical, first write the five as a square root. Five is the square root of twenty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply the radicands: root twenty-five times root three is root seventy-five.', show: 'm.1', focus: 'm.1' },
        { say: 'In the same way, three root six is root nine times root six, which is root fifty-four. Square the number in front, then multiply.', show: 'm.2', focus: 'm.2' },
        { say: 'You can always check by simplifying again. Root seventy-five is root twenty-five times root three, which gives back five root three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Variable radicands',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x \\ge 0:\\quad \\sqrt{x^2} = x', '\\sqrt{18x^2} = \\sqrt{9x^2} \\times \\sqrt{2} = 3x\\sqrt{2}', '4x = \\sqrt{16x^2},\\quad 4x\\sqrt{3} = \\sqrt{48x^2}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Why x must not be negative', md: 'If $x = -3$, then $\\sqrt{x^2} = \\sqrt{9} = 3$, which is not $x$. A square root is never negative.' },
      ],
      lines: [
        { say: 'The same steps work with a variable, as long as the variable is not negative. If x is at least zero, the square root of x squared is x, so x squared behaves like a perfect square.', show: 'm.0', focus: 'm.0' },
        { say: 'Simplify the square root of eighteen x squared. The largest perfect-square factor is nine x squared. So it is root nine x squared times root two, which is three x root two.', show: 'm.1', focus: 'm.1' },
        { say: 'Now write four x root three as an entire radical. Four x is the square root of sixteen x squared, so four x root three is the square root of forty-eight x squared.', show: 'm.2', focus: 'm.2' },
        { say: 'Why must x not be negative? If x were negative three, the square root of x squared would be root nine, which is three, not negative three. A square root is never negative.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $6\\sqrt{2}$ as an entire radical.',
          choices: ['$\\sqrt{72}$', '$\\sqrt{12}$', '$\\sqrt{38}$', '$\\sqrt{144}$'],
          answer: 0,
          working: '$6 = \\sqrt{36}$, so $6\\sqrt{2} = \\sqrt{36} \\times \\sqrt{2} = \\sqrt{72}$. B multiplies $6 \\times 2$ without squaring the $6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write six root two as an entire radical. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Six is root thirty-six, and root thirty-six times root two is root seventy-two. B forgets to square the six before multiplying.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mixed to entire: square the number in front, then multiply the radicands.', 'If $x \\ge 0$, then $\\sqrt{x^2} = x$.', 'Check by simplifying the entire radical again.'] }],
      lines: [
        { say: 'Let’s sum up. To write a mixed radical as an entire radical, square the number in front, and multiply the radicands.', show: 'sum.0' },
        { say: 'If x is not negative, the square root of x squared is x, so it works like a perfect square.', show: 'sum.1' },
        { say: 'And check by simplifying again. In part three, we use entire radicals to put radicals in order. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
