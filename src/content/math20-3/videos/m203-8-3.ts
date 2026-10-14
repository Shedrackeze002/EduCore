import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** Figures 1, 2 and 3 of squares in a row made of toothpicks; each figure's 3 new toothpicks in orange. */
function toothpicks(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const stick = (id: string, a: P, b: P, group: string, fresh: boolean) => {
    points[`${id}a`] = a;
    points[`${id}b`] = b;
    items.push({ kind: 'line', id, from: `${id}a`, to: `${id}b`, tone: fresh ? 'opp' : 'adj', weight: 5, group });
  };
  [[1, 0], [2, 2.5], [3, 6]].forEach(([n, x0]) => {
    const g = `f${n}`;
    for (let i = 0; i <= n; i++) stick(`${g}v${i}`, [x0 + i, 0], [x0 + i, 1], g, n > 1 && i === n);
    for (let i = 0; i < n; i++) {
      stick(`${g}t${i}`, [x0 + i, 1], [x0 + i + 1, 1], g, n > 1 && i === n - 1);
      stick(`${g}b${i}`, [x0 + i, 0], [x0 + i + 1, 0], g, n > 1 && i === n - 1);
    }
    points[`${g}l`] = [x0 + n / 2, -0.35];
    items.push({ kind: 'label', id: `${g}name`, at: `${g}l`, tex: `\\text{Figure ${n}}`, tone: 'muted', place: 'below', group: g });
  });
  return { points, items };
}

const video: Explainer = {
  id: 'm203-8-3',
  lessonId: 'm203-8-3',
  title: 'Numerical Puzzles and Games, Part 1: Number Patterns',
  thumbnailTitle: 'Number Patterns',
  thumbnail: 'tp',
  summary: 'Pattern rules that add, multiply or have growing differences, toothpick squares in a row (4, 7, 10, …, so figure 20 uses 61 toothpicks), why shared sides are not counted twice, and running a rule backward (151 toothpicks is figure 50).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.3 · Part 1', title: 'Number Patterns', subtitle: 'Find the rule first' }],
      lines: [
        { say: 'A number puzzle in the newspaper, a game of take-away on a lunch break, and a riddle on a coffee cup all run on the same skill: reasoning with numbers.', show: 'title' },
        { say: 'In this video, you will find the rule of a pattern, and use it to predict any figure.' },
      ],
    },
    {
      chapter: 'Pattern rules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A pattern follows a rule', md: 'Find the rule first, then use it.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3,\\ 7,\\ 11,\\ 15,\\ \\ldots \\quad \\text{add } 4', '2,\\ 6,\\ 18,\\ 54,\\ \\ldots \\quad \\text{multiply by } 3', '1,\\ 3,\\ 6,\\ 10,\\ \\ldots \\quad \\text{differences } 2, 3, 4'] },
      ],
      lines: [
        { say: 'A pattern follows a rule. Find the rule first, then use it.', show: 'key' },
        { say: 'Some patterns add the same number each time: three, seven, eleven, fifteen adds four.', show: 'm.0', focus: 'm.0' },
        { say: 'Some multiply by the same number: two, six, eighteen, 54 multiplies by three.', show: 'm.1', focus: 'm.1' },
        { say: 'And in some, the differences grow by the same amount: one, three, six, ten goes up by two, then three, then four. The next number is ten plus five, fifteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Toothpick squares',
      layout: 'center',
      main: [
        figure('tp', [toothpicks()], 240),
        { kind: 'math', id: 'm', size: 'md', lines: ['4,\\ 7,\\ 10,\\ \\ldots \\quad (+3)', '19 \\times 3 = 57', '4 + 57 = 61'] },
      ],
      lines: [
        { say: 'Here, squares in a row are made of toothpicks. Figure one is a single square: four toothpicks.', show: 'tp.f1' },
        { say: 'Figure two adds a second square. It shares a side with the first, so it needs only three more toothpicks, seven in all.', show: 'tp.f2', focus: 'tp.f2' },
        { say: 'Figure three adds three more: ten. So each figure adds three toothpicks.', show: ['tp.f3', 'm.0'], focus: ['tp.f3', 'm.0'] },
        { say: 'How many toothpicks does figure twenty use? From figure one to figure twenty, there are nineteen steps of three: 57 toothpicks.', show: 'm.1', focus: 'm.1' },
        { say: 'Add the first four: figure twenty uses 61 toothpicks.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Counting shared sides twice',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting shared sides twice', md: 'Twenty separate squares would use $20 \\times 4 = 80$ toothpicks, but squares in a row **share sides**. Use the pattern of the figures, not the toothpicks in one square.' }],
      lines: [
        { say: 'A common mistake is to multiply twenty squares by four toothpicks each, which gives eighty. But squares in a row share sides. Use the pattern of the figures, not the number of toothpicks in one square.', show: 'oops' },
      ],
    },
    {
      chapter: 'Running the rule backward',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['151 - 4 = 147', '147 \\div 3 = 49 \\text{ steps}', '49 + 1 = 50'] }],
      lines: [
        { say: 'You can also run the rule backward. Which figure uses 151 toothpicks? First, take away the first four toothpicks: 147.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by three to count the steps: 49 steps.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add one, because the steps start from figure one. So it is figure fifty.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Triangles in a row are made of toothpicks. Figure $1$ uses $3$ toothpicks, figure $2$ uses $5$ and figure $3$ uses $7$. How many does figure $15$ use?',
          choices: ['$31$', '$45$', '$30$', '$33$'],
          answer: 0,
          working: 'Each figure adds $2$. From figure $1$ to figure $15$ there are $14$ steps: $3 + 14 \\times 2 = 31$. B counts $15$ separate triangles.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangles in a row are made of toothpicks. Figure one uses three toothpicks, figure two uses five, and figure three uses seven. How many does figure fifteen use? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Each figure adds two. From figure one to figure fifteen, there are fourteen steps, so three plus fourteen times two is 31. B counts fifteen separate triangles.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the rule first: add, multiply, or growing differences.', 'Start value + (steps × amount added).', 'Run the rule backward to find which figure.'] }],
      lines: [
        { say: 'Let’s sum up. Find the rule of a pattern first: adding, multiplying, or differences that grow.', show: 'sum.0' },
        { say: 'For a pattern that adds, start with the first value, and add the number of steps times the amount added.', show: 'sum.1' },
        { say: 'And run the rule backward to find which figure has a given number. In part two, we solve magic squares. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
