import type { Explainer } from '@/video/script.ts';
import { circleGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-8-1-c',
  lessonId: 'm203-8-1',
  title: 'Bar Graphs, Histograms and Circle Graphs, Part 3: From Counts to a Circle Graph',
  thumbnailTitle: 'From Counts to a Circle Graph',
  thumbnail: 'pie',
  summary: 'Finding a percent and a sector angle from counts (28 of 80 towing calls is 35% and 126°), building a whole circle graph from a table of counts, checking that the angles add to 360°, and dividing by the whole total.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.1 · Part 3', title: 'From Counts to a Circle Graph', subtitle: 'Part over total' }],
      lines: [
        { say: 'Data often starts as counts, not percents. To draw a circle graph, you first turn each count into a percent, and an angle.', show: 'title' },
        { say: 'In this video, you will find percents and sector angles from counts, and build a whole circle graph.' },
      ],
    },
    {
      chapter: 'Part over total',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['\\text{percent} = \\dfrac{\\text{part}}{\\text{total}} \\times 100', '\\text{angle} = \\dfrac{\\text{part}}{\\text{total}} \\times 360^\\circ'] }],
      lines: [
        { say: 'When you start from counts, compare the part with the total. The percent is the part over the total, times 100.', show: 'f.0', focus: 'f.0' },
        { say: 'And the sector angle is the part over the total, times 360 degrees.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'Dead batteries',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A towing company answered $80$ calls, and $28$ were for dead batteries.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{28}{80} \\times 100 = 0.35 \\times 100 = 35\\%', '0.35 \\times 360 = 126^\\circ'] },
      ],
      lines: [
        { say: 'A towing company answered eighty calls, and 28 were for dead batteries. What percent of the calls were for dead batteries?', show: 'q' },
        { say: '28 over eighty is 0.35, and times 100, that is 35 percent.', show: 'm.0', focus: 'm.0' },
        { say: 'On a circle graph, its sector would be 0.35 times 360: 126 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'All the calls',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Call', 'Count', 'Percent', 'Angle'], rows: [['Dead battery', '$28$', '$35\\%$', '$126^\\circ$'], ['Flat tire', '$20$', '$25\\%$', '$90^\\circ$'], ['Collision', '$16$', '$20\\%$', '$72^\\circ$'], ['Lockout', '$12$', '$15\\%$', '$54^\\circ$'], ['Other', '$4$', '$5\\%$', '$18^\\circ$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['28 + 20 + 16 + 12 + 4 = 80', '126 + 90 + 72 + 54 + 18 = 360^\\circ'] },
      ],
      lines: [
        { say: 'In this example, here are all eighty calls. Each count becomes a percent and an angle in the same way.', show: 't', focus: 't.0' },
        { say: 'Twenty flat tires is twenty over eighty: 25 percent, and ninety degrees.', focus: 't.1' },
        { say: 'Sixteen collisions is twenty percent, or 72 degrees. Twelve lockouts is fifteen percent, 54 degrees. And four other calls is five percent, eighteen degrees.', focus: ['t.2', 't.3', 't.4'] },
        { say: 'Check both columns: the counts add to eighty, and the angles add to 360 degrees.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'The circle graph',
      layout: 'split',
      leftWidth: 720,
      left: [figure('pie', [circleGraph({ slices: [{ label: 'Dead battery', value: 35 }, { label: 'Flat tire', value: 25 }, { label: 'Collision', value: 20 }, { label: 'Lockout', value: 15 }, { label: 'Other', value: 5 }], percent: true })], 400)],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Drawing it', md: 'Draw a radius, then use a protractor to mark each angle from the last line. Label every sector with its name and percent.' }],
      lines: [
        { say: 'To draw the graph, draw one radius, then use a protractor to mark each angle, starting from the last line you drew.', show: 'tip' },
        { say: 'Here is the result. The dead battery sector, 126 degrees, is just over a third of the circle, and the flat tire sector is a quarter.', show: 'pie', focus: ['pie.s0', 'pie.s1'] },
        { say: 'Label every sector with its name and percent, so the graph can be read without the table.' },
      ],
    },
    {
      chapter: 'The whole total',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the wrong total', md: 'Divide by the total of **all** the data, here $80$ calls. Dividing $28$ by the other $52$ calls gives about $53.8\\%$, which is far too big.' }],
      lines: [
        { say: 'A common mistake is to divide by the wrong total. Divide by the total of all the data, here all eighty calls. Dividing 28 by the other 52 calls gives about 53.8 percent, which is far too big.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A farm supply store sold $120$ bags of seed, and $45$ were canola. What angle would the Canola sector have on a circle graph?',
          choices: ['$135^\\circ$', '$37.5^\\circ$', '$45^\\circ$', '$225^\\circ$'],
          answer: 0,
          working: '$\\dfrac{45}{120} = 0.375$, and $0.375 \\times 360 = 135^\\circ$. B is the percent, not the angle, and D is the angle for the other bags.',
        },
      ],
      lines: [
        { say: 'Your turn. A farm supply store sold 120 bags of seed, and 45 were canola. What angle would the Canola sector have on a circle graph? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 45 over 120 is 0.375, and 0.375 times 360 is 135 degrees. B is the percent, not the angle, and D is the angle for all the other bags.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent = part ÷ total × 100.', 'Angle = part ÷ total × 360°.', 'Check that the angles add to 360°.'] }],
      lines: [
        { say: 'Let’s sum up. From counts, the percent is the part over the total, times 100.', show: 'sum.0' },
        { say: 'The angle is the part over the total, times 360 degrees.', show: 'sum.1' },
        { say: 'And check that the angles add to 360 degrees before you draw. In part four, we read histograms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
