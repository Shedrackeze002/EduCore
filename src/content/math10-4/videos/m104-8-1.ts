import type { Explainer } from '@/video/script.ts';
import { angle } from '@/video/angles.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-8-1',
  lessonId: 'm104-8-1',
  title: 'Angles and Shapes, Part 1: Types of Angles',
  thumbnailTitle: 'Types of Angles',
  thumbnail: 'lap',
  summary: 'Acute, right, obtuse, straight and reflex angles compared with a square corner, the angle of an open laptop, and angles that add to 180° on a straight line or 90° in a square corner. Part 2 names triangles and quadrilaterals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 8.1 · Part 1', title: 'Types of Angles', subtitle: 'Compare with a square corner' }],
      lines: [
        { say: 'Carpenters, tile setters and sign makers work with angles every day. A cut that is a little off can ruin a cabinet or a floor.', show: 'title' },
        { say: 'In this video, you will name angles, and find angles that add up.' },
      ],
    },
    {
      chapter: 'Types of angles',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Type', 'Size'], rows: [['[[adj:Acute]]', 'less than $90^\\circ$'], ['[[good:Right]]', 'exactly $90^\\circ$: a square corner'], ['[[opp:Obtuse]]', 'between $90^\\circ$ and $180^\\circ$'], ['[[theta:Straight]]', 'exactly $180^\\circ$: a straight line'], ['[[hyp:Reflex]]', 'more than $180^\\circ$']] }],
      lines: [
        { say: 'An angle is made by two arms that meet at a point, the vertex. We measure angles in degrees, and one full turn is 360 degrees. To sort angles, compare them with the square corner of a sheet of paper: ninety degrees.' },
        { say: 'An acute angle is less than ninety degrees. A right angle is exactly ninety: a square corner, marked with a small square.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'An obtuse angle is more than ninety, but less than 180. A straight angle is exactly 180 degrees: its arms make a straight line.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'And a reflex angle is more than 180 degrees: it goes the long way around.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'A laptop',
      layout: 'split',
      leftWidth: 480,
      left: [figure('lap', [angle({ deg: 110, label: '110^\\circ' })])],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Almost square is not square', md: 'Right means **exactly** $90^\\circ$. An angle of $88^\\circ$ is acute, and $92^\\circ$ is obtuse.' }],
      lines: [
        { say: 'Hana opens her laptop so the screen makes an angle of 110 degrees with the keyboard. It is more than ninety, so it is wider than a square corner. It is less than 180, so it is not a straight line. It is obtuse.', show: ['lap.arms', 'lap.arc'] },
        { say: 'An angle is right only when it is exactly ninety degrees. 88 degrees is acute, and 92 is obtuse.', show: 'oops' },
      ],
    },
    {
      chapter: 'Angles that add up',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{straight line: } 180 - 70 = 110^\\circ', '\\text{square corner: } 90 - 35 = 55^\\circ'] },
      ],
      lines: [
        { say: 'When a line meets a straight line, it makes two angles. Together they make a straight angle, so they add to 180 degrees.' },
        { say: 'A ladder makes an angle of seventy degrees with the ground. The angle on the other side of the ladder is 180 minus seventy: 110 degrees, an obtuse angle.', show: 'm.0', focus: 'm.0' },
        { say: 'A line that splits a square corner makes two angles that add to ninety. A tile setter cuts from the square corner of a tile, at 35 degrees to one edge. The other angle is ninety minus 35: 55 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two angles make a straight line. One is $125^\\circ$. What is the other?',
          choices: ['$55^\\circ$', '$235^\\circ$', '$35^\\circ$', '$125^\\circ$'],
          answer: 0,
          working: 'Angles on a straight line add to $180^\\circ$: $180 - 125 = 55^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two angles make a straight line, and one is 125 degrees. What is the other? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Angles on a straight line add to 180, and 180 minus 125 is 55 degrees. C uses ninety instead of 180.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Acute $< 90^\\circ$, right $= 90^\\circ$, obtuse between $90^\\circ$ and $180^\\circ$.', 'Straight $= 180^\\circ$, reflex $> 180^\\circ$.', 'Angles on a straight line add to $180^\\circ$.', 'Angles in a square corner add to $90^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. Acute is less than ninety degrees, right is exactly ninety, obtuse is between ninety and 180, straight is 180, and reflex is more than 180.', show: ['sum.0', 'sum.1'] },
        { say: 'Angles that make a straight line add to 180 degrees.', show: 'sum.2' },
        { say: 'And angles that make a square corner add to ninety. In part two, we name triangles and four-sided shapes. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
