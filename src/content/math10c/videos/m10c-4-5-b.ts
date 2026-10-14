import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-4-5-b',
  lessonId: 'm10c-4-5',
  title: 'Factoring ax² + bx + c, Part 2: More Cases',
  thumbnailTitle: 'Decomposition: More Cases',
  summary: 'Decomposition with a common factor taken out first, a trinomial in two variables, and the guess and check method.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.5 · Part 2', title: 'Decomposition: More Cases', subtitle: 'Common factors, two variables, guess and check' }],
      lines: [
        { say: 'Decomposition works for every trinomial that can be factored. Here are a few more cases to practise it on.', show: 'title' },
        { say: 'In this video, you will factor out a common factor first, factor a trinomial in two variables, and try guess and check.' },
      ],
    },
    {
      chapter: 'A common factor first',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['12x^2 - 26x + 10 = 2(6x^2 - 13x + 5)', '6 \\times 5 = 30 \\qquad (-3)(-10) = 30,\\ -3 + (-10) = -13', '6x^2 - 3x - 10x + 5 = 3x(2x - 1) - 5(2x - 1)', '= 2(2x - 1)(3x - 5)'],
        },
      ],
      lines: [
        { say: 'Factor twelve x squared minus 26 x plus ten completely. Every term is even, so factor out two first: two, times six x squared minus thirteen x plus five.', show: 'm.0', focus: 'm.0' },
        { say: 'Inside, six times five is thirty. We need a product of thirty and a sum of negative thirteen: negative three and negative ten.', show: 'm.1', focus: 'm.1' },
        { say: 'Split the middle term and group: three x times two x minus one, minus five times two x minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'So the complete answer is two, times two x minus one, times three x minus five.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two variables',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['4x^2 - 4xy - 15y^2', '4 \\times (-15) = -60 \\qquad 6 \\times (-10) = -60,\\ 6 + (-10) = -4', '4x^2 + 6xy - 10xy - 15y^2 = 2x(2x + 3y) - 5y(2x + 3y)', '= (2x + 3y)(2x - 5y)'],
        },
      ],
      lines: [
        { say: 'Factor four x squared minus four x y minus fifteen y squared. Treat the y terms like the constants: four times negative fifteen is negative sixty.', show: 'm.0', focus: 'm.0' },
        { say: 'Six and negative ten multiply to negative sixty, and add to negative four.', show: 'm.1', focus: 'm.1' },
        { say: 'Split the middle term into six x y minus ten x y, and group: two x times two x plus three y, minus five y times two x plus three y.', show: 'm.2', focus: 'm.2' },
        { say: 'So the answer is two x plus three y, times two x minus five y.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Guess and check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['6x^2 + 7x - 3', '\\text{first terms: } (6x)(x) \\text{ or } (3x)(2x)', '\\text{last terms: } (3)(-1) \\text{ or } (-3)(1)', '(3x - 1)(2x + 3) = 6x^2 + 9x - 2x - 3 = 6x^2 + 7x - 3 \\ \\good{\\text{✓}}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which method?', md: 'Decomposition is more systematic. Guess and check can be faster once you have practised.' },
      ],
      lines: [
        { say: 'Some people prefer guess and check: test pairs of binomials directly. For six x squared plus seven x minus three, the first terms could be six x and x, or three x and two x.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The last terms could be three and negative one, or negative three and one.', show: 'm.2', focus: 'm.2' },
        { say: 'Try combinations until the middle term is seven x. Three x minus one, times two x plus three, gives nine x minus two x, which is seven x.', show: 'm.3', focus: 'm.3' },
        { say: 'Decomposition is more systematic, but guess and check can be faster once you have practised.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $4x^2 - 8x - 21$.',
          choices: ['$(2x + 3)(2x - 7)$', '$(2x - 3)(2x + 7)$', '$(4x - 7)(x + 3)$', '$(4x + 3)(x - 7)$'],
          answer: 0,
          working: '$ac = -84$, and $6 \\times (-14) = -84$, $6 + (-14) = -8$: $4x^2 + 6x - 14x - 21 = 2x(2x + 3) - 7(2x + 3) = (2x + 3)(2x - 7)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor four x squared minus eight x minus 21. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four times negative 21 is negative 84, and six and negative fourteen multiply to negative 84 and add to negative eight. Split and group, and you get two x plus three, times two x minus seven. B has the signs reversed, so its middle term is positive eight x.', show: 'q.answer' },
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
          items: ['Factor out a common factor first.', 'With two variables, treat the second variable as part of the constant.', 'Decomposition always works; guess and check can be faster with practice.', 'Check by multiplying.'],
        },
      ],
      lines: [
        { say: "Let's sum up. Always factor out a common factor first.", show: 'sum.0' },
        { say: 'With two variables, treat the second variable as part of the constant.', show: 'sum.1' },
        { say: 'Decomposition always works, and guess and check can be faster with practice.', show: 'sum.2' },
        { say: 'And check your answer by multiplying. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
