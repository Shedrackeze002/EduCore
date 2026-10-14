import type { DiagramItem, Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A candidate's name to the left of their number line. */
function name(id: string, tex: string, at: P): Part {
  const points: Record<string, P> = { [id]: at };
  const items: DiagramItem[] = [{ kind: 'label', id, at: id, tex, place: 'left' }];
  return { points, items };
}

const video: Explainer = {
  id: 'm202-5-4-c',
  lessonId: 'm202-5-4',
  title: 'Confidence Intervals, Part 3: Making Decisions',
  thumbnailTitle: 'Making Decisions with Polls',
  thumbnail: 'rc',
  summary: 'Using the whole confidence interval to decide: whether a majority supports an arena (50.5% to 57.5%), why a 46% to 41% race with overlapping intervals is too close to call, and estimating that 9090 to 10 350 of 18 000 voters support the arena.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.4 · Part 3', title: 'Making Decisions', subtitle: 'Use the whole interval' }],
      lines: [
        { say: 'Should the town build the arena? Who is ahead in the race for mayor? A poll can answer questions like these, but only if you look at the whole confidence interval.', show: 'title' },
        { say: 'In this video, you will compare intervals with a target, and with each other, and estimate numbers of people.' },
      ],
    },
    {
      chapter: 'A majority?',
      layout: 'center',
      main: [
        figure('mj', [numberLine({ min: 45, max: 60, step: 1, every: 5, length: 15, points: [{ id: 't', value: 50, tex: '50\\%', tone: 'bad' }], spans: [{ id: 'ci', from: 50.5, to: 57.5, tone: 'adj', label: '50.5\\% \\text{ to } 57.5\\%' }] })], 160),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{every value in } 50.5\\% \\text{ to } 57.5\\% \\text{ is above } 50\\%'] },
      ],
      lines: [
        { say: 'Can the arena supporters be confident that a majority, more than fifty percent, of voters support the arena? Compare the whole interval with the target, not just the survey result.', show: ['mj.axis', 'mj.t'] },
        { say: 'The confidence interval is 50.5 to 57.5 percent, and every value in it is above fifty percent.', show: ['mj.ci', 'm.0'], focus: ['mj.ci', 'm.0'] },
        { say: 'So yes: we can be ninety-five percent confident that a majority supports the arena, though only just.' },
      ],
    },
    {
      chapter: 'A close race',
      layout: 'center',
      main: [
        figure('rc', [
          numberLine({ name: 't', min: 35, max: 52, step: 1, every: 5, length: 15, at: [0, 2.6], points: [{ id: 'r', value: 46, tex: '46\\%', tone: 'opp' }], spans: [{ id: 'ci', from: 42.5, to: 49.5, tone: 'opp' }] }),
          numberLine({ name: 'b', min: 35, max: 52, step: 1, every: 5, length: 15, at: [0, 0], points: [{ id: 'r', value: 41, tex: '41\\%', tone: 'adj' }], spans: [{ id: 'ci', from: 37.5, to: 44.5, tone: 'adj' }] }),
          name('nt', '\\text{Tran}', [-0.5, 2.6]),
          name('nb', '\\text{Bouchard}', [-0.5, 0]),
        ], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Tran: } 42.5\\% \\text{ to } 49.5\\%;\\quad \\text{Bouchard: } 37.5\\% \\text{ to } 44.5\\%', '\\text{overlap: } 42.5\\% \\text{ to } 44.5\\%'] },
      ],
      lines: [
        { say: 'In a poll for mayor, Tran has forty-six percent, and Bouchard has forty-one, each accurate to within 3.5 percentage points, nineteen times out of twenty. Can Tran be confident of being ahead?', show: ['rc.t-axis', 'rc.b-axis', 'rc.nt', 'rc.nb', 'rc.t-r', 'rc.b-r'] },
        { say: 'Tran’s interval is 42.5 to 49.5 percent, and Bouchard’s is 37.5 to 44.5 percent.', show: ['rc.t-ci', 'rc.b-ci', 'm.0'], focus: 'm.0' },
        { say: 'The intervals overlap, from 42.5 to 44.5 percent. So Bouchard could actually be ahead, and the race is too close to call, even though five points sounds like a big lead.', show: 'm.1', focus: ['rc.t-ci', 'rc.b-ci', 'm.1'] },
      ],
    },
    {
      chapter: 'Estimating a number of people',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['0.505 \\times 18\\,000 = 9090', '0.575 \\times 18\\,000 = 10\\,350', '9090 \\text{ to } 10\\,350 \\text{ voters, 19 times out of 20}'] }],
      lines: [
        { say: 'Suppose the town has 18,000 voters. Use the arena poll to estimate how many support the arena. Multiply each end of the interval by the number of voters.', show: 'm.0', focus: 'm.0' },
        { say: '0.505 times 18,000 is 9,090, and 0.575 times 18,000 is 10,350.', show: 'm.1', focus: 'm.1' },
        { say: 'So between about 9,090 and 10,350 voters support the arena, nineteen times out of twenty. An estimate from a poll is a range, not a single number.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A poll finds $52\\%$ support for a new bylaw, accurate to within $3$ percentage points, 19 times out of 20. Can supporters be confident of a majority?',
          choices: ['No: the interval includes values below $50\\%$.', 'Yes: $52\\%$ is more than $50\\%$.', 'Yes: the margin of error is small.', 'No: $52\\%$ is less than $95\\%$.'],
          answer: 0,
          working: 'The interval is $49\\%$ to $55\\%$. It includes values below $50\\%$, so a majority is not certain at this confidence level.',
        },
      ],
      lines: [
        { say: 'Your turn. A poll finds fifty-two percent support for a new bylaw, accurate to within three percentage points, nineteen times out of twenty. Can supporters be confident of a majority? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The interval is forty-nine to fifty-five percent. It includes values below fifty, so a majority is not certain.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Compare the whole interval with a target, such as $50\\%$.', 'Overlapping intervals: too close to call.', 'Multiply both ends of the interval to estimate a number of people.'] }],
      lines: [
        { say: 'Let’s sum up. To decide, compare the whole confidence interval with a target, such as fifty percent.', show: 'sum.0' },
        { say: 'When two intervals overlap, the result is too close to call.', show: 'sum.1' },
        { say: 'And multiply both ends of the interval by the population to estimate a number of people. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
