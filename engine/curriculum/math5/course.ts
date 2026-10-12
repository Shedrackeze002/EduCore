/**
 * Mathematics 5 (Alberta), Grade 5.
 * Outcomes follow Alberta's Mathematics Kindergarten to Grade 6 curriculum (2022; in effect for
 * Grades 4 to 6 since September 2023), worded exactly as on curriculum.learnalberta.ca (checked
 * October 2026). The curriculum lists learning outcomes under organizing ideas without codes; the
 * codes here (N1, A1, CG1 …) number them in the order the curriculum lists them. K–6 outcomes are
 * meant to be achieved without calculators.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'N1', strand: 'Number', text: 'Students analyze patterns in place value.' },
  { code: 'N2', strand: 'Number', text: 'Students add and subtract within 1 000 000, including decimal numbers to thousandths, using standard algorithms.' },
  { code: 'N3', strand: 'Number', text: 'Students determine divisibility of natural numbers.' },
  { code: 'N4', strand: 'Number', text: 'Students multiply and divide natural numbers within 100 000, including with standard algorithms.' },
  { code: 'N5', strand: 'Number', text: 'Students interpret improper fractions.' },
  { code: 'N6', strand: 'Number', text: 'Students add and subtract fractions with common denominators.' },
  { code: 'N7', strand: 'Number', text: 'Students employ ratios to represent relationships between quantities.' },
  { code: 'A1', strand: 'Algebra', text: 'Students interpret numerical and algebraic expressions.' },
  { code: 'G1', strand: 'Geometry', text: 'Students investigate symmetry as a geometric property.' },
  { code: 'CG1', strand: 'Coordinate Geometry', text: 'Students relate location to position on a grid.' },
  { code: 'M1', strand: 'Measurement', text: 'Students estimate and calculate area, using standard units.' },
  { code: 'P1', strand: 'Patterns', text: 'Students relate terms to position within an arithmetic sequence.' },
  { code: 'S1', strand: 'Statistics', text: 'Students analyze frequency in categorical data.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 50,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Place Value ----------------
  L('m5-1-1', 'm5-u1', '1.1', 'Place Value to Millions and Thousandths', ['N1'],
    ['m5-place-value'],
    ['Read and write numbers within 10 000 000 and decimals to thousandths in words and numerals', 'Relate the place names to the left and right of the ones place'],
    50, ['place value', 'tenths', 'hundredths', 'thousandths']),
  L('m5-1-2', 'm5-u1', '1.2', 'Comparing, Ordering and Rounding', ['N1'],
    ['m5-compare-order', 'm5-round'],
    ['Compare and order numbers, including decimals, with <, > and =', 'Find a decimal between two decimals and round to a given place'],
    50, ['round', 'number line']),

  // ---------------- Unit 2: Adding and Subtracting ----------------
  L('m5-2-1', 'm5-u2', '2.1', 'Adding and Subtracting with Standard Algorithms', ['N2'],
    ['m5-add-subtract'],
    ['Add and subtract whole numbers within 1 000 000 and decimals to thousandths with standard algorithms'],
    50, ['standard algorithm', 'regroup']),
  L('m5-2-2', 'm5-u2', '2.2', 'Estimating and Solving Problems', ['N2'],
    ['m5-add-subtract-problems'],
    ['Check a sum or difference with estimation', 'Solve problems with addition and subtraction, including money'],
    50, ['estimate']),

  // ---------------- Unit 3: Divisibility and Factors ----------------
  L('m5-3-1', 'm5-u3', '3.1', 'Divisibility Tests', ['N3'],
    ['m5-divisibility'],
    ['Use the divisibility tests for 2, 3 and 5', 'Explain why we cannot divide by zero'],
    50, ['divisible', 'divisibility test', 'remainder']),
  L('m5-3-2', 'm5-u3', '3.2', 'Finding Factors', ['N3'],
    ['m5-factors'],
    ['Find all the factors of a number using divisibility tests'],
    50, ['factor', 'factor pair']),

  // ---------------- Unit 4: Multiplying and Dividing ----------------
  L('m5-4-1', 'm5-u4', '4.1', 'Multiplying with the Standard Algorithm', ['N4'],
    ['m5-multiply'],
    ['Multiply up to 3-digit by 2-digit numbers with the standard algorithm', 'Check a product with estimation'],
    50, ['product']),
  L('m5-4-2', 'm5-u4', '4.2', 'Dividing with the Standard Algorithm', ['N4'],
    ['m5-divide'],
    ['Divide 3-digit numbers by 1-digit numbers with the standard algorithm', 'Write a quotient with or without a remainder'],
    50, ['quotient', 'dividend', 'divisor']),
  L('m5-4-3', 'm5-u4', '4.3', 'Solving Multiplication and Division Problems', ['N4'],
    ['m5-multiply-divide-problems'],
    ['Solve problems with multiplication and division', 'Decide what to do with a remainder'],
    50, []),

  // ---------------- Unit 5: Fractions ----------------
  L('m5-5-1', 'm5-u5', '5.1', 'Improper Fractions and Mixed Numbers', ['N5'],
    ['m5-improper-mixed', 'm5-fraction-number-line'],
    ['Write improper fractions as mixed numbers and back', 'Place fractions on a number line and compare them to 0, 1/2 and 1'],
    50, ['improper fraction', 'mixed number', 'benchmark']),
  L('m5-5-2', 'm5-u5', '5.2', 'Adding and Subtracting Fractions', ['N6'],
    ['m5-fraction-add-subtract', 'm5-fraction-problems'],
    ['Add and subtract fractions with common denominators, including improper fractions and mixed numbers', 'Solve fraction problems'],
    50, ['common denominator', 'unit fraction']),

  // ---------------- Unit 6: Ratios and Percentages ----------------
  L('m5-6-1', 'm5-u6', '6.1', 'Ratios', ['N7'],
    ['m5-ratios'],
    ['Write part-part and part-whole ratios with a colon or as a fraction'],
    50, ['ratio', 'part-part ratio', 'part-whole ratio']),
  L('m5-6-2', 'm5-u6', '6.2', 'Ratios, Fractions, Decimals and Percentages', ['N7'],
    ['m5-ratio-percent'],
    ['Write the same part-whole relationship as a ratio, fraction, decimal and percentage'],
    50, ['percentage']),

  // ---------------- Unit 7: Expressions and Equations ----------------
  L('m5-7-1', 'm5-u7', '7.1', 'Order of Operations with Parentheses', ['A1'],
    ['m5-order-of-operations'],
    ['Evaluate expressions with addition or subtraction in parentheses'],
    50, ['numerical expression', 'parentheses', 'order of operations']),
  L('m5-7-2', 'm5-u7', '7.2', 'Algebraic Expressions', ['A1'],
    ['m5-write-expression', 'm5-evaluate-expression'],
    ['Write an algebraic expression for an unknown value', 'Evaluate an expression by substituting a number for the variable'],
    50, ['variable', 'algebraic expression', 'coefficient', 'constant term']),
  L('m5-7-3', 'm5-u7', '7.3', 'Solving Equations', ['A1'],
    ['m5-solve-equation', 'm5-equation-problems'],
    ['Solve equations with one or two operations using inverse operations', 'Write and solve an equation for a problem and check the solution'],
    50, ['equation', 'inverse operation', 'solution']),

  // ---------------- Unit 8: Symmetry ----------------
  L('m5-8-1', 'm5-u8', '8.1', 'Line and Rotation Symmetry', ['G1'],
    ['m5-symmetry'],
    ['Find lines of symmetry of a 2-D shape', 'Describe the order of rotation symmetry of a 2-D shape'],
    50, ['line of symmetry', 'reflection symmetry', 'rotation symmetry', 'order of rotation symmetry']),
  L('m5-8-2', 'm5-u8', '8.2', 'Symmetry of Polygons', ['G1'],
    ['m5-symmetry-polygons'],
    ['Relate the symmetries of a regular polygon to its equal sides and angles', 'Classify shapes by their symmetries'],
    50, ['regular polygon']),

  // ---------------- Unit 9: Coordinate Grids ----------------
  L('m5-9-1', 'm5-u9', '9.1', 'Points on a Coordinate Grid', ['CG1'],
    ['m5-grid-points'],
    ['Locate and describe points on a coordinate grid with ordered pairs', 'Describe one point from another with left, right, up and down'],
    50, ['coordinate grid', 'coordinates', 'ordered pair']),
  L('m5-9-2', 'm5-u9', '9.2', 'Polygons on a Coordinate Grid', ['CG1'],
    ['m5-grid-polygons'],
    ['Draw a polygon from the coordinates of its vertices', 'Describe the vertices of a polygon with coordinates'],
    50, ['vertex', 'polygon']),

  // ---------------- Unit 10: Area ----------------
  L('m5-10-1', 'm5-u10', '10.1', 'Units of Area', ['M1'],
    ['m5-area-units'],
    ['Relate square centimetres, square metres and square kilometres', 'Choose a suitable unit and estimate an area'],
    50, ['area', 'square centimetre', 'square metre', 'square kilometre']),
  L('m5-10-2', 'm5-u10', '10.2', 'Area and Perimeter of Rectangles', ['M1'],
    ['m5-rectangle-area', 'm5-area-perimeter'],
    ['Find the area of a rectangle from its side lengths', 'Compare the perimeters of rectangles with the same area and solve problems'],
    50, ['perimeter']),

  // ---------------- Unit 11: Arithmetic Sequences ----------------
  L('m5-11-1', 'm5-u11', '11.1', 'Arithmetic Sequences in Tables and Graphs', ['P1'],
    ['m5-sequence-table'],
    ['Show positions and terms of an arithmetic sequence in a table and on a grid', 'Describe the graph of an arithmetic sequence as a straight line'],
    50, ['arithmetic sequence', 'term', 'position', 'table of values']),
  L('m5-11-2', 'm5-u11', '11.2', 'Rules and Missing Terms', ['P1'],
    ['m5-sequence-rule', 'm5-sequence-term'],
    ['Write a one-operation rule and expression for a sequence', 'Find the term at a given position and solve sequence problems'],
    50, []),

  // ---------------- Unit 12: Frequency and Data ----------------
  L('m5-12-1', 'm5-u12', '12.1', 'Frequency and the Mode', ['S1'],
    ['m5-frequency-mode'],
    ['Count the frequency of each category', 'Find the mode, and recognize data with no mode or several modes'],
    50, ['frequency', 'category', 'mode']),
  L('m5-12-2', 'm5-u12', '12.2', 'Collecting and Displaying Data', ['S1'],
    ['m5-frequency-displays'],
    ['Write closed-list survey questions and organize answers in a frequency table', 'Read and make bar graphs, dot plots and stem-and-leaf plots'],
    50, ['closed-list question', 'open-ended question', 'frequency table', 'dot plot', 'stem-and-leaf plot']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm5-u1', number: 1, title: 'Place Value', description: 'Numbers to 10 000 000 and decimals to thousandths: reading, writing, comparing, ordering and rounding.', outcomes: ['N1'], lessons: [], color: 'emerald' },
  { id: 'm5-u2', number: 2, title: 'Adding and Subtracting', description: 'Standard algorithms for whole numbers and decimals, estimation and problems with money.', outcomes: ['N2'], lessons: [], color: 'amber' },
  { id: 'm5-u3', number: 3, title: 'Divisibility and Factors', description: 'Divisibility tests for 2, 3 and 5, and finding factors.', outcomes: ['N3'], lessons: [], color: 'teal' },
  { id: 'm5-u4', number: 4, title: 'Multiplying and Dividing', description: 'Standard algorithms for multiplication and division, remainders and problems.', outcomes: ['N4'], lessons: [], color: 'sky' },
  { id: 'm5-u5', number: 5, title: 'Fractions', description: 'Improper fractions and mixed numbers, and adding and subtracting fractions with common denominators.', outcomes: ['N5', 'N6'], lessons: [], color: 'violet' },
  { id: 'm5-u6', number: 6, title: 'Ratios and Percentages', description: 'Part-part and part-whole ratios, and the same relationship as a fraction, decimal and percentage.', outcomes: ['N7'], lessons: [], color: 'orange' },
  { id: 'm5-u7', number: 7, title: 'Expressions and Equations', description: 'The order of operations with parentheses, algebraic expressions, and solving equations.', outcomes: ['A1'], lessons: [], color: 'rose' },
  { id: 'm5-u8', number: 8, title: 'Symmetry', description: 'Lines of symmetry, rotation symmetry and the symmetry of regular polygons.', outcomes: ['G1'], lessons: [], color: 'fuchsia' },
  { id: 'm5-u9', number: 9, title: 'Coordinate Grids', description: 'Locating points and polygons on a coordinate grid.', outcomes: ['CG1'], lessons: [], color: 'indigo' },
  { id: 'm5-u10', number: 10, title: 'Area', description: 'Square centimetres, square metres and square kilometres, and the area and perimeter of rectangles.', outcomes: ['M1'], lessons: [], color: 'lime' },
  { id: 'm5-u11', number: 11, title: 'Arithmetic Sequences', description: 'Positions and terms in tables and graphs, rules and missing terms.', outcomes: ['P1'], lessons: [], color: 'cyan' },
  { id: 'm5-u12', number: 12, title: 'Frequency and Data', description: 'Frequency, the mode, survey questions and displays of frequency.', outcomes: ['S1'], lessons: [], color: 'emerald' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH5: CourseMeta = {
  id: 'math-5',
  title: 'Grade 5 Mathematics',
  shortTitle: 'Math 5',
  grade: 5,
  subject: 'Mathematics',
  description: 'Grade 5: place value to millions and thousandths, adding and subtracting, divisibility, multiplying and dividing, improper fractions, ratios and percentages, expressions and equations, symmetry, coordinate grids, area, arithmetic sequences, and frequency.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
