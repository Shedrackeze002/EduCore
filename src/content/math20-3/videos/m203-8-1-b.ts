import type { Explainer } from '@/video/script.ts';
import { circleGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-8-1-b',
  lessonId: 'm203-8-1',
  title: 'Bar Graphs, Histograms and Circle Graphs, Part 2: Circle Graphs',
  thumbnailTitle: 'Reading Circle Graphs',
  thumbnail: 'pie',
  summary: 'What a circle graph and its sectors are, turning a percent into an amount (25% of 400 workers carpool: 100), finding a sector’s angle as a percent of 360° (the Bus sector is 54°), and checking that the angles add to 360°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.1 · Part 2', title: 'Circle Graphs', subtitle: 'Parts of one whole' }],
      lines: [
        { say: 'A circle graph shows at a glance how one whole is shared out: a budget, a survey, or how people get to work.', show: 'title' },
        { say: 'In this video, you will turn the percents on a circle graph into amounts, and into the angles of its sectors.' },
      ],
    },
    {
      chapter: 'Circle graphs',
      layout: 'split',
      leftWidth: 720,
      left: [figure('pie', [circleGraph({ slices: [{ label: 'Drive alone', value: 45 }, { label: 'Walk', value: 5 }, { label: 'Carpool', value: 25 }, { label: 'Bike', value: 10 }, { label: 'Bus', value: 15 }], percent: true })], 400)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Circle graph', md: 'Shows how **one whole** is split into parts. Each part is a **sector**, and the percents of all the sectors add to $100\\%$.' }],
      lines: [
        { say: 'A circle graph shows how one whole is split into parts. Each part is a sector of the circle, and the percents of all the sectors add to 100 percent.', show: 'def' },
        { say: 'A gas plant near Fort Saskatchewan asked its 400 workers how they get to work. Driving alone is the biggest sector, at 45 percent.', show: 'pie', focus: 'pie.s0' },
        { say: 'Then carpooling at 25 percent, the bus at fifteen, biking at ten, and walking at five. Together, they make 100 percent.', focus: ['pie.s2', 'pie.s4', 'pie.s3', 'pie.s1'] },
      ],
    },
    {
      chapter: 'From a percent to an amount',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Carpool: $25\\%$ of the $400$ workers.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['25\\% = 0.25', '0.25 \\times 400 = 100 \\text{ workers}'] },
      ],
      lines: [
        { say: 'How many workers carpool? Carpooling is 25 percent of the 400 workers.', show: 'q' },
        { say: 'Change the percent to a decimal: 25 percent is 0.25.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply by the total: 0.25 times 400 is 100. So 100 workers carpool.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The angle of a sector',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Sector angles', md: 'A full circle is $360^\\circ$. Each sector gets the same percent of $360^\\circ$ as its category has of the whole.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Bus: } 0.15 \\times 360 = 54^\\circ', '\\text{Drive alone: } 0.45 \\times 360 = 162^\\circ'] },
      ],
      lines: [
        { say: 'To draw a circle graph, you split the 360 degrees around the centre. Each sector gets the same percent of 360 degrees as its category has of the whole.', show: 'key' },
        { say: 'What is the angle of the Bus sector? Bus is fifteen percent, and 0.15 times 360 is 54. So the Bus sector has an angle of 54 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'The Drive alone sector is 0.45 times 360: 162 degrees, a little less than half the circle.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Checking the angles',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Way to work', 'Percent', 'Angle'], rows: [['Drive alone', '$45\\%$', '$162^\\circ$'], ['Carpool', '$25\\%$', '$90^\\circ$'], ['Bus', '$15\\%$', '$54^\\circ$'], ['Bike', '$10\\%$', '$36^\\circ$'], ['Walk', '$5\\%$', '$18^\\circ$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['162 + 90 + 54 + 36 + 18 = 360^\\circ'] },
      ],
      lines: [
        { say: 'Work out every sector the same way. Carpooling, at 25 percent, is a quarter of the circle: ninety degrees.', show: 't', focus: 't.1' },
        { say: 'Biking is 36 degrees, and walking is eighteen.', focus: ['t.3', 't.4'] },
        { say: 'Check: the angles add to 360 degrees, the whole circle. If they do not, look for a mistake before you draw.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A circle graph shows how $600$ students get to school, and the Bus sector is $30\\%$. How many students take the bus, and what is the angle of the Bus sector?',
          choices: ['$180$ students, $108^\\circ$', '$180$ students, $30^\\circ$', '$200$ students, $108^\\circ$', '$18$ students, $10.8^\\circ$'],
          answer: 0,
          working: '$0.30 \\times 600 = 180$ students, and $0.30 \\times 360 = 108^\\circ$. B uses the percent as the angle.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle graph shows how 600 students get to school, and the Bus sector is thirty percent. How many students take the bus, and what is the angle of the Bus sector? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 0.30 times 600 is 180 students, and 0.30 times 360 is 108 degrees. B uses the percent as the angle.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A circle graph shows parts of one whole; the percents add to $100\\%$.', 'Amount = percent × total.', 'Sector angle = percent × $360^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. A circle graph shows the parts of one whole, and its percents add to 100 percent.', show: 'sum.0' },
        { say: 'An amount is the percent, as a decimal, times the total.', show: 'sum.1' },
        { say: 'And a sector’s angle is the percent times 360 degrees. In part three, we build a circle graph from counts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
