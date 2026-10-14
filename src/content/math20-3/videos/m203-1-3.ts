import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-1-3',
  lessonId: 'm203-1-3',
  title: 'Proportions and Unit Analysis, Part 1: Setting Up a Proportion',
  thumbnailTitle: 'Setting Up a Proportion',
  thumbnail: 'm',
  summary: 'What a proportion is, keeping the same units in the same places, mixing 975 mL of herbicide into a 65 L sprayer tank, spreading 16 kg of fertilizer on a 640 m² lawn, and what goes wrong when one ratio is flipped.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.3 · Part 1', title: 'Setting Up a Proportion', subtitle: 'Same units, same places' }],
      lines: [
        { say: 'Mixing herbicide, spreading fertilizer, and buying paint all use the same tool: a proportion. Set it up carefully, and the units will tell you whether your answer makes sense.', show: 'title' },
        { say: 'In this video, you will set up and solve proportions for jobs on a farm and around the yard.' },
      ],
    },
    {
      chapter: 'Proportion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proportion', md: 'A **proportion** is an equation that says two ratios are equal. Write the ratios with the **same units in the same places**: top with top, bottom with bottom.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{150 \\text{ mL}}{10 \\text{ L}} = \\dfrac{x}{65 \\text{ L}}'] },
      ],
      lines: [
        { say: 'A proportion is an equation that says two ratios are equal.', show: 'def' },
        { say: 'Write the two ratios with the same units in the same places: millilitres on top on both sides, and litres on the bottom on both sides. Then multiply both sides by the number under x.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Mixing herbicide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{150 \\text{ mL}}{10 \\text{ L}} = \\dfrac{x}{65 \\text{ L}}', 'x = \\dfrac{150 \\times 65}{10}', 'x = 975 \\text{ mL}'] }],
      lines: [
        { say: 'A herbicide label says to mix 150 millilitres of herbicide with every ten litres of water. How much herbicide goes into a sprayer tank holding sixty-five litres of water? Set up the proportion, with herbicide on top and water on the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by sixty-five: x is 150 times sixty-five, over ten.', show: 'm.1', focus: 'm.1' },
        { say: 'That is 975. Mix 975 millilitres of herbicide into the tank. It makes sense: sixty-five litres is six and a half tens, and six and a half times 150 is 975.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Spreading fertilizer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{2.5 \\text{ kg}}{100 \\text{ m}^2} = \\dfrac{x}{640 \\text{ m}^2}', 'x = \\dfrac{2.5 \\times 640}{100} = 16 \\text{ kg}'] }],
      lines: [
        { say: 'Fertilizer is spread at 2.5 kilograms for every 100 square metres of lawn. How much is needed for a lawn of 640 square metres? Kilograms on top, square metres on the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by 640: 2.5 times 640, over 100, is sixteen. The lawn needs sixteen kilograms of fertilizer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Flipping one ratio',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Flipping one ratio', md: 'Writing $\\dfrac{150\\text{ mL}}{10\\text{ L}} = \\dfrac{65\\text{ L}}{x}$ puts millilitres on top on one side and litres on top on the other. It gives about $4.3$ mL, which is far too little.' },
      ],
      lines: [
        { say: 'A common mistake is to flip one of the ratios. 150 millilitres over ten litres equals sixty-five litres over x puts millilitres on top on one side, and litres on top on the other.', show: 'oops' },
        { say: 'It gives about 4.3 millilitres for a whole tank, which is far too little to work. Keep the same units in the same places, and check that the answer is a sensible size.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A recipe uses $3$ cups of flour for every $2$ dozen cookies. How much flour is needed for $7$ dozen cookies?',
          choices: ['$10.5$ cups', '$4.7$ cups', '$14$ cups', '$0.86$ cups'],
          answer: 0,
          working: '$\\dfrac{3 \\text{ cups}}{2 \\text{ dozen}} = \\dfrac{x}{7 \\text{ dozen}}$, so $x = \\dfrac{3 \\times 7}{2} = 10.5$ cups. B flips one ratio.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe uses three cups of flour for every two dozen cookies. How much flour is needed for seven dozen cookies? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three cups over two dozen equals x over seven dozen, so x is three times seven, over two: 10.5 cups. B flips one of the ratios.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A proportion says two ratios are equal.', 'Keep the same units in the same places.', 'Multiply both sides by the number under $x$, then check the size.'] }],
      lines: [
        { say: 'Let’s sum up. A proportion says two ratios are equal.', show: 'sum.0' },
        { say: 'Keep the same units in the same places, top with top and bottom with bottom.', show: 'sum.1' },
        { say: 'Then multiply both sides by the number under x, and check that the answer is a sensible size. In part two, we round up for real purchases, and meet conversion factors. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
