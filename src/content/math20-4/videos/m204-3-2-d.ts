import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-2-d',
  lessonId: 'm204-3-2',
  title: 'Other Ways to Earn, Part 4: Sharing Tips',
  thumbnailTitle: 'Sharing Tips',
  thumbnail: 't',
  summary: 'Sharing tips equally (384 dollars among 4 servers is 96 dollars each), a tip pool shared by hours worked (360 dollars over 24 hours is 15 dollars an hour, so 6 hours earns 90 dollars), and checking that the shares add up to the pool.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.2 · Part 4', title: 'Sharing Tips', subtitle: 'Equal shares, or by the hour' }],
      lines: [
        { say: 'In a restaurant, the tips at the end of a shift often go into one pot. Then the staff share them.', show: 'title' },
        { say: 'In this video, you will share tips equally, and share a tip pool by hours worked.' },
      ],
    },
    {
      chapter: 'Tips',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tips', md: '**Tips** are extra money customers give for good service. Many workplaces share the tips among the staff.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['384 \\div 4 = 96.00'] },
      ],
      lines: [
        { say: 'Tips are extra money customers give for good service. Many workplaces share the tips among the staff.', show: 'def' },
        { say: 'When tips are shared equally, divide the total by the number of people. Four servers share 384 dollars in tips: 384 divided by four is 96 dollars each.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A tip pool',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Name', 'Hours worked'], rows: [['Ava', '$8$'], ['Ben', '$6$'], ['Carlos', '$6$'], ['Dina', '$4$']] }],
      right: [
        { kind: 'text', id: 'q', md: 'The staff share \\$360 in tips by hours worked.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 + 6 + 6 + 4 = 24 \\text{ h}', '360 \\div 24 = 15.00 \\text{ per hour}', '\\text{Ben: } 6 \\times 15.00 = 90.00'] },
      ],
      lines: [
        { say: 'Some places use a tip pool shared by hours worked. People who work more hours get a bigger share. These four staff share 360 dollars in tips by hours worked. How much does Ben get?', show: ['t', 'q'] },
        { say: 'First, the total hours: eight plus six plus six plus four is 24 hours.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, the tips per hour: 360 divided by 24 is fifteen dollars for each hour worked.', show: 'm.1', focus: 'm.1' },
        { say: 'Ben worked six hours, so Ben’s share is six times fifteen: 90 dollars.', show: 'm.2', focus: ['t.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Check the shares',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Ava } 120 + \\text{Ben } 90 + \\text{Carlos } 90 + \\text{Dina } 60 = 360'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Sharing a pool equally', md: '$360 \\div 4 = 90$ each happens to match Ben, but it is not fair to Ava, who worked $8$ hours and should get \\$120.00.' },
      ],
      lines: [
        { say: 'Each share is fifteen dollars per hour times the hours. Ava gets 120, Ben and Carlos get 90 each, and Dina gets 60. Together, that is 360 dollars, the whole pool.', show: 'm', focus: 'm' },
        { say: 'A common mistake is to share the pool equally. 360 divided by four is 90 each. That happens to match Ben, but it is not fair to Ava, who worked eight hours and should get 120 dollars.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Zoe, Raj and Lena share \\$270 in tips by hours worked. Zoe worked $5$ hours, Raj $4$ hours and Lena $6$ hours. How much does Lena get?',
          choices: ['\\$108.00', '\\$90.00', '\\$18.00', '\\$72.00'],
          answer: 0,
          working: 'Total hours: $5 + 4 + 6 = 15$. Per hour: $270 \\div 15 = 18.00$. Lena: $6 \\times 18.00 = 108.00$. B shares equally, C is the tips per hour, and D is Raj’s share.',
        },
      ],
      lines: [
        { say: 'Your turn. Zoe, Raj and Lena share 270 dollars in tips by hours worked. Zoe worked five hours, Raj four hours and Lena six hours. How much does Lena get? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The total is fifteen hours, and 270 divided by fifteen is eighteen dollars per hour. Lena worked six hours: six times eighteen is 108 dollars. B shares equally, C is the tips per hour, and D is Raj’s share.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Equal shares: total ÷ number of people.', 'By hours: tips per hour = total ÷ total hours.', 'Your share = tips per hour × your hours.'] }],
      lines: [
        { say: 'Let’s sum up. To share tips equally, divide the total by the number of people.', show: 'sum.0' },
        { say: 'To share by hours, find the tips per hour: the total divided by the total hours.', show: 'sum.1' },
        { say: 'And your share is the tips per hour times your hours. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
