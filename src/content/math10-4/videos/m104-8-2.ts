import type { Explainer } from '@/video/script.ts';
import { box, figure, squarePyramid, triangularPrism, type Part } from '@/video/solids.ts';

/** A dot on each named corner of a solid, as the group `verts`. */
const corners = (names: string[]): Part => ({ points: {}, items: names.map((p) => ({ kind: 'label', id: `v-${p}`, at: p, tex: '', dot: true, tone: 'hyp', group: 'verts' })) });

const video: Explainer = {
  id: 'm104-8-2',
  lessonId: 'm104-8-2',
  title: '3-D Objects, Part 1: Faces, Edges and Vertices',
  thumbnailTitle: 'Faces, Edges and Vertices',
  thumbnail: 'box',
  summary: 'The faces, edges and vertices of a shipping box (6, 12 and 8), counted in groups so none are missed, prisms and pyramids named by their ends or base, and a camping tent as a triangular prism (5, 9 and 6). Part 2 covers nets and views.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 8.2 · Part 1', title: 'Faces, Edges and Vertices', subtitle: 'The parts of a 3-D object' }],
      lines: [
        { say: 'Boxes in a warehouse, tents at a campground and the roof of a gazebo are all 3-D objects. Knowing their parts helps you build them, pack them and stack them.', show: 'title' },
        { say: 'In this video, you will count the faces, edges and vertices of 3-D objects, and name prisms and pyramids.' },
      ],
    },
    {
      chapter: 'Faces, edges and vertices',
      layout: 'split',
      leftWidth: 520,
      left: [figure('box', [box({ l: 4, w: 3, h: 2.5 }), corners(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])])],
      right: [
        { kind: 'bullets', id: 'b', items: ['A **face** is a flat surface.', 'An **edge** is where two faces meet.', 'A **vertex** is a corner where edges meet.'] },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{faces: } 6', '\\text{edges: } 4 + 4 + 4 = 12', '\\text{vertices: } 4 + 4 = 8'] },
      ],
      lines: [
        { say: 'A shipping box is a rectangular prism. In the drawing, dashed lines show the edges you cannot see from the front.', show: 'box.shape' },
        { say: 'A face is a flat surface of a 3-D object. An edge is a line where two faces meet. And a vertex is a corner where edges meet. We say one vertex, and two or more vertices.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Count the faces: top, bottom, front, back, left and right. That is six faces.', show: ['box.front-face', 'box.top-face', 'box.side-face', 'm.0'], focus: 'm.0' },
        { say: 'Count the edges in groups: four around the top, four around the bottom and four going up the sides. Four plus four plus four is twelve edges.', show: 'm.1', focus: ['box.shape', 'm.1'] },
        { say: 'Count the vertices: four corners on the top and four on the bottom, so eight vertices.', show: ['box.verts', 'm.2'], focus: ['box.verts', 'm.2'] },
      ],
    },
    {
      chapter: 'Hidden parts',
      layout: 'split',
      leftWidth: 520,
      left: [figure('hid', [box({ l: 4, w: 3, h: 2.5 })])],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the hidden parts', md: 'Count the back, the bottom and the dashed edges too. Count in groups (top, bottom, sides) so you do not miss any or count any twice.' }],
      lines: [
        { say: 'A drawing shows only three faces of the box, and only nine of its edges are solid lines. The back, the bottom and the dashed edges are still there.', show: ['hid.shape', 'oops'], focus: ['hid.ae', 'hid.ef', 'hid.eh'] },
        { say: 'So count in groups, like the top, the bottom and the sides. That way you do not miss any, and you do not count any twice.' },
      ],
    },
    {
      chapter: 'Prisms and pyramids',
      layout: 'split',
      leftWidth: 620,
      left: [figure('pp', [triangularPrism({ name: 'tp', b: 3, t: 2.4, l: 4 }), squarePyramid({ name: 'sp', at: [6.5, 0], b: 3, h: 3.4 })])],
      right: [{ kind: 'bullets', id: 'b', items: ['A **prism** has two matching ends joined by rectangles.', 'A **pyramid** has one base, and triangles that meet at one point.', 'Each is named by the shape of its end or base.'] }],
      lines: [
        { say: 'A prism has two matching ends, joined by rectangles. This prism has triangles at its ends, so it is a triangular prism. A box is a rectangular prism, and a cube is a rectangular prism with six square faces.', show: ['pp.tp-shape', 'b.0'] },
        { say: 'A pyramid has one base, and triangles that meet at one point at the top. This pyramid has a square base, so it is a square pyramid.', show: ['pp.sp-shape', 'b.1'] },
        { say: 'So we name each one by the shape of its end, or of its base.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A camping tent',
      layout: 'split',
      leftWidth: 520,
      left: [figure('tent', [triangularPrism({ b: 3, t: 2.4, l: 5 }), corners(['A', 'B', 'C', 'D', 'E', 'F'])])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{faces: } 2 + 3 = 5', '\\text{edges: } 3 + 3 + 3 = 9', '\\text{vertices: } 3 + 3 = 6'] },
        { kind: 'table', id: 't', head: ['Object', 'Faces', 'Edges', 'Vertices'], rows: [['Cube', '6', '12', '8'], ['Rectangular prism', '6', '12', '8'], ['Triangular prism', '5', '9', '6']] },
      ],
      lines: [
        { say: 'A camping tent is a triangular prism. Count its faces: two triangle ends and three rectangles. Two plus three is five faces.', show: ['tent.shape', 'tent.front-face', 'tent.side-face', 'm.0'], focus: 'm.0' },
        { say: 'Its edges: three on each end, and three joining the ends. Three plus three plus three is nine edges.', show: 'm.1', focus: ['tent.shape', 'm.1'] },
        { say: 'Its vertices: three on each end, so six vertices.', show: ['tent.verts', 'm.2'], focus: ['tent.verts', 'm.2'] },
        { say: 'Here are the counts side by side. A cube and a rectangular prism have the same number of faces, edges and vertices, because a cube is a rectangular prism.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A square pyramid has a square base and $4$ triangle faces. How many edges does it have?',
          choices: ['$8$', '$5$', '$4$', '$12$'],
          answer: 0,
          working: '$4$ edges around the base and $4$ going up to the top: $4 + 4 = 8$ edges.',
        },
      ],
      lines: [
        { say: 'Your turn. A square pyramid has a square base and four triangle faces. How many edges does it have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. There are four edges around the base, and four going up to the top: eight edges. B counts the faces, and D counts the edges of a box.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Faces are flat surfaces, edges are where faces meet, and vertices are corners.', 'Count in groups, and include the hidden parts.', 'A prism has two matching ends. A pyramid has one base and triangles that meet at a point.'] }],
      lines: [
        { say: 'Let’s sum up. Faces are flat surfaces, edges are where two faces meet, and vertices are corners.', show: 'sum.0' },
        { say: 'Count in groups, and include the parts you cannot see.', show: 'sum.1' },
        { say: 'And a prism has two matching ends, while a pyramid has one base and triangles that meet at a point. In part two, we fold nets and draw views. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
