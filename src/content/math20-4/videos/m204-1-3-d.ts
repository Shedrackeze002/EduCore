import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-3-d',
  lessonId: 'm204-1-3',
  title: 'Ratios, Rates and Proportions, Part 4: Sharing a Total in a Ratio',
  thumbnailTitle: 'Sharing in a Ratio',
  thumbnail: 'm',
  summary: 'Sharing a total in a ratio by finding the number of parts and the size of one part: 36 buckets of concrete mixed 1 : 2 : 3 (6, 12 and 18 buckets), a 1,200 dollar profit shared 3 : 5, and checking that the shares add back to the total.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.3 · Part 4', title: 'Sharing in a Ratio', subtitle: 'Parts of a total' }],
      lines: [
        { say: 'Sometimes you know the total amount of a mix, and need to know how much of each part to use.', show: 'title' },
        { say: 'In this video, you will share a total in a ratio, in three steps.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Add** the terms of the ratio: the number of equal parts.', '**Divide** the total by the number of parts: the size of one part.', '**Multiply** each term by the size of one part.'] }],
      lines: [
        { say: 'First, add the terms of the ratio. That is how many equal parts the total is split into.', show: 'b.0' },
        { say: 'Next, divide the total by the number of parts, to find the size of one part.', show: 'b.1' },
        { say: 'Then multiply each term of the ratio by the size of one part.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Concrete for a patio',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Concrete mixed $1 : 2 : 3$ (cement : sand : gravel). $36$ buckets in all.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 + 2 + 3 = 6 \\text{ parts}', '36 \\div 6 = 6 \\text{ buckets in one part}', '\\text{cement } 6, \\quad \\text{sand } 12, \\quad \\text{gravel } 18', '6 + 12 + 18 = 36'] },
      ],
      lines: [
        { say: 'Concrete is mixed one to two to three: cement to sand to gravel. A crew needs 36 buckets of mix for a patio. How many buckets of each?', show: 'q' },
        { say: 'Add the terms: one plus two plus three is six parts.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide the total by the parts: 36 divided by six is six buckets in one part.', show: 'm.1', focus: 'm.1' },
        { say: 'Cement is one part: six buckets. Sand is two parts: twelve buckets. Gravel is three parts: eighteen buckets.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: six plus twelve plus eighteen is 36. The shares add back to the total.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Sharing a profit',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Two partners share a \\$1,200 profit in the ratio $3 : 5$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 + 5 = 8 \\text{ parts}', '1200 \\div 8 = 150', '3 \\times 150 = 450, \\quad 5 \\times 150 = 750'] },
      ],
      lines: [
        { say: 'In this example, two partners in a small snow-clearing business agree to share a 1,200-dollar profit in the ratio three to five. How much does each get?', show: 'q' },
        { say: 'Add the terms: three plus five is eight parts.', show: 'm.0', focus: 'm.0' },
        { say: 'One part is 1,200 divided by eight: 150 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'So the first partner gets three times 150, which is 450 dollars, and the second gets five times 150, which is 750 dollars. Check: 450 plus 750 is 1,200.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Dividing by the wrong number',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by a term instead of the total parts', md: 'Do not divide the total by one term of the ratio. For $3 : 5$, dividing \\$1,200 by $3$ gives \\$400, which is not anyone’s share. Divide by the **number of parts**, $3 + 5 = 8$.' }],
      lines: [
        { say: 'A common mistake is to divide the total by one of the terms. Dividing 1,200 dollars by three gives 400, which is not anyone’s share. Divide by the total number of parts: three plus five, eight.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Trail mix is nuts, raisins and chocolate in the ratio $4 : 3 : 1$. How much chocolate is in $640$ g of trail mix?',
          choices: ['$80$ g', '$160$ g', '$240$ g', '$640$ g'],
          answer: 0,
          working: '$4 + 3 + 1 = 8$ parts, and $640 \\div 8 = 80$ g in one part. Chocolate is $1$ part: $80$ g. C is the raisins.',
        },
      ],
      lines: [
        { say: 'Your turn. Trail mix is nuts, raisins and chocolate in the ratio four to three to one. How much chocolate is in 640 grams of trail mix? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four plus three plus one is eight parts, and 640 divided by eight is eighty grams in one part. Chocolate is one part: eighty grams. C is the raisins.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add the terms to find the number of parts.', 'Total ÷ parts = one part.', 'Multiply each term, then check the shares add to the total.'] }],
      lines: [
        { say: 'Let’s sum up. Add the terms of the ratio to find the number of parts.', show: 'sum.0' },
        { say: 'Divide the total by the number of parts to find one part.', show: 'sum.1' },
        { say: 'Then multiply each term by one part, and check that the shares add back to the total. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
