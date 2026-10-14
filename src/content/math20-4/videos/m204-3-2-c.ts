import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-2-c',
  lessonId: 'm204-3-2',
  title: 'Other Ways to Earn, Part 3: Piecework',
  thumbnailTitle: 'Piecework',
  thumbnail: 't',
  summary: 'Piecework pay as pay per piece times the number of pieces (405 boxes at 0.60 dollars is 243 dollars), and comparing piecework with an hourly job by finding the pay per hour (1,500 trees at 0.16 dollars in 8 hours is 30 dollars an hour).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.2 · Part 3', title: 'Piecework', subtitle: 'Paid for what you make' }],
      lines: [
        { say: 'Tree planters, berry pickers and some factory workers are paid for the work they finish, not for their time. Work faster, and you earn more.', show: 'title' },
        { say: 'In this video, you will find piecework pay, and compare it with an hourly wage.' },
      ],
    },
    {
      chapter: 'Piecework',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Piecework', md: 'With **piecework**, you are paid for each piece of work you finish, such as each tree planted or each box packed.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{pay} = \\text{pay per piece} \\times \\text{number of pieces}'] },
      ],
      lines: [
        { say: 'With piecework, you are paid for each piece of work you finish, such as each tree planted or each box packed.', show: 'def' },
        { say: 'So the pay is the pay per piece times the number of pieces. A fast worker earns more, and on a slow day, the pay is less.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Packing boxes',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Day', 'Boxes packed'], rows: [['Monday', '$120$'], ['Tuesday', '$150$'], ['Wednesday', '$135$']] }],
      right: [
        { kind: 'text', id: 'q', md: 'Owen is paid \\$0.60 per box.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['120 + 150 + 135 = 405', '0.60 \\times 405 = 243.00'] },
      ],
      lines: [
        { say: 'Owen packs boxes at a warehouse for sixty cents per box. The table shows his work this week. How much did he earn?', show: ['t', 'q'] },
        { say: 'First, the total number of boxes: 120 plus 150 plus 135 is 405 boxes.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the pay: 0.60 times 405 is 243 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'You could also find each day’s pay, then add. Both ways give 243 dollars, but adding the boxes first means only one multiplication.' },
      ],
    },
    {
      chapter: 'Pay per hour',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A tree planter plants $1500$ trees at \\$0.16 each, in an $8$-hour day.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1500 \\times 0.16 = 240.00', '240.00 \\div 8 = 30.00 \\text{ per hour}'] },
      ],
      lines: [
        { say: 'Is piecework better than an hourly job? To compare, find the pay per hour. A tree planter plants fifteen hundred trees at sixteen cents each, in an eight-hour day.', show: 'q' },
        { say: 'The pay for the day is fifteen hundred times 0.16: 240 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the hours worked: 240 divided by eight is thirty dollars per hour.', show: 'm.1', focus: 'm.1' },
        { say: 'Now you can compare it with an hourly wage. But a slower day, with fewer trees, earns less, so the pay per hour changes from day to day.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A berry picker earns \\$0.75 per basket. In a $6$-hour shift, the picker fills $96$ baskets. What is the pay per hour?',
          choices: ['\\$12.00', '\\$72.00', '\\$16.00', '\\$4.50'],
          answer: 0,
          working: 'Pay: $0.75 \\times 96 = 72.00$. Per hour: $72.00 \\div 6 = 12.00$. B is the pay for the shift, and C is the baskets per hour.',
        },
      ],
      lines: [
        { say: 'Your turn. A berry picker earns 75 cents per basket. In a six-hour shift, the picker fills 96 baskets. What is the pay per hour? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The pay for the shift is 0.75 times 96: 72 dollars. Divided by six hours, that is twelve dollars per hour. B is the pay for the whole shift, and C is the number of baskets per hour.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Piecework pay = pay per piece × number of pieces.', 'Add up the pieces first, then multiply.', 'Pay per hour = pay ÷ hours worked.'] }],
      lines: [
        { say: 'Let’s sum up. Piecework pay is the pay per piece times the number of pieces.', show: 'sum.0' },
        { say: 'Add up the pieces first, then multiply once.', show: 'sum.1' },
        { say: 'And to compare with an hourly job, divide the pay by the hours worked. In part four, we share tips. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
