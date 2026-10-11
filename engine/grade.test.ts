import { describe, expect, it } from 'vitest';
import { gradePart } from './grade.ts';
import { parseExpr, toLatex, evaluate } from './math/expr.ts';
import { applyObservation, emptySkillState } from './mastery.ts';

const expr = (expected: string, form: any, r: string) => gradePart({ kind: 'expression', expected, form }, r);

describe('parser', () => {
  it('parses implicit multiplication and radicals', () => {
    expect(evaluate(parseExpr('2x(x+1)'), { x: 3 })).toBe(24);
    expect(evaluate(parseExpr('3√12'))).toBeCloseTo(3 * Math.sqrt(12));
    expect(evaluate(parseExpr('(-8)^(1/3)'))).toBeCloseTo(-2);
    expect(evaluate(parseExpr('root(4, 81)'))).toBeCloseTo(3);
    expect(evaluate(parseExpr('x²−2x'), { x: 5 })).toBe(15);
    expect(evaluate(parseExpr('2^-3'))).toBe(0.125);
    expect(evaluate(parseExpr('-3^2'))).toBe(-9);
    expect(toLatex(parseExpr('2x^2-3x+1'))).toBe('2{x}^{2} - 3x + 1');
  });
  it('rejects junk', () => {
    expect(() => parseExpr('2 3')).toThrow();
    expect(() => parseExpr('(x+1')).toThrow();
    expect(() => parseExpr('x+')).toThrow();
  });
});

describe('numeric', () => {
  it('accepts fractions, mixed numbers and rounding', () => {
    expect(gradePart({ kind: 'numeric', value: 0.75 }, '3/4').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 1.5 }, '1 1/2').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 12.3456, decimals: 1 }, '12.3').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 12.3456, decimals: 1 }, '12.5').correct).toBe(false);
    expect(gradePart({ kind: 'numeric', value: 12.3456, decimals: 1 }, '12.3 cm').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 2 * Math.sqrt(5) }, '2sqrt(5)').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 1234 }, '1,234').correct).toBe(true);
    expect(gradePart({ kind: 'numeric', value: 0, undefinedValue: true }, 'undefined').correct).toBe(true);
  });
  it('accepts money, mass, capacity, temperature, percent and time units', () => {
    const money = { kind: 'numeric' as const, value: 1250.5, decimals: 2 };
    expect(gradePart(money, '$1,250.50').correct).toBe(true);
    expect(gradePart(money, '1250.50 dollars').correct).toBe(true);
    for (const [value, typed] of [[12, '12 kg'], [250, '250 mL'], [3.5, '3.5 L'], [16, '16 oz'], [2, '2 lb'], [98.6, '98.6 °F'], [37, '37°C'], [15, '15%'], [7.5, '7.5 h'], [4, '4 gal']] as const) {
      expect(gradePart({ kind: 'numeric', value }, typed).correct, typed).toBe(true);
    }
    expect(gradePart({ kind: 'numeric', value: 12 }, '13 kg').correct).toBe(false);
  });
});

