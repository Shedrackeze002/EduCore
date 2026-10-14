import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-6-1-c',
  lessonId: 'm204-6-1',
  title: 'Converting Units, Part 3: Mixed Units',
  thumbnailTitle: 'Feet and Inches',
  thumbnail: 'm',
  summary: 'Mixed imperial units: changing 5 ft 8 in to 68 in, writing 75 in as 6 ft 3 in with a remainder, pounds and ounces the same way, and why 5 ft 8 in is not 5.8 ft.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.1 · Part 3', title: 'Feet and Inches', subtitle: 'Two units in one measurement' }],
      lines: [
        { say: 'Imperial measurements often use two units at once: five feet eight inches, or seven pounds six ounces.', show: 'title' },
        { say: 'In this video, you will change a mixed measurement to one unit, and back again.' },
      ],
    },
    {
      chapter: 'Height in inches',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Maya is $5$ ft $8$ in tall. A clinic form asks for her height in inches.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5 \\times 12 = 60 \\text{ in}', '60 + 8 = 68 \\text{ in}'] },
      ],
      lines: [
        { say: 'To write the whole amount in the small unit, change the big unit first, then add.', show: 'q' },
        { say: 'Maya is five feet eight inches tall. A form at a clinic asks for her height in inches. First change the feet: five times twelve is sixty inches.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add the extra eight inches: sixty plus eight is 68. Maya is 68 inches tall.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: 68 inches should be a bit less than six feet, which is 72 inches. It is.' },
      ],
    },
    {
      chapter: 'A window in feet and inches',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A window is $75$ in wide. Write this in feet and inches.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['6 \\times 12 = 72', '75 - 72 = 3', '75 \\text{ in} = 6 \\text{ ft } 3 \\text{ in}'] },
      ],
      lines: [
        { say: 'To go the other way, divide by twelve. The whole number is the feet, and the remainder is the inches. A window is 75 inches wide. Write this in feet and inches.', show: 'q' },
        { say: 'How many times does twelve go into 75? Six times, because six times twelve is 72. Seven times would be 84, too much.', show: 'm.0', focus: 'm.0' },
        { say: 'The inches left over are 75 minus 72: three.', show: 'm.1', focus: 'm.1' },
        { say: 'So the window is six feet three inches wide.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: '5 ft 8 in is not 5.8 ft',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '5 ft 8 in is not 5.8 ft', md: 'A foot has $12$ inches, not $10$. So $8$ in is $\\tfrac{8}{12}$ of a foot, not $0.8$ of a foot. Change everything to inches instead.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Pounds and ounces work the same way', md: '$1$ lb $4$ oz $= 16 + 4 = 20$ oz. Just use $16$ instead of $12$.' },
      ],
      lines: [
        { say: 'A common mistake is to write five feet eight inches as 5.8 feet. A foot has twelve inches, not ten. So eight inches is eight twelfths of a foot, not 0.8 of a foot. Change everything to inches instead.', show: 'oops' },
        { say: 'Pounds and ounces work the same way. One pound four ounces is sixteen plus four: twenty ounces. Just use sixteen instead of twelve.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A baby weighs $7$ lb $6$ oz. What is the weight in ounces?',
          choices: ['$118$ oz', '$76$ oz', '$90$ oz', '$7.6$ oz'],
          answer: 0,
          working: '$7 \\times 16 = 112$ oz, and $112 + 6 = 118$ oz. B uses $10$ instead of $16$, and C uses $12$.',
        },
      ],
      lines: [
        { say: 'Your turn. A baby weighs seven pounds six ounces. What is the weight in ounces? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Seven times sixteen is 112 ounces, plus six is 118 ounces. B uses ten instead of sixteen, and C uses twelve, the number for feet and inches.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['To one unit: change the big unit, then add the rest.', 'Back to two units: divide; the remainder is the small unit.', '5 ft 8 in is not 5.8 ft.'] }],
      lines: [
        { say: 'Let’s sum up. To write a mixed measurement in one unit, change the big unit first, then add the rest.', show: 'sum.0' },
        { say: 'To go back to two units, divide. The whole number is the big unit, and the remainder is the small unit.', show: 'sum.1' },
        { say: 'And five feet eight inches is not 5.8 feet. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
