import type { Explainer } from '@/video/script.ts';
import { transversal } from '@/video/angles.ts';
import { figure } from '@/video/solids.ts';

const numbered = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8' };

const video: Explainer = {
  id: 'm202-2-1',
  lessonId: 'm202-2-1',
  title: 'Angles Formed by Parallel Lines, Part 1: Transversals and Angle Pairs',
  thumbnailTitle: 'Transversals and Angle Pairs',
  thumbnail: 'p',
  summary: 'Parallel lines and transversals, the eight angles and which are interior or exterior, the five named pairs (corresponding, alternate interior, alternate exterior, same-side interior and vertically opposite), and which pairs are equal or supplementary when the lines are parallel. Part 2 finds angles with reasons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.1 · Part 1', title: 'Transversals and Angle Pairs', subtitle: 'Eight angles, five kinds of pair' }],
      lines: [
        { say: 'Railway tracks, the rungs of a ladder, and the lines in a parking lot are parallel. When a road, a brace or a stair stringer crosses them, the angles it makes follow rules.', show: 'title' },
        { say: 'In this video, you will name the angles a transversal makes, and learn which pairs are equal when the lines are parallel.' },
      ],
    },
    {
      chapter: 'Transversals',
      layout: 'split',
      leftWidth: 560,
      left: [figure('tr', [transversal({ deg: 60, labels: numbered })])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Parallel lines and transversals', md: '**Parallel lines** are in the same plane and never meet; $m \\parallel n$ means "$m$ is parallel to $n$". A **transversal** crosses two or more lines.' }],
      lines: [
        { say: 'Parallel lines are lines in the same plane that never meet. Matching arrowheads show that lines are parallel, and the symbol made of two short bars means "is parallel to".', show: ['tr.m', 'tr.n', 'tr.m-name', 'tr.n-name', 'tr.marks', 'def'], focus: 'tr.marks' },
        { say: 'A transversal is a line that crosses two or more other lines. Here, the transversal t crosses m and n, and makes eight angles, four at each crossing.', show: ['tr.t', 'tr.t-name'], focus: 'tr.t' },
        { say: 'Angles three, four, five and six are between the two lines. They are interior angles.', show: ['tr.a3', 'tr.a4', 'tr.a5', 'tr.a6'], focus: ['tr.a3', 'tr.a4', 'tr.a5', 'tr.a6'] },
        { say: 'Angles one, two, seven and eight are outside them. They are exterior angles.', show: ['tr.a1', 'tr.a2', 'tr.a7', 'tr.a8'], focus: ['tr.a1', 'tr.a2', 'tr.a7', 'tr.a8'] },
      ],
    },
    {
      chapter: 'Angle pairs',
      layout: 'split',
      leftWidth: 520,
      left: [figure('p', [transversal({ deg: 60, labels: numbered })])],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Pair', 'Example'],
          rows: [
            ['Corresponding', '2 and 6'],
            ['Alternate interior', '3 and 6'],
            ['Alternate exterior', '1 and 8'],
            ['Same-side interior', '4 and 6'],
            ['Vertically opposite', '1 and 4'],
          ],
        },
      ],
      lines: [
        { say: 'Corresponding angles are in matching positions at the two crossings. Angle two is above m, right of t, and angle six is above n, right of t.', show: ['p.lines', 'p.marks', 'p.a2', 'p.a6', 't.0'], focus: ['p.a2', 'p.a6', 't.0'] },
        { say: 'Alternate interior angles are between the lines, on opposite sides of the transversal, such as angles three and six.', show: ['p.a3', 't.1'], focus: ['p.a3', 'p.a6', 't.1'] },
        { say: 'Alternate exterior angles are outside the lines, on opposite sides, such as angles one and eight.', show: ['p.a1', 'p.a8', 't.2'], focus: ['p.a1', 'p.a8', 't.2'] },
        { say: 'Same-side interior angles are between the lines, on the same side of the transversal, such as angles four and six.', show: ['p.a4', 't.3'], focus: ['p.a4', 'p.a6', 't.3'] },
        { say: 'And vertically opposite angles are across from each other at one crossing, such as angles one and four.', show: 't.4', focus: ['p.a1', 'p.a4', 't.4'] },
      ],
    },
    {
      chapter: 'When the lines are parallel',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Corresponding angles are equal.', 'Alternate interior angles are equal, and so are alternate exterior angles.', 'Same-side interior angles are supplementary: they add to $180^\\circ$.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'For any two crossing lines', md: 'Vertically opposite angles are equal, and angles that form a straight line add to $180^\\circ$, whether or not the lines are parallel.' },
      ],
      lines: [
        { say: 'When a transversal crosses parallel lines, corresponding angles are equal.', show: 'b.0' },
        { say: 'Alternate interior angles are equal, and so are alternate exterior angles.', show: 'b.1' },
        { say: 'And same-side interior angles are supplementary, which means they add to 180 degrees.', show: 'b.2' },
        { say: 'Two facts hold for any two crossing lines, parallel or not: vertically opposite angles are equal, and angles that form a straight line add to 180 degrees.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two angles are between two parallel lines, on the same side of a transversal. What kind of pair are they, and how are they related?',
          choices: ['Same-side interior; they add to $180^\\circ$.', 'Alternate interior; they are equal.', 'Corresponding; they are equal.', 'Same-side interior; they are equal.'],
          answer: 0,
          working: 'Between the lines is interior, and on the same side of the transversal is same-side. With parallel lines, same-side interior angles are supplementary.',
        },
      ],
      lines: [
        { say: 'Your turn. Two angles are between two parallel lines, on the same side of a transversal. What kind of pair are they, and how are they related? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Between the lines means interior, and on the same side means same-side. With parallel lines, same-side interior angles add to 180 degrees.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A transversal makes corresponding, alternate, same-side interior and vertically opposite pairs.', 'With parallel lines, corresponding and alternate angles are equal.', 'Same-side interior angles add to $180^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. A transversal crossing two lines makes corresponding, alternate interior, alternate exterior, same-side interior and vertically opposite pairs.', show: 'sum.0' },
        { say: 'With parallel lines, corresponding and alternate angles are equal.', show: 'sum.1' },
        { say: 'And same-side interior angles add to 180 degrees. In part two, we find angles, and give a reason for each. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
