import { useEffect, useState, useSyncExternalStore } from 'react';
import { loadSkills, skillsReady, skillsVersion, subscribeSkills } from '@engine/curriculum/index.ts';

/**
 * Loads the question generators of the courses these skills belong to and re-renders when they
 * arrive. Returns 'ready', 'loading' or 'error' (the download failed; it is retried on the next mount).
 */
export function useSkillsReady(ids: readonly string[]): 'ready' | 'loading' | 'error' {
  useSyncExternalStore(subscribeSkills, skillsVersion, skillsVersion);
  const key = ids.join(',');
  const ready = skillsReady(ids);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (ready) return;
    let live = true;
    setFailed(false);
    loadSkills(key ? key.split(',') : []).catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [key, ready]);
  return ready ? 'ready' : failed ? 'error' : 'loading';
}

/** The skills an assignment or attempt draws questions from (its sections and any generated items). */
export function refSkillIds(content?: { sections: Array<{ skillId: string }> } | null, refs?: ReadonlyArray<{ skillId?: string } | object> | null): string[] {
  const ids = new Set<string>();
  for (const s of content?.sections ?? []) ids.add(s.skillId);
  for (const r of refs ?? []) if ('skillId' in r && typeof r.skillId === 'string') ids.add(r.skillId);
  return [...ids];
}
