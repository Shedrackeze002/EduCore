import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-4, 5], y: [-6, 6], every: 2 });

const video: Explainer = {
  id: 'm10c-7-2-b',
  lessonId: 'm10c-7-2',
  title: 'Slope-Point Form, Part 2: Writing Equations',
  thumbnailTitle: 'Equations from Two Points',
  thumbnail: 'two',
  summary: 'Writing the equation of a line from a point and its slope, or from two points, in slope-point form, and converting it to slope-intercept form. Either point gives the same line.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.2 · Part 2', title: 'Writing Equations', subtitle: 'From a point and a slope, or from two points' }],
      lines: [
        { say: 'Slope-point form is the quickest way to write the equation of a line when you are not given the y intercept.', show: 'title' },
        { say: 'In this video, you will write equations from a point and a slope, and from two points, then change them to slope-intercept form.' },
      ],
    },
    {
      chapter: 'A point and the slope',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Write the equation of the line through $(2, -5)$ with slope $\\tfrac34$.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['y - (-5) = \\tfrac34(x - 2)', 'y + 5 = \\tfrac34(x - 2)', 'y + 5 = \\tfrac34 x - \\tfrac32', 'y = \\tfrac34 x - \\tfrac{13}{2}'] },
      ],
      lines: [
        { say: 'Write the equation of the line through two, negative five, with a slope of three quarters, in slope-point form and in slope-intercept form.', show: 'q' },
        { say: 'Substitute the slope and the point. y minus negative five is y plus five, so: y plus five equals three quarters, times x minus two. That is slope-point form.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'For slope-intercept form, expand the brackets. Three quarters times x is three quarters x, and three quarters times negative two is negative three halves.', show: 'm.2', focus: 'm.2' },
        { say: 'Then subtract five from both sides. Negative three halves minus five is negative thirteen halves, so y equals three quarters x minus thirteen halves.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two points',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('two', [
          g,
          plot(g, { id: 'line', f: (x) => -2 * x + 2 }),
          dots(g, [
            { id: 'A', x: -1, y: 4, tex: '(-1,\\,4)', tone: 'adj', place: 'left' },
            { id: 'B', x: 3, y: -4, tex: '(3,\\,{-4})', tone: 'opp', place: 'right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['m = \\dfrac{-4 - 4}{3 - (-1)} = \\dfrac{-8}{4} = -2', 'y - 4 = -2(x + 1)', 'y = -2x + 2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Either point works', md: 'Using $(3, -4)$ gives $y + 4 = -2(x - 3)$, which simplifies to the same $y = -2x + 2$.' },
      ],
      lines: [
        { say: 'Write the equation of the line through negative one, four, and three, negative four.', show: ['two.grid', 'two.axes', 'two.A', 'two.B'] },
        { say: 'First find the slope. Negative four minus four, over three minus negative one, is negative eight over four, which is negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'Then use either point, say negative one, four: y minus four equals negative two, times x plus one.', show: ['m.1', 'two.line'], focus: ['m.1', 'two.A'] },
        { say: 'Expand and solve for y: y minus four equals negative two x minus two, so y equals negative two x plus two.', show: 'm.2', focus: 'm.2' },
        { say: 'Using the other point gives y plus four equals negative two, times x minus three, which simplifies to the same line. Different slope-point equations can describe the same line.', show: 'tip', focus: 'two.B' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write the equation of the line through $(1, 3)$ and $(4, 9)$ in slope-intercept form.',
          choices: ['$y = 2x + 1$', '$y = 2x + 3$', '$y = \\tfrac12 x + \\tfrac52$', '$y = 2x - 1$'],
          answer: 0,
          working: '$m = \\dfrac{9 - 3}{4 - 1} = 2$. Then $y - 3 = 2(x - 1)$, so $y = 2x + 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write the equation of the line through one, three, and four, nine, in slope-intercept form. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The slope is nine minus three, over four minus one: six over three, which is two. Then y minus three equals two, times x minus one, so y equals two x plus one. B uses the point’s y value as b.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Substitute $m$ and $(x_1, y_1)$ into $y - y_1 = m(x - x_1)$.', 'From two points: find the slope first, then use either point.', 'Expand and isolate $y$ for slope-intercept form.'] }],
      lines: [
        { say: "Let's sum up. Substitute the slope and the point into y minus y one equals m, times x minus x one.", show: 'sum.0' },
        { say: 'From two points, find the slope first, then use either point.', show: 'sum.1' },
        { say: 'And expand and isolate y to get slope-intercept form. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
