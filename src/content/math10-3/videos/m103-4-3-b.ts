import type { Explainer } from '@/video/script.ts';
import { circle } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm103-4-3-b',
  lessonId: 'm103-4-3',
  title: 'Perimeter and Circumference, Part 2: Circumference and Working Backward',
  thumbnailTitle: 'Circumference',
  thumbnail: 'bin',
  summary: 'Circumference C = πd = 2πr, radius or diameter, how far a wheel rolls, and rearranging a perimeter or circumference formula to find a missing width or diameter.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 4.3 · Part 2', title: 'Circumference', subtitle: 'The distance around a circle' }],
      lines: [
        { say: 'How long is a steel band that goes around a grain bin? How far does a wheel roll in one turn?', show: 'title' },
        { say: 'In this video, you will find circumferences, and work backward from a perimeter to a missing side.' },
      ],
    },
    {
      chapter: 'Circumference',
      layout: 'split',
      leftWidth: 460,
      left: [figure('bin', [circle({ r: 3, labels: { c: 'C', d: 'd = 8.2\\text{ m}' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Circumference', md: 'The perimeter of a circle. The **diameter** $d$ goes across through the centre, and the **radius** $r$ is half of it.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C = \\pi d = 2\\pi r', 'C = \\pi \\times 8.2 \\approx 25.8\\text{ m}'] },
      ],
      lines: [
        { say: 'The circumference is the perimeter of a circle. The diameter goes across the circle through its centre, and the radius goes from the centre to the edge, so the diameter is twice the radius.', show: ['def', 'bin.fill', 'bin.outline', 'bin.d'] },
        { say: 'For every circle, the circumference is a little more than three times the diameter. That number is pi, about 3.14159. So C equals pi d, or two pi r. Use the pi key, and round only at the end.', show: 'm.0', focus: 'm.0' },
        { say: 'A grain bin has a diameter of 8.2 metres. A steel band once around it is pi times 8.2: about 25.8 metres.', show: 'm.1', focus: ['m.1', 'bin.outline'] },
      ],
    },
    {
      chapter: 'Radius or diameter?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Radius or diameter?', md: '$C = \\pi d$ uses the **diameter**. Given the radius, double it first, or use $C = 2\\pi r$. Otherwise the answer is half as big as it should be.' },
        { kind: 'math', id: 'm', lines: ['C = \\pi \\times 66 \\approx 207.3\\text{ cm per turn}', '500 \\times 207.345 \\approx 103\\,673\\text{ cm} \\approx 1036.7\\text{ m}'] },
      ],
      lines: [
        { say: 'C equals pi d uses the diameter. If you are given the radius, double it first, or use two pi r. Otherwise your answer is half as big as it should be.', show: 'oops' },
        { say: 'Each time a wheel turns once, it rolls forward one circumference. A bicycle wheel has a diameter of 66 centimetres, so one turn is pi times 66: about 207.3 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'In 500 turns, it rolls 500 times that: about 103,673 centimetres, or about 1,036.7 metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['P = 2(l + w) \\;\\to\\; w = \\dfrac{P}{2} - l = \\dfrac{46}{2} - 14 = 9\\text{ m}', 'C = \\pi d \\;\\to\\; d = \\dfrac{C}{\\pi} = \\dfrac{150}{\\pi} \\approx 48\\text{ cm}'] },
      ],
      lines: [
        { say: 'Sometimes you know the perimeter, and need a side. Write the formula, put in what you know, and undo the operations. A rectangular dog run uses 46 metres of fencing, and is fourteen metres long.', show: 'm.0' },
        { say: 'Divide the perimeter by two: 23 metres is one length plus one width. Subtract the length: the run is nine metres wide.', focus: 'm.0' },
        { say: 'An arborist wraps a tape around a spruce trunk and reads 150 centimetres. Since C equals pi d, the diameter is C divided by pi: about 48 centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A round table has a radius of $0.6\\text{ m}$. How much edging goes around it, to the nearest hundredth of a metre?',
          choices: ['$3.77\\text{ m}$', '$1.88\\text{ m}$', '$1.13\\text{ m}$', '$7.54\\text{ m}$'],
          answer: 0,
          working: '$C = 2\\pi r = 2\\pi(0.6) \\approx 3.77\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A round table has a radius of 0.6 metres. How much edging goes around it, to the nearest hundredth of a metre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. C equals two pi r: two times pi times 0.6 is about 3.77 metres. B uses the radius as if it were the diameter.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$C = \\pi d = 2\\pi r$.', 'One turn of a wheel moves it one circumference.', 'Rearrange to find a side or diameter: $w = \\tfrac{P}{2} - l$, $d = \\tfrac{C}{\\pi}$.'] }],
      lines: [
        { say: 'Let’s sum up. The circumference is pi times the diameter, or two pi times the radius.', show: 'sum.0' },
        { say: 'One turn of a wheel moves it forward one circumference.', show: 'sum.1' },
        { say: 'And to find a missing side or diameter, rearrange the formula. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
