import type { Explainer } from '@/video/script.ts';
import { arc, outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const lawn = outline({
  corners: [[0, 0], [12, 0], [12, 8], [0, 8]],
  tone: 'good',
  cutouts: [{ id: 'bed', corners: [[7.5, 4.5], [10.5, 4.5], [10.5, 6.5], [7.5, 6.5]], tone: 'hyp' }],
  labels: [
    { id: 'l', at: [6, -0.7], tex: '12\\text{ m}' },
    { id: 'w', at: [-1, 4], tex: '8\\text{ m}' },
    { id: 'bl', at: [9, 3.85], tex: '3\\text{ m}', tone: 'hyp' },
    { id: 'bw', at: [10.65, 5.5], tex: '2\\text{ m}', place: 'right', tone: 'hyp' },
  ],
});

const stage = outline({
  corners: [[0, 0], ...arc([6, 2], 2, -90, 90, 24), [0, 4]],
  guides: [{ id: 'cut', from: [6, 0], to: [6, 4], tone: 'opp' }],
  labels: [
    { id: 'l', at: [3, -0.6], tex: '6\\text{ m}' },
    { id: 'w', at: [-0.8, 2], tex: '4\\text{ m}' },
  ],
});

const video: Explainer = {
  id: 'm204-7-3-b',
  lessonId: 'm204-7-3',
  title: 'Composite Shapes, Part 2: Taking Away and Half Circles',
  thumbnailTitle: 'Taking Away a Part',
  thumbnail: 'ln',
  summary: 'Subtracting a part that is cut out (a 12 m by 8 m lawn minus a 3 m by 2 m flower bed leaves 90 m² to mow), and adding a half circle (a 6 m by 4 m stage with a rounded front is about 30.3 m²).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.3 · Part 2', title: 'Taking Away a Part', subtitle: 'Whole minus the hole' }],
      lines: [
        { say: 'Sometimes a part is cut out of a shape: a flower bed in a lawn, or a window in a wall. Other shapes have a rounded end.', show: 'title' },
        { say: 'In this video, you will subtract a part that is cut out, and add a half circle.' },
      ],
    },
    {
      chapter: 'Mowing around a flower bed',
      layout: 'split',
      leftWidth: 620,
      left: [figure('ln', [lawn], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{lawn: } 12 \\times 8 = 96', '\\text{bed: } 3 \\times 2 = 6', '96 - 6 = 90 \\text{ m}^2'] }],
      lines: [
        { say: 'A lawn is twelve metres by eight metres. A flower bed, three metres by two metres, is in the lawn. What area of grass needs to be mowed?', show: ['ln.shape', 'ln.l', 'ln.w', 'ln.bed', 'ln.bl', 'ln.bw'] },
        { say: 'When a part is cut out, find the area of the whole shape, then subtract the part that is not included. The whole lawn is twelve times eight: 96 square metres.', show: 'm.0', focus: ['ln.shape', 'm.0'] },
        { say: 'The flower bed is three times two: six square metres.', show: 'm.1', focus: ['ln.bed', 'm.1'] },
        { say: 'Subtract: 96 minus six is 90. There are 90 square metres of grass to mow.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A stage with a rounded front',
      layout: 'split',
      leftWidth: 560,
      left: [figure('st', [stage], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{rectangle: } 6 \\times 4 = 24', '\\text{half circle: } \\pi \\times 2 \\times 2 \\div 2', '\\approx 6.28', '24 + 6.28 \\approx 30.3 \\text{ m}^2'] }],
      lines: [
        { say: 'Some shapes have a rounded end. A stage is a six metre by four metre rectangle, with a half circle on one end. What is its area, to the nearest tenth?', show: ['st.shape', 'st.l', 'st.w', 'st.cut'] },
        { say: 'The rectangle is six times four: 24 square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The half circle’s diameter is the four metre side, so its radius is two metres. A half circle has half the area of a full circle: pi times two times two, divided by two.', show: 'm.1', focus: 'm.1' },
        { say: 'That is about 6.28 square metres.', show: 'm.2', focus: 'm.2' },
        { say: 'Add the parts: 24 plus 6.28 is about 30.3 square metres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Halve the circle',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to halve the circle', md: 'A half circle is only half of $\\pi \\times r \\times r$. Using the full circle adds too much area: $24 + 12.57 \\approx 36.6$ m².' }],
      lines: [
        { say: 'A common mistake is to forget to halve the circle. A half circle is only half of pi r squared. Using the full circle adds too much area: 24 plus 12.57 is about 36.6 square metres.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A yard is $10$ m by $6$ m. A pond that is $2$ m by $1.5$ m is in the yard. What area of grass is left?',
          choices: ['$57$ m²', '$63$ m²', '$60$ m²', '$3$ m²'],
          answer: 0,
          working: 'Yard: $10 \\times 6 = 60$ m². Pond: $2 \\times 1.5 = 3$ m². Grass: $60 - 3 = 57$ m². B adds the pond, C forgets it, and D is the pond.',
        },
      ],
      lines: [
        { say: 'Your turn. A yard is ten metres by six metres. A pond that is two metres by 1.5 metres is in the yard. What area of grass is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The yard is sixty square metres, and the pond is three. Sixty minus three is 57 square metres of grass. B adds the pond instead of subtracting it, and C forgets the pond.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cut-out part: whole area minus the part.', 'Half circle: π × r × r ÷ 2.', 'Add the parts that are there; subtract the parts that are not.'] }],
      lines: [
        { say: 'Let’s sum up. When a part is cut out, find the whole area, then subtract the part.', show: 'sum.0' },
        { say: 'A half circle has half the area of a full circle.', show: 'sum.1' },
        { say: 'Add the parts that are there, and subtract the parts that are not. In part three, we work out how much material to buy. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
