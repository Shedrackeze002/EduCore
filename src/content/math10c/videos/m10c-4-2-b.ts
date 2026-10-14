import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-4-2-b',
  lessonId: 'm10c-4-2',
  title: 'Multiplying Polynomials, Part 2: Simplifying and Checking',
  thumbnailTitle: 'Simplifying and Checking Products',
  summary: 'Simplifying expressions with several products, subtracting a product without losing its signs, and checking a product by substituting a value into both sides.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.2 · Part 2', title: 'Simplifying and Checking', subtitle: 'Expressions with several products' }],
      lines: [
        { say: 'Some expressions have more than one product, and some subtract one. And how can you tell whether your answer is right?', show: 'title' },
        { say: 'In this video, you will simplify expressions with several products, and check an answer by substituting a number.' },
      ],
    },
    {
      chapter: 'Several products',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Simplify $2(x + 1)(x - 4) - (x - 3)^2$.', size: 'md' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['2(x + 1)(x - 4) = 2(x^2 - 3x - 4) = 2x^2 - 6x - 8', '(x - 3)^2 = x^2 - 6x + 9', '2x^2 - 6x - 8 - (x^2 - 6x + 9)', '= 2x^2 - 6x - 8 - x^2 + 6x - 9', '= x^2 - 17'],
        },
      ],
      lines: [
        { say: 'Simplify two, times x plus one, times x minus four, minus x minus three, squared. Expand each product separately.', show: 'q' },
        { say: 'x plus one, times x minus four, is x squared minus three x minus four. Then double it: two x squared minus six x minus eight.', show: 'm.0', focus: 'm.0' },
        { say: 'x minus three, squared, is x squared minus six x plus nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Now subtract the whole second product. Keep it in brackets, so the minus sign reaches every term.', show: 'm.2', focus: 'm.2' },
        { say: 'Every sign inside changes: minus x squared, plus six x, minus nine.', show: 'm.3', focus: 'm.3' },
        { say: 'Combine like terms. The x terms cancel, and the answer is x squared minus seventeen.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Subtracting a product',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['-(x^2 - 6x + 9) = -x^2 + 6x - 9 \\quad \\good{\\text{✓}}', '-(x^2 - 6x + 9) \\neq -x^2 - 6x + 9 \\quad \\bad{\\text{✗}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Bracket it first', md: 'Put a product in brackets before you subtract it. The minus sign changes **every** sign inside.' },
      ],
      lines: [
        { say: 'Subtracting a product is where most mistakes happen. With brackets, the minus sign changes every sign inside.', show: 'm.0', focus: 'm.0' },
        { say: 'A common error is to change only the first sign, and write minus x squared minus six x plus nine. So put the product in brackets before you subtract it.', show: ['m.1', 'oops'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Checking by substitution',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x + 3)(2x - 1) \\overset{?}{=} 2x^2 + 5x - 3', '\\text{Let } x = 2.', '\\text{Left: } (5)(3) = 15', '\\text{Right: } 8 + 10 - 3 = 15'] }],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'What a check tells you', md: 'Different values: there is definitely an error. The same value: the answer is very likely right.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Choose a good value', md: 'Try 2 or 3. Avoid 0 and 1, which can hide mistakes.' },
      ],
      lines: [
        { say: 'Is x plus three, times two x minus one, equal to two x squared plus five x minus three? Check by putting the same number into both sides.', show: 'm.0', focus: 'm.0' },
        { say: 'Let x equal two. The left side is five times three: fifteen.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'The right side is eight plus ten minus three: also fifteen. The values match, so the product is very likely correct.', show: 'm.3', focus: 'm.3' },
        { say: 'If the two sides give different values, there is definitely an error.', show: 'key' },
        { say: 'Choose a value like two or three. Zero and one can hide mistakes: zero wipes out terms, and every power of one is one.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student says $(x + 5)^2 = x^2 + 25$. Substitute $x = 2$. What do the two sides give?',
          choices: ['$49$ and $29$, so it is wrong', '$29$ and $29$, so it is right', '$49$ and $49$, so it is right', '$14$ and $29$, so it is wrong'],
          answer: 0,
          working: '$(2 + 5)^2 = 49$ but $2^2 + 25 = 29$. The values differ, so it is wrong: $(x + 5)^2 = x^2 + 10x + 25$.',
        },
      ],
      lines: [
        { say: 'Your turn. A student says that x plus five, squared, is x squared plus 25. Substitute x equals two. What do the two sides give? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The left side is seven squared, 49, and the right side is four plus 25, which is 29. They differ, so the student is wrong. The correct expansion is x squared plus ten x plus 25.', show: 'q.answer' },
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
          items: ['Expand each product separately, then combine like terms.', 'Put a product in brackets before subtracting it: every sign changes.', 'Check by substituting a value such as 2 into both sides.'],
        },
      ],
      lines: [
        { say: "Let's sum up. Expand each product separately, then combine like terms.", show: 'sum.0' },
        { say: 'Put a product in brackets before you subtract it, so every sign changes.', show: 'sum.1' },
        { say: 'And check your answer by substituting a value, such as two, into both sides. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
