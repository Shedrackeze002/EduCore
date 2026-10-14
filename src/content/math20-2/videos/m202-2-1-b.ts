import type { Explainer } from '@/video/script.ts';
import { transversal } from '@/video/angles.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm202-2-1-b',
  lessonId: 'm202-2-1',
  title: 'Angles Formed by Parallel Lines, Part 2: Finding Angles with Reasons',
  thumbnailTitle: 'Finding Angles with Reasons',
  thumbnail: 'tr',
  summary: 'Finding angles formed by parallel lines and a transversal, with a reason for each step, why same-side interior angles add rather than match, and solving 3x + 10 = 5x − 30 for alternate interior angles on a fence brace.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.1 · Part 2', title: 'Finding Angles with Reasons', subtitle: 'One angle gives you all eight' }],
      lines: [
        { say: 'When two parallel lines are crossed by a transversal, knowing just one of the eight angles is enough to find all the others.', show: 'title' },
        { say: 'In this video, you will find angles and give a reason for each, and then use algebra to find an unknown angle.' },
      ],
    },
    {
      chapter: 'Angles with reasons',
      layout: 'split',
      leftWidth: 520,
      left: [figure('tr', [transversal({ deg: 60, labels: { 2: '60^\\circ', 3: '60^\\circ', 5: '120^\\circ', 6: '60^\\circ', 7: '60^\\circ' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle 6 = 60^\\circ \\;\\text{(corresponding)}', '\\angle 7 = 60^\\circ \\;\\text{(alternate exterior)}', '\\angle 3 = 60^\\circ \\;\\text{(vertically opposite)}', '\\angle 5 = 180^\\circ - 60^\\circ = 120^\\circ'] }],
      lines: [
        { say: 'Here, m is parallel to n, and angle two is sixty degrees. Find angles six, seven and five, and give a reason for each.', show: ['tr.lines', 'tr.marks', 'tr.a2'], focus: 'tr.a2' },
        { say: 'Angle six corresponds to angle two, and corresponding angles are equal. So angle six is sixty degrees.', show: ['tr.a6', 'm.0'], focus: ['tr.a2', 'tr.a6', 'm.0'] },
        { say: 'Angles two and seven are alternate exterior angles, which are equal, so angle seven is also sixty degrees.', show: ['tr.a7', 'm.1'], focus: ['tr.a2', 'tr.a7', 'm.1'] },
        { say: 'For angle five, use angle three. It is vertically opposite angle two, so it is sixty degrees.', show: ['tr.a3', 'm.2'], focus: ['tr.a2', 'tr.a3', 'm.2'] },
        { say: 'Angles three and five are same-side interior angles, so they add to 180. Angle five is 180 minus sixty, which is 120 degrees.', show: ['tr.a5', 'm.3'], focus: ['tr.a3', 'tr.a5', 'm.3'] },
      ],
    },
    {
      chapter: 'Same-side angles',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Same-side interior angles are not equal', md: 'Corresponding and alternate angles are equal, but same-side interior angles **add to** $180^\\circ$. If one of them is acute, the other must be obtuse.' }],
      lines: [
        { say: 'Be careful with same-side interior angles. Corresponding and alternate angles are equal, but same-side interior angles add to 180 degrees. If one of them is acute, the other must be obtuse.', show: 'oops' },
        { say: 'A quick check: with parallel lines, the eight angles come in only two sizes, and one of each size adds to 180.' },
      ],
    },
    {
      chapter: 'Using algebra',
      layout: 'split',
      leftWidth: 520,
      left: [figure('fb', [transversal({ deg: 70, labels: { 3: '3', 6: '6' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle 3 = (3x + 10)^\\circ', '\\angle 6 = (5x - 30)^\\circ', '3x + 10 = 5x - 30', '40 = 2x,\\quad x = 20', '3(20) + 10 = 70', '5(20) - 30 = 70'] }],
      lines: [
        { say: 'Two parallel fence rails are crossed by a diagonal brace. A pair of alternate interior angles measure three x plus ten degrees, and five x minus thirty degrees. Find x and the angle.', show: ['fb.lines', 'fb.marks', 'fb.a3', 'fb.a6', 'm.0', 'm.1'], focus: ['fb.a3', 'fb.a6', 'm.0', 'm.1'] },
        { say: 'Alternate interior angles are equal, so three x plus ten equals five x minus thirty.', show: 'm.2', focus: 'm.2' },
        { say: 'Subtract three x from both sides, and add thirty: forty equals two x, so x is twenty.', show: 'm.3', focus: 'm.3' },
        { say: 'Check both expressions. Three times twenty, plus ten, is seventy, and five times twenty, minus thirty, is also seventy. So each angle measures seventy degrees.', show: ['m.4', 'm.5'], focus: ['m.4', 'm.5'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two parallel lines are crossed by a transversal. A pair of same-side interior angles measure $(2x + 20)^\\circ$ and $(3x + 10)^\\circ$. What is $x$?',
          choices: ['$30$', '$10$', '$34$', '$50$'],
          answer: 0,
          working: 'Same-side interior angles add to $180^\\circ$: $5x + 30 = 180$, so $5x = 150$ and $x = 30$. The angles are $80^\\circ$ and $100^\\circ$. Setting them equal gives the wrong answer, $10$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pair of same-side interior angles measure two x plus twenty degrees, and three x plus ten degrees. What is x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Same-side interior angles add to 180, so five x plus thirty is 180, and x is thirty. The angles are eighty and 100 degrees. Setting them equal gives ten, which is wrong.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Give a reason for every angle you find.', 'Equal pairs: corresponding, alternate, vertically opposite.', 'Same-side interior angles add to $180^\\circ$; write the equation that matches the pair.'] }],
      lines: [
        { say: 'Let’s sum up. Give a reason for every angle you find.', show: 'sum.0' },
        { say: 'Corresponding, alternate and vertically opposite angles are equal.', show: 'sum.1' },
        { say: 'And same-side interior angles add to 180 degrees, so write the equation that matches the pair. In part three, we draw extra lines, and prove that lines are parallel. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
