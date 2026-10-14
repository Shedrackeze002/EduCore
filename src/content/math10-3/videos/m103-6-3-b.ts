import type { Explainer } from '@/video/script.ts';
import { transversal } from '@/video/angles.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm103-6-3-b',
  lessonId: 'm103-6-3',
  title: 'Parallel Lines, Part 2: Finding Angles and Testing for Parallel',
  thumbnailTitle: 'Angles and Parallel Lines',
  thumbnail: 'tr',
  summary: 'Finding all eight angles from one when the lines are parallel, solving for x with alternate interior angles, and working backwards: testing whether two lines (studs, shelves) are parallel with the rule that matches the angle pair.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 6.3 · Part 2', title: 'Angles and Parallel Lines', subtitle: 'One angle gives you all eight' }],
      lines: [
        { say: 'When a road crosses two parallel railway tracks, knowing just one angle tells you all eight. And the same rules can tell you whether two studs are really parallel.', show: 'title' },
        { say: 'In this video, you will find missing angles, and test lines for parallel.' },
      ],
    },
    {
      chapter: 'Two sizes',
      layout: 'split',
      leftWidth: 540,
      left: [figure('tr', [transversal({ deg: 65, labels: { 2: '65^\\circ', 3: '3', 5: '5', 6: '6' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle 3 = 65^\\circ \\;\\text{(vertically opposite)}', '\\angle 6 = 65^\\circ \\;\\text{(corresponding)}', '\\angle 5 = 180^\\circ - 65^\\circ = 115^\\circ'] }],
      lines: [
        { say: 'When the lines are parallel, the eight angles come in only two sizes. All the acute angles are equal, all the obtuse angles are equal, and an acute angle plus an obtuse angle make 180 degrees.', show: ['tr.lines', 'tr.marks'] },
        { say: 'Here, m is parallel to n, and angle two is 65 degrees. Angle three is vertically opposite angle two, so it is also 65 degrees.', show: ['tr.a2', 'tr.a3', 'm.0'], focus: ['tr.a2', 'tr.a3', 'm.0'] },
        { say: 'Angle six corresponds to angle two, so it is 65 degrees too.', show: ['tr.a6', 'm.1'], focus: ['tr.a2', 'tr.a6', 'm.1'] },
        { say: 'Angles three and five are co-interior, so they add to 180. Angle five is 180 minus 65: 115 degrees.', show: ['tr.a5', 'm.2'], focus: ['tr.a3', 'tr.a5', 'm.2'] },
      ],
    },
    {
      chapter: 'With algebra',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3x + 10 = 5x - 30', '10 = 2x - 30', '40 = 2x \\;\\to\\; x = 20', '3(20) + 10 = 70, \\quad 5(20) - 30 = 70'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Co-interior angles are not equal', md: 'Corresponding and alternate angles are **equal**, but co-interior angles **add to** $180^\\circ$.' },
      ],
      lines: [
        { say: 'A straight road crosses two parallel tracks. A pair of alternate interior angles measure three x plus ten, and five x minus thirty degrees. Alternate interior angles are equal, so set them equal.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract three x from both sides: ten is two x minus thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'Add thirty to both sides: forty is two x, so x is twenty.', show: 'm.2', focus: 'm.2' },
        { say: 'Each angle is seventy degrees. But careful: if the angles had been co-interior, you would add them to make 180, not set them equal.', show: ['m.3', 'oops'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Are the lines parallel?',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Corresponding angles are equal, or', 'alternate angles are equal, or', 'co-interior angles add to $180^\\circ$.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{studs: } 89^\\circ \\ne 91^\\circ \\;\\to\\; \\text{not parallel}', '\\text{shelves: } 72^\\circ + 108^\\circ = 180^\\circ \\;\\to\\; \\text{parallel}'] },
      ],
      lines: [
        { say: 'The rules also work backwards. If a transversal crosses two lines, and any one of these is true, the lines are parallel.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'A framer checks two studs on a bottom plate. Measured on the left of each stud, the angles with the plate are 89 and 91 degrees. These are corresponding angles, and they are not equal, so the studs are not parallel.', show: 'm.0', focus: ['m.0', 'b.0'] },
        { say: 'A sloped support runs between two shelves. Between the shelves, on the same side, it makes angles of 72 and 108 degrees. These are co-interior, and they add to 180, so the shelves are parallel.', show: 'm.1', focus: ['m.1', 'b.2'] },
        { say: 'Notice that 89 plus 91 is also 180. But those were corresponding angles, so they needed to be equal. Always use the rule that matches the pair, and do not trust your eyes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A transversal crosses two parallel lines. A pair of alternate interior angles measure $(2x + 30)^\\circ$ and $(4x - 10)^\\circ$. What is $x$?',
          choices: ['$x = 20$', '$x = 70$', '$x = 10$', '$x = 26.7$'],
          answer: 0,
          working: 'Alternate interior angles are equal: $2x + 30 = 4x - 10$, so $40 = 2x$ and $x = 20$. Each angle is $70^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pair of alternate interior angles measure two x plus thirty, and four x minus ten degrees. What is x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Alternate interior angles are equal, so two x plus thirty equals four x minus ten. Then forty is two x, and x is twenty. B is the angle, and D adds the angles to make 180, as if they were co-interior.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Parallel lines: one angle gives all eight.', 'Equal pairs: set them equal. Co-interior: add to $180^\\circ$.', 'To test for parallel, use the rule that matches the pair.'] }],
      lines: [
        { say: 'Let’s sum up. When the lines are parallel, one angle gives you all eight.', show: 'sum.0' },
        { say: 'With algebra, set equal pairs equal, and add co-interior angles to make 180.', show: 'sum.1' },
        { say: 'And to test for parallel lines, check one pair with the rule that matches it. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
