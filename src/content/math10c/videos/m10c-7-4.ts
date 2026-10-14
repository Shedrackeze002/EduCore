import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const par = plane({ x: [-4, 8], y: [-8, 6], every: 2 });
const perp = plane({ x: [-6, 4], y: [-4, 8], every: 2 });

const video: Explainer = {
  id: 'm10c-7-4',
  lessonId: 'm10c-7-4',
  title: 'Writing Equations, Part 1: Parallel and Perpendicular Lines',
  thumbnailTitle: 'Parallel and Perpendicular Equations',
  thumbnail: 'par',
  summary: 'Writing the equation of a line through a point that is parallel or perpendicular to a given line: find the given slope, keep it or take its negative reciprocal, and substitute into slope-point form. Part 2 builds linear models.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.4 · Part 1', title: 'Parallel and Perpendicular Lines', subtitle: 'Writing their equations' }],
      lines: [
        { say: 'You can write the equation of a line from a graph, from a point and a slope, or from two points.', show: 'title' },
        { say: 'In this video, you will add one more case: a point, and a line that is parallel or perpendicular to the one you want. In part two, we build linear models.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Find the slope of the given line.', 'Keep it for a **parallel** line, or take the **negative reciprocal** for a perpendicular line.', 'Substitute the given point into slope-point form.'] }],
      lines: [
        { say: 'The plan is always the same. First, find the slope of the given line.', show: 'b.0' },
        { say: 'Second, keep that slope for a parallel line, or take its negative reciprocal for a perpendicular line.', show: 'b.1' },
        { say: 'Third, substitute the given point into slope-point form.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A parallel line',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('par', [
          par,
          plot(par, { id: 'given', f: (x) => 1.5 * x + 4, tone: 'adj' }),
          plot(par, { id: 'new', f: (x) => 1.5 * x - 7, tone: 'opp' }),
          dots(par, [{ id: 'P', x: 4, y: -1, tex: '(4,\\,{-1})', tone: 'opp', place: 'below right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{3x - 2y + 8 = 0}\\text{: } m = -\\dfrac{3}{-2} = \\dfrac32', 'y + 1 = \\tfrac32(x - 4)', 'y = \\tfrac32 x - 7', '3x - 2y - 14 = 0'] }],
      lines: [
        { say: 'Write the equation of the line through four, negative one, that is parallel to three x minus two y plus eight equals zero.', show: ['par.grid', 'par.axes', 'par.given', 'par.P'] },
        { say: 'First, the slope of the given line: negative "A" over B, which is negative three over negative two, or three halves.', show: 'm.0', focus: ['m.0', 'par.given'] },
        { say: 'A parallel line has the same slope. Substitute the point into slope-point form: y plus one equals three halves, times x minus four.', show: ['m.1', 'par.new'], focus: ['m.1', 'par.new'] },
        { say: 'That simplifies to y equals three halves x minus seven. In general form, multiply by two and move every term to the left: three x minus two y minus fourteen equals zero.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'A perpendicular line',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('perp', [
          perp,
          plot(perp, { id: 'given', f: (x) => 0.25 * x + 3, tone: 'adj' }),
          plot(perp, { id: 'new', f: (x) => -4 * x - 3, tone: 'opp' }),
          dots(perp, [{ id: 'P', x: -2, y: 5, tex: '(-2,\\,5)', tone: 'opp', place: 'left' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{y = \\tfrac14 x + 3}\\text{: } m = \\tfrac14', '\\text{perpendicular: } m = -4', 'y - 5 = -4(x + 2)', 'y = -4x - 3'] }],
      lines: [
        { say: 'Write the equation of the line through negative two, five, that is perpendicular to y equals one quarter x plus three.', show: ['perp.grid', 'perp.axes', 'perp.given', 'perp.P', 'm.0'] },
        { say: 'The given slope is one quarter. Flip it, and change the sign: the perpendicular slope is negative four.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute the point: y minus five equals negative four, times x plus two. So y equals negative four x minus three.', show: ['m.2', 'm.3', 'perp.new'], focus: ['m.3', 'perp.new'] },
      ],
    },
    {
      chapter: 'Two mistakes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'flip', tone: 'mistake', title: 'Negative and reciprocal', md: 'Perpendicular to $m = \\tfrac23$ is $-\\tfrac32$, not $-\\tfrac23$. The product of the slopes must be $-1$.' },
        { kind: 'callout', id: 'new', tone: 'mistake', title: 'Use the new point', md: 'Parallel to $y = 2x + 5$ through $(1, 4)$: keep the slope $2$, not the intercept $5$. Then $4 = 2(1) + b$, so $y = 2x + 2$.' },
      ],
      lines: [
        { say: 'Watch out for two mistakes. A perpendicular slope needs both steps: flip the fraction, and change the sign. Perpendicular to two thirds is negative three halves, not negative two thirds.', show: 'flip' },
        { say: 'And a parallel line keeps only the slope. Parallel to y equals two x plus five, through one, four, the slope stays two, but the intercept changes: four equals two times one plus b, so b is two.', show: 'new' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write the equation of the line through $(3, 1)$ that is parallel to $y = -2x + 5$.',
          choices: ['$y = -2x + 7$', '$y = -2x + 5$', '$y = \\tfrac12 x - \\tfrac12$', '$y = -2x - 5$'],
          answer: 0,
          working: 'Same slope, $-2$: $y - 1 = -2(x - 3)$, so $y = -2x + 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write the equation of the line through three, one, that is parallel to y equals negative two x plus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A parallel line keeps the slope, negative two. So y minus one equals negative two, times x minus three, and y equals negative two x plus seven. B is the given line itself, and C is perpendicular.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Parallel: the same slope. Perpendicular: the negative reciprocal.', 'Then substitute the given point into slope-point form.', 'Keep the slope, not the intercept, of the given line.'] }],
      lines: [
        { say: 'Let’s sum up. A parallel line has the same slope, and a perpendicular line has the negative reciprocal.', show: 'sum.0' },
        { say: 'Then substitute the given point into slope-point form.', show: 'sum.1' },
        { say: 'And keep only the slope of the given line, not its intercept. In part two, we use linear equations to model real situations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
