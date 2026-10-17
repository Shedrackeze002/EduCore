import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-7-7-c',
  lessonId: 'm301-7-7',
  title: 'Logarithmic and Exponential Equations, Part 3: Applications',
  thumbnailTitle: 'Growth, Decay and Log Scales',
  summary: 'Using logarithms to find an unknown exponent in applications: how long $1000 takes to double at 5% per year, compounded annually, when 20 mg of a 100 mg sample with an 8-day half-life remains, and how pH, decibels and earthquake magnitude compare quantities on logarithmic scales.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.7 · Part 3', title: 'Applications', subtitle: 'Growth, decay and logarithmic scales' }],
      lines: [
        { say: 'How long does it take an investment to double at five percent per year? How strong is one earthquake compared with another? Both questions have an unknown exponent.', show: 'title' },
        { say: 'In this video, you will put the whole unit to work. Write the formula, substitute what you know, isolate the power, and take logarithms.' },
      ],
    },
    {
      chapter: 'Doubling time',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: '\\$1000 is invested at 5% per year, compounded annually, so it is worth $A = 1000(1.05)^{n}$ after $n$ years. How long until it is worth \\$2000?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2000 = 1000(1.05)^{n}', '1.05^{n} = 2', 'n = \\dfrac{\\log 2}{\\log 1.05} \\approx 14.2'] },
      ],
      lines: [
        { say: 'One thousand dollars is invested at five percent per year, compounded annually. After n years, its value is one thousand times 1.05 to the power n. How long until it is worth two thousand dollars?', show: 'q' },
        { say: 'Substitute two thousand for the value.', show: 'm.0', focus: 'm.0' },
        { say: 'Isolate the power by dividing both sides by one thousand: 1.05 to the power n equals two.', show: 'm.1', focus: 'm.1' },
        { say: 'Take logarithms and bring n down: n equals log two over log 1.05, which is about 14.2. It takes about 14.2 years to double.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Half-life',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A $100$ mg sample of a radioactive isotope has a half-life of $8$ days, so $A = 100\\left(\\frac{1}{2}\\right)^{\\frac{t}{8}}$. How long until $20$ mg remain?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['20 = 100(0.5)^{\\frac{t}{8}}', '0.5^{\\frac{t}{8}} = 0.2', '\\dfrac{t}{8}\\log 0.5 = \\log 0.2', 't = \\dfrac{8\\log 0.2}{\\log 0.5} \\approx 18.6'] },
      ],
      lines: [
        { say: 'A 100 milligram sample of a radioactive isotope has a half-life of eight days, so the mass left is 100 times one half to the power t over eight. How long until 20 milligrams remain?', show: 'q' },
        { say: 'Substitute 20 for the mass. One half is 0.5.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides by 100: 0.5 to the power t over eight equals 0.2. And 0.2 is not a power of one half, so we need logarithms.', show: 'm.1', focus: 'm.1' },
        { say: 'Take logarithms. The power law brings down the whole exponent: t over eight, times log 0.5, equals log 0.2.', show: 'm.2', focus: 'm.2' },
        { say: 'Solve for t: eight log 0.2 over log 0.5, which is about 18.6. So about 18.6 days. That makes sense: it is between two half-lives, 16 days, and three half-lives, 24 days.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Logarithmic scales',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Scale', 'Formula', 'A change of…', 'means…'],
          rows: [
            ['pH', '$\\text{pH} = -\\log\\left[\\text{H}^{+}\\right]$', 'down $1$', '$10$ times the hydrogen ion concentration'],
            ['Sound level', '$\\beta = 10\\log \\dfrac{I}{I_0}$', 'up $10$ dB', '$10$ times the intensity'],
            ['Earthquake', '$M = \\log \\dfrac{A}{A_0}$', 'up $1$', '$10$ times the amplitude'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the formula in the question', md: 'Rates, half-lives and scale formulas are always given. Identify what each letter means before substituting.' },
      ],
      lines: [
        { say: 'Some quantities vary over huge ranges, from tiny to enormous. Logarithmic scales squeeze them into small, friendly numbers. Here are three.' },
        { say: 'p H is negative log of the hydrogen ion concentration. A drop of one in p H means ten times the concentration.', caption: 'pH is negative log of the hydrogen ion concentration. A drop of one in pH means ten times the concentration.', show: 't.0', focus: 't.0' },
        { say: 'Sound level, beta, is ten log of I over I naught, in decibels. An increase of ten decibels means ten times the intensity.', show: 't.1', focus: 't.1' },
        { say: 'Earthquake magnitude, M, is log of "A" over "A" naught. An increase of one in magnitude means ten times the amplitude of the shaking.', show: 't.2', focus: 't.2' },
        { say: 'In every application, the rate, half-life or formula is given in the question. Identify what each letter means before you substitute.', show: 'tip' },
      ],
    },
    {
      chapter: 'Comparing earthquakes',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Using $M = \\log \\dfrac{A}{A_0}$, how many times as great is the amplitude of a magnitude $6.3$ earthquake as that of a magnitude $4.8$ earthquake?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['M_1 - M_2 = (\\log A_1 - \\log A_0) - (\\log A_2 - \\log A_0)', '= \\log A_1 - \\log A_2 = \\log \\dfrac{A_1}{A_2}', '\\dfrac{A_1}{A_2} = 10^{6.3 - 4.8} = 10^{1.5} \\approx 31.6'] },
      ],
      lines: [
        { say: 'Using M equals log of "A" over "A" naught, how many times as great is the amplitude of a magnitude 6.3 earthquake as that of a magnitude 4.8 earthquake?', show: 'q' },
        { say: 'By the quotient law, each magnitude is log of its amplitude, minus log of "A" naught. Subtract the two magnitudes, and the log of "A" naught cancels.', show: 'm.0', focus: 'm.0' },
        { say: 'What is left is log of "A" one, minus log of "A" two, which is log of "A" one over "A" two.', show: 'm.1', focus: 'm.1' },
        { say: 'So "A" one over "A" two is ten to the power 6.3 minus 4.8, which is ten to the power 1.5: about 31.6. The bigger earthquake shakes about 31.6 times as hard.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Sound level is $\\beta = 10\\log \\dfrac{I}{I_0}$ decibels. How many times as intense as a $60$ dB sound is a $90$ dB sound?',
          choices: ['$30$', '$3$', '$1.5$', '$1000$'],
          answer: 3,
          working: '$\\beta_1 - \\beta_2 = 10\\log \\dfrac{I_1}{I_2}$, so $30 = 10\\log \\dfrac{I_1}{I_2}$, $\\log \\dfrac{I_1}{I_2} = 3$ and $\\dfrac{I_1}{I_2} = 10^{3} = 1000$.',
        },
      ],
      lines: [
        { say: 'Your turn. Sound level is ten log of I over I naught, in decibels. How many times as intense as a 60 decibel sound is a 90 decibel sound? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The difference, 30 decibels, equals ten log of the ratio of intensities. So the log of the ratio is three, and the ratio is ten cubed: one thousand. Choice A is the difference in decibels, not the ratio of intensities.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write the formula, substitute, isolate the power, and take logarithms.', 'Growth, decay and interest problems have an unknown exponent.', 'On a logarithmic scale, each step of $1$ in the logarithm is a factor of $10$.', 'To compare two values on a scale, subtract: the quotient law gives the ratio.'] }],
      lines: [
        { say: 'Let’s sum up. In every application, write the formula, substitute what you know, isolate the power, and take logarithms.', show: 'sum.0' },
        { say: 'Growth, decay and interest problems all lead to an unknown exponent.', show: 'sum.1' },
        { say: 'On a logarithmic scale, each step of one in the logarithm is a factor of ten.', show: 'sum.2' },
        { say: 'And to compare two values on a scale, subtract them: the quotient law turns the difference into a ratio. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
