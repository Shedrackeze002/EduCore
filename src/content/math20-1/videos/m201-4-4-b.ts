import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-4-4-b',
  lessonId: 'm201-4-4',
  title: 'The Discriminant and Applications, Part 2: Unknown Coefficients and Problems',
  thumbnailTitle: 'Using the Discriminant',
  thumbnail: 'm',
  summary: 'Finding k so that x² + kx + 9 = 0 has one real root and x² − 6x + k = 0 has two, then five steps for problems with quadratic equations, used on a garden whose length is 3 m more than twice its width and whose area is 44 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.4 · Part 2', title: 'Using the Discriminant', subtitle: 'Unknown coefficients and problems' }],
      lines: [
        { say: 'The discriminant can also work backwards. If you know how many roots an equation should have, you can find a missing coefficient.', show: 'title' },
        { say: 'In this video, you will find unknown coefficients, then solve a first problem with a quadratic equation.' },
      ],
    },
    {
      chapter: 'One real root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^2 + kx + 9 = 0', 'k^2 - 4(1)(9) = 0', 'k^2 = 36:\\quad k = 6 \\text{ or } k = -6'] }],
      lines: [
        { say: 'For which values of k does x squared, plus k x, plus nine, equals zero, have exactly one real root? One real root means the discriminant is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'The discriminant is k squared, minus four times one times nine, which is k squared minus thirty-six. Set it equal to zero.', show: 'm.1', focus: 'm.1' },
        { say: 'So k squared is thirty-six, and k is six, or negative six. Check: x squared, plus six x, plus nine, is x plus three, squared, with the single root negative three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two distinct real roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^2 - 6x + k = 0', '(-6)^2 - 4(1)(k) = 36 - 4k > 0', '36 > 4k:\\quad k < 9'] }],
      lines: [
        { say: 'For which values of k does x squared, minus six x, plus k, equals zero, have two distinct real roots? Now the discriminant must be greater than zero.', show: 'm.0', focus: 'm.0' },
        { say: 'The discriminant is thirty-six minus four k, so thirty-six minus four k is greater than zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Add four k to both sides: thirty-six is greater than four k. So k is less than nine. Any value of k less than nine gives two roots.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Solving problems',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'bullets', id: 'b', items: ['Define a variable, with units.', 'Write an equation from the situation.', 'Solve it.', '**Reject** roots that make no sense.', 'Answer in a sentence, with units.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['w(2w + 3) = 44', '2w^2 + 3w - 44 = 0', '(w - 4)(2w + 11) = 0', 'w = 4 \\quad (\\text{reject } {-\\tfrac{11}{2}})', '4\\text{ m by } 11\\text{ m}:\\ \\ 4 \\times 11 = 44 \\;\\checkmark'] }],
      lines: [
        { say: 'To solve a problem with a quadratic equation, define a variable with units, write an equation, and solve it. Then reject any root that makes no sense, and answer in a sentence, with units.', show: ['b.0', 'b.1', 'b.2', 'b.3', 'b.4'] },
        { say: 'In this example, a garden’s length is three metres more than twice its width, and its area is forty-four square metres. Let the width be w metres. The length is two w plus three, so w times two w plus three is forty-four.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand, and subtract forty-four: two w squared, plus three w, minus forty-four, equals zero. Eleven and negative eight split the middle term, so it factors as w minus four, times two w plus eleven.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So w is four, or negative eleven halves. A width cannot be negative, so reject it: w is four.', show: 'm.3', focus: ['m.3', 'b.3'] },
        { say: 'The garden is four metres wide and eleven metres long, and four times eleven is forty-four.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For which values of $k$ does $x^2 + 4x + k = 0$ have no real roots?',
          choices: ['$k > 4$', '$k < 4$', '$k = 4$', '$k > 16$'],
          answer: 0,
          working: 'No real roots: $b^2 - 4ac = 16 - 4k < 0$, so $16 < 4k$ and $k > 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. For which values of k does x squared, plus four x, plus k, equals zero, have no real roots? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. No real roots means the discriminant is negative: sixteen minus four k is less than zero. So sixteen is less than four k, and k is greater than four. B gives two roots, and C gives one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['One root: $b^2 - 4ac = 0$. Two: $> 0$. None: $< 0$.', 'Define a variable, write an equation, and solve.', 'Reject roots that make no sense, and answer with units.'] }],
      lines: [
        { say: 'Let’s sum up. To find an unknown coefficient, set the discriminant equal to zero for one root, greater than zero for two, or less than zero for none.', show: 'sum.0' },
        { say: 'To solve a problem, define a variable, write an equation, and solve it.', show: 'sum.1' },
        { say: 'Then reject roots that make no sense, and answer with units. In part three, we solve triangle, projectile and frame problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
