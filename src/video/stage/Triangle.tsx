/** Right triangles for the video stage, drawn on, with sides and angles coloured as they are named. */
import type { SimilarEl, TriangleEl, TriPart } from '../script.ts';
import { partShown, type ElState } from '../timeline.ts';
import { tex, TONES } from './tex.ts';

type P = [number, number];

const INK = 'rgb(244 243 255)';
const INK3 = 'rgb(142 138 184)';
const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
const unit = (a: P): P => {
  const l = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / l, a[1] / l];
};
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

const SIDE_TONE: Record<'opp' | 'adj' | 'hyp', string> = { opp: TONES.opp, adj: TONES.adj, hyp: TONES.hyp };

/**
 * A label at a point. With a direction `n`, the label sits beside the point on that side (so a
 * side's label never covers the side, however long it is); without one, it is centred.
 */
function Label({ at, n, html, color, opacity, scale = 1, size = 30 }: { at: P; n?: P; html: string; color: string; opacity: number; scale?: number; size?: number }) {
  if (opacity <= 0) return null;
  // Beside the point on the side of n: centred along an edge for a straight normal, by a corner for a slanted one.
  const side = (v: number) => (v > 0.35 ? 0 : v < -0.35 ? -100 : -50);
  const [dx, dy] = n ? [side(n[0]), side(n[1])] : [-50, -50];
  return (
    <div
      style={{ position: 'absolute', left: at[0], top: at[1], transform: `translate(${dx}%, ${dy}%) scale(${scale})`, color, opacity, fontSize: size, whiteSpace: 'nowrap', fontWeight: 600, textShadow: '0 2px 12px rgb(13 12 36 / 0.9)' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** An angle arc at V between the directions to P1 and P2, and where its label fits inside the angle. */
function arc(V: P, P1: P, P2: P, r: number, minLabel: number) {
  const d1 = unit(sub(P1, V));
  const d2 = unit(sub(P2, V));
  const s = add(V, mul(d1, r));
  const e = add(V, mul(d2, r));
  const sweep = d1[0] * d2[1] - d1[1] * d2[0] > 0 ? 1 : 0;
  const half = Math.acos(Math.max(-1, Math.min(1, d1[0] * d2[0] + d1[1] * d2[1]))) / 2;
  const dist = Math.max(minLabel, Math.min(220, 40 / Math.sin(half)));
  return { d: `M${s[0]},${s[1]} A${r},${r} 0 0 ${sweep} ${e[0]},${e[1]}`, label: add(V, mul(unit(add(d1, d2)), dist)) };
}

export function TriangleView({ el, st, w, h, labelSize = 30 }: { el: TriangleEl; st: ElState | undefined; w: number; h: number; labelSize?: number }) {
  const p = st?.p ?? 0;
  let adj = el.adj;
  let opp = el.opp;
  if (opp / adj < 0.3) opp = adj * 0.3;
  if (opp / adj > 2.2) adj = opp / 2.2;
  const S = Math.min((w - 170) / adj, (h - 140) / opp);
  const cx = w / 2;
  const cy = h / 2 + 6;
  const flip = (x: number) => (el.mirror ? 2 * cx - x : x);
  const A: P = [flip(cx - (adj * S) / 2), cy + (opp * S) / 2];
  const C: P = [flip(cx + (adj * S) / 2), cy + (opp * S) / 2];
  const B: P = [C[0], C[1] - opp * S];
  const G: P = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
  const out = (q: P, d: number): P => add(q, mul(unit(sub(q, G)), d));
  const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  /** The unit normal of a side, pointing away from the triangle. */
  const normal = (a: P, b: P): P => {
    const d = unit(sub(b, a));
    const n: P = [-d[1], d[0]];
    const m = mid(a, b);
    return (m[0] - G[0]) * n[0] + (m[1] - G[1]) * n[1] >= 0 ? n : [-n[0], -n[1]];
  };
  const sides: Record<'opp' | 'adj' | 'hyp', [P, P]> = { adj: [A, C], opp: [C, B], hyp: [A, B] };
  const per = Math.hypot(...sub(C, A)) + Math.hypot(...sub(B, C)) + Math.hypot(...sub(A, B));
  const draw = clamp01(p / 0.85);
  const u = mul(unit(sub(A, C)), 20);
  const v = mul(unit(sub(B, C)), 20);
  const box = [add(C, u), add(add(C, u), v), add(C, v)];
  const shown = (k: TriPart) => partShown(st, k);
  const focus = (k: TriPart) => st?.focus[k] ?? 0;
  const thetaArc = arc(A, C, B, 50, 82);
  const otherArc = arc(B, A, C, 40, 68);
  const labels = el.labels ?? {};
  const ground = A[1];

  return (
    <div style={{ position: 'relative', width: w, height: h, opacity: Math.min(1, p * 3) }}>
      <svg width={w} height={h} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {el.setting && (
          <g opacity={clamp01(p * 2)} stroke={INK3} fill="none" strokeWidth={3} strokeLinecap="round">
            <line x1={Math.min(A[0], C[0]) - 50} x2={Math.max(A[0], C[0]) + (el.setting === 'building' ? 140 : 50)} y1={ground} y2={ground} />
            {el.setting === 'tree' && (
              <>
                <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1] + 34} stroke="#a0703a" strokeWidth={12} />
                <circle cx={B[0]} cy={B[1] + 10} r={42} fill="#34D399" fillOpacity={0.22} stroke="#34D399" strokeOpacity={0.5} />
              </>
            )}
            {el.setting === 'building' && (
              <g>
                <rect x={Math.min(C[0], C[0] + (el.mirror ? -110 : 0))} y={B[1]} width={110} height={C[1] - B[1]} fill="rgb(255 255 255 / 0.06)" />
                {Array.from({ length: Math.max(1, Math.floor((C[1] - B[1] - 30) / 46)) }, (_, i) => (
                  <rect key={i} x={Math.min(C[0], C[0] + (el.mirror ? -110 : 0)) + 34} y={B[1] + 22 + i * 46} width={42} height={22} rx={3} fill="rgb(255 209 102 / 0.18)" stroke="none" />
                ))}
              </g>
            )}
            {el.setting === 'ladder' && <rect x={el.mirror ? C[0] - 26 : C[0]} y={B[1] - 30} width={26} height={C[1] - B[1] + 30} fill="rgb(255 255 255 / 0.08)" />}
          </g>
        )}
        <path d={`M${A[0]},${A[1]} L${C[0]},${C[1]} L${B[0]},${B[1]} Z`} fill={`rgb(167 139 250 / ${0.1 * clamp01((p - 0.6) / 0.4)})`} stroke={INK} strokeWidth={3.5} strokeLinejoin="round" strokeDasharray={per} strokeDashoffset={per * (1 - draw)} />
        {el.setting === 'ladder' &&
          Array.from({ length: 7 }, (_, i) => {
            const k = (i + 1) / 8;
            const q = add(A, mul(sub(B, A), k));
            const n = mul(unit([-(B[1] - A[1]), B[0] - A[0]]), 9);
            return <line key={i} x1={q[0] - n[0]} y1={q[1] - n[1]} x2={q[0] + n[0]} y2={q[1] + n[1]} stroke={INK3} strokeWidth={3} opacity={clamp01((p - 0.7) / 0.3)} />;
          })}
        <polyline points={box.map((q) => q.join(',')).join(' ')} fill="none" stroke={INK} strokeWidth={2.5} opacity={clamp01((p - 0.7) / 0.3)} />
        {(['adj', 'opp', 'hyp'] as const).map((k) => {
          // A side takes its colour when it is labelled or named on its own.
          const s = labels[k] || st?.parts[k] !== undefined ? shown(k) : 0;
          if (s <= 0) return null;
          const [a, b] = sides[k];
          const f = focus(k);
          return <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={SIDE_TONE[k]} strokeOpacity={s} strokeWidth={4 + 4 * f} strokeLinecap="round" style={f > 0 ? { filter: `drop-shadow(0 0 ${10 * f}px ${SIDE_TONE[k]})` } : undefined} />;
        })}
        {shown('theta') > 0 && <path d={thetaArc.d} fill="none" stroke={TONES.theta} strokeWidth={3 + 2 * focus('theta')} opacity={shown('theta')} />}
        {(labels.other || st?.parts.other !== undefined) && shown('other') > 0 && <path d={otherArc.d} fill="none" stroke={INK3} strokeWidth={3 + 2 * focus('other')} opacity={shown('other')} />}
      </svg>
      {el.vertices &&
        ([A, C, B] as P[]).map((q, i) => <Label key={i} at={out(q, 12)} n={unit(sub(q, G))} html={tex(`\\text{${el.vertices![i]}}`)} color={INK3} opacity={clamp01((p - 0.5) / 0.5)} size={24} />)}
      {(['adj', 'opp', 'hyp'] as const).map((k) => {
        const lab = labels[k];
        if (!lab) return null;
        const [a, b] = sides[k];
        let n = normal(a, b);
        let gap = 14;
        // The wall behind a ladder and the building stand beside the opposite side: clear the
        // wall, and label the height inside the triangle rather than over the building.
        if (k === 'opp' && el.setting === 'ladder') gap += 30;
        if (k === 'opp' && el.setting === 'building') n = [-n[0], -n[1]];
        return <Label key={k} at={add(mid(a, b), mul(n, gap))} n={n} html={tex(lab)} color={SIDE_TONE[k]} opacity={shown(k)} scale={1 + 0.14 * focus(k)} size={labelSize} />;
      })}
      {labels.theta && <Label at={thetaArc.label} html={tex(labels.theta)} color={TONES.theta} opacity={shown('theta')} scale={1 + 0.14 * focus('theta')} size={labelSize} />}
      {labels.other && <Label at={otherArc.label} html={tex(labels.other)} color={INK} opacity={shown('other')} scale={1 + 0.14 * focus('other')} size={labelSize} />}
    </div>
  );
}

/** Similar right triangles in a row, each drawn on as its part is shown. */
export function SimilarView({ el, st, w, h }: { el: SimilarEl; st: ElState | undefined; w: number; h: number }) {
  const rad = (el.angle * Math.PI) / 180;
  const tan = Math.tan(rad);
  const gap = 74;
  const total = el.sizes.reduce((n, x) => n + x, 0);
  const tallest = Math.max(...el.sizes) * tan;
  const S = Math.min((w - 90 - gap * (el.sizes.length - 1)) / total, (h - 150) / tallest);
  const base = h / 2 + (tallest * S) / 2;
  const width = total * S + gap * (el.sizes.length - 1);
  let x = (w - width) / 2 - 20;
  const d = el.decimals ?? 1;
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <svg width={w} height={h} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {el.sizes.map((size, i) => {
          const s = partShown(st, String(i));
          const A: P = [x, base];
          const C: P = [x + size * S, base];
          const B: P = [C[0], base - size * tan * S];
          x = C[0] + gap;
          if (s <= 0) return null;
          const per = Math.hypot(...sub(C, A)) + Math.hypot(...sub(B, C)) + Math.hypot(...sub(A, B));
          const a = arc(A, C, B, 30, 0);
          const f = st?.focus[String(i)] ?? 0;
          return (
            <g key={i}>
              <path d={`M${A[0]},${A[1]} L${C[0]},${C[1]} L${B[0]},${B[1]} Z`} fill={`rgb(167 139 250 / ${0.1 * s})`} stroke={INK} strokeWidth={3 + 2 * f} strokeLinejoin="round" strokeDasharray={per} strokeDashoffset={per * (1 - clamp01(s / 0.8))} />
              <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={TONES.opp} strokeWidth={4} opacity={clamp01((s - 0.6) / 0.4)} />
              <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={TONES.adj} strokeWidth={4} opacity={clamp01((s - 0.6) / 0.4)} />
              <path d={a.d} fill="none" stroke={TONES.theta} strokeWidth={3} opacity={clamp01((s - 0.6) / 0.4)} />
            </g>
          );
        })}
      </svg>
      {(() => {
        let xx = (w - width) / 2 - 20;
        return el.sizes.map((size, i) => {
          const s = clamp01((partShown(st, String(i)) - 0.6) / 0.4);
          const A: P = [xx, base];
          const C: P = [xx + size * S, base];
          const B: P = [C[0], base - size * tan * S];
          xx = C[0] + gap;
          return (
            <div key={i}>
              <Label at={[(A[0] + C[0]) / 2, base + 10]} n={[0, 1]} html={tex(`\\adj{${size.toFixed(d)}}`)} color={TONES.adj} opacity={s} size={24} />
              <Label at={[C[0] + 10, (B[1] + C[1]) / 2]} n={[1, 0]} html={tex(`\\opp{${(size * tan).toFixed(d)}}`)} color={TONES.opp} opacity={s} size={24} />
              {C[0] - A[0] >= 110 && <Label at={add(A, mul(unit([Math.cos(rad / 2), -Math.sin(rad / 2)]), 58))} html={tex(`\\thc{${el.angle}^\\circ}`)} color={TONES.theta} opacity={s} size={18} />}
            </div>
          );
        });
      })()}
    </div>
  );
}
