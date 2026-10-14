import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-4-1-d',
  lessonId: 'm203-4-1',
  title: 'Right Triangle Review, Part 4: Solving a Whole Problem',
  thumbnailTitle: 'Solving a Whole Problem',
  thumbnail: 'tri',
  summary: 'Getting several answers from one triangle: the angle (about 26.6°) and rafter length (about 15.7 ft) of a 6/12 roof over a 14 ft run, checking with the Pythagorean theorem, using given values and full digits, and the two acute angles adding to 90°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.1 · Part 4', title: 'Solving a Whole Problem', subtitle: 'Several answers from one triangle' }],
      lines: [
        { say: 'Many jobs need two or three answers from one triangle: an angle, a length, and a check. Doing them in a good order saves rounding errors.', show: 'title' },
        { say: 'In this video, you will find the angle and the rafter length of a roof.' },
      ],
    },
    {
      chapter: 'A rafter for a 6/12 roof',
      layout: 'split',
      leftWidth: 600,
      left: [{ kind: 'triangle', id: 'rf', adj: 14, opp: 7, labels: { theta: '\\theta', adj: '14\\text{ ft}', hyp: 'L' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan\\theta = \\dfrac{6}{12} = 0.5', '\\theta = \\tan^{-1}(0.5) \\approx 26.6^\\circ', 'L = \\dfrac{14}{\\cos\\theta} \\approx 15.65', 'L \\approx 15.7 \\text{ ft}'] }],
      lines: [
        { say: 'A roof has a six-in-twelve pitch: it rises six inches for every twelve inches of run. Each rafter covers a run of fourteen feet. Find the angle of the roof, and the length of a rafter.', show: ['rf.shape', 'rf.theta', 'rf.adj', 'rf.hyp'] },
        { say: 'Start with the angle. The pitch gives the rise over the run directly: tangent theta is six over twelve, 0.5.', show: 'm.0', focus: 'm.0' },
        { say: 'Theta is the inverse tangent of 0.5, about 26.6 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the rafter. The run is adjacent, and the rafter is the hypotenuse: CAH. The unknown is on the bottom, so L is fourteen divided by cosine theta, about 15.65.', show: 'm.2', focus: 'm.2' },
        { say: 'To the nearest tenth, each rafter is about 15.7 feet long.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check another way',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{rise} = 14 \\times \\dfrac{6}{12} = 7 \\text{ ft}', 'L = \\sqrt{14^2 + 7^2} = \\sqrt{245} \\approx 15.65 \\;\\checkmark'] }],
      lines: [
        { say: 'Check with the Pythagorean theorem. The rise is fourteen times six twelfths: seven feet.', show: 'm.0', focus: 'm.0' },
        { say: 'Then L is the square root of fourteen squared plus seven squared, root 245, about 15.65. The two methods agree.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Good habits',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Find each answer from the **given** values when you can.', 'Keep **all the digits** until the end; round once.', 'The two acute angles add to $90^\\circ$: here about $26.6^\\circ$ and $63.4^\\circ$.'] }],
      lines: [
        { say: 'Three good habits. Find each answer from the values you were given when you can, not from an answer you rounded earlier.', show: 'b.0' },
        { say: 'Keep all the digits on your calculator until the end, and round once.', show: 'b.1' },
        { say: 'And remember that the two acute angles of a right triangle add to ninety degrees. If one is 26.6 degrees, the other is about 63.4: the angle at the peak of this half of the roof.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A roof has a 4/12 pitch and a rafter run of $12$ ft. How long is each rafter, to the nearest tenth of a foot?',
          choices: ['$12.6$ ft', '$16.0$ ft', '$12.0$ ft', '$11.4$ ft'],
          answer: 0,
          working: 'The rise is $12 \\times \\dfrac{4}{12} = 4$ ft, so $L = \\sqrt{12^2 + 4^2} = \\sqrt{160} \\approx 12.6$ ft. B adds the rise and the run.',
        },
      ],
      lines: [
        { say: 'Your turn. A roof has a four-in-twelve pitch, and a rafter run of twelve feet. How long is each rafter? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The rise is twelve times four twelfths, four feet, so the rafter is the square root of 144 plus sixteen, root 160, about 12.6 feet. B just adds the rise and the run.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Plan the order: angle, then lengths.', 'Check with a second method when you can.', 'Acute angles add to $90^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. Plan the order of your answers, and work from the given values.', show: 'sum.0' },
        { say: 'Check with a second method when you can, like the Pythagorean theorem.', show: 'sum.1' },
        { say: 'And the two acute angles add to ninety degrees. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
