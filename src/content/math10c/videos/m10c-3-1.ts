import type { Explainer } from '@/video/script.ts';
import { factorTree, tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-3-1',
  lessonId: 'm10c-3-1',
  title: 'Prime Factors, GCF and LCM, Part 1: Prime Factorization',
  thumbnailTitle: 'Prime Factorization',
  thumbnail: 'trees',
  summary: 'Prime and composite numbers, why 1 is not prime, and two ways to write a number as a product of primes: repeated division and a factor tree. Part 2 uses prime factors to find the GCF and LCM.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.1 · Part 1', title: 'Prime Factorization', subtitle: 'The building blocks of whole numbers' }],
      lines: [
        { say: 'Every molecule is built from atoms. In the same way, every whole number greater than one is built from prime numbers.', show: 'title' },
        { say: 'In this video, you will learn what primes are, and how to break any number into its prime factors. In part two, we use them to find the greatest common factor and the least common multiple.' },
      ],
    },
    {
      chapter: 'Prime and composite numbers',
      layout: 'split',
      left: [
        figure('rect', [
          tiles({ name: 'seven', cols: 7, rows: 1, at: [0, 5], labels: { width: '7', height: '1' } }),
          tiles({ name: 'twelve', cols: 4, rows: 3, labels: { width: '4', height: '3' } }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'prime', tone: 'definition', title: 'Prime number', md: 'A whole number greater than 1 with exactly **two** factors: 1 and itself.' },
        { kind: 'callout', id: 'composite', tone: 'definition', title: 'Composite number', md: 'A whole number greater than 1 that is not prime.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2,\\ 3,\\ 5,\\ 7,\\ 11,\\ 13,\\ 17, \\ldots'] },
      ],
      lines: [
        { say: 'A prime number is a whole number greater than one with exactly two factors: one and itself.', show: 'prime' },
        { say: 'Try to arrange seven squares into a rectangle. The only way is a single row, one by seven, because the only factors of seven are one and seven.', show: ['rect.seven-outline', 'rect.seven-grid', 'rect.seven-width', 'rect.seven-height'] },
        { say: 'Twelve squares can also make a three by four rectangle, so twelve has other factors. A whole number greater than one that is not prime is called composite.', show: ['rect.twelve-outline', 'rect.twelve-grid', 'rect.twelve-width', 'rect.twelve-height', 'composite'] },
        { say: 'The first primes are 2, 3, 5, 7, 11 and 13. Two is the only even prime.', show: 'm.0', focus: 'm.0' },
        { say: 'And one is not prime at all, because it has only one factor, itself.' },
      ],
    },
    {
      chapter: 'Repeated division',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'math', id: 'd', size: 'md', lines: ['360 \\div 2 = 180', '180 \\div 2 = 90', '90 \\div 2 = 45', '45 \\div 3 = 15', '15 \\div 3 = 5', '5 \\div 5 = 1'] }],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['360 = 2 \\times 2 \\times 2 \\times 3 \\times 3 \\times 5', '= 2^3 \\times 3^2 \\times 5'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Divisibility shortcuts', md: 'By 2: the last digit is even. By 3: the digit sum is divisible by 3. By 5: the last digit is 0 or 5.' },
      ],
      lines: [
        { say: 'Writing a number as a product of primes is called its prime factorization. Here is the first method, repeated division. Find the prime factorization of 360.' },
        { say: 'Divide by the smallest prime that works, and keep going. 360 is even, so divide by two: 180. Then 90, then 45.', show: ['d.0', 'd.1', 'd.2'], focus: ['d.0', 'd.1', 'd.2'] },
        { say: '45 is odd, but its digits add to nine, so it divides by three: fifteen. Fifteen divided by three is five, and five divided by five is one.', show: ['d.3', 'd.4', 'd.5', 'tip'], focus: ['d.3', 'd.4', 'd.5'] },
        { say: 'The primes we divided by are the prime factors: three twos, two threes and a five.', show: 'm.0', focus: 'm.0' },
        { say: 'With exponents, 360 equals 2 cubed times 3 squared times 5.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A factor tree',
      layout: 'center',
      main: [
        figure(
          'trees',
          [
            factorTree({ name: 'a', tree: [360, [36, [6, 2, 3], [6, 2, 3]], [10, 2, 5]] }),
            factorTree({ name: 'b', tree: [360, [8, 2, [4, 2, 2]], [45, 5, [9, 3, 3]]], at: [11, 0] }),
          ],
          380,
        ),
        { kind: 'math', id: 'm', lines: ['360 = 2^3 \\times 3^2 \\times 5'] },
      ],
      lines: [
        { say: 'The second method is a factor tree. Split 360 into any two factors, such as 36 times 10.', show: ['trees.a-level0', 'trees.a-level1'] },
        { say: 'Keep splitting. 36 is six times six, and ten is two times five. Two and five are prime, so circle them.', show: ['trees.a-level2', 'trees.a-ring10', 'trees.a-ring11'], focus: ['trees.a-ring10', 'trees.a-ring11'] },
        { say: 'Each six is two times three. Now every branch ends in a prime.', show: ['trees.a-level3', 'trees.a-primes'] },
        { say: 'Collect the circled primes: three twos, two threes and a five. That is 2 cubed times 3 squared times 5, as before.', show: 'm.0', focus: ['m.0', 'trees.a-primes'] },
        { say: 'Start with a different pair, such as eight times 45, and the tree looks different, but it ends with exactly the same primes.', show: ['trees.b-level0', 'trees.b-level1', 'trees.b-level2', 'trees.b-level3', 'trees.b-primes'], focus: 'trees.b-primes' },
        { say: 'This is always true. Every whole number greater than one has exactly one prime factorization.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the prime factorization of $84$?',
          choices: ['$2^2 \\times 3 \\times 7$', '$2 \\times 42$', '$4 \\times 21$', '$2^2 \\times 21$'],
          answer: 0,
          working: '$84 = 2 \\times 42 = 2 \\times 2 \\times 21 = 2^2 \\times 3 \\times 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the prime factorization of 84? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 84 is two times 42, 42 is two times 21, and 21 is three times seven. The other choices still have composite factors, like 42, four or 21.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'A prime has exactly two factors, 1 and itself. 1 is not prime.',
            'Find a prime factorization by repeated division or with a factor tree.',
            'Every whole number greater than 1 has exactly one prime factorization.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. A prime number has exactly two factors, one and itself, so one is not prime.", show: 'sum.0' },
        { say: 'To find a prime factorization, divide by primes again and again, or split the number in a factor tree.', show: 'sum.1' },
        { say: 'Either way, every whole number greater than one has exactly one prime factorization. In part two, we use it to find the GCF and LCM. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
