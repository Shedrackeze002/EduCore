import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** One square foot, split into 144 square inches. */
function squareFoot(): Part {
  const points: Record<string, P> = { a: [0, 0], b: [12, 0], c: [12, 12], d: [0, 12] };
  const items: DiagramItem[] = [{ kind: 'region', id: 'fill', points: ['a', 'b', 'c', 'd'], tone: 'brand', shade: 0.12, group: 'square' }];
  for (let i = 1; i < 12; i++) {
    points[`v${i}a`] = [i, 0];
    points[`v${i}b`] = [i, 12];
    points[`h${i}a`] = [0, i];
    points[`h${i}b`] = [12, i];
    items.push(
      { kind: 'line', id: `v${i}`, from: `v${i}a`, to: `v${i}b`, tone: 'muted', weight: 1, group: 'inches' },
      { kind: 'line', id: `h${i}`, from: `h${i}a`, to: `h${i}b`, tone: 'muted', weight: 1, group: 'inches' },
    );
  }
  items.push(
    { kind: 'line', id: 'bottom', from: 'a', to: 'b', tone: 'adj', label: '12\\text{ in}', labelSide: 'right', group: 'square' },
    { kind: 'line', id: 'right', from: 'b', to: 'c', tone: 'opp', label: '12\\text{ in}', labelSide: 'right', group: 'square' },
    { kind: 'line', id: 'top', from: 'c', to: 'd', group: 'square' },
    { kind: 'line', id: 'left', from: 'd', to: 'a', group: 'square' },
  );
  return { points, items };
}

const video: Explainer = {
  id: 'm203-2-3',
  lessonId: 'm203-2-3',
  title: 'Surface Area on the Job, Part 1: Converting Square Units',
  thumbnailTitle: 'Converting Square Units',
  thumbnail: 'sq',
  summary: 'Why area conversions square the length factor (1 ft² = 144 in², 1 yd² = 9 ft², 1 m² = 10 000 cm²), changing 3456 in² of sheet metal to 24 ft² and 2.5 m² of glass to 25 000 cm², and the mistake of dividing by 12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.3 · Part 1', title: 'Converting Square Units', subtitle: 'Square the length factor' }],
      lines: [
        { say: 'A painter quotes a job, a roofer orders shingles, and an HVAC crew prices sheet metal. Each one starts with a surface area, and often has to change it to a different unit.', show: 'title' },
        { say: 'In this video, you will convert between square units, and see why the usual length factor is not enough.' },
      ],
    },
    {
      chapter: 'One square foot',
      layout: 'split',
      leftWidth: 520,
      left: [figure('sf', [squareFoot()], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 \\text{ ft} = 12 \\text{ in}', '1 \\text{ ft}^2 = 12 \\times 12 = 144 \\text{ in}^2'] }],
      lines: [
        { say: 'Area units are squares. One square foot is a square, one foot on each side. One foot is twelve inches.', show: ['sf.square', 'm.0'], focus: 'm.0' },
        { say: 'So a square foot is twelve inches by twelve inches. Split it into square inches, and you get twelve rows of twelve: 144 square inches.', show: ['sf.inches', 'm.1'], focus: ['sf.inches', 'm.1'] },
        { say: 'The length factor, twelve, is squared for area.' },
      ],
    },
    {
      chapter: 'Square the factor',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Length', 'Area'], rows: [['$1\\ \\text{ft} = 12\\ \\text{in}$', '$1\\ \\text{ft}^2 = 12 \\times 12 = 144\\ \\text{in}^2$'], ['$1\\ \\text{yd} = 3\\ \\text{ft}$', '$1\\ \\text{yd}^2 = 3 \\times 3 = 9\\ \\text{ft}^2$'], ['$1\\ \\text{m} = 100\\ \\text{cm}$', '$1\\ \\text{m}^2 = 100 \\times 100 = 10\\,000\\ \\text{cm}^2$']] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Which way?', md: 'To change to a **smaller** unit, multiply. To change to a **bigger** unit, divide.' },
      ],
      lines: [
        { say: 'The same idea works for every unit. One square foot is 144 square inches.', show: 't.0', focus: 't.0' },
        { say: 'One yard is three feet, so one square yard is three times three, nine square feet.', show: 't.1', focus: 't.1' },
        { say: 'And one metre is 100 centimetres, so one square metre is 100 times 100: 10,000 square centimetres.', show: 't.2', focus: 't.2' },
        { say: 'To change to a smaller unit, you need more of them, so multiply. To change to a bigger unit, divide.', show: 'k' },
      ],
    },
    {
      chapter: 'Two conversions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['3456 \\text{ in}^2 \\div 144 = 24 \\text{ ft}^2', '2.5 \\text{ m}^2 \\times 10\\,000 = 25\\,000 \\text{ cm}^2'] }],
      lines: [
        { say: 'A duct needs 3,456 square inches of sheet metal. How many square feet is that? Square feet are bigger, so divide by 144: twenty-four square feet.', show: 'm.0', focus: 'm.0' },
        { say: 'A window pane has an area of 2.5 square metres. How many square centimetres is that? Square centimetres are smaller, so multiply by 10,000: 25,000 square centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Using the length factor',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the length factor for area', md: '$3456\\ \\text{in}^2$ is **not** $3456 \\div 12 = 288\\ \\text{ft}^2$. Dividing by $12$ converts only one side of each square. In the same way, $1\\ \\text{m}^2$ is $10\\,000\\ \\text{cm}^2$, not $100\\ \\text{cm}^2$.' }],
      lines: [
        { say: 'A common mistake is to use the length factor. 3,456 divided by twelve gives 288, which is twelve times too big. Dividing by twelve converts only one side of each square.', show: 'oops' },
        { say: 'In the same way, one square metre is 10,000 square centimetres, not 100. Picture the square, and square the factor.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A room needs $45$ square yards of carpet. How many square feet is that?',
          choices: ['$405\\ \\text{ft}^2$', '$135\\ \\text{ft}^2$', '$5\\ \\text{ft}^2$', '$15\\ \\text{ft}^2$'],
          answer: 0,
          working: 'Square feet are smaller, so multiply by $3 \\times 3 = 9$: $45 \\times 9 = 405\\ \\text{ft}^2$. B multiplies by $3$ only.',
        },
      ],
      lines: [
        { say: 'Your turn. A room needs forty-five square yards of carpet. How many square feet is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Square feet are smaller, so multiply by three times three, nine: 405 square feet. B multiplies by three only.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Square the length factor for area.', '$1\\ \\text{ft}^2 = 144\\ \\text{in}^2$, $1\\ \\text{yd}^2 = 9\\ \\text{ft}^2$, $1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$.', 'Smaller unit: multiply. Bigger unit: divide.'] }],
      lines: [
        { say: 'Let’s sum up. For area, square the length factor.', show: 'sum.0' },
        { say: 'One square foot is 144 square inches, one square yard is nine square feet, and one square metre is 10,000 square centimetres.', show: 'sum.1' },
        { say: 'And multiply to change to a smaller unit, or divide to change to a bigger one. In part two, we work out how much to buy, and what it costs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
