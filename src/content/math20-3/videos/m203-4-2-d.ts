import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { twoTriangles } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm203-4-2-d',
  lessonId: 'm203-4-2',
  title: 'Problems with Two Right Triangles, Part 4: Find the Shared Side First',
  thumbnailTitle: 'Find the Shared Side First',
  thumbnail: 'by',
  summary: 'When the shared side is not given, solve the triangle with an angle and a side first: a buoy 90 m from a cliff and a boat beyond it at 35° and 20° (about 83.1 m apart), and a second guy wire anchored with a 30 m wire at 60° (about 25.0 m).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.2 · Part 4', title: 'Find the Shared Side First', subtitle: 'When the shared side is missing' }],
      lines: [
        { say: 'Sometimes the side two triangles share is not given. You have to find it first, from the triangle where you know an angle and a side.', show: 'title' },
        { say: 'In this video, you will solve two problems where the shared side is the first thing to find.' },
      ],
    },
    {
      chapter: 'A buoy and a boat',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bb', [twoTriangles({ arrangement: 'same', h: 63.02, a1: 35, a2: 20, depression: true, labels: { h: 'h', a1: '35^\\circ', a2: '20^\\circ', d: '90\\text{ m}' } })], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = 90\\tan 35^\\circ \\approx 63.02', 'd = \\dfrac{h}{\\tan 20^\\circ} \\approx 173.14', '173.14 - 90 \\approx 83.1 \\text{ m}'] }],
      lines: [
        { say: 'A buoy floats ninety metres from the base of a cliff. From the top, the angle of depression to the buoy is thirty-five degrees, and to a boat farther out, in line with it, is twenty degrees. How far is the boat from the buoy?', show: ['bb.ground', 'bb.height', 'bb.right', 'bb.sight1', 'bb.sight2', 'bb.horizontal', 'bb.d1', 'bb.d2', 'bb.near'] },
        { say: 'The shared side is the cliff height, h, and it is not given. The buoy’s triangle has an angle and a side, so start there. h is ninety times tangent thirty-five degrees, about 63.02 metres.', show: ['bb.a1', 'm.0'], focus: ['bb.sight1', 'bb.a1', 'm.0'] },
        { say: 'Now the boat’s triangle. Its distance from the base is h over tangent twenty degrees, about 173.14 metres.', show: ['bb.a2', 'm.1'], focus: ['bb.sight2', 'bb.a2', 'm.1'] },
        { say: 'The buoy is ninety metres out, so the boat is about 173.14 minus ninety, 83.1 metres from the buoy.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A second guy wire',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['h = 30\\sin 60^\\circ \\approx 25.98, \\quad d = 30\\cos 60^\\circ = 15', '25.98 - 6 = 19.98 \\text{ m}', '\\sqrt{15^2 + 19.98^2} \\approx 25.0 \\text{ m}'] }],
      lines: [
        { say: 'A thirty-metre guy wire runs from the top of a tower to an anchor, at sixty degrees to the ground. A second wire runs from the same anchor to a point six metres below the top. How long is the second wire? Start with the first wire: it gives both the tower height, thirty times sine sixty, about 25.98 metres, and the shared ground distance, thirty times cosine sixty, fifteen metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The second wire is attached six metres lower: 19.98 metres up.', show: 'm.1', focus: 'm.1' },
        { say: 'Now you know both legs, and no angle is needed: by the Pythagorean theorem, the second wire is the square root of fifteen squared plus 19.98 squared, about 25.0 metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From the top of a lighthouse, the angle of depression to a buoy $50$ m from the base is $40^\\circ$. A ship in line beyond the buoy is at an angle of depression of $15^\\circ$. How far is the ship from the buoy?',
          choices: ['$106.6$ m', '$156.6$ m', '$42.0$ m', '$206.6$ m'],
          answer: 0,
          working: '$h = 50\\tan 40^\\circ \\approx 41.95$ m. Ship: $\\dfrac{41.95}{\\tan 15^\\circ} \\approx 156.57$ m from the base. $156.57 - 50 \\approx 106.6$ m. B is the distance from the base.',
        },
      ],
      lines: [
        { say: 'Your turn. From the top of a lighthouse, the angle of depression to a buoy fifty metres from the base is forty degrees. A ship in line beyond the buoy is at an angle of depression of fifteen degrees. How far is the ship from the buoy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. First the height: fifty times tangent forty, about 41.95 metres. The ship is 41.95 over tangent fifteen, about 156.57 metres from the base, so 106.6 metres from the buoy. B is the distance from the base.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['If the shared side is missing, find it first.', 'Start with the triangle where you know an angle and a side.', 'Then solve the other triangle, and combine.'] }],
      lines: [
        { say: 'Let’s sum up. If the shared side is not given, find it first.', show: 'sum.0' },
        { say: 'Start with the triangle where you know an angle and a side.', show: 'sum.1' },
        { say: 'Then solve the other triangle, and combine the pieces. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
