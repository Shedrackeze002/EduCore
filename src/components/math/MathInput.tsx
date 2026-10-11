/**
 * Text input for math answers with a symbol keypad and a live "we read your
 * answer as" preview, so students can see exactly how their typing is interpreted.
 */
import { useMemo, useRef, useState } from 'react';
import { previewLatex } from '@engine/math/expr.ts';
import { renderMath } from '@/lib/markdown.ts';
import { cn } from '@/lib/cn.ts';

export type MathMode = 'expr' | 'equation' | 'point' | 'number' | 'list';

const KEYS: Array<{ label: string; insert: string; title: string; cursorBack?: number }> = [
  { label: 'x²', insert: '^2', title: 'Squared' },
  { label: 'xⁿ', insert: '^()', title: 'Power', cursorBack: 1 },
  { label: '√', insert: 'sqrt()', title: 'Square root', cursorBack: 1 },
  { label: '∛', insert: 'cbrt()', title: 'Cube root', cursorBack: 1 },
  { label: 'ⁿ√', insert: 'root(, )', title: 'nth root: root(index, number)', cursorBack: 3 },
  { label: 'a/b', insert: '/', title: 'Fraction' },
  { label: '( )', insert: '()', title: 'Brackets', cursorBack: 1 },
  { label: 'π', insert: 'pi', title: 'Pi' },
  { label: '−', insert: '-', title: 'Minus' },
  { label: '=', insert: '=', title: 'Equals' },
];

/** Function keys for the Grade 12 courses (trigonometry, logarithms and calculus). */
const FUNCTION_KEYS: typeof KEYS = [
  { label: 'sin', insert: 'sin()', title: 'Sine (radians)', cursorBack: 1 },
  { label: 'cos', insert: 'cos()', title: 'Cosine (radians)', cursorBack: 1 },
  { label: 'tan', insert: 'tan()', title: 'Tangent (radians)', cursorBack: 1 },
  { label: 'ln', insert: 'ln()', title: 'Natural logarithm', cursorBack: 1 },
  { label: 'log', insert: 'log()', title: 'Logarithm, base 10', cursorBack: 1 },
  { label: 'eˣ', insert: 'e^()', title: 'e to a power', cursorBack: 1 },
];

export function MathInput({
  value,
  onChange,
  mode = 'expr',
  placeholder,
  disabled,
  status,
  suffix,
  label,
  onEnter,
  autoFocus,
  ariaLabel,
  functions,
}: {
  value: string;
  onChange: (v: string) => void;
  mode?: MathMode;
  placeholder?: string;
  disabled?: boolean;
  status?: 'correct' | 'incorrect' | null;
  suffix?: string;
  label?: React.ReactNode;
  onEnter?: () => void;
  autoFocus?: boolean;
  ariaLabel?: string;
  /** Show sin, cos, tan, ln, log and e keys (expression and equation answers only). */
  functions?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const preview = useMemo(() => {
    if (!value.trim()) return { latex: null, error: null };
    if (mode === 'list') {
      // Several answers separated by commas: preview only the parts that need maths typesetting.
      if (/^[\s\d.,;\-−]*$/.test(value) || /^\s*(none|no\b)/i.test(value)) return { latex: null, error: null };
      const parts = value.split(/[,;]|\bor\b|\band\b/i).map((p) => p.trim().replace(/^(?:[a-zθ]|theta)\s*=\s*/i, '')).filter(Boolean);
      const shown = parts.map((p) => previewLatex(p, 'expr'));
      const bad = shown.find((x) => x.error);
      return bad ? bad : { latex: shown.map((x) => x.latex ?? '').join(',\\ '), error: null };
    }
    if (mode === 'number') {
      if (/^\s*-?\d+(\.\d+)?\s*$/.test(value)) return { latex: null, error: null };
      if (/^\s*-?\d+\s+\d+\s*\/\s*\d+\s*$/.test(value)) return { latex: null, error: null };
      if (/^\s*(undefined|und|dne)\s*$/i.test(value)) return { latex: null, error: null };
      return previewLatex(value.replace(/\s*(cm|mm|km|m|in|ft|yd|mi|°)\s*$/i, ''), 'expr');
    }
    return previewLatex(value, mode === 'equation' ? 'equation' : mode === 'point' ? 'point' : 'expr');
  }, [value, mode]);

  const insert = (text: string, back = 0) => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const next = value.slice(0, start) + text + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + text.length - back;
      el.setSelectionRange(pos, pos);
    });
  };

  const keys = (functions && (mode === 'expr' || mode === 'equation') ? [...KEYS, ...FUNCTION_KEYS] : KEYS).filter((k) => (mode === 'equation' ? true : k.insert !== '=')).filter((k) => (mode === 'number' || mode === 'list' ? ['a/b', '√', 'π', '−', '( )'].includes(k.label) : true));

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        {label && <span className="shrink-0 text-[15px] text-ink-2">{label}</span>}
        <div className="relative min-w-0 flex-1">
          <input
            ref={ref}
            value={value}
            disabled={disabled}
            autoFocus={autoFocus}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onEnter?.();
              }
            }}
            placeholder={placeholder ?? (mode === 'point' ? '(x, y)' : mode === 'equation' ? 'y = ...' : mode === 'number' ? 'Your answer' : mode === 'list' ? 'For example: 2, −3' : 'Type your answer')}
            aria-label={ariaLabel ?? 'Answer'}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode={mode === 'number' ? 'decimal' : 'text'}
            className={cn(
              'input h-12 font-mono text-[16px] tracking-wide',
              suffix && 'pr-16',
              status === 'correct' && 'border-good bg-good-soft/40 focus:border-good focus:ring-good/15',
              status === 'incorrect' && 'border-bad bg-bad-soft/40 focus:border-bad focus:ring-bad/15',
            )}
          />
          {suffix && <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-3">{suffix}</span>}
        </div>
      </div>
      {!disabled && (focused || value) && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {focused &&
            keys.map((k) => (
              <button
                key={k.label}
                type="button"
                title={k.title}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => insert(k.insert, k.cursorBack)}
                className="h-8 min-w-[38px] rounded-lg border border-line bg-surface-2 px-2 font-mono text-sm text-ink-2 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {k.label}
              </button>
            ))}
        </div>
      )}
      {(preview.latex || preview.error) && (
        <div className="mt-2 flex min-h-[28px] items-center gap-2 text-sm" aria-live="polite">
          {preview.error ? (
            <span className="text-warn-ink">{preview.error}</span>
          ) : (
            <>
              <span className="text-ink-3">We read this as</span>
              <span className="rounded-lg bg-surface-2 px-2 py-0.5 text-ink" dangerouslySetInnerHTML={{ __html: renderMath(preview.latex!, false) }} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
