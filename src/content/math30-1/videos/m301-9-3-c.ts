import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-9-3-c',
  lessonId: 'm301-9-3',
  title: 'Combinations, Part 3: Exactly, At Least and At Most',
  thumbnailTitle: 'Exactly, At Least, At Most',
  summary: 'Counting committees of 4 from 5 women and 6 men: exactly two women (5C2 × 6C2 = 150), at least one woman by the complement (11C4 − 6C4 = 315), the same answer by cases, and why choosing one woman "first" counts some committees twice.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.3 · Part 3', title: 'Exactly, At Least, At Most', subtitle: 'Cases and the complement' }],
      lines: [
        { say: 'A committee must have at least one woman. A hand of cards must have at most two aces. Conditions like these split a count into cases.', show: 'title' },
        { say: 'In this video, you will count selections with exactly, at least and at most, by adding cases, or by subtracting from the total.' },
      ],
    },
    {
      chapter: 'Three kinds of condition',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Exactly:** choose the required number from each group and multiply.', '**At least** or **at most:** add the cases, or use the **complement**: count everything, then subtract what you do not want.'] }],
      lines: [
        { say: 'Conditions on a selection usually lead to cases.' },
        { say: 'Exactly means one case: choose the required number from each group, and multiply.', show: 'b.0', focus: 'b.0' },
        { say: 'At least, or at most, means several cases. You can add the cases, or use the complement: count everything, then subtract what you do not want.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Exactly two women',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A 4-person committee is chosen from 5 women and 6 men. How many committees have (a) exactly two women, (b) at least one woman?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{women: } {}_{5}C_{2} = 10', '\\text{men: } {}_{6}C_{2} = 15', '\\text{(a) } 10 \\times 15 = 150'] },
      ],
      lines: [
        { say: 'A four-person committee is chosen from five women and six men. How many committees have exactly two women? And how many have at least one woman?', show: 'p' },
        { say: 'Exactly two women means the other two members are men. Choose two of the five women: five choose two is ten.', show: 'm.0', focus: 'm.0' },
        { say: 'Then choose two of the six men: six choose two is fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'A committee needs both, so multiply: ten times fifteen is 150 committees with exactly two women.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'At least one woman',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{all committees: } {}_{11}C_{4} = 330', '\\text{no women: } {}_{6}C_{4} = 15', '\\text{(b) at least one woman: } 330 - 15 = 315'] },
      ],
      lines: [
        { say: 'At least one woman means one, two, three or four women: four cases. There is a quicker way, the complement.' },
        { say: 'The opposite of at least one woman is no women at all. So count every committee, then subtract the committees with no women.' },
        { say: 'With no condition, choose any four of the eleven people: eleven choose four is 330.', show: 'm.0', focus: 'm.0' },
        { say: 'A committee with no women is all men: six choose four is fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'So 330 minus fifteen is 315 committees with at least one woman.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check with cases',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Women', 'Men', 'Committees'], rows: [['1', '3', '${}_{5}C_{1} \\times {}_{6}C_{3} = 5 \\times 20 = 100$'], ['2', '2', '${}_{5}C_{2} \\times {}_{6}C_{2} = 10 \\times 15 = 150$'], ['3', '1', '${}_{5}C_{3} \\times {}_{6}C_{1} = 10 \\times 6 = 60$'], ['4', '0', '${}_{5}C_{4} \\times {}_{6}C_{0} = 5 \\times 1 = 5$'], ['', '**Total**', '$315$']] },
      ],
      lines: [
        { say: 'You can check with cases. One woman and three men: five times twenty is 100.', show: 't.0', focus: 't.0' },
        { say: 'Two women and two men: 150, as in part a.', show: 't.1', focus: 't.1' },
        { say: 'Three women and one man: ten times six is sixty. And four women and no men: five times one is five.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'The cases cannot overlap, so add them. The total is 315, the same as the complement gave, but the complement took two steps instead of four.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Placing one person first', md: 'It is tempting to choose one woman ($5$ ways), then any 3 of the other 10 people (${}_{10}C_{3} = 120$ ways), giving $600$. That counts a committee with two women twice, so it is too large.' },
      ],
      lines: [
        { say: 'Here is a tempting mistake. Choose one woman first, in five ways, and then any three of the other ten people, in 120 ways. Five times 120 is 600, which is far too many.', show: 'oops' },
        { say: 'The problem is double counting. Take a committee with two women, Ana and Beth. It is counted once when Ana is the woman chosen first, and again when Beth is chosen first.' },
        { say: 'Use cases or the complement instead.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 3-person team is chosen from 4 seniors and 5 juniors. How many teams have at least one senior?',
          choices: ['$84$', '$74$', '$112$', '$40$'],
          answer: 1,
          working: 'All teams: ${}_{9}C_{3} = 84$. Teams with no seniors: ${}_{5}C_{3} = 10$. At least one senior: $84 - 10 = 74$.',
        },
      ],
      lines: [
        { say: 'Your turn. A three-person team is chosen from four seniors and five juniors. How many teams have at least one senior? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, seventy-four. All teams: nine choose three is eighty-four. Teams with no seniors: five choose three is ten. So eighty-four minus ten is seventy-four. Choice C, 112, chooses one senior first, and counts some teams twice.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['"Exactly": choose from each group and multiply.', '"At least" or "at most": add the cases, or subtract the unwanted ones from the total.', 'Choosing one person "first" counts some selections more than once.'] }],
      lines: [
        { say: 'Let’s sum up. For exactly, choose the required number from each group, and multiply.', show: 'sum.0' },
        { say: 'For at least or at most, add the cases, or subtract the ones you do not want from the total.', show: 'sum.1' },
        { say: 'And never choose one person first: that counts some selections more than once. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
