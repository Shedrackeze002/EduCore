import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-5-3',
  lessonId: 'm204-5-3',
  title: 'Tables and Graphs, Part 1: Tables of Values',
  thumbnailTitle: 'Tables of Values',
  thumbnail: 't',
  summary: 'What a relationship and a table of values are, building a table from the rule P = 15h for 1 to 5 hours (15, 30, 45, 60, 75 dollars), and spotting the steady jump of 15 dollars for each extra hour.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.3 · Part 1', title: 'Tables of Values', subtitle: 'A rule, written out' }],
      lines: [
        { say: 'How much will you earn for a six-hour shift? How much is a ten kilometre taxi ride? A table or a graph can answer questions like these at a glance, without doing the math each time.', show: 'title' },
        { say: 'In this video, you will build a table of values from a rule, and spot its pattern.' },
      ],
    },
    {
      chapter: 'Relationships and tables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rel', tone: 'definition', title: 'Relationship', md: 'A **relationship** shows how one amount depends on another. Your pay depends on the hours you work.' },
        { kind: 'callout', id: 'tab', tone: 'definition', title: 'Table of values', md: 'A **table of values** lists pairs of numbers that follow a rule. The top row is what you choose, and the bottom row is what you get.' },
      ],
      lines: [
        { say: 'A relationship shows how one amount depends on another. For example, your pay depends on the hours you work.', show: 'rel' },
        { say: 'A table of values lists pairs of numbers that follow a rule. The top row is what you choose, and the bottom row is what you get. In Math 10-4 you found patterns in tables. Now you will build a table from a rule.', show: 'tab' },
      ],
    },
    {
      chapter: 'A table for P = 15h',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Tariq earns \\$15 per hour. The rule is $P = 15h$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['15 \\times 1 = 15, \\quad 15 \\times 2 = 30, \\quad 15 \\times 3 = 45', '15 \\times 4 = 60, \\quad 15 \\times 5 = 75'] },
        { kind: 'table', id: 't', head: ['Hours worked', '$1$', '$2$', '$3$', '$4$', '$5$'], rows: [['Pay (\\$)', '$15$', '$30$', '$45$', '$60$', '$75$']] },
      ],
      lines: [
        { say: 'Tariq earns fifteen dollars per hour. The rule is P equals fifteen h, where P is the pay in dollars and h is the hours worked. Make a table for one to five hours.', show: 'q' },
        { say: 'Substitute each number of hours. Fifteen times one is fifteen, fifteen times two is thirty, and fifteen times three is 45.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifteen times four is sixty, and fifteen times five is 75.', show: 'm.1', focus: 'm.1' },
        { say: 'Now write the pairs in a table. The hours you choose go in the top row, and the pay you get goes in the bottom row.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'The pattern',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Hours worked', '$1$', '$2$', '$3$', '$4$', '$5$'], rows: [['Pay (\\$)', '$15$', '$30$', '$45$', '$60$', '$75$']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Look for the pattern', md: 'Each extra hour adds **\\$15**, the hourly wage. You can extend the table by adding $15$: $6$ hours pays $75 + 15 = 90$.' },
      ],
      lines: [
        { say: 'Look along the bottom row: fifteen, thirty, 45, sixty, 75. Each extra hour adds fifteen dollars, which is the hourly wage.', show: 't' },
        { say: 'So you can extend the table without the rule. Six hours pays 75 plus fifteen: 90 dollars. And the rule agrees: fifteen times six is 90.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The rule is $P = 16h$. What are the pay values for $1$, $2$, $3$ and $4$ hours?',
          choices: ['$16, 32, 48, 64$', '$16, 17, 18, 19$', '$17, 18, 19, 20$', '$16, 36, 56, 76$'],
          answer: 0,
          working: '$16 \\times 1 = 16$, $16 \\times 2 = 32$, $16 \\times 3 = 48$, $16 \\times 4 = 64$. Each hour adds $16$. B adds $1$ each time, and C adds the hours to $16$.',
        },
      ],
      lines: [
        { say: 'Your turn. The rule is P equals sixteen h. What are the pay values for one, two, three and four hours? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Sixteen times one, two, three and four is sixteen, 32, 48 and 64. Each hour adds sixteen dollars. B adds one each time, and C adds the hours to sixteen instead of multiplying.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A table of values lists pairs that follow a rule.', 'Substitute each value you choose into the rule.', 'For P = 15h, each extra hour adds 15.'] }],
      lines: [
        { say: 'Let’s sum up. A table of values lists pairs of numbers that follow a rule.', show: 'sum.0' },
        { say: 'To build one, substitute each value you choose into the rule.', show: 'sum.1' },
        { say: 'And look for the pattern: for P equals fifteen h, each extra hour adds fifteen dollars. In part two, we read a graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
