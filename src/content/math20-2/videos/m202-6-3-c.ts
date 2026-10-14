import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [0, 40], y: [0, 12], xStep: 5, yStep: 2, every: 2, width: 8, height: 3.6, titles: { x: 'x\\text{ (m)}', y: 'y\\text{ (m)}' } });
const arch = (x: number) => -0.025 * x * (x - 40);

/** A dashed line from the ground up to the arch, 5 m from the left base. */
const up: Part = {
  points: { u0: g.map(5, 0), u1: g.map(5, arch(5)) },
  items: [{ kind: 'line', id: 'h5', from: 'u0', to: 'u1', tone: 'theta', dashed: true }],
};

const video: Explainer = {
  id: 'm202-6-3-c',
  lessonId: 'm202-6-3',
  title: 'Quadratic Functions in Factored Form, Part 3: Writing Equations and Modelling Arches',
  thumbnailTitle: 'Modelling an Arch',
  thumbnail: 'ar',
  summary: 'Writing a quadratic equation from its zeros and one more point (y = 2(x + 1)(x − 5)), and modelling a 40 m wide, 10 m high park entrance arch with y = −0.025x(x − 40) to find its height 5 m from one base.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 6.3 · Part 3', title: 'Writing Equations and Modelling Arches', subtitle: 'From the zeros to the equation' }],
      lines: [
        { say: 'When you know where a shape meets the ground, factored form is the natural choice for its equation. One more point fixes it completely.', show: 'title' },
        { say: 'In this video, you will write an equation from its zeros, and model a park entrance arch.' },
      ],
    },
    {
      chapter: 'Finding a',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['y = a(x + 1)(x - 5)', '-16 = a(1 + 1)(1 - 5) = -8a,\\quad a = 2', 'y = 2(x + 1)(x - 5)', 'x = 2:\\ y = 2(3)(-3) = -18;\\ \\text{vertex } (2, -18)'] }],
      lines: [
        { say: 'A parabola has zeros negative one and five, and passes through one, negative sixteen. Write its equation in factored form. Start with y equals "a", times x plus one, times x minus five.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute the known point, which is not a zero. Negative sixteen equals "a" times two times negative four, which is negative eight "a". So "a" is two.', show: 'm.1', focus: 'm.1' },
        { say: 'The equation is y equals two, times x plus one, times x minus five.', show: 'm.2', focus: 'm.2' },
        { say: 'As a check, find the vertex. The axis is halfway between negative one and five, at two, and y is two times three times negative three, which is negative eighteen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A park entrance arch',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ar', [g, plot(g, { id: 'curve', f: arch, from: 0, to: 40, tone: 'brand' }), up, dots(g, [{ id: 'T', x: 20, y: 10, tex: '(20, 10)', tone: 'opp', place: 'above' }, { id: 'P', x: 5, y: arch(5), tex: '(5, 4.4)', tone: 'theta', place: 'above left' }])], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = ax(x - 40)', '10 = a(20)(-20) = -400a', 'a = -0.025', '-0.025(5)(-35) = 4.375'] }],
      lines: [
        { say: 'A parabolic arch is forty metres wide at the ground, and ten metres high at its centre. Write an equation for the arch, and find its height five metres from one base.', show: ['ar.grid', 'ar.axes', 'ar.curve'] },
        { say: 'Put the origin at the left base. Then the zeros are zero and forty, and the equation is y equals "a" x, times x minus forty.', show: 'm.0', focus: 'm.0' },
        { say: 'The top is halfway across, at twenty, ten. Substitute: ten equals "a" times twenty times negative twenty, which is negative 400 "a". So "a" is negative 0.025.', show: ['ar.T', 'm.1', 'm.2'], focus: ['ar.T', 'm.2'] },
        { say: 'At x equals five: negative 0.025 times five times negative thirty-five is 4.375. The arch is about 4.4 metres high, five metres from the base.', show: ['ar.h5', 'ar.P', 'm.3'], focus: ['ar.P', 'm.3'] },
      ],
    },
    {
      chapter: 'Choose a convenient origin',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Choose a convenient origin', md: 'With the origin at one base, one zero is $0$, and the equation is simply $y = ax(x - w)$, where $w$ is the width at the ground. The top is at $x = \\dfrac{w}{2}$.' }],
      lines: [
        { say: 'Choosing the origin well makes the work easier. With the origin at one base, one zero is zero, and the equation is simply y equals "a" x, times x minus w, where w is the width at the ground.', show: 'tip' },
        { say: 'The top of the arch is then halfway across, at w over two, which is the point you use to find "a".' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parabola has zeros $0$ and $6$ and passes through $(2, 16)$. What is its equation?',
          choices: ['$y = -2x(x - 6)$', '$y = 2x(x - 6)$', '$y = -2x(x + 6)$', '$y = 16x(x - 6)$'],
          answer: 0,
          working: '$y = ax(x - 6)$. Substitute $(2, 16)$: $16 = a(2)(-4) = -8a$, so $a = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A parabola has zeros zero and six, and passes through two, sixteen. What is its equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Start with y equals "a" x, times x minus six. Substitute two, sixteen: sixteen equals negative eight "a", so "a" is negative two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Start with $y = a(x - r)(x - s)$ from the zeros.', 'Substitute one more point, not a zero, and solve for $a$.', 'For an arch, put the origin at one base: $y = ax(x - w)$.'] }],
      lines: [
        { say: 'Let’s sum up. To write an equation, start with factored form, using the zeros.', show: 'sum.0' },
        { say: 'Substitute one more point, which is not a zero, and solve for "a".', show: 'sum.1' },
        { say: 'And for an arch, put the origin at one base, so the equation is y equals "a" x, times x minus the width. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
