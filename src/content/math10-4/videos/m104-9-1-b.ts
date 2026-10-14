import type { Explainer } from '@/video/script.ts';
import { circleGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-9-1-b',
  lessonId: 'm104-9-1',
  title: 'Data and Graphs, Part 2: Circle Graphs and Fair Surveys',
  thumbnailTitle: 'Circle Graphs and Surveys',
  thumbnail: 'pie',
  summary: 'Reading a circle graph of a lunch vote (the parts add to 100%), fair and biased survey questions, a fair sample picked at random from the whole population, and choosing a bar, line or circle graph for the data.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 9.1 · Part 2', title: 'Circle Graphs and Surveys', subtitle: 'Parts of a whole, and fair questions' }],
      lines: [
        { say: 'How do people spend their pay? Which lunch do students like best? A survey collects the data, and a graph shows the answer.', show: 'title' },
        { say: 'In this video, you will read a circle graph, plan a fair survey, and choose the best graph for your data.' },
      ],
    },
    {
      chapter: 'Circle graphs',
      layout: 'split',
      leftWidth: 640,
      left: [figure('pie', [circleGraph({ slices: [{ label: 'Pizza', value: 35 }, { label: 'Burgers', value: 25 }, { label: 'Tacos', value: 20 }, { label: 'Salad', value: 10 }, { label: 'Soup', value: 10 }], percent: true })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Circle graph', md: 'Shows how **one whole** is split into parts. The whole circle is $100\\%$, and bigger slices are bigger parts.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['100\\% - 35\\% = 65\\%', '0.35 \\times 200 = 70'] },
      ],
      lines: [
        { say: 'A circle graph, or pie chart, shows how one whole is split into parts. The whole circle is 100 percent, and bigger slices are bigger parts.', show: 'def' },
        { say: 'Students at a school in Red Deer voted for their favourite lunch. Pizza got 35 percent, burgers 25, tacos twenty, and salad and soup ten percent each.', show: 'pie' },
        { say: 'What percent did not choose pizza? The whole circle is 100 percent, so 100 minus 35 is 65 percent.', show: 'm.0', focus: ['pie.s0', 'm.0'] },
        { say: 'If 200 students voted, the pizza slice is 35 percent of 200: 0.35 times 200, which is seventy students.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the total',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['35 + 25 + 20 + 10 + 10 = 100\\% \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the total', md: 'All the parts of a circle graph add to $100\\%$. If they do not, something is wrong.' },
      ],
      lines: [
        { say: 'All the parts of a circle graph add to 100 percent. Here, 35 plus 25 plus twenty plus ten plus ten is 100.', show: 'm.0', focus: 'm.0' },
        { say: 'If the parts do not add to 100, something is wrong: a slice is missing, or a number was misread.', show: 'tip' },
      ],
    },
    {
      chapter: 'Fair surveys',
      layout: 'split',
      leftWidth: 600,
      left: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Survey, population and sample', md: 'A **survey** asks people questions. The **population** is the whole group you want to learn about. The **sample** is the part you actually ask. A survey is **biased** if it pushes the results one way.' }],
      right: [{ kind: 'table', id: 't', head: ['Question', 'Fair?'], rows: [['Which snack would you like: fruit, chips or cookies?', '[[good:fair]]'], ['Don’t you agree chips are the best?', '[[bad:biased]]']] }],
      lines: [
        { say: 'A survey asks people questions to collect data. The population is the whole group you want to learn about, and the sample is the part of the population you actually ask.', show: 'def' },
        { say: 'A survey is biased if it pushes the results one way. A fair question does not push people toward an answer. Which snack would you like: fruit, chips or cookies? That is fair.', show: 't.0', focus: 't.0' },
        { say: 'Don’t you agree chips are the best? That question tells people what to think, so it is biased.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Fair samples',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['A fair sample gives **everyone** in the population the same chance to be picked.', 'Asking people at a hockey game about a new arena is **not** fair.'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Asking only people you know', md: 'Your friends often think like you. Pick people **at random** from the whole group instead.' },
      ],
      lines: [
        { say: 'A fair sample gives everyone in the population the same chance to be picked.', show: 'b.0' },
        { say: 'Suppose a town asks people at a hockey game if it needs a new arena. That is not fair: people at a hockey game probably like hockey more than most people do.', show: 'b.1', focus: 'b.1' },
        { say: 'Asking only your friends has the same problem, because your friends often think like you. Pick people at random from the whole group instead, for example by drawing names from a list.', show: 'oops' },
      ],
    },
    {
      chapter: 'Choosing a graph',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Graph', 'Best for', 'Example'], rows: [['Bar graph', 'comparing groups', 'votes for each pizza topping'], ['Line graph', 'change over time', 'the temperature every hour'], ['Circle graph', 'parts of one whole', 'how a paycheque is spent']] },
      ],
      lines: [
        { say: 'Choose the graph that fits the data. A bar graph compares groups, like the votes for each pizza topping.', show: 't.0', focus: 't.0' },
        { say: 'A line graph shows change over time, like the temperature every hour. And a circle graph shows the parts of one whole, like how a paycheque is spent.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Maya weighs her puppy every week for ten weeks. The same thing is measured again and again over time, so she should use a line graph.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A school asks whether to build a new sports field. Which sample is fair?',
          choices: ['$30$ students picked at random from the school list', 'the soccer team', 'your friends', 'fans at a soccer game'],
          answer: 0,
          working: 'Picking at random from the whole school gives every student the same chance to be asked.',
        },
      ],
      lines: [
        { say: 'Your turn. A school asks whether to build a new sports field. Which sample is fair? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Picking at random from the whole school list gives every student the same chance. The soccer team and the fans probably want the field more than most students do.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A circle graph shows parts of one whole; the parts add to $100\\%$.', 'A fair survey uses fair questions and a sample picked at random.', 'Bar: compare groups. Line: change over time. Circle: parts of a whole.'] }],
      lines: [
        { say: 'Let’s sum up. A circle graph shows the parts of one whole, and the parts add to 100 percent.', show: 'sum.0' },
        { say: 'A fair survey uses fair questions, and a sample picked at random.', show: 'sum.1' },
        { say: 'And a bar graph compares groups, a line graph shows change over time, and a circle graph shows parts of a whole. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
