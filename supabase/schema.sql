-- FUSION 24 - minimal schema for auth + dashboards
-- Run in Supabase SQL editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.trainers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialty text not null,
  experience_years int,
  bio text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.member_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  plan_name text not null default 'Pro',
  status text not null default 'active',
  renewal_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  visited_at timestamptz not null default now()
);

-- Auto-create profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', null), 'member')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.trainers enable row level security;
alter table public.member_memberships enable row level security;
alter table public.visits enable row level security;

-- Helpers
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- profiles policies
drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own"
on public.profiles for select
using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
on public.profiles for update
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

drop policy if exists "profiles admin insert" on public.profiles;
create policy "profiles admin insert"
on public.profiles for insert
with check (public.is_admin());

drop policy if exists "profiles admin delete" on public.profiles;
create policy "profiles admin delete"
on public.profiles for delete
using (public.is_admin());

-- trainers policies (public read, admin write)
drop policy if exists "trainers public read" on public.trainers;
create policy "trainers public read"
on public.trainers for select
using (true);

drop policy if exists "trainers admin write" on public.trainers;
create policy "trainers admin write"
on public.trainers for all
using (public.is_admin())
with check (public.is_admin());

-- member_memberships policies
drop policy if exists "memberships read own" on public.member_memberships;
create policy "memberships read own"
on public.member_memberships for select
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "memberships admin write" on public.member_memberships;
create policy "memberships admin write"
on public.member_memberships for all
using (public.is_admin())
with check (public.is_admin());

-- visits policies
drop policy if exists "visits read own" on public.visits;
create policy "visits read own"
on public.visits for select
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "visits admin write" on public.visits;
create policy "visits admin write"
on public.visits for all
using (public.is_admin())
with check (public.is_admin());

