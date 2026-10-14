import type { Explainer } from '@/video/script.ts';
import { ruler } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-8-1-b',
  lessonId: 'm204-8-1',
  title: 'Scale Drawings, Part 2: Measuring a Plan',
  thumbnailTitle: 'Measuring a Plan',
  thumbnail: 'rl',
  summary: 'Measuring a wall on a plan with a ruler (4.5 cm), using the scale 1 cm represents 2 m to find the real wall (9 m), and lining up the start of the object with the 0 mark.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.1 · Part 2', title: 'Measuring a Plan', subtitle: 'Ruler first, then scale' }],
      lines: [
        { say: 'Sometimes a plan does not show the lengths. Then you measure the drawing with a ruler, and use the scale.', show: 'title' },
        { say: 'In this video, you will measure a line on a plan, and find the real length.' },
      ],
    },
    {
      chapter: 'A wall on a garage plan',
      layout: 'center',
      main: [
        figure('rl', [ruler({ system: 'metric', length: 10, start: 0, end: 4.5, reading: '4.5\\text{ cm}' })]),
        { kind: 'text', id: 'q', md: 'On the plan, $1$ cm represents $2$ m.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['4.5 \\times 2 = 9 \\text{ m}'] },
      ],
      lines: [
        { say: 'Amara measures a wall on a garage plan. The bar shows the wall, lined up with the ruler.', show: ['rl.scale', 'rl.bar', 'rl.start', 'rl.end'] },
        { say: 'Read the ruler: the wall starts at zero and ends at 4.5 centimetres. So the wall is 4.5 centimetres on the plan.', show: 'rl.reading', focus: 'rl.reading' },
        { say: 'On the plan, one centimetre represents two metres.', show: 'q' },
        { say: 'Multiply: 4.5 times two is nine. The real wall is nine metres long.', show: 'm', focus: 'm' },
        { say: 'Check the size: the plan shows a wall a little longer than four centimetres, and four centimetres would be eight metres. Nine metres is just right.' },
      ],
    },
    {
      chapter: 'Start at zero',
      layout: 'center',
      main: [
        figure('rl2', [ruler({ name: 'x', system: 'metric', length: 10, start: 1, end: 5.5, startReading: '1', reading: '5.5' })]),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Start at zero', md: 'Line up the start of the object with the $0$ mark, not with the end of the ruler. If it starts somewhere else, subtract: $5.5 - 1 = 4.5$ cm.' },
      ],
      lines: [
        { say: 'A common mistake is to line up the object with the end of the ruler instead of the zero mark. Many rulers have a little space before zero, so every measurement comes out a little too long.', show: 'oops' },
        { say: 'If the object does not start at zero, subtract the start from the end. This wall starts at one and ends at 5.5, so it is 5.5 minus one: 4.5 centimetres, the same wall as before.', show: 'rl2' },
      ],
    },
    {
      chapter: 'Measure carefully',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Small errors grow', md: 'On this plan, every $1$ mm on the ruler is $0.2$ m in real life. A reading that is $1$ mm off makes the real wall $20$ cm off.' }],
      lines: [
        { say: 'Measure carefully, because the scale makes small errors bigger. On this plan, every millimetre on the ruler is 0.2 metres in real life. A reading that is one millimetre off makes the real wall twenty centimetres off. That is enough to make a cabinet not fit.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A line on a plan starts at the $2$ cm mark and ends at the $8.5$ cm mark. On the plan, $1$ cm represents $3$ m. How long is the real wall?',
          choices: ['$19.5$ m', '$25.5$ m', '$6.5$ m', '$31.5$ m'],
          answer: 0,
          working: 'Plan length: $8.5 - 2 = 6.5$ cm. Real: $6.5 \\times 3 = 19.5$ m. B uses only the end mark, C is the plan length, and D adds the marks.',
        },
      ],
      lines: [
        { say: 'Your turn. A line on a plan starts at the two centimetre mark and ends at the 8.5 centimetre mark. On the plan, one centimetre represents three metres. How long is the real wall? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The plan length is 8.5 minus two: 6.5 centimetres. Times three, that is 19.5 metres. B uses only the end mark, and C is the plan length, not the real length.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Measure the drawing with a ruler.', 'Start at 0, or subtract the start from the end.', 'Then multiply by the scale.'] }],
      lines: [
        { say: 'Let’s sum up. Measure the drawing with a ruler.', show: 'sum.0' },
        { say: 'Start at zero, or subtract the start from the end.', show: 'sum.1' },
        { say: 'Then multiply by the scale to get the real length. In part three, we use ratio scales. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
