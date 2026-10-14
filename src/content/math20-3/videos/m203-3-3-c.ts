import type { Explainer } from '@/video/script.ts';
import { cone, cylinder, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-3-3-c',
  lessonId: 'm203-3-3',
  title: 'Volume on the Job, Part 3: Loads, Trips and Time',
  thumbnailTitle: 'Loads, Trips and Time',
  thumbnail: 'bin',
  summary: 'Loads = volume ÷ volume per load, always rounded up, and time = volume ÷ rate: emptying a grain bin with a cone of grain on top (69π m³, so 8 truckloads) and filling a round pool 5.5 m across with a 30 L/min hose (about 15.8 h).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.3 · Part 3', title: 'Loads, Trips and Time', subtitle: 'How many? How long?' }],
      lines: [
        { say: 'Trucks, augers and hoses move a fixed amount per load, or per minute. Once you know the volume, you can plan the trips and the time.', show: 'title' },
        { say: 'In this video, you will count the truckloads to empty a grain bin, and time how long a pool takes to fill.' },
      ],
    },
    {
      chapter: 'Two rules',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{loads} = \\dfrac{\\text{total volume}}{\\text{volume per load}} \\;\\; \\text{(round up)}', '\\text{time} = \\dfrac{\\text{total volume}}{\\text{rate}}'] }],
      lines: [
        { say: 'Loads are the total volume divided by the volume per load. Always round up: a part load is still a trip.', show: 'm.0', focus: 'm.0' },
        { say: 'And time is the total volume divided by the rate. Check the units: litres divided by litres per minute gives minutes.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Emptying a grain bin',
      layout: 'split',
      leftWidth: 480,
      left: [figure('bin', [cylinder({ r: 3, h: 7, top: 'front' }), cone({ name: 'pile', at: [0, 7], r: 3, h: 2, rim: 'front' })], 440)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{cylinder: } \\pi(3)^2(7) = 63\\pi', '\\text{cone: } \\tfrac13 \\pi(3)^2(2) = 6\\pi', '\\text{total: } 69\\pi \\approx 216.8 \\text{ m}^3', '216.8 \\div 30 \\approx 7.23 \\;\\to\\; 8 \\text{ loads}'] }],
      lines: [
        { say: 'A grain bin is six metres across with a wall seven metres high, and the grain is piled in a cone two metres above the top of the wall. A grain truck hauls thirty cubic metres per load. How many loads empty the bin?', show: ['bin.shape', 'bin.pile-shape'] },
        { say: 'The radius is three metres. The cylinder of grain is pi times nine times seven, sixty-three pi.', show: 'm.0', focus: 'm.0' },
        { say: 'The cone on top is one third pi times nine times two, six pi.', show: 'm.1', focus: 'm.1' },
        { say: 'Together, sixty-nine pi, about 216.8 cubic metres.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by thirty: about 7.23 loads. Seven loads would leave grain behind, so round up: eight loads.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Filling a pool',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['V = \\pi(2.75)^2(1.2) \\approx 28.51 \\text{ m}^3 \\approx 28\\,510 \\text{ L}', '28\\,510 \\div 30 \\approx 950 \\text{ min}', '950 \\div 60 \\approx 15.8 \\text{ h}'] }],
      lines: [
        { say: 'A round above-ground pool is 5.5 metres across, and is filled to a depth of 1.2 metres. A hose delivers thirty litres per minute. About how many hours will it take to fill? The radius is 2.75 metres, so the water is about 28.51 cubic metres, or 28,510 litres.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the rate: 28,510 litres, divided by thirty litres per minute, is about 950 minutes.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by sixty for hours: about 15.8 hours. Start filling the night before!', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A job needs $52\\ \\text{m}^3$ of gravel. A dump truck carries $12\\ \\text{m}^3$ per load. How many loads are needed?',
          choices: ['$5$ loads', '$4$ loads', '$4.3$ loads', '$624$ loads'],
          answer: 0,
          working: '$52 \\div 12 \\approx 4.33$. Four loads leave $4\\ \\text{m}^3$ short, so round up to $5$.',
        },
      ],
      lines: [
        { say: 'Your turn. A job needs fifty-two cubic metres of gravel. A dump truck carries twelve cubic metres per load. How many loads are needed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifty-two divided by twelve is about 4.33. Four loads would leave the job four cubic metres short, so round up to five.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Loads = volume ÷ volume per load, rounded up.', 'Time = volume ÷ rate, with matching units.', 'Change minutes to hours by dividing by $60$.'] }],
      lines: [
        { say: 'Let’s sum up. The number of loads is the volume divided by the volume per load, always rounded up.', show: 'sum.0' },
        { say: 'Time is the volume divided by the rate, with matching units.', show: 'sum.1' },
        { say: 'And divide minutes by sixty to get hours. In part four, we work backward from a volume to a missing length. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
