import type { Explainer } from '@/video/script.ts';
import { plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-6, 6], y: [-6, 6], every: 2 });

const video: Explainer = {
  id: 'm10c-6-4',
  lessonId: 'm10c-6-4',
  title: 'Parallel and Perpendicular Lines, Part 1: Their Slopes',
  thumbnailTitle: 'Parallel and Perpendicular',
  thumbnail: 'perp',
  summary: 'Parallel lines have equal slopes, and perpendicular lines have negative reciprocal slopes whose product is −1, seen by turning a rise and run through 90°. Part 2 classifies pairs of lines and finds unknowns.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.4 · Part 1', title: 'Parallel and Perpendicular Lines', subtitle: 'What their slopes have in common' }],
      lines: [
        { say: 'Railway tracks never meet. The corner of a sheet of paper is a perfect right angle.', show: 'title' },
        { say: 'In this video, you will see how slope tells you when two lines are parallel, and when they are perpendicular. In part two, we classify pairs of lines.' },
      ],
    },
    {
      chapter: 'Parallel lines',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('par', [
          g,
          plot(g, { id: 'l1', f: (x) => (2 / 3) * x + 2, tone: 'adj' }),
          plot(g, { id: 'l2', f: (x) => (2 / 3) * x - 3, tone: 'opp' }),
          polyline(g, { id: 's1', points: [[0, 2], [3, 2], [3, 4]], tone: 'adj', labels: ['3', '2'], sides: ['right', 'right'], dashed: true }),
          polyline(g, { id: 's2', points: [[0, -3], [3, -3], [3, -1]], tone: 'opp', labels: ['3', '2'], sides: ['right', 'right'], dashed: true }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parallel lines', md: 'Non-vertical lines are **parallel** exactly when they have **equal slopes**. All vertical lines are parallel to each other.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['m_1 = m_2 = \\dfrac23'] },
      ],
      lines: [
        { say: 'Here are two lines. Each one rises two for every three to the right.', show: ['par.grid', 'par.axes', 'par.l1', 'par.l2', 'par.s1', 'par.s2'], focus: ['par.s1', 'par.s2'] },
        { say: 'Both slopes are two thirds. Lines with the same slope rise at the same rate, so the distance between them never changes. They are parallel.', show: 'm.0', focus: ['m.0', 'par.l1', 'par.l2'] },
        { say: 'Non-vertical lines are parallel exactly when their slopes are equal. And all vertical lines are parallel to each other.', show: 'def' },
      ],
    },
    {
      chapter: 'Perpendicular lines',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('perp', [
          g,
          plot(g, { id: 'l1', f: (x) => 2 + (2 / 3) * (x - 2), tone: 'adj' }),
          plot(g, { id: 'l2', f: (x) => 2 - 1.5 * (x - 2), tone: 'opp' }),
          polyline(g, { id: 's1', points: [[2, 2], [5, 2], [5, 4]], tone: 'adj', labels: ['3', '2'], sides: ['right', 'right'], dashed: true }),
          polyline(g, { id: 's2', points: [[2, 2], [2, 5], [0, 5]], tone: 'opp', labels: ['3', '2'], sides: ['right', 'right'], dashed: true }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\dfrac{2}{3}} \\;\\to\\; \\opp{\\dfrac{3}{-2}} = \\opp{-\\dfrac32}', '\\dfrac23 \\times \\left(-\\dfrac32\\right) = -1'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Perpendicular lines', md: 'Two lines, neither vertical, are **perpendicular** when their slopes are **negative reciprocals**: $m_1 \\times m_2 = -1$.' },
      ],
      lines: [
        { say: 'This line has a slope of two thirds: right three, up two.', show: ['perp.grid', 'perp.axes', 'perp.l1', 'perp.s1'], focus: ['perp.l1', 'perp.s1'] },
        { say: 'Now turn the whole step through ninety degrees. The run of three becomes a rise of three, and the rise of two becomes a run of two, to the left.', show: 'perp.s2', focus: 'perp.s2' },
        { say: 'So the turned line has a slope of three over negative two, which is negative three halves. The rise and run swap, and one sign changes.', show: ['perp.l2', 'm.0'], focus: ['perp.l2', 'm.0'] },
        { say: 'Multiply the two slopes: two thirds times negative three halves is negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'Two lines, neither vertical, are perpendicular when their slopes are negative reciprocals, which means their product is negative one. Also, a horizontal line and a vertical line are perpendicular.', show: 'def' },
      ],
    },
    {
      chapter: 'Finding the slopes',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A line has slope $-\\tfrac45$. Find the slope of a parallel line and of a perpendicular line.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{parallel: } {-\\dfrac45}', '\\text{perpendicular: } \\dfrac54', '-\\dfrac45 \\times \\dfrac54 = -1 \\ \\checkmark'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Flip and change the sign', md: 'The slope perpendicular to $3$ is $-\\tfrac13$: not $\\tfrac13$, and not $-3$.' },
      ],
      lines: [
        { say: 'A line has a slope of negative four fifths. Find the slope of a parallel line, and of a perpendicular line.', show: 'q' },
        { say: 'A parallel line has the same slope: negative four fifths.', show: 'm.0', focus: 'm.0' },
        { say: 'For a perpendicular line, flip the fraction and change the sign: five quarters.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: negative four fifths times five quarters is negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'Do both steps. The slope perpendicular to three is negative one third: not one third, and not negative three.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A line has slope $-\\tfrac27$. What is the slope of a line perpendicular to it?',
          choices: ['$\\dfrac72$', '$-\\dfrac72$', '$\\dfrac27$', '$-\\dfrac27$'],
          answer: 0,
          working: 'Flip $-\\dfrac27$ and change the sign: $\\dfrac72$. Check: $-\\dfrac27 \\times \\dfrac72 = -1$.',
        },
      ],
      lines: [
        { say: 'Your turn. A line has a slope of negative two sevenths. What is the slope of a line perpendicular to it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Flip the fraction, and change the sign: seven halves. B only flips it, C only changes the sign, and D is the slope of a parallel line.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Parallel lines have equal slopes.', 'Perpendicular lines have negative reciprocal slopes: $m_1 \\times m_2 = -1$.', 'A horizontal line and a vertical line are perpendicular.'] }],
      lines: [
        { say: "Let's sum up. Parallel lines have equal slopes.", show: 'sum.0' },
        { say: 'Perpendicular lines have negative reciprocal slopes, so the product of their slopes is negative one.', show: 'sum.1' },
        { say: 'And a horizontal line and a vertical line are perpendicular. In part two, we classify pairs of lines, and find unknowns. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
