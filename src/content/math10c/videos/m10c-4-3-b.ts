import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-4-3-b',
  lessonId: 'm10c-4-3',
  title: 'Common Factors, Part 2: Negative and Binomial Common Factors',
  thumbnailTitle: 'More Common Factors',
  summary: 'Common factors with two variables, factoring out a negative GCF, checking that a polynomial is completely factored, and a binomial common factor: a first look at factoring by grouping.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.3 · Part 2', title: 'More Common Factors', subtitle: 'Negative factors and grouping' }],
      lines: [
        { say: 'A greatest common factor is not always a number times x. It can have two variables, be negative, or even be a whole binomial.', show: 'title' },
        { say: 'In this video, you will factor with two variables, take out a negative common factor, check that a factoring is complete, and take a first look at factoring by grouping.' },
      ],
    },
    {
      chapter: 'Two variables',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['15x^2y - 10xy^2', '\\text{GCF} = 5xy', '= 5xy(3x - 2y)'] }],
      lines: [
        { say: 'Factor fifteen x squared y minus ten x y squared. The GCF of fifteen and ten is five, and both terms have x and y, each to at least the first power.', show: 'm.0', focus: 'm.0' },
        { say: 'So the GCF is five x y.', show: 'm.1', focus: 'm.1' },
        { say: 'Dividing each term by five x y leaves three x and negative two y. So the answer is five x y, times three x minus two y.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A negative common factor',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['-6m^2 + 9m = -3m(2m - 3)', '\\text{or } 3m(-2m + 3)'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A negative first term', md: 'Factor out a **negative** GCF, so the brackets start with a positive term.' },
      ],
      lines: [
        { say: 'Factor negative six m squared plus nine m. When the first term is negative, it is neater to factor out a negative GCF: negative three m.', show: 'tip' },
        { say: 'Negative six m squared divided by negative three m is two m, and nine m divided by negative three m is negative three. So: negative three m, times two m minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Factoring out positive three m works too, giving three m times negative two m plus three. Both are correct, but the first starts its brackets with a positive term.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Is it complete?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['12x^2 + 18x = 2x(6x + 9) \\quad \\bad{\\text{not complete}}', '12x^2 + 18x = 6x(2x + 3) \\quad \\good{\\text{complete}}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Completely factored', md: 'After you factor, nothing common should be left inside the brackets.' },
      ],
      lines: [
        { say: 'Check that you used the greatest common factor. Twelve x squared plus eighteen x is two x, times six x plus nine. That is true, but six and nine still share a factor of three.', show: 'm.0', focus: 'm.0' },
        { say: 'The GCF is six x: six x, times two x plus three. Now nothing common is left in the brackets, so it is completely factored.', show: ['m.1', 'tip'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'A binomial common factor',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          lines: ['x\\adj{(x + 4)} + 3\\adj{(x + 4)} = \\adj{(x + 4)}(x + 3)', '2x^2 + 6x + 5x + 15', '= 2x\\opp{(x + 3)} + 5\\opp{(x + 3)}', '= \\opp{(x + 3)}(2x + 5)'],
        },
      ],
      lines: [
        { say: 'Sometimes the common factor is a whole binomial. In x times x plus four, plus three times x plus four, both terms contain x plus four. Factor it out, just like a number: x plus four, times x plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Four terms can be grouped in pairs to reveal a common binomial. Take two x squared plus six x plus five x plus fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'The first pair has a GCF of two x, which leaves x plus three. The second pair has a GCF of five, which also leaves x plus three.', show: 'm.2', focus: 'm.2' },
        { say: 'So the whole thing is x plus three, times two x plus five. This is called factoring by grouping, and you will use it again in lesson 4.5.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $x(x - 7) - 2(x - 7)$.',
          choices: ['$(x - 7)(x - 2)$', '$(x - 7)(x + 2)$', '$x(x - 7)$', '$(x - 7)^2$'],
          answer: 0,
          working: 'Both terms share $(x - 7)$. What is left is $x$ and $-2$: $(x - 7)(x - 2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor x times x minus seven, minus two times x minus seven. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Both terms share the binomial x minus seven. What is left is x, and negative two, so: x minus seven, times x minus two. B loses the minus sign.', show: 'q.answer' },
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
          items: ['A GCF can have several variables, or be negative.', 'Factor out a negative GCF when the first term is negative.', 'Nothing common should be left inside the brackets.', 'A common binomial factors out just like a number.'],
        },
      ],
      lines: [
        { say: "Let's sum up. A greatest common factor can have several variables, or be negative.", show: 'sum.0' },
        { say: 'When the first term is negative, factor out a negative GCF.', show: 'sum.1' },
        { say: 'Check that nothing common is left inside the brackets.', show: 'sum.2' },
        { say: 'And a common binomial factors out just like a number. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
