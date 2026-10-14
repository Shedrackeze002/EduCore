import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-3-1-c',
  lessonId: 'm203-3-1',
  title: 'Volume and Capacity, Part 3: Volume and Capacity',
  thumbnailTitle: 'Volume and Capacity',
  thumbnail: 'aq',
  summary: 'Capacity and the links 1 cm³ = 1 mL, 1000 cm³ = 1 L and 1 m³ = 1000 L, an aquarium 80 cm by 35 cm by 45 cm that holds 126 L, 16 bags of soil for a raised bed 9 in deep, and why every length needs the same unit.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.1 · Part 3', title: 'Volume and Capacity', subtitle: 'From cubic units to litres' }],
      lines: [
        { say: 'Tanks, aquariums and coolers are sold by how much they hold, in litres or gallons, not in cubic centimetres. That amount is the capacity.', show: 'title' },
        { say: 'In this video, you will change volume into capacity, and work out how many bags of soil to buy.' },
      ],
    },
    {
      chapter: 'Capacity',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Capacity', md: '**Capacity** is the amount a container can hold, usually measured in millilitres (mL), litres (L) or gallons.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 \\text{ cm}^3 = 1 \\text{ mL}', '1000 \\text{ cm}^3 = 1 \\text{ L}', '1 \\text{ m}^3 = 1000 \\text{ L}'] },
      ],
      lines: [
        { say: 'Capacity is the amount a container can hold, usually measured in millilitres, litres, or gallons.', show: 'def' },
        { say: 'Metric units link neatly. A cube one centimetre on each side holds exactly one millilitre.', show: 'm.0', focus: 'm.0' },
        { say: 'A cube ten centimetres on each side has a volume of 1,000 cubic centimetres, and holds one litre.', show: 'm.1', focus: 'm.1' },
        { say: 'And a cube one metre on each side holds 1,000 litres. For imperial units, use the conversion the question gives you.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'An aquarium',
      layout: 'split',
      leftWidth: 520,
      left: [figure('aq', [box({ l: 8, w: 3.5, h: 4.5, labels: { l: '80\\text{ cm}', w: '35\\text{ cm}', h: '45\\text{ cm}' } })], 340)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 80 \\times 35 \\times 45', '= 126\\,000 \\text{ cm}^3', '126\\,000 \\div 1000 = 126 \\text{ L}'] }],
      lines: [
        { say: 'The inside of an aquarium is eighty centimetres long, thirty-five centimetres wide, and forty-five centimetres deep. How many litres does it hold?', show: ['aq.shape', 'aq.l', 'aq.w', 'aq.h'] },
        { say: 'The volume is eighty times thirty-five times forty-five: 126,000 cubic centimetres.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Every 1,000 cubic centimetres is one litre, so divide by 1,000: the aquarium holds 126 litres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Soil for a raised bed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['9 \\text{ in} = 9 \\div 12 = 0.75 \\text{ ft}', 'V = 8 \\times 4 \\times 0.75 = 24 \\text{ ft}^3', '24 \\div 1.5 = 16 \\text{ bags}'] }],
      lines: [
        { say: 'A raised garden bed is eight feet by four feet, and is filled with soil nine inches deep. Bagged soil holds 1.5 cubic feet per bag. How many bags are needed? First, put the depth in feet: nine inches is 0.75 feet.', show: 'm.0', focus: 'm.0' },
        { say: 'The volume is eight times four times 0.75, twenty-four cubic feet.', show: 'm.1', focus: 'm.1' },
        { say: 'Each bag holds 1.5 cubic feet, so twenty-four divided by 1.5 is sixteen bags. If it had come out to a decimal, you would round up.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Mixing units',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing units', md: 'Multiplying $8\\ \\text{ft} \\times 4\\ \\text{ft} \\times 9\\ \\text{in}$ as $8 \\times 4 \\times 9 = 288$ gives a number that is neither cubic feet nor cubic inches. Change every length to the **same unit** before you multiply.' }],
      lines: [
        { say: 'A common mistake is to multiply eight times four times nine, and get 288. That number is neither cubic feet nor cubic inches, and you would buy far too much soil. Change every length to the same unit before you multiply.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cooler’s inside is $50$ cm by $30$ cm by $32$ cm. How many litres does it hold?',
          choices: ['$48$ L', '$48\\,000$ L', '$4.8$ L', '$480$ L'],
          answer: 0,
          working: '$V = 50 \\times 30 \\times 32 = 48\\,000\\ \\text{cm}^3$, and $48\\,000 \\div 1000 = 48$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. The inside of a cooler is fifty centimetres by thirty by thirty-two. How many litres does it hold? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifty times thirty times thirty-two is 48,000 cubic centimetres, and dividing by 1,000 gives forty-eight litres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1\\ \\text{cm}^3 = 1$ mL; $1000\\ \\text{cm}^3 = 1$ L; $1\\ \\text{m}^3 = 1000$ L.', 'For imperial capacity, use the conversion given.', 'Put every length in the same unit before you multiply.'] }],
      lines: [
        { say: 'Let’s sum up. One cubic centimetre is one millilitre, 1,000 cubic centimetres is one litre, and one cubic metre is 1,000 litres.', show: 'sum.0' },
        { say: 'For imperial capacity, use the conversion the question gives.', show: 'sum.1' },
        { say: 'And put every length in the same unit before you multiply. In part four, we find the volume of cylinders. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
