import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A garden w wide and w + 3 long, with its area written inside. */
function garden(): Part {
  const points: Record<string, P> = { a: [0, 0], b: [5, 0], c: [5, 3.5], d: [0, 3.5], m: [2.5, 1.75] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'bottom', from: 'a', to: 'b', tone: 'opp', weight: 3, label: 'w + 3', labelSide: 'right' },
    { kind: 'line', id: 'right', from: 'b', to: 'c', tone: 'adj', weight: 3, label: 'w', labelSide: 'right' },
    { kind: 'line', id: 'top', from: 'c', to: 'd', tone: 'muted' },
    { kind: 'line', id: 'left', from: 'd', to: 'a', tone: 'muted' },
    { kind: 'region', id: 'fill', points: ['a', 'b', 'c', 'd'], tone: 'good', shade: 0.15 },
    { kind: 'label', id: 'area', at: 'm', tex: '70\\text{ m}^2', place: 'center' },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm202-7-3',
  lessonId: 'm202-7-3',
  title: 'Solving Problems with Quadratic Equations, Part 1: A Plan for Problems',
  thumbnailTitle: 'Quadratic Word Problems',
  thumbnail: 'gd',
  summary: 'A five-step plan for problems that lead to quadratic equations, finding the dimensions of a 70 m² garden that is 3 m longer than it is wide, and rejecting a root that makes no sense in context.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 7.3 · Part 1', title: 'A Plan for Problems', subtitle: 'From words to a quadratic equation' }],
      lines: [
        { say: 'Quadratic equations turn up wherever areas, falling objects or profits are involved. Solving the equation is only part of the job.', show: 'title' },
        { say: 'In this video, you will follow a plan for word problems, and decide which roots make sense in the situation.' },
      ],
    },
    {
      chapter: 'A plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Define a variable, with units.', 'Write an equation that models the situation.', 'Rearrange into standard form, and solve.', 'Check each root in context; **reject** impossible ones.', 'Answer in a sentence, with units.'] }],
      lines: [
        { say: 'Here is a plan. First, define a variable, with units, so you know exactly what it stands for.', show: 'b.0' },
        { say: 'Second, write an equation that models the situation. Third, rearrange it into standard form, and solve it by factoring or with the quadratic formula.', show: ['b.1', 'b.2'] },
        { say: 'Fourth, check each root in context, and reject any that are impossible, such as a negative length or time.', show: 'b.3' },
        { say: 'And finally, answer the question in a sentence, with units.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Dimensions of a garden',
      layout: 'split',
      leftWidth: 480,
      left: [figure('gd', [garden()], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['w(w + 3) = 70', 'w^2 + 3w - 70 = 0', '(w + 10)(w - 7) = 0', 'w = -10 \\text{ or } w = 7', '7 \\times 10 = 70 \\;\\checkmark'] }],
      lines: [
        { say: 'A rectangular garden is three metres longer than it is wide, and its area is seventy square metres. Find its dimensions. Let the width be w metres. Then the length is w plus three metres.', show: ['gd.bottom', 'gd.right', 'gd.top', 'gd.left', 'gd.fill', 'gd.area'] },
        { say: 'Area is width times length, so w times w plus three equals seventy. In standard form: w squared, plus three w, minus seventy, equals zero.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Find a product of negative seventy and a sum of three: ten and negative seven. So w plus ten, times w minus seven, equals zero, and w is negative ten, or seven.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'A width cannot be negative, so reject negative ten. The garden is seven metres wide and ten metres long. Check: seven times ten is seventy.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Rejecting a root',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Two roots, one answer', md: 'The equation $w^2 + 3w - 70 = 0$ has two roots, but only one makes sense as a width. The algebra does not know that $w$ is a length; **you** do. Always check the roots against the situation.' }],
      lines: [
        { say: 'Notice what happened. The equation had two roots, but only one made sense as a width. The algebra does not know that w is a length; you do.', show: 'key' },
        { say: 'So always check each root against the situation. A negative length, time or number of people is a sign to reject a root, not a mistake in the algebra.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle is $4$ m longer than it is wide. Its area is $60\\ \\text{m}^2$. How wide is it?',
          choices: ['$6$ m', '$10$ m', '$-10$ m', '$15$ m'],
          answer: 0,
          working: '$w(w + 4) = 60$, so $w^2 + 4w - 60 = 0$ and $(w + 10)(w - 6) = 0$. Reject $w = -10$: the width is $6$ m (and the length $10$ m).',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle is four metres longer than it is wide, and its area is sixty square metres. How wide is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. w times w plus four is sixty, so w squared plus four w minus sixty is zero. That factors as w plus ten, times w minus six. Reject negative ten: the width is six metres. Ten metres is the length.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Define a variable, write an equation, rearrange and solve.', 'Check each root in context; reject impossible ones.', 'Answer the question in a sentence, with units.'] }],
      lines: [
        { say: 'Let’s sum up. Define a variable, write an equation, rearrange it into standard form, and solve.', show: 'sum.0' },
        { say: 'Check each root in context, and reject impossible ones.', show: 'sum.1' },
        { say: 'And answer the question in a sentence, with units. In part two, we solve projectile problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
