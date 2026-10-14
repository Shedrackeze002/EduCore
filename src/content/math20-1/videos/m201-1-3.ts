import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 7], y: [0, 36], yStep: 4, width: 7, height: 6, titles: { x: 'n', y: 't_n' } });

const video: Explainer = {
  id: 'm201-1-3',
  lessonId: 'm201-1-3',
  title: 'Geometric Sequences, Part 1: The Common Ratio',
  thumbnailTitle: 'Geometric Sequences',
  thumbnail: 'geo',
  summary: 'The common ratio r of a geometric sequence, telling geometric from arithmetic, the graph that curves instead of lying on a line, and the general term tₙ = t₁rⁿ⁻¹ with a positive and a negative fractional ratio. Part 2 works from two terms and models growth and decay.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.3 · Part 1', title: 'Geometric Sequences', subtitle: 'Multiply by the same number' }],
      lines: [
        { say: 'A bacteria culture that doubles every hour, a truck that loses fifteen percent of its value each year, a ball that bounces back to three quarters of its height: in each case, the next value comes from multiplying by the same number.', show: 'title' },
        { say: 'In this video, you will find the common ratio of a geometric sequence, and write its general term.' },
      ],
    },
    {
      chapter: 'The common ratio',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Geometric sequence', md: 'Each term after the first is the previous term times the same non-zero **common ratio**: $r = \\dfrac{t_n}{t_{n-1}}$.' },
        { kind: 'table', id: 't', head: ['Sequence', 'Common ratio'], rows: [['$3,\\ 6,\\ 12,\\ 24,\\ \\ldots$', '$r = \\frac{6}{3} = 2$'], ['$80,\\ 20,\\ 5,\\ 1.25,\\ \\ldots$', '$r = \\frac{20}{80} = \\frac{1}{4}$'], ['$2,\\ -6,\\ 18,\\ -54,\\ \\ldots$', '$r = \\frac{-6}{2} = -3$']] },
      ],
      lines: [
        { say: 'In a geometric sequence, each term after the first is the previous term times the same non-zero number, the common ratio r. To find r, divide any term by the term before it.', show: 'def' },
        { say: 'In three, six, twelve, 24, the ratio is six over three: two. Each term doubles.', show: 't.0', focus: 't.0' },
        { say: 'In eighty, twenty, five, 1.25, the ratio is twenty over eighty: one quarter. A ratio between negative one and one makes the terms shrink toward zero.', show: 't.1', focus: 't.1' },
        { say: 'And in two, negative six, eighteen, the ratio is negative three. A negative ratio makes the signs alternate.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Geometric or arithmetic?',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('geo', [
          g,
          plot(g, { id: 'curve', f: (n) => 2 ** (n - 1), from: 0.6, to: 6.2, tone: 'muted', dashed: true }),
          dots(g, [1, 2, 4, 8, 16, 32].map((t, i) => ({ id: `p${i}`, x: i + 1, y: t, tone: 'opp', group: 'pts' }))),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2,\\ 6,\\ 18,\\ 54 \\;\\to\\; r = 3', '2,\\ 6,\\ 10,\\ 14 \\;\\to\\; d = 4'] }],
      lines: [
        { say: 'To decide which kind of sequence you have, test both. An arithmetic sequence has a constant difference, and a geometric sequence has a constant ratio.', show: 'm.0' },
        { say: 'Two, six, eighteen, 54 is geometric: each term is three times the last. Two, six, ten, fourteen is arithmetic: each term is four more.', show: 'm.1', focus: ['m.0', 'm.1'] },
        { say: 'The graphs look different too. Plot one, two, four, eight, sixteen, 32. The points do not lie on a line: they curve upward, faster and faster.', show: ['geo.grid', 'geo.axes', 'geo.pts', 'geo.curve'], focus: 'geo.pts' },
      ],
    },
    {
      chapter: 'The general term',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['t_1,\\quad t_1 r,\\quad t_1 r^2,\\quad t_1 r^3,\\quad \\ldots', 't_n = t_1 r^{n-1}', 't_{10} = 3(2)^{9} = 3(512) = 1536'] },
      ],
      lines: [
        { say: 'Start at t sub one, and keep multiplying by r: t sub one times r, then times r squared, then times r cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'To reach term n, you multiply by r exactly n minus one times. So the general term is t sub n equals t sub one, times r to the power n minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Find t sub ten for three, six, twelve. t sub one is three and r is two, so t sub ten is three times two to the ninth: three times 512, which is 1,536.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A negative ratio',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['r = \\dfrac{-32}{64} = -\\dfrac{1}{2}', 't_8 = 64\\left(-\\dfrac{1}{2}\\right)^{7} = 64\\left(-\\dfrac{1}{128}\\right) = -\\dfrac{1}{2}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Brackets around a negative ratio', md: '$(-2)^4 = 16$, but $-2^4 = -16$. Bracket a negative or fractional $r$. And $t_1 r^{n-1}$ is not $(t_1 r)^{n-1}$: raise $r$ to the power first.' },
      ],
      lines: [
        { say: 'Find t sub eight for 64, negative 32, sixteen. The ratio is negative 32 over 64: negative one half.', show: 'm.0', focus: 'm.0' },
        { say: 't sub eight is 64 times negative one half, to the seventh. An odd power of a negative is negative, so that is 64 times negative one over 128: negative one half.', show: 'm.1', focus: 'm.1' },
        { say: 'Put a negative or fractional ratio in brackets before you raise it to a power: negative two, in brackets, to the fourth is sixteen, but without brackets it is negative sixteen. And raise r to the power first, then multiply by t sub one.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $t_6$ for the geometric sequence $5,\\ 15,\\ 45,\\ \\ldots$',
          choices: ['$1215$', '$3645$', '$405$', '$30$'],
          answer: 0,
          working: '$t_1 = 5$ and $r = 3$: $t_6 = 5(3)^5 = 5(243) = 1215$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find t sub six for the geometric sequence five, fifteen, 45. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. t sub one is five and r is three, so t sub six is five times three to the fifth: five times 243, which is 1,215. B uses the sixth power instead of the fifth.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply by the same common ratio $r = \\tfrac{t_n}{t_{n-1}}$ at each step.', 'General term: $t_n = t_1 r^{n-1}$.', 'Bracket a negative or fractional $r$.'] }],
      lines: [
        { say: 'Let’s sum up. A geometric sequence multiplies by the same common ratio at every step.', show: 'sum.0' },
        { say: 'Its general term is t sub one, times r to the power n minus one.', show: 'sum.1' },
        { say: 'And bracket a negative or fractional ratio. In part two, we work from two terms, and model growth and decay. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
