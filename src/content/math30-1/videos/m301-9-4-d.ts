import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-9-4-d',
  lessonId: 'm301-9-4',
  title: 'The Binomial Theorem, Part 4: Finding One Term',
  thumbnailTitle: 'Finding One Term',
  summary: 'The general term t(k + 1) = nCk x^(n − k) y^k, where k is one less than the term number: the 4th term of (2x − 3)⁶ is −4320x³, the constant term of (x² + 2/x)⁶ is 240, and c = 3 when the coefficient of x⁴ in (x + c)⁶ is 135.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.4 · Part 4', title: 'Finding One Term', subtitle: '$t_{k + 1} = {}_{n}C_{k}\\,x^{n - k}y^{k}$' }],
      lines: [
        { say: 'Sometimes you need just one term of an expansion, such as the fourth term of two x minus three, to the power six. Writing out all seven terms would waste a lot of time.', show: 'title' },
        { say: 'In this video, you will use the general term to find any single term, a constant term, and an unknown number in a binomial.' },
      ],
    },
    {
      chapter: 'The general term',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'General term', md: 'In the expansion of $(x + y)^n$ in descending powers of $x$, the $(k + 1)$th term is $t_{k + 1} = {}_{n}C_{k}\\,x^{n - k}y^{k}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['t_1 = {}_{n}C_{\\good{0}}\\,x^n, \\quad t_2 = {}_{n}C_{\\good{1}}\\,x^{n - 1}y, \\quad t_3 = {}_{n}C_{\\good{2}}\\,x^{n - 2}y^2'] },
      ],
      lines: [
        { say: 'Every term of the binomial theorem has the same shape. In the expansion of x plus y, to the power n, in descending powers of x, term number k plus one is t sub k plus one. It equals n choose k, times x to the n minus k, times y to the k.', show: 'def' },
        { say: 'Look at the first few terms. The first term has k equals zero, the second has k equals one, and the third has k equals two.', show: 'm.0', focus: 'm.0' },
        { say: 'So k is always one less than the term number. It is also the power of y.' },
      ],
    },
    {
      chapter: 'The fourth term',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Find the 4th term of $(2x - 3)^6$, written in descending powers of $x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['t_4 = t_{3 + 1}\\colon\\quad k = 3, \\quad x \\to 2x, \\quad y \\to -3', 't_4 = {}_{6}C_{3}\\,(2x)^{3}(-3)^{3}', '= 20 \\times 8x^3 \\times (-27)', '= -4320x^3'] },
      ],
      lines: [
        { say: 'Find the fourth term of two x minus three, to the power six, written in descending powers of x.', show: 'p' },
        { say: 'The fourth term is t sub three plus one, so k is three, not four. The first term of the binomial is two x, and the second is negative three.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute: t four equals six choose three, times two x, cubed, times negative three, cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'Six choose three is twenty. Two x, cubed, is eight x cubed. And negative three, cubed, is negative twenty-seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply: twenty times eight is 160, and 160 times negative twenty-seven is negative 4,320. So the fourth term is negative 4,320 x cubed.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two common slips', md: 'The $k$ in $t_{k + 1}$ is **one less** than the term number. And $(2x)^3 = 8x^3$, not $2x^3$: raise the whole first term, coefficient included, to the power. Keep negative terms in brackets so the sign comes out right.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{4th term: } k = 3, \\ \\text{not } \\bad{4}', '(2x)^3 = 8x^3, \\ \\text{not } \\bad{2x^3}'] },
      ],
      lines: [
        { say: 'Watch out for two common slips. First, the k in t sub k plus one is one less than the term number. Using k equals four would give the fifth term, not the fourth.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Second, two x, cubed, is eight x cubed, not two x cubed. Raise the whole first term, coefficient included, to the power. And keep negative terms in brackets, so the sign comes out right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A constant term',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Find the constant term of $\\left(x^2 + \\dfrac{2}{x}\\right)^6$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['t_{k + 1} = {}_{6}C_{k}\\,(x^2)^{6 - k}(2x^{-1})^{k}', '= {}_{6}C_{k}\\,2^k\\,x^{12 - 2k - k} = {}_{6}C_{k}\\,2^k\\,x^{12 - 3k}', '12 - 3k = 0 \\quad\\Rightarrow\\quad k = 4', 't_5 = {}_{6}C_{4}\\,2^4 = 15 \\times 16 = 240'] },
      ],
      lines: [
        { say: 'Find the constant term of x squared plus two over x, all to the power six.', show: 'p' },
        { say: 'A constant term has no x: its power of x is zero. Write two over x as two x to the negative one, so the powers are easy to combine. The general term is six choose k, times x squared to the six minus k, times two x to the negative one, to the k.', show: 'm.0', focus: 'm.0' },
        { say: 'Collect the powers of x: twelve minus two k, minus k, which is twelve minus three k. So the term is six choose k, times two to the k, times x to the twelve minus three k.', show: 'm.1', focus: 'm.1' },
        { say: 'For the constant term, the power of x is zero: twelve minus three k equals zero, so k equals four.', show: 'm.2', focus: 'm.2' },
        { say: 'That is the fifth term. Six choose four, times two to the fourth, is fifteen times sixteen, which is 240.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'An unknown constant',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'In $(x + c)^6$, where $c > 0$, the coefficient of $x^4$ is $135$. Find $c$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x^{6 - k} = x^4 \\quad\\Rightarrow\\quad k = 2', 't_3 = {}_{6}C_{2}\\,x^4c^2 = 15c^2x^4', '15c^2 = 135, \\quad c^2 = 9', 'c = 3 \\qquad (c > 0)'] },
      ],
      lines: [
        { say: 'In the expansion of x plus c, to the power six, where c is positive, the coefficient of x to the fourth is 135. Find c.', show: 'p' },
        { say: 'The power of x in the general term is six minus k, and it must be four, so k is two.', show: 'm.0', focus: 'm.0' },
        { say: 'That term is six choose two, x to the fourth, c squared, which is fifteen c squared x to the fourth.', show: 'm.1', focus: 'm.1' },
        { say: 'So fifteen c squared equals 135, and c squared equals nine.', show: 'm.2', focus: 'm.2' },
        { say: 'c is positive, so c equals three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the 3rd term of $(x + 2)^5$, written in descending powers of $x$.',
          choices: ['$80x^2$', '$40x^3$', '$20x^3$', '$10x^3$'],
          answer: 1,
          working: 'The 3rd term is $t_{2 + 1}$, so $k = 2$: $t_3 = {}_{5}C_{2}\\,x^{3}(2)^{2} = 10 \\times x^3 \\times 4 = 40x^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the third term of x plus two, to the power five, written in descending powers of x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, forty x cubed. The third term has k equals two: five choose two, times x cubed, times two squared, which is ten times four, or forty x cubed. Choice A uses k equals three, which gives the fourth term.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$t_{k + 1} = {}_{n}C_{k}\\,x^{n - k}y^{k}$: $k$ is one less than the term number.', 'Raise the whole of each term, coefficient and sign included, to its power.', 'For a constant term or a given power, write the power of $x$ in terms of $k$ and solve for $k$.'] }],
      lines: [
        { say: 'Let’s sum up. The general term, t sub k plus one, is n choose k, x to the n minus k, y to the k, and k is one less than the term number.', show: 'sum.0' },
        { say: 'Raise the whole of each term, coefficient and sign included, to its power.', show: 'sum.1' },
        { say: 'And for a constant term or a given power, write the power of x in terms of k, and solve for k. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