describe('expression forms', () => {
  it('expanded', () => {
    expect(expr('2x^2+7x+3', 'expanded', '2x^2 + 7x + 3').correct).toBe(true);
    expect(expr('2x^2+7x+3', 'expanded', '(2x+1)(x+3)').correct).toBe(false);
    expect(expr('2x^2+7x+3', 'expanded', '2x^2 + 6x + x + 3').message).toMatch(/like terms/);
    expect(expr('2x^2+7x+3', 'expanded', '3 + 7x + 2x^2').correct).toBe(true);
  });
  it('factored', () => {
    expect(expr('x^2+5x+6', 'factored', '(x+2)(x+3)').correct).toBe(true);
    expect(expr('x^2+5x+6', 'factored', '(x+3)(x+2)').correct).toBe(true);
    expect(expr('x^2+5x+6', 'factored', 'x^2+5x+6').correct).toBe(false);
    expect(expr('2x^2+10x+12', 'factored', '2(x+2)(x+3)').correct).toBe(true);
    expect(expr('2x^2+10x+12', 'factored', '(2x+4)(x+3)').correct).toBe(false);
    expect(expr('2x^2+10x+12', 'factored', '2(x^2+5x+6)').correct).toBe(false);
    expect(expr('2x^2+10x+12', 'gcf', '2(x^2+5x+6)').correct).toBe(true);
    expect(expr('x^4-16', 'factored', '(x^2+4)(x-2)(x+2)').correct).toBe(true);
    expect(expr('x^4-16', 'factored', '(x^2+4)(x^2-4)').correct).toBe(false);
    expect(expr('4x^2-9y^2', 'factored', '(2x-3y)(2x+3y)').correct).toBe(true);
    expect(expr('x^2-6x+9', 'factored', '(x-3)^2').correct).toBe(true);
    expect(expr('6x^2+7x-3', 'factored', '(3x-1)(2x+3)').correct).toBe(true);
    expect(expr('3x^2+6x', 'gcf', '3x(x+2)').correct).toBe(true);
    expect(expr('3x^2+6x', 'gcf', '3(x^2+2x)').correct).toBe(false);
  });
  it('radicals', () => {
    expect(expr('6sqrt(2)', 'simplified-radical', '6√2').correct).toBe(true);
    expect(expr('6sqrt(2)', 'simplified-radical', '3√8').correct).toBe(false);
    expect(expr('6sqrt(2)', 'simplified-radical', 'sqrt(72)').correct).toBe(false);
    expect(gradePart({ kind: 'expression', expected: '3cbrt(2)', form: 'simplified-radical', radicalIndex: 3 }, '3∛2').correct).toBe(true);
  });
  it('exponents', () => {
    expect(expr('x^5/(2y^3)', 'positive-exponents', 'x^5/(2y^3)').correct).toBe(true);
    expect(expr('x^5/(2y^3)', 'positive-exponents', '0.5x^5y^-3').correct).toBe(false);
  });
  it('prime factorization', () => {
    expect(expr('360', 'prime-factorization', '2^3*3^2*5').correct).toBe(true);
    expect(expr('360', 'prime-factorization', '8*45').correct).toBe(false);
  });
});

describe('lines', () => {
  const line = { A: 2, B: -1, C: 3 }; // y = 2x + 3
  it('accepts forms', () => {
    expect(gradePart({ kind: 'line', line, form: 'slope-intercept' }, 'y = 2x + 3').correct).toBe(true);
    expect(gradePart({ kind: 'line', line, form: 'slope-intercept' }, '2x - y + 3 = 0').correct).toBe(false);
    expect(gradePart({ kind: 'line', line, form: 'general' }, '2x - y + 3 = 0').correct).toBe(true);
    expect(gradePart({ kind: 'line', line, form: 'general' }, '-2x + y - 3 = 0').correct).toBe(false);
    expect(gradePart({ kind: 'line', line, form: 'slope-point' }, 'y - 5 = 2(x - 1)').correct).toBe(true);
    expect(gradePart({ kind: 'line', line, form: 'slope-point' }, 'y = 2x + 3').correct).toBe(false);
    expect(gradePart({ kind: 'line', line, form: 'any' }, 'y - 5 = 2(x - 1)').correct).toBe(true);
    expect(gradePart({ kind: 'line', line, form: 'any' }, 'y = 3x + 3').correct).toBe(false);
  });
  it('graphs', () => {
    expect(gradePart({ kind: 'graph-line', line, grid: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 } }, '[[0,3],[1,5]]').correct).toBe(true);
    expect(gradePart({ kind: 'point', x: 2, y: -3 }, '(2, -3)').correct).toBe(true);
    expect(gradePart({ kind: 'point', x: 2, y: -3 }, '(-3, 2)').message).toMatch(/order/);
  });
});

describe('mastery', () => {
  it('needs several sessions for mastery', () => {
    let s = emptySkillState('k');
    for (let i = 0; i < 8; i++) s = applyObservation(s, { correct: true, sessionId: 'a', at: new Date().toISOString() });
    expect(s.level).toBe('proficient');
    s = applyObservation(s, { correct: true, sessionId: 'b', at: new Date().toISOString() });
    expect(s.level).toBe('mastered');
  });
});
