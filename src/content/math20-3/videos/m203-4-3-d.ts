import type { Explainer } from '@/video/script.ts';
import { box, figure, type Part } from '@/video/solids.ts';

/** The floor diagonal and the long diagonal of the box, from its front bottom left corner A. */
const diagonals: Part = {
  points: {},
  items: [
    { kind: 'line', id: 'd', from: 'A', to: 'F', tone: 'adj', dashed: true, label: 'd', labelSide: 'left', group: 'floor' },
    { kind: 'line', id: 'up', from: 'F', to: 'G', tone: 'opp', weight: 4, group: 'stand' },
    { kind: 'line', id: 'p', from: 'A', to: 'G', tone: 'hyp', weight: 4, label: 'p', labelSide: 'left', group: 'stand' },
    { kind: 'right', id: 'r', at: 'F', from: 'A', to: 'G', group: 'stand' },
    { kind: 'angle', id: 'theta', at: 'A', from: 'F', to: 'G', label: '\\theta', r: 70, labelDist: 105, tone: 'theta' },
  ],
};

const video: Explainer = {
  id: 'm203-4-3-d',
  lessonId: 'm203-4-3',
  title: 'Chains of Right Triangles, Part 4: The Diagonal of a Box',
  thumbnailTitle: 'The Diagonal of a Box',
  thumbnail: 'bx',
  summary: 'Two right triangles inside a box: the floor diagonal of a 4.2 m by 2.1 m cube van (about 4.70 m), then the longest pipe that fits, 1.9 m high (about 5.07 m), and the angle it makes with the floor (about 22.0°).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.3 · Part 4', title: 'The Diagonal of a Box', subtitle: 'Triangles in three dimensions' }],
      lines: [
        { say: 'Will a long pipe fit in the back of a cube van? The longest straight object that fits in a box runs from a bottom corner to the opposite top corner.', show: 'title' },
        { say: 'In this video, you will find that length with two right triangles: one flat on the floor, and one standing up inside the box.' },
      ],
    },
    {
      chapter: 'Will the pipe fit?',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bx', [box({ l: 4.2, w: 2.1, h: 1.9, labels: { l: '4.2\\text{ m}', w: '2.1\\text{ m}', h: '1.9\\text{ m}' } }), diagonals], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['d^2 = 4.2^2 + 2.1^2 = 22.05', 'd \\approx 4.70 \\text{ m}', 'p^2 = 22.05 + 1.9^2 = 25.66', 'p \\approx 5.07 \\text{ m}'] }],
      lines: [
        { say: 'The cargo area of a cube van is 4.2 metres long, 2.1 metres wide, and 1.9 metres high. What is the longest pipe that fits?', show: ['bx.shape', 'bx.l', 'bx.w', 'bx.h'] },
        { say: 'Triangle one lies flat on the floor. Its legs are the length and the width, and its hypotenuse is the floor diagonal, d. d squared is 4.2 squared plus 2.1 squared, 22.05.', show: ['bx.floor', 'm.0'], focus: ['bx.floor', 'm.0'] },
        { say: 'So d is about 4.70 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Triangle two stands up inside the box. Its legs are d and the height, and its hypotenuse is the pipe, p. Use d squared directly: 22.05 plus 1.9 squared is 25.66.', show: ['bx.stand', 'm.2'], focus: ['bx.stand', 'm.2'] },
        { say: 'So a pipe up to about 5.07 metres long fits: longer than any edge of the van.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The angle with the floor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tan\\theta = \\dfrac{1.9}{4.70}', '\\theta \\approx 22.0^\\circ'] }],
      lines: [
        { say: 'What angle does the pipe make with the floor? In triangle two, the height is opposite theta, and the floor diagonal is adjacent: TOA. Tangent theta is 1.9 over 4.70.', show: 'm.0', focus: 'm.0' },
        { say: 'Theta is about 22.0 degrees. Notice that the angle lives in the standing triangle, not on the floor.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Use d squared',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Skip the rounding', md: 'You need $d^2$, not $d$, for the second triangle. Using $22.05$ directly avoids rounding $d$ first. It also shows that $p^2 = l^2 + w^2 + h^2$.' }],
      lines: [
        { say: 'Here is a shortcut. The second triangle needs d squared, not d, so use 22.05 directly. That avoids rounding d in the middle.', show: 'tip' },
        { say: 'It also shows a neat pattern: the long diagonal squared is the length squared, plus the width squared, plus the height squared.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A storage box is $60$ cm long, $40$ cm wide and $30$ cm high. What is the longest straight rod that fits inside, to the nearest centimetre?',
          choices: ['$78$ cm', '$72$ cm', '$130$ cm', '$50$ cm'],
          answer: 0,
          working: '$p^2 = 60^2 + 40^2 + 30^2 = 3600 + 1600 + 900 = 6100$, so $p \\approx 78.1$ cm. B is the floor diagonal only.',
        },
      ],
      lines: [
        { say: 'Your turn. A storage box is sixty centimetres long, forty wide, and thirty high. What is the longest straight rod that fits inside? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Sixty squared plus forty squared plus thirty squared is 6,100, and the square root is about seventy-eight centimetres. B is only the floor diagonal.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Floor triangle first: the floor diagonal $d$.', 'Then the standing triangle, with legs $d$ and the height.', 'Long diagonal: $p^2 = l^2 + w^2 + h^2$.'] }],
      lines: [
        { say: 'Let’s sum up. For a box, find the floor diagonal first.', show: 'sum.0' },
        { say: 'Then use it as a leg of the standing triangle, with the height.', show: 'sum.1' },
        { say: 'And the long diagonal squared is l squared plus w squared plus h squared. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
