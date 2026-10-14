import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-5-2-c',
  lessonId: 'm204-5-2',
  title: 'Solving Equations, Part 3: Using a Formula Backwards',
  thumbnailTitle: 'Formulas Backwards',
  thumbnail: 'm',
  summary: 'Substituting what you know into a formula, then solving for the missing value: the hours worked from E = rh (35 hours), the distance of a taxi ride from C = 4 + 2.5d (11 km), and Fahrenheit to Celsius from F = 1.8C + 32 (50°F is 10°C).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.2 · Part 3', title: 'Using a Formula Backwards', subtitle: 'Find the missing input' }],
      lines: [
        { say: 'Sometimes you know the answer of a formula, but not one of its inputs. You know the pay, but not the hours. You know the fare, but not the distance.', show: 'title' },
        { say: 'In this video, you will substitute what you know into a formula, then solve for the missing value.' },
      ],
    },
    {
      chapter: 'How many hours?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Use $E = rh$. You earned \\$612.50 at \\$17.50 per hour.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['612.50 = 17.50h', 'h = 612.50 \\div 17.50', 'h = 35'] },
      ],
      lines: [
        { say: 'Use E equals r h. You earned 612 dollars fifty, at seventeen dollars fifty per hour. How many hours did you work?', show: 'q' },
        { say: 'Substitute what you know: E is 612.50, and r is 17.50. So 612.50 equals 17.50 h.', show: 'm.0', focus: 'm.0' },
        { say: 'h is multiplied by 17.50, so divide both sides by 17.50.', show: 'm.1', focus: 'm.1' },
        { say: '612.50 divided by 17.50 is 35. You worked 35 hours. Check: 35 times 17.50 is 612.50.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How far was the taxi ride?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A taxi charges $C = 4 + 2.5d$. A ride cost \\$31.50.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['31.50 = 4 + 2.5d', '27.50 = 2.5d', 'd = 11'] },
      ],
      lines: [
        { say: 'In this example, a taxi charges C equals four plus 2.5 d. A ride cost 31 dollars fifty. How many kilometres was the ride?', show: 'q' },
        { say: 'Substitute C equals 31.50: 31.50 equals four plus 2.5 d. This is a two-step equation.', show: 'm.0', focus: 'm.0' },
        { say: 'Undo the adding first: subtract four from both sides. 27.50 equals 2.5 d.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide both sides by 2.5: d equals eleven. The ride was eleven kilometres. Check: four plus 2.5 times eleven is 31.50.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Fahrenheit to Celsius',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Use $F = 1.8C + 32$. A website says it is $50^\\circ\\text{F}$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['50 = 1.8C + 32', '18 = 1.8C', 'C = 10'] },
      ],
      lines: [
        { say: 'The temperature formula works backwards too. A website says it is fifty degrees Fahrenheit. What is that in degrees Celsius?', show: 'q' },
        { say: 'Substitute F equals fifty: fifty equals 1.8 C plus 32.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract 32 from both sides: eighteen equals 1.8 C.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by 1.8: C equals ten. It is ten degrees Celsius, a cool spring day. Check: 1.8 times ten, plus 32, is fifty.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $E = rh$. Jada earned \\$504.00 at \\$16.80 per hour. How many hours did Jada work?',
          choices: ['$30$ hours', '$8{,}467.20$ hours', '$487.20$ hours', '$3$ hours'],
          answer: 0,
          working: '$504.00 = 16.80h$, so $h = 504.00 \\div 16.80 = 30$. B multiplies instead of dividing, and C subtracts.',
        },
      ],
      lines: [
        { say: 'Your turn. Use E equals r h. Jada earned 504 dollars at sixteen dollars eighty per hour. How many hours did Jada work? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 504 equals 16.80 h, so h is 504 divided by 16.80: thirty hours. B multiplies instead of dividing, and C subtracts. Neither one makes sense for a work week.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Substitute everything you know.', 'Solve for the missing letter.', 'Two-step formulas: undo adding first.'] }],
      lines: [
        { say: 'Let’s sum up. To use a formula backwards, substitute everything you know.', show: 'sum.0' },
        { say: 'Then solve for the missing letter with inverse operations.', show: 'sum.1' },
        { say: 'And for a two-step formula, undo the adding or subtracting first. In part four, we check our answers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
