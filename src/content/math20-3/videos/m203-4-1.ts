import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-4-1',
  lessonId: 'm203-4-1',
  title: 'Right Triangle Review, Part 1: Naming Sides and the Pythagorean Theorem',
  thumbnailTitle: 'The Pythagorean Theorem',
  thumbnail: 'tri',
  summary: 'Naming the hypotenuse, opposite and adjacent sides from an angle θ, why opposite and adjacent swap at the other angle, a 7.2 ft brace for a farm gate, and how high a 6 m ladder reaches when its foot is 1.5 m from the wall (about 5.8 m).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.1 · Part 1', title: 'Naming Sides and the Pythagorean Theorem', subtitle: 'Tools for one right triangle' }],
      lines: [
        { say: 'Carpenters, crane operators and surveyors solve right triangles every day: how long a brace must be, or how high a ladder reaches.', show: 'title' },
        { say: 'In this video, you will name the sides of a right triangle, and use the Pythagorean theorem.' },
      ],
    },
    {
      chapter: 'Naming the sides',
      layout: 'split',
      leftWidth: 620,
      left: [{ kind: 'triangle', id: 'tri', adj: 8, opp: 6, mirror: true, labels: { hyp: '\\text{hypotenuse}', opp: '\\text{opposite}', adj: '\\text{adjacent}', theta: '\\theta' } }],
      right: [{ kind: 'bullets', id: 'b', items: ['**Hypotenuse**: across from the right angle, always the longest side.', '**Opposite**: across from the angle $\\theta$.', '**Adjacent**: touches $\\theta$, and is not the hypotenuse.'] }],
      lines: [
        { say: 'In a right triangle, the longest side is across from the right angle. It is called the hypotenuse.', show: ['tri.shape', 'tri.hyp', 'b.0'], focus: 'tri.hyp' },
        { say: 'The other two sides are named from the angle you are working with, often called theta. The opposite side is across from theta.', show: ['tri.theta', 'tri.opp', 'b.1'], focus: 'tri.opp' },
        { say: 'The adjacent side touches theta, and is not the hypotenuse.', show: ['tri.adj', 'b.2'], focus: 'tri.adj' },
        { say: 'If you move to the other acute angle, the opposite and adjacent sides swap. The hypotenuse never changes.' },
      ],
    },
    {
      chapter: 'The Pythagorean theorem',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['c^2 = a^2 + b^2'] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'When to use it', md: 'Use the Pythagorean theorem when you know **two sides** and want the third, and **no angle** is involved. Here $c$ is the hypotenuse, and $a$ and $b$ are the legs.' },
      ],
      lines: [
        { say: 'When you know two sides and want the third, and no angle is involved, use the Pythagorean theorem: c squared equals "a" squared plus b squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Here c is the hypotenuse, and "a" and b are the two legs, the sides that make the right angle.', show: 'k' },
      ],
    },
    {
      chapter: 'A brace for a farm gate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['c^2 = 6^2 + 4^2 = 36 + 16 = 52', 'c = \\sqrt{52} \\approx 7.2 \\text{ ft}'] }],
      lines: [
        { say: 'A gate is six feet wide and four feet tall. A diagonal brace runs from corner to corner. How long is the brace? The brace is the hypotenuse, so c squared is six squared plus four squared: thirty-six plus sixteen, fifty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'Take the square root: the brace is about 7.2 feet long.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'How high does the ladder reach?',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'triangle', id: 'ld', adj: 1.5, opp: 5.81, setting: 'ladder', labels: { hyp: '6\\text{ m}', adj: '1.5\\text{ m}', opp: 'h' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h^2 = 6^2 - 1.5^2', '= 36 - 2.25 = 33.75', 'h = \\sqrt{33.75} \\approx 5.8 \\text{ m}'] }],
      lines: [
        { say: 'The foot of a six-metre ladder is 1.5 metres from a wall. How high up the wall does it reach?', show: ['ld.shape', 'ld.hyp', 'ld.adj', 'ld.opp'] },
        { say: 'This time the ladder is the hypotenuse, and you want a leg. So subtract: h squared is six squared minus 1.5 squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirty-six minus 2.25 is 33.75.', show: 'm.1', focus: 'm.1' },
        { say: 'The square root is about 5.8. The ladder reaches about 5.8 metres up the wall: less than six, as a leg must be.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangular field is $80$ m long and $60$ m wide. How long is the path along its diagonal?',
          choices: ['$100$ m', '$140$ m', '$52.9$ m', '$70$ m'],
          answer: 0,
          working: '$c^2 = 80^2 + 60^2 = 6400 + 3600 = 10\\,000$, so $c = 100$ m. C subtracts instead of adding.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular field is eighty metres long and sixty metres wide. How long is the path along its diagonal? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eighty squared plus sixty squared is 6,400 plus 3,600, which is 10,000, and the square root is 100 metres. C subtracts instead of adding.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Hypotenuse: across from the right angle, the longest side.', 'Opposite and adjacent depend on the angle you use.', 'No angle involved: $c^2 = a^2 + b^2$. Subtract to find a leg.'] }],
      lines: [
        { say: 'Let’s sum up. The hypotenuse is across from the right angle, and is the longest side.', show: 'sum.0' },
        { say: 'Opposite and adjacent depend on the angle you are using.', show: 'sum.1' },
        { say: 'And when no angle is involved, use c squared equals "a" squared plus b squared. Subtract to find a leg. In part two, we find sides with the trigonometric ratios. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
