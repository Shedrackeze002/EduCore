import type { Explainer } from '@/video/script.ts';
import { angle, clock, protractor } from '@/video/angles.ts';
import { figure, type Part } from '@/video/solids.ts';

/** The 140° angle on the other side of a 220° reflex angle. */
const other: Part = { points: {}, items: [{ kind: 'angle', id: 'small', at: 'B', from: 'C', to: 'A', tone: 'adj', label: '140^\\circ' }] };

/** Three pipes meeting at a joint, at 90°, 200° and 335°: angles of 110°, 135° and x = 115°. */
const pipes: Part = {
  points: { O: [0, 0], P1: [0, 4], P2: [-3.759, -1.368], P3: [3.625, -1.69] },
  items: [
    { kind: 'line', id: 'p1', from: 'O', to: 'P1', tone: 'muted', weight: 12, group: 'pipes' },
    { kind: 'line', id: 'p2', from: 'O', to: 'P2', tone: 'muted', weight: 12, group: 'pipes' },
    { kind: 'line', id: 'p3', from: 'O', to: 'P3', tone: 'muted', weight: 12, group: 'pipes' },
    { kind: 'angle', id: 'a', at: 'O', from: 'P1', to: 'P2', label: '110^\\circ' },
    { kind: 'angle', id: 'b', at: 'O', from: 'P2', to: 'P3', label: '135^\\circ' },
    { kind: 'angle', id: 'x', at: 'O', from: 'P3', to: 'P1', tone: 'good', label: 'x' },
  ],
};

