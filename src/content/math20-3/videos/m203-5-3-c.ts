import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-5-3-c',
  lessonId: 'm203-5-3',
  title: 'Exploded Views and Components, Part 3: Assembly Order and Comparing Costs',
  thumbnailTitle: 'Assembly Order and Costs',
  thumbnail: 'm',
  summary: 'Putting parts together in order (a deck from footings to railing), reading real sizes from a 1 : 20 exploded view, the cost of 3 bookshelves with a 5% tax given in the question (250.71 dollars), and comparing parts with a kit.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.3 · Part 3', title: 'Assembly Order and Costs', subtitle: 'What goes first, and what it costs' }],
      lines: [
        { say: 'An exploded view shows more than the parts: it shows the order to put them together. And a parts list lets you compare costs before you buy.', show: 'title' },
        { say: 'In this video, you will order the steps for building a deck, and price a class project.' },
      ],
    },
    {
      chapter: 'Building a deck',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Footings**: concrete, poured first, they hold everything.', '**Posts**: set on the footings.', '**Beams**: bolted to the posts.', '**Joists**: fastened to the beams.', '**Deck boards**: screwed to the joists.', '**Railing**: around the finished floor.'] }],
      lines: [
        { say: 'A part can only go on once the part it sits on, or fastens to, is in place. So start with the part that holds everything up. For a deck, that is the concrete footings.', show: 'b.0' },
        { say: 'The posts sit on the footings.', show: 'b.1' },
        { say: 'The beams bolt to the posts, and the joists rest on the beams.', show: ['b.2', 'b.3'] },
        { say: 'The deck boards are screwed to the joists. And the railing goes around the finished floor, last of all.', show: ['b.4', 'b.5'] },
      ],
    },
    {
      chapter: 'Reading the dashed lines',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the dashed lines', md: 'Follow each dashed line from a part to the part it joins. The part at the other end must already be in place.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 : 20:\\ \\ 4.5 \\times 20 = 90 \\text{ cm}'] },
      ],
      lines: [
        { say: 'In an exploded view, follow each dashed line from a part to the part it joins. The part at the other end must already be in place.', show: 'tip' },
        { say: 'Exploded views in a set of plans are often drawn to scale, too. On a drawing with a scale of one to twenty, a shelf drawn 4.5 centimetres long is really 4.5 times twenty, ninety centimetres long.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Buying for a class',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['79.59 \\times 3 = 238.77', '238.77 \\times 0.05 = 11.9385', '238.77 + 11.9385 = 250.7085 \\approx \\$250.71'] }],
      lines: [
        { say: 'A shop class is building three of the bookshelves from part two, where one bookshelf’s parts cost seventy-nine dollars fifty-nine. In this example, they pay five percent GST on the total. What is the total cost? Three bookshelves cost 238 dollars seventy-seven.', show: 'm.0', focus: 'm.0' },
        { say: 'The GST is five percent of that: 11.9385 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Add it, and round to the nearest cent: two hundred fifty dollars and seventy-one cents. Add the tax once, at the end.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Parts or a kit?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['79.59 - 69.99 = 9.60'] }],
      lines: [
        { say: 'Suppose a store sells the complete kit for sixty-nine dollars ninety-nine. Buying the parts separately for one bookshelf costs seventy-nine fifty-nine, which is nine dollars sixty more.', show: 'm.0', focus: 'm.0' },
        { say: 'The parts list makes comparisons like this easy, and it is handy for replacing a single broken part later.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which part of a garden shed goes on **last**?',
          choices: ['the roof shingles', 'the floor frame', 'the wall studs', 'the roof rafters'],
          answer: 0,
          working: 'The floor frame holds the walls, the walls hold the rafters, and the shingles cover the rafters, so the shingles go on last.',
        },
      ],
      lines: [
        { say: 'Your turn. Which part of a garden shed goes on last? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The floor frame holds the walls, the walls hold the rafters, and the shingles cover the rafters. So the shingles, the outside layer, go on last.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Assemble from the part that holds everything up to the outside layer.', 'If the view is to scale, multiply drawing lengths by the scale.', 'Multiply for the number of items, then add tax once at the end.'] }],
      lines: [
        { say: 'Let’s sum up. Assemble from the part that holds everything up, to the outside layer.', show: 'sum.0' },
        { say: 'If the view is drawn to scale, multiply drawing lengths by the scale.', show: 'sum.1' },
        { say: 'And multiply for the number of items, then add any tax once, at the end. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
