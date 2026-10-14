import type { Explainer } from '@/video/script.ts';
import { circleGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-9-1-d',
  lessonId: 'm204-9-1',
  title: 'Data Displays, Part 4: Making a Circle Graph',
  thumbnailTitle: 'Making a Circle Graph',
  thumbnail: 'pie',
  summary: 'Finding each slice angle with count ÷ total × 360°: car wash sales of 24, 18, 12 and 6 (total 60) give slices of 144°, 108°, 72° and 36°, which add to 360°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.1 · Part 4', title: 'Making a Circle Graph', subtitle: 'Slices of 360°' }],
      lines: [
        { say: 'To draw a circle graph by hand, or to check one, you need the angle of each slice.', show: 'title' },
        { say: 'In this video, you will find the slice angles for a circle graph.' },
      ],
    },
    {
      chapter: 'Slice angles',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{slice angle} = \\dfrac{\\text{count}}{\\text{total}} \\times 360^\\circ'] },
      ],
      lines: [
        { say: 'A full circle has 360 degrees. Each slice gets the same part of 360 degrees as its part of the data.', show: 'f', focus: 'f' },
        { say: 'So the slice angle is the count divided by the total, times 360 degrees. A slice with a quarter of the data gets a quarter of the circle: ninety degrees, a square corner.' },
      ],
    },
    {
      chapter: 'Car washes sold',
      layout: 'split',
      leftWidth: 640,
      left: [figure('pie', [circleGraph({ slices: [{ label: 'Basic', value: 24 }, { label: 'Deluxe', value: 18 }, { label: 'Premium', value: 12 }, { label: 'Interior', value: 6 }] })], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['24 + 18 + 12 + 6 = 60', '\\text{Basic: } \\dfrac{24}{60} \\times 360 = 144^\\circ', '\\text{Deluxe: } \\dfrac{18}{60} \\times 360 = 108^\\circ', '\\text{Premium: } 72^\\circ, \\;\\; \\text{Interior: } 36^\\circ', '144 + 108 + 72 + 36 = 360'] }],
      lines: [
        { say: 'A car wash sold 24 basic, eighteen deluxe, twelve premium and six interior washes. What angle should each slice have?', show: 'pie' },
        { say: 'First, the total: 24 plus eighteen plus twelve plus six is sixty washes.', show: 'm.0', focus: 'm.0' },
        { say: 'Basic: 24 out of sixty, times 360, is 144 degrees.', show: 'm.1', focus: ['pie.s0', 'm.1'] },
        { say: 'Deluxe: eighteen out of sixty, times 360, is 108 degrees.', show: 'm.2', focus: ['pie.s1', 'm.2'] },
        { say: 'In the same way, premium is 72 degrees, and interior is 36 degrees.', show: 'm.3', focus: ['pie.s2', 'pie.s3', 'm.3'] },
        { say: 'Check: 144 plus 108 plus 72 plus 36 is 360. All the angles add to a full circle.', show: 'm.4', focus: 'm.4' },
        { say: 'Here is a shortcut: 360 divided by sixty is six, so each wash is worth six degrees. Basic is 24 times six, which is 144 degrees, the same answer.' },
      ],
    },
    {
      chapter: 'Check the total',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using 100 instead of 360', md: 'Percents add to $100$, but **angles** add to $360^\\circ$. $\\tfrac{24}{60} \\times 100 = 40$ is the basic slice’s **percent**, not its angle.' }],
      lines: [
        { say: 'A common mistake is to use 100 instead of 360. Percents add to 100, but angles add to 360 degrees. 24 out of sixty, times 100, is forty. That is the basic slice’s percent, forty percent, not its angle. Forty percent of 360 degrees is 144 degrees.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a survey of $60$ people, $15$ chose hockey. What angle should the hockey slice have?',
          choices: ['$90^\\circ$', '$25^\\circ$', '$15^\\circ$', '$144^\\circ$'],
          answer: 0,
          working: '$\\tfrac{15}{60} \\times 360 = 90^\\circ$. B is the percent, $25\\%$, and C is the count.',
        },
      ],
      lines: [
        { say: 'Your turn. In a survey of sixty people, fifteen chose hockey. What angle should the hockey slice have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifteen out of sixty is a quarter, and a quarter of 360 is ninety degrees. B is the percent, 25 percent, not the angle, and C is the count.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Slice angle = count ÷ total × 360°.', 'All the angles add to 360°.', 'Percents add to 100; angles add to 360.'] }],
      lines: [
        { say: 'Let’s sum up. A slice angle is the count divided by the total, times 360 degrees.', show: 'sum.0' },
        { say: 'All the angles add to 360 degrees.', show: 'sum.1' },
        { say: 'And remember: percents add to 100, while angles add to 360. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
