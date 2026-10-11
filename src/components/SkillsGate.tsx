import type { ReactNode } from 'react';
import { useSkillsReady } from '@/lib/useSkills.ts';
import { PageSpinner } from '@/components/ui/Spinner.tsx';

/** Renders its children once the question generators for these skills have loaded. */
export function SkillsGate({ skillIds, children, fallback }: { skillIds: readonly string[]; children: ReactNode; fallback?: ReactNode }) {
  const state = useSkillsReady(skillIds);
  if (state === 'ready') return <>{children}</>;
  if (state === 'error') return <PageSpinner label="We could not load the questions. Check your connection and reload the page." />;
  return <>{fallback ?? <PageSpinner label="Loading questions…" />}</>;
}
