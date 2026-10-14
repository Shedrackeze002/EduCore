import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-1, 11], y: [-1, 7], every: 2 });

const video: Explainer = {
  id: 'm10c-6-3',
  lessonId: 'm10c-6-3',
  title: 'Slope, Part 1: Rise over Run',
  thumbnailTitle: 'Slope: Rise over Run',
  thumbnail: 'rr',
  summary: 'Slope as rise over run from a graph, the slope formula for two points, keeping the subtraction in the same order, and why any two points on a line give the same slope. Part 2 covers the four kinds of slope, rates of change and drawing lines.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.3 · Part 1', title: 'Slope', subtitle: 'Rise over run' }],
      lines: [
        { say: 'Road signs warn drivers about steep hills, and roofers talk about the pitch of a roof. Both describe how steep something is.', show: 'title' },
        { say: 'In math, the steepness of a line is its slope. In this video, you will find slope from a graph and from two points. In part two, we use slope to describe and draw lines.' },
      ],
    },
    {
      chapter: 'Rise over run',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('rr', [
          g,
          plot(g, { id: 'line', f: (x) => 2 + 0.75 * (x - 4) }),
          polyline(g, { id: 'step', points: [[4, 2], [8, 2], [8, 5]], tone: 'opp', labels: ['\\text{run} = 4', '\\text{rise} = 3'], sides: ['right', 'right'], dashed: true }),
          dots(g, [
            { id: 'A', x: 4, y: 2, tex: 'A(4,\\,2)', place: 'above left' },
            { id: 'B', x: 8, y: 5, tex: 'B(8,\\,5)', place: 'above left' },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Slope', md: 'The **slope** $m$ of a line is $\\dfrac{\\text{rise}}{\\text{run}}$: the vertical change over the horizontal change.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['m = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{3}{4}'] },
      ],
      lines: [
        { say: 'The slope of a line, written m, is the rise over the run: the vertical change, over the horizontal change.', show: 'def' },
        { say: 'Here is a line through A, four, two, and B, eight, five.', show: ['rr.grid', 'rr.axes', 'rr.line', 'rr.A', 'rr.B'] },
        { say: 'To get from A to B, move four units to the right. That is the run.', show: 'rr.step-0', focus: 'rr.step-0' },
        { say: 'Then move three units up. That is the rise.', show: 'rr.step-1', focus: 'rr.step-1' },
        { say: 'So the slope is the rise over the run, three over four. Moving from left to right, a rise is positive going up, and negative going down.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The slope formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', lines: ['m = \\dfrac{y_2 - y_1}{x_2 - x_1}'] },
        { kind: 'math', id: 'm', lines: ['(-2,\\ 5) \\text{ and } (4,\\ {-7})', 'm = \\dfrac{-7 - 5}{4 - (-2)} = \\dfrac{-12}{6} = -2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keep the same order', md: 'Subtract in the same order on the top and the bottom. $\\dfrac{-7 - 5}{-2 - 4}$ mixes the order and gives the wrong sign.' },
      ],
      lines: [
        { say: 'You do not need a graph. The rise is the change in y, and the run is the change in x. So for two points, the slope is y two minus y one, over x two minus x one.', show: 'f.0', focus: 'f.0' },
        { say: 'Find the slope of the line through negative two, five, and four, negative seven.', show: 'm.0' },
        { say: 'On top, negative seven minus five is negative twelve. On the bottom, four minus negative two is six. Negative twelve over six is negative two.', show: 'm.1', focus: 'm.1' },
        { say: 'Be careful to subtract in the same order on the top and the bottom. Negative seven minus five, over negative two minus four, mixes the order, and gives the wrong sign.', show: 'oops' },
      ],
    },
    {
      chapter: 'Any two points',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('sim', [
          g,
          plot(g, { id: 'line', f: (x) => 0.5 * x + 1 }),
          polyline(g, { id: 'small', points: [[2, 2], [4, 2], [4, 3]], tone: 'adj', labels: ['2', '1'], sides: ['right', 'right'], dashed: true }),
          polyline(g, { id: 'big', points: [[4, 3], [8, 3], [8, 5]], tone: 'opp', labels: ['4', '2'], sides: ['right', 'right'], dashed: true }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\dfrac{1}{2}} = \\opp{\\dfrac{2}{4}} = \\dfrac{1}{2}', '\\text{similar triangles}'] }],
      lines: [
        { say: 'Does it matter which two points you pick? Here is a line, with two different steps drawn under it.', show: ['sim.grid', 'sim.axes', 'sim.line'] },
        { say: 'The small step has a run of two and a rise of one.', show: 'sim.small', focus: 'sim.small' },
        { say: 'The big step has a run of four and a rise of two. One over two and two over four are the same slope, one half.', show: ['sim.big', 'm.0'], focus: ['sim.big', 'm.0'] },
        { say: 'The two triangles are similar, so the ratio of rise to run is always the same. Any two points on a line give the same slope.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the slope of the line through $(-1, 4)$ and $(3, -4)$.',
          choices: ['$-2$', '$2$', '$-\\dfrac12$', '$0$'],
          answer: 0,
          working: '$m = \\dfrac{-4 - 4}{3 - (-1)} = \\dfrac{-8}{4} = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the slope of the line through negative one, four, and three, negative four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Negative four minus four is negative eight, and three minus negative one is four. Negative eight over four is negative two. C turned the fraction upside down: run over rise.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$m = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{y_2 - y_1}{x_2 - x_1}$', 'Subtract in the same order on the top and the bottom.', 'Any two points on a line give the same slope.'] }],
      lines: [
        { say: "Let's sum up. Slope is the rise over the run, or y two minus y one, over x two minus x one.", show: 'sum.0' },
        { say: 'Subtract in the same order on the top and the bottom.', show: 'sum.1' },
        { say: 'And any two points on a line give the same slope. In part two, we look at the four kinds of slope, and use slope to draw lines. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
