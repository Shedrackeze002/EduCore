import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-4-4-c',
  lessonId: 'm202-4-4',
  title: 'Radical Equations, Part 3: Radical Equations in Context',
  thumbnailTitle: 'Radical Equations in Context',
  thumbnail: 'm',
  summary: 'Finding the height of a footbridge from a 2.5 s fall with t = √(d/4.9) (about 30.6 m), the volume of an exercise ball with a 30 cm radius from r = ∛(3V/4π), and checking that answers in context are reasonable.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.4 · Part 3', title: 'Radical Equations in Context', subtitle: 'Bridges and exercise balls' }],
      lines: [
        { say: 'Many formulas in science contain radicals. When you know the answer and want the input, you have a radical equation to solve.', show: 'title' },
        { say: 'In this video, you will find the height of a bridge, and the volume of an exercise ball.' },
      ],
    },
    {
      chapter: 'How high is the bridge?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['t = \\sqrt{\\dfrac{d}{4.9}}', '2.5 = \\sqrt{\\dfrac{d}{4.9}}', '6.25 = \\dfrac{d}{4.9}', 'd = 4.9 \\times 6.25 = 30.625 \\approx 30.6\\text{ m}'] }],
      lines: [
        { say: 'In this example, the fall time of an object is modelled by t equals the square root of d over 4.9, where t is in seconds and d is the distance fallen, in metres.', show: 'm.0', focus: 'm.0' },
        { say: 'A pebble dropped from a footbridge takes 2.5 seconds to reach the water. Substitute 2.5 for t. The radical is already alone.', show: 'm.1', focus: 'm.1' },
        { say: 'Square both sides. 2.5 squared is 6.25, so 6.25 equals d over 4.9.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply both sides by 4.9: d is 30.625. The bridge is about 30.6 metres above the water.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The volume of an exercise ball',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = \\sqrt[3]{\\dfrac{3V}{4\\pi}},\\quad r = 30', '30^3 = 27\\,000 = \\dfrac{3V}{4\\pi}', 'V = \\dfrac{4\\pi(27\\,000)}{3} = 36\\,000\\pi \\approx 113\\,097\\text{ cm}^3'] }],
      lines: [
        { say: 'The radius of a sphere is the cube root of three V over four pi, where V is its volume. An exercise ball has a radius of thirty centimetres. Find its volume.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute thirty for r, and cube both sides. Thirty cubed is 27,000, so 27,000 equals three V over four pi.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply both sides by four pi, and divide by three. V is 36,000 pi, about 113,097 cubic centimetres. That is about 113 litres of air.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Is it reasonable?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Is the answer reasonable?', md: 'A $30.6$ m bridge is about as tall as a ten-storey building, and a fall of $2.5$ s feels about right for that height. A quick check catches slips such as forgetting to square.' }],
      lines: [
        { say: 'In context, always ask whether the answer is reasonable. A 30.6 metre bridge is about as tall as a ten-storey building, and a 2.5 second fall feels about right for that height.', show: 'tip' },
        { say: 'If you had forgotten to square, you would get 4.9 times 2.5, about twelve metres: a fall of only about 1.6 seconds. A quick check like this catches the slip.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In this example, the speed of a wave in water $d$ m deep is modelled by $s = \\sqrt{9.8d}$ m/s. A wave travels at $50$ m/s. How deep is the water, to the nearest tenth of a metre?',
          choices: ['$255.1$ m', '$25.5$ m', '$490$ m', '$5.1$ m'],
          answer: 0,
          working: 'Square both sides: $2500 = 9.8d$, so $d = \\dfrac{2500}{9.8} \\approx 255.1$ m. D divides $50$ by $9.8$ without squaring.',
        },
      ],
      lines: [
        { say: 'Your turn. In this example, the speed of a wave in water d metres deep is the square root of 9.8 d, in metres per second. A wave travels at fifty metres per second. How deep is the water? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Square both sides: 2,500 equals 9.8 d. Divide by 9.8, and d is about 255.1 metres. D forgets to square.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Substitute the known value, then isolate the radical.', 'Square or cube both sides, then solve.', 'Round only at the end, and check that the answer is reasonable.'] }],
      lines: [
        { say: 'Let’s sum up. In context, substitute the known value, and isolate the radical.', show: 'sum.0' },
        { say: 'Square or cube both sides, and solve for the unknown.', show: 'sum.1' },
        { say: 'And round only at the end, then ask whether the answer is reasonable. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
