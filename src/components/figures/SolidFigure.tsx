/** Oblique drawings of 3-D solids with dimension labels (schematic, not to scale). */
import type { ReactNode } from 'react';
import type { SolidFigure as SolidSpec } from '@engine/types.ts';
import { texToText } from '@/lib/texText.ts';

const INK = 'rgb(var(--ink))';
const FILL = 'rgb(var(--series-1) / 0.08)';
const FILL2 = 'rgb(var(--series-1) / 0.14)';
const DIM = 'rgb(var(--series-1))';

function L({ x, y, t, anchor = 'middle' }: { x: number; y: number; t?: string; anchor?: 'start' | 'middle' | 'end' }) {
  if (!t) return null;
  const text = texToText(t);
  return (
    <text x={x} y={y} fontSize={14} fontWeight={600} textAnchor={anchor} dominantBaseline="middle" stroke="rgb(var(--surface))" strokeWidth={4} paintOrder="stroke">
      {text}
    </text>
  );
}

const solid = { stroke: INK, strokeWidth: 2, fill: 'none', strokeLinejoin: 'round' as const };
const hidden = { stroke: INK, strokeWidth: 1.4, fill: 'none', strokeDasharray: '5 5', opacity: 0.55 };
const dimLine = { stroke: DIM, strokeWidth: 1.8, fill: 'none', strokeDasharray: '4 3' };

function pts(...p: Array<[number, number]>) {
  return p.map((q) => q.join(',')).join(' ');
}

function Ellipse({ cx, cy, rx, ry, backDashed, fill }: { cx: number; cy: number; rx: number; ry: number; backDashed?: boolean; fill?: string }) {
  if (!backDashed) return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} {...solid} fill={fill ?? 'none'} />;
  return (
    <g>
      <path d={`M${cx - rx},${cy} A${rx},${ry} 0 0 0 ${cx + rx},${cy}`} {...solid} />
      <path d={`M${cx - rx},${cy} A${rx},${ry} 0 0 1 ${cx + rx},${cy}`} {...hidden} />
    </g>
  );
}

function radiusLabels(lbl: SolidSpec['labels'], cx: number, cy: number, r: number, above = true): ReactNode {
  if (lbl.d) {
    return (
      <g>
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} {...dimLine} />
        <L x={cx} y={cy + (above ? -12 : 14)} t={lbl.d} />
      </g>
    );
  }
  if (lbl.r) {
    return (
      <g>
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} {...dimLine} />
        <circle cx={cx} cy={cy} r={2.5} fill={DIM} />
        <L x={cx + r / 2} y={cy + (above ? -12 : 14)} t={lbl.r} />
      </g>
    );
  }
  return null;
}

function Prism({ l, w, h, lbl, hole }: { l: number; w: number; h: number; lbl: SolidSpec['labels']; hole?: boolean }) {
  const x0 = 50;
  const y1 = 225;
  const dx = Math.min(80, 30 + w * 0.6);
  const dy = -dx * 0.7;
  const FLB: [number, number] = [x0, y1];
  const FRB: [number, number] = [x0 + l, y1];
  const FRT: [number, number] = [x0 + l, y1 - h];
  const FLT: [number, number] = [x0, y1 - h];
  const o = (p: [number, number]): [number, number] => [p[0] + dx, p[1] + dy];
  return (
    <g>
      <polygon points={pts(FLB, FRB, FRT, FLT)} {...solid} fill={FILL} />
      <polygon points={pts(FLT, FRT, o(FRT), o(FLT))} {...solid} fill={FILL2} />
      <polygon points={pts(FRB, o(FRB), o(FRT), FRT)} {...solid} fill={FILL} />
      <polyline points={pts(FLB, o(FLB), o(FRB))} {...hidden} />
      <line x1={o(FLB)[0]} y1={o(FLB)[1]} x2={o(FLT)[0]} y2={o(FLT)[1]} {...hidden} />
      {hole && (
        <g>
          <circle cx={x0 + l / 2} cy={y1 - h / 2} r={Math.min(l, h) * 0.28} {...solid} fill="rgb(var(--surface))" />
          <circle cx={x0 + l / 2 + dx} cy={y1 - h / 2 + dy} r={Math.min(l, h) * 0.28} {...hidden} />
          {lbl.r && (
            <g>
              <line x1={x0 + l / 2} y1={y1 - h / 2} x2={x0 + l / 2 + Math.min(l, h) * 0.28} y2={y1 - h / 2} {...dimLine} />
              <L x={x0 + l / 2 + Math.min(l, h) * 0.14} y={y1 - h / 2 - 12} t={lbl.r} />
            </g>
          )}
        </g>
      )}
      <L x={x0 + l / 2} y={y1 + 16} t={hole ? lbl.w : lbl.l} />
      <L x={x0 - 10} y={y1 - h / 2} t={lbl.h} anchor="end" />
      <L x={FRB[0] + dx / 2 + 14} y={FRB[1] + dy / 2 + 8} t={hole ? lbl.l : lbl.w} anchor="start" />
    </g>
  );
}

