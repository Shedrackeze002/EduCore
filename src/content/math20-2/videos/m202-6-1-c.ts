import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [0, 3.5], y: [0, 22], xStep: 0.5, yStep: 5, every: 2, width: 7, height: 6, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });
const h = (t: number) => -5 * t * t + 10 * t + 15;

/** A dashed horizontal line at a height of 15 m. */
const level: Part = {
  points: { l0: g.map(0, 15), l1: g.map(3.5, 15) },
  items: [{ kind: 'line', id: 'h15', from: 'l0', to: 'l1', tone: 'theta', dashed: true }],
};

const video: Explainer = {
  id: 'm202-6-1-c',
  lessonId: 'm202-6-1',
  title: 'Quadratic Functions and Their Graphs, Part 3: Parabolas in Context',
  thumbnailTitle: 'Parabolas in Context',
  thumbnail: 'bl',
  summary: 'Reading the flight of a ball tossed from a 15 m balcony: its maximum height of 20 m after 1 s, its starting height, when it lands, when it is back at 15 m, the domain and range in context, and break-even prices on a profit graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 6.1 · Part 3', title: 'Parabolas in Context', subtitle: 'What each feature means' }],
      lines: [
        { say: 'In a real situation, every feature of a parabola has a meaning: the vertex, the intercepts, even the domain and range.', show: 'title' },
        { say: 'In this video, you will read the flight of a ball from its graph, and describe what each feature tells you.' },
      ],
    },
    {
      chapter: 'The height of a ball',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('bl', [
          g,
          plot(g, { id: 'curve', f: h, from: 0, to: 3, tone: 'brand' }),
          level,
          dots(g, [
            { id: 'V', x: 1, y: 20, tex: '(1, 20)', tone: 'opp', place: 'above right' },
            { id: 'S', x: 0, y: 15, tex: '(0, 15)', tone: 'adj', place: 'left' },
            { id: 'L', x: 3, y: 0, tex: '(3, 0)', tone: 'good', place: 'above right' },
            { id: 'D', x: 2, y: 15, tex: '(2, 15)', tone: 'theta', place: 'above right' },
          ]),
        ], 420),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['**Maximum height**: $20$ m after $1$ s.', '**Starting height**: $15$ m.', '**Landing**: after $3$ s.', '**Back at $15$ m**: after $2$ s.'] }],
      lines: [
        { say: 'Aisha tosses a ball upward from a balcony, fifteen metres above the ground. The graph shows its height over time.', show: ['bl.grid', 'bl.axes', 'bl.curve'] },
        { say: 'The vertex is one, twenty. So the ball reaches a maximum height of twenty metres, after one second.', show: ['bl.V', 'b.0'], focus: 'bl.V' },
        { say: 'The vertical intercept is zero, fifteen: the ball started fifteen metres above the ground. And the height is zero at three seconds, so the ball lands after three seconds.', show: ['bl.S', 'bl.L', 'b.1', 'b.2'], focus: ['bl.S', 'bl.L'] },
        { say: 'When is it at fifteen metres? A horizontal line at fifteen meets the graph twice: at zero seconds on the way up, and at two seconds on the way down. That is the symmetry of the parabola.', show: ['bl.h15', 'bl.D', 'b.3'], focus: ['bl.h15', 'bl.D'] },
      ],
    },
    {
      chapter: 'Domain and range in context',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Domain and range in context', md: 'Time starts at $0$ and ends when the ball lands: $\\{t \\mid 0 \\le t \\le 3,\\ t \\in \\mathbb{R}\\}$. The height runs from $0$ up to the maximum: $\\{h \\mid 0 \\le h \\le 20,\\ h \\in \\mathbb{R}\\}$.' },
      ],
      lines: [
        { say: 'In a real situation, a quadratic model only makes sense for some values. Time starts at zero, when Aisha throws the ball, and ends at three seconds, when it lands. So the domain is t from zero to three.', show: 'tip' },
        { say: 'The height runs from zero, on landing, up to the maximum of twenty metres. So the range is h from zero to twenty. The formula would give negative heights after three seconds, but the ball cannot go underground.' },
      ],
    },
    {
      chapter: 'Profit and break-even',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Vertex**: the best price, and the greatest profit.', '**Zeros**: the **break-even** prices, where the profit is $0$.', 'Between the zeros, the business makes a profit; outside them, a loss.'] }],
      lines: [
        { say: 'The same reading skills work for a business. Suppose a graph shows profit against the price of a product, and it opens down.', show: 'b.0' },
        { say: 'The vertex gives the best price, and its height is the greatest profit. The zeros are the break-even prices, where the profit is zero.', show: 'b.1' },
        { say: 'Between the zeros, the business makes a profit. Charge too little or too much, outside them, and it loses money.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rocket’s height has its vertex at $(4, 80)$, in seconds and metres, and it lands after $8$ s. Which statement is true?',
          choices: ['It reaches $80$ m after $4$ s.', 'It reaches $4$ m after $80$ s.', 'It is in the air for $4$ s.', 'Its range is $0 \\le h \\le 8$.'],
          answer: 0,
          working: 'The vertex gives the time ($4$ s) and the maximum height ($80$ m). It is in the air for $8$ s, and the range is $0 \\le h \\le 80$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rocket’s height has its vertex at four, eighty, in seconds and metres, and it lands after eight seconds. Which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The vertex gives the time, four seconds, and the maximum height, eighty metres. The rocket is in the air for eight seconds, and its range is from zero to eighty.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The vertex gives the maximum or minimum, and when it happens.', 'Intercepts give the start and the end (or the break-even points).', 'In context, limit the domain and range to values that make sense.'] }],
      lines: [
        { say: 'Let’s sum up. In context, the vertex gives the maximum or minimum, and when it happens.', show: 'sum.0' },
        { say: 'The intercepts give the starting value and when it ends, or the break-even points.', show: 'sum.1' },
        { say: 'And the domain and range are limited to values that make sense. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
