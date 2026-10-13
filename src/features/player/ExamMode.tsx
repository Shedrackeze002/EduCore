/**
 * Exam mode in the player, when the teacher turns it on: the attempt runs in full screen, leaving
 * it (or switching tabs) is recorded, and with the camera option the camera must stay on. Nothing
 * from the camera is recorded, saved or sent; the student sees a small preview so they know it is on.
 */
import { useEffect, useRef, useState } from 'react';
import { Camera, Lock, Maximize, Send, ShieldCheck } from 'lucide-react';
import type { AssignmentSettings } from '@engine/assemble.ts';
import { exitCount, exitsLeft, type Integrity, type IntegrityEventKind } from '@engine/integrity.ts';
import { Button } from '@/components/ui/index.ts';
import { getItem, removeItem, setItem } from '@/lib/storage.ts';

const fullscreenSupported = () => typeof document !== 'undefined' && !!document.fullscreenEnabled && !!document.documentElement.requestFullscreen;
const inFullscreen = () => typeof document !== 'undefined' && !!document.fullscreenElement;
const activeKey = (submissionId: string) => `educore-exam-${submissionId}`;

/** Forget that this device was in the exam (after submitting). */
export function endExamMode(submissionId: string) {
  removeItem(activeKey(submissionId));
  if (inFullscreen()) void document.exitFullscreen().catch(() => undefined);
}

interface Props {
  submissionId: string;
  settings: AssignmentSettings;
  label: string;
  integrity: Integrity;
  locked: boolean;
  onEvent: (kind: IntegrityEventKind) => void;
  onCameraStarted: () => void;
  onSubmitNow: () => void;
  submitting: boolean;
}

export function ExamMode({ submissionId, settings, label, integrity, locked, onEvent, onCameraStarted, onSubmitNow, submitting }: Props) {
  const supported = fullscreenSupported();
  const [started, setStarted] = useState(false);
  const [fullscreen, setFullscreen] = useState(inFullscreen());
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;
  const startedRef = useRef(false);
  startedRef.current = started;

  // Leaving full screen after starting is an exit.
  useEffect(() => {
    const onChange = () => {
      const now = inFullscreen();
      setFullscreen(now);
      if (!now && startedRef.current) onEventRef.current('fullscreen');
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // The camera preview, and turning the camera off, which is recorded.
  useEffect(() => {
    if (!stream) return;
    if (video.current) video.current.srcObject = stream;
    const tracks = stream.getVideoTracks();
    const onEnded = () => {
      setStream(null);
      onEventRef.current('camera');
    };
    tracks.forEach((t) => t.addEventListener('ended', onEnded));
    return () => tracks.forEach((t) => t.removeEventListener('ended', onEnded));
  }, [stream]);
  useEffect(() => () => stream?.getTracks().forEach((t) => t.stop()), [stream]);

  const startCamera = async (): Promise<boolean> => {
    setCameraError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setStream(s);
      onCameraStarted();
      return true;
    } catch {
      setCameraError('Gradileo could not turn on your camera. Allow camera access for this site in your browser, then try again.');
      return false;
    }
  };

  const enter = async () => {
    if (settings.camera && !stream && !(await startCamera())) return;
    // Coming back to an attempt this device left (a reload or "Save and exit") counts as an exit.
    if (!started && getItem(activeKey(submissionId))) onEvent('fullscreen');
    setItem(activeKey(submissionId), '1');
    if (supported && !inFullscreen()) {
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        /* the browser refused; leaving the tab is still recorded */
      }
    }
    setStarted(true);
    setFullscreen(inFullscreen());
  };

  const left = exitsLeft(settings, integrity);
  const action = settings.onMaxExits === 'submit' ? 'is submitted automatically' : 'locks until your teacher unlocks it';
  const limitText = left === null ? null : `${left} more ${left === 1 ? 'exit' : 'exits'} and the ${label} ${action}.`;

  let gate: React.ReactNode = null;
  if (locked) {
    gate = (
      <Gate icon={<Lock className="h-7 w-7" />} title="This attempt is locked">
        <p>
          You left exam mode {exitCount(integrity)} times. Your teacher can unlock it; this page carries on by itself once they do. You can also submit what you have now.
        </p>
        <Button variant="secondary" loading={submitting} onClick={onSubmitNow} icon={<Send className="h-4 w-4" />}>
          Submit what I have
        </Button>
      </Gate>
    );
  } else if (!started) {
    gate = (
      <Gate icon={<ShieldCheck className="h-7 w-7" />} title="Exam mode">
        <ul className="space-y-1.5 text-left">
          <li>• This {label} {supported ? 'opens in full screen' : 'stays on this page'}. Leaving {supported ? 'full screen or ' : ''}switching to another tab or app is recorded and shown to your teacher.</li>
          {settings.maxExits ? <li>• After {settings.maxExits} {settings.maxExits === 1 ? 'exit' : 'exits'}, the {label} {action}.</li> : null}
          {settings.camera && <li>• Your camera must stay on. Nothing is recorded, saved or sent; your teacher only sees whether it stayed on.</li>}
          {!supported && <li>• This device cannot go full screen, so only leaving the page is recorded.</li>}
        </ul>
        {cameraError && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{cameraError}</p>}
        <Button size="lg" onClick={enter} icon={settings.camera ? <Camera className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}>
          {settings.camera ? 'Turn on camera and start' : supported ? 'Start in full screen' : 'Start'}
        </Button>
      </Gate>
    );
  } else if (settings.camera && !stream) {
    gate = (
      <Gate icon={<Camera className="h-7 w-7" />} title="Your camera is off">
        <p>Turning the camera off was recorded. Turn it back on to carry on. {limitText}</p>
        {cameraError && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{cameraError}</p>}
        <Button size="lg" onClick={() => void startCamera()} icon={<Camera className="h-5 w-5" />}>
          Turn the camera back on
        </Button>
      </Gate>
    );
  } else if (supported && !fullscreen) {
    gate = (
      <Gate icon={<Maximize className="h-7 w-7" />} title="You left full screen">
        <p>This was recorded and your teacher can see it. {limitText}</p>
        <Button size="lg" onClick={enter} icon={<Maximize className="h-5 w-5" />}>
          Return to full screen
        </Button>
      </Gate>
    );
  }

  return (
    <>
      {stream && (
        <video ref={video} autoPlay muted playsInline aria-label="Your camera (not recorded)" className="fixed bottom-24 right-4 z-30 h-20 w-28 rounded-xl border-2 border-surface object-cover shadow-pop" />
      )}
      {gate}
    </>
  );
}

function Gate({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/95 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-labelledby="exam-gate-title">
      <div className="card w-full max-w-lg space-y-4 p-6 text-center text-[15px] text-ink-2">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">{icon}</span>
        <h2 id="exam-gate-title" className="text-xl font-semibold text-ink">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
