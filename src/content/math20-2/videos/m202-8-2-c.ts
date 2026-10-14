import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-8-2-c',
  lessonId: 'm202-8-2',
  title: 'Solving Problems with Rates, Part 3: Combining Rates and Average Speed',
  thumbnailTitle: 'Combining Rates',
  thumbnail: 'm',
  summary: 'Adding rates that work together (two hoses fill a 6000 L pool in 2 h), subtracting a leak, and finding the average speed for a whole trip as total distance over total time (about 81.8 km/h), not the mean of the speeds.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.2 · Part 3', title: 'Combining Rates', subtitle: 'Together, against, and on average' }],
      lines: [
        { say: 'Two hoses fill a pool faster than one. A leak slows it down. And a trip at two speeds has one average speed.', show: 'title' },
        { say: 'In this video, you will add and subtract rates, and find the average speed for a whole trip.' },
      ],
    },
    {
      chapter: 'Two hoses',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['30 + 20 = 50 \\text{ L/min}', '6000 \\div 50 = 120 \\text{ min} = 2 \\text{ h}'] }],
      lines: [
        { say: 'Two hoses fill a 6,000 litre above-ground pool together. One delivers thirty litres per minute, and the other twenty litres per minute. How long will it take? When two things work together, their rates add, so together the hoses deliver fifty litres per minute.', show: 'm.0', focus: 'm.0' },
        { say: 'You know the litres, so divide by the rate: 6,000 divided by fifty is 120 minutes, or two hours.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A leak works against you',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['30 + 20 - 5 = 45 \\text{ L/min}', '6000 \\div 45 \\approx 133.3 \\text{ min}', '\\approx 2 \\text{ h } 13 \\text{ min}'] }],
      lines: [
        { say: 'Now suppose the pool has a leak that loses five litres per minute. A rate that works against the others is subtracted, so the net rate is forty-five litres per minute.', show: 'm.0', focus: 'm.0' },
        { say: 'Then 6,000 divided by forty-five is about 133.3 minutes.', show: 'm.1', focus: 'm.1' },
        { say: 'That is two hours and about thirteen minutes, so the leak adds about thirteen minutes to the job.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Average speed for a whole trip',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{highway: } 120 \\div 100 = 1.2 \\text{ h}', '\\text{gravel: } 60 \\div 60 = 1 \\text{ h}', '180 \\text{ km in } 2.2 \\text{ h}', '180 \\div 2.2 \\approx 81.8 \\text{ km/h}'] }],
      lines: [
        { say: 'Gurpreet drives 120 kilometres on a highway at 100 kilometres per hour, then sixty kilometres on a gravel road at sixty kilometres per hour. What is the average speed for the whole trip? Find the time for each part. The highway takes 120 divided by 100, which is 1.2 hours.', show: 'm.0', focus: 'm.0' },
        { say: 'The gravel road takes sixty divided by sixty, which is one hour.', show: 'm.1', focus: 'm.1' },
        { say: 'Altogether, Gurpreet drives 180 kilometres in 2.2 hours.', show: 'm.2', focus: 'm.2' },
        { say: 'The average speed is the total distance divided by the total time: 180 divided by 2.2, which is about 81.8 kilometres per hour.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Do not average the speeds',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Averaging the speeds', md: 'The mean of $100$ and $60$ is $80$, but that is not the average speed. Gurpreet spent more time at the slower speed, so the average is pulled toward it. Average speed is always **total distance ÷ total time**.' }],
      lines: [
        { say: 'A common mistake is to take the mean of the two speeds. The mean of 100 and sixty is eighty, but that is not the average speed.', show: 'oops' },
        { say: 'Gurpreet spent more time at the slower speed, so the average is pulled toward it. Average speed is always total distance divided by total time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You drive $100$ km at $50$ km/h, then $100$ km at $100$ km/h. What is your average speed for the whole trip?',
          choices: ['about $66.7$ km/h', '$75$ km/h', '$80$ km/h', '$150$ km/h'],
          answer: 0,
          working: 'The times are $100 \\div 50 = 2$ h and $100 \\div 100 = 1$ h, so you drive $200$ km in $3$ h: $200 \\div 3 \\approx 66.7$ km/h. B is the mean of the speeds.',
        },
      ],
      lines: [
        { say: 'Your turn. You drive 100 kilometres at fifty kilometres per hour, then 100 kilometres at 100 kilometres per hour. What is your average speed for the whole trip? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The two parts take two hours and one hour, so you drive 200 kilometres in three hours: about 66.7 kilometres per hour. B is the mean of the speeds, the trap from before.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Rates that work together add.', 'Rates that work against each other subtract.', 'Average speed $=$ total distance $\\div$ total time.'] }],
      lines: [
        { say: 'Let’s sum up. Rates that work together add.', show: 'sum.0' },
        { say: 'Rates that work against each other, like a leak, subtract.', show: 'sum.1' },
        { say: 'And average speed is total distance divided by total time, not the mean of the speeds. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
