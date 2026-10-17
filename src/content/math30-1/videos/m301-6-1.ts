import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';
import { circleMarks, edgeNumbers, rad } from './lib/m301-6-figures.ts';

const g = plane({ x: [0, 360], y: [-1.5, 1.5], xStep: 90, yStep: 0.5, every: 0, width: 8, height: 4.4 });

const video: Explainer = {
  id: 'm301-6-1',
  lessonId: 'm301-6-1',
  title: 'Reciprocal, Quotient and Pythagorean Identities, Part 1: Identities and Non-Permissible Values',
  thumbnailTitle: 'Identities and Non-Permissible Values',
  thumbnail: 'holes',
  summary: 'What makes an equation such as sin x / tan x = cos x a trigonometric identity, and how to find the non-permissible values of an expression, including the hidden denominators in tan x, sec x, cot x and csc x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.1 · Part 1', title: 'Identities and Non-Permissible Values', subtitle: 'Equations that are true for every permissible value' }],
      lines: [
        { say: 'Engineers who model sound waves and alternating current rewrite trigonometric expressions all the time, because a simpler form is easier to graph and to calculate with. The tools for this are called identities.', show: 'title' },
        { say: 'In this video, you will learn what makes an equation an identity, and how to find the values where an expression is not defined.' },
      ],
    },
    {
      chapter: 'What is an identity?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\sin x}{\\tan x} = \\cos x', 'x = 30^\\circ:\\quad \\dfrac{\\sin 30^\\circ}{\\tan 30^\\circ} = \\dfrac{\\frac{1}{2}}{\\frac{\\sqrt{3}}{3}} = \\dfrac{\\sqrt{3}}{2} = \\cos 30^\\circ'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Trigonometric identity', md: 'An equation involving trigonometric functions that is true for **every** permissible value of the variable.' },
      ],
      lines: [
        { say: 'Look at this equation: sine x over tan x equals cosine x.', show: 'm.0', focus: 'm.0' },
        { say: 'Try x equals thirty degrees. Sine thirty degrees is one half, and tan thirty degrees is root three over three. Dividing one half by root three over three gives root three over two, which is exactly cosine thirty degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Try x equals two radians, or any other angle you like, and the two sides still agree, as long as both sides are defined.' },
        { say: 'An equation like this is called a trigonometric identity: an equation involving trigonometric functions that is true for every permissible value of the variable.', show: 'def', focus: 'm' },
      ],
    },
    {
      chapter: 'Non-permissible values',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('holes', [
          g,
          edgeNumbers(g, { xs: [0, 90, 180, 270, 360], ys: [-1, 0, 1] }),
          plot(g, { id: 'curve', f: (x) => Math.cos(rad(x)), from: 0, to: 360, samples: 200 }),
          dots(g, [0, 90, 180, 270, 360].map((x, i) => ({ id: `h${i}`, x, y: Math.round(Math.cos(rad(x))), tone: 'theta' as const, open: true, group: 'gaps' }))),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Non-permissible value', md: 'A value of the variable that makes an expression undefined: a denominator is $0$, or a function such as $\\tan x$ or $\\sec x$ does not exist there.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan x = \\dfrac{\\sin x}{\\cos x}', '\\cos x \\ne 0 \\text{ and } \\sin x \\ne 0'] },
      ],
      lines: [
        { say: 'A non-permissible value is a value of the variable that makes an expression undefined. Either a denominator is zero, or a function such as tan x or secant x does not exist there.', show: 'def' },
        { say: 'Tan x is sine x over cosine x. So the left side, sine x over tan x, is undefined when cosine x is zero, because then tan x does not exist.', show: 'm.0', focus: 'm.0' },
        { say: 'It is also undefined when tan x is zero, which happens when sine x is zero, because then we would be dividing by zero.', show: 'm.1', focus: 'm.1' },
        { say: 'So the graph of the left side is the cosine curve with holes in it: at 0, 90, 180, 270 and 360 degrees. Everywhere else, it matches cosine x exactly.', show: ['holes.grid', 'holes.axes', 'holes.curve', 'holes.gaps'], focus: 'holes.gaps' },
      ],
    },
    {
      chapter: 'Finding non-permissible values',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('uc', [
          unitCircle({ r: 3 }),
          circleMarks(3, [
            { deg: 0, tex: '0', tone: 'opp', place: 'above right' },
            { deg: 180, tex: '\\pi', tone: 'opp', place: 'above left' },
            { deg: 90, tex: '\\frac{\\pi}{2}', tone: 'adj', place: 'above right' },
            { deg: 270, tex: '\\frac{3\\pi}{2}', tone: 'adj', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{\\cos x}{\\sin x\\tan x},\\quad 0 \\le x < 2\\pi', '\\sin x = 0:\\quad x = 0,\\ \\pi', '\\cos x = 0:\\quad x = \\dfrac{\\pi}{2},\\ \\dfrac{3\\pi}{2}', 'x \\ne 0,\\ \\dfrac{\\pi}{2},\\ \\pi,\\ \\dfrac{3\\pi}{2}', 'x \\ne \\dfrac{\\pi}{2}n,\\ n \\in \\mathrm{I}'] },
      ],
      lines: [
        { say: 'Determine the non-permissible values of cosine x, over sine x times tan x, for x from zero up to, but not including, two pi.', show: 'm.0', focus: 'm.0' },
        { say: 'First, the factor sine x in the denominator cannot be zero. On the unit circle, sine x is the y-coordinate, which is zero at x equals zero and at x equals pi.', show: ['m.1', 'uc.axes', 'uc.circle', 'uc.m0', 'uc.m180'], focus: ['m.1', 'uc.m0', 'uc.m180'] },
        { say: 'Next, tan x is undefined when cosine x is zero. Cosine x is the x-coordinate, which is zero at pi over two and at three pi over two.', show: ['m.2', 'uc.m90', 'uc.m270'], focus: ['m.2', 'uc.m90', 'uc.m270'] },
        { say: 'Tan x in the denominator cannot be zero either. But tan x is zero only where sine x is zero, and those values are already on the list.' },
        { say: 'So x cannot be zero, pi over two, pi, or three pi over two.', show: 'm.3', focus: 'm.3' },
        { say: 'These are a quarter turn apart. So for all real numbers, x cannot equal pi over two times n, where n is an integer.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Hidden denominators',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tan x = \\dfrac{\\sin x}{\\cos x} \\qquad \\sec x = \\dfrac{1}{\\cos x}', '\\cot x = \\dfrac{\\cos x}{\\sin x} \\qquad \\csc x = \\dfrac{1}{\\sin x}'] },
        { kind: 'callout', id: 'tip', tone: 'mistake', title: 'Hidden denominators', md: '$\\tan x$ and $\\sec x$ have $\\cos x$ in a denominator; $\\cot x$ and $\\csc x$ have $\\sin x$. Check them as well as any fraction you can see.' },
      ],
      lines: [
        { say: 'The easiest values to miss are the ones in hidden denominators.', show: 'tip' },
        { say: 'Tan x and secant x both have cosine x in a denominator, so they need cosine x not equal to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Cotangent x and cosecant x both have sine x in a denominator, so they need sine x not equal to zero.', show: 'm.1', focus: 'm.1' },
        { say: 'So whenever you see one of these four functions, check it, as well as any fraction you can see.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which gives **all** the non-permissible values of $\\dfrac{\\tan x}{1 + \\sin x}$ for $0 \\le x < 2\\pi$?',
          choices: ['$\\dfrac{3\\pi}{2}$ only', '$\\dfrac{\\pi}{2}$ and $\\dfrac{3\\pi}{2}$', '$0$ and $\\pi$', '$0,\\ \\dfrac{\\pi}{2},\\ \\pi$ and $\\dfrac{3\\pi}{2}$'],
          answer: 1,
          working: '$1 + \\sin x = 0$ when $\\sin x = -1$: $x = \\dfrac{3\\pi}{2}$. And $\\tan x = \\dfrac{\\sin x}{\\cos x}$ is undefined when $\\cos x = 0$: $x = \\dfrac{\\pi}{2},\\ \\dfrac{3\\pi}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which gives all the non-permissible values of tan x over one plus sine x, for x from zero up to, but not including, two pi? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. One plus sine x is zero when sine x is negative one, at three pi over two. But tan x is sine x over cosine x, so it is also undefined at pi over two. Choice A misses that hidden denominator.', show: 'q.answer' },
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
          items: ['An identity is true for every permissible value of the variable.', 'A non-permissible value makes a denominator $0$ or a function undefined.', 'Hidden denominators: $\\tan x$ and $\\sec x$ need $\\cos x \\ne 0$; $\\cot x$ and $\\csc x$ need $\\sin x \\ne 0$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An identity is an equation that is true for every permissible value of the variable.', show: 'sum.0' },
        { say: 'A non-permissible value makes a denominator zero, or a function undefined.', show: 'sum.1' },
        { say: 'And watch for hidden denominators: tan x and secant x need cosine x not equal to zero, and cotangent x and cosecant x need sine x not equal to zero. In part two, you will meet the reciprocal and quotient identities, and use them to simplify expressions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
