import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-8-4-c',
  lessonId: 'm202-8-4',
  title: 'Similar Objects: Length, Area and Volume, Part 3: Working Back to the Scale Factor',
  thumbnailTitle: 'Working Back to k',
  thumbnail: 'm',
  summary: 'Finding k from an area ratio with a square root (similar photos of 150 cm² and 384 cm², so k = 1.6) and from a volume ratio with a cube root (bottles of 250 cm³ and 2000 cm³, so k = 2), then using k to find a width and a surface area.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.4 · Part 3', title: 'Working Back to the Scale Factor', subtitle: 'Undo the power' }],
      lines: [
        { say: 'Sometimes you know two areas or two volumes, but not the scale factor. You can still work back to it.', show: 'title' },
        { say: 'In this video, you will find k from an area ratio and from a volume ratio, then use it to answer the question.' },
      ],
    },
    {
      chapter: 'Undo the power',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Area ratio $= k^2$, so $k = \\sqrt{\\text{area ratio}}$.', 'Volume ratio $= k^3$, so $k = \\sqrt[3]{\\text{volume ratio}}$.'] }],
      lines: [
        { say: 'Divide to get the ratio, then undo the power. The ratio of two areas is k squared, so k is the square root of the area ratio.', show: 'b.0' },
        { say: 'The ratio of two volumes is k cubed, so k is the cube root of the volume ratio.', show: 'b.1' },
      ],
    },
    {
      chapter: 'From areas to a length',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['k^2 = \\dfrac{384}{150} = 2.56', 'k = \\sqrt{2.56} = 1.6', '10 \\times 1.6 = 16 \\text{ cm}'] }],
      lines: [
        { say: 'Two similar photos have areas of 150 and 384 square centimetres. The smaller photo is ten centimetres wide. How wide is the larger one? The area ratio is 384 over 150, which is 2.56. That is k squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Take the square root: k is 1.6.', show: 'm.1', focus: 'm.1' },
        { say: 'Width is a length, so multiply by k: the larger photo is ten times 1.6, sixteen centimetres wide.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'From volumes to a surface area',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['k^3 = \\dfrac{2000}{250} = 8', 'k = \\sqrt[3]{8} = 2', 'k^2 = 4', '240 \\times 4 = 960 \\text{ cm}^2'] }],
      lines: [
        { say: 'Two similar water bottles hold 250 and 2,000 cubic centimetres. The small bottle has a surface area of 240 square centimetres. What is the surface area of the large bottle? The volume ratio is 2,000 over 250, which is eight. That is k cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'Take the cube root: k is two.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the question asks for an area, so square k: four.', show: 'm.2', focus: 'm.2' },
        { say: 'The large bottle has a surface area of 240 times four, 960 square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Go through k',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Always go through k', md: 'Do not multiply an area by a volume ratio, or a volume by an area ratio. Work back to $k$ from the lengths, areas or volumes you know, then square or cube it as the question needs.' }],
      lines: [
        { say: 'Here is the habit that keeps these problems straight. Do not multiply an area by a volume ratio. Always work back to k first.', show: 'tip' },
        { say: 'Then raise k to the power the question needs: k for a length, k squared for an area, and k cubed for a volume.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two similar boxes have volumes of $27\\ \\text{cm}^3$ and $125\\ \\text{cm}^3$. The small box has a surface area of $54\\ \\text{cm}^2$. What is the surface area of the large box?',
          choices: ['$150\\ \\text{cm}^2$', '$250\\ \\text{cm}^2$', '$90\\ \\text{cm}^2$', '$126\\ \\text{cm}^2$'],
          answer: 0,
          working: '$k^3 = \\dfrac{125}{27}$, so $k = \\dfrac{5}{3}$ and $k^2 = \\dfrac{25}{9}$. $54 \\times \\dfrac{25}{9} = 150\\ \\text{cm}^2$. B multiplies by the volume ratio.',
        },
      ],
      lines: [
        { say: 'Your turn. Two similar boxes have volumes of twenty-seven and 125 cubic centimetres. The small box has a surface area of fifty-four square centimetres. What is the surface area of the large box? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The cube root of 125 over twenty-seven is five thirds, so k squared is twenty-five ninths, and fifty-four times twenty-five ninths is 150. B multiplies by the volume ratio instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['From areas: $k = \\sqrt{\\text{area ratio}}$.', 'From volumes: $k = \\sqrt[3]{\\text{volume ratio}}$.', 'Then use $k$, $k^2$ or $k^3$ as the question needs.'] }],
      lines: [
        { say: 'Let’s sum up. From two areas, k is the square root of the area ratio.', show: 'sum.0' },
        { say: 'From two volumes, k is the cube root of the volume ratio.', show: 'sum.1' },
        { say: 'Then use k, k squared, or k cubed, as the question needs. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
