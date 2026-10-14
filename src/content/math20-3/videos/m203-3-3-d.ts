import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-3-3-d',
  lessonId: 'm203-3-3',
  title: 'Volume on the Job, Part 4: Working Backward to a Missing Length',
  thumbnailTitle: 'Working Backward',
  thumbnail: 'm',
  summary: 'Substituting a known volume and undoing the formula: the 12 cm thickness of a 3.6 m³ pad, the 2.49 m height of a 5000 L tank 1.6 m across, the 1.34 m radius of a 10 000 L spherical tank, and choosing a square root or a cube root.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.3 · Part 4', title: 'Working Backward', subtitle: 'From a volume to a length' }],
      lines: [
        { say: 'Sometimes you know the volume, and need a length: how thick a pad is, how tall a tank must be, or how big a round tank needs to be.', show: 'title' },
        { say: 'In this video, you will put the known values into a formula, then undo the operations one at a time.' },
      ],
    },
    {
      chapter: 'How thick is the pad?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['3.6 = 6 \\times 5 \\times h = 30h', 'h = 3.6 \\div 30 = 0.12 \\text{ m}', '0.12 \\text{ m} = 12 \\text{ cm}'] }],
      lines: [
        { say: 'A crew pours 3.6 cubic metres of concrete for a pad that is six metres by five metres. How thick is the pad? Substitute into V equals l w h: 3.6 equals six times five times h, which is thirty h.', show: 'm.0', focus: 'm.0' },
        { say: 'Undo the multiplying by thirty: divide both sides by thirty. h is 0.12 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'That is twelve centimetres thick.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How tall is the tank?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['5000 \\text{ L} = 5 \\text{ m}^3, \\quad r = 0.8 \\text{ m}', '5 = \\pi(0.8)^2 h', 'h = \\dfrac{5}{\\pi(0.8)^2} \\approx \\dfrac{5}{2.0106} \\approx 2.49 \\text{ m}'] }],
      lines: [
        { say: 'A cylindrical tank must hold 5,000 litres, and has an inside diameter of 1.6 metres. How tall must it be? First, units: 5,000 litres is five cubic metres, and the radius is 0.8 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute into V equals pi r squared h: five equals pi times 0.8 squared, times h.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by pi times 0.8 squared, about 2.0106. The tank must be about 2.49 metres tall.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A spherical tank',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['10\\,000 \\text{ L} = 10 \\text{ m}^3', '10 = \\tfrac43 \\pi r^3 \\;\\Rightarrow\\; r^3 = \\dfrac{3 \\times 10}{4\\pi} \\approx 2.387', 'r = \\sqrt[3]{2.387} \\approx 1.34 \\text{ m}'] }],
      lines: [
        { say: 'A spherical water tank must hold 10,000 litres. What radius does it need? 10,000 litres is ten cubic metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute: ten equals four thirds pi r cubed. Multiply both sides by three, and divide by four pi: r cubed is about 2.387.', show: 'm.1', focus: 'm.1' },
        { say: 'Undo the cube with a cube root: r is about 1.34 metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Square root or cube root?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Solve for', 'Rearranged formula'], rows: [['height of a prism', '$h = \\dfrac{V}{lw}$'], ['height of a cylinder', '$h = \\dfrac{V}{\\pi r^2}$'], ['radius of a cylinder', '$r = \\sqrt{\\dfrac{V}{\\pi h}}$'], ['radius of a sphere', '$r = \\sqrt[3]{\\dfrac{3V}{4\\pi}}$']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check your answer', md: 'If the formula has $r^2$, finish with a square root. If it has $r^3$, finish with a cube root. Then put your answer back into the original formula.' },
      ],
      lines: [
        { say: 'Here are the rearranged formulas. For a height, divide the volume by everything else.', show: ['t.0', 't.1'] },
        { say: 'For a radius, divide, then undo the power. If the formula has r squared, finish with a square root. If it has r cubed, finish with a cube root.', show: ['t.2', 't.3'] },
        { say: 'Then check: put your answer back into the original formula, and see that it gives the volume you started with.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangular planter $2$ m long and $0.5$ m wide holds $0.4\\ \\text{m}^3$ of soil. How deep is the soil?',
          choices: ['$0.4$ m', '$0.8$ m', '$0.2$ m', '$2.5$ m'],
          answer: 0,
          working: '$0.4 = 2 \\times 0.5 \\times h = 1 \\times h$, so $h = 0.4$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular planter two metres long and half a metre wide holds 0.4 cubic metres of soil. How deep is the soil? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 0.4 equals two times 0.5 times h, and two times 0.5 is one, so h is 0.4 metres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Substitute what you know, then undo the operations.', 'For a radius: square root for $r^2$, cube root for $r^3$.', 'Check by putting the answer back in.'] }],
      lines: [
        { say: 'Let’s sum up. To find a missing length, substitute what you know, then undo the operations one at a time.', show: 'sum.0' },
        { say: 'For a radius, finish with a square root for r squared, or a cube root for r cubed.', show: 'sum.1' },
        { say: 'And check by putting your answer back into the formula. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
