import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-5-3-c',
  lessonId: 'm201-5-3',
  title: 'Radical Equations, Part 3: Two Radicals and Models',
  thumbnailTitle: 'Two Radicals and a Pendulum',
  thumbnail: 'm',
  summary: 'Solving √(x + 7) = √x + 1 by squaring twice, then finding the length of a clock pendulum with a period of 2.0 s from T = 2π√(L/9.8), and checking that the answer makes sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 5.3 · Part 3', title: 'Two Radicals and Models', subtitle: 'Square twice; work backwards' }],
      lines: [
        { say: 'Some equations have two radicals, and squaring once only removes one of them. Others come from formulas, like the period of a pendulum.', show: 'title' },
        { say: 'In this video, you will solve an equation with two radicals, and find the length of a pendulum from its period.' },
      ],
    },
    {
      chapter: 'Squaring twice',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{x + 7} = \\sqrt{x} + 1', 'x + 7 = x + 2\\sqrt{x} + 1', '6 = 2\\sqrt{x}:\\quad \\sqrt{x} = 3,\\ \\ x = 9', '\\sqrt{16} = 4,\\quad \\sqrt{9} + 1 = 4 \\;\\checkmark'] }],
      lines: [
        { say: 'When an equation has two radicals, isolate one and square, then isolate the radical that is left, and square again. Solve root x plus seven equals root x, plus one. The radical on the left is already isolated.', show: 'm.0', focus: 'm.0' },
        { say: 'Square both sides. The right side is root x plus one, squared: x, plus two root x, plus one. Do not forget the middle term.', show: 'm.1', focus: 'm.1' },
        { say: 'Simplify. The x terms cancel, leaving six equals two root x. So root x is three, and squaring again, x is nine.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: root sixteen is four, and root nine plus one is four. The solution is x equals nine.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The length of a pendulum',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['T = 2\\pi\\sqrt{\\dfrac{L}{9.8}},\\quad T = 2.0', '\\sqrt{\\dfrac{L}{9.8}} = \\dfrac{2.0}{2\\pi}', 'L = 9.8\\left(\\dfrac{2.0}{2\\pi}\\right)^2 \\approx 0.993', '\\text{about } 0.99\\text{ m}'] }],
      lines: [
        { say: 'In this example, the period of a pendulum is modelled by T equals two pi, times the square root of L over 9.8, where T is in seconds and L is in metres. A clock pendulum has a period of two seconds. How long is it, to the nearest hundredth of a metre?', show: 'm.0', focus: 'm.0' },
        { say: 'Isolate the radical: divide both sides by two pi. The square root of L over 9.8 equals two over two pi.', show: 'm.1', focus: 'm.1' },
        { say: 'Square both sides, and multiply by 9.8. L is 9.8 times two over two pi, squared, which is about 0.993.', show: 'm.2', focus: 'm.2' },
        { say: 'So the pendulum is about 0.99 metres long.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Does the answer make sense?', md: 'A longer pendulum swings more slowly, so a larger $T$ should give a larger $L$. Here $L$ grows with the square of $T$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\pi\\sqrt{\\dfrac{0.993}{9.8}} \\approx 2.0 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Check that the answer makes sense. A longer pendulum swings more slowly, so a larger period should give a larger length. It does: L grows with the square of T.', show: 'tip' },
        { say: 'And substituting 0.993 back into the formula gives a period of about two seconds.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\sqrt{x + 5} = \\sqrt{x} + 1$.',
          choices: ['$x = 4$', '$x = 2$', '$x = 16$', 'No solution'],
          answer: 0,
          working: 'Squaring gives $x + 5 = x + 2\\sqrt{x} + 1$, so $2\\sqrt{x} = 4$, $\\sqrt{x} = 2$ and $x = 4$. Check: $\\sqrt{9} = 3 = \\sqrt{4} + 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve root x plus five equals root x, plus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Squaring gives x plus five equals x, plus two root x, plus one. So two root x is four, root x is two, and x is four. Check: root nine is three, and root four plus one is three. B stops at root x.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['With two radicals, isolate and square twice.', 'Expand $\\left(\\sqrt{x} + 1\\right)^2$ with its middle term.', 'In a model, isolate the radical, square, and check that the answer makes sense.'] }],
      lines: [
        { say: 'Let’s sum up. With two radicals, isolate one and square, then isolate the other, and square again.', show: 'sum.0' },
        { say: 'When you square a binomial with a radical, keep its middle term.', show: 'sum.1' },
        { say: 'And in a model, isolate the radical, square, and check that the answer makes sense. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
