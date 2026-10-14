import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-5-2',
  lessonId: 'm203-5-2',
  title: 'Views of Three-Dimensional Objects, Part 1: Top Views and Counting Cubes',
  thumbnailTitle: 'Top Views',
  thumbnail: 't',
  summary: 'Top, front and side views, a top view with the number of cubes in each stack, counting 10 boxes in a warehouse stack, and why the top view is the best one for counting hidden cubes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.2 · Part 1', title: 'Top Views and Counting Cubes', subtitle: 'Flat pictures of a stack' }],
      lines: [
        { say: 'A warehouse stacks boxes, a mason stacks concrete blocks, and a rail yard stacks containers. To plan or describe a stack, workers use views: flat pictures of what you see from the top, the front and the side.', show: 'title' },
        { say: 'In this video, you will read a top view, and use it to count the cubes in a stack.' },
      ],
    },
    {
      chapter: 'Three views',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Top view**: looking straight down.', '**Front view**: looking from the front.', '**Side view**: looking from the right side.'] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Each view is flat', md: 'A view shows width and height, or width and depth, but never all three at once.' },
      ],
      lines: [
        { say: 'A top view shows what you see looking straight down.', show: 'b.0' },
        { say: 'A front view shows what you see from the front.', show: 'b.1' },
        { say: 'And a side view shows what you see from the right side.', show: 'b.2' },
        { say: 'Each view is flat. It shows width and height, or width and depth, but never all three at once. Plans for a shed, a deck, or a load of pallets on a truck all use views like these.', show: 'k' },
      ],
    },
    {
      chapter: 'A top view with numbers',
      layout: 'split',
      leftWidth: 620,
      left: [{ kind: 'table', id: 't', head: ['', 'Left', 'Centre', 'Right'], rows: [['Back', '$3$', '$1$', '$2$'], ['Front', '$2$', '$1$', '$1$']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{back: } 3 + 1 + 2 = 6', '\\text{front: } 2 + 1 + 1 = 4', '\\text{total: } 6 + 4 = 10'] }],
      lines: [
        { say: 'A top view of a stack of cubes can carry numbers. Each number tells how many cubes are stacked in that spot. Here, the front of the stack is at the bottom of the table.', show: 't' },
        { say: 'Cube-shaped boxes are stacked as in this top view. How many boxes are there? Add each row. The back row has three plus one plus two, six boxes.', show: 'm.0', focus: ['t.0', 'm.0'] },
        { say: 'The front row has two plus one plus one, four boxes.', show: 'm.1', focus: ['t.1', 'm.1'] },
        { say: 'Altogether, ten boxes. Notice that the tallest stack, three boxes, is at the back left, where a photo from the front would hide some of them.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Hidden cubes',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Hidden cubes', md: 'From the front or the side, some cubes hide behind others. A top view with numbers shows every stack, so it is the best view for counting.' }],
      lines: [
        { say: 'Why use the top view to count? From the front or the side, you cannot see every cube, because some hide behind others.', show: 'tip' },
        { say: 'A top view with numbers shows every stack, so nothing is hidden. It is the best view for counting.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Left', 'Right'], rows: [['Back', '$4$', '$2$'], ['Middle', '$3$', '$1$'], ['Front', '$2$', '$1$']] },
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many cubes are in the stack shown by this top view?',
          choices: ['$13$', '$6$', '$9$', '$4$'],
          answer: 0,
          working: '$4 + 2 + 3 + 1 + 2 + 1 = 13$. B counts the spots, not the cubes.',
        },
      ],
      lines: [
        { say: 'Your turn. How many cubes are in the stack shown by this top view? Pause the video and try it.', show: ['t', 'q'], wait: 6 },
        { say: 'The answer is A. Add every number: four plus two, three plus one, and two plus one. That is thirteen cubes. B counts the spots, not the cubes.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Top: from above. Front: from the front. Side: from the right.', 'Each number in a top view is the height of a stack.', 'Add all the numbers to count the cubes.'] }],
      lines: [
        { say: 'Let’s sum up. A top view is seen from above, a front view from the front, and a side view from the right.', show: 'sum.0' },
        { say: 'Each number in a top view is the height of a stack.', show: 'sum.1' },
        { say: 'And to count the cubes, add all the numbers. In part two, we draw the front and side views. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
