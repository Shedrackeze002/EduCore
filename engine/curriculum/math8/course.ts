/**
 * Mathematics 8 (Alberta), Grade 8.
 * Outcomes follow the Alberta Mathematics Kindergarten to Grade 9 Program of Studies (2007,
 * updated 2016), based on the WNCP Common Curriculum Framework for K–9 Mathematics. This is the
 * program in effect for 2026–27; Alberta is piloting a new Grades 7–9 mathematics curriculum for
 * mandatory use from September 2027. Outcome wording checked against the program of studies on
 * curriculum.learnalberta.ca (October 2026).
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'N1', strand: 'Number', text: 'Demonstrate an understanding of perfect squares and square roots, concretely, pictorially and symbolically (limited to whole numbers).' },
  { code: 'N2', strand: 'Number', text: 'Determine the approximate square root of numbers that are not perfect squares (limited to whole numbers).' },
  { code: 'N3', strand: 'Number', text: 'Demonstrate an understanding of percents greater than or equal to 0%, including greater than 100%.' },
  { code: 'N4', strand: 'Number', text: 'Demonstrate an understanding of ratio and rate.' },
  { code: 'N5', strand: 'Number', text: 'Solve problems that involve rates, ratios and proportional reasoning.' },
  { code: 'N6', strand: 'Number', text: 'Demonstrate an understanding of multiplying and dividing positive fractions and mixed numbers, concretely, pictorially and symbolically.' },
  { code: 'N7', strand: 'Number', text: 'Demonstrate an understanding of multiplication and division of integers, concretely, pictorially and symbolically.' },
  { code: 'PR1', strand: 'Patterns and Relations', text: 'Graph and analyze two-variable linear relations.' },
  { code: 'PR2', strand: 'Patterns and Relations', text: 'Model and solve problems concretely, pictorially and symbolically, using linear equations of the form: ax = b; x/a = b, a ≠ 0; ax + b = c; x/a + b = c, a ≠ 0; a(x + b) = c, where a, b and c are integers.' },
  { code: 'SS1', strand: 'Shape and Space', text: 'Develop and apply the Pythagorean theorem to solve problems.' },
  { code: 'SS2', strand: 'Shape and Space', text: 'Draw and construct nets for 3-D objects.' },
  { code: 'SS3', strand: 'Shape and Space', text: 'Determine the surface area of: right rectangular prisms; right triangular prisms; right cylinders to solve problems.' },
  { code: 'SS4', strand: 'Shape and Space', text: 'Develop and apply formulas for determining the volume of right rectangular prisms, right triangular prisms and right cylinders.' },
  { code: 'SS5', strand: 'Shape and Space', text: 'Draw and interpret top, front and side views of 3-D objects composed of right rectangular prisms.' },
  { code: 'SS6', strand: 'Shape and Space', text: 'Demonstrate an understanding of the congruence of polygons.' },
  { code: 'SP1', strand: 'Statistics and Probability', text: 'Critique ways in which data is presented in circle graphs, line graphs, bar graphs and pictographs.' },
  { code: 'SP2', strand: 'Statistics and Probability', text: 'Solve problems involving the probability of independent events.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 60,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Squares, Square Roots and the Pythagorean Theorem ----------------
  L('m8-1-1', 'm8-u1', '1.1', 'Perfect Squares and Square Roots', ['N1'],
    ['m8-perfect-squares'],
    ['Identify perfect squares and find their square roots', 'Relate the area of a square to its side length'],
    60, ['perfect square', 'square root', 'prime factorization']),
  L('m8-1-2', 'm8-u1', '1.2', 'Estimating Square Roots', ['N2'],
    ['m8-estimate-sqrt'],
    ['Estimate the square root of a number that is not a perfect square, using benchmarks'],
    60, ['non-perfect square', 'benchmark']),
  L('m8-1-3', 'm8-u1', '1.3', 'The Pythagorean Theorem', ['SS1'],
    ['m8-pythagoras-hypotenuse', 'm8-pythagoras-leg'],
    ['Develop the Pythagorean theorem', 'Find the hypotenuse or a leg of a right triangle'],
    60, ['hypotenuse', 'leg', 'Pythagorean theorem']),
  L('m8-1-4', 'm8-u1', '1.4', 'Using the Pythagorean Theorem', ['SS1'],
    ['m8-pythagoras-apply', 'm8-right-triangle-test'],
    ['Solve problems with the Pythagorean theorem', 'Decide whether a triangle is a right triangle'],
    60, ['Pythagorean triple']),

  // ---------------- Unit 2: Percents ----------------
  L('m8-2-1', 'm8-u2', '2.1', 'Percents Greater Than 100% and Less Than 1%', ['N3'],
    ['m8-percent-represent'],
    ['Write percents greater than 100% and less than 1% as decimals and fractions, and back'],
    60, []),
  L('m8-2-2', 'm8-u2', '2.2', 'Percent of a Number', ['N3'],
    ['m8-percent-of'],
    ['Find a percent of a number, including percents greater than 100% and fractional percents'],
    60, []),
  L('m8-2-3', 'm8-u2', '2.3', 'Percent Change and Combined Percents', ['N3'],
    ['m8-percent-change', 'm8-combined-percents'],
    ['Find percent increase and decrease', 'Solve problems with combined percents such as a discount and then sales tax'],
    60, ['percent increase', 'percent decrease']),

  // ---------------- Unit 3: Ratios, Rates and Proportional Reasoning ----------------
  L('m8-3-1', 'm8-u3', '3.1', 'Two-Term and Three-Term Ratios', ['N4'],
    ['m8-ratios'],
    ['Write part-to-part and part-to-whole ratios', 'Find equivalent ratios and write ratios in lowest terms'],
    60, ['ratio', 'part-to-part ratio', 'part-to-whole ratio', 'equivalent ratio']),
  L('m8-3-2', 'm8-u3', '3.2', 'Rates and Unit Rates', ['N4'],
    ['m8-unit-rate'],
    ['Find unit rates', 'Compare prices with unit rates to find the better buy'],
    60, ['rate', 'unit rate', 'unit price']),
  L('m8-3-3', 'm8-u3', '3.3', 'Proportional Reasoning', ['N5'],
    ['m8-proportion-solve', 'm8-proportion-problems'],
    ['Solve proportions', 'Solve problems with rates, ratios and proportions'],
    60, ['proportion']),

  // ---------------- Unit 4: Multiplying and Dividing Fractions ----------------
  L('m8-4-1', 'm8-u4', '4.1', 'Multiplying Fractions', ['N6'],
    ['m8-fraction-multiply'],
    ['Multiply fractions and mixed numbers', 'Write products in lowest terms'],
    60, []),
  L('m8-4-2', 'm8-u4', '4.2', 'Dividing Fractions', ['N6'],
    ['m8-fraction-divide'],
    ['Divide fractions and mixed numbers using a common denominator or the reciprocal'],
    60, ['reciprocal']),
  L('m8-4-3', 'm8-u4', '4.3', 'Solving Fraction Problems', ['N6'],
    ['m8-fraction-problems'],
    ['Solve problems that involve multiplying and dividing fractions and mixed numbers'],
    60, []),

  // ---------------- Unit 5: Multiplying and Dividing Integers ----------------
  L('m8-5-1', 'm8-u5', '5.1', 'Multiplying Integers', ['N7'],
    ['m8-integer-multiply'],
    ['Model integer multiplication', 'Use the sign rules to multiply integers'],
    60, []),
  L('m8-5-2', 'm8-u5', '5.2', 'Dividing Integers', ['N7'],
    ['m8-integer-divide'],
    ['Model integer division', 'Use the sign rules to divide integers'],
    60, []),
  L('m8-5-3', 'm8-u5', '5.3', 'Order of Operations with Integers', ['N7'],
    ['m8-integer-order-ops'],
    ['Apply the order of operations to integer expressions', 'Solve problems with integers'],
    60, []),

  // ---------------- Unit 6: Linear Relations ----------------
  L('m8-6-1', 'm8-u6', '6.1', 'Linear Relations and Tables of Values', ['PR1'],
    ['m8-linear-table'],
    ['Make a table of values from a linear equation', 'Describe the pattern in a table'],
    60, ['linear relation']),
  L('m8-6-2', 'm8-u6', '6.2', 'Graphing and Analyzing Linear Relations', ['PR1'],
    ['m8-linear-graph', 'm8-linear-equation'],
    ['Graph a linear relation and read values from the graph', 'Match an equation to its table or graph'],
    60, ['interpolate', 'extrapolate']),

  // ---------------- Unit 7: Linear Equations ----------------
  L('m8-7-1', 'm8-u7', '7.1', 'Solving One-Step Equations', ['PR2'],
    ['m8-equation-one-step'],
    ['Model and solve ax = b and x/a = b with integers'],
    60, []),
  L('m8-7-2', 'm8-u7', '7.2', 'Solving Two-Step Equations', ['PR2'],
    ['m8-equation-two-step'],
    ['Model and solve ax + b = c and x/a + b = c'],
    60, []),
  L('m8-7-3', 'm8-u7', '7.3', 'Equations with Brackets', ['PR2'],
    ['m8-equation-distributive'],
    ['Use the distributive property to solve a(x + b) = c'],
    60, ['distributive property']),
  L('m8-7-4', 'm8-u7', '7.4', 'Solving Problems with Equations', ['PR2'],
    ['m8-equation-problems'],
    ['Write and solve linear equations for problems', 'Check the solution in the problem'],
    60, []),

  // ---------------- Unit 8: Surface Area and Volume ----------------
  L('m8-8-1', 'm8-u8', '8.1', 'Views of Three-Dimensional Objects', ['SS5'],
    ['m8-views'],
    ['Draw and read top, front and side views of objects made of cubes', 'Build an object from its views'],
    60, ['top view', 'front view', 'side view']),
  L('m8-8-2', 'm8-u8', '8.2', 'Nets of Three-Dimensional Objects', ['SS2'],
    ['m8-nets'],
    ['Match nets to prisms, pyramids and cylinders', 'Decide whether a net folds into an object'],
    60, ['net', 'face', 'edge', 'vertex']),
  L('m8-8-3', 'm8-u8', '8.3', 'Surface Area of Prisms', ['SS3'],
    ['m8-surface-area-prism'],
    ['Find the surface area of right rectangular and triangular prisms'],
    60, ['surface area']),
  L('m8-8-4', 'm8-u8', '8.4', 'Surface Area of Cylinders', ['SS3'],
    ['m8-surface-area-cylinder'],
    ['Find the surface area of a right cylinder'],
    60, []),
  L('m8-8-5', 'm8-u8', '8.5', 'Volume of Prisms and Cylinders', ['SS4'],
    ['m8-volume-prism', 'm8-volume-cylinder'],
    ['Use V = (area of base) × height for prisms', 'Find the volume of a cylinder'],
    60, ['volume', 'capacity']),

  // ---------------- Unit 9: Congruent Polygons ----------------
  L('m8-9-1', 'm8-u9', '9.1', 'Congruent Polygons', ['SS6'],
    ['m8-congruent-polygons'],
    ['Decide whether two polygons are congruent by comparing corresponding sides and angles', 'Use a congruence statement to name corresponding parts and find missing measures'],
    60, ['congruent', 'corresponding sides', 'corresponding angles', 'congruence statement']),
  L('m8-9-2', 'm8-u9', '9.2', 'Congruence and Transformations', ['SS6'],
    ['m8-congruence-transformations'],
    ['Show that translations, rotations and reflections produce congruent images', 'Identify congruent polygons and the transformation that maps one onto the other'],
    60, []),

  // ---------------- Unit 10: Data Analysis and Probability ----------------
  L('m8-10-1', 'm8-u10', '10.1', 'Critiquing Graphs', ['SP1'],
    ['m8-choose-graph', 'm8-misleading-graph'],
    ['Choose a suitable graph for a data set', 'Identify how a graph can mislead'],
    60, ['line graph', 'pictograph', 'misleading graph']),
  L('m8-10-2', 'm8-u10', '10.2', 'Probability of Independent Events', ['SP2'],
    ['m8-independent-events', 'm8-independent-problems'],
    ['Find the probability of two independent events with a table, tree diagram or by multiplying', 'Solve problems with independent events'],
    60, ['independent events']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm8-u1', number: 1, title: 'Squares, Square Roots and the Pythagorean Theorem', description: 'Perfect squares, square roots and their estimates, and the Pythagorean theorem.', outcomes: ['N1', 'N2', 'SS1'], lessons: [], color: 'emerald' },
  { id: 'm8-u2', number: 2, title: 'Percents', description: 'Percents greater than 100% and less than 1%, percent of a number, percent change and combined percents.', outcomes: ['N3'], lessons: [], color: 'amber' },
  { id: 'm8-u3', number: 3, title: 'Ratios, Rates and Proportional Reasoning', description: 'Two-term and three-term ratios, rates and unit rates, and proportions.', outcomes: ['N4', 'N5'], lessons: [], color: 'teal' },
  { id: 'm8-u4', number: 4, title: 'Multiplying and Dividing Fractions', description: 'Products and quotients of fractions and mixed numbers.', outcomes: ['N6'], lessons: [], color: 'sky' },
  { id: 'm8-u5', number: 5, title: 'Multiplying and Dividing Integers', description: 'Products and quotients of integers and the order of operations.', outcomes: ['N7'], lessons: [], color: 'violet' },
  { id: 'm8-u6', number: 6, title: 'Linear Relations', description: 'Tables of values, graphs and equations of linear relations.', outcomes: ['PR1'], lessons: [], color: 'orange' },
  { id: 'm8-u7', number: 7, title: 'Linear Equations', description: 'Modelling and solving one-step, two-step and distributive linear equations.', outcomes: ['PR2'], lessons: [], color: 'rose' },
  { id: 'm8-u8', number: 8, title: 'Surface Area and Volume', description: 'Views of objects, nets, and the surface area and volume of prisms and cylinders.', outcomes: ['SS2', 'SS3', 'SS4', 'SS5'], lessons: [], color: 'fuchsia' },
  { id: 'm8-u9', number: 9, title: 'Congruent Polygons', description: 'Congruent polygons, corresponding parts and congruence under transformations.', outcomes: ['SS6'], lessons: [], color: 'indigo' },
  { id: 'm8-u10', number: 10, title: 'Data Analysis and Probability', description: 'Critiquing graphs and the probability of independent events.', outcomes: ['SP1', 'SP2'], lessons: [], color: 'lime' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH8: CourseMeta = {
  id: 'math-8',
  title: 'Grade 8 Mathematics',
  shortTitle: 'Math 8',
  grade: 8,
  subject: 'Mathematics',
  description: 'Grade 8: squares, square roots and the Pythagorean theorem, percents, ratios, rates and proportional reasoning, multiplying and dividing fractions and integers, linear relations and equations, surface area and volume, congruent polygons, data and probability.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
