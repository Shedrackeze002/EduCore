import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-5-3-b',
  lessonId: 'm202-5-3',
  title: 'Z-Scores, Part 2: Comparing Results',
  thumbnailTitle: 'Comparing Results with Z-Scores',
  thumbnail: 'm',
  summary: 'Using z-scores to compare Maya’s chemistry and English marks, why raw marks and points above the mean can mislead, and comparing race times, where a lower value is better.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.3 · Part 2', title: 'Comparing Results', subtitle: 'Different scales, one yardstick' }],
      lines: [
        { say: 'Results measured on different scales are hard to compare. Z-scores put them all on the same scale: standard deviations from the mean.', show: 'title' },
        { say: 'In this video, you will compare exam marks, and race times, with z-scores.' },
      ],
    },
    {
      chapter: 'Chemistry or English?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Exam', 'Maya', 'Mean', 'Standard deviation'], rows: [['Chemistry', '$78$', '$70$', '$5$'], ['English', '$84$', '$76$', '$8$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Chemistry: } z = \\dfrac{78 - 70}{5} = 1.6', '\\text{English: } z = \\dfrac{84 - 76}{8} = 1'] },
      ],
      lines: [
        { say: 'On the chemistry exam, Maya scored seventy-eight, and the marks had a mean of seventy and a standard deviation of five. On the English exam, she scored eighty-four, and the marks had a mean of seventy-six and a standard deviation of eight.', show: 't' },
        { say: 'Chemistry: seventy-eight minus seventy is eight, and eight over five is 1.6.', show: 'm.0', focus: 'm.0' },
        { say: 'English: eighty-four minus seventy-six is also eight, but eight over eight is only one.', show: 'm.1', focus: 'm.1' },
        { say: 'So compared with her classmates, Maya did better in chemistry: 1.6 standard deviations above the mean, against one in English.', focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Comparing raw marks',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Comparing raw marks', md: 'Maya’s English mark is higher, and both marks are $8$ points above their means. Neither fact settles it. The chemistry marks were less spread out, so $8$ points above the mean was rarer in chemistry. Compare z-scores.' }],
      lines: [
        { say: 'It is tempting to say English, because eighty-four is higher. Or to call it a tie, because both marks are eight points above the mean. Neither is right.', show: 'oops' },
        { say: 'The chemistry marks were less spread out, so eight points above the mean was a rarer result in chemistry. Z-scores take the spread into account.' },
      ],
    },
    {
      chapter: 'When lower is better',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['100\\text{ m: } z = \\dfrac{12.1 - 12.8}{0.5} = -1.4', '200\\text{ m: } z = \\dfrac{25.6 - 26.5}{0.6} = -1.5', '-1.5 < -1.4:\\ \\text{the } 200\\text{ m was better}'] }],
      lines: [
        { say: 'Usually the greater z-score is the better result. But for race times, lower is better. A sprinter ran the 100 metres in 12.1 seconds, where the mean was 12.8 and the standard deviation 0.5.', show: 'm.0', focus: 'm.0' },
        { say: 'She ran the 200 metres in 25.6 seconds, where the mean was 26.5 and the standard deviation 0.6. Her z-scores are negative 1.4, and negative 1.5.', show: 'm.1', focus: 'm.1' },
        { say: 'The 200 metre time is further below the mean, so it was her better race.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which result is better compared with the others: $82$ on a test with $\\mu = 70$, $\\sigma = 6$, or $90$ on a test with $\\mu = 80$, $\\sigma = 8$?',
          choices: ['$82$, with $z = 2$', '$90$, with $z = 1.25$', '$90$, because it is higher', 'They are equal.'],
          answer: 0,
          working: '$\\dfrac{82 - 70}{6} = 2$ and $\\dfrac{90 - 80}{8} = 1.25$. The $82$ is further above its mean.',
        },
      ],
      lines: [
        { say: 'Your turn. Which result is better compared with the others: eighty-two on a test with a mean of seventy and a standard deviation of six, or ninety on a test with a mean of eighty and a standard deviation of eight? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eighty-two has a z-score of twelve over six, which is two. Ninety has ten over eight, which is 1.25. The eighty-two is further above its mean.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Compare results from different distributions with z-scores.', 'The greater z-score is the better result, unless lower is better.', 'Raw scores ignore the spread.'] }],
      lines: [
        { say: 'Let’s sum up. Compare results from different distributions with z-scores, not raw scores.', show: 'sum.0' },
        { say: 'The greater z-score is the better result, unless lower values are better, as with race times.', show: 'sum.1' },
        { say: 'And remember that raw scores ignore the spread. In part three, we use z-scores to find areas under the curve. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
