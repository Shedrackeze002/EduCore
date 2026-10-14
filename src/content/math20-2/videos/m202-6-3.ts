import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-4, 2], y: [-9, 6], every: 0 });
const f = (x: number) => 2 * (x - 1) * (x + 3);

const video: Explainer = {
  id: 'm202-6-3',
  lessonId: 'm202-6-3',
  title: 'Quadratic Functions in Factored Form, Part 1: Reading the Zeros',
  thumbnailTitle: 'Factored Form',
  thumbnail: 'ff',
  summary: 'Quadratic functions in factored form y = a(x − r)(x − s), why r and s are the zeros (the zero product property), reading the zeros of y = 2(x − 1)(x + 3) and the direction it opens, and why the zero of (x + 3) is −3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 6.3 · Part 1', title: 'Factored Form', subtitle: 'The zeros in the equation' }],
      lines: [
        { say: 'If you know where a parabola crosses the x-axis, you already know a lot about it. Factored form puts those zeros right in the equation.', show: 'title' },
        { say: 'In this video, you will read the zeros of a quadratic function from factored form, and see why they work.' },
      ],
    },
    {
      chapter: 'Factored form',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factored form', md: 'A quadratic function is in **factored form** when it is written as $y = a(x - r)(x - s)$, with $a \\ne 0$. Its zeros are $r$ and $s$, and $a$ is the same as the $a$ in standard form.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = r:\\quad y = a(0)(r - s) = 0', '\\text{zero product property: if } AB = 0, \\text{ then } A = 0 \\text{ or } B = 0'] },
      ],
      lines: [
        { say: 'A quadratic function is in factored form when it is written as y equals "a", times x minus r, times x minus s. Its zeros are r and s, and "a" is the same number as in standard form.', show: 'def' },
        { say: 'Why are r and s the zeros? When x equals r, the factor x minus r is zero, and anything multiplied by zero is zero. So y is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'And a product can only be zero if one of its factors is zero. That is the zero product property, so the zeros are r and s, and nothing else.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Reading the zeros',
      layout: 'split',
      leftWidth: 540,
      left: [figure('ff', [g, plot(g, { id: 'curve', f, tone: 'brand' }), dots(g, [{ id: 'z1', x: -3, y: 0, tex: '(-3, 0)', tone: 'good', place: 'above left' }, { id: 'z2', x: 1, y: 0, tex: '(1, 0)', tone: 'good', place: 'above right' }])], 440)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 2(x - 1)(x + 3)', 'x - 1 = 0 \\;\\Rightarrow\\; x = 1', 'x + 3 = 0 \\;\\Rightarrow\\; x = -3', 'a = 2 > 0:\\ \\text{opens up}'] }],
      lines: [
        { say: 'Find the zeros of y equals two, times x minus one, times x plus three, and say which way the parabola opens.', show: 'm.0', focus: 'm.0' },
        { say: 'Set each factor equal to zero. x minus one is zero when x is one, and x plus three is zero when x is negative three.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'And "a" is two, which is positive, so the parabola opens up. The graph agrees: it crosses the x-axis at negative three and one, and opens up.', show: ['ff.grid', 'ff.axes', 'ff.curve', 'ff.z1', 'ff.z2', 'm.3'], focus: ['ff.z1', 'ff.z2', 'm.3'] },
      ],
    },
    {
      chapter: 'The sign flips',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign flips', md: 'In $(x + 3)$ the zero is $-3$, not $3$. Ask: what value of $x$ makes this bracket $0$? It can help to read $(x + 3)$ as $(x - (-3))$.' }],
      lines: [
        { say: 'The most common slip is the sign. In x plus three, the zero is negative three, not three.', show: 'oops' },
        { say: 'Ask: what value of x makes this bracket zero? It can help to read x plus three as x minus negative three, to match the form x minus r.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the zeros of $y = -3(x + 4)(x - 2)$?',
          choices: ['$-4$ and $2$', '$4$ and $-2$', '$-3$, $-4$ and $2$', '$4$ and $2$'],
          answer: 0,
          working: '$x + 4 = 0$ gives $x = -4$, and $x - 2 = 0$ gives $x = 2$. The $-3$ is $a$; it is not a zero.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the zeros of y equals negative three, times x plus four, times x minus two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus four is zero at negative four, and x minus two is zero at two. The negative three is "a": it makes the parabola open down, but it is not a zero.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Factored form: $y = a(x - r)(x - s)$.', 'The zeros are $r$ and $s$: set each factor equal to $0$.', 'Watch the signs: $(x + 3)$ gives the zero $-3$.'] }],
      lines: [
        { say: 'Let’s sum up. Factored form is y equals "a", times x minus r, times x minus s.', show: 'sum.0' },
        { say: 'Its zeros are r and s: set each factor equal to zero.', show: 'sum.1' },
        { say: 'And watch the signs. In part two, we find the axis, vertex and y-intercept from factored form. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