function Shape({ fig }: { fig: SolidSpec }) {
  const lbl = fig.labels;
  switch (fig.shape) {
    case 'rectPrism':
      return <Prism l={180} w={70} h={115} lbl={lbl} />;
    case 'cube':
      return <Prism l={130} w={80} h={130} lbl={lbl} />;
    case 'prismCylinderHole':
      return <Prism l={150} w={90} h={120} lbl={lbl} hole />;
    case 'triPrism': {
      const P0: [number, number] = [55, 220];
      const P1: [number, number] = [55, 100];
      const P2: [number, number] = [165, 220];
      const d: [number, number] = [130, -55];
      const o = (p: [number, number]): [number, number] => [p[0] + d[0], p[1] + d[1]];
      return (
        <g>
          <polygon points={pts(P1, o(P1), o(P2), P2)} {...solid} fill={FILL2} />
          <polygon points={pts(P0, P1, P2)} {...solid} fill={FILL} />
          <polyline points={pts(P0, o(P0), o(P1))} {...hidden} />
          <line x1={o(P0)[0]} y1={o(P0)[1]} x2={o(P2)[0]} y2={o(P2)[1]} {...hidden} />
          <polyline points={pts([P0[0] + 12, P0[1]], [P0[0] + 12, P0[1] - 12], [P0[0], P0[1] - 12])} fill="none" stroke={INK} strokeWidth={1.2} />
          <L x={P0[0] - 10} y={(P0[1] + P1[1]) / 2} t={lbl.a} anchor="end" />
          <L x={(P0[0] + P2[0]) / 2} y={P0[1] + 16} t={lbl.b} />
          <L x={(P1[0] + P2[0]) / 2 - 10} y={(P1[1] + P2[1]) / 2 + 2} t={lbl.c} anchor="end" />
          <L x={(P2[0] + o(P2)[0]) / 2 + 14} y={(P2[1] + o(P2)[1]) / 2 + 10} t={lbl.l} anchor="start" />
        </g>
      );
    }
    case 'cylinder': {
      const cx = 170;
      const rx = 80;
      const ry = 20;
      const top = 55;
      const bot = 210;
      return (
        <g>
          <path d={`M${cx - rx},${top} L${cx - rx},${bot} A${rx},${ry} 0 0 0 ${cx + rx},${bot} L${cx + rx},${top}`} {...solid} fill={FILL} />
          <Ellipse cx={cx} cy={bot} rx={rx} ry={ry} backDashed />
          <ellipse cx={cx} cy={top} rx={rx} ry={ry} {...solid} fill={FILL2} />
          {radiusLabels(lbl, cx, top, rx)}
          <L x={cx + rx + 12} y={(top + bot) / 2} t={lbl.h} anchor="start" />
        </g>
      );
    }
    case 'cone': {
      const cx = 170;
      const rx = 88;
      const ry = 22;
      const apex: [number, number] = [cx, 30];
      const base = 205;
      return (
        <g>
          <path d={`M${cx - rx},${base} L${apex[0]},${apex[1]} L${cx + rx},${base} A${rx},${ry} 0 0 1 ${cx - rx},${base}`} {...solid} fill={FILL} />
          <Ellipse cx={cx} cy={base} rx={rx} ry={ry} backDashed />
          {lbl.h && (
            <g>
              <line x1={apex[0]} y1={apex[1]} x2={cx} y2={base} {...dimLine} />
              <polyline points={pts([cx, base - 10], [cx + 10, base - 10], [cx + 10, base])} fill="none" stroke={DIM} strokeWidth={1.2} />
              <L x={cx - 10} y={(apex[1] + base) / 2 + 10} t={lbl.h} anchor="end" />
            </g>
          )}
          <L x={(apex[0] + cx + rx) / 2 + 16} y={(apex[1] + base) / 2 - 4} t={lbl.s} anchor="start" />
          {radiusLabels(lbl, cx, base, rx, false)}
        </g>
      );
    }
    case 'sphere': {
      const cx = 170;
      const cy = 130;
      const r = 95;
      return (
        <g>
          <circle cx={cx} cy={cy} r={r} {...solid} fill={FILL} />
          <Ellipse cx={cx} cy={cy} rx={r} ry={22} backDashed />
          {radiusLabels(lbl, cx, cy, r)}
        </g>
      );
    }
    case 'hemisphere': {
      const cx = 170;
      const cy = 175;
      const r = 100;
      return (
        <g>
          <path d={`M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy} A${r},24 0 0 1 ${cx - r},${cy}`} {...solid} fill={FILL} />
          <Ellipse cx={cx} cy={cy} rx={r} ry={24} backDashed />
          {radiusLabels(lbl, cx, cy, r, false)}
        </g>
      );
    }
    case 'squarePyramid':
    case 'rectPyramid': {
      const rect = fig.shape === 'rectPyramid';
      const FL: [number, number] = [55, 215];
      const FR: [number, number] = [rect ? 235 : 215, 215];
      const d: [number, number] = rect ? [70, -42] : [60, -40];
      const BL: [number, number] = [FL[0] + d[0], FL[1] + d[1]];
      const BR: [number, number] = [FR[0] + d[0], FR[1] + d[1]];
      const C: [number, number] = [(FL[0] + BR[0]) / 2, (FL[1] + BR[1]) / 2];
      const A: [number, number] = [C[0], 35];
      const mF: [number, number] = [(FL[0] + FR[0]) / 2, FL[1]];
      const mR: [number, number] = [(FR[0] + BR[0]) / 2, (FR[1] + BR[1]) / 2];
      return (
        <g>
          <polygon points={pts(FL, FR, A)} {...solid} fill={FILL} />
          <polygon points={pts(FR, BR, A)} {...solid} fill={FILL2} />
          <polyline points={pts(FL, BL, BR)} {...hidden} />
          <line x1={BL[0]} y1={BL[1]} x2={A[0]} y2={A[1]} {...hidden} />
          {lbl.h && (
            <g>
              <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} {...dimLine} />
              <L x={C[0] + 10} y={(A[1] + C[1]) / 2 + 12} t={lbl.h} anchor="start" />
            </g>
          )}
          {lbl.s && (
            <g>
              <line x1={A[0]} y1={A[1]} x2={mF[0]} y2={mF[1]} {...dimLine} />
              <L x={(A[0] + mF[0]) / 2 - 12} y={(A[1] + mF[1]) / 2} t={lbl.s} anchor="end" />
            </g>
          )}
          {lbl.s2 && (
            <g>
              <line x1={A[0]} y1={A[1]} x2={mR[0]} y2={mR[1]} {...dimLine} />
              <L x={(A[0] + mR[0]) / 2 + 14} y={(A[1] + mR[1]) / 2} t={lbl.s2} anchor="start" />
            </g>
          )}
          <L x={mF[0]} y={FL[1] + 16} t={lbl.b ?? lbl.l} />
          <L x={mR[0] + 14} y={mR[1] + 10} t={lbl.w} anchor="start" />
        </g>
      );
    }
    case 'cylinderCone': {
      const cx = 170;
      const rx = 70;
      const ry = 18;
      const top = 115;
      const bot = 225;
      const apex: [number, number] = [cx, 30];
      return (
        <g>
          <path d={`M${cx - rx},${top} L${cx - rx},${bot} A${rx},${ry} 0 0 0 ${cx + rx},${bot} L${cx + rx},${top}`} {...solid} fill={FILL} />
          <Ellipse cx={cx} cy={bot} rx={rx} ry={ry} backDashed />
          <path d={`M${cx - rx},${top} L${apex[0]},${apex[1]} L${cx + rx},${top} A${rx},${ry} 0 0 1 ${cx - rx},${top}`} {...solid} fill={FILL2} />
          <Ellipse cx={cx} cy={top} rx={rx} ry={ry} backDashed />
          <line x1={apex[0]} y1={apex[1]} x2={cx} y2={top} {...dimLine} />
          <L x={cx - 8} y={(apex[1] + top) / 2 + 8} t={lbl.h2} anchor="end" />
          <L x={cx + rx + 12} y={(top + bot) / 2} t={lbl.h} anchor="start" />
          {radiusLabels(lbl, cx, bot, rx, false)}
        </g>
      );
    }
    case 'cylinderHemisphere': {
      const cx = 170;
      const r = 70;
      const top = 115;
      const bot = 230;
      return (
        <g>
          <path d={`M${cx - r},${top} L${cx - r},${bot} A${r},18 0 0 0 ${cx + r},${bot} L${cx + r},${top}`} {...solid} fill={FILL} />
          <Ellipse cx={cx} cy={bot} rx={r} ry={18} backDashed />
          <path d={`M${cx - r},${top} A${r},${r} 0 0 1 ${cx + r},${top}`} {...solid} fill={FILL2} />
          <Ellipse cx={cx} cy={top} rx={r} ry={18} backDashed />
          <L x={cx + r + 12} y={(top + bot) / 2} t={lbl.h} anchor="start" />
          {radiusLabels(lbl, cx, bot, r, false)}
        </g>
      );
    }
    case 'capsule': {
      const y = 130;
      const r = 48;
      const x1 = 110;
      const x2 = 240;
      return (
        <g>
          <path d={`M${x1},${y - r} L${x2},${y - r} A${r},${r} 0 0 1 ${x2},${y + r} L${x1},${y + r} A${r},${r} 0 0 1 ${x1},${y - r}`} {...solid} fill={FILL} />
          <path d={`M${x1},${y - r} A14,${r} 0 0 1 ${x1},${y + r}`} {...hidden} />
          <path d={`M${x2},${y - r} A14,${r} 0 0 1 ${x2},${y + r}`} {...hidden} />
          <line x1={x1} y1={y + r + 14} x2={x2} y2={y + r + 14} {...dimLine} />
          <L x={(x1 + x2) / 2} y={y + r + 30} t={lbl.h} />
          {lbl.r && (
            <g>
              <line x1={x2} y1={y} x2={x2 + r} y2={y} {...dimLine} />
              <L x={x2 + r / 2} y={y - 12} t={lbl.r} />
            </g>
          )}
        </g>
      );
    }
    case 'coneHemisphere': {
      const cx = 170;
      const r = 62;
      const y = 100;
      const apex: [number, number] = [cx, 240];
      return (
        <g>
          <path d={`M${cx - r},${y} L${apex[0]},${apex[1]} L${cx + r},${y}`} {...solid} fill={FILL} />
          <path d={`M${cx - r},${y} A${r},${r} 0 0 1 ${cx + r},${y}`} {...solid} fill={FILL2} />
          <Ellipse cx={cx} cy={y} rx={r} ry={15} backDashed />
          <line x1={cx} y1={y} x2={apex[0]} y2={apex[1]} {...dimLine} />
          <L x={cx + 10} y={(y + apex[1]) / 2 + 10} t={lbl.h} anchor="start" />
          {radiusLabels(lbl, cx, y, r)}
        </g>
      );
    }
    case 'cubePyramid': {
      const FL: [number, number] = [85, 240];
      const s = 120;
      const d: [number, number] = [55, -38];
      const FLT: [number, number] = [FL[0], FL[1] - s];
      const FRT: [number, number] = [FL[0] + s, FL[1] - s];
      const FRB: [number, number] = [FL[0] + s, FL[1]];
      const o = (p: [number, number]): [number, number] => [p[0] + d[0], p[1] + d[1]];
      const C: [number, number] = [(FLT[0] + o(FRT)[0]) / 2, (FLT[1] + o(FRT)[1]) / 2];
      const A: [number, number] = [C[0], 18];
      const mF: [number, number] = [(FLT[0] + FRT[0]) / 2, FLT[1]];
      return (
        <g>
          <polygon points={pts(FL, FRB, FRT, FLT)} {...solid} fill={FILL} />
          <polygon points={pts(FRB, o(FRB), o(FRT), FRT)} {...solid} fill={FILL2} />
          <polyline points={pts(FL, o(FL), o(FRB))} {...hidden} />
          <line x1={o(FL)[0]} y1={o(FL)[1]} x2={o(FLT)[0]} y2={o(FLT)[1]} {...hidden} />
          <polygon points={pts(FLT, FRT, A)} {...solid} fill={FILL2} />
          <polygon points={pts(FRT, o(FRT), A)} {...solid} fill={FILL} />
          <line x1={o(FLT)[0]} y1={o(FLT)[1]} x2={A[0]} y2={A[1]} {...hidden} />
          <polyline points={pts(FLT, o(FLT), o(FRT))} {...hidden} />
          {lbl.s && (
            <g>
              <line x1={A[0]} y1={A[1]} x2={mF[0]} y2={mF[1]} {...dimLine} />
              <L x={(A[0] + mF[0]) / 2 - 12} y={(A[1] + mF[1]) / 2} t={lbl.s} anchor="end" />
            </g>
          )}
          <L x={FL[0] + s / 2} y={FL[1] + 16} t={lbl.b} />
        </g>
      );
    }
  }
}

export function SolidFigure({ fig }: { fig: SolidSpec }) {
  return (
    <svg viewBox="0 0 360 265" className="figure-svg mx-auto h-auto w-full max-w-[380px]" role="img" aria-label={`${fig.shape} diagram`}>
      <Shape fig={fig} />
    </svg>
  );
}
