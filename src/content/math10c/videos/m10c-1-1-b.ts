import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

/** Maya crossing her classroom in 12 strides of about 0.75 m. */
function strides(): DiagramEl {
  const points: Record<string, [number, number]> = { g: [-0.6, 0], feet: [-0.35, 0], eyes: [-0.35, 1.55], d0: [0, -0.55], d1: [9, -0.55] };
  const arcs: DiagramItem[] = [];
  for (let i = 0; i < 12; i++) {
    const names: string[] = [];
    for (let j = 0; j <= 8; j++) {
      const a = Math.PI - (j * Math.PI) / 8;
      const name = `s${i}-${j}`;
      points[name] = [0.75 * i + 0.375 + 0.375 * Math.cos(a), 0.32 * Math.sin(a)];
      names.push(name);
    }
    arcs.push({ kind: 'curve', id: `stride${i}`, points: names, tone: 'adj', group: i === 0 ? undefined : 'more', ...(i === 0 ? { label: '0.75\\text{ m}', labelSide: 'left' as const } : {}) });
  }
  return {
    kind: 'diagram',
    id: 'walk',
    points,
    items: [
      { kind: 'thing', id: 'ground', type: 'ground', at: 'g' },
      { kind: 'thing', id: 'maya', type: 'person', at: 'feet', top: 'eyes' },
      ...arcs,
      { kind: 'line', id: 'total', from: 'd0', to: 'd1', tone: 'opp', label: '12 \\times 0.75\\text{ m} = 9\\text{ m}', labelSide: 'right' },
    ],
  };
}

const video: Explainer = {
  id: 'm10c-1-1-b',
  lessonId: 'm10c-1-1',
  title: 'Referents, Estimation and Units, Part 2: Estimating and Choosing Units',
  thumbnailTitle: 'Estimating Lengths',
  thumbnail: 'walk',
  summary: 'How to estimate a length with a referent (choose, count and multiply), how to choose a sensible unit for a measurement, and comparing lengths in SI and imperial units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.1 · Part 2', title: 'Estimating Lengths', subtitle: 'With a referent, and a sensible unit' }],
      lines: [
        { say: 'How wide is your classroom? You can estimate it in a few seconds, with no tape measure at all.', show: 'title' },
        { say: 'In this video, you will estimate lengths with a referent, and choose a sensible unit for a measurement.' },
      ],
    },
    {
      chapter: 'Estimating',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'how', items: ['**Choose** a referent of a sensible size.', '**Count** how many times it fits along the length.', '**Multiply** the count by the size of the referent.'] },
        strides(),
      ],
      lines: [
        { say: 'To estimate a length, choose a referent of a sensible size, count how many times it fits, and multiply.', show: ['how.0', 'how.1', 'how.2'] },
        { say: "Maya's stride is about 0.75 metres. She walks across her classroom in twelve strides. About how wide is the room?", show: ['walk.ground', 'walk.maya', 'walk.stride0'], focus: 'walk.stride0' },
        { say: 'Twelve strides,', show: 'walk.more', focus: 'walk.more' },
        { say: 'times 0.75 metres per stride, is nine metres. The room is about nine metres wide.', show: 'walk.total', focus: 'walk.total' },
        { say: 'Notice the word about. An estimate is not exact. Someone with a longer stride would get a slightly different answer, and that is fine. Always say about, or use the approximately equal sign.' },
      ],
    },
    {
      chapter: 'Choosing a unit',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'units',
          head: ['To measure…', 'A sensible unit'],
          rows: [
            ['the thickness of a phone', 'millimetres (about $8\\text{ mm}$)'],
            ['the length of a hockey rink', 'metres (about $60\\text{ m}$) or feet (about $200\\text{ ft}$)'],
            ['the distance between two cities', 'kilometres or miles'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Correct, but impractical', md: 'A football field is $91\\,440\\text{ mm}$ long. Say about $100\\text{ yd}$, or $91\\text{ m}$.' },
      ],
      lines: [
        { say: 'The best unit gives a number that is easy to work with, not huge and not tiny, and suits the situation.' },
        { say: 'A phone is less than a centimetre thick, so millimetres give a sensible number: about eight millimetres.', show: 'units.0', focus: 'units.0' },
        { say: 'A hockey rink is tens of metres long, so metres or feet work well: about sixty metres, or two hundred feet.', show: 'units.1', focus: 'units.1' },
        { say: 'And for the distance between two cities, use kilometres or miles.', show: 'units.2', focus: 'units.2' },
        { say: 'Saying a football field is ninety-one thousand, four hundred and forty millimetres long is correct, but no one would say it. Say about one hundred yards, or ninety-one metres.', show: 'oops', focus: 'units' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is longer, $5\\text{ km}$ or $3\\text{ mi}$? Use $1\\text{ mi} \\approx 1.6\\text{ km}$.',
          choices: ['$5\\text{ km}$', '$3\\text{ mi}$', 'They are the same length.'],
          answer: 0,
          working: '$3\\text{ mi} \\approx 3 \\times 1.6 = 4.8\\text{ km}$, so $5\\text{ km}$ is slightly longer.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is longer, five kilometres or three miles? Use the fact that a mile is about 1.6 kilometres. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three miles is about three times 1.6, which is 4.8 kilometres, so five kilometres is slightly longer.', show: 'q.answer' },
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
            'To estimate: choose a referent, count how many fit, and multiply.',
            'An estimate is not exact: say about, or use $\\approx$.',
            'Choose a unit that gives a practical number for the situation.',
            'To compare SI and imperial, convert with a referent fact such as $1\\text{ mi} \\approx 1.6\\text{ km}$.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. To estimate a length, choose a referent, count how many times it fits, and multiply.", show: 'sum.0' },
        { say: 'An estimate is not exact, so say about, or use the approximately equal sign.', show: 'sum.1' },
        { say: 'Choose a unit that gives a practical number for the situation.', show: 'sum.2' },
        { say: 'And to compare lengths in the two systems, convert with a fact like one mile is about 1.6 kilometres. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
