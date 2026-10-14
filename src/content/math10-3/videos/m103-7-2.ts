import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-7-2',
  lessonId: 'm103-7-2',
  title: 'Pythagorean Problems, Part 1: Ladders and Rafters',
  thumbnailTitle: 'Ladders and Rafters',
  thumbnail: 'lad',
  summary: 'A five-step plan for Pythagorean word problems (sketch, label, decide, use, check), how high a ladder reaches up a wall, and the length of a shed rafter from its run and rise. Part 2 covers diagonals and two-step problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 7.2 · Part 1', title: 'Right Triangles on the Job', subtitle: 'Ladders and rafters' }],
      lines: [
        { say: 'Right triangles are hiding all over a job site: a ladder against a wall, a rafter on a roof, a brace across a gate.', show: 'title' },
        { say: 'In this video, you will spot the right triangle in a word problem, and find lengths you cannot easily measure.' },
      ],
    },
    {
      chapter: 'Find the right triangle',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Sketch** the situation and mark the right angle.', '**Label** the lengths you know, and the one you want.', '**Decide**: is the unknown the hypotenuse, or a leg?', '**Use** $c^2 = a^2 + b^2$, or $a^2 = c^2 - b^2$ for a leg.', '**Check** that the answer makes sense, with units.'] }],
      lines: [
        { say: 'Every word problem in this lesson follows the same plan. First, sketch the situation, and mark the right angle. It is usually where a wall meets the ground, or where a length meets a width.', show: 'b.0' },
        { say: 'Label the lengths you know, and the one you want.', show: 'b.1' },
        { say: 'Decide whether the unknown is the hypotenuse, across from the right angle, or a leg.', show: 'b.2' },
        { say: 'Use the formula: add the squares for the hypotenuse, or subtract them for a leg.', show: 'b.3' },
        { say: 'And check that the answer makes sense, and has units.', show: 'b.4' },
      ],
    },
    {
      chapter: 'A ladder',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'triangle', id: 'lad', adj: 5, opp: 19.36, setting: 'ladder', labels: { hyp: '20\\text{ ft}', adj: '5\\text{ ft}', opp: 'h' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h^2 = 20^2 - 5^2', 'h^2 = 400 - 25 = 375', 'h = \\sqrt{375} \\approx 19.4\\text{ ft}'] }],
      lines: [
        { say: 'A twenty-foot extension ladder leans against a house, with its foot five feet from the wall. How high up the wall does it reach?', show: ['lad.shape', 'lad.hyp', 'lad.adj'] },
        { say: 'The wall and the ground meet at a right angle. The ladder is across from it, so the ladder is the hypotenuse, and the height h is a leg.', show: 'lad.opp', focus: ['lad.hyp', 'lad.opp'] },
        { say: 'For a leg, subtract: twenty squared minus five squared, 400 minus 25, is 375.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The square root of 375 is about 19.36. So the ladder reaches about 19.4 feet up the wall: a little less than the ladder’s length, which makes sense.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rafters',
      layout: 'split',
      leftWidth: 480,
      left: [{ kind: 'triangle', id: 'raf', adj: 7, opp: 3.5, labels: { adj: '7\\text{ ft}', opp: '3.5\\text{ ft}', hyp: 'L' } }],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rafter, run and rise', md: 'A **rafter** holds up a roof. The **run** is the level distance it covers and the **rise** is how much it climbs: the legs.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['L^2 = 7^2 + 3.5^2', 'L^2 = 49 + 12.25 = 61.25', 'L = \\sqrt{61.25} \\approx 7.8\\text{ ft}'] },
      ],
      lines: [
        { say: 'A rafter is a sloping board that holds up a roof. The run is the level distance it covers, and the rise is how much it climbs. The run and the rise are the legs, and the rafter is the hypotenuse.', show: ['raf.shape', 'def'] },
        { say: 'A shed roof has a run of seven feet and a rise of 3.5 feet. How long is each rafter?', show: ['raf.adj', 'raf.opp', 'raf.hyp'] },
        { say: 'Add the squares: 49 plus 12.25 is 61.25.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The square root is about 7.8 feet. A real rafter also needs extra length for the overhang past the wall, so find this length first, then add the extras.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $13\\text{ ft}$ ladder leans against a wall with its foot $5\\text{ ft}$ from the wall. How high up the wall does it reach?',
          choices: ['$12\\text{ ft}$', '$13.9\\text{ ft}$', '$8\\text{ ft}$', '$144\\text{ ft}$'],
          answer: 0,
          working: 'The ladder is the hypotenuse: $h^2 = 13^2 - 5^2 = 169 - 25 = 144$, so $h = 12\\text{ ft}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A thirteen-foot ladder leans against a wall, with its foot five feet from the wall. How high up the wall does it reach? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The ladder is the hypotenuse, so subtract: 169 minus 25 is 144, and its square root is twelve feet. B adds the squares, which would make the wall taller than the ladder.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sketch, label, then decide: hypotenuse or leg?', 'Ladders and rafters are hypotenuses.', 'Check that a leg is shorter than the hypotenuse.'] }],
      lines: [
        { say: 'Let’s sum up. Sketch the problem, label it, and decide whether the unknown is the hypotenuse or a leg.', show: 'sum.0' },
        { say: 'Ladders and rafters are hypotenuses: they sit across from the right angle.', show: 'sum.1' },
        { say: 'And check your answer: a leg is always shorter than the hypotenuse. In part two, we find diagonals, and solve two-step problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
