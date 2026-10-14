import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-9-1-b',
  lessonId: 'm202-9-1',
  title: 'Planning a Research Project, Part 2: Data, Sources and Fair Questions',
  thumbnailTitle: 'Data and Sources',
  thumbnail: 'm',
  summary: 'Primary data you collect yourself and secondary data collected by others, checking who collected a source, why, how and when, what bias is, and rewriting a leading survey question so it does not push people toward an answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 9.1 · Part 2', title: 'Data, Sources and Fair Questions', subtitle: 'Where your data comes from' }],
      lines: [
        { say: 'Your conclusions can only be as good as your data. So before you collect anything, decide where the data will come from, and whether you can trust it.', show: 'title' },
        { say: 'In this video, you will tell primary data from secondary data, check a source, and write survey questions that are fair.' },
      ],
    },
    {
      chapter: 'Primary and secondary data',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'p', tone: 'definition', title: 'Primary data', md: 'Data you collect **yourself**, for example with a survey, an experiment or your own measurements.' },
        { kind: 'callout', id: 's', tone: 'definition', title: 'Secondary data', md: 'Data collected by **someone else**, such as Statistics Canada, a government department, a sports league or another researcher.' },
      ],
      lines: [
        { say: 'Primary data is data you collect yourself, for example with a survey, an experiment, or your own measurements.', show: 'p' },
        { say: 'Secondary data was collected by someone else, such as Statistics Canada, a government department, a sports league, or another researcher.', show: 's' },
      ],
    },
    {
      chapter: 'Which kind of data?',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['You time $30$ classmates on a reaction-time test: **primary**.', 'You download census tables from Statistics Canada: **secondary**.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Using both', md: 'Secondary data can give the big picture over many years. Primary data can show what is happening at your own school or in your own community.' },
      ],
      lines: [
        { say: 'Classify each source. You time thirty classmates on a reaction-time test. You collected the times yourself, so that is primary data.', show: 'b.0' },
        { say: 'You download census tables from Statistics Canada. Someone else collected them, so that is secondary data, even though the source is trusted.', show: 'b.1' },
        { say: 'Many strong projects use both. Secondary data gives the big picture over many years, and primary data shows what is happening in your own school or community.', show: 'tip' },
      ],
    },
    {
      chapter: 'Can you trust the source?',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Who** collected it?', '**Why** did they collect it?', '**How** was it collected?', '**When** was it collected?'] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Usually reliable, and usually not', md: 'Official records, government agencies and peer-reviewed research are usually reliable. Advertisements, anonymous posts and opinion pieces are not.' },
      ],
      lines: [
        { say: 'Before you use secondary data, ask four questions. Who collected it? Why did they collect it? How was it collected? And when?', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'Official records, government agencies, and peer-reviewed research are usually reliable. Advertisements, anonymous posts, and opinion pieces are not: they may have been made to sell or persuade.', show: 'k' },
      ],
    },
    {
      chapter: 'Biased questions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Bias', md: '**Bias** is anything that pushes results away from the truth in one direction. A **biased question** leads people toward a particular answer.' },
        { kind: 'table', id: 't', head: ['', 'Survey question'], rows: [['Biased', 'Should the city **waste** millions of dollars on a new recreation centre?'], ['Fair', 'Do you support or oppose building a new recreation centre?']] },
      ],
      lines: [
        { say: 'Bias is anything that pushes results away from the truth in one direction. A biased question leads people toward a particular answer.', show: 'def' },
        { say: 'A survey asks: should the city waste millions of dollars on a new recreation centre? The word waste tells people what to think.', show: 't.0' },
        { say: 'Remove the loaded word, and give both sides equally: do you support or oppose building a new recreation centre?', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Leading questions',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Leading questions', md: 'Watch for loaded words (waste, lazy, beautiful, dangerous), openings like “Don’t you agree…”, and questions that tell people what others think (“Most students hate…”). Each one pushes people toward an answer.' }],
      lines: [
        { say: 'Watch for three kinds of leading question. Loaded words, like waste, lazy, beautiful or dangerous. Openings like, don’t you agree. And questions that tell people what others think, like, most students hate. Each one pushes people toward an answer.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which survey question is **not** biased?',
          choices: ['How many hours of homework do you do on a typical school night?', 'Don’t you agree that we get too much homework?', 'Most students think homework is useless. Do you?', 'Is the pointless homework load too heavy?'],
          answer: 0,
          working: 'A asks for a number without suggesting an answer. B opens with “Don’t you agree”, C tells people what others think, and D uses the loaded word “pointless”.',
        },
      ],
      lines: [
        { say: 'Your turn. Which survey question is not biased? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. It asks for a number without suggesting an answer. B opens with don’t you agree, C tells people what others think, and D uses the loaded word pointless.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Primary data: you collect it. Secondary data: someone else did.', 'Check who, why, how and when before you trust a source.', 'Fair questions use neutral words and give both sides.'] }],
      lines: [
        { say: 'Let’s sum up. Primary data is data you collect; secondary data was collected by someone else.', show: 'sum.0' },
        { say: 'Check who collected it, why, how, and when, before you trust a source.', show: 'sum.1' },
        { say: 'And fair questions use neutral words and give both sides. In part three, we choose a fair sample. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
