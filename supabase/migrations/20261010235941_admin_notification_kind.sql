-- Administrators and teachers receive "admin" notifications (approval requests and decisions).
alter table public.notifications drop constraint notifications_kind_check;
alter table public.notifications add constraint notifications_kind_check
  check (kind in ('assignment', 'reminder', 'graded', 'announcement', 'insight', 'overdue', 'submission', 'admin'));
