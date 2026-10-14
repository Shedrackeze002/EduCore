import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm203-1-1-c',
  lessonId: 'm203-1-1',
  title: 'Slope, Part 3: Percent Grade',
  thumbnailTitle: 'Percent Grade',
  thumbnail: 'hw',
  summary: 'Writing a slope as a percent grade (a highway that climbs 42 m over 700 m has a 6% grade), working backwards from an 8% grade to a 200 m drop, and why a 100% grade is a 45° slope, not a vertical wall.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.1 · Part 3', title: 'Percent Grade', subtitle: 'Slope on road signs' }],
      lines: [
        { say: 'A yellow sign on a mountain highway shows a truck on a slope, and a number like eight percent. That number is a slope, written as a percent.', show: 'title' },
        { say: 'In this video, you will find the grade of a road, and work backwards from a grade to a distance.' },
      ],
    },
    {
      chapter: 'Grade',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent grade', md: 'The **grade** of a road or path is its slope written as a percent.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{grade} = \\dfrac{\\text{rise}}{\\text{run}} \\times 100\\%'] },
      ],
      lines: [
        { say: 'Road signs and trail maps give slope as a percent, called the grade.', show: 'def' },
        { say: 'To find the grade, find the slope, rise over run, and multiply by 100 percent.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A highway grade',
      layout: 'split',
      leftWidth: 620,
      left: [figure('hw', [triangle({ A: [12, 0], B: [0, 0], C: [0, 0.72], right: 'B', sides: { AB: '700\\text{ m}', BC: '42\\text{ m}' }, tones: { AB: 'adj', BC: 'opp', CA: 'brand' } })], 240)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{slope} = \\dfrac{42}{700} = 0.06', '0.06 \\times 100\\% = 6\\%'] }],
      lines: [
        { say: 'A highway near Lethbridge climbs forty-two metres over a horizontal distance of 700 metres. What is its grade?', show: 'hw.shape' },
        { say: 'The slope is forty-two over 700, which is 0.06.', show: 'm.0', focus: ['hw.BC', 'hw.AB', 'm.0'] },
        { say: 'Multiply by 100 percent: the highway has a six percent grade. It climbs six metres for every 100 metres across.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['8\\% = 0.08', '2.5 \\text{ km} = 2500 \\text{ m}', '\\text{drop} = 0.08 \\times 2500 = 200 \\text{ m}'] }],
      lines: [
        { say: 'A sign warns of an eight percent grade for the next 2.5 kilometres, measured horizontally. How far does the road drop? An eight percent grade is a slope of 0.08.', show: 'm.0', focus: 'm.0' },
        { say: 'The drop will be in metres, so change the run to metres: 2.5 kilometres is 2,500 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'The drop is the slope times the run: 0.08 times 2,500 is 200. The road drops 200 metres, which is why trucks are warned to gear down.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A 100% grade',
      layout: 'split',
      leftWidth: 520,
      left: [figure('h', [triangle({ A: [0, 0], B: [5, 0], C: [5, 5], right: 'B', sides: { AB: '\\text{run}', BC: '\\text{rise}' }, angles: { A: '45^\\circ' }, tones: { AB: 'adj', BC: 'opp', CA: 'brand' } })], 340)],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A 100% grade is not a wall', md: 'A $100\\%$ grade means the rise **equals** the run: a slope of $1$, at $45^\\circ$. A vertical wall has no run at all, so its grade cannot be written.' }],
      lines: [
        { say: 'Here is a surprise. A 100 percent grade is not a vertical wall.', show: 'oops' },
        { say: 'A 100 percent grade means the slope is one: the rise equals the run. That is a forty-five degree slope, far too steep to drive, but not vertical.', show: 'h.shape', focus: 'h.shape' },
        { say: 'A vertical wall has no run at all, and you cannot divide by zero, so its grade cannot be written.', show: 'h.aA' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bike trail climbs $18$ m over a horizontal distance of $240$ m. What is its grade?',
          choices: ['$7.5\\%$', '$0.075\\%$', '$13.3\\%$', '$18\\%$'],
          answer: 0,
          working: '$\\dfrac{18}{240} = 0.075$, and $0.075 \\times 100\\% = 7.5\\%$. B forgets to multiply by $100\\%$, and C divides the run by the rise.',
        },
      ],
      lines: [
        { say: 'Your turn. A bike trail climbs eighteen metres over a horizontal distance of 240 metres. What is its grade? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eighteen over 240 is 0.075, and times 100 percent, that is 7.5 percent. B forgets to multiply by 100 percent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\text{grade} = \\text{slope} \\times 100\\%$', 'To work backwards, write the grade as a decimal slope.', 'A $100\\%$ grade is a $45^\\circ$ slope, not a wall.'] }],
      lines: [
        { say: 'Let’s sum up. The grade is the slope times 100 percent.', show: 'sum.0' },
        { say: 'To work backwards, write the grade as a decimal slope, then multiply or divide.', show: 'sum.1' },
        { say: 'And a 100 percent grade is a forty-five degree slope, not a wall. In part four, we measure the pitch of a roof. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
