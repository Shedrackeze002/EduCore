import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-8-5-c',
  lessonId: 'm301-8-5',
  title: 'Composite Functions, Part 3: Writing f(g(x))',
  thumbnailTitle: 'Writing Composite Functions',
  summary: 'Writing composite functions as equations by substituting the whole inner function, in brackets, into the outer one: f(g(x)) = 4x² + 2x − 2 and g(f(x)) = 2x² + 6x − 1 for f(x) = x² + 3x and g(x) = 2x − 1, and why f(g(x)) is not the product f(x) · g(x).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.5 · Part 3', title: 'Writing Composite Functions', subtitle: 'Substitute the whole inner function' }],
      lines: [
        { say: 'To find many values of a composite function, it helps to have its equation.', show: 'title' },
        { say: 'In this video, you will write f of g of x and g of f of x as equations, and see why composition is not the same as multiplication.' },
      ],
    },
    {
      chapter: 'Substitute the inner function',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['f(x) = x^2 + 3x \\qquad g(x) = 2x - 1', 'f(\\square) = \\square^2 + 3\\square', 'f(g(x)) = (2x - 1)^2 + 3(2x - 1)'],
        },
      ],
      lines: [
        { say: 'To write f of g of x, replace every x in f of x with the whole expression for g of x, in brackets.' },
        { say: 'Let f of x equal x squared plus three x, and g of x equal two x minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Think of f as a rule with an empty box: f of box equals box squared, plus three times box.', show: 'm.1', focus: 'm.1' },
        { say: 'Put two x minus one in every box. f of g of x equals two x minus one, all squared, plus three times two x minus one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Simplify',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['(2x - 1)^2 = 4x^2 - 4x + 1', '3(2x - 1) = 6x - 3', 'f(g(x)) = 4x^2 - 4x + 1 + 6x - 3', '= 4x^2 + 2x - 2'],
        },
        { kind: 'text', id: 't', md: 'Check with $x = 1$: $g(1) = 1$ and $f(1) = 4$; $\\ 4 + 2 - 2 = 4$ ✓', size: 'md', align: 'center' },
      ],
      lines: [
        { say: 'Now simplify. Two x minus one, squared, is two x minus one, times two x minus one: four x squared, minus four x, plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Three times two x minus one is six x minus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Add them, and collect like terms: four x squared, plus two x, minus two.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Check with x equals one. g of one is one, and f of one is one plus three: four. The equation gives four, plus two, minus two: also four.', show: 't' },
      ],
    },
    {
      chapter: 'The other order',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['g(\\square) = 2\\square - 1', 'g(f(x)) = 2(x^2 + 3x) - 1', '= 2x^2 + 6x - 1', '4x^2 + 2x - 2 \\ne 2x^2 + 6x - 1'],
        },
      ],
      lines: [
        { say: 'For g of f of x, f is inside. g of box is two times box, minus one, so put x squared plus three x in the box.', show: 'm.0', focus: 'm.0' },
        { say: 'g of f of x is two times x squared plus three x, minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'That is two x squared, plus six x, minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'Compare the two results. They are different functions: the order matters.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Composition is not multiplication',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Composition is not multiplication', md: '$f(g(x))$ means “$f$ of $g(x)$”, not $f(x) \\cdot g(x)$. Here $(fg)(x) = (x^2 + 3x)(2x - 1)$, a different function.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(fg)(x) = (x^2 + 3x)(2x - 1) = 2x^3 + 5x^2 - 3x'] },
      ],
      lines: [
        { say: 'A common mistake is to treat f of g of x as a product.', show: 'oops' },
        { say: 'f of g of x means: put g of x into f. It does not mean f of x times g of x.' },
        { say: 'The product, f g of x, is x squared plus three x, times two x minus one. That is two x cubed, plus five x squared, minus three x: a cubic, and a completely different function.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = x^2 - 1$ and $g(x) = x + 3$, write $f(g(x))$.',
          choices: ['$x^2 + 2$', '$x^2 + 6x + 8$', '$x^3 + 3x^2 - x - 3$', '$x^2 + 8$'],
          answer: 1,
          working: '$f(g(x)) = (x + 3)^2 - 1 = x^2 + 6x + 9 - 1 = x^2 + 6x + 8$',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals x squared minus one, and g of x equals x plus three, write f of g of x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Replace x in f with x plus three: x plus three, all squared, minus one. That is x squared plus six x plus nine, minus one: x squared plus six x plus eight. Choice A is g of f of x, the other order, and C is the product.', show: 'q.answer' },
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
          items: ['To write $f(g(x))$, replace every $x$ in $f(x)$ with $g(x)$, in brackets.', 'Then expand and simplify.', '$f(g(x))$ is not $f(x) \\cdot g(x)$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To write f of g of x, replace every x in f of x with the whole of g of x, in brackets.', show: 'sum.0' },
        { say: 'Then expand and simplify.', show: 'sum.1' },
        { say: 'And remember that f of g of x is not f of x times g of x. In part four, we find the domain of a composite function. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
