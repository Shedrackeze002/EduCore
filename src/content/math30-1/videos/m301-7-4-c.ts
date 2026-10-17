import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-7-4-c',
  lessonId: 'm301-7-4',
  title: 'Understanding Logarithms, Part 3: Solving Equations by Converting',
  thumbnailTitle: 'Solving by Converting',
  summary: 'Solving logarithmic equations by rewriting them in exponential form: an unknown argument (log₅ x = −2, log₄ x = 3/2), an unknown base (log_x 81 = 4, where the base must be positive) and a logarithm inside a logarithm, log₂(log₃ x) = 2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.4 · Part 3', title: 'Solving Equations by Converting', subtitle: 'Rewrite in exponential form' }],
      lines: [
        { say: 'A logarithmic equation can look tricky. But rewrite it in exponential form, and it often solves itself at once.', show: 'title' },
        { say: 'In this video, you will solve for an unknown argument, an unknown base, and a logarithm inside a logarithm.' },
      ],
    },
    {
      chapter: 'An unknown argument',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{5} x = -2', 'x = 5^{-2} = \\dfrac{1}{25}', '\\log_{4} x = \\dfrac{3}{2}', 'x = 4^{\\frac{3}{2}} = \\left(\\sqrt{4}\\right)^{3} = 2^{3} = 8'] },
      ],
      lines: [
        { say: 'Solve log base five of x equals negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'In exponential form, the base five is raised to the logarithm, negative two, to give x. So x equals five to the power negative two, which is one over 25.', show: 'm.1', focus: 'm.1' },
        { say: 'Now solve log base four of x equals three halves.', show: 'm.2', focus: 'm.2' },
        { say: 'So x equals four to the power three halves. The denominator, two, means a square root, and the numerator, three, means a cube. The square root of four is two, and two cubed is eight.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'An unknown base',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{x} 81 = 4', 'x^{4} = 81', 'x = \\pm 3', 'x = 3'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The base must be positive', md: 'The base of a logarithm must be positive and not $1$, so reject $x = -3$.' },
      ],
      lines: [
        { say: 'Solve log base x of 81 equals four. This time, the unknown is the base.', show: 'm.0', focus: 'm.0' },
        { say: 'In exponential form: x to the power four equals 81.', show: 'm.1', focus: 'm.1' },
        { say: 'Three to the power four is 81. But negative three to the power four is also 81, because an even power makes it positive. So x is three or negative three.', show: 'm.2', focus: 'm.2' },
        { say: 'Here is the catch. The base of a logarithm must be positive, and not one. So reject negative three. The only solution is x equals three.', show: ['m.3', 'oops'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A logarithm inside a logarithm',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{2}\\left(\\log_{3} x\\right) = 2', '\\log_{3} x = 2^{2} = 4', 'x = 3^{4} = 81'] },
      ],
      lines: [
        { say: 'Solve log base two of the quantity, log base three of x, equals two.', show: 'm.0', focus: 'm.0' },
        { say: 'Work from the outside in. The outer logarithm has base two, and its argument is log base three of x. So log base three of x equals two squared, which is four.', show: 'm.1', focus: 'm.1' },
        { say: 'Now convert again: x equals three to the power four, which is 81.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: log base three of 81 is four, and log base two of four is two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\log_{x} 16 = -2$.',
          choices: ['$x = \\pm\\frac{1}{4}$', '$x = \\frac{1}{4}$', '$x = -8$', '$x = 4$'],
          answer: 1,
          working: '$x^{-2} = 16$, so $x^{2} = \\frac{1}{16}$ and $x = \\pm\\frac{1}{4}$. The base must be positive, so $x = \\frac{1}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve log base x of 16 equals negative two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. x to the power negative two equals 16, so x squared is one sixteenth, and x is plus or minus one quarter. The base must be positive, so x is one quarter. D forgets the negative exponent: four to the power negative two is one sixteenth, not 16.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['To solve, convert $\\log_{c} x = y$ to $c^{y} = x$.', 'The base of a logarithm must be positive and not $1$: reject any other value.', 'With a logarithm inside a logarithm, work from the outside in.'] }],
      lines: [
        { say: 'Let’s sum up. To solve a logarithmic equation, convert it to exponential form.', show: 'sum.0' },
        { say: 'If the unknown is the base, remember that the base must be positive and not one. Reject any other value.', show: 'sum.1' },
        { say: 'And with a logarithm inside a logarithm, work from the outside in. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
