-- beta_signups
create table if not exists public.beta_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  age_group text,
  lives_separately_from_parents boolean,
  parent_age_group text,
  family_member_count int,
  main_pain_point text,
  interview_willing boolean default false,
  source text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists beta_signups_email_idx on public.beta_signups (email);
create index if not exists beta_signups_created_at_idx on public.beta_signups (created_at desc);
grant insert on public.beta_signups to anon;
grant insert on public.beta_signups to authenticated;
grant all on public.beta_signups to service_role;
alter table public.beta_signups enable row level security;
create policy "Anyone can submit beta signup" on public.beta_signups
  for insert to anon, authenticated with check (true);

-- family_groups
create table if not exists public.family_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- family_members
create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.family_groups(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  display_name text not null,
  role text not null default 'child',
  is_admin boolean not null default false,
  parent_mode boolean not null default false,
  created_at timestamptz not null default now(),
  unique (group_id, user_id)
);

-- action_cards
create table if not exists public.action_cards (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.family_groups(id) on delete cascade,
  category text not null,
  title text not null,
  description text,
  due_date date,
  status text not null default 'open',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists action_cards_group_idx on public.action_cards (group_id, due_date);

-- checklist_items
create table if not exists public.checklist_items (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.action_cards(id) on delete cascade,
  label text not null,
  is_done boolean not null default false,
  done_by uuid references auth.users(id) on delete set null,
  done_at timestamptz,
  position int not null default 0,
  ai_suggested boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists checklist_items_card_idx on public.checklist_items (card_id, position);

-- card_comments
create table if not exists public.card_comments (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.action_cards(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- family_responses
create table if not exists public.family_responses (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.action_cards(id) on delete cascade,
  member_id uuid not null references public.family_members(id) on delete cascade,
  response_type text not null,
  response_value text,
  created_at timestamptz not null default now(),
  unique (card_id, member_id, response_type, response_value)
);

-- gift_options
create table if not exists public.gift_options (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.action_cards(id) on delete cascade,
  name text not null,
  description text,
  price_range text,
  external_url text,
  votes int not null default 0,
  created_at timestamptz not null default now()
);

-- GRANTs
grant select, insert, update, delete on
  public.family_groups, public.family_members, public.action_cards,
  public.checklist_items, public.card_comments, public.family_responses,
  public.gift_options
to authenticated;
grant all on
  public.family_groups, public.family_members, public.action_cards,
  public.checklist_items, public.card_comments, public.family_responses,
  public.gift_options
to service_role;

alter table public.family_groups enable row level security;
alter table public.family_members enable row level security;
alter table public.action_cards enable row level security;
alter table public.checklist_items enable row level security;
alter table public.card_comments enable row level security;
alter table public.family_responses enable row level security;
alter table public.gift_options enable row level security;

create or replace function public.is_group_member(_group_id uuid, _user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.family_members where group_id = _group_id and user_id = _user_id);
$$;

create policy "Members can read their groups" on public.family_groups
  for select to authenticated
  using (created_by = auth.uid() or public.is_group_member(id, auth.uid()));
create policy "Owner can write their group" on public.family_groups
  for all to authenticated
  using (created_by = auth.uid()) with check (created_by = auth.uid());

create policy "Members can read group members" on public.family_members
  for select to authenticated using (public.is_group_member(group_id, auth.uid()));
create policy "Members can write group members" on public.family_members
  for all to authenticated
  using (public.is_group_member(group_id, auth.uid()))
  with check (public.is_group_member(group_id, auth.uid()));

create policy "Members can read cards" on public.action_cards
  for select to authenticated using (public.is_group_member(group_id, auth.uid()));
create policy "Members can write cards" on public.action_cards
  for all to authenticated
  using (public.is_group_member(group_id, auth.uid()))
  with check (public.is_group_member(group_id, auth.uid()));

create policy "Members can rw checklist" on public.checklist_items
  for all to authenticated
  using (exists (select 1 from public.action_cards c where c.id = card_id and public.is_group_member(c.group_id, auth.uid())))
  with check (exists (select 1 from public.action_cards c where c.id = card_id and public.is_group_member(c.group_id, auth.uid())));

create policy "Members can rw comments" on public.card_comments
  for all to authenticated
  using (exists (select 1 from public.action_cards c where c.id = card_id and public.is_group_member(c.group_id, auth.uid())))
  with check (exists (select 1 from public.action_cards c where c.id = card_id and public.is_group_member(c.group_id, auth.uid())));

create policy "Members can rw responses" on public.family_responses
  for all to authenticated
  using (exists (select 1 from public.action_cards c where c.id = card_id and public.is_group_member(c.group_id, auth.uid())))
  with check (exists (select 1 from public.action_cards c where c.id = card_id and public.is_group_member(c.group_id, auth.uid())));

create policy "Members can rw gifts" on public.gift_options
  for all to authenticated
  using (exists (select 1 from public.action_cards c where c.id = card_id and public.is_group_member(c.group_id, auth.uid())))
  with check (exists (select 1 from public.action_cards c where c.id = card_id and public.is_group_member(c.group_id, auth.uid())));