import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-4-3-b',
  lessonId: 'm202-4-3',
  title: 'Dividing Radicals, Part 2: Rationalizing the Denominator',
  thumbnailTitle: 'Rationalizing the Denominator',
  thumbnail: 'm',
  summary: 'What rationalizing the denominator means and why it is done, multiplying by √3 / √3 to rewrite 5/√3 as 5√3/3, reducing 10√6/6 to 5√6/3, and why multiplying only the denominator changes the value.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.3 · Part 2', title: 'Rationalizing the Denominator', subtitle: 'No radicals on the bottom' }],
      lines: [
        { say: 'Answers like five over root three are correct, but mathematicians usually rewrite them so that there is no radical in the denominator.', show: 'title' },
        { say: 'In this video, you will learn why, and how to do it without changing the value.' },
      ],
    },
    {
      chapter: 'Why rationalize?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rationalize the denominator', md: 'To **rationalize the denominator** is to rewrite a fraction so that there is no radical in the denominator, without changing its value.' },
        { kind: 'bullets', id: 'b', items: ['It is easier to estimate: $\\dfrac{\\sqrt{2}}{2}$ is half of $1.414$.', 'Answers written the same way are easier to compare and combine.', 'Before calculators, dividing by $1.414\\ldots$ by hand was hard work.'] },
      ],
      lines: [
        { say: 'To rationalize the denominator is to rewrite a fraction so that there is no radical in the denominator, without changing its value.', show: 'def' },
        { say: 'Why do it? First, it is easier to estimate. Root two over two is just half of 1.414.', show: 'b.0' },
        { say: 'Second, when everyone writes answers the same way, they are easier to compare and combine. And before calculators, dividing by a long decimal like 1.414 by hand was hard work.', show: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Multiplying by one',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{5}{\\sqrt{3}} \\times \\dfrac{\\sqrt{3}}{\\sqrt{3}} = \\dfrac{5\\sqrt{3}}{3}', '\\dfrac{10}{\\sqrt{6}} \\times \\dfrac{\\sqrt{6}}{\\sqrt{6}} = \\dfrac{10\\sqrt{6}}{6}', '\\dfrac{10\\sqrt{6}}{6} = \\dfrac{5\\sqrt{6}}{3}'] }],
      lines: [
        { say: 'Multiply the numerator and the denominator by the radical in the denominator. Root three over root three is one, so the value does not change. And root three times root three is three, which clears the radical.', show: 'm.0', focus: 'm.0' },
        { say: 'So five over root three becomes five root three, over three.' },
        { say: 'Now rationalize ten over root six. Multiply the top and bottom by root six, and you get ten root six, over six.', show: 'm.1', focus: 'm.1' },
        { say: 'Then reduce. Ten and six are both outside the radical, and both divide by two. So the answer is five root six, over three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two things to watch',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Changing the value', md: 'Multiplying **only** the denominator by $\\sqrt{3}$ gives $\\dfrac{5}{3}$, which is not equal to $\\dfrac{5}{\\sqrt{3}}$. Multiply the top and the bottom by the same radical.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Reduce only the numbers outside', md: '$\\dfrac{10\\sqrt{6}}{6} = \\dfrac{5\\sqrt{6}}{3}$, but you cannot cancel the $6$ under the radical with the $6$ in the denominator.' },
      ],
      lines: [
        { say: 'Two things to watch. First, multiplying only the denominator by root three gives five over three, which is a different number. Multiply the top and the bottom by the same radical.', show: 'oops' },
        { say: 'Second, reduce only the numbers outside the radicals. In ten root six over six, you can divide the ten and the six by two. But you cannot cancel the six under the radical with the six in the denominator.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Rationalize the denominator: $\\dfrac{6}{\\sqrt{2}}$.',
          choices: ['$3\\sqrt{2}$', '$\\dfrac{6}{2}$', '$6\\sqrt{2}$', '$\\sqrt{3}$'],
          answer: 0,
          working: '$\\dfrac{6}{\\sqrt{2}} \\times \\dfrac{\\sqrt{2}}{\\sqrt{2}} = \\dfrac{6\\sqrt{2}}{2} = 3\\sqrt{2}$. B multiplies only the denominator.',
        },
      ],
      lines: [
        { say: 'Your turn. Rationalize the denominator of six over root two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply the top and bottom by root two to get six root two, over two. Then six over two is three, so the answer is three root two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Rationalizing removes the radical from the denominator.', 'Multiply the top and the bottom by the radical in the denominator.', 'Reduce only the numbers outside the radicals.'] }],
      lines: [
        { say: 'Let’s sum up. Rationalizing removes the radical from the denominator, without changing the value.', show: 'sum.0' },
        { say: 'Multiply the top and the bottom by the radical in the denominator.', show: 'sum.1' },
        { say: 'And reduce only the numbers outside the radicals. In part three, we rationalize when the numerator has two terms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
