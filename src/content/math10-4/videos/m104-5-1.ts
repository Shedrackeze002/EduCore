import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

/** Square tables pushed together in a row, with a chair on each open side. */
function tablesInARow(count: number): Part {
  const points: Record<string, [number, number]> = {};
  const items: DiagramItem[] = [];
  const s = 2;
  const chair = (id: string, x: number, y: number) => {
    Object.assign(points, { [`${id}a`]: [x - 0.3, y - 0.3], [`${id}b`]: [x + 0.3, y - 0.3], [`${id}c`]: [x + 0.3, y + 0.3], [`${id}d`]: [x - 0.3, y + 0.3] });
    items.push({ kind: 'region', id, points: ['a', 'b', 'c', 'd'].map((k) => `${id}${k}`), tone: 'opp', shade: 0.8, group: 'chairs' });
  };
  for (let i = 0; i < count; i++) {
    const x = i * s;
    Object.assign(points, { [`t${i}a`]: [x, 0], [`t${i}b`]: [x + s, 0], [`t${i}c`]: [x + s, s], [`t${i}d`]: [x, s] });
    items.push({ kind: 'region', id: `table${i}`, points: ['a', 'b', 'c', 'd'].map((k) => `t${i}${k}`), tone: 'brand', shade: 0.35, group: 'tables' });
    items.push({ kind: 'curve', id: `edge${i}`, points: ['a', 'b', 'c', 'd'].map((k) => `t${i}${k}`), closed: true, group: 'tables' });
    chair(`top${i}`, x + s / 2, s + 0.6);
    chair(`bot${i}`, x + s / 2, -0.6);
  }
  chair('left', -0.6, s / 2);
  chair('right', count * s + 0.6, s / 2);
  return { points, items };
}

const video: Explainer = {
  id: 'm104-5-1',
  lessonId: 'm104-5-1',
  title: 'Patterns, Part 1: Tables and Extending Patterns',
  thumbnailTitle: 'Patterns',
  thumbnail: 'row',
  summary: 'Patterns and terms, a table of values for tables and chairs, adding patterns (saving the same amount each week) and doubling patterns (views on a video), and checking the jumps before extending. Part 2 reaches a goal and writes a rule.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 5.1 · Part 1', title: 'Patterns', subtitle: 'Spot the change, predict what comes next' }],
      lines: [
        { say: 'A banquet hall needs to know how many tables to set up for thirty guests. A taxi meter goes up by the same amount every kilometre. If you can spot the pattern, you can predict what comes next.', show: 'title' },
        { say: 'In this video, you will extend adding patterns and doubling patterns.' },
      ],
    },
    {
      chapter: 'Tables and chairs',
      layout: 'split',
      leftWidth: 520,
      left: [figure('row', [tablesInARow(3)])],
      right: [{ kind: 'table', id: 't', head: ['Tables', 'People'], rows: [['1', '4'], ['2', '6'], ['3', '8'], ['4', '10'], ['5', '[[good:12]]']] }],
      lines: [
        { say: 'A pattern is a list of numbers or shapes that follows a rule, and each number in it is a term. Square tables are pushed together in a row for a community supper, with one chair on each open side.', show: ['row.tables', 'row.chairs'] },
        { say: 'A table of values lists the terms in order. One table seats four, two tables seat six, three seat eight, and four seat ten.', show: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'Find the change from one term to the next: six minus four is two, and each jump is two. Each new table adds two people, one on each long side.', focus: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'So five tables seat ten plus two: twelve people.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Adding patterns',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['35, \\; 60, \\; 85, \\; 110 \\quad (+25 \\text{ each week})', '110 + 25 = 135, \\quad 135 + 25 = 160'] }],
      lines: [
        { say: 'Most patterns at work add the same amount each time. Ava saves part of her pay: 35 dollars after week one, sixty after week two, 85 after week three, and 110 after week four.', show: 'm.0' },
        { say: 'Each jump is 25 dollars. So after week five she has 135, and after week six, 160 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Doubling patterns',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['20, \\; 40, \\; 80, \\; 160 \\quad (\\times 2 \\text{ each day})', '160 \\times 2 = 320, \\quad 320 \\times 2 = 640'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Always adding', md: 'Check the jumps first. If they get bigger each time, the pattern may be doubling. Adding $80$ to $160$ would be wrong.' },
      ],
      lines: [
        { say: 'Some patterns double. A bakery’s video has twenty views after day one, forty after day two, eighty after day three, and 160 after day four.', show: 'm.0' },
        { say: 'The jumps are twenty, forty and eighty: not the same, so this is not an adding pattern. Each term is double the one before.', focus: 'm.0' },
        { say: 'Day five is 160 times two, 320, and day six is 640 views.', show: 'm.1', focus: 'm.1' },
        { say: 'Always check the jumps before you extend a pattern. Adding eighty to 160 would give 240, which is wrong.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the next term? $3, \\; 6, \\; 12, \\; 24, \\; \\ldots$',
          choices: ['$48$', '$30$', '$36$', '$27$'],
          answer: 0,
          working: 'The jumps are $3, 6, 12$, so it is not adding. Each term doubles: $24 \\times 2 = 48$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the next term: three, six, twelve, 24? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The jumps get bigger, so it is not adding. Each term doubles: 24 times two is 48. B adds six again.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A pattern follows a rule. Each number is a term.', 'Same jump each time: keep adding it.', 'Each term double the one before: keep multiplying by $2$.'] }],
      lines: [
        { say: 'Let’s sum up. A pattern follows a rule, and each number in it is a term.', show: 'sum.0' },
        { say: 'If the jump is the same each time, keep adding it.', show: 'sum.1' },
        { say: 'And if each term is double the one before, keep multiplying by two. In part two, we reach a goal and write a rule. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
