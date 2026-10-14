import type { Explainer } from '@/video/script.ts';
import { figure, squareColumns } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-5-2-d',
  lessonId: 'm203-5-2',
  title: 'Views of Three-Dimensional Objects, Part 4: Working Backward from Views',
  thumbnailTitle: 'Working Backward from Views',
  thumbnail: 'fv',
  summary: 'Finding a top view that fits given front and right side views on a 2 by 2 base, testing each column and row, the fewest (6) and most (7) cubes the structure could have, and why two views are not always enough.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.2 · Part 4', title: 'Working Backward from Views', subtitle: 'Which stacks fit?' }],
      lines: [
        { say: 'Sometimes you are given the front and side views, and must work out how the cubes are stacked. It is a puzzle: every column and every row has to fit.', show: 'title' },
        { say: 'In this video, you will build a top view from two views, and find the fewest and most cubes.' },
      ],
    },
    {
      chapter: 'The views',
      layout: 'center',
      main: [
        figure('vw', [squareColumns({ name: 'f', heights: [3, 2], label: '\\text{Front}' }), squareColumns({ name: 's', at: [4, 0], heights: [3, 1], label: '\\text{Right side}' })], 300),
      ],
      lines: [
        { say: 'A structure on a two-by-two base has these front and right side views. What are the fewest and the most cubes it could have?', show: ['vw.f-c0', 'vw.f-c1', 'vw.f-label', 'vw.s-c0', 'vw.s-c1', 'vw.s-label'] },
        { say: 'The side view says the front row is three tall, and the back row is one tall. Remember, in the right side view, the front row is on the left.', focus: ['vw.s-c0', 'vw.s-c1'] },
        { say: 'The front view says the left column is three tall, and the right column is two tall.', focus: ['vw.f-c0', 'vw.f-c1'] },
      ],
    },
    {
      chapter: 'Fill in the top view',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['', 'Left', 'Right'], rows: [['Back', '$0$ or $1$', '$0$ or $1$'], ['Front', '$3$', '$2$']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{fewest: } 3 + 2 + 1 = 6', '\\text{most: } 3 + 2 + 1 + 1 = 7'] }],
      lines: [
        { say: 'The left column must reach three. The back row is only one tall, so the three must be at the front left.', show: 't.1', focus: 't.1' },
        { say: 'The right column must reach two, and again the back row can only hold one, so the two must be at the front right.', focus: 't.1' },
        { say: 'The back row must be one tall somewhere, and no spot in it can be taller than one. So each back spot holds one cube or none, as long as at least one of them holds a cube.', show: 't.0', focus: 't.0' },
        { say: 'The fewest cubes is three plus two plus one, six. The most is three plus two plus one plus one, seven.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Two views are not always enough',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Two views are not always enough', md: 'Here, two different structures have the same front and side views. That is why plans for a build show a top view with heights, or three views together.' }],
      lines: [
        { say: 'Notice that two different structures, one with six cubes and one with seven, have exactly the same front and side views.', show: 'tip' },
        { say: 'That is why plans for a build show a top view with heights, or three views together. And when you work backward, check every column and every row.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A structure on a $2$ by $2$ base has a front view of two columns, each $2$ tall, and a right side view of two columns, each $2$ tall. What is the most cubes it could have?',
          choices: ['$8$', '$4$', '$6$', '$16$'],
          answer: 0,
          working: 'Every column and every row is $2$ tall, so each of the $4$ spots can hold up to $2$: at most $2 \\times 4 = 8$ cubes.',
        },
      ],
      lines: [
        { say: 'Your turn. A structure on a two-by-two base has a front view of two columns, each two tall, and a right side view of two columns, each two tall. What is the most cubes it could have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Every column and every row is two tall, so each of the four spots can hold up to two cubes: at most eight. The fewest would be four, two stacks of two placed corner to corner.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use each view to limit the stacks in each row and column.', 'Place the tallest stacks first, then fill in the rest.', 'Two views can fit more than one structure.'] }],
      lines: [
        { say: 'Let’s sum up. Use each view to limit the stacks in each row and column.', show: 'sum.0' },
        { say: 'Place the tallest stacks first, then fill in the rest.', show: 'sum.1' },
        { say: 'And remember that two views can fit more than one structure. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
