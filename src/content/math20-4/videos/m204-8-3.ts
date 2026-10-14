import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-8-3',
  lessonId: 'm204-8-3',
  title: 'Travel Time, Part 1: Speed and Distance',
  thumbnailTitle: 'Speed and Distance',
  thumbnail: 't',
  summary: 'What a speed in km/h means, distance = speed × time (a delivery truck at 90 km/h for 3 hours goes 270 km), and the three forms of the formula for distance, time and speed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.3 · Part 1', title: 'Speed and Distance', subtitle: 'distance = speed × time' }],
      lines: [
        { say: 'How far will a truck get by lunch? How long will a drive take? Drivers, dispatchers and anyone planning a road trip use one simple formula to answer these questions.', show: 'title' },
        { say: 'In this video, you will find a distance from a speed and a time.' },
      ],
    },
    {
      chapter: 'Speed',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Speed', md: '**Speed** tells how far something goes in one unit of time. A speed of $90$ km/h (kilometres per hour) means $90$ kilometres in each hour.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{distance} = \\text{speed} \\times \\text{time}'] },
      ],
      lines: [
        { say: 'Speed tells how far something goes in one unit of time. A speed of 90 kilometres per hour means 90 kilometres in each hour.', show: 'def' },
        { say: 'So in two hours, you go 90 plus 90 kilometres, and in three hours, 90 three times. If you know the speed and the time, multiply to find the distance.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'A delivery run',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A delivery truck travels for $3$ hours at an average speed of $90$ km/h.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{distance} = 90 \\times 3 = 270 \\text{ km}'] },
      ],
      lines: [
        { say: 'A delivery truck travels for three hours, at an average speed of 90 kilometres per hour. How far does it go?', show: 'q' },
        { say: 'Distance equals speed times time: 90 times three is 270. The truck goes 270 kilometres.', show: 'm', focus: 'm' },
        { say: 'The word average matters. The truck slows down in towns and speeds up on the highway, but on average it covers 90 kilometres each hour.' },
      ],
    },
    {
      chapter: 'Part of an hour',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A cyclist rides for $2.5$ hours at an average speed of $20$ km/h.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{distance} = 20 \\times 2.5 = 50 \\text{ km}'] },
      ],
      lines: [
        { say: 'The time does not have to be a whole number of hours. A cyclist rides for 2.5 hours, at an average speed of twenty kilometres per hour. How far does the cyclist go?', show: 'q' },
        { say: 'Twenty times 2.5 is fifty. The cyclist goes fifty kilometres: forty in the first two hours, and ten more in the last half hour.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Three forms',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['To find', 'Use'], rows: [['Distance', 'speed × time'], ['Time', 'distance ÷ speed'], ['Speed', 'distance ÷ time']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the units', md: 'Speed in km/h and time in hours give distance in km. Keep the units matching.' },
      ],
      lines: [
        { say: 'The same formula can be turned around. To find the distance, multiply speed times time.', show: 't', focus: 't.0' },
        { say: 'To find the time, divide the distance by the speed.', focus: 't.1' },
        { say: 'And to find the speed, divide the distance by the time. We use these in the next part.', focus: 't.2' },
        { say: 'Check the units. A speed in kilometres per hour and a time in hours give a distance in kilometres.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bus travels for $4$ hours at an average speed of $75$ km/h. How far does it go?',
          choices: ['$300$ km', '$79$ km', '$18.75$ km', '$71$ km'],
          answer: 0,
          working: '$\\text{distance} = 75 \\times 4 = 300$ km. B adds, C divides, and D subtracts.',
        },
      ],
      lines: [
        { say: 'Your turn. A bus travels for four hours, at an average speed of 75 kilometres per hour. How far does it go? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Distance equals speed times time: 75 times four is 300 kilometres. B adds the numbers, C divides, and D subtracts.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Speed is the distance in one unit of time.', 'distance = speed × time.', 'km/h × hours gives km.'] }],
      lines: [
        { say: 'Let’s sum up. Speed is the distance travelled in one unit of time.', show: 'sum.0' },
        { say: 'Distance equals speed times time.', show: 'sum.1' },
        { say: 'And kilometres per hour times hours gives kilometres. In part two, we find the time and the speed. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
