import type { DiagramItem, Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** Letters placed beside points, as one group `letters` (for figures built from two triangles that share a corner). */
function letters(list: [string, P, 'above' | 'below' | 'left' | 'right' | 'above left' | 'above right' | 'below left' | 'below right'][]): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (const [tex, p, place] of list) {
    points[`L${tex}`] = p;
    items.push({ kind: 'label', id: `L${tex}`, at: `L${tex}`, tex, place, group: 'letters' });
  }
  return { points, items };
}

const A: P = [0.8, 4.4];
const B: P = [2.2, 0.8];
const C: P = [7.2, 1.6];
const D: P = [5.8, 5.2];
const E: P = [4, 3];

const K: P = [3, 5];
const L: P = [0.8, 2.8];
const M: P = [3, 0];
const N: P = [5.2, 2.8];

const video: Explainer = {
  id: 'm202-2-4-c',
  lessonId: 'm202-2-4',
  title: 'Congruent Triangles, Part 3: Congruence Proofs',
  thumbnailTitle: 'Two-Column Congruence Proofs',
  thumbnail: 'bt',
  summary: 'Writing two-column congruence proofs: two triangles that meet at a shared midpoint (SAS with vertically opposite angles), a kite split by its diagonal (SSS with a common side), and the reasons that come up most often.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.4 · Part 3', title: 'Congruence Proofs', subtitle: 'Three pairs, three reasons' }],
      lines: [
        { say: 'A congruence proof is a short argument: three pairs of equal parts, a reason for each, and then the condition that ties them together.', show: 'title' },
        { say: 'In this video, you will write two-column proofs that triangles are congruent.' },
      ],
    },
    {
      chapter: 'A proof with a midpoint',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('bt', [
          triangle({ name: 'u', A, B: E, C: B, ticks: { AB: 1, BC: 2 }, arcs: { B: 1 }, tones: { CA: 'muted' } }),
          triangle({ name: 'v', A: C, B: E, C: D, ticks: { AB: 1, BC: 2 }, arcs: { B: 1 }, tones: { CA: 'muted' } }),
          letters([['A', A, 'left'], ['B', B, 'below'], ['C', C, 'right'], ['D', D, 'above'], ['E', [4, 2.8], 'below']]),
        ], 380),
      ],
      right: [{ kind: 'table', id: 't', head: ['Statement', 'Reason'], rows: [['$AE = CE$', 'Midpoint'], ['$BE = DE$', 'Midpoint'], ['$\\angle AEB = \\angle CED$', 'Vertically opposite'], ['$\\triangle AEB \\cong \\triangle CED$', 'SAS']] }],
      lines: [
        { say: 'Given: E is the midpoint of "A" C, and of B D. Prove that triangle "A" E B is congruent to triangle C E D.', show: ['bt.u-shape', 'bt.v-shape', 'bt.letters'] },
        { say: 'A midpoint cuts a segment into two equal parts. So "A" E equals C E, and B E equals D E, by the definition of midpoint.', show: ['bt.u-tAB', 'bt.v-tAB', 'bt.u-tBC', 'bt.v-tBC', 't.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Angles "A" E B and C E D are vertically opposite, so they are equal.', show: ['bt.u-mB', 'bt.v-mB', 't.2'], focus: ['bt.u-mB', 'bt.v-mB', 't.2'] },
        { say: 'Each angle is between the two equal sides, so it is the included angle. The triangles are congruent by S A S.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'A common side',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('kt', [
          triangle({ name: 'u', A: K, B: L, C: M, ticks: { AB: 1, BC: 2 }, tones: { CA: 'good' } }),
          triangle({ name: 'v', A: K, B: N, C: M, ticks: { AB: 1, BC: 2 }, tones: { CA: 'good' } }),
          letters([['K', K, 'above'], ['L', L, 'left'], ['M', M, 'below'], ['N', N, 'right']]),
        ], 380),
      ],
      right: [{ kind: 'table', id: 't', head: ['Statement', 'Reason'], rows: [['$KL = KN$', 'Given'], ['$ML = MN$', 'Given'], ['$KM = KM$', 'Common side'], ['$\\triangle KLM \\cong \\triangle KNM$', 'SSS']] }],
      lines: [
        { say: 'In kite K L M N, K L equals K N, and M L equals M N. Prove that the diagonal K M splits it into two congruent triangles.', show: ['kt.u-shape', 'kt.v-shape', 'kt.letters', 'kt.u-tAB', 'kt.v-tAB', 'kt.u-tBC', 'kt.v-tBC'] },
        { say: 'Two pairs of sides are given: K L equals K N, and M L equals M N.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'The third side, K M, belongs to both triangles. A side shared by both triangles is equal to itself, and the reason is called common side.', show: 't.2', focus: ['kt.u-CA', 't.2'] },
        { say: 'Three pairs of equal sides, so the triangles are congruent by S S S.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Reasons you will use often',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Common side**: a side shared by both triangles.', '**Midpoints and bisectors** create equal parts.', '**Parallel lines** create equal alternate angles.', '**Crossing lines** create equal vertically opposite angles.'] }],
      lines: [
        { say: 'Some reasons come up again and again. A side shared by both triangles is a common side.', show: 'b.0' },
        { say: 'Midpoints and angle bisectors create equal parts.', show: 'b.1' },
        { say: 'Parallel lines create equal alternate angles, and crossing lines create equal vertically opposite angles.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\triangle PQS$ and $\\triangle RQS$ share side $QS$. $PQ = RQ$ and $\\angle PQS = \\angle RQS$. Which condition proves them congruent?',
          choices: ['SAS', 'SSS', 'ASA', 'None: this is SSA.'],
          answer: 0,
          working: '$PQ = RQ$ (given), $\\angle PQS = \\angle RQS$ (given) and $QS = QS$ (common side). The angle at $Q$ is between $PQ$ and $QS$, so it is included: SAS.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangles P Q S and R Q S share side Q S. P Q equals R Q, and angle P Q S equals angle R Q S. Which condition proves them congruent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two sides are given equal, and Q S is a common side. The angle at Q is between P Q and Q S, so it is the included angle. That is S A S.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['List three pairs of equal parts, each with a reason.', 'Then name the condition: SSS, SAS or ASA.', 'Look for common sides, midpoints, parallel lines and crossing lines.'] }],
      lines: [
        { say: 'Let’s sum up. In a congruence proof, list three pairs of equal parts, each with a reason.', show: 'sum.0' },
        { say: 'Then name the condition: S S S, S A S, or "A" S "A".', show: 'sum.1' },
        { say: 'And look for common sides, midpoints, parallel lines and crossing lines, which give you equal parts. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
