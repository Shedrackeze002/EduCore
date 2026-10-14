import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** The side view of a propane tank: a 2 m cylinder (drawn 4 units long) with a rounded end on each side. */
function capsule(): Part {
  const points: Record<string, P> = { tl: [0, 1], tr: [4, 1], bl: [0, -1], br: [4, -1], c: [4, 0], d0: [0, -1.5], d1: [4, -1.5] };
  const outline: string[] = [];
  const arc = (key: string, cx: number, from: number) => {
    for (let i = 0; i <= 24; i++) {
      const a = ((from + (i * 180) / 24) * Math.PI) / 180;
      points[`${key}${i}`] = [cx + Math.cos(a), Math.sin(a)];
      outline.push(`${key}${i}`);
    }
  };
  arc('r', 4, -90);
  arc('l', 0, 90);
  const items: DiagramItem[] = [
    { kind: 'region', id: 'fill', points: outline, tone: 'brand', shade: 0.16, group: 'tank' },
    { kind: 'curve', id: 'outline', points: outline, closed: true, group: 'tank' },
    { kind: 'line', id: 'j0', from: 'tl', to: 'bl', tone: 'muted', dashed: true, group: 'joins' },
    { kind: 'line', id: 'j1', from: 'tr', to: 'br', tone: 'muted', dashed: true, group: 'joins' },
    { kind: 'line', id: 'r', from: 'c', to: 'tr', tone: 'opp', label: '0.5\\text{ m}', labelSide: 'left' },
    { kind: 'line', id: 'len', from: 'd0', to: 'd1', tone: 'adj', label: '2\\text{ m}', labelSide: 'right' },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm203-3-2-d',
  lessonId: 'm203-3-2',
  title: 'Volume of Pyramids, Cones and Spheres, Part 4: Composite Objects',
  thumbnailTitle: 'Volume of Composite Objects',
  thumbnail: 'tank',
  summary: 'Adding the volumes of the parts of an object: a propane tank made of a cylinder and two hemispheres (about 2094 L), and an ice cream cone topped with a hemisphere of ice cream (48π, about 150.8 cm³).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.2 · Part 4', title: 'Composite Objects', subtitle: 'Add the volumes of the parts' }],
      lines: [
        { say: 'Many real objects are made of several shapes: a propane tank, a grain silo, an ice cream cone. To find the volume, add the volumes of the parts.', show: 'title' },
        { say: 'In this video, you will find how much a propane tank holds, and the volume of an ice cream cone.' },
      ],
    },
    {
      chapter: 'A propane tank',
      layout: 'split',
      leftWidth: 560,
      left: [figure('pt', [capsule()], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{cylinder: } \\pi(0.5)^2(2) \\approx 1.5708', '\\text{sphere: } \\tfrac43 \\pi(0.5)^3 \\approx 0.5236', '\\text{total} \\approx 2.0944 \\text{ m}^3', '\\approx 2094 \\text{ L}'] }],
      lines: [
        { say: 'A propane tank is a cylinder with a hemisphere on each end. It has an inside radius of half a metre, and its cylinder part is two metres long. How many litres does it hold?', show: ['pt.tank', 'pt.joins', 'pt.r', 'pt.len'] },
        { say: 'The cylinder: pi times 0.5 squared, times two, about 1.5708 cubic metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The two hemispheres together make one whole sphere: four thirds pi times 0.5 cubed, about 0.5236 cubic metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Add them: about 2.0944 cubic metres. Each cubic metre is 1,000 litres, so the tank holds about 2,094 litres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'An ice cream cone',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{cone: } \\tfrac13 \\pi(3)^2(10) = 30\\pi', '\\text{hemisphere: } \\tfrac23 \\pi(3)^3 = 18\\pi', '\\text{total} = 48\\pi \\approx 150.8 \\text{ cm}^3'] }],
      lines: [
        { say: 'An ice cream cone is a cone with a radius of three centimetres and a height of ten, filled and topped with a hemisphere of ice cream with the same radius. What is the total volume of ice cream? The cone holds one third pi times nine times ten: thirty pi.', show: 'm.0', focus: 'm.0' },
        { say: 'The hemisphere on top is two thirds pi times three cubed, which is eighteen pi.', show: 'm.1', focus: 'm.1' },
        { say: 'Together, forty-eight pi, about 150.8 cubic centimetres. Keeping each part in terms of pi until the end makes the adding easy.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Plan the parts',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Plan the parts', md: 'Sketch the object, name each simple shape, and note which measurements belong to which part. Two hemispheres of the same radius make one whole sphere. Unlike surface area, volumes of the parts simply add: nothing is hidden at the joins.' }],
      lines: [
        { say: 'Here is a plan for any composite object. Sketch it, name each simple shape, and note which measurements belong to which part.', show: 'tip' },
        { say: 'Look for shortcuts: two hemispheres of the same radius make one whole sphere. And unlike surface area, the volumes of the parts simply add. Nothing is hidden at the joins.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A grain silo is a cylinder with a radius of $3$ m and a height of $10$ m, topped with a hemisphere. What is its volume, to the nearest tenth of a cubic metre?',
          choices: ['$339.3\\ \\text{m}^3$', '$395.8\\ \\text{m}^3$', '$282.7\\ \\text{m}^3$', '$113.1\\ \\text{m}^3$'],
          answer: 0,
          working: 'Cylinder: $\\pi(3)^2(10) = 90\\pi$. Hemisphere: $\\tfrac23 \\pi(3)^3 = 18\\pi$. Total $108\\pi \\approx 339.3\\ \\text{m}^3$. B uses a whole sphere, and C leaves out the top.',
        },
      ],
      lines: [
        { say: 'Your turn. A grain silo is a cylinder with a radius of three metres and a height of ten metres, topped with a hemisphere. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The cylinder is ninety pi, and the hemisphere is eighteen pi, so the total is 108 pi, about 339.3 cubic metres. B uses a whole sphere, and C leaves out the top.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Break the object into simple shapes, and add their volumes.', 'Two equal hemispheres make one sphere.', 'Keep answers in terms of $\\pi$ until the end.'] }],
      lines: [
        { say: 'Let’s sum up. Break a composite object into simple shapes, and add their volumes.', show: 'sum.0' },
        { say: 'Two hemispheres of the same radius make one whole sphere.', show: 'sum.1' },
        { say: 'And keep each part in terms of pi until the end. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
