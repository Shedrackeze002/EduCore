import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-7-1-c',
  lessonId: 'm301-7-1',
  title: 'Characteristics of Exponential Functions, Part 3: Finding an Exponential Equation',
  thumbnailTitle: 'Finding an Exponential Equation',
  summary: 'What a and c mean in y = a(c)ˣ, finding the equation through (1, 6) and (3, 54) by dividing one equation by the other, reading the model P = 8400(1.025)ᵗ, and why a factor of 0.86 means a decrease of 14% per period.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.1 · Part 3', title: 'Finding an Exponential Equation', subtitle: 'From two points, or from a model' }],
      lines: [
        { say: 'Biologists, banks and town planners describe change with equations like y equals "a" times c to the power x. Two points are enough to find the whole equation.', show: 'title' },
        { say: 'In this video, you will see what "a" and c mean, find them from two points, and read a real population model.' },
      ],
    },
    {
      chapter: 'What a and c mean',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = a(c)^{x}'] },
        { kind: 'table', id: 't', head: ['$x$', '$0$', '$1$', '$2$', '$3$'], rows: [['$y$', '$a$', '$ac$', '$ac^{2}$', '$ac^{3}$']] },
        { kind: 'bullets', id: 'b', items: ['$a$ is the $y$-intercept, because $c^{0} = 1$.', 'Each increase of $1$ in $x$ multiplies $y$ by $c$.'] },
      ],
      lines: [
        { say: 'Here is the general form: y equals "a" times c to the power x.', show: 'm.0' },
        { say: 'When x is zero, c to the power zero is one, so y equals "a". That makes "a" the y-intercept, the starting value.', show: ['t', 'b.0'], focus: 'b.0' },
        { say: 'Then each time x goes up by one, y is multiplied by c again: "a" c, then "a" c squared, then "a" c cubed. So c is the factor for each step.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Equation through two points',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['6 = ac \\qquad 54 = ac^{3}', '\\dfrac{ac^{3}}{ac} = \\dfrac{54}{6}', 'c^{2} = 9,\\quad c = 3 \\quad (c > 0)', 'a = \\dfrac{6}{3} = 2', 'y = 2(3)^{x}'] },
      ],
      lines: [
        { say: 'An exponential function, y equals "a" times c to the power x, passes through the points at one, six, and three, 54. Find its equation.' },
        { say: 'Substitute each point. Six equals "a" times c, and 54 equals "a" times c cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'There are two unknowns. To get rid of "a", divide the second equation by the first. The "a" cancels, and c cubed over c leaves c squared. On the right, 54 over six is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'So c squared equals nine. That gives c equals three or negative three, but the base of an exponential function must be positive. So c is three.', show: 'm.2', focus: 'm.2' },
        { say: 'Now go back to six equals "a" c. Six equals "a" times three, so "a" is two.', show: 'm.3', focus: 'm.3' },
        { say: 'The equation is y equals two times three to the power x. Check the second point: two times three cubed is two times 27, which is 54.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Reading a model',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['P = 8400(1.025)^{t}', 't = 0:\\quad P = 8400', '1.025 = 1 + 0.025 \\;\\to\\; 2.5\\%\\text{ growth per year}'] },
      ],
      lines: [
        { say: 'The population of a town near Red Deer is modelled by P equals 8,400 times 1.025 to the power t, where t is the number of years since twenty twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'When t is zero, P is 8,400. That is the population in twenty twenty, the starting value.', show: 'm.1', focus: 'm.1' },
        { say: 'Each year, the population is multiplied by 1.025. That is one plus 0.025, so the population grows by 2.5 percent per year.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Growth and decay rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Growth and decay rates', md: 'A factor of $1 + r$ means growth at rate $r$; a factor of $1 - r$ means decay at rate $r$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.86 = 1 - 0.14 \\;\\to\\; 14\\%\\text{ decrease per period}'] },
      ],
      lines: [
        { say: 'In general, a factor of one plus r means growth at the rate r. A factor of one minus r means decay at the rate r.', show: 'tip' },
        { say: 'Be careful here. A factor of 0.86 does not mean a decrease of 86 percent. It is one minus 0.14, so the quantity decreases by 14 percent per period. It keeps 86 percent, and loses 14 percent.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An exponential function $y = a(c)^{x}$ passes through $(1, 8)$ and $(3, 32)$. Find its equation.',
          choices: ['$y = 2(4)^{x}$', '$y = 4(2)^{x}$', '$y = 8(2)^{x}$', '$y = 4(-2)^{x}$'],
          answer: 1,
          working: '$\\dfrac{ac^{3}}{ac} = \\dfrac{32}{8}$, so $c^{2} = 4$ and $c = 2$ (the base is positive). Then $8 = 2a$, so $a = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. An exponential function passes through the points at one, eight, and three, 32. Find its equation. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Dividing gives c squared equals four, so c is two, and eight equals two "a", so "a" is four. C uses eight as "a", but eight is the value at x equals one, not the y-intercept.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In $y = a(c)^{x}$, $a$ is the $y$-intercept and $c$ is the factor for each step.', 'From two points, divide one equation by the other so that $a$ cancels.', 'The base must be positive: reject a negative $c$.', 'A factor of $1 + r$ is growth at rate $r$; $1 - r$ is decay at rate $r$.'] }],
      lines: [
        { say: 'Let’s sum up. In y equals "a" times c to the power x, "a" is the y-intercept, and c is the factor for each step.', show: 'sum.0' },
        { say: 'To find the equation from two points, substitute both, and divide one equation by the other so that "a" cancels.', show: 'sum.1' },
        { say: 'The base must be positive, so reject a negative value of c.', show: 'sum.2' },
        { say: 'And a factor of one plus r is growth, while one minus r is decay. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
