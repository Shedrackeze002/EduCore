import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-3-e',
  lessonId: 'm203-7-3',
  title: 'Credit Cards and Loans, Part 5: Comparing Credit Options',
  thumbnailTitle: 'Comparing Credit Options',
  thumbnail: 'm',
  summary: 'Comparing a dealer loan with a bank loan by total cost (the bank saves 2,703.12 dollars despite a higher payment), what rent-to-own is, the finance charge on a rent-to-own TV (1,049.23 dollars, about 116.6% of the cash price), and saving up instead.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.3 · Part 5', title: 'Comparing Credit Options', subtitle: 'Compare the totals, not the payments' }],
      lines: [
        { say: 'A low monthly payment sounds like a good deal. But a lower payment often means more payments, and a bigger total cost.', show: 'title' },
        { say: 'In this video, you will compare two loans, and find the real cost of rent-to-own.' },
      ],
    },
    {
      chapter: 'Dealer or bank?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$20,000 for a truck. **Dealer:** $84$ payments of \\$311.63. **Bank:** $60$ payments of \\$391.23.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{dealer: } 311.63 \\times 84 = 26{,}176.92', '\\text{bank: } 391.23 \\times 60 = 23{,}473.80', '26{,}176.92 - 23{,}473.80 = 2{,}703.12'] },
      ],
      lines: [
        { say: 'Marcus needs 20,000 dollars for a truck. In this example, the dealer offers 84 monthly payments of 311 dollars 63, and the bank offers sixty monthly payments of 391 dollars 23. Which costs less?', show: 'q' },
        { say: 'The dealer loan totals 311.63 times 84: 26,176 dollars 92.', show: 'm.0', focus: 'm.0' },
        { say: 'The bank loan totals 391.23 times sixty: 23,473 dollars 80.', show: 'm.1', focus: 'm.1' },
        { say: 'The bank loan costs 2,703 dollars 12 less, even though its payment is about eighty dollars a month higher. The dealer’s lower payment comes with two more years of paying.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rent-to-own',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Rent-to-own', md: 'You make weekly or every-two-weeks payments, and own the item after the last one. The finance charge is the **total of the payments minus the cash price**, and it is often very high.' }],
      lines: [
        { say: 'With rent-to-own, you make weekly or every-two-weeks payments, and you own the item after the last one.', show: 'def' },
        { say: 'The finance charge is the total of the payments, minus the cash price. And it is often very high.' },
      ],
    },
    {
      chapter: 'A rent-to-own TV',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Cash price \\$899.99, or $78$ weekly payments of \\$24.99.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['24.99 \\times 78 = 1{,}949.22', '1{,}949.22 - 899.99 = 1{,}049.23', '\\dfrac{1{,}049.23}{899.99} \\times 100 \\approx 116.6\\%'] },
      ],
      lines: [
        { say: 'A store in Medicine Hat offers a TV with a cash price of 899 dollars 99, or 78 weekly payments of 24 dollars 99. Find the finance charge.', show: 'q' },
        { say: 'The payments total 24.99 times 78: 1,949 dollars 22.', show: 'm.0', focus: 'm.0' },
        { say: 'The finance charge is 1,949.22 minus 899.99: 1,049 dollars 23. That is more than the TV itself.', show: 'm.1', focus: 'm.1' },
        { say: 'As a percent of the cash price, it is about 116.6 percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Saving up instead',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['899.99 \\div 24.99 \\approx 36.01', '37 \\text{ weeks}'] }],
      lines: [
        { say: 'What if you saved the same 24.99 a week instead? 899.99 divided by 24.99 is about 36.01.', show: 'm.0', focus: 'm.0' },
        { say: 'Round up, as for any savings goal: in 37 weeks, you could buy the TV outright, instead of paying for 78 weeks.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A laptop has a cash price of \\$649.99, or $52$ weekly rent-to-own payments of \\$21.99. What is the finance charge?',
          choices: ['\\$493.49', '\\$1,143.48', '\\$1,793.47', '\\$405.53'],
          answer: 0,
          working: '$21.99 \\times 52 = 1{,}143.48$, and $1{,}143.48 - 649.99 = 493.49$. B is the total of the payments, and C adds the cash price instead of subtracting it.',
        },
      ],
      lines: [
        { say: 'Your turn. A laptop has a cash price of 649 dollars 99, or 52 weekly rent-to-own payments of 21 dollars 99. What is the finance charge? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The payments total 21.99 times 52, which is 1,143 dollars 48. Take away the cash price: the finance charge is 493 dollars 49. B is the total of the payments, and C adds the cash price instead of subtracting it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Compare credit options by total cost, not by payment size.', 'Rent-to-own finance charge = total of payments − cash price.', 'Saving up first is often far cheaper.'] }],
      lines: [
        { say: 'Let’s sum up. Compare credit options by their total cost, not by the size of the payment.', show: 'sum.0' },
        { say: 'For rent-to-own, the finance charge is the total of the payments minus the cash price.', show: 'sum.1' },
        { say: 'And saving up first is often far cheaper than borrowing. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
