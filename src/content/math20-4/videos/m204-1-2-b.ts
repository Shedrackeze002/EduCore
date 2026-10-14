import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-2-b',
  lessonId: 'm204-1-2',
  title: 'Fractions and Mixed Numbers, Part 2: Adding and Subtracting',
  thumbnailTitle: 'Adding and Subtracting Fractions',
  thumbnail: 'm',
  summary: 'Adding mixed numbers with the same denominator (1⅜ + 2⅛ = 3½ feet of trim), what a common denominator is, subtracting with different denominators through improper fractions (6½ − 2¾ = 3¾ feet), and checking with an estimate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.2 · Part 2', title: 'Adding and Subtracting', subtitle: 'Make the bottoms match' }],
      lines: [
        { say: 'Two pieces of trim, or a board with a piece cut off: at work, you often add or subtract lengths in fractions of a foot.', show: 'title' },
        { say: 'In this video, you will add and subtract mixed numbers, with the same or different denominators.' },
      ],
    },
    {
      chapter: 'Same denominators',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Two pieces of trim: $1\\tfrac38$ feet and $2\\tfrac18$ feet.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{wholes: } 1 + 2 = 3', '\\text{fractions: } \\dfrac38 + \\dfrac18 = \\dfrac48 = \\dfrac12', '\\text{total: } 3\\dfrac12 \\text{ feet}'] },
      ],
      lines: [
        { say: 'Jun cuts two pieces of trim. One is one and three eighths feet long, and the other is two and one eighth feet long. What is the total length?', show: 'q' },
        { say: 'When the denominators match, add the whole numbers: one plus two is three.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add the fractions: three eighths plus one eighth is four eighths, which simplifies to one half.', show: 'm.1', focus: 'm.1' },
        { say: 'So the total length is three and a half feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A common denominator',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Common denominator', md: 'A number that both denominators divide into evenly. For $\\tfrac12$ and $\\tfrac34$, a common denominator is $4$, because $\\tfrac12 = \\tfrac24$.' },
      ],
      lines: [
        { say: 'When the denominators are different, you need a common denominator: a number that both denominators divide into evenly.', show: 'def' },
        { say: 'For one half and three quarters, a common denominator is four, because one half is the same as two quarters.' },
        { say: 'Then the safest method is to change to improper fractions with that common denominator. This method always works.' },
      ],
    },
    {
      chapter: 'Cutting a board',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A board is $6\\tfrac12$ feet long. A piece $2\\tfrac34$ feet long is cut off.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['6\\dfrac12 = \\dfrac{13}{2}, \\quad 2\\dfrac34 = \\dfrac{11}{4}', '\\dfrac{13}{2} = \\dfrac{26}{4}', '\\dfrac{26}{4} - \\dfrac{11}{4} = \\dfrac{15}{4}', '\\dfrac{15}{4} = 3\\dfrac34 \\text{ feet}'] },
      ],
      lines: [
        { say: 'A board is six and a half feet long. Kai cuts off a piece two and three quarters feet long. How much is left? Ignore the saw cut.', show: 'q' },
        { say: 'Change both to improper fractions. Six and a half is thirteen halves, and two and three quarters is eleven quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Use the common denominator four. Thirteen halves is twenty-six quarters.', show: 'm.1', focus: 'm.1' },
        { say: 'Now subtract the numerators: 26 quarters minus eleven quarters is fifteen quarters.', show: 'm.2', focus: 'm.2' },
        { say: 'Change back: fifteen divided by four is three, with three left over. So three and three quarters feet of the board is left.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check with an estimate',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with an estimate', md: '$6\\tfrac12$ is about $6.5$, and $2\\tfrac34$ is about $3$. So about $3.5$ feet should be left, and $3\\tfrac34$ is close.' }],
      lines: [
        { say: 'Check with an estimate. Six and a half minus about three leaves about three and a half feet. The answer, three and three quarters, is close, so it makes sense.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pipe is $4\\tfrac38$ feet long. You cut off $1\\tfrac34$ feet. How much is left?',
          choices: ['$2\\tfrac58$ feet', '$3\\tfrac38$ feet', '$6\\tfrac18$ feet', '$2\\tfrac38$ feet'],
          answer: 0,
          working: '$4\\tfrac38 = \\tfrac{35}{8}$ and $1\\tfrac34 = \\tfrac{14}{8}$, so $\\tfrac{35}{8} - \\tfrac{14}{8} = \\tfrac{21}{8} = 2\\tfrac58$. C adds instead of subtracting.',
        },
      ],
      lines: [
        { say: 'Your turn. A pipe is four and three eighths feet long. You cut off one and three quarters feet. How much is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four and three eighths is 35 eighths, and one and three quarters is fourteen eighths. 35 minus fourteen is 21 eighths, which is two and five eighths feet. C adds instead of subtracting.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same denominators: add the wholes, then the fractions.', 'Different denominators: improper fractions with a common denominator.', 'Check with an estimate.'] }],
      lines: [
        { say: 'Let’s sum up. With the same denominators, add the whole numbers, then the fractions.', show: 'sum.0' },
        { say: 'With different denominators, change to improper fractions with a common denominator, then add or subtract the numerators.', show: 'sum.1' },
        { say: 'And check your answer with an estimate. In part three, we multiply fractions and mixed numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
