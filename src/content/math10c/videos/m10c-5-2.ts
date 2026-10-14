import type { Explainer } from '@/video/script.ts';
import { arrowDiagram, dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-3, 3], y: [-1, 5] });

const video: Explainer = {
  id: 'm10c-5-2',
  lessonId: 'm10c-5-2',
  title: 'Relations, Part 1: Five Ways to Show a Relation',
  thumbnailTitle: 'Relations',
  thumbnail: 'arrows',
  summary: 'Sets, elements and relations, and one relation (a number and its square) shown five ways: in words, as ordered pairs, in a table, as an arrow diagram and as a graph. Part 2 covers independent and dependent variables.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 5.2 · Part 1', title: 'Relations', subtitle: 'Five ways to show a connection' }],
      lines: [
        { say: 'Is the capital of. Is taller than. Costs. Each of these phrases connects items from one set to items from another. In mathematics, a connection like this is called a relation.', show: 'title' },
        { say: 'In this video, you will learn the words for sets and relations, and five ways to show a relation. In part two, we look at independent and dependent variables.' },
      ],
    },
    {
      chapter: 'Sets and relations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'set', tone: 'definition', title: 'Set and element', md: 'A **set** is a collection of distinct objects, written in braces, such as $\\{2, 4, 6\\}$. Each object is an **element** of the set.' },
        { kind: 'callout', id: 'rel', tone: 'definition', title: 'Relation', md: 'A **relation** pairs elements of one set with elements of another. It can be written as a set of **ordered pairs**, (first, second).' },
      ],
      lines: [
        { say: 'A set is a collection of distinct objects, written in braces, like two, four, six. Each object is an element of the set.', show: 'set' },
        { say: 'A relation pairs elements of one set with elements of another. It can be written as a set of ordered pairs: first element, then second element.', show: 'rel' },
      ],
    },
    {
      chapter: 'Words, pairs and a table',
      layout: 'center',
      main: [
        { kind: 'text', id: 'w', md: '**Words:** each number from $-2$ to $2$ is paired with its square.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\{(-2, 4), (-1, 1), (0, 0), (1, 1), (2, 4)\\}'] },
        { kind: 'math', id: 't', lines: ['\\begin{array}{c|ccccc} x & -2 & -1 & 0 & 1 & 2 \\\\ \\hline y & 4 & 1 & 0 & 1 & 4 \\end{array}'] },
      ],
      lines: [
        { say: 'Take the relation: a number and its square, for the numbers from negative two to two. In words, each number is paired with its square.', show: 'w' },
        { say: 'As ordered pairs: negative two and four, negative one and one, zero and zero, one and one, and two and four.', show: 'm.0', focus: 'm.0' },
        { say: 'As a table of values, with x in the top row and y below.', show: 't.0', focus: 't.0' },
      ],
    },
    {
      chapter: 'An arrow diagram and a graph',
      layout: 'split',
      leftWidth: 560,
      left: [figure('arrows', [arrowDiagram({ left: ['-2', '-1', '0', '1', '2'], right: ['0', '1', '4'], pairs: [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]], titles: ['\\text{Number}', '\\text{Square}'] })])],
      right: [figure('g', [g, dots(g, [[-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4]].map(([x, y], i) => ({ id: `p${i}`, x, y, group: 'pts', place: x < 0 ? 'above left' : 'above right' })))])],
      lines: [
        { say: 'As an arrow diagram, each number points to its square.', show: ['arrows.left', 'arrows.right', 'arrows.arrows'] },
        { say: 'Two arrows can end at the same element: both negative two and two are paired with four.', focus: ['arrows.a0', 'arrows.a4'] },
        { say: 'And as a graph, plot each ordered pair as a point.', show: ['g.grid', 'g.axes', 'g.pts'], focus: 'g.pts' },
        { say: 'Words, ordered pairs, a table, an arrow diagram and a graph: five ways to show the same relation.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An arrow diagram has arrows $1 \\to 5$, $2 \\to 5$ and $3 \\to 7$. Which set of ordered pairs shows the same relation?',
          choices: ['$\\{(1, 5), (2, 5), (3, 7)\\}$', '$\\{(5, 1), (5, 2), (7, 3)\\}$', '$\\{(1, 2, 3), (5, 7)\\}$', '$\\{(1, 5), (2, 7)\\}$'],
          answer: 0,
          working: 'Each arrow becomes an ordered pair, from its start to its end.',
        },
      ],
      lines: [
        { say: 'Your turn. An arrow diagram has arrows from one to five, from two to five, and from three to seven. Which set of ordered pairs shows the same relation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Each arrow becomes an ordered pair, from the start of the arrow to its end. B reverses the arrows, and D leaves one out.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A relation pairs elements of two sets: ordered pairs are (first, second).', 'Show it in words, as ordered pairs, in a table, as an arrow diagram or as a graph.'] }],
      lines: [
        { say: "Let's sum up. A relation pairs elements of two sets, and each ordered pair lists the first element, then the second.", show: 'sum.0' },
        { say: 'You can show a relation in words, as ordered pairs, in a table, as an arrow diagram, or as a graph. In part two, we look at independent and dependent variables. See you there!', show: 'sum.1' },
      ],
    },
  ],
};

export default video;
