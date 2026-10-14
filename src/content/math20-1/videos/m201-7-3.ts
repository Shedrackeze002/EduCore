import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm201-7-3',
  lessonId: 'm201-7-3',
  title: 'Absolute Value Equations, Part 1: Two Cases',
  thumbnailTitle: 'Absolute Value Equations',
  thumbnail: 'nl',
  summary: 'Why |x − 3| = 5 has two solutions on a number line, solving |A| = b by splitting into A = b and A = −b, as in |2x − 3| = 7 and 3|x − 1| + 4 = 10, and why |x + 4| = −2 has no solution. Parts 2 and 3 cover extraneous solutions and quadratics.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.3 · Part 1', title: 'Absolute Value Equations', subtitle: 'Two cases' }],
      lines: [
        { say: 'Which numbers are exactly five units from three on a number line? There are two: eight, and negative two.', show: 'title' },
        { say: 'That is the equation, the absolute value of x minus three equals five, and it shows why absolute value equations usually have two solutions. In this video, you will solve them by splitting into two cases.' },
      ],
    },
    {
      chapter: 'Two cases',
      layout: 'center',
      main: [
        figure(
          'nl',
          [
            numberLine({
              min: -3,
              max: 9,
              step: 1,
              length: 15,
              points: [
                { id: 'c', value: 3, tex: '', tone: 'ink' },
                { id: 'a', value: -2, tex: '', tone: 'opp' },
                { id: 'b', value: 8, tex: '', tone: 'opp' },
              ],
              spans: [
                { id: 'sl', from: -2, to: 3, tone: 'adj', label: '5' },
                { id: 'sr', from: 3, to: 8, tone: 'adj', label: '5' },
              ],
            }),
          ],
          150,
        ),
        { kind: 'math', id: 'm', size: 'md', lines: ['|A| = b,\\ b \\ge 0:\\quad A = b \\text{ or } A = -b', '|x - 3| = 5:\\quad x - 3 = 5 \\text{ or } x - 3 = -5', 'x = 8 \\text{ or } x = -2'] },
      ],
      lines: [
        { say: 'The absolute value of x minus three is the distance between x and three. Five units from three, in each direction, are eight and negative two.', show: ['nl.axis', 'nl.c', 'nl.sl', 'nl.sr', 'nl.a', 'nl.b'], focus: ['nl.sl', 'nl.sr'] },
        { say: 'In general, if the absolute value of "A" equals b, and b is not negative, then "A" equals b, or "A" equals negative b. Solve both cases.', show: 'm.0', focus: 'm.0' },
        { say: 'Here, x minus three is five, so x is eight. Or x minus three is negative five, so x is negative two.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'A linear expression',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['|2x - 3| = 7', '2x - 3 = 7:\\quad 2x = 10,\\ x = 5', '2x - 3 = -7:\\quad 2x = -4,\\ x = -2', '|2(5) - 3| = 7,\\quad |2(-2) - 3| = |{-}7| = 7 \\;\\checkmark'] }],
      lines: [
        { say: 'Solve the absolute value of two x minus three equals seven. In case one, two x minus three is seven, so two x is ten, and x is five.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'In case two, two x minus three is negative seven, so two x is negative four, and x is negative two.', show: 'm.2', focus: 'm.2' },
        { say: 'Check both. The first gives the absolute value of seven, and the second the absolute value of negative seven. Both are seven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Isolate it first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3|x - 1| + 4 = 10', '|x - 1| = 2', 'x - 1 = 2:\\ x = 3;\\qquad x - 1 = -2:\\ x = -1'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A negative right side', md: '$|x + 4| = -2$ has **no solution**: an absolute value is never negative. Do not solve the two cases.' },
      ],
      lines: [
        { say: 'Isolate the absolute value before you split into cases. For three times the absolute value of x minus one, plus four, equals ten, subtract four, and divide by three: the absolute value of x minus one is two.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Then x minus one is two, so x is three. Or x minus one is negative two, so x is negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'And if the isolated absolute value equals a negative number, there is no solution. The absolute value of x plus four can never equal negative two.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $|x + 2| = 6$.',
          choices: ['$x = 4$ or $x = -8$', '$x = 4$', '$x = -4$ or $x = 8$', 'No solution'],
          answer: 0,
          working: '$x + 2 = 6$ gives $x = 4$, and $x + 2 = -6$ gives $x = -8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the absolute value of x plus two equals six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus two is six, so x is four. Or x plus two is negative six, so x is negative eight. B forgets the second case, and C gets both signs wrong.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$|A| = b$ with $b \\ge 0$: $A = b$ or $A = -b$.', 'Isolate the absolute value before splitting into cases.', 'If $b < 0$, there is no solution.'] }],
      lines: [
        { say: 'Let’s sum up. If the absolute value of "A" equals b, and b is not negative, then "A" equals b, or "A" equals negative b.', show: 'sum.0' },
        { say: 'Isolate the absolute value before you split into cases.', show: 'sum.1' },
        { say: 'And if the absolute value equals a negative number, there is no solution. In part two, we meet extraneous solutions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
