import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { standardAngle } from '@/video/trig.ts';

const video: Explainer = {
  id: 'm201-2-1',
  lessonId: 'm201-2-1',
  title: 'Angles in Standard Position, Part 1: Reference Angles',
  thumbnailTitle: 'Reference Angles',
  thumbnail: 'std',
  summary: 'Angles in standard position, the four quadrants, quadrantal and coterminal angles, the reference angle in each quadrant (θ, 180° − θ, θ − 180°, 360° − θ), and one reference angle in all four quadrants. Parts 2 and 3 cover special triangles and exact values.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.1 · Part 1', title: 'Reference Angles', subtitle: 'Angles in standard position' }],
      lines: [
        { say: 'A wind turbine blade near Pincher Creek, a car’s steering wheel, the arm of a crane: all of them turn through angles far bigger than ninety degrees.', show: 'title' },
        { say: 'To use trigonometry for these turns, we draw every angle the same way. In this video, you will draw angles in standard position, and find their reference angles.' },
      ],
    },
    {
      chapter: 'Standard position',
      layout: 'split',
      leftWidth: 560,
      left: [figure('std', [standardAngle({ deg: 135, label: '135^\\circ', quadrants: true })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Standard position', md: 'The vertex is at the origin, and the **initial arm** lies along the positive $x$-axis. The angle opens counterclockwise to its **terminal arm**.' },
        { kind: 'bullets', id: 'b', items: ['**Quadrantal angles:** $0^\\circ$, $90^\\circ$, $180^\\circ$, $270^\\circ$.', '**Coterminal:** $40^\\circ$ and $400^\\circ = 360^\\circ + 40^\\circ$.'] },
      ],
      lines: [
        { say: 'An angle is in standard position when its vertex is at the origin, and its initial arm lies along the positive x-axis. It opens counterclockwise to its terminal arm.', show: ['std.axes', 'def'] },
        { say: 'Here is 135 degrees in standard position. It turns past the positive y-axis, so its terminal arm is in the second quadrant.', show: ['std.arm', 'std.arc', 'std.P'], focus: 'std.arc' },
        { say: 'The axes split the plane into four quadrants, numbered one to four counterclockwise.', show: 'std.quads', focus: 'std.quads' },
        { say: 'Angles of zero, ninety, 180 and 270 degrees have their terminal arm on an axis. They are quadrantal angles, and are not in any quadrant.', show: 'b.0' },
        { say: 'Angles that share a terminal arm are coterminal. Forty and 400 degrees are coterminal, because 400 is 360 plus forty. In this course, we work from zero to 360 degrees.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Reference angles',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ref', [standardAngle({ deg: 210, label: '210^\\circ', ref: '30^\\circ' })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reference angle', md: 'The acute angle $\\theta_R$ between the terminal arm and the **$x$-axis**, always between $0^\\circ$ and $90^\\circ$.' },
        { kind: 'table', id: 't', head: ['Quadrant', 'Reference angle'], rows: [['I', '$\\theta$'], ['II', '$180^\\circ - \\theta$'], ['III', '$\\theta - 180^\\circ$'], ['IV', '$360^\\circ - \\theta$']] },
      ],
      lines: [
        { say: 'The reference angle, theta R, is the acute angle between the terminal arm and the x-axis. It is always between zero and ninety degrees.', show: ['ref.axes', 'ref.arm', 'ref.arc', 'ref.P', 'def'] },
        { say: 'The terminal arm of 210 degrees is thirty degrees past the negative x-axis, so its reference angle is thirty degrees.', show: 'ref.ref', focus: 'ref.ref' },
        { say: 'Measure toward the nearest part of the x-axis: zero, 180 or 360 degrees. In quadrant one, the reference angle is theta itself. In quadrant two, 180 minus theta. In quadrant three, theta minus 180. And in quadrant four, 360 minus theta.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Two examples',
      layout: 'split',
      leftWidth: 520,
      left: [figure('ex', [standardAngle({ deg: 300, label: '300^\\circ', ref: '60^\\circ' })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\theta_R = 360^\\circ - 300^\\circ = 60^\\circ', '\\theta = 180^\\circ + 25^\\circ = 205^\\circ'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Measuring to the y-axis', md: '$300^\\circ - 270^\\circ = 30^\\circ$ measures to the $y$-axis. A reference angle is always measured to the **$x$-axis**.' },
      ],
      lines: [
        { say: 'Find the quadrant and the reference angle of 300 degrees. It is between 270 and 360, so the terminal arm is in quadrant four.', show: ['ex.axes', 'ex.arm', 'ex.arc', 'ex.P'] },
        { say: 'In quadrant four, the reference angle is 360 minus theta: sixty degrees.', show: ['ex.ref', 'm.0'], focus: ['ex.ref', 'm.0'] },
        { say: 'Do not subtract 270. That measures to the y-axis, and gives thirty. A reference angle is always measured to the x-axis.', show: 'oops' },
        { say: 'You can also work backward. An angle in quadrant three has a reference angle of 25 degrees. In quadrant three, the arm is theta R past 180, so the angle is 205 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'One reference angle, four angles',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('four', [
          standardAngle({ name: 'a', deg: 40, ref: '40^\\circ', arc: false }),
          standardAngle({ name: 'b', deg: 140, ref: '40^\\circ', axes: false, arc: false }),
          standardAngle({ name: 'c', deg: 220, ref: '40^\\circ', axes: false, arc: false }),
          standardAngle({ name: 'd', deg: 320, ref: '40^\\circ', axes: false, arc: false }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['40^\\circ\\ (\\text{I})', '180^\\circ - 40^\\circ = 140^\\circ\\ (\\text{II})', '180^\\circ + 40^\\circ = 220^\\circ\\ (\\text{III})', '360^\\circ - 40^\\circ = 320^\\circ\\ (\\text{IV})'] }],
      lines: [
        { say: 'Each reference angle appears once in every quadrant. For a reference angle of forty degrees: forty in quadrant one.', show: ['four.a-axes', 'four.a-arm', 'four.a-ref', 'm.0'], focus: 'm.0' },
        { say: '180 minus forty, 140, in quadrant two. 180 plus forty, 220, in quadrant three. And 360 minus forty, 320, in quadrant four.', show: ['four.b-arm', 'four.b-ref', 'four.c-arm', 'four.c-ref', 'four.d-arm', 'four.d-ref', 'm.1', 'm.2', 'm.3'] },
        { say: 'These four arms are reflections of each other in the axes. That is why one reference angle can tell you about all four angles, as you will see in part three.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the reference angle of $\\theta = 250^\\circ$.',
          choices: ['$70^\\circ$', '$20^\\circ$', '$110^\\circ$', '$250^\\circ$'],
          answer: 0,
          working: '$250^\\circ$ is in quadrant III, so $\\theta_R = 250^\\circ - 180^\\circ = 70^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the reference angle of 250 degrees. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 250 degrees is in quadrant three, so the reference angle is 250 minus 180: seventy degrees. B measures to the y-axis.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Standard position: start on the positive $x$-axis, open counterclockwise.', 'The reference angle is the acute angle to the $x$-axis.', 'One reference angle gives one angle in each quadrant.'] }],
      lines: [
        { say: 'Let’s sum up. An angle in standard position starts on the positive x-axis, and opens counterclockwise.', show: 'sum.0' },
        { say: 'The reference angle is the acute angle between the terminal arm and the x-axis.', show: 'sum.1' },
        { say: 'And one reference angle gives one angle in each quadrant. In part two, we build the special triangles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
