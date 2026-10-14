import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-5-4',
  lessonId: 'm10c-5-4',
  title: 'Function Notation, Part 1: Reading and Evaluating f(x)',
  thumbnailTitle: 'Function Notation',
  summary: 'What f(x) means (the output for the input x, not f times x), evaluating a function by substituting the input in brackets, and what a statement like f(4) = 10 says about a graph. Part 2 solves for inputs and reads values from graphs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 5.4 · Part 1', title: 'Function Notation', subtitle: 'A name for the output' }],
      lines: [
        { say: 'Instead of writing y equals three x minus two, mathematicians often write f of x equals three x minus two.', show: 'title' },
        { say: 'In this video, you will read function notation, and use it to evaluate a function. In part two, we work backwards from an output, and read values from a graph.' },
      ],
    },
    {
      chapter: 'Reading f(x)',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['y = 3x - 2 \\quad\\longrightarrow\\quad f(x) = 3x - 2', 'f(4) = 3(4) - 2 = 10', 'f(4) = 10 \\text{ means } (4, 10) \\text{ is on the graph}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Function notation', md: '$f(x)$ is read “f of x”. It is the output of $f$ when the input is $x$, **not** $f$ times $x$.' },
      ],
      lines: [
        { say: 'f of x means the output of the function f when the input is x. It does not mean f times x.', show: ['m.0', 'def'], focus: 'm.0' },
        { say: 'So f of four means the value of f when x is four: three times four, minus two, which is ten.', show: 'm.1', focus: 'm.1' },
        { say: 'And f of four equals ten tells you that the point four, ten is on the graph of the function.', show: 'm.2', focus: 'm.2' },
        { say: 'Functions can have other names and variables too, like g of t equals seven plus t.' },
      ],
    },
    {
      chapter: 'Evaluating',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['f(x) = 3x - 2', 'f(-1) = 3(-1) - 2 = -5', 'f\\left(\\tfrac23\\right) = 3\\left(\\tfrac23\\right) - 2 = 0'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use brackets', md: 'Write the input in brackets, especially a negative one: $3(-1)$, not $3 - 1$.' },
      ],
      lines: [
        { say: 'To evaluate a function, substitute the input for every x. For f of x equals three x minus two, find f of negative one.', show: 'm.0', focus: 'm.0' },
        { say: 'Three times negative one, minus two, is negative five. Put the negative number in brackets, so that you multiply, not subtract.', show: ['m.1', 'tip'], focus: 'm.1' },
        { say: 'Now f of two thirds: three times two thirds is two, and two minus two is zero.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'In a real problem',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A gym charges $C(n) = 25 + 4n$ dollars for $n$ classes in a month. Find $C(6)$, and say what it means.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['C(6) = 25 + 4(6) = 49', '\\text{Six classes in a month cost } \\$49.'] },
      ],
      lines: [
        { say: 'Function notation is handy in real problems. A gym charges C of n equals 25 plus four n dollars for n classes in a month. Find C of six, and say what it means.', show: 'q' },
        { say: 'C of six is 25 plus four times six, which is 49.', show: 'm.0', focus: 'm.0' },
        { say: 'So six classes in a month cost 49 dollars. The name C, for cost, and n, for the number of classes, help you remember what each one means.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = 2x + 1$, what is $f(3)$?',
          choices: ['$7$', '$6$', '$4$', '$9$'],
          answer: 0,
          working: '$f(3) = 2(3) + 1 = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals two x plus one, what is f of three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. f of three is two times three, plus one, which is seven. B forgets to add the one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['$f(x)$ is the output of $f$ for the input $x$, not $f$ times $x$.', 'To evaluate, substitute the input, in brackets.', '$f(a) = b$ means the point $(a, b)$ is on the graph.'],
        },
      ],
      lines: [
        { say: "Let's sum up. f of x is the output of f for the input x. It is not f times x.", show: 'sum.0' },
        { say: 'To evaluate, substitute the input, in brackets.', show: 'sum.1' },
        { say: 'And f of "a" equals b means the point "a", b is on the graph. In part two, we find inputs, and read values from graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
