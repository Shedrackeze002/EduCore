/**
 * Diagrams for the video stage, drawn to scale from named points: lines that draw themselves on,
 * angles, right-angle marks, labels and scenery (a cliff, the sea, a tower, a person…). Each part
 * appears, and is emphasised, on its own.
 */
import type { ReactElement } from 'react';
import type { DiagramEl, DiagramItem, DiagramTone, Place } from '../script.ts';
import { partShown, type ElState } from '../timeline.ts';
import { tex, TONES } from './tex.ts';
import { INK, INK3, Label } from './Triangle.tsx';

type P = [number, number];

const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
const unit = (a: P): P => {
  const l = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / l, a[1] / l];
};
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const pts = (list: P[]) => list.map((q) => q.join(',')).join(' ');

const toneColour = (t: DiagramTone | undefined, fallback: string) => (t === undefined ? fallback : t === 'ink' ? INK : t === 'muted' ? INK3 : TONES[t]);

const PLACE: Record<Place, P> = {
  above: [0, -1],
  below: [0, 1],
  left: [-1, 0],
  right: [1, 0],
  'above left': [-0.71, -0.71],
  'above right': [0.71, -0.71],
  'below left': [-0.71, 0.71],
  'below right': [0.71, 0.71],
};

/** Dark fills for scenery, so lines and labels in front of it stay readable. */
const ROCK = '#2a2552';
const WALL = '#262247';
const SEA = 'rgb(77 163 255 / 0.55)';

/** Room around the drawing for labels, in pixels. */
const PAD = { x: 64, top: 48, bottom: 52 };

