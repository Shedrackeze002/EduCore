import type { Explainer } from '@/video/script.ts';
import { figure, isometricBox } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm203-5-2-c',
  lessonId: 'm203-5-2',
  title: 'Views of Three-Dimensional Objects, Part 3: Isometric Drawings',
  thumbnailTitle: 'Isometric Drawings',
  thumbnail: 'iso',
  summary: 'What an isometric drawing is (vertical edges stay vertical, the others slant at 30°, equal edges drawn equal), and the top, front and side views of a crate 5 ft long, 3 ft deep and 2.5 ft tall.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.2 · Part 3', title: 'Isometric Drawings', subtitle: 'Three faces in one picture' }],
      lines: [
        { say: 'A single picture can show the top, the front and a side of an object at once. Builders and designers draw these pictures on a special grid.', show: 'title' },
        { say: 'In this video, you will read an isometric drawing, and describe the views it stands for.' },
      ],
    },
    {
      chapter: 'Isometric drawing',
      layout: 'split',
      leftWidth: 620,
      left: [figure('iso', [isometricBox({ l: 5, w: 3, h: 2.5, labels: { l: '5\\text{ ft}', w: '3\\text{ ft}', h: '2.5\\text{ ft}' } })], 380)],
      right: [{ kind: 'bullets', id: 'b', items: ['Shows the **top**, the **front** and **one side** in one picture.', 'Vertical edges stay **vertical**.', 'The other edges slant at $30^\\circ$.', 'Equal edges are drawn **equal**, so you can measure from it.'] }],
      lines: [
        { say: 'An isometric drawing shows the top, the front, and one side of an object in one picture.', show: ['iso.shape', 'iso.front', 'iso.side', 'iso.top', 'b.0'] },
        { say: 'Vertical edges stay vertical.', show: 'b.1', focus: 'iso.oo' },
        { say: 'The other edges slant at thirty degrees from the horizontal, some to the left and some to the right. Isometric dot paper has its dots arranged so these slanted lines are easy to draw.', show: 'b.2', focus: ['iso.oa', 'iso.ob'] },
        { say: 'And edges that are equal in real life are drawn equal, so you can measure lengths from the drawing.', show: ['b.3', 'iso.l', 'iso.w', 'iso.h'] },
      ],
    },
    {
      chapter: 'Views of a crate',
      layout: 'center',
      main: [
        figure('vw', [
          rectangle({ name: 't', w: 5, h: 3, labels: { w: '5', h: '3' } }),
          rectangle({ name: 'f', at: [7, 0], w: 5, h: 2.5, labels: { w: '5', h: '2.5' } }),
          rectangle({ name: 's', at: [14, 0], w: 3, h: 2.5, labels: { w: '3', h: '2.5' } }),
        ], 240),
        { kind: 'bullets', id: 'b', items: ['**Top**: the length and the depth, $5$ ft by $3$ ft.', '**Front**: the length and the height, $5$ ft by $2.5$ ft.', '**Side**: the depth and the height, $3$ ft by $2.5$ ft.'] },
      ],
      lines: [
        { say: 'The crate in the drawing is five feet long across the front, three feet deep, and 2.5 feet tall. What are its top, front and side views? Looking down, you see the length and the depth: a rectangle five feet by three feet.', show: ['vw.t-shape', 'b.0'], focus: 'vw.t-shape' },
        { say: 'From the front, you see the length and the height: a rectangle five by 2.5.', show: ['vw.f-shape', 'b.1'], focus: 'vw.f-shape' },
        { say: 'From the side, you see the depth and the height: a rectangle three by 2.5.', show: ['vw.s-shape', 'b.2'], focus: 'vw.s-shape' },
      ],
    },
    {
      chapter: 'Pictures and plans',
      layout: 'center',
      main: [{ kind: 'callout', id: 'k', tone: 'key', title: 'Two jobs', md: 'An isometric drawing shows what an object **looks like**. The separate views give the exact shape of each face, which is what a builder needs to cut the pieces.' }],
      lines: [
        { say: 'The two kinds of drawing do different jobs. An isometric drawing shows what an object looks like, which helps a customer picture it.', show: 'k' },
        { say: 'The separate views give the exact shape and size of each face, which is what a builder needs to cut the pieces.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box is $4$ ft long across the front, $2$ ft deep and $3$ ft tall. What is its top view?',
          choices: ['a rectangle $4$ ft by $2$ ft', 'a rectangle $4$ ft by $3$ ft', 'a rectangle $2$ ft by $3$ ft', 'a square $4$ ft by $4$ ft'],
          answer: 0,
          working: 'Looking down, you see the length and the depth: $4$ ft by $2$ ft. B is the front view, and C is the side view.',
        },
      ],
      lines: [
        { say: 'Your turn. A box is four feet long across the front, two feet deep, and three feet tall. What is its top view? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Looking down, you see the length and the depth: four feet by two feet. B is the front view, and C is the side view.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Isometric: three faces at once; vertical edges vertical, others at $30^\\circ$.', 'Top: length × depth. Front: length × height. Side: depth × height.', 'Drawings show the look; views give the exact faces.'] }],
      lines: [
        { say: 'Let’s sum up. An isometric drawing shows three faces at once, with vertical edges vertical and the others at thirty degrees.', show: 'sum.0' },
        { say: 'The top view shows the length and depth, the front view the length and height, and the side view the depth and height.', show: 'sum.1' },
        { say: 'And drawings show the look, while views give the exact faces. In part four, we work backward from views. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
