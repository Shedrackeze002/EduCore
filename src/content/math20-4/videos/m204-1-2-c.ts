import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-2-c',
  lessonId: 'm204-1-2',
  title: 'Fractions and Mixed Numbers, Part 3: Multiplying',
  thumbnailTitle: 'Multiplying Fractions',
  thumbnail: 'b',
  summary: 'Multiplying fractions and mixed numbers in three steps: doubling a bannock recipe (2 × 2¼ = 4½ cups), three quarters of a 2½-hour shift (1⅞ hours), “of” means multiply, and why the parts of mixed numbers cannot be multiplied separately.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.2 · Part 3', title: 'Multiplying Fractions', subtitle: 'Tops times tops, bottoms times bottoms' }],
      lines: [
        { say: 'Doubling a recipe, or finding three quarters of a shift: both need multiplying with fractions.', show: 'title' },
        { say: 'In this video, you will multiply fractions and mixed numbers in three steps.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Change any mixed numbers to **improper fractions**.', 'Multiply the numerators. Multiply the denominators.', '**Simplify**, and change back to a mixed number.'] }],
      lines: [
        { say: 'To multiply fractions and mixed numbers, first change any mixed numbers to improper fractions.', show: 'b.0' },
        { say: 'Then multiply the numerators, the tops, and multiply the denominators, the bottoms. Unlike adding, you do not need a common denominator.', show: 'b.1' },
        { say: 'Last, simplify, and change back to a mixed number.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Doubling a recipe',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A bannock recipe uses $2\\tfrac14$ cups of flour. Make a double batch.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\dfrac14 = \\dfrac94', '2 \\times \\dfrac94 = \\dfrac{18}{4}', '\\dfrac{18}{4} = \\dfrac92 = 4\\dfrac12 \\text{ cups}'] },
      ],
      lines: [
        { say: 'A bannock recipe uses two and a quarter cups of flour. Talia makes a double batch. How much flour does she need?', show: 'q' },
        { say: 'Change to an improper fraction: two and a quarter is nine quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply by two: two times nine quarters is eighteen quarters.', show: 'm.1', focus: 'm.1' },
        { say: 'Simplify: eighteen quarters is nine halves, which is four and a half. Talia needs four and a half cups of flour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Part of a shift',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$\\tfrac34$ of a $2\\tfrac12$-hour shift.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac34 \\times 2\\dfrac12 = \\dfrac34 \\times \\dfrac52', '= \\dfrac{3 \\times 5}{4 \\times 2} = \\dfrac{15}{8}', '= 1\\dfrac78 \\text{ hours}'] },
      ],
      lines: [
        { say: 'Mason works a two-and-a-half-hour shift. He spends three quarters of it stocking shelves. How long is that?', show: 'q' },
        { say: 'In maths, “of” means multiply: three quarters times two and a half. Two and a half is five halves.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the tops: three times five is fifteen. Multiply the bottoms: four times two is eight. That is fifteen eighths.', show: 'm.1', focus: 'm.1' },
        { say: 'Change back: fifteen eighths is one and seven eighths hours, a little less than two hours. That makes sense, because three quarters of the shift is less than the whole shift.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Multiplying the parts separately',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the parts separately', md: 'For $1\\tfrac12 \\times 2\\tfrac12$, you cannot multiply $1 \\times 2$ and $\\tfrac12 \\times \\tfrac12$ to get $2\\tfrac14$. Change to improper fractions first: $\\tfrac32 \\times \\tfrac52 = \\tfrac{15}{4} = 3\\tfrac34$.' }],
      lines: [
        { say: 'A common mistake is to multiply the wholes and the fractions separately. For one and a half times two and a half, that gives two and a quarter, which is wrong.', show: 'oops' },
        { say: 'Change to improper fractions first: three halves times five halves is fifteen quarters, or three and three quarters.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A recipe uses $1\\tfrac13$ cups of sugar. How much sugar do $3$ batches need?',
          choices: ['$4$ cups', '$3\\tfrac13$ cups', '$\\tfrac49$ cup', '$4\\tfrac13$ cups'],
          answer: 0,
          working: '$1\\tfrac13 = \\tfrac43$, and $3 \\times \\tfrac43 = \\tfrac{12}{3} = 4$. B multiplies only the whole number.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe uses one and a third cups of sugar. How much sugar do three batches need? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One and a third is four thirds, and three times four thirds is twelve thirds: exactly four cups. B multiplies only the whole number.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Change mixed numbers to improper fractions first.', 'Multiply tops; multiply bottoms; then simplify.', '“Of” means multiply.'] }],
      lines: [
        { say: 'Let’s sum up. Change mixed numbers to improper fractions first.', show: 'sum.0' },
        { say: 'Multiply the tops, multiply the bottoms, then simplify and change back.', show: 'sum.1' },
        { say: 'And “of” means multiply. In part four, we solve two-step problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
