import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots, tree } from './lib/m301-9-counting.ts';

const video: Explainer = {
  id: 'm301-9-1',
  lessonId: 'm301-9-1',
  title: 'The Fundamental Counting Principle, Part 1: Tree Diagrams and Multiplying Choices',
  thumbnailTitle: 'The Counting Principle',
  thumbnail: 's',
  summary: 'A tree diagram of 3 shirts and 2 pairs of pants gives 3 × 2 = 6 outfits, which leads to the fundamental counting principle: multiply the number of choices at each stage. Worked example: 3 × 5 × 4 = 60 three-course meals. Part 2 counts codes with and without repetition.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.1 · Part 1', title: 'The Counting Principle', subtitle: 'Counting without listing' }],
      lines: [
        { say: 'How many passwords would a computer have to try to guess yours? How many outfits can you pack for a week away? Answers like these are far too large to list one by one.', show: 'title' },
        { say: 'In this video, you will draw a tree diagram, and then learn the fundamental counting principle, which counts the outcomes without listing them.' },
      ],
    },
    {
      chapter: 'A tree diagram',
      layout: 'split',
      leftWidth: 700,
      left: [figure('tr', [tree({ first: ['Red', 'Blue', 'Green'], second: ['Jeans', 'Khakis'] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Shirts: } \\thc{3}', '\\text{Pants: } \\adj{2}', '\\thc{3} \\times \\adj{2} = \\good{6}'] }],
      lines: [
        { say: 'Suppose you pack three shirts, red, blue and green, and two pairs of pants, jeans and khakis. How many different outfits can you make?', show: ['tr.start', 'm.0', 'm.1'] },
        { say: 'A tree diagram shows every outfit. First, draw one branch for each shirt.', show: 'tr.s1', focus: 'tr.s1' },
        { say: 'Then, from each shirt, draw one branch for each pair of pants. Red can go with jeans or khakis, and so can blue, and so can green.', show: ['tr.s2-0', 'tr.s2-1', 'tr.s2-2'], focus: ['tr.s2-0', 'tr.s2-1', 'tr.s2-2'] },
        { say: 'Each path from the start to the end of a branch is one outfit, such as red with jeans. Count the ends of the branches: there are six outfits.', show: 'tr.count', focus: 'tr.count' },
        { say: 'Notice why. Each of the three shirts leads to the same two choices of pants, so the number of outfits is three times two, which is six.', show: 'm.2', focus: ['m.2', 'tr'] },
      ],
    },
    {
      chapter: 'The counting principle',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fundamental counting principle', md: 'If one task can be done in $m$ ways and a second, independent task can be done in $n$ ways, then the two tasks together can be done in $m \\times n$ ways. For more tasks, keep multiplying.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['m \\times n', 'm \\times n \\times p \\times \\cdots'] },
      ],
      lines: [
        { say: 'That multiplication works for any number of stages. It is called the fundamental counting principle.', show: 'def' },
        { say: 'If one task can be done in m ways, and a second, independent task can be done in n ways, then the two tasks together can be done in m times n ways.', show: 'm.0', focus: 'm.0' },
        { say: 'Independent means that the choice for one task does not change the number of choices for the other. Whichever shirt you pick, there are still two pairs of pants to choose from.' },
        { say: 'For three or more tasks, keep multiplying. A tree diagram grows very quickly, but the multiplication stays short.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A three-course meal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A restaurant in Banff offers 3 appetizers, 5 main courses and 4 desserts. How many different three-course meals (one of each) are possible?' },
        figure('s', [slots({ values: ['3', '5', '4'], captions: ['\\text{appetizer}', '\\text{main course}', '\\text{dessert}'] })], 240),
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\times 5 \\times 4 = 60'] },
      ],
      lines: [
        { say: 'Let’s use it. A restaurant in Banff offers three appetizers, five main courses and four desserts. How many different three-course meals, with one of each, are possible?', show: 'p' },
        { say: 'A meal is an appetizer, and a main course, and a dessert. That is three stages, so draw one box for each stage.', show: ['s.boxes', 's.captions'] },
        { say: 'In each box, write the number of choices: three appetizers, five main courses, and four desserts.', show: 's.values', focus: 's.values' },
        { say: 'Multiply: three times five is fifteen, and fifteen times four is sixty. There are sixty different meals.', show: ['s.times', 'm.0'], focus: ['s', 'm.0'] },
        { say: 'A tree diagram for this meal would end in sixty branches. The counting principle gets the same answer in one line.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply, do not add', md: 'Adding the choices, $3 + 5 + 4 = 12$, counts the dishes on the menu, not the meals. A meal uses one dish from **every** stage, so the choices multiply.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3 + 5 + 4 = 12} \\quad \\text{dishes}', '\\good{3 \\times 5 \\times 4 = 60} \\quad \\text{meals}'] },
      ],
      lines: [
        { say: 'A common mistake is to add the choices: three plus five plus four is twelve. But twelve is the number of dishes on the menu, not the number of meals.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'A meal uses one dish from every stage, and each appetizer can go with every main course and every dessert. So the choices multiply, and there are sixty meals.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A café makes drinks in 4 sizes, with 3 flavours and 2 kinds of milk. Each drink has one size, one flavour and one kind of milk. How many different drinks are possible?',
          choices: ['$9$', '$24$', '$12$', '$48$'],
          answer: 1,
          working: 'A drink is a size **and** a flavour **and** a kind of milk: $4 \\times 3 \\times 2 = 24$.',
        },
      ],
      lines: [
        { say: 'Your turn. A café makes drinks in four sizes, with three flavours and two kinds of milk. Each drink has one size, one flavour and one kind of milk. How many different drinks are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, twenty-four. A drink is a size, and a flavour, and a kind of milk, so multiply: four times three times two is twenty-four. Choice A adds the choices instead of multiplying them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A tree diagram shows every outcome: one branch for each choice at each stage.', 'Fundamental counting principle: $m$ ways and then $n$ ways give $m \\times n$ ways.', 'For more stages, keep multiplying.'] }],
      lines: [
        { say: 'Let’s sum up. A tree diagram shows every outcome, with one branch for each choice at each stage.', show: 'sum.0' },
        { say: 'The fundamental counting principle says that if one task can be done in m ways and a second in n ways, the two together can be done in m times n ways.', show: 'sum.1' },
        { say: 'And for more stages, keep multiplying. In part two, we draw a box for each position, and count codes and numbers with and without repetition. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
