import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-4-3-c',
  lessonId: 'm202-4-3',
  title: 'Dividing Radicals, Part 3: Two Terms in the Numerator',
  thumbnailTitle: 'Rationalizing with Two Terms',
  thumbnail: 'm',
  summary: 'Rationalizing a fraction with two terms on top, (6 + √10)/√2 = 3√2 + √5, checking the answer by estimating, and a second example, (10 + √15)/√5 = 2√5 + √3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.3 · Part 3', title: 'Two Terms in the Numerator', subtitle: 'Multiply each term, divide each term' }],
      lines: [
        { say: 'When the numerator has two terms, rationalizing takes one more idea: every term must be multiplied, and every term must be divided.', show: 'title' },
        { say: 'In this video, you will rationalize fractions with a binomial numerator, and check the answer by estimating.' },
      ],
    },
    {
      chapter: 'A binomial numerator',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{6 + \\sqrt{10}}{\\sqrt{2}} \\times \\dfrac{\\sqrt{2}}{\\sqrt{2}} = \\dfrac{6\\sqrt{2} + \\sqrt{20}}{2}', '= \\dfrac{6\\sqrt{2} + 2\\sqrt{5}}{2}', '= \\dfrac{6\\sqrt{2}}{2} + \\dfrac{2\\sqrt{5}}{2} = 3\\sqrt{2} + \\sqrt{5}'] }],
      lines: [
        { say: 'Simplify six plus root ten, over root two, so the denominator has no radical. Multiply the top and the bottom by root two. On top, multiply each term: six times root two is six root two, and root ten times root two is root twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'Simplify the radicals: root twenty is two root five.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide each term by the denominator, two. Six root two over two is three root two, and two root five over two is root five. The answer is three root two, plus root five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check by estimating',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{6 + \\sqrt{10}}{\\sqrt{2}} \\approx \\dfrac{6 + 3.162}{1.414} \\approx 6.48', '3\\sqrt{2} + \\sqrt{5} \\approx 4.243 + 2.236 \\approx 6.48\\;\\checkmark'] }],
      lines: [
        { say: 'A calculator gives a quick check. The original fraction is about six plus 3.162, divided by 1.414, which is about 6.48.', show: 'm.0', focus: 'm.0' },
        { say: 'And three root two plus root five is about 4.243 plus 2.236, which is also about 6.48. The value did not change, so the work is right.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice that the rationalized answer is easier to estimate: there is nothing to divide.' },
      ],
    },
    {
      chapter: 'Another example',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{10 + \\sqrt{15}}{\\sqrt{5}} \\times \\dfrac{\\sqrt{5}}{\\sqrt{5}} = \\dfrac{10\\sqrt{5} + \\sqrt{75}}{5}', '= \\dfrac{10\\sqrt{5} + 5\\sqrt{3}}{5}', '= 2\\sqrt{5} + \\sqrt{3}'] }],
      lines: [
        { say: 'One more: ten plus root fifteen, over root five. Multiply the top and bottom by root five. Ten times root five is ten root five, and root fifteen times root five is root seventy-five.', show: 'm.0', focus: 'm.0' },
        { say: 'Root seventy-five is five root three. Then divide each term by five: two root five, plus root three.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Dividing only the first term by five would leave the second term five times too big, so divide every term.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{8 + \\sqrt{12}}{\\sqrt{2}}$ so that the denominator has no radical.',
          choices: ['$4\\sqrt{2} + \\sqrt{6}$', '$4\\sqrt{2} + 2\\sqrt{6}$', '$8\\sqrt{2} + \\sqrt{6}$', '$4 + \\sqrt{6}$'],
          answer: 0,
          working: '$\\dfrac{8\\sqrt{2} + \\sqrt{24}}{2} = \\dfrac{8\\sqrt{2} + 2\\sqrt{6}}{2} = 4\\sqrt{2} + \\sqrt{6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify eight plus root twelve, over root two, so the denominator has no radical. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply by root two over root two to get eight root two plus root twenty-four, over two. Root twenty-four is two root six, and dividing each term by two gives four root two plus root six.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply each term on top by the radical.', 'Simplify the radicals, then divide each term by the denominator.', 'Check by estimating both forms.'] }],
      lines: [
        { say: 'Let’s sum up. With two terms on top, multiply each term by the radical in the denominator.', show: 'sum.0' },
        { say: 'Simplify the radicals, then divide each term by the new denominator.', show: 'sum.1' },
        { say: 'And check by estimating both forms with a calculator. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
