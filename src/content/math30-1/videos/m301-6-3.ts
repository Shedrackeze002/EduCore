import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, rad, vline } from './lib/m301-6-figures.ts';

const XS = [0, 90, 180, 270, 360];
const g = plane({ x: [0, 360], y: [-4, 4], xStep: 90, yStep: 1, every: 0, width: 8, height: 6 });
const h = plane({ x: [0, 360], y: [-2.5, 2.5], xStep: 90, yStep: 1, every: 0, width: 8, height: 5 });
const sec = (x: number) => 1 / Math.cos(rad(x));

const video: Explainer = {
  id: 'm301-6-3',
  lessonId: 'm301-6-3',
  title: 'Proving Identities, Part 1: Checking with Numbers and Graphs',
  thumbnailTitle: 'Checking Identities with Numbers and Graphs',
  thumbnail: 'same',
  summary: 'Verifying sec x − cos x = sin x tan x at x = 30° and by graphing both sides, why a check is not a proof, and how one counterexample, such as x = 90° for sin 2x = 2 sin x, shows that an equation is not an identity.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.3 · Part 1', title: 'Checking with Numbers and Graphs', subtitle: 'A check is not a proof' }],
      lines: [
        { say: 'Checking an equation at a few angles can show that it is not an identity. But it can never prove that it is one, any more than testing a few triangles proves the Pythagorean theorem.', show: 'title' },
        { say: 'In this video, you will check an identity with numbers and with graphs, and use one counterexample to show that an equation is not an identity.' },
      ],
    },
    {
      chapter: 'A numerical check',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\sec x - \\cos x = \\sin x\\tan x,\\quad x = 30^\\circ',
            '\\text{Left side: } \\sec 30^\\circ - \\cos 30^\\circ = \\dfrac{2}{\\sqrt{3}} - \\dfrac{\\sqrt{3}}{2} = \\dfrac{4 - 3}{2\\sqrt{3}} = \\dfrac{\\sqrt{3}}{6}',
            '\\text{Right side: } \\sin 30^\\circ\\tan 30^\\circ = \\dfrac{1}{2}\\cdot\\dfrac{\\sqrt{3}}{3} = \\dfrac{\\sqrt{3}}{6}',
            '\\text{Both sides} = \\dfrac{\\sqrt{3}}{6} \\approx 0.289',
          ],
        },
      ],
      lines: [
        { say: 'To check an identity numerically, substitute a value of x into each side and compare. Choose a permissible value. A value that is not a special angle is even better, because a coincidence is less likely. Here, thirty degrees keeps the arithmetic exact.', show: 'm.0', focus: 'm.0' },
        { say: 'Check secant x minus cosine x equals sine x tan x, at thirty degrees. The left side is two over root three, minus root three over two. Over the common denominator, two root three, that is four minus three, over two root three, which simplifies to root three over six.', show: 'm.1', focus: 'm.1' },
        { say: 'The right side is one half times root three over three, which is also root three over six.', show: 'm.2', focus: 'm.2' },
        { say: 'Both sides equal root three over six, about 0.289. So the equation holds at thirty degrees. But that is just one value: it does not prove the equation holds for every value.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A graphical check',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('same', [
          g,
          edgeNumbers(g, { xs: XS, ys: [-4, -2, 0, 2, 4] }),
          vline(g, { id: 'v90', x: 90, group: 'asym' }),
          vline(g, { id: 'v270', x: 270, group: 'asym' }),
          plot(g, { id: 'ls', f: (x) => sec(x) - Math.cos(rad(x)), samples: 720, tone: 'brand' }),
          plot(g, { id: 'rs', f: (x) => Math.sin(rad(x)) * Math.tan(rad(x)), samples: 720, tone: 'opp', dashed: true }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\brand{y = \\sec x - \\cos x}', '\\opp{y = \\sin x\\tan x}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The same graph', md: 'The graphs match everywhere in the window, including the vertical asymptotes at the non-permissible values $x = 90^\\circ$ and $x = 270^\\circ$.' },
      ],
      lines: [
        { say: 'Graphing both sides checks every value in the window at once. Here is the left side, y equals secant x minus cosine x, in purple.', show: ['same.grid', 'same.axes', 'same.ls', 'm.0'], focus: 'm.0' },
        { say: 'Now the right side, y equals sine x tan x, dashed in orange. It lies exactly on top of the first graph.', show: ['same.rs', 'm.1'], focus: ['m.1', 'same.rs'] },
        { say: 'The graphs even share their vertical asymptotes, at 90 and 270 degrees. Those are the non-permissible values, where cosine x is zero.', show: ['same.asym', 'key'], focus: 'same.asym' },
        { say: 'This is strong evidence that the equation is an identity. But a graph only shows part of the domain, so it is still a check, not a proof.' },
      ],
    },
    {
      chapter: 'When the graphs differ',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('diff', [
          h,
          edgeNumbers(h, { xs: XS, ys: [-2, -1, 0, 1, 2] }),
          plot(h, { id: 'a', f: (x) => Math.sin(2 * rad(x)), samples: 300, tone: 'brand' }),
          plot(h, { id: 'b', f: (x) => 2 * Math.sin(rad(x)), samples: 300, tone: 'opp' }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\brand{y = \\sin 2x}', '\\opp{y = 2\\sin x}', '\\sin 2(90^\\circ) = \\sin 180^\\circ = 0', '2\\sin 90^\\circ = 2(1) = 2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'One counterexample is enough', md: 'One permissible value where the two sides differ shows that an equation is **not** an identity.' },
      ],
      lines: [
        { say: 'When the graphs differ, the equation is not an identity. Is sine two x equal to two sine x? Graph y equals sine two x, in purple, and y equals two sine x, in orange.', show: ['diff.grid', 'diff.axes', 'diff.a', 'diff.b', 'm.0', 'm.1'] },
        { say: 'The curves cross at a few points, at 0, 180 and 360 degrees, but they are clearly different curves.', focus: ['diff.a', 'diff.b'] },
        { say: 'One value is enough to prove it. At 90 degrees, sine two x is sine 180 degrees, which is zero. But two sine x is two times one, which is two.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'A value like this is called a counterexample. One counterexample shows that an equation is not an identity.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which value of $x$ is a counterexample that shows $\\cos 2x = 2\\cos x - 1$ is **not** an identity?',
          choices: ['$0^\\circ$', '$90^\\circ$', '$360^\\circ$', '$60^\\circ$'],
          answer: 3,
          working: 'At $x = 60^\\circ$: $\\cos 120^\\circ = -\\dfrac{1}{2}$, but $2\\cos 60^\\circ - 1 = 0$. At $0^\\circ$, $90^\\circ$ and $360^\\circ$ the two sides are equal, so they cannot show it.',
        },
      ],
      lines: [
        { say: 'Your turn. Which value of x is a counterexample that shows cosine two x equals two cosine x minus one is not an identity? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. At sixty degrees, the left side is cosine 120 degrees, which is negative one half. The right side is two times one half, minus one, which is zero. Choice B does not work: at ninety degrees, both sides equal negative one, so it is not a counterexample.', show: 'q.answer' },
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
          items: ['A numerical check substitutes one permissible value into each side and compares.', 'Graphing both sides checks every value in the window at once.', 'A check supports an identity, but only a proof shows it. One counterexample shows an equation is **not** an identity.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A numerical check substitutes one permissible value into each side, and compares.', show: 'sum.0' },
        { say: 'Graphing both sides checks every value in the window at once.', show: 'sum.1' },
        { say: 'A check supports an identity, but only a proof shows it is true everywhere. And one counterexample shows that an equation is not an identity. In part two, you will prove an identity with algebra. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
