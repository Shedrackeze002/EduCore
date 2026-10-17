import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-3-1',
  lessonId: 'm301-3-1',
  title: 'Characteristics of Polynomial Functions, Part 1: Degree and Leading Coefficient',
  thumbnailTitle: 'Polynomial Functions',
  summary: 'What makes a function a polynomial function, the names cubic, quartic and quintic, and reading the degree, leading coefficient and constant term of f(x) = 3x⁴ − 2x⁵ + x − 7 after writing it in descending order. Part 2 covers end behaviour.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.1 · Part 1', title: 'Polynomial Functions', subtitle: 'Degree, leading coefficient and constant term' }],
      lines: [
        { say: 'A sound engineer shaping a speaker cone, a civil engineer designing the curve of a ramp, and a biologist modelling a population all use polynomial functions.', show: 'title' },
        { say: 'In this video, you will learn what makes a function a polynomial function, and read its degree, leading coefficient and constant term straight from the equation.' },
      ],
    },
    {
      chapter: 'Polynomial functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Polynomial function', md: 'A **polynomial function** of degree $n$ can be written as $P(x) = a_nx^n + a_{n-1}x^{n-1} + \\dots + a_1x + a_0$, where $n$ is a whole number, the coefficients $a_n, a_{n-1}, \\dots, a_0$ are real numbers, and $a_n \\ne 0$.' },
        { kind: 'table', id: 't', head: ['Polynomial functions', 'Not polynomial functions'], rows: [['$y = 2x + 1$, $\\ y = x^2 - 4$', '$y = \\sqrt{x}$'], ['$y = x^3 - 4x$', '$y = \\dfrac{1}{x}$'], ['$y = 3x^4 - 2x^5 + x - 7$', '$y = 2^x$']] },
      ],
      lines: [
        { say: 'A polynomial function of degree n can be written as P of x equals "a" sub n, x to the n, plus "a" sub n minus one, x to the n minus one, and so on, down to "a" sub one x, plus "a" sub zero.', show: 'def' },
        { say: 'The exponents must be whole numbers. The coefficients, the "a" numbers, are real numbers, and the first one, "a" sub n, cannot be zero.' },
        { say: 'Linear and quadratic functions are polynomial functions you already know, and so are cubics like x cubed minus four x.', show: ['t.0', 't.1'] },
        { say: 'But y equals the square root of x, y equals one over x, and y equals two to the x are not polynomial functions. In each one, x does not have a whole-number exponent.', show: 't.2' },
      ],
    },
    {
      chapter: 'Naming by degree',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Degree', 'Name', 'Example'], rows: [['$1$', 'linear', '$y = 2x + 1$'], ['$2$', 'quadratic', '$y = x^2 - 4$'], ['$3$', '[[brand:cubic]]', '$y = x^3 - 4x$'], ['$4$', '[[brand:quartic]]', '$y = -x^4 + 5x^2 - 4$'], ['$5$', '[[brand:quintic]]', '$y = x^5 - x$']] }],
      lines: [
        { say: 'Polynomial functions are named by their degree. Linear functions have degree one, and quadratic functions have degree two.', show: ['t.0', 't.1'] },
        { say: 'This unit adds three more. Cubic functions have degree three.', show: 't.2', focus: 't.2' },
        { say: 'Quartic functions have degree four.', show: 't.3', focus: 't.3' },
        { say: 'And quintic functions have degree five.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Reading the features',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Degree, leading coefficient and constant term', md: 'The **degree** is the greatest exponent of $x$. The **leading coefficient** $a_n$ is the coefficient of that term. The **constant term** $a_0$ is the term with no $x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = 3x^4 - 2x^5 + x - 7', 'f(x) = \\opp{-2}x^{\\adj{5}} + 3x^4 + x \\good{- 7}', '\\text{degree } \\adj{5},\\quad \\text{leading coefficient } \\opp{{-2}},\\quad \\text{constant term } \\good{{-7}}'] },
      ],
      lines: [
        { say: 'Three features can be read straight from the equation. The degree is the greatest exponent of x. The leading coefficient is the coefficient of that term. And the constant term is the term with no x.', show: 'def' },
        { say: 'State the degree, the leading coefficient and the constant term of f of x equals three x to the fourth, minus two x to the fifth, plus x, minus seven.', show: 'm.0', focus: 'm.0' },
        { say: 'First, write the terms in descending order of degree: negative two x to the fifth, plus three x to the fourth, plus x, minus seven.', show: 'm.1', focus: 'm.1' },
        { say: 'The greatest exponent is five, so the degree is five, and the leading coefficient is negative two. The term with no x is negative seven, so that is the constant term.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The first term is not always the leading term', md: 'The leading term is the term with the highest power, wherever it is written. In $3x^4 - 2x^5 + x - 7$, the leading coefficient is $-2$, not $3$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3}x^4 \\opp{- 2x^5} + x - 7'] },
      ],
      lines: [
        { say: 'A common slip is to take the first coefficient you see. Three is written first, but three x to the fourth is not the term with the highest power.', show: ['oops', 'm.0'] },
        { say: 'The leading term is the term with the highest power, wherever it is written. Here it is negative two x to the fifth, so the leading coefficient is negative two, sign included.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the degree and the leading coefficient of $g(x) = 5x + 2x^3 - 4x^4 + 9$.',
          choices: ['Degree $3$; $a_n = 2$', 'Degree $1$; $a_n = 5$', 'Degree $4$; $a_n = 4$', 'Degree $4$; $a_n = -4$'],
          answer: 3,
          working: 'In descending order, $g(x) = -4x^4 + 2x^3 + 5x + 9$: the degree is $4$ and the leading coefficient is $-4$.',
        },
      ],
      lines: [
        { say: 'Your turn. State the degree and the leading coefficient of g of x equals five x, plus two x cubed, minus four x to the fourth, plus nine. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. In descending order, g of x is negative four x to the fourth, plus two x cubed, plus five x, plus nine. So the degree is four, and the leading coefficient is negative four. B takes the first term written, not the term with the highest power.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A polynomial function has whole-number exponents: $P(x) = a_nx^n + \\dots + a_1x + a_0$, with $a_n \\ne 0$.', 'The degree is the greatest exponent, and the leading coefficient $a_n$ is its coefficient.', 'Write the terms in descending order before you read them.'] }],
      lines: [
        { say: 'Let’s sum up. A polynomial function has whole-number exponents, and its leading coefficient is not zero.', show: 'sum.0' },
        { say: 'The degree is the greatest exponent, and the leading coefficient is the coefficient of that term. The constant term is the term with no x.', show: 'sum.1' },
        { say: 'And write the terms in descending order before you read them. In part two, we see how the degree and the leading coefficient decide where the ends of the graph go. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
