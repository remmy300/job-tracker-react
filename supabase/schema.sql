-- Run this in the Supabase SQL editor for your project.

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  company text not null,
  location text not null default '',
  description text not null default '',
  status text not null default 'Bookmarked'
    check (status in ('Bookmarked', 'Applying', 'Applied', 'Interviewing', 'Negotiating', 'Accepted')),
  max_salary numeric not null default 0,
  excitement smallint not null default 3 check (excitement between 1 and 5),
  date_saved timestamptz not null default now(),
  date_applied timestamptz,
  interview_date timestamptz,
  deadline timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists jobs_user_id_idx on public.jobs (user_id);

alter table public.jobs enable row level security;

create policy "Users can view their own jobs"
  on public.jobs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own jobs"
  on public.jobs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own jobs"
  on public.jobs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own jobs"
  on public.jobs for delete
  using (auth.uid() = user_id);

-- Enable realtime updates for the dashboard's live subscription.
alter publication supabase_realtime add table public.jobs;
