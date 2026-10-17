import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, numbers, tag, vAsym } from './lib/m301-8-graphs.ts';

// Stretched upward, so the hole at a height of 5/6 sits clearly below the asymptote y = 1.
const g = plane({ x: [-7, 5], y: [-2, 3], yStep: 0.5, every: 0, width: 12, height: 12 });

const video: Explainer = {
  id: 'm301-8-1-b',
  lessonId: 'm301-8-1',
  title: 'Exploring Rational Functions, Part 2: Vertical Asymptotes and Holes',
  thumbnailTitle: 'Asymptotes and Holes',
  thumbnail: 'gr',
  summary: 'Why a rational function must be factored first: a factor that cancels gives a point of discontinuity (a hole), and a factor left in the denominator gives a vertical asymptote, for f(x) = (x² − x − 6)/(x² − 9), with its graph and the domain.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.1 · Part 2', title: 'Asymptotes and Holes', subtitle: 'Factor first' }],
      lines: [
        { say: 'A rational function is undefined wherever its denominator is zero. But its graph does not always do the same thing there. Sometimes it shoots off without bound, and sometimes just one point is missing.', show: 'title' },
        { say: 'In this video, you will factor first, and tell a vertical asymptote from a point of discontinuity, or hole.' },
      ],
    },
    {
      chapter: 'Points of discontinuity',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Point of discontinuity', md: 'A single point missing from a graph, drawn as an open circle (a “hole”). It occurs at $x = a$ when $(x - a)$ is a factor of both the numerator and the denominator and cancels completely.' },
        { kind: 'bullets', id: 'b', items: ['A factor of the denominator that **cancels** gives a point of discontinuity.', 'A factor of the denominator that **remains** gives a vertical asymptote.'] },
      ],
      lines: [
        { say: 'A point of discontinuity is a single point missing from a graph. It is drawn as an open circle, and it is often called a hole.', show: 'def' },
        { say: 'It happens at x equals "a" when x minus "a" is a factor of both the numerator and the denominator, and cancels completely.' },
        { say: 'So always factor first. A factor of the denominator that cancels gives a point of discontinuity. Everywhere else, the function behaves like the simplified one.', show: 'b.0', focus: 'b.0' },
        { say: 'A factor of the denominator that remains after cancelling gives a vertical asymptote. Near it, the denominator is close to zero but the numerator is not, so the values blow up.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'A hole and an asymptote',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = \\dfrac{x^2 - x - 6}{x^2 - 9} = \\dfrac{(x - 3)(x + 2)}{(x - 3)(x + 3)}',
            'f(x) = \\dfrac{x + 2}{x + 3},\\quad x \\ne 3',
            '\\text{hole at } x = 3:\\quad y = \\dfrac{3 + 2}{3 + 3} = \\dfrac{5}{6}',
            '\\text{vertical asymptote: } x = -3',
          ],
        },
      ],
      lines: [
        { say: 'Find the points of discontinuity and the vertical asymptotes of f of x equals x squared minus x minus six, over x squared minus nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor first. The numerator is x minus three, times x plus two. The denominator is a difference of squares: x minus three, times x plus three.' },
        { say: 'The factor x minus three is in both, so it cancels. f of x equals x plus two, over x plus three, with x not equal to three.', show: 'm.1', focus: 'm.1' },
        { say: 'So there is a hole at x equals three. Its y-coordinate comes from the simplified function: three plus two, over three plus three, is five sixths. The hole is at three, five sixths.', show: 'm.2', focus: 'm.2' },
        { say: 'The factor x plus three remains in the denominator, so x equals negative three is a vertical asymptote.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('gr', [
          g,
          numbers(g, 2, 1),
          vAsym(g, 'va', -3),
          hAsym(g, 'ha', 1, 'muted'),
          tag(g, 'va-name', -3, -1.3, 'x = -3', 'left'),
          tag(g, 'ha-name', 5, 1, 'y = 1', 'above left', 'muted'),
          branches(g, { id: 'c', f: (x) => (x + 2) / (x + 3), breaks: [-3] }),
          dots(g, [{ id: 'H', x: 3, y: 5 / 6, tex: '\\left(3, \\tfrac{5}{6}\\right)', tone: 'opp', place: 'below', open: true }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{asymptote: } x = -3', '\\text{hole: } \\left(3, \\tfrac{5}{6}\\right)'] }],
      lines: [
        { say: 'Here is the graph. Near x equals negative three, the denominator is close to zero, so the values blow up. The graph runs up and down beside the vertical asymptote.', show: ['gr.grid', 'gr.axes', 'gr.va', 'gr.va-name', 'gr.c', 'm.0'], focus: ['gr.va', 'm.0'] },
        { say: 'At x equals three, nothing like that happens. The graph passes straight through, with only one point missing: the open circle at three, five sixths.', show: ['gr.H', 'm.1'], focus: ['gr.H', 'm.1'] },
        { say: 'Everywhere else, the graph of f is exactly the graph of y equals x plus two, over x plus three.', focus: 'gr.c' },
        { say: 'The grey dashed line, y equals one, is a horizontal asymptote. Part three shows where it comes from.', show: ['gr.ha', 'gr.ha-name'], focus: 'gr.ha' },
      ],
    },
    {
      chapter: 'Not every zero gives an asymptote',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not every zero of the denominator gives an asymptote', md: 'Setting $x^2 - 9 = 0$ gives $x = \\pm 3$, but only $x = -3$ is a vertical asymptote. Factor and cancel before you decide. Both values are still excluded from the domain.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\{x \\mid x \\ne -3,\\ x \\ne 3,\\ x \\in \\mathbb{R}\\}'] },
      ],
      lines: [
        { say: 'A common mistake is to set the denominator equal to zero, and call every answer a vertical asymptote.', show: 'oops' },
        { say: 'x squared minus nine is zero when x is three or negative three. But only x equals negative three is a vertical asymptote. At x equals three, the factor cancels, so there is a hole instead.' },
        { say: 'Both values are still excluded from the domain, because the original function is undefined at both. The domain is all real x, except negative three and three.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which describes the graph of $f(x) = \\dfrac{x^2 - 1}{x^2 + 2x - 3}$?',
          choices: [
            'Vertical asymptotes $x = 1$ and $x = -3$',
            'A hole at $x = -3$ and a vertical asymptote $x = 1$',
            'A hole at $\\left(1, \\tfrac{1}{2}\\right)$ and a vertical asymptote $x = 3$',
            'A hole at $\\left(1, \\tfrac{1}{2}\\right)$ and a vertical asymptote $x = -3$',
          ],
          answer: 3,
          working: '$f(x) = \\dfrac{(x - 1)(x + 1)}{(x + 3)(x - 1)} = \\dfrac{x + 1}{x + 3}$, $x \\ne 1$. The hole is at $x = 1$, $y = \\dfrac{1 + 1}{1 + 3} = \\dfrac{1}{2}$; $x + 3$ remains, so $x = -3$ is a vertical asymptote.',
        },
      ],
      lines: [
        { say: 'Your turn. Which describes the graph of f of x equals x squared minus one, over x squared plus two x minus three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The numerator is x minus one, times x plus one, and the denominator is x plus three, times x minus one. x minus one cancels, so there is a hole at x equals one, at a height of one plus one, over one plus three: one half. x plus three remains, so x equals negative three is a vertical asymptote. Choice A calls every zero of the denominator an asymptote.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Factor the numerator and the denominator first.',
            'A factor that cancels gives a hole; find its $y$ from the simplified function.',
            'A factor left in the denominator gives a vertical asymptote.',
            'Every zero of the original denominator is excluded from the domain.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Always factor the numerator and the denominator first.', show: 'sum.0' },
        { say: 'A factor that cancels gives a hole. Find its y-coordinate from the simplified function.', show: 'sum.1' },
        { say: 'A factor that is left in the denominator gives a vertical asymptote.', show: 'sum.2' },
        { say: 'And every zero of the original denominator is excluded from the domain. In part three, we find horizontal asymptotes by comparing degrees. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
