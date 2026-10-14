import type { Explainer } from '@/video/script.ts';
import { figure, hemisphere, sphere } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-2-2-d',
  lessonId: 'm203-2-2',
  title: 'Surface Area of Pyramids, Cones and Spheres, Part 4: Spheres and Hemispheres',
  thumbnailTitle: 'Spheres and Hemispheres',
  thumbnail: 'sp',
  summary: 'SA = 4πr² for a sphere, a basketball 24 cm across (about 1810 cm²), the curved part 2πr² of a hemisphere for a planetarium dome 10 m across (about 157.1 m²), and 3πr² for a solid hemisphere with its flat base.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.2 · Part 4', title: 'Spheres and Hemispheres', subtitle: 'Balls and domes' }],
      lines: [
        { say: 'Basketballs, ball bearings, domes and some water towers are spheres, or halves of spheres. They have no flat faces to unfold, but there is a neat formula.', show: 'title' },
        { say: 'In this video, you will find the surface area of a sphere and of a hemisphere.' },
      ],
    },
    {
      chapter: 'Spheres',
      layout: 'split',
      leftWidth: 480,
      left: [figure('sp', [sphere({ r: 3, labels: { r: 'r' } })], 360)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sphere and hemisphere', md: 'A **sphere** is a ball: every point on it is the same distance $r$ from the centre. A **hemisphere** is half of a sphere.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['SA = 4\\pi r^2'] },
      ],
      lines: [
        { say: 'A sphere is a ball: every point on it is the same distance, r, from the centre. A hemisphere is half of a sphere.', show: ['sp.shape', 'sp.r', 'def'] },
        { say: 'The surface area of a sphere is exactly four times the area of a circle with the same radius: four pi r squared.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A basketball',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = 24 \\div 2 = 12 \\text{ cm}', 'SA = 4\\pi(12)^2 = 576\\pi', '\\approx 1809.56 \\approx 1810 \\text{ cm}^2'] }],
      lines: [
        { say: 'A basketball has a diameter of twenty-four centimetres. Find its surface area. As always, halve the diameter: the radius is twelve centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Four pi times twelve squared is four pi times 144, which is 576 pi.', show: 'm.1', focus: 'm.1' },
        { say: 'That is about 1,810 square centimetres, to the nearest square centimetre.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Hemispheres',
      layout: 'split',
      leftWidth: 480,
      left: [figure('hm', [hemisphere({ r: 3, labels: { r: 'r' } })], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{curved part: } 2\\pi r^2', '\\text{flat circle: } \\pi r^2', '\\text{solid hemisphere: } 3\\pi r^2'] }],
      lines: [
        { say: 'A hemisphere is half a sphere, so its curved part is half of four pi r squared: two pi r squared.', show: ['hm.shape', 'hm.r', 'm.0'], focus: 'm.0' },
        { say: 'A solid hemisphere also has a flat circle where it was cut, with an area of pi r squared.', show: 'm.1', focus: 'm.1' },
        { say: 'So a solid hemisphere has a total surface area of three pi r squared. A dome, which has no floor, uses only the curved part.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A dome roof',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = 10 \\div 2 = 5 \\text{ m}', '2\\pi r^2 = 2\\pi(5)^2 = 50\\pi', '\\approx 157.1 \\text{ m}^2'] }],
      lines: [
        { say: 'A planetarium dome is a hemisphere with a diameter of ten metres. How much roofing covers the dome? The radius is five metres, and only the curved part is roofed.', show: 'm.0', focus: 'm.0' },
        { say: 'Two pi times five squared is fifty pi.', show: 'm.1', focus: 'm.1' },
        { say: 'That is about 157.1 square metres of roofing.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A solid wooden hemisphere has a radius of $4$ cm. What is its total surface area, to the nearest square centimetre?',
          choices: ['$151\\ \\text{cm}^2$', '$101\\ \\text{cm}^2$', '$201\\ \\text{cm}^2$', '$50\\ \\text{cm}^2$'],
          answer: 0,
          working: '$3\\pi r^2 = 3\\pi(4)^2 = 48\\pi \\approx 151\\ \\text{cm}^2$. B is the curved part only, and C is a whole sphere.',
        },
      ],
      lines: [
        { say: 'Your turn. A solid wooden hemisphere has a radius of four centimetres. What is its total surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A solid hemisphere has three pi r squared: three pi times sixteen, forty-eight pi, about 151 square centimetres. B leaves out the flat circle, and C is a whole sphere.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sphere: $SA = 4\\pi r^2$.', 'Hemisphere: curved part $2\\pi r^2$; solid $3\\pi r^2$.', 'Halve the diameter, and include only the surfaces the job covers.'] }],
      lines: [
        { say: 'Let’s sum up. A sphere has a surface area of four pi r squared.', show: 'sum.0' },
        { say: 'A hemisphere has a curved part of two pi r squared, or three pi r squared with its flat base.', show: 'sum.1' },
        { say: 'And halve the diameter, and include only the surfaces the job covers. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
