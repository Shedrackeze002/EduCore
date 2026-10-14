import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-4-b',
  lessonId: 'm204-1-4',
  title: 'Percent Problems, Part 2: What Percent?',
  thumbnailTitle: 'What Percent?',
  thumbnail: 'm',
  summary: 'Finding what percent one number is of another (part ÷ whole × 100): 18 out of 20 on a practice test is 90%, 37 of 52 staff is about 71%, and why the part goes first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.4 · Part 2', title: 'What Percent?', subtitle: 'Part over whole' }],
      lines: [
        { say: 'A test score, a team’s wins, the share of staff who did something: often you know two numbers, and want to say one as a percent of the other.', show: 'title' },
        { say: 'In this video, you will find what percent one number is of another.' },
      ],
    },
    {
      chapter: 'Part over whole',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['\\text{percent} = \\dfrac{\\text{part}}{\\text{whole}} \\times 100'] }],
      lines: [
        { say: 'To find what percent a part is of a whole, divide the part by the whole. Then multiply by 100.', show: 'f' },
        { say: 'The whole is the total, the number after the words “out of”, or “of all the”.' },
      ],
    },
    {
      chapter: 'A practice test',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$18$ out of $20$ on a practice test.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['18 \\div 20 = 0.9', '0.9 \\times 100 = 90\\%'] },
      ],
      lines: [
        { say: 'Sana got eighteen out of twenty on a practice test for her driver’s licence. What percent is that?', show: 'q' },
        { say: 'Part over whole: eighteen divided by twenty is 0.9.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply by 100: 0.9 times 100 is ninety. Sana scored ninety percent.', show: 'm.1', focus: 'm.1' },
        { say: 'You can also see it with fractions: eighteen twentieths is nine tenths, which is ninety hundredths, or ninety percent.' },
      ],
    },
    {
      chapter: 'Flu shots at work',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$37$ of the $52$ staff got a flu shot.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['37 \\div 52 \\approx 0.7115', '0.7115 \\times 100 \\approx 71\\%'] },
      ],
      lines: [
        { say: 'At a hotel, 37 of the 52 staff got a flu shot. What percent is that, to the nearest whole percent?', show: 'q' },
        { say: 'Part over whole: 37 divided by 52 is about 0.7115.', show: 'm.0', focus: 'm.0' },
        { say: 'Times 100 is about 71.15, which rounds to 71 percent. About 71 percent of the staff got a flu shot.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: 37 is a bit less than three quarters of 52, and 71 percent is a bit less than 75 percent. It makes sense.' },
      ],
    },
    {
      chapter: 'Dividing the wrong way',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: '$20 \\div 18$ gives about $111\\%$, which cannot be a test score. The **part** goes first: part $\\div$ whole.' }],
      lines: [
        { say: 'A common mistake is to divide the wrong way. Twenty divided by eighteen gives about 111 percent, which cannot be a test score. The part goes first: part divided by whole.', show: 'oops' },
        { say: 'If the part is smaller than the whole, the percent must be less than 100.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A hockey team won $14$ of its $20$ games. What percent of its games did it win?',
          choices: ['$70\\%$', '$143\\%$', '$14\\%$', '$30\\%$'],
          answer: 0,
          working: '$14 \\div 20 = 0.7$, and $0.7 \\times 100 = 70\\%$. B divides the wrong way, and D is the percent it did not win.',
        },
      ],
      lines: [
        { say: 'Your turn. A hockey team won fourteen of its twenty games. What percent of its games did it win? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fourteen divided by twenty is 0.7, and times 100, that is seventy percent. B divides the wrong way, and D is the percent it did not win.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent = part ÷ whole × 100.', 'The part goes first.', 'A part smaller than the whole is less than 100%.'] }],
      lines: [
        { say: 'Let’s sum up. To find what percent, divide the part by the whole, then multiply by 100.', show: 'sum.0' },
        { say: 'The part always goes first.', show: 'sum.1' },
        { say: 'And a part smaller than the whole gives a percent less than 100. In part three, we find percent increase and decrease. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
