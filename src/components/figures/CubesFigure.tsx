/** Structures of unit cubes in isometric view, seen from the front right (top, front and right faces visible). */
import type { CubesFigure as CubesSpec } from '@engine/types.ts';

const INK = 'rgb(var(--ink))';
const SURFACE = 'rgb(var(--surface))';
const TINT = 'rgb(var(--series-1))';
const S = 34;
const C = S * Math.cos(Math.PI / 6);

/** x = column (to the right), y = row (toward the front), z = up. */
function proj(x: number, y: number, z: number): [number, number] {
  return [(x - y) * C, (x + y) * (S / 2) - z * S];
}

const pts = (p: Array<[number, number]>) => p.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');

export function CubesFigure({ fig }: { fig: CubesSpec }) {
  const rows = fig.heights.length;
  const cols = Math.max(0, ...fig.heights.map((r) => r.length));
  const cubes: Array<[number, number, number]> = [];
  fig.heights.forEach((r, y) => r.forEach((h, x) => {
    for (let z = 0; z < Math.max(0, Math.floor(h)); z++) cubes.push([x, y, z]);
  }));
  // Farther cubes first, so nearer ones are drawn over them.
  cubes.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2]);

  const corners: Array<[number, number]> = [];
  for (const [x, y, z] of cubes) for (const dx of [0, 1]) for (const dy of [0, 1]) for (const dz of [0, 1]) corners.push(proj(x + dx, y + dy, z + dz));
  const arrowFrom = proj(cols / 2, rows + 1.7, 0);
  const arrowTo = proj(cols / 2, rows + 0.35, 0);
  if (fig.showFront) corners.push([arrowFrom[0] - 34, arrowFrom[1] + 14], arrowTo);
  if (!corners.length) corners.push([0, 0]);
  const pad = 8;
  const minX = Math.min(...corners.map((p) => p[0])) - pad;
  const maxX = Math.max(...corners.map((p) => p[0])) + pad;
  const minY = Math.min(...corners.map((p) => p[1])) - pad;
  const maxY = Math.max(...corners.map((p) => p[1])) + pad;

  const face = (key: string, p: Array<[number, number]>, alpha: number) => (
    <g key={key}>
      <polygon points={pts(p)} fill={SURFACE} />
      <polygon points={pts(p)} fill={TINT} fillOpacity={alpha} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
    </g>
  );
  const count = cubes.length;
  const ang = Math.atan2(arrowTo[1] - arrowFrom[1], arrowTo[0] - arrowFrom[0]);
  const head = (a: number) => [arrowTo[0] - 10 * Math.cos(ang + a), arrowTo[1] - 10 * Math.sin(ang + a)] as [number, number];

  return (
    <svg viewBox={`${minX.toFixed(1)} ${minY.toFixed(1)} ${(maxX - minX).toFixed(1)} ${(maxY - minY).toFixed(1)}`} className="figure-svg mx-auto h-auto w-full" style={{ maxWidth: Math.min(420, maxX - minX + 40) }} role="img" aria-label={fig.caption ?? `A structure of ${count} cube${count === 1 ? '' : 's'}`}>
      {cubes.map(([x, y, z]) => (
        <g key={`${x}-${y}-${z}`}>
          {face('t', [proj(x, y, z + 1), proj(x + 1, y, z + 1), proj(x + 1, y + 1, z + 1), proj(x, y + 1, z + 1)], 0.08)}
          {face('f', [proj(x, y + 1, z), proj(x + 1, y + 1, z), proj(x + 1, y + 1, z + 1), proj(x, y + 1, z + 1)], 0.22)}
          {face('r', [proj(x + 1, y, z), proj(x + 1, y + 1, z), proj(x + 1, y + 1, z + 1), proj(x + 1, y, z + 1)], 0.38)}
        </g>
      ))}
      {fig.showFront && (
        <g>
          <line x1={arrowFrom[0]} y1={arrowFrom[1]} x2={arrowTo[0]} y2={arrowTo[1]} stroke={INK} strokeWidth={2} />
          <polygon points={pts([arrowTo, head(0.45), head(-0.45)])} fill={INK} />
          <text x={arrowFrom[0] - 4} y={arrowFrom[1] + 10} fontSize={13} fontWeight={600} textAnchor="end">
            Front
          </text>
        </g>
      )}
    </svg>
  );
}
