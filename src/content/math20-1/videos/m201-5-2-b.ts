import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-5-2-b',
  lessonId: 'm201-5-2',
  title: 'Multiplying and Dividing Radicals, Part 2: Conjugates and Rationalizing',
  thumbnailTitle: 'Rationalizing Denominators',
  thumbnail: 'm',
  summary: 'Conjugates and why a binomial times its conjugate has no radical, then rationalizing the monomial denominators of 5/(2√3) and 4√5/√6, and reducing only the coefficients at the end.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 5.2 · Part 2', title: 'Rationalizing Denominators', subtitle: 'No radical in the denominator' }],
      lines: [
        { say: 'An exact answer such as five over two root three is correct, but it is not in standard form. The standard form for an exact answer has no radical in the denominator.', show: 'title' },
        { say: 'In this video, you will multiply conjugates, and rationalize denominators that have a single term.' },
      ],
    },
    {
      chapter: 'Conjugates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conjugate', md: 'The **conjugate** of $a + b\\sqrt{m}$ is $a - b\\sqrt{m}$: change the sign between the terms. The conjugate of $\\sqrt{p} + \\sqrt{q}$ is $\\sqrt{p} - \\sqrt{q}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\left(a + b\\sqrt{m}\\right)\\left(a - b\\sqrt{m}\\right) = a^2 - b^2m', '\\left(5 + 2\\sqrt{3}\\right)\\left(5 - 2\\sqrt{3}\\right) = 25 - 12 = 13', '\\left(\\sqrt{7} + \\sqrt{2}\\right)\\left(\\sqrt{7} - \\sqrt{2}\\right) = 7 - 2 = 5'] },
      ],
      lines: [
        { say: 'The conjugate of "a" plus b root m is "a" minus b root m: change the sign between the terms. The conjugate of root p plus root q is root p minus root q.', show: 'def' },
        { say: 'A binomial times its conjugate is a difference of squares. The middle terms cancel, and b root m, squared, is b squared m, a rational number. So the radical disappears.', show: 'm.0', focus: 'm.0' },
        { say: 'Five plus two root three, times five minus two root three, is twenty-five minus twelve, which is thirteen.', show: 'm.1', focus: 'm.1' },
        { say: 'And root seven plus root two, times root seven minus root two, is seven minus two, which is five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rationalizing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rationalize', md: 'To **rationalize** a denominator is to rewrite a fraction, without changing its value, so that the denominator has no radical.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{5}{2\\sqrt{3}} \\times \\dfrac{\\sqrt{3}}{\\sqrt{3}} = \\dfrac{5\\sqrt{3}}{2 \\times 3} = \\dfrac{5\\sqrt{3}}{6}'] },
      ],
      lines: [
        { say: 'To rationalize a denominator is to rewrite a fraction, without changing its value, so that the denominator has no radical.', show: 'def' },
        { say: 'For a single term, multiply the numerator and the denominator by the radical in the denominator. You are multiplying by root m over root m, which is one, so the value does not change.' },
        { say: 'Rationalize five over two root three. Multiply by root three over root three. The numerator is five root three, and the denominator is two times three, or six.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Reduce at the end',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{4\\sqrt{5}}{\\sqrt{6}} \\times \\dfrac{\\sqrt{6}}{\\sqrt{6}} = \\dfrac{4\\sqrt{30}}{6}', '= \\dfrac{2\\sqrt{30}}{3}'] }],
      lines: [
        { say: 'Rationalize four root five, over root six. Multiply by root six over root six: the numerator is four root thirty, and the denominator is six.', show: 'm.0', focus: 'm.0' },
        { say: 'Then reduce. Four and six share a factor of two, so the answer is two root thirty, over three.', show: 'm.1', focus: 'm.1' },
        { say: 'You can only reduce the coefficient outside the radical with the denominator. The thirty and the six cannot cancel, because the thirty is inside the radical.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Rationalize $\\dfrac{3}{\\sqrt{6}}$.',
          choices: ['$\\dfrac{\\sqrt{6}}{2}$', '$\\dfrac{\\sqrt{6}}{6}$', '$\\dfrac{1}{2}$', '$\\dfrac{\\sqrt{3}}{2}$'],
          answer: 0,
          working: '$\\dfrac{3}{\\sqrt{6}} \\times \\dfrac{\\sqrt{6}}{\\sqrt{6}} = \\dfrac{3\\sqrt{6}}{6} = \\dfrac{\\sqrt{6}}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Rationalize three over root six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply by root six over root six, to get three root six over six. Then reduce three sixths to one half: root six over two. B drops the three, and D cancels inside the radical.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A binomial times its conjugate has no radical: $a^2 - b^2m$.', 'Rationalize $\\dfrac{a}{\\sqrt{m}}$ by multiplying by $\\dfrac{\\sqrt{m}}{\\sqrt{m}}$.', 'Reduce the coefficients at the end, never across the radical sign.'] }],
      lines: [
        { say: 'Let’s sum up. A binomial times its conjugate has no radical: it is "a" squared minus b squared m.', show: 'sum.0' },
        { say: 'To rationalize a single-term denominator, multiply by the radical over itself.', show: 'sum.1' },
        { say: 'And reduce the coefficients at the end, never across the radical sign. In part three, we rationalize binomial denominators. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
