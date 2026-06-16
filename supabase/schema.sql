-- =====================================================================
-- Familit – Supabase Schema (MVP)
-- =====================================================================
-- 이 파일을 Supabase Dashboard → SQL Editor 에 붙여넣고 실행하면
-- 베타 신청 + MVP 확장용 기본 테이블이 생성됩니다.
--
-- 보안 원칙
--   1) RLS(Row Level Security)를 모든 테이블에 활성화합니다.
--   2) anon(비로그인) 권한은 beta_signups INSERT 에만 부여합니다.
--   3) MVP 확장 테이블은 가족 그룹 멤버만 접근 가능합니다.
--   4) 건강검진 수치, 진단명, 처방전, 파일은 저장하지 않습니다.
-- =====================================================================

-- ─────────────────────────────────────────────────────────────────────
-- 1) beta_signups : 베타 신청 폼 (랜딩 페이지에서 사용)
-- ─────────────────────────────────────────────────────────────────────
create table if not exists public.beta_signups (
  id uuid primary key default gen_random_uuid(),
  name                        text not null,
  email                       text not null,
  phone                       text,
  age_group                   text,         -- '20s' | '30s' | '40s' | '50s' | '60+'
  lives_separately_from_parents boolean,
  parent_age_group            text,         -- '50s' | '60s' | '70s' | '80+'
  family_member_count         int,
  main_pain_point             text,         -- 자유 선택값 (생신, 명절, 선물, 건강검진, 가족모임...)
  interview_willing           boolean default false,
  source                      text,         -- 어디서 신청했는지 (landing | demo)
  user_agent                  text,
  created_at timestamptz not null default now()
);

create index if not exists beta_signups_email_idx      on public.beta_signups (email);
create index if not exists beta_signups_created_at_idx on public.beta_signups (created_at desc);

grant insert on public.beta_signups to anon;
grant insert on public.beta_signups to authenticated;
grant all    on public.beta_signups to service_role;

alter table public.beta_signups enable row level security;

-- 누구나 신청은 할 수 있지만(INSERT only), 목록 조회는 service_role 만 가능합니다.
drop policy if exists "Anyone can submit beta signup" on public.beta_signups;
create policy "Anyone can submit beta signup"
  on public.beta_signups
  for insert
  to anon, authenticated
  with check (true);

-- ─────────────────────────────────────────────────────────────────────
-- 2) MVP 확장용 테이블
--    가족 그룹 멤버만 자신의 그룹 데이터에 접근할 수 있도록 설계합니다.
-- ─────────────────────────────────────────────────────────────────────

-- 가족 그룹
create table if not exists public.family_groups (
  id uuid primary key default gen_random_uuid(),
  name        text not null,
  created_by  uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

-- 가족 구성원 (그룹 ↔ 사용자 join + 비로그인 부모님 표기용)
create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  group_id    uuid not null references public.family_groups(id) on delete cascade,
  user_id     uuid references auth.users(id) on delete set null,  -- null 이면 비로그인(부모님 등)
  display_name text not null,
  role        text not null default 'child',  -- 'parent' | 'child' | 'sibling' | 'other'
  is_admin    boolean not null default false,
  parent_mode boolean not null default false, -- 부모님 모드(간편 UI) 여부
  created_at  timestamptz not null default now(),
  unique (group_id, user_id)
);

