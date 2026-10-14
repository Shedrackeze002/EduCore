import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A rectangular pen against a wall: the wall along the top, fence on the other three sides. */
const pen: Part = {
  points: { W1: [-0.6, 4], W2: [8.6, 4], A: [0, 4], B: [0, 0], C: [8, 0], D: [8, 4], M: [4, 2], T: [4, 4] },
  items: [
    { kind: 'region', id: 'inside', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.12 },
    { kind: 'line', id: 'wall', from: 'W1', to: 'W2', tone: 'muted', weight: 7 },
    { kind: 'label', id: 'wall-name', at: 'T', tex: '\\text{barn wall}', tone: 'muted', place: 'above' },
    { kind: 'line', id: 'w1', from: 'A', to: 'B', tone: 'opp', weight: 3, label: 'w', labelSide: 'right' },
    { kind: 'line', id: 'l', from: 'B', to: 'C', tone: 'adj', weight: 3, label: '60 - 2w', labelSide: 'right' },
    { kind: 'line', id: 'w2', from: 'C', to: 'D', tone: 'opp', weight: 3, label: 'w', labelSide: 'right' },
    { kind: 'label', id: 'area', at: 'M', tex: 'A = w(60 - 2w)', place: 'center' },
  ],
};

const g = plane({ x: [0, 30], y: [0, 600], xStep: 5, yStep: 100, width: 6, height: 5, titles: { x: 'w\\text{ (m)}', y: 'A\\text{ (m}^2)' } });

const video: Explainer = {
  id: 'm201-3-4-b',
  lessonId: 'm201-3-4',
  title: 'Solving Optimization Problems, Part 2: Area and Revenue',
  thumbnailTitle: 'Area and Revenue Problems',
  thumbnail: 'pen',
  summary: 'The largest pen against a barn wall with 60 m of fencing, why the domain is 0 < w < 30, answering with the right coordinate, and the ticket price that maximizes a theatre’s revenue when each 1-dollar increase sells 10 fewer tickets.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.4 · Part 2', title: 'Area and Revenue', subtitle: 'Write a product, then find the vertex' }],
      lines: [
        { say: 'What is the largest pen you can build with a fixed length of fencing? What ticket price brings in the most money? Both answers are the vertex of a parabola.', show: 'title' },
        { say: 'In this video, you will solve area and revenue problems, by writing a quadratic function as a product, and finding its vertex.' },
      ],
    },
    {
      chapter: 'Fencing against a wall',
      layout: 'split',
      leftWidth: 500,
      left: [figure('pen', [pen])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['l = 60 - 2w', 'A(w) = w(60 - 2w)', '\\text{zeros: } w = 0,\\ w = 30', 'w = 15:\\quad l = 30,\\ A = 450'] }],
      lines: [
        { say: 'In this example, Sam has sixty metres of fencing for a rectangular pen against a barn wall, so only three sides need fencing. What is the maximum area?', show: ['pen.wall', 'pen.wall-name', 'pen.inside'] },
        { say: 'Let w be the length of each side perpendicular to the wall. Those two sides use two w, so the side parallel to the wall is sixty minus two w.', show: ['pen.w1', 'pen.w2', 'pen.l', 'm.0'], focus: ['pen.l', 'm.0'] },
        { say: 'The area, "A", is w times sixty minus two w.', show: ['pen.area', 'm.1'], focus: ['pen.area', 'm.1'] },
        { say: 'This is already in factored form. Its zeros are w equals zero and w equals thirty, so the vertex is halfway between them, at w equals fifteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Then the side along the wall is sixty minus thirty, which is thirty metres, and the maximum area is fifteen times thirty: 450 square metres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The domain and the answer',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('ar', [
          g,
          plot(g, { id: 'curve', f: (w) => w * (60 - 2 * w), from: 0, to: 30, tone: 'brand' }),
          dots(g, [{ id: 'V', x: 15, y: 450, tex: '(15, 450)', tone: 'opp', place: 'above' }]),
        ]),
      ],
      right: [
        { kind: 'bullets', id: 'b', items: ['Domain: $0 < w < 30$, since both sides must be positive.'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Answering with the wrong coordinate', md: '$15$ m is the width that **gives** the maximum. The maximum area is $450\\text{ m}^2$.' },
      ],
      lines: [
        { say: 'The graph of the area against w has its vertex at fifteen, 450.', show: ['ar.grid', 'ar.axes', 'ar.curve', 'ar.V'], focus: 'ar.V' },
        { say: 'In context, the domain is limited. w must be between zero and thirty, because both w and sixty minus two w are lengths, so both must be positive.', show: 'b.0' },
        { say: 'And answer the question asked. Fifteen metres is the width that gives the maximum, not the maximum area. The maximum area is 450 square metres.', show: 'oops' },
      ],
    },
    {
      chapter: 'Ticket prices',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{revenue} = \\text{price} \\times \\text{number sold}', 'R(x) = (20 + x)(300 - 10x)', '\\text{zeros: } x = -20,\\ x = 30:\\quad x = 5', '\\$25 \\times 250 = \\$6250'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'x is not the price', md: '$x$ counts the \\$1 increases. After finding $x$, calculate the actual price.' },
      ],
      lines: [
        { say: 'Revenue is price times the number sold. In this example, a theatre sells 300 tickets per show, at twenty dollars each. For every one-dollar increase in price, ten fewer tickets are sold. What price maximizes revenue?', show: 'm.0', focus: 'm.0' },
        { say: 'Let x be the number of one-dollar increases. The price is twenty plus x, and the number sold is 300 minus ten x. So revenue is twenty plus x, times 300 minus ten x.', show: 'm.1', focus: 'm.1' },
        { say: 'The zeros are x equals negative twenty and x equals thirty. Halfway between them is x equals five.', show: 'm.2', focus: 'm.2' },
        { say: 'But x is not the price: it counts the increases. The price is twenty plus five, which is twenty-five dollars. Then 250 tickets are sold, for a maximum revenue of 6,250 dollars.', show: ['m.3', 'tip'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In this example, a store sells $200$ shirts a week at \\$10 each. For every \\$1 increase in price, $10$ fewer shirts are sold. What price maximizes revenue?',
          choices: ['\\$15', '\\$5', '\\$2250', '\\$30'],
          answer: 0,
          working: 'The zeros of $R(x) = (10 + x)(200 - 10x)$ are $x = -10$ and $x = 20$, so $x = 5$ and the price is \\$15.',
        },
      ],
      lines: [
        { say: 'Your turn. A store sells 200 shirts a week at ten dollars each. For every one-dollar increase, ten fewer shirts are sold. What price maximizes revenue? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Revenue is ten plus x, times 200 minus ten x, with zeros at negative ten and twenty. Halfway is five, so the price is fifteen dollars. B gives x, not the price, and C gives the revenue.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Define a variable, and write the quantity as a product.', 'The vertex is halfway between the zeros.', 'Answer in context, with units, inside the domain.'] }],
      lines: [
        { say: 'Let’s sum up. Define a variable, and write the area or the revenue as a product of two expressions.', show: 'sum.0' },
        { say: 'The vertex is halfway between the zeros of that product.', show: 'sum.1' },
        { say: 'And answer in context, with units, and check that the answer is inside the domain. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
