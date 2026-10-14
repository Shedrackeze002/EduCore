import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-3-3-b',
  lessonId: 'm203-3-3',
  title: 'Volume on the Job, Part 2: Concrete, Water and Fuel',
  thumbnailTitle: 'Concrete, Water and Fuel',
  thumbnail: 'tank',
  summary: 'A four-step plan for volume jobs, the 2.4 m³ of concrete for a garage pad 10 cm thick, why forgetting to convert the thickness gives 100 times too much, and the cost of filling a 240 L diesel transfer tank (350.16 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.3 · Part 2', title: 'Concrete, Water and Fuel', subtitle: 'A plan for every volume job' }],
      lines: [
        { say: 'A contractor orders concrete, a farmer fills a fuel tank, and a homeowner fills a pool. Different jobs, but the same plan works for all of them.', show: 'title' },
        { say: 'In this video, you will follow a four-step plan to find how much is needed, and what it costs.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Sketch** the shape and label it.', 'Put every length in **one unit**.', 'Find the **volume**.', '**Convert** to the unit you buy in, then find the cost.'] }],
      lines: [
        { say: 'Here is the plan. First, sketch the shape, and label every measurement.', show: 'b.0' },
        { say: 'Second, put every length in one unit.', show: 'b.1' },
        { say: 'Third, find the volume.', show: 'b.2' },
        { say: 'And fourth, convert to the unit you buy in, such as litres or cubic yards, then find the cost.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A garage pad',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['10 \\text{ cm} = 0.1 \\text{ m}', 'V = 6 \\times 4 \\times 0.1 = 2.4 \\text{ m}^3'] }],
      lines: [
        { say: 'A garage pad is six metres by four metres, and ten centimetres thick. How much concrete is needed? Put the thickness in metres: ten centimetres is 0.1 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The volume is six times four times 0.1: 2.4 cubic metres of concrete.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Forgetting the thickness',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A thickness in different units', md: '$6 \\times 4 \\times 10 = 240$ treats $10$ cm as $10$ m. That orders $100$ times too much concrete. Thin slabs are usually measured in centimetres or inches, so convert first.' }],
      lines: [
        { say: 'A common slip is to multiply six times four times ten, and get 240. That treats ten centimetres as ten metres, and orders 100 times too much concrete. Thin slabs are usually measured in centimetres or inches, so always convert the thickness first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Filling a diesel tank',
      layout: 'split',
      leftWidth: 520,
      left: [figure('dt', [box({ l: 6, w: 2.5, h: 2, labels: { l: '120\\text{ cm}', w: '50\\text{ cm}', h: '40\\text{ cm}' } })], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 120 \\times 50 \\times 40', '= 240\\,000 \\text{ cm}^3', '240\\,000 \\div 1000 = 240 \\text{ L}', '240 \\times \\$1.459 = \\$350.16'] }],
      lines: [
        { say: 'A rectangular transfer tank is 120 centimetres long, fifty wide, and forty high inside. In this example, diesel costs 145.9 cents per litre. What does it cost to fill the empty tank?', show: ['dt.shape', 'dt.l', 'dt.w', 'dt.h'] },
        { say: 'The volume is 120 times fifty times forty: 240,000 cubic centimetres.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Every 1,000 cubic centimetres is one litre, so the tank holds 240 litres.', show: 'm.2', focus: 'm.2' },
        { say: '240 litres at 145.9 cents per litre comes to three hundred fifty dollars and sixteen cents to fill the tank.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sidewalk section is $10$ m long, $1.5$ m wide and $8$ cm thick. How much concrete does it need?',
          choices: ['$1.2\\ \\text{m}^3$', '$120\\ \\text{m}^3$', '$12\\ \\text{m}^3$', '$0.12\\ \\text{m}^3$'],
          answer: 0,
          working: '$8$ cm $= 0.08$ m, so $V = 10 \\times 1.5 \\times 0.08 = 1.2\\ \\text{m}^3$. B forgets to convert the thickness.',
        },
      ],
      lines: [
        { say: 'Your turn. A sidewalk section is ten metres long, 1.5 metres wide, and eight centimetres thick. How much concrete does it need? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eight centimetres is 0.08 metres, so ten times 1.5 times 0.08 is 1.2 cubic metres. B forgets to convert the thickness.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sketch, one unit, volume, convert.', 'Convert thin thicknesses before you multiply.', 'Cost = amount in the unit you buy × price per unit.'] }],
      lines: [
        { say: 'Let’s sum up. Sketch the shape, put every length in one unit, find the volume, then convert.', show: 'sum.0' },
        { say: 'Convert thin thicknesses before you multiply.', show: 'sum.1' },
        { say: 'And the cost is the amount, in the unit you buy, times the price per unit. In part three, we count truckloads and filling times. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
