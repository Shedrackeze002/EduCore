import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-4-c',
  lessonId: 'm201-6-4',
  title: 'Rational Equations, Part 3: Work and Travel Problems',
  thumbnailTitle: 'Work and Travel Problems',
  thumbnail: 'm',
  summary: 'Work-together problems where rates add, 1/a + 1/b = 1/t, for two people clearing a rink and two pipes filling a tank, and a boat that travels 30 km downstream and 18 km upstream in the same time with a 3 km/h current.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.4 · Part 3', title: 'Work and Travel', subtitle: 'Rates add; time is distance over speed' }],
      lines: [
        { say: 'Back to the rink: Aisha takes four hours, and Mateo takes six. Working together, their rates add, and that turns the question into a rational equation.', show: 'title' },
        { say: 'In this video, you will solve work-together problems, and travel problems with a current.' },
      ],
    },
    {
      chapter: 'Working together',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{a} + \\dfrac{1}{b} = \\dfrac{1}{t}', '\\dfrac{1}{4} + \\dfrac{1}{6} = \\dfrac{1}{t},\\quad t \\ne 0', '\\times 12t:\\quad 3t + 2t = 12,\\ \\ t = 2.4', '2.4\\text{ h} = 2\\text{ h } 24\\text{ min}'] }],
      lines: [
        { say: 'If a worker finishes a job in "a" hours, they complete one over "a" of the job each hour. Working together, the rates add: one over "a", plus one over b, equals one over t, where t is the time together.', show: 'm.0', focus: 'm.0' },
        { say: 'For the rink, one quarter plus one sixth equals one over t.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply every term by twelve t: three t, plus two t, equals twelve. So five t is twelve, and t is 2.4.', show: 'm.2', focus: 'm.2' },
        { say: 'Together, they take 2.4 hours, which is two hours and twenty-four minutes. That is less than either of them alone, as it should be.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'One worker is slower',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{x} + \\dfrac{1}{x + 3} = \\dfrac{1}{2},\\quad x \\ne 0,\\ -3', '2(x + 3) + 2x = x(x + 3)', 'x^2 - x - 6 = (x - 3)(x + 2) = 0', 'x = 3 \\quad (\\text{reject } {-2})'] }],
      lines: [
        { say: 'In this example, pipe B takes three hours longer than pipe A to fill a stock tank, and together they fill it in two hours. How long does pipe A take alone? Let x be pipe A’s time. Then one over x, plus one over x plus three, equals one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply by two x, times x plus three: two times x plus three, plus two x, equals x times x plus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Collect the terms: x squared, minus x, minus six, equals zero, which factors as x minus three, times x plus two.', show: 'm.2', focus: 'm.2' },
        { say: 'So x is three, or negative two. A time cannot be negative, so pipe A takes three hours alone.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Travel with a current',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{time} = \\dfrac{\\text{distance}}{\\text{speed}}', '\\dfrac{30}{s + 3} = \\dfrac{18}{s - 3}', '30s - 90 = 18s + 54:\\quad s = 12', '\\tfrac{30}{15} = 2\\text{ h},\\quad \\tfrac{18}{9} = 2\\text{ h} \\;\\checkmark'] }],
      lines: [
        { say: 'Time equals distance divided by speed. A current adds to the speed going with it, and subtracts from the speed going against it.', show: 'm.0', focus: 'm.0' },
        { say: 'In this example, a boat travels thirty kilometres downstream, and eighteen kilometres upstream, in the same time, on a river with a current of three kilometres per hour. Let s be its speed in still water: s plus three downstream, and s minus three upstream.' },
        { say: 'The times are equal: thirty over s plus three, equals eighteen over s minus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Cross-multiply: thirty s minus ninety equals eighteen s plus fifty-four. So twelve s is 144, and s is twelve kilometres per hour.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: thirty over fifteen is two hours, and eighteen over nine is two hours.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Jo can paint a fence in $3$ h, and Sam in $6$ h. How long will they take together?',
          choices: ['$2$ h', '$4.5$ h', '$9$ h', '$1.5$ h'],
          answer: 0,
          working: '$\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{1}{2}$, so $\\dfrac{1}{t} = \\dfrac{1}{2}$ and $t = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Jo can paint a fence in three hours, and Sam in six. How long will they take together? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One third plus one sixth is one half, so one over t is one half, and t is two hours. B averages the times, and C adds them, but working together must take less time than either one alone.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Work: rates add, $\\dfrac{1}{a} + \\dfrac{1}{b} = \\dfrac{1}{t}$.', 'Travel: time is distance over speed; a current adds or subtracts.', 'Reject answers that make no sense, such as a negative time.'] }],
      lines: [
        { say: 'Let’s sum up. When people or machines work together, their rates add: one over "a", plus one over b, equals one over t.', show: 'sum.0' },
        { say: 'In travel problems, time is distance over speed, and a current adds or subtracts.', show: 'sum.1' },
        { say: 'And reject answers that make no sense, such as a negative time. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
