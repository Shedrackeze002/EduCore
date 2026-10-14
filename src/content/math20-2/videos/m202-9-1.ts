import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-9-1',
  lessonId: 'm202-9-1',
  title: 'Planning a Research Project, Part 1: A Good Research Question',
  thumbnailTitle: 'A Good Research Question',
  thumbnail: 't',
  summary: 'What makes a research question focused, measurable, interesting and neutral, four kinds of weak questions, improving “How does sleep affect people?” into a question that data can answer, and narrowing a question that is too big.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 9.1 · Part 1', title: 'A Good Research Question', subtitle: 'Where every project starts' }],
      lines: [
        { say: 'Do students who sleep more get better marks? Has the wildfire season in Alberta changed over the past twenty years? A research project lets you answer a question you care about with real data.', show: 'title' },
        { say: 'A strong project starts with a good question. In this video, you will learn what makes a research question good, and how to fix a weak one.' },
      ],
    },
    {
      chapter: 'Four qualities',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Research question', md: 'A **research question** is the question your project sets out to answer.' },
        { kind: 'bullets', id: 'b', items: ['**Focused**: one clear relationship or change, in a specific group, place or time.', '**Measurable**: it can be answered by collecting and analyzing data.', '**Interesting**: the answer matters to you and to your audience.', '**Neutral**: its wording does not assume the answer.'] },
      ],
      lines: [
        { say: 'A research question is the question your project sets out to answer. A good one has four qualities.', show: 'def' },
        { say: 'It is focused: it is about one clear relationship or change, in a specific group, place or time.', show: 'b.0' },
        { say: 'It is measurable: you can answer it by collecting and analyzing data.', show: 'b.1' },
        { say: 'It is interesting: the answer matters to you and to your audience.', show: 'b.2' },
        { say: 'And it is neutral: the wording does not assume the answer.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Weak questions',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Weak question', 'Problem'], rows: [['How does sleep affect people?', 'too broad'], ['Is sleep important?', 'asks for an opinion'], ['How many hours of sleep do doctors recommend?', 'answered by a single fact'], ['Why do lazy students who stay up late get bad marks?', 'biased: assumes the answer']] }],
      lines: [
        { say: 'Here are four weak questions. How does sleep affect people? That is far too broad: no single data set could answer it.', show: 't.0', focus: 't.0' },
        { say: 'Is sleep important? That asks for an opinion, not data.', show: 't.1', focus: 't.1' },
        { say: 'How many hours of sleep do doctors recommend? You could look that up as a single fact, so there is nothing to analyze.', show: 't.2', focus: 't.2' },
        { say: 'And why do lazy students who stay up late get bad marks? The word lazy, and the claim about bad marks, assume the answer before any data is collected.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Improving a question',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Narrow the group, place and time: Grade 11 students at her school, on school nights.', 'Choose things you can measure: hours of sleep and average marks.', 'Ask about a relationship, with neutral wording.'] },
        { kind: 'callout', id: 'q', tone: 'key', title: 'Kiona’s research question', md: '“Is there a relationship between the hours of sleep Grade 11 students at our school get on school nights and their average marks?”' },
      ],
      lines: [
        { say: 'Kiona’s first idea is, how does sleep affect people? Let’s improve it in three steps. First, narrow the group, place and time: Grade 11 students at her school, on school nights.', show: 'b.0' },
        { say: 'Second, choose things that can be measured: hours of sleep, and average marks.', show: 'b.1' },
        { say: 'Third, ask about a relationship, with neutral wording.', show: 'b.2' },
        { say: 'Her new question: is there a relationship between the hours of sleep Grade 11 students at our school get on school nights, and their average marks? It is focused, measurable, interesting, and neutral.', show: 'q' },
      ],
    },
    {
      chapter: 'Too big',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A question that is too big', md: '“What makes hockey teams good?” could fill a book. Pick one measurable piece: “Is there a relationship between an NHL team’s average shots on goal per game and its number of wins in a season?”' }],
      lines: [
        { say: 'A common mistake is a question that is too big. What makes hockey teams good? That could fill a book.', show: 'oops' },
        { say: 'Pick one measurable piece instead: is there a relationship between an NHL team’s average shots on goal per game, and its number of wins in a season?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the best research question?',
          choices: ['Is there a relationship between daily screen time and hours of sleep for students in our grade?', 'Is screen time bad?', 'Why are phones ruining teenagers?', 'How many people own a phone?'],
          answer: 0,
          working: 'A is focused, measurable and neutral. B asks for an opinion, C assumes the answer, and D is answered by a single fact.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best research question? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. It is focused, measurable, and neutral. B asks for an opinion, C assumes the answer, and D is answered by a single fact.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A good question is focused, measurable, interesting and neutral.', 'Avoid questions that are too broad, ask for an opinion, need only one fact, or assume the answer.', 'Narrow a big question to one measurable relationship.'] }],
      lines: [
        { say: 'Let’s sum up. A good research question is focused, measurable, interesting, and neutral.', show: 'sum.0' },
        { say: 'Avoid questions that are too broad, ask for an opinion, need only one fact, or assume the answer.', show: 'sum.1' },
        { say: 'And narrow a big question down to one measurable relationship. In part two, we look at where the data comes from. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
