import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A 30 by 20 photo inside a frame of width x, with every side labelled. */
function frame(): Part {
  const points: Record<string, P> = {
    o0: [0, 0], o1: [4.4, 0], o2: [4.4, 3.2], o3: [0, 3.2],
    i0: [0.6, 0.6], i1: [3.8, 0.6], i2: [3.8, 2.6], i3: [0.6, 2.6],
    xl: [0.3, 1.6], xb: [2.2, 0.3],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'band', points: ['o0', 'o1', 'o2', 'o3'], tone: 'opp', shade: 0.25, group: 'frame' },
    { kind: 'region', id: 'pic', points: ['i0', 'i1', 'i2', 'i3'], tone: 'adj', shade: 0.35, group: 'photo' },
    { kind: 'line', id: 'ib', from: 'i0', to: 'i1', tone: 'adj', label: '30', labelSide: 'left', group: 'photo' },
    { kind: 'line', id: 'ir', from: 'i1', to: 'i2', tone: 'adj', label: '20', labelSide: 'left', group: 'photo' },
    { kind: 'line', id: 'it', from: 'i2', to: 'i3', tone: 'adj', group: 'photo' },
    { kind: 'line', id: 'il', from: 'i3', to: 'i0', tone: 'adj', group: 'photo' },
    { kind: 'line', id: 'ob', from: 'o0', to: 'o1', tone: 'opp', label: '30 + 2x', labelSide: 'right', group: 'frame' },
    { kind: 'line', id: 'or', from: 'o1', to: 'o2', tone: 'opp', label: '20 + 2x', labelSide: 'right', group: 'frame' },
    { kind: 'line', id: 'ot', from: 'o2', to: 'o3', tone: 'opp', group: 'frame' },
    { kind: 'line', id: 'ol', from: 'o3', to: 'o0', tone: 'opp', group: 'frame' },
    { kind: 'label', id: 'x1', at: 'xl', tex: 'x', place: 'center', group: 'frame' },
    { kind: 'label', id: 'x2', at: 'xb', tex: 'x', place: 'center', group: 'frame' },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm202-7-3-c',
  lessonId: 'm202-7-3',
  title: 'Solving Problems with Quadratic Equations, Part 3: Borders and Break-Even Prices',
  thumbnailTitle: 'Borders and Break-Even Prices',
  thumbnail: 'fr',
  summary: 'Finding the width of a uniform frame around a 20 cm by 30 cm photo (5 cm), why a border adds 2x to each dimension, and the two break-even prices for a club selling T-shirts (10 and 20 dollars), where both roots make sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 7.3 · Part 3', title: 'Borders and Break-Even Prices', subtitle: 'More problems, more roots to judge' }],
      lines: [
        { say: 'Frames, borders and business profits all lead to quadratic equations. Each one needs a careful model, and a careful look at the roots.', show: 'title' },
        { say: 'In this video, you will find the width of a frame, and the prices at which a club breaks even.' },
      ],
    },
    {
      chapter: 'A frame of uniform width',
      layout: 'split',
      leftWidth: 500,
      left: [figure('fr', [frame()], 280)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(20 + 2x)(30 + 2x) = 1200', '4x^2 + 100x - 600 = 0', 'x^2 + 25x - 150 = 0', '(x + 30)(x - 5) = 0', 'x = 5;\\ \\ 30 \\times 40 = 1200 \\;\\checkmark'] }],
      lines: [
        { say: 'A twenty by thirty centimetre photo has a frame of uniform width. The framed photo covers 1,200 square centimetres. How wide is the frame?', show: ['fr.photo'] },
        { say: 'Let the frame be x centimetres wide. It adds x on both sides, so the outside measures twenty plus two x, by thirty plus two x.', show: 'fr.frame', focus: 'fr.frame' },
        { say: 'Multiply, and set equal to 1,200. Expanding gives four x squared, plus 100 x, plus 600, so subtracting 1,200 leaves four x squared, plus 100 x, minus 600, equals zero. Divide every term by four.', show: ['m.0', 'm.1', 'm.2'], focus: 'm.2' },
        { say: 'That factors as x plus thirty, times x minus five. Reject negative thirty: the frame is five centimetres wide. Check: thirty by forty is 1,200.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'A border goes on both sides',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A border goes on both sides', md: 'A border $x$ wide adds $2x$ to each dimension, not $x$. Sketch the shape and label all four sides before you write the equation.' }],
      lines: [
        { say: 'A common mistake is to add just x to each dimension. But the border is on both sides, so it adds two x to the width, and two x to the length. Sketch the shape, and label all four sides, before you write the equation.', show: 'oops' },
      ],
    },
    {
      chapter: 'Break-even prices',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['P = -5x^2 + 150x - 1000 = 0', 'x^2 - 30x + 200 = 0', '(x - 10)(x - 20) = 0', 'x = 10 \\text{ or } x = 20'] }],
      lines: [
        { say: 'Not every problem has a root to reject. A school club’s profit, P dollars, from selling T-shirts at x dollars each, is modelled by negative five x squared, plus 150 x, minus 1,000. At what prices does the club break even? Break even means the profit is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide every term by negative five: x squared, minus thirty x, plus 200, equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'That factors as x minus ten, times x minus twenty, so x is ten or twenty.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Both prices make sense. The club breaks even at ten dollars and at twenty dollars, and makes a profit at any price in between.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A diagonal path across a rectangular plot is $13$ m long. One side is $7$ m longer than the other. Find the side lengths.',
          choices: ['$5$ m and $12$ m', '$6$ m and $13$ m', '$3$ m and $10$ m', '$-12$ m and $-5$ m'],
          answer: 0,
          working: '$x^2 + (x + 7)^2 = 169$, so $2x^2 + 14x - 120 = 0$ and $x^2 + 7x - 60 = 0$. $(x + 12)(x - 5) = 0$; reject $-12$. The sides are $5$ m and $12$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A diagonal path across a rectangular plot is thirteen metres long. One side is seven metres longer than the other. Find the side lengths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. By the Pythagorean theorem, x squared plus x plus seven, squared, is 169, which simplifies to x squared, plus seven x, minus sixty, equals zero. Reject negative twelve: the sides are five and twelve metres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A uniform border of width $x$ adds $2x$ to each dimension.', 'Divide by a common factor to make factoring easier.', 'Sometimes both roots are valid, like two break-even prices.'] }],
      lines: [
        { say: 'Let’s sum up. A uniform border of width x adds two x to each dimension.', show: 'sum.0' },
        { say: 'Divide every term by a common factor to make factoring easier.', show: 'sum.1' },
        { say: 'And sometimes both roots are valid, like two break-even prices. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
