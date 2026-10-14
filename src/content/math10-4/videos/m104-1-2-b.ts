import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-1-2-b',
  lessonId: 'm104-1-2',
  title: 'The Four Operations, Part 2: The Order of Operations',
  thumbnailTitle: 'Order of Operations',
  summary: 'Brackets first, then multiplying and dividing from left to right, then adding and subtracting from left to right, and writing a coffee order and a split bill as one expression with brackets.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 1.2 · Part 2', title: 'The Order of Operations', subtitle: 'Everyone gets the same answer' }],
      lines: [
        { say: 'What is five plus three times four? If you add first, you get 32. If you multiply first, you get seventeen. Only one answer can be right.', show: 'title' },
        { say: 'In this video, you will learn the order of operations, so that everyone gets the same answer.' },
      ],
    },
    {
      chapter: 'The rules',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Brackets** first.', 'Then **multiply and divide**, from left to right.', 'Then **add and subtract**, from left to right.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['5 + 3 \\times 4 = 5 + 12 = 17', '(6 + 2) \\times 5 = 8 \\times 5 = 40', '20 - 8 + 2 = 12 + 2 = 14'] },
      ],
      lines: [
        { say: 'The order of operations is the order for doing the steps. First, do what is in brackets.', show: 'b.0' },
        { say: 'Then multiply and divide, working from left to right. Then add and subtract, working from left to right.', show: ['b.1', 'b.2'] },
        { say: 'In five plus three times four, multiply first: three times four is twelve. Then add: seventeen.', show: 'm.0', focus: 'm.0' },
        { say: 'In six plus two, in brackets, times five, the brackets come first: eight. Then multiply: forty.', show: 'm.1', focus: 'm.1' },
        { say: 'And in twenty minus eight plus two, there is only subtracting and adding, so work from left to right: twelve, then fourteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Left to right',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding before subtracting', md: 'Addition does **not** always come before subtraction. In $20 - 8 + 2$, adding first gives $20 - 10 = 10$, which is wrong.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['12 \\div 2 \\times 3 = 6 \\times 3 = 18'] },
      ],
      lines: [
        { say: 'A common mistake is to think addition always comes before subtraction. In twenty minus eight plus two, adding first gives twenty minus ten, which is ten. That is wrong.', show: 'oops' },
        { say: 'Add and subtract in the order they appear, from left to right.' },
        { say: 'The same goes for multiplying and dividing. In twelve divided by two, times three, divide first: six. Then times three is eighteen, not two.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A receipt',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\times 4 + 2 \\times 3 = 12 + 6 = 18', '(3 \\times 4 + 2 \\times 3) \\div 2 = 18 \\div 2 = 9'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Brackets change the order', md: 'Without brackets, $3 \\times 4 + 2 \\times 3 \\div 2$ only splits the cost of the muffins.' },
      ],
      lines: [
        { say: 'A cashier can write a whole order as one expression. Malik buys three coffees at four dollars each, and two muffins at three dollars each. The total is three times four, plus two times three.', show: 'm.0' },
        { say: 'Multiply first: twelve and six. Then add: eighteen dollars.', focus: 'm.0' },
        { say: 'Malik and a friend split the bill equally. Put brackets around the whole bill, so it is found first. Inside the brackets, eighteen. Then divide by two: each person pays nine dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Without the brackets, dividing by two would only split the cost of the muffins.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the value of $18 - 4 \\times 3$.',
          choices: ['$6$', '$42$', '$14$', '$3$'],
          answer: 0,
          working: 'Multiply first: $4 \\times 3 = 12$. Then subtract: $18 - 12 = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the value of eighteen minus four times three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply first: four times three is twelve. Then subtract: eighteen minus twelve is six. B subtracts first.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Brackets first.', 'Then $\\times$ and $\\div$, left to right.', 'Then $+$ and $-$, left to right.'] }],
      lines: [
        { say: 'Let’s sum up. Do what is in brackets first.', show: 'sum.0' },
        { say: 'Then multiply and divide, from left to right.', show: 'sum.1' },
        { say: 'Then add and subtract, from left to right. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
