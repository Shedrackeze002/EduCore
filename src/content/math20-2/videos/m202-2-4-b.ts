import type { Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm202-2-4-b',
  lessonId: 'm202-2-4',
  title: 'Congruent Triangles, Part 2: SSS, SAS and ASA',
  thumbnailTitle: 'SSS, SAS and ASA',
  thumbnail: 'sa',
  summary: 'The three conditions that prove triangles congruent (SSS, SAS and ASA), reading tick marks and arcs to choose SAS, and why SSA and AAA are not enough, with two different triangles that share two sides and an angle that is not included.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.4 · Part 2', title: 'SSS, SAS and ASA', subtitle: 'Three pairs are enough' }],
      lines: [
        { say: 'Congruent triangles have six pairs of equal parts. But to prove two triangles are congruent, you only need to check three, if they are the right three.', show: 'title' },
        { say: 'In this video, you will learn the three conditions that prove congruence, and two that do not.' },
      ],
    },
    {
      chapter: 'Three conditions',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**SSS**: all three pairs of corresponding sides are equal.', '**SAS**: two pairs of sides are equal, and so are the angles **between** them (the included angles).', '**ASA**: two pairs of angles are equal, and so are the sides **between** them (the included sides).'] }],
      lines: [
        { say: 'Any one of these three conditions proves that two triangles are congruent.' },
        { say: 'S S S, side side side: all three pairs of corresponding sides are equal.', show: 'b.0' },
        { say: 'S A S, side angle side: two pairs of sides are equal, and so are the angles between them, called the included angles.', show: 'b.1' },
        { say: 'And "A" S "A", angle side angle: two pairs of angles are equal, and so are the sides between them, the included sides.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Which condition?',
      layout: 'center',
      main: [
        figure('sa', [
          triangle({ name: 'p', A: [1.136, 2.104], B: [5.53, 2.335], C: [3.557, 4.526], names: ['A', 'B', 'C'], ticks: { AB: 1, CA: 2 }, arcs: { A: 1 } }),
          triangle({ name: 'q', A: [11.864, 4.498], B: [7.73, 2.993], C: [10.257, 1.474], names: ['D', 'E', 'F'], ticks: { AB: 1, CA: 2 }, arcs: { A: 1 } }),
        ], 280),
        { kind: 'math', id: 'm', size: 'md', lines: ['AB = DE,\\quad AC = DF,\\quad \\angle A = \\angle D', '\\triangle ABC \\cong \\triangle DEF \\;\\text{(SAS)}'] },
      ],
      lines: [
        { say: 'Which condition proves that triangle "A" B C is congruent to triangle D E F?', show: ['sa.p-shape', 'sa.p-names', 'sa.q-shape', 'sa.q-names'] },
        { say: 'The single tick marks show that "A" B equals D E, and the double tick marks show that "A" C equals D F. The arcs show that angle "A" equals angle D.', show: ['sa.p-tAB', 'sa.q-tAB', 'sa.p-tCA', 'sa.q-tCA', 'sa.p-mA', 'sa.q-mA', 'm.0'], focus: 'm.0' },
        { say: 'Angle "A" is between sides "A" B and "A" C, so it is the included angle. Two sides and the included angle: the triangles are congruent by S A S.', show: 'm.1', focus: ['sa.p-mA', 'sa.q-mA', 'm.1'] },
      ],
    },
    {
      chapter: 'Not enough information',
      layout: 'center',
      main: [
        figure('ss', [
          triangle({ name: 'p', A: [1.16, 1.327], B: [5.506, 2.015], C: [4.625, 4.673], names: ['A', 'B', 'C'], ticks: { AB: 1, BC: 2 }, arcs: { A: 1 } }),
          triangle({ name: 'q', A: [7.706, 2.376], B: [11.84, 3.881], C: [10.016, 1.757], names: ['D', 'E', 'F'], ticks: { AB: 1, BC: 2 }, arcs: { A: 1 } }),
        ], 280),
        { kind: 'bullets', id: 'b', items: ['**SSA**: the angle is not between the two sides.', '**AAA**: same shape, but possibly different sizes.'] },
      ],
      lines: [
        { say: 'Two other patterns do not prove congruence. Here, "A" B equals D E, B C equals E F, and angle "A" equals angle D.', show: ['ss.p-shape', 'ss.p-names', 'ss.q-shape', 'ss.q-names', 'ss.p-tAB', 'ss.q-tAB', 'ss.p-tBC', 'ss.q-tBC', 'ss.p-mA', 'ss.q-mA'] },
        { say: 'But angle "A" is not between the two marked sides. This is S S "A", and the two triangles are clearly different. Two different triangles can fit the same information.', show: 'b.0', focus: ['ss.p-mA', 'ss.q-mA', 'b.0'] },
        { say: 'And "A" "A" "A", three pairs of equal angles, is not enough either. The triangles have the same shape, but one can be an enlargement of the other.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Using an angle that is not included',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using an angle that is not included', md: '"Two sides and an angle" proves congruence only when the angle is **formed by** those two sides. Check where the angle is before choosing SAS.' }],
      lines: [
        { say: 'So two sides and an angle prove congruence only when the angle is formed by those two sides. Always check where the angle is before you choose S A S.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle ABC$ and $\\triangle DEF$, $AB = DE$, $BC = EF$ and $\\angle C = \\angle F$. Which condition proves them congruent?',
          choices: ['None: this is SSA.', 'SAS', 'SSS', 'ASA'],
          answer: 0,
          working: 'The angle between $AB$ and $BC$ is $\\angle B$, not $\\angle C$. So the angle is not included, and SSA does not prove congruence.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangles "A" B C and D E F, "A" B equals D E, B C equals E F, and angle C equals angle F. Which condition proves them congruent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The angle between "A" B and B C is angle B, not angle C. The angle is not included, so this is S S "A", which does not prove congruence.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['SSS, SAS and ASA each prove two triangles are congruent.', 'In SAS the angle is between the sides; in ASA the side is between the angles.', 'SSA and AAA do not prove congruence.'] }],
      lines: [
        { say: 'Let’s sum up. S S S, S A S and "A" S "A" each prove that two triangles are congruent.', show: 'sum.0' },
        { say: 'In S A S, the angle must be between the two sides, and in "A" S "A", the side must be between the two angles.', show: 'sum.1' },
        { say: 'And S S "A" and "A" "A" "A" do not prove congruence. In part three, we write congruence proofs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
