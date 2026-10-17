import type { DiagramEl, DiagramItem, DiagramTone, Explainer } from '@/video/script.ts';

/**
 * The long division of x³ + 2x² − 5x + 7 by x − 2, laid out as on paper. The two corner points fix
 * the scale at one unit to one pixel in a 600 by 560 column, so each row can start where its first
 * term sits under the term of the same degree: offsets in KaTeX ems (34 px in a diagram label),
 * from the widths of x³, 2x² and the spaced signs. The bars match the width of the maths.
 */
const EM = 28 * 1.21;
const L = 130;
const at = (em: number): number => L + em * EM - 10;
const rowAt = (id: string, x: number, y: number, tex: string, tone?: DiagramTone, group?: string, place: 'right' | 'left' = 'right'): [string, [number, number], DiagramItem] => [
  id,
  [x, y],
  { kind: 'label', id, at: id, tex, place, ...(tone ? { tone } : {}), ...(group ? { group } : {}) },
];
// A zero-width strut, so the quotient's terms share one baseline.
const strut = '\\rule{0pt}{1em}';
const rows = [
  rowAt('q0', at(2.69375), 440, `${strut}x^2`, 'brand', 'quot'),
  rowAt('q1', at(3.66528), 440, `${strut}{} + 4x`, 'brand', 'quot'),
  rowAt('q2', at(5.95903), 440, `${strut}{} + 3`, 'brand', 'quot'),
  rowAt('dividend', at(0), 380, 'x^3 + 2x^2 - 5x + 7', undefined, 'setup'),
  rowAt('r1', at(0), 320, 'x^3 - 2x^2', 'adj'),
  rowAt('d1', at(2.19375), 260, '4x^2 - 5x'),
  rowAt('r2', at(2.19375), 200, '4x^2 - 8x', 'adj'),
  rowAt('d2', at(4.8875), 140, '3x + 7'),
  rowAt('r3', at(4.8875), 80, '3x - 6', 'adj'),
  rowAt('rem', at(7.68125) + 20, 20, '13', 'good', undefined, 'left'),
];
const longDivision: DiagramEl = {
  kind: 'diagram',
  id: 'ld',
  points: {
    F0: [0, 0],
    F1: [472, 460],
    ...Object.fromEntries(rows.map(([id, pt]) => [id, pt])),
    div: [114, 380],
    k0: [106, 406],
    k1: [111, 397],
    k2: [114, 386],
    k3: [114, 374],
    k4: [111, 363],
    k5: [106, 354],
    top: [402, 406],
    b1a: [124, 294],
    b1b: [260, 294],
    b2a: [198, 174],
    b2b: [338, 174],
    b3a: [290, 54],
    b3b: [396, 54],
  },
  items: [
    { kind: 'label', id: 'div', at: 'div', tex: 'x - 2', place: 'left', group: 'setup' },
    { kind: 'curve', id: 'bracket', points: ['k0', 'k1', 'k2', 'k3', 'k4', 'k5'], weight: 2.5, group: 'setup' },
    { kind: 'line', id: 'over', from: 'k0', to: 'top', weight: 2.5, group: 'setup' },
    { kind: 'line', id: 'bar1', from: 'b1a', to: 'b1b', weight: 2.5 },
    { kind: 'line', id: 'bar2', from: 'b2a', to: 'b2b', weight: 2.5 },
    { kind: 'line', id: 'bar3', from: 'b3a', to: 'b3b', weight: 2.5 },
    ...rows.map(([, , item]) => item),
  ],
};