export function DiagramView({ el, st, w, h }: { el: DiagramEl; st: ElState | undefined; w: number; h: number }) {
  // Fit the points (and the width of cliffs and buildings) into the space, keeping the scale.
  const xs: number[] = [];
  const ys: number[] = [];
  for (const [x, y] of Object.values(el.points)) {
    xs.push(x);
    ys.push(y);
  }
  for (const item of el.items) {
    if (item.kind === 'thing' && (item.type === 'cliff' || item.type === 'building') && item.width) {
      xs.push(el.points[item.at][0] + (item.side === 'right' ? item.width : -item.width));
    }
  }
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = Math.min(...ys);
  const y1 = Math.max(...ys);
  const S = Math.min((w - 2 * PAD.x) / Math.max(x1 - x0, 1e-6), (h - PAD.top - PAD.bottom) / Math.max(y1 - y0, 1e-6));
  const ox = (w - (x1 - x0) * S) / 2;
  const oy = PAD.top + (h - PAD.top - PAD.bottom - (y1 - y0) * S) / 2;
  const at = (name: string): P => {
    const [x, y] = el.points[name];
    return [ox + (x - x0) * S, oy + (y1 - y) * S];
  };
  const all = Object.keys(el.points).map(at);
  const G: P = [all.reduce((n, q) => n + q[0], 0) / all.length, all.reduce((n, q) => n + q[1], 0) / all.length];
  const left = Math.max(0, ox - 40);
  const right = Math.min(w, ox + (x1 - x0) * S + 40);

  // A part appears, and is emphasised, on its own or with its group.
  const shown = (item: DiagramItem) => Math.max(partShown(st, item.id), item.group ? partShown(st, item.group) : 0);
  const focus = (item: DiagramItem) => Math.max(st?.focus[item.id] ?? 0, item.group ? (st?.focus[item.group] ?? 0) : 0);

  const svg: ReactElement[] = [];
  const labels: ReactElement[] = [];

  for (const item of el.items) {
    const k = shown(item);
    if (k <= 0) continue;
    const f = focus(item);
    const fadeLabel = clamp01((k - 0.5) / 0.5);
    switch (item.kind) {
      case 'thing':
        svg.push(<Thing key={item.id} item={item} k={k} at={at} S={S} left={left} right={right} />);
        break;
      case 'region': {
        const c = toneColour(item.tone, TONES.brand);
        svg.push(<polygon key={item.id} points={pts(item.points.map(at))} fill={c} fillOpacity={(0.1 + 0.08 * f) * k} stroke="none" />);
        break;
      }
      case 'line': {
        const a = at(item.from);
        const b = at(item.to);
        const c = toneColour(item.tone, INK);
        const e = add(a, mul(sub(b, a), clamp01(k / 0.85)));
        const width = (item.weight ?? (item.dashed ? 2.5 : 3.5)) + 4 * f;
        svg.push(
          <line
            key={item.id}
            x1={a[0]}
            y1={a[1]}
            x2={e[0]}
            y2={e[1]}
            stroke={c}
            strokeWidth={width}
            strokeLinecap="round"
            strokeDasharray={item.dashed ? '12 10' : undefined}
            style={f > 0 ? { filter: `drop-shadow(0 0 ${10 * f}px ${c})` } : undefined}
          />,
        );
        if (item.label) {
          const d = unit(sub(b, a));
          const nl: P = [d[1], -d[0]];
          const m = add(a, mul(sub(b, a), item.labelAt ?? 0.5));
          const side = item.labelSide ?? ((m[0] - G[0]) * nl[0] + (m[1] - G[1]) * nl[1] >= 0 ? 'left' : 'right');
          const n: P = side === 'left' ? nl : [-nl[0], -nl[1]];
          labels.push(<Label key={item.id} at={add(m, mul(n, 14))} n={n} html={tex(item.label)} color={c} opacity={fadeLabel} scale={1 + 0.14 * f} size={28} />);
        }
        break;
      }
      case 'curve': {
        const q = item.points.map(at);
        if (item.closed) q.push(q[0]);
        const c = toneColour(item.tone, INK);
        // Draw it on: the points up to the length reached so far, and part of the next segment.
        const seg = q.slice(1).map((b, i) => Math.hypot(b[0] - q[i][0], b[1] - q[i][1]));
        const total = seg.reduce((n, l) => n + l, 0);
        let rest = total * clamp01(k / 0.85);
        const drawn: P[] = [q[0]];
        for (let i = 0; i < seg.length && rest > 0; i++) {
          const t = Math.min(1, rest / (seg[i] || 1));
          drawn.push(add(q[i], mul(sub(q[i + 1], q[i]), t)));
          rest -= seg[i];
        }
        const width = (item.weight ?? (item.dashed ? 2.5 : 3.5)) + 4 * f;
        svg.push(
          <polyline
            key={item.id}
            points={pts(drawn)}
            fill="none"
            stroke={c}
            strokeWidth={width}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={item.dashed ? '12 10' : undefined}
            style={f > 0 ? { filter: `drop-shadow(0 0 ${10 * f}px ${c})` } : undefined}
          />,
        );
        if (item.label) {
          // The point `labelAt` of the way along the curve, and the direction there.
          let d = total * (item.labelAt ?? 0.5);
          let i = 0;
          while (i < seg.length - 1 && d > seg[i]) d -= seg[i++];
          const m = add(q[i], mul(sub(q[i + 1], q[i]), clamp01(d / (seg[i] || 1))));
          const dir = unit(sub(q[i + 1], q[i]));
          const nl: P = [dir[1], -dir[0]];
          const side = item.labelSide ?? ((m[0] - G[0]) * nl[0] + (m[1] - G[1]) * nl[1] >= 0 ? 'left' : 'right');
          const n: P = side === 'left' ? nl : [-nl[0], -nl[1]];
          labels.push(<Label key={item.id} at={add(m, mul(n, 14))} n={n} html={tex(item.label)} color={c} opacity={fadeLabel} scale={1 + 0.14 * f} size={28} />);
        }
        break;
      }
      case 'angle': {
        const V = at(item.at);
        const d1 = unit(sub(at(item.from), V));
        const d2 = unit(sub(at(item.to), V));
        const a1 = Math.atan2(d1[1], d1[0]);
        let delta = Math.atan2(d2[1], d2[0]) - a1;
        if (delta > Math.PI) delta -= 2 * Math.PI;
        if (delta < -Math.PI) delta += 2 * Math.PI;
        const r = item.r ?? 46;
        const end = a1 + delta * clamp01(k / 0.85);
        const s = add(V, mul(d1, r));
        const e: P = [V[0] + r * Math.cos(end), V[1] + r * Math.sin(end)];
        const sweep = delta > 0 ? 1 : 0;
        const c = toneColour(item.tone, TONES.theta);
        svg.push(
          <g key={item.id}>
            <path d={`M${V[0]},${V[1]} L${s[0]},${s[1]} A${r},${r} 0 0 ${sweep} ${e[0]},${e[1]} Z`} fill={c} fillOpacity={(0.14 + 0.12 * f) * k} stroke="none" />
            <path d={`M${s[0]},${s[1]} A${r},${r} 0 0 ${sweep} ${e[0]},${e[1]}`} fill="none" stroke={c} strokeWidth={3 + 2 * f} />
          </g>,
        );
        if (item.label) {
          const half = Math.abs(delta) / 2;
          const dist = item.labelDist ?? Math.max(r + 30, Math.min(200, 34 / Math.sin(half)));
          const dir = a1 + delta * (item.labelAt ?? 0.5);
          const bis: P = [Math.cos(dir), Math.sin(dir)];
          labels.push(<Label key={item.id} at={add(V, mul(bis, dist))} html={tex(item.label)} color={c} opacity={fadeLabel} scale={1 + 0.14 * f} size={28} />);
        }
        break;
      }
      case 'right': {
        const V = at(item.at);
        const u = mul(unit(sub(at(item.from), V)), 18);
        const v = mul(unit(sub(at(item.to), V)), 18);
        svg.push(<polyline key={item.id} points={pts([add(V, u), add(add(V, u), v), add(V, v)])} fill="none" stroke={INK} strokeWidth={2.5} opacity={k} />);
        break;
      }
      case 'label': {
        const q = at(item.at);
        const c = toneColour(item.tone, INK);
        const n = item.place ? PLACE[item.place] : unit(sub(q, G));
        if (item.dot) svg.push(<circle key={item.id} cx={q[0]} cy={q[1]} r={6 + 2 * f} fill={c} opacity={k} />);
        labels.push(<Label key={item.id} at={add(q, mul(n, item.dot ? 16 : 10))} n={n} html={tex(item.tex)} color={c} opacity={clamp01(k * 1.5)} scale={1 + 0.14 * f} size={item.tone === 'muted' ? 24 : 28} />);
        break;
      }
    }
  }

  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <svg width={w} height={h} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {svg}
      </svg>
      {labels}
    </div>
  );
}

