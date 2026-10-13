/**
 * Skills a student missed on the placement check before starting a self-paced course, kept on
 * this device so the home page can offer practice on them.
 */
import { getItem, removeItem, setItem } from '@/lib/storage.ts';

const key = (classId: string) => `educore-review-${classId}`;

export function saveReviewSkills(classId: string, skillIds: string[]) {
  if (skillIds.length) setItem(key(classId), JSON.stringify(skillIds));
  else removeItem(key(classId));
}

export function reviewSkills(classId: string): string[] {
  try {
    const v = JSON.parse(getItem(key(classId)) ?? '[]');
    return Array.isArray(v) ? v.filter((s): s is string => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

export function clearReviewSkills(classId: string) {
  removeItem(key(classId));
}
