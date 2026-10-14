import type { DiagramItem, Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A corral along a river: three fenced sides, x, 60 − 2x and x, and the river side unfenced. */
function corral(): Part {
  const points: Record<string, P> = { a: [0, 0], b: [6, 0], c: [6, 2.6], d: [0, 2.6] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'river', from: 'a', to: 'b', tone: 'adj', weight: 7, label: '\\text{river}', labelSide: 'right' },
    { kind: 'line', id: 'f1', from: 'a', to: 'd', tone: 'opp', weight: 3, label: 'x', labelSide: 'left', group: 'fence' },
    { kind: 'line', id: 'f2', from: 'd', to: 'c', tone: 'opp', weight: 3, label: '60 - 2x', labelSide: 'left', group: 'fence' },
    { kind: 'line', id: 'f3', from: 'c', to: 'b', tone: 'opp', weight: 3, label: 'x', labelSide: 'left', group: 'fence' },
  ];
  return { points, items };
}

const g = plane({ x: [0, 32], y: [0, 500], xStep: 5, yStep: 100, every: 1, width: 6, height: 5, titles: { x: 'x\\text{ (m)}', y: 'A\\text{ (m}^2)' } });

const video: Explainer = {
  id: 'm202-6-2-c',
  lessonId: 'm202-6-2',
  title: 'Axis of Symmetry and Optimization, Part 3: Optimization Problems',
  thumbnailTitle: 'Optimization Problems',
  thumbnail: 'cr',
  summary: 'Finding the best value with a quadratic model: the 15 m by 30 m corral that gives the greatest area along a river (450 m²), the ticket price that gives the maximum revenue (15 dollars, for 3375 dollars), and answering the question that was asked.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 6.2 · Part 3', title: 'Optimization Problems', subtitle: 'The best value is at the vertex' }],
      lines: [
        { say: 'Many real decisions ask for the best value: the most area, the greatest revenue, or the least cost. When the quantity is modelled by a quadratic function, the best value is at the vertex.', show: 'title' },
        { say: 'In this video, you will design a corral, and set a ticket price.' },
      ],
    },
    {
      chapter: 'Fencing a corral',
      layout: 'split',
      leftWidth: 520,
      left: [figure('cr', [corral()], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = x(60 - 2x) = -2x^2 + 60x', 'x = -\\dfrac{60}{2(-2)} = 15', '60 - 2(15) = 30', 'A = 15 \\times 30 = 450\\text{ m}^2'] }],
      lines: [
        { say: 'Kalinda has sixty metres of fencing for a rectangular corral along a river, so only three sides need fencing. What dimensions give the greatest area?', show: ['cr.river', 'cr.fence'] },
        { say: 'First, choose a variable. Let x be the length of each side that meets the river. Then the side parallel to the river uses the rest of the fence: sixty minus two x.', focus: 'cr.fence' },
        { say: 'The area is x times sixty minus two x, which is negative two x squared, plus sixty x.', show: 'm.0', focus: 'm.0' },
        { say: 'The vertex is at x equals negative sixty over two times negative two, which is fifteen. The other side is sixty minus thirty, which is thirty, and the area is 450 square metres.', show: ['m.1', 'm.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'The area graph',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ag', [g, plot(g, { id: 'curve', f: (x) => -2 * x * x + 60 * x, from: 0, to: 30, tone: 'brand' }), dots(g, [{ id: 'V', x: 15, y: 450, tex: '(15, 450)', tone: 'opp', place: 'above right' }])], 400)],
      right: [{ kind: 'callout', id: 'ans', tone: 'key', title: 'Answer in context', md: 'A corral $15$ m by $30$ m, with the $30$ m side along the river, gives the greatest area: $450\\ \\text{m}^2$.' }],
      lines: [
        { say: 'The graph shows the area for every possible value of x, from zero to thirty. The vertex, fifteen, 450, is the highest point.', show: ['ag.grid', 'ag.axes', 'ag.curve', 'ag.V'], focus: 'ag.V' },
        { say: 'So the answer, in context, is a corral fifteen metres by thirty metres, with the thirty metre side along the river, for the greatest area of 450 square metres.', show: 'ans' },
      ],
    },
    {
      chapter: 'Setting a ticket price',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{price: } 10 + x,\\quad \\text{tickets: } 300 - 15x', 'R = (10 + x)(300 - 15x) = -15x^2 + 150x + 3000', 'x = -\\dfrac{150}{2(-15)} = 5', '\\text{price } 10 + 5 = 15;\\ \\ 15 \\times 225 = 3375'] }],
      lines: [
        { say: 'A theatre sells 300 tickets at ten dollars each. For each one dollar increase in price, it expects to sell fifteen fewer tickets. What price gives the maximum revenue? Let x be the number of one dollar increases.', show: 'm.0', focus: 'm.0' },
        { say: 'Revenue is price times tickets sold. Expanded, it is negative fifteen x squared, plus 150 x, plus 3,000.', show: 'm.1', focus: 'm.1' },
        { say: 'The vertex is at x equals negative 150 over two times negative fifteen, which is five.', show: 'm.2', focus: 'm.2' },
        { say: 'But x is the number of increases, not the price. The question asks for the price: ten plus five, which is fifteen dollars. Then 225 tickets sell, for a maximum revenue of 3,375 dollars.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A farmer has $80$ m of fencing for a rectangular pen against a barn wall, so only three sides need fencing. What is the greatest possible area?',
          choices: ['$800\\ \\text{m}^2$', '$400\\ \\text{m}^2$', '$1600\\ \\text{m}^2$', '$20\\ \\text{m}^2$'],
          answer: 0,
          working: '$A = x(80 - 2x) = -2x^2 + 80x$. The vertex is at $x = 20$, so the pen is $20$ m by $40$ m, and $A = 800\\ \\text{m}^2$. D gives $x$, not the area.',
        },
      ],
      lines: [
        { say: 'Your turn. A farmer has eighty metres of fencing for a rectangular pen against a barn wall, so only three sides need fencing. What is the greatest possible area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The area is x times eighty minus two x. The vertex is at x equals twenty, so the pen is twenty by forty metres, for an area of 800 square metres. D answers with x, not the area.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Choose a variable and write a quadratic model.', 'Find the vertex with $x = -\\dfrac{b}{2a}$.', 'Answer the question that was asked, with units.'] }],
      lines: [
        { say: 'Let’s sum up. To optimize, choose a variable and write a quadratic model for the quantity.', show: 'sum.0' },
        { say: 'Find the vertex with x equals negative b over two "a".', show: 'sum.1' },
        { say: 'And answer the question that was asked, with units. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
