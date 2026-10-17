import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chordCircle } from './lib/m301-6-figures.ts';

const video: Explainer = {
  id: 'm301-6-2',
  lessonId: 'm301-6-2',
  title: 'Sum, Difference and Double-Angle Identities, Part 1: The Sum and Difference Identities',
  thumbnailTitle: 'Sum and Difference Identities',
  thumbnail: 'ch',
  summary: 'The identities for sin(A ± B), cos(A ± B) and tan(A ± B), where the cosine identity comes from on the unit circle, why sin(A + B) is not sin A + sin B, and reading an identity backwards to write cos 50° cos 20° + sin 50° sin 20° as cos 30°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.2 · Part 1', title: 'The Sum and Difference Identities', subtitle: 'The sine, cosine and tangent of $A \\pm B$' }],
      lines: [
        { say: 'Your calculator says that sine 75 degrees is about 0.9659. But where does that number come from? Since 75 degrees is 45 degrees plus 30 degrees, an identity for the sine of a sum gives its exact value from two special triangles.', show: 'title' },
        { say: 'In this video, you will meet the sum and difference identities, see where they come from, and use them to write an expansion as a single function.' },
      ],
    },
    {
      chapter: 'The identities',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B', '\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B', '\\tan(A \\pm B) = \\dfrac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Watch the signs', md: 'In the cosine and tangent identities the signs are opposite: $\\cos(A + B)$ has a minus sign in its expansion.' },
      ],
      lines: [
        { say: 'Here are the sum and difference identities. The sine of A plus or minus B equals sine A cosine B, plus or minus cosine A sine B. The sign in the middle matches the sign in the brackets.', show: 'm.0', focus: 'm.0' },
        { say: 'The cosine of A plus or minus B equals cosine A cosine B, minus or plus sine A sine B. Here the sign is the opposite one. So the cosine of A plus B has a minus sign in its expansion, and the cosine of A minus B has a plus sign.', show: 'm.1', focus: 'm.1' },
        { say: 'And the tan of A plus or minus B equals tan A plus or minus tan B, all over one minus or plus tan A tan B. The top keeps the sign from the brackets, and the bottom has the opposite sign.', show: 'm.2', focus: 'm.2' },
        { say: 'So watch the signs: in the cosine and tangent identities, they are opposite.', show: 'key', focus: 'm' },
      ],
    },
    {
      chapter: 'Where they come from',
      layout: 'center',
      main: [
        figure(
          'ch',
          [
            chordCircle({ name: 'l', at: [0, 0], r: 3, from: 45, to: 135, label: '\\footnotesize A{-}B', labelDist: 51, fromTex: 'Q', toTex: 'P' }),
            chordCircle({ name: 'r', at: [10, 0], r: 3, from: 0, to: 90, label: '\\footnotesize A{-}B', labelDist: 51, fromTex: 'R', toTex: 'S', tone: 'opp' }),
          ],
          340,
        ),
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\cos A, \\sin A),\\ \\ Q(\\cos B, \\sin B)', 'R(1, 0),\\ \\ S(\\cos(A - B), \\sin(A - B))', 'PQ = RS:\\quad \\cos(A - B) = \\cos A\\cos B + \\sin A\\sin B'] },
      ],
      lines: [
        { say: 'Where do these come from? Put angles A and B in standard position on the unit circle. Their terminal arms meet the circle at P, with coordinates cosine A, sine A, and at Q, with coordinates cosine B, sine B.', show: ['ch.l-circle', 'ch.l-arms', 'm.0'], focus: 'm.0' },
        { say: 'The angle between the two arms is A minus B. Join P and Q with a chord.', show: ['ch.l-angle', 'ch.l-chord'], focus: 'ch.l-chord' },
        { say: 'Now turn the whole picture until one arm lies along the x-axis. The chord keeps its length. It now joins R, at one, zero, to S, at cosine of A minus B, sine of A minus B.', show: ['ch.r-circle', 'ch.r-arms', 'ch.r-angle', 'ch.r-chord', 'm.1'], focus: ['ch.l-chord', 'ch.r-chord', 'm.1'] },
        { say: 'So P Q equals R S. Write the square of each length with the distance formula, set them equal, and use sine squared plus cosine squared equals one. Everything simplifies to this: the cosine of A minus B equals cosine A cosine B plus sine A sine B.', show: 'm.2', focus: 'm.2' },
        { say: 'The others follow from this one. Replace B with negative B to get the cosine of A plus B. Use sine theta equals the cosine of 90 degrees minus theta to get the sine identities. And divide sine by cosine to get the tangent identities.' },
      ],
    },
    {
      chapter: 'Functions do not distribute',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin(30^\\circ + 60^\\circ) = \\sin 90^\\circ = 1', '\\sin 30^\\circ + \\sin 60^\\circ = \\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2} \\approx 1.366'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Functions do not distribute', md: '$\\sin(A + B)$ is **not** $\\sin A + \\sin B$. Use the identity.' },
      ],
      lines: [
        { say: 'It is tempting to think that the sine of A plus B is just sine A plus sine B. It is not.', show: 'oops' },
        { say: 'Check with thirty degrees and sixty degrees. The sine of thirty plus sixty degrees is sine ninety degrees, which is one.', show: 'm.0', focus: 'm.0' },
        { say: 'But sine thirty degrees plus sine sixty degrees is one half plus root three over two, which is about 1.366. The two are not equal, so the sine function does not distribute over a sum. Use the identity instead.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Writing an expansion as one function',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\cos 50^\\circ\\cos 20^\\circ + \\sin 50^\\circ\\sin 20^\\circ', '\\cos A\\cos B + \\sin A\\sin B = \\cos(A - B)', '= \\cos(50^\\circ - 20^\\circ) = \\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}', '\\sin 3x\\cos x - \\cos 3x\\sin x = \\sin(3x - x) = \\sin 2x'],
        },
      ],
      lines: [
        { say: 'An identity can also be read from right to left, to collapse an expansion into a single function. Determine the exact value of cosine 50 degrees cosine 20 degrees, plus sine 50 degrees sine 20 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'This matches cosine A cosine B plus sine A sine B, which is the cosine of A minus B, with A equal to 50 degrees and B equal to 20 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'So it equals the cosine of 50 degrees minus 20 degrees, which is cosine 30 degrees: exactly root three over two.', show: 'm.2', focus: 'm.2' },
        { say: 'The same works with variables. Sine 3 x cosine x minus cosine 3 x sine x matches the sine of A minus B, so it equals the sine of 3 x minus x, which is sine 2 x.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Determine the exact value of $\\sin 80^\\circ\\cos 20^\\circ - \\cos 80^\\circ\\sin 20^\\circ$.',
          choices: ['$\\dfrac{1}{2}$', '$\\sin 100^\\circ$', '$\\dfrac{\\sqrt{3}}{2}$', '$1$'],
          answer: 2,
          working: 'This is $\\sin A\\cos B - \\cos A\\sin B = \\sin(A - B)$ with $A = 80^\\circ$ and $B = 20^\\circ$: $\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Determine the exact value of sine 80 degrees cosine 20 degrees, minus cosine 80 degrees sine 20 degrees. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. This is sine A cosine B minus cosine A sine B, which is the sine of A minus B. 80 degrees minus 20 degrees is 60 degrees, and sine 60 degrees is root three over two. Choice B adds the angles, but the minus sign in a sine expansion means a difference.', show: 'q.answer' },
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
          items: ['$\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B$', '$\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B$ and $\\tan(A \\pm B) = \\dfrac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}$: opposite signs.', '$\\sin(A + B) \\ne \\sin A + \\sin B$. Read an identity backwards to collapse an expansion.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The sine of A plus or minus B is sine A cosine B, plus or minus cosine A sine B.', show: 'sum.0' },
        { say: 'In the cosine and tangent identities, the signs are opposite.', show: 'sum.1' },
        { say: 'The sine of a sum is not the sum of the sines, and an identity read backwards collapses an expansion into one function. In part two, you will use these identities to find exact values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
