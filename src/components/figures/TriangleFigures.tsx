import type { RightTriangleFigure, TwoTriangleFigure } from '@engine/types.ts';
import { texToText } from '@/lib/texText.ts';

type P = [number, number];

const STROKE = 'rgb(var(--ink))';
const ACCENT = 'rgb(var(--series-1))';

function Label({ x, y, text, bold, color, anchor = 'middle', size = 14 }: { x: number; y: number; text: string; bold?: boolean; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} dominantBaseline="middle" fontWeight={bold ? 700 : 500} stroke="rgb(var(--surface))" strokeWidth={4} paintOrder="stroke" style={color ? { fill: color } : undefined}>
      {texToText(text)}
    </text>
  );
}

function sub(a: P, b: P): P {
  return [a[0] - b[0], a[1] - b[1]];
}
function add(a: P, b: P): P {
  return [a[0] + b[0], a[1] + b[1]];
}
function scale(a: P, k: number): P {
  return [a[0] * k, a[1] * k];
}
function norm(a: P): P {
  const l = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / l, a[1] / l];
}

export function RightTriangle({ fig }: { fig: RightTriangleFigure }) {
  // Normalise proportions so very flat triangles stay readable.
  let a = fig.legA;
  let b = fig.legB;
  const ratio = b / a;
  if (ratio < 0.32) b = a * 0.32;
  if (ratio > 3) a = b / 3;
  const S = 220 / Math.max(a, b);
  a *= S;
  b *= S;
  // Base layout (SVG y down): right angle at origin, A to the right, B up.
  let R: P = [0, 0];
  let A: P = [a, 0];
  let B: P = [0, -b];
  const rot = (p: P): P => {
    let q: P = fig.mirror ? [-p[0], p[1]] : p;
    for (let i = 0; i < (fig.rotate ?? 0); i++) q = [-q[1], q[0]];
    return q;
  };
  [R, A, B] = [R, A, B].map(rot) as [P, P, P];
  const xs = [R[0], A[0], B[0]];
  const ys = [R[1], A[1], B[1]];
  const pad = 46;
  const scene = fig.scene && fig.scene !== 'none' ? fig.scene : null;
  const minX = Math.min(...xs) - pad - (scene === 'cliff' || scene === 'building' ? 40 : 0);
  const minY = Math.min(...ys) - pad;
  const maxX = Math.max(...xs) + pad;
  const maxY = Math.max(...ys) + pad + (scene ? 10 : 0);
  const W = maxX - minX;
  const H = maxY - minY;
  const C: P = [(R[0] + A[0] + B[0]) / 3, (R[1] + A[1] + B[1]) / 3];
  const out = (p: P, d: number): P => add(p, scale(norm(sub(p, C)), d));

  // right-angle box
  const u = scale(norm(sub(A, R)), 14);
  const v = scale(norm(sub(B, R)), 14);
  const box = [add(R, u), add(add(R, u), v), add(R, v)];

  const sideMid = (p: P, q: P): P => out([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], 20);
  const sides: Array<['ra' | 'rb' | 'ab', P, P]> = [
    ['ra', R, A],
    ['rb', R, B],
    ['ab', A, B],
  ];

  const angleArc = (V: P, P1: P, P2: P) => {
    const r = 28;
    const d1 = norm(sub(P1, V));
    const d2 = norm(sub(P2, V));
    const s = add(V, scale(d1, r));
    const e = add(V, scale(d2, r));
    const cross = d1[0] * d2[1] - d1[1] * d2[0];
    const bis = norm(add(d1, d2));
    return { path: `M${s[0]},${s[1]} A${r},${r} 0 0 ${cross > 0 ? 1 : 0} ${e[0]},${e[1]}`, label: add(V, scale(bis, 48)) };
  };

  return (
    <svg viewBox={`${minX} ${minY} ${W} ${H}`} className="figure-svg mx-auto h-auto w-full max-w-[380px]" role="img" aria-label="Right triangle diagram">
      {scene && <Scene scene={scene} R={R} A={A} B={B} />}
      <polygon points={[R, A, B].map((p) => p.join(',')).join(' ')} fill="rgb(var(--series-1) / 0.07)" stroke={STROKE} strokeWidth={2.2} strokeLinejoin="round" />
      <polyline points={[box[0], box[1], box[2]].map((p) => p.join(',')).join(' ')} fill="none" stroke={STROKE} strokeWidth={1.5} />
      {(['a', 'b'] as const).map((k) => {
        const lab = fig.angleLabels?.[k];
        if (!lab) return null;
        const V = k === 'a' ? A : B;
        const other = k === 'a' ? B : A;
        const arc = angleArc(V, R, other);
        return (
          <g key={k}>
            <path d={arc.path} fill="none" stroke={ACCENT} strokeWidth={2} />
            <Label x={arc.label[0]} y={arc.label[1]} text={lab} color={ACCENT} bold size={13.5} />
          </g>
        );
      })}
      {sides.map(([key, p, q]) => {
        const lab = fig.sideLabels?.[key];
        if (!lab) return null;
        const m = sideMid(p, q);
        return <Label key={key} x={m[0]} y={m[1]} text={lab} bold={lab.length <= 2} />;
      })}
      {[
        [R, fig.vertices.right],
        [A, fig.vertices.a],
        [B, fig.vertices.b],
      ].map(([p, name]) => {
        const q = out(p as P, 16);
        return <Label key={name as string} x={q[0]} y={q[1]} text={name as string} size={13} color="rgb(var(--ink-3))" />;
      })}
    </svg>
  );
}

