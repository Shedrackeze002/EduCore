import type { Explainer } from '@/video/script.ts';
import { transversal } from '@/video/angles.ts';
import { figure } from '@/video/solids.ts';

const numbered = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8' };

const video: Explainer = {
  id: 'm103-6-3',
  lessonId: 'm103-6-3',
  title: 'Parallel Lines, Part 1: Transversals and Angle Pairs',
  thumbnailTitle: 'Parallel Lines and Transversals',
  thumbnail: 'tr',
  summary: 'Parallel lines cut by a transversal: the eight angles, interior and exterior angles, and the named pairs (corresponding, alternate interior, alternate exterior and co-interior), with the F, Z and C shapes that help you spot them. Part 2 uses the pairs to find angles and test for parallel lines.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 6.3 · Part 1', title: 'Parallel Lines and Transversals', subtitle: 'Eight angles and the pairs they make' }],
      lines: [
        { say: 'Railway tracks, the studs in a wall, and the lines in a parking lot are all parallel. When a road or a brace crosses them, the angles it makes follow a pattern.', show: 'title' },
        { say: 'In this video, you will name the angles a transversal makes, and the pairs they form.' },
      ],
    },
    {
      chapter: 'Transversals',
      layout: 'split',
      leftWidth: 560,
      left: [figure('tr', [transversal({ deg: 65, labels: numbered })])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Parallel lines and transversals', md: '**Parallel** lines are always the same distance apart and never meet. A **transversal** crosses two or more lines.' }],
      lines: [
        { say: 'Parallel lines are always the same distance apart, and never meet. In diagrams, matching arrowheads mark them.', show: ['tr.m', 'tr.n', 'tr.m-name', 'tr.n-name', 'tr.marks', 'def'], focus: 'tr.marks' },
        { say: 'A transversal is a line that crosses two or more other lines. Here, line t crosses the parallel lines m and n.', show: ['tr.t', 'tr.t-name'], focus: 'tr.t' },
        { say: 'It makes eight angles, four at each crossing. Angles three, four, five and six lie between the parallel lines. They are interior angles.', show: ['tr.a3', 'tr.a4', 'tr.a5', 'tr.a6'], focus: ['tr.a3', 'tr.a4', 'tr.a5', 'tr.a6'] },
        { say: 'Angles one, two, seven and eight lie outside them. They are exterior angles.', show: ['tr.a1', 'tr.a2', 'tr.a7', 'tr.a8'], focus: ['tr.a1', 'tr.a2', 'tr.a7', 'tr.a8'] },
      ],
    },
    {
      chapter: 'Angle pairs',
      layout: 'split',
      leftWidth: 520,
      left: [figure('p', [transversal({ deg: 65, labels: numbered })])],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Pair', 'Example', 'If parallel'],
          rows: [
            ['Corresponding', '2 and 6', 'equal'],
            ['Alternate interior', '3 and 6', 'equal'],
            ['Alternate exterior', '1 and 8', 'equal'],
            ['Co-interior', '3 and 5', 'add to $180^\\circ$'],
          ],
        },
      ],
      lines: [
        { say: 'Corresponding angles are in the same position at each crossing. Angle two is above m, on the right of t. Angle six is above n, on the right of t.', show: ['p.lines', 'p.marks', 'p.a2', 'p.a6', 't.0'], focus: ['p.a2', 'p.a6', 't.0'] },
        { say: 'Alternate interior angles are between the lines, on opposite sides of the transversal, like angles three and six.', show: ['p.a3', 't.1'], focus: ['p.a3', 'p.a6', 't.1'] },
        { say: 'Alternate exterior angles are outside the lines, on opposite sides of the transversal, like angles one and eight.', show: ['p.a1', 'p.a8', 't.2'], focus: ['p.a1', 'p.a8', 't.2'] },
        { say: 'Co-interior angles are between the lines, on the same side of the transversal, like angles three and five.', show: ['p.a5', 't.3'], focus: ['p.a3', 'p.a5', 't.3'] },
        { say: 'When the lines are parallel, corresponding and alternate angles are equal, and co-interior angles add to 180 degrees.', focus: ['t.0', 't.1', 't.2', 't.3'] },
      ],
    },
    {
      chapter: 'Letter shapes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Look for letter shapes', md: 'Corresponding angles sit in an **F**. Alternate interior angles sit in a **Z**. Co-interior angles sit in a **C**, or a U. The letter can be backwards or upside down.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Always true', md: 'Vertically opposite angles, such as 1 and 4, are equal whether the lines are parallel or not.' },
      ],
      lines: [
        { say: 'To spot the pairs, look for letter shapes. Corresponding angles sit inside an F shape. Alternate interior angles sit inside a Z. And co-interior angles sit inside a C, or a U.', show: 'tip' },
        { say: 'The letter can be backwards or upside down, so turn your head or your page until you see it.' },
        { say: 'And at each crossing, the vertically opposite angles, such as one and four, are always equal, whether the lines are parallel or not.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A transversal crosses two parallel lines. Which pair of angles **add to** $180^\\circ$?',
          choices: ['co-interior angles', 'corresponding angles', 'alternate interior angles', 'alternate exterior angles'],
          answer: 0,
          working: 'Co-interior angles (same side, between the lines) add to $180^\\circ$. The other pairs are equal.',
        },
      ],
      lines: [
        { say: 'Your turn. A transversal crosses two parallel lines. Which pair of angles add to 180 degrees? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, co-interior angles: between the lines, on the same side of the transversal. The other three pairs are equal.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A transversal makes eight angles: four interior and four exterior.', 'Parallel lines: corresponding and alternate angles are equal.', 'Parallel lines: co-interior angles add to $180^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. A transversal crossing two lines makes eight angles: four interior, and four exterior.', show: 'sum.0' },
        { say: 'When the lines are parallel, corresponding angles and alternate angles are equal.', show: 'sum.1' },
        { say: 'And co-interior angles add to 180 degrees. In part two, we use these pairs to find angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
