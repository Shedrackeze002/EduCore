import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 5], y: [0, 90], yStep: 18, every: 1, width: 6, height: 5, titles: { x: 't\\text{ (h)}', y: 'd\\text{ (km)}' } });

const video: Explainer = {
  id: 'm202-8-1-b',
  lessonId: 'm202-8-1',
  title: 'Comparing and Interpreting Rates, Part 2: Fuel Use and Rates as Slopes',
  thumbnailTitle: 'Rates as Slopes',
  thumbnail: 'cy',
  summary: 'Comparing two cars’ fuel consumption in litres per 100 km, why a bigger rate is not always better, and reading a cyclist’s speed of 18 km/h as the slope of a distance–time graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.1 · Part 2', title: 'Fuel Use and Rates as Slopes', subtitle: 'What does the rate measure?' }],
      lines: [
        { say: 'Some rates are better when they are bigger, and some are better when they are smaller. And on a graph, every rate is a slope.', show: 'title' },
        { say: 'In this video, you will compare fuel consumption, and read a rate from a graph.' },
      ],
    },
    {
      chapter: 'Fuel consumption',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{Car A: } 42.6 \\div 5.2 \\approx 8.2 \\text{ L/100 km}', '\\text{Car B: } 31.9 \\div 4.1 \\approx 7.8 \\text{ L/100 km}', '7.8 < 8.2:\\ \\text{Car B is more fuel-efficient}'] }],
      lines: [
        { say: 'Car A used 42.6 litres of gas to travel 520 kilometres. Car B used 31.9 litres to travel 410 kilometres. Which car is more fuel-efficient? Use the base 100 kilometres.', show: 'm.0', focus: 'm.0' },
        { say: '520 kilometres is 5.2 hundreds, so Car A uses about 8.2 litres per 100 kilometres. And 410 is 4.1 hundreds, so Car B uses about 7.8.', show: 'm.1', focus: 'm.1' },
        { say: 'Car B uses less fuel for every 100 kilometres, so it is more fuel-efficient.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Is a bigger rate better?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Is a bigger rate better?', md: 'It depends on the rate. A **higher** speed in km/h is faster, but a **higher** fuel consumption in L/100 km means more fuel used, which is worse. Ask what the rate measures before you decide.' }],
      lines: [
        { say: 'Be careful: a bigger rate is not always better. A higher speed in kilometres per hour means faster.', show: 'oops' },
        { say: 'But a higher fuel consumption in litres per 100 kilometres means more fuel used, which is worse. Always ask what the rate measures before you decide.' },
      ],
    },
    {
      chapter: 'Rates as slopes',
      layout: 'split',
      leftWidth: 560,
      left: [figure('cy', [g, plot(g, { id: 'line', f: (t) => 18 * t, from: 0, to: 5, tone: 'brand' }), dots(g, [{ id: 'p1', x: 1, y: 18, tex: '(1, 18)', tone: 'adj', place: 'below right' }, { id: 'p2', x: 4, y: 72, tex: '(4, 72)', tone: 'adj', place: 'above left' }])], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}}', '= \\dfrac{72 - 18}{4 - 1} = \\dfrac{54}{3} = 18', '18 \\text{ km/h}'] }],
      lines: [
        { say: 'When one quantity changes at a constant rate, its graph is a straight line, and the slope of the line is the rate. This graph shows the distance a cyclist travels.', show: ['cy.grid', 'cy.axes', 'cy.line'] },
        { say: 'Use two points on the line: one, eighteen, and four, seventy-two. The slope is the rise over the run.', show: ['cy.p1', 'cy.p2', 'm.0'], focus: ['cy.p1', 'cy.p2'] },
        { say: 'Seventy-two minus eighteen is fifty-four, and four minus one is three. Fifty-four over three is eighteen.', show: 'm.1', focus: 'm.1' },
        { say: 'The units are the vertical units over the horizontal units: kilometres per hour. So the cyclist travels at eighteen kilometres per hour, eighteen kilometres every hour. After two and a half hours, that is forty-five kilometres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A van uses $9.4$ L/100 km and a hybrid uses $5.1$ L/100 km. Which statement is true?',
          choices: ['The hybrid is more fuel-efficient.', 'The van is more fuel-efficient, because $9.4 > 5.1$.', 'They are equally fuel-efficient.', 'You cannot compare them without the distance.'],
          answer: 0,
          working: 'L/100 km measures fuel used, so a smaller number is better. The hybrid uses less fuel for every $100$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. A van uses 9.4 litres per 100 kilometres, and a hybrid uses 5.1. Which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Litres per 100 kilometres measures fuel used, so the smaller number is better. The hybrid uses less fuel for every 100 kilometres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fuel use: litres per $100$ km, lower is better.', 'Ask what a rate measures before deciding whether bigger is better.', 'On a graph, the slope is the rate, in vertical units per horizontal unit.'] }],
      lines: [
        { say: 'Let’s sum up. Fuel use is compared in litres per 100 kilometres, where lower is better.', show: 'sum.0' },
        { say: 'Ask what a rate measures before deciding whether bigger is better.', show: 'sum.1' },
        { say: 'And on a graph, the slope is the rate, in vertical units per horizontal unit. In part three, we compare rates that change. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
