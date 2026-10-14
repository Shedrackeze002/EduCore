import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-3-1',
  lessonId: 'm202-3-1',
  title: 'The Sine Law, Part 1: Matching Pairs and the Proof',
  thumbnailTitle: 'The Sine Law',
  thumbnail: 'proof',
  summary: 'Oblique and acute triangles, naming each side after its opposite angle, matching pairs, the longest side across from the largest angle, and a proof of the sine law from the height of the triangle. Part 2 uses it to find sides.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 3.1 · Part 1', title: 'The Sine Law', subtitle: 'Triangles with no right angle' }],
      lines: [
        { say: 'Surveyors mapping a lake, pilots plotting a course, and engineers designing a bridge truss all work with triangles that have no right angle. So sine, cosine and tangent on their own are not enough.', show: 'title' },
        { say: 'In this video, you will learn how to name the parts of any triangle, and see why the sine law is true.' },
      ],
    },
    {
      chapter: 'Naming the parts',
      layout: 'split',
      leftWidth: 540,
      left: [figure('lab', [triangle({ A: [0, 0], B: [6, 0], C: [4.1, 4.4], names: ['A', 'B', 'C'], sides: { BC: 'a', CA: 'b', AB: 'c' }, tones: { BC: 'opp' }, angles: { A: 'A' }, angleTones: { A: 'opp' } })])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Oblique triangle', md: 'A triangle with **no right angle**. In this unit, every triangle is **acute**: all three angles are less than $90^\\circ$.' }],
      lines: [
        { say: 'An oblique triangle is a triangle with no right angle. In this unit, every triangle is acute, so all three angles are less than ninety degrees.', show: ['lab.shape', 'lab.names', 'def'] },
        { say: 'Name the vertices with capital letters. Then name each side with the lower-case letter of the angle opposite it. Side "a" is across from angle "A", side b is across from angle B, and side c is across from angle C.', show: ['lab.BC', 'lab.CA', 'lab.AB'] },
        { say: 'A side and the angle opposite it make a matching pair, like side "a" and angle "A". The sine law is built from matching pairs.', show: 'lab.aA', focus: ['lab.BC', 'lab.aA'] },
      ],
    },
    {
      chapter: 'Biggest across from biggest',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Biggest across from biggest', md: 'In any triangle, the **longest** side is opposite the **largest** angle, and the shortest side is opposite the smallest angle. Use this to check your answers.' }],
      lines: [
        { say: 'One fact will help you check every answer in this unit. In any triangle, the longest side is opposite the largest angle, and the shortest side is opposite the smallest angle.', show: 'tip' },
        { say: 'So if you find that a side across from a small angle is the longest side, something has gone wrong.' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'split',
      leftWidth: 520,
      left: [figure('proof', [triangle({ A: [0, 0], B: [6, 0], C: [4.1, 4.4], names: ['A', 'B', 'C'], sides: { BC: 'a', CA: 'b' }, angles: { A: 'A', B: 'B' }, altitude: 'C', altitudeLabel: 'h' })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin A = \\dfrac{h}{b},\\quad h = b\\sin A', '\\sin B = \\dfrac{h}{a},\\quad h = a\\sin B', 'a\\sin B = b\\sin A', '\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}'] }],
      lines: [
        { say: 'Draw the height h from C straight down to side "A" B. It splits the triangle into two right triangles.', show: ['proof.shape', 'proof.names', 'proof.BC', 'proof.CA', 'proof.alt'], focus: 'proof.alt' },
        { say: 'In the left right triangle, h is opposite angle "A", and b is the hypotenuse. So sine "A" is h over b, and h equals b sine "A".', show: ['proof.aA', 'm.0'], focus: ['proof.aA', 'm.0'] },
        { say: 'In the right one, sine B is h over "a", so h equals "a" sine B.', show: ['proof.aB', 'm.1'], focus: ['proof.aB', 'm.1'] },
        { say: 'Both expressions equal h, so "a" sine B equals b sine "A". Divide both sides by sine "A" times sine B, and "a" over sine "A" equals b over sine B.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'The sine law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}', '\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b} = \\dfrac{\\sin C}{c}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Unknown on top', md: 'To find a **side**, use the form with sides on top. To find an **angle**, use the form with sines on top.' },
      ],
      lines: [
        { say: 'Drawing the height from a different vertex brings in side c and angle C in the same way. So in any triangle, each side divided by the sine of its opposite angle gives the same value. That is the sine law.', show: 'm.0', focus: 'm.0' },
        { say: 'You can also flip every fraction, with the sines on top.', show: 'm.1', focus: 'm.1' },
        { say: 'Use the form with the unknown on top: sides on top to find a side, and sines on top to find an angle.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle PQR$, which side and angle form a matching pair?',
          choices: ['$q$ and $\\angle Q$', '$q$ and $\\angle P$', '$PQ$ and $\\angle Q$', '$r$ and $\\angle P$'],
          answer: 0,
          working: 'Side $q$ is named after the angle opposite it, $\\angle Q$. Side $PQ$ is $r$, which is opposite $\\angle R$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle P Q R, which side and angle form a matching pair? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Side q is named after the angle opposite it, angle Q. Side P Q is called r, and it is opposite angle R, not angle Q.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Side $a$ is opposite $\\angle A$: a matching pair.', 'The longest side is opposite the largest angle.', 'Sine law: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$.'] }],
      lines: [
        { say: 'Let’s sum up. Each side is named after its opposite angle, and together they make a matching pair.', show: 'sum.0' },
        { say: 'The longest side is always opposite the largest angle.', show: 'sum.1' },
        { say: 'And the sine law says each side over the sine of its opposite angle gives the same value. In part two, we use it to find sides. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
