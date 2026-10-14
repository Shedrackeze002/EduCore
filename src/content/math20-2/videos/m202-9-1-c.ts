import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-9-1-c',
  lessonId: 'm202-9-1',
  title: 'Planning a Research Project, Part 3: Fair Samples',
  thumbnailTitle: 'Fair Samples',
  thumbnail: 't',
  summary: 'Populations and samples, why a random sample gives every member the same chance, four kinds of bias (sampling, response, non-response and measurement), and choosing a fair sample to study homework hours at a large Calgary high school.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 9.1 · Part 3', title: 'Fair Samples', subtitle: 'Who do you ask?' }],
      lines: [
        { say: 'You cannot ask every student in Alberta how much they sleep. So researchers ask some of them, and the choice of who to ask can make or break a study.', show: 'title' },
        { say: 'In this video, you will learn what makes a sample fair, and spot four kinds of bias.' },
      ],
    },
    {
      chapter: 'Populations and samples',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['The **population** is the whole group you want to learn about.', 'A **sample** is the part of the population you actually survey.', 'In a **random sample**, every member of the population has the same chance of being chosen.'] },
      ],
      lines: [
        { say: 'The population is the whole group you want to learn about, such as all the students at your school.', show: 'b.0' },
        { say: 'A sample is the part of the population you actually survey. Results from the sample are used to describe the whole population, so the sample needs to look like the population.', show: 'b.1' },
        { say: 'In a random sample, every member of the population has the same chance of being chosen. So a random sample is likely to represent the population fairly.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Four kinds of bias',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Type of bias', 'What goes wrong', 'Example'], rows: [['sampling bias', 'the sample does not represent the population', 'surveying only the basketball team about student heights'], ['response bias', 'people give answers that are not accurate', 'asking about cheating out loud in front of the class'], ['non-response bias', 'many people chosen do not respond', 'only $60$ of $900$ students answer an email survey'], ['measurement bias', 'the tool or method gives wrong values', 'a scale that always reads $20$ g too high']] }],
      lines: [
        { say: 'Here are four kinds of bias. Sampling bias: the sample does not represent the population, like surveying only the basketball team about student heights.', show: 't.0', focus: 't.0' },
        { say: 'Response bias: people give answers that are not accurate, like being asked about cheating out loud in front of the class.', show: 't.1', focus: 't.1' },
        { say: 'Non-response bias: many of the people chosen do not respond. If only sixty of 900 students answer an email survey, those sixty may not be typical.', show: 't.2', focus: 't.2' },
        { say: 'And measurement bias: the tool or method gives wrong values, like a scale that always reads twenty grams too high.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Choosing a sample',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Her own math class: only one group of students.', 'An online survey on the school website: only students who choose to answer.', '$60$ students chosen at random from the list of all students: every student has the same chance.'] },
      ],
      lines: [
        { say: 'Talia wants to know how many hours of homework the students at her large Calgary high school do each week. Which sample is fair? Her own math class represents only one group of students, who may all take the same courses.', show: 'b.0' },
        { say: 'An online survey on the school website includes only the students who choose to answer, and they may be the ones with the strongest feelings about homework.', show: 'b.1' },
        { say: 'Sixty students chosen at random from the school’s list of all students gives every student the same chance. That is the fair choice.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'To learn how Albertans feel about a new park, a researcher surveys only people walking in the park. What kind of bias is this?',
          choices: ['sampling bias', 'measurement bias', 'non-response bias', 'There is no bias.'],
          answer: 0,
          working: 'People already using the park are not typical of all Albertans, so the sample does not represent the population.',
        },
      ],
      lines: [
        { say: 'Your turn. To learn how Albertans feel about a new park, a researcher surveys only people walking in the park. What kind of bias is this? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, sampling bias. People already using the park are not typical of all Albertans, so the sample does not represent the population.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A sample should represent the population.', 'A random sample gives every member the same chance.', 'Watch for sampling, response, non-response and measurement bias.'] }],
      lines: [
        { say: 'Let’s sum up. A sample should represent the population you want to learn about.', show: 'sum.0' },
        { say: 'A random sample gives every member of the population the same chance of being chosen.', show: 'sum.1' },
        { say: 'And watch for sampling, response, non-response, and measurement bias. In part four, we put the whole plan together. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
