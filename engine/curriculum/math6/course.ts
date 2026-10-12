/**
 * Mathematics 6 (Alberta), Grade 6.
 * Outcomes follow Alberta's Mathematics Kindergarten to Grade 6 curriculum (2022; in effect for
 * Grades 4 to 6 since September 2023), worded exactly as on curriculum.learnalberta.ca (checked
 * October 2026). The curriculum lists learning outcomes under organizing ideas without codes; the
 * codes here (N1, A1, CG1 …) number them in the order the curriculum lists them. K–6 outcomes are
 * meant to be achieved without calculators.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'N1', strand: 'Number', text: 'Students investigate magnitude with positive and negative numbers.' },
  { code: 'N2', strand: 'Number', text: 'Students solve problems, using standard algorithms for addition and subtraction.' },
  { code: 'N3', strand: 'Number', text: 'Students analyze numbers, using prime factorization and exponentiation.' },
  { code: 'N4', strand: 'Number', text: 'Students apply standard algorithms to multiplication and division of decimal and natural numbers.' },
  { code: 'N5', strand: 'Number', text: 'Students relate fractions to quotients.' },
  { code: 'N6', strand: 'Number', text: 'Students add and subtract fractions with denominators within 100.' },
  { code: 'N7', strand: 'Number', text: 'Students interpret the multiplication of natural numbers by fractions.' },
  { code: 'N8', strand: 'Number', text: 'Students apply equivalence to the interpretation of ratios and rates.' },
  { code: 'A1', strand: 'Algebra', text: 'Students analyze expressions and solve algebraic equations.' },
  { code: 'G1', strand: 'Geometry', text: 'Students analyze shapes through symmetry and congruence.' },
  { code: 'CG1', strand: 'Coordinate Geometry', text: 'Students explain location and movement in relation to position in the Cartesian plane.' },
  { code: 'M1', strand: 'Measurement', text: 'Students analyze areas of parallelograms and triangles.' },
  { code: 'M2', strand: 'Measurement', text: 'Students interpret and express volume.' },
  { code: 'P1', strand: 'Patterns', text: 'Students investigate functions to enhance understanding of change.' },
  { code: 'S1', strand: 'Statistics', text: 'Students investigate relative frequency, using experimental data.' },
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
  // ---------------- Unit 1: Positive and Negative Numbers ----------------
  L('m6-1-1', 'm6-u1', '1.1', 'Negative Numbers and Magnitude', ['N1'],
    ['m6-negative-numbers'],
    ['Use negative numbers for temperature, debt and elevation', 'Relate magnitude to distance from zero and find opposites'],
    50, ['negative number', 'positive number', 'magnitude', 'opposite', 'additive inverse']),
  L('m6-1-2', 'm6-u1', '1.2', 'Comparing and Ordering Positive and Negative Numbers', ['N1'],
    ['m6-compare-integers'],
    ['Compare and order positive and negative numbers on horizontal and vertical number lines'],
    50, ['integer']),
  L('m6-1-3', 'm6-u1', '1.3', 'Sums of Positive and Negative Numbers', ['N1'],
    ['m6-integer-sums'],
    ['Model sums of integers, including a number and its opposite', 'Write a difference as a sum'],
    50, ['zero pair']),

  // ---------------- Unit 2: Operations and Problem Solving ----------------
  L('m6-2-1', 'm6-u2', '2.1', 'Solving Addition and Subtraction Problems', ['N2'],
    ['m6-add-subtract-problems'],
    ['Solve problems with money and metric measurement using standard algorithms'],
    50, []),
  L('m6-2-2', 'm6-u2', '2.2', 'Multiplying Decimal and Natural Numbers', ['N4'],
    ['m6-decimal-multiply'],
    ['Multiply up to 3-digit natural or decimal numbers by 2-digit natural numbers', 'Check a product with estimation'],
    50, []),
  L('m6-2-3', 'm6-u2', '2.3', 'Dividing Decimal and Natural Numbers', ['N4'],
    ['m6-decimal-divide'],
    ['Divide up to 3-digit natural or decimal numbers by 2-digit natural numbers', 'Write a quotient with a remainder as a decimal'],
    50, []),
  L('m6-2-4', 'm6-u2', '2.4', 'Multiplication and Division Problems', ['N4'],
    ['m6-decimal-problems'],
    ['Solve multiplication and division problems, including money'],
    50, []),

  // ---------------- Unit 3: Prime Factorization and Powers ----------------
  L('m6-3-1', 'm6-u3', '3.1', 'Prime Factorization', ['N3'],
    ['m6-prime-factorization'],
    ['Write a composite number as a product of primes with a factor tree'],
    50, ['prime number', 'composite number', 'prime factorization', 'factor tree']),
  L('m6-3-2', 'm6-u3', '3.2', 'Powers', ['N3'],
    ['m6-powers'],
    ['Identify the base and exponent of a power', 'Write repeated factors as a power, including in a prime factorization'],
    50, ['power', 'base', 'exponent']),
  L('m6-3-3', 'm6-u3', '3.3', 'Common Factors and Divisibility', ['N3'],
    ['m6-common-factors'],
    ['Find common factors from prime factorizations', 'Decide divisibility from a prime factorization'],
    50, ['common factor']),

  // ---------------- Unit 4: Fractions ----------------
  L('m6-4-1', 'm6-u4', '4.1', 'Fractions as Quotients', ['N5'],
    ['m6-fraction-quotient'],
    ['Describe equal sharing with a fraction', 'Write a fraction as a division and as a decimal'],
    50, ['quotient', 'equal sharing']),
  L('m6-4-2', 'm6-u4', '4.2', 'Adding and Subtracting Fractions', ['N6'],
    ['m6-fraction-add-subtract', 'm6-fraction-problems'],
    ['Write fractions with common denominators and add or subtract them', 'Solve problems with fractions'],
    50, ['common denominator', 'related denominators']),
  L('m6-4-3', 'm6-u4', '4.3', 'Multiplying Fractions and Natural Numbers', ['N7'],
    ['m6-fraction-multiply'],
    ['Multiply a natural number by a fraction and a fraction by a natural number', 'Find a fraction of a quantity in problems'],
    50, ['unit fraction']),

  // ---------------- Unit 5: Ratios, Rates and Percents ----------------
  L('m6-5-1', 'm6-u5', '5.1', 'Equivalent Ratios and Proportions', ['N8'],
    ['m6-equivalent-ratios'],
    ['Decide whether two ratios are equivalent', 'Find an equivalent ratio with a proportion'],
    50, ['equivalent ratio', 'proportion']),
  L('m6-5-2', 'm6-u5', '5.2', 'Rates and Unit Rates', ['N8'],
    ['m6-unit-rates'],
    ['Write a unit rate, including unit price and speed', 'Solve rate problems'],
    50, ['rate', 'unit rate', 'unit price']),
  L('m6-5-3', 'm6-u5', '5.3', 'Percent of a Number', ['N8'],
    ['m6-percent-of'],
    ['Relate a percentage to a proportion', 'Find a percent of a number within 100%'],
    50, ['percent']),

  // ---------------- Unit 6: Expressions and Equations ----------------
  L('m6-6-1', 'm6-u6', '6.1', 'Order of Operations with Powers', ['A1'],
    ['m6-order-of-operations'],
    ['Evaluate expressions with parentheses and powers in the conventional order'],
    50, ['order of operations']),
  L('m6-6-2', 'm6-u6', '6.2', 'Like Terms and Algebraic Properties', ['A1'],
    ['m6-like-terms'],
    ['Combine like terms to simplify an expression', 'Reorder terms with the commutative and associative properties'],
    50, ['like terms', 'commutative property', 'associative property', 'distributive property']),
  L('m6-6-3', 'm6-u6', '6.3', 'Solving Equations', ['A1'],
    ['m6-solve-equation', 'm6-equation-problems'],
    ['Simplify each side, then solve equations with one or two operations', 'Write and solve equations for problems and verify the solution'],
    50, []),

  // ---------------- Unit 7: Symmetry and Congruence ----------------
  L('m6-7-1', 'm6-u7', '7.1', 'Symmetry Between Shapes', ['G1'],
    ['m6-symmetric-shapes'],
    ['Describe two shapes related by a reflection or a rotation', 'Describe the symmetry in a tessellation'],
    50, ['tessellation', 'reflection', 'rotation']),
  L('m6-7-2', 'm6-u7', '7.2', 'Congruent Shapes', ['G1'],
    ['m6-congruence'],
    ['Decide whether two shapes are congruent in any orientation', 'Explain why symmetrical shapes are congruent'],
    50, ['congruent']),

  // ---------------- Unit 8: The Cartesian Plane ----------------
  L('m6-8-1', 'm6-u8', '8.1', 'Points and Polygons in the Cartesian Plane', ['CG1'],
    ['m6-cartesian-points'],
    ['Locate and describe points with coordinates (x, y)', 'Draw polygons from the coordinates of their vertices'],
    50, ['Cartesian plane', 'x-axis', 'y-axis', 'origin', 'ordered pair']),
  L('m6-8-2', 'm6-u8', '8.2', 'Translations and Reflections', ['CG1'],
    ['m6-translate-reflect'],
    ['Translate a polygon and describe the horizontal and vertical movement', 'Reflect a polygon over the x-axis or y-axis'],
    50, ['translation', 'reflection', 'image']),
  L('m6-8-3', 'm6-u8', '8.3', 'Rotations', ['CG1'],
    ['m6-rotate'],
    ['Rotate a polygon 90°, 180° or 270° about one of its vertices', 'Describe the angle and direction of a rotation'],
    50, ['rotation', 'centre of rotation', 'clockwise', 'counter-clockwise']),

  // ---------------- Unit 9: Area of Parallelograms and Triangles ----------------
  L('m6-9-1', 'm6-u9', '9.1', 'Area of a Parallelogram', ['M1'],
    ['m6-area-parallelogram'],
    ['Find the area of a parallelogram by multiplying the base and height', 'Find a base or height by division'],
    50, ['parallelogram', 'base', 'height']),
  L('m6-9-2', 'm6-u9', '9.2', 'Area of a Triangle', ['M1'],
    ['m6-area-triangle'],
    ['Find the area of a triangle as half of a parallelogram with the same base and height'],
    50, []),
  L('m6-9-3', 'm6-u9', '9.3', 'Area of Composite Shapes', ['M1'],
    ['m6-composite-area'],
    ['Find the area of shapes made of triangles and parallelograms'],
    50, ['composite shape']),

  // ---------------- Unit 10: Volume ----------------
  L('m6-10-1', 'm6-u10', '10.1', 'Volume and Cubic Units', ['M2'],
    ['m6-volume-units'],
    ['Describe volume in cubic units, cubic centimetres and cubic metres', 'Find the volume of a model built from cubes'],
    50, ['volume', 'cubic centimetre', 'cubic metre']),
  L('m6-10-2', 'm6-u10', '10.2', 'Volume of Rectangular Prisms', ['M2'],
    ['m6-volume-prism'],
    ['Find the volume of a right rectangular prism by multiplication', 'Solve volume problems'],
    50, ['right rectangular prism']),

  // ---------------- Unit 11: Functions ----------------
  L('m6-11-1', 'm6-u11', '11.1', 'Independent and Dependent Variables', ['P1'],
    ['m6-function-variables', 'm6-function-table'],
    ['Identify the independent and dependent variables in a situation', 'Make a table of values and plot the points'],
    50, ['function', 'independent variable', 'dependent variable']),
  L('m6-11-2', 'm6-u11', '11.2', 'Function Rules and Equations', ['P1'],
    ['m6-function-equation', 'm6-function-values'],
    ['Write an equation for a function', 'Find a value of one variable given the other and solve problems'],
    50, []),

  // ---------------- Unit 12: Relative Frequency and Probability ----------------
  L('m6-12-1', 'm6-u12', '12.1', 'Relative Frequency', ['S1'],
    ['m6-relative-frequency'],
    ['Find relative frequency as a fraction, decimal and percentage', 'Compare a category across data sets'],
    50, ['relative frequency']),
  L('m6-12-2', 'm6-u12', '12.2', 'Experiments and Likelihood', ['S1'],
    ['m6-experiments'],
    ['List outcomes of experiments with equally likely outcomes', 'Use relative frequency to estimate likelihood and explain the law of large numbers'],
    50, ['outcome', 'event', 'equally likely', 'law of large numbers']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm6-u1', number: 1, title: 'Positive and Negative Numbers', description: 'Negative numbers in context, magnitude, opposites, comparing and ordering, and sums with zero.', outcomes: ['N1'], lessons: [], color: 'emerald' },
  { id: 'm6-u2', number: 2, title: 'Operations and Problem Solving', description: 'Addition and subtraction problems, and multiplying and dividing decimal and natural numbers.', outcomes: ['N2', 'N4'], lessons: [], color: 'amber' },
  { id: 'm6-u3', number: 3, title: 'Prime Factorization and Powers', description: 'Prime factorization, powers, common factors and divisibility.', outcomes: ['N3'], lessons: [], color: 'teal' },
  { id: 'm6-u4', number: 4, title: 'Fractions', description: 'Fractions as quotients, adding and subtracting fractions, and multiplying fractions and natural numbers.', outcomes: ['N5', 'N6', 'N7'], lessons: [], color: 'sky' },
  { id: 'm6-u5', number: 5, title: 'Ratios, Rates and Percents', description: 'Equivalent ratios and proportions, unit rates, and percent of a number.', outcomes: ['N8'], lessons: [], color: 'violet' },
  { id: 'm6-u6', number: 6, title: 'Expressions and Equations', description: 'The order of operations with powers, like terms and algebraic properties, and solving equations.', outcomes: ['A1'], lessons: [], color: 'orange' },
  { id: 'm6-u7', number: 7, title: 'Symmetry and Congruence', description: 'Shapes related by reflection and rotation, tessellations, and congruent shapes.', outcomes: ['G1'], lessons: [], color: 'rose' },
  { id: 'm6-u8', number: 8, title: 'The Cartesian Plane', description: 'Points and polygons in the Cartesian plane, and translations, reflections and rotations.', outcomes: ['CG1'], lessons: [], color: 'fuchsia' },
  { id: 'm6-u9', number: 9, title: 'Area of Parallelograms and Triangles', description: 'Areas of parallelograms, triangles and composite shapes.', outcomes: ['M1'], lessons: [], color: 'indigo' },
  { id: 'm6-u10', number: 10, title: 'Volume', description: 'Cubic units and the volume of right rectangular prisms.', outcomes: ['M2'], lessons: [], color: 'lime' },
  { id: 'm6-u11', number: 11, title: 'Functions', description: 'Independent and dependent variables, tables of values, rules and equations.', outcomes: ['P1'], lessons: [], color: 'cyan' },
  { id: 'm6-u12', number: 12, title: 'Relative Frequency and Probability', description: 'Relative frequency, experiments and the likelihood of events.', outcomes: ['S1'], lessons: [], color: 'emerald' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH6: CourseMeta = {
  id: 'math-6',
  title: 'Grade 6 Mathematics',
  shortTitle: 'Math 6',
  grade: 6,
  subject: 'Mathematics',
  description: 'Grade 6: positive and negative numbers, operations with whole and decimal numbers, prime factorization and powers, fractions, ratios, rates and percents, expressions and equations, symmetry and congruence, the Cartesian plane and transformations, area, volume, functions, and relative frequency.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
