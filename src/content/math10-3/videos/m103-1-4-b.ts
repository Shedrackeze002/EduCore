import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-1-4-b',
  lessonId: 'm103-1-4',
  title: 'Currency Exchange, Part 2: Buy Rates, Sell Rates and Fees',
  thumbnailTitle: 'Buy and Sell Rates',
  summary: 'The bank’s buy and sell rates and which one to use, the loss on a round trip, and adding a commission to the cost of exchanging money.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 1.4 · Part 2', title: 'Buy Rates, Sell Rates and Fees', subtitle: 'How banks make money on exchange' }],
      lines: [
        { say: 'Banks and exchange booths do not use just one rate. They post two, and they may charge a fee as well.', show: 'title' },
        { say: 'In this video, you will choose the right rate, and find the real cost of exchanging money.' },
      ],
    },
    {
      chapter: 'Two rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Buy rate and sell rate', md: 'Both are written from the **bank’s** point of view. The **buy rate** is what the bank pays you for foreign money. The **sell rate** is what it charges you. The sell rate is always higher.' },
        {
          kind: 'table',
          id: 't',
          head: ['Currency', 'Bank buys (CAD)', 'Bank sells (CAD)'],
          rows: [
            ['US dollar', '1.3125', '1.3975'],
            ['euro', '1.4870', '1.5810'],
          ],
        },
      ],
      lines: [
        { say: 'Both rates are written from the bank’s point of view. The buy rate is what the bank pays you, in Canadian dollars, for one unit of foreign money that you sell to it.', show: 'def' },
        { say: 'The sell rate is what the bank charges you for one unit that you buy from it. The sell rate is always higher.', show: 't' },
      ],
    },
    {
      chapter: 'Which rate?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{Kai buys US\\$400: } 400 \\times 1.3975 = \\$559.00', '\\text{Kai sells US\\$65: } 65 \\times 1.3125 \\approx \\$85.31'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'What is the bank doing?', md: 'If you buy, the bank sells: the higher rate. If you sell, the bank buys: the lower rate.' },
      ],
      lines: [
        { say: 'Kai buys 400 US dollars before a trip to Montana. Kai is buying, so the bank is selling: use the bank’s sell rate, 1.3975. 400 times 1.3975 is 559 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Kai comes home with 65 US dollars and sells them back. Now the bank is buying, so use the buy rate, 1.3125. Kai gets about 85 dollars and 31 cents.', show: 'm.1', focus: 'm.1' },
        { say: 'Always ask: what is the bank doing? Either way, the bank comes out ahead. That difference is how it makes money.', show: 'oops' },
      ],
    },
    {
      chapter: 'A round trip',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{buy: } 300 \\times 1.5810 = \\$474.30', '\\text{sell back: } 300 \\times 1.4870 = \\$446.10', '\\text{loss: } \\$474.30 - \\$446.10 = \\$28.20'] },
      ],
      lines: [
        { say: 'Changing money and then changing it back always costs you something. Hana buys 300 euros for a trip, then the trip is cancelled, and she sells all 300 back.', show: 'm.0' },
        { say: 'Buying them cost 300 times 1.5810: 474 dollars thirty.', focus: 'm.0' },
        { say: 'Selling them back gives 300 times 1.4870: 446 dollars ten.', show: 'm.1', focus: 'm.1' },
        { say: 'So Hana loses 28 dollars twenty, without spending a single euro.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Commission',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Commission', md: 'A fee charged as a percent of the amount exchanged.' },
        { kind: 'math', id: 'm', lines: ['200 \\times 1.42 = \\$284.00', '0.025 \\times 284 = \\$7.10', '\\$284.00 + \\$7.10 = \\$291.10'] },
      ],
      lines: [
        { say: 'Some exchange booths also charge a commission: a fee that is a percent of the amount exchanged.', show: 'def' },
        { say: 'An airport booth sells US dollars for 1.42 Canadian dollars each, and charges a 2.5 percent commission on the Canadian amount. What do 200 US dollars cost? Before the commission, 200 times 1.42 is 284 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The commission is 0.025 times 284: seven dollars ten. So the total is 291 dollars ten.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Using the table (bank buys euros at $1.4870$ CAD, sells at $1.5810$ CAD), what does it cost to buy €250?',
          choices: ['\\$395.25', '\\$371.75', '\\$158.13', '\\$250.00'],
          answer: 0,
          working: 'You are buying euros, so the bank is selling: $250 \\times 1.5810 = 395.25$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. Using the table, what does it cost to buy 250 euros? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. You are buying euros, so the bank is selling: use the sell rate. 250 times 1.5810 is 395 dollars and 25 cents. B uses the buy rate.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Buying foreign money: use the bank’s sell rate (higher).', 'Selling it back: use the bank’s buy rate (lower).', 'Fees and commissions add to the cost; a round trip always loses money.'] }],
      lines: [
        { say: 'Let’s sum up. When you buy foreign money, use the bank’s sell rate, which is higher.', show: 'sum.0' },
        { say: 'When you sell it back, use the bank’s buy rate, which is lower.', show: 'sum.1' },
        { say: 'And fees and commissions add to the cost, so a round trip always loses money. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
