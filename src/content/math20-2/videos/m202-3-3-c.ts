import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-3-3-c',
  lessonId: 'm202-3-3',
  title: 'Solving Problems with the Sine and Cosine Laws, Part 3: Problems with Two Steps',
  thumbnailTitle: 'Two-Step Triangle Problems',
  thumbnail: 'bl',
  summary: 'Planning multi-step solutions before calculating, finding the height of a hot-air balloon with the sine law and then a primary ratio (about 520 m), and keeping calculator values between steps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 3.3 · Part 3', title: 'Problems with Two Steps', subtitle: 'One law sets up the next' }],
      lines: [
        { say: 'Some problems cannot be solved with one law. The first step finds a piece you need, and the second step uses it.', show: 'title' },
        { say: 'In this video, you will plan multi-step solutions, and find the height of a hot-air balloon.' },
      ],
    },
    {
      chapter: 'Plan the path',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Two angles and the side between them**: angle sum, then sine law.', '**SAS, but you want an angle**: cosine law for the third side, then sine law.', '**Two sides and an angle opposite one, but you want the third side**: sine law, angle sum, then sine law again.'] }],
      lines: [
        { say: 'Plan the whole path before you calculate. With two angles and the side between them, find the third angle with the angle sum, and then use the sine law.', show: 'b.0' },
        { say: 'With two sides and the contained angle, but you want an angle, use the cosine law for the third side first. Then you have a matching pair for the sine law.', show: 'b.1' },
        { say: 'And with two sides and an angle opposite one of them, but you want the third side, use the sine law for a second angle, the angle sum for the third, and then the sine law again.', show: 'b.2' },
      ],
    },
    {
      chapter: 'How high is the balloon?',
      layout: 'split',
      leftWidth: 480,
      left: [figure('bl', [triangle({ A: [0, 0], B: [5.12, 0], C: [2.21, 4.16], names: ['A', 'B', 'H'], sides: { AB: '640\\text{ m}', CA: 'AH' }, tones: { CA: 'opp' }, angles: { A: '62^\\circ', B: '55^\\circ' }, angleTones: { A: 'adj', B: 'opp' }, altitude: 'C', altitudeLabel: 'h' })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle H = 180^\\circ - 62^\\circ - 55^\\circ = 63^\\circ', 'AH = \\dfrac{640\\sin 55^\\circ}{\\sin 63^\\circ} \\approx 588.39', 'h = AH\\sin 62^\\circ \\approx 519.5', 'h \\approx 520\\text{ m}'] }],
      lines: [
        { say: 'Two friends stand 640 metres apart on level ground, with a hot-air balloon between them. The angle of elevation of the balloon is sixty-two degrees from point "A", and fifty-five degrees from point B. How high is the balloon?', show: ['bl.shape', 'bl.names', 'bl.AB', 'bl.aA', 'bl.aB'] },
        { say: 'The height is measured straight down, so it makes a right angle with the ground. But no right triangle has enough information yet. First, find a slanted side.', show: 'bl.alt', focus: 'bl.alt' },
        { say: 'Angle sum: angle H is sixty-three degrees, so "A" B and angle H are a matching pair. "A" H is opposite angle B, so "A" H is 640 sine fifty-five, over sine sixty-three, about 588.39 metres.', show: ['bl.CA', 'm.0', 'm.1'], focus: ['bl.CA', 'm.1'] },
        { say: 'Now use the right triangle with hypotenuse "A" H. The height is opposite the sixty-two degree angle, so h is "A" H sine sixty-two, about 519.5. The balloon is about 520 metres above the ground.', show: ['m.2', 'm.3'], focus: ['bl.alt', 'm.3'] },
      ],
    },
    {
      chapter: 'Keep the calculator values',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep the calculator values', md: 'Store the unrounded value of $AH$ in your calculator’s memory, and use it in the next step. Rounding in the middle can change your final answer.' }],
      lines: [
        { say: 'Store the unrounded value of "A" H in your calculator’s memory, and use it in the next step. If you round "A" H to 588 first, the height comes out as 519.2 instead of 519.5. Here both round to 520, but in other problems, early rounding can change the final answer.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two points are $500$ m apart, with a balloon between them. Its angles of elevation are $58^\\circ$ and $50^\\circ$. How high is the balloon, to the nearest metre?',
          choices: ['$342$ m', '$403$ m', '$213$ m', '$446$ m'],
          answer: 0,
          working: 'The top angle is $72^\\circ$. The slanted side from the $58^\\circ$ point is $\\dfrac{500\\sin 50^\\circ}{\\sin 72^\\circ} \\approx 402.73$, so $h \\approx 402.73\\sin 58^\\circ \\approx 342$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. Two points are 500 metres apart, with a balloon between them. Its angles of elevation are fifty-eight and fifty degrees. How high is the balloon? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The top angle is seventy-two degrees. The slanted side from the fifty-eight degree point is about 402.73 metres, and that times sine fifty-eight is about 342 metres. B stops after the first step.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Plan the whole path before you calculate.', 'Heights and widths need a right angle: find a slanted side first.', 'Keep full calculator values; round only the final answer.'] }],
      lines: [
        { say: 'Let’s sum up. Plan the whole path before you calculate, because one law often sets up the other.', show: 'sum.0' },
        { say: 'Heights and widths need a right angle, so find a slanted side first, and then use a primary ratio.', show: 'sum.1' },
        { say: 'And keep full calculator values, rounding only the final answer. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
