import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm202-8-4-b',
  lessonId: 'm202-8-4',
  title: 'Similar Objects: Length, Area and Volume, Part 2: Volumes Grow by k³',
  thumbnailTitle: 'Volumes Grow by k³',
  thumbnail: 'cube',
  summary: 'Why enlarging a 2 cm cube by k = 3 multiplies its volume by 27, the rule new volume = k³ × original volume (for capacity and mass too), a table of k, k² and k³, and a similar juice can 1.2 times as long that holds about 613.4 mL.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.4 · Part 2', title: 'Volumes Grow by k³', subtitle: 'Capacity and mass' }],
      lines: [
        { say: 'A can that is only a little taller and wider can hold a lot more juice. Volume grows even faster than area.', show: 'title' },
        { say: 'In this video, you will see how the volume of a similar object changes, and predict the capacity of a bigger can.' },
      ],
    },
    {
      chapter: 'Why volume grows by k cubed',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('cu', [
          box({ name: 's', l: 2, w: 2, h: 2, labels: { l: '2', h: '2' } }),
          box({ name: 'b', at: [4, 0], l: 6, w: 6, h: 6, cells: 3, labels: { l: '6', h: '6' } }),
        ], 400),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2^3 = 8 \\text{ cm}^3', '6^3 = 216 \\text{ cm}^3', '216 \\div 8 = 27 = 3^3'] }],
      lines: [
        { say: 'A cube with two centimetre edges has a volume of two cubed, eight cubic centimetres.', show: ['cu.s-shape', 'cu.s-l', 'cu.s-h', 'm.0'], focus: 'm.0' },
        { say: 'Enlarge it with a scale factor of three. The edges become six centimetres, and the volume becomes 216 cubic centimetres.', show: ['cu.b-shape', 'cu.b-l', 'cu.b-h', 'm.1'], focus: 'm.1' },
        { say: 'That is twenty-seven times as much. Here we can see why: the big cube is three small cubes long, three wide, and three high, so it holds twenty-seven of them.', show: ['cu.b-cells', 'm.2'], focus: ['cu.b-cells', 'm.2'] },
        { say: 'Length, width and height were each multiplied by three, so the volume was multiplied by three cubed.' },
      ],
    },
    {
      chapter: 'The volume rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{new volume} = k^3 \\times \\text{original volume}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Capacity and mass', md: 'Capacity is a volume, so it is multiplied by $k^3$ too. Objects made of the same material have masses in the same ratio as their volumes.' },
      ],
      lines: [
        { say: 'So if two objects are similar with scale factor k, the new volume is k cubed times the original volume.', show: 'm.0', focus: 'm.0' },
        { say: 'Capacity is a volume, so it is multiplied by k cubed too. And objects made of the same material have masses in the same ratio as their volumes, so mass is multiplied by k cubed as well.', show: 'key' },
      ],
    },
    {
      chapter: 'Lengths, areas, volumes',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Scale factor $k$', 'Lengths × $k$', 'Areas × $k^2$', 'Volumes × $k^3$'], rows: [['$2$', '$2$', '$4$', '$8$'], ['$3$', '$3$', '$9$', '$27$'], ['$0.5$', '$0.5$', '$0.25$', '$0.125$'], ['$1.2$', '$1.2$', '$1.44$', '$1.728$']] }],
      lines: [
        { say: 'This table compares the three. With a scale factor of two, lengths double, areas are multiplied by four, and volumes by eight.', show: 't', focus: 't.0' },
        { say: 'With three: three, nine, and twenty-seven.', focus: 't.1' },
        { say: 'A scale factor less than one makes everything smaller. With 0.5, the volume is only one eighth of the original.', focus: 't.2' },
        { say: 'And even a small scale factor like 1.2 multiplies the volume by 1.728, almost double.', focus: 't.3' },
      ],
    },
    {
      chapter: 'A bigger can',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['k^3 = 1.2^3 = 1.728', '355 \\times 1.728 = 613.44', '\\approx 613.4 \\text{ mL}'] }],
      lines: [
        { say: 'A juice can holds 355 millilitres. A similar can has every length 1.2 times as long. How much does it hold? Capacity is a volume, so cube k: 1.2 cubed is 1.728.', show: 'm.0', focus: 'm.0' },
        { say: '355 times 1.728 is 613.44.', show: 'm.1', focus: 'm.1' },
        { say: 'So the larger can holds about 613.4 millilitres. A twenty percent increase in every length gives about seventy-three percent more juice.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A small box holds $3$ L. A similar box has every length twice as long. How much does it hold?',
          choices: ['$24$ L', '$6$ L', '$12$ L', '$9$ L'],
          answer: 0,
          working: 'Capacity is a volume, so multiply by $k^3 = 2^3 = 8$: $3 \\times 8 = 24$ L. B multiplies by $k$, and C by $k^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A small box holds three litres. A similar box has every length twice as long. How much does it hold? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Capacity is a volume, so multiply by two cubed, which is eight: twenty-four litres. B multiplies by k, and C by k squared.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Volumes are multiplied by $k^3$.', 'So are capacities, and masses of the same material.', 'A small change in length makes a big change in volume.'] }],
      lines: [
        { say: 'Let’s sum up. Volumes of similar objects are multiplied by k cubed.', show: 'sum.0' },
        { say: 'So are capacities, and the masses of objects made of the same material.', show: 'sum.1' },
        { say: 'And a small change in length makes a big change in volume. In part three, we work back from areas and volumes to the scale factor. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
