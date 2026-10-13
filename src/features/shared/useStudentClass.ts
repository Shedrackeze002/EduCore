import { useSyncExternalStore } from 'react';
import { getCourse } from '@engine/curriculum/index.ts';
import { useClasses } from '@/data/hooks.ts';
import type { ClassRoom } from '@/data/types.ts';
import { getItem, setItem } from '@/lib/storage.ts';

/** The class a student last chose (students can be in a teacher's class and self-paced courses). */
const KEY = 'educore-student-class';
const listeners = new Set<() => void>();
let chosen = getItem(KEY);

export function chooseStudentClass(classId: string) {
  chosen = classId;
  setItem(KEY, classId);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The student's current class: the one they chose, otherwise their first. */
export function useStudentClass() {
  const q = useClasses();
  const id = useSyncExternalStore(subscribe, () => chosen);
  const classes = q.data ?? [];
  const cls = classes.find((c) => c.id === id) ?? classes[0] ?? null;
  return { cls, classes, isLoading: q.isLoading };
}

/** How a class is named to a student: self-paced sections go by their course. */
export function studentClassName(c: ClassRoom): { title: string; detail: string } {
  const course = getCourse(c.courseId);
  if (c.kind === 'self') return { title: course?.shortTitle ?? c.name, detail: 'Self-paced · AI tutor' };
  return { title: c.name, detail: [c.section, course?.shortTitle].filter(Boolean).join(' · ') };
}