-- 가족 액션 카드
create table if not exists public.action_cards (
  id uuid primary key default gen_random_uuid(),
  group_id    uuid not null references public.family_groups(id) on delete cascade,
  category    text not null,                 -- '생신' | '명절' | '선물' | '건강검진' | '가족모임' | '경조사'
  title       text not null,
  description text,
  due_date    date,
  status      text not null default 'open',  -- 'open' | 'in_progress' | 'done' | 'archived'
  created_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists action_cards_group_idx on public.action_cards (group_id, due_date);

-- 액션 카드별 체크리스트
create table if not exists public.checklist_items (
  id uuid primary key default gen_random_uuid(),
  card_id    uuid not null references public.action_cards(id) on delete cascade,
  label      text not null,
  is_done    boolean not null default false,
  done_by    uuid references auth.users(id) on delete set null,
  done_at    timestamptz,
  position   int not null default 0,
  ai_suggested boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists checklist_items_card_idx on public.checklist_items (card_id, position);

-- 카드 댓글 / 가족 의견
create table if not exists public.card_comments (
  id uuid primary key default gen_random_uuid(),
  card_id    uuid not null references public.action_cards(id) on delete cascade,
  author_id  uuid references auth.users(id) on delete set null,
  author_name text not null,        -- 비로그인 부모님 표기용
  body       text not null,
  created_at timestamptz not null default now()
);

-- 가족 응답 (확인했어요 / 이 날짜가 좋아요 / 이 선물이 좋아요)
create table if not exists public.family_responses (
  id uuid primary key default gen_random_uuid(),
  card_id    uuid not null references public.action_cards(id) on delete cascade,
  member_id  uuid not null references public.family_members(id) on delete cascade,
  response_type  text not null,     -- 'ack' | 'prefer_date' | 'prefer_gift' | 'like' | 'comment'
  response_value text,              -- 자유 텍스트 또는 옵션 ID
  created_at timestamptz not null default now(),
  unique (card_id, member_id, response_type, response_value)
);

-- 선물 후보
create table if not exists public.gift_options (
  id uuid primary key default gen_random_uuid(),
  card_id     uuid not null references public.action_cards(id) on delete cascade,
  name        text not null,
  description text,
  price_range text,                 -- '~3만' | '3~5만' | '5~10만' | '10만+'
  external_url text,
  votes       int not null default 0,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────
-- 3) GRANT / RLS
-- ─────────────────────────────────────────────────────────────────────
grant select, insert, update, delete on
  public.family_groups,
  public.family_members,
  public.action_cards,
  public.checklist_items,
  public.card_comments,
  public.family_responses,
  public.gift_options
to authenticated;

grant all on
  public.family_groups,
  public.family_members,
  public.action_cards,
  public.checklist_items,
  public.card_comments,
  public.family_responses,
  public.gift_options
to service_role;

alter table public.family_groups     enable row level security;
alter table public.family_members    enable row level security;
alter table public.action_cards      enable row level security;
alter table public.checklist_items   enable row level security;
alter table public.card_comments     enable row level security;
alter table public.family_responses  enable row level security;
alter table public.gift_options      enable row level security;

-- 멤버십 확인용 security definer 함수 (RLS 재귀 회피)
create or replace function public.is_group_member(_group_id uuid, _user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.family_members
    where group_id = _group_id and user_id = _user_id
  );
$$;

-- family_groups : 본인이 만든 그룹 + 본인이 멤버인 그룹
drop policy if exists "Members can read their groups"  on public.family_groups;
drop policy if exists "Owner can write their group"    on public.family_groups;
create policy "Members can read their groups"
  on public.family_groups for select to authenticated
  using (created_by = auth.uid() or public.is_group_member(id, auth.uid()));
create policy "Owner can write their group"
  on public.family_groups for all to authenticated
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

-- family_members
drop policy if exists "Members can read group members" on public.family_members;
drop policy if exists "Members can write group members" on public.family_members;
create policy "Members can read group members"
  on public.family_members for select to authenticated
  using (public.is_group_member(group_id, auth.uid()));
create policy "Members can write group members"
  on public.family_members for all to authenticated
  using (public.is_group_member(group_id, auth.uid()))
  with check (public.is_group_member(group_id, auth.uid()));

-- action_cards
drop policy if exists "Members can read cards" on public.action_cards;
drop policy if exists "Members can write cards" on public.action_cards;
create policy "Members can read cards"
  on public.action_cards for select to authenticated
  using (public.is_group_member(group_id, auth.uid()));
create policy "Members can write cards"
  on public.action_cards for all to authenticated
  using (public.is_group_member(group_id, auth.uid()))
  with check (public.is_group_member(group_id, auth.uid()));

-- checklist_items / card_comments / family_responses / gift_options
-- → 카드의 group_id 를 통해 멤버 확인
do $$ begin
  perform 1;
end $$;

drop policy if exists "Members can rw checklist" on public.checklist_items;
create policy "Members can rw checklist"
  on public.checklist_items for all to authenticated
  using (exists (select 1 from public.action_cards c
                 where c.id = card_id and public.is_group_member(c.group_id, auth.uid())))
  with check (exists (select 1 from public.action_cards c
                 where c.id = card_id and public.is_group_member(c.group_id, auth.uid())));

drop policy if exists "Members can rw comments" on public.card_comments;
create policy "Members can rw comments"
  on public.card_comments for all to authenticated
  using (exists (select 1 from public.action_cards c
                 where c.id = card_id and public.is_group_member(c.group_id, auth.uid())))
  with check (exists (select 1 from public.action_cards c
                 where c.id = card_id and public.is_group_member(c.group_id, auth.uid())));

drop policy if exists "Members can rw responses" on public.family_responses;
create policy "Members can rw responses"
  on public.family_responses for all to authenticated
  using (exists (select 1 from public.action_cards c
                 where c.id = card_id and public.is_group_member(c.group_id, auth.uid())))
  with check (exists (select 1 from public.action_cards c
                 where c.id = card_id and public.is_group_member(c.group_id, auth.uid())));

drop policy if exists "Members can rw gifts" on public.gift_options;
create policy "Members can rw gifts"
  on public.gift_options for all to authenticated
  using (exists (select 1 from public.action_cards c
                 where c.id = card_id and public.is_group_member(c.group_id, auth.uid())))
  with check (exists (select 1 from public.action_cards c
                 where c.id = card_id and public.is_group_member(c.group_id, auth.uid())));

-- =====================================================================
-- 끝.
-- =====================================================================
