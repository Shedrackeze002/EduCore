/** React Query hooks over the data API. Query keys are centralised in `qk`. */
import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { api } from './index.ts';
import type { AdminUserFilter, Assignment, ClassSettings, ItemRef, PlatformSettings, ProposedAction, Resource, StoredResponse } from './types.ts';

export const qk = {
  me: ['me'] as const,
  classes: ['classes'] as const,
  class: (id: string) => ['class', id] as const,
  roster: (classId: string) => ['roster', classId] as const,
  profile: (id: string) => ['profile', id] as const,
  publications: (classId: string) => ['publications', classId] as const,
  resources: (classId: string) => ['resources', classId] as const,
  assignments: (classId: string) => ['assignments', classId] as const,
  assignment: (id: string) => ['assignment', id] as const,
  submissions: (f: { classId?: string; assignmentId?: string; studentId?: string }) => ['submissions', f.classId ?? '', f.assignmentId ?? '', f.studentId ?? ''] as const,
  submission: (id: string) => ['submission', id] as const,
  mastery: (f: { classId?: string; studentId?: string }) => ['mastery', f.classId ?? '', f.studentId ?? ''] as const,
  events: (classId: string, studentId?: string, sinceDays?: number) => ['events', classId, studentId ?? '', sinceDays ?? 0] as const,
  notifications: ['notifications'] as const,
  announcements: (classId: string) => ['announcements', classId] as const,
  insights: (classId: string, studentId?: string | null) => ['insights', classId, studentId === undefined ? '*' : studentId ?? 'class'] as const,
  aiStatus: ['aiStatus'] as const,
  signupConfig: ['signupConfig'] as const,
  admin: ['admin'] as const,
  adminOverview: ['admin', 'overview'] as const,
  adminUsers: (f: AdminUserFilter) => ['admin', 'users', f.search ?? '', f.role ?? '', f.status ?? '', f.limit ?? 50, f.offset ?? 0] as const,
  adminClasses: (f: { search?: string; offset?: number }) => ['admin', 'classes', f.search ?? '', f.offset ?? 0] as const,
  adminSettings: ['admin', 'settings'] as const,
  adminAudit: (limit: number) => ['admin', 'audit', limit] as const,
};

export function invalidateAll(qc: QueryClient) {
  return qc.invalidateQueries();
}

export const useClasses = () => useQuery({ queryKey: qk.classes, queryFn: () => api().listMyClasses() });
export const useClass = (id: string | undefined) => useQuery({ queryKey: qk.class(id ?? ''), queryFn: () => api().getClass(id!), enabled: !!id });
export const useRoster = (classId: string | undefined) => useQuery({ queryKey: qk.roster(classId ?? ''), queryFn: () => api().listRoster(classId!), enabled: !!classId });
export const useProfile = (id: string | undefined) => useQuery({ queryKey: qk.profile(id ?? ''), queryFn: () => api().getProfile(id!), enabled: !!id });
export const usePublications = (classId: string | undefined) => useQuery({ queryKey: qk.publications(classId ?? ''), queryFn: () => api().listPublications(classId!), enabled: !!classId });
export const useResources = (classId: string | undefined) => useQuery({ queryKey: qk.resources(classId ?? ''), queryFn: () => api().listResources(classId!), enabled: !!classId });
export const useAssignments = (classId: string | undefined) => useQuery({ queryKey: qk.assignments(classId ?? ''), queryFn: () => api().listAssignments(classId!), enabled: !!classId });
export const useAssignment = (id: string | undefined) => useQuery({ queryKey: qk.assignment(id ?? ''), queryFn: () => api().getAssignment(id!), enabled: !!id });
export const useSubmissions = (f: { classId?: string; assignmentId?: string; studentId?: string }, enabled = true) =>
  useQuery({ queryKey: qk.submissions(f), queryFn: () => api().listSubmissions(f), enabled: enabled && !!(f.classId || f.assignmentId || f.studentId) });
export const useSubmission = (id: string | undefined) => useQuery({ queryKey: qk.submission(id ?? ''), queryFn: () => api().getSubmission(id!), enabled: !!id });
export const useMastery = (f: { classId?: string; studentId?: string }, enabled = true) => useQuery({ queryKey: qk.mastery(f), queryFn: () => api().listMastery(f), enabled });
export const useEvents = (classId: string | undefined, studentId?: string, sinceDays?: number) =>
  useQuery({ queryKey: qk.events(classId ?? '', studentId, sinceDays), queryFn: () => api().listEvents({ classId: classId!, studentId, sinceDays }), enabled: !!classId });
export const useNotifications = (enabled = true) => useQuery({ queryKey: qk.notifications, queryFn: () => api().listNotifications(), enabled, refetchInterval: 60_000 });
export const useAnnouncements = (classId: string | undefined) => useQuery({ queryKey: qk.announcements(classId ?? ''), queryFn: () => api().listAnnouncements(classId!), enabled: !!classId });
export const useInsights = (classId: string | undefined, studentId?: string | null) =>
  useQuery({ queryKey: qk.insights(classId ?? '', studentId), queryFn: () => api().listInsights(classId!, studentId), enabled: !!classId });
