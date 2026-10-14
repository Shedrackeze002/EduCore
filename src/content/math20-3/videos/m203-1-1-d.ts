import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm203-1-1-d',
  lessonId: 'm203-1-1',
  title: 'Slope, Part 4: Roof Pitch and Comparing Slopes',
  thumbnailTitle: 'Roof Pitch',
  thumbnail: 'p',
  summary: 'Roof pitch as the rise for every 12 units of run, finding the 6/12 pitch of a roof that rises 4 ft 6 in over 9 ft, the 105 in rise of a 7/12 roof over a 15 ft run, and comparing a pitch, a grade and a slope as decimals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.1 · Part 4', title: 'Roof Pitch', subtitle: 'Rise for every 12 of run' }],
      lines: [
        { say: 'Roofers have their own way to write slope. They call it the pitch, and they always compare the rise with a run of twelve.', show: 'title' },
        { say: 'In this video, you will find and use a roof pitch, and compare slopes written in different forms.' },
      ],
    },
    {
      chapter: 'Pitch',
      layout: 'split',
      leftWidth: 560,
      left: [figure('p', [triangle({ A: [0, 0], B: [12, 0], C: [12, 6], right: 'B', sides: { AB: '12\\text{ in}', BC: '6\\text{ in}' }, tones: { AB: 'adj', BC: 'opp', CA: 'brand' } })], 320)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Pitch', md: 'The **pitch** of a roof is the rise for every $12$ units of run. A **6/12 pitch** rises $6$ in for every $12$ in (one foot) of run, so its slope is $\\dfrac{6}{12} = \\dfrac{1}{2}$.' }],
      lines: [
        { say: 'Roofers give the pitch of a roof as the rise for every twelve units of run.', show: 'def' },
        { say: 'A six-in-twelve pitch rises six inches for every twelve inches, or one foot, of run. As a slope, that is six twelfths, or one half.', show: 'p.shape', focus: ['p.BC', 'p.AB'] },
      ],
    },
    {
      chapter: 'Measuring a pitch',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['4 \\text{ ft } 6 \\text{ in} = 4 \\times 12 + 6 = 54 \\text{ in}', '54 \\div 9 = 6 \\text{ in per foot of run}', '\\text{a } 6/12 \\text{ pitch}'] }],
      lines: [
        { say: 'A farmhouse roof rises four feet six inches over a horizontal run of nine feet. What is its pitch? Pitch is in inches per foot, so change the rise to inches: four times twelve, plus six, is fifty-four inches.', show: 'm.0', focus: 'm.0' },
        { say: 'Now find the rise for each foot of run: fifty-four divided by nine is six inches.', show: 'm.1', focus: 'm.1' },
        { say: 'The roof rises six inches for every twelve inches of run: a six-in-twelve pitch.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using a pitch',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['7/12:\\ 7 \\text{ in of rise per foot of run}', '15 \\times 7 = 105 \\text{ in}', '105 \\text{ in} = 8 \\text{ ft } 9 \\text{ in}'] }],
      lines: [
        { say: 'A house has a seven-in-twelve pitch, and each rafter covers a run of fifteen feet. How much does the roof rise? The roof rises seven inches for each foot of run.', show: 'm.0', focus: 'm.0' },
        { say: 'There are fifteen feet of run, so fifteen times seven is 105 inches.', show: 'm.1', focus: 'm.1' },
        { say: 'Change to feet and inches: 105 divided by twelve is eight, with nine left over. The roof rises eight feet nine inches.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Compare slopes as decimals',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Form', 'As a decimal'], rows: [['a 5/12 pitch', '$5 \\div 12 \\approx 0.417$'], ['a $40\\%$ grade', '$0.40$'], ['a slope of $\\dfrac{3}{8}$', '$0.375$']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'One form to compare', md: 'To compare slopes written in different forms, change each one to a decimal. The largest decimal is the steepest.' },
      ],
      lines: [
        { say: 'Which is steepest: a five-in-twelve roof, a forty percent grade, or a slope of three eighths? They are written in different forms, so change each one to a decimal. Five divided by twelve is about 0.417.', show: 't.0', focus: 't.0' },
        { say: 'A forty percent grade is 0.40.', show: 't.1', focus: 't.1' },
        { say: 'And three eighths is 0.375. The largest decimal is 0.417, so the roof is the steepest.', show: ['t.2', 'tip'], focus: 't.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is steepest: a $10\\%$ grade, a 2/12 pitch, or a slope of $\\dfrac{1}{8}$?',
          choices: ['the 2/12 pitch', 'the $10\\%$ grade', 'the slope of $\\dfrac{1}{8}$', 'They are all the same.'],
          answer: 0,
          working: 'As decimals: $0.10$, $2 \\div 12 \\approx 0.167$ and $1 \\div 8 = 0.125$. The 2/12 pitch has the largest slope.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is steepest: a ten percent grade, a two-in-twelve pitch, or a slope of one eighth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. As decimals, they are 0.10, about 0.167, and 0.125. The two-in-twelve pitch has the largest slope.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Pitch is the rise for every $12$ units of run.', 'A 6/12 pitch is a slope of $\\dfrac{1}{2}$.', 'To compare slopes, change them all to decimals.'] }],
      lines: [
        { say: 'Let’s sum up. Pitch is the rise for every twelve units of run.', show: 'sum.0' },
        { say: 'A six-in-twelve pitch is a slope of one half.', show: 'sum.1' },
        { say: 'And to compare slopes written in different forms, change them all to decimals. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
