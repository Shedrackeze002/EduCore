import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-9-2-d',
  lessonId: 'm204-9-2',
  title: 'Analyzing Data, Part 4: Misleading Claims',
  thumbnailTitle: 'Misleading Claims',
  thumbnail: 'b',
  summary: 'Spotting misleading claims: small samples, biased samples, cherry-picked data, and a misleading average (nine workers at 18 dollars an hour and an owner at 220 dollars give a mean of 38.20 dollars but a median of 18 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.2 · Part 4', title: 'Misleading Claims', subtitle: 'Who, how many, what is missing?' }],
      lines: [
        { say: '“Four out of five people prefer our drink!” “The average worker here earns 38 dollars an hour!” Claims like these sound convincing. But are they?', show: 'title' },
        { say: 'In this video, you will learn the questions to ask about a claim.' },
      ],
    },
    {
      chapter: 'Ask three questions',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Small sample:** "4 out of 5 people prefer our drink!" when only $5$ people were asked.', '**Biased sample:** asking only people at a hockey game if the town needs a new arena.', '**Cherry-picking:** showing only the months when sales went up.'] }],
      lines: [
        { say: 'Claims can mislead too. Ask: who was asked, how many, and what was left out?', show: 'b' },
        { say: 'A small sample: four out of five people prefer our drink, when only five people were asked. Five people are too few to speak for everyone.', focus: 'b.0' },
        { say: 'A biased sample: asking only people at a hockey game whether the town needs a new arena. Of course they say yes. The people asked do not represent the whole town.', focus: 'b.1' },
        { say: 'Cherry-picking: showing only the months when sales went up, and leaving out the months when they went down. A whole year of data tells the real story, so ask to see all of it.', focus: 'b.2' },
      ],
    },
    {
      chapter: 'A misleading average',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Nine workers earn \\$18 an hour. The owner earns \\$220 an hour.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['9 \\times 18 + 220 = 382', '\\text{mean: } 382 \\div 10 = 38.20', '\\text{median: } 18'] },
      ],
      lines: [
        { say: 'Here is a misleading average. At a business, nine workers earn eighteen dollars an hour, and the owner earns 220 dollars an hour.', show: 'q' },
        { say: 'The total is nine times eighteen, plus 220: 382 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The mean is 382 divided by ten people: 38 dollars twenty. An ad could say the average worker earns 38 dollars an hour.', show: 'm.1', focus: 'm.1' },
        { say: 'But the median is eighteen dollars. Nine out of ten people earn eighteen. The owner is an outlier who pulls the mean way up.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Trusting “average”',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Trusting the word "average"', md: '"Average" usually means the mean. If there is an outlier, ask for the median too.' }],
      lines: [
        { say: 'A common mistake is to trust the word average. Average usually means the mean. If there might be an outlier, like the owner’s wage, ask for the median too.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A town wants to know if people want a new swimming pool. Which survey is **biased**?',
          choices: ['asking only people at the old pool', 'asking every 10th name on the voters’ list', 'asking 500 people at random', 'asking people at many different places in town'],
          answer: 0,
          working: 'People at the pool already swim, so they are likely to want a new one. The other surveys reach a fair mix of the town.',
        },
      ],
      lines: [
        { say: 'Your turn. A town wants to know if people want a new swimming pool. Which survey is biased? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. People at the old pool already swim, so they are likely to want a new pool. The other surveys reach a fair mix of people from the whole town.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Ask: who was asked, how many, and what was left out?', 'Watch for small, biased or cherry-picked data.', 'If there is an outlier, ask for the median.'] }],
      lines: [
        { say: 'Let’s sum up. Ask who was asked, how many, and what was left out.', show: 'sum.0' },
        { say: 'Watch for small samples, biased samples and cherry-picked data.', show: 'sum.1' },
        { say: 'And if there is an outlier, ask for the median, not just the average. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
