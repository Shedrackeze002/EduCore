import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm201-3-3-b',
  lessonId: 'm201-3-3',
  title: 'Quadratic Functions in Standard Form, Part 2: Completing the Square',
  thumbnailTitle: 'Completing the Square',
  thumbnail: 'sq',
  summary: 'Why adding (b/2)² makes x² + bx a perfect square, shown as an area model, writing y = x² + 8x + 3 in vertex form, and factoring out a first for y = −2x² + 12x − 5, including the common mistake of not multiplying by a.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.3 · Part 2', title: 'Completing the Square', subtitle: 'From standard form to vertex form' }],
      lines: [
        { say: 'The formula finds the vertex, but completing the square rewrites the whole function in vertex form, so you can read every transformation from it.', show: 'title' },
        { say: 'In this video, you will complete the square, first when "a" is one, and then when it is not.' },
      ],
    },
    {
      chapter: 'Making a perfect square',
      layout: 'split',
      leftWidth: 460,
      left: [figure('sq', [areaModel({ top: ['x', '4'], side: ['x', '4'], cells: [['x^2', '4x'], ['4x', '16']], widths: [3.4, 1.6], heights: [3.4, 1.6] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x + k)^2 = x^2 + 2kx + k^2', 'x^2 + 8x + \\left(\\tfrac{8}{2}\\right)^2 = x^2 + 8x + 16', '= (x + 4)^2'] }],
      lines: [
        { say: 'Recall that x plus k, squared, is x squared, plus two k x, plus k squared. The middle term is two k x, so k is half the coefficient of x.', show: 'm.0', focus: 'm.0' },
        { say: 'Picture x squared plus eight x as an x by x square, with the eight x split into two strips, each four by x.', show: ['sq.top', 'sq.side', 'sq.c0-0', 'sq.c0-1', 'sq.c1-0', 'sq.grid'] },
        { say: 'A corner is missing: a four by four square, which is sixteen. Adding it completes the square.', show: ['sq.c1-1', 'sq.outline'], focus: 'sq.c1-1' },
        { say: 'So x squared, plus eight x, plus sixteen, is x plus four, squared. To make x squared plus b x a perfect square, add half of b, squared.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'When a = 1',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['y = x^2 + 8x + 3', 'y = (x^2 + 8x + 16) - 16 + 3', 'y = (x + 4)^2 - 13', '\\text{vertex } (-4, -13)'] }],
      lines: [
        { say: 'Write y equals x squared, plus eight x, plus three, in vertex form. Half of eight is four, and four squared is sixteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Add sixteen to make the perfect square, and subtract sixteen, so the function does not change.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor the perfect square, and combine the constants: y equals x plus four, squared, minus thirteen.', show: 'm.2', focus: 'm.2' },
        { say: 'So the vertex is negative four, negative thirteen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'When a ≠ 1',
      layout: 'split',
      leftWidth: 440,
      left: [{ kind: 'bullets', id: 'b', items: ['Factor $a$ out of the $x^2$ and $x$ terms.', 'Add and subtract the square of half the $x$ coefficient.', 'Multiply the subtracted term by $a$ as it leaves.', 'Factor the square; combine the constants.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -2x^2 + 12x - 5', 'y = -2(x^2 - 6x) - 5', 'y = -2(x^2 - 6x + 9 - 9) - 5', 'y = -2(x^2 - 6x + 9) + 18 - 5', 'y = -2(x - 3)^2 + 13'] }],
      lines: [
        { say: 'When "a" is not one, factor it out first. Write y equals negative two x squared, plus twelve x, minus five, in vertex form.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor negative two out of the x squared and x terms: negative two times x squared minus six x, then minus five.', show: ['b.0', 'm.1'], focus: 'm.1' },
        { say: 'Inside the brackets, half of negative six is negative three, and its square is nine. Add and subtract nine.', show: ['b.1', 'm.2'], focus: 'm.2' },
        { say: 'Now move the negative nine out of the brackets. It is multiplied by negative two, so it becomes plus eighteen.', show: ['b.2', 'm.3'], focus: 'm.3' },
        { say: 'Factor the perfect square, and combine the constants: y equals negative two times x minus three, squared, plus thirteen.', show: ['b.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check it',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to multiply by a', md: 'The $-9$ inside $-2(\\ \\ldots - 9)$ is worth $-2 \\times (-9) = +18$ outside the brackets. Writing $-2(x - 3)^2 - 9 - 5$ gives the wrong vertex.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = -\\dfrac{12}{2(-2)} = 3', '-2(3)^2 + 12(3) - 5 = 13 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'The most common mistake is forgetting to multiply by "a". The negative nine inside the brackets is worth plus eighteen outside them. Writing minus nine, minus five, gives the wrong vertex.', show: 'oops' },
        { say: 'Check the vertex with the formula. x equals negative twelve over negative four, which is three.', show: 'm.0', focus: 'm.0' },
        { say: 'And y is negative eighteen, plus thirty-six, minus five, which is thirteen. The vertex is three, thirteen, as the vertex form says.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $y = x^2 - 10x + 4$ in vertex form.',
          choices: ['$y = (x - 5)^2 - 21$', '$y = (x - 5)^2 + 29$', '$y = (x + 5)^2 - 21$', '$y = (x - 10)^2 + 4$'],
          answer: 0,
          working: 'Half of $-10$ is $-5$, and $(-5)^2 = 25$: $y = (x^2 - 10x + 25) - 25 + 4 = (x - 5)^2 - 21$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write y equals x squared, minus ten x, plus four, in vertex form. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Half of negative ten is negative five, and its square is twenty-five. Add and subtract twenty-five: x minus five, squared, minus twenty-one. B adds the twenty-five outside, instead of subtracting it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add and subtract $\\left(\\tfrac{b}{2}\\right)^2$ to make a perfect square.', 'When $a \\ne 1$, factor $a$ out first.', 'Multiply the subtracted term by $a$ as it leaves the brackets.'] }],
      lines: [
        { say: 'Let’s sum up. To complete the square, add and subtract the square of half the coefficient of x.', show: 'sum.0' },
        { say: 'When "a" is not one, factor it out of the x terms first.', show: 'sum.1' },
        { say: 'And multiply the subtracted term by "a" as it leaves the brackets. In part three, we analyze a function with fractions, and find a rocket’s maximum height. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
