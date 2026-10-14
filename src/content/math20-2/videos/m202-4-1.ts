import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A 10 by 10 square with the square joining the midpoints of its sides shaded, and its top right 5 by 5 corner square marked. */
function quilt(): Part {
  const s = 4;
  const points: Record<string, P> = {
    a: [0, 0], b: [s, 0], c: [s, s], d: [0, s],
    mb: [s / 2, 0], mr: [s, s / 2], mt: [s / 2, s], ml: [0, s / 2], mid: [s / 2, s / 2],
    top: [s / 2, s + 0.05], ac: [s / 2, s * 0.32],
  };
  const items: DiagramItem[] = [
    { kind: 'curve', id: 'outer', points: ['a', 'b', 'c', 'd'], closed: true, tone: 'muted', group: 'big' },
    { kind: 'label', id: 'big-n', at: 'top', tex: '10 \\times 10 = 100', place: 'above', group: 'big' },
    { kind: 'region', id: 'fill', points: ['mb', 'mr', 'mt', 'ml'], tone: 'opp', shade: 0.3, group: 'block' },
    { kind: 'curve', id: 'edge', points: ['mb', 'mr', 'mt', 'ml'], closed: true, tone: 'opp', group: 'block' },
    { kind: 'line', id: 'h', from: 'mid', to: 'mr', tone: 'muted', dashed: true, group: 'corner' },
    { kind: 'line', id: 'v', from: 'mid', to: 'mt', tone: 'muted', dashed: true, group: 'corner' },
    { kind: 'label', id: 'area', at: 'ac', tex: '50', tone: 'opp', place: 'center', group: 'block' },
    { kind: 'line', id: 'diag', from: 'mr', to: 'mt', tone: 'opp', weight: 5, label: '5\\sqrt{2}', labelSide: 'right', group: 'answer' },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm202-4-1',
  lessonId: 'm202-4-1',
  title: 'Mixed and Entire Radicals, Part 1: Simplifying Radicals',
  thumbnailTitle: 'Simplifying Radicals',
  thumbnail: 'qb',
  summary: 'Why a quilt block with an area of 50 cm² has sides of exactly 5√2 cm, radicals and radicands, the property √(ab) = √a × √b, writing √48 as 4√3 with the largest perfect square, simplifying √72 with prime factors, and why √48 = 2√12 is not finished.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.1 · Part 1', title: 'Simplifying Radicals', subtitle: 'Exact lengths, written simply' }],
      lines: [
        { say: 'Amara is designing a square quilt block with an area of fifty square centimetres. Her calculator says each side is about 7.07 centimetres. But the exact length is the square root of fifty, or, more usefully, five root two.', show: 'title' },
        { say: 'In this video, you will learn to rewrite radicals like this one in simplest form.' },
      ],
    },
    {
      chapter: 'Amara’s quilt block',
      layout: 'split',
      leftWidth: 520,
      left: [figure('qb', [quilt()], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{area} = \\tfrac{1}{2}(100) = 50', '\\text{side} = \\sqrt{50} \\approx 7.07', '\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}'] }],
      lines: [
        { say: 'Here is one way to draw her block. Join the midpoints of the sides of a ten by ten square. The tilted square inside covers exactly half of it, so its area is fifty.', show: ['qb.big', 'qb.block', 'm.0'], focus: ['qb.block', 'm.0'] },
        { say: 'Its side must be the square root of fifty, about 7.07 centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'And each side is also the diagonal of a five by five square. Since fifty is twenty-five times two, root fifty is five root two: an exact length that is much easier to work with.', show: ['qb.corner', 'qb.answer', 'm.2'], focus: ['qb.diag', 'm.2'] },
      ],
    },
    {
      chapter: 'Radicals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Radical', md: 'A **radical** such as $\\sqrt{50}$ has a radical sign and a **radicand**, the number underneath. $\\sqrt{a}$ is the non-negative number whose square is $a$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1,\\ 4,\\ 9,\\ 16,\\ 25,\\ 36,\\ 49,\\ 64,\\ 81,\\ 100,\\ 121,\\ 144', '\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b} \\quad (a, b \\ge 0)', '\\sqrt{4 \\times 9} = \\sqrt{36} = 6,\\quad \\sqrt{4} \\times \\sqrt{9} = 2 \\times 3 = 6'] },
      ],
      lines: [
        { say: 'A radical, like root fifty, has a radical sign, and a radicand: the number underneath. The square root of a number is the non-negative number whose square is that number.', show: 'def' },
        { say: 'Perfect squares are the key to simplifying, so it is worth knowing these by heart, from one up to 144.', show: 'm.0', focus: 'm.0' },
        { say: 'And one property does all the work: the square root of a product is the product of the square roots, for non-negative numbers.', show: 'm.1', focus: 'm.1' },
        { say: 'Test it: root thirty-six is six, and root four times root nine is two times three, which is also six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Entire to mixed',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Entire and mixed radicals', md: 'An **entire radical**, like $\\sqrt{48}$, has nothing outside the radical sign. A **mixed radical**, like $4\\sqrt{3}$, has a number in front. It is in **simplest form** when the radicand has no perfect-square factor other than $1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{48} = \\sqrt{16 \\times 3} = \\sqrt{16} \\times \\sqrt{3} = 4\\sqrt{3}', '72 = 2 \\times 2 \\times 2 \\times 3 \\times 3', '\\sqrt{72} = 2 \\times 3\\sqrt{2} = 6\\sqrt{2}'] },
      ],
      lines: [
        { say: 'An entire radical has nothing outside the radical sign. A mixed radical has a number in front. It is in simplest form when the radicand has no perfect-square factor other than one.', show: 'def' },
        { say: 'To simplify root forty-eight, find the largest perfect square that divides it. Four and sixteen both divide forty-eight, and sixteen is larger. So root forty-eight is root sixteen times root three, which is four root three.', show: 'm.0', focus: 'm.0' },
        { say: 'If you cannot spot the perfect square, use prime factors. Seventy-two is two times two times two times three times three.', show: 'm.1', focus: 'm.1' },
        { say: 'Each pair of equal factors comes out once: one two, and one three. The unpaired two stays inside. So root seventy-two is six root two.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Stopping too early',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not using the largest perfect square', md: '$\\sqrt{48} = \\sqrt{4 \\times 12} = 2\\sqrt{12}$ is true, but $12$ still contains the perfect square $4$. Keep going: $2\\sqrt{12} = 2 \\times 2\\sqrt{3} = 4\\sqrt{3}$.' }],
      lines: [
        { say: 'Be careful not to stop too early. Root forty-eight equals two root twelve, but twelve still contains the perfect square four. Keep going: two root twelve is two times two root three, which is four root three.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\sqrt{98}$ as a mixed radical in simplest form.',
          choices: ['$7\\sqrt{2}$', '$2\\sqrt{7}$', '$49\\sqrt{2}$', '$\\sqrt{2}\\sqrt{49}$'],
          answer: 0,
          working: '$98 = 49 \\times 2$, so $\\sqrt{98} = \\sqrt{49} \\times \\sqrt{2} = 7\\sqrt{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write root ninety-eight as a mixed radical in simplest form. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ninety-eight is forty-nine times two, and forty-nine is a perfect square. So root ninety-eight is root forty-nine times root two, which is seven root two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$ for $a, b \\ge 0$.', 'Entire to mixed: take out the largest perfect-square factor.', 'Simplest form: no perfect-square factor left inside.'] }],
      lines: [
        { say: 'Let’s sum up. The square root of a product is the product of the square roots.', show: 'sum.0' },
        { say: 'To write an entire radical as a mixed radical, take out the largest perfect-square factor.', show: 'sum.1' },
        { say: 'And it is in simplest form when no perfect-square factor is left inside. In part two, we go the other way, from mixed to entire. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