function Scene({ scene, R, A, B }: { scene: NonNullable<RightTriangleFigure['scene']>; R: P; A: P; B: P }) {
  const ground = 'rgb(var(--ink-3))';
  const groundY = Math.max(R[1], A[1]);
  const gx0 = Math.min(R[0], A[0]) - 40;
  const gx1 = Math.max(R[0], A[0]) + 30;
  const els = [<line key="g" x1={gx0} x2={gx1} y1={groundY} y2={groundY} stroke={ground} strokeWidth={2} />];
  if (scene === 'tree') {
    const top = B;
    els.push(<line key="trunk" x1={R[0]} x2={R[0]} y1={R[1]} y2={top[1] + 30} stroke="#8a5a2b" strokeWidth={5} />);
    els.push(<circle key="crown" cx={top[0]} cy={top[1] + 18} r={22} fill="#0c8c4a" opacity={0.25} />);
  }
  if (scene === 'cliff' || scene === 'building') {
    els.push(<rect key="cliff" x={R[0] - 40} y={B[1]} width={40} height={R[1] - B[1]} fill="rgb(var(--surface-3))" stroke={ground} />);
    els.push(<line key="hz" x1={B[0]} x2={A[0]} y1={B[1]} y2={B[1]} stroke={ground} strokeDasharray="5 5" />);
    if (scene === 'cliff') els.push(<path key="boat" d={`M${A[0] - 14},${A[1] - 2} L${A[0] + 14},${A[1] - 2} L${A[0] + 8},${A[1] + 6} L${A[0] - 8},${A[1] + 6} Z`} fill="rgb(var(--accent))" opacity={0.8} />);
  }
  if (scene === 'ladder') {
    els.push(<line key="wall" x1={R[0]} x2={B[0]} y1={R[1]} y2={B[1] - 20} stroke={ground} strokeWidth={6} opacity={0.35} />);
    for (let i = 1; i < 8; i++) {
      const t = i / 8;
      const p: P = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
      els.push(<circle key={`r${i}`} cx={p[0]} cy={p[1]} r={2} fill={ground} />);
    }
  }
  if (scene === 'kite') {
    els.push(<path key="kite" d={`M${B[0]},${B[1] - 14} L${B[0] + 9},${B[1]} L${B[0]},${B[1] + 14} L${B[0] - 9},${B[1]} Z`} fill="rgb(var(--accent))" opacity={0.85} />);
  }
  return <g>{els}</g>;
}

function arc(V: P, P1: P, P2: P, r: number, labelR: number) {
  const d1 = norm(sub(P1, V));
  const d2 = norm(sub(P2, V));
  const s = add(V, scale(d1, r));
  const e = add(V, scale(d2, r));
  const cross = d1[0] * d2[1] - d1[1] * d2[0];
  const bis = norm(add(d1, d2));
  return { d: `M${s[0]},${s[1]} A${r},${r} 0 0 ${cross > 0 ? 1 : 0} ${e[0]},${e[1]}`, l: add(V, scale(bis, labelR)) };
}

