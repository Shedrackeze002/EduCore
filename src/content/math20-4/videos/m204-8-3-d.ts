import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-8-3-d',
  lessonId: 'm204-8-3',
  title: 'Travel Time, Part 4: Planning a Trip',
  thumbnailTitle: 'Planning a Trip',
  thumbnail: 'm',
  summary: 'Finding an arrival time by adding the driving time and any stops to the start time (leaving at 8:30 a.m., 3 hours of driving and a 30-minute stop arrives at 12:00 noon), and estimating first at about 100 km for each hour.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.3 · Part 4', title: 'Planning a Trip', subtitle: 'When will I get there?' }],
      lines: [
        { say: 'A job interview at one o’clock, a ferry that leaves at four: sometimes you must arrive by a certain time. Planning the trip tells you when to leave, or when you will get there.', show: 'title' },
        { say: 'In this video, you will find an arrival time, including stops along the way.' },
      ],
    },
    {
      chapter: 'Arrival time',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'md', lines: ['\\text{arrival} = \\text{start} + \\text{driving time} + \\text{stops}'] }],
      lines: [
        { say: 'To find the arrival time, add the driving time, and any stops, to the start time. Forgetting a lunch stop or a fuel stop is the easiest way to arrive late.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Kiona’s drive',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Kiona leaves at 8:30 a.m. She drives $300$ km at $100$ km/h, and stops for $30$ minutes for lunch.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{driving: } 300 \\div 100 = 3 \\text{ h}', '\\text{total: } 3 \\text{ h} + 30 \\text{ min} = 3 \\text{ h } 30 \\text{ min}', '\\text{8:30 a.m.} + 3 \\text{ h} = \\text{11:30 a.m.}', '\\text{11:30 a.m.} + 30 \\text{ min} = \\text{12:00 noon}'] },
      ],
      lines: [
        { say: 'Kiona leaves at eight thirty a.m. She drives 300 kilometres, at 100 kilometres per hour, and she stops for thirty minutes for lunch. When does she arrive?', show: 'q' },
        { say: 'First, the driving time: 300 divided by 100 is three hours.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the stop: three hours plus thirty minutes is three hours thirty minutes in all.', show: 'm.1', focus: 'm.1' },
        { say: 'Now count forward from the start. Eight thirty a.m. plus three hours is eleven thirty a.m.', show: 'm.2', focus: 'm.2' },
        { say: 'Then thirty minutes more is twelve noon. Kiona arrives at twelve noon.', show: 'm.3', focus: 'm.3' },
        { say: 'Check with the total time: eight thirty plus three hours thirty minutes is also twelve noon. The same answer either way.' },
      ],
    },
    {
      chapter: 'Estimate first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Estimate first', md: 'At about $100$ km/h, each $100$ km takes about one hour. A $300$ km trip is about $3$ hours of driving. This helps you catch big mistakes.' }],
      lines: [
        { say: 'Before you calculate, make a quick estimate. At about 100 kilometres per hour, each 100 kilometres takes about one hour. So a 300 kilometre trip is about three hours of driving. If your answer is half an hour or ten hours, something went wrong.', show: 'tip' },
        { say: 'Real trips also have traffic, construction and weather, so it is wise to leave a little early.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Omar leaves at 9:15 a.m., drives $240$ km at $80$ km/h, and stops for $20$ minutes for fuel. When does Omar arrive?',
          choices: ['12:35 p.m.', '12:15 p.m.', '12:55 p.m.', '11:35 a.m.'],
          answer: 0,
          working: 'Driving: $240 \\div 80 = 3$ h. 9:15 a.m. $+ 3$ h $=$ 12:15 p.m., then $+ 20$ min $=$ 12:35 p.m. B forgets the stop.',
        },
      ],
      lines: [
        { say: 'Your turn. Omar leaves at nine fifteen a.m., drives 240 kilometres at eighty kilometres per hour, and stops for twenty minutes for fuel. When does Omar arrive? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The driving time is 240 divided by eighty: three hours. Nine fifteen plus three hours is twelve fifteen p.m., and twenty minutes more is twelve thirty-five p.m. B forgets the stop.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Driving time = distance ÷ speed.', 'Arrival = start + driving time + stops.', 'Estimate first: about 1 hour for each 100 km at 100 km/h.'] }],
      lines: [
        { say: 'Let’s sum up. The driving time is the distance divided by the speed.', show: 'sum.0' },
        { say: 'The arrival time is the start time, plus the driving time, plus any stops.', show: 'sum.1' },
        { say: 'And estimate first to catch big mistakes. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
