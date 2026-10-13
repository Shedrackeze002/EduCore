import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-2-4-b',
  lessonId: 'm10c-2-4',
  title: 'Problems with Two Right Triangles',
  thumbnailTitle: 'Two Right Triangles',
  summary: 'Solve problems with two right triangles one triangle at a time: two people on opposite sides of a tower, two boats seen from a lighthouse, and a flagpole on a roof, and when to add or subtract.',
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 2.4 · Part 2', title: 'Problems with Two Right Triangles', subtitle: 'Solve one triangle at a time' },
      ],
      lines: [
        { say: 'Many real problems involve two right triangles that share a side.', show: 'title' },
        { say: 'The strategy is to solve them one triangle at a time. Use the triangle where you know enough, find the shared side, then move to the other triangle.' },
      ],
    },
    {
      chapter: 'Opposite sides of a tower',
      layout: 'split',
      leftWidth: 600,
      left: [
        {
          kind: 'diagram',
          id: 'd',
          points: { L: [-59.59, 0], O: [0, 0], T: [0, 50], R: [35.01, 0] },
          items: [
            { kind: 'thing', id: 'ground', type: 'ground', at: 'O' },
            { kind: 'thing', id: 'tower', type: 'tower', at: 'O', top: 'T' },
            { kind: 'region', id: 'left', points: ['L', 'O', 'T'] },
            { kind: 'region', id: 'right', points: ['O', 'R', 'T'] },
            { kind: 'line', id: 'sl', from: 'L', to: 'T' },
            { kind: 'line', id: 'sr', from: 'R', to: 'T' },
            { kind: 'line', id: 'h', from: 'O', to: 'T', tone: 'opp', label: '50\\text{ m}', labelSide: 'left', labelAt: 0.4 },
            { kind: 'line', id: 'd1', from: 'L', to: 'O', tone: 'adj', label: 'd_1', labelSide: 'right' },
            { kind: 'line', id: 'd2', from: 'O', to: 'R', tone: 'adj', label: 'd_2', labelSide: 'right' },
            { kind: 'right', id: 'rl', at: 'O', from: 'L', to: 'T' },
            { kind: 'right', id: 'rr', at: 'O', from: 'R', to: 'T' },
            { kind: 'angle', id: 'al', at: 'L', from: 'O', to: 'T', label: '40^\\circ' },
            { kind: 'angle', id: 'ar', at: 'R', from: 'O', to: 'T', label: '55^\\circ' },
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'given', md: 'Two people stand on opposite sides of a $50$ m tower. Their angles of elevation to the top are $40^\\circ$ and $55^\\circ$. How far apart are they?', size: 'md', align: 'left' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\adj{d_1} = \\dfrac{\\opp{50}}{\\tan 40^\\circ} \\approx 59.59', '\\adj{d_2} = \\dfrac{\\opp{50}}{\\tan 55^\\circ} \\approx 35.01', '\\adj{d_1} + \\adj{d_2} \\approx 94.6\\text{ m}'],
        },
      ],
      lines: [
        {
          say: 'Two people stand on opposite sides of a fifty metre tower. Their angles of elevation to the top are forty degrees and fifty-five degrees. How far apart are they?',
          show: ['d.ground', 'd.tower', 'd.sl', 'd.sr', 'd.h', 'd.al', 'd.ar', 'd.rl', 'd.rr', 'given'],
        },
        {
          say: 'The tower is a side of both triangles. In the left triangle, it is opposite the forty degree angle, and d one is adjacent. So d one equals fifty divided by tan forty degrees, which is about 59.59 metres.',
          caption: 'The tower is a side of both triangles. In the left triangle, it is opposite the 40° angle, and d₁ is adjacent. So d₁ equals 50 divided by tan 40°, which is about 59.59 metres.',
          show: ['d.left', 'd.d1', 'm.0'],
          focus: ['d.left', 'd.al', 'd.h', 'd.d1', 'm.0'],
        },
        {
          say: 'In the right triangle, the same tower is opposite the fifty-five degree angle. So d two equals fifty divided by tan fifty-five degrees, which is about 35.01 metres.',
          caption: 'In the right triangle, the same tower is opposite the 55° angle. So d₂ equals 50 divided by tan 55°, which is about 35.01 metres.',
          show: ['d.right', 'd.d2', 'm.1'],
          hide: 'd.left',
          focus: ['d.right', 'd.ar', 'd.h', 'd.d2', 'm.1'],
        },
        { say: 'The two people are on opposite sides, so add the distances. They are about 94.6 metres apart.', show: 'm.2', hide: 'd.right', focus: ['d.d1', 'd.d2', 'm.2'] },
      ],
    },
    {
      chapter: 'Two boats on the same side',
      layout: 'split',
      leftWidth: 600,
      left: [
        {
          kind: 'diagram',
          id: 'd',
          points: { O: [0, 0], T: [0, 60], N: [60, 0], F: [103.92, 0], H: [122, 60] },
          items: [
            { kind: 'thing', id: 'water', type: 'water', at: 'O' },
            { kind: 'thing', id: 'house', type: 'lighthouse', at: 'O', top: 'T' },
            { kind: 'thing', id: 'bn', type: 'boat', at: 'N' },
            { kind: 'thing', id: 'bf', type: 'boat', at: 'F' },
            { kind: 'line', id: 'ht', from: 'T', to: 'H', tone: 'muted', dashed: true },
            { kind: 'line', id: 'sn', from: 'N', to: 'T' },
            { kind: 'line', id: 'sf', from: 'F', to: 'T' },
            { kind: 'line', id: 'h', from: 'O', to: 'T', tone: 'opp', label: '60\\text{ m}', labelSide: 'right', labelAt: 0.45 },
            { kind: 'angle', id: 'dn', at: 'T', from: 'H', to: 'N', r: 50, label: '45^\\circ', labelDist: 200, labelAt: 0.84 },
            { kind: 'angle', id: 'df', at: 'T', from: 'H', to: 'F', r: 112, label: '30^\\circ', labelDist: 150 },
            { kind: 'angle', id: 'en', at: 'N', from: 'O', to: 'T', label: '45^\\circ' },
            { kind: 'angle', id: 'ef', at: 'F', from: 'O', to: 'T', label: '30^\\circ' },
            { kind: 'line', id: 'x1', from: 'O', to: 'N', tone: 'adj', label: 'x_1', labelSide: 'right' },
            { kind: 'line', id: 'x2', from: 'O', to: 'F', tone: 'adj', label: 'x_2', labelSide: 'right', labelAt: 0.97 },
            { kind: 'line', id: 'gap', from: 'N', to: 'F', tone: 'brand' },
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'given', md: 'From the top of a $60$ m lighthouse, the angles of depression to two boats in line are $45^\\circ$ and $30^\\circ$. How far apart are the boats?', size: 'md', align: 'left' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\adj{x_1} = \\dfrac{\\opp{60}}{\\tan 45^\\circ} = 60', '\\adj{x_2} = \\dfrac{\\opp{60}}{\\tan 30^\\circ} \\approx 103.92', '\\adj{x_2} - \\adj{x_1} \\approx 43.9\\text{ m}'],
        },
      ],
      lines: [
        {
          say: 'From the top of a sixty metre lighthouse, the angles of depression to two boats in line are forty-five degrees and thirty degrees. How far apart are the boats?',
          show: ['d.water', 'd.house', 'd.bn', 'd.bf', 'd.ht', 'd.sn', 'd.sf', 'd.h', 'd.dn', 'd.df', 'given'],
        },
        { say: 'First, move the angles to the bottom. By alternate angles, the angle of elevation from the near boat is forty-five degrees, and from the far boat, thirty degrees.', show: ['d.en', 'd.ef'], focus: ['d.en', 'd.ef'] },
        {
          say: 'For the near boat, x one equals sixty divided by tan forty-five degrees, which is exactly sixty metres.',
          caption: 'For the near boat, x₁ equals 60 divided by tan 45°, which is exactly 60 metres.',
          show: ['d.x1', 'm.0'],
          focus: ['d.x1', 'd.en', 'm.0'],
        },
        {
          say: 'For the far boat, x two equals sixty divided by tan thirty degrees, which is about 103.92 metres.',
          caption: 'For the far boat, x₂ equals 60 divided by tan 30°, which is about 103.92 metres.',
          show: ['d.x2', 'm.1'],
          focus: ['d.x2', 'd.ef', 'm.1'],
        },
        { say: 'Both boats are on the same side, so subtract. The boats are about 43.9 metres apart.', show: ['d.gap', 'm.2'], focus: ['d.gap', 'm.2'] },
      ],
    },
    {
      chapter: 'A flagpole on a roof',
      layout: 'split',
      leftWidth: 600,
      left: [
        {
          kind: 'diagram',
          id: 'd',
          points: { O: [0, 0], F: [30, 0], R: [30, 21.01], T: [30, 27.01], W: [44, 0] },
          items: [
            { kind: 'thing', id: 'ground', type: 'ground', at: 'O' },
            { kind: 'thing', id: 'building', type: 'building', at: 'F', top: 'R', side: 'right', width: 14 },
            { kind: 'thing', id: 'pole', type: 'flagpole', at: 'R', top: 'T' },
            { kind: 'label', id: 'you', at: 'O', tex: '\\text{you}', tone: 'muted', place: 'below', dot: true },
            { kind: 'region', id: 'big', points: ['O', 'F', 'T'] },
            { kind: 'region', id: 'small', points: ['O', 'F', 'R'], tone: 'adj' },
            { kind: 'line', id: 'sr', from: 'O', to: 'R' },
            { kind: 'line', id: 'st', from: 'O', to: 'T' },
            { kind: 'line', id: 'd', from: 'O', to: 'F', tone: 'adj', label: '30\\text{ m}', labelSide: 'right' },
            { kind: 'angle', id: 'ar', at: 'O', from: 'F', to: 'R', r: 80, label: '35^\\circ', labelDist: 125 },
            { kind: 'angle', id: 'at', at: 'O', from: 'F', to: 'T', r: 150, label: '42^\\circ', labelDist: 175, labelAt: 1.18 },
            { kind: 'line', id: 'x', from: 'R', to: 'T', tone: 'opp', label: 'x', labelSide: 'right', labelAt: 0.35 },
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'given', md: 'From $30$ m away, the angle of elevation to the base of a flagpole on a roof is $35^\\circ$, and to its top is $42^\\circ$. How tall is the flagpole?', size: 'md', align: 'left' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{top: } 30\\tan 42^\\circ \\approx 27.01', '\\text{roof: } 30\\tan 35^\\circ \\approx 21.01', '\\opp{x} \\approx 27.01 - 21.01 = 6.0\\text{ m}'],
        },
      ],
      lines: [
        {
          say: 'From thirty metres away, the angle of elevation to the base of a flagpole on a roof is thirty-five degrees, and to its top is forty-two degrees. How tall is the flagpole?',
          show: ['d.ground', 'd.building', 'd.pole', 'd.you', 'd.sr', 'd.st', 'd.d', 'd.ar', 'd.at', 'given'],
        },
        { say: 'This time the triangles are stacked. The big triangle reaches the top of the flagpole. Its height is thirty times tan forty-two degrees, which is about 27.01 metres.', show: ['d.big', 'm.0'], focus: ['d.big', 'd.at', 'm.0'] },
        { say: 'The small triangle reaches the roof. Its height is thirty times tan thirty-five degrees, which is about 21.01 metres.', show: ['d.small', 'm.1'], hide: 'd.big', focus: ['d.small', 'd.ar', 'm.1'] },
        { say: 'The flagpole is the part in between, so subtract. It is about six metres tall.', show: ['d.x', 'm.2'], hide: 'd.small', focus: ['d.x', 'm.2'] },
      ],
    },
    {
      chapter: 'Add or subtract?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['The triangles', 'Then'],
          rows: [
            ['On **opposite sides** of a shared side', '**add**'],
            ['On the **same side**, or **stacked**', '**subtract**'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Draw and label first', md: 'Sketch both triangles, mark the right angles, label what you know and what you want, then decide whether to add or subtract.' },
      ],
      lines: [
        { say: 'So when do you add, and when do you subtract?' },
        { say: 'When the triangles are on opposite sides of the shared side, add.', show: 'tab.0', focus: 'tab.0' },
        { say: 'When they are on the same side, or stacked, subtract.', show: 'tab.1', focus: 'tab.1' },
        { say: 'Either way, sketch both triangles first. Mark the right angles, and label what you know and what you want, before you calculate.', show: 'tip', focus: 'tab' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From $40$ m away, the angles of elevation to the bottom and the top of a sign on a roof are $\\thc{28^\\circ}$ and $\\thc{33^\\circ}$. How tall is the sign?',
          choices: ['$4.7$ m', '$47.2$ m', '$3.5$ m', '$26.0$ m'],
          answer: 0,
          working: 'To the top: $40\\tan 33^\\circ \\approx 25.98$ m. To the bottom: $40\\tan 28^\\circ \\approx 21.27$ m. The triangles are stacked, so subtract: $25.98 - 21.27 \\approx 4.7$ m. (Subtracting the angles first, $40\\tan 5^\\circ \\approx 3.5$ m, is a common mistake.)',
        },
      ],
      lines: [
        { say: 'Your turn. From forty metres away, the angles of elevation to the bottom and the top of a sign on a roof are twenty-eight degrees and thirty-three degrees. How tall is the sign? Pause the video and try it.', show: 'q', wait: 7 },
        {
          say: 'The answer is A. To the top, forty times tan thirty-three degrees is about 25.98 metres. To the bottom, forty times tan twenty-eight degrees is about 21.27 metres. The triangles are stacked, so subtract: about 4.7 metres. Be careful not to subtract the angles first.',
          show: 'q.answer',
        },
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
            'Two right triangles that share a side: solve **one at a time**.',
            'Find the shared side first, then use it in the other triangle.',
            'Opposite sides: **add**. Same side or stacked: **subtract**.',
            'Draw and label both triangles before you calculate.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. When two right triangles share a side, solve them one at a time.", show: 'sum.0' },
        { say: 'Find the shared side first, then use it in the other triangle.', show: 'sum.1' },
        { say: 'Triangles on opposite sides add. Triangles on the same side, or stacked, subtract.', show: 'sum.2' },
        { say: 'And draw and label both triangles before you calculate. That completes unit two. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
