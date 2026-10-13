/** One frame of an explainer video, drawn from the frame state; and the video's thumbnail. */
import { BRAND, type DiagramEl, type El, type Explainer, type TriangleEl, type SimilarEl } from '../script.ts';
import type { ElState, FrameState } from '../timeline.ts';
import { DiagramView } from './Diagram.tsx';
import { BulletsView, CalcView, CalloutView, MathView, TableView, TextView, TitleView, TryView } from './elements.tsx';
import { rich, TONES } from './tex.ts';
import { SimilarView, TriangleView } from './Triangle.tsx';

function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" rx="16" fill="#6a43e3" />
      <path d="M18 42 L30 22 L36 32 L42 26 L48 42" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="22" r="3.5" fill="#bcadff" />
    </svg>
  );
}

type Area = 'left' | 'right' | 'main';

/** Width of a split scene's left column, unless the scene sets its own. */
const LEFT = 540;

function ElView({ el, st, area, crowded, leftWidth }: { el: El; st: ElState | undefined; area: Area; crowded: boolean; leftWidth: number }) {
  const center = area !== 'right';
  const fig = area === 'left' ? { w: leftWidth, h: crowded ? 380 : 560 } : { w: 1100, h: crowded ? 340 : 440 };
  switch (el.kind) {
    case 'title':
      return <TitleView el={el} st={st} />;
    case 'text':
      return <TextView el={el} st={st} center={center} />;
    case 'math':
      return <MathView el={el} st={st} center={center} />;
    case 'bullets':
      return <BulletsView el={el} st={st} />;
    case 'callout':
      return <CalloutView el={el} st={st} />;
    case 'table':
      return <TableView el={el} st={st} />;
    case 'triangle':
      return <TriangleView el={el} st={st} {...fig} />;
    case 'similar':
      return <SimilarView el={el} st={st} {...fig} />;
    case 'diagram':
      return <DiagramView el={el} st={st} w={fig.w} h={el.height ?? fig.h} />;
    case 'calc':
      return <CalcView el={el} st={st} />;
    case 'try':
      return <TryView el={el} st={st} />;
  }
}

function Column({ els, state, area, className, leftWidth = LEFT }: { els: El[] | undefined; state: FrameState; area: Area; className: string; leftWidth?: number }) {
  const list = els ?? [];
  return (
    <div className={className}>
      {list.map((el) => (
        <ElView key={el.id} el={el} st={state.els[el.id]} area={area} crowded={list.length > 1} leftWidth={leftWidth} />
      ))}
    </div>
  );
}

export function Stage({ x, state, label }: { x: Explainer; state: FrameState; label: string }) {
  const scene = x.scenes[state.scene];
  return (
    <div className="v-stage">
      <div className="v-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo />
          <span className="v-display" style={{ color: 'rgb(var(--v-ink))', fontSize: 19, fontWeight: 600 }}>
            {BRAND}
          </span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span>{label}</span>
        </div>
        {state.chapter && <div className="v-chapter v-display">{state.chapter}</div>}
      </div>
      <div className="v-body" style={{ opacity: state.fade }}>
        {scene.layout === 'split' ? (
          <div className="v-split" style={scene.leftWidth ? { gridTemplateColumns: `${scene.leftWidth}px minmax(0, 1fr)` } : undefined}>
            <Column els={scene.left} state={state} area="left" className="v-col v-center" leftWidth={scene.leftWidth} />
            <Column els={scene.right} state={state} area="right" className="v-col" />
          </div>
        ) : (
          <Column els={scene.main} state={state} area="main" className="v-col v-center" />
        )}
      </div>
    </div>
  );
}

const FULL: ElState = { p: 1, parts: { answer: 1 }, whole: true, focus: {} };

/** Every element of a scene fully shown (to load fonts before rendering). */
export function fullScene(x: Explainer, si: number): FrameState {
  const s = x.scenes[si];
  const els: Record<string, ElState> = {};
  for (const e of [...(s.main ?? []), ...(s.left ?? []), ...(s.right ?? [])]) els[e.id] = FULL;
  return { scene: si, fade: 1, chapter: s.chapter ?? null, els };
}

export function Thumbnail({ x, label }: { x: Explainer; label: string }) {
  const fig = x.scenes.flatMap((s) => [...(s.left ?? []), ...(s.main ?? [])]).find((e): e is TriangleEl | SimilarEl | DiagramEl => e.kind === 'triangle' || e.kind === 'similar' || e.kind === 'diagram');
  return (
    <div className="v-stage">
      <div style={{ position: 'absolute', left: 80, top: 86, width: fig ? 640 : 1100 }}>
        <div className="v-display" style={{ color: TONES.brand, fontSize: 30, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
          {label}
        </div>
        <h1 className="v-display v-rich" style={{ fontSize: fig ? 88 : 104, lineHeight: 1.04, fontWeight: 800, margin: '22px 0 0' }} dangerouslySetInnerHTML={{ __html: rich(x.thumbnailTitle ?? x.title) }} />
        <div style={{ height: 10, width: 220, marginTop: 34, borderRadius: 5, background: `linear-gradient(90deg, ${TONES.brand}, ${TONES.adj})` }} />
      </div>
      {fig && (
        <div style={{ position: 'absolute', right: 130, top: 110 }}>
          {fig.kind === 'triangle' ? <TriangleView el={fig} st={FULL} w={500} h={480} labelSize={34} /> : fig.kind === 'diagram' ? <DiagramView el={fig} st={FULL} w={500} h={480} /> : <SimilarView el={fig} st={FULL} w={500} h={480} />}
        </div>
      )}
      <div style={{ position: 'absolute', left: 80, bottom: 60, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Logo size={52} />
        <span className="v-display" style={{ fontSize: 36, fontWeight: 700 }}>
          {BRAND}
        </span>
      </div>
    </div>
  );
}
