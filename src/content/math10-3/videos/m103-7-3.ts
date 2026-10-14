import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

/** A name in the middle of a shape. */
const tag = (id: string, at: [number, number], tex: string): Part => ({ points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, tone: 'ink', place: 'center' }] });

/** A rhombus with 5 ft sides and angles of 60° and 120°. */
const rhombus: Part = {
  points: { K: [7, 0], L: [12, 0], N: [14.5, 4.33], J: [9.5, 4.33] },
  items: [
    { kind: 'region', id: 'r-fill', points: ['K', 'L', 'N', 'J'], tone: 'brand', group: 'rh' },
    { kind: 'line', id: 'r1', from: 'K', to: 'L', tone: 'adj', label: '5\\text{ ft}', labelSide: 'right', group: 'rh' },
    { kind: 'line', id: 'r2', from: 'L', to: 'N', tone: 'adj', group: 'rh' },
    { kind: 'line', id: 'r3', from: 'N', to: 'J', tone: 'adj', group: 'rh' },
    { kind: 'line', id: 'r4', from: 'J', to: 'K', tone: 'adj', label: '5\\text{ ft}', labelSide: 'right', group: 'rh' },
    { kind: 'angle', id: 'r60', at: 'K', from: 'L', to: 'J', label: '60^\\circ' },
    { kind: 'angle', id: 'r120', at: 'L', from: 'N', to: 'K', label: '120^\\circ' },
  ],
};

const video: Explainer = {
  id: 'm103-7-3',
  lessonId: 'm103-7-3',
  title: 'Similar Polygons, Part 1: Same Shape, Different Size',
  thumbnailTitle: 'Similar Polygons',
  thumbnail: 'rect',
  summary: 'What makes two polygons similar: equal corresponding angles and proportional corresponding sides, checking two rectangles, and why one condition is not enough (a square and a rectangle, a square and a rhombus). Part 2 covers the scale factor.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 7.3 · Part 1', title: 'Similar Polygons', subtitle: 'Same shape, different size' }],
      lines: [
        { say: 'A print shop enlarging a photo, a sign maker scaling up a logo, and a hobby store selling a model truck all work with shapes that are the same shape, but a different size.', show: 'title' },
        { say: 'In math, those shapes are called similar. In this video, you will check whether two polygons are similar.' },
      ],
    },
    {
      chapter: 'What makes polygons similar?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Similar polygons', md: 'Every pair of **corresponding angles** is equal, **and** every pair of **corresponding sides** is in the same ratio: the sides are **proportional**.' },
        { kind: 'callout', id: 'cor', tone: 'key', title: 'Corresponding', md: 'In matching positions: the longest side with the longest, the shortest with the shortest.' },
      ],
      lines: [
        { say: 'Two polygons are similar when one is an exact enlargement or reduction of the other. Nothing is stretched in only one direction, and no angle changes.' },
        { say: 'So two things must be true. Every pair of corresponding angles is equal, and every pair of corresponding sides is in the same ratio. We say the sides are proportional.', show: 'def' },
        { say: 'Corresponding sides and angles are the ones in matching positions: the longest side with the longest side, the shortest with the shortest, and so on.', show: 'cor' },
      ],
    },
    {
      chapter: 'Two rectangles',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('two', [
          rectangle({ name: 'a', w: 6, h: 4, labels: { w: '6\\text{ cm}', h: '4\\text{ cm}' } }),
          rectangle({ name: 'b', at: [11, 0], w: 9, h: 6, labels: { w: '9\\text{ cm}', h: '6\\text{ cm}' } }),
          tag('na', [3, 2], 'A'),
          tag('nb', [15.5, 3], 'B'),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{long: } \\tfrac{9}{6} = 1.5', '\\text{short: } \\tfrac{6}{4} = 1.5', '\\text{equal ratios} \\;\\to\\; \\text{similar}'] }],
      lines: [
        { say: 'Rectangle "A" is six centimetres by four. Rectangle B is nine by six. Are they similar?', show: ['two.a-shape', 'two.b-shape', 'two.na', 'two.nb'] },
        { say: 'First the angles. Every angle in a rectangle is ninety degrees, so the corresponding angles are equal.' },
        { say: 'Now the sides. Long side to long side: nine over six is 1.5. Short side to short side: six over four is also 1.5.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The ratios are equal, so the sides are proportional, and the rectangles are similar.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'One condition is not enough',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('trap', [
          rectangle({ name: 'sq', w: 3, h: 3, labels: { w: '3\\text{ ft}', h: '3\\text{ ft}' } }),
          rhombus,
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{square, } 8 \\times 4 \\text{ rectangle: } \\tfrac{8}{4} \\ne \\tfrac{4}{4}', '\\text{square, rhombus: } 90^\\circ \\ne 60^\\circ'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Similar is not congruent', md: 'Same size **and** same shape is **congruent**. Similar only means same shape.' },
      ],
      lines: [
        { say: 'You must check both the angles and the sides. A four-metre square and an eight-by-four rectangle both have four right angles. But eight over four is two, while four over four is one. The ratios differ, so they are not similar.', show: 'm.0', focus: 'm.0' },
        { say: 'Now a three-foot square and a five-foot rhombus. All their sides are in the ratio five over three.', show: ['trap.sq-shape', 'trap.rh'] },
        { say: 'But the rhombus has angles of sixty and 120 degrees, not ninety. So they are not similar either.', show: ['trap.r60', 'trap.r120', 'm.1'], focus: ['trap.r60', 'trap.r120', 'm.1'] },
        { say: 'And similar shapes do not have to be the same size. Same size and same shape is called congruent. Similar only means the same shape.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Rectangle P is $10\\text{ cm}$ by $4\\text{ cm}$. Which rectangle is similar to P?',
          choices: ['$15\\text{ cm}$ by $6\\text{ cm}$', '$12\\text{ cm}$ by $6\\text{ cm}$', '$14\\text{ cm}$ by $8\\text{ cm}$', '$10\\text{ cm}$ by $10\\text{ cm}$'],
          answer: 0,
          working: '$\\tfrac{15}{10} = 1.5$ and $\\tfrac{6}{4} = 1.5$: the ratios are equal. For B, $\\tfrac{12}{10} = 1.2$ but $\\tfrac{6}{4} = 1.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Rectangle P is ten centimetres by four. Which rectangle is similar to P? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifteen over ten is 1.5, and six over four is 1.5: equal ratios. B adds two to each side, which changes the shape: twelve over ten is only 1.2.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Similar: equal corresponding angles **and** proportional sides.', 'Match sides by position: longest with longest.', 'Equal angles alone, or proportional sides alone, are not enough.'] }],
      lines: [
        { say: 'Let’s sum up. Similar polygons have equal corresponding angles, and proportional corresponding sides.', show: 'sum.0' },
        { say: 'Match the sides by position: longest with longest, and shortest with shortest.', show: 'sum.1' },
        { say: 'And check both conditions: one alone is not enough. In part two, we work with the scale factor. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
