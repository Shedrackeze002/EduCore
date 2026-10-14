import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-10, 2], y: [-22, 6], yStep: 2, every: 0, width: 8, height: 8 });
const g2 = plane({ x: [0, 5], y: [0, 30], yStep: 5, width: 6, height: 5, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });
const land = (20 + Math.sqrt(430)) / 10;

const video: Explainer = {
  id: 'm201-3-4',
  lessonId: 'm201-3-4',
  title: 'Solving Optimization Problems, Part 1: Maximum and Minimum Values',
  thumbnailTitle: 'Maximum and Minimum Values',
  thumbnail: 'ht',
  summary: 'What optimization means, three ways to locate the vertex (vertex form, x = −b/(2a), and halfway between the zeros), the smallest product of two numbers that differ by 8, and the maximum height of a ball. Part 2 solves area and revenue problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.4 · Part 1', title: 'Optimization', subtitle: 'Maximum and minimum values' }],
      lines: [
        { say: 'How high does a punted football go? What is the smallest product two numbers can have? Each answer is the vertex of a parabola.', show: 'title' },
        { say: 'In this video, you will find maximum and minimum values, and use them to solve a number problem and a height problem.' },
      ],
    },
    {
      chapter: 'Optimal values',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Maximum and minimum value', md: 'The **maximum value** of a quadratic function that opens down, or the **minimum value** of one that opens up, is the $y$-coordinate of its vertex. Finding it is **optimization**.' },
        { kind: 'bullets', id: 'b', items: ['Vertex form $y = a(x - p)^2 + q$: the vertex is $(p, q)$.', 'Standard form: $x = -\\dfrac{b}{2a}$.', 'Factored form $y = a(x - r)(x - s)$: $x = \\dfrac{r + s}{2}$.'] },
      ],
      lines: [
        { say: 'The maximum value of a quadratic function that opens down, or the minimum value of one that opens up, is the y-coordinate of its vertex. Finding it is called optimization.', show: 'def' },
        { say: 'There are three ways to locate the vertex. In vertex form, the vertex is p, q.', show: 'b.0' },
        { say: 'In standard form, use x equals negative b over two "a".', show: 'b.1' },
        { say: 'And in factored form, "a" times x minus r, times x minus s, the zeros are r and s. The vertex is halfway between them, at x equals r plus s, over two.', show: 'b.2' },
        { say: 'Always answer the question asked. The maximum or minimum value is the y-coordinate, and where it happens is the x-coordinate.' },
      ],
    },
    {
      chapter: 'A number problem',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('np', [
          g1,
          plot(g1, { id: 'curve', f: (x) => x * (x + 8), tone: 'brand' }),
          dots(g1, [
            { id: 'z1', x: -8, y: 0, tex: '-8', tone: 'adj', place: 'below left', group: 'zeros' },
            { id: 'z2', x: 0, y: 0, tex: '0', tone: 'adj', place: 'below right', group: 'zeros' },
            { id: 'V', x: -4, y: -16, tex: '(-4, -16)', tone: 'opp', place: 'below' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(x) = x(x + 8)', '\\text{zeros: } x = 0,\\ x = -8', 'x = \\dfrac{0 + (-8)}{2} = -4', '(-4)(4) = -16'] }],
      lines: [
        { say: 'Two numbers differ by eight. What is the smallest possible product? Let the numbers be x and x plus eight. Their product is P of x equals x times x plus eight.', show: ['np.grid', 'np.axes', 'np.curve', 'm.0'], focus: 'm.0' },
        { say: 'This is already in factored form, so the zeros are zero and negative eight.', show: ['m.1', 'np.zeros'], focus: ['m.1', 'np.zeros'] },
        { say: 'The parabola opens up, so the vertex is a minimum, halfway between the zeros, at x equals negative four.', show: 'm.2', focus: 'm.2' },
        { say: 'So the numbers are negative four and four, and the smallest possible product is negative sixteen.', show: ['m.3', 'np.V'], focus: ['m.3', 'np.V'] },
      ],
    },
    {
      chapter: 'Maximum height',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('ht', [
          g2,
          plot(g2, { id: 'path', f: (t) => -5 * t * t + 20 * t + 1.5, from: 0, to: land, tone: 'opp' }),
          dots(g2, [{ id: 'V', x: 2, y: 21.5, tex: '(2, 21.5)', tone: 'opp', place: 'above' }]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h(t) = -5t^2 + 20t + 1.5', 't = -\\dfrac{20}{2(-5)} = 2', 'h(2) = -20 + 40 + 1.5 = 21.5'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep full precision', md: 'With $-4.9t^2$, the time $-\\dfrac{b}{2a}$ is often a long decimal. Keep it in your calculator, and round only the final answer.' },
      ],
      lines: [
        { say: 'In this example, a ball’s height in metres, t seconds after it is kicked, is h of t equals negative five t squared, plus twenty t, plus 1.5. Find its maximum height, and when it occurs.', show: ['ht.grid', 'ht.axes', 'ht.path', 'm.0'], focus: 'm.0' },
        { say: '"a" is negative, so the vertex is a maximum. t equals negative twenty, over two times negative five, which is two.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute: h of two is negative twenty, plus forty, plus 1.5, which is 21.5. The maximum height is 21.5 metres, two seconds after the kick.', show: ['m.2', 'ht.V'], focus: ['m.2', 'ht.V'] },
        { say: 'When the coefficient is negative 4.9, the time is often a long decimal. Keep the full value in your calculator when you substitute it, and round only the final answer.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two numbers have a sum of $20$. What is the largest possible product?',
          choices: ['$100$', '$10$', '$20$', '$400$'],
          answer: 0,
          working: 'The product $P = x(20 - x)$ has zeros $0$ and $20$, so the vertex is at $x = 10$. Both numbers are $10$, and $P = 100$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two numbers have a sum of twenty. What is the largest possible product? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The numbers are x and twenty minus x, and their product, x times twenty minus x, has zeros at zero and twenty. Halfway is ten, so both numbers are ten, and the product is 100. B gives the number, not the product.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A maximum or minimum value is the $y$-coordinate of the vertex.', 'Vertex form, $x = -\\dfrac{b}{2a}$, or halfway between the zeros.', 'Answer the question asked: the value, or where it happens.'] }],
      lines: [
        { say: 'Let’s sum up. A maximum or minimum value is the y-coordinate of the vertex.', show: 'sum.0' },
        { say: 'Find the vertex from vertex form, from x equals negative b over two "a", or halfway between the zeros.', show: 'sum.1' },
        { say: 'And answer the question asked: the value itself, or where it happens. In part two, we solve area and revenue problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
