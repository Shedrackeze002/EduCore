import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-7-2-c',
  lessonId: 'm201-7-2',
  title: 'Absolute Value Functions, Part 3: Piecewise Form',
  thumbnailTitle: 'Piecewise Absolute Value Functions',
  thumbnail: 'm',
  summary: 'Writing y = |2x − 4| and y = |x² − 2x − 8| as piecewise functions by finding where f(x) ≥ 0, and reversing the inequality for y = |−3x + 6|.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.2 · Part 3', title: 'Piecewise Form', subtitle: 'One rule for each interval' }],
      lines: [
        { say: 'An absolute value hides a choice: keep the sign, or flip it. Writing the function piecewise makes that choice explicit.', show: 'title' },
        { say: 'In this video, you will write absolute value functions as piecewise functions.' },
      ],
    },
    {
      chapter: 'Piecewise functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Piecewise function', md: 'A function made of different expressions on different intervals of its domain.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['|A| = A \\ \\text{ if } A \\ge 0,\\qquad |A| = -A \\ \\text{ if } A < 0'] },
      ],
      lines: [
        { say: 'A piecewise function is made of different expressions, on different intervals of its domain.', show: 'def' },
        { say: 'The absolute value of "A" is "A" when "A" is at least zero, and negative "A" when "A" is negative. So every absolute value function can be written piecewise.', show: 'm.0', focus: 'm.0' },
        { say: 'Solve f of x greater than or equal to zero, to find where each piece applies.' },
      ],
    },
    {
      chapter: 'A linear function',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x - 4 \\ge 0 \\text{ when } x \\ge 2', 'x < 2:\\quad y = -(2x - 4) = -2x + 4', 'y = \\begin{cases} 2x - 4, & x \\ge 2 \\\\ -2x + 4, & x < 2 \\end{cases}'] }],
      lines: [
        { say: 'Write y equals the absolute value of two x minus four in piecewise form. Two x minus four is at least zero when x is at least two, and there y equals two x minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'When x is less than two, y is the opposite: negative, two x minus four, which is negative two x plus four.', show: 'm.1', focus: 'm.1' },
        { say: 'So y is two x minus four for x at least two, and negative two x plus four for x less than two. These are the two arms of the V.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A quadratic function',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^2 - 2x - 8 = (x - 4)(x + 2)', 'f(x) \\ge 0 \\text{ when } x \\le -2 \\text{ or } x \\ge 4', 'y = \\begin{cases} x^2 - 2x - 8, & x \\le -2 \\text{ or } x \\ge 4 \\\\ -(x^2 - 2x - 8), & -2 < x < 4 \\end{cases}'] }],
      lines: [
        { say: 'For y equals the absolute value of x squared, minus two x, minus eight, use the zeros. The parabola opens up, with zeros negative two and four.', show: 'm.0', focus: 'm.0' },
        { say: 'So f of x is at least zero outside the zeros, when x is at most negative two, or at least four, and negative between them.', show: 'm.1', focus: 'm.1' },
        { say: 'The piecewise form keeps x squared, minus two x, minus eight, outside the zeros, and uses its opposite between them.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A negative coefficient',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['-3x + 6 \\ge 0:\\quad {-3x} \\ge -6,\\ \\ x \\le 2', 'y = \\begin{cases} -3x + 6, & x \\le 2 \\\\ 3x - 6, & x > 2 \\end{cases}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A negative coefficient', md: 'Dividing $-3x \\ge -6$ by $-3$ reverses the inequality: $x \\le 2$, not $x \\ge 2$.' },
      ],
      lines: [
        { say: 'Watch for a negative coefficient. For y equals the absolute value of negative three x plus six, solve negative three x plus six at least zero. Negative three x is at least negative six, and dividing by negative three reverses the inequality: x is at most two.', show: ['m.0', 'oops'], focus: 'm.0' },
        { say: 'So the pieces are negative three x plus six, for x at most two, and three x minus six, for x greater than two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the piecewise form of $y = |x + 3|$?',
          choices: ['$y = x + 3$ if $x \\ge -3$; $y = -x - 3$ if $x < -3$', '$y = x + 3$ if $x \\ge 3$; $y = -x - 3$ if $x < 3$', '$y = x + 3$ if $x \\ge -3$; $y = x - 3$ if $x < -3$', '$y = -x - 3$ if $x \\ge -3$; $y = x + 3$ if $x < -3$'],
          answer: 0,
          working: '$x + 3 \\ge 0$ when $x \\ge -3$. For $x < -3$, $y = -(x + 3) = -x - 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the piecewise form of y equals the absolute value of x plus three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus three is at least zero when x is at least negative three. Below that, y is the opposite, negative x minus three. B uses the wrong boundary, and C only changes one sign.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use $f(x)$ where $f(x) \\ge 0$, and $-f(x)$ where $f(x) < 0$.', 'Find the intervals from the zeros of $f$.', 'Reverse the inequality when you divide by a negative.'] }],
      lines: [
        { say: 'Let’s sum up. In piecewise form, use f of x where f of x is at least zero, and negative f of x where it is negative.', show: 'sum.0' },
        { say: 'Find the intervals from the zeros of f.', show: 'sum.1' },
        { say: 'And reverse the inequality when you divide by a negative number. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
