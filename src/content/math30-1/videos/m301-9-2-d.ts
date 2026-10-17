import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m301-9-counting.ts';

const friend = '\\text{friend}';

const video: Explainer = {
  id: 'm301-9-2-d',
  lessonId: 'm301-9-2',
  title: 'Permutations, Part 4: Arrangements with Restrictions',
  thumbnailTitle: 'Together and Apart',
  thumbnail: 'seat',
  summary: 'Handling a restriction first: six friends sit in a row with Mei and Owen together (a block: 2 × 5! = 240 seatings) or apart (6! − 240 = 480), and why the people inside a block must be arranged too.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.2 · Part 4', title: 'Together and Apart', subtitle: 'Arrangements with restrictions' }],
      lines: [
        { say: 'Six friends want to sit in a row at the movies, but two of them insist on sitting together. A rule like this changes the count.', show: 'title' },
        { say: 'In this video, you will handle the restriction first: tape objects into a block when they must be together, and subtract when they must be apart.' },
      ],
    },
    {
      chapter: 'Handle the restriction first',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Must be together:** tape them into one block, arrange the blocks, then multiply by the arrangements inside the block.', '**Must not be together:** count all arrangements, then subtract those where they are together.'] }],
      lines: [
        { say: 'With a restriction, handle the restriction first, then arrange everything else.' },
        { say: 'When objects must be together, tape them into one block. Arrange the block with the other objects, then multiply by the number of ways to arrange the objects inside the block.', show: 'b.0', focus: 'b.0' },
        { say: 'When objects must not be together, count all the arrangements, then subtract the ones where they are together.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Together: use a block',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Six friends, including Mei and Owen, sit in a row. How many seatings have Mei and Owen together?' },
        figure('seat', [slots({ values: ['\\text{Mei, Owen}', '', '', '', ''], captions: ['\\text{block}', friend, friend, friend, friend], widths: [2.8], tone: 'theta', shade: [0] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['5 \\text{ units: } 5! = 120', '\\text{inside the block: } 2! = 2', '2 \\times 120 = 240'] },
      ],
      lines: [
        { say: 'Six friends, including Mei and Owen, sit in a row. How many seatings have Mei and Owen together?', show: 'p' },
        { say: 'Tape Mei and Owen together into one block. Now there are five units to arrange: the block, and the other four friends.', show: ['seat.boxes', 'seat.values', 'seat.captions', 'seat.f0'], focus: 'seat.v0' },
        { say: 'Five units can be arranged in five factorial, or 120, ways.', show: 'm.0', focus: 'm.0' },
        { say: 'But inside the block, Mei and Owen can switch places: Mei then Owen, or Owen then Mei. That is two factorial, or two, ways.', show: 'm.1', focus: 'm.1' },
        { say: 'So the number of seatings with Mei and Owen together is two times 120, which is 240.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Apart: subtract',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'How many seatings have Mei and Owen apart?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{all seatings: } 6! = 720', '\\text{together: } 240', '\\text{apart: } 720 - 240 = 480'] },
      ],
      lines: [
        { say: 'Now, how many seatings have Mei and Owen apart?', show: 'p' },
        { say: 'Counting those directly is messy, because Mei and Owen can be apart in many different patterns. It is easier to count what you do not want, and subtract.' },
        { say: 'With no restriction, six friends can sit in six factorial, or 720, ways.', show: 'm.0', focus: 'm.0' },
        { say: 'In 240 of those, Mei and Owen are together, as we just found.', show: 'm.1', focus: 'm.1' },
        { say: 'Every other seating has them apart: 720 minus 240 is 480.', show: 'm.2', focus: 'm.2' },
        { say: 'Check that the answers make sense: 240 seatings together, plus 480 apart, is all 720 seatings.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Arrange the inside of the block', md: 'The block $\\boxed{\\text{Mei, Owen}}$ can also be $\\boxed{\\text{Owen, Mei}}$. Leaving out the $2!$ gives $120$ seatings together instead of $240$.' },
      ],
      lines: [
        { say: 'A common mistake is to forget the arrangements inside the block. The block Mei, Owen can also be Owen, Mei.', show: 'oops' },
        { say: 'Leaving out that factor of two gives 120 seatings together, and then 600 apart, and both are wrong. If three people must sit together, their block can be arranged in three factorial, or six, ways.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Five people, including Ava and Ben, stand in a line for a photo. In how many ways can they stand with Ava and Ben **not** together?',
          choices: ['$72$', '$48$', '$96$', '$24$'],
          answer: 0,
          working: 'All: $5! = 120$. Together: the block and 3 others make 4 units, $4! = 24$, times $2!$ inside the block: $48$. Apart: $120 - 48 = 72$.',
        },
      ],
      lines: [
        { say: 'Your turn. Five people, including Ava and Ben, stand in a line for a photo. In how many ways can they stand with Ava and Ben not together? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, seventy-two. All arrangements: five factorial, or 120. Together: four units in four factorial, or twenty-four, ways, times two inside the block, which is forty-eight. Apart is 120 minus forty-eight, which is seventy-two. Choice C, ninety-six, forgets that Ava and Ben can switch places inside the block.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Handle the restriction first, then arrange everything else.', 'Together: arrange the block with the others, then multiply by the arrangements inside the block.', 'Apart: subtract the "together" arrangements from the total.'] }],
      lines: [
        { say: 'Let’s sum up. Handle the restriction first, then arrange everything else.', show: 'sum.0' },
        { say: 'When objects must be together, arrange their block with the other objects, then multiply by the arrangements inside the block.', show: 'sum.1' },
        { say: 'And when they must be apart, subtract the "together" arrangements from the total. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
