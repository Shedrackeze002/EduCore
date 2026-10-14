import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { twoTriangles } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm203-4-2-c',
  lessonId: 'm203-4-2',
  title: 'Problems with Two Right Triangles, Part 3: One Triangle Inside the Other',
  thumbnailTitle: 'One Triangle Inside the Other',
  thumbnail: 'cl',
  summary: 'Subtracting when one triangle sits inside the other: two boats seen from a 50 m cliff at angles of depression of 40° and 18° (about 94.3 m apart), an antenna on a roof seen from 40 m at 30° and 38° (about 8.2 m tall), and keeping the digits.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.2 · Part 3', title: 'One Triangle Inside the Other', subtitle: 'When to subtract' }],
      lines: [
        { say: 'When both triangles are on the same side, one sits inside the other. Then the piece you want is a difference, so you usually subtract.', show: 'title' },
        { say: 'In this video, you will find the distance between two boats, and the height of an antenna.' },
      ],
    },
    {
      chapter: 'Two boats from a cliff',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bt', [twoTriangles({ arrangement: 'same', h: 50, a1: 40, a2: 18, depression: true, labels: { h: '50\\text{ m}', a1: '40^\\circ', a2: '18^\\circ', x: 'x' } })], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{near: } \\dfrac{50}{\\tan 40^\\circ} \\approx 59.59', '\\text{far: } \\dfrac{50}{\\tan 18^\\circ} \\approx 153.88', 'x \\approx 153.88 - 59.59', '\\approx 94.3 \\text{ m}'] }],
      lines: [
        { say: 'From the top of a fifty-metre cliff above Abraham Lake, the angles of depression to two boats in line are forty degrees and eighteen degrees. How far apart are the boats?', show: ['bt.ground', 'bt.height', 'bt.right', 'bt.sight1', 'bt.sight2', 'bt.horizontal', 'bt.d1', 'bt.d2'] },
        { say: 'Each angle of depression equals the angle at that boat. The shared side is the cliff, fifty metres, opposite both angles.', show: ['bt.a1', 'bt.a2'], focus: ['bt.a1', 'bt.a2'] },
        { say: 'The near boat is fifty over tangent forty degrees, about 59.59 metres from the base. The far boat is fifty over tangent eighteen degrees, about 153.88 metres.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The near boat’s distance is part of the far boat’s distance, so subtract: the boats are about 94.3 metres apart.', show: ['bt.x', 'm.2', 'm.3'], focus: ['bt.x', 'm.3'] },
      ],
    },
    {
      chapter: 'An antenna on a roof',
      layout: 'split',
      leftWidth: 560,
      left: [figure('an', [twoTriangles({ arrangement: 'stacked', d: 40, a1: 30, a2: 38, labels: { d: '40\\text{ m}', a1: '30^\\circ', a2: '38^\\circ', x: 'x' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{top: } 40\\tan 38^\\circ \\approx 31.25', '\\text{roof: } 40\\tan 30^\\circ \\approx 23.09', 'x \\approx 31.25 - 23.09 \\approx 8.2 \\text{ m}'] }],
      lines: [
        { say: 'From forty metres away, the angle of elevation to the bottom of a rooftop antenna is thirty degrees, and to its top is thirty-eight degrees. How tall is the antenna?', show: ['an.ground', 'an.height', 'an.right', 'an.sight1', 'an.sight2', 'an.a1', 'an.a2'] },
        { say: 'This time the shared side is the ground distance, forty metres, adjacent to both angles: TOA. The height to the top is forty times tangent thirty-eight degrees, about 31.25 metres.', show: 'm.0', focus: ['an.sight2', 'm.0'] },
        { say: 'The height to the roof is forty times tangent thirty degrees, about 23.09 metres.', show: 'm.1', focus: ['an.sight1', 'm.1'] },
        { say: 'The antenna is the piece between them, so subtract: about 8.2 metres tall.', show: ['an.x', 'm.2'], focus: ['an.x', 'm.2'] },
      ],
    },
    {
      chapter: 'Keep the digits',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep the digits', md: 'Carry at least two decimal places, or better, every digit on your calculator, through the middle steps. Round only the final answer. Subtracting two rounded numbers can magnify the error.' }],
      lines: [
        { say: 'When you subtract two lengths, small rounding errors can matter. Carry at least two decimal places, or better, every digit on your calculator, through the middle steps.', show: 'tip' },
        { say: 'Round only the final answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From $25$ m away, the angle of elevation to the bottom of a flag on a pole is $20^\\circ$, and to the top of the flag is $28^\\circ$. How tall is the flag?',
          choices: ['$4.2$ m', '$22.4$ m', '$13.3$ m', '$9.1$ m'],
          answer: 0,
          working: '$25\\tan 28^\\circ \\approx 13.29$ and $25\\tan 20^\\circ \\approx 9.10$. Subtract: about $4.2$ m. B adds the two heights.',
        },
      ],
      lines: [
        { say: 'Your turn. From twenty-five metres away, the angle of elevation to the bottom of a flag on a pole is twenty degrees, and to the top of the flag is twenty-eight degrees. How tall is the flag? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The top is twenty-five times tangent twenty-eight, about 13.29 metres up, and the bottom is twenty-five times tangent twenty, about 9.10. Subtract: about 4.2 metres. B adds instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same side: one triangle inside the other.', 'Find both lengths, then subtract.', 'Keep the digits until the end.'] }],
      lines: [
        { say: 'Let’s sum up. When both triangles are on the same side, one sits inside the other.', show: 'sum.0' },
        { say: 'Find both lengths, then subtract.', show: 'sum.1' },
        { say: 'And keep all the digits until the end. In part four, we find a shared side that is not given. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
