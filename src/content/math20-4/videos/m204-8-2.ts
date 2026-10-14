import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-8-2',
  lessonId: 'm204-8-2',
  title: 'Maps, Part 1: Map Scales',
  thumbnailTitle: 'Map Scales',
  thumbnail: 'm',
  summary: 'Reading a map scale in words (1 cm represents 5 km, so 7 cm is 35 km), and a ratio map scale like 1 : 250 000 (1 cm is 2.5 km, so 6 cm is 15 km), changing centimetres to kilometres by dividing by 100 000.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.2 · Part 1', title: 'Map Scales', subtitle: 'How far is it really?' }],
      lines: [
        { say: 'Truck drivers, delivery workers, hikers and farm workers all read maps. A phone is handy, but a paper map still works when there is no signal.', show: 'title' },
        { say: 'In this video, you will use a map scale to find real distances.' },
      ],
    },
    {
      chapter: 'Map scale',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Map scale', md: 'The **map scale** tells how a distance on the map compares with the real distance. "$1$ cm represents $5$ km" means each centimetre on the map stands for $5$ kilometres on the ground.' },
        { kind: 'text', id: 'q', md: 'The campground is $7$ cm from the park gate on the map.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['7 \\times 5 = 35 \\text{ km}'] },
      ],
      lines: [
        { say: 'The map scale tells how a distance on the map compares with the real distance. One centimetre represents five kilometres means each centimetre on the map stands for five kilometres on the ground.', show: 'def' },
        { say: 'On a park map with this scale, the campground is seven centimetres from the park gate. How far is it really?', show: 'q' },
        { say: 'Each centimetre is five kilometres, so multiply: seven times five is 35. The campground is 35 kilometres from the gate.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A ratio scale',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['1 : 250\\,000', '1 \\text{ km} = 100\\,000 \\text{ cm}', '250\\,000 \\div 100\\,000 = 2.5 \\text{ km}'] },
      ],
      lines: [
        { say: 'Many maps use a ratio scale, like one to 250 thousand. That means one centimetre on the map is 250 thousand centimetres on the ground.', show: 'f.0', focus: 'f.0' },
        { say: '250 thousand centimetres is hard to picture, so change it to kilometres. One kilometre is 100 thousand centimetres: 100 centimetres in a metre, times 1,000 metres in a kilometre.', show: 'f.1', focus: 'f.1' },
        { say: 'So divide by 100 thousand: 250 thousand divided by 100 thousand is 2.5. On this map, one centimetre represents 2.5 kilometres.', show: 'f.2', focus: 'f.2' },
      ],
    },
    {
      chapter: 'Two towns',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A county map has a scale of $1 : 250\\,000$. Two towns are $6$ cm apart on the map.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 \\text{ cm represents } 2.5 \\text{ km}', '6 \\times 2.5 = 15 \\text{ km}'] },
      ],
      lines: [
        { say: 'A county map has a scale of one to 250 thousand. Two towns are six centimetres apart on the map. How far apart are they?', show: 'q' },
        { say: 'One centimetre represents 2.5 kilometres, as we just found.', show: 'm.0', focus: 'm.0' },
        { say: 'Six times 2.5 is fifteen. The towns are fifteen kilometres apart, about a ten-minute drive on a highway.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A map has a scale of $1 : 500\\,000$. Two lakes are $4$ cm apart on the map. How far apart are they?',
          choices: ['$20$ km', '$2\\,000\\,000$ km', '$5$ km', '$125$ km'],
          answer: 0,
          working: '$1$ cm represents $500\\,000 \\div 100\\,000 = 5$ km. $4 \\times 5 = 20$ km. B forgets to change centimetres to kilometres, and C is the distance for $1$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A map has a scale of one to 500 thousand. Two lakes are four centimetres apart on the map. How far apart are they? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 500 thousand divided by 100 thousand is five, so one centimetre represents five kilometres. Four times five is twenty kilometres. B forgets to change to kilometres, and C is only one centimetre’s worth.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply the map distance by the scale.', '1 km = 100 000 cm.', 'Ratio scale: divide by 100 000 to get km per cm.'] }],
      lines: [
        { say: 'Let’s sum up. Multiply a map distance by the scale to get the real distance.', show: 'sum.0' },
        { say: 'One kilometre is 100 thousand centimetres.', show: 'sum.1' },
        { say: 'So for a ratio scale, divide by 100 thousand to find the kilometres in each centimetre. In part two, we follow a route with several legs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
