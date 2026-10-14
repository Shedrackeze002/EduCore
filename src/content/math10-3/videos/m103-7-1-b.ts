import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm103-7-1-b',
  lessonId: 'm103-7-1',
  title: 'The Pythagorean Theorem, Part 2: Finding a Leg and Checking for Square',
  thumbnailTitle: 'Finding a Leg',
  thumbnail: 'leg',
  summary: 'Rearranging a² + b² = c² to find a leg by subtracting, checking that a leg is shorter than the hypotenuse, testing three sides for a right angle, and the 3-4-5 method builders use to check that a corner is square.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 7.1 · Part 2', title: 'Finding a Leg', subtitle: 'And checking a corner for square' }],
      lines: [
        { say: 'Is the corner of a deck frame really square? A framer can check with a tape measure and three numbers: three, four and five.', show: 'title' },
        { say: 'In this video, you will find a missing leg, and use the Pythagorean theorem in reverse to test for a right angle.' },
      ],
    },
    {
      chapter: 'Finding a leg',
      layout: 'split',
      leftWidth: 520,
      left: [figure('leg', [triangle({ A: [0, 0], B: [12, 0], C: [0, 5], right: 'A', sides: { AB: 'x', CA: '5\\text{ ft}', BC: '13\\text{ ft}' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['b^2 = c^2 - a^2', '5^2 + x^2 = 13^2', 'x^2 = 169 - 25 = 144', 'x = \\sqrt{144} = 12\\text{ ft}'] }],
      lines: [
        { say: 'Sometimes you know the hypotenuse and one leg. Rearrange the formula so the unknown leg is by itself: subtract the known leg’s square from both sides.', show: 'm.0', focus: 'm.0' },
        { say: 'The hypotenuse of this right triangle is thirteen feet, and one leg is five feet. Find the other leg, x.', show: ['leg.shape', 'm.1'], focus: 'm.1' },
        { say: 'x squared is thirteen squared minus five squared: 169 minus 25, which is 144.', show: 'm.2', focus: 'm.2' },
        { say: 'The square root of 144 is twelve, so the other leg is twelve feet long.', show: 'm.3', focus: ['m.3', 'leg.AB'] },
      ],
    },
    {
      chapter: 'Subtract for a leg',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 = 15^2 - 9.5^2 = 225 - 90.25 = 134.75', 'x = \\sqrt{134.75} \\approx 11.6\\text{ cm}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding when you should subtract', md: 'Adding the squares gives a "leg" longer than the hypotenuse, which is impossible. A leg is always **shorter** than the hypotenuse.' },
      ],
      lines: [
        { say: 'The hypotenuse is fifteen centimetres, and one leg is 9.5 centimetres. x squared is 225 minus 90.25: 134.75.', show: 'm.0', focus: 'm.0' },
        { say: 'Its square root is about 11.6 centimetres, which is shorter than the hypotenuse, as it should be.', show: 'm.1', focus: 'm.1' },
        { say: 'If you add the squares when finding a leg, the answer is longer than the hypotenuse, which is impossible. So check your leg against the hypotenuse.', show: 'oops' },
      ],
    },
    {
      chapter: 'Is it a right triangle?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['7^2 + 9^2 = 49 + 81 = 130', '11^2 = 121', '130 \\ne 121 \\;\\to\\; \\text{not a right triangle}'] },
      ],
      lines: [
        { say: 'The theorem also works in reverse. If the squares of the two shorter sides add up exactly to the square of the longest side, the triangle has a right angle.', },
        { say: 'A triangle has sides of seven, nine and eleven metres. The longest side is eleven, so test the other two: 49 plus 81 is 130.', show: 'm.0', focus: 'm.0' },
        { say: 'But eleven squared is 121, and 130 is not 121. So it is not a right triangle.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'The 3-4-5 method',
      layout: 'split',
      leftWidth: 440,
      left: [figure('deck', [triangle({ A: [0, 0], B: [8, 0], C: [0, 6], right: 'A', sides: { AB: '8\\text{ ft}', CA: '6\\text{ ft}', BC: '10\\text{ ft}' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6^2 + 8^2 = 100 \\;\\to\\; 10\\text{ ft}', '9\\text{ ft } 10\\text{ in} < 10\\text{ ft}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply, do not add', md: '6-8-10 is 3-4-5 times 2. But 4-5-6 is **not** a right triangle: $4^2 + 5^2 = 41$, not $36$.' },
      ],
      lines: [
        { say: 'Builders use this to check a corner. Measure three units along one side and four along the other. If the diagonal is exactly five, the corner is square.', show: 'deck.shape' },
        { say: 'Bigger multiples are more accurate. A framer measures six feet and eight feet. For a square corner, the diagonal should be ten feet.', show: 'm.0', focus: ['m.0', 'deck.BC'] },
        { say: 'It measures nine feet ten inches: two inches short. So the angle is less than ninety degrees, and the framer pushes the sides apart.', show: 'm.1', focus: 'm.1' },
        { say: 'To get bigger measurements, multiply three, four and five by the same number. Adding the same amount does not work: four, five, six is not a right triangle.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The hypotenuse of a right triangle is $10\\text{ m}$ and one leg is $6\\text{ m}$. How long is the other leg?',
          choices: ['$8\\text{ m}$', '$11.7\\text{ m}$', '$4\\text{ m}$', '$64\\text{ m}$'],
          answer: 0,
          working: '$x^2 = 10^2 - 6^2 = 100 - 36 = 64$, so $x = \\sqrt{64} = 8\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The hypotenuse of a right triangle is ten metres, and one leg is six metres. How long is the other leg? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 100 minus 36 is 64, and its square root is eight metres. B adds the squares, which gives a leg longer than the hypotenuse, and D forgets the square root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Leg: $b^2 = c^2 - a^2$. Subtract, then take the square root.', 'If $a^2 + b^2 = c^2$ exactly, the triangle has a right angle.', 'The 3-4-5 method (or 6-8-10, 9-12-15) checks a corner for square.'] }],
      lines: [
        { say: 'Let’s sum up. To find a leg, subtract the squares, then take the square root.', show: 'sum.0' },
        { say: 'If the squares of the two shorter sides add up exactly to the square of the longest, the triangle has a right angle.', show: 'sum.1' },
        { say: 'And the three, four, five method checks a corner for square. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
