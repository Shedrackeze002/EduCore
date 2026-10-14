import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-5-1',
  lessonId: 'm201-5-1',
  title: 'Working with Radicals, Part 1: Simplest Form',
  thumbnailTitle: 'Radicals in Simplest Form',
  thumbnail: 'm',
  summary: 'The index and radicand of a radical, why √(ab) = √a·√b for non-negative a and b, entire and mixed radicals, writing √300 and the cube root of −54 in simplest form, and why 2√75 is not finished. Parts 2 and 3 cover variables, comparing, adding and subtracting.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 5.1 · Part 1', title: 'Simplest Form', subtitle: 'Mixed and entire radicals' }],
      lines: [
        { say: 'A square courtyard with an area of 200 square metres has sides root 200 metres long. An engineer would write that as ten root two: exact, easy to estimate, and easy to add to other lengths.', show: 'title' },
        { say: 'In this video, you will see why the square root of a product splits into two roots, and use it to write radicals in simplest form.' },
      ],
    },
    {
      chapter: 'Radicals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Radical', md: 'A **radical** $\\sqrt[n]{a}$ has an **index** $n$ and a **radicand** $a$. For a square root, the index $2$ is not written. For an even index, $\\sqrt[n]{a}$ is the **principal** root, never negative, and $a \\ge 0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b} \\quad (a \\ge 0,\\ b \\ge 0)', '\\sqrt{a}\\,\\sqrt{b} \\ge 0 \\quad\\text{and}\\quad \\left(\\sqrt{a}\\,\\sqrt{b}\\right)^2 = ab'] },
      ],
      lines: [
        { say: 'A radical has an index and a radicand. The cube root of eight has index three and radicand eight. For a square root, the index two is not written.', show: 'def' },
        { say: 'When the index is even, the radical means the principal root, which is never negative, and the radicand must be non-negative.' },
        { say: 'Everything in this unit rests on one property: the square root of "a" times b equals root "a" times root b, when "a" and b are non-negative.', show: 'm.0', focus: 'm.0' },
        { say: 'Why is it true? Root "a" and root b are both non-negative, so their product is too. And its square is "a" times b. So root "a" times root b is the non-negative number whose square is "a" b, which is exactly what the square root of "a" b means.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Entire to mixed',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mixed and entire radicals', md: 'An **entire radical** has nothing outside, such as $\\sqrt{300}$. A **mixed radical** has a coefficient outside, such as $10\\sqrt{3}$. In **simplest form**, the radicand has no perfect-square factor except $1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{300} = \\sqrt{100}\\,\\sqrt{3} = 10\\sqrt{3}', '\\sqrt[3]{-54} = \\sqrt[3]{-27}\\,\\sqrt[3]{2} = -3\\sqrt[3]{2}'] },
      ],
      lines: [
        { say: 'An entire radical, like root 300, has nothing outside the radical sign. A mixed radical, like ten root three, has a coefficient outside. A radical is in simplest form when its radicand has no perfect-square factor other than one.', show: 'def' },
        { say: 'Write root 300 in simplest form. The largest perfect square that divides 300 is 100. So root 300 is root 100 times root three, which is ten root three.', show: 'm.0', focus: 'm.0' },
        { say: 'For a cube root, look for perfect cubes instead. The largest perfect cube dividing negative fifty-four is negative twenty-seven, which is negative three, cubed. So the cube root of negative fifty-four is negative three times the cube root of two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Stopping too early',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping too early', md: '$2\\sqrt{75}$ is equal to $\\sqrt{300}$, but it is **not** simplest form: $75 = 25 \\times 3$ still contains a perfect square.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{300} = \\sqrt{4}\\,\\sqrt{75} = 2\\sqrt{75}', '2\\sqrt{75} = 2\\sqrt{25}\\,\\sqrt{3} = 10\\sqrt{3}'] },
      ],
      lines: [
        { say: 'Root 300 is also root four times root seventy-five, or two root seventy-five. That is true, but it is not simplest form, because seventy-five still contains the perfect square twenty-five.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Keep going: two times five root three is ten root three, the same answer as before. Using the largest perfect square gets there in one step.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\sqrt{72}$ in simplest form.',
          choices: ['$6\\sqrt{2}$', '$2\\sqrt{18}$', '$3\\sqrt{8}$', '$36\\sqrt{2}$'],
          answer: 0,
          working: 'The largest perfect square dividing $72$ is $36$: $\\sqrt{72} = \\sqrt{36}\\,\\sqrt{2} = 6\\sqrt{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write root seventy-two in simplest form. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The largest perfect square that divides seventy-two is thirty-six, so root seventy-two is six root two. B and C are equal to it, but eighteen and eight still contain perfect squares. D forgets to take the square root of thirty-six.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}$ for $a, b \\ge 0$.', 'Simplest form: take out the **largest** perfect square, or cube.', 'Mixed and entire radicals name the same number.'] }],
      lines: [
        { say: 'Let’s sum up. The square root of "a" b is root "a" times root b, when "a" and b are non-negative.', show: 'sum.0' },
        { say: 'For simplest form, take out the largest perfect square, or the largest perfect cube for a cube root.', show: 'sum.1' },
        { say: 'And a mixed radical and its entire radical name the same number. In part two, we work with variables, and compare radicals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
