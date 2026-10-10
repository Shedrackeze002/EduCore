/** Convert simple LaTeX labels (used in figures) to plain Unicode text for SVG. */
const SYMBOLS: Record<string, string> = {
  theta: 'θ',
  alpha: 'α',
  beta: 'β',
  pi: 'π',
  circ: '°',
  times: '×',
  cdot: '·',
  le: '≤',
  ge: '≥',
  infty: '∞',
  sqrt: '√',
};
const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', n: 'ⁿ' };

export function texToText(input: string): string {
  let s = input;
  s = s.replace(/\\(?:d|t)?frac\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2');
  s = s.replace(/\\tfrac(\d)(\d)/g, '$1/$2');
  s = s.replace(/\\sqrt\[3\]\{([^{}]*)\}/g, '∛$1');
  s = s.replace(/\\sqrt\{([^{}]*)\}/g, '√$1');
  s = s.replace(/\\text\{([^{}]*)\}/g, '$1');
  s = s.replace(/\\overline\{([^{}]*)\}/g, '$1');
  s = s.replace(/\^\\circ/g, '°');
  s = s.replace(/\^\{([^{}]*)\}/g, (_, x: string) => [...x].map((c) => SUP[c] ?? c).join(''));
  s = s.replace(/\^(\w)/g, (_, c: string) => SUP[c] ?? c);
  s = s.replace(/\\,|\;|\\ /g, ' ');
  s = s.replace(/\\([a-zA-Z]+)/g, (_, w: string) => SYMBOLS[w] ?? w);
  s = s.replace(/[{}]/g, '');
  return s;
}
