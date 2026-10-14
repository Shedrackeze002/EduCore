import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-1-c',
  lessonId: 'm203-7-1',
  title: 'Simple and Compound Interest, Part 3: Compound Interest',
  thumbnailTitle: 'Compound Interest',
  thumbnail: 't',
  summary: 'Interest on interest, year by year (1,000 dollars at 5% grows to 1,157.63 dollars in 3 years), the compound interest formula A = P(1 + r/n)^(nt) with n compounding periods a year, 4,000 dollars at 4.8% compounded monthly for 5 years, and keeping every digit on the calculator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.1 · Part 3', title: 'Compound Interest', subtitle: 'Interest on interest' }],
      lines: [
        { say: 'With simple interest, you earn the same amount every year. With compound interest, your interest starts earning interest of its own.', show: 'title' },
        { say: 'In this video, you will build a compound interest table, and use the compound interest formula.' },
      ],
    },
    {
      chapter: 'Interest on interest',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Compound interest', md: 'The interest is **added to the balance**, and the next period earns interest on the new, bigger balance.' },
        { kind: 'table', id: 't', head: ['Year', 'Balance at start', 'Interest at 5%', 'Balance at end'], rows: [['$1$', '\\$1,000.00', '\\$50.00', '\\$1,050.00'], ['$2$', '\\$1,050.00', '\\$52.50', '\\$1,102.50'], ['$3$', '\\$1,102.50', '\\$55.13', '\\$1,157.63']] },
      ],
      lines: [
        { say: 'With compound interest, the interest is added to the balance, and the next period earns interest on the new, bigger balance. You earn interest on your interest.', show: 'def' },
        { say: 'Start with 1,000 dollars at five percent a year, compounded once a year. In year one, the interest is fifty dollars, so the balance becomes 1,050.', show: 't', focus: 't.0' },
        { say: 'In year two, five percent of 1,050 is 52 dollars fifty, so the balance becomes 1,102 dollars 50.', focus: 't.1' },
        { say: 'In year three, five percent of 1,102.50 is about 55 dollars 13, for a balance of 1,157 dollars 63.', focus: 't.2' },
        { say: 'The interest grows every year: fifty, then 52.50, then 55.13. With simple interest, it would stay at fifty dollars.' },
      ],
    },
    {
      chapter: 'The compound interest formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}'] },
        { kind: 'table', id: 't', head: ['Compounded', 'Annually', 'Semi-annually', 'Quarterly', 'Monthly'], rows: [['$n$', '$1$', '$2$', '$4$', '$12$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['1{,}000(1 + 0.05)^3 = 1{,}157.625 \\approx 1{,}157.63'] },
      ],
      lines: [
        { say: 'The compound interest formula does all of those steps at once. "A" equals P times one plus r over n, all to the power n t.', show: 'f' },
        { say: 'Here, r is the yearly rate as a decimal, t is the time in years, and n is the number of compounding periods per year: one for annually, two for semi-annually, four for quarterly, and twelve for monthly.', show: 't' },
        { say: 'Check the table: 1,000 times 1.05 to the power three is 1,157.625, which rounds to 1,157 dollars 63. It matches.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Compounded monthly',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$4,000 at $4.8\\%$ per year, compounded monthly, for $5$ years.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['n = 12,\\ \\ t = 5,\\ \\ nt = 60', 'A = 4{,}000\\left(1 + \\dfrac{0.048}{12}\\right)^{60} = 4{,}000(1.004)^{60}', '\\approx 5{,}082.56', 'I = 5{,}082.56 - 4{,}000 = 1{,}082.56'] },
      ],
      lines: [
        { say: 'Dakota puts 4,000 dollars into a term deposit. In this example, it earns 4.8 percent per year, compounded monthly. What is it worth after five years, and how much interest is that?', show: 'q' },
        { say: 'P is 4,000, r is 0.048, and monthly means n is twelve. With t equal to five, n t is sixty: sixty months of interest.', show: 'm.0', focus: 'm.0' },
        { say: 'So "A" equals 4,000 times one plus 0.048 over twelve, to the power sixty. 0.048 over twelve is 0.004.', show: 'm.1', focus: 'm.1' },
        { say: 'On a calculator, that comes to about 5,082 dollars 56.', show: 'm.2', focus: 'm.2' },
        { say: 'The interest is the amount minus the principal: 1,082 dollars 56.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Calculator keystrokes',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep every digit', md: 'Type it in one line: `4000 × (1 + 0.048 ÷ 12) ^ (12 × 5)`. Do not round $\\frac{r}{n}$ along the way. Round only the final amount, to the cent.' }],
      lines: [
        { say: 'On a calculator, type it all in one line, with brackets around one plus r over n, and around the exponent.', show: 'tip' },
        { say: 'Do not round r over n along the way. At five percent compounded monthly, 0.05 over twelve is 0.0041666, and so on. Rounding it to 0.0042 would make the five-year amount on 4,000 dollars about ten dollars too high. Round only the final amount, to the cent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '\\$3,000 earns $6\\%$ per year, compounded quarterly. What is it worth after $2$ years?',
          choices: ['\\$3,379.48', '\\$3,360.00', '\\$3,370.80', '\\$3,180.00'],
          answer: 0,
          working: '$n = 4$ and $nt = 8$: $A = 3{,}000\\left(1 + \\dfrac{0.06}{4}\\right)^{8} = 3{,}000(1.015)^8 \\approx 3{,}379.48$. B is simple interest, and C compounds once a year.',
        },
      ],
      lines: [
        { say: 'Your turn. 3,000 dollars earns six percent per year, compounded quarterly. What is it worth after two years? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Quarterly means n is four, so n t is eight. 3,000 times 1.015 to the power eight is about 3,379 dollars 48. B is simple interest, and C compounds only once a year.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Compound interest earns interest on interest.', '$A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$, with $n$ = 1, 2, 4 or 12.', 'Keep every digit; round only the final amount.'] }],
      lines: [
        { say: 'Let’s sum up. Compound interest earns interest on interest.', show: 'sum.0' },
        { say: '"A" equals P times one plus r over n, to the power n t, where n is one, two, four or twelve.', show: 'sum.1' },
        { say: 'And keep every digit on the calculator, rounding only the final amount. In part four, we compare simple and compound interest over many years. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
