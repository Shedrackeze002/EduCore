import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-5-2-c',
  lessonId: 'm201-5-2',
  title: 'Multiplying and Dividing Radicals, Part 3: Binomial Denominators',
  thumbnailTitle: 'Binomial Denominators',
  thumbnail: 'm',
  summary: 'Rationalizing binomial denominators with conjugates: 6/(2 + √3), (√5 + √2)/(√5 − √2) and 4/(√x + 1) with its restriction, and why multiplying by the denominator itself does not work.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 5.2 · Part 3', title: 'Binomial Denominators', subtitle: 'Multiply by the conjugate' }],
      lines: [
        { say: 'Multiplying by root three will not clear a denominator like two plus root three: it just moves the radical around. The conjugate does the job.', show: 'title' },
        { say: 'In this video, you will rationalize binomial denominators, with numbers and with variables.' },
      ],
    },
    {
      chapter: 'Using a conjugate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{6}{2 + \\sqrt{3}} \\times \\dfrac{2 - \\sqrt{3}}{2 - \\sqrt{3}}', '\\left(2 + \\sqrt{3}\\right)\\left(2 - \\sqrt{3}\\right) = 4 - 3 = 1', '6\\left(2 - \\sqrt{3}\\right) = 12 - 6\\sqrt{3}'] }],
      lines: [
        { say: 'Rationalize six over two plus root three. Multiply the numerator and the denominator by the conjugate of the denominator, two minus root three.', show: 'm.0', focus: 'm.0' },
        { say: 'The denominator becomes two squared, minus root three, squared: four minus three, which is one.', show: 'm.1', focus: 'm.1' },
        { say: 'The numerator is six times two minus root three, or twelve minus six root three. Over a denominator of one, that is the answer: twelve minus six root three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Radicals on top and bottom',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\sqrt{5} + \\sqrt{2}}{\\sqrt{5} - \\sqrt{2}} \\times \\dfrac{\\sqrt{5} + \\sqrt{2}}{\\sqrt{5} + \\sqrt{2}}', '\\text{denominator: } 5 - 2 = 3', '\\text{numerator: } \\left(\\sqrt{5} + \\sqrt{2}\\right)^2 = 5 + 2\\sqrt{10} + 2 = 7 + 2\\sqrt{10}', '\\dfrac{7 + 2\\sqrt{10}}{3}'] }],
      lines: [
        { say: 'Rationalize root five plus root two, over root five minus root two. The conjugate of the denominator is root five plus root two.', show: 'm.0', focus: 'm.0' },
        { say: 'The denominator becomes five minus two, which is three.', show: 'm.1', focus: 'm.1' },
        { say: 'The numerator is root five plus root two, squared: five, plus two root ten, plus two, which is seven plus two root ten.', show: 'm.2', focus: 'm.2' },
        { say: 'So the answer is seven plus two root ten, all over three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'With variables',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{4}{\\sqrt{x} + 1} \\times \\dfrac{\\sqrt{x} - 1}{\\sqrt{x} - 1} = \\dfrac{4\\left(\\sqrt{x} - 1\\right)}{x - 1}', 'x \\ge 0,\\quad x \\ne 1'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying by the wrong thing', md: 'Multiplying $\\dfrac{6}{2 + \\sqrt{3}}$ by $\\dfrac{2 + \\sqrt{3}}{2 + \\sqrt{3}}$ gives the denominator $7 + 4\\sqrt{3}$, still irrational. Use the **conjugate**, on top and bottom.' },
      ],
      lines: [
        { say: 'The same idea works with variables. Multiply four over root x plus one by the conjugate, root x minus one, over itself. The denominator becomes x minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Here x must be non-negative, for root x to be real. And x cannot be one, because then root x minus one is zero, and we would be multiplying by zero over zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Be sure to use the conjugate. Multiplying six over two plus root three by two plus root three, over itself, gives a denominator of seven plus four root three, which is still irrational.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Rationalize $\\dfrac{2}{\\sqrt{3} - 1}$.',
          choices: ['$\\sqrt{3} + 1$', '$\\sqrt{3} - 1$', '$2\\sqrt{3} + 2$', '$\\dfrac{2\\sqrt{3}}{3}$'],
          answer: 0,
          working: 'Multiply by $\\dfrac{\\sqrt{3} + 1}{\\sqrt{3} + 1}$. The denominator is $3 - 1 = 2$, so the result is $\\dfrac{2\\left(\\sqrt{3} + 1\\right)}{2} = \\sqrt{3} + 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Rationalize two over root three minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply by root three plus one, over itself. The denominator is three minus one, which is two, and two times root three plus one, over two, is root three plus one. C forgets to divide by the two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply the numerator and denominator by the conjugate of the denominator.', 'The denominator becomes rational: $a^2 - b^2m$.', 'State restrictions on variables, such as $x \\ne 1$.'] }],
      lines: [
        { say: 'Let’s sum up. To rationalize a binomial denominator, multiply the numerator and the denominator by its conjugate.', show: 'sum.0' },
        { say: 'The denominator becomes a rational number, "a" squared minus b squared m.', show: 'sum.1' },
        { say: 'And with variables, state the restrictions, such as x not equal to one. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
