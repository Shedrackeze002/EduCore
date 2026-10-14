import type { Explainer } from '@/video/script.ts';
import { angle, crossing } from '@/video/angles.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm103-6-2-b',
  lessonId: 'm103-6-2',
  title: 'Angle Relationships, Part 2: Vertically Opposite Angles and Bisectors',
  thumbnailTitle: 'Opposite Angles and Bisectors',
  thumbnail: 'x',
  summary: 'Vertically opposite angles where two lines cross (always equal, with the side-by-side angles supplementary), solving for x when they are given as expressions, and angle bisectors: halving an angle, mitre joints, and constructing a bisector with a compass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 6.2 · Part 2', title: 'Opposite Angles and Bisectors', subtitle: 'Crossing lines and equal halves' }],
      lines: [
        { say: 'Where two boards cross in an X brace, the angles come in matching pairs. And where two pieces of trim meet, the joint splits the corner in half.', show: 'title' },
        { say: 'In this video, you will use vertically opposite angles and angle bisectors to find missing angles.' },
      ],
    },
    {
      chapter: 'Vertically opposite angles',
      layout: 'split',
      leftWidth: 480,
      left: [figure('x', [crossing({ deg: 50, labels: { a1: '50^\\circ', a2: 'a', a3: 'b', a4: 'c' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['a = 180^\\circ - 50^\\circ = 130^\\circ', 'b = 50^\\circ', 'c = a = 130^\\circ'] }],
      lines: [
        { say: 'When two straight lines cross, they make four angles. The angles across from each other are vertically opposite angles, and they are always equal.', show: ['x.lines', 'x.a1'] },
        { say: 'Find "a", b and c. "a" and the fifty-degree angle sit side by side on a straight line, so "a" is 180 minus fifty: 130 degrees.', show: ['x.a2', 'm.0'], focus: ['x.a2', 'm.0'] },
        { say: 'b is across from the fifty-degree angle, so b is also fifty degrees.', show: ['x.a3', 'm.1'], focus: ['x.a1', 'x.a3', 'm.1'] },
        { say: 'And c is across from "a", so c is 130 degrees.', show: ['x.a4', 'm.2'], focus: ['x.a2', 'x.a4', 'm.2'] },
        { say: 'Why? "a" plus fifty is 180, and "a" plus b is 180, so b must equal fifty.', focus: 'x' },
      ],
    },
    {
      chapter: 'Side by side or across',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Side-by-side angles are not equal', md: 'Only the angles **across** from each other are equal. Angles **next to** each other add to $180^\\circ$, and are equal only when both are $90^\\circ$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3x - 10 = 2x + 25', 'x - 10 = 25 \\;\\to\\; x = 35', '3(35) - 10 = 95, \\quad 2(35) + 25 = 95'] },
      ],
      lines: [
        { say: 'Only the angles across from each other are equal. Angles next to each other add to 180.', show: 'oops' },
        { say: 'Two vertically opposite angles measure three x minus ten, and two x plus 25 degrees. They are equal, so set them equal.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract two x from both sides: x minus ten is 25, so x is 35.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute to check: both angles are 95 degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Bisecting an angle',
      layout: 'split',
      leftWidth: 480,
      left: [figure('bis', [angle({ deg: 70, from: 10, label: '70^\\circ', names: ['A', 'B', 'C'], bisect: true, halves: ['35^\\circ', '35^\\circ'] })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Angle bisector', md: 'A ray that divides an angle into two equal angles. Each part is half of the whole.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['70^\\circ \\div 2 = 35^\\circ', '\\text{mitre: } 135^\\circ \\div 2 = 67.5^\\circ'] },
      ],
      lines: [
        { say: 'An angle bisector is a ray that divides an angle into two equal angles. Each part is half of the whole.', show: ['bis.arms', 'bis.names', 'bis.arc', 'def'] },
        { say: 'Ray B D bisects angle "A" B C, which is seventy degrees. So each half is seventy divided by two: 35 degrees.', show: ['bis.bis', 'bis.nD', 'bis.half1', 'bis.half2', 'm.0'], hide: 'bis.arc', focus: ['bis.half1', 'bis.half2', 'm.0'] },
        { say: 'To join two pieces of trim at a corner, the joint line bisects the corner, so both pieces meet cleanly. This is a mitre joint. At walls that meet at 135 degrees, the joint makes 135 divided by two, 67.5 degrees, with each wall.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Constructing a bisector',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['With the compass point on the vertex, draw an arc that crosses both arms.', 'From each crossing, draw an arc inside the angle, with the same compass width, so the arcs cross.', 'Draw a ray from the vertex through the point where the arcs cross.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check by folding', md: 'Fold the paper so one arm lies on the other. The fold line is the bisector.' },
      ],
      lines: [
        { say: 'To construct a bisector with a compass, put the compass point on the vertex, and draw an arc that crosses both arms.', show: 'b.0' },
        { say: 'From each crossing, draw an arc inside the angle, with the same compass width, so the arcs cross. Then draw a ray from the vertex through that point.', show: ['b.1', 'b.2'] },
        { say: 'To check, fold the paper so one arm lies on the other. The fold line is the bisector.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two vertically opposite angles measure $(4x + 5)^\\circ$ and $(2x + 45)^\\circ$. What is $x$?',
          choices: ['$x = 20$', '$x = 40$', '$x = 85$', '$x = 25$'],
          answer: 0,
          working: 'They are equal: $4x + 5 = 2x + 45$, so $2x = 40$ and $x = 20$. Each angle is $85^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two vertically opposite angles measure four x plus five, and two x plus 45 degrees. What is x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The angles are equal, so four x plus five equals two x plus 45. Then two x is forty, and x is twenty. B forgets to divide by two, and C is the size of each angle.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Vertically opposite angles are equal.', 'Side-by-side angles at a crossing add to $180^\\circ$.', 'A bisector halves an angle: half $=$ whole $\\div 2$.'] }],
      lines: [
        { say: 'Let’s sum up. Where two lines cross, vertically opposite angles are equal.', show: 'sum.0' },
        { say: 'The angles side by side add to 180 degrees.', show: 'sum.1' },
        { say: 'And a bisector cuts an angle into two equal halves. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
