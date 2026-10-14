import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 8], y: [0, 4.5], yStep: 0.5, every: 0, width: 8, height: 4.5, titles: { x: '\\text{path}', y: '\\text{Height}' } });

const video: Explainer = {
  id: 'm201-1-4-b',
  lessonId: 'm201-1-4',
  title: 'Geometric Series, Part 2: Last Terms, Salaries and Bounces',
  thumbnailTitle: 'Geometric Series Problems',
  thumbnail: 'ball',
  summary: 'Summing a geometric series from its last term, using rⁿ in the sum and rⁿ⁻¹ in the general term, a salary that rises 3% a year for 10 years, and the total distance travelled by a bouncing ball, where every bounce is travelled twice.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.4 · Part 2', title: 'Geometric Series Problems', subtitle: 'Last terms, salaries and bounces' }],
      lines: [
        { say: 'A geometric series appears whenever a total is built from amounts that grow or shrink by the same factor: salaries with a yearly raise, or the heights of a bouncing ball.', show: 'title' },
        { say: 'In this video, you will add a series from its last term, and solve problems with geometric series.' },
      ],
    },
    {
      chapter: 'From the last term',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['S_n = \\dfrac{rt_n - t_1}{r - 1} = \\dfrac{3(4374) - 2}{3 - 1} = \\dfrac{13\\,120}{2} = 6560', '\\text{check: } 4374 = 2(3)^7,\\ n = 8,\\ \\dfrac{2(3^8 - 1)}{2} = 6560'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the wrong power', md: 'The sum uses $r^n$, but the general term uses $r^{n-1}$. Mixing them up gives the sum of one term too few.' },
      ],
      lines: [
        { say: 'Find the sum of two plus six plus eighteen, and so on, up to 4,374. Here t sub one is two, r is three, and the last term is 4,374.' },
        { say: 'With the last term, you do not need n. S sub n is three times 4,374, minus two, over three minus one: 13,120 over two, which is 6,560.', show: 'm.0', focus: 'm.0' },
        { say: 'Check: 4,374 is two times three to the seventh, so it is the eighth term, and the first formula also gives 6,560.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch the powers. The sum uses r to the n, but the general term uses r to the n minus one. Mixing them up gives the sum of one term too few.', show: 'oops' },
      ],
    },
    {
      chapter: 'A salary with raises',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['t_1 = \\$50\\,000,\\quad r = 1.03,\\quad n = 10', 'S_{10} = \\dfrac{50\\,000(1.03^{10} - 1)}{1.03 - 1} \\approx \\$573\\,193.97'] }],
      lines: [
        { say: 'In this example, a geologist earns 50,000 dollars in the first year, and the salary rises by three percent each year. What is the total earned over ten years?', show: 'm.0', focus: 'm.0' },
        { say: 'Each year’s salary is 1.03 times the last, so the yearly salaries form a geometric sequence, and the total is a geometric series.' },
        { say: 'S sub ten is 50,000 times 1.03 to the tenth minus one, over 0.03. That is about 573,193 dollars and 97 cents. Keep every digit until the end, then round to the cent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A bouncing ball',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('ball', [
          g,
          polyline(g, { id: 'path', points: [[0, 4], [1, 0], [2, 3], [3, 0], [4, 2.25], [5, 0], [6, 1.6875], [7, 0]], tone: 'opp' }),
          dots(g, [
            { id: 'h0', x: 0, y: 4, tex: '4\\text{ m}', tone: 'opp', place: 'right' },
            { id: 'h1', x: 2, y: 3, tex: '3\\text{ m}', tone: 'adj', place: 'above' },
            { id: 'h2', x: 4, y: 2.25, tex: '2.25\\text{ m}', tone: 'adj', place: 'above' },
            { id: 'h3', x: 6, y: 1.6875, tex: '1.69\\text{ m}', tone: 'adj', place: 'above' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 + 2.25 + 1.6875 + 1.265625', 'S_4 = \\dfrac{3(1 - 0.75^4)}{1 - 0.75} = 8.203125', '4 + 2(8.203125) \\approx 20.4\\text{ m}'] }],
      lines: [
        { say: 'A ball is dropped from four metres, and rebounds to 75 percent of its height each time. How far has it travelled when it hits the ground for the fifth time?', show: ['ball.grid', 'ball.axes', 'ball.path', 'ball.h0'] },
        { say: 'Draw the path. The first drop, four metres, happens once. Before the fifth hit, there are four bounces: three, 2.25, 1.6875, and 1.265625 metres.', show: ['ball.h1', 'ball.h2', 'ball.h3', 'm.0'], focus: ['ball.h1', 'ball.h2', 'ball.h3'] },
        { say: 'Those four bounce heights are a geometric series with first term three and common ratio 0.75. Their sum is 8.203125 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'But each bounce goes up and comes back down, so it counts twice. Four plus two times 8.203125 is about 20.4 metres. Before hit number k, there are only k minus one bounces.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the sum of $1 + 2 + 4 + \\cdots + 512$.',
          choices: ['$1023$', '$1024$', '$511$', '$2047$'],
          answer: 0,
          working: '$S_n = \\dfrac{rt_n - t_1}{r - 1} = \\dfrac{2(512) - 1}{2 - 1} = 1023$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the sum of one plus two plus four, and so on, up to 512. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Use the last term: two times 512, minus one, over two minus one, which is 1,023. B forgets to subtract the first term.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['With the last term: $S_n = \\dfrac{rt_n - t_1}{r - 1}$, so you do not need $n$.', 'Growth or decay by $p\\%$ each period: $r = 1 \\pm \\frac{p}{100}$.', 'Bouncing ball: the first drop, plus twice the sum of the bounces.'] }],
      lines: [
        { say: 'Let’s sum up. With the last term, S sub n is r times t sub n, minus t sub one, over r minus one, so you do not need n.', show: 'sum.0' },
        { say: 'Growth or decay by a percent each period makes a geometric series. Round only at the end.', show: 'sum.1' },
        { say: 'And for a bouncing ball, add the first drop to twice the sum of the bounce heights. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
