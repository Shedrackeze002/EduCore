import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 3], y: [0, 80], yStep: 10, every: 0, width: 6, height: 5, titles: { x: '\\text{time}', y: 'h\\text{ (m)}' } });

const video: Explainer = {
  id: 'm201-7-1-b',
  lessonId: 'm201-7-1',
  title: 'Absolute Value, Part 2: Distance and Change',
  thumbnailTitle: 'Distance and Change',
  thumbnail: 'dr',
  summary: 'The distance |a − b| between two numbers in either order, the size of a temperature change from −23 °C to 4 °C, fractions inside the bars, and the total vertical distance of a drone compared with its net change in height.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.1 · Part 2', title: 'Distance and Change', subtitle: 'Size without direction' }],
      lines: [
        { say: 'The distance between two towns is the same whichever way you drive. Absolute value captures that: it measures the size of a gap, or a change, without its direction.', show: 'title' },
        { say: 'In this video, you will find the distance between two numbers, the size of a change, and the total distance travelled.' },
      ],
    },
    {
      chapter: 'Distance between two numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{distance} = |a - b| = |b - a|', '|{-}4 - 7| = |{-}11| = 11', '|7 - (-4)| = |11| = 11'] },
        figure(
          'nl',
          [
            numberLine({
              min: -5,
              max: 8,
              step: 1,
              length: 15,
              points: [
                { id: 'a', value: -4, tex: '', tone: 'opp' },
                { id: 'b', value: 7, tex: '', tone: 'adj' },
              ],
              spans: [{ id: 'd', from: -4, to: 7, tone: 'good', label: '11' }],
            }),
          ],
          150,
        ),
      ],
      lines: [
        { say: 'The distance between two numbers "a" and b on a number line is the absolute value of "a" minus b. That equals the absolute value of b minus "a", so the order does not matter.', show: 'm.0', focus: 'm.0' },
        { say: 'Find the distance between negative four and seven.', show: ['nl.axis', 'nl.a', 'nl.b'] },
        { say: 'Negative four minus seven is negative eleven, and its absolute value is eleven.', show: ['m.1', 'nl.d'], focus: ['m.1', 'nl.d'] },
        { say: 'In the other order, seven minus negative four is eleven. Either way, the distance is eleven units.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The size of a change',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['|4 - (-23)| = |27| = 27', '\\text{a change of } 27\\,^{\\circ}\\text{C}', '\\left|\\tfrac{1}{2} - 4\\right| = \\left|{-}\\tfrac{7}{2}\\right| = \\tfrac{7}{2}'] }],
      lines: [
        { say: 'Back to Fort McMurray. The temperature rose from negative twenty-three degrees to four degrees. The size of the change is the absolute value of four minus negative twenty-three.', show: 'm.0', focus: 'm.0' },
        { say: 'That is the absolute value of twenty-seven, so the temperature changed by twenty-seven degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'With fractions, find a common denominator inside the bars first. The absolute value of one half minus four is the absolute value of negative seven halves, which is seven halves.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Total distance and net change',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('dr', [
          g,
          polyline(g, { id: 'path', points: [[0, 20], [1, 65], [2, 30], [3, 50]], tone: 'brand', labels: ['45', '35', '20'], sides: ['left', 'right', 'left'] }),
          dots(g, [
            { id: 'p0', x: 0, y: 20, tex: '20', tone: 'adj', place: 'right' },
            { id: 'p1', x: 1, y: 65, tex: '65', tone: 'adj', place: 'above' },
            { id: 'p2', x: 2, y: 30, tex: '30', tone: 'adj', place: 'below' },
            { id: 'p3', x: 3, y: 50, tex: '50', tone: 'adj', place: 'right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['|65 - 20| + |30 - 65| + |50 - 30|', '= 45 + 35 + 20 = 100\\text{ m}', '\\text{net change: } 50 - 20 = 30\\text{ m}'] }],
      lines: [
        { say: 'A net change can hide a lot of movement, because moves up and down cancel. In this example, a survey drone climbs from twenty metres to sixty-five, descends to thirty, then climbs to fifty.', show: ['dr.grid', 'dr.axes', 'dr.p0', 'dr.p1', 'dr.p2', 'dr.p3'] },
        { say: 'The total vertical distance adds the absolute values of the changes: forty-five, plus thirty-five, plus twenty, which is 100 metres.', show: ['dr.path', 'm.0', 'm.1'], focus: ['dr.path', 'm.1'] },
        { say: 'But the net change is just the end minus the start: fifty minus twenty, or thirty metres.', show: 'm.2', focus: 'm.2' },
        { say: 'So the drone travelled 100 metres, but ended only thirty metres higher.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A hiker goes from an elevation of 1,200 m down to 950 m, then up to 1,400 m. What is the total vertical distance?',
          choices: ['$700$ m', '$200$ m', '$2{,}350$ m', '$450$ m'],
          answer: 0,
          working: '$|950 - 1200| + |1400 - 950| = 250 + 450 = 700$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A hiker goes from an elevation of 1,200 metres down to 950 metres, then up to 1,400 metres. What is the total vertical distance? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The changes are 250 metres down, and 450 metres up, so the total is 700 metres. B is the net change, from 1,200 to 1,400.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The distance between $a$ and $b$ is $|a - b|$, in either order.', 'The size of a change is the absolute value of end minus start.', 'Total distance adds absolute changes; net change can cancel.'] }],
      lines: [
        { say: 'Let’s sum up. The distance between two numbers is the absolute value of their difference, in either order.', show: 'sum.0' },
        { say: 'The size of a change is the absolute value of the end minus the start.', show: 'sum.1' },
        { say: 'And total distance adds the absolute changes, while a net change can cancel. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