export function TwoTriangles({ fig }: { fig: TwoTriangleFigure }) {
  const L = fig.labels;
  const ground = 'rgb(var(--ink-3))';
  if (fig.arrangement === 'opposite') {
    const T: P = [200, 40];
    const Bs: P = [200, 200];
    const P1: P = [40, 200];
    const P2: P = [330, 200];
    return (
      <svg viewBox="0 0 380 240" className="figure-svg mx-auto h-auto w-full max-w-[420px]" role="img" aria-label="Two right triangles sharing a tower">
        <line x1={10} x2={370} y1={200} y2={200} stroke={ground} strokeWidth={2} />
        <rect x={193} y={40} width={14} height={160} fill="rgb(var(--surface-3))" stroke={STROKE} />
        <line x1={P1[0]} y1={P1[1]} x2={T[0]} y2={T[1]} stroke={STROKE} strokeWidth={2} />
        <line x1={P2[0]} y1={P2[1]} x2={T[0]} y2={T[1]} stroke={STROKE} strokeWidth={2} />
        {(() => {
          const a1 = arc(P1, P2, T, 30, 52);
          const a2 = arc(P2, P1, T, 26, 48);
          return (
            <>
              <path d={a1.d} fill="none" stroke={ACCENT} strokeWidth={2} />
              <path d={a2.d} fill="none" stroke={ACCENT} strokeWidth={2} />
              <Label x={a1.l[0]} y={a1.l[1]} text={L.a1 ?? ''} color={ACCENT} bold size={12.5} />
              <Label x={a2.l[0]} y={a2.l[1]} text={L.a2 ?? ''} color={ACCENT} bold size={12.5} />
            </>
          );
        })()}
        <Label x={228} y={120} text={L.h ?? 'h'} bold />
        <Label x={200} y={222} text={L.x ?? 'x'} bold />
        <line x1={P1[0]} x2={P2[0]} y1={212} y2={212} stroke={ground} strokeDasharray="3 3" />
        <circle cx={P1[0]} cy={P1[1]} r={4} fill={ACCENT} />
        <circle cx={P2[0]} cy={P2[1]} r={4} fill={ACCENT} />
        <polyline points={`${Bs[0] - 12},200 ${Bs[0] - 12},188 ${Bs[0]},188`} fill="none" stroke={STROKE} />
      </svg>
    );
  }
  if (fig.arrangement === 'same') {
    const T: P = [40, 40];
    return (
      <svg viewBox="0 0 380 240" className="figure-svg mx-auto h-auto w-full max-w-[420px]" role="img" aria-label="Two boats seen from a lighthouse">
        <rect x={26} y={40} width={14} height={160} fill="rgb(var(--surface-3))" stroke={STROKE} />
        <line x1={0} x2={380} y1={200} y2={200} stroke={ground} strokeWidth={2} />
        <line x1={T[0]} x2={370} y1={T[1]} y2={T[1]} stroke={ground} strokeDasharray="5 5" />
        <line x1={T[0]} y1={T[1]} x2={190} y2={200} stroke={STROKE} strokeWidth={2} />
        <line x1={T[0]} y1={T[1]} x2={330} y2={200} stroke={STROKE} strokeWidth={2} />
        {(() => {
          const near = arc(T, [370, 40], [190, 200], 46, 70);
          const far = arc(T, [370, 40], [330, 200], 92, 118);
          return (
            <>
              <path d={near.d} fill="none" stroke={ACCENT} strokeWidth={2} />
              <path d={far.d} fill="none" stroke={ACCENT} strokeWidth={2} />
              <Label x={near.l[0]} y={near.l[1]} text={L.a1 ?? ''} color={ACCENT} bold size={12.5} />
              <Label x={far.l[0]} y={far.l[1]} text={L.a2 ?? ''} color={ACCENT} bold size={12.5} />
            </>
          );
        })()}
        <Label x={14} y={120} text={L.h ?? 'h'} bold anchor="start" />
        <Label x={260} y={218} text={L.x ?? 'x'} bold />
        <line x1={190} x2={330} y1={210} y2={210} stroke={ground} strokeDasharray="3 3" />
        <circle cx={190} cy={200} r={4} fill="rgb(var(--accent))" />
        <circle cx={330} cy={200} r={4} fill="rgb(var(--accent))" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 380 260" className="figure-svg mx-auto h-auto w-full max-w-[420px]" role="img" aria-label="A flagpole on a building">
      <line x1={0} x2={380} y1={230} y2={230} stroke={ground} strokeWidth={2} />
      <rect x={40} y={110} width={60} height={120} fill="rgb(var(--surface-3))" stroke={STROKE} />
      <line x1={100} x2={100} y1={110} y2={40} stroke={STROKE} strokeWidth={3} />
      <path d="M100,40 L128,50 L100,60 Z" fill="rgb(var(--accent))" opacity={0.85} />
      <line x1={330} y1={230} x2={100} y2={110} stroke={STROKE} strokeWidth={2} />
      <line x1={330} y1={230} x2={100} y2={40} stroke={STROKE} strokeWidth={2} />
      {(() => {
        const O: P = [330, 230];
        const lo = arc(O, [100, 230], [100, 110], 50, 74);
        const hi = arc(O, [100, 230], [100, 40], 90, 112);
        return (
          <>
            <path d={lo.d} fill="none" stroke={ACCENT} strokeWidth={2} />
            <path d={hi.d} fill="none" stroke={ACCENT} strokeWidth={2} />
            <Label x={lo.l[0]} y={lo.l[1]} text={L.a1 ?? ''} color={ACCENT} bold size={12} />
            <Label x={hi.l[0]} y={hi.l[1]} text={L.a2 ?? ''} color={ACCENT} bold size={12} />
          </>
        );
      })()}
      <Label x={118} y={80} text={L.x ?? 'x'} bold anchor="start" />
      <Label x={215} y={248} text={L.d ?? 'd'} bold />
    </svg>
  );
}
