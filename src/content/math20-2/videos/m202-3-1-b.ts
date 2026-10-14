import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-3-1-b',
  lessonId: 'm202-3-1',
  title: 'The Sine Law, Part 2: Finding a Side',
  thumbnailTitle: 'Finding a Side with the Sine Law',
  thumbnail: 'aas',
  summary: 'Finding a side with the sine law from one complete matching pair (b ≈ 14.6 cm), using the angle sum first when the known side has no known opposite angle (p ≈ 14.8 m), and why each ratio must pair a side with its opposite angle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 3.1 · Part 2', title: 'Finding a Side', subtitle: 'One matching pair is the key' }],
      lines: [
        { say: 'The sine law can find a missing side, as long as you know one complete matching pair: a side, and the angle across from it.', show: 'title' },
        { say: 'In this video, you will find sides, and complete a matching pair with the angle sum when you need to.' },
      ],
    },
    {
      chapter: 'Finding a side',
      layout: 'split',
      leftWidth: 520,
      left: [figure('aas', [triangle({ A: [0, 0], B: [5.95, 0], C: [3.92, 4.35], names: ['A', 'B', 'C'], sides: { BC: '12\\text{ cm}', CA: 'b' }, tones: { BC: 'opp', CA: 'adj' }, angles: { A: '48^\\circ', B: '65^\\circ' }, angleTones: { A: 'opp', B: 'adj' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{b}{\\sin 65^\\circ} = \\dfrac{12}{\\sin 48^\\circ}', 'b = \\dfrac{12\\sin 65^\\circ}{\\sin 48^\\circ}', 'b \\approx 14.63 \\approx 14.6\\text{ cm}'] }],
      lines: [
        { say: 'In acute triangle "A" B C, angle "A" is forty-eight degrees, angle B is sixty-five degrees, and side "a" is twelve centimetres. Find b, to the nearest tenth of a centimetre.', show: ['aas.shape', 'aas.names', 'aas.aA', 'aas.aB', 'aas.BC', 'aas.CA'] },
        { say: 'Side "a" and angle "A" are a complete matching pair. Side b is across from angle B. To find a side, put sides on top: b over sine sixty-five equals twelve over sine forty-eight.', show: 'm.0', focus: ['aas.BC', 'aas.aA', 'm.0'] },
        { say: 'Multiply both sides by sine sixty-five. Then b is twelve sine sixty-five, over sine forty-eight, which is about 14.6 centimetres.', show: ['m.1', 'm.2'], focus: ['aas.CA', 'm.2'] },
        { say: 'Check: b is across from the larger angle, sixty-five degrees, so it should be longer than "a". It is.' },
      ],
    },
    {
      chapter: 'Complete the pair first',
      layout: 'split',
      leftWidth: 520,
      left: [figure('asa', [triangle({ A: [6, 0], B: [0, 0], C: [1.93, 5.6], names: ['P', 'Q', 'R'], sides: { AB: '15\\text{ m}', BC: 'p' }, tones: { AB: 'opp', BC: 'adj' }, angles: { A: '54^\\circ', B: '71^\\circ', C: '55^\\circ' }, angleTones: { A: 'adj', C: 'opp' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle R = 180^\\circ - 54^\\circ - 71^\\circ = 55^\\circ', '\\dfrac{p}{\\sin 54^\\circ} = \\dfrac{15}{\\sin 55^\\circ}', 'p = \\dfrac{15\\sin 54^\\circ}{\\sin 55^\\circ} \\approx 14.8\\text{ m}'] }],
      lines: [
        { say: 'In acute triangle P Q R, angle P is fifty-four degrees, angle Q is seventy-one degrees, and side r is fifteen metres. Find p.', show: ['asa.shape', 'asa.names', 'asa.aA', 'asa.aB', 'asa.AB', 'asa.BC'] },
        { say: 'Side r is across from angle R, which is not given, so no pair is complete yet. Use the angle sum: angle R is 180 minus fifty-four minus seventy-one, which is fifty-five degrees.', show: ['asa.aC', 'm.0'], focus: ['asa.AB', 'asa.aC', 'm.0'] },
        { say: 'Now r and angle R are a matching pair. p over sine fifty-four equals fifteen over sine fifty-five, so p is about 14.8 metres.', show: ['m.1', 'm.2'], focus: ['asa.BC', 'm.2'] },
      ],
    },
    {
      chapter: 'Mixing up the pairs',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the pairs', md: 'Each ratio must use a side and the angle **opposite** it. Writing $\\dfrac{p}{\\sin 54^\\circ} = \\dfrac{15}{\\sin 71^\\circ}$ pairs side $r$ with $\\angle Q$, which is not across from it.' }],
      lines: [
        { say: 'The most common mistake is to pair a side with the wrong angle. Writing fifteen over sine seventy-one pairs side r with angle Q, but r is not across from angle Q. Name each side by its opposite angle before you substitute.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In acute $\\triangle DEF$, $\\angle D = 50^\\circ$, $\\angle E = 60^\\circ$ and $d = 10$ m. Determine $e$, to the nearest tenth of a metre.',
          choices: ['$11.3$ m', '$8.8$ m', '$9.2$ m', '$12.3$ m'],
          answer: 0,
          working: '$\\dfrac{e}{\\sin 60^\\circ} = \\dfrac{10}{\\sin 50^\\circ}$, so $e = \\dfrac{10\\sin 60^\\circ}{\\sin 50^\\circ} \\approx 11.3$ m. B flips the sines.',
        },
      ],
      lines: [
        { say: 'Your turn. In acute triangle D E F, angle D is fifty degrees, angle E is sixty degrees, and d is ten metres. Find e, to the nearest tenth of a metre. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. e over sine sixty equals ten over sine fifty, so e is ten sine sixty over sine fifty, about 11.3 metres. It is longer than d, because sixty is larger than fifty.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['You need one complete matching pair.', 'If the known side has no known opposite angle, use the angle sum first.', 'Put the unknown side on top, then multiply.'] }],
      lines: [
        { say: 'Let’s sum up. To find a side with the sine law, you need one complete matching pair.', show: 'sum.0' },
        { say: 'If the known side has no known opposite angle, use the angle sum first to complete the pair.', show: 'sum.1' },
        { say: 'And put the unknown side on top, then multiply to solve. In part three, we find angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
