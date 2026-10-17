import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-8-5',
  lessonId: 'm301-8-5',
  title: 'Composite Functions, Part 1: A Function of a Function',
  thumbnailTitle: 'Composite Functions',
  summary: 'What the composite function f(g(x)), or (f ∘ g)(x), means: apply g first, then f. Converting 50°F to kelvins in two steps, and evaluating f(g(2)) and g(f(2)) for f(x) = 3x + 1 and g(x) = x² − 2 to see that the order matters. Parts 2 to 5 cover tables and graphs, equations, domains and decomposing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.5 · Part 1', title: 'Composite Functions', subtitle: 'The output of one is the input of the next' }],
      lines: [
        { say: 'Converting fifty degrees Fahrenheit to kelvins takes two steps: Fahrenheit to Celsius, then Celsius to kelvins.', show: 'title' },
        { say: 'Doing one function, and then feeding its output into another, is called composition. In this video, you will evaluate composite functions, and see why the order matters.' },
      ],
    },
    {
      chapter: 'What a composite function is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Composite function', md: 'The composite function $f(g(x))$, also written $(f \\circ g)(x)$, applies $g$ first and then applies $f$ to the result. The output of the inner function $g$ becomes the input of the outer function $f$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x \\;\\longrightarrow\\; \\boxed{\\;g\\;} \\;\\longrightarrow\\; g(x) \\;\\longrightarrow\\; \\boxed{\\;f\\;} \\;\\longrightarrow\\; f(g(x))'] },
      ],
      lines: [
        { say: 'The composite function f of g of x applies g first, and then applies f to the result.', show: 'def' },
        { say: 'It is also written with a small circle: f composed with g, of x. Both mean the same thing.' },
        { say: 'Think of two machines in a row. x goes into g, and g of x comes out. That output goes straight into f, and f of g of x comes out.', show: 'm', focus: 'm' },
        { say: 'g is called the inner function, and f is the outer function.' },
      ],
    },
    {
      chapter: 'Fahrenheit to kelvins',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'C(F) = \\tfrac{5}{9}(F - 32) \\qquad K(C) = C + 273.15',
            'C(50) = \\tfrac{5}{9}(50 - 32) = \\tfrac{5}{9}(18) = 10',
            'K(10) = 10 + 273.15 = 283.15',
            'K(C(50)) = 283.15\\text{ K}',
          ],
        },
      ],
      lines: [
        { say: 'Degrees Celsius from degrees Fahrenheit is C of F equals five ninths of F minus thirty-two. Kelvins from degrees Celsius is K of C equals C plus 273.15.', show: 'm.0', focus: 'm.0' },
        { say: 'Start inside. C of fifty is five ninths of fifty minus thirty-two, which is five ninths of eighteen: ten degrees Celsius.', show: 'm.1', focus: 'm.1' },
        { say: 'Then K of ten is ten plus 273.15: 283.15.', show: 'm.2', focus: 'm.2' },
        { say: 'So K of C of fifty is 283.15 kelvins. The output of C became the input of K.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Order matters',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = 3x + 1 \\qquad g(x) = x^2 - 2',
            'f(g(2)):\\quad g(2) = 4 - 2 = 2,\\quad f(2) = 3(2) + 1 = 7',
            'g(f(2)):\\quad f(2) = 7,\\quad g(7) = 49 - 2 = 47',
            'f(g(x)) \\ne g(f(x))',
          ],
        },
      ],
      lines: [
        { say: 'Now let f of x equal three x plus one, and g of x equal x squared minus two. Evaluate f of g of two, and g of f of two.', show: 'm.0', focus: 'm.0' },
        { say: 'For f of g of two, work from the inside. g of two is four minus two: two. Then f of two is three times two, plus one: seven.', show: 'm.1', focus: 'm.1' },
        { say: 'For g of f of two, the inside is now f of two, which is seven. Then g of seven is forty-nine minus two: forty-seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Seven and forty-seven. The same two functions, in a different order, give different results. In general, f of g of x is not equal to g of f of x.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Inside first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'f of g is not g of f', md: 'In $f(g(x))$, the function written **closest to $x$** acts first. Read from the inside out: $g$ first, then $f$.' }],
      lines: [
        { say: 'A common mistake is to apply the functions from left to right, in the order you read them.', show: 'oops' },
        { say: 'In f of g of x, the function written closest to x, g, acts first. So always work from the inside out.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = 2x - 5$ and $g(x) = x^2 + 1$, evaluate $g(f(3))$.',
          choices: ['$15$', '$10$', '$2$', '$1$'],
          answer: 2,
          working: 'Inside first: $f(3) = 6 - 5 = 1$. Then $g(1) = 1 + 1 = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals two x minus five, and g of x equals x squared plus one, evaluate g of f of three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Inside first: f of three is six minus five, which is one. Then g of one is one plus one: two. Choice A is f of g of three, the other order.', show: 'q.answer' },
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
          items: ['$f(g(x)) = (f \\circ g)(x)$: apply $g$ first, then $f$.', 'Work from the inside out.', 'The order matters: usually $f(g(x)) \\ne g(f(x))$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. f of g of x, also written f composed with g, applies g first, then f.', show: 'sum.0' },
        { say: 'So work from the inside out.', show: 'sum.1' },
        { say: 'And the order matters: usually, f of g of x is not equal to g of f of x. In part two, we evaluate composite functions from tables and graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
