import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A 24 ft truss with 26° rafters, a king post, and webs one third of the span in from each end. */
function truss(): Part {
  const t = Math.tan((26 * Math.PI) / 180);
  const points: Record<string, P> = { L: [0, 0], R: [24, 0], K: [12, 12 * t], M: [12, 0], V1: [8, 0], W1: [8, 8 * t], V2: [16, 0], W2: [16, 8 * t], s0: [0, -1.4], s1: [24, -1.4] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'chord', from: 'L', to: 'R', weight: 5, group: 'frame' },
    { kind: 'line', id: 'rafterL', from: 'L', to: 'K', weight: 5, tone: 'brand', group: 'frame' },
    { kind: 'line', id: 'rafterR', from: 'R', to: 'K', weight: 5, tone: 'brand', group: 'frame' },
    { kind: 'angle', id: 'a', at: 'L', from: 'R', to: 'K', label: '26^\\circ', r: 70, labelDist: 110, tone: 'theta', group: 'frame' },
    { kind: 'line', id: 'span', from: 's0', to: 's1', tone: 'muted', label: '24\\text{ ft}', labelSide: 'right', group: 'frame' },
    { kind: 'line', id: 'king', from: 'M', to: 'K', tone: 'opp', weight: 4, label: 'k', labelSide: 'right' },
    { kind: 'line', id: 'v', from: 'V1', to: 'W1', tone: 'opp', weight: 4, label: 'v', labelSide: 'left', group: 'webs' },
    { kind: 'line', id: 'v2', from: 'V2', to: 'W2', tone: 'opp', weight: 4, group: 'webs' },
    { kind: 'line', id: 'w', from: 'W1', to: 'M', tone: 'adj', weight: 4, label: 'w', labelSide: 'right', group: 'diag' },
    { kind: 'line', id: 'w2', from: 'W2', to: 'M', tone: 'adj', weight: 4, group: 'diag' },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm203-4-3-b',
  lessonId: 'm203-4-3',
  title: 'Chains of Right Triangles, Part 2: Roof Trusses',
  thumbnailTitle: 'Roof Trusses',
  thumbnail: 'tr',
  summary: 'The parts of a roof truss, and a chain of three triangles in a 24 ft truss with 26° rafters: the king post (about 5.9 ft), a vertical web 8 ft from the end (about 3.90 ft), and a diagonal web (about 5.6 ft) by the Pythagorean theorem.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.3 · Part 2', title: 'Roof Trusses', subtitle: 'A chain of three triangles' }],
      lines: [
        { say: 'Roof trusses are built in a shop, then lifted onto a house in one piece. Every piece of lumber has to be cut to the right length before anyone climbs a ladder.', show: 'title' },
        { say: 'In this video, you will find the lengths of the pieces inside a truss, one triangle at a time.' },
      ],
    },
    {
      chapter: 'Parts of a truss',
      layout: 'center',
      main: [
        figure('tr', [truss()], 330),
        { kind: 'bullets', id: 'b', items: ['**Bottom chord**: horizontal. **Top chords** (rafters): meet at the peak.', '**King post**: straight up from the centre to the peak.', '**Webs**: shorter braces.'] },
      ],
      lines: [
        { say: 'A roof truss is a frame of lumber. Its bottom chord is horizontal, and its two top chords, the rafters, meet at the peak.', show: ['tr.frame', 'b.0'] },
        { say: 'The king post stands straight up from the centre of the bottom chord to the peak.', show: ['tr.king', 'b.1'], focus: 'tr.king' },
        { say: 'Shorter webs brace the frame. Here, two vertical webs stand one third of the span in from each end, and two diagonal webs run from their tops down to the foot of the king post.', show: ['tr.webs', 'tr.diag', 'b.2'], focus: ['tr.webs', 'tr.diag'] },
      ],
    },
    {
      chapter: 'King post and diagonal web',
      layout: 'center',
      main: [
        figure('kp', [truss()], 330),
        { kind: 'math', id: 'm', size: 'md', lines: ['k = 12\\tan 26^\\circ \\approx 5.85 \\qquad v = 8\\tan 26^\\circ \\approx 3.90', 'w = \\sqrt{4^2 + 3.90^2} \\approx 5.59', 'k \\approx 5.9 \\text{ ft},\\;\\; w \\approx 5.6 \\text{ ft}'] },
      ],
      lines: [
        { say: 'This truss spans twenty-four feet, and each rafter makes a twenty-six degree angle with the bottom chord. Find the king post k, and a diagonal web w.', show: ['kp.frame', 'kp.king', 'kp.webs', 'kp.diag'] },
        { say: 'Triangle one is half the truss. Half the span is twelve feet, adjacent to the twenty-six degree angle, and k is opposite: TOA. k is twelve times tangent twenty-six degrees, about 5.85 feet.', show: 'm.0', focus: ['kp.king', 'm.0'] },
        { say: 'Triangle two runs out to the vertical web, which is twenty-four divided by three, eight feet from the end. The same angle gives v, eight times tangent twenty-six degrees, about 3.90 feet.', focus: ['kp.webs', 'm.0'] },
        { say: 'Triangle three is the diagonal web. Its legs are v, and the gap to the king post, twelve minus eight, four feet. No angle needed: by the Pythagorean theorem, w is about 5.59 feet.', show: 'm.1', focus: ['kp.diag', 'm.1'] },
        { say: 'Rounded, the king post is about 5.9 feet, and each diagonal web is about 5.6 feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A truss spans $30$ ft, and its rafters make a $22^\\circ$ angle with the bottom chord. How tall is the king post, to the nearest tenth of a foot?',
          choices: ['$6.1$ ft', '$12.1$ ft', '$5.6$ ft', '$37.1$ ft'],
          answer: 0,
          working: 'Half the span is $15$ ft, adjacent to $22^\\circ$: $k = 15\\tan 22^\\circ \\approx 6.06$ ft. B uses the whole span, and C uses sine.',
        },
      ],
      lines: [
        { say: 'Your turn. A truss spans thirty feet, and its rafters make a twenty-two degree angle with the bottom chord. How tall is the king post? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Half the span, fifteen feet, is adjacent to the angle, so k is fifteen times tangent twenty-two degrees, about 6.1 feet. B uses the whole span, and C uses sine.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Half a truss is a right triangle: use half the span.', 'The same rafter angle works for every web along it.', 'Finish with the Pythagorean theorem when you know two legs.'] }],
      lines: [
        { say: 'Let’s sum up. Half a truss is a right triangle, so use half the span.', show: 'sum.0' },
        { say: 'The same rafter angle works for every web that meets the rafter.', show: 'sum.1' },
        { say: 'And when you know two legs, finish with the Pythagorean theorem. In part three, we plan stairs with a landing. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
