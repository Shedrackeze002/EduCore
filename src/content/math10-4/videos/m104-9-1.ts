import type { Explainer } from '@/video/script.ts';
import { barGraph, tally } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-9-1',
  lessonId: 'm104-9-1',
  title: 'Data and Graphs, Part 1: Tallies and Bar Graphs',
  thumbnailTitle: 'Tallies and Bar Graphs',
  thumbnail: 'bg',
  summary: 'Counting a tally by fives (how warehouse staff get to work), reading a food truck’s bar graph, including a bar that stops half way between grid lines, finding how many more, and checking the scale before reading a bar. Part 2 covers circle graphs and fair surveys.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 9.1 · Part 1', title: 'Tallies and Bar Graphs', subtitle: 'Count it, then show it' }],
      lines: [
        { say: 'A coffee shop manager wants to know which drinks sell best. A coach wants to know which drills the team likes. They both collect data, and put it in a chart or a graph, so the answer is easy to see.', show: 'title' },
        { say: 'In this video, you will count a tally, and read a bar graph.' },
      ],
    },
    {
      chapter: 'Tally charts',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('tal', [
          tally({ name: 'car', count: 12, at: [0, 4], label: 'Car' }),
          tally({ name: 'bus', count: 8, at: [0, 2.2], label: 'Bus' }),
          tally({ name: 'bike', count: 3, at: [0, 0.4], label: 'Bike' }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Data and tally', md: '**Data** is information you collect, such as counts or measurements. A **tally** makes one mark for each person or thing, and every fifth mark goes across the four before it.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Car: } 5 + 5 + 2 = 12', '\\text{Bus: } 5 + 3 = 8', '12 + 8 + 3 = 23'] },
      ],
      lines: [
        { say: 'Data is information you collect, such as counts or measurements. A tally is a quick way to count: you make one mark for each person or thing.', show: 'def' },
        { say: 'Every fifth mark goes across the four marks before it. That makes bundles of five, so you can count by fives.' },
        { say: 'A warehouse asked its staff how they get to work. Here are the tallies.', show: 'tal' },
        { say: 'Car: two bundles of five, and two more. Five plus five plus two is twelve.', show: 'm.0', focus: ['tal.car-t0', 'tal.car-t1', 'tal.car-t2', 'm.0'] },
        { say: 'Bus: one bundle of five, and three more, so eight. And bike: three.', show: 'm.1', focus: ['tal.bus-t0', 'tal.bus-t1', 'tal.bike-t0', 'm.1'] },
        { say: 'Add the rows: twelve plus eight plus three. So 23 staff answered the question.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Bar graphs',
      layout: 'split',
      leftWidth: 640,
      left: [figure('bg', [barGraph({ categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], values: [25, 40, 35, 50, 65], max: 70, step: 10, titles: { x: 'Day', y: 'Lunches sold' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Bar graph', md: 'Bars compare groups. The height of each bar shows how many. The numbers on the side are the **scale**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Wed: } 35', '65 - 40 = 25'] },
      ],
      lines: [
        { say: 'A bar graph uses bars to compare groups. The height of each bar shows how many, and the numbers on the side are the scale.', show: 'def' },
        { say: 'This bar graph shows the lunches a food truck in Edmonton sold each day. The scale goes up by ten.', show: ['bg.scale', 'bg.b0', 'bg.b1', 'bg.b2', 'bg.b3', 'bg.b4'], focus: 'bg.scale' },
        { say: 'Look at Wednesday. The bar stops halfway between thirty and forty, so Wednesday’s value is 35.', show: ['bg.r2', 'm.0'], focus: ['bg.b2', 'm.0'] },
        { say: 'How many more lunches did the truck sell on Friday than on Tuesday? Friday’s bar reaches 65: halfway between sixty and seventy. Tuesday’s bar reaches forty.', show: ['bg.r4', 'bg.r1'], focus: ['bg.b4', 'bg.b1'] },
        { say: 'Subtract: 65 minus forty is 25. The truck sold 25 more lunches on Friday.', show: ['bg.v4', 'bg.v1', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the scale',
      layout: 'split',
      leftWidth: 660,
      left: [figure('sc', [barGraph({ categories: ['Small', 'Medium', 'Large'], values: [6, 9, 14], max: 16, step: 2, height: 4, titles: { y: 'Coffees sold' } })])],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not checking the scale', md: 'Grid lines do not always go up by $1$. Read the numbers on the side **before** you read a bar.' }],
      lines: [
        { say: 'The grid lines on a bar graph do not always go up by one. Always read the numbers on the side before you read a bar.', show: ['sc.scale', 'oops'], focus: 'sc.scale' },
        { say: 'On this graph of coffee sizes, the lines go up by two. The medium bar stops halfway between eight and ten, so it shows nine, not 8.5.', show: ['sc.b0', 'sc.b1', 'sc.b2', 'sc.r1', 'sc.v1'], focus: 'sc.b1' },
        { say: 'The large bar reaches the seventh line. If you count the lines as ones, you get seven, but the scale says fourteen.', show: ['sc.r2', 'sc.v2'], focus: 'sc.b2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The grid lines on a bar graph go up by $4$. A bar stops halfway between the lines for $12$ and $16$. What value does it show?',
          choices: ['$14$', '$12$', '$16$', '$13$'],
          answer: 0,
          working: 'Halfway between $12$ and $16$ is $14$.',
        },
      ],
      lines: [
        { say: 'Your turn. The grid lines on a bar graph go up by four. A bar stops halfway between the lines for twelve and sixteen. What value does it show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Halfway between twelve and sixteen is fourteen. B and C read the nearest line instead of halfway.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A tally counts in bundles of $5$: count by fives, then add the extra marks.', 'On a bar graph, check the scale first.', 'A bar halfway between two lines is halfway between the two numbers.'] }],
      lines: [
        { say: 'Let’s sum up. A tally counts in bundles of five: count by fives, then add the extra marks.', show: 'sum.0' },
        { say: 'On a bar graph, check the scale first.', show: 'sum.1' },
        { say: 'And a bar halfway between two lines is halfway between the two numbers. In part two, we read circle graphs, and plan fair surveys. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
