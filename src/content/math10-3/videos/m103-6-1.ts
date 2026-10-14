import type { Explainer } from '@/video/script.ts';
import { angle } from '@/video/angles.ts';
import { figure, type Part } from '@/video/solids.ts';

/** Dashed benchmark rays at 90° and 135°, from the vertex of an unnamed angle. */
const benchmarks: Part = {
  points: { q90: [0, 3.6], q135: [-2.55, 2.55] },
  items: [
    { kind: 'line', id: 'b90', from: 'B', to: 'q90', tone: 'muted', dashed: true },
    { kind: 'label', id: 'l90', at: 'q90', tex: '90^\\circ', tone: 'muted', place: 'above' },
    { kind: 'line', id: 'b135', from: 'B', to: 'q135', tone: 'muted', dashed: true },
    { kind: 'label', id: 'l135', at: 'q135', tex: '135^\\circ', tone: 'muted', place: 'above left' },
  ],
};

const video: Explainer = {
  id: 'm103-6-1',
  lessonId: 'm103-6-1',
  title: 'Angles, Part 1: Naming and Classifying',
  thumbnailTitle: 'Kinds of Angles',
  thumbnail: 'ang',
  summary: 'Naming an angle with three letters, the five kinds of angles (acute, right, obtuse, straight and reflex), and estimating an angle with benchmark angles before measuring. Part 2 measures angles with a protractor.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 6.1 · Part 1', title: 'Naming and Classifying Angles', subtitle: 'Acute, right, obtuse, straight and reflex' }],
      lines: [
        { say: 'A carpenter cutting trim, a welder fitting pipe, and a truck driver backing up to a loading dock all work with angles. If you can name an angle and estimate its size, you can catch a mistake before you cut.', show: 'title' },
        { say: 'In this video, you will name angles, sort them into five kinds, and estimate their size.' },
      ],
    },
    {
      chapter: 'Naming angles',
      layout: 'split',
      leftWidth: 480,
      left: [figure('ang', [angle({ deg: 55, from: 15, names: ['A', 'B', 'C'] })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Angle', md: 'Two rays with a common endpoint, the **vertex**. The rays are the **arms**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle ABC \\;\\text{ or }\\; \\angle CBA'] },
      ],
      lines: [
        { say: 'An angle is made by two rays that start at the same point. That point is the vertex, and the rays are the arms of the angle.', show: ['ang.arms', 'ang.nB', 'def'], focus: 'ang.nB' },
        { say: 'We measure the amount of turn between the arms in degrees. One full turn is 360 degrees.', show: 'ang.arc', focus: 'ang.arc' },
        { say: 'To name the angle, use three letters, with the vertex letter in the middle. This is angle "A" B C, or angle C B "A".', show: ['ang.names', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Five kinds of angles',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'Size', 'On the job'],
          rows: [
            ['[[adj:Acute]]', 'less than $90^\\circ$', 'the thin end of a wood shim'],
            ['[[good:Right]]', 'exactly $90^\\circ$', 'the corner of a sheet of plywood'],
            ['[[opp:Obtuse]]', 'between $90^\\circ$ and $180^\\circ$', 'a $135^\\circ$ bend in a run of trim'],
            ['[[theta:Straight]]', 'exactly $180^\\circ$', 'two boards butted end to end'],
            ['[[hyp:Reflex]]', 'between $180^\\circ$ and $360^\\circ$', 'a sprinkler that waters most of a circle'],
          ],
        },
      ],
      lines: [
        { say: 'We sort angles by comparing them with a square corner, ninety degrees, and a straight line, 180 degrees.' },
        { say: 'An acute angle is less than ninety degrees, like the thin end of a shim. A right angle is exactly ninety, like the corner of a sheet of plywood.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'An obtuse angle is between ninety and 180 degrees, like a 135-degree bend in a run of trim.', show: 't.2', focus: 't.2' },
        { say: 'A straight angle is exactly 180 degrees. And a reflex angle is between 180 and 360, like a sprinkler that waters most of a circle.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Classifying',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'm', size: 'md', lines: ['35^\\circ < 90^\\circ \\;\\to\\; \\text{acute}', '90^\\circ \\;\\to\\; \\text{right}', '90^\\circ < 172^\\circ < 180^\\circ \\;\\to\\; \\text{obtuse}', '180^\\circ \\;\\to\\; \\text{straight}', '250^\\circ > 180^\\circ \\;\\to\\; \\text{reflex}'] }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Close is not equal', md: 'An angle of $89^\\circ$ is **acute**, and $181^\\circ$ is **reflex**. Right and straight mean **exactly** $90^\\circ$ and $180^\\circ$.' }],
      lines: [
        { say: 'Classify each angle. 35 degrees is less than ninety, so it is acute. Ninety degrees is a square corner: a right angle.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: '172 degrees is between ninety and 180, so it is obtuse. And 180 degrees is a straight angle.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: '250 degrees is more than 180, so it is reflex.', show: 'm.4', focus: 'm.4' },
        { say: 'Close is not the same as equal: 89 degrees is acute, and 181 degrees is reflex.', show: 'oops' },
      ],
    },
    {
      chapter: 'Estimating',
      layout: 'split',
      leftWidth: 500,
      left: [figure('est', [angle({ deg: 120 }), benchmarks])],
      right: [
        { kind: 'bullets', id: 'b', items: ['$45^\\circ$: half a square corner', '$90^\\circ$: a square corner', '$135^\\circ$: halfway to a straight line', '$180^\\circ$: a straight line'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['90^\\circ < \\text{angle} < 135^\\circ', '\\text{about } 120^\\circ'] },
      ],
      lines: [
        { say: 'Always estimate before you measure. Use benchmark angles that are easy to picture.', show: ['est.arms', 'est.arc'] },
        { say: '45 degrees is half a square corner, and 135 is halfway from a square corner to a straight line.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'Estimate this angle. Its opening is wider than a square corner, so it is more than ninety degrees.', show: ['est.b90', 'est.l90'], focus: ['est.b90', 'b.1'] },
        { say: 'But it is less than halfway to a straight line, so it is less than 135 degrees.', show: ['est.b135', 'est.l135', 'm.0'], focus: ['est.b135', 'm.0'] },
        { say: 'So it is about 120 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What kind of angle measures $181^\\circ$?',
          choices: ['reflex', 'straight', 'obtuse', 'acute'],
          answer: 0,
          working: '$181^\\circ$ is more than $180^\\circ$, so it is reflex. Only exactly $180^\\circ$ is a straight angle.',
        },
      ],
      lines: [
        { say: 'Your turn. What kind of angle measures 181 degrees? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, reflex. 181 degrees is more than 180, so it is reflex. B is close, but a straight angle is exactly 180 degrees.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Name an angle with the vertex letter in the middle: $\\angle ABC$.', 'Acute $< 90^\\circ$, right $= 90^\\circ$, obtuse between $90^\\circ$ and $180^\\circ$, straight $= 180^\\circ$, reflex $> 180^\\circ$.', 'Estimate with $45^\\circ$, $90^\\circ$, $135^\\circ$ and $180^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. Name an angle with three letters, with the vertex letter in the middle.', show: 'sum.0' },
        { say: 'Acute is less than ninety degrees, right is exactly ninety, obtuse is between ninety and 180, straight is exactly 180, and reflex is more than 180.', show: 'sum.1' },
        { say: 'And estimate with the benchmarks: 45, ninety, 135 and 180 degrees. In part two, we measure angles with a protractor. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
