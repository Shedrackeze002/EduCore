import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const shop = () => barGraph({ categories: ['Cars', 'Pickups', 'SUVs', 'Vans', 'Semis'], values: [60, 85, 70, 25, 15], max: 100, step: 10, height: 4, titles: { x: 'Type of vehicle', y: 'Vehicles serviced' } });

const video: Explainer = {
  id: 'm203-8-1',
  lessonId: 'm203-8-1',
  title: 'Bar Graphs, Histograms and Circle Graphs, Part 1: Bar Graphs',
  thumbnailTitle: 'Reading Bar Graphs',
  thumbnail: 'bg',
  summary: 'Reading a bar graph of vehicles an auto shop serviced, values halfway between grid lines (85 pickups and 25 vans), totals and fractions from a bar graph, and checking the scale before reading a bar.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.1 · Part 1', title: 'Reading Bar Graphs', subtitle: 'Check the scale first' }],
      lines: [
        { say: 'A farm supply store tracks its seed sales, a towing company tracks its calls, and a sporting goods store tracks the ages of its customers. Graphs turn numbers like these into pictures you can read at a glance.', show: 'title' },
        { say: 'In this video, you will read a bar graph, compare its bars, and use them to find totals and fractions.' },
      ],
    },
    {
      chapter: 'Bar graphs',
      layout: 'split',
      leftWidth: 720,
      left: [figure('bg', [shop()], 480)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Bar graph', md: 'Compares **separate categories**. Read each bar’s height from the scale.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Pickups: } 85', '\\text{Vans: } 25', '85 - 25 = 60'] },
      ],
      lines: [
        { say: 'A bar graph compares amounts in separate categories. Each category gets its own bar, and the height of the bar is read from the scale on the vertical axis.', show: 'def' },
        { say: 'This bar graph shows the vehicles an auto shop in Red Deer serviced last month. The grid lines go up by ten.', show: ['bg.scale', 'bg.b0', 'bg.b1', 'bg.b2', 'bg.b3', 'bg.b4'], focus: 'bg.scale' },
        { say: 'How many more pickups than vans did the shop service? The Pickups bar stops halfway between eighty and ninety, so it shows 85.', show: ['bg.r1', 'm.0'], focus: ['bg.b1', 'm.0'] },
        { say: 'The Vans bar stops halfway between twenty and thirty, so it shows 25.', show: ['bg.r3', 'm.1'], focus: ['bg.b3', 'm.1'] },
        { say: 'Subtract: 85 minus 25 is sixty. The shop serviced sixty more pickups than vans.', show: ['bg.v1', 'bg.v3', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Totals and fractions',
      layout: 'split',
      leftWidth: 720,
      left: [figure('bt', [shop()], 480)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['60 + 85 + 70', '+\\ 25 + 15 = 255', '\\dfrac{85}{255} = \\dfrac{1}{3} \\approx 33.3\\%'] }],
      lines: [
        { say: 'A bar graph can also give a total. Read every bar: sixty cars, 85 pickups, seventy S U Vs, 25 vans and fifteen semis.', show: ['bt.scale', 'bt.b0', 'bt.b1', 'bt.b2', 'bt.b3', 'bt.b4', 'bt.v0', 'bt.v1', 'bt.v2', 'bt.v3', 'bt.v4'] },
        { say: 'Add them: the shop serviced 255 vehicles last month.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'What fraction of them were pickups? 85 out of 255 is one third, about 33.3 percent. So one vehicle in three was a pickup.', show: 'm.2', focus: ['bt.b1', 'm.2'] },
      ],
    },
    {
      chapter: 'Check the scale',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Misreading the scale', md: 'Check how much each grid line is worth before you read a bar. Here each line is worth $10$, not $1$, so the Vans bar is $25$, not $2.5$.' }],
      lines: [
        { say: 'A common mistake is to misread the scale. Check how much each grid line is worth before you read a bar.', show: 'oops' },
        { say: 'Here, each line is worth ten, not one. The Vans bar stops two and a half lines up, so it shows 25 vans, not 2.5.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a bar graph of seed sales, the grid lines go up by $50$. The Canola bar stops halfway between $300$ and $350$, and the Barley bar stops on $200$. How many more bags of canola than barley were sold?',
          choices: ['$125$', '$150$', '$100$', '$2.5$'],
          answer: 0,
          working: 'Halfway between $300$ and $350$ is $325$, and $325 - 200 = 125$. B reads the Canola bar as $350$, and C reads it as $300$.',
        },
      ],
      lines: [
        { say: 'Your turn. On a bar graph of seed sales, the grid lines go up by fifty. The Canola bar stops halfway between 300 and 350, and the Barley bar stops on 200. How many more bags of canola than barley were sold? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Halfway between 300 and 350 is 325, and 325 minus 200 is 125. B reads the Canola bar as 350, and C reads it as 300.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A bar graph compares separate categories.', 'Check what each grid line is worth first.', 'Add bars for a total; compare a bar with the total for a fraction.'] }],
      lines: [
        { say: 'Let’s sum up. A bar graph compares amounts in separate categories.', show: 'sum.0' },
        { say: 'Check what each grid line is worth before you read a bar.', show: 'sum.1' },
        { say: 'And add the bars for a total, or compare one bar with the total for a fraction. In part two, we read circle graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
