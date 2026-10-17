import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-8-4',
  lessonId: 'm301-8-4',
  title: 'Sums, Differences, Products and Quotients of Functions, Part 1: Combining Functions',
  thumbnailTitle: 'Combining Functions',
  summary: 'What (f + g)(x), (f − g)(x), (fg)(x) and (f/g)(x) mean, writing each for f(x) = 2x − 3 and g(x) = x² + x − 4, and why every term of g(x) must be subtracted in (f − g)(x). Parts 2 and 3 cover evaluating combined functions and their domains.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.4 · Part 1', title: 'Combining Functions', subtitle: 'Add, subtract, multiply and divide' }],
      lines: [
        { say: 'A ball’s height above the ground and a drone’s height above the ground are two functions of time. The height of the ball above the drone is their difference: a new function built from the two.', show: 'title' },
        { say: 'In this video, you will add, subtract, multiply and divide functions, and avoid the most common sign mistake.' },
      ],
    },
    {
      chapter: 'Four operations',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['(f + g)(x) = f(x) + g(x)', '(f - g)(x) = f(x) - g(x)', '(fg)(x) = f(x) \\cdot g(x)', '\\left(\\dfrac{f}{g}\\right)(x) = \\dfrac{f(x)}{g(x)},\\quad g(x) \\ne 0'],
        },
      ],
      lines: [
        { say: 'Functions can be added, subtracted, multiplied and divided, just like numbers. f plus g, of x, means f of x plus g of x: add the two outputs.', show: 'm.0', focus: 'm.0' },
        { say: 'f minus g, of x, means f of x minus g of x.', show: 'm.1', focus: 'm.1' },
        { say: 'f g of x, the product, means f of x times g of x.', show: 'm.2', focus: 'm.2' },
        { say: 'And f over g, of x, the quotient, means f of x over g of x, as long as g of x is not zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The sum',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['f(x) = 2x - 3 \\qquad g(x) = x^2 + x - 4', '(f + g)(x) = (2x - 3) + (x^2 + x - 4)', '= x^2 + 3x - 7'],
        },
      ],
      lines: [
        { say: 'Let f of x equal two x minus three, and g of x equal x squared plus x minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'For f plus g, write each function in brackets, and add: two x minus three, plus x squared plus x minus four.', show: 'm.1', focus: 'm.1' },
        { say: 'Collect like terms. There is one x squared. Two x plus x is three x. And negative three minus four is negative seven. So f plus g, of x, is x squared plus three x minus seven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The difference',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['(f - g)(x) = (2x - 3) - (x^2 + x - 4)', '= 2x - 3 - x^2 - x + 4', '= -x^2 + x + 1'],
        },
      ],
      lines: [
        { say: 'For f minus g, subtract all of g of x. Put it in brackets first: two x minus three, minus the bracket x squared plus x minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'The minus sign in front of the bracket changes the sign of every term inside it: minus x squared, minus x, plus four.', show: 'm.1', focus: 'm.1' },
        { say: 'Collect like terms: negative x squared, plus x, plus one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The product and the quotient',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '(fg)(x) = (2x - 3)(x^2 + x - 4)',
            '= 2x^3 + 2x^2 - 8x - 3x^2 - 3x + 12',
            '= 2x^3 - x^2 - 11x + 12',
            '\\left(\\dfrac{f}{g}\\right)(x) = \\dfrac{2x - 3}{x^2 + x - 4}',
          ],
        },
      ],
      lines: [
        { say: 'For f g, multiply: two x minus three, times x squared plus x minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply each term of the first bracket by each term of the second. Two x gives two x cubed, plus two x squared, minus eight x. Negative three gives negative three x squared, minus three x, plus twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Collect like terms: two x cubed, minus x squared, minus eleven x, plus twelve.', show: 'm.2', focus: 'm.2' },
        { say: 'The quotient, f over g, is simply two x minus three, over x squared plus x minus four, wherever the denominator is not zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Subtract every term',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtract every term', md: '$(f - g)(x)$ subtracts **all** of $g(x)$. Put $g(x)$ in brackets first: $-(x^2 + x - 4) = -x^2 - x + 4$, not $-x^2 + x - 4$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{2x - 3 - x^2 + x - 4 = -x^2 + 3x - 7}', '\\good{2x - 3 - x^2 - x + 4 = -x^2 + x + 1}'] },
      ],
      lines: [
        { say: 'The most common mistake is to subtract only the first term of g of x.', show: 'oops' },
        { say: 'Without brackets, you might write two x minus three, minus x squared, plus x, minus four. That changes only the sign of x squared, and gives the wrong answer: negative x squared plus three x minus seven.', show: 'm.0', focus: 'm.0' },
        { say: 'So put g of x in brackets first. The minus sign changes every term: negative x squared, minus x, plus four. That gives the right answer: negative x squared plus x plus one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = x^2 - 5$ and $g(x) = 3x - 2$, what is $(f - g)(x)$?',
          choices: ['$x^2 + 3x - 7$', '$x^2 - 3x - 7$', '$-x^2 + 3x + 3$', '$x^2 - 3x - 3$'],
          answer: 3,
          working: '$(f - g)(x) = (x^2 - 5) - (3x - 2) = x^2 - 5 - 3x + 2 = x^2 - 3x - 3$',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals x squared minus five, and g of x equals three x minus two, what is f minus g, of x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Subtract all of g of x: x squared minus five, minus three x, plus two. That is x squared minus three x minus three. Choice B subtracts the three x, but forgets to change the sign of the negative two.', show: 'q.answer' },
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
            '$(f + g)(x) = f(x) + g(x)$ and $(f - g)(x) = f(x) - g(x)$.',
            '$(fg)(x) = f(x) \\cdot g(x)$ and $\\left(\\dfrac{f}{g}\\right)(x) = \\dfrac{f(x)}{g(x)}$, where $g(x) \\ne 0$.',
            'Put $g(x)$ in brackets, and subtract every term.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. f plus g, of x, adds the outputs, and f minus g, of x, subtracts them.', show: 'sum.0' },
        { say: 'f g of x multiplies the outputs, and f over g, of x, divides them, where g of x is not zero.', show: 'sum.1' },
        { say: 'And when you subtract, put g of x in brackets, and subtract every term. In part two, we evaluate combined functions from equations, tables and graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
