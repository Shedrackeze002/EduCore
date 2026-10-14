import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-4-c',
  lessonId: 'm204-4-4',
  title: 'Cars and Homes, Part 3: Renting a Home',
  thumbnailTitle: 'Renting a Home',
  thumbnail: 'm',
  summary: 'Rent, utilities, a damage deposit and tenant insurance, splitting the monthly costs with a roommate (1,287 dollars shared is 643.50 dollars each), and the move-in costs of first month’s rent plus a deposit (2,200 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.4 · Part 3', title: 'Renting a Home', subtitle: 'Rent and everything else' }],
      lines: [
        { say: 'Your first place is exciting. But like a car, it costs more than the number in the ad.', show: 'title' },
        { say: 'In this video, you will find the monthly cost of renting, share it with a roommate, and find the money you need to move in.' },
      ],
    },
    {
      chapter: 'Rent and other costs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'r', tone: 'definition', title: 'Rent and utilities', md: '**Rent** is what you pay each month to live in a home you do not own. **Utilities** are services like power, heat and water. Sometimes they are included in the rent, and sometimes you pay them yourself.' },
        { kind: 'callout', id: 'd', tone: 'definition', title: 'Damage deposit', md: 'A **damage deposit** is money you pay the landlord when you move in. You get it back when you move out, as long as there is no damage.' },
      ],
      lines: [
        { say: 'Rent is what you pay each month to live in a home you do not own. Utilities are services like power, heat and water. Sometimes they are included in the rent, and sometimes you pay them yourself, so always ask.', show: 'r' },
        { say: 'A damage deposit is money you pay the landlord when you move in. You get it back when you move out, as long as there is no damage. A deposit is often about one month’s rent.', show: 'd' },
        { say: 'You will also want tenant insurance. It covers your things if they are stolen or damaged.' },
      ],
    },
    {
      chapter: 'Sharing a place',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Leila and a roommate share a basement suite. Rent is \\$1,100, utilities are \\$165 and tenant insurance is \\$22 a month.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1{,}100 + 165 + 22 = 1{,}287', '1{,}287 \\div 2 = 643.50'] },
      ],
      lines: [
        { say: 'Leila and a roommate rent a basement suite. Rent is 1,100 dollars, utilities are 165 dollars, and tenant insurance is 22 dollars a month. They split the costs equally. What does each person pay?', show: 'q' },
        { say: 'First, the total: 1,100 plus 165 plus 22 is 1,287 dollars a month.', show: 'm.0', focus: 'm.0' },
        { say: 'Split two ways: 1,287 divided by two is 643 dollars fifty each.', show: 'm.1', focus: 'm.1' },
        { say: 'Sharing a place is one of the biggest ways to save. Living alone in the same suite, Leila would pay the whole 1,287 dollars.' },
      ],
    },
    {
      chapter: 'Move-in costs',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'To move in, they pay the first month’s rent and a damage deposit equal to one month’s rent.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1{,}100 + 1{,}100 = 2{,}200'] },
      ],
      lines: [
        { say: 'To move in, they must pay the first month’s rent, and a damage deposit equal to one month’s rent. How much is that?', show: 'q' },
        { say: '1,100 plus 1,100 is 2,200 dollars. They need that much before they get the keys, so start saving early.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Three roommates share an apartment. Rent is \\$1,350, utilities are \\$180 and internet is \\$60 a month. They split the costs equally. What does each person pay?',
          choices: ['\\$530', '\\$1,590', '\\$795', '\\$450'],
          answer: 0,
          working: 'Total: $1{,}350 + 180 + 60 = 1{,}590$. Each: $1{,}590 \\div 3 = 530$. B is the total, C splits it two ways, and D shares only the rent.',
        },
      ],
      lines: [
        { say: 'Your turn. Three roommates share an apartment. Rent is 1,350 dollars, utilities are 180 dollars, and internet is sixty dollars a month. They split the costs equally. What does each person pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The total is 1,590 dollars, and divided by three, that is 530 dollars each. B is the total, C splits it two ways, and D shares only the rent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Housing costs rent plus utilities and tenant insurance.', 'Roommates split the total.', 'Move-in costs: first month’s rent plus the damage deposit.'] }],
      lines: [
        { say: 'Let’s sum up. Housing costs rent, plus utilities and tenant insurance.', show: 'sum.0' },
        { say: 'Roommates split the total cost.', show: 'sum.1' },
        { say: 'And to move in, you need the first month’s rent plus the damage deposit. In part four, we find how much rent you can afford. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
