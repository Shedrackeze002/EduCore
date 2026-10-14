import type { DiagramItem, Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

const A = [28, 30, 31, 29, 32];
const B = [22, 35, 30, 38, 25];

/** A route's name to the left of its number line. */
function name(id: string, tex: string, at: P): Part {
  const points: Record<string, P> = { [id]: at };
  const items: DiagramItem[] = [{ kind: 'label', id, at: id, tex, place: 'left' }];
  return { points, items };
}

const video: Explainer = {
  id: 'm202-5-1-c',
  lessonId: 'm202-5-1',
  title: 'Standard Deviation, Part 3: Comparing Consistency',
  thumbnailTitle: 'Comparing Consistency',
  thumbnail: 'rt',
  summary: 'Finding the standard deviation of Route B (about 6.0 min), comparing two bus routes with the same mean, why a smaller standard deviation means more consistent results, and why the mean and the range alone can mislead.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.1 · Part 3', title: 'Comparing Consistency', subtitle: 'Same mean, different spread' }],
      lines: [
        { say: 'Which bus route should you take to an exam? Both average thirty minutes. The standard deviation decides.', show: 'title' },
        { say: 'In this video, you will compare data sets, and use standard deviation to judge consistency.' },
      ],
    },
    {
      chapter: 'Route B',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['22,\\ 35,\\ 30,\\ 38,\\ 25:\\quad \\mu = \\dfrac{150}{5} = 30', 'x - \\mu:\\ \\ {-8},\\ 5,\\ 0,\\ 8,\\ {-5}', '64 + 25 + 0 + 64 + 25 = 178', '\\sigma = \\sqrt{\\dfrac{178}{5}} = \\sqrt{35.6} \\approx 5.97'] }],
      lines: [
        { say: 'Route B’s times were twenty-two, thirty-five, thirty, thirty-eight and twenty-five minutes. They add to 150, so the mean is also thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'The deviations are much bigger: negative eight, five, zero, eight and negative five.', show: 'm.1', focus: 'm.1' },
        { say: 'Their squares add to 178.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by five, and take the square root: sigma is about 5.97, or about six minutes.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Comparing the routes',
      layout: 'center',
      main: [
        figure('rt', [
          numberLine({ name: 'a', min: 20, max: 40, step: 1, every: 5, length: 14, at: [0, 2.2], points: A.map((v, i) => ({ id: `p${i}`, value: v, tex: '', tone: 'adj' as const })) }),
          numberLine({ name: 'b', min: 20, max: 40, step: 1, every: 5, length: 14, at: [0, 0], points: B.map((v, i) => ({ id: `p${i}`, value: v, tex: '', tone: 'opp' as const })) }),
          name('na', '\\text{Route A}', [-0.5, 2.2]),
          name('nb', '\\text{Route B}', [-0.5, 0]),
        ], 200),
        { kind: 'table', id: 't', head: ['Route', 'Mean', 'Standard deviation', 'What it tells you'], rows: [['A', '$30$ min', '$1.4$ min', 'trips are close to $30$ min'], ['B', '$30$ min', '$6.0$ min', 'trips vary a lot']] },
      ],
      lines: [
        { say: 'Both routes have a mean of thirty minutes. But Route A has a standard deviation of about 1.4 minutes, and Route B about six.', show: ['rt.a-axis', 'rt.na', 'rt.a-p0', 'rt.a-p1', 'rt.a-p2', 'rt.a-p3', 'rt.a-p4', 'rt.b-axis', 'rt.nb', 'rt.b-p0', 'rt.b-p1', 'rt.b-p2', 'rt.b-p3', 'rt.b-p4', 't'] },
        { say: 'A smaller standard deviation means the data is closer to the mean, so the results are more consistent. Route A’s trips are nearly always close to thirty minutes, while Route B’s vary a lot.', focus: 't.0' },
        { say: 'Here the ranges tell a similar story: four minutes for Route A, and sixteen minutes for Route B. But the standard deviation uses all five trips, not just the two extremes.' },
        { say: 'So to be on time for an exam, Route A is the safer choice.' },
      ],
    },
    {
      chapter: 'Mean versus spread',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mean versus spread', md: 'The mean gives the typical value; the standard deviation gives the spread. A player with a higher mean scores more, but the player with the **smaller** standard deviation is more consistent. Two data sets can have the same mean and range but different standard deviations.' }],
      lines: [
        { say: 'Keep the two ideas apart. The mean tells you the typical value, and the standard deviation tells you the spread. A basketball player with a higher mean scores more points per game, but the player with the smaller standard deviation is more consistent.', show: 'oops' },
        { say: 'And do not rely on the range alone. Two data sets can have the same mean and the same range, but different standard deviations, because the standard deviation uses every value.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two archers: Ana’s scores have a mean of $8.2$ and $\\sigma = 0.6$. Ben’s have a mean of $8.5$ and $\\sigma = 1.9$. Who is more consistent?',
          choices: ['Ana: her standard deviation is smaller.', 'Ben: his mean is higher.', 'Ben: his standard deviation is larger.', 'They are equally consistent.'],
          answer: 0,
          working: 'Consistency is about spread. Ana’s scores are typically $0.6$ points from her mean, and Ben’s about $1.9$. Ben scores more on average, but Ana is more consistent.',
        },
      ],
      lines: [
        { say: 'Your turn. Ana’s archery scores have a mean of 8.2, and a standard deviation of 0.6. Ben’s have a mean of 8.5, and a standard deviation of 1.9. Who is more consistent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Consistency is about spread, and Ana’s standard deviation is smaller. Ben scores a little more on average, but his scores vary much more.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A smaller standard deviation means more consistent data.', 'Compare means for the typical value, standard deviations for the spread.', 'The standard deviation uses every value; the range uses only two.'] }],
      lines: [
        { say: 'Let’s sum up. A smaller standard deviation means more consistent data.', show: 'sum.0' },
        { say: 'Compare means for the typical value, and standard deviations for the spread.', show: 'sum.1' },
        { say: 'And the standard deviation uses every value, while the range uses only two. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