const video: Explainer = {
  id: 'm301-3-2',
  lessonId: 'm301-3-2',
  title: 'The Remainder Theorem, Part 1: Polynomial Long Division',
  thumbnailTitle: 'Polynomial Long Division',
  thumbnail: false,
  summary: 'The division statement P(x) = (x − a)Q(x) + R, dividing x³ + 2x² − 5x + 7 by x − 2 with long division (divide, multiply, subtract, bring down), checking the result, and writing it as a fraction. Part 2 does the same division with synthetic division.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.2 · Part 1', title: 'Polynomial Long Division', subtitle: 'Divide, multiply, subtract, bring down' }],
      lines: [
        { say: 'You already know how to divide one number by another, with a quotient and a remainder. Polynomials can be divided in exactly the same way.', show: 'title' },
        { say: 'In this video, you will divide a polynomial by x minus "a" with long division, and write the answer as a division statement.' },
      ],
    },
    {
      chapter: 'The division statement',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['47 \\div 5 = 9 \\text{ remainder } 2', '47 = 5 \\times 9 + 2', 'P(x) = (x - a)Q(x) + R'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Division statement', md: 'When a polynomial $P(x)$ is divided by $x - a$, the result is a **quotient** $Q(x)$ and a **remainder** $R$, a number. The quotient has degree one less than $P(x)$.' },
      ],
      lines: [
        { say: 'Start with numbers. 47 divided by five is nine, remainder two.', show: 'm.0', focus: 'm.0' },
        { say: 'You can check it: five times nine is 45, and adding the remainder two gives 47.', show: 'm.1', focus: 'm.1' },
        { say: 'Polynomials work the same way. When a polynomial P of x is divided by x minus "a", the result is a quotient, Q of x, and a remainder, R, which is just a number.', show: 'def' },
        { say: 'They fit together in the division statement: P of x equals x minus "a", times Q of x, plus R.', show: 'm.2', focus: 'm.2' },
        { say: 'The quotient always has degree one less than P of x. Divide a cubic by x minus "a", and the quotient is a quadratic.' },
      ],
    },
    {
      chapter: 'Long division',
      layout: 'split',
      leftWidth: 600,
      left: [longDivision],
      right: [{ kind: 'bullets', id: 'cyc', items: ['**Divide** the leading terms.', '**Multiply** by the divisor.', '**Subtract**, then bring down the next term.', '**Repeat** until no terms are left.'] }],
      lines: [
        { say: 'Divide x cubed, plus two x squared, minus five x, plus seven, by x minus two. Set it up like a long division of numbers.', show: 'ld.setup' },
        { say: 'First, divide the leading terms. x cubed divided by x is x squared. Write it above the x squared term.', show: ['cyc.0', 'ld.q0'], focus: ['cyc.0', 'ld.q0'] },
        { say: 'Multiply: x squared, times x minus two, is x cubed minus two x squared. Write it underneath.', show: ['cyc.1', 'ld.r1'], focus: ['cyc.1', 'ld.r1'] },
        { say: 'Subtract. The x cubed terms cancel, and two x squared minus negative two x squared is four x squared. Then bring down the next term, negative five x.', show: ['cyc.2', 'ld.bar1', 'ld.d1'], focus: ['cyc.2', 'ld.d1'] },
        { say: 'Now repeat the cycle with four x squared minus five x. Four x squared divided by x is four x. And four x, times x minus two, is four x squared minus eight x.', show: ['cyc.3', 'ld.q1', 'ld.r2'], focus: ['cyc.3', 'ld.q1', 'ld.r2'] },
        { say: 'Subtract: negative five x minus negative eight x is three x. Bring down the seven.', show: ['ld.bar2', 'ld.d2'], focus: ['cyc', 'ld.d2'] },
        { say: 'Once more. Three x divided by x is three, and three, times x minus two, is three x minus six.', show: ['ld.q2', 'ld.r3'], focus: ['ld.q2', 'ld.r3'] },
        { say: 'Subtract: seven minus negative six is thirteen. There are no terms left to bring down, so thirteen is the remainder.', show: ['ld.bar3', 'ld.rem'], focus: 'ld.rem' },
        { say: 'The quotient is x squared, plus four x, plus three, and the remainder is thirteen.', focus: ['ld', 'cyc'] },
      ],
    },
    {
      chapter: 'Writing and checking the result',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x^3 + 2x^2 - 5x + 7 = (x - 2)(x^2 + 4x + 3) + 13', '(x - 2)(x^2 + 4x + 3) = x^3 + 2x^2 - 5x - 6', '\\dfrac{x^3 + 2x^2 - 5x + 7}{x - 2} = x^2 + 4x + 3 + \\dfrac{13}{x - 2},\\quad x \\ne 2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting a negative', md: 'In the first step, $2x^2 - (-2x^2) = 4x^2$, not $0$. Subtract **every** term of the product: change its signs, then add.' },
      ],
      lines: [
        { say: 'Write the result as a division statement: x cubed, plus two x squared, minus five x, plus seven, equals x minus two, times x squared plus four x plus three, plus thirteen.', show: 'm.0', focus: 'm.0' },
        { say: 'To check it, expand the product. x minus two, times x squared plus four x plus three, is x cubed, plus two x squared, minus five x, minus six. Add the remainder, thirteen, and you get the original polynomial back.', show: 'm.1', focus: 'm.1' },
        { say: 'You can also divide both sides by x minus two. Then the fraction equals the quotient, plus thirteen over x minus two. x cannot be two, because that would make the divisor zero.', show: 'm.2', focus: 'm.2' },
        { say: 'The most common slip is in the subtraction. Two x squared minus negative two x squared is four x squared, not zero. Subtract every term of the product: change its signs, then add.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Divide $x^3 + 3x^2 - x + 4$ by $x + 2$. Find the quotient and the remainder.',
          choices: ['$x^2 + 5x + 9$, remainder $22$', '$x^2 + x - 3$, remainder $10$', '$x^2 + x - 3$, remainder $-2$', '$x^2 + x + 1$, remainder $2$'],
          answer: 1,
          working: '$x^3 \\div x = x^2$; subtract $x^3 + 2x^2$ to get $x^2 - x$. $x^2 \\div x = x$; subtract $x^2 + 2x$ to get $-3x + 4$. $-3x \\div x = -3$; subtract $-3x - 6$ to get $10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Divide x cubed, plus three x squared, minus x, plus four, by x plus two. Find the quotient and the remainder. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The quotient is x squared, plus x, minus three, and the remainder is ten. In the last step, four minus negative six is ten. C subtracts six instead of negative six, and gets negative two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Division statement: $P(x) = (x - a)Q(x) + R$, where $Q(x)$ has degree one less than $P(x)$.', 'Long division: divide, multiply, subtract, bring down, and repeat.', 'Check by expanding $(x - a)Q(x)$ and adding $R$.'] }],
      lines: [
        { say: 'Let’s sum up. The division statement is P of x equals x minus "a", times Q of x, plus R. The quotient has degree one less than P of x.', show: 'sum.0' },
        { say: 'Long division repeats one cycle: divide the leading terms, multiply, subtract, and bring down the next term.', show: 'sum.1' },
        { say: 'And you can check the answer by expanding x minus "a" times the quotient, and adding the remainder. In part two, we do the same division much faster, with synthetic division. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
