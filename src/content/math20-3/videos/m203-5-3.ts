import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** An exploded bookshelf: two side panels (A), four shelves (B) and a top (C), with dashed joins. */
function bookshelf(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const panel = (id: string, x0: number, y0: number, x1: number, y1: number, group: string, tone: 'brand' | 'adj' | 'opp') => {
    const c: P[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const names = c.map((p, i) => {
      points[`${id}${i}`] = p;
      return `${id}${i}`;
    });
    items.push({ kind: 'region', id: `${id}-fill`, points: names, tone, shade: 0.3, group }, { kind: 'curve', id: `${id}-edge`, points: names, closed: true, tone, group });
  };
  panel('aL', 1.2, 1, 1.9, 9, 'sides', 'brand');
  panel('aR', 12.1, 1, 12.8, 9, 'sides', 'brand');
  [1.3, 3.67, 6.03, 8.4].forEach((y, i) => {
    panel(`b${i}`, 4, y, 10, y + 0.45, 'shelves', 'adj');
    points[`j${i}a`] = [1.9, y + 0.22];
    points[`j${i}b`] = [4, y + 0.22];
    points[`j${i}c`] = [10, y + 0.22];
    points[`j${i}d`] = [12.1, y + 0.22];
    items.push({ kind: 'line', id: `jl${i}`, from: `j${i}a`, to: `j${i}b`, tone: 'muted', dashed: true, group: 'joins' }, { kind: 'line', id: `jr${i}`, from: `j${i}c`, to: `j${i}d`, tone: 'muted', dashed: true, group: 'joins' });
  });
  panel('c', 1.2, 10, 12.8, 10.5, 'top', 'opp');
  Object.assign(points, { t0: [1.55, 9], t1: [1.55, 10], t2: [12.45, 9], t3: [12.45, 10], nA1: [0.5, 5], nA2: [13.5, 5], nB: [7, 0.6], nC: [7, 11.2] });
  items.push(
    { kind: 'line', id: 'jt0', from: 't0', to: 't1', tone: 'muted', dashed: true, group: 'joins' },
    { kind: 'line', id: 'jt1', from: 't2', to: 't3', tone: 'muted', dashed: true, group: 'joins' },
    { kind: 'label', id: 'lA1', at: 'nA1', tex: '\\text{A}', tone: 'brand', place: 'center', group: 'sides' },
    { kind: 'label', id: 'lA2', at: 'nA2', tex: '\\text{A}', tone: 'brand', place: 'center', group: 'sides' },
    { kind: 'label', id: 'lB', at: 'nB', tex: '\\text{B}', tone: 'adj', place: 'center', group: 'shelves' },
    { kind: 'label', id: 'lC', at: 'nC', tex: '\\text{C}', tone: 'opp', place: 'center', group: 'top' },
  );
  return { points, items };
}

const video: Explainer = {
  id: 'm203-5-3',
  lessonId: 'm203-5-3',
  title: 'Exploded Views and Components, Part 1: Reading an Exploded View',
  thumbnailTitle: 'Exploded Views',
  thumbnail: 'bs',
  summary: 'What exploded views and components are, reading the labels on an exploded bookshelf with side panels, shelves and a top, and counting its 7 wooden parts and 16 shelf pins.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.3 · Part 1', title: 'Exploded Views', subtitle: 'Every part, and where it goes' }],
      lines: [
        { say: 'Flat-pack furniture, a bike wheel kit, and a backyard deck all come with instructions that pull the object apart on paper. These drawings are called exploded views.', show: 'title' },
        { say: 'In this video, you will read an exploded view, and count the parts it needs.' },
      ],
    },
    {
      chapter: 'Exploded views and components',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Exploded view', md: 'A drawing of an object with its parts **pulled apart**, but still lined up with where they go. Dashed lines often show how the parts join.' },
        { kind: 'callout', id: 'def2', tone: 'definition', title: 'Component', md: 'One part of a larger object. Each component usually has a **label**, such as a letter, that matches the parts list.' },
      ],
      lines: [
        { say: 'An exploded view is a drawing of an object with its parts pulled apart, but still lined up with where they go. Dashed lines often show how the parts join.', show: 'def' },
        { say: 'A component is one part of the larger object. Each component in an exploded view usually has a label, such as a letter, that matches a parts list. Furniture stores, bike shops and deck plans all use these labels.', show: 'def2' },
      ],
    },
    {
      chapter: 'Parts of a bookshelf',
      layout: 'split',
      leftWidth: 540,
      left: [figure('bs', [bookshelf()], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{A: } 2,\\;\\; \\text{B: } 4,\\;\\; \\text{C: } 1', '\\text{wooden parts: } 2 + 4 + 1 = 7', '\\text{pins: } 4 \\times 4 = 16'] }],
      lines: [
        { say: 'This exploded view shows a bookshelf. The side panels are labelled A.', show: 'bs.sides', focus: 'bs.sides' },
        { say: 'The shelves are labelled B, and the dashed lines show each shelf fitting between the side panels.', show: ['bs.shelves', 'bs.joins'], focus: 'bs.shelves' },
        { say: 'And the top is labelled C, resting on top of both sides.', show: 'bs.top', focus: 'bs.top' },
        { say: 'How many wooden parts are there? Count each label: A appears twice, B four times, and C once.', show: 'm.0', focus: 'm.0' },
        { say: 'So there are two plus four plus one, seven wooden parts.', show: 'm.1', focus: 'm.1' },
        { say: 'Each shelf rests on four metal shelf pins. Four shelves times four pins is sixteen pins.', show: 'm.2', focus: 'm.2' },
        { say: 'So the box should hold seven wooden parts and sixteen pins. Checking the box against these counts before you start saves a trip back to the store.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An exploded view of a small table shows a top (A), 4 legs (B) and 4 rails (C). Each leg is fastened with 2 screws. How many parts and screws are needed?',
          choices: ['$9$ parts and $8$ screws', '$3$ parts and $8$ screws', '$9$ parts and $2$ screws', '$12$ parts and $8$ screws'],
          answer: 0,
          working: 'Parts: $1 + 4 + 4 = 9$. Screws: $4$ legs $\\times\\ 2 = 8$. B counts the labels, not the parts.',
        },
      ],
      lines: [
        { say: 'Your turn. An exploded view of a small table shows a top, labelled A, four legs, labelled B, and four rails, labelled C. Each leg is fastened with two screws. How many parts and screws are needed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One top, four legs and four rails make nine parts, and four legs times two screws is eight screws. B counts the labels, not the parts.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An exploded view pulls an object apart, still lined up.', 'Dashed lines show where parts join.', 'Count every copy of each label, and the fasteners for each part.'] }],
      lines: [
        { say: 'Let’s sum up. An exploded view pulls an object apart on paper, with the parts still lined up.', show: 'sum.0' },
        { say: 'Dashed lines show where the parts join.', show: 'sum.1' },
        { say: 'And count every copy of each label, plus the fasteners each part needs. In part two, we read a parts list and price the parts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
