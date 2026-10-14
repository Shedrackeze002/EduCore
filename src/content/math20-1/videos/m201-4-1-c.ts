import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-4-1-c',
  lessonId: 'm201-4-1',
  title: 'Factoring Polynomial Expressions, Part 3: Substitution',
  thumbnailTitle: 'Factoring by Substitution',
  thumbnail: 'm',
  summary: 'Factoring by substitution: replacing a repeated expression with one letter in 2(x + 1)² − 5(x + 1) − 3, x⁴ − 13x² + 36 and 9(x − 2)² − 4y², factoring, substituting back, simplifying each bracket and checking whether it factors again.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.1 · Part 3', title: 'Factoring by Substitution', subtitle: 'Replace a repeated expression' }],
      lines: [
        { say: 'Some expressions only look complicated. Two times x plus one, squared, minus five times x plus one, minus three, is really a trinomial in disguise.', show: 'title' },
        { say: 'In this video, you will factor by substitution: replace a repeated expression with a single letter, factor, and substitute back.' },
      ],
    },
    {
      chapter: 'A repeated binomial',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2(x + 1)^2 - 5(x + 1) - 3', 'u = x + 1:\\quad 2u^2 - 5u - 3', '(2u + 1)(u - 3)', '\\big(2(x + 1) + 1\\big)\\big((x + 1) - 3\\big)', '(2x + 3)(x - 2)'] }],
      lines: [
        { say: 'Factor two times x plus one, squared, minus five times x plus one, minus three. The binomial x plus one appears twice.', show: 'm.0', focus: 'm.0' },
        { say: 'Let u equal x plus one. The expression becomes two u squared, minus five u, minus three: a trinomial you know how to factor.', show: 'm.1', focus: 'm.1' },
        { say: '"a" c is negative six, and the sum is negative five, so use negative six and one. It factors as two u plus one, times u minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'Substitute back: two times x plus one, plus one, times x plus one, minus three.', show: 'm.3', focus: 'm.3' },
        { say: 'Simplify each bracket: two x plus three, times x minus two.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'x to the fourth',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^4 - 13x^2 + 36', 'u = x^2:\\quad u^2 - 13u + 36 = (u - 4)(u - 9)', '(x^2 - 4)(x^2 - 9)', '(x - 2)(x + 2)(x - 3)(x + 3)'] }],
      lines: [
        { say: 'Factor x to the fourth, minus thirteen x squared, plus thirty-six. x to the fourth is x squared, squared, so let u equal x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Then u squared, minus thirteen u, plus thirty-six, factors as u minus four, times u minus nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute back: x squared minus four, times x squared minus nine.', show: 'm.2', focus: 'm.2' },
        { say: 'Both factors are differences of squares, so factor again: x minus two, x plus two, x minus three, and x plus three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A difference of squares',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['9(x - 2)^2 - 4y^2', 'A = x - 2:\\quad 9A^2 - 4y^2 = (3A - 2y)(3A + 2y)', '\\big(3(x - 2) - 2y\\big)\\big(3(x - 2) + 2y\\big)', '(3x - 2y - 6)(3x + 2y - 6)'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'After you substitute back', md: 'Simplify each bracket, then check: does a bracket have a common factor, and does it factor again?' },
      ],
      lines: [
        { say: 'Factor nine times x minus two, squared, minus four y squared. Let "A" equal x minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'Then nine "A" squared, minus four y squared, is a difference of squares: three "A" minus two y, times three "A" plus two y.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute back, and expand three times x minus two: three x minus two y minus six, times three x plus two y minus six.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'After you substitute back, simplify each bracket, and check two things: does a bracket have a common factor, and does a bracket factor again?', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $(x + 3)^2 - 4$.',
          choices: ['$(x + 1)(x + 5)$', '$(x - 1)(x + 5)$', '$(x + 1)(x - 5)$', '$(x - 2)(x + 2)$'],
          answer: 0,
          working: 'Let $u = x + 3$: $u^2 - 4 = (u - 2)(u + 2) = (x + 3 - 2)(x + 3 + 2) = (x + 1)(x + 5)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor x plus three, squared, minus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Let u equal x plus three. Then u squared minus four is u minus two, times u plus two. Substitute back, and simplify: x plus one, times x plus five. D drops the three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Replace a repeated expression with one letter.', 'Factor, then substitute back and simplify each bracket.', 'Check each bracket for a common factor, or a second factoring.'] }],
      lines: [
        { say: 'Let’s sum up. To factor by substitution, replace a repeated expression with a single letter.', show: 'sum.0' },
        { say: 'Factor, then substitute back, and simplify each bracket.', show: 'sum.1' },
        { say: 'And check each bracket for a common factor, or for a second factoring. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
