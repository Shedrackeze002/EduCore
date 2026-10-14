import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-4-4-b',
  lessonId: 'm103-4-4',
  title: 'Cutting and Buying Material, Part 2: Buying by Length',
  thumbnailTitle: 'Buying by the Linear Foot',
  summary: 'Pricing trim and fencing by the linear foot or metre, leaving out doorways, buying whole fixed lengths, and adding a 5% GST stated in the question.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 4.4 · Part 2', title: 'Buying by Length', subtitle: 'Linear feet, whole lengths and tax' }],
      lines: [
        { say: 'Trim, fencing, wire, pipe and rope are priced by length. What will a room’s baseboard cost?', show: 'title' },
        { say: 'In this video, you will price material by the linear foot, buy whole lengths, and add tax.' },
      ],
    },
    {
      chapter: 'The linear foot',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Linear foot', md: 'One foot of length, measured along the material. "\\$2.19 per linear foot" means each foot costs \\$2.19, whatever its width.' },
        { kind: 'math', id: 'm', lines: ['\\text{cost} = \\text{length} \\times \\text{price per unit of length}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the units', md: 'If the price is per foot but the length is in inches or yards, convert first: $12\\text{ in} = 1\\text{ ft}$, $1\\text{ yd} = 3\\text{ ft}$.' },
      ],
      lines: [
        { say: 'A linear foot is simply one foot of length, measured along the material. Baseboard at two dollars nineteen per linear foot means each foot costs two nineteen, whatever its width.', show: 'def' },
        { say: 'So the cost is the length times the price per unit of length. Round money to the nearest cent.', show: 'm.0', focus: 'm.0' },
        { say: 'Check the units first. If the price is per foot, but the length is in inches or yards, convert it.', show: 'tip' },
      ],
    },
    {
      chapter: 'Baseboard for a room',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A room is $14\\text{ ft}$ by $11\\text{ ft}$, with one $3\\text{ ft}$ doorway. Baseboard costs \\$2.49 per linear foot.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['P = 2(14 + 11) = 50\\text{ ft}', '50 - 3 = 47\\text{ ft}', '47 \\times \\$2.49 = \\$117.03'] },
      ],
      lines: [
        { say: 'A room is fourteen feet by eleven feet, with one three-foot doorway that gets no baseboard. Baseboard costs two forty-nine per linear foot.', show: 'q' },
        { say: 'The perimeter is two times fourteen plus eleven: fifty feet.', show: 'm.0', focus: 'm.0' },
        { say: 'Leave out the doorway: 47 feet.', show: 'm.1', focus: 'm.1' },
        { say: 'So the baseboard costs 47 times two forty-nine: 117 dollars and three cents.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Whole lengths and GST',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Baseboard comes in $12\\text{ ft}$ lengths at \\$24.50 each, and pieces can be joined. Add 5% GST.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['47 \\div 12 \\approx 3.92 \\;\\to\\; 4 \\text{ lengths}', '4 \\times \\$24.50 = \\$98.00', '0.05 \\times \\$98.00 = \\$4.90', '\\$98.00 + \\$4.90 = \\$102.90'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Paying for 3.92 lengths', md: 'The store sells whole lengths only. Multiply the price by the **whole** number you buy, then add the tax.' },
      ],
      lines: [
        { say: 'Building supply stores often sell trim in fixed lengths. Suppose the baseboard comes in twelve-foot lengths, at 24 dollars fifty each, pieces can be joined, and five percent G S T is added.', show: 'q' },
        { say: 'The room needs 47 feet: 47 divided by twelve is about 3.92 lengths. Round up: four lengths.', show: 'm.0', focus: 'm.0' },
        { say: 'Four lengths cost 98 dollars. The G S T is five percent of 98: four dollars ninety. So the total is 102 dollars ninety.', show: ['m.1', 'm.2', 'm.3'], focus: 'm.3' },
        { say: 'The store sells whole lengths only, so you cannot pay for 3.92 of them. Multiply by the whole number you buy, then add the tax.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Fencing costs \\$8.75 per linear metre. A rectangular yard is $20\\text{ m}$ by $15\\text{ m}$, with a $1\\text{ m}$ gate that needs no fencing. What does the fencing cost, before tax?',
          choices: ['\\$603.75', '\\$612.50', '\\$306.25', '\\$2625.00'],
          answer: 0,
          working: '$P = 2(20 + 15) = 70\\text{ m}$, minus the gate: $69\\text{ m}$. Then $69 \\times 8.75 = 603.75$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. Fencing costs eight seventy-five per linear metre. A rectangular yard is twenty metres by fifteen, with a one-metre gate that needs no fencing. What does the fencing cost, before tax? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The perimeter is seventy metres, minus the gate, 69 metres. 69 times eight seventy-five is 603 dollars seventy-five. B forgets the gate, and D uses the area.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cost = length × price per linear foot or metre.', 'Leave out doorways and gates.', 'For fixed lengths, round up, find the subtotal, then add GST.'] }],
      lines: [
        { say: 'Let’s sum up. The cost is the length times the price per linear foot, or per metre.', show: 'sum.0' },
        { say: 'Leave out doorways and gates that need no material.', show: 'sum.1' },
        { say: 'And for fixed lengths, round up to whole lengths, find the subtotal, then add the tax. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
