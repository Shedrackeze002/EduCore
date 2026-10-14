import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-8-3-d',
  lessonId: 'm203-8-3',
  title: 'Numerical Puzzles and Games, Part 4: Winning Strategies',
  thumbnailTitle: 'Winning Strategies',
  thumbnail: 'pile',
  summary: 'What a strategy is, working backward to win a take-away game (leave a multiple of 4, so from 21 counters take 1), why grabbing the most counters loses control, and how the key numbers change when the rules change.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.3 · Part 4', title: 'Winning Strategies', subtitle: 'Work backward from the end' }],
      lines: [
        { say: 'Some games look like luck, but a little number sense lets you win every time.', show: 'title' },
        { say: 'In this video, you will find a winning strategy for a take-away game, by working backward from the end.' },
      ],
    },
    {
      chapter: 'A take-away game',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Strategy', md: 'A plan that tells you what to do on **every** turn, whatever the other player does.' },
        { kind: 'callout', id: 'rules', tone: 'key', title: 'The game', md: 'Two players take turns removing $1$, $2$ or $3$ counters from a pile. The player who takes the **last** counter wins.' },
      ],
      lines: [
        { say: 'A strategy is a plan that tells you what to do on every turn, whatever the other player does.', show: 'def' },
        { say: 'Here is the game. Two players take turns removing one, two or three counters from a pile. The player who takes the last counter wins.', show: 'rules' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'split',
      leftWidth: 520,
      left: [figure('four', [marbles({ groups: [{ id: 'g', count: 4, tone: 'adj' }], perRow: 4 })], 160)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{they take } 1 \\to \\text{you take } 3', '\\text{they take } 2 \\to \\text{you take } 2', '\\text{they take } 3 \\to \\text{you take } 1'] }],
      lines: [
        { say: 'To find a strategy, work backward from the end. Suppose it is your opponent’s turn, and four counters are left.', show: 'four.g' },
        { say: 'If they take one, you take the other three, and win.', show: 'm.0', focus: 'm.0' },
        { say: 'If they take two, you take two. If they take three, you take the last one. Whatever they do, you win.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So four is a key number: leave your opponent four, and you win. The same works for eight, twelve, sixteen and twenty, because each round you can bring the pile down by exactly four.' },
      ],
    },
    {
      chapter: 'Twenty-one counters',
      layout: 'split',
      leftWidth: 520,
      left: [figure('pile', [marbles({ groups: [{ id: 'g1', count: 4, tone: 'adj' }, { id: 'g2', count: 4, tone: 'adj' }, { id: 'g3', count: 4, tone: 'adj' }, { id: 'g4', count: 4, tone: 'adj' }, { id: 'g5', count: 4, tone: 'adj' }, { id: 'one', count: 1, tone: 'opp' }], perRow: 4 })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{leave } 4, 8, 12, 16, 20', '21 - 1 = 20', '\\text{each round: you} + \\text{they} = 4'] }],
      lines: [
        { say: 'There are 21 counters, and it is your turn. How many should you take? Here they are in rows of four, with one left over.', show: ['pile.one', 'pile.g1', 'pile.g2', 'pile.g3', 'pile.g4', 'pile.g5'] },
        { say: 'You want to leave your opponent a multiple of four: four, eight, twelve, sixteen or twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'From 21, taking one leaves twenty. So take one counter.', show: 'm.1', focus: ['pile.one', 'm.1'] },
        { say: 'Then, each round, take enough to make four, together with what your opponent took. If they take one, you take three; if they take two, you take two. The pile drops to sixteen, twelve, eight, four, and then you take the last counter.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Grabbing as many as you can',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Grabbing as many as you can', md: 'Taking $3$ from $21$ leaves $18$, which is not a multiple of $4$. Your opponent can take $2$ to leave you $16$, and now **they** control the game.' }],
      lines: [
        { say: 'A common mistake is to grab as many as you can. Taking three from 21 leaves eighteen, which is not a multiple of four. Your opponent can take two to leave you sixteen, and now they control the game.', show: 'oops' },
      ],
    },
    {
      chapter: 'Change the rules',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Change the rules, change the key numbers', md: 'If the player who takes the last counter **loses**, leave your opponent one more than a multiple of $4$: $1, 5, 9, 13, 17, 21$. If players may take $1$ to $4$, the key numbers go up by $5$ instead of $4$.' }],
      lines: [
        { say: 'Change the rules, and the key numbers change. If the player who takes the last counter loses, you want your opponent stuck with that last counter. So leave them one more than a multiple of four: one, five, nine, thirteen, seventeen or 21.', show: 'tip' },
        { say: 'And if players may take one to four counters, the key numbers go up by five instead of four, because you and your opponent can always make five together.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Players take $1$, $2$ or $3$ counters, and whoever takes the last counter wins. There are $15$ counters, and it is your turn. How many should you take?',
          choices: ['$3$', '$1$', '$2$', 'It does not matter.'],
          answer: 0,
          working: 'Leave a multiple of $4$: $15 - 3 = 12$. Taking $1$ leaves $14$, and taking $2$ leaves $13$, neither a multiple of $4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Players take one, two or three counters, and whoever takes the last counter wins. There are fifteen counters, and it is your turn. How many should you take? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. You want to leave a multiple of four, and fifteen minus three is twelve. Taking one or two leaves fourteen or thirteen, which hands your opponent the advantage.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A strategy says what to do on every turn.', 'Work backward from the end to find the key numbers.', 'Always leave your opponent on a key number.'] }],
      lines: [
        { say: 'Let’s sum up. A strategy tells you what to do on every turn, whatever the other player does.', show: 'sum.0' },
        { say: 'Work backward from the end of the game to find the key numbers.', show: 'sum.1' },
        { say: 'And always leave your opponent on a key number. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
