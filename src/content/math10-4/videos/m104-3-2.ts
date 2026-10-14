import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-3-2',
  lessonId: 'm104-3-2',
  title: 'Fractions, Decimals and Percents',
  thumbnailTitle: 'Percents',
  summary: 'Percent as "out of 100", changing between decimals and percents (6% is 0.06, not 0.6), fractions to percents by making an equal fraction out of 100 or by dividing, percents to fractions in lowest terms, and a quiz score as a percent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 3.2', title: 'Fractions, Decimals and Percents', subtitle: 'Three ways to show part of a whole' }],
      lines: [
        { say: 'A store sign says 25 percent off. Your safety quiz says eighteen out of twenty. A recipe uses three quarters of a cup. These are all ways to show part of a whole.', show: 'title' },
        { say: 'In this video, you will change between fractions, decimals and percents.' },
      ],
    },
    {
      chapter: 'Out of 100',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'table', id: 't', head: ['Fraction', 'Decimal', 'Percent'], rows: [['$\\tfrac12$', '$0.5$', '$50\\%$'], ['$\\tfrac14$', '$0.25$', '$25\\%$'], ['$\\tfrac34$', '$0.75$', '$75\\%$'], ['$\\tfrac15$', '$0.2$', '$20\\%$'], ['$\\tfrac{1}{10}$', '$0.1$', '$10\\%$']] }],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Percent', md: 'Percent means **out of 100**. So $45\\%$ means $\\tfrac{45}{100}$. The whole is always $100\\%$.' }],
      lines: [
        { say: 'Percent means out of 100. So 45 percent means 45 out of 100. The whole is always 100 percent. If twenty of 100 customers pay with cash, that is twenty percent.', show: 'def' },
        { say: 'Some fractions, decimals and percents come up again and again: one half is 0.5, or fifty percent; one quarter is 25 percent; three quarters is 75 percent. They are worth knowing by heart.', show: ['t.0', 't.1', 't.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'Decimals and percents',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['0.35 \\times 100 = 35\\%', '6\\% = 6 \\div 100 = 0.06'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '6% is not 0.6', md: '$0.6$ is $60\\%$. When a percent has one digit, put a zero right after the point: $6\\% = 0.06$.' },
      ],
      lines: [
        { say: 'To change a decimal to a percent, multiply by 100: the decimal point moves two places to the right. 0.35 is 35 percent.', show: 'm.0', focus: 'm.0' },
        { say: 'To change a percent to a decimal, divide by 100: the point moves two places to the left. Six percent is 0.06.', show: 'm.1', focus: 'm.1' },
        { say: 'Six percent is not 0.6, which is sixty percent. When a percent has only one digit, put a zero right after the decimal point.', show: 'oops' },
      ],
    },
    {
      chapter: 'Fractions and percents',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{3}{4} = \\tfrac{3 \\times 25}{4 \\times 25} = \\tfrac{75}{100} = 75\\%', '\\tfrac{3}{8} = 3 \\div 8 = 0.375 = 37.5\\%', '35\\% = \\tfrac{35}{100} = \\tfrac{7}{20}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Writing the digits as a percent', md: '$\\tfrac{3}{4}$ is **not** $34\\%$. Change the fraction to "out of 100" first.' },
      ],
      lines: [
        { say: 'To change a fraction to a percent, make an equal fraction out of 100 if you can. Four times 25 is 100, so three quarters is 75 out of 100: 75 percent.', show: 'm.0', focus: 'm.0' },
        { say: 'If the bottom does not go into 100, divide the top by the bottom, then multiply by 100. Three eighths is 0.375: 37.5 percent.', show: 'm.1', focus: 'm.1' },
        { say: 'To go back, write the percent over 100 and simplify. 35 percent is 35 over 100. Both divide by five: seven twentieths.', show: 'm.2', focus: 'm.2' },
        { say: 'And three quarters is not 34 percent. The digits of a fraction are not the percent.', show: 'oops' },
      ],
    },
    {
      chapter: 'A safety quiz',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['21 \\div 25 = 0.84 = 84\\%', '100\\% - 84\\% = 16\\%'] }],
      lines: [
        { say: 'Amara got 21 out of 25 questions right on a workplace safety quiz. Divide: 21 divided by 25 is 0.84, so she scored 84 percent.', show: 'm.0', focus: 'm.0' },
        { say: 'The whole quiz is 100 percent, so she got 100 minus 84: sixteen percent wrong.', show: 'm.1', focus: 'm.1' },
        { say: 'Percents make comparing easy. Seventeen out of twenty is 85 percent, so it beats a score of 82 percent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\dfrac{2}{5}$ as a percent.',
          choices: ['$40\\%$', '$25\\%$', '$2.5\\%$', '$20\\%$'],
          answer: 0,
          working: '$5 \\times 20 = 100$, so $\\dfrac{2}{5} = \\dfrac{40}{100} = 40\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write two fifths as a percent. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five times twenty is 100, so two fifths is forty out of 100: forty percent. B writes the digits as a percent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent means out of $100$.', 'Decimal to percent: $\\times 100$. Percent to decimal: $\\div 100$.', 'Fraction to percent: make it out of $100$, or divide and multiply by $100$.'] }],
      lines: [
        { say: 'Let’s sum up. Percent means out of 100, and the whole is 100 percent.', show: 'sum.0' },
        { say: 'To change a decimal to a percent, multiply by 100. To change a percent to a decimal, divide by 100.', show: 'sum.1' },
        { say: 'And to change a fraction to a percent, make it out of 100, or divide and multiply by 100. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
