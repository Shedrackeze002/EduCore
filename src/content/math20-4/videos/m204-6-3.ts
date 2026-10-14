import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-6-3',
  lessonId: 'm204-6-3',
  title: 'Temperature, Part 1: Two Temperature Scales',
  thumbnailTitle: 'Celsius and Fahrenheit',
  thumbnail: 'nl',
  summary: 'The Celsius and Fahrenheit scales, benchmark temperatures (freezer, freezing, room, body, boiling and an oven), and using them to decide which temperature makes sense, such as 32°C for a hot summer afternoon.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.3 · Part 1', title: 'Celsius and Fahrenheit', subtitle: 'Two scales, one temperature' }],
      lines: [
        { say: 'The weather forecast here uses degrees Celsius. Many ovens, recipes and thermometers from the United States use degrees Fahrenheit. Cooks, servers and anyone who stores food at work need to read both.', show: 'title' },
        { say: 'In this video, you will learn some benchmark temperatures, and use them to check whether a temperature makes sense.' },
      ],
    },
    {
      chapter: 'Two scales',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Celsius', md: 'The **Celsius** scale ($^\\circ$C) is used in Canada. Water freezes at $0^\\circ$C and boils at $100^\\circ$C.' },
        { kind: 'callout', id: 'f', tone: 'definition', title: 'Fahrenheit', md: 'The **Fahrenheit** scale ($^\\circ$F) is used in the United States. Water freezes at $32^\\circ$F and boils at $212^\\circ$F.' },
      ],
      lines: [
        { say: 'The Celsius scale is used in Canada. Water freezes at zero degrees Celsius, and boils at 100.', show: 'c' },
        { say: 'The Fahrenheit scale is used in the United States. Water freezes at 32 degrees Fahrenheit, and boils at 212.', show: 'f' },
        { say: 'So the same temperature has two different numbers, one on each scale.' },
      ],
    },
    {
      chapter: 'Benchmark temperatures',
      layout: 'center',
      main: [
        figure('nl', [numberLine({ min: -40, max: 100, step: 10, every: 0, length: 14, points: [
          { id: 'fz', value: -18, tex: '\\text{Freezer } {-18}' },
          { id: 'wf', value: 0, tex: '\\text{Water freezes } 0', below: true },
          { id: 'rm', value: 20, tex: '\\text{Room } 20' },
          { id: 'bd', value: 37, tex: '\\text{Body } 37', below: true },
          { id: 'wb', value: 100, tex: '\\text{Water boils } 100' },
        ] })], 260),
      ],
      lines: [
        { say: 'Learn a few temperatures you know well. They help you check whether a temperature makes sense. Here they are on a Celsius number line.', show: 'nl.axis' },
        { say: 'A freezer is about minus eighteen. Water freezes at zero.', show: ['nl.fz', 'nl.wf'], focus: ['nl.fz', 'nl.wf'] },
        { say: 'A comfortable room is about twenty, and your body is about 37.', show: ['nl.rm', 'nl.bd'], focus: ['nl.rm', 'nl.bd'] },
        { say: 'And water boils at 100 degrees Celsius.', show: 'nl.wb', focus: 'nl.wb' },
      ],
    },
    {
      chapter: 'On both scales',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['What', '°C', '°F'], rows: [['Freezer', '$-18$', 'about $0$'], ['Water freezes', '$0$', '$32$'], ['Room', '$20$', '$68$'], ['Body', '$37$', '$98.6$'], ['Water boils', '$100$', '$212$'], ['Oven for cookies', 'about $180$', 'about $350$']] },
      ],
      lines: [
        { say: 'Here are the same benchmarks on both scales. A freezer is about zero Fahrenheit. Water freezes at 32 Fahrenheit, and a room is about 68.', show: 't', focus: ['t.0', 't.1', 't.2'] },
        { say: 'Your body is about 98.6 Fahrenheit, and water boils at 212. An oven for cookies is about 180 Celsius, or 350 Fahrenheit.', focus: ['t.3', 't.4', 't.5'] },
      ],
    },
    {
      chapter: 'Which temperature makes sense?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Which makes sense for a hot summer afternoon: $32^\\circ$C, $32^\\circ$F or $90^\\circ$C?', size: 'md' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the scales', md: '$30^\\circ$F is below freezing, but $30^\\circ$C is a hot summer day. Always look at the letter after the degree sign.' },
      ],
      lines: [
        { say: 'Which temperature makes sense for a hot summer afternoon: 32 degrees Celsius, 32 degrees Fahrenheit, or 90 degrees Celsius?', show: 'q' },
        { say: '32 degrees Fahrenheit is where water freezes, far too cold. 90 degrees Celsius is almost hot enough to boil water, far too hot.' },
        { say: 'So 32 degrees Celsius makes sense. It is hotter than a room, but cooler than your body.' },
        { say: 'A common mistake is to mix up the scales. Thirty degrees Fahrenheit is below freezing, but thirty degrees Celsius is a hot summer day. Always look at the letter after the degree sign.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which temperature makes sense for the inside of a fridge?',
          choices: ['$4^\\circ$C', '$4^\\circ$F', '$40^\\circ$C', '$75^\\circ$F'],
          answer: 0,
          working: 'A fridge is cold but above freezing: just above $0^\\circ$C. $4^\\circ$F is below freezing, $40^\\circ$C is hotter than your body, and $75^\\circ$F is warmer than a room.',
        },
      ],
      lines: [
        { say: 'Your turn. Which temperature makes sense for the inside of a fridge? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A fridge is cold, but above freezing, so just above zero Celsius. Four Fahrenheit is below freezing, forty Celsius is hotter than your body, and 75 Fahrenheit is warmer than a room.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Water freezes at 0°C (32°F) and boils at 100°C (212°F).', 'Know a few benchmarks: room 20°C, body 37°C.', 'Check the letter after the degree sign.'] }],
      lines: [
        { say: 'Let’s sum up. Water freezes at zero Celsius, 32 Fahrenheit, and boils at 100 Celsius, 212 Fahrenheit.', show: 'sum.0' },
        { say: 'Know a few benchmarks, like a room at twenty Celsius and your body at 37.', show: 'sum.1' },
        { say: 'And always check the letter after the degree sign. In part two, we change Celsius to Fahrenheit. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
