import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-8-3-c',
  lessonId: 'm202-8-3',
  title: 'Scale Diagrams, Part 3: Finding and Choosing a Scale',
  thumbnailTitle: 'Finding a Scale',
  thumbnail: 'm',
  summary: 'Writing a scale as 1 : n by dividing the real length by the diagram length in the same unit (two towns 12.6 km apart drawn 8.4 cm apart give 1 : 150 000), then using it, and choosing a scale so a 24 m by 15 m yard fits on a page.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.3 · Part 3', title: 'Finding and Choosing a Scale', subtitle: 'From two lengths to 1 : n' }],
      lines: [
        { say: 'Sometimes a map has no scale printed on it, but you know one real distance. And sometimes you have to choose a scale yourself, so a drawing fits on the page.', show: 'title' },
        { say: 'In this video, you will find a scale from two lengths, use it, and choose a scale that fits.' },
      ],
    },
    {
      chapter: 'Finding n',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Put both lengths in the **same unit**.', 'Divide: $n = \\dfrac{\\text{real length}}{\\text{diagram length}}$', 'Write the scale as $1 : n$.'] }],
      lines: [
        { say: 'To write a scale as one to n, first put both lengths in the same unit.', show: 'b.0' },
        { say: 'Then divide the real length by the diagram length. That gives n, the number of real units for each unit on the diagram.', show: 'b.1' },
        { say: 'And write the scale as one to n.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A road map',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['12.6 \\text{ km} = 12.6 \\times 100\\,000 = 1\\,260\\,000 \\text{ cm}', 'n = \\dfrac{1\\,260\\,000}{8.4} = 150\\,000', '\\text{scale } 1 : 150\\,000', '5.2 \\times 150\\,000 = 780\\,000 \\text{ cm} = 7.8 \\text{ km}'] }],
      lines: [
        { say: 'Two towns are 12.6 kilometres apart. On a map, they are 8.4 centimetres apart. Write the scale as one to n. First, the same unit: 12.6 kilometres is 1,260,000 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide the real length by the map length: 1,260,000 divided by 8.4 is 150,000.', show: 'm.1', focus: 'm.1' },
        { say: 'So the scale is one to 150,000.', show: 'm.2', focus: 'm.2' },
        { say: 'Now use it. Another road measures 5.2 centimetres on the same map. Multiply by 150,000: 780,000 centimetres, which is 7.8 kilometres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Will it fit?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2400 \\div 20 = 120', '1500 \\div 15 = 100', '1 : 150:\\ \\ 2400 \\div 150 = 16 \\text{ cm},\\ \\ 1500 \\div 150 = 10 \\text{ cm}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Will it fit?', md: 'Divide each real length by the space you have on the page, and use an $n$ at least as large as the biggest result. A larger $n$ in $1 : n$ makes a smaller drawing.' },
      ],
      lines: [
        { say: 'You want to draw a yard that is twenty-four metres by fifteen metres, in a space on the page that is twenty centimetres by fifteen centimetres. What scale will fit? Use centimetres, and divide each real length by the space you have: 2,400 divided by twenty is 120.', show: 'm.0', focus: 'm.0' },
        { say: 'And 1,500 divided by fifteen is 100. The scale must work for both, so n must be at least 120.', show: 'm.1', focus: 'm.1' },
        { say: 'A round scale like one to 150 fits easily: the yard is drawn sixteen centimetres by ten centimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'Remember, a larger n makes a smaller drawing. If the drawing is too big, increase n.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two lakes are $3.6$ km apart. On a map, they are $4.8$ cm apart. What is the scale of the map?',
          choices: ['$1 : 75\\,000$', '$1 : 750$', '$1 : 7500$', '$1 : 1.33$'],
          answer: 0,
          working: '$3.6$ km $= 360\\,000$ cm, so $n = \\dfrac{360\\,000}{4.8} = 75\\,000$. D divides $4.8 \\div 3.6$ without converting.',
        },
      ],
      lines: [
        { say: 'Your turn. Two lakes are 3.6 kilometres apart. On a map, they are 4.8 centimetres apart. What is the scale of the map? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 3.6 kilometres is 360,000 centimetres, and 360,000 divided by 4.8 is 75,000. So the scale is one to 75,000.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['To find $n$, divide the real length by the diagram length, in the same unit.', 'Use the scale to find other real lengths: multiply by $n$.', 'To fit a drawing, choose $n$ at least as large as each real length ÷ space.'] }],
      lines: [
        { say: 'Let’s sum up. To find n, divide the real length by the diagram length, in the same unit.', show: 'sum.0' },
        { say: 'Then use the scale for other lengths: multiply by n.', show: 'sum.1' },
        { say: 'And to fit a drawing on the page, choose n at least as large as each real length divided by the space you have. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
