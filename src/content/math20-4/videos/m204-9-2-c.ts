import type { DiagramItem, Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A bar graph whose vertical axis starts at `min`, not 0: the trick that makes small changes look big. */
function cutBars(o: { categories: string[]; values: number[]; min: number; max: number; step: number }): Part {
  const H = 5;
  const k = H / (o.max - o.min);
  const W = 0.4 + o.categories.length * 1.4;
  const points: Record<string, P> = { o: [0, 0], xe: [W, 0], ye: [0, H + 0.3] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'xa', from: 'o', to: 'xe', weight: 2.5, group: 'scale' },
    { kind: 'line', id: 'ya', from: 'o', to: 'ye', weight: 2.5, group: 'scale' },
  ];
  for (let v = o.min; v <= o.max + 1e-9; v += o.step) {
    const id = `t${v}`;
    points[id] = [0, (v - o.min) * k];
    items.push({ kind: 'label', id: `n${v}`, at: id, tex: String(v), place: 'left', tone: 'muted', group: 'scale' });
  }
  o.values.forEach((v, i) => {
    const x0 = 0.4 + i * 1.4;
    const c: P[] = [[x0, 0], [x0 + 0.9, 0], [x0 + 0.9, (v - o.min) * k], [x0, (v - o.min) * k]];
    const ids = c.map((p, j) => {
      points[`b${i}-${j}`] = p;
      return `b${i}-${j}`;
    });
    points[`c${i}`] = [x0 + 0.45, 0];
    items.push(
      { kind: 'region', id: `b${i}-fill`, points: ids, tone: 'bad', shade: 0.5, group: `b${i}` },
      { kind: 'curve', id: `b${i}-edge`, points: ids, closed: true, tone: 'bad', group: `b${i}` },
      { kind: 'label', id: `c${i}-label`, at: `c${i}`, tex: `\\text{${o.categories[i]}}`, place: 'below', group: 'scale' },
    );
  });
  return { points, items };
}

const years = ['2021', '2022', '2023', '2024'];
const sold = [92, 96, 100, 106];

const video: Explainer = {
  id: 'm204-9-2-c',
  lessonId: 'm204-9-2',
  title: 'Analyzing Data, Part 3: Misleading Graphs',
  thumbnailTitle: 'Misleading Graphs',
  thumbnail: 'cut',
  summary: 'A car sales bar graph whose axis starts at 90 makes 2024 look 8 times as tall as 2021, while sales really grew from 92 to 106 cars (about 15%), the honest graph with the axis at 0, and other tricks: unequal intervals and picture sizes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.2 · Part 3', title: 'Misleading Graphs', subtitle: 'Check the scale' }],
      lines: [
        { say: 'A graph can tell the truth with every number, and still give the wrong idea. Ads do this all the time.', show: 'title' },
        { say: 'In this video, you will spot a misleading graph, and find the real change.' },
      ],
    },
    {
      chapter: 'A graph in an ad',
      layout: 'split',
      leftWidth: 620,
      left: [figure('cut', [cutBars({ categories: years, values: sold, min: 90, max: 110, step: 4 })], 420)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Misleading', md: 'A graph or claim is **misleading** when it gives the wrong idea, even if its numbers are true.' }],
      lines: [
        { say: 'A car dealership put this graph in an ad. It shows the cars sold each year.', show: ['cut.scale', 'cut.b0', 'cut.b1', 'cut.b2', 'cut.b3'] },
        { say: 'The bar for twenty twenty-four looks eight times as tall as the bar for twenty twenty-one. Sales must have exploded!', focus: ['cut.b0', 'cut.b3'] },
        { say: 'But look at the scale: it starts at 90, not zero. The bottom of every bar has been cut off. A graph like this is misleading: it gives the wrong idea, even though its numbers are true.', show: 'def' },
      ],
    },
    {
      chapter: 'The real change',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bg', [barGraph({ categories: years, values: sold, max: 120, step: 20, height: 4, titles: { y: 'Cars sold' } })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['106 - 92 = 14 \\text{ cars}', '14 \\div 92 \\times 100 \\approx 15\\%'] }],
      lines: [
        { say: 'How much did sales really grow? In twenty twenty-one, the dealership sold 92 cars, and in twenty twenty-four, 106 cars. The increase is fourteen cars.', show: 'm.0', focus: 'm.0' },
        { say: 'As a percent, fourteen divided by 92, times 100, is about fifteen percent. Sales grew by about fifteen percent, not eight times.', show: 'm.1', focus: 'm.1' },
        { say: 'Here is the same data with the axis starting at zero. Now the bars grow a little each year: the honest picture.', show: ['bg.scale', 'bg.b0', 'bg.b1', 'bg.b2', 'bg.b3', 'bg.v0', 'bg.v1', 'bg.v2', 'bg.v3'] },
      ],
    },
    {
      chapter: 'Other tricks',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Cut-off axis:** the scale does not start at $0$.', '**Unequal intervals:** years like 2000, 2010, 2020, 2022 spaced the same width apart.', '**Picture sizes:** a picture twice as tall **and** twice as wide looks $4$ times as big.'] }],
      lines: [
        { say: 'Watch for three tricks. A cut-off axis, where the scale does not start at zero.', show: 'b.0' },
        { say: 'Unequal intervals, where years like two thousand, twenty ten, twenty twenty and twenty twenty-two are spaced the same width apart, so a two-year change looks like a ten-year one.', show: 'b.1' },
        { say: 'And picture sizes: a picture twice as tall and twice as wide looks four times as big, even if the number only doubled.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A graph’s axis starts at $50$. The bars show $52$ and $60$, so the second bar looks $5$ times as tall. By about what percent did the value really grow?',
          choices: ['about $15\\%$', '$5$ times', '$8\\%$', '$500\\%$'],
          answer: 0,
          working: 'Increase: $60 - 52 = 8$. Percent: $8 \\div 52 \\times 100 \\approx 15\\%$. B and D believe the bars, and C forgets to divide by $52$.',
        },
      ],
      lines: [
        { say: 'Your turn. A graph’s axis starts at fifty. The bars show 52 and sixty, so the second bar looks five times as tall. By about what percent did the value really grow? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The increase is sixty minus 52, eight. Eight divided by 52, times 100, is about fifteen percent. B and D believe the bars, and C forgets to divide by 52.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Check that the axis starts at 0.', 'Check that the time gaps are equal.', 'Find the real change from the numbers.'] }],
      lines: [
        { say: 'Let’s sum up. Check that a graph’s axis starts at zero.', show: 'sum.0' },
        { say: 'Check that the time gaps are equal.', show: 'sum.1' },
        { say: 'And find the real change from the numbers, not from how the bars look. In part four, we spot misleading claims. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
