import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-9-1-d',
  lessonId: 'm202-9-1',
  title: 'Planning a Research Project, Part 4: From Plan to Presentation',
  thumbnailTitle: 'From Plan to Presentation',
  thumbnail: 'plan',
  summary: 'The five parts of a complete research plan (question, data, collection, analysis and presentation), a worked plan for how the first fall frost in Lethbridge has changed over 50 years, and stating a project’s limitations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 9.1 · Part 4', title: 'From Plan to Presentation', subtitle: 'Five questions before you start' }],
      lines: [
        { say: 'A good plan saves you from collecting the wrong data, or finding out too late that it cannot answer your question.', show: 'title' },
        { say: 'In this video, you will put a complete plan together, from the question all the way to the presentation.' },
      ],
    },
    {
      chapter: 'A complete plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Question:** What exactly am I trying to find out?', '**Data:** What data will answer it? Primary or secondary? Is the source reliable?', '**Collection:** How will I collect it fairly, and how much do I need?', '**Analysis:** Which tools: graphs, mean and standard deviation, z-scores, confidence intervals?', '**Presentation:** How will I share my findings, their limitations and my sources?'] }],
      lines: [
        { say: 'A complete plan answers five questions before you collect any data. First, the question: what exactly am I trying to find out?', show: 'b.0' },
        { say: 'Second, the data: what data will answer it? Is it primary or secondary, and is the source reliable?', show: 'b.1' },
        { say: 'Third, collection: how will I collect the data fairly, and how much do I need?', show: 'b.2' },
        { say: 'Fourth, analysis: which tools will I use? Graphs, the mean and standard deviation, z-scores, or confidence intervals, all from earlier in this course.', show: 'b.3' },
        { say: 'And fifth, presentation: how will I share my findings, their limitations, and my sources?', show: 'b.4' },
      ],
    },
    {
      chapter: 'A plan for first frost',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Part', 'Plan'], rows: [['Question', 'How has the date of the first fall frost in Lethbridge changed over the past 50 years?'], ['Data', 'The first fall frost date each year, from historical weather records published by Environment and Climate Change Canada (secondary)'], ['Analysis', 'Graph the date for each year; compare the mean and standard deviation of the first and last 25 years'], ['Presentation', 'A short talk with a graph, the conclusion, its limits (one city only), and a list of sources']] }],
      lines: [
        { say: 'Here is a plan for the question: how has the date of the first fall frost in Lethbridge changed over the past fifty years?', show: 't.0', focus: 't.0' },
        { say: 'The data: the first fall frost date in each year, from historical weather records published by Environment and Climate Change Canada. That is secondary data, from a reliable source.', show: 't.1', focus: 't.1' },
        { say: 'The analysis: graph the date for each year, and compare the mean and standard deviation of the first twenty-five years with the last twenty-five.', show: 't.2', focus: 't.2' },
        { say: 'And the presentation: a short talk with a graph, the conclusion, its limits, and a list of sources. The plan matches the data to the question, and chooses the tools before any data is collected.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'State the limits',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Every study has limits', md: 'Say what your data **cannot** show. The frost study covers one city, so it does not describe all of Alberta. A study that finds a relationship between sleep and marks does not prove that one causes the other.' }],
      lines: [
        { say: 'An honest presentation says what the data cannot show. The frost study covers one city, so it does not describe all of Alberta.', show: 'tip' },
        { say: 'And if Kiona finds a relationship between sleep and marks, that does not prove that more sleep causes better marks. Stating limits like these makes your conclusions more trustworthy, not less.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Jordan’s plan: “Question: Do students who play sports have higher average marks? Data: a survey of $50$ randomly chosen students at my school. Presentation: a poster.” Which part of the plan is missing?',
          choices: ['the analysis tools', 'the research question', 'how the data will be collected', 'the presentation'],
          answer: 0,
          working: 'The plan has a question, data and collection (a random survey) and a presentation, but it never says how the data will be analyzed, for example by comparing the mean marks of the two groups.',
        },
      ],
      lines: [
        { say: 'Your turn. Jordan’s plan has a question, do students who play sports have higher average marks? The data is a survey of fifty randomly chosen students at the school, and the presentation is a poster. Which part is missing? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, the analysis. Jordan never says how the data will be analyzed, for example by comparing the mean marks of the two groups.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Plan the question, data, collection, analysis and presentation first.', 'Match the data and tools to the question.', 'Present your findings with their limits and your sources.'] }],
      lines: [
        { say: 'Let’s sum up. Plan the question, data, collection, analysis, and presentation before you start.', show: 'sum.0' },
        { say: 'Match the data and the analysis tools to the question.', show: 'sum.1' },
        { say: 'And present your findings with their limits and your sources. Practise these skills in your lesson, and good luck with your project. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
