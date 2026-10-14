import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-6-3',
  lessonId: 'm104-6-3',
  title: 'Time and Temperature, Part 1: Elapsed Time',
  thumbnailTitle: 'Elapsed Time',
  summary: 'Finding elapsed time by counting up in pieces (to the next hour, whole hours, extra minutes), the 24-hour clock, a night shift past midnight, and subtracting an unpaid break. Part 2 reads temperatures and changes across zero.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 6.3 · Part 1', title: 'Elapsed Time', subtitle: 'How long is your shift?' }],
      lines: [
        { say: 'How long is your shift? Will you be paid for your lunch break? Time questions come up every day at work.', show: 'title' },
        { say: 'In this video, you will find elapsed time, and use the 24-hour clock.' },
      ],
    },
    {
      chapter: 'Counting up',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['From', 'To', 'Time'], rows: [['7:45 a.m.', '8:00 a.m.', '15 min'], ['8:00 a.m.', '4:00 p.m.', '8 h'], ['4:00 p.m.', '4:15 p.m.', '15 min'], ['**Total**', '', '**8 h 30 min**']] }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting times like decimals', md: 'One hour is $60$ minutes, not $100$. Do not try $4.15 - 7.45$. Count up in pieces.' }],
      lines: [
        { say: 'Elapsed time is how much time passes between a start time and an end time. The easiest way to find it is to count up in pieces: first to the next full hour, then the whole hours, then the extra minutes.' },
        { say: 'Kwame’s shift at a grocery store starts at seven forty-five in the morning, and ends at four fifteen in the afternoon. From seven forty-five to eight o’clock is fifteen minutes.', show: 't.0', focus: 't.0' },
        { say: 'From eight in the morning to four in the afternoon is eight hours: four hours to noon, and four more after.', show: 't.1', focus: 't.1' },
        { say: 'From four to four fifteen is fifteen more minutes. Altogether, eight hours and thirty minutes.', show: ['t.2', 't.3'], focus: 't.3' },
        { say: 'Time does not work like decimals, because an hour is sixty minutes, not 100. Count up in pieces instead.', show: 'oops' },
      ],
    },
    {
      chapter: 'The 24-hour clock',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'table', id: 't', head: ['12-hour clock', '24-hour clock'], rows: [['12:00 midnight', '00:00'], ['6:45 a.m.', '06:45'], ['12:00 noon', '12:00'], ['3:15 p.m.', '15:15'], ['10:30 p.m.', '22:30']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['22{:}30 \\to 23{:}00: \\; 30 \\text{ min}', '23{:}00 \\to 06{:}00: \\; 7 \\text{ h}', '06{:}00 \\to 06{:}15: \\; 15 \\text{ min}', '7 \\text{ h } 45 \\text{ min}'] }],
      lines: [
        { say: 'The 24-hour clock counts the hours from zero at midnight up to 23, with no a.m. or p.m. Bus schedules and hospitals use it. Morning times look the same, with a zero in front.', show: ['t.0', 't.1', 't.2'] },
        { say: 'For times after noon, add twelve to the hour: three fifteen in the afternoon is fifteen fifteen.', show: ['t.3', 't.4'], focus: 't.3' },
        { say: 'Ana works a night shift at a hospital, from twenty-two thirty to six fifteen the next morning. Count up: thirty minutes to twenty-three hundred, then seven hours to six in the morning.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Then fifteen more minutes. Her shift is seven hours and 45 minutes long.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'An unpaid break',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['8 \\text{ h } 30 \\text{ min} - 30 \\text{ min} = 8 \\text{ h}'] }],
      lines: [
        { say: 'Many jobs have an unpaid break. Find the whole shift first, then subtract the break.' },
        { say: 'Kwame’s shift is eight hours and thirty minutes, with a thirty-minute unpaid lunch. So he is paid for eight hours.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shift runs from 9:30 a.m. to 5:00 p.m. How long is it?',
          choices: ['7 h 30 min', '8 h 30 min', '4 h 30 min', '7 h 70 min'],
          answer: 0,
          working: '9:30 to 10:00 is 30 min, 10:00 a.m. to 5:00 p.m. is 7 h. Total: 7 h 30 min.',
        },
      ],
      lines: [
        { say: 'Your turn. A shift runs from nine thirty in the morning to five in the afternoon. How long is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Nine thirty to ten is thirty minutes, and ten in the morning to five in the afternoon is seven hours. Altogether, seven hours and thirty minutes.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Count up: to the next hour, whole hours, then extra minutes.', '24-hour clock: add $12$ to afternoon hours.', 'Unpaid break: find the whole shift, then subtract.'] }],
      lines: [
        { say: 'Let’s sum up. To find elapsed time, count up to the next hour, then the whole hours, then the extra minutes.', show: 'sum.0' },
        { say: 'On the 24-hour clock, add twelve to afternoon hours.', show: 'sum.1' },
        { say: 'And for a shift with an unpaid break, find the whole shift, then subtract the break. In part two, we read temperatures. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
