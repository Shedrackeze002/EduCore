import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm201-7-1',
  lessonId: 'm201-7-1',
  title: 'Absolute Value, Part 1: Distance from Zero',
  thumbnailTitle: 'Absolute Value',
  thumbnail: 'nl',
  summary: 'Absolute value as distance from zero on a number line, its two-case definition, evaluating |−7|, |3 − 10| and 3|−4| − |2 − 9| with the bars as grouping symbols, and why the bars cannot be split term by term. Part 2 measures distances and changes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.1 · Part 1', title: 'Absolute Value', subtitle: 'Distance from zero' }],
      lines: [
        { say: 'On a January morning in Fort McMurray, the temperature is negative twenty-three degrees Celsius, and by mid-afternoon it is four degrees. How big was the change? Questions about size ignore direction, and absolute value is the tool that does that.', show: 'title' },
        { say: 'In this video, you will see absolute value as a distance, and evaluate expressions that use it.' },
      ],
    },
    {
      chapter: 'Distance from zero',
      layout: 'center',
      main: [
        figure(
          'nl',
          [
            numberLine({
              min: -6,
              max: 6,
              step: 1,
              length: 14,
              points: [
                { id: 'n', value: -5, tex: '', tone: 'opp' },
                { id: 'p', value: 5, tex: '', tone: 'adj' },
              ],
              spans: [
                { id: 'sl', from: -5, to: 0, tone: 'opp', label: '5' },
                { id: 'sr', from: 0, to: 5, tone: 'adj', label: '5' },
              ],
            }),
          ],
          150,
        ),
        { kind: 'math', id: 'm', size: 'md', lines: ['|a| = \\begin{cases} a, & a \\ge 0 \\\\ -a, & a < 0 \\end{cases}', '|{-}5| = -(-5) = 5'] },
      ],
      lines: [
        { say: 'The absolute value of a real number "a", written between two vertical bars, is its distance from zero on a number line.', show: 'nl.axis' },
        { say: 'Negative five and five are both five units from zero, so both have an absolute value of five.', show: ['nl.n', 'nl.p', 'nl.sl', 'nl.sr'], focus: ['nl.sl', 'nl.sr'] },
        { say: 'Algebraically, the absolute value of "a" is "a" itself when "a" is zero or positive, and negative "a" when "a" is negative.', show: 'm.0', focus: 'm.0' },
        { say: 'In that second case, negative "a" is positive, because "a" is negative. The absolute value of negative five is negative, negative five, which is five.', show: 'm.1', focus: 'm.1' },
        { say: 'A distance is never negative, so an absolute value is never negative either.' },
      ],
    },
    {
      chapter: 'Evaluating',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['|{-}7| = 7', '|3 - 10| = |{-}7| = 7', '3|{-}4| - |2 - 9| = 3(4) - 7 = 5'] }],
      lines: [
        { say: 'Evaluate the absolute value of negative seven. Negative seven is seven units from zero, so its absolute value is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'For the absolute value of three minus ten, work inside the bars first. Three minus ten is negative seven, and its absolute value is seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Absolute value bars are grouping symbols, like brackets. Three times the absolute value of negative four, minus the absolute value of two minus nine, is three times four, minus seven, which is five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Splitting the bars',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['|3 - 10| = 7', '|3| - |10| = 3 - 10 = -7', '-|{-}6| = -6'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Splitting the bars', md: 'Simplify inside the bars as one group: $|3 - 10| \\ne |3| - |10|$. A minus sign **outside** the bars stays.' },
      ],
      lines: [
        { say: 'You cannot take the absolute value of each term separately. The absolute value of three minus ten is seven, but the absolute value of three, minus the absolute value of ten, is negative seven.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'And a negative sign outside the bars stays. Negative, the absolute value of negative six, is negative six.', show: ['m.2', 'oops'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $2|{-}5| - |1 - 4|$.',
          choices: ['$7$', '$13$', '$-13$', '$-7$'],
          answer: 0,
          working: '$2|{-}5| = 2(5) = 10$ and $|1 - 4| = |{-}3| = 3$, so the value is $10 - 3 = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate two times the absolute value of negative five, minus the absolute value of one minus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two times five is ten, and one minus four is negative three, whose absolute value is three. Ten minus three is seven. B splits the bars, and gets ten minus negative three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$|a|$ is the distance from $a$ to $0$, so it is never negative.', '$|a| = a$ when $a \\ge 0$, and $|a| = -a$ when $a < 0$.', 'Bars are grouping symbols: simplify inside them first.'] }],
      lines: [
        { say: 'Let’s sum up. The absolute value of a number is its distance from zero, so it is never negative.', show: 'sum.0' },
        { say: 'It is the number itself when the number is zero or positive, and its opposite when the number is negative.', show: 'sum.1' },
        { say: 'And the bars are grouping symbols: simplify inside them first. In part two, we measure distances and changes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
