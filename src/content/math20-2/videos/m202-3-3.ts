import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-3-3',
  lessonId: 'm202-3-3',
  title: 'Solving Problems with the Sine and Cosine Laws, Part 1: Choosing a Method',
  thumbnailTitle: 'Sine Law or Cosine Law?',
  thumbnail: 'xyz',
  summary: 'Sketching a triangle and asking one question, "do I have a matching pair?", to choose between the sine law, the angle sum, the cosine law and SOH CAH TOA, why two sides and the angle between them need the cosine law, and why three angles never fix a triangle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 3.3 · Part 1', title: 'Sine Law or Cosine Law?', subtitle: 'Choosing a method' }],
      lines: [
        { say: 'Real problems do not come labelled "sine law" or "cosine law". A forestry crew locating a fire, or a surveyor measuring a lake, must first sketch the triangle, and then choose a tool.', show: 'title' },
        { say: 'In this video, you will learn one question that tells you which law to use.' },
      ],
    },
    {
      chapter: 'One question',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Do I have a matching pair?', md: 'Sketch the triangle, mark the known sides and angles, and circle what you want. Then look for a known side **and** the known angle opposite it.' },
        { kind: 'table', id: 't', head: ['You know', 'Use'], rows: [['A matching pair, plus one more part', 'Sine law'], ['Two angles and any side', 'Angle sum, then sine law'], ['Two sides and the contained angle, or three sides', 'Cosine law'], ['A right angle', 'SOH CAH TOA']] },
      ],
      lines: [
        { say: 'Start every problem with a sketch. Mark the sides and angles you know, and circle what you want. Then ask one question: do I have a matching pair, a known side and the known angle opposite it?', show: 'key' },
        { say: 'If you do, and you know one more side or angle, use the sine law.', show: 't.0', focus: 't.0' },
        { say: 'If you know two angles and any side, the angle sum gives the third angle, and that completes a pair for the sine law.', show: 't.1', focus: 't.1' },
        { say: 'With two sides and the contained angle, or three sides, there is no pair, so use the cosine law. And if the triangle has a right angle, the primary ratios, SOH CAH TOA, are quickest.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Which law?',
      layout: 'split',
      leftWidth: 500,
      left: [figure('xyz', [triangle({ A: [0, 0], B: [5.25, 0], C: [1.84, 3.78], names: ['Y', 'X', 'Z'], sides: { AB: '15', CA: '12', BC: 'y' }, tones: { BC: 'opp' }, angles: { A: '64^\\circ' }, angleTones: { A: 'opp' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle Y \\text{ is between } x \\text{ and } z', 'y \\text{ is unknown: no matching pair}', 'y^2 = x^2 + z^2 - 2xz\\cos Y'] }],
      lines: [
        { say: 'In triangle X Y Z, x is twelve, z is fifteen, and angle Y is sixty-four degrees. You want y. Which method should you use?', show: ['xyz.shape', 'xyz.names', 'xyz.AB', 'xyz.CA', 'xyz.aA', 'xyz.BC'] },
        { say: 'Angle Y is between sides x and z, so it is their contained angle.', show: 'm.0', focus: ['xyz.aA', 'm.0'] },
        { say: 'Side y is opposite angle Y, but y is the unknown, so there is no complete matching pair.', show: 'm.1', focus: ['xyz.BC', 'm.1'] },
        { say: 'Two sides and the contained angle: use the cosine law. y squared equals x squared plus z squared, minus two x z cosine Y.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two common traps',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the sine law without a matching pair', md: '"Two sides and an angle" is not enough for the sine law. The angle must be **opposite** one of the known sides. If it is between them, use the cosine law.' },
        { kind: 'callout', id: 'note', tone: 'key', title: 'Three angles never fix a triangle', md: 'A small triangle and a large one can have the same three angles. You always need at least one side.' },
      ],
      lines: [
        { say: 'Two traps to avoid. First, knowing two sides and an angle is not enough for the sine law. The angle must be opposite one of the known sides. If it is between them, use the cosine law.', show: 'oops' },
        { say: 'Second, three angles alone never fix a triangle. A small triangle and a large one can have the same three angles, so you always need at least one side.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle KLM$, you know $k = 8$, $\\angle K = 40^\\circ$ and $\\angle L = 75^\\circ$. You want $l$. Which method should you use?',
          choices: ['Sine law', 'Cosine law', 'Angle sum, then cosine law', 'SOH CAH TOA'],
          answer: 0,
          working: '$k$ and $\\angle K$ are a matching pair, and $l$ is opposite the known $\\angle L$, so $\\dfrac{l}{\\sin 75^\\circ} = \\dfrac{8}{\\sin 40^\\circ}$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle K L M, you know k is eight, angle K is forty degrees, and angle L is seventy-five degrees. You want l. Which method should you use? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Side k and angle K are a matching pair, and l is opposite the known angle L. So the sine law gives l directly.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sketch, mark what you know, and look for a matching pair.', 'A matching pair: sine law. SAS or SSS: cosine law.', 'A right angle: SOH CAH TOA. Three angles alone: not enough.'] }],
      lines: [
        { say: 'Let’s sum up. Sketch the triangle, mark what you know, and look for a matching pair.', show: 'sum.0' },
        { say: 'With a matching pair, use the sine law. With two sides and the contained angle, or three sides, use the cosine law.', show: 'sum.1' },
        { say: 'With a right angle, use SOH CAH TOA. In part two, we solve surveying and navigation problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
