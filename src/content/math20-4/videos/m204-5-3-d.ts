import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 8], y: [0, 250], xStep: 1, yStep: 25, every: 2, width: 7, height: 5, titles: { x: '\\text{time (h)}', y: '\\text{cost (\\$)}' } });

const video: Explainer = {
  id: 'm204-5-3-d',
  lessonId: 'm204-5-3',
  title: 'Tables and Graphs, Part 4: Matching a Rule to a Graph',
  thumbnailTitle: 'Matching a Rule',
  thumbnail: 'hg',
  summary: 'Matching the rule C = 50 + 25h for booking a hall to one of two lines by finding two points from the rule ((0, 50) and (4, 150)), and reading the start value and the rate from a graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.3 · Part 4', title: 'Matching a Rule to a Graph', subtitle: 'Two points are enough' }],
      lines: [
        { say: 'Two price plans can look alike on a graph. How do you know which line belongs to which rule?', show: 'title' },
        { say: 'In this video, you will match a rule to its graph, and read the start value and the rate from a line.' },
      ],
    },
    {
      chapter: 'Two points from the rule',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A community hall charges \\$50 plus \\$25 per hour: $C = 50 + 25h$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['h = 0\\text{: } C = 50 + 25 \\times 0 = 50', 'h = 4\\text{: } C = 50 + 25 \\times 4 = 150'] },
      ],
      lines: [
        { say: 'In this example, a community hall charges fifty dollars, plus 25 dollars per hour: C equals fifty plus 25 h. To check which graph shows a rule, find two points from the rule.', show: 'q' },
        { say: 'When h is zero, C is fifty plus 25 times zero: fifty. So the line must start at fifty.', show: 'm.0', focus: 'm.0' },
        { say: 'When h is four, C is fifty plus 25 times four: 150. So the line must pass through the point at four, 150.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Which line?',
      layout: 'split',
      leftWidth: 720,
      left: [
        figure('hg', [
          g,
          polyline(g, { id: 'a', points: [[0, 50], [6, 200], [8, 250]], tone: 'brand', labels: ['', '\\text{A}'], sides: ['right', 'right'] }),
          polyline(g, { id: 'b', points: [[0, 25], [3, 175], [4.5, 250]], tone: 'opp', labels: ['', '\\text{B}'] }),
          dots(g, [
            { id: 's', x: 0, y: 50, tex: '', tone: 'adj', group: 'pts' },
            { id: 'p4', x: 4, y: 150, tex: '(4,\\ 150)', tone: 'adj', place: 'below right', group: 'pts' },
          ]),
        ], 480),
      ],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'What the graph tells you', md: 'The **start value** is where the line meets the vertical axis. The **rate** is how much the line goes up for each step of $1$ to the right.' }],
      lines: [
        { say: 'Here are two lines, A and B. Which one shows the rule?', show: ['hg.grid', 'hg.axes', 'hg.a', 'hg.b'] },
        { say: 'Mark the two points from the rule: zero, fifty, and four, 150.', show: 'hg.pts', focus: 'hg.pts' },
        { say: 'Line A starts at fifty and goes through four, 150. Line B starts at 25, so it cannot be the rule. Line A shows the rule.', focus: 'hg.a' },
        { say: 'The graph tells you two things. The start value is where the line meets the vertical axis: fifty dollars. The rate is how much the line goes up for each step of one to the right. For line A, that is 25 dollars per hour.', show: 'tip' },
        { say: 'Also notice that line B is steeper. It rises faster, so its rate is bigger than 25 dollars per hour.', focus: 'hg.b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A line meets the vertical axis at $30$ and goes up $10$ for each hour to the right. Which rule does it show?',
          choices: ['$C = 30 + 10h$', '$C = 10 + 30h$', '$C = 40h$', '$C = 30h$'],
          answer: 0,
          working: 'The start value is $30$ and the rate is $10$ per hour, so $C = 30 + 10h$. B swaps the start value and the rate.',
        },
      ],
      lines: [
        { say: 'Your turn. A line meets the vertical axis at thirty, and goes up ten for each hour to the right. Which rule does it show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The start value is thirty, and the rate is ten per hour, so C equals thirty plus ten h. B swaps the start value and the rate. C and D start at zero, but this line starts at thirty.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find two points from the rule.', 'Look for the line through both.', 'Start value: where the line meets the vertical axis. Rate: the rise for each step of 1.'] }],
      lines: [
        { say: 'Let’s sum up. To match a rule to a graph, find two points from the rule.', show: 'sum.0' },
        { say: 'Then look for the line that goes through both.', show: 'sum.1' },
        { say: 'And read the start value where the line meets the vertical axis, and the rate from the rise for each step of one. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
