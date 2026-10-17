import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, numbers, tag, vAsym } from './lib/m301-8-graphs.ts';

// Stretched upward, so the gentle crossing at x = 3 can be seen.
const g = plane({ x: [-7, 6], y: [-3, 2], yStep: 0.5, every: 0, width: 13, height: 10 });

const video: Explainer = {
  id: 'm301-8-3-d',
  lessonId: 'm301-8-3',
  title: 'Connecting Graphs and Rational Equations, Part 4: Sharing a Job',
  thumbnailTitle: 'Sharing a Job',
  thumbnail: 'job',
  summary: 'Modelling two people sharing a job with a rational equation, 1/t + 1/(t + 3) = 1/2, solving it, rejecting the negative root because a time cannot be negative, and checking the answer with the graph of the related function.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.3 · Part 4', title: 'Sharing a Job', subtitle: 'Rational equations in context' }],
      lines: [
        { say: 'Working alone, Jonah takes three hours longer than Maya to flood the outdoor rink. Together, they take two hours.', show: 'title' },
        { say: 'How long does Maya take alone? In this video, you will turn the problem into a rational equation, solve it, and reject roots that make no sense.' },
      ],
    },
    {
      chapter: 'Rates of work',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{Maya: } t \\text{ hours, so } \\dfrac{1}{t} \\text{ of the job each hour}',
            '\\text{Jonah: } t + 3 \\text{ hours, so } \\dfrac{1}{t + 3} \\text{ of the job each hour}',
            '\\text{together: } 2 \\text{ hours, so } \\dfrac{1}{2} \\text{ of the job each hour}',
            '\\dfrac{1}{t} + \\dfrac{1}{t + 3} = \\dfrac{1}{2}',
          ],
        },
      ],
      lines: [
        { say: 'Let t be Maya’s time alone, in hours. Jonah takes three hours longer, so Jonah’s time is t plus three.' },
        { say: 'Think about how much of the job gets done each hour. If a job takes four hours, you do one quarter of it each hour. In the same way, Maya does one over t of the job each hour.', show: 'm.0', focus: 'm.0' },
        { say: 'Jonah does one over t plus three of the job each hour.', show: 'm.1', focus: 'm.1' },
        { say: 'Together, they take two hours, so together they do one half of the job each hour.', show: 'm.2', focus: 'm.2' },
        { say: 'Working together, their rates add: one over t, plus one over t plus three, equals one half.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Solving',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            't \\ne 0,\\quad t \\ne -3 \\qquad \\text{LCD: } 2t(t + 3)',
            '2(t + 3) + 2t = t(t + 3)',
            '4t + 6 = t^2 + 3t',
            't^2 - t - 6 = 0',
            '(t - 3)(t + 2) = 0 \\quad\\to\\quad t = 3 \\text{ or } t = -2',
          ],
        },
      ],
      lines: [
        { say: 'The non-permissible values are t equals zero and t equals negative three. The LCD is two t, times t plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply every term by the LCD. The first term leaves two times t plus three. The second leaves two t. And the right side leaves t times t plus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand: four t plus six equals t squared plus three t.', show: 'm.2', focus: 'm.2' },
        { say: 'Move everything to the right side: t squared minus t minus six equals zero.', show: 'm.3', focus: 'm.3' },
        { say: 'Factor: t minus three, times t plus two, equals zero. So t is three, or t is negative two.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Rejecting roots in context',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            't = -2:\\ \\text{a time cannot be negative}',
            't = 3:\\quad \\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}\\ \\checkmark',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Rejecting roots in context', md: 'Besides non-permissible values, reject roots that make no sense in the situation: negative times, speeds below the speed of the current, negative resistances.' },
      ],
      lines: [
        { say: 'Negative two is permissible, but a time cannot be negative, so reject it too.', show: 'm.0', focus: 'm.0' },
        { say: 'Check t equals three. Maya does one third of the job each hour. Jonah takes six hours, so Jonah does one sixth. One third plus one sixth is two sixths plus one sixth: three sixths, which is one half. It works.', show: 'm.1', focus: 'm.1' },
        { say: 'So Maya takes three hours alone, and Jonah takes six.' },
        { say: 'Besides non-permissible values, always reject roots that make no sense in the situation: negative times, speeds below the speed of the current, or negative resistances.', show: 'tip' },
      ],
    },
    {
      chapter: 'Checking with a graph',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('job', [
          g,
          numbers(g, 2, 1),
          vAsym(g, 'va', -3),
          hAsym(g, 'ha', -0.5),
          tag(g, 'va-name', -3, 1.7, 'x = -3', 'left'),
          tag(g, 'ha-name', 6, -0.5, 'y = -\\tfrac{1}{2}', 'below left'),
          branches(g, { id: 'c', f: (x) => 1 / x + 1 / (x + 3) - 0.5, breaks: [-3, 0] }),
          dots(g, [
            { id: 'N', x: -2, y: 0, tex: '(-2, 0)', tone: 'bad', place: 'above right' },
            { id: 'S', x: 3, y: 0, tex: '(3, 0)', tone: 'good', place: 'above right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\dfrac{1}{x} + \\dfrac{1}{x + 3} - \\dfrac{1}{2}', 'x\\text{-intercepts: } {-2} \\text{ and } 3', '\\text{a time: } x = 3'] }],
      lines: [
        { say: 'A graph checks the algebra. Here is the related function: y equals one over x, plus one over x plus three, minus one half, with x standing for Maya’s time.', show: ['job.grid', 'job.axes', 'job.va', 'job.ha', 'job.va-name', 'job.ha-name', 'job.c', 'm.0'], focus: 'm.0' },
        { say: 'Its vertical asymptotes are x equals negative three and the y-axis, x equals zero, and it has three branches.' },
        { say: 'It crosses the x-axis at negative two and at three, the same two roots.', show: ['job.N', 'job.S', 'm.1'], focus: ['job.N', 'job.S', 'm.1'] },
        { say: 'Only the intercept at three makes sense as a time. So Maya takes three hours.', show: 'm.2', focus: ['job.S', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Working alone, Ava takes $8$ h longer than Ben to paint a fence. Together they take $3$ h. If Ben takes $t$ hours alone, which equation models the situation?',
          choices: ['$\\dfrac{1}{t} + \\dfrac{1}{t + 8} = 3$', '$t + (t + 8) = 3$', '$\\dfrac{1}{t} + \\dfrac{1}{t + 8} = \\dfrac{1}{3}$', '$\\dfrac{1}{t} + \\dfrac{1}{8} = \\dfrac{1}{3}$'],
          answer: 2,
          working: 'Ben does $\\dfrac{1}{t}$ of the job each hour, Ava $\\dfrac{1}{t + 8}$, and together $\\dfrac{1}{3}$. Solving gives $t^2 + 2t - 24 = 0$, so $t = 4$ (Ben takes $4$ h, Ava $12$ h); $t = -6$ is rejected.',
        },
      ],
      lines: [
        { say: 'Your turn. Working alone, Ava takes eight hours longer than Ben to paint a fence. Together, they take three hours. If Ben takes t hours alone, which equation models the situation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Ben does one over t of the job each hour, Ava does one over t plus eight, and together they do one third of the job each hour. Choice A sets the sum of the rates equal to the time, three, instead of the rate, one third. Solving C gives t equals four: Ben takes four hours, and Ava takes twelve.', show: 'q.answer' },
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
          items: [
            'A job that takes $t$ hours is done at $\\dfrac{1}{t}$ of the job each hour.',
            'Add the rates, then solve the rational equation.',
            'Reject non-permissible roots, and roots that make no sense in context.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A job that takes t hours is done at a rate of one over t of the job each hour.', show: 'sum.0' },
        { say: 'When people work together, add their rates, and solve the rational equation.', show: 'sum.1' },
        { say: 'Then reject any non-permissible roots, and any roots that make no sense in the situation. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
