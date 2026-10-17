import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { roads, slots } from './lib/m301-9-counting.ts';

// The two cases for even three-digit numbers: a row of boxes each, with the column names above.
const heads: Part = {
  points: { h0: [0.6, 1.75], h1: [2.5, 1.75], h2: [4.4, 1.75], k1: [-0.3, 0.6], k2: [-0.3, -1.8], e1: [5.3, 0.6], e2: [5.3, -1.8], wl: [-2.2, 0], wr: [7, 0] },
  items: [
    { kind: 'label', id: 'h0', at: 'h0', tex: '\\text{first}', tone: 'muted', place: 'center', group: 'head' },
    { kind: 'label', id: 'h1', at: 'h1', tex: '\\text{middle}', tone: 'muted', place: 'center', group: 'head' },
    { kind: 'label', id: 'h2', at: 'h2', tex: '\\text{last}', tone: 'muted', place: 'center', group: 'head' },
    { kind: 'label', id: 'k1', at: 'k1', tex: '\\text{Case 1}', tone: 'theta', place: 'left', group: 'case1' },
    { kind: 'label', id: 'k2', at: 'k2', tex: '\\text{Case 2}', tone: 'theta', place: 'left', group: 'case2' },
    { kind: 'label', id: 'e1', at: 'e1', tex: '= 72', tone: 'good', place: 'right' },
    { kind: 'label', id: 'e2', at: 'e2', tex: '= 256', tone: 'good', place: 'right' },
  ],
};
const evens = figure('ev', [
  heads,
  slots({ name: 'c1', values: ['9', '8', '1'], captions: ['', '', '\\text{only } 0'], size: 1.2, gap: 0.7 }),
  slots({ name: 'c2', values: ['8', '8', '4'], captions: ['', '', '2,\\ 4,\\ 6,\\ 8'], size: 1.2, gap: 0.7, at: [0, -2.4] }),
], 380);

// Towns A, B and C, with 3 roads from A to B, 4 from B to C and 2 straight from A to C.
const A: [number, number] = [0, 0];
const B: [number, number] = [3, 2.2];
const C: [number, number] = [6, 0];
const towns: Part = {
  points: { A, B, C, nAB: [1.2, 1.55], nBC: [4.8, 1.55], nAC: [3, -1.05] },
  items: [
    { kind: 'label', id: 'A', at: 'A', tex: '\\text{A}', dot: true, place: 'left' },
    { kind: 'label', id: 'B', at: 'B', tex: '\\text{B}', dot: true, place: 'above' },
    { kind: 'label', id: 'C', at: 'C', tex: '\\text{C}', dot: true, place: 'right' },
    { kind: 'label', id: 'nAB', at: 'nAB', tex: '3', tone: 'adj', place: 'above left' },
    { kind: 'label', id: 'nBC', at: 'nBC', tex: '4', tone: 'opp', place: 'above right' },
    { kind: 'label', id: 'nAC', at: 'nAC', tex: '2', tone: 'theta', place: 'below' },
  ],
};
const map = figure('t', [roads({ id: 'ab', from: A, to: B, bows: [-0.35, 0, 0.35], tone: 'adj' }), roads({ id: 'bc', from: B, to: C, bows: [-0.45, -0.15, 0.15, 0.45], tone: 'opp' }), roads({ id: 'ac', from: A, to: C, bows: [-0.45, -0.9], tone: 'theta' }), towns]);

