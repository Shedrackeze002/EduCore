import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-6-1',
  lessonId: 'm104-6-1',
  title: 'Metric Units, Part 1: Choosing and Estimating',
  thumbnailTitle: 'Metric Units',
  summary: 'Length, mass and capacity in SI units, the prefixes kilo-, centi- and milli-, choosing a sensible unit, and estimating with referents such as a door, a paper clip and a carton of milk. Part 2 converts between units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 6.1 · Part 1', title: 'Metric Units', subtitle: 'Choosing and estimating' }],
      lines: [
        { say: 'A recipe asks for 250 millilitres of milk. A bag of potatoes says five kilograms. A highway sign says Red Deer is 45 kilometres away. Canada uses the metric system, so you see these units every day.', show: 'title' },
        { say: 'In this video, you will choose the right unit, and estimate measurements.' },
      ],
    },
    {
      chapter: 'Length, mass and capacity',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Measure', 'Question', 'Units'], rows: [['Length', 'How long, tall or far?', 'mm, cm, m, km'], ['Mass', 'How heavy?', 'g, kg'], ['Capacity', 'How much does it hold?', 'mL, L']] },
        { kind: 'bullets', id: 'b', items: ['**kilo-** means $1000$: $1\\text{ km} = 1000\\text{ m}$.', '**centi-** means one hundredth: $1\\text{ cm} = \\tfrac{1}{100}\\text{ m}$.', '**milli-** means one thousandth: $1\\text{ mL} = \\tfrac{1}{1000}\\text{ L}$.'] },
      ],
      lines: [
        { say: 'Canada measures with SI units: the metric system. Length is how long, tall or far something is, and its basic unit is the metre.', show: 't.0' },
        { say: 'Mass is how heavy something is, in grams and kilograms. Capacity is how much a container holds, and its basic unit is the litre.', show: ['t.1', 't.2'] },
        { say: 'A prefix at the front of a unit tells you how big it is. Kilo means a thousand: a kilometre is 1,000 metres.', show: 'b.0' },
        { say: 'Centi means one hundredth: a centimetre is one hundredth of a metre. And milli means one thousandth: a millilitre is one thousandth of a litre.', show: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Choosing a unit',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up mass and capacity', md: '"How heavy?" is mass: g or kg. "How much does it hold?" is capacity: mL or L. A jug holds $4\\text{ L}$ of milk, not $4\\text{ kg}$.' }],
      lines: [
        { say: 'To choose a unit, first decide what you are measuring. Then pick a unit that gives a sensible number.' },
        { say: 'Which unit is best for the gas in a car’s tank? Gas fills a tank, so it is a capacity: grams and kilograms are out. A tank holds a lot, so millilitres would give a huge number. Use litres.' },
        { say: 'How heavy is a mass question. How much does it hold is a capacity question. A jug holds four litres of milk, not four kilograms.', show: 'oops' },
      ],
    },
    {
      chapter: 'Referents',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['Unit', 'About this much'], rows: [['1 mm', 'the thickness of a dime'], ['1 cm', 'the width of your little finger'], ['1 m', 'one big step'], ['1 km', 'a 12-minute walk'], ['1 g', 'a paper clip'], ['1 kg', 'a carton of milk'], ['1 L', 'a carton of milk']] }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Right number, wrong unit', md: 'An apple is about $150\\text{ g}$, not $150\\text{ kg}$, which is heavier than a fridge.' }],
      lines: [
        { say: 'You do not always need a ruler or a scale. A referent is a familiar object you use to estimate a measurement: a dime is about a millimetre thick, and one big step is about a metre.', show: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'A paper clip is about a gram, and a carton of milk is about a kilogram, and holds about a litre.', show: ['t.4', 't.5', 't.6'] },
        { say: 'So is an apple 150 grams, fifteen kilograms, or 1.5 grams? It is much heavier than a paper clip, and lighter than a carton of milk: about 150 grams.', focus: ['t.4', 't.5'] },
        { say: 'Check that the number and the unit make sense together. 150 kilograms would be heavier than a fridge!', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the best estimate for the height of a classroom door?',
          choices: ['$2\\text{ m}$', '$2\\text{ cm}$', '$20\\text{ m}$', '$2\\text{ km}$'],
          answer: 0,
          working: 'A door is a little taller than an adult, about two big steps: $2\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best estimate for the height of a classroom door? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, about two metres: a little taller than an adult, or about two big steps. Twenty metres would be a six-storey building.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Length: mm, cm, m, km. Mass: g, kg. Capacity: mL, L.', 'kilo- is $1000$, centi- is a hundredth, milli- is a thousandth.', 'Estimate with referents, and check the number and the unit.'] }],
      lines: [
        { say: 'Let’s sum up. Length uses millimetres to kilometres, mass uses grams and kilograms, and capacity uses millilitres and litres.', show: 'sum.0' },
        { say: 'Kilo means a thousand, centi means a hundredth, and milli means a thousandth.', show: 'sum.1' },
        { say: 'And estimate with referents, checking that the number and the unit make sense. In part two, we convert between units. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
