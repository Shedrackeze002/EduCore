import type { Explainer } from '@/video/script.ts';
import { cone, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-2-2-b',
  lessonId: 'm203-2-2',
  title: 'Surface Area of Pyramids, Cones and Spheres, Part 2: Cones',
  thumbnailTitle: 'Surface Area of a Cone',
  thumbnail: 'cone',
  summary: 'The parts of a cone, its net (a circle and a sector), SA = πr² + πrs, the curved area πrs of a gazebo roof 12 ft across with an 8 ft slant height (about 151 ft²), and a closed cone-shaped container.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.2 · Part 2', title: 'Surface Area of a Cone', subtitle: 'Roofs, funnels and party hats' }],
      lines: [
        { say: 'Grain-bin roofs, funnels and traffic cones are all cones: a circular base, and a curved side that comes to a point.', show: 'title' },
        { say: 'In this video, you will find the surface area of a cone, and of its curved side alone.' },
      ],
    },
    {
      chapter: 'The parts of a cone',
      layout: 'split',
      leftWidth: 520,
      left: [figure('cn', [cone({ r: 3, h: 5, labels: { r: 'r', s: 's' } })], 400)],
      right: [{ kind: 'bullets', id: 'b', items: ['$r$: the radius of the circular base', '$s$: the **slant height**, along the curved side from the rim to the apex'] }],
      lines: [
        { say: 'A cone has a circular base with radius r.', show: ['cn.shape', 'cn.r', 'b.0'], focus: 'cn.r' },
        { say: 'The slant height, s, runs along the curved side, from the rim of the base up to the apex.', show: ['cn.s', 'b.1'], focus: 'cn.s' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{base: } \\pi r^2', '\\text{curved side: } \\pi r s', 'SA = \\pi r^2 + \\pi r s'] },
      ],
      lines: [
        { say: 'Unfold a cone, and you get a circle, the base, and a sector of a bigger circle, which is the curved side. The base has an area of pi r squared.', show: 'm.0', focus: 'm.0' },
        { say: 'The curved side has an area of pi r s: pi, times the radius of the base, times the slant height.', show: 'm.1', focus: 'm.1' },
        { say: 'So a closed cone has a surface area of pi r squared, plus pi r s.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A cone-shaped roof',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = 12 \\div 2 = 6 \\text{ ft}', 'A = \\pi r s = \\pi(6)(8) = 48\\pi', '\\approx 150.8 \\approx 151 \\text{ ft}^2'] }],
      lines: [
        { say: 'A round gazebo has a cone-shaped roof, with a diameter of twelve feet and a slant height of eight feet. How much roofing covers it? A roof has no base, so use the curved area only. First, the radius: half of twelve is six feet.', show: 'm.0', focus: 'm.0' },
        { say: 'The curved area is pi times six times eight, forty-eight pi.', show: 'm.1', focus: 'm.1' },
        { say: 'That is about 150.8, or 151 square feet of roofing, to the nearest square foot.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A closed cone',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{base: } \\pi(3)^2 = 9\\pi', '\\text{curved side: } \\pi(3)(5) = 15\\pi', 'SA = 24\\pi \\approx 75.4 \\text{ cm}^2'] }],
      lines: [
        { say: 'Now a closed cone. A cone-shaped container has a radius of three centimetres, and a slant height of five. The base is pi times three squared, nine pi.', show: 'm.0', focus: 'm.0' },
        { say: 'The curved side is pi times three times five, fifteen pi.', show: 'm.1', focus: 'm.1' },
        { say: 'Together, twenty-four pi, about 75.4 square centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A party hat is a cone with no base. Its diameter is $16$ cm and its slant height is $20$ cm. How much paper makes the hat, to the nearest square centimetre?',
          choices: ['$503\\ \\text{cm}^2$', '$1005\\ \\text{cm}^2$', '$704\\ \\text{cm}^2$', '$1257\\ \\text{cm}^2$'],
          answer: 0,
          working: '$r = 8$, so $\\pi r s = \\pi(8)(20) = 160\\pi \\approx 503\\ \\text{cm}^2$. B uses the diameter, and C adds a base.',
        },
      ],
      lines: [
        { say: 'Your turn. A party hat is a cone with no base. Its diameter is sixteen centimetres, and its slant height is twenty. How much paper makes the hat? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The radius is eight, so pi times eight times twenty is 160 pi, about 503 square centimetres. B uses the diameter, and C adds a base the hat does not have.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cone: $SA = \\pi r^2 + \\pi r s$.', 'The curved side alone is $\\pi r s$.', 'Halve the diameter first.'] }],
      lines: [
        { say: 'Let’s sum up. A closed cone has a surface area of pi r squared, plus pi r s.', show: 'sum.0' },
        { say: 'The curved side alone, for a roof or a funnel, is pi r s.', show: 'sum.1' },
        { say: 'And halve the diameter first. In part three, we find the slant height when a plan gives only the height. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
