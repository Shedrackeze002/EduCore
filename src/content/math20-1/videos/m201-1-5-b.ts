import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-1-5-b',
  lessonId: 'm201-1-5',
  title: 'Infinite Geometric Series, Part 2: Using the Sum',
  thumbnailTitle: 'Using the Infinite Sum',
  summary: 'The sum of an infinite series with a negative ratio, why the formula fails when |r| ≥ 1, the values of x that make a series converge, a ball that bounces forever, and writing a repeating decimal as a fraction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.5 · Part 2', title: 'Using the Infinite Sum', subtitle: 'Check |r| < 1 first' }],
      lines: [
        { say: 'An infinite geometric series has a sum when the absolute value of its ratio is less than one, and that sum is t sub one over one minus r.', show: 'title' },
        { say: 'In this video, you will use the formula with a negative ratio and with a variable, and apply it to bouncing balls and repeating decimals.' },
      ],
    },
    {
      chapter: 'A negative ratio',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['r = \\dfrac{-8}{20} = -0.4,\\quad |r| < 1', 'S_\\infty = \\dfrac{20}{1 - (-0.4)} = \\dfrac{20}{1.4} = \\dfrac{100}{7} \\approx 14.29'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the formula when |r| ≥ 1', md: 'For $3 + 6 + 12 + \\cdots$, the formula gives $\\dfrac{3}{1 - 2} = -3$. A sum of positive numbers cannot be negative: the series diverges.' },
      ],
      lines: [
        { say: 'Find the exact sum of twenty minus eight plus 3.2, and so on. The ratio is negative eight over twenty: negative 0.4. Its absolute value is less than one, so the series converges.', show: 'm.0', focus: 'm.0' },
        { say: 'The sum is twenty over one minus negative 0.4: twenty over 1.4, which is 100 over seven, about 14.29. Careful with the double negative: one minus negative 0.4 is 1.4.', show: 'm.1', focus: 'm.1' },
        { say: 'Always check the ratio first. For three plus six plus twelve, the formula gives three over one minus two: negative three. But a sum of positive numbers cannot be negative. The ratio is two, so the series diverges, and has no sum.', show: 'oops' },
      ],
    },
    {
      chapter: 'A ratio with a variable',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['1 + 2x + 4x^2 + 8x^3 + \\cdots', 'r = \\dfrac{2x}{1} = 2x', '|2x| < 1,\\quad {-1} < 2x < 1,\\quad {-\\tfrac{1}{2}} < x < \\tfrac{1}{2}'] }],
      lines: [
        { say: 'When the ratio contains a variable, the test becomes an inequality. For which values of x does one plus two x plus four x squared, and so on, converge?', show: 'm.0', focus: 'm.0' },
        { say: 'The ratio is two x over one: two x.', show: 'm.1', focus: 'm.1' },
        { say: 'It converges when two x is between negative one and one. Divide by two: x is between negative one half and one half.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Bouncing forever',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{down: } 10 + 6 + 3.6 + \\cdots = \\dfrac{10}{1 - 0.6} = 25', '\\text{up: } 6 + 3.6 + 2.16 + \\cdots = \\dfrac{6}{1 - 0.6} = 15', '25 + 15 = 40\\text{ m}'] }],
      lines: [
        { say: 'A ball is dropped from ten metres, and rebounds to sixty percent of the height it fell from each time. In theory, it bounces forever. Find the total vertical distance it travels.' },
        { say: 'Split the path into two series. Going down: ten plus six plus 3.6, and so on. That is ten over one minus 0.6: 25 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Going up: six plus 3.6 plus 2.16, and so on. That is six over 0.4: fifteen metres.', show: 'm.1', focus: 'm.1' },
        { say: 'So the total distance is 25 plus fifteen: forty metres, even though the ball bounces infinitely many times.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A repeating decimal',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['0.\\overline{36} = 0.36 + 0.0036 + 0.000036 + \\cdots', 'S_\\infty = \\dfrac{0.36}{1 - 0.01} = \\dfrac{0.36}{0.99} = \\dfrac{36}{99} = \\dfrac{4}{11}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Any repeating decimal is a fraction', md: 'A block of $k$ repeating digits is a geometric series with $r = 0.1^k$, so every repeating decimal is rational.' },
      ],
      lines: [
        { say: 'Write zero point three six, repeating, as a fraction. Split it into blocks: 0.36, plus 0.0036, plus 0.000036, and so on.', show: 'm.0', focus: 'm.0' },
        { say: 'That is a geometric series with t sub one 0.36, and r one hundredth. Its sum is 0.36 over 0.99, which is 36 over 99, or four elevenths.', show: 'm.1', focus: 'm.1' },
        { say: 'This works for any repeating decimal. A block of k repeating digits gives a ratio of 0.1 to the k, so every repeating decimal is a rational number.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the sum of $12 - 6 + 3 - \\cdots$',
          choices: ['$8$', '$24$', '$4$', '$-12$'],
          answer: 0,
          working: '$r = -\\frac{1}{2}$, and $S_\\infty = \\dfrac{12}{1 - \\left(-\\frac{1}{2}\\right)} = \\dfrac{12}{1.5} = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the sum of twelve minus six plus three, and so on. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The ratio is negative one half, so the sum is twelve over one plus one half: twelve over 1.5, which is eight. B uses one minus one half, dropping the negative sign.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Check $|r| < 1$ before using $S_\\infty = \\dfrac{t_1}{1 - r}$.', 'With a variable in $r$, solve $-1 < r < 1$.', 'Bouncing balls and repeating decimals are infinite geometric series.'] }],
      lines: [
        { say: 'Let’s sum up. Check that the absolute value of r is less than one, before you use the sum formula.', show: 'sum.0' },
        { say: 'With a variable in the ratio, solve r between negative one and one.', show: 'sum.1' },
        { say: 'And bouncing balls and repeating decimals are infinite geometric series. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
