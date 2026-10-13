import type { Explainer } from '@/video/script.ts';
import { inchAndCentimetre } from '@/video/measure.ts';

const rulers = inchAndCentimetre('rulers');

const video: Explainer = {
  id: 'm10c-1-1',
  lessonId: 'm10c-1-1',
  title: 'Referents, Estimation and Units, Part 1: Units and Referents',
  thumbnailTitle: 'Units and Referents',
  thumbnail: 'rulers',
  summary: 'The SI and imperial units of length used in Canada, referents (everyday objects about one unit long), and how the two systems compare. Part 2 estimates lengths with referents and chooses sensible units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.1 · Part 1', title: 'Units and Referents', subtitle: 'Measuring without a tape measure' }],
      lines: [
        { say: 'How tall is your classroom door? How far is it from your home to school?', show: 'title' },
        { say: 'You can estimate lengths like these without a tape measure, if you have good referents. In this video, we look at the two systems of units used in Canada, and the referents for each. In part two, we use them to estimate.' },
      ],
    },
    {
      chapter: 'Two systems',
      layout: 'split',
      left: [
        {
          kind: 'table',
          id: 'si',
          head: ['SI unit', 'Size'],
          rows: [
            ['millimetre (mm)', '$1000\\text{ mm} = 1\\text{ m}$'],
            ['centimetre (cm)', '$100\\text{ cm} = 1\\text{ m}$'],
            ['metre (m)', 'the base unit'],
            ['kilometre (km)', '$1\\text{ km} = 1000\\text{ m}$'],
          ],
        },
      ],
      right: [
        {
          kind: 'table',
          id: 'imp',
          head: ['Imperial unit', 'Size'],
          rows: [
            ['inch (in)', '$\\tfrac{1}{12}$ of a foot'],
            ['foot (ft)', '$1\\text{ ft} = 12\\text{ in}$'],
            ['yard (yd)', '$1\\text{ yd} = 3\\text{ ft}$'],
            ['mile (mi)', '$1\\text{ mi} = 5280\\text{ ft}$'],
          ],
        },
        { kind: 'callout', id: 'marks', tone: 'tip', title: 'Reading the symbols', md: "$5'\\,7''$ means 5 feet 7 inches: $'$ is feet and $''$ is inches." },
      ],
      lines: [
        { say: 'Canada officially uses the S I system, also called the metric system. Its base unit of length is the metre.', caption: 'Canada officially uses the SI system, also called the metric system. Its base unit of length is the metre.', show: 'si.2', focus: 'si.2' },
        { say: 'The other units are powers of ten. A millimetre is one thousandth of a metre, a centimetre is one hundredth of a metre, and a kilometre is a thousand metres.', show: ['si.0', 'si.1', 'si.3'], focus: ['si.0', 'si.1', 'si.3'] },
        { say: 'But the imperial system is still used every day. Lumber is sold in feet and inches, and many people give their height in feet and inches.', show: ['imp.0', 'imp.1'], focus: 'si' },
        { say: 'Its units grew out of body measurements, so they are not powers of ten. Twelve inches make a foot, three feet make a yard, and 5,280 feet make a mile.', show: ['imp.2', 'imp.3'], focus: ['imp.1', 'imp.2', 'imp.3'] },
        { say: 'You will also see symbols. A single mark means feet, and a double mark means inches, so five feet seven inches is written five, single mark, seven, double mark.', show: 'marks', focus: 'imp' },
      ],
    },
    {
      chapter: 'Referents',
      layout: 'split',
      left: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Referent', md: 'An everyday object about the size of **one unit**, for estimating without a measuring tool.' },
        {
          kind: 'table',
          id: 'si',
          head: ['SI', 'Referent'],
          rows: [
            ['$1\\text{ mm}$', 'the thickness of a dime'],
            ['$1\\text{ cm}$', 'your little fingernail’s width'],
            ['$1\\text{ m}$', 'a doorknob’s height, or a stride'],
            ['$1\\text{ km}$', 'about 12 minutes’ walk'],
          ],
        },
      ],
      right: [
        {
          kind: 'table',
          id: 'imp',
          head: ['Imperial', 'Referent'],
          rows: [
            ['$1\\text{ in}$', 'your thumb’s width at the knuckle'],
            ['$1\\text{ ft}$', 'the length of an adult’s shoe'],
            ['$1\\text{ yd}$', 'nose to outstretched fingertips'],
            ['$1\\text{ mi}$', 'about 20 minutes’ walk'],
          ],
        },
      ],
      lines: [
        { say: 'A referent is an everyday object or distance that is about the size of one unit. Parts of your body make great referents, because you always have them with you.', show: 'def' },
        { say: 'A millimetre is about the thickness of a dime. A centimetre is about the width of your little fingernail.', show: ['si.0', 'si.1'], focus: ['si.0', 'si.1'] },
        { say: "A metre is about the height of a doorknob, or one long stride, and a kilometre is about twelve minutes' walk.", show: ['si.2', 'si.3'], focus: ['si.2', 'si.3'] },
        { say: "In imperial units, an inch is about the width of your thumb at the knuckle, and a foot is about the length of an adult's shoe.", show: ['imp.0', 'imp.1'], focus: ['imp.0', 'imp.1'] },
        { say: "A yard is about the distance from your nose to the fingertips of your outstretched arm, and a mile is about twenty minutes' walk.", show: ['imp.2', 'imp.3'], focus: ['imp.2', 'imp.3'] },
      ],
    },
    {
      chapter: 'Comparing the systems',
      layout: 'center',
      main: [
        rulers,
        {
          kind: 'bullets',
          id: 'cmp',
          items: [
            '$1\\text{ in} \\approx 2.5\\text{ cm}$ (exactly $2.54\\text{ cm}$)',
            '$1\\text{ ft} \\approx 30\\text{ cm}$, about the length of a ruler',
            '$1\\text{ m}$ is a little longer than $1\\text{ yd}$, and $1\\text{ mi} \\approx 1.6\\text{ km}$',
          ],
        },
      ],
      lines: [
        { say: 'Referents also help you compare the two systems. Here is a centimetre ruler, and below it, an inch ruler drawn to the same scale.', show: ['rulers.cm-scale', 'rulers.in-scale'] },
        { say: 'One inch reaches just past two and a half centimetres. An inch is about two and a half centimetres; exactly, it is 2.54 centimetres.', show: ['rulers.inch', 'cmp.0'], focus: ['rulers.inch', 'rulers.in-t4'] },
        { say: 'A foot is about thirty centimetres, about the length of a standard ruler.', show: 'cmp.1', focus: 'cmp.1' },
        { say: 'A metre is a little longer than a yard. And a mile is about 1.6 kilometres, so a mile is longer than a kilometre.', show: 'cmp.2', focus: 'cmp.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A phone is about $4\\text{ in}$ wide. About how many centimetres is that? Use $1\\text{ in} \\approx 2.5\\text{ cm}$.',
          choices: ['about $10\\text{ cm}$', 'about $1.6\\text{ cm}$', 'about $4\\text{ cm}$', 'about $48\\text{ cm}$'],
          answer: 0,
          working: '$4 \\times 2.5 = 10\\text{ cm}$. An inch is longer than a centimetre, so there are more centimetres than inches.',
        },
      ],
      lines: [
        { say: 'Your turn. A phone is about four inches wide. About how many centimetres is that? Use one inch is about two and a half centimetres. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four times two and a half is ten, so the phone is about ten centimetres wide. An inch is longer than a centimetre, so there must be more centimetres than inches.', show: 'q.answer' },
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
            'SI units are powers of 10: $10\\text{ mm} = 1\\text{ cm}$, $100\\text{ cm} = 1\\text{ m}$, $1000\\text{ m} = 1\\text{ km}$.',
            'Imperial: $12\\text{ in} = 1\\text{ ft}$, $3\\text{ ft} = 1\\text{ yd}$, $5280\\text{ ft} = 1\\text{ mi}$.',
            'A referent is an everyday object about one unit long.',
            '$1\\text{ in} \\approx 2.5\\text{ cm}$, $1\\text{ ft} \\approx 30\\text{ cm}$, $1\\text{ mi} \\approx 1.6\\text{ km}$.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. S I units are powers of ten: ten millimetres make a centimetre, a hundred centimetres make a metre, and a thousand metres make a kilometre.", caption: "Let's sum up. SI units are powers of ten: ten millimetres make a centimetre, a hundred centimetres make a metre, and a thousand metres make a kilometre.", show: 'sum.0' },
        { say: 'In imperial units, twelve inches make a foot, three feet make a yard, and 5,280 feet make a mile.', show: 'sum.1' },
        { say: 'A referent is an everyday object about one unit long, like your little fingernail for a centimetre.', show: 'sum.2' },
        { say: 'And to compare the systems: an inch is about two and a half centimetres, a foot about thirty, and a mile about 1.6 kilometres. In part two, we use referents to estimate. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
