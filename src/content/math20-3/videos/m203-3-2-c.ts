import type { Explainer } from '@/video/script.ts';
import { figure, hemisphere, sphere } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-3-2-c',
  lessonId: 'm203-3-2',
  title: 'Volume of Pyramids, Cones and Spheres, Part 3: Spheres and Hemispheres',
  thumbnailTitle: 'Volume of a Sphere',
  thumbnail: 'sp',
  summary: 'V = ⁴⁄₃πr³ for a sphere and ⅔πr³ for a hemisphere, a basketball 24 cm across (about 7238 cm³), a mixing bowl 30 cm across that holds about 7.1 L, and why cubing the diameter is eight times too big.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.2 · Part 3', title: 'Volume of a Sphere', subtitle: 'Cube the radius' }],
      lines: [
        { say: 'Balls, bowls, domes and tank ends are spheres or hemispheres. Their volume has its own formula, and it cubes the radius.', show: 'title' },
        { say: 'In this video, you will find the volume of a sphere and of a hemisphere.' },
      ],
    },
    {
      chapter: 'The formulas',
      layout: 'split',
      leftWidth: 480,
      left: [figure('sp', [sphere({ r: 3, labels: { r: 'r' } })], 340)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V_{\\text{sphere}} = \\tfrac43 \\pi r^3', 'V_{\\text{hemisphere}} = \\tfrac23 \\pi r^3', 'r^3 = r \\times r \\times r'] }],
      lines: [
        { say: 'A sphere holds two thirds of the cylinder that just fits around it. That works out to a volume of four thirds pi r cubed.', show: ['sp.shape', 'sp.r', 'm.0'], focus: 'm.0' },
        { say: 'A hemisphere is half a sphere, so it holds two thirds pi r cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice that the radius is cubed: r times r times r. Volume is in cubic units, so three lengths are multiplied.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A basketball',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = 24 \\div 2 = 12 \\text{ cm}', 'r^3 = 12^3 = 1728', 'V = \\tfrac43 \\pi(1728) = 2304\\pi \\approx 7238 \\text{ cm}^3'] }],
      lines: [
        { say: 'A basketball has a diameter of twenty-four centimetres. What is its volume? The radius is twelve centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve cubed is twelve times twelve times twelve: 1,728.', show: 'm.1', focus: 'm.1' },
        { say: 'Four thirds pi times 1,728 is 2,304 pi, about 7,238 cubic centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A mixing bowl',
      layout: 'split',
      leftWidth: 480,
      left: [figure('bw', [hemisphere({ r: 3, labels: { r: '15\\text{ cm}' } })], 280)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = \\tfrac23 \\pi(15)^3 = 2250\\pi', '\\approx 7068.6 \\text{ cm}^3', '7068.6 \\div 1000 \\approx 7.1 \\text{ L}'] }],
      lines: [
        { say: 'A mixing bowl is a hemisphere with an inside diameter of thirty centimetres. How many litres does it hold? The radius is fifteen centimetres.', show: ['bw.shape', 'bw.r'] },
        { say: 'Two thirds pi times fifteen cubed is 2,250 pi, about 7,068.6 cubic centimetres.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Every 1,000 cubic centimetres is a litre, so the bowl holds about 7.1 litres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A ball in a box',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{box: } (2r)^3 = 8r^3', '\\text{ball: } \\tfrac43 \\pi r^3 \\approx 4.19r^3', '4.19 \\div 8 \\approx 0.52'] }],
      lines: [
        { say: 'Here is a way to picture the formula. A ball fits snugly in a cube-shaped box, so the box is two r on each side. The box holds two r, cubed: eight r cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'The ball holds four thirds pi r cubed, about 4.19 r cubed.', show: 'm.1', focus: 'm.1' },
        { say: '4.19 divided by eight is about 0.52. So the ball fills only about fifty-two percent of its box: nearly half of a box of balls is air.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Cubing the diameter',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Cubing the diameter', md: 'The diameter is twice the radius, so cubing it makes the answer $2^3 = 8$ times too big. Halve the diameter first, then cube.' }],
      lines: [
        { say: 'Watch out: the formula cubes the radius, not the diameter. The diameter is twice the radius, so cubing it gives two cubed, eight times, too much. Halve the diameter first, then cube.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A spherical ornament has a radius of $3$ cm. What is its volume, to the nearest tenth of a cubic centimetre?',
          choices: ['$113.1\\ \\text{cm}^3$', '$904.8\\ \\text{cm}^3$', '$37.7\\ \\text{cm}^3$', '$56.5\\ \\text{cm}^3$'],
          answer: 0,
          working: '$V = \\tfrac43 \\pi(3)^3 = 36\\pi \\approx 113.1\\ \\text{cm}^3$. B uses the diameter, $6$, in place of the radius. D is a hemisphere.',
        },
      ],
      lines: [
        { say: 'Your turn. A spherical ornament has a radius of three centimetres. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three cubed is twenty-seven, and four thirds pi times twenty-seven is thirty-six pi, about 113.1 cubic centimetres. B uses the diameter, eight times too big.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sphere: $V = \\tfrac43 \\pi r^3$.', 'Hemisphere: $V = \\tfrac23 \\pi r^3$.', 'Halve the diameter, then cube the radius.'] }],
      lines: [
        { say: 'Let’s sum up. A sphere has a volume of four thirds pi r cubed.', show: 'sum.0' },
        { say: 'A hemisphere has a volume of two thirds pi r cubed.', show: 'sum.1' },
        { say: 'And halve the diameter first, then cube the radius. In part four, we add volumes for objects made of several shapes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
