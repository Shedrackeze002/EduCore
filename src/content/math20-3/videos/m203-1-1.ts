import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

/** Two lines from the same point: a slope of 1/2 and a slope of 1/12. */
const steepness: Part = {
  points: { O: [0, 0], P: [12, 6], Q: [12, 1], E: [12.6, 0] },
  items: [
    { kind: 'line', id: 'ground', from: 'O', to: 'E', tone: 'muted' },
    { kind: 'line', id: 'steep', from: 'O', to: 'P', tone: 'opp', weight: 4, label: '\\text{slope } \\tfrac{1}{2}', labelSide: 'left', labelAt: 0.6 },
    { kind: 'line', id: 'gentle', from: 'O', to: 'Q', tone: 'adj', weight: 4, label: '\\text{slope } \\tfrac{1}{12}', labelSide: 'left', labelAt: 0.75 },
  ],
};

const video: Explainer = {
  id: 'm203-1-1',
  lessonId: 'm203-1-1',
  title: 'Slope, Part 1: Rise over Run',
  thumbnailTitle: 'Rise over Run',
  thumbnail: 'ramp',
  summary: 'Slope as rise over run, why a bigger slope is steeper, the slope of 1/12 for a wheelchair ramp that rises 45 cm over 540 cm, and why the rise and the run must be in the same unit.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.1 · Part 1', title: 'Rise over Run', subtitle: 'How steep is it?' }],
      lines: [
        { say: 'Every ramp, roof, road and staircase has a steepness. Builders, roofers and road crews describe it with one number, the slope, and building codes set limits on it.', show: 'title' },
        { say: 'In this video, you will find the slope of a ramp, and avoid the most common slip with units.' },
      ],
    },
    {
      chapter: 'Rise, run and slope',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Slope, rise and run', md: 'The **rise** is the vertical change. The **run** is the horizontal change. The **slope** compares them.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}}'] },
      ],
      lines: [
        { say: 'The rise is the vertical change: how far up. The run is the horizontal change: how far across.', show: 'def' },
        { say: 'The slope compares them. It is the rise divided by the run.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Bigger means steeper',
      layout: 'split',
      leftWidth: 640,
      left: [figure('st', [steepness], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{1}{2} = 0.5', '\\dfrac{1}{12} \\approx 0.083', '0.5 > 0.083'] }],
      lines: [
        { say: 'A bigger slope means a steeper surface. A slope of one half climbs one unit for every two units across.', show: ['st.ground', 'st.steep', 'm.0'], focus: ['st.steep', 'm.0'] },
        { say: 'A slope of one twelfth climbs one unit for every twelve units across. That is a gentle ramp.', show: ['st.gentle', 'm.1'], focus: ['st.gentle', 'm.1'] },
        { say: 'As decimals, one half is 0.5, and one twelfth is about 0.083. The bigger number belongs to the steeper line.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A wheelchair ramp',
      layout: 'split',
      leftWidth: 640,
      left: [figure('rp', [triangle({ A: [12, 0], B: [0, 0], C: [0, 1], right: 'B', sides: { AB: '540\\text{ cm}', BC: '45\\text{ cm}' }, tones: { AB: 'adj', BC: 'opp', CA: 'brand' } })], 260)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{slope} = \\dfrac{45}{540}', '= \\dfrac{45 \\div 45}{540 \\div 45}', '= \\dfrac{1}{12}'] }],
      lines: [
        { say: 'A wheelchair ramp at a clinic in Red Deer rises forty-five centimetres over a horizontal run of 540 centimetres. What is its slope?', show: 'rp.shape' },
        { say: 'Divide the rise by the run: forty-five over 540.', show: 'm.0', focus: ['rp.BC', 'rp.AB', 'm.0'] },
        { say: 'Simplify. Forty-five goes into both: forty-five divided by forty-five is one, and 540 divided by forty-five is twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'So the slope is one twelfth. The ramp rises one centimetre for every twelve centimetres of run.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Same units first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing units', md: 'The rise and the run must be in the **same unit** before you divide. A ramp that rises $30$ cm over $3.6$ m does **not** have a slope of $\\dfrac{30}{3.6}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3.6 \\text{ m} = 360 \\text{ cm}', '\\text{slope} = \\dfrac{30}{360} = \\dfrac{1}{12}'] },
      ],
      lines: [
        { say: 'A common mistake is to divide lengths in different units. A ramp rises thirty centimetres over 3.6 metres. Thirty divided by 3.6 is more than eight, which would be a wall, not a ramp.', show: 'oops' },
        { say: 'Change the run to centimetres first: 3.6 metres is 360 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Now thirty over 360 is one twelfth, the same gentle slope as before.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ramp rises $20$ cm over a horizontal run of $3$ m. What is its slope?',
          choices: ['$\\dfrac{1}{15}$', '$\\dfrac{20}{3}$', '$\\dfrac{3}{20}$', '$15$'],
          answer: 0,
          working: '$3$ m $= 300$ cm, so the slope is $\\dfrac{20}{300} = \\dfrac{1}{15}$. B mixes centimetres and metres, and C divides the run by the rise.',
        },
      ],
      lines: [
        { say: 'Your turn. A ramp rises twenty centimetres over a horizontal run of three metres. What is its slope? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three metres is 300 centimetres, so the slope is twenty over 300, which is one fifteenth. B mixes centimetres and metres, and C divides the run by the rise.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}}$', 'A bigger slope is steeper.', 'Put the rise and the run in the same unit first.'] }],
      lines: [
        { say: 'Let’s sum up. Slope is the rise divided by the run.', show: 'sum.0' },
        { say: 'A bigger slope means a steeper surface.', show: 'sum.1' },
        { say: 'And put the rise and the run in the same unit before you divide. In part two, we find a missing rise or run. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
