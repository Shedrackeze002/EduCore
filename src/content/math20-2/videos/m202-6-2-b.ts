import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-6-2-b',
  lessonId: 'm202-6-2',
  title: 'Axis of Symmetry and Optimization, Part 2: Maximum and Minimum Values',
  thumbnailTitle: 'Maximum and Minimum Values',
  thumbnail: 'm',
  summary: 'Finding the vertex of y = 2x² + 12x + 7 with x = −b/(2a), keeping the sign of b, deciding whether the vertex is a maximum or a minimum, and the maximum height of a pop fly, 21.1 m after 2 s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 6.2 · Part 2', title: 'Maximum and Minimum Values', subtitle: 'The vertex from the equation' }],
      lines: [
        { say: 'With x equals negative b over two "a", you can find the vertex of any quadratic function without a graph, and with it the greatest or least value.', show: 'title' },
        { say: 'In this video, you will find vertices from standard form, and the maximum height of a baseball.' },
      ],
    },
    {
      chapter: 'Vertex from standard form',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['y = 2x^2 + 12x + 7:\\quad a = 2,\\ b = 12', 'x = -\\dfrac{12}{2(2)} = -3', 'y = 2(-3)^2 + 12(-3) + 7 = 18 - 36 + 7 = -11', '\\text{vertex } (-3, -11);\\ a > 0, \\text{ so minimum value } {-11}'] }],
      lines: [
        { say: 'Find the axis of symmetry and the vertex of y equals two x squared, plus twelve x, plus seven. Here "a" is two and b is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The axis is negative twelve over two times two, which is negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute negative three: eighteen, minus thirty-six, plus seven, is negative eleven.', show: 'm.2', focus: 'm.2' },
        { say: 'So the vertex is negative three, negative eleven. Since "a" is positive, the parabola opens up, and negative eleven is the minimum value.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch the signs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Watch the signs in −b/(2a)', md: 'For $y = x^2 - 6x + 2$, $b = -6$, so $x = -\\dfrac{-6}{2(1)} = 3$, not $-3$. Write $b$ with its sign, then apply the negative in front. And do not forget the $2$ in $2a$.' },
      ],
      lines: [
        { say: 'Watch the signs. For y equals x squared, minus six x, plus two, b is negative six, not six.', show: 'oops' },
        { say: 'So x is negative, negative six, over two, which is positive three, not negative three. Write b with its sign, then apply the negative in front. And do not forget the two in two "a".' },
      ],
    },
    {
      chapter: 'Maximum or minimum?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['$a < 0$: opens down; the vertex gives the **maximum** value.', '$a > 0$: opens up; the vertex gives the **minimum** value.'] }],
      lines: [
        { say: 'The sign of "a" tells you which kind of value the vertex gives. If "a" is negative, the parabola opens down, and the y-coordinate of the vertex is the maximum value.', show: 'b.0' },
        { say: 'If "a" is positive, it opens up, and the y-coordinate of the vertex is the minimum value.', show: 'b.1' },
      ],
    },
    {
      chapter: 'A pop fly',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['h = -4.9t^2 + 19.6t + 1.5', 't = -\\dfrac{19.6}{2(-4.9)} = \\dfrac{19.6}{9.8} = 2', 'h = -4.9(2)^2 + 19.6(2) + 1.5 = 21.1'] }],
      lines: [
        { say: 'A baseball’s height, h metres, t seconds after it is hit, is modelled by h equals negative 4.9 t squared, plus 19.6 t, plus 1.5. Find its maximum height. "A" is negative, so there is a maximum.', show: 'm.0', focus: 'm.0' },
        { say: 'The time of the vertex is negative 19.6 over two times negative 4.9, which is 19.6 over 9.8, or two seconds.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute two: negative 19.6, plus 39.2, plus 1.5, is 21.1. The ball reaches a maximum height of 21.1 metres, two seconds after it is hit.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the vertex of $y = x^2 - 6x + 2$.',
          choices: ['$(3, -7)$', '$(-3, 29)$', '$(3, 2)$', '$(6, 2)$'],
          answer: 0,
          working: '$x = -\\dfrac{-6}{2(1)} = 3$, and $y = 9 - 18 + 2 = -7$. B uses the wrong sign for $b$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the vertex of y equals x squared, minus six x, plus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The axis is negative, negative six, over two, which is three. Then nine minus eighteen plus two is negative seven. B uses the wrong sign for b.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find $x = -\\dfrac{b}{2a}$, keeping the sign of $b$.', 'Substitute it to find the $y$-coordinate of the vertex.', '$a < 0$: maximum value. $a > 0$: minimum value.'] }],
      lines: [
        { say: 'Let’s sum up. Find the axis with negative b over two "a", keeping the sign of b.', show: 'sum.0' },
        { say: 'Substitute it into the equation to find the y-coordinate of the vertex.', show: 'sum.1' },
        { say: 'And if "a" is negative, that is the maximum value; if "a" is positive, it is the minimum. In part three, we solve optimization problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
