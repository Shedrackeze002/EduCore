import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';
import { circleMarks } from './lib/m301-6-figures.ts';

const video: Explainer = {
  id: 'm301-6-4-b',
  lessonId: 'm301-6-4',
  title: 'Solving Trigonometric Equations Using Identities, Part 2: Square Roots, Impossible Values and Calculator Values',
  thumbnailTitle: 'Square Roots and Calculator Values',
  thumbnail: 'uc',
  summary: 'Keeping both signs when taking a square root (4cos²x − 3 = 0), rejecting factors such as sin x = −2 that have no solution, using the inverse sine for a value that is not special (3sin²x + 5sin x − 2 = 0), and finding the two launch angles from sin 2θ = 0.49.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.4 · Part 2', title: 'Square Roots, Impossible Values and Calculator Values', subtitle: 'Both signs, possible values, and the inverse function' }],
      lines: [
        { say: 'Not every equation factors into special values. Some need a square root, some have a factor with no solution at all, and some need a calculator.', show: 'title' },
        { say: 'In this video, you will solve all three kinds, and find the two launch angles that land a ball on a target.' },
      ],
    },
    {
      chapter: 'Square roots: keep both signs',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('uc', [
          unitCircle({ r: 3 }),
          circleMarks(3, [
            { deg: 30, tex: '30^\\circ', tone: 'adj', place: 'above right', group: 'pos' },
            { deg: 330, tex: '330^\\circ', tone: 'adj', place: 'below right', group: 'pos' },
            { deg: 150, tex: '150^\\circ', tone: 'opp', place: 'above left', group: 'neg' },
            { deg: 210, tex: '210^\\circ', tone: 'opp', place: 'below left', group: 'neg' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4\\cos^2 x - 3 = 0,\\quad 0^\\circ \\le x < 360^\\circ', '\\cos^2 x = \\dfrac{3}{4}', '\\cos x = \\pm\\dfrac{\\sqrt{3}}{2}', 'x = 30^\\circ,\\ 150^\\circ,\\ 210^\\circ,\\ 330^\\circ'] },
      ],
      lines: [
        { say: 'Solve four cosine squared x minus three equals zero, for x from zero up to 360 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Add three and divide by four: cosine squared x equals three quarters.', show: 'm.1', focus: 'm.1' },
        { say: 'Now take the square root of both sides, and keep both signs. Cosine x equals plus or minus root three over two.', show: 'm.2', focus: 'm.2' },
        { say: 'The reference angle is thirty degrees. Cosine is positive in quadrants one and four, giving 30 and 330 degrees.', show: ['uc.axes', 'uc.circle', 'uc.pos'], focus: 'uc.pos' },
        { say: 'Cosine is negative in quadrants two and three, giving 150 and 210 degrees. So there are four solutions. Forgetting the negative root would lose half of them.', show: ['uc.neg', 'm.3'], focus: ['uc.neg', 'm.3'] },
      ],
    },
    {
      chapter: 'A factor with no solution',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3\\sin^2 x + 5\\sin x - 2 = 0,\\quad 0^\\circ \\le x < 360^\\circ', '(3\\sin x - 1)(\\sin x + 2) = 0', '\\sin x = -2:\\ \\text{no solution}', '\\sin x = \\dfrac{1}{3}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Possible values', md: '$-1 \\le \\sin x \\le 1$ and $-1 \\le \\cos x \\le 1$, so a factor such as $\\sin x + 2 = 0$ gives no solutions.' },
      ],
      lines: [
        { say: 'Solve three sine squared x plus five sine x minus two equals zero, for x from zero up to 360 degrees, to the nearest tenth of a degree.', show: 'm.0', focus: 'm.0' },
        { say: 'It factors as three sine x minus one, times sine x plus two.', show: 'm.1', focus: 'm.1' },
        { say: 'The second factor gives sine x equals negative two. But sine x is always between negative one and one, and so is cosine x. So this factor has no solution at all.', show: ['m.2', 'key'], focus: 'm.2' },
        { say: 'The first factor gives sine x equals one third. That is not the sine of a special angle, so you need a calculator.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Using the inverse sine',
      layout: 'split',
      leftWidth: 540,
      left: [{ kind: 'calc', id: 'c', keys: 'sin⁻¹(1 ÷ 3)', result: '19.4712' }],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin^{-1}\\left(\\dfrac{1}{3}\\right) \\approx 19.47^\\circ', '\\text{Quadrant I: } x \\approx 19.5^\\circ', '\\text{Quadrant II: } x \\approx 180^\\circ - 19.47^\\circ', 'x \\approx 160.5^\\circ'] },
      ],
      lines: [
        { say: 'Use the inverse sine for the reference angle. In degree mode, the inverse sine of one third is about 19.47 degrees.', show: ['c', 'm.0'], focus: 'm.0' },
        { say: 'Sine is positive in quadrants one and two. In quadrant one, x is about 19.5 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'In quadrant two, x is 180 degrees minus the reference angle: 180 minus 19.47, which is about 160.5 degrees. Keep the unrounded reference angle until the end.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Two launch angles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A ball leaves a launcher at $20$ m/s and must land $20$ m away on level ground. Using $R = \\dfrac{v^2\\sin 2\\theta}{g}$ with $g = 9.8$ m/s², determine the launch angles between $0^\\circ$ and $90^\\circ$, to the nearest tenth of a degree.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin 2\\theta = \\dfrac{Rg}{v^2} = \\dfrac{20(9.8)}{20^2} = 0.49', '0^\\circ < 2\\theta < 180^\\circ:\\quad 2\\theta \\approx 29.34^\\circ \\ \\text{ or } \\ 180^\\circ - 29.34^\\circ = 150.66^\\circ', '\\theta \\approx 14.7^\\circ \\ \\text{ or } \\ \\theta \\approx 75.3^\\circ'] },
      ],
      lines: [
        { say: 'Back to the launcher. A ball leaves it at 20 metres per second and must land 20 metres away on level ground. Using R equals v squared sine two theta over g, with g equal to 9.8 metres per second squared, determine the launch angles between zero and 90 degrees.', show: 'q' },
        { say: 'Solve for sine two theta: R times g, over v squared. That is 20 times 9.8, over 20 squared, which is 0.49.', show: 'm.0', focus: 'm.0' },
        { say: 'Since theta is between zero and 90 degrees, two theta is between zero and 180 degrees, where sine is positive in two quadrants. The inverse sine of 0.49 gives two theta about 29.34 degrees, and the other value is 180 minus 29.34, which is 150.66 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Only now divide by two. Theta is about 14.7 degrees, or about 75.3 degrees. Find every value of two theta first, then divide by two, or you will miss one of the launch angles.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2\\sin^2 x - 1 = 0$ for $0^\\circ \\le x < 360^\\circ$.',
          choices: ['$45^\\circ,\\ 135^\\circ$', '$45^\\circ,\\ 315^\\circ$', '$45^\\circ,\\ 135^\\circ,\\ 225^\\circ,\\ 315^\\circ$', '$30^\\circ,\\ 150^\\circ,\\ 210^\\circ,\\ 330^\\circ$'],
          answer: 2,
          working: '$\\sin^2 x = \\dfrac{1}{2}$, so $\\sin x = \\pm\\dfrac{\\sqrt{2}}{2}$. Positive: $45^\\circ,\\ 135^\\circ$. Negative: $225^\\circ,\\ 315^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two sine squared x minus one equals zero, for x from zero up to 360 degrees. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Sine squared x is one half, so sine x is plus or minus root two over two. The positive root gives 45 and 135 degrees, and the negative root gives 225 and 315 degrees. Choice A keeps only the positive root.', show: 'q.answer' },
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
          items: ['Taking a square root gives $\\pm$: keep both signs.', '$\\sin x$ and $\\cos x$ lie between $-1$ and $1$, so a factor such as $\\sin x = -2$ has no solution.', 'For a value that is not special, use the inverse function for the reference angle, then the quadrants.', 'With $2\\theta$, find every value of $2\\theta$ first, then divide by $2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Taking a square root gives plus or minus, so keep both signs.', show: 'sum.0' },
        { say: 'Sine and cosine lie between negative one and one, so a factor such as sine x equals negative two has no solution.', show: 'sum.1' },
        { say: 'For a value that is not special, use the inverse function for the reference angle, then the quadrants.', show: 'sum.2' },
        { say: 'And with two theta, find every value of two theta first, then divide by two. In part three, you will use an identity to rewrite an equation before you solve it. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
