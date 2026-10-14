import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-4-3',
  lessonId: 'm202-4-3',
  title: 'Dividing Radicals, Part 1: Dividing',
  thumbnailTitle: 'Dividing Radicals',
  thumbnail: 'sa',
  summary: 'The quotient property √a ÷ √b = √(a/b), simplifying √72 ÷ √2 and 12√10 ÷ 3√2, and finding the length of a rooftop solar array from its area and width. Part 2 moves radicals out of the denominator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.3 · Part 1', title: 'Dividing Radicals', subtitle: 'Divide the numbers, divide the radicands' }],
      lines: [
        { say: 'Which is easier to estimate: one over root two, or root two over two? They are the same number, but the second is simply half of 1.414, about 0.707.', show: 'title' },
        { say: 'In this lesson, you will divide radicals, and learn to move a radical out of the denominator. This video starts with dividing.' },
      ],
    },
    {
      chapter: 'The quotient property',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\dfrac{a}{b}} \\quad (a \\ge 0,\\ b > 0)', '\\dfrac{\\sqrt{36}}{\\sqrt{4}} = \\dfrac{6}{2} = 3,\\quad \\sqrt{\\dfrac{36}{4}} = \\sqrt{9} = 3'] }],
      lines: [
        { say: 'Division works just like multiplication. The square root of "a", divided by the square root of b, is the square root of "a" over b. The radicand on top can be zero, but the one on the bottom cannot.', show: 'm.0', focus: 'm.0' },
        { say: 'Test it with perfect squares. Root thirty-six over root four is six over two, which is three. And the square root of thirty-six over four is root nine, which is also three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Dividing radicals',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\sqrt{72}}{\\sqrt{2}} = \\sqrt{\\dfrac{72}{2}} = \\sqrt{36} = 6', '\\dfrac{12\\sqrt{10}}{3\\sqrt{2}} = \\dfrac{12}{3}\\sqrt{\\dfrac{10}{2}} = 4\\sqrt{5}'] }],
      lines: [
        { say: 'Simplify root seventy-two over root two. Divide the radicands: seventy-two over two is thirty-six, and root thirty-six is six. Two radicals divided to give a whole number.', show: 'm.0', focus: 'm.0' },
        { say: 'With numbers in front, divide the numbers in front, and divide the radicands. Twelve root ten over three root two: twelve over three is four, and ten over two is five. So the answer is four root five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A solar array',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('sa', [
          rectangle({ w: 8.94, h: 4.24, labels: { w: 'l', h: '3\\sqrt{2}\\text{ m}' } }),
          { points: { ac: [4.47, 2.12] }, items: [{ kind: 'label', id: 'area', at: 'ac', tex: '12\\sqrt{10}\\text{ m}^2', tone: 'opp', place: 'center' }] },
        ], 210),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['l = \\dfrac{\\text{area}}{\\text{width}} = \\dfrac{12\\sqrt{10}}{3\\sqrt{2}}', 'l = 4\\sqrt{5}\\text{ m}', 'l \\approx 8.9\\text{ m}'] }],
      lines: [
        { say: 'A rectangular rooftop solar array has an area of twelve root ten square metres, and a width of three root two metres. How long is it?', show: ['sa.shape', 'sa.h', 'sa.area'] },
        { say: 'The length is the area divided by the width: twelve root ten over three root two.', show: ['sa.w', 'm.0'], focus: ['sa.w', 'm.0'] },
        { say: 'That is the quotient you just simplified. The array is four root five metres long, about 8.9 metres.', show: ['m.1', 'm.2'], focus: 'm.1' },
        { say: 'Check by multiplying: three root two times four root five is twelve root ten. That matches the area.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{20\\sqrt{21}}{5\\sqrt{3}}$.',
          choices: ['$4\\sqrt{7}$', '$4\\sqrt{18}$', '$15\\sqrt{7}$', '$\\dfrac{4\\sqrt{7}}{3}$'],
          answer: 0,
          working: '$\\dfrac{20}{5} = 4$ and $\\dfrac{21}{3} = 7$, so the quotient is $4\\sqrt{7}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify twenty root twenty-one, over five root three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twenty over five is four, and twenty-one over three is seven. So the answer is four root seven.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\dfrac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\dfrac{a}{b}}$ for $a \\ge 0$, $b > 0$.', 'Divide the numbers in front, and divide the radicands.', 'Check a quotient by multiplying back.'] }],
      lines: [
        { say: 'Let’s sum up. A square root divided by a square root is the square root of the quotient.', show: 'sum.0' },
        { say: 'With numbers in front, divide the numbers in front, and divide the radicands.', show: 'sum.1' },
        { say: 'And check a quotient by multiplying back. In part two, we move radicals out of the denominator. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
