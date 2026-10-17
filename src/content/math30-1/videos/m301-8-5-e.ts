import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-8-5-e',
  lessonId: 'm301-8-5',
  title: 'Composite Functions, Part 5: Decomposing a Function',
  thumbnailTitle: 'Decomposing a Function',
  summary: 'Writing a function as a composition f(g(x)) by asking what is done to x first (the inner function) and what is done to that result (the outer function), for h(x) = (3x + 2)² − 5 and k(x) = 1/(x − 4), checking the result, and why decompositions are not unique.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.5 · Part 5', title: 'Decomposing a Function', subtitle: 'Find the inner and outer functions' }],
      lines: [
        { say: 'Composition builds a new function out of two. Decomposition goes the other way: it splits one function into an inner function and an outer function.', show: 'title' },
        { say: 'In this video, you will decompose a function, check the result, and see that there is more than one way to do it.' },
      ],
    },
    {
      chapter: 'What is done first?',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['What is done to $x$ **first**? That is the inner function, $g$.', 'What is done to **that result**? That is the outer function, $f$.'],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['h(x) = f(g(x))'] },
      ],
      lines: [
        { say: 'Many functions can be written as a composition, h of x equals f of g of x. To find f and g, ask two questions.', show: 'm' },
        { say: 'What is done to x first? That is the inner function, g.', show: 'b.0', focus: 'b.0' },
        { say: 'What is done to that result? That is the outer function, f.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Finding f and g',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'h(x) = (3x + 2)^2 - 5',
            '\\text{first: } 3x + 2 \\quad\\to\\quad g(x) = 3x + 2',
            '\\text{then: square, subtract } 5 \\quad\\to\\quad f(x) = x^2 - 5',
            '\\text{check: } f(g(x)) = (3x + 2)^2 - 5\\ \\checkmark',
          ],
        },
      ],
      lines: [
        { say: 'Write h of x equals three x plus two, all squared, minus five, as f of g of x.', show: 'm.0', focus: 'm.0' },
        { say: 'Follow an x through h. Try x equals one: first, three times one plus two is five. Then five squared is twenty-five, and subtracting five gives twenty.' },
        { say: 'So the first step is three x plus two, inside the brackets. The inner function is g of x equals three x plus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Then the result is squared, and five is subtracted. So the outer function squares its input and subtracts five: f of x equals x squared minus five.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: f of g of x puts three x plus two into f, giving three x plus two, all squared, minus five. That is h of x.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'More than one answer',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['g(x) = 3x \\qquad f(x) = (x + 2)^2 - 5', 'f(g(x)) = (3x + 2)^2 - 5\\ \\checkmark'],
        },
      ],
      lines: [
        { say: 'Decompositions are not unique. You could also take g of x equals three x, and f of x equals x plus two, all squared, minus five.', show: 'm.0', focus: 'm.0' },
        { say: 'Then f of g of x puts three x into f: three x plus two, all squared, minus five. That is h of x again.', show: 'm.1', focus: 'm.1' },
        { say: 'Both are correct. Choose the split that makes the structure clear. Often the inner function is the expression inside the brackets, under a root, or in a denominator.' },
      ],
    },
    {
      chapter: 'A rational function',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['k(x) = \\dfrac{1}{x - 4}', 'g(x) = x - 4 \\qquad f(x) = \\dfrac{1}{x}', 'f(g(x)) = \\dfrac{1}{x - 4}\\ \\checkmark'],
        },
      ],
      lines: [
        { say: 'Here is one more, from earlier in this unit: k of x equals one over x minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'First, four is subtracted from x, so g of x equals x minus four. Then one is divided by the result, so f of x equals one over x.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: f of g of x is one over x minus four. So this rational function is the reciprocal function, applied after a translation.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $h(x) = \\sqrt{5x - 1} + 4$ as $f(g(x))$.',
          choices: [
            '$f(x) = 5x - 1$ and $g(x) = \\sqrt{x} + 4$',
            '$f(x) = \\sqrt{x} + 4$ and $g(x) = 5x - 1$',
            '$f(x) = \\sqrt{x}$ and $g(x) = 5x + 3$',
            '$f(x) = \\sqrt{x} + 4$ and $g(x) = 5x$',
          ],
          answer: 1,
          working: 'First $5x - 1$ is calculated, so $g(x) = 5x - 1$. Then the square root is taken and $4$ is added, so $f(x) = \\sqrt{x} + 4$. Check: $f(g(x)) = \\sqrt{5x - 1} + 4$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. Write h of x equals the square root of five x minus one, plus four, as f of g of x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. First, five x minus one is calculated under the root, so g of x is five x minus one. Then the square root is taken and four is added, so f of x is the square root of x, plus four. Choice A swaps the inner and outer functions.', show: 'q.answer' },
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
          items: [
            'The inner function $g$ is what is done to $x$ first.',
            'The outer function $f$ is what is done to that result.',
            'Check that $f(g(x))$ gives back $h(x)$; decompositions are not unique.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The inner function, g, is what is done to x first.', show: 'sum.0' },
        { say: 'The outer function, f, is what is done to that result.', show: 'sum.1' },
        { say: 'Always check that f of g of x gives back the original function, and remember that there can be more than one answer. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
