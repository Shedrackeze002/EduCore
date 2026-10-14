import type { Explainer } from '@/video/script.ts';
import { numberLine, tiles, venn } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

/** The primes of 72 = 2³ × 3² and 120 = 2³ × 3 × 5, sorted into two circles. */
const primes = (id: string) => figure(id, [venn({ titles: ['72', '120'], left: ['3'], both: ['2', '2', '2', '3'], right: ['5'] })]);

const video: Explainer = {
  id: 'm10c-3-1-b',
  lessonId: 'm10c-3-1',
  title: 'Prime Factors, GCF and LCM, Part 2: GCF and LCM',
  thumbnailTitle: 'GCF and LCM',
  thumbnail: 'v',
  summary: 'The greatest common factor and least common multiple from prime factors, shown in a Venn diagram, and how to tell which one a problem needs: the largest square tile for a floor, and when two lighthouses flash together again.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.1 · Part 2', title: 'GCF and LCM', subtitle: 'Using prime factors' }],
      lines: [
        { say: 'What is the largest square tile that covers a floor exactly? When will two flashing lights flash together again?', show: 'title' },
        { say: 'In this video, you will use prime factors to find the greatest common factor and the least common multiple, and decide which one a problem needs.' },
      ],
    },
    {
      chapter: 'Greatest common factor',
      layout: 'split',
      leftWidth: 580,
      left: [primes('v')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Greatest common factor', md: 'The largest number that divides all of the numbers exactly.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['72 = 2^3 \\times 3^2', '120 = 2^3 \\times 3 \\times 5', '\\text{GCF} = 2^3 \\times 3 = 24'] },
      ],
      lines: [
        { say: 'The greatest common factor, or GCF, of two numbers is the largest number that divides both of them exactly.', show: 'def' },
        { say: 'Find the GCF of 72 and 120. First, the prime factorizations: 72 is 2 cubed times 3 squared, and 120 is 2 cubed times 3 times 5.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Sort the primes into two circles, one for each number. Both numbers have three twos and a three, so those go in the middle, where the circles overlap.', show: ['v.a', 'v.b', 'v.both'], focus: 'v.both' },
        { say: '72 has one more three, and 120 has a five, so those go on their own sides.', show: ['v.left', 'v.right'], focus: ['v.left', 'v.right'] },
        { say: 'The GCF is the product of the shared primes in the middle: 2 cubed times 3, which is 24.', show: ['v.lens', 'm.2'], focus: ['m.2', 'v.both'] },
        { say: 'In other words, the GCF uses the primes common to every number, with the lowest power of each.' },
      ],
    },
    {
      chapter: 'Least common multiple',
      layout: 'split',
      leftWidth: 580,
      left: [primes('v')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Least common multiple', md: 'The smallest positive number that is a multiple of all of the numbers.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{LCM} = 24 \\times 3 \\times 5', '= 2^3 \\times 3^2 \\times 5 = 360'] },
      ],
      lines: [
        { say: 'The least common multiple, or LCM, is the smallest number that is a multiple of both.', show: ['def', 'v.a', 'v.b', 'v.both', 'v.left', 'v.right'] },
        { say: 'It must contain every prime of 72 and every prime of 120, so multiply every prime in the diagram: the 24 in the middle, times the three on the left and the five on the right.', show: ['v.union', 'm.0'], focus: ['m.0', 'v.left', 'v.both', 'v.right'] },
        { say: 'That is every prime that appears, with the highest power of each: 2 cubed times 3 squared times 5, which is 360.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'GCF or LCM?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Clue in the problem', 'Use'],
          rows: [
            ['The **largest** equal groups, tiles or pieces, with nothing left over', '**GCF**'],
            ['When things **happen together again**; the smallest common length or time', '**LCM**'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Check the size', md: 'The GCF is never larger than the smallest number. The LCM is never smaller than the largest number.' },
      ],
      lines: [
        { say: 'In a word problem, look for clues. If you are splitting things into the largest equal groups, or the biggest tiles, with nothing left over, use the GCF.', show: 't.0' },
        { say: 'If you want to know when things will happen together again, or the smallest common length or time, use the LCM.', show: 't.1' },
        { say: 'And check the size of your answer. The GCF is never larger than the smallest number, and the LCM is never smaller than the largest.', show: 'oops' },
      ],
    },
    {
      chapter: 'The largest tile',
      layout: 'split',
      left: [figure('floor', [tiles({ cols: 7, rows: 5, labels: { width: '252\\text{ cm}', height: '180\\text{ cm}', side: '36' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A floor is $252\\text{ cm}$ by $180\\text{ cm}$. What is the largest square tile that covers it with no cutting?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['252 = 2^2 \\times 3^2 \\times 7', '180 = 2^2 \\times 3^2 \\times 5', '\\text{GCF} = 2^2 \\times 3^2 = 36'] },
      ],
      lines: [
        { say: 'A floor is 252 centimetres by 180 centimetres. What is the largest square tile that covers it with no cutting?', show: ['floor.outline', 'floor.width', 'floor.height', 'q'] },
        { say: 'The side of a tile must divide both lengths exactly, and we want the largest, so this is a GCF problem.' },
        { say: '252 is 2 squared times 3 squared times 7, and 180 is 2 squared times 3 squared times 5.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The shared primes make 2 squared times 3 squared, which is 36. So use 36 centimetre tiles: seven across, and five down.', show: ['m.2', 'floor.grid', 'floor.tile', 'floor.side'], focus: ['m.2', 'floor.tile'] },
      ],
    },
    {
      chapter: 'Flashing together',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Two lighthouses flash every $12\\text{ s}$ and every $20\\text{ s}$. They flash together now. When will they next flash together?', size: 'md' },
        figure(
          'line',
          [
            numberLine({
              min: 0,
              max: 60,
              step: 4,
              every: 0,
              length: 15,
              points: [
                { id: 'now', value: 0, tex: '0', tone: 'good' },
                ...[12, 24, 36, 48].map((v) => ({ id: `a${v}`, value: v, tex: String(v), tone: 'adj' as const })),
                { id: 'a60', value: 60, tex: '60', tone: 'good' },
                ...[20, 40].map((v) => ({ id: `b${v}`, value: v, tex: String(v), tone: 'opp' as const, below: true })),
                { id: 'b60', value: 60, tex: '60', tone: 'good', below: true },
              ],
            }),
          ],
          220,
        ),
        { kind: 'math', id: 'm', lines: ['\\text{LCM}(12, 20) = 2^2 \\times 3 \\times 5 = 60\\text{ s}'] },
      ],
      lines: [
        { say: 'Two lighthouses flash every twelve seconds and every twenty seconds. They flash together now. When will they next flash together?', show: ['q', 'line.axis', 'line.now'] },
        { say: 'The first lighthouse flashes at 12, 24, 36, 48 and 60 seconds.', show: ['line.a12', 'line.a24', 'line.a36', 'line.a48', 'line.a60'] },
        { say: 'The second lighthouse flashes at 20, 40 and 60 seconds.', show: ['line.b20', 'line.b40', 'line.b60'] },
        { say: 'They meet again at 60 seconds, their first common multiple, so this is an LCM problem. Twelve is 2 squared times 3, and twenty is 2 squared times 5, so the LCM is 2 squared times 3 times 5: sixty seconds.', show: 'm.0', focus: ['m.0', 'line.a60', 'line.b60'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Hot dogs come in packs of $10$ and buns in packs of $8$. What is the smallest number of each you can buy to have the same number of hot dogs and buns?',
          choices: ['$40$', '$80$', '$2$', '$18$'],
          answer: 0,
          working: '$10 = 2 \\times 5$ and $8 = 2^3$, so $\\text{LCM} = 2^3 \\times 5 = 40$: four packs of hot dogs and five packs of buns.',
        },
      ],
      lines: [
        { say: 'Your turn. Hot dogs come in packs of ten, and buns in packs of eight. What is the smallest number of each you can buy to have the same number of hot dogs and buns? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, forty. This is an LCM problem. Ten is two times five, and eight is two cubed, so the LCM is two cubed times five: four packs of hot dogs and five packs of buns. B is a common multiple, but not the least, and C is the GCF.', show: 'q.answer' },
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
          items: ['GCF: the shared primes, with the **lowest** power of each.', 'LCM: every prime that appears, with the **highest** power of each.', '“Largest equal pieces” → GCF. “When together again” → LCM.'],
        },
      ],
      lines: [
        { say: "Let's sum up. The GCF multiplies the primes the numbers share, with the lowest power of each.", show: 'sum.0' },
        { say: 'The LCM multiplies every prime that appears, with the highest power of each.', show: 'sum.1' },
        { say: 'For the largest equal pieces, use the GCF. For when things happen together again, use the LCM. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
