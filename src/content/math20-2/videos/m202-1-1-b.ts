import type { Explainer } from '@/video/script.ts';
import type { DiagramItem } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A row of `k` toothpick squares starting at `ox`, with its figure number and toothpick count underneath. */
function row(name: string, k: number, ox: number): Part {
  const points: Record<string, P> = { [`${name}-c`]: [ox + k / 2, -0.15] };
  const items: DiagramItem[] = [];
  for (let i = 0; i <= k; i++) {
    points[`${name}-b${i}`] = [ox + i, 0];
    points[`${name}-t${i}`] = [ox + i, 1];
    items.push({ kind: 'line', id: `${name}-v${i}`, from: `${name}-b${i}`, to: `${name}-t${i}`, tone: 'opp', weight: 4, group: name });
    if (i < k) {
      items.push({ kind: 'line', id: `${name}-l${i}`, from: `${name}-b${i}`, to: `${name}-b${i + 1}`, tone: 'opp', weight: 4, group: name });
      items.push({ kind: 'line', id: `${name}-u${i}`, from: `${name}-t${i}`, to: `${name}-t${i + 1}`, tone: 'opp', weight: 4, group: name });
    }
  }
  items.push({ kind: 'label', id: `${name}-n`, at: `${name}-c`, tex: `\\text{Figure ${k}: } ${3 * k + 1}`, place: 'below', group: name });
  return { points, items };
}

const video: Explainer = {
  id: 'm202-1-1-b',
  lessonId: 'm202-1-1',
  title: 'Making Conjectures: Inductive Reasoning, Part 2: Patterns',
  thumbnailTitle: 'Number and Shape Patterns',
  thumbnail: 'tp',
  summary: 'Conjectures from number patterns such as 123 × 9 + 4 = 1111 and 37 × 3 = 111, the toothpick rule 3n + 1 for a row of squares, using it to predict Figure 25 and to find the figure with 100 toothpicks, and checking a rule on every figure.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 1.1 · Part 2', title: 'Number and Shape Patterns', subtitle: 'Predicting with a rule' }],
      lines: [
        { say: 'Patterns in calculations and in shapes often lead to surprising conjectures, and a good conjecture lets you predict the next case.', show: 'title' },
        { say: 'In this video, you will make conjectures from number patterns and geometric patterns, and use a rule to predict.' },
      ],
    },
    {
      chapter: 'Number patterns',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['1 \\times 9 + 2 = 11', '12 \\times 9 + 3 = 111', '123 \\times 9 + 4 = 1111', '1234 \\times 9 + 5 = 11\\,111 \\;\\checkmark'] }],
      lines: [
        { say: 'Look at how each line changes. One times nine, plus two, is eleven. Twelve times nine, plus three, is 111. And 123 times nine, plus four, is 1,111.', show: ['m.0', 'm.1', 'm.2'] },
        { say: 'Each line adds the next digit to the first number, and one more to the number being added. And each answer has one more one than the last.' },
        { say: 'So the conjecture predicts that 1,234 times nine, plus five, is 11,111. A calculator confirms it.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Predicting with a pattern',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['37 \\times 3 = 111,\\quad 37 \\times 6 = 222,\\quad 37 \\times 9 = 333', '37 \\times 3k = \\text{the digit } k \\text{ three times}', '37 \\times 24 = 37 \\times (3 \\times 8) = 888'] }],
      lines: [
        { say: 'Ama notices that thirty-seven times three is 111, thirty-seven times six is 222, and thirty-seven times nine is 333.', show: 'm.0', focus: 'm.0' },
        { say: 'The second number goes up by three each time, and each answer repeats one digit three times. Her conjecture: thirty-seven times three k is the digit k, written three times.', show: 'm.1', focus: 'm.1' },
        { say: 'Twenty-four is three times eight, so the prediction for thirty-seven times twenty-four is 888. A calculator agrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A geometric pattern',
      layout: 'center',
      main: [
        figure('tp', [row('f1', 1, 0), row('f2', 2, 2.5), row('f3', 3, 6)], 210),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Figure } n:\\ 3n + 1', '3(1) + 1 = 4,\\quad 3(2) + 1 = 7,\\quad 3(3) + 1 = 10'] },
      ],
      lines: [
        { say: 'These figures are made from toothpicks. Figure one uses four, Figure two uses seven, and Figure three uses ten.', show: ['tp.f1', 'tp.f2', 'tp.f3'] },
        { say: 'Each new square shares a side with the one before, so it adds only three toothpicks. That leads to a conjecture: Figure n uses three n, plus one, toothpicks.', show: 'm.0', focus: 'm.0' },
        { say: 'It fits all three figures: three times one, plus one, is four; three times two, plus one, is seven; and three times three, plus one, is ten.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Using the rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Figure } 25:\\quad 3(25) + 1 = 76', '3n + 1 = 100:\\quad 3n = 99,\\ \\ n = 33'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check your rule on every figure', md: 'A rule such as $4n$ fits Figure 1, with $4$ toothpicks, but not Figure 2: $8 \\ne 7$.' },
      ],
      lines: [
        { say: 'How many toothpicks does Figure twenty-five need? Three times twenty-five, plus one, is seventy-six.', show: 'm.0', focus: 'm.0' },
        { say: 'Which figure uses exactly 100 toothpicks? Solve three n plus one equals 100: three n is ninety-nine, so n is thirty-three.', show: 'm.1', focus: 'm.1' },
        { say: 'Always check your rule on every figure you can see. A rule like four n fits Figure one, but Figure two would need eight toothpicks, not seven.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Figure 1 has $5$ tiles, Figure 2 has $8$ and Figure 3 has $11$. Which rule fits?',
          choices: ['$3n + 2$', '$5n$', '$n + 4$', '$3n + 5$'],
          answer: 0,
          working: '$3(1) + 2 = 5$, $3(2) + 2 = 8$ and $3(3) + 2 = 11$. The other rules fit Figure 1 at most.',
        },
      ],
      lines: [
        { say: 'Your turn. Figure one has five tiles, Figure two has eight, and Figure three has eleven. Which rule fits? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Each figure adds three tiles, and three times one, plus two, is five. Then three n plus two gives eight and eleven. B and C fit Figure one, but not Figure two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Look at how each case changes from the one before.', 'Describe a pattern with a rule, such as $3n + 1$, to predict later cases.', 'Test the rule on every case you have.'] }],
      lines: [
        { say: 'Let’s sum up. To find a pattern, look at how each case changes from the one before.', show: 'sum.0' },
        { say: 'Describe the pattern with a rule, such as three n plus one, to predict later cases.', show: 'sum.1' },
        { say: 'And test the rule on every case you have before you use it. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
