import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 8], y: [0, 20], xStep: 1, yStep: 2, width: 7, height: 5, titles: { x: '\\text{distance (km)}', y: '\\text{fare (\\$)}' } });

const video: Explainer = {
  id: 'm204-5-3-c',
  lessonId: 'm204-5-3',
  title: 'Tables and Graphs, Part 3: Rules with a Start Value',
  thumbnailTitle: 'A Start Value',
  thumbnail: 'tx',
  summary: 'A rule with a start value, like a taxi fare C = 4 + 2d, whose graph starts above zero at 4, reading a 6 km fare of 16 dollars from the graph and checking it with the rule, and why leaving out the start value gives too little.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.3 · Part 3', title: 'Rules with a Start Value', subtitle: 'A graph that starts above zero' }],
      lines: [
        { say: 'Some costs begin before you use anything. A taxi charges a fee the moment you get in. A gym charges a sign-up fee before your first visit.', show: 'title' },
        { say: 'In this video, you will graph a rule with a start value, and read it.' },
      ],
    },
    {
      chapter: 'A start value',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Start value', md: 'A **start value** is an amount you pay even before you use anything, like a taxi’s starting fee. Its graph starts **above** zero.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['C = 4 + 2d'] },
      ],
      lines: [
        { say: 'Some rules have a start value: an amount you pay even before you use anything, like a taxi’s starting fee.', show: 'def' },
        { say: 'In this example, a taxi charges four dollars to start, plus two dollars per kilometre: C equals four plus two d. Four is the start value, and two is the cost for each kilometre. The graph is still a straight line, because every kilometre adds the same two dollars.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'A taxi fare',
      layout: 'split',
      leftWidth: 720,
      left: [
        figure('tx', [
          g,
          polyline(g, { id: 'fare', points: [[0, 4], [8, 20]], tone: 'brand' }),
          dots(g, [{ id: 's', x: 0, y: 4, tex: '\\text{start fee}', tone: 'opp', place: 'right' }]),
          polyline(g, { id: 'up', points: [[6, 0], [6, 16], [0, 16]], tone: 'adj', dashed: true }),
          dots(g, [{ id: 'p6', x: 6, y: 16, tex: '(6,\\ 16)', tone: 'adj', place: 'below right' }]),
        ], 480),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C = 4 + 2 \\times 6', 'C = 4 + 12 = 16'] }],
      lines: [
        { say: 'Here is the graph of the taxi fare. Look where the line starts: at four on the vertical axis, not at zero. That is the start fee. Even a ride of zero kilometres costs four dollars.', show: ['tx.grid', 'tx.axes', 'tx.fare', 'tx.s'], focus: 'tx.s' },
        { say: 'What is the fare for six kilometres? Go up from six to the line, then across. The fare is sixteen dollars.', show: ['tx.up', 'tx.p6'], focus: 'tx.p6' },
        { say: 'Check with the rule: C equals four plus two times six.', show: 'm.0', focus: 'm.0' },
        { say: 'Two times six is twelve, and four plus twelve is sixteen. The graph and the rule agree.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Forgetting the start value',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the start value', md: '$2 \\times 6 = 12$ leaves out the \\$4 start fee. On the graph, the line meets the vertical axis at $4$, not at $0$.' }],
      lines: [
        { say: 'A common mistake is to forget the start value. Two times six is twelve, but that leaves out the four dollar start fee. On the graph, the line meets the vertical axis at four, not at zero, so every fare is four dollars more than two d.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A taxi charges $C = 5 + 3d$, where $C$ is in dollars and $d$ is in kilometres. What is the fare for $4$ km?',
          choices: ['\\$17', '\\$12', '\\$32', '\\$5'],
          answer: 0,
          working: '$C = 5 + 3 \\times 4 = 5 + 12 = 17$. B forgets the start value, C adds first, and D is only the start value.',
        },
      ],
      lines: [
        { say: 'Your turn. A taxi charges C equals five plus three d, where C is in dollars and d is in kilometres. What is the fare for four kilometres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three times four is twelve, and five plus twelve is seventeen dollars. B forgets the start value, C adds first, and D is only the start value.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A start value is paid before you use anything.', 'Its graph starts above zero, at the start value.', 'Add the start value to every reading.'] }],
      lines: [
        { say: 'Let’s sum up. A start value is an amount you pay before you use anything.', show: 'sum.0' },
        { say: 'Its graph starts above zero, at the start value on the vertical axis.', show: 'sum.1' },
        { say: 'And the start value is part of every fare. In part four, we match a rule to its graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
