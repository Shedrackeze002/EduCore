import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-4, 5], y: [-5, 10], every: 0 });
const g2 = plane({ x: [-5, 4], y: [-4, 7], every: 0 });

const video: Explainer = {
  id: 'm201-8-1-b',
  lessonId: 'm201-8-1',
  title: 'Solving Systems Graphically, Part 2: Two Parabolas',
  thumbnailTitle: 'Systems of Two Parabolas',
  thumbnail: 'pp',
  summary: 'Solving y = x² − 4 and y = −x² + 2x + 8 by graphing and checking, why a point read from a graph is only an estimate, and predicting the number of solutions from vertices and directions of opening.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 8.1 · Part 2', title: 'Two Parabolas', subtitle: 'Read, check and predict' }],
      lines: [
        { say: 'Two parabolas can cross twice, touch once, never meet, or lie on top of each other.', show: 'title' },
        { say: 'In this video, you will solve a system of two quadratic equations by graphing, check the points, and predict the number of solutions before you solve.' },
      ],
    },
    {
      chapter: 'Two parabolas',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('pp', [
          g1,
          plot(g1, { id: 'f', f: (x) => x * x - 4, tone: 'brand' }),
          plot(g1, { id: 'g', f: (x) => -x * x + 2 * x + 8, tone: 'opp' }),
          dots(g1, [
            { id: 'A', x: -2, y: 0, tex: '', tone: 'good', group: 'meet' },
            { id: 'B', x: 3, y: 5, tex: '', tone: 'good', group: 'meet' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(-2, 0):\\quad 4 - 4 = 0', '\\phantom{(-2, 0):}\\quad {-4} - 4 + 8 = 0 \\;\\checkmark', '(3, 5):\\quad 9 - 4 = 5', '\\phantom{(3, 5):}\\quad {-9} + 6 + 8 = 5 \\;\\checkmark'] }],
      lines: [
        { say: 'Solve y equals x squared minus four, and y equals negative x squared, plus two x, plus eight, by graphing.', show: ['pp.grid', 'pp.axes', 'pp.f', 'pp.g'] },
        { say: 'The parabolas intersect at two points: negative two, zero, and three, five.', show: 'pp.meet', focus: 'pp.meet' },
        { say: 'Check negative two, zero in both equations. Four minus four is zero, and negative four, minus four, plus eight, is zero.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Check three, five. Nine minus four is five, and negative nine, plus six, plus eight, is five. Both points check.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Trusting an estimate',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Trusting an estimate', md: 'An intersection near $(1.4, 2.9)$ might look like $(1, 3)$ on a hand-drawn graph. A point read from a graph is only an estimate until it checks in **both** equations.' }],
      lines: [
        { say: 'Be careful with hand-drawn graphs. An intersection near 1.4, 2.9 might look like one, three.', show: 'oops' },
        { say: 'A point you read from a graph is only an estimate until it checks in both equations. Graphing technology, with its intersect feature, or algebra, gives accurate values.' },
      ],
    },
    {
      chapter: 'Predicting the number of solutions',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('pr', [
          g2,
          plot(g2, { id: 'up', f: (x) => (x - 1) ** 2 + 3, tone: 'brand' }),
          plot(g2, { id: 'down', f: (x) => -((x + 2) ** 2) + 1, tone: 'opp' }),
          dots(g2, [
            { id: 'V1', x: 1, y: 3, tex: '(1, 3)', tone: 'adj', place: 'below right' },
            { id: 'V2', x: -2, y: 1, tex: '(-2, 1)', tone: 'opp', place: 'above left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = (x - 1)^2 + 3:\\quad y \\ge 3', 'y = -(x + 2)^2 + 1:\\quad y \\le 1', '\\text{no solution}'] }],
      lines: [
        { say: 'A quick sketch from each graph’s key features often tells you how many solutions to expect. How many solutions does the system y equals x minus one, squared, plus three, and y equals negative, x plus two, squared, plus one, have?', show: ['pr.grid', 'pr.axes'] },
        { say: 'The first parabola opens up from one, three, so every point on it has y at least three.', show: ['pr.up', 'pr.V1', 'm.0'], focus: ['pr.V1', 'm.0'] },
        { say: 'The second opens down from negative two, one, so every point on it has y at most one.', show: ['pr.down', 'pr.V2', 'm.1'], focus: ['pr.V2', 'm.1'] },
        { say: 'So the graphs never meet: there is no solution.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Other patterns',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Same vertex, different $a$: **one** solution, the vertex.', 'Same $a$ and the same axis: vertical translations, **no** solution.', 'A non-horizontal line through the vertex: **two** solutions.', 'The same standard form: the same parabola, **infinitely many** solutions.'] }],
      lines: [
        { say: 'Some other patterns help. Two parabolas with the same vertex, but different values of "a", meet only at the vertex: one solution.', show: 'b.0' },
        { say: 'Two parabolas with the same "a" and the same axis are vertical translations of each other, so they never meet.', show: 'b.1' },
        { say: 'A line through the vertex of a parabola, that is not horizontal, crosses it twice.', show: 'b.2' },
        { say: 'And equations that expand to the same standard form describe the same parabola, with infinitely many solutions.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many solutions does the system $y = x^2 + 2$ and $y = x^2 - 3$ have?',
          choices: ['None', 'One', 'Two', 'Infinitely many'],
          answer: 0,
          working: 'Both parabolas have $a = 1$ and the axis $x = 0$: one is the other translated $5$ units down, so they never meet.',
        },
      ],
      lines: [
        { say: 'Your turn. How many solutions does the system y equals x squared plus two, and y equals x squared minus three, have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Both parabolas have "a" equal to one, and the same axis. One is the other translated five units down, so they never meet.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read the intersections, then check them in both equations.', 'Use vertices and directions of opening to predict the number of solutions.', 'Two parabolas: $0$, $1$, $2$ or infinitely many solutions.'] }],
      lines: [
        { say: 'Let’s sum up. Read the points of intersection from the graph, then check them in both equations.', show: 'sum.0' },
        { say: 'Use vertices and directions of opening to predict how many solutions to expect.', show: 'sum.1' },
        { say: 'And two parabolas can have zero, one, two or infinitely many solutions. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
