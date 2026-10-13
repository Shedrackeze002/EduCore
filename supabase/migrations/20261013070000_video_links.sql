-- Explainer videos are built from scripts in the repository and uploaded to EduCore's YouTube
-- channel; an administrator records each video's YouTube id here so lesson pages can show it.
-- Video ids are the script ids (for example m10c-2-1 or m10c-2-1-b).

create table public.video_links (
  video_id text primary key check (video_id ~ '^[a-z0-9-]{3,40}$'),
  youtube_id text not null check (youtube_id ~ '^[A-Za-z0-9_-]{11}$'),
  updated_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.video_links enable row level security;

-- Everyone signed in reads the links (lessons show the videos); only the function below writes.
create policy video_links_read on public.video_links for select to authenticated using (true);

revoke all on public.video_links from anon, authenticated;
grant select on public.video_links to authenticated;

-- An administrator sets a video's YouTube id, or removes it with null. Audited.
create or replace function public.admin_set_video_link(p_video_id text, p_youtube_id text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  perform public.admin_require();
  if p_video_id is null or p_video_id !~ '^[a-z0-9-]{3,40}$' then
    raise exception 'That video was not found.';
  end if;
  if p_youtube_id is null or trim(p_youtube_id) = '' then
    delete from public.video_links where video_id = p_video_id;
    perform public.admin_log('video_link_removed', null, jsonb_build_object('video', p_video_id));
    return;
  end if;
  insert into public.video_links (video_id, youtube_id, updated_by)
  values (p_video_id, trim(p_youtube_id), (select auth.uid()))
  on conflict (video_id) do update set youtube_id = excluded.youtube_id, updated_by = excluded.updated_by, updated_at = now();
  perform public.admin_log('video_link_set', null, jsonb_build_object('video', p_video_id, 'youtube', trim(p_youtube_id)));
end $$;

revoke execute on function public.admin_set_video_link(text, text) from public, anon;
grant execute on function public.admin_set_video_link(text, text) to authenticated;
