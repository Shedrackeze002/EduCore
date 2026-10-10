import { useClasses } from '@/data/hooks.ts';

/** Students see their first active class (multi-class students can switch on the Learn page). */
export function useStudentClass() {
  const q = useClasses();
  const cls = q.data?.[0] ?? null;
  return { cls, classes: q.data ?? [], isLoading: q.isLoading };
}
