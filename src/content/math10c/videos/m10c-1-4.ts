import type { Explainer } from '@/video/script.ts';
import { inchAndCentimetre } from '@/video/measure.ts';

const rulers = inchAndCentimetre('rulers');

const video: Explainer = {
  id: 'm10c-1-4',
  lessonId: 'm10c-1-4',
  title: 'Converting Between SI and Imperial Units, Part 1: Conversion Factors',
  thumbnailTitle: 'SI and Imperial',
  thumbnail: 'rulers',
  summary: 'The key relationships between SI and imperial units (1 in = 2.54 cm exactly), and two ways to convert between the systems: unit fractions and proportions, including a two-step conversion. Part 2 converts rates and checks answers for reasonableness.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.4 · Part 1', title: 'SI and Imperial', subtitle: 'Converting between the two systems' }],
      lines: [
        { say: 'A hockey player is listed at six foot one. A marathon is 26.2 miles. A recipe from the United States measures a pan in inches.', show: 'title' },
        { say: 'To move between the S I and imperial systems, you use the same tool as before, conversion factors, with a few key relationships.', caption: 'To move between the SI and imperial systems, you use the same tool as before, conversion factors, with a few key relationships.' },
      ],
    },
    {
      chapter: 'Key relationships',
      layout: 'center',
      main: [
        rulers,
        {
          kind: 'table',
          id: 'rel',
          head: ['Imperial', 'SI'],
          rows: [
            ['$1\\text{ in}$', '$2.54\\text{ cm}$ (exact)'],
            ['$1\\text{ ft}$', '$30.48\\text{ cm} = 0.3048\\text{ m}$ (exact)'],
            ['$1\\text{ yd}$', '$0.9144\\text{ m}$ (exact), and $1\\text{ mi} \\approx 1.609\\text{ km}$'],
          ],
        },
      ],
      lines: [
        { say: 'The key link between the systems is the inch. One inch is exactly 2.54 centimetres.', show: ['rulers.cm-scale', 'rulers.in-scale', 'rulers.inch', 'rel.0'], focus: ['rulers.inch', 'rel.0'] },
        { say: 'A foot is twelve inches, so it is twelve times 2.54, which is exactly 30.48 centimetres, or 0.3048 metres.', show: 'rel.1', focus: 'rel.1' },
        { say: 'A yard is exactly 0.9144 metres, and a mile is about 1.609 kilometres.', show: 'rel.2', focus: 'rel.2' },
        { say: 'You only really need to remember that one inch equals 2.54 centimetres. Every other relationship can be built from it.', focus: ['rulers.inch', 'rel.0'] },
      ],
    },
    {
      chapter: 'Method 1: unit fractions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Convert $15\\text{ in}$ to centimetres.', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['15\\,\\cancel{\\text{in}} \\times \\dfrac{2.54\\text{ cm}}{1\\,\\cancel{\\text{in}}}', '= 38.1\\text{ cm}'] },
      ],
      lines: [
        { say: 'Convert fifteen inches to centimetres.', show: 'q' },
        { say: 'Method one: multiply by a fraction equal to one, with inches on the bottom, so the inches cancel: 2.54 centimetres over one inch.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifteen times 2.54 is 38.1 centimetres. Centimetres are smaller than inches, so a bigger number makes sense.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Method 2: proportion',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Convert $100\\text{ m}$ to yards.', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['\\dfrac{1\\text{ yd}}{0.9144\\text{ m}} = \\dfrac{x}{100\\text{ m}}', 'x = \\dfrac{100}{0.9144} \\approx 109.4\\text{ yd}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Either method', md: 'Both are proportional reasoning. Use the one that makes sense to you, and **always write the units**.' },
      ],
      lines: [
        { say: 'Convert one hundred metres to yards.', show: 'q' },
        { say: 'Method two: set up equal ratios. One yard is to 0.9144 metres as x yards is to one hundred metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Solve for x: one hundred divided by 0.9144, which is about 109.4 yards.', show: 'm.1', focus: 'm.1' },
        { say: 'Both methods are proportional reasoning. Use whichever makes sense to you, but always write the units, so you can check them.', show: 'tip' },
      ],
    },
    {
      chapter: 'Two steps',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A basketball player is $6\\text{ ft}\\ 4\\text{ in}$ tall. What is that in centimetres?', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['6 \\times 12 + 4 = 76\\text{ in}', '76\\,\\cancel{\\text{in}} \\times \\dfrac{2.54\\text{ cm}}{1\\,\\cancel{\\text{in}}} = 193.04\\text{ cm}', '\\approx 193.0\\text{ cm}'] },
      ],
      lines: [
        { say: 'Sometimes you need more than one step. A basketball player is six feet four inches tall. What is that in centimetres?', show: 'q' },
        { say: 'First, change the mixed units to inches: six times twelve is 72, plus four is 76 inches.', show: 'm.0', focus: 'm.0' },
        { say: 'Then convert inches to centimetres: 76 times 2.54 is 193.04,', show: 'm.1', focus: 'm.1' },
        { say: 'which is about 193 centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A board is $8\\text{ ft}$ long. How long is it in metres? Use $1\\text{ ft} = 0.3048\\text{ m}$.',
          choices: ['$2.44\\text{ m}$', '$26.25\\text{ m}$', '$24.4\\text{ m}$', '$0.24\\text{ m}$'],
          answer: 0,
          working: '$8\\,\\text{ft} \\times \\dfrac{0.3048\\text{ m}}{1\\text{ ft}} \\approx 2.44\\text{ m}$. A metre is longer than a foot, so the number gets smaller.',
        },
      ],
      lines: [
        { say: 'Your turn. A board is eight feet long. How long is it in metres? Use one foot equals 0.3048 metres. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eight times 0.3048 is about 2.44 metres. A metre is longer than a foot, so the number should get smaller. B divides instead of multiplying, and goes the wrong way.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            '$1\\text{ in} = 2.54\\text{ cm}$ exactly: the key link between the systems.',
            'Use a unit fraction (the unit you start with on the bottom) or a proportion.',
            'For mixed units, change to one unit first, then convert.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. One inch is exactly 2.54 centimetres, the key link between the two systems.", show: 'sum.0' },
        { say: 'To convert, multiply by a unit fraction with the unit you start with on the bottom, or set up a proportion. Either way, write the units.', show: 'sum.1' },
        { say: 'For mixed units like feet and inches, change to one unit first, then convert. In part two, we convert rates, and check whether answers are reasonable. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
