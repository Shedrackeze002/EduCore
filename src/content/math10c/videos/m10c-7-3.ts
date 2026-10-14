import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-7-3',
  lessonId: 'm10c-7-3',
  title: 'General Form, Part 1: Converting to General Form',
  thumbnailTitle: 'General Form',
  summary: 'General form Ax + By + C = 0, which has no fractions and can describe vertical lines, and converting to it from slope-intercept and slope-point form: clear fractions, move every term left, make A positive. Part 2 uses general form.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.3 · Part 1', title: 'General Form', subtitle: '$Ax + By + C = 0$' }],
      lines: [
        { say: 'The third standard way to write a linear relation is general form. It has no fractions, and every line, even a vertical one, can be written this way.', show: 'title' },
        { say: 'In this video, you will convert equations to general form. In part two, you will use it to find slopes and intercepts.' },
      ],
    },
    {
      chapter: 'General form',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'General form', md: '$Ax + By + C = 0$, where $A$ is a whole number (positive, or $0$), and $B$ and $C$ are integers.' },
        { kind: 'math', id: 'm', lines: ['2x - 3y + 6 = 0', 'x + 4 = 0 \\quad \\text{(vertical)}', 'y - 5 = 0 \\quad \\text{(horizontal)}'] },
      ],
      lines: [
        { say: 'General form is "A" x plus B y plus C equals zero. All the terms are on one side, the coefficients are integers, and by convention, "A" is not negative.', show: 'def' },
        { say: 'For example, two x minus three y plus six equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'x plus four equals zero is a vertical line, which slope-intercept form cannot describe. And y minus five equals zero is a horizontal line.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Converting',
      layout: 'split',
      leftWidth: 520,
      left: [
        {
          kind: 'bullets',
          id: 'r',
          items: ['Clear fractions: multiply by the lowest common denominator.', 'Move every term to the left, so the right side is $0$.', 'If $A$ is negative, multiply every term by $-1$.'],
        },
      ],
      right: [
        { kind: 'text', id: 'q', md: 'Write $y = \\tfrac23 x - 4$ in general form.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3y = 2x - 12', '-2x + 3y + 12 = 0', '2x - 3y - 12 = 0'] },
      ],
      lines: [
        { say: 'Write y equals two thirds x minus four in general form. First, clear the fraction: multiply every term by three. Three y equals two x minus twelve.', show: ['q', 'r.0', 'm.0'], focus: ['r.0', 'm.0'] },
        { say: 'Next, move every term to the left: negative two x plus three y plus twelve equals zero.', show: ['r.1', 'm.1'], focus: ['r.1', 'm.1'] },
        { say: '"A" is negative, so multiply every term by negative one: two x minus three y minus twelve equals zero.', show: ['r.2', 'm.2'], focus: ['r.2', 'm.2'] },
      ],
    },
    {
      chapter: 'From slope-point form',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Write $y + 1 = -\\tfrac12(x - 6)$ in general form.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['2y + 2 = -(x - 6)', '2y + 2 = -x + 6', 'x + 2y - 4 = 0'] },
      ],
      lines: [
        { say: 'Write y plus one equals negative one half, times x minus six, in general form.', show: 'q' },
        { say: 'Multiply both sides by two. Two y plus two equals negative, x minus six, which is negative x plus six.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Move every term to the left: x plus two y plus two minus six equals zero, so x plus two y minus four equals zero. "A" is already positive.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Almost is not enough',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['2x - 3y = 6 \\;\\to\\; 2x - 3y - 6 = 0', '-x + \\tfrac12 y - 4 = 0 \\;\\to\\; 2x - y + 8 = 0'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Check all three', md: 'Every term on one side, integer coefficients, and $A > 0$.' },
      ],
      lines: [
        { say: 'Two x minus three y equals six is not quite general form, because the right side must be zero. It becomes two x minus three y minus six equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'And negative x plus one half y minus four equals zero has a fraction and a negative "A". Multiply every term by negative two: two x minus y plus eight equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'So check all three: every term on one side, integer coefficients, and a positive "A".', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $y = \\tfrac34 x + 2$ in general form.',
          choices: ['$3x - 4y + 8 = 0$', '$3x - 4y + 2 = 0$', '$-3x + 4y - 8 = 0$', '$3x + 4y + 8 = 0$'],
          answer: 0,
          working: 'Multiply by $4$: $4y = 3x + 8$. Move every term left: $-3x + 4y - 8 = 0$. Make $A$ positive: $3x - 4y + 8 = 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write y equals three quarters x plus two in general form. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply by four: four y equals three x plus eight. Move every term to the left, and multiply by negative one: three x minus four y plus eight equals zero. B forgets to multiply the two by four, and C leaves "A" negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['General form: $Ax + By + C = 0$, with integers and $A \\ge 0$.', 'Clear fractions, move every term left, make $A$ positive.', 'General form can describe vertical lines.'] }],
      lines: [
        { say: 'Let’s sum up. General form is "A" x plus B y plus C equals zero, with integer coefficients, and "A" not negative.', show: 'sum.0' },
        { say: 'To convert, clear the fractions, move every term to the left, and make "A" positive.', show: 'sum.1' },
        { say: 'And general form can describe vertical lines. In part two, we use general form to find slopes and intercepts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
