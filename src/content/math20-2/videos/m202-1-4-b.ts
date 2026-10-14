import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A round counter of radius `r` centred at `c`, filled, as a group of its own name. */
function counter(points: Record<string, P>, items: DiagramItem[], id: string, c: P, tone: 'opp' | 'adj', group: string) {
  const ring: string[] = [];
  for (let k = 0; k < 20; k++) {
    const t = (k / 20) * 2 * Math.PI;
    points[`${id}-${k}`] = [c[0] + 0.36 * Math.cos(t), c[1] + 0.36 * Math.sin(t)];
    ring.push(`${id}-${k}`);
  }
  items.push({ kind: 'region', id: `${id}-fill`, points: ring, tone, shade: 0.35, group });
  items.push({ kind: 'curve', id: `${id}-edge`, points: ring, closed: true, tone, group });
}

/** Fifteen counters: the 3 you take first, then three rounds of 4, each with a bracket underneath. */
function counters(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const x = (i: number) => i + (i >= 3 ? 0.4 : 0) + Math.max(0, Math.floor((i - 3) / 4)) * 0.4;
  for (let i = 0; i < 15; i++) counter(points, items, `k${i}`, [x(i), 0], i < 3 ? 'opp' : 'adj', 'all');
  const bracket = (id: string, a: number, b: number, label: string, tone: 'opp' | 'adj') => {
    Object.assign(points, { [`${id}-a`]: [x(a) - 0.4, -0.65], [`${id}-b`]: [x(b) + 0.4, -0.65] });
    items.push({ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone, weight: 3, label, labelSide: 'right' });
  };
  bracket('take', 0, 2, '\\text{take } 3', 'opp');
  bracket('r1', 3, 6, '\\text{leave } 12', 'adj');
  bracket('r2', 7, 10, '\\text{leave } 8', 'adj');
  bracket('r3', 11, 14, '\\text{leave } 4', 'adj');
  return { points, items };
}

/** One Tower of Hanoi snapshot at `ox`: three pegs, and the discs on each (sizes 1 to 3, bottom first). */
function tower(name: string, ox: number, pegs: number[][], caption: string): Part {
  const points: Record<string, P> = {
    [`${name}-g0`]: [ox - 0.8, 0],
    [`${name}-g1`]: [ox + 3.6, 0],
    [`${name}-cap`]: [ox + 1.4, -0.15],
  };
  const items: DiagramItem[] = [{ kind: 'line', id: `${name}-base`, from: `${name}-g0`, to: `${name}-g1`, tone: 'muted', weight: 3, group: name }];
  pegs.forEach((discs, p) => {
    const px = ox + 1.4 * p;
    Object.assign(points, { [`${name}-p${p}a`]: [px, 0], [`${name}-p${p}b`]: [px, 1.75] });
    items.push({ kind: 'line', id: `${name}-peg${p}`, from: `${name}-p${p}a`, to: `${name}-p${p}b`, tone: 'muted', weight: 3, group: name });
    discs.forEach((s, h) => {
      const w = 0.22 + 0.14 * s;
      const id = `${name}-d${p}${h}`;
      Object.assign(points, { [`${id}a`]: [px - w, 0.05 + 0.44 * h], [`${id}b`]: [px + w, 0.05 + 0.44 * h], [`${id}c`]: [px + w, 0.42 + 0.44 * h], [`${id}d`]: [px - w, 0.42 + 0.44 * h] });
      const corners = [`${id}a`, `${id}b`, `${id}c`, `${id}d`];
      const tone = s === 3 ? 'opp' : 'adj';
      items.push({ kind: 'region', id: `${id}f`, points: corners, tone, shade: 0.5, group: name });
      items.push({ kind: 'curve', id: `${id}e`, points: corners, closed: true, tone, group: name });
    });
  });
  items.push({ kind: 'label', id: `${name}-c`, at: `${name}-cap`, tex: caption, place: 'below', group: name });
  return { points, items };
}

