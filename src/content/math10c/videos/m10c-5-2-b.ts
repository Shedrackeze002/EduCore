import type { Explainer } from '@/video/script.ts';
import { arrowDiagram, dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const taxi = plane({ x: [0, 10], y: [0, 30], xStep: 1, yStep: 5, every: 2, width: 9, height: 6, titles: { x: '\\text{Distance (km)}', y: '\\text{Cost (\\$)}' } });

const video: Explainer = {
  id: 'm10c-5-2-b',
  lessonId: 'm10c-5-2',
  title: 'Relations, Part 2: Independent and Dependent Variables',
  thumbnailTitle: 'Independent and Dependent Variables',
  thumbnail: 'taxi',
  summary: 'Telling the independent variable (the input, on the horizontal axis) from the dependent variable (the output, on the vertical axis), writing ordered pairs in that order, and reading arrow diagrams in the right direction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 5.2 · Part 2', title: 'Independent and Dependent Variables', subtitle: 'Which one depends on which?' }],
      lines: [
        { say: 'The cost of a taxi ride depends on how far you go. Which quantity goes across the bottom of the graph, and which goes up the side?', show: 'title' },
        { say: 'In this video, you will tell independent and dependent variables apart, and put them in the right order.' },
      ],
    },
    {
      chapter: 'Which depends on which?',
      layout: 'split',
      leftWidth: 560,
      left: [figure('taxi', [taxi, polyline(taxi, { id: 'cost', points: [[0, 4], [10, 29]] }), dots(taxi, [{ id: 'p', x: 4, y: 14, tex: '(4,\\,14)', place: 'above left' }])])],
      right: [
        { kind: 'callout', id: 'ind', tone: 'definition', title: 'Independent variable', md: 'The **input**: the one you choose, or that changes on its own. It goes on the **horizontal** axis.' },
        { kind: 'callout', id: 'dep', tone: 'definition', title: 'Dependent variable', md: 'The **output**, which depends on the input. It goes on the **vertical** axis.' },
      ],
      lines: [
        { say: 'When one quantity depends on another, they have names. The independent variable is the input: the one you choose, or that changes on its own. It goes on the horizontal axis.', show: 'ind' },
        { say: 'The dependent variable is the output, which depends on the input. It goes on the vertical axis.', show: 'dep' },
        { say: 'The cost of a taxi ride depends on the distance travelled. So distance is the independent variable, across the bottom, and cost is the dependent variable, going up.', show: ['taxi.grid', 'taxi.axes', 'taxi.cost'], focus: 'taxi.axes' },
        { say: 'A quick test: say, the blank depends on the blank. The cost depends on the distance, so the first blank, cost, is the dependent variable.' },
      ],
    },
    {
      chapter: 'The order of a pair',
      layout: 'split',
      leftWidth: 560,
      left: [figure('taxi', [taxi, polyline(taxi, { id: 'cost', points: [[0, 4], [10, 29]] }), dots(taxi, [{ id: 'p', x: 4, y: 14, tex: '(4,\\,14)', place: 'above left' }])])],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(\\text{independent}, \\text{dependent})', '(\\text{distance}, \\text{cost}) = (4, 14)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not swap them', md: 'Ask which one depends on the other. The cost depends on the distance, not the other way round.' },
      ],
      lines: [
        { say: 'In each ordered pair, the independent variable comes first, and the dependent variable second.', show: ['taxi.grid', 'taxi.axes', 'taxi.cost', 'm.0'], focus: 'm.0' },
        { say: 'A four kilometre ride that costs fourteen dollars is the pair four, fourteen.', show: ['m.1', 'taxi.p'], focus: ['m.1', 'taxi.p'] },
        { say: 'Do not swap them. Ask which one depends on the other: the cost depends on the distance, not the other way round.', show: 'oops' },
      ],
    },
    {
      chapter: 'Arrows have a direction',
      layout: 'center',
      main: [
        figure('cap', [arrowDiagram({ left: ['\\text{Edmonton}', '\\text{Victoria}', '\\text{Regina}'], right: ['\\text{Alberta}', '\\text{B.C.}', '\\text{Sask.}'], pairs: [[0, 0], [1, 1], [2, 2]], titles: ['\\text{City}', '\\text{Province}'] })], 300),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reversing the arrows', md: 'For “is the capital of”, the arrows point **from** each city **to** its province. Read backwards, they say something different.' },
      ],
      lines: [
        { say: 'Arrows have a direction too. For the relation, is the capital of, the arrows point from each city to its province: Edmonton is the capital of Alberta.', show: ['cap.left', 'cap.right', 'cap.arrows'], focus: 'cap.a0' },
        { say: 'Read backwards, an arrow would say that Alberta is the capital of Edmonton: a different relation, and a false one. Check one arrow out loud, as a sentence, before you draw the rest.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The time it takes to fill a pool depends on how fast the water flows. Which is the independent variable?',
          choices: ['The flow rate', 'The time', 'The size of the pool', 'Neither'],
          answer: 0,
          working: 'The time depends on the flow rate, so the flow rate is the independent variable.',
        },
      ],
      lines: [
        { say: 'Your turn. The time it takes to fill a pool depends on how fast the water flows. Which is the independent variable? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The time depends on the flow rate, so the flow rate is the independent variable, and the time is the dependent variable.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['Independent variable: the input, on the horizontal axis.', 'Dependent variable: the output, on the vertical axis.', 'Ordered pairs are (independent, dependent); arrows point from first to second.'],
        },
      ],
      lines: [
        { say: "Let's sum up. The independent variable is the input, and goes on the horizontal axis.", show: 'sum.0' },
        { say: 'The dependent variable is the output, and goes on the vertical axis.', show: 'sum.1' },
        { say: 'Ordered pairs list the independent variable first, and arrows point from the first element to the second. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
