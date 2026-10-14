import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-1-2-b',
  lessonId: 'm203-1-2',
  title: 'Rate of Change, Part 2: What the Rate Means',
  thumbnailTitle: 'What the Rate Means',
  thumbnail: 't',
  summary: 'Finding the rate of change for a cargo van rental (0.22 dollars per kilometre), explaining what it means, finding the fixed part of the cost (43 dollars), and predicting the cost of driving 320 km (113.40 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.2 · Part 2', title: 'What the Rate Means', subtitle: 'Units tell the story' }],
      lines: [
        { say: 'A rate of change is more than a number. Its units tell you what it means, and once you know it, you can predict values that are not in the table.', show: 'title' },
        { say: 'In this video, you will explain a rate in words, and use it to predict the cost of a rental.' },
      ],
    },
    {
      chapter: 'Renting a cargo van',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['Distance driven (km)', 'Total cost'], rows: [['$100$', '\\$65.00'], ['$250$', '\\$98.00'], ['$400$', '\\$131.00']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{98.00 - 65.00}{250 - 100} = \\dfrac{33.00}{150}', '= 0.22 \\text{ dollars per km}'] }],
      lines: [
        { say: 'Priya rents a cargo van in Airdrie. The table shows the total cost for different distances. What is the rate of change?', show: 't' },
        { say: 'Use the first two rows. The cost goes up by thirty-three dollars, while the distance goes up by 150 kilometres.', show: 'm.0', focus: ['t.0', 't.1', 'm.0'] },
        { say: 'Thirty-three divided by 150 is 0.22. The units are dollars per kilometre.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Read the units aloud',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'What it means', md: 'Each kilometre driven adds \\$0.22 to the cost.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the units aloud', md: '“Dollars per kilometre” means “dollars **for each** kilometre”. If your sentence does not make sense with the units, check whether you divided the right way.' },
      ],
      lines: [
        { say: 'What does 0.22 dollars per kilometre mean? Each kilometre driven adds twenty-two cents to the cost.', show: 'k' },
        { say: 'Here is a check: read the units aloud. Dollars per kilometre means dollars for each kilometre. If you had divided the other way, you would get kilometres per dollar, which does not describe a rental cost.', show: 'tip' },
      ],
    },
    {
      chapter: 'The fixed part',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['0.22 \\times 100 = 22.00', '65.00 - 22.00 = 43.00', '\\text{cost} = 43.00 + 0.22d'] }],
      lines: [
        { say: 'Not all of the cost depends on the distance. At 100 kilometres, the driving part is 0.22 times 100, twenty-two dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The total was sixty-five dollars, so the other forty-three dollars is a fixed part: the van costs forty-three dollars before any driving.', show: 'm.1', focus: 'm.1' },
        { say: 'So the cost is forty-three dollars, plus twenty-two cents for each kilometre, d.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Predicting a cost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['43.00 + 0.22 \\times 320', '= 43.00 + 70.40', '= 113.40'] }],
      lines: [
        { say: 'Now predict a cost that is not in the table. How much does it cost to drive 320 kilometres?', show: 'm.0', focus: 'm.0' },
        { say: '0.22 times 320 is seventy dollars forty, and add the fixed forty-three dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Driving 320 kilometres costs 113 dollars and forty cents.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A plumber charges \\$150 for a $2$ h job and \\$255 for a $3.5$ h job. What is the rate of change, and what does it mean?',
          choices: ['\\$70 per hour: each extra hour adds \\$70', '\\$75 per hour: the plumber earns \\$75 per job', '\\$105 per hour: each hour adds \\$105', '\\$0.014 per hour'],
          answer: 0,
          working: '$\\dfrac{255 - 150}{3.5 - 2} = \\dfrac{105}{1.5} = 70$ dollars per hour. C forgets to divide by the change in time.',
        },
      ],
      lines: [
        { say: 'Your turn. A plumber charges 150 dollars for a two-hour job, and 255 dollars for a 3.5-hour job. What is the rate of change, and what does it mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 255 minus 150 is 105 dollars, over 1.5 hours, which is seventy dollars per hour. Each extra hour adds seventy dollars to the bill. C forgets to divide by the change in time.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The units of a rate say what it means: “for each”.', 'Subtract the rate’s part to find a fixed part.', 'Use the rate to predict values beyond the table.'] }],
      lines: [
        { say: 'Let’s sum up. The units of a rate tell you what it means: so many output units for each input unit.', show: 'sum.0' },
        { say: 'Subtract the part that depends on the rate to find any fixed part.', show: 'sum.1' },
        { say: 'And use the rate to predict values beyond the table. In part three, we find the rate of change from a graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
