import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-3-2',
  lessonId: 'm202-3-2',
  title: 'The Cosine Law, Part 1: When the Sine Law Cannot Start',
  thumbnailTitle: 'The Cosine Law',
  thumbnail: 'proof',
  summary: 'Why two sides and the contained angle (SAS), or three sides (SSS), give no matching pair for the sine law, a proof of the cosine law from the height of the triangle, its three forms, and how it becomes the Pythagorean theorem when the angle is 90°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 3.2 · Part 1', title: 'The Cosine Law', subtitle: 'The Pythagorean theorem, corrected' }],
      lines: [
        { say: 'The sine law needs a matching pair: a known side, and the known angle opposite it. Sometimes you simply do not have one.', show: 'title' },
        { say: 'In this video, you will see when the sine law cannot start, and prove the law that can: the cosine law.' },
      ],
    },
    {
      chapter: 'No matching pair',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**SAS**: two sides and the angle between them, such as $a$, $b$ and $\\angle C$.', '**SSS**: all three sides, $a$, $b$ and $c$, and no angles.'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Contained angle', md: 'The **contained angle** of two sides is the angle between them, where they meet. $\\angle C$ is the contained angle of sides $a$ and $b$.' },
      ],
      lines: [
        { say: 'In two cases, there is no side together with its opposite angle, so every sine law ratio would have two unknowns.', show: 'b' },
        { say: 'The first is S A S: two sides, and the angle between them, such as "a", b, and angle C.', show: 'b.0', focus: 'b.0' },
        { say: 'The second is S S S: all three sides, and no angles at all.', show: 'b.1', focus: 'b.1' },
        { say: 'The angle between two sides, at the vertex where they meet, is called their contained angle. Angle C is the contained angle of sides "a" and b.', show: 'def' },
      ],
    },
    {
      chapter: 'Proving the cosine law',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('proof', [
          triangle({ A: [0, 0], B: [6.5, 0], C: [4.5, 5], names: ['A', 'B', 'C'], sides: { BC: 'a', CA: 'b' }, tones: { BC: 'opp', CA: 'adj' }, angles: { A: 'A' }, altitude: 'C', altitudeLabel: 'h' }),
          { points: { xl: [2.25, 0], cl: [5.5, 0] }, items: [{ kind: 'label', id: 'x', at: 'xl', tex: 'x', place: 'below', group: 'parts' }, { kind: 'label', id: 'cx', at: 'cl', tex: 'c - x', place: 'below', group: 'parts' }] },
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = b\\cos A,\\quad h^2 = b^2 - x^2', 'a^2 = h^2 + (c - x)^2', 'a^2 = b^2 - x^2 + c^2 - 2cx + x^2', 'a^2 = b^2 + c^2 - 2bc\\cos A'] }],
      lines: [
        { say: 'Draw the height h from C to side "A" B. It splits side c into two parts: x next to "A", and c minus x next to B.', show: ['proof.shape', 'proof.names', 'proof.BC', 'proof.CA', 'proof.alt', 'proof.parts'], focus: ['proof.alt', 'proof.parts'] },
        { say: 'In the left right triangle, cosine "A" is x over b, so x is b cosine "A". And by the Pythagorean theorem, h squared is b squared minus x squared.', show: ['proof.aA', 'm.0'], focus: ['proof.CA', 'm.0'] },
        { say: 'In the right one, the Pythagorean theorem gives "a" squared equals h squared, plus c minus x, all squared.', show: 'm.1', focus: ['proof.BC', 'm.1'] },
        { say: 'Substitute for h squared, and expand. The x squared terms cancel, leaving b squared plus c squared, minus two c x.', show: 'm.2', focus: 'm.2' },
        { say: 'Replace x with b cosine "A", and you have the cosine law.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Three forms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['c^2 = a^2 + b^2 - 2ab\\cos C', 'a^2 = b^2 + c^2 - 2bc\\cos A', 'b^2 = a^2 + c^2 - 2ac\\cos B'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The Pythagorean connection', md: 'If $\\angle C = 90^\\circ$, then $\\cos C = 0$ and the law becomes $c^2 = a^2 + b^2$. The term $-2ab\\cos C$ corrects the Pythagorean theorem for other angles.' },
      ],
      lines: [
        { say: 'The same pattern works for every side. The side on the left is always opposite the angle on the right, and the other two sides appear in the rest of the formula.', show: ['m.0', 'm.1', 'm.2'], focus: 'm.0' },
        { say: 'Notice what happens when angle C is ninety degrees. Cosine ninety is zero, so the last term disappears, and c squared equals "a" squared plus b squared: the Pythagorean theorem.', show: 'tip' },
        { say: 'So the cosine law is the Pythagorean theorem, with a correction for angles that are not ninety degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which set of information gives no matching pair, so the cosine law is needed to start?',
          choices: ['$a$, $b$ and $\\angle C$', '$a$, $\\angle A$ and $\\angle B$', '$a$, $b$ and $\\angle A$', '$\\angle A$, $\\angle B$ and $c$'],
          answer: 0,
          working: '$\\angle C$ is the contained angle of $a$ and $b$, and $c$ is unknown: SAS. B and C contain the pair $a$ and $\\angle A$, and in D the angle sum gives $\\angle C$ to pair with $c$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which set of information gives no matching pair, so the cosine law is needed to start? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Angle C is the contained angle of "a" and b, and side c is unknown, so there is no pair. B and C include side "a" with angle "A", and in D, the angle sum gives angle C to pair with c.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use the cosine law for SAS or SSS, when there is no matching pair.', '$c^2 = a^2 + b^2 - 2ab\\cos C$', 'With a $90^\\circ$ angle, it becomes the Pythagorean theorem.'] }],
      lines: [
        { say: 'Let’s sum up. Use the cosine law when there is no matching pair: two sides and the contained angle, or three sides.', show: 'sum.0' },
        { say: 'c squared equals "a" squared plus b squared, minus two "a" b cosine C, and the side on the left is opposite the angle on the right.', show: 'sum.1' },
        { say: 'And when the angle is ninety degrees, it becomes the Pythagorean theorem. In part two, we use it to find a side. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