const video: Explainer = {
  id: 'm103-6-1-b',
  lessonId: 'm103-6-1',
  title: 'Angles, Part 2: Measuring Angles',
  thumbnailTitle: 'Measuring Angles',
  thumbnail: 'pro',
  summary: 'Measuring an angle with a protractor by reading one scale from zero, finding a reflex angle by subtracting from 360°, angles around a point, and the angle between the hands of a clock.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 6.1 · Part 2', title: 'Measuring Angles', subtitle: 'Protractors, reflex angles and clocks' }],
      lines: [
        { say: 'A protractor has two rows of numbers, and reading the wrong one is the most common mistake in measuring angles.', show: 'title' },
        { say: 'In this video, you will measure angles, find reflex angles, and work out the angle between the hands of a clock.' },
      ],
    },
    {
      chapter: 'Using a protractor',
      layout: 'split',
      leftWidth: 660,
      left: [figure('pro', [protractor({ deg: 115 })])],
      right: [{ kind: 'bullets', id: 'b', items: ['Centre mark on the vertex.', 'Zero line on one arm.', 'Read **the same scale** from $0$.'] }],
      lines: [
        { say: 'A protractor is a half-circle tool marked from zero to 180 degrees. Most have an inner scale and an outer scale, which run in opposite directions.', show: ['pro.tool', 'pro.inner', 'pro.outer'] },
        { say: 'To measure an angle, put the centre mark on the vertex, and line up the zero line with one arm.', show: ['pro.arm1', 'b.0', 'b.1'], focus: 'pro.arm1' },
        { say: 'Then start at the zero on that arm, and follow the same scale to the other arm. Here, that is the inner scale.', show: ['pro.arm2', 'b.2'], focus: ['pro.inner', 'b.2'] },
        { say: 'The arm crosses the scales at 65 and 115. The angle is wider than a square corner, so it is 115 degrees.', show: ['pro.read-in', 'pro.read-out', 'pro.arc'], focus: ['pro.read-in', 'pro.arc'] },
      ],
    },
    {
      chapter: 'The wrong scale',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['180^\\circ - 115^\\circ = 65^\\circ'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reading the wrong scale', md: 'The wrong scale gives $180^\\circ$ minus the correct answer. Check against your estimate: an obtuse angle cannot read $65^\\circ$.' },
      ],
      lines: [
        { say: 'Reading the wrong scale gives 180 minus the correct answer: here, 65 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'So always estimate first. This angle is obtuse, so 65 degrees cannot be right.', show: 'oops' },
      ],
    },
    {
      chapter: 'Reflex angles',
      layout: 'split',
      leftWidth: 500,
      left: [figure('rx', [angle({ deg: 220, names: ['A', 'B', 'C'], label: '?' }), other])],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['140^\\circ + \\text{reflex} = 360^\\circ', '360^\\circ - 140^\\circ = 220^\\circ'] }],
      lines: [
        { say: 'A protractor only goes to 180 degrees. To find a reflex angle, measure the angle on the other side of the vertex. Here, it is 140 degrees.', show: ['rx.arms', 'rx.names', 'rx.small'], focus: 'rx.small' },
        { say: 'The two angles at B make one full turn: 360 degrees.', show: ['rx.arc', 'm.0'], focus: ['rx.arc', 'm.0'] },
        { say: 'So the reflex angle is 360 minus 140: 220 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Around a point',
      layout: 'split',
      leftWidth: 460,
      left: [figure('pipe', [pipes])],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['110^\\circ + 135^\\circ + x = 360^\\circ', 'x = 360^\\circ - 245^\\circ = 115^\\circ'] }],
      lines: [
        { say: 'Angles all the way around a point add to 360 degrees. Three pipes meet at a joint. Two of the angles between them are 110 and 135 degrees.', show: ['pipe.pipes', 'pipe.a', 'pipe.b'] },
        { say: 'The three angles make a full turn, so 110 plus 135 plus x is 360.', show: ['pipe.x', 'm.0'], focus: ['pipe.x', 'm.0'] },
        { say: 'x is 360 minus 245: 115 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Clock angles',
      layout: 'split',
      leftWidth: 460,
      left: [figure('clk', [clock({ h: 2, m: 30, label: '105^\\circ' })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{minute: } 30 \\times 6^\\circ = 180^\\circ', '\\text{hour: } 2 \\times 30^\\circ + 30 \\times 0.5^\\circ = 75^\\circ', '180^\\circ - 75^\\circ = 105^\\circ'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The hour hand moves too', md: 'At 2:30, the hour hand is halfway between the 2 and the 3.' },
      ],
      lines: [
        { say: 'On a clock, the twelve numbers are thirty degrees apart. The minute hand turns six degrees a minute, and the hour hand half a degree a minute.', show: 'clk.face' },
        { say: 'A shift at a bakery starts at two thirty. The minute hand is thirty times six: 180 degrees past twelve.', show: ['clk.minute', 'm.0'], focus: ['clk.minute', 'm.0'] },
        { say: 'The hour hand is halfway between the two and the three: two times thirty, plus thirty times one half, 75 degrees past twelve.', show: ['clk.hour', 'm.1', 'tip'], focus: ['clk.hour', 'm.1'] },
        { say: 'The difference is 105 degrees: an obtuse angle.', show: ['clk.between', 'm.2'], focus: ['clk.between', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Three angles meet at a point. Two of them measure $150^\\circ$ and $95^\\circ$. What does the third angle measure?',
          choices: ['$115^\\circ$', '$65^\\circ$', '$245^\\circ$', '$35^\\circ$'],
          answer: 0,
          working: 'Angles around a point add to $360^\\circ$: $360^\\circ - (150^\\circ + 95^\\circ) = 360^\\circ - 245^\\circ = 115^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Three angles meet at a point. Two of them measure 150 and 95 degrees. What does the third angle measure? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Angles around a point add to 360 degrees, and 360 minus 245 is 115 degrees. C is the sum of the two angles you were given.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Start at $0$ on one arm and read that same scale.', 'Reflex angle $= 360^\\circ -$ the angle on the other side.', 'Angles around a point add to $360^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. On a protractor, start at zero on one arm, and read that same scale. Check against your estimate.', show: 'sum.0' },
        { say: 'A reflex angle is 360 minus the angle on the other side of the vertex.', show: 'sum.1' },
        { say: 'And angles around a point add to 360 degrees. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
