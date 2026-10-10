import { BookOpen, ClipboardCheck, FileText, GraduationCap, Notebook, PencilLine, Target, Video } from 'lucide-react';
import type { AssignmentType } from '@engine/assemble.ts';
import { cn } from '@/lib/cn.ts';

const ICONS: Record<AssignmentType, typeof BookOpen> = {
  lesson: BookOpen,
  video: Video,
  reading: FileText,
  practice: Target,
  classwork: PencilLine,
  homework: Notebook,
  quiz: ClipboardCheck,
  exam: GraduationCap,
};

const TONES: Record<AssignmentType, string> = {
  lesson: 'bg-info-soft text-info-ink',
  video: 'bg-info-soft text-info-ink',
  reading: 'bg-info-soft text-info-ink',
  practice: 'bg-brand-50 text-brand-700',
  classwork: 'bg-brand-50 text-brand-700',
  homework: 'bg-brand-50 text-brand-700',
  quiz: 'bg-warn-soft text-warn-ink',
  exam: 'bg-bad-soft text-bad-ink',
};

export function TypeIcon({ type, className }: { type: AssignmentType; className?: string }) {
  const Icon = ICONS[type];
  return (
    <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', TONES[type], className)}>
      <Icon className="h-5 w-5" />
    </span>
  );
}
