import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-2-3-b',
  lessonId: 'm103-2-3',
  title: 'Comparing Pay and Contracts, Part 2: Working on Contract',
  thumbnailTitle: 'Contracts and Bids',
  summary: 'Self-employed work on contract: income as the contract amount minus expenses, the hourly equivalent, and bidding on a job as hourly rate times hours plus expenses.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 2.3 · Part 2', title: 'Working on Contract', subtitle: 'Expenses, profit and bids' }],
      lines: [
        { say: 'Many tradespeople are self-employed. Instead of a wage, they agree on a price for a whole job, and pay for the materials themselves.', show: 'title' },
        { say: 'In this video, you will find the income from a contract, and work out a fair bid.' },
      ],
    },
    {
      chapter: 'Contracts',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Contract, expenses and profit', md: 'A **contract** is an agreement to do a job for a set amount. **Expenses** are the costs of doing it. The **profit**, or income, is the contract amount minus the expenses.' },
      ],
      lines: [
        { say: 'A contract is an agreement to do a job for a set amount of money. A self-employed worker runs their own business.', show: 'def' },
        { say: 'Expenses are the costs of doing the job, like materials, fuel and rentals. The profit, or income, is the contract amount minus the expenses.' },
      ],
    },
    {
      chapter: 'A painting contract',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Harpreet agrees to paint a house for \\$3,600. Supplies cost \\$742.35, a sprayer rental \\$185.00 and fuel \\$64.90. The job takes 52 hours.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\$742.35 + \\$185.00 + \\$64.90 = \\$992.25', '\\$3{,}600 - \\$992.25 = \\$2{,}607.75', '\\$2{,}607.75 \\div 52 \\approx \\$50.15 \\text{ per hour}'] },
        { kind: 'callout', id: 'note', tone: 'key', title: 'No boss, no benefits', md: 'No employer pays for vacation, benefits or tools, so a contractor’s hourly equivalent needs to be higher than a typical wage.' },
      ],
      lines: [
        { say: 'Harpreet, a self-employed painter, agrees to paint the inside of a house for 3,600 dollars. Paint and supplies cost 742.35, a rented sprayer 185 dollars, and fuel 64.90. The job takes 52 hours.', show: 'q' },
        { say: 'The total expenses are 992 dollars 25.', show: 'm.0', focus: 'm.0' },
        { say: 'So the income is 3,600 minus 992.25: 2,607 dollars 75.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by the 52 hours: about fifty dollars fifteen an hour. That is the hourly equivalent.', show: 'm.2', focus: 'm.2' },
        { say: 'A self-employed worker has no employer paying for vacation, benefits or tools. That is why a contractor’s hourly equivalent needs to be higher than a typical wage.', show: 'note' },
      ],
    },
    {
      chapter: 'Bidding on a job',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', lines: ['\\text{bid} = \\text{hourly rate} \\times \\text{hours} + \\text{expenses}'] },
        { kind: 'math', id: 'm', lines: ['\\$55 \\times 18 = \\$990', '\\$990 + \\$640.50 = \\$1{,}630.50'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the expenses', md: 'A bid of only \\$990 leaves $990 - 640.50 = 349.50$ dollars for 18 hours: about \\$19.42 per hour.' },
      ],
      lines: [
        { say: 'Before a job starts, a contractor offers a price, called a bid. A good bid covers the expenses, and pays a fair rate for every hour: the hourly rate times the hours, plus the expenses.', show: 'f.0' },
        { say: 'Kwame is a welder who wants to earn 55 dollars an hour. A ranch gate will take eighteen hours: 55 times eighteen is 990 dollars for the work.', show: 'm.0', focus: 'm.0' },
        { say: 'Steel and supplies cost 640.50, so Kwame should bid 990 plus 640.50: 1,630 dollars fifty.', show: 'm.1', focus: 'm.1' },
        { say: 'If Kwame forgot the expenses and bid only 990 dollars, the materials would come out of the pay, leaving about nineteen dollars an hour.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A carpenter wants \\$48 per hour. A deck will take 30 hours and the lumber costs \\$1,250. What should the bid be?',
          choices: ['\\$2,690', '\\$1,440', '\\$1,250', '\\$190'],
          answer: 0,
          working: '$48 \\times 30 = 1440$, and $1440 + 1250 = 2690$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A carpenter wants 48 dollars an hour. A deck will take thirty hours, and the lumber costs 1,250 dollars. What should the bid be? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 48 times thirty is 1,440 dollars for the work. Add the lumber: 1,440 plus 1,250 is 2,690 dollars. B forgets the lumber.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Income (profit) = contract amount − expenses.', 'Hourly equivalent = income ÷ hours worked.', 'Bid = hourly rate × hours + expenses.'] }],
      lines: [
        { say: 'Let’s sum up. Contract income, or profit, is the contract amount minus the expenses.', show: 'sum.0' },
        { say: 'The hourly equivalent is the income divided by the hours worked.', show: 'sum.1' },
        { say: 'And a fair bid is the hourly rate times the hours, plus the expenses. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