const video: Explainer = {
  id: 'm202-1-4-b',
  lessonId: 'm202-1-4',
  title: 'Reasoning to Solve Problems and Puzzles, Part 2: Games and Winning Strategies',
  thumbnailTitle: 'Winning Strategies',
  thumbnail: 'th',
  summary: 'Working backwards to win a take-away game by always leaving a multiple of 4, the first move with 15 counters, and how inductive and deductive reasoning together explain the 2ⁿ − 1 moves in the Tower of Hanoi.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 1.4 · Part 2', title: 'Winning Strategies', subtitle: 'Working backwards in games' }],
      lines: [
        { say: 'Some games can always be won by the player who knows the strategy. Finding it takes both kinds of reasoning: spotting what works, and explaining why.', show: 'title' },
        { say: 'In this video, you will work backwards to win a take-away game, and explain the pattern in the Tower of Hanoi.' },
      ],
    },
    {
      chapter: 'A take-away game',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rules', tone: 'definition', title: 'The game', md: 'Players take turns removing $1$, $2$ or $3$ counters. The player who takes the **last** counter wins.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Leave } 4:\\ \\text{they take } 1, 2 \\text{ or } 3;\\ \\text{you take } 3, 2 \\text{ or } 1', '\\text{Always leave a multiple of } 4.'] },
      ],
      lines: [
        { say: 'In this game, players take turns removing one, two or three counters, and the player who takes the last counter wins.', show: 'rules' },
        { say: 'Work backwards from the end. If you leave your opponent exactly four counters, then whatever they take, one, two or three, you can take the rest and win.', show: 'm.0', focus: 'm.0' },
        { say: 'And you can leave four if you leave eight the turn before, because each round you can make the total taken equal four. So the strategy is to always leave a multiple of four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The first move',
      layout: 'center',
      main: [figure('cn', [counters()], 210), { kind: 'math', id: 'm', size: 'md', lines: ['15 - 12 = 3'] }],
      lines: [
        { say: 'There are fifteen counters and you go first. How many should you take?', show: 'cn.all' },
        { say: 'The nearest multiple of four below fifteen is twelve, so take fifteen minus twelve, which is three counters.', show: ['cn.take', 'm.0'], focus: ['cn.take', 'm.0'] },
        { say: 'Then, after each turn your opponent takes, take enough to make that round add to four. You leave twelve, then eight, then four, and then you take the last counter.', show: ['cn.r1', 'cn.r2', 'cn.r3'], focus: ['cn.r1', 'cn.r2', 'cn.r3'] },
      ],
    },
    {
      chapter: 'The Tower of Hanoi',
      layout: 'center',
      main: [
        figure('th', [tower('s0', 0, [[3, 2, 1], [], []], '\\text{Start}'), tower('s1', 5.4, [[3], [2, 1], []], '3 \\text{ moves}'), tower('s2', 10.8, [[], [2, 1], [3]], '1 \\text{ move}'), tower('s3', 16.2, [[], [], [3, 2, 1]], '3 \\text{ moves}')], 260),
        { kind: 'math', id: 'm', size: 'md', lines: ['1,\\ 3,\\ 7,\\ 15:\\quad 2^n - 1', '3 + 1 + 3 = 7,\\quad 7 + 1 + 7 = 15'] },
      ],
      lines: [
        { say: 'In the Tower of Hanoi, a stack of discs moves to another peg, one disc at a time, and a larger disc can never go on a smaller one.', show: 'th.s0' },
        { say: 'With one, two, three and four discs, the fewest moves are one, three, seven and fifteen. Each is one less than a power of two, which suggests the conjecture: two to the n, minus one, moves for n discs.', show: 'm.0', focus: 'm.0' },
        { say: 'Deductive reasoning shows why. To move three discs, first move the top two onto the middle peg, in three moves. Then move the largest disc, in one move.', show: ['th.s1', 'th.s2'], focus: ['th.s1', 'th.s2'] },
        { say: 'Then move the two discs back on top, in three more moves. So each extra disc doubles the moves, and adds one.', show: ['th.s3', 'm.1'], focus: ['th.s3', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the same game, there are $22$ counters and you go first. How many should you take?',
          choices: ['$2$', '$1$', '$3$', 'You cannot win.'],
          answer: 0,
          working: 'The nearest multiple of 4 below 22 is 20, so take $22 - 20 = 2$. Then leave 16, 12, 8, 4 and 0.',
        },
      ],
      lines: [
        { say: 'Your turn. In the same game, there are twenty-two counters, and you go first. How many should you take? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The nearest multiple of four below twenty-two is twenty, so take two. Then keep leaving a multiple of four: sixteen, twelve, eight, four, and zero.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Work backwards from the end to find a winning strategy.', 'In the take-away game, always leave a multiple of $4$.', 'Spot a pattern, then explain it with deductive reasoning.'] }],
      lines: [
        { say: 'Let’s sum up. Work backwards from the end of a game to find a winning strategy.', show: 'sum.0' },
        { say: 'In this take-away game, always leave a multiple of four.', show: 'sum.1' },
        { say: 'And spot a pattern, then explain it with deductive reasoning, as in the Tower of Hanoi. In part three, we solve spatial puzzles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
