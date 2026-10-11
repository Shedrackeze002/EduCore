/** Canonical answers: what a correct response looks like for each answer spec. */
import type { AnswerSpec, Item } from './types.ts';
import { fmt, fmtFixed, toFrac, fracText } from './math/numbers.ts';
import { lineText, generalText, lineSlope, lineYIntercept, slopePointText, evalLineY } from './math/linear.ts';
import { frac } from './math/numbers.ts';

/** A response string that the grader will accept for the spec (used for tests and "show answer"). */
export function canonicalResponse(spec: AnswerSpec): string {
  switch (spec.kind) {
    case 'mc':
      return spec.correct;
    case 'multi':
      return spec.correct.join(',');
    case 'order':
      return spec.correctOrder.join(',');
    case 'text':
      return spec.accepted[0];
    case 'numeric': {
      if (spec.undefinedValue) return 'undefined';
      if (spec.decimals !== undefined) return fmtFixed(spec.value, spec.decimals);
      const f = toFrac(spec.value, 1000);
      if (f) return fracText(f);
      return fmt(spec.value, 10);
    }
    case 'numbers':
      return spec.values.length ? spec.values.map((value) => canonicalResponse({ kind: 'numeric', value, decimals: spec.decimals })).join(', ') : 'no solution';
    case 'expression':
      return spec.expected;
    case 'line': {
      const l = spec.line;
      if (spec.form === 'general') return generalText(l);
      const m = lineSlope(l);
      if (spec.form === 'slope-point' && m) {
        const x0 = 1;
        const y0 = evalLineY(l, x0);
        const yf = toFrac(y0, 1000) ?? frac(Math.round(y0));
        if (yf.d === 1) return slopePointText(m, [x0, yf.n]);
        // fall back to x = 0 with fractional intercept written as y - b = m(x - 0)
        const b = lineYIntercept(l)!;
        return `y - (${fracText(b)}) = (${fracText(m)})(x - 0)`;
      }
      return lineText(l);
    }
    case 'equation-fn':
      return `${spec.fnName}(${spec.variable}) = ${spec.expected}`;
    case 'point':
      return `(${fmt(spec.x, 6)}, ${fmt(spec.y, 6)})`;
    case 'graph-line': {
      const l = spec.line;
      if (l.B === 0) {
        const x = -l.C / l.A;
        return JSON.stringify([
          [x, 0],
          [x, 1],
        ]);
      }
      // Find two lattice points on the line within the grid if possible.
      const pts: Array<[number, number]> = [];
      for (let x = spec.grid.xMin; x <= spec.grid.xMax && pts.length < 2; x++) {
        const y = evalLineY(l, x);
        if (Math.abs(y - Math.round(y)) < 1e-9) pts.push([x, Math.round(y)]);
      }
      if (pts.length < 2) {
        pts.length = 0;
        pts.push([0, evalLineY(l, 0)], [1, evalLineY(l, 1)]);
      }
      return JSON.stringify(pts);
    }
    case 'graph-points':
      return JSON.stringify(spec.points);
    case 'manual':
      return '';
  }
}

export function canonicalResponses(item: Item): string[] {
  return item.parts.map((p) => canonicalResponse(p.answer));
}

/** True when a fraction with this denominator is a terminating decimal. */
function terminates(d: number): boolean {
  let x = d;
  while (x % 2 === 0) x /= 2;
  while (x % 5 === 0) x /= 5;
  return x === 1;
}

/** The correct answer as Markdown (with LaTeX) for review screens. Pass the part so a unit shown after the box is included. */
export function answerMarkdown(spec: AnswerSpec, part?: { suffix?: string }): string {
  switch (spec.kind) {
    case 'mc':
      return spec.choices.find((c) => c.id === spec.correct)?.md ?? '';
    case 'multi':
      return spec.choices
        .filter((c) => spec.correct.includes(c.id))
        .map((c) => c.md)
        .join('; ');
    case 'order':
      return spec.correctOrder.map((id) => spec.items.find((c) => c.id === id)?.md ?? id).join(' , ');
    case 'text':
      return spec.accepted[0];
    case 'numeric': {
      if (spec.undefinedValue) return 'undefined';
      const unit = spec.unit ? ` ${spec.unit}` : part?.suffix ? ` ${part.suffix}` : '';
      if (spec.decimals !== undefined) return `$${fmtFixed(spec.value, spec.decimals)}$${unit}`;
      const f = toFrac(spec.value, 1000);
      if (f && f.d !== 1) {
        // 621/50 reads better as 12.42; halves, quarters and sixteenths stay as fractions.
        if (f.d > 16 && terminates(f.d)) return `$${fmt(spec.value, 6)}$${unit}`;
        const n = Math.abs(f.n);
        // A measured amount (it has a unit) is written as a mixed number: 5 2/3 cups, not 17/3.
        if (part?.suffix && n > f.d) return `$${f.n < 0 ? '-' : ''}${Math.floor(n / f.d)}\\tfrac{${n % f.d}}{${f.d}}$${unit}`;
        return `$${f.n < 0 ? '-' : ''}\\frac{${n}}{${f.d}}$${unit}`;
      }
      if (f) return `$${f.n}$${unit}`;
      return `$${fmt(spec.value, 6)}$${unit}`;
    }
    case 'numbers':
      return spec.values.length ? spec.values.map((value) => answerMarkdown({ kind: 'numeric', value, decimals: spec.decimals })).join(' and ') : 'no solution';
    case 'expression':
      return '`' + spec.expected + '`';
    case 'line':
      return '`' + canonicalResponse(spec) + '`';
    case 'equation-fn':
      return '`' + canonicalResponse(spec) + '`';
    case 'point':
      return `$(${fmt(spec.x, 4)},\\ ${fmt(spec.y, 4)})$`;
    case 'graph-line':
      return 'the line through ' + JSON.parse(canonicalResponse(spec)).map((p: number[]) => `$(${fmt(p[0], 3)}, ${fmt(p[1], 3)})$`).join(' and ');
    case 'graph-points':
      return spec.points.map((p) => `$(${p[0]}, ${p[1]})$`).join(', ');
    case 'manual':
      return spec.rubric ?? 'Teacher-graded response';
  }
}
