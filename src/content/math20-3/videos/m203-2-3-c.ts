import type { Explainer } from '@/video/script.ts';
import { cone, cylinder, figure, type Part } from '@/video/solids.ts';

/** The roof's rise, measured beside the bin from the top of the wall to the level of the peak. */
const rise: Part = {
  points: { apex: [0, 14.5], b: [5.6, 10], t: [5.6, 14.5] },
  items: [
    { kind: 'line', id: 'level', from: 'apex', to: 't', tone: 'muted', dashed: true, group: 'rise' },
    { kind: 'line', id: 'rise-line', from: 'b', to: 't', tone: 'opp', label: '6\\text{ ft}', labelSide: 'right', group: 'rise' },
  ],
};

const video: Explainer = {
  id: 'm203-2-3-c',
  lessonId: 'm203-2-3',
  title: 'Surface Area on the Job, Part 3: Composite Objects',
  thumbnailTitle: 'Composite Objects',
  thumbnail: 'bin',
  summary: 'Surface area of an object made of two shapes: painting the wall and cone roof of a grain bin 18 ft across (about 1436.8 ft², so 4 cans), leaving out the joins and the floor, and a propane tank made of a cylinder and two hemispheres.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.3 · Part 3', title: 'Composite Objects', subtitle: 'Add the surfaces that are covered' }],
      lines: [
        { say: 'A grain bin is a cylinder with a cone on top. A propane tank is a cylinder with rounded ends. Many real objects are made of two or more shapes.', show: 'title' },
        { say: 'In this video, you will find the surface area of a composite object, counting only the surfaces that are covered.' },
      ],
    },
    {
      chapter: 'Which surfaces?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Find each surface that gets covered, and add them.', 'Do **not** count a surface where two shapes join.', 'Do **not** count a floor or base that is not covered.'] }],
      lines: [
        { say: 'Find each surface that gets covered, and add them.', show: 'b.0' },
        { say: 'Do not count a surface where two shapes join. The top of the bin’s wall is hidden under the roof, so it gets no paint.', show: 'b.1' },
        { say: 'And do not count a floor or base that is not covered.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Painting a grain bin',
      layout: 'split',
      leftWidth: 520,
      left: [figure('bin', [cylinder({ r: 4.5, h: 10, top: 'front', labels: { h: '20\\text{ ft}' } }), cone({ name: 'roof', at: [0, 10], r: 4.5, h: 4.5, rim: 'front' }), rise], 480)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{wall: } \\pi(18)(20) = 360\\pi \\approx 1130.97', 's = \\sqrt{9^2 + 6^2} = \\sqrt{117} \\approx 10.817', '\\text{roof: } \\pi(9)(10.817) \\approx 305.83', '\\text{total} \\approx 1436.8 \\text{ ft}^2', '1436.8 \\div 400 \\approx 3.59 \\;\\to\\; 4 \\text{ cans}'] }],
      lines: [
        { say: 'A steel grain bin is a cylinder eighteen feet across, with walls twenty feet high. Its cone-shaped roof rises six feet above the wall. The wall and roof are painted, but not the floor.', show: ['bin.shape', 'bin.h', 'bin.roof-shape', 'bin.rise'] },
        { say: 'The wall is the curved side of the cylinder: pi d h, pi times eighteen times twenty, 360 pi, about 1,130.97 square feet.', show: 'm.0', focus: 'm.0' },
        { say: 'For the roof, you need the slant height. The radius is nine and the height is six, so s is the square root of 117, about 10.817 feet.', show: 'm.1', focus: 'm.1' },
        { say: 'The roof is the curved side of the cone: pi times nine times 10.817, about 305.83 square feet.', show: 'm.2', focus: 'm.2' },
        { say: 'The total is about 1,436.8 square feet. One can covers 400 square feet, so that is about 3.59 cans. Round up: four cans for one coat.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A propane tank is a cylinder $2$ m long with a hemisphere on each end. The radius is $0.5$ m. What is its surface area, to the nearest hundredth of a square metre?',
          choices: ['$9.42\\ \\text{m}^2$', '$7.85\\ \\text{m}^2$', '$11.00\\ \\text{m}^2$', '$6.28\\ \\text{m}^2$'],
          answer: 0,
          working: 'Curved side: $2\\pi(0.5)(2) = 2\\pi$. Two hemispheres make one sphere: $4\\pi(0.5)^2 = \\pi$. Total $3\\pi \\approx 9.42\\ \\text{m}^2$. No flat circles: they are joins.',
        },
      ],
      lines: [
        { say: 'Your turn. A propane tank is a cylinder two metres long, with a hemisphere on each end. The radius is half a metre. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The curved side of the cylinder is two pi. The two hemispheres make one whole sphere, four pi times 0.25, which is pi. So the total is three pi, about 9.42 square metres. The flat circles are joins, so they are not counted.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Break a composite object into simple shapes.', 'Add only the surfaces that are covered: no joins, no uncovered floor.', 'Find any slant height first, then round up what you buy.'] }],
      lines: [
        { say: 'Let’s sum up. Break a composite object into simple shapes.', show: 'sum.0' },
        { say: 'Add only the surfaces that are covered: leave out the joins, and any floor that is not covered.', show: 'sum.1' },
        { say: 'And find any slant height first, then round up what you buy. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