const video: Explainer = {
  id: 'm301-9-1-c',
  lessonId: 'm301-9-1',
  title: 'The Fundamental Counting Principle, Part 3: Counting in Cases',
  thumbnailTitle: 'Counting in Cases',
  thumbnail: 't',
  summary: 'When to multiply ("and") and when to add ("or"): counting 328 even three-digit numbers with no repeated digits in two cases, and 14 routes from town A to town C, directly or through B. Why separate cases are never multiplied.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.1 · Part 3', title: 'Counting in Cases', subtitle: '“And” multiplies, “or” adds' }],
      lines: [
        { say: 'Sometimes a count splits into separate cases, because the number of choices in one box depends on what goes in another.', show: 'title' },
        { say: 'In this video, you will learn when to multiply and when to add, and use cases to count even numbers and routes between towns.' },
      ],
    },
    {
      chapter: 'And versus or',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'And or or', md: 'Stages that happen together ("and"): **multiply**. Separate cases that cannot happen at the same time ("or"): count each case and **add**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{and} \\;\\to\\; \\times', '\\text{or} \\;\\to\\; +'] },
      ],
      lines: [
        { say: 'The counting principle multiplies stages that happen together. A meal is an appetizer, and a main course, and a dessert, so the choices multiply.', show: ['key', 'm.0'], focus: 'm.0' },
        { say: 'But sometimes the outcomes split into separate cases that cannot happen at the same time. Then you count each case on its own, and add the cases together.', show: 'm.1', focus: 'm.1' },
        { say: 'So, "and" means multiply, and "or" means add.', focus: 'm' },
      ],
    },
    {
      chapter: 'Even numbers in two cases',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'How many even 3-digit numbers have no repeated digits?' },
        evens,
        { kind: 'math', id: 'm', size: 'md', lines: ['72 + 256 = 328'] },
      ],
      lines: [
        { say: 'How many even three-digit numbers have no repeated digits?', show: 'p' },
        { say: 'Start with the restricted box, the last digit. It must be zero, two, four, six or eight. But whether it is zero changes the choices for the first digit, which cannot be zero either. So split the count into two cases.', show: 'ev.head' },
        { say: 'Case one: the last digit is zero, which is one choice. The first digit can be one to nine: nine choices. The middle digit has the eight digits left. Nine times eight times one is seventy-two.', show: ['ev.case1', 'ev.c1-boxes', 'ev.c1-values', 'ev.c1-captions', 'ev.c1-times', 'ev.e1'], focus: 'ev.e1' },
        { say: 'Case two: the last digit is two, four, six or eight: four choices. The first digit cannot be zero, and cannot be the last digit, so it has eight choices. The middle digit has eight choices too, since zero is allowed there. Four times eight times eight is 256.', show: ['ev.case2', 'ev.c2-boxes', 'ev.c2-values', 'ev.c2-captions', 'ev.c2-times', 'ev.e2'], focus: 'ev.e2' },
        { say: 'A number cannot end in zero and in two at the same time, so the cases cannot overlap. A number is in case one or case two, so add: seventy-two plus 256 is 328 even numbers.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Routes between towns',
      layout: 'split',
      leftWidth: 560,
      left: [map],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Through B: } \\adj{3} \\times \\opp{4} = 12', '\\text{Directly: } \\thc{2}', '\\text{Total: } 2 + 12 = 14'] }],
      lines: [
        { say: 'Here is another kind of case. From town A, two roads go directly to town C. There are also three roads from A to town B, and four roads from B to C. How many routes go from A to C?', show: ['t.A', 't.B', 't.C', 't.ab', 't.bc', 't.ac', 't.nAB', 't.nBC', 't.nAC'] },
        { say: 'A route through B uses a road from A to B, and then a road from B to C. That is "and", so multiply: three times four is twelve routes.', show: 'm.0', focus: ['m.0', 't.ab', 't.bc'] },
        { say: 'A direct route uses one of the two roads straight from A to C. That is two routes.', show: 'm.1', focus: ['m.1', 't.ac'] },
        { say: 'Every route goes directly, or through B, never both. So add the cases: two plus twelve is fourteen routes.', show: 'm.2', focus: ['m.2', 't'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying separate cases', md: 'A route goes directly **or** through B, never both, so the case counts are added. Multiply only when one outcome is made of all the stages together.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{2 \\times 12 = 24}', '\\good{2 + 12 = 14}'] },
      ],
      lines: [
        { say: 'A common mistake is to multiply the cases: two times twelve is twenty-four. But no route uses a direct road and also goes through B.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Multiply only when one outcome is made of all the stages together. When the outcomes split into separate cases, count each case, and add. Here that gives fourteen routes.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From a school, 3 trails lead directly to a lake. There are also 2 trails from the school to a lookout, and 5 trails from the lookout to the lake. How many routes go from the school to the lake?',
          choices: ['$13$', '$30$', '$10$', '$25$'],
          answer: 0,
          working: 'Through the lookout: $2 \\times 5 = 10$ routes ("and"). Directly: $3$ routes. Directly **or** through the lookout: $3 + 10 = 13$.',
        },
      ],
      lines: [
        { say: 'Your turn. From a school, three trails lead directly to a lake. There are also two trails from the school to a lookout, and five trails from the lookout to the lake. How many routes go from the school to the lake? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, thirteen. Through the lookout, there are two times five, or ten routes. Directly, there are three. A route takes one way or the other, so add: three plus ten is thirteen. Choice B, thirty, multiplies all three numbers, as if a route used a direct trail and went through the lookout at once.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Stages that happen together ("and"): multiply.', 'Separate cases ("or"): count each case and add.', 'Split a count into cases when one choice changes the number of choices in another box.'] }],
      lines: [
        { say: 'Let’s sum up. Stages that happen together, joined by "and", multiply.', show: 'sum.0' },
        { say: 'Separate cases, joined by "or", are counted one at a time and added.', show: 'sum.1' },
        { say: 'And split a count into cases when one choice changes the number of choices in another box. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
