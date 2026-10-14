import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-3-c',
  lessonId: 'm204-1-3',
  title: 'Ratios, Rates and Proportions, Part 3: Proportions',
  thumbnailTitle: 'Proportions',
  thumbnail: 't',
  summary: 'What a proportion is, mixing frozen juice 1 : 3 (12 cans of water for 4 of concentrate), two-stroke fuel at 50 : 1 (80 mL of oil for 4 L of gas), scaling a stew from 6 to 10 people (750 g of beef), and why proportions grow by multiplying.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.3 · Part 3', title: 'Proportions', subtitle: 'Scaling a mix up or down' }],
      lines: [
        { say: 'Make a bigger batch of juice, fuel for a bigger tank, or a stew for more people: the mix has to stay the same.', show: 'title' },
        { say: 'In this video, you will use proportions to scale a mix or a recipe.' },
      ],
    },
    {
      chapter: 'Proportions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proportion', md: 'Says two ratios are **equal**, such as $1 : 3 = 4 : 12$. Whatever you multiply one term by, you multiply the other term by too.' },
        { kind: 'table', id: 't', head: ['Cans of concentrate', '$1$', '$2$', '$3$', '$4$'], rows: [['Cans of water', '$3$', '$6$', '$9$', '$12$']] },
      ],
      lines: [
        { say: 'A proportion says two ratios are equal, such as one to three, and four to twelve. Whatever you multiply one term by, you multiply the other term by too.', show: 'def' },
        { say: 'Frozen juice is mixed one to three: one can of concentrate to three cans of water. Two cans of concentrate need six cans of water, and three need nine.', show: 't' },
      ],
    },
    {
      chapter: 'Juice for a team',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['1 \\to 4\\text{: } \\times 4', '3 \\times 4 = 12 \\text{ cans of water}'] }],
      lines: [
        { say: 'How many cans of water go with four cans of concentrate? The concentrate goes from one to four: that is times four.', show: 'm.0', focus: 'm.0' },
        { say: 'So the water is multiplied by four too: three times four is twelve cans of water. The mix stays one to three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two-stroke fuel',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Gas and oil mixed $50 : 1$. How much oil for $4$ L of gas?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['4 \\text{ L} = 4000 \\text{ mL}', '4000 \\div 50 = 80 \\text{ mL of oil}'] },
      ],
      lines: [
        { say: 'A chainsaw uses gas and oil mixed fifty to one. How much oil goes with four litres of gas?', show: 'q' },
        { say: 'Oil is measured in millilitres, so change the gas to millilitres first: four litres is 4,000 millilitres.', show: 'm.0', focus: 'm.0' },
        { say: 'The oil is one fiftieth of the gas: 4,000 divided by fifty is eighty. Mix in eighty millilitres of oil.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Scaling a recipe',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$450$ g of beef for $6$ people. How much for $10$ people?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['450 \\div 6 = 75 \\text{ g for } 1 \\text{ person}', '75 \\times 10 = 750 \\text{ g}'] },
      ],
      lines: [
        { say: 'A stew for six people uses 450 grams of beef. How much beef is needed for ten people?', show: 'q' },
        { say: 'Six does not multiply neatly to ten, so find the amount for one person first: 450 divided by six is 75 grams.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply by ten: 75 times ten is 750 grams of beef.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Adding instead of multiplying',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding instead of multiplying', md: 'Going from $6$ to $10$ people is **not** “add $4$ grams”. A proportion grows by multiplying. Find the amount for one, then multiply.' }],
      lines: [
        { say: 'A common mistake is to add. Going from six people to ten is not “add four grams”, or even “add four people’s worth” by guessing. A proportion grows by multiplying. Find the amount for one, then multiply.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A recipe uses $3$ cups of flour for $24$ cookies. How much flour is needed for $40$ cookies?',
          choices: ['$5$ cups', '$19$ cups', '$15$ cups', '$8$ cups'],
          answer: 0,
          working: 'For one cookie: $3 \\div 24 = \\tfrac18$ cup. For $40$: $40 \\times \\tfrac18 = 5$ cups. B adds $16$ instead of multiplying.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe uses three cups of flour for 24 cookies. How much flour is needed for forty cookies? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. For one cookie, it is three divided by 24, one eighth of a cup. For forty cookies, forty times one eighth is five cups. B adds sixteen instead of multiplying.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A proportion says two ratios are equal.', 'Multiply both terms by the same number.', 'If it does not scale neatly, find the amount for one first.'] }],
      lines: [
        { say: 'Let’s sum up. A proportion says two ratios are equal.', show: 'sum.0' },
        { say: 'To scale a mix, multiply both terms by the same number. Change units first if they do not match.', show: 'sum.1' },
        { say: 'And if it does not scale neatly, find the amount for one first, then multiply. In part four, we share a total in a ratio. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