export const useAiStatus = () => useQuery({ queryKey: qk.aiStatus, queryFn: () => api().aiStatus(), staleTime: 5 * 60_000 });

// ---------------------------------------------------------------- mutations

export function useCreateClass() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (v: { name: string; section?: string | null; courseId: string }) => api().createClass(v), onSuccess: () => qc.invalidateQueries({ queryKey: qk.classes }) });
}

export function useUpdateClass(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: { name?: string; section?: string | null; settings?: Partial<ClassSettings>; archived?: boolean }) => api().updateClass(classId, patch),
    onSuccess: (c) => {
      qc.setQueryData(qk.class(classId), c);
      qc.invalidateQueries({ queryKey: qk.classes });
    },
  });
}

export function useSetPublished(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { lessonId: string; published: boolean }) => api().setPublished(classId, v.lessonId, v.published),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.publications(classId) }),
  });
}

export function useAddResource(classId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (r: Omit<Resource, 'id' | 'createdAt'>) => api().addResource(r), onSuccess: () => qc.invalidateQueries({ queryKey: qk.resources(classId) }) });
}

export function useDeleteResource(classId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api().deleteResource(id), onSuccess: () => qc.invalidateQueries({ queryKey: qk.resources(classId) }) });
}

export function useSaveAssignment(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (a: Partial<Assignment> & { classId: string }) => api().saveAssignment(a),
    onSuccess: (a) => {
      qc.setQueryData(qk.assignment(a.id), a);
      qc.invalidateQueries({ queryKey: qk.assignments(classId) });
    },
  });
}

export function usePublishAssignment(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api().publishAssignment(id),
    onSuccess: (a) => {
      qc.setQueryData(qk.assignment(a.id), a);
      qc.invalidateQueries({ queryKey: qk.assignments(classId) });
    },
  });
}

export function useDeleteAssignment(classId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api().deleteAssignment(id), onSuccess: () => qc.invalidateQueries({ queryKey: qk.assignments(classId) }) });
}

export function useSubmit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { submissionId: string; responses: Record<number, StoredResponse>; items: ItemRef[]; blurCount?: number }) =>
      api().submit(v.submissionId, { responses: v.responses, items: v.items, blurCount: v.blurCount }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['submissions'] });
      qc.invalidateQueries({ queryKey: ['mastery'] });
      qc.invalidateQueries({ queryKey: ['events'] });
      qc.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (ids: string[] | 'all') => api().markNotificationsRead(ids), onSuccess: () => qc.invalidateQueries({ queryKey: qk.notifications }) });
}

export function useGenerateInsight(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (studentId: string | null) => api().generateInsight(classId, studentId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['insights', classId] }),
  });
}

export function useSetActionStatus(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { insightId: string; actionId: string; status: ProposedAction['status'] }) => api().setActionStatus(v.insightId, v.actionId, v.status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['insights', classId] }),
  });
}

// ---------------------------------------------------------------- platform administration

export const useSignupConfig = () => useQuery({ queryKey: qk.signupConfig, queryFn: () => api().signupConfig(), staleTime: 5 * 60_000 });
export const useAdminOverview = () => useQuery({ queryKey: qk.adminOverview, queryFn: () => api().adminOverview() });
export const useAdminUsers = (f: AdminUserFilter) => useQuery({ queryKey: qk.adminUsers(f), queryFn: () => api().adminListUsers(f), placeholderData: (prev) => prev });
export const useAdminClasses = (f: { search?: string; offset?: number }) =>
  useQuery({ queryKey: qk.adminClasses(f), queryFn: () => api().adminListClasses({ ...f, limit: 50 }), placeholderData: (prev) => prev });
export const useAdminSettings = () => useQuery({ queryKey: qk.adminSettings, queryFn: () => api().adminGetSettings() });
export const useAdminAudit = (limit = 100) => useQuery({ queryKey: qk.adminAudit(limit), queryFn: () => api().adminAuditLog(limit) });

/** Any admin change refreshes every admin view (counts, lists and the audit log move together). */
function useAdminMutation<V, R>(fn: (v: V) => Promise<R>) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: fn, onSuccess: () => qc.invalidateQueries({ queryKey: qk.admin }) });
}

export const useSetTeacherStatus = () => useAdminMutation((v: { userId: string; status: 'approved' | 'rejected' | 'pending' }) => api().adminSetTeacherStatus(v.userId, v.status));
export const useSetPlatformAdmin = () => useAdminMutation((v: { userId: string; on: boolean }) => api().adminSetPlatformAdmin(v.userId, v.on));
export const useSetUserDisabled = () => useAdminMutation((v: { userId: string; disabled: boolean }) => api().adminSetUserDisabled(v.userId, v.disabled));
export const useResetPassword = () => useAdminMutation((userId: string) => api().adminResetPassword(userId));
export function useSaveAdminSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<PlatformSettings>) => api().adminSetSettings(patch),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.admin });
      void qc.invalidateQueries({ queryKey: qk.signupConfig });
    },
  });
}
