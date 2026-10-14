import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-4-2-b',
  lessonId: 'm201-4-2',
  title: 'Solving Quadratic Equations, Part 2: The Zero Product Property',
  thumbnailTitle: 'The Zero Product Property',
  thumbnail: 'm',
  summary: 'Why the zero product property holds, solving 2x² + 5x − 12 = 0 by factoring, and why (x − 2)(x + 3) = 6 must be rearranged so that one side is zero before the property can be used.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.2 · Part 2', title: 'The Zero Product Property', subtitle: 'If AB = 0' }],
      lines: [
        { say: 'If the product of two numbers is zero, what can you say about the numbers? That simple question is the key to solving quadratic equations by factoring.', show: 'title' },
        { say: 'In this video, you will use the zero product property to solve equations, and avoid its most common trap.' },
      ],
    },
    {
      chapter: 'Zero product property',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Zero product property', md: 'If $AB = 0$, then $A = 0$ or $B = 0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['AB = 0,\\ A \\ne 0:\\quad B = \\dfrac{0}{A} = 0'] },
      ],
      lines: [
        { say: 'The zero product property says: if "A" times B is zero, then "A" is zero, or B is zero.', show: 'def' },
        { say: 'Why? Suppose "A" is not zero. Then you can divide both sides of "A" B equals zero by "A", which gives B equals zero. So at least one of the factors must be zero.', show: 'm.0', focus: 'm.0' },
        { say: 'This is why factoring solves equations. Once one side is a product, and the other side is zero, each factor gives a root.' },
      ],
    },
    {
      chapter: 'Solving by factoring',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x^2 + 5x - 12 = 0', '(2x - 3)(x + 4) = 0', '2x - 3 = 0 \\quad\\text{or}\\quad x + 4 = 0', 'x = \\tfrac{3}{2} \\quad\\text{or}\\quad x = -4'] }],
      lines: [
        { say: 'Solve two x squared, plus five x, minus twelve, equals zero. You factored this trinomial in the last lesson: "a" c is negative twenty-four, and eight and negative three split the middle term.', show: 'm.0', focus: 'm.0' },
        { say: 'It factors as two x minus three, times x plus four, equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'By the zero product property, two x minus three is zero, or x plus four is zero.', show: 'm.2', focus: 'm.2' },
        { say: 'So x is three halves, or negative four. Substitute each one to check: both make the left side zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The other side must be zero',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x - 2)(x + 3) = 6', 'x^2 + x - 6 = 6', 'x^2 + x - 12 = 0', '(x + 4)(x - 3) = 0', 'x = -4 \\text{ or } x = 3'] }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The other side must be zero', md: '$(x - 2)(x + 3) = 6$ does **not** mean $x - 2 = 6$ or $x + 3 = 6$. Two numbers can multiply to $6$ in many ways.' }],
      lines: [
        { say: 'The property only works when the other side is zero. Solve x minus two, times x plus three, equals six.', show: 'm.0', focus: 'm.0' },
        { say: 'This does not mean x minus two is six, or x plus three is six. Two numbers can multiply to six in many ways, such as two times three, or one times six.', show: 'oops' },
        { say: 'Instead, expand first: x squared, plus x, minus six, equals six. Then subtract six, so one side is zero.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Factor: x plus four, times x minus three, equals zero. So x is negative four, or three.', show: ['m.3', 'm.4'], focus: 'm.4' },
        { say: 'Check in the original equation: for three, one times six is six, and for negative four, negative six times negative one is six.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x^2 - 5x = 14$.',
          choices: ['$x = 7$ or $x = -2$', '$x = -7$ or $x = 2$', '$x = 14$ or $x = 19$', '$x = 0$ or $x = 5$'],
          answer: 0,
          working: 'Subtract $14$: $x^2 - 5x - 14 = 0$, so $(x - 7)(x + 2) = 0$ and $x = 7$ or $x = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared, minus five x, equals fourteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtract fourteen, so one side is zero: x squared, minus five x, minus fourteen. That factors as x minus seven, times x plus two, so x is seven, or negative two. C sets each factor of x times x minus five equal to fourteen.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['If $AB = 0$, then $A = 0$ or $B = 0$.', 'Factor, then set each factor equal to zero.', 'One side must be zero before you use the property.'] }],
      lines: [
        { say: 'Let’s sum up. If "A" times B is zero, then "A" is zero, or B is zero.', show: 'sum.0' },
        { say: 'To solve by factoring, factor, then set each factor equal to zero.', show: 'sum.1' },
        { say: 'And make one side zero before you use the property. In part three, we put equations into standard form first. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
