import type { Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm202-2-4',
  lessonId: 'm202-2-4',
  title: 'Congruent Triangles, Part 1: Corresponding Parts',
  thumbnailTitle: 'Congruent Triangles',
  thumbnail: 'cg',
  summary: 'What congruent figures are, how tick marks and arcs show equal sides and angles, how the order of the letters in △ABC ≅ △DEF matches the parts, and listing the equal sides and angles of △PQR ≅ △XYZ. Part 2 shows the three ways to prove triangles congruent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.4 · Part 1', title: 'Congruent Triangles', subtitle: 'Same size, same shape' }],
      lines: [
        { say: 'Roof trusses, bridge supports and quilt patterns use many identical triangles. Builders need to know that two triangles match exactly.', show: 'title' },
        { say: 'In this video, you will learn what congruent triangles are, and how to match their parts.' },
      ],
    },
    {
      chapter: 'Congruent figures',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Congruent', md: 'Two figures are **congruent** if they have exactly the same size and shape. In congruent triangles, all three pairs of corresponding sides and all three pairs of corresponding angles are equal.' },
        figure('cg', [
          triangle({ name: 't1', A: [0, 0], B: [5, 0], C: [1.4, 3.2], names: ['A', 'B', 'C'], ticks: { AB: 1, BC: 2, CA: 3 }, arcs: { A: 1, B: 2, C: 3 } }),
          triangle({ name: 't2', A: [12, 3.2], B: [7, 3.2], C: [10.6, 0], names: ['D', 'E', 'F'], ticks: { AB: 1, BC: 2, CA: 3 }, arcs: { A: 1, B: 2, C: 3 } }),
        ], 250),
      ],
      lines: [
        { say: 'Two figures are congruent if they have exactly the same size and shape. One could be placed exactly on top of the other, even if it has to be turned or flipped first.', show: 'def' },
        { say: 'In congruent triangles, all three pairs of corresponding sides are equal, and all three pairs of corresponding angles are equal. These two triangles are congruent; the second one is turned upside down.', show: ['cg.t1-shape', 'cg.t1-names', 'cg.t2-shape', 'cg.t2-names'] },
        { say: 'In diagrams, matching tick marks show equal sides. One tick on "A" B and D E, two on B C and E F, and three on C "A" and F D.', show: ['cg.t1-tAB', 'cg.t2-tAB', 'cg.t1-tBC', 'cg.t2-tBC', 'cg.t1-tCA', 'cg.t2-tCA'], focus: ['cg.t1-tAB', 'cg.t2-tAB'] },
        { say: 'And matching arcs show equal angles: angle "A" matches angle D, B matches E, and C matches F.', show: ['cg.t1-mA', 'cg.t2-mA', 'cg.t1-mB', 'cg.t2-mB', 'cg.t1-mC', 'cg.t2-mC'], focus: ['cg.t1-mA', 'cg.t2-mA'] },
      ],
    },
    {
      chapter: 'Naming congruent triangles',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\triangle ABC \\cong \\triangle DEF', 'A \\leftrightarrow D,\\quad B \\leftrightarrow E,\\quad C \\leftrightarrow F', 'AB = DE,\\quad BC = EF,\\quad CA = FD'] }],
      lines: [
        { say: 'This statement says triangle "A" B C is congruent to triangle D E F. The symbol is an equals sign with a wave above it: same shape, and same size.', show: 'm.0', focus: 'm.0' },
        { say: 'The order of the letters matters. It shows which parts match: the first letters, "A" and D, match, then B and E, then C and F.', show: 'm.1', focus: 'm.1' },
        { say: 'So the sides match in the same order: "A" B equals D E, B C equals E F, and C "A" equals F D. Writing the letters in the wrong order would claim that the wrong parts are equal.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Corresponding parts',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\triangle PQR \\cong \\triangle XYZ', 'PQ = XY,\\quad QR = YZ,\\quad PR = XZ', '\\angle P = \\angle X,\\quad \\angle Q = \\angle Y,\\quad \\angle R = \\angle Z'] }],
      lines: [
        { say: 'Triangle P Q R is congruent to triangle X Y Z. List the equal sides and the equal angles. Match the letters in order: P with X, Q with Y, and R with Z.', show: 'm.0', focus: 'm.0' },
        { say: 'For the sides, take the letters in pairs from the same positions. P Q equals X Y, Q R equals Y Z, and P R equals X Z.', show: 'm.1', focus: 'm.1' },
        { say: 'And for the angles: angle P equals angle X, angle Q equals angle Y, and angle R equals angle Z. That is six pairs of equal parts in all.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\triangle JKL \\cong \\triangle RST$. Which side is equal to $KL$?',
          choices: ['$ST$', '$RS$', '$RT$', '$JK$'],
          answer: 0,
          working: '$K$ matches $S$ and $L$ matches $T$ (second and third letters), so $KL = ST$.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangle J K L is congruent to triangle R S T. Which side is equal to K L? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. K and L are the second and third letters, and they match S and T, the second and third letters of R S T. So K L equals S T.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Congruent figures have the same size and shape.', 'Tick marks show equal sides; arcs show equal angles.', 'The order of the letters shows which parts correspond.'] }],
      lines: [
        { say: 'Let’s sum up. Congruent figures have exactly the same size and shape.', show: 'sum.0' },
        { say: 'In diagrams, tick marks show equal sides, and arcs show equal angles.', show: 'sum.1' },
        { say: 'And in a congruence statement, the order of the letters shows which parts correspond. In part two, we prove triangles congruent with just three pairs of parts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
