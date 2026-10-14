import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-1-1',
  lessonId: 'm104-1-1',
  title: 'Place Value, Part 1: Reading and Writing Numbers',
  thumbnailTitle: 'Place Value',
  summary: 'Digits and place value, the value of a digit in a number like 45,307, standard and expanded form, and reading the amount on a cheque, with a 0 in every empty place. Part 2 compares and rounds numbers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 1.1 · Part 1', title: 'Place Value', subtitle: 'Reading and writing big numbers' }],
      lines: [
        { say: 'Big numbers are everywhere at work: on a cheque, a pay stub, a stock count, or the odometer of a used truck.', show: 'title' },
        { say: 'In this video, you will learn what each digit in a number is worth, and how to read and write big numbers.' },
      ],
    },
    {
      chapter: 'Digits and place value',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Digit and place value', md: 'A **digit** is one of $0$ to $9$. Its **place value** is what it is worth because of its place in the number.' },
        { kind: 'table', id: 't', head: ['Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'], rows: [['4', '[[good:5]]', '3', '0', '7']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['5 \\times 1{,}000 = 5{,}000'] },
      ],
      lines: [
        { say: 'We write every number with ten digits, zero to nine. Where a digit sits tells you how much it is worth: its place value.', show: 'def' },
        { say: 'This place value chart shows the number 45,307. Each place is worth ten times the place to its right.', show: 't.0' },
        { say: 'What is the five worth? Count the places from the right: ones, tens, hundreds, thousands. The five is in the thousands place.', focus: 't.0' },
        { say: 'So it is worth five times 1,000: 5,000. The digit is five, but its value is 5,000. Always ask: which place is this digit in?', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Standard and expanded form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3{,}425 = 3{,}000 + 400 + 20 + 5', '60{,}000 + 400 + 7 = 60{,}407'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Standard and expanded form', md: '**Standard form** uses digits only. **Expanded form** adds the value of each digit.' },
      ],
      lines: [
        { say: 'Standard form is the usual way to write a number, with digits only. Expanded form writes the value of each digit as a sum: 3,425 is 3,000 plus 400 plus twenty plus five.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'Now go the other way. Write 60,000 plus 400 plus seven in standard form. Sixty thousand puts a six in the ten thousands place, 400 puts a four in the hundreds place, and seven goes in the ones place.', show: 'm.1' },
        { say: 'Nothing is in the thousands or the tens place, so each gets a zero: 60,407.', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Reading a cheque',
      layout: 'center',
      main: [
        { kind: 'text', id: 'cheque', md: '"Twelve thousand eighty dollars"', size: 'lg' },
        { kind: 'math', id: 'm', size: 'md', lines: ['12{,}000 + 80 = 12{,}080'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Leaving out zeros', md: '"Twelve thousand eighty" is **not** $1{,}280$. Put a $0$ in each place that is not named.' },
      ],
      lines: [
        { say: 'On a cheque, you write the amount in words and in digits. A cheque says: twelve thousand eighty dollars. Write the amount with digits.', show: 'cheque' },
        { say: 'Split the words at the word thousand. Twelve thousand is 12,000, and eighty is eighty. Together, 12,080. The hundreds and the ones places get a zero.', show: 'm.0', focus: 'm.0' },
        { say: 'It is not 1,280. Every place needs a digit, so put a zero in each place that is not named.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the value of the $8$ in $38{,}516$?',
          choices: ['$8{,}000$', '$8$', '$800$', '$80{,}000$'],
          answer: 0,
          working: 'The $8$ is in the thousands place, so it is worth $8 \\times 1{,}000 = 8{,}000$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the value of the eight in 38,516? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Count from the right: ones, tens, hundreds, thousands. The eight is in the thousands place, so it is worth 8,000. B is the digit, not its value.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A digit’s value depends on its place.', 'Standard form uses digits. Expanded form adds the values.', 'Put a $0$ in any empty place.'] }],
      lines: [
        { say: 'Let’s sum up. A digit’s value depends on its place: ones, tens, hundreds, thousands and ten thousands.', show: 'sum.0' },
        { say: 'Standard form uses digits, and expanded form adds the value of each digit.', show: 'sum.1' },
        { say: 'And put a zero in any empty place. In part two, we compare and round numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
