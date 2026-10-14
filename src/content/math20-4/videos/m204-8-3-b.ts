import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-8-3-b',
  lessonId: 'm204-8-3',
  title: 'Travel Time, Part 2: Finding the Time or the Speed',
  thumbnailTitle: 'Time and Speed',
  thumbnail: 'm',
  summary: 'Turning the formula around: travel time = distance ÷ speed (300 km at 100 km/h takes 3 hours) and average speed = distance ÷ time (240 km in 3 hours is 80 km/h), with checks by multiplying back.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.3 · Part 2', title: 'Time and Speed', subtitle: 'Divide to find them' }],
      lines: [
        { say: 'Kiona has a new job in another city. She needs to know how long the drive will take, and a bus company needs to know how fast its buses go.', show: 'title' },
        { say: 'In this video, you will find a travel time, and an average speed.' },
      ],
    },
    {
      chapter: 'Travel time',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Travel time', md: 'The **travel time** is how long a trip takes: $\\text{time} = \\text{distance} \\div \\text{speed}$.' },
        { kind: 'text', id: 'q', md: 'In this example, the drive is about $300$ km. Kiona drives at an average speed of $100$ km/h.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{time} = 300 \\div 100 = 3 \\text{ h}'] },
      ],
      lines: [
        { say: 'The travel time is how long a trip takes. Time equals distance divided by speed.', show: 'def' },
        { say: 'In this example, Kiona’s drive is about 300 kilometres. She drives at an average speed of 100 kilometres per hour. How long does the drive take?', show: 'q' },
        { say: 'Time equals distance divided by speed: 300 divided by 100 is three. The drive takes about three hours. A speed of 100 makes the math easy: each hundred kilometres takes one hour.', show: 'm', focus: 'm' },
        { say: 'Check by multiplying back: 100 kilometres per hour for three hours is 300 kilometres. It works.' },
      ],
    },
    {
      chapter: 'Average speed',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A bus travels $240$ km in $3$ hours.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{speed} = 240 \\div 3 = 80 \\text{ km/h}'] },
      ],
      lines: [
        { say: 'A bus travels 240 kilometres in three hours. What is its average speed?', show: 'q' },
        { say: 'Speed equals distance divided by time: 240 divided by three is eighty. The average speed is eighty kilometres per hour, which means eighty kilometres in each hour.', show: 'm', focus: 'm' },
        { say: 'Check: eighty kilometres per hour for three hours is 240 kilometres. The bus may stop at stations along the way, so its average speed is lower than its highway speed.' },
      ],
    },
    {
      chapter: 'Which way to divide?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: '$100 \\div 300 \\approx 0.33$ is not the time for a $300$ km drive. The distance goes first: $\\text{time} = \\text{distance} \\div \\text{speed}$. A long drive should take more than an hour.' }],
      lines: [
        { say: 'A common mistake is to divide the wrong way. 100 divided by 300 is about 0.33, but a 300 kilometre drive does not take a third of an hour. The distance goes first: time equals distance divided by speed. A long drive should take more than an hour.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A truck drives $360$ km at an average speed of $90$ km/h. How long does the trip take?',
          choices: ['$4$ h', '$0.25$ h', '$32\\,400$ h', '$270$ h'],
          answer: 0,
          working: '$\\text{time} = 360 \\div 90 = 4$ h. Check: $90 \\times 4 = 360$. B divides the wrong way, and C multiplies.',
        },
      ],
      lines: [
        { say: 'Your turn. A truck drives 360 kilometres, at an average speed of 90 kilometres per hour. How long does the trip take? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Time equals distance divided by speed: 360 divided by 90 is four hours. Check: 90 times four is 360. B divides the wrong way, and C multiplies.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['time = distance ÷ speed.', 'speed = distance ÷ time.', 'Check by multiplying back.'] }],
      lines: [
        { say: 'Let’s sum up. Time equals distance divided by speed.', show: 'sum.0' },
        { say: 'Speed equals distance divided by time.', show: 'sum.1' },
        { say: 'And check by multiplying back: speed times time should give the distance. In part three, we change hours to hours and minutes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
