import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-8-2-d',
  lessonId: 'm203-8-2',
  title: 'Line Graphs and Choosing a Graph, Part 4: Choosing the Best Graph',
  thumbnailTitle: 'Choosing the Best Graph',
  thumbnail: 't',
  summary: 'Matching data to a graph: bar graphs for categories, circle graphs for parts of a whole, line graphs for change over time and histograms for numerical data in intervals, with drive times, farm spending, a calf’s mass and harvests.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.2 · Part 4', title: 'Choosing a Graph', subtitle: 'Match the graph to the data' }],
      lines: [
        { say: 'Bar graphs, circle graphs, line graphs and histograms each tell a different kind of story. Picking the right one makes data easy to read.', show: 'title' },
        { say: 'In this video, you will match each kind of data with the graph that suits it best.' },
      ],
    },
    {
      chapter: 'Four graphs',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Graph', 'Best for', 'Example'], rows: [['Bar graph', 'comparing separate categories', 'trucks of each brand in a fleet'], ['Circle graph', 'parts of one whole (percents add to 100%)', 'how a monthly budget is spent'], ['Line graph', 'change over time', 'a calf’s mass each week'], ['Histogram', 'numerical data in equal intervals', 'ages of customers: 10–19, 20–29, …']] }],
      lines: [
        { say: 'Each type of graph suits a different kind of data. A bar graph compares separate categories, such as the trucks of each brand in a fleet.', show: 't', focus: 't.0' },
        { say: 'A circle graph shows the parts of one whole, where the percents add to 100, such as how a monthly budget is spent.', focus: 't.1' },
        { say: 'A line graph shows change over time, such as a calf’s mass each week.', focus: 't.2' },
        { say: 'And a histogram shows numerical data grouped into equal intervals, such as the ages of customers.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Which graph?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Minutes each of $150$ workers drives to work, grouped as $0$–$9$, $10$–$19$, $20$–$29$, …', size: 'md' },
        { kind: 'bullets', id: 'b', items: ['The data are **numbers** (minutes), not categories.', 'They are grouped into **equal intervals**.', 'So a **histogram** is best.'] },
      ],
      lines: [
        { say: 'Harpreet recorded how many minutes each of 150 workers drives to work, and grouped the times as zero to nine, ten to nineteen, twenty to 29, and so on. Which graph is best?', show: 'q' },
        { say: 'The data are numbers, minutes, not categories.', show: 'b.0' },
        { say: 'And they are grouped into equal intervals.', show: 'b.1' },
        { say: 'A histogram shows how many values fall in each interval, so a histogram is best.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Three more',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Data', 'Best graph'], rows: [['A farm’s spending on feed, fuel, repairs and wages, as percents', 'Circle graph'], ['A calf’s mass each week for ten weeks', 'Line graph'], ['Bushels of wheat, canola, barley and oats harvested', 'Bar graph']] }],
      lines: [
        { say: 'Try three more. A farm’s spending on feed, fuel, repairs and wages, as percents of the total: those are parts of one whole, so a circle graph.', show: 't', focus: 't.0' },
        { say: 'A calf’s mass each week for ten weeks: that is change over time, so a line graph.', focus: 't.1' },
        { say: 'The bushels of wheat, canola, barley and oats harvested: those are separate categories to compare, so a bar graph.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Two questions',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Two questions to ask', md: '**Categories or numbers?** Categories suit a bar or circle graph; numbers in intervals suit a histogram.\n\n**Over time, or parts of a whole?** Change over time suits a line graph; parts of one whole suit a circle graph.' }],
      lines: [
        { say: 'Two questions sort out most choices. First: are the data categories, or numbers? Categories suit a bar graph or a circle graph, and numbers grouped into intervals suit a histogram.', show: 'key' },
        { say: 'Second: does the data change over time, or is it the parts of one whole? Change over time suits a line graph, and parts of a whole suit a circle graph.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ty recorded the depth of the water in a dugout on the first day of every month for a year. Which graph best shows how the depth changed?',
          choices: ['a line graph', 'a circle graph', 'a histogram', 'none of these'],
          answer: 0,
          working: 'The depth changes over time, so a line graph is best. A circle graph is for parts of one whole.',
        },
      ],
      lines: [
        { say: 'Your turn. Ty recorded the depth of the water in a dugout on the first day of every month for a year. Which graph best shows how the depth changed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The depth changes over time, so a line graph is best. A circle graph is for the parts of one whole.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Bar graph: separate categories. Circle graph: parts of one whole.', 'Line graph: change over time.', 'Histogram: numerical data in equal intervals.'] }],
      lines: [
        { say: 'Let’s sum up. A bar graph compares separate categories, and a circle graph shows the parts of one whole.', show: 'sum.0' },
        { say: 'A line graph shows change over time.', show: 'sum.1' },
        { say: 'And a histogram shows numerical data in equal intervals. In part five, we spot graphs that tell a misleading story. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
