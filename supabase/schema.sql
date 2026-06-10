-- Phase 3 Supabase schema (run in Supabase SQL editor when enabling accounts).
-- Auth users live in auth.users; these tables extend that for profiles and addresses.
--
-- Order records are NOT stored here — completed orders are written as Sanity `order`
-- documents server-side via the future Paystack webhook + SANITY_TOKEN (see docs/ROADMAP.md).

create table if not exists public.customer_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null default 'Home',
  name text not null,
  address text not null,
  city text not null,
  zip text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists saved_addresses_user_id_idx on public.saved_addresses (user_id);

alter table public.customer_profiles enable row level security;
alter table public.saved_addresses enable row level security;

create policy "Users read own profile"
  on public.customer_profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on public.customer_profiles for update
  using (auth.uid() = id);

create policy "Users manage own addresses"
  on public.saved_addresses for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
