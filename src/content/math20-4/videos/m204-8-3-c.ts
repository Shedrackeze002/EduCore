import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-8-3-c',
  lessonId: 'm204-8-3',
  title: 'Travel Time, Part 3: Hours and Minutes',
  thumbnailTitle: 'Hours and Minutes',
  thumbnail: 'm',
  summary: 'Changing a decimal travel time to hours and minutes by multiplying the decimal part by 60 (210 km at 90 km/h is 2.33 h, or 2 h 20 min), why 2.5 hours is 2 h 30 min and not 2 h 50 min, and changing minutes back to a decimal (2 h 15 min = 2.25 h).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.3 · Part 3', title: 'Hours and Minutes', subtitle: 'Times 60' }],
      lines: [
        { say: 'A calculator says a trip takes 2.3333 hours. That is not how anyone talks about time. You need hours and minutes.', show: 'title' },
        { say: 'In this video, you will change decimal hours to hours and minutes, and back again.' },
      ],
    },
    {
      chapter: 'A two-hour-something trip',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A driver goes $210$ km at an average speed of $90$ km/h.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['210 \\div 90 \\approx 2.3333 \\text{ h}', '2 \\text{ h} + 0.3333 \\text{ h}', '0.3333 \\times 60 \\approx 20 \\text{ min}', '2 \\text{ h } 20 \\text{ min}'] },
      ],
      lines: [
        { say: 'A driver goes 210 kilometres, at an average speed of 90 kilometres per hour. How long does the trip take, in hours and minutes?', show: 'q' },
        { say: 'Time equals distance divided by speed: 210 divided by 90 is about 2.3333 hours.', show: 'm.0', focus: 'm.0' },
        { say: 'That is two whole hours, and 0.3333 of an hour.', show: 'm.1', focus: 'm.1' },
        { say: 'An hour has sixty minutes, so multiply the decimal part by sixty: 0.3333 times sixty is about twenty minutes.', show: 'm.2', focus: 'm.2' },
        { say: 'So the trip takes two hours twenty minutes.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Not minutes',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Decimal hours are not minutes', md: '$2.5$ hours is **not** $2$ hours $50$ minutes. Half an hour is $30$ minutes, so $2.5$ hours is $2$ hours $30$ minutes. Always multiply the decimal part by $60$.' }],
      lines: [
        { say: 'A common mistake is to read the decimal as minutes. 2.5 hours is not two hours fifty minutes. Half an hour is thirty minutes, so 2.5 hours is two hours thirty minutes. Always multiply the decimal part by sixty.', show: 'oops' },
        { say: 'The quarter hours are worth remembering: 0.25 of an hour is fifteen minutes, 0.5 is thirty, and 0.75 is 45.' },
      ],
    },
    {
      chapter: 'Minutes to a decimal',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\text{ h } 15 \\text{ min} = 2 + \\dfrac{15}{60}', '= 2 + 0.25 = 2.25 \\text{ h}'] },
      ],
      lines: [
        { say: 'To go the other way, divide the minutes by sixty. Two hours fifteen minutes is two plus fifteen sixtieths of an hour.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifteen divided by sixty is 0.25, a quarter of an hour. So two hours fifteen minutes is 2.25 hours.', show: 'm.1', focus: 'm.1' },
        { say: 'You need this when a time is given in hours and minutes, and you want to use it in the formula. For example, 2.25 hours at 80 kilometres per hour is 180 kilometres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A driver goes $150$ km at an average speed of $60$ km/h. How long does the trip take, in hours and minutes?',
          choices: ['$2$ h $30$ min', '$2$ h $50$ min', '$2$ h $5$ min', '$3$ h $30$ min'],
          answer: 0,
          working: '$150 \\div 60 = 2.5$ h. $0.5 \\times 60 = 30$ min, so $2$ h $30$ min. B reads $0.5$ as $50$ minutes, and C as $5$ minutes.',
        },
      ],
      lines: [
        { say: 'Your turn. A driver goes 150 kilometres, at an average speed of sixty kilometres per hour. How long does the trip take, in hours and minutes? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 150 divided by sixty is 2.5 hours. 0.5 times sixty is thirty minutes, so the trip takes two hours thirty minutes. B reads the decimal as fifty minutes, and C as five minutes.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Decimal part of an hour × 60 = minutes.', '2.5 h is 2 h 30 min, not 2 h 50 min.', 'Minutes ÷ 60 = decimal part of an hour.'] }],
      lines: [
        { say: 'Let’s sum up. To change the decimal part of an hour to minutes, multiply by sixty.', show: 'sum.0' },
        { say: '2.5 hours is two hours thirty minutes, not two hours fifty.', show: 'sum.1' },
        { say: 'And to change minutes to a decimal, divide by sixty. In part four, we plan a trip and find the arrival time. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
