import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { standardAngle } from '@/video/trig.ts';

const deg = (r: number) => (r * 180) / Math.PI;
/** A in quadrant II with sin A = 4/5: the point (−3, 4). B in quadrant IV with cos B = 5/13: the point (5, −12). */
const A = 180 - deg(Math.atan2(4, 3));
const B = 360 - deg(Math.atan2(12, 5));

const video: Explainer = {
  id: 'm301-6-2-d',
  lessonId: 'm301-6-2',
  title: 'Sum, Difference and Double-Angle Identities, Part 4: Two Angles from Given Ratios',
  thumbnailTitle: 'Two Angles from Given Ratios',
  thumbnail: 'fa',
  summary: 'Using the sum and difference identities when A and B are not special angles: from sin A = 4/5 in quadrant II and cos B = 5/13 in quadrant IV, find the missing ratios with the correct signs, then cos(A − B) = −63/65.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.2 · Part 4', title: 'Two Angles from Given Ratios', subtitle: 'Find all four ratios first' }],
      lines: [
        { say: 'The sum and difference identities still work when the angles are not special angles, as long as you know their ratios.', show: 'title' },
        { say: 'In this video, you will determine the cosine of A minus B from one ratio of each angle and the quadrant it is in.' },
      ],
    },
    {
      chapter: 'The angle A',
      layout: 'split',
      leftWidth: 480,
      left: [figure('fa', [standardAngle({ deg: A, label: 'A', drop: true, sides: { x: '-3', y: '4', r: '5' } })])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Given $\\sin A = \\dfrac{4}{5}$ with $A$ in quadrant II, and $\\cos B = \\dfrac{5}{13}$ with $B$ in quadrant IV, determine $\\cos(A - B)$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = -\\sqrt{5^2 - 4^2} = -3', '\\cos A = -\\dfrac{3}{5}'] },
      ],
      lines: [
        { say: 'Given sine A equals four fifths, with A in quadrant two, and cosine B equals five over thirteen, with B in quadrant four, determine the cosine of A minus B.', show: 'q' },
        { say: 'The identity for the cosine of A minus B needs all four ratios: cosine A, cosine B, sine A and sine B. So first, find the two that are missing.' },
        { say: 'Start with angle A. Sine A is y over r, so y is four and r is five, with the terminal arm in quadrant two.', show: ['fa.axes', 'fa.arm', 'fa.arc', 'fa.P', 'fa.tri', 'fa.y', 'fa.r'], focus: ['fa.y', 'fa.r'] },
        { say: 'By the Pythagorean theorem, x has length three. In quadrant two, x is negative, so x is negative three, and cosine "A" is negative three fifths.', show: ['m.0', 'm.1', 'fa.x'], focus: ['m.1', 'fa.x'] },
      ],
    },
    {
      chapter: 'The angle B',
      layout: 'split',
      leftWidth: 480,
      left: [figure('fb', [standardAngle({ deg: B, label: 'B', drop: true, sides: { x: '5', y: '-12', r: '13' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -\\sqrt{13^2 - 5^2} = -12', '\\sin B = -\\dfrac{12}{13}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Signs from the quadrant', md: 'The Pythagorean theorem only gives a length. The quadrant decides the sign: in quadrant IV, $x > 0$ and $y < 0$.' },
      ],
      lines: [
        { say: 'Now angle B. Cosine B is x over r, so x is five and r is thirteen, with the terminal arm in quadrant four.', show: ['fb.axes', 'fb.arm', 'fb.arc', 'fb.P', 'fb.tri', 'fb.x', 'fb.r'], focus: ['fb.x', 'fb.r'] },
        { say: 'The other side has length the square root of thirteen squared minus five squared, which is twelve. In quadrant four, y is negative, so sine B is negative twelve over thirteen.', show: ['m.0', 'm.1', 'fb.y'], focus: ['m.1', 'fb.y'] },
        { say: 'Be careful here. The Pythagorean theorem only gives a length. The quadrant decides the sign, and a wrong sign gives a wrong answer.', show: 'oops' },
      ],
    },
    {
      chapter: 'The cosine of A minus B',
      layout: 'split',
      leftWidth: 340,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['', '$\\sin$', '$\\cos$'],
          rows: [
            ['$A$', '$\\dfrac{4}{5}$', '$-\\dfrac{3}{5}$'],
            ['$B$', '$-\\dfrac{12}{13}$', '$\\dfrac{5}{13}$'],
          ],
        },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\cos(A - B) = \\cos A\\cos B + \\sin A\\sin B', '= \\left(-\\dfrac{3}{5}\\right)\\left(\\dfrac{5}{13}\\right) + \\left(\\dfrac{4}{5}\\right)\\left(-\\dfrac{12}{13}\\right)', '= -\\dfrac{15}{65} - \\dfrac{48}{65}', '= -\\dfrac{63}{65}'],
        },
      ],
      lines: [
        { say: 'Now all four ratios are known. Sine A is four fifths and cosine "A" is negative three fifths. Sine B is negative twelve over thirteen and cosine B is five over thirteen.', show: 't' },
        { say: 'The cosine of A minus B is cosine A cosine B, plus sine A sine B. Remember, the cosine of a difference has a plus sign.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute: negative three fifths times five over thirteen, plus four fifths times negative twelve over thirteen.', show: 'm.1', focus: 'm.1' },
        { say: 'The products are negative fifteen over 65 and negative 48 over 65.', show: 'm.2', focus: 'm.2' },
        { say: 'So the cosine of A minus B is negative 63 over 65. That is between negative one and one, as a cosine must be.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'With $\\sin A = \\dfrac{4}{5}$, $A$ in quadrant II, and $\\cos B = \\dfrac{5}{13}$, $B$ in quadrant IV, as before, determine $\\sin(A - B)$.',
          choices: ['$\\dfrac{56}{65}$', '$-\\dfrac{16}{65}$', '$\\dfrac{16}{65}$', '$-\\dfrac{63}{65}$'],
          answer: 1,
          working: 'Use $\\sin(A - B) = \\sin A\\cos B - \\cos A\\sin B$: $\\left(\\dfrac{4}{5}\\right)\\left(\\dfrac{5}{13}\\right) - \\left(-\\dfrac{3}{5}\\right)\\left(-\\dfrac{12}{13}\\right)$, which is $\\dfrac{20}{65} - \\dfrac{36}{65} = -\\dfrac{16}{65}$.',
        },
      ],
      lines: [
        { say: 'Your turn. With sine A equal to four fifths, A in quadrant two, and cosine B equal to five over thirteen, B in quadrant four, as before, determine the sine of A minus B. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The sine of A minus B is sine A cosine B minus cosine A sine B: four fifths times five over thirteen, minus negative three fifths times negative twelve over thirteen. That is 20 over 65 minus 36 over 65, which is negative 16 over 65. Choice A adds the two products, which gives the sine of A plus B instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['When $A$ and $B$ are not special angles, find all four ratios first.', 'Sketch each angle: the Pythagorean theorem gives a length, and the quadrant gives the sign.', 'Then substitute into the sum or difference identity and simplify.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the angles are not special angles, find all four ratios first.', show: 'sum.0' },
        { say: 'Sketch each angle. The Pythagorean theorem gives a length, and the quadrant gives the sign.', show: 'sum.1' },
        { say: 'Then substitute into the sum or difference identity, and simplify. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
