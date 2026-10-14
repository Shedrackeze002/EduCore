import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A square corner split into 35° and 55°, and a straight line split into 50° and 130°. */
const pairs: Part = {
  points: { O1: [0, 0], X1: [3.5, 0], Y1: [0, 3.5], R1: [2.867, 2.008], O2: [8, 0], W2: [5, 0], E2: [11, 0], R2: [9.928, 2.298] },
  items: [
    { kind: 'line', id: 'cx', from: 'O1', to: 'X1', group: 'corner' },
    { kind: 'line', id: 'cy', from: 'O1', to: 'Y1', group: 'corner' },
    { kind: 'line', id: 'cr', from: 'O1', to: 'R1', tone: 'adj', group: 'corner' },
    { kind: 'angle', id: 'c35', at: 'O1', from: 'X1', to: 'R1', label: '35^\\circ', group: 'corner' },
    { kind: 'angle', id: 'c55', at: 'O1', from: 'R1', to: 'Y1', tone: 'good', label: '55^\\circ', group: 'corner' },
    { kind: 'line', id: 'sl', from: 'W2', to: 'E2', group: 'straight' },
    { kind: 'line', id: 'sr', from: 'O2', to: 'R2', tone: 'adj', group: 'straight' },
    { kind: 'angle', id: 's50', at: 'O2', from: 'E2', to: 'R2', label: '50^\\circ', group: 'straight' },
    { kind: 'angle', id: 's130', at: 'O2', from: 'R2', to: 'W2', tone: 'good', label: '130^\\circ', group: 'straight' },
  ],
};

/** A, B and C on a straight line, with ray BD: ∠ABD = 130° and x = ∠DBC. */
const line: Part = {
  points: { A: [-4, 0], B: [0, 0], C: [4, 0], D: [2.314, 2.758] },
  items: [
    { kind: 'line', id: 'abc', from: 'A', to: 'C', group: 'shape' },
    { kind: 'line', id: 'bd', from: 'B', to: 'D', tone: 'adj', arrow: true, group: 'shape' },
    { kind: 'label', id: 'nA', at: 'A', tex: 'A', place: 'below', group: 'shape' },
    { kind: 'label', id: 'nB', at: 'B', tex: 'B', place: 'below', group: 'shape' },
    { kind: 'label', id: 'nC', at: 'C', tex: 'C', place: 'below', group: 'shape' },
    { kind: 'label', id: 'nD', at: 'D', tex: 'D', place: 'above right', group: 'shape' },
    { kind: 'angle', id: 'abd', at: 'B', from: 'D', to: 'A', label: '130^\\circ' },
    { kind: 'angle', id: 'x', at: 'B', from: 'C', to: 'D', tone: 'good', label: 'x' },
  ],
};

const video: Explainer = {
  id: 'm103-6-2',
  lessonId: 'm103-6-2',
  title: 'Angle Relationships, Part 1: Complementary and Supplementary',
  thumbnailTitle: 'Complementary and Supplementary',
  thumbnail: 'pr',
  summary: 'Complementary angles (adding to 90°, a corner) and supplementary angles (adding to 180°, a straight line), finding a missing angle, and writing and solving an equation when the angles are given with x. Part 2 covers vertically opposite angles and bisectors.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 6.2 · Part 1', title: 'Complementary and Supplementary', subtitle: 'Angles that make a corner or a line' }],
      lines: [
        { say: 'When a framer nails a brace across a square frame, or a roofer sets a rafter on a level joist, one angle tells you another for free.', show: 'title' },
        { say: 'In this video, you will find missing angles from the angles they pair with, without measuring.' },
      ],
    },
    {
      chapter: 'Corner and straight',
      layout: 'center',
      main: [
        figure('pr', [pairs], 300),
        { kind: 'bullets', id: 'b', items: ['**Complementary:** add to $90^\\circ$, a **c**orner.', '**Supplementary:** add to $180^\\circ$, a **s**traight line.'] },
      ],
      lines: [
        { say: 'Two angles are complementary when they add to ninety degrees. Angles that fill a square corner, like 35 and 55 degrees, are complementary. Each is the complement of the other.', show: ['pr.corner', 'b.0'], focus: ['pr.c35', 'pr.c55', 'b.0'] },
        { say: 'Two angles are supplementary when they add to 180 degrees. Angles side by side on a straight line, like fifty and 130 degrees, are supplementary.', show: ['pr.straight', 'b.1'], focus: ['pr.s50', 'pr.s130', 'b.1'] },
        { say: 'Here is a way to remember them: complementary goes with a corner, and supplementary goes with a straight line.' },
      ],
    },
    {
      chapter: 'Finding the other angle',
      layout: 'split',
      leftWidth: 500,
      left: [figure('ln', [line])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{ramp: } 90^\\circ - 5^\\circ = 85^\\circ', 'x + 130^\\circ = 180^\\circ', 'x = 180^\\circ - 130^\\circ = 50^\\circ'] }],
      lines: [
        { say: 'A wheelchair ramp makes a five-degree angle with level ground. A post stands straight up beside it. The ground and the post meet at ninety degrees, so the ramp makes ninety minus five, 85 degrees, with the post.', show: 'm.0', focus: 'm.0' },
        { say: 'In this diagram, "A", B and C lie on a straight line, and angle "A" B D is 130 degrees.', show: ['ln.shape', 'ln.abd'] },
        { say: 'The two angles make a straight line, so x plus 130 is 180.', show: ['ln.x', 'm.1'], focus: ['ln.x', 'm.1'] },
        { say: 'x is 180 minus 130: fifty degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'With algebra',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x + (2x + 15) = 180', '3x + 15 = 180 \\;\\to\\; 3x = 165', 'x = 55', '2(55) + 15 = 125', '55 + 125 = 180 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Answer the question', md: 'Finding $x$ is not the end. Substitute to find **each angle**, then check that they add up.' },
      ],
      lines: [
        { say: 'Two angles are supplementary. One measures x degrees, and the other two x plus fifteen degrees. Find both angles. Supplementary angles add to 180, so write that as an equation.', show: 'm.0', focus: 'm.0' },
        { say: 'Collect like terms: three x plus fifteen is 180, so three x is 165.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by three: x is 55.', show: 'm.2', focus: 'm.2' },
        { say: 'The other angle is two times 55, plus fifteen: 125 degrees.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: 55 plus 125 is 180. Finding x is not the end: substitute to find each angle, then check.', show: ['m.4', 'tip'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An angle measures $38^\\circ$. What is its complement?',
          choices: ['$52^\\circ$', '$142^\\circ$', '$62^\\circ$', '$38^\\circ$'],
          answer: 0,
          working: 'Complementary angles add to $90^\\circ$: $90^\\circ - 38^\\circ = 52^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. An angle measures 38 degrees. What is its complement? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Complementary angles add to ninety, and ninety minus 38 is 52 degrees. B is the supplement, which adds to 180.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Complementary: add to $90^\\circ$ (a corner).', 'Supplementary: add to $180^\\circ$ (a straight line).', 'With algebra: write the equation, solve for $x$, then find each angle.'] }],
      lines: [
        { say: 'Let’s sum up. Complementary angles add to ninety degrees, like the angles in a corner.', show: 'sum.0' },
        { say: 'Supplementary angles add to 180 degrees, like the angles on a straight line.', show: 'sum.1' },
        { say: 'And with algebra, write the equation, solve for x, then substitute to find each angle. In part two, we look at crossing lines and bisectors. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
