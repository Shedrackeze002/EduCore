import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-2-c',
  lessonId: 'm203-7-2',
  title: 'The Rule of 72 and Investments, Part 3: Checking the Rule and Comparing Offers',
  thumbnailTitle: 'Comparing Offers',
  thumbnail: 'm',
  summary: 'Checking the Rule of 72 with the compound interest formula (3,000 dollars at 6% is worth 6,036.59 dollars after 12 years), how close the rule is at different rates, and comparing a simple interest offer with a lower rate compounded monthly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.2 · Part 3', title: 'Comparing Offers', subtitle: 'The rate is not the whole story' }],
      lines: [
        { say: 'The Rule of 72 is quick, but it is only an estimate. And when you compare real offers, the rate alone does not tell you which one is better.', show: 'title' },
        { say: 'In this video, you will check the rule with the formula, and compare two investment offers.' },
      ],
    },
    {
      chapter: 'Checking the rule at 6%',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$3,000 at $6\\%$ per year, compounded annually. The rule says it doubles in $12$ years.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['A = P(1 + r)^t', 'A = 3{,}000(1 + 0.06)^{12} \\approx 6{,}036.59', '\\text{double: } 6{,}000'] },
      ],
      lines: [
        { say: 'Ayesha invests 3,000 dollars at six percent per year, compounded annually. The rule says it doubles in twelve years. What is it really worth after twelve years?', show: 'q' },
        { say: 'For annual compounding, n is one, so the formula becomes "A" equals P times one plus r, to the power t.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 3,000 times 1.06 to the power twelve: about 6,036 dollars 59.', show: 'm.1', focus: 'm.1' },
        { say: 'Double the principal is 6,000 dollars, so the money has a little more than doubled. The estimate is very close.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How good is the estimate?',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Rate', 'Rule of 72 estimate', '\\$1 really grows to'], rows: [['$2\\%$', '$36$ years', '\\$2.04'], ['$4\\%$', '$18$ years', '\\$2.03'], ['$6\\%$', '$12$ years', '\\$2.01'], ['$8\\%$', '$9$ years', '\\$2.00'], ['$9\\%$', '$8$ years', '\\$1.99'], ['$12\\%$', '$6$ years', '\\$1.97']] }],
      lines: [
        { say: 'This table shows how far one dollar really grows in the doubling time the rule gives, at different rates.', show: 't' },
        { say: 'At two percent, it grows to 2 dollars 4 cents in 36 years.', focus: 't.0' },
        { say: 'At eight percent, it grows to almost exactly two dollars in nine years. And at twelve percent, it grows to 1 dollar 97 in six years.', focus: ['t.3', 't.5'] },
        { say: 'For everyday rates, the money is within a few percent of double, so the rule is good enough to compare options quickly. When you need the exact amount, use the formula.' },
      ],
    },
    {
      chapter: 'Simple or compound?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$10,000 for $8$ years. **Offer A:** $4.5\\%$ simple interest. **Offer B:** $4\\%$ compounded monthly.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{A: } 10{,}000 + 10{,}000 \\times 0.045 \\times 8 = 13{,}600.00', '\\text{B: } 10{,}000\\left(1 + \\dfrac{0.04}{12}\\right)^{96} \\approx 13{,}763.95', '13{,}763.95 - 13{,}600.00 = 163.95'] },
      ],
      lines: [
        { say: 'Kwame has 10,000 dollars to invest for eight years. In this example, offer "A" pays 4.5 percent per year simple interest. Offer B pays four percent per year, compounded monthly. Which is better?', show: 'q' },
        { say: 'To compare offers, find what each one is worth after the same time. Offer "A" is 10,000 plus 10,000 times 0.045 times eight: 13,600 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Offer B compounds monthly, so n is twelve, and n t is twelve times eight, 96. 10,000 times one plus 0.04 over twelve, to the power 96, is about 13,763 dollars 95.', show: 'm.1', focus: 'm.1' },
        { say: 'Offer B is better by 163 dollars 95, even though its rate is lower, because its interest earns interest.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The exponent',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing months and years in the exponent', md: 'The exponent is the total number of compounding periods, $nt$. For $8$ years compounded monthly that is $12 \\times 8 = 96$, not $8$ and not $12$. Write down $n$ and $t$ before you start.' }],
      lines: [
        { say: 'A common mistake is the exponent. It is the total number of compounding periods, n times t. For eight years compounded monthly, that is twelve times eight, 96: not eight, and not twelve. Write down n and t before you start.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For \\$8,000 over $10$ years, Offer A pays $5.5\\%$ simple interest and Offer B pays $5\\%$ compounded quarterly. Which is better, and by how much?',
          choices: ['Offer B, by \\$748.96', 'Offer A, by \\$748.96', 'Offer A, by \\$3,341.83', 'Offer B, by \\$5,148.96'],
          answer: 0,
          working: 'A: $8{,}000 + 8{,}000 \\times 0.055 \\times 10 = 12{,}400$. B: $8{,}000\\left(1 + \\dfrac{0.05}{4}\\right)^{40} \\approx 13{,}148.96$. C uses an exponent of $10$ instead of $40$.',
        },
      ],
      lines: [
        { say: 'Your turn. For 8,000 dollars over ten years, offer "A" pays 5.5 percent simple interest, and offer B pays five percent compounded quarterly. Which is better, and by how much? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Offer "A" grows to 12,400 dollars. Offer B compounds quarterly, so the exponent is four times ten, forty, and it grows to about 13,148 dollars 96. Offer B is better by 748 dollars 96. Choice C uses an exponent of ten.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The Rule of 72 is an estimate; the formula gives the exact value.', 'Compare offers by their values after the same time.', 'The exponent is $nt$, the total number of periods.'] }],
      lines: [
        { say: 'Let’s sum up. The Rule of 72 is a close estimate, and the formula gives the exact value.', show: 'sum.0' },
        { say: 'Compare offers by what each is worth after the same time. A higher rate is not always the better deal.', show: 'sum.1' },
        { say: 'And the exponent is n t, the total number of compounding periods. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