/** Scenery, fading in and rising slightly as it appears. */
function Thing({ item, k, at, S, left, right }: { item: Extract<DiagramItem, { kind: 'thing' }>; k: number; at: (name: string) => P; S: number; left: number; right: number }) {
  const base = at(item.at);
  const top = item.top ? at(item.top) : base;
  const lift = (1 - clamp01(k)) * 12;
  const g = (children: ReactElement | ReactElement[]) => (
    <g opacity={clamp01(k * 1.4)} transform={`translate(0 ${lift})`}>
      {children}
    </g>
  );
  const sgn = item.side === 'right' ? 1 : -1;
  switch (item.type) {
    case 'ground':
      return g(
        <>
          <rect x={left} y={base[1]} width={right - left} height={22} fill="rgb(255 255 255 / 0.04)" />
          <line x1={left} x2={right} y1={base[1]} y2={base[1]} stroke={INK3} strokeWidth={3} strokeLinecap="round" />
        </>,
      );
    case 'water': {
      const waves: string[] = [];
      for (let x = left; x < right; x += 28) waves.push(`Q${x + 7},${base[1] - 5} ${Math.min(x + 14, right)},${base[1]} T${Math.min(x + 28, right)},${base[1]}`);
      return g(
        <>
          <rect x={left} y={base[1]} width={right - left} height={26} fill="rgb(77 163 255 / 0.1)" />
          <path d={`M${left},${base[1]} ${waves.join(' ')}`} fill="none" stroke={SEA} strokeWidth={3} />
        </>,
      );
    }
    case 'cliff': {
      const wpx = (item.width ?? 20) * S;
      const back = top[0] + sgn * wpx;
      return g(
        <>
          <polygon points={pts([top, [back, top[1]], [back, base[1] + 26], [base[0], base[1] + 26]])} fill={ROCK} />
          <line x1={top[0]} x2={back} y1={top[1]} y2={top[1]} stroke={TONES.good} strokeOpacity={0.6} strokeWidth={4} strokeLinecap="round" />
        </>,
      );
    }
    case 'tower': {
      const hw = 11;
      return g(<rect x={base[0] - hw} y={top[1]} width={hw * 2} height={base[1] - top[1]} fill={WALL} stroke={INK3} strokeWidth={1.5} />);
    }
    case 'lighthouse': {
      const H = base[1] - top[1];
      const bw = 16;
      const tw = 11;
      const bands = [0.2, 0.5, 0.8].map((t) => {
        const y = top[1] + H * t;
        const hw = tw + (bw - tw) * t;
        const y2 = y + H * 0.12;
        const hw2 = tw + (bw - tw) * (t + 0.12);
        return <polygon key={t} points={pts([[base[0] - hw, y], [base[0] + hw, y], [base[0] + hw2, y2], [base[0] - hw2, y2]])} fill={TONES.bad} fillOpacity={0.55} />;
      });
      return g(
        <>
          <polygon points={pts([[base[0] - tw, top[1]], [base[0] + tw, top[1]], [base[0] + bw, base[1]], [base[0] - bw, base[1]]])} fill={WALL} stroke={INK3} strokeWidth={1.5} />
          {bands}
          <rect x={base[0] - 10} y={top[1] - 22} width={20} height={20} rx={3} fill={TONES.theta} fillOpacity={0.35} stroke={INK3} strokeWidth={1.5} />
          <circle cx={base[0]} cy={top[1] - 12} r={20} fill={TONES.theta} fillOpacity={0.12} />
        </>,
      );
    }
    case 'building': {
      const wpx = (item.width ?? 12) * S;
      const x = sgn > 0 ? base[0] : base[0] - wpx;
      const rows = Math.max(1, Math.floor((base[1] - top[1] - 24) / 40));
      const cols = Math.max(1, Math.floor((wpx - 20) / 34));
      const wins: ReactElement[] = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) wins.push(<rect key={`${r}-${c}`} x={x + 14 + c * 34} y={top[1] + 16 + r * 40} width={20} height={18} rx={2} fill="rgb(255 209 102 / 0.16)" />);
      return g(
        <>
          <rect x={x} y={top[1]} width={wpx} height={base[1] - top[1]} fill={WALL} stroke={INK3} strokeWidth={1.5} />
          {wins}
        </>,
      );
    }
    case 'flagpole':
      return g(
        <>
          <line x1={base[0]} y1={base[1]} x2={top[0]} y2={top[1]} stroke={INK3} strokeWidth={4} strokeLinecap="round" />
          <polygon points={pts([[top[0], top[1]], [top[0] + 34, top[1] + 11], [top[0], top[1] + 22]])} fill={TONES.brand} fillOpacity={0.85} />
        </>,
      );
    case 'tree': {
      const H = base[1] - top[1];
      const r = Math.min(H * 0.32, 70);
      return g(
        <>
          <line x1={base[0]} y1={base[1]} x2={base[0]} y2={top[1] + r} stroke="#a0703a" strokeWidth={10} strokeLinecap="round" />
          <circle cx={top[0]} cy={top[1] + r} r={r} fill="#34D399" fillOpacity={0.22} stroke="#34D399" strokeOpacity={0.5} strokeWidth={2} />
        </>,
      );
    }
    case 'person': {
      // Feet on `at`, eyes at `top`.
      const H = Math.max(base[1] - top[1], 16);
      const hr = Math.max(4, H * 0.1);
      const x = base[0];
      const neck = top[1] + hr * 0.9;
      const hip = top[1] + H * 0.55;
      const sw = Math.max(2.5, H * 0.045);
      return g(
        <g stroke={INK} strokeWidth={sw} strokeLinecap="round" fill="none">
          <circle cx={x} cy={top[1] - hr * 0.15} r={hr} fill={ROCK} />
          <line x1={x} y1={neck} x2={x} y2={hip} />
          <line x1={x} y1={hip} x2={x - H * 0.13} y2={base[1]} />
          <line x1={x} y1={hip} x2={x + H * 0.13} y2={base[1]} />
          <line x1={x} y1={neck + H * 0.1} x2={x + H * 0.2} y2={neck + H * 0.02} />
          <line x1={x} y1={neck + H * 0.1} x2={x - H * 0.14} y2={neck + H * 0.3} />
        </g>,
      );
    }
    case 'boat':
      return g(
        <>
          <line x1={base[0]} y1={base[1] - 8} x2={base[0]} y2={base[1] - 46} stroke={INK3} strokeWidth={3} />
          <polygon points={pts([[base[0] + 2, base[1] - 44], [base[0] + 24, base[1] - 12], [base[0] + 2, base[1] - 12]])} fill={INK} fillOpacity={0.85} />
          <polygon points={pts([[base[0] - 28, base[1] - 8], [base[0] + 28, base[1] - 8], [base[0] + 19, base[1] + 4], [base[0] - 19, base[1] + 4]])} fill={TONES.adj} />
        </>,
      );
  }
}
