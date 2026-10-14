import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const rent = plane({ x: [0, 500], y: [0, 200], xStep: 100, yStep: 50, width: 9, height: 6.5, titles: { x: '\\text{Distance (km)}', y: '\\text{Cost (\\$)}' } });

const video: Explainer = {
  id: 'm10c-8-4-b',
  lessonId: 'm10c-8-4',
  title: 'The Number of Solutions, Part 2: Solving Problems with Systems',
  thumbnailTitle: 'Problems with Systems',
  thumbnail: 'rent',
  summary: 'Five steps for word problems with systems (define, write, solve, check, answer), applied to ticket sales, comparing two rental plans, and the dimensions of a rectangle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 8.4 · Part 2', title: 'Solving Problems with Systems', subtitle: 'Define, write, solve, check, answer' }],
      lines: [
        { say: 'Systems of equations answer real questions: how many of each, when two plans cost the same, or how big something is.', show: 'title' },
        { say: 'In this video, you will solve three problems with systems, step by step.' },
      ],
    },
    {
      chapter: 'Five steps',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Define** two variables, with units.', '**Write** two equations from the information.', '**Solve** with the most efficient method.', '**Check** the solution in the words of the problem.', '**Answer** in a sentence.'] }],
      lines: [
        { say: 'Word problems with systems follow five steps. Define two variables clearly, with units. Then write two equations from the information.', show: ['b.0', 'b.1'] },
        { say: 'Solve with the most efficient method, and check the solution in the words of the problem.', show: ['b.2', 'b.3'] },
        { say: 'Finally, answer the question in a sentence.', show: 'b.4' },
      ],
    },
    {
      chapter: 'Tickets',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\begin{cases} a + s = 150 \\\\ 12a + 8s = 1480 \\end{cases}', '\\times (-8)\\text{: } {-8a} - 8s = -1200', '4a = 280, \\quad a = 70, \\quad s = 80', '70 \\times 12 + 80 \\times 8 = 1480 \\ \\checkmark'],
        },
      ],
      lines: [
        { say: 'Back to the tickets. With "a" adult tickets and s student tickets, "a" plus s equals 150, and twelve "a" plus eight s equals 1,480.', show: 'm.0' },
        { say: 'Use elimination. Multiply the first equation by negative eight: negative eight "a" minus eight s equals negative 1,200.', show: 'm.1', focus: 'm.1' },
        { say: 'Add it to the second equation. The s terms cancel: four "a" equals 280, so "a" is seventy, and s is 150 minus seventy, which is eighty.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: seventy tickets at twelve dollars, plus eighty at eight dollars, is 1,480 dollars. So the school sold seventy adult tickets and eighty student tickets.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Comparing plans',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('rent', [
          rent,
          plot(rent, { id: 'A', f: (d) => 0.25 * d + 40, tone: 'adj', label: 'A', labelAt: 0.92 }),
          plot(rent, { id: 'B', f: (d) => 0.15 * d + 70, tone: 'opp', label: 'B', labelAt: 0.92, side: 'right' }),
          dots(rent, [{ id: 'P', x: 300, y: 115, tex: '(300,\\,115)', place: 'above left' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{C = 0.25d + 40}', '\\opp{C = 0.15d + 70}', '0.10d = 30, \\quad d = 300', 'C = 0.25(300) + 40 = 115'] }],
      lines: [
        { say: 'Rental A costs forty dollars, plus twenty-five cents per kilometre. Rental B costs seventy dollars, plus fifteen cents per kilometre. When do they cost the same?', show: ['m.0', 'm.1', 'rent.grid', 'rent.axes', 'rent.A', 'rent.B'] },
        { say: 'Set the costs equal: 0.25 d plus forty equals 0.15 d plus seventy. So 0.10 d equals thirty, and d is 300.', show: 'm.2', focus: 'm.2' },
        { say: 'Then the cost is 0.25 times 300, plus forty, which is 115. Both plans cost 115 dollars for 300 kilometres.', show: ['m.3', 'rent.P'], focus: ['m.3', 'rent.P'] },
        { say: 'The graph shows more: below 300 kilometres, A is cheaper, and above it, B is cheaper.', focus: ['rent.A', 'rent.B'] },
      ],
    },
    {
      chapter: 'A rectangle',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A rectangle’s length is $7\\text{ cm}$ more than its width, and its perimeter is $54\\text{ cm}$. Find its dimensions.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\begin{cases} l = w + 7 \\\\ 2l + 2w = 54 \\end{cases}', '2(w + 7) + 2w = 54', '4w + 14 = 54, \\quad w = 10, \\quad l = 17'] },
      ],
      lines: [
        { say: 'A rectangle’s length is seven centimetres more than its width, and its perimeter is fifty-four centimetres. Find its dimensions.', show: 'q' },
        { say: 'Let l be the length and w the width. Then l equals w plus seven, and two l plus two w equals fifty-four.', show: 'm.0', focus: 'm.0' },
        { say: 'The length is already isolated, so substitute: two, times w plus seven, plus two w, equals fifty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'So four w plus fourteen equals fifty-four, and w is ten. The rectangle is ten centimetres wide and seventeen centimetres long.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The sum of two numbers is $30$ and their difference is $8$. What are the numbers?',
          choices: ['$19$ and $11$', '$22$ and $8$', '$15$ and $15$', '$20$ and $10$'],
          answer: 0,
          working: '$x + y = 30$ and $x - y = 8$. Add: $2x = 38$, so $x = 19$ and $y = 11$.',
        },
      ],
      lines: [
        { say: 'Your turn. The sum of two numbers is thirty, and their difference is eight. What are the numbers? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus y equals thirty, and x minus y equals eight. Add them: two x equals thirty-eight, so x is nineteen, and y is eleven.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Define two variables, with units.', 'Write two equations, then solve with the best method.', 'Check in the words of the problem, and answer in a sentence.'] }],
      lines: [
        { say: 'Let’s sum up. Define two variables, with units.', show: 'sum.0' },
        { say: 'Write two equations from the information, and solve them with the most efficient method.', show: 'sum.1' },
        { say: 'Then check in the words of the problem, and answer in a sentence. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
