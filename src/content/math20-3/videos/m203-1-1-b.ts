import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

type P = [number, number];

/** Three steps with 18 cm risers and 27 cm treads, and the dashed line along their front edges. */
function stairs(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const corners: P[] = [[0, 0]];
  for (let i = 0; i < 3; i++) {
    const [x, y] = corners[corners.length - 1];
    corners.push([x, y + 1.8], [x + 2.7, y + 1.8]);
  }
  corners.forEach((p, i) => (points[`s${i}`] = p));
  points.g = [8.1, 0];
  items.push({ kind: 'line', id: 'floor', from: 's0', to: 'g', tone: 'muted', group: 'frame' }, { kind: 'line', id: 'back', from: 'g', to: 's6', tone: 'muted', group: 'frame' });
  for (let i = 0; i < corners.length - 1; i++) {
    items.push({ kind: 'line', id: `e${i}`, from: `s${i}`, to: `s${i + 1}`, group: 'steps' });
  }
  // The first riser and tread carry the labels.
  Object.assign(items.find((it) => it.id === 'e0')!, { tone: 'opp', label: '18\\text{ cm}', labelSide: 'left' });
  Object.assign(items.find((it) => it.id === 'e1')!, { tone: 'adj', label: '27\\text{ cm}', labelSide: 'right' });
  items.push({ kind: 'line', id: 'pitch', from: 's1', to: 's5', tone: 'theta', dashed: true });
  return { points, items };
}

const video: Explainer = {
  id: 'm203-1-1-b',
  lessonId: 'm203-1-1',
  title: 'Slope, Part 2: Finding a Missing Rise or Run',
  thumbnailTitle: 'Missing Rise or Run',
  thumbnail: 'roof',
  summary: 'Rearranging slope = rise/run to find the rise of a 5/12 garage roof over a 14 ft run (about 5.8 ft), the shortest run of a ramp with a slope of at most 1/12 up to a door 54 cm high (648 cm), and the slope of a staircase (2/3).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.1 · Part 2', title: 'Finding a Missing Rise or Run', subtitle: 'Rearranging the slope formula' }],
      lines: [
        { say: 'On a job site, you often know the slope and one length, and need the other. How high will the roof go? How long must the ramp be?', show: 'title' },
        { say: 'In this video, you will rearrange the slope formula to find a missing rise or run, and find the slope of a staircase.' },
      ],
    },
    {
      chapter: 'Rearranging the formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}}', '\\text{rise} = \\text{slope} \\times \\text{run}', '\\text{run} = \\dfrac{\\text{rise}}{\\text{slope}}'] }],
      lines: [
        { say: 'Start from slope equals rise over run.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by the run: the rise is the slope times the run.', show: 'm.1', focus: 'm.1' },
        { say: 'Or divide the rise by the slope to find the run. Use whichever matches the length you are missing.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How high does the roof rise?',
      layout: 'split',
      leftWidth: 600,
      left: [figure('rf', [triangle({ A: [0, 0], B: [14, 0], C: [14, 5.833], right: 'B', sides: { AB: '14\\text{ ft}', BC: '?' }, tones: { AB: 'adj', BC: 'opp', CA: 'brand' } })], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{rise} = \\dfrac{5}{12} \\times 14', '= \\dfrac{70}{12} \\approx 5.833', '\\approx 5.8 \\text{ ft}'] }],
      lines: [
        { say: 'A garage roof has a slope of five twelfths. Each rafter covers a horizontal run of fourteen feet. How high does the roof rise?', show: 'rf.shape' },
        { say: 'You know the run, so multiply: the rise is five twelfths times fourteen.', show: 'm.0', focus: ['rf.BC', 'm.0'] },
        { say: 'That is seventy twelfths, about 5.833.', show: 'm.1', focus: 'm.1' },
        { say: 'Rounded to the nearest tenth, the roof rises about 5.8 feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How long must the ramp be?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{slope} \\le \\dfrac{1}{12}:\\ \\text{run} \\ge 12 \\times \\text{rise}', '\\text{run} = 54 \\times 12 = 648 \\text{ cm}', '648 \\text{ cm} = 6.48 \\text{ m}'] }],
      lines: [
        { say: 'In this example, suppose the building code allows a ramp slope of at most one twelfth. A door is fifty-four centimetres above the sidewalk. What is the shortest run the ramp can have? A slope of one twelfth means the run is twelve times the rise.', show: 'm.0', focus: 'm.0' },
        { say: 'So the run is fifty-four times twelve, 648 centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'The ramp needs a run of at least 648 centimetres, or 6.48 metres. A shorter run would make it steeper than the code allows.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Stairs',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sr', [stairs()], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{slope} = \\dfrac{\\text{riser}}{\\text{tread}}', '= \\dfrac{18}{27} = \\dfrac{2}{3}'] }],
      lines: [
        { say: 'Stairs work the same way. For one step, the riser is the rise, and the tread is the run.', show: ['sr.frame', 'sr.steps'] },
        { say: 'A staircase has eighteen centimetre risers and twenty-seven centimetre treads. Its slope is eighteen over twenty-seven.', show: 'm.0', focus: ['sr.e0', 'sr.e1', 'm.0'] },
        { say: 'Divide both by nine: the slope is two thirds. The dashed line along the front edges of the steps has this slope.', show: ['m.1', 'sr.pitch'], focus: ['sr.pitch', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In this example, a ramp may have a slope of at most $\\dfrac{1}{15}$. It must rise $40$ cm. What is the shortest run it can have?',
          choices: ['$600$ cm', '$2.7$ cm', '$55$ cm', '$40$ cm'],
          answer: 0,
          working: '$\\text{run} = \\dfrac{\\text{rise}}{\\text{slope}} = 40 \\div \\dfrac{1}{15} = 40 \\times 15 = 600$ cm. B divides $40$ by $15$ instead.',
        },
      ],
      lines: [
        { say: 'Your turn. In this example, a ramp may have a slope of at most one fifteenth. It must rise forty centimetres. What is the shortest run it can have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The run is the rise divided by the slope: forty divided by one fifteenth, which is forty times fifteen, 600 centimetres. B divides forty by fifteen instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\text{rise} = \\text{slope} \\times \\text{run}$', '$\\text{run} = \\dfrac{\\text{rise}}{\\text{slope}}$', 'For stairs, slope $= \\dfrac{\\text{riser}}{\\text{tread}}$.'] }],
      lines: [
        { say: 'Let’s sum up. To find a rise, multiply the slope by the run.', show: 'sum.0' },
        { say: 'To find a run, divide the rise by the slope.', show: 'sum.1' },
        { say: 'And for stairs, the slope is the riser over the tread. In part three, we write slopes as percent grades. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
