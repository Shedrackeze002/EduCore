import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A Celsius scale above a Fahrenheit scale, lined up so that matching temperatures sit together. */
const names: Part = {
  points: { cn: [-1.4, 1.8], fn: [-1.4, -1.8] },
  items: [
    { kind: 'label', id: 'c-name', at: 'cn', tex: '^\\circ\\text{C}', tone: 'adj', place: 'center', group: 'c-axis' },
    { kind: 'label', id: 'f-name', at: 'fn', tex: '^\\circ\\text{F}', tone: 'opp', place: 'center', group: 'f-axis' },
  ],
};
const scales = figure('scales', [
  numberLine({ name: 'c', min: -40, max: 100, step: 20, length: 14, at: [0, 1.8] }),
  numberLine({ name: 'f', min: -40, max: 212, step: 36, length: 14, at: [0, -1.8] }),
  names,
]);

const video: Explainer = {
  id: 'm103-3-4',
  lessonId: 'm103-3-4',
  title: 'Temperature, Part 1: Celsius and Fahrenheit',
  thumbnailTitle: 'Celsius and Fahrenheit',
  thumbnail: 'scales',
  summary: 'The Celsius and Fahrenheit scales side by side, referents for judging a temperature, and converting Celsius to Fahrenheit with F = 9/5 C + 32. Part 2 converts back, estimates and handles temperature changes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 3.4 · Part 1', title: 'Celsius and Fahrenheit', subtitle: 'Two temperature scales' }],
      lines: [
        { say: 'An oven from the United States is marked in degrees Fahrenheit, but your recipe says 180 degrees Celsius. A truck’s coolant gauge reads 230 degrees Fahrenheit: is that too hot?', show: 'title' },
        { say: 'In this video, you will compare the two scales, and convert Celsius to Fahrenheit. In part two, you will convert back.' },
      ],
    },
    {
      chapter: 'Two scales',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Celsius and Fahrenheit', md: 'On the **Celsius** scale, water freezes at $0^\\circ$ and boils at $100^\\circ$. On the **Fahrenheit** scale, it freezes at $32^\\circ$ and boils at $212^\\circ$.' },
        scales,
      ],
      lines: [
        { say: 'The Celsius scale is the S I scale: water freezes at zero degrees, and boils at a hundred. The Fahrenheit scale is the imperial scale: water freezes at 32 degrees, and boils at 212.', show: 'def' },
        { say: 'Here are the two scales, lined up so that matching temperatures sit together. Zero Celsius sits above 32 Fahrenheit, and a hundred Celsius above 212 Fahrenheit.', show: ['scales.c-axis', 'scales.f-axis'] },
        { say: 'From freezing to boiling is a hundred Celsius degrees, but 180 Fahrenheit degrees. So a Fahrenheit degree is smaller than a Celsius degree. And at negative forty, the two scales read the same.' },
      ],
    },
    {
      chapter: 'Referents',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Referent', 'Celsius', 'Fahrenheit'],
          rows: [
            ['water freezes', '$0^\\circ\\text{C}$', '$32^\\circ\\text{F}$'],
            ['comfortable room', '$20^\\circ\\text{C}$', '$68^\\circ\\text{F}$'],
            ['normal body temperature', '$37^\\circ\\text{C}$', '$98.6^\\circ\\text{F}$'],
            ['water boils', '$100^\\circ\\text{C}$', '$212^\\circ\\text{F}$'],
            ['moderate oven', '$180^\\circ\\text{C}$', '$350^\\circ\\text{F}$'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Right number, wrong scale', md: '$37^\\circ\\text{F}$ is not body temperature: it is just above freezing. Always check the scale.' },
      ],
      lines: [
        { say: 'A referent is a familiar temperature you can use to judge whether another one makes sense. Water freezes at zero Celsius, or 32 Fahrenheit, and a comfortable room is about twenty Celsius, or 68 Fahrenheit.', show: ['t.0', 't.1'] },
        { say: 'Normal body temperature is 37 Celsius, or 98.6 Fahrenheit. Water boils at a hundred Celsius, or 212 Fahrenheit, and a moderate oven is about 180 Celsius, or 350 Fahrenheit.', show: ['t.2', 't.3', 't.4'] },
        { say: 'Always check the scale. 37 degrees Fahrenheit is not body temperature: it is just above freezing!', show: 'oops' },
      ],
    },
    {
      chapter: 'Celsius to Fahrenheit',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', lines: ['F = \\tfrac{9}{5}C + 32'] },
        { kind: 'math', id: 'm', lines: ['C = 25\\text{: } \\quad F = \\tfrac95(25) + 32 = 45 + 32 = 77', 'C = {-20}\\text{: } \\quad F = \\tfrac95(-20) + 32 = -36 + 32 = -4'] },
      ],
      lines: [
        { say: 'To change Celsius to Fahrenheit, multiply by nine fifths, which is 1.8, to change the size of the degrees. Then add 32, because the Fahrenheit scale starts 32 degrees higher at freezing.', show: 'f.0', focus: 'f.0' },
        { say: 'The forecast is 25 degrees Celsius. Nine fifths of 25 is 45, and 45 plus 32 is 77 degrees Fahrenheit.', show: 'm.0', focus: 'm.0' },
        { say: 'A walk-in freezer is at negative twenty Celsius. Nine fifths of negative twenty is negative 36, and negative 36 plus 32 is negative four degrees Fahrenheit.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A hot tub is set to $40^\\circ\\text{C}$. What is that in degrees Fahrenheit?',
          choices: ['$104^\\circ\\text{F}$', '$72^\\circ\\text{F}$', '$129.6^\\circ\\text{F}$', '$4.4^\\circ\\text{F}$'],
          answer: 0,
          working: '$F = \\tfrac95(40) + 32 = 72 + 32 = 104$.',
        },
      ],
      lines: [
        { say: 'Your turn. A hot tub is set to forty degrees Celsius. What is that in degrees Fahrenheit? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Nine fifths of forty is 72, and 72 plus 32 is 104 degrees Fahrenheit. B forgets to add 32.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Freezing: $0^\\circ\\text{C} = 32^\\circ\\text{F}$. Boiling: $100^\\circ\\text{C} = 212^\\circ\\text{F}$.', 'Use referents to check that a temperature makes sense.', 'Celsius to Fahrenheit: $F = \\tfrac95 C + 32$.'] }],
      lines: [
        { say: 'Let’s sum up. Water freezes at zero Celsius, or 32 Fahrenheit, and boils at a hundred Celsius, or 212 Fahrenheit.', show: 'sum.0' },
        { say: 'Use referents to check that a temperature makes sense.', show: 'sum.1' },
        { say: 'And to change Celsius to Fahrenheit, multiply by nine fifths, then add 32. In part two, we convert back, and handle temperature changes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
