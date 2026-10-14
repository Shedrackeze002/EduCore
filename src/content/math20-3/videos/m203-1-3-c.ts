import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-1-3-c',
  lessonId: 'm203-1-3',
  title: 'Proportions and Unit Analysis, Part 3: Chains of Conversion Factors',
  thumbnailTitle: 'Chains of Conversion Factors',
  thumbnail: 'm',
  summary: 'Unit analysis with one conversion factor for each unit: a grain truck at 90 km/h travels 25 m/s, and a sprayer rate of 10 US gallons per acre is about 93.5 L/ha, with a check that the size of each answer makes sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.3 · Part 3', title: 'Chains of Conversion Factors', subtitle: 'One factor for each unit' }],
      lines: [
        { say: 'Some conversions change both units of a rate at once, like kilometres per hour to metres per second. The trick is to use one conversion factor for each unit.', show: 'title' },
        { say: 'In this video, you will chain conversion factors together, and check that each answer is a sensible size.' },
      ],
    },
    {
      chapter: 'Unit analysis',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Write the rate as a fraction, with its units.', 'Multiply by one conversion factor for each unit you want to change.', 'Put each unwanted unit on the **opposite** side, so it cancels.', 'Keep all the digits until the end.'] }],
      lines: [
        { say: 'Here is unit analysis, step by step. Write the rate as a fraction, with its units.', show: 'b.0' },
        { say: 'Multiply by one conversion factor for each unit you want to change.', show: 'b.1' },
        { say: 'Put each unit you want to get rid of on the opposite side, top or bottom, so it cancels.', show: 'b.2' },
        { say: 'And keep all the digits until the end, then round once.', show: 'b.3' },
      ],
    },
    {
      chapter: 'km/h to m/s',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{90 \\, \\cancel{\\text{km}}}{1 \\, \\cancel{\\text{h}}} \\times \\dfrac{1000 \\text{ m}}{1 \\, \\cancel{\\text{km}}} \\times \\dfrac{1 \\, \\cancel{\\text{h}}}{3600 \\text{ s}}', '= \\dfrac{90 \\times 1000}{3600} = 25 \\text{ m/s}'] }],
      lines: [
        { say: 'A grain truck travels at ninety kilometres per hour. What is its speed in metres per second? Kilometres are on top, so use 1,000 metres over one kilometre, with kilometres on the bottom. Hours are on the bottom, so use one hour over 3,600 seconds, with hours on top.', show: 'm.0', focus: 'm.0' },
        { say: 'The kilometres and the hours cancel, leaving metres per second. Ninety times 1,000, over 3,600, is twenty-five. The truck travels twenty-five metres every second.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A sprayer rate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{10 \\, \\cancel{\\text{gal}}}{1 \\, \\cancel{\\text{acre}}} \\times \\dfrac{3.785 \\text{ L}}{1 \\, \\cancel{\\text{gal}}} \\times \\dfrac{1 \\, \\cancel{\\text{acre}}}{0.4047 \\text{ ha}}', '= \\dfrac{10 \\times 3.785}{0.4047} \\approx 93.53', '\\approx 93.5 \\text{ L/ha}'] }],
      lines: [
        { say: 'An American manual says to spray ten US gallons per acre, but the sprayer controller uses litres per hectare. Use one US gallon is about 3.785 litres, and one acre is about 0.4047 hectares. Gallons are on top, so the gallon factor has gallons on the bottom. Acres are on the bottom, so the acre factor has acres on top.', show: 'm.0', focus: 'm.0' },
        { say: 'The gallons and the acres cancel. Ten times 3.785, over 0.4047, is about 93.53.', show: 'm.1', focus: 'm.1' },
        { say: 'Rounded to the nearest tenth, enter about 93.5 litres per hectare.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the size',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the size', md: 'A hectare is about $2.5$ acres, and a gallon is almost $4$ litres, so the number of litres per hectare should be **much bigger** than the number of gallons per acre. It is: $93.5$ is about $10 \\times 4 \\times 2.5$.' }],
      lines: [
        { say: 'Before you trust an answer, ask whether it should be bigger or smaller. A hectare is about two and a half acres, and a gallon is almost four litres.', show: 'tip' },
        { say: 'So the number of litres per hectare should be much bigger than ten, about ten times four times two and a half, or 100. Our answer, 93.5, passes the check.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A conveyor belt moves at $15$ m/s. What is its speed in km/h?',
          choices: ['$54$ km/h', '$4.17$ km/h', '$0.25$ km/h', '$900$ km/h'],
          answer: 0,
          working: '$\\dfrac{15\\text{ m}}{1\\text{ s}} \\times \\dfrac{1\\text{ km}}{1000\\text{ m}} \\times \\dfrac{3600\\text{ s}}{1\\text{ h}} = \\dfrac{15 \\times 3600}{1000} = 54$ km/h.',
        },
      ],
      lines: [
        { say: 'Your turn. A conveyor belt moves at fifteen metres per second. What is its speed in kilometres per hour? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply by one kilometre over 1,000 metres, and by 3,600 seconds over one hour. Fifteen times 3,600, over 1,000, is fifty-four kilometres per hour.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use one conversion factor for each unit you change.', 'Place each unwanted unit on the opposite side so it cancels.', 'Check that the size of the answer makes sense.'] }],
      lines: [
        { say: 'Let’s sum up. Use one conversion factor for each unit you change.', show: 'sum.0' },
        { say: 'Place each unwanted unit on the opposite side, so it cancels.', show: 'sum.1' },
        { say: 'And check that the size of the answer makes sense. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
