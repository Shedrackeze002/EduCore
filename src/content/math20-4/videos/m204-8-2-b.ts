import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A two-leg route on a county map: farm to grain elevator to town. */
function route(): Part {
  const points: Record<string, P> = { f: [0.75, 0.9], e: [4.25, 3.1], t: [7.25, 1.3] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'l1', from: 'f', to: 'e', tone: 'brand', weight: 4, label: '4.1\\text{ cm}', labelSide: 'left' },
    { kind: 'line', id: 'l2', from: 'e', to: 't', tone: 'adj', weight: 4, label: '3.5\\text{ cm}', labelSide: 'left' },
    { kind: 'label', id: 'pf', at: 'f', tex: '\\text{Farm}', place: 'below', dot: true, tone: 'ink', group: 'places' },
    { kind: 'label', id: 'pe', at: 'e', tex: '\\text{Grain elevator}', place: 'above', dot: true, tone: 'ink', group: 'places' },
    { kind: 'label', id: 'pt', at: 't', tex: '\\text{Town}', place: 'below', dot: true, tone: 'ink', group: 'places' },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm204-8-2-b',
  lessonId: 'm204-8-2',
  title: 'Maps, Part 2: Routes with Several Legs',
  thumbnailTitle: 'Routes with Legs',
  thumbnail: 'rt',
  summary: 'Finding the length of a road route made of straight legs: adding the map lengths first (4.1 cm + 3.5 cm = 7.6 cm), then using the scale (7.6 × 5 = 38 km), and checking that every leg is used.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.2 · Part 2', title: 'Routes with Legs', subtitle: 'Add the legs, then scale' }],
      lines: [
        { say: 'Roads are rarely one straight line. A trip often goes from one place to another, then on to a third.', show: 'title' },
        { say: 'In this video, you will find the real length of a route with several legs.' },
      ],
    },
    {
      chapter: 'From the farm to town',
      layout: 'split',
      leftWidth: 700,
      left: [figure('rt', [route()], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4.1 + 3.5 = 7.6 \\text{ cm}', '7.6 \\times 5 = 38 \\text{ km}'] }],
      lines: [
        { say: 'A road route is often made of straight pieces called legs. On this county map, one centimetre represents five kilometres. How far is the drive from the farm to the grain elevator, and then on to town?', show: 'rt.places' },
        { say: 'The first leg, from the farm to the elevator, is 4.1 centimetres on the map.', show: 'rt.l1', focus: 'rt.l1' },
        { say: 'The second leg, from the elevator to town, is 3.5 centimetres.', show: 'rt.l2', focus: 'rt.l2' },
        { say: 'Add the map lengths first: 4.1 plus 3.5 is 7.6 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Then use the scale: 7.6 times five is 38. The drive is 38 kilometres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two ways, one answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['4.1 \\times 5 = 20.5 \\text{ km}', '3.5 \\times 5 = 17.5 \\text{ km}', '20.5 + 17.5 = 38 \\text{ km}'] }],
      lines: [
        { say: 'You could also scale each leg, then add. The first leg is 4.1 times five: 20.5 kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'The second leg is 3.5 times five: 17.5 kilometres.', show: 'm.1', focus: 'm.1' },
        { say: 'Together, 38 kilometres, the same answer. Adding the map lengths first means only one multiplication, so there is less chance of a slip.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Every leg',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting a leg', md: 'Use every leg of the route. Check that the number of lengths you add matches the number of legs on the map.' }],
      lines: [
        { say: 'A common mistake is to forget a leg. Use every leg of the route. Check that the number of lengths you add matches the number of legs on the map. Two legs here means two lengths.', show: 'oops' },
        { say: 'Also, the straight line from the farm to town would be shorter than the route. But you cannot drive through fields, so the route is what counts.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A route has three legs: $2.4$ cm, $1.8$ cm and $3.3$ cm on the map. On the map, $1$ cm represents $4$ km. How long is the route?',
          choices: ['$30$ km', '$22.8$ km', '$7.5$ km', '$9.6$ km'],
          answer: 0,
          working: 'Map total: $2.4 + 1.8 + 3.3 = 7.5$ cm. Real: $7.5 \\times 4 = 30$ km. B leaves out the middle leg, and C is the map length.',
        },
      ],
      lines: [
        { say: 'Your turn. A route has three legs: 2.4 centimetres, 1.8 centimetres and 3.3 centimetres on the map. On the map, one centimetre represents four kilometres. How long is the route? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The map total is 7.5 centimetres, and 7.5 times four is thirty kilometres. B leaves out the middle leg, and C is the map length, not the real distance.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A route is made of straight legs.', 'Add the map lengths, then use the scale.', 'Count the legs, and use each one.'] }],
      lines: [
        { say: 'Let’s sum up. A route is made of straight pieces called legs.', show: 'sum.0' },
        { say: 'Add the map lengths of the legs, then use the scale.', show: 'sum.1' },
        { say: 'And count the legs, so you use each one. In part three, we find places on a grid map. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
