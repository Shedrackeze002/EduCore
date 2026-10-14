import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-1-4',
  lessonId: 'm103-1-4',
  title: 'Currency Exchange, Part 1: Exchange Rates',
  thumbnailTitle: 'Currency Exchange',
  summary: 'What an exchange rate means, multiplying when the rate starts with one unit of the currency you have and dividing when it does not, and checking that the size of the answer makes sense. Part 2 covers buy and sell rates and commissions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 1.4 · Part 1', title: 'Exchange Rates', subtitle: 'Changing one currency into another' }],
      lines: [
        { say: 'A hockey team drives to a tournament in Montana. A cook sends money to family in the Philippines. A mechanic orders a part from the United States.', show: 'title' },
        { say: 'Each of them changes Canadian dollars into another currency, or back again. In this video, you will convert with an exchange rate. In part two, you will meet the rates that banks use.' },
      ],
    },
    {
      chapter: 'Exchange rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Exchange rate', md: 'The value of one unit of a currency in another currency, for example $1$ US dollar $= 1.36$ CAD. Rates change every day, so a question always gives the rate to use.' },
        { kind: 'math', id: 'm', lines: ['1 \\text{ euro} = 1.52 \\text{ CAD}', '1 \\text{ CAD} = 13.85 \\text{ pesos}'] },
      ],
      lines: [
        { say: 'Every country has its own money, or currency. An exchange rate tells you how much one unit of a currency is worth in another. For example, one US dollar might equal 1.36 Canadian dollars.', show: 'def' },
        { say: 'Exchange rates change every day, so a question will always give you the rate to use.' },
        { say: 'A rate can be written either way round: one euro equals 1.52 Canadian dollars, or one Canadian dollar equals 13.85 Mexican pesos. Read which currency has the one.', show: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Multiply',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A part costs US\\$85. Suppose $1$ US dollar $= 1.36$ CAD. What is the cost in Canadian dollars?', size: 'md' },
        { kind: 'math', id: 'm', lines: ['85 \\times 1.36 = 115.60', '\\$115.60 \\text{ CAD}'] },
      ],
      lines: [
        { say: 'A part costs 85 US dollars. Suppose one US dollar equals 1.36 Canadian dollars. What is the cost in Canadian dollars?', show: 'q' },
        { say: 'The rate starts with one US dollar, the currency you have. Each US dollar is worth 1.36 Canadian dollars, so multiply: 85 times 1.36 is 115.60.', show: 'm.0', focus: 'm.0' },
        { say: 'The part costs 115 dollars sixty, Canadian.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Divide',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['1 \\text{ euro} = 1.52 \\text{ CAD}\\text{: } \\quad 500 \\div 1.52 \\approx 328.95 \\text{ euros}', '1 \\text{ CAD} = 13.85 \\text{ pesos}\\text{: } \\quad 2400 \\div 13.85 \\approx \\$173.29 \\text{ CAD}'] },
      ],
      lines: [
        { say: 'When you start with the currency that is not the one in the rate, divide instead. Mei has 500 Canadian dollars to spend in France, and one euro equals 1.52 Canadian dollars.', show: 'm.0' },
        { say: 'Each euro costs 1.52 dollars, so divide: 500 divided by 1.52 is about 328 euros and 95 cents.', focus: 'm.0' },
        { say: 'A hotel room in Mexico costs 2,400 pesos, and one Canadian dollar buys 13.85 pesos. Divide the pesos by 13.85: about 173 dollars and 29 cents.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the size', md: 'A euro is worth **more** than a dollar, so you get **fewer** euros than dollars. A peso is worth much **less**, so a price in pesos is a much **bigger** number.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying when you should divide', md: '$500 \\times 1.52 = 760$ euros cannot be right: more euros than dollars, when each euro costs more than a dollar.' },
      ],
      lines: [
        { say: 'Check that your answer makes sense. A euro is worth more than a Canadian dollar, so you get fewer euros than dollars. A peso is worth much less, so a price in pesos is a much bigger number.', show: 'tip' },
        { say: 'If you had multiplied, 500 times 1.52 would give 760 euros: more euros than dollars, when each euro costs more than a dollar. That cannot be right.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Suppose $1$ US dollar $= 1.35$ CAD. How many US dollars do you get for \\$270 CAD?',
          choices: ['US\\$200', 'US\\$364.50', 'US\\$270', 'US\\$135'],
          answer: 0,
          working: 'The rate starts with US dollars, but you have CAD, so divide: $270 \\div 1.35 = 200$.',
        },
      ],
      lines: [
        { say: 'Your turn. Suppose one US dollar equals 1.35 Canadian dollars. How many US dollars do you get for 270 Canadian dollars? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. You have Canadian dollars, but the rate starts with one US dollar, so divide: 270 divided by 1.35 is 200. A US dollar is worth more, so you get fewer of them. B multiplies.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A question always gives the exchange rate to use.', 'If the rate starts with one of the currency you have, multiply. If not, divide.', 'Check that the size of the answer makes sense.'] }],
      lines: [
        { say: 'Let’s sum up. A question always gives you the exchange rate to use.', show: 'sum.0' },
        { say: 'If the rate starts with one unit of the currency you have, multiply. If not, divide.', show: 'sum.1' },
        { say: 'And check that the size of your answer makes sense. In part two, we use the buy and sell rates at a bank. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
