import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A circle with points at the given angles (degrees), every pair joined by a chord, and its count of regions below. */
function chords(name: string, angles: number[], cx: number, regions: number): Part {
  const r = 1.5;
  const at = (deg: number): P => [cx + r * Math.cos((deg * Math.PI) / 180), r * Math.sin((deg * Math.PI) / 180)];
  const points: Record<string, P> = { [`${name}-c`]: [cx, -r - 0.2] };
  const ring: string[] = [];
  for (let i = 0; i < 48; i++) {
    points[`${name}-r${i}`] = at(i * 7.5);
    ring.push(`${name}-r${i}`);
  }
  const items: DiagramItem[] = [{ kind: 'curve', id: `${name}-ring`, points: ring, closed: true, tone: 'muted', group: name }];
  angles.forEach((a, i) => (points[`${name}-p${i}`] = at(a)));
  for (let i = 0; i < angles.length; i++) {
    for (let j = i + 1; j < angles.length; j++) items.push({ kind: 'line', id: `${name}-k${i}-${j}`, from: `${name}-p${i}`, to: `${name}-p${j}`, tone: 'adj', weight: 2, group: name });
  }
  angles.forEach((_, i) => items.push({ kind: 'label', id: `${name}-d${i}`, at: `${name}-p${i}`, tex: '', tone: 'opp', dot: true, group: name }));
  items.push({ kind: 'label', id: `${name}-n`, at: `${name}-c`, tex: `${regions}`, tone: angles.length === 6 ? 'bad' : 'ink', place: 'below', group: name });
  return { points, items };
}

const video: Explainer = {
  id: 'm202-1-2-b',
  lessonId: 'm202-1-2',
  title: 'Counterexamples, Part 2: When Patterns Fail',
  thumbnailTitle: 'When Patterns Fail',
  thumbnail: 'rg',
  summary: 'Two famous patterns that break: n² + n + 41 is prime for n = 0 to 39 but not for 40, and the regions in a circle go 1, 2, 4, 8, 16 and then 31. Where to look for counterexamples, and revising "a square is always greater than the number".',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 1.2 · Part 2', title: 'When Patterns Fail', subtitle: 'Testing and revising conjectures' }],
      lines: [
        { say: 'Some conjectures fit a huge number of cases, and still fail. That is why a pattern, however convincing, is never accepted without proof.', show: 'title' },
        { say: 'In this video, you will see two famous patterns that break, learn where to look for counterexamples, and revise a conjecture.' },
      ],
    },
    {
      chapter: 'Forty primes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['n^2 + n + 41', 'n = 0:\\ 41;\\quad n = 1:\\ 43;\\quad n = 2:\\ 47;\\quad \\ldots;\\quad n = 39:\\ 1601', 'n = 40:\\quad 1600 + 40 + 41 = 1681 = 41 \\times 41'] }],
      lines: [
        { say: 'The expression n squared, plus n, plus forty-one, gives a prime number for every whole number from zero to thirty-nine: forty-one, forty-three, forty-seven, and so on, up to 1,601.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'But when n is forty, it gives 1,681, which is forty-one times forty-one. That is not prime.', show: 'm.2', focus: 'm.2' },
        { say: 'Forty supporting examples did not make the conjecture true.' },
      ],
    },
    {
      chapter: 'Regions in a circle',
      layout: 'center',
      main: [
        figure(
          'rg',
          [
            chords('c1', [90], 0, 1),
            chords('c2', [30, 200], 4, 2),
            chords('c3', [90, 210, 330], 8, 4),
            chords('c4', [20, 110, 200, 290], 12, 8),
            chords('c5', [90, 162, 234, 306, 18], 16, 16),
            chords('c6', [10, 65, 130, 185, 250, 310], 20, 31),
          ],
          260,
        ),
        { kind: 'math', id: 'm', size: 'md', lines: ['1,\\ 2,\\ 4,\\ 8,\\ 16,\\ 32\\,?', '6 \\text{ points: } 31 \\text{ regions}'] },
      ],
      lines: [
        { say: 'Points are placed on a circle, and every pair of points is joined by a chord. With one, two, three, four and five points, there are one, two, four, eight and sixteen regions.', show: ['rg.c1', 'rg.c2', 'rg.c3', 'rg.c4', 'rg.c5'] },
        { say: 'Malia conjectures that the number of regions doubles each time, so six points should give thirty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'But drawing six points carefully, with no three chords meeting at one point, and counting, gives only thirty-one regions. Six points is a counterexample.', show: ['rg.c6', 'm.1'], focus: ['rg.c6', 'm.1'] },
      ],
    },
    {
      chapter: 'Where to look',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Where to look for counterexamples', md: 'Try the cases people forget: $0$ and $1$, negative numbers, fractions and decimals, very large numbers, and special shapes such as squares or right triangles.' }],
      lines: [
        { say: 'Where should you look for counterexamples? Try the cases people forget: zero and one, negative numbers, fractions and decimals, very large numbers, and special shapes, such as squares or right triangles.', show: 'tip' },
      ],
    },
    {
      chapter: 'Revising a conjecture',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\left(\\tfrac{1}{2}\\right)^2 = \\tfrac{1}{4} < \\tfrac{1}{2}', '0^2 = 0,\\quad 1^2 = 1', '3^2 = 9 > 3,\\quad (-3)^2 = 9 > -3', '\\text{greater when } n > 1 \\text{ or } n < 0'] }],
      lines: [
        { say: 'A counterexample tells you where a conjecture needs a limit. Conjecture: the square of a number is always greater than the number. Try a fraction: one half, squared, is one quarter, which is less than one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero and one fail too: their squares are equal to the numbers themselves.', show: 'm.1', focus: 'm.1' },
        { say: 'But numbers greater than one work, and so do negative numbers: negative three, squared, is nine.', show: 'm.2', focus: 'm.2' },
        { say: 'So the revised conjecture is: the square of a number is greater than the number when the number is greater than one, or less than zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Conjecture: "The sum of two numbers is always greater than each of the numbers." Which pair is a counterexample?',
          choices: ['$3$ and $-1$', '$3$ and $4$', '$0.5$ and $0.5$', '$10$ and $20$'],
          answer: 0,
          working: '$3 + (-1) = 2$, which is not greater than $3$. The other pairs all support the conjecture.',
        },
      ],
      lines: [
        { say: 'Your turn. Conjecture: the sum of two numbers is always greater than each of the numbers. Which pair is a counterexample? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three plus negative one is two, which is not greater than three. A negative number is one of the cases people forget.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A conjecture can fit many cases and still be false.', 'Look for counterexamples among $0$, $1$, negatives, fractions and special cases.', 'Use a counterexample to revise a conjecture.'] }],
      lines: [
        { say: 'Let’s sum up. A conjecture can fit many cases, and still be false.', show: 'sum.0' },
        { say: 'Look for counterexamples among zero, one, negatives, fractions and other special cases.', show: 'sum.1' },
        { say: 'And use a counterexample to revise a conjecture, so it fits all the evidence. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
