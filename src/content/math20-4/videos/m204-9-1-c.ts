import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-9-1-c',
  lessonId: 'm204-9-1',
  title: 'Data Displays, Part 3: Finding a Percent',
  thumbnailTitle: 'Finding a Percent',
  thumbnail: 'm',
  summary: 'Finding what percent a part is of the whole with percent = part ÷ whole × 100 (28 of 80 food truck customers paying cash is 35%), why you always divide the part by the whole, and choosing a bar, line or circle graph for the data.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.1 · Part 3', title: 'Finding a Percent', subtitle: 'Part ÷ whole × 100' }],
      lines: [
        { say: 'Before you can draw a circle graph, you need percents. And data rarely comes as percents. It comes as counts.', show: 'title' },
        { say: 'In this video, you will find what percent a part is of the whole, and choose the right kind of graph.' },
      ],
    },
    {
      chapter: 'Part over whole',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{percent} = \\dfrac{\\text{part}}{\\text{whole}} \\times 100'] },
        { kind: 'text', id: 'q', md: 'A food truck had $80$ customers at lunch. $28$ paid with cash.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['28 \\div 80 = 0.35', '0.35 \\times 100 = 35\\%'] },
      ],
      lines: [
        { say: 'To find what percent one part is of the whole, divide the part by the whole. Then multiply by 100.', show: 'f', focus: 'f' },
        { say: 'A food truck had 80 customers at lunch. 28 paid with cash. What percent paid with cash?', show: 'q' },
        { say: 'The part is 28, and the whole is 80. 28 divided by 80 is 0.35.', show: 'm.0', focus: 'm.0' },
        { say: 'Times 100, that is 35. So 35 percent of the customers paid with cash.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: 35 percent is a bit more than a third, and 28 is a bit more than a third of 80. It makes sense.' },
      ],
    },
    {
      chapter: 'Part by whole',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'Always divide the **part** by the **whole**. $80 \\div 28$ gives a number bigger than $1$, and a part can never be more than $100\\%$ of the whole.' }],
      lines: [
        { say: 'A common mistake is to divide the wrong way. Always divide the part by the whole. 80 divided by 28 is about 2.86, which would be 286 percent. But a part can never be more than 100 percent of the whole.', show: 'oops' },
      ],
    },
    {
      chapter: 'Which graph?',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Use a…', 'when the data…'], rows: [['bar graph', 'compares separate groups'], ['line graph', 'changes over time'], ['circle graph', 'shows the parts of one whole']] }],
      lines: [
        { say: 'Which kind of graph should you draw? Use a bar graph when the data compares separate groups, like sales at three stores.', show: 't', focus: 't.0' },
        { say: 'Use a line graph when the data changes over time, like sales each week.', focus: 't.1' },
        { say: 'And use a circle graph when the data shows the parts of one whole, like how customers paid. The cash and card percents add to 100.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A store had $60$ customers in an hour. $45$ paid by card. What percent paid by card?',
          choices: ['$75\\%$', '$133\\%$', '$45\\%$', '$25\\%$'],
          answer: 0,
          working: '$45 \\div 60 = 0.75$, and $0.75 \\times 100 = 75\\%$. B divides the wrong way, and D is the percent who did not pay by card.',
        },
      ],
      lines: [
        { say: 'Your turn. A store had sixty customers in an hour. 45 paid by card. What percent paid by card? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 45 divided by sixty is 0.75, and times 100 that is 75 percent. B divides the wrong way, giving more than 100 percent, and D is the percent who did not pay by card.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent = part ÷ whole × 100.', 'Divide the part by the whole, never the other way.', 'Bar: groups. Line: over time. Circle: parts of a whole.'] }],
      lines: [
        { say: 'Let’s sum up. A percent is the part divided by the whole, times 100.', show: 'sum.0' },
        { say: 'Divide the part by the whole, never the other way.', show: 'sum.1' },
        { say: 'And choose a bar graph for groups, a line graph for change over time, and a circle graph for the parts of a whole. In part four, we make a circle graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
