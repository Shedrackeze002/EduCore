import type { DiagramItem, Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { plane } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** The dealership's bar graph, with its vertical axis starting at 90 so the bars are cut off. */
function cutOff(): Part[] {
  const g = plane({ name: 'c', x: [0, 4.4], y: [90, 110], xStep: 10, yStep: 2, every: 2, width: 5, height: 4.5, titles: { x: '\\text{year}', y: '\\text{pickups sold}' } });
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  [94, 96, 100, 106].forEach((v, i) => {
    const [x0, x1] = [0.5 + i, 1.1 + i];
    const ids = [`k${i}a`, `k${i}b`, `k${i}c`, `k${i}d`];
    [g.map(x0, 90), g.map(x1, 90), g.map(x1, v), g.map(x0, v)].forEach((p, j) => (points[ids[j]] = p));
    points[`k${i}y`] = g.map((x0 + x1) / 2, 90);
    points[`k${i}v`] = g.map((x0 + x1) / 2, v);
    items.push(
      { kind: 'region', id: `k${i}`, points: ids, tone: 'adj', shade: 0.6, group: `bar${i}` },
      { kind: 'curve', id: `k${i}e`, points: ids, closed: true, tone: 'adj', group: `bar${i}` },
      { kind: 'label', id: `k${i}l`, at: `k${i}y`, tex: `\\text{${2021 + i}}`, place: 'below', group: `bar${i}` },
      { kind: 'label', id: `k${i}n`, at: `k${i}v`, tex: String(v), place: 'above', group: `bar${i}` },
    );
  });
  points.k90 = g.map(0, 90);
  items.push({ kind: 'label', id: 'k90n', at: 'k90', tex: '90', tone: 'muted', place: 'left', group: 'c-axes' });
  return [g, { points, items }];
}

const video: Explainer = {
  id: 'm203-8-2-e',
  lessonId: 'm203-8-2',
  title: 'Line Graphs and Choosing a Graph, Part 5: Misleading Graphs',
  thumbnailTitle: 'Misleading Graphs',
  thumbnail: 'cut',
  summary: 'Two ways a graph with true numbers can mislead: a vertical axis that does not start at 0 (sales up 12.8%, not 4 times) and unevenly spaced years (a town that grew by 50 people every year), and the questions to ask of any graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.2 · Part 5', title: 'Misleading Graphs', subtitle: 'True numbers, wrong idea' }],
      lines: [
        { say: 'A graph can show true numbers, and still give the wrong idea. Ads, campaigns and news stories sometimes do it, on purpose or by accident.', show: 'title' },
        { say: 'In this video, you will spot two common tricks: a cut-off axis, and unevenly spaced times.' },
      ],
    },
    {
      chapter: 'A cut-off axis',
      layout: 'split',
      leftWidth: 700,
      left: [figure('cut', cutOff(), 460)],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The axis starts at 90', md: 'The bars are cut off at the bottom, so small differences look huge.' }],
      lines: [
        { say: 'A truck dealership in Red Deer made this graph of the pickups it sold. The bar for twenty twenty-four looks four times as tall as the bar for twenty twenty-one. What really happened?', show: ['cut.c-grid', 'cut.c-axes', 'cut.bar0', 'cut.bar1', 'cut.bar2', 'cut.bar3'], focus: ['cut.bar0', 'cut.bar3'] },
        { say: 'Look at the scale. The vertical axis starts at ninety, not zero, so the bars are cut off at the bottom, and small differences look huge.', show: 'oops', focus: 'cut.c-axes' },
      ],
    },
    {
      chapter: 'How big was the change?',
      layout: 'split',
      leftWidth: 640,
      left: [figure('fair', [barGraph({ categories: ['2021', '2022', '2023', '2024'], values: [94, 96, 100, 106], max: 120, step: 20, height: 4, titles: { y: 'Pickups sold' } })], 460)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['106 - 94 = 12 \\text{ pickups}', '\\dfrac{12}{94} \\times 100 \\approx 12.8\\%'] }],
      lines: [
        { say: 'Here are the same numbers, with the axis starting at zero. Now the bars look much closer: 94 pickups, then 96, 100 and 106.', show: ['fair.scale', 'fair.b0', 'fair.b1', 'fair.b2', 'fair.b3', 'fair.v0', 'fair.v1', 'fair.v2', 'fair.v3'] },
        { say: 'From twenty twenty-one to twenty twenty-four, sales went from 94 pickups to 106: an increase of twelve pickups.', show: 'm.0', focus: 'm.0' },
        { say: 'As a percent, that is twelve over 94, times 100: about 12.8 percent. Sales went up by about thirteen percent, not to four times as many.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Uneven years',
      layout: 'split',
      leftWidth: 640,
      left: [figure('pop', [barGraph({ categories: ['2000', '2010', '2020', '2022', '2024'], values: [2400, 2900, 3400, 3500, 3600], max: 4000, step: 500, height: 4, titles: { x: 'Year', y: 'Population' } })], 460)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2000 \\to 2010', '500 \\div 10 = 50 \\text{ a year}', '2020 \\to 2022', '100 \\div 2 = 50 \\text{ a year}'] }],
      lines: [
        { say: 'A town council made this bar graph of the town’s population. The bars climb steeply at first, then growth seems to slow down after twenty twenty. Is that true?', show: ['pop.scale', 'pop.b0', 'pop.b1', 'pop.b2', 'pop.b3', 'pop.b4', 'pop.v0', 'pop.v1', 'pop.v2', 'pop.v3', 'pop.v4'] },
        { say: 'From two thousand to twenty ten, the population went up by 500 in ten years: fifty people a year.', show: ['m.0', 'm.1'], focus: ['pop.b0', 'pop.b1', 'm.1'] },
        { say: 'From twenty twenty to twenty twenty-two, it went up by 100 in two years: also fifty people a year.', show: ['m.2', 'm.3'], focus: ['pop.b2', 'pop.b3', 'm.3'] },
        { say: 'The town grew by fifty people every year. The gaps of ten years and two years are drawn the same width, which makes the growth look slower.' },
      ],
    },
    {
      chapter: 'Questions to ask',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Check every graph', md: 'Does the vertical axis **start at 0**? Are the times on the horizontal axis **evenly spaced**? When in doubt, work out the real change from the numbers.' }],
      lines: [
        { say: 'So when you read a graph, ask two questions. Does the vertical axis start at zero? And are the times on the horizontal axis evenly spaced?', show: 'key' },
        { say: 'When in doubt, ignore the picture, and work out the real change from the numbers.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bar graph’s vertical axis starts at $200$. Its bars show $210$ and $230$, so the second bar looks $3$ times as tall. What was the real percent increase?',
          choices: ['about $9.5\\%$', '$200\\%$', '$300\\%$', '$20\\%$'],
          answer: 0,
          working: '$230 - 210 = 20$, and $\\dfrac{20}{210} \\times 100 \\approx 9.5\\%$. B trusts the cut-off bars, and D is the increase, not a percent.',
        },
      ],
      lines: [
        { say: 'Your turn. A bar graph’s vertical axis starts at 200. Its bars show 210 and 230, so the second bar looks three times as tall. What was the real percent increase? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The increase is twenty, and twenty over 210, times 100, is about 9.5 percent. B trusts the cut-off bars, and D is the increase, not a percent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A vertical axis that does not start at 0 makes small changes look huge.', 'Unevenly spaced times can hide a steady trend.', 'Work out the real change from the numbers.'] }],
      lines: [
        { say: 'Let’s sum up. A vertical axis that does not start at zero makes small changes look huge.', show: 'sum.0' },
        { say: 'Times that are not evenly spaced can hide a steady trend.', show: 'sum.1' },
        { say: 'And when in doubt, work out the real change from the numbers. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
