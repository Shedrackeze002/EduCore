import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const job = plane({ x: [0, 8], y: [0, 600], xStep: 1, yStep: 100, width: 9, height: 6.5, titles: { x: '\\text{Time (h)}', y: '\\text{Cost (\\$)}' } });

const video: Explainer = {
  id: 'm10c-7-4-b',
  lessonId: 'm10c-7-4',
  title: 'Writing Equations, Part 2: Linear Models',
  thumbnailTitle: 'Linear Models',
  thumbnail: 'job',
  summary: 'A fixed amount plus a constant rate: building a linear model from two data points, reading the rate and the fixed amount, and using the model to predict and to solve.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.4 · Part 2', title: 'Linear Models', subtitle: 'A fixed amount plus a constant rate' }],
      lines: [
        { say: 'A taxi fare, a phone bill, a plumber’s charge: many real costs are a fixed amount, plus a constant rate.', show: 'title' },
        { say: 'In this video, you will write a linear model from two data points, and use it to predict and to solve.' },
      ],
    },
    {
      chapter: 'Rate and fixed amount',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{total} = (\\text{rate}) \\times (\\text{quantity}) + (\\text{fixed amount})', 'y = mx + b'] },
        { kind: 'text', id: 't', md: 'The **rate** is the slope, and the **fixed amount** is the vertical intercept.', size: 'md' },
      ],
      lines: [
        { say: 'Many situations have a fixed amount, plus a constant rate. The total is the rate, times the quantity, plus the fixed amount.', show: 'm.0', focus: 'm.0' },
        { say: 'That is y equals m x plus b. The rate is the slope, and the fixed amount is the vertical intercept.', show: ['m.1', 't'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'A plumber',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('job', [
          job,
          plot(job, { id: 'line', f: (h) => 65 * h + 60, from: 0, to: 8 }),
          dots(job, [
            { id: 'a', x: 2, y: 190, tex: '(2,\\,190)', place: 'below right', group: 'data' },
            { id: 'b', x: 5, y: 385, tex: '(5,\\,385)', place: 'below right', group: 'data' },
            { id: 'fee', x: 0, y: 60, tone: 'adj' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['m = \\dfrac{385 - 190}{5 - 2} = \\dfrac{195}{3} = 65', 'C - 190 = 65(h - 2)', 'C = 65h + 60'] }],
      lines: [
        { say: 'A plumber charges a call-out fee, plus an hourly rate. A two-hour job costs 190 dollars, and a five-hour job costs 385 dollars.', show: ['job.grid', 'job.axes', 'job.data'] },
        { say: 'So the points are two, 190, and five, 385. The rate is 385 minus 190, over five minus two: 195 over three, which is 65 dollars per hour.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute into slope-point form: C minus 190 equals 65, times h minus two. So C equals 65 h plus sixty.', show: ['m.1', 'm.2', 'job.line'], focus: ['m.2', 'job.line'] },
        { say: 'The vertical intercept, sixty, is the call-out fee: what the job costs before any time is worked.', show: 'job.fee', focus: 'job.fee' },
      ],
    },
    {
      chapter: 'Using the model',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['C = 65(7.5) + 60 = \\$547.50', '450 = 65h + 60', '390 = 65h, \\quad h = 6'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Interpret every number', md: 'In $C = 65h + 60$: \\$65 per hour is the rate (the slope), \\$60 is the fixed fee (the intercept), and $h \\ge 0$ (the domain).' },
      ],
      lines: [
        { say: 'Use the model to predict. A 7.5-hour job costs 65 times 7.5, plus sixty: 547 dollars and fifty cents.', show: 'm.0', focus: 'm.0' },
        { say: 'Or solve. For a bill of 450 dollars, 450 equals 65 h plus sixty. Subtract sixty: 390 equals 65 h, so the job took six hours.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Interpret every number. 65 dollars per hour is the rate, the slope. Sixty dollars is the fixed fee, the intercept. And the hours cannot be negative.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gym charges a joining fee plus a monthly fee. Three months cost \\$140 and seven months cost \\$260. What is the joining fee?',
          choices: ['\\$50', '\\$30', '\\$140', '\\$20'],
          answer: 0,
          working: 'Rate: $\\dfrac{260 - 140}{7 - 3} = 30$ dollars per month. Then $140 = 30(3) + b$, so $b = 50$.',
        },
      ],
      lines: [
        { say: 'Your turn. A gym charges a joining fee plus a monthly fee. Three months cost 140 dollars, and seven months cost 260 dollars. What is the joining fee? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The rate is 260 minus 140, over seven minus three: 120 over four, which is thirty dollars a month. Then 140 equals thirty times three, plus b, so b is fifty. B is the monthly rate.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Total = rate × quantity + fixed amount.', 'Two data points give the rate; then find the fixed amount.', 'Substitute into the model to predict or to solve.'] }],
      lines: [
        { say: 'Let’s sum up. A linear model is a total that equals a rate times a quantity, plus a fixed amount.', show: 'sum.0' },
        { say: 'Two data points give the rate, and then you can find the fixed amount.', show: 'sum.1' },
        { say: 'And substitute into the model to predict, or to solve. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
