import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-1-1',
  lessonId: 'm103-1-1',
  title: 'Rates and Proportions, Part 1: Ratios, Rates and Unit Rates',
  thumbnailTitle: 'Rates and Unit Rates',
  summary: 'Ratios compare quantities with the same units and rates compare different units. Finding unit rates such as average speed and litres per 100 km, changing minutes to hours, and comparing unit rates fairly. Part 2 covers proportions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 1.1 · Part 1', title: 'Ratios, Rates and Unit Rates', subtitle: 'Comparing two quantities' }],
      lines: [
        { say: 'A trucker plans how much diesel a run will take. A painter decides how many cans to buy.', show: 'title' },
        { say: 'Each of them compares two quantities, using rates and proportions. In this video, you will find and compare unit rates. In part two, you will solve proportions.' },
      ],
    },
    {
      chapter: 'Ratios and rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ratio and rate', md: 'A **ratio** compares quantities with the **same** units. A **rate** compares quantities with **different** units.' },
        { kind: 'math', id: 'm', lines: ['2 : 3 \\quad \\text{(cement to sand)}', '450\\text{ km in } 5\\text{ h}, \\qquad \\$12.50 \\text{ for } 5\\text{ kg}'] },
      ],
      lines: [
        { say: 'A ratio compares two quantities of the same kind. A concrete mix might use two shovels of cement for every three shovels of sand: a ratio of two to three.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'A rate compares quantities measured in different units, like 450 kilometres in five hours, or twelve dollars fifty for five kilograms.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Unit rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit rate', md: 'A rate for **one** unit, such as $84\\text{ km/h}$ or \\$2.50/kg. Divide by the number of units to find it.' },
        { kind: 'text', id: 'q', md: 'Rosa drives a gravel truck $378\\text{ km}$ in $4$ h $30$ min. What is her average speed?', size: 'md' },
        { kind: 'math', id: 'm', lines: ['4\\text{ h } 30\\text{ min} = 4.5\\text{ h} \\quad \\bad{\\text{not } 4.30\\text{ h}}', '378 \\div 4.5 = 84\\text{ km/h}'] },
      ],
      lines: [
        { say: 'A rate is easiest to use when it is written for one unit, like 84 kilometres per hour, or two dollars fifty per kilogram. That is a unit rate. To find one, divide by the number of units.', show: 'def' },
        { say: 'Rosa drives a gravel truck 378 kilometres in four hours and thirty minutes. What is her average speed?', show: 'q' },
        { say: 'First, write the time in hours. There are sixty minutes in an hour, so thirty minutes is half an hour, and the time is 4.5 hours, not 4.30. Divide minutes by sixty.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide the distance by the time: 378 divided by 4.5 is 84. Her average speed is 84 kilometres per hour.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Litres per 100 km',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A delivery van used $46.8\\text{ L}$ of diesel to travel $520\\text{ km}$. Find its fuel use in L/100 km.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\dfrac{46.8\\text{ L}}{520\\text{ km}} = \\dfrac{x}{100\\text{ km}}', 'x = \\dfrac{46.8 \\times 100}{520} = 9', '9\\text{ L/100 km}'] },
      ],
      lines: [
        { say: 'Fuel use is usually written per hundred kilometres, not per kilometre, because the numbers are easier to read. A delivery van used 46.8 litres of diesel to travel 520 kilometres. Find its fuel use.', show: 'q' },
        { say: 'Set up equal rates: 46.8 litres per 520 kilometres equals x litres per hundred kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by a hundred: x is 46.8 times a hundred, divided by 520, which is nine. The van uses nine litres per hundred kilometres.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Comparing rates',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{Amara: } 312 \\div 6 = 52 \\text{ words/min}', '\\text{Jordan: } 275 \\div 5 = 55 \\text{ words/min}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Is bigger better?', md: 'For speed or pay, a bigger unit rate is better. For fuel use or price per kilogram, a **smaller** one is better.' },
      ],
      lines: [
        { say: 'Unit rates let you compare fairly, even when the amounts are different. Amara types 312 words in six minutes: 52 words per minute.', show: 'm.0', focus: 'm.0' },
        { say: 'Jordan types 275 words in five minutes: 55 words per minute. So Jordan types faster, even though Amara typed more words in total.', show: 'm.1', focus: 'm.1' },
        { say: 'Always ask what the number means. For speed or pay, bigger is better. For fuel use, or a price per kilogram, smaller is better.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A courier drives $207\\text{ km}$ in $2$ h $15$ min. What is the average speed?',
          choices: ['$92\\text{ km/h}$', '$96.3\\text{ km/h}$', '$103.5\\text{ km/h}$', '$86\\text{ km/h}$'],
          answer: 0,
          working: '$15\\text{ min} = 0.25\\text{ h}$, so the time is $2.25\\text{ h}$, and $207 \\div 2.25 = 92\\text{ km/h}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A courier drives 207 kilometres in two hours fifteen minutes. What is the average speed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifteen minutes is 0.25 hours, so the time is 2.25 hours, and 207 divided by 2.25 is 92 kilometres per hour. B treats the time as 2.15 hours, and C leaves out the minutes.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A ratio compares the same units; a rate compares different units.', 'A unit rate is a rate for one unit: divide to find it.', 'Change minutes to a decimal part of an hour first.'] }],
      lines: [
        { say: 'Let’s sum up. A ratio compares quantities with the same units, and a rate compares different units.', show: 'sum.0' },
        { say: 'A unit rate is a rate for one unit. Divide to find it, and compare unit rates to decide what is faster or cheaper.', show: 'sum.1' },
        { say: 'And change minutes to a decimal part of an hour before you divide. In part two, we solve proportions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
