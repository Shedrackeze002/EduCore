import type { Explainer } from '@/video/script.ts';
import { figure, squareColumns } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-5-2-b',
  lessonId: 'm203-5-2',
  title: 'Views of Three-Dimensional Objects, Part 2: Front and Side Views',
  thumbnailTitle: 'Front and Side Views',
  thumbnail: 'fv',
  summary: 'Drawing the front view (the tallest stack in each column, 3, 1, 2) and the right side view (the tallest in each row, front row on the left, 2, 3) from a top view, and why a view shows height, not the number of cubes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.2 · Part 2', title: 'Front and Side Views', subtitle: 'Only the tallest stack shows' }],
      lines: [
        { say: 'Walk around a stack of boxes, and it looks different from each side. A top view with numbers tells you exactly what you will see.', show: 'title' },
        { say: 'In this video, you will draw the front and right side views of a stack from its top view.' },
      ],
    },
    {
      chapter: 'The front view',
      layout: 'split',
      leftWidth: 560,
      left: [
        { kind: 'table', id: 't', head: ['', 'Left', 'Centre', 'Right'], rows: [['Back', '$3$', '$1$', '$2$'], ['Front', '$2$', '$1$', '$1$']] },
      ],
      right: [figure('fv', [squareColumns({ heights: [3, 1, 2], label: '\\text{Front view}' })], 320)],
      lines: [
        { say: 'Here is the top view from part one. Picture standing in front of the stack. Each column of the table, left, centre and right, becomes one column of squares in the front view.', show: 't' },
        { say: 'You see only the tallest stack in each column, because shorter stacks hide behind it. The left column has stacks of three and two, so it looks three tall.', show: 'fv.c0', focus: 'fv.c0' },
        { say: 'The centre column has one and one: one tall. The right column has two and one: two tall.', show: ['fv.c1', 'fv.c2'], focus: ['fv.c1', 'fv.c2'] },
        { say: 'So the front view has columns of three, one and two squares, left to right.', show: 'fv.label' },
      ],
    },
    {
      chapter: 'The right side view',
      layout: 'split',
      leftWidth: 560,
      left: [
        { kind: 'table', id: 't', head: ['', 'Left', 'Centre', 'Right'], rows: [['Back', '$3$', '$1$', '$2$'], ['Front', '$2$', '$1$', '$1$']] },
      ],
      right: [figure('sv', [squareColumns({ heights: [2, 3], label: '\\text{Right side view}' })], 320)],
      lines: [
        { say: 'For the right side view, walk around to the right. Now each row of the table becomes one column of squares, and the front row is on your left.', show: 't' },
        { say: 'The front row has two, one and one: its tallest stack is two.', show: 'sv.c0', focus: ['t.1', 'sv.c0'] },
        { say: 'The back row has three, one and two: its tallest is three.', show: 'sv.c1', focus: ['t.0', 'sv.c1'] },
        { say: 'So the right side view has columns of two and three squares, with the front row first.', show: 'sv.label' },
      ],
    },
    {
      chapter: 'Tallest, not total',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding instead of finding the tallest', md: 'A view shows how **tall** the stack looks, not how many cubes are in a column. In the left column, $3 + 2 = 5$ cubes stand in two spots, but from the front you see a column only $3$ cubes tall.' }],
      lines: [
        { say: 'A common mistake is to add the stacks in a column. In the left column, three plus two is five cubes. But they stand in two spots, one behind the other, so from the front you see a column only three cubes tall.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Left', 'Right'], rows: [['Back', '$1$', '$4$'], ['Front', '$3$', '$2$']] },
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the column heights of the front view, left to right?',
          choices: ['$3$, $4$', '$4$, $6$', '$1$, $4$', '$3$, $2$'],
          answer: 0,
          working: 'Left column: $1$ and $3$, tallest $3$. Right column: $4$ and $2$, tallest $4$. B adds the stacks.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the column heights of the front view of this stack, left to right? Pause the video and try it.', show: ['t', 'q'], wait: 6 },
        { say: 'The answer is A. The left column has one and three, so it looks three tall. The right column has four and two, so it looks four tall. B adds the stacks instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Front view: the tallest stack in each column, left to right.', 'Right side view: the tallest stack in each row, front row on the left.', 'A view shows height, not a count.'] }],
      lines: [
        { say: 'Let’s sum up. The front view shows the tallest stack in each column, left to right.', show: 'sum.0' },
        { say: 'The right side view shows the tallest stack in each row, with the front row on the left.', show: 'sum.1' },
        { say: 'And a view shows how tall, not how many. In part three, we look at isometric drawings. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
