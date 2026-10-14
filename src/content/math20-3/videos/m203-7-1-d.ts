import type { Explainer } from '@/video/script.ts';
import { plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 25], y: [0, 7000], xStep: 5, yStep: 1000, every: 1, width: 7, height: 5, titles: { x: '\\text{years}', y: '\\text{value (\\$)}' } });

const video: Explainer = {
  id: 'm203-7-1-d',
  lessonId: 'm203-7-1',
  title: 'Simple and Compound Interest, Part 4: Simple and Compound Compared',
  thumbnailTitle: 'Simple vs Compound',
  thumbnail: 'gr',
  summary: 'Simple and compound interest on a graph over 25 years, 5,000 dollars for 10 years at 4% (compound earns 401.22 dollars more), how compounding more often earns a little more, and why compounding works against borrowers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.1 · Part 4', title: 'Simple vs Compound', subtitle: 'What a few decades do' }],
      lines: [
        { say: 'At first, simple and compound interest are close. But over many years, compound interest pulls far ahead.', show: 'title' },
        { say: 'In this video, you will compare the two on a graph and with numbers, and see how much it matters how often interest compounds.' },
      ],
    },
    {
      chapter: 'On a graph',
      layout: 'split',
      leftWidth: 760,
      left: [
        figure('gr', [
          g,
          polyline(g, { id: 'simple', points: [[0, 1000], [25, 3000]], tone: 'muted', labels: ['\\text{Simple}'], sides: ['right'] }),
          plot(g, { id: 'comp', f: (t) => 1000 * 1.08 ** t, from: 0, to: 25, tone: 'brand', label: '\\text{Compound}', labelAt: 0.7, side: 'left' }),
        ], 520),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{simple: } 3{,}000', '\\text{compound: } \\approx 6{,}848'] }],
      lines: [
        { say: 'This graph shows 1,000 dollars at eight percent per year, for 25 years. With simple interest, it grows by the same eighty dollars every year, so the graph is a straight line.', show: ['gr.grid', 'gr.axes', 'gr.simple'], focus: 'gr.simple' },
        { say: 'With compound interest, compounded annually, the graph is a curve. For the first few years, the two are close.', show: 'gr.comp', focus: 'gr.comp' },
        { say: 'But the curve bends upward, because each year’s interest earns interest of its own.' },
        { say: 'After 25 years, simple interest has reached 3,000 dollars, and compound interest about 6,848 dollars, more than twice as much.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Ten years at 4%',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$5,000 for $10$ years at $4\\%$: simple, and compounded annually.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{simple: } 5{,}000 + 5{,}000 \\times 0.04 \\times 10 = 7{,}000', '\\text{compound: } 5{,}000(1 + 0.04)^{10} \\approx 7{,}401.22', '7{,}401.22 - 7{,}000 = 401.22'] },
      ],
      lines: [
        { say: 'Compare 5,000 dollars for ten years at four percent simple interest, and at four percent compounded annually.', show: 'q' },
        { say: 'With simple interest, the interest is 5,000 times 0.04 times ten, which is 2,000 dollars, so the amount is 7,000.', show: 'm.0', focus: 'm.0' },
        { say: 'With compound interest, the amount is 5,000 times 1.04 to the power ten: about 7,401 dollars 22.', show: 'm.1', focus: 'm.1' },
        { say: 'So compound interest earns 401 dollars 22 more over the ten years.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How often it compounds',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['\\$4,000 at 4.8% for 5 years', 'Amount'], rows: [['Compounded annually', '\\$5,056.69'], ['Semi-annually', '\\$5,070.60'], ['Quarterly', '\\$5,077.74'], ['Monthly', '\\$5,082.56']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['5{,}082.56 - 5{,}056.69 = 25.87'] },
      ],
      lines: [
        { say: 'How often interest compounds matters too. Here is Dakota’s term deposit from part three, 4,000 dollars at 4.8 percent for five years, compounded different ways.', show: 't' },
        { say: 'Compounded annually, it grows to 5,056 dollars 69.', focus: 't.0' },
        { say: 'Compounding more often earns a little more each time, because interest starts earning interest sooner. Monthly gives 5,082 dollars 56.', focus: ['t.1', 't.2', 't.3'] },
        { say: 'That is 25 dollars 87 more than annually. The rate matters most, but how often it compounds adds a little extra.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Borrowers pay it too',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Compounding works both ways', md: 'Compound interest helps a **saver**, but it works against a **borrower**: on a loan or a credit card balance, unpaid interest is added to what you owe, and then it is charged interest too.' }],
      lines: [
        { say: 'Compound interest helps you when you save. But it works against you when you borrow. On a loan or a credit card balance, unpaid interest is added to what you owe, and then it is charged interest too. That is why a debt left alone can grow quickly.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '\\$2,000 is invested for $15$ years at $5\\%$. How much more does it earn compounded annually than with simple interest?',
          choices: ['\\$657.86', '\\$1,500.00', '\\$2,157.86', '\\$4,157.86'],
          answer: 0,
          working: 'Simple: $2{,}000 + 2{,}000 \\times 0.05 \\times 15 = 3{,}500$. Compound: $2{,}000(1.05)^{15} \\approx 4{,}157.86$. The difference is $657.86$. D is the compound amount itself.',
        },
      ],
      lines: [
        { say: 'Your turn. 2,000 dollars is invested for fifteen years at five percent. How much more does it earn compounded annually than with simple interest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. With simple interest, it grows to 3,500 dollars. Compounded annually, it grows to 2,000 times 1.05 to the power fifteen, about 4,157 dollars 86. The difference is 657 dollars 86. D is the compound amount itself, not the difference.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Simple interest grows in a straight line; compound interest curves upward.', 'Over many years, compound interest pulls far ahead.', 'Compounding more often earns a little more.'] }],
      lines: [
        { say: 'Let’s sum up. Simple interest grows in a straight line, while compound interest curves upward.', show: 'sum.0' },
        { say: 'Over many years, compound interest pulls far ahead, for savers and for borrowers.', show: 'sum.1' },
        { say: 'And compounding more often earns a little more. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
