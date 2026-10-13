import { describe, expect, it } from 'vitest';
import { courseIssueBody, courseIssueUrl, isIssueUrl } from './issue.ts';

const req = {
  id: 'cr_1',
  kind: 'course' as const,
  title: 'AP Calculus BC',
  grade: 12,
  details: 'For the AP exam.\nSeries and polar curves too.',
  createdAt: '2026-10-13T10:00:00.000Z',
  requester: { id: 'u1', name: 'Ada Learner', role: 'student' as const },
};

describe('course request issues', () => {
  it('prefills the GitHub new-issue form', () => {
    const url = new URL(courseIssueUrl(req, 'owner/repo'));
    expect(url.origin + url.pathname).toBe('https://github.com/owner/repo/issues/new');
    expect(url.searchParams.get('title')).toBe('Course request: AP Calculus BC');
    expect(url.searchParams.get('labels')).toBe('course-request');
    expect(url.searchParams.get('body')).toContain('> Series and polar curves too.');
  });

  it('never names the person who asked', () => {
    const body = courseIssueBody(req);
    expect(body).toContain('a student on Gradileo');
    expect(body).not.toContain('Ada');
  });

  it('accepts only GitHub issue links', () => {
    expect(isIssueUrl('https://github.com/Shedrackeze002/EduCore/issues/42')).toBe(true);
    expect(isIssueUrl('https://github.com/Shedrackeze002/EduCore/pull/42')).toBe(false);
    expect(isIssueUrl('https://evil.example/issues/42')).toBe(false);
  });
});
