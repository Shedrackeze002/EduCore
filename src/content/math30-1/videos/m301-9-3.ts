import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-9-3',
  lessonId: 'm301-9-3',
  title: 'Combinations, Part 1: When Order Does Not Matter',
  thumbnailTitle: 'Combinations',
  summary: 'Why choosing 2 of the letters A, B, C and D gives 4P2 ÷ 2! = 6 selections, the combination formula nCr = nPr/r! = n!/((n − r)! r!), choosing 3 of 10 lab activities (120 ways), why nCr = nC(n − r), and how to tell whether order matters. Part 2 counts card hands.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.3 · Part 1', title: 'Combinations', subtitle: 'When order does not matter' }],
      lines: [
        { say: 'A committee, a hand of cards, and a set of pizza toppings have one thing in common: the order in which the items are chosen does not matter.', show: 'title' },
        { say: 'In this video, you will learn the combination formula, n C r, see how it comes from permutations, and decide whether order matters in a problem.' },
      ],
    },
    {
      chapter: 'Pairs from four letters',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Selection', 'Orders'], rows: [['A, B', 'AB, BA'], ['A, C', 'AC, CA'], ['A, D', 'AD, DA'], ['B, C', 'BC, CB'], ['B, D', 'BD, DB'], ['C, D', 'CD, DC']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['{}_{4}P_{2} = 4 \\times 3 = 12', '\\text{each pair: } 2! = 2 \\text{ orders}', '12 \\div 2 = 6 \\text{ selections}'] }],
      lines: [
        { say: 'List the ways to choose two of the four letters A, B, C and D.' },
        { say: 'As permutations, where order matters, there are four P two, or twelve: A B, B A, A C, C A, and so on.', show: ['t', 'm.0'], focus: 'm.0' },
        { say: 'But as a selection, A B and B A are the same pair. Each pair appears two factorial, or two, times.', show: 'm.1', focus: ['m.1', 't.0'] },
        { say: 'So there are twelve divided by two, which is six selections: one for each row of the table.', show: 'm.2', focus: ['m.2', 't'] },
      ],
    },
    {
      chapter: 'The combination formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Combination', md: 'A **combination** is a selection of objects in which order does not matter. The number of combinations of $n$ different objects taken $r$ at a time is written ${}_{n}C_{r}$ or $\\dbinom{n}{r}$, where $0 \\le r \\le n$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{n}C_{r} = \\dfrac{{}_{n}P_{r}}{r!} = \\dfrac{n!}{(n - r)!\\,r!}'] },
      ],
      lines: [
        { say: 'In general, each selection of r objects can be arranged in r factorial orders. So dividing n P r by r factorial counts the selections.' },
        { say: 'A combination is a selection of objects in which order does not matter. The number of combinations of n different objects taken r at a time is written n C r, and read n choose r. It is also written as n over r, in tall brackets, with no fraction bar.', show: 'def' },
        { say: 'n choose r equals n P r over r factorial, which is n factorial over n minus r, factorial, times r factorial.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Choosing lab activities',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A physics teacher will choose 3 of 10 lab activities for a unit. How many selections are possible?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{10}C_{3} = \\dfrac{10!}{7!\\,3!}', '= \\dfrac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = \\dfrac{720}{6}', '= 120'] },
      ],
      lines: [
        { say: 'A physics teacher will choose three of ten lab activities for a unit. How many selections are possible?', show: 'p' },
        { say: 'Only the group of activities matters, not the order they are chosen in, so use ten choose three. That is ten factorial over seven factorial, times three factorial.', show: 'm.0', focus: 'm.0' },
        { say: 'Cancel seven factorial from the top and bottom. That leaves ten times nine times eight, over three times two times one: 720 over six.', show: 'm.1', focus: 'm.1' },
        { say: 'So there are 120 selections.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Choosing is leaving out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Choosing is leaving out', md: 'Every choice of 5 people to go on a trip is also a choice of the 7 who stay home, so ${}_{12}C_{5} = {}_{12}C_{7} = 792$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{n}C_{r} = {}_{n}C_{n - r}'] },
      ],
      lines: [
        { say: 'Here is a useful shortcut. Twelve people want to go on a trip, but only five can go. Every choice of the five people who go is also a choice of the seven who stay home.', show: 'tip' },
        { say: 'So twelve choose five equals twelve choose seven. Both are 792. In general, n choose r equals n choose n minus r: choosing what to take is the same as choosing what to leave.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Does order matter?', md: 'Ask: if I swap two of the chosen items, do I get something new? If yes, order matters: use ${}_{n}P_{r}$. If no, use ${}_{n}C_{r}$.' },
        { kind: 'table', id: 't', head: ['Choose 3 of 10 people', 'Order', 'Count'], rows: [['Three officers with different jobs', 'matters', '${}_{10}P_{3} = 720$'], ['A committee of three', 'does not matter', '${}_{10}C_{3} = 120$']] },
      ],
      lines: [
        { say: 'The most common mistake is using a permutation when order does not matter, or a combination when it does. Ask yourself: if I swap two of the chosen items, do I get something new?', show: 'oops' },
        { say: 'Choosing a president, a vice-president and a treasurer from ten people: swapping two people changes who does which job, so order matters. Ten P three is 720.', show: 't.0', focus: 't.0' },
        { say: 'Choosing a committee of three from ten people: swapping two people gives the same committee, so order does not matter. Ten choose three is 120, which is 720 divided by three factorial.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pizza place offers 8 toppings. How many different pizzas with exactly 3 different toppings can be made?',
          choices: ['$336$', '$24$', '$56$', '$512$'],
          answer: 2,
          working: 'The order of the toppings does not matter: ${}_{8}C_{3} = \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = \\dfrac{336}{6} = 56$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pizza place offers eight toppings. How many different pizzas with exactly three different toppings can be made? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, fifty-six. The order of the toppings does not matter, so use eight choose three: eight times seven times six, over three times two times one, is 336 over six, which is fifty-six. Choice A, 336, is eight P three, which counts each pizza six times.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In a combination, order does not matter.', '${}_{n}C_{r} = \\dfrac{{}_{n}P_{r}}{r!} = \\dfrac{n!}{(n - r)!\\,r!}$', '${}_{n}C_{r} = {}_{n}C_{n - r}$: choosing what to take is choosing what to leave.'] }],
      lines: [
        { say: 'Let’s sum up. In a combination, order does not matter.', show: 'sum.0' },
        { say: 'n choose r is n P r over r factorial, which is n factorial over n minus r, factorial, times r factorial.', show: 'sum.1' },
        { say: 'And n choose r equals n choose n minus r. In part two, we count hands of cards, choose from two groups at once, and solve an equation with combinations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
