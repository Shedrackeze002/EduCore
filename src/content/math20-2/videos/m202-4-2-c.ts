import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm202-4-2-c',
  lessonId: 'm202-4-2',
  title: 'Adding, Subtracting and Multiplying Radicals, Part 3: The Distributive Property',
  thumbnailTitle: 'Expanding with Radicals',
  thumbnail: 'am',
  summary: 'Distributing a radical over brackets in √2(3 + √6), using an area model to find the exact area of a (4 + √3) m by (2 + √3) m garden, 11 + 6√3 m², and why there are four products, not two.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.2 · Part 3', title: 'Expanding with Radicals', subtitle: 'The distributive property' }],
      lines: [
        { say: 'Brackets with radicals inside expand exactly like brackets with variables. Each term multiplies each term, and then you simplify.', show: 'title' },
        { say: 'In this video, you will distribute a radical, and use an area model to multiply two binomials.' },
      ],
    },
    {
      chapter: 'Distributing a radical',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{2}\\left(3 + \\sqrt{6}\\right)', '= \\sqrt{2} \\times 3 + \\sqrt{2} \\times \\sqrt{6} = 3\\sqrt{2} + \\sqrt{12}', '= 3\\sqrt{2} + 2\\sqrt{3}'] }],
      lines: [
        { say: 'Expand and simplify root two, times three plus root six.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply each term inside the brackets by root two. Root two times three is three root two, and root two times root six is root twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Then simplify each product. Root twelve is two root three, so the answer is three root two, plus two root three. These are unlike radicals, so that is as simple as it gets.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The area of a garden',
      layout: 'split',
      leftWidth: 520,
      left: [figure('am', [areaModel({ top: ['4', '\\sqrt{3}'], side: ['2', '\\sqrt{3}'], cells: [['8', '2\\sqrt{3}'], ['4\\sqrt{3}', '3']] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\left(4 + \\sqrt{3}\\right)\\left(2 + \\sqrt{3}\\right)', '= 8 + 4\\sqrt{3} + 2\\sqrt{3} + 3', '= 11 + 6\\sqrt{3}', '\\approx 21.4\\text{ m}^2'] }],
      lines: [
        { say: 'A rectangular garden measures four plus root three metres, by two plus root three metres. Find its exact area.', show: ['am.top', 'am.side', 'am.outline', 'am.grid', 'm.0'], focus: 'm.0' },
        { say: 'For two binomials, multiply every term in the first bracket by every term in the second. An area model keeps track: four times two is eight, and root three times four is four root three.', show: ['am.c0-0', 'am.c1-0'], focus: ['am.c0-0', 'am.c1-0'] },
        { say: 'Two times root three is two root three, and root three times root three is three.', show: ['am.c0-1', 'am.c1-1', 'm.1'], focus: ['am.c0-1', 'am.c1-1', 'm.1'] },
        { say: 'Now collect like terms. Eight plus three is eleven, and four root three plus two root three is six root three. The area is eleven plus six root three square metres, about 21.4 square metres.', show: ['m.2', 'm.3'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Four products, not two',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying only the first terms', md: '$\\left(4 + \\sqrt{3}\\right)\\left(2 + \\sqrt{3}\\right)$ is not $8 + 3$. There are **four** products, one in each cell of the area model.' }],
      lines: [
        { say: 'A common mistake is to multiply only the first terms and the last terms: eight plus three. But there are four products, one in each cell of the area model. Leaving out the middle two loses six root three, which is more than ten square metres here.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Expand and simplify $\\left(3 + \\sqrt{2}\\right)\\left(1 + \\sqrt{2}\\right)$.',
          choices: ['$5 + 4\\sqrt{2}$', '$5$', '$5 + 3\\sqrt{2}$', '$3 + 4\\sqrt{2}$'],
          answer: 0,
          working: '$3 + 3\\sqrt{2} + \\sqrt{2} + 2 = 5 + 4\\sqrt{2}$. B keeps only two of the four products.',
        },
      ],
      lines: [
        { say: 'Your turn. Expand and simplify three plus root two, times one plus root two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The four products are three, three root two, root two, and two. Collect like terms: five plus four root two. B keeps only two of the four products.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Distribute: multiply each term in the brackets, then simplify.', 'Two binomials make four products; an area model tracks them.', 'Collect like terms: numbers with numbers, like radicals with like radicals.'] }],
      lines: [
        { say: 'Let’s sum up. To distribute, multiply each term in the brackets, then simplify each product.', show: 'sum.0' },
        { say: 'Two binomials make four products, and an area model keeps track of them.', show: 'sum.1' },
        { say: 'And collect like terms: numbers with numbers, and like radicals with like radicals. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
