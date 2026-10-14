import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-3-c',
  lessonId: 'm203-7-3',
  title: 'Credit Cards and Loans, Part 3: The Cost of Carrying a Balance',
  thumbnailTitle: 'Carrying a Balance',
  thumbnail: 'm',
  summary: 'Interest on interest when a credit card balance is carried (a 1,200 dollar laptop costs 40.42 dollars more after two months at 19.99%), and comparing a no-fee card with a low-rate card that has an annual fee.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.3 · Part 3', title: 'Carrying a Balance', subtitle: 'Interest on interest' }],
      lines: [
        { say: 'Buy something on a credit card and leave it unpaid, and the price keeps going up, month after month.', show: 'title' },
        { say: 'In this video, you will find what carrying a balance costs, and compare two kinds of credit card.' },
      ],
    },
    {
      chapter: 'Interest on interest',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Carrying a balance', md: 'Each month’s interest is **added to what you owe**, and the next month charges interest on that interest too.' }],
      lines: [
        { say: 'When you carry a balance, each month’s interest is added to what you owe. The next month then charges interest on that interest too, just like compound interest, except now it works against you.', show: 'key' },
      ],
    },
    {
      chapter: 'Two months on the card',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$1,200 laptop at $19.99\\%$ per year, charged daily. No payments for $31$ days, then $30$ days.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1{,}200 \\times 0.1999 \\div 365 \\times 31 \\approx 20.37', '1{,}200 + 20.37 = 1{,}220.37', '1{,}220.37 \\times 0.1999 \\div 365 \\times 30 \\approx 20.05', '1{,}220.37 + 20.05 = 1{,}240.42'] },
      ],
      lines: [
        { say: 'Jamal buys a 1,200-dollar laptop on a card that charges 19.99 percent per year, charged daily. He makes no payments for two months: 31 days, then thirty days.', show: 'q' },
        { say: 'Month one: 1,200, times 0.1999, divided by 365, times 31, is about twenty dollars 37.', show: 'm.0', focus: 'm.0' },
        { say: 'So after the first month, he owes 1,220 dollars 37.', show: 'm.1', focus: 'm.1' },
        { say: 'Month two charges interest on that bigger balance: 1,220.37, times 0.1999, divided by 365, times thirty, is about twenty dollars 5 cents.', show: 'm.2', focus: 'm.2' },
        { say: 'Now he owes 1,240 dollars 42. Waiting two months cost him 20.37 plus 20.05: forty dollars 42.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Choosing a card',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'An average balance of \\$1,500 for a year.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{no fee, } 19.99\\%: \\ 1{,}500 \\times 0.1999 = 299.85', '\\text{\\$49 fee, } 12.99\\%: \\ 1{,}500 \\times 0.1299 + 49 = 243.85'] },
      ],
      lines: [
        { say: 'If you often carry a balance, a low-rate card with an annual fee can be cheaper. Suppose you carry an average balance of 1,500 dollars for a year.', show: 'q' },
        { say: 'In this example, a card at 19.99 percent with no fee costs about 1,500 times 0.1999: 299 dollars 85 in a year.', show: 'm.0', focus: 'm.0' },
        { say: 'A card at 12.99 percent with a 49-dollar annual fee costs about 1,500 times 0.1299, plus 49: 243 dollars 85. So the card with the fee is about 56 dollars cheaper.', show: 'm.1', focus: 'm.1' },
        { say: 'But someone who pays the whole balance every month pays no interest at all, so for them, the no-fee card is cheaper.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You expect to carry an average balance of \\$1,000 for a year. Card A charges $21.99\\%$ with no fee. Card B charges $11.99\\%$ with a \\$79 annual fee. Which costs less, and by how much?',
          choices: ['Card B, by \\$21.00', 'Card A, by \\$21.00', 'Card B, by \\$100.00', 'Card A, by \\$79.00'],
          answer: 0,
          working: 'Card A: $1{,}000 \\times 0.2199 = 219.90$. Card B: $1{,}000 \\times 0.1199 + 79 = 198.90$. Card B costs \\$21.00 less. C forgets the fee.',
        },
      ],
      lines: [
        { say: 'Your turn. You expect to carry an average balance of 1,000 dollars for a year. Card "A" charges 21.99 percent with no fee. Card B charges 11.99 percent, with a 79-dollar annual fee. Which costs less, and by how much? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Card "A" costs 219 dollars 90 in interest. Card B costs 119 dollars 90 in interest, plus the 79-dollar fee: 198 dollars 90. So Card B costs 21 dollars less. Choice C forgets the fee.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A carried balance pays interest on interest.', 'Find each month’s interest on the new balance.', 'Compare cards by total yearly cost: interest plus fees.'] }],
      lines: [
        { say: 'Let’s sum up. A balance that is carried pays interest on interest.', show: 'sum.0' },
        { say: 'Work month by month, finding each month’s interest on the new balance.', show: 'sum.1' },
        { say: 'And compare cards by their total yearly cost: the interest plus any fees. In part four, we work out what a loan really costs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
