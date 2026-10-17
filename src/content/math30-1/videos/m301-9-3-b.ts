import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-9-3-b',
  lessonId: 'm301-9-3',
  title: 'Combinations, Part 2: Card Hands and Equations',
  thumbnailTitle: 'Card Hands and Equations',
  summary: 'A standard deck of 52 cards, the 1287 five-card hands of hearts only, selections from two groups (two kings and three queens: 6 × 4 = 24 hands), and solving nC2 = 45 to find that 10 people shook hands. Part 3 counts with exactly, at least and at most.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.3 · Part 2', title: 'Card Hands and Equations', subtitle: 'Choosing from groups, and solving for $n$' }],
      lines: [
        { say: 'Five cards dealt from a deck make a hand. The order the cards arrive in does not matter, so a hand is a combination.', show: 'title' },
        { say: 'In this video, you will count card hands, choose from two groups at once, and solve an equation with combinations.' },
      ],
    },
    {
      chapter: 'A standard deck',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Suit', 'Colour', 'Cards'], rows: [['Hearts', 'red', '13'], ['Diamonds', 'red', '13'], ['Clubs', 'black', '13'], ['Spades', 'black', '13']] },
        { kind: 'text', id: 'x', size: 'md', md: 'Each suit: A, 2 to 10, J, Q, K. The face cards are J, Q and K, so there are **12** face cards.' },
      ],
      lines: [
        { say: 'Many problems use a standard deck of fifty-two cards. It has four suits: hearts and diamonds are red, and clubs and spades are black.', show: 't' },
        { say: 'Each suit has thirteen cards: an ace, the numbers two to ten, a jack, a queen and a king. The jack, queen and king are the face cards, so there are twelve face cards in all.', show: 'x' },
        { say: 'A hand is a combination, because the order the cards are dealt in does not matter.' },
      ],
    },
    {
      chapter: 'Hands from one group',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'How many 5-card hands contain only hearts?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{13}C_{5} = \\dfrac{13 \\times 12 \\times 11 \\times 10 \\times 9}{5 \\times 4 \\times 3 \\times 2 \\times 1}', '= 1287', '\\text{all hands: } {}_{52}C_{5} = 2\\,598\\,960'] },
      ],
      lines: [
        { say: 'How many five-card hands contain only hearts?', show: 'p' },
        { say: 'All five cards come from the thirteen hearts, so use thirteen choose five. That is thirteen times twelve times eleven times ten times nine, over five factorial.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 1,287 hands.', show: 'm.1', focus: 'm.1' },
        { say: 'Compare that with all possible hands: fifty-two choose five is 2,598,960. So only a tiny fraction of hands are all hearts.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Choosing from two groups',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'How many 5-card hands contain exactly two kings and three queens?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{kings: } {}_{4}C_{2} = 6', '\\text{queens: } {}_{4}C_{3} = 4', '6 \\times 4 = 24'] },
      ],
      lines: [
        { say: 'When a selection is made from two groups at once, choose from each group and multiply. How many five-card hands contain exactly two kings and three queens?', show: 'p' },
        { say: 'There are four kings in the deck, and the hand needs two of them: four choose two is six ways.', show: 'm.0', focus: 'm.0' },
        { say: 'There are four queens, and the hand needs three of them: four choose three is four ways.', show: 'm.1', focus: 'm.1' },
        { say: 'A hand is two kings and three queens, so by the counting principle, multiply: six times four is twenty-four hands.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Solving for n',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'At a meeting, everyone shook hands with everyone else exactly once. There were 45 handshakes. How many people were there?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{n}C_{2} = \\dfrac{n!}{(n - 2)!\\,2!} = \\dfrac{n(n - 1)}{2} = 45', 'n(n - 1) = 90 \\quad\\Rightarrow\\quad n^2 - n - 90 = 0', '(n - 10)(n + 9) = 0', 'n = 10 \\qquad (\\text{reject } n = -9)'] },
      ],
      lines: [
        { say: 'Combinations also lead to equations. At a meeting, everyone shook hands with everyone else exactly once. There were forty-five handshakes. How many people were there?', show: 'p' },
        { say: 'A handshake is a pair of people, and order does not matter, so the number of handshakes is n choose two. That is n factorial over n minus two, factorial, times two factorial, which simplifies to n times n minus one, over two.', show: 'm.0', focus: 'm.0' },
        { say: 'Set that equal to forty-five, and multiply both sides by two: n times n minus one equals ninety. So n squared minus n minus ninety equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'That factors as n minus ten, times n plus nine, equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'The number of people must be a natural number, so reject negative nine. There were ten people.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many 5-card hands from a standard 52-card deck contain exactly 3 hearts and 2 spades?',
          choices: ['$364$', '$1287$', '$2\\,598\\,960$', '$22\\,308$'],
          answer: 3,
          working: 'Hearts: ${}_{13}C_{3} = 286$. Spades: ${}_{13}C_{2} = 78$. A hand needs both, so multiply: $286 \\times 78 = 22\\,308$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many five-card hands from a standard fifty-two-card deck contain exactly three hearts and two spades? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 22,308. Choose three of the thirteen hearts: 286 ways. Choose two of the thirteen spades: seventy-eight ways. A hand needs both, so multiply: 286 times seventy-eight is 22,308. Choice A adds the two counts instead of multiplying them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A hand of cards is a combination: the order of dealing does not matter.', 'For selections from two groups, choose from each group and multiply.', 'Equations such as ${}_{n}C_{2} = 45$ become quadratics; keep only the natural-number root.'] }],
      lines: [
        { say: 'Let’s sum up. A hand of cards is a combination, because the order of dealing does not matter.', show: 'sum.0' },
        { say: 'For selections from two groups, choose from each group and multiply.', show: 'sum.1' },
        { say: 'And equations such as n choose two equals forty-five become quadratics. Keep only the natural-number root. In part three, we count selections with conditions such as exactly, at least and at most. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
