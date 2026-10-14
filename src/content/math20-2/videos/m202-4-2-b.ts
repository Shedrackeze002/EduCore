import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-4-2-b',
  lessonId: 'm202-4-2',
  title: 'Adding, Subtracting and Multiplying Radicals, Part 2: Perimeters and Products',
  thumbnailTitle: 'Multiplying Radicals',
  thumbnail: 'fb',
  summary: 'The exact perimeter of a flower bed with sides √8, √18 and √32 m (9√2 m), multiplying radicals with (a√m)(b√n) = ab√(mn), simplifying √6 × √15 and (2√3)(5√2), and why √7 × √7 = 7.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.2 · Part 2', title: 'Perimeters and Products', subtitle: 'Exact answers with radicals' }],
      lines: [
        { say: 'A landscaper edging a triangular flower bed in Airdrie measures the sides as root eight, root eighteen and root thirty-two metres. How much edging is needed, exactly?', show: 'title' },
        { say: 'In this video, you will find that perimeter, and then multiply radicals.' },
      ],
    },
    {
      chapter: 'Edging a flower bed',
      layout: 'split',
      leftWidth: 540,
      left: [figure('fb', [triangle({ A: [0, 0], B: [5.66, 0], C: [3.71, 2.05], sides: { AB: '\\sqrt{32}', CA: '\\sqrt{18}', BC: '\\sqrt{8}' }, tones: { AB: 'adj', CA: 'opp', BC: 'good' } })], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{8} = 2\\sqrt{2}', '\\sqrt{18} = 3\\sqrt{2}', '\\sqrt{32} = 4\\sqrt{2}', 'P = 2\\sqrt{2} + 3\\sqrt{2} + 4\\sqrt{2}', 'P = 9\\sqrt{2} \\approx 12.7\\text{ m}'] }],
      lines: [
        { say: 'The perimeter is the sum of the three sides. At first they look like unlike radicals, so simplify each one.', show: ['fb.shape'] },
        { say: 'Root eight is two root two, root eighteen is three root two, and root thirty-two is four root two. They are all like radicals.', show: ['m.0', 'm.1', 'm.2'], focus: ['m.0', 'm.1', 'm.2'] },
        { say: 'Two root two plus three root two plus four root two is nine root two metres. That is about 12.7 metres of edging.', show: ['m.3', 'm.4'], focus: 'm.4' },
        { say: 'Check with a calculator: the three sides are about 2.83, 4.24 and 5.66 metres, which add to about 12.73. The exact answer, nine root two, is shorter to write, and it never loses accuracy.' },
      ],
    },
    {
      chapter: 'Multiplying radicals',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\left(a\\sqrt{m}\\right)\\left(b\\sqrt{n}\\right) = ab\\sqrt{mn}', '\\sqrt{6} \\times \\sqrt{15} = \\sqrt{90} = \\sqrt{9} \\times \\sqrt{10} = 3\\sqrt{10}', '\\left(2\\sqrt{3}\\right)\\left(5\\sqrt{2}\\right) = (2 \\times 5)\\sqrt{3 \\times 2} = 10\\sqrt{6}'] }],
      lines: [
        { say: 'Multiplying is the property root "a" times root b equals root "a" b, used in reverse. With numbers in front, multiply the numbers in front together, and the radicands together.', show: 'm.0', focus: 'm.0' },
        { say: 'Root six times root fifteen is root ninety. Then simplify: nine is the largest perfect square in ninety, so it is three root ten.', show: 'm.1', focus: 'm.1' },
        { say: 'Two root three times five root two: two times five is ten, and three times two is six. So it is ten root six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Squaring a radical',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Squaring a radical', md: '$\\sqrt{7} \\times \\sqrt{7} = \\sqrt{49} = 7$. In general, $\\sqrt{a} \\times \\sqrt{a} = a$: the square root and the square undo each other.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\left(3\\sqrt{5}\\right)^2 = 9 \\times 5 = 45'] },
      ],
      lines: [
        { say: 'One product comes up again and again. Root seven times root seven is root forty-nine, which is just seven. The square root and the square undo each other.', show: 'tip' },
        { say: 'So three root five, all squared, is nine times five, which is forty-five. Square the number in front, and the radical gives back its radicand.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\left(3\\sqrt{2}\\right)\\left(4\\sqrt{6}\\right)$.',
          choices: ['$24\\sqrt{3}$', '$12\\sqrt{12}$', '$7\\sqrt{8}$', '$12\\sqrt{8}$'],
          answer: 0,
          working: '$(3 \\times 4)\\sqrt{2 \\times 6} = 12\\sqrt{12} = 12 \\times 2\\sqrt{3} = 24\\sqrt{3}$. B is correct but not in simplest form.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify three root two, times four root six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three times four is twelve, and two times six is twelve, so you get twelve root twelve. Root twelve is two root three, so the answer is twenty-four root three. B is not finished.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Simplify each side first to find an exact perimeter.', '$\\left(a\\sqrt{m}\\right)\\left(b\\sqrt{n}\\right) = ab\\sqrt{mn}$; then simplify.', '$\\sqrt{a} \\times \\sqrt{a} = a$.'] }],
      lines: [
        { say: 'Let’s sum up. To find an exact perimeter, simplify each side first, then combine like radicals.', show: 'sum.0' },
        { say: 'To multiply, multiply the numbers in front, and multiply the radicands. Then simplify.', show: 'sum.1' },
        { say: 'And a square root times itself gives back the radicand. In part three, we multiply expressions with brackets. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
