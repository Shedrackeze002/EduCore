import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-6, 6], y: [-6, 6], every: 2 });
const f = (x: number) => (x - 2) / 2;

const video: Explainer = {
  id: 'm10c-5-4-b',
  lessonId: 'm10c-5-4',
  title: 'Function Notation, Part 2: Finding Inputs and Reading Graphs',
  thumbnailTitle: 'Function Notation and Graphs',
  thumbnail: 'graph',
  summary: 'Solving for the input when the output is known, and using a graph both to evaluate a function and to solve it, without mixing up f(4) and f(x) = 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 5.4 · Part 2', title: 'Finding Inputs and Reading Graphs', subtitle: 'Working backwards' }],
      lines: [
        { say: 'Sometimes you know the output, and need the input. And sometimes all you have is a graph.', show: 'title' },
        { say: 'In this video, you will solve for an input, and use a graph both to evaluate a function and to solve it.' },
      ],
    },
    {
      chapter: 'Finding an input',
      layout: 'split',
      leftWidth: 540,
      left: [{ kind: 'math', id: 'g', size: 'md', align: 'left', lines: ['g(t) = 7 + t,\\quad g(t) = 15', '7 + t = 15', 't = 8'] }],
      right: [{ kind: 'math', id: 'h', size: 'md', align: 'left', lines: ['h(x) = 4x - 5,\\quad h(x) = 1', '4x - 5 = 1, \\text{ so } 4x = 6', 'x = \\tfrac32'] }],
      lines: [
        { say: 'If you know the output, set the function equal to it, and solve. For g of t equals seven plus t, find t so that g of t is fifteen.', show: 'g.0', focus: 'g.0' },
        { say: 'Seven plus t equals fifteen, so t is eight.', show: ['g.1', 'g.2'], focus: 'g.2' },
        { say: 'For h of x equals four x minus five, find x when h of x is one. Four x minus five equals one, so four x is six,', show: ['h.0', 'h.1'], focus: 'h.1' },
        { say: 'and x is three halves. An input does not have to be a whole number.', show: 'h.2', focus: 'h.2' },
      ],
    },
    {
      chapter: 'Using a graph',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('graph', [
          g,
          plot(g, { id: 'line', f, label: 'y = f(x)', labelAt: 0.9 }),
          polyline(g, { id: 'up', points: [[4, 0], [4, 1]], tone: 'theta', dashed: true }),
          polyline(g, { id: 'across', points: [[0, 1], [4, 1]], tone: 'opp', dashed: true }),
          polyline(g, { id: 'across2', points: [[0, -2], [-2, -2]], tone: 'opp', dashed: true }),
          dots(g, [
            { id: 'p', x: 4, y: 1, tex: '(4,\\,1)', place: 'right' },
            { id: 'q', x: -2, y: -2, tex: '(-2,\\,-2)', place: 'below left' },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'eval', tone: 'key', title: 'To find f(a)', md: 'Go to $x = a$, then up or down to the graph. Read the **height**.' },
        { kind: 'callout', id: 'solve', tone: 'key', title: 'To solve f(x) = k', md: 'Go to $y = k$, then across to the graph. Read the **x-value**.' },
      ],
      lines: [
        { say: 'This is the graph of y equals f of x. To find f of four, go along the x axis to four, then up to the graph, and read the height: one. So f of four is one.', show: ['graph.grid', 'graph.axes', 'graph.line', 'graph.up', 'graph.p', 'eval'], focus: ['graph.up', 'graph.p'] },
        { say: 'To solve f of x equals one, go to one on the y axis, then across to the graph, and read the x value: four.', show: ['graph.across', 'solve'], focus: ['graph.across', 'graph.p'] },
        { say: 'And to solve f of x equals negative two, go to negative two on the y axis, and across to the graph. The x value is negative two.', show: ['graph.across2', 'graph.q'], focus: ['graph.across2', 'graph.q'] },
      ],
    },
    {
      chapter: 'Which way?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['f(4)\\text{: the input is } 4. \\text{ Find the output.}', 'f(x) = 4\\text{: the output is } 4. \\text{ Find the input.}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not mix them up', md: 'On a graph, $f(4)$: go to $x = 4$. For $f(x) = 4$: go to $y = 4$.' },
      ],
      lines: [
        { say: 'Do not mix up the two questions. Find f of four gives you the input, four, and asks for the output.', show: 'm.0', focus: 'm.0' },
        { say: 'Find x when f of x equals four gives you the output, four, and asks for the input.', show: 'm.1', focus: 'm.1' },
        { say: 'On a graph, for f of four, go to x equals four. For f of x equals four, go to y equals four.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = 2x - 3$, find $x$ when $f(x) = 9$.',
          choices: ['$6$', '$15$', '$3$', '$4.5$'],
          answer: 0,
          working: '$2x - 3 = 9$, so $2x = 12$ and $x = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals two x minus three, find x when f of x is nine. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two x minus three equals nine, so two x is twelve, and x is six. B finds f of nine instead: the input and the output are swapped.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'sum', check: true, items: ['To find an input, set the function equal to the output, and solve.', 'On a graph, $f(a)$: go to $x = a$ and read the height. $f(x) = k$: go to $y = k$ and read $x$.'] },
      ],
      lines: [
        { say: "Let's sum up. To find an input, set the function equal to the output, and solve.", show: 'sum.0' },
        { say: 'On a graph, to evaluate, go to the x value and read the height. To solve, go to the y value and read across to x. Practise these skills in your lesson. See you next time!', show: 'sum.1' },
      ],
    },
  ],
};

export default video;
