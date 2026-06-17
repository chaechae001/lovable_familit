
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, anon, service_role;

CREATE OR REPLACE FUNCTION private.is_group_member(_group_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ select exists (select 1 from public.family_members where group_id = _group_id and user_id = _user_id); $$;

CREATE OR REPLACE FUNCTION private.is_group_admin(_group_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ select exists (select 1 from public.family_members where group_id = _group_id and user_id = _user_id and is_admin = true); $$;

REVOKE ALL ON FUNCTION private.is_group_member(uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_group_admin(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.is_group_member(uuid, uuid) TO authenticated, anon, service_role;
GRANT EXECUTE ON FUNCTION private.is_group_admin(uuid, uuid) TO authenticated, anon, service_role;

-- Drop ALL policies depending on public.is_group_member first
DROP POLICY IF EXISTS "Members can rw checklist" ON public.checklist_items;
DROP POLICY IF EXISTS "Members can rw comments" ON public.card_comments;
DROP POLICY IF EXISTS "Members can rw responses" ON public.family_responses;
DROP POLICY IF EXISTS "Members can rw gifts" ON public.gift_options;
DROP POLICY IF EXISTS "Members can read their groups" ON public.family_groups;
DROP POLICY IF EXISTS "Members can read group members" ON public.family_members;
DROP POLICY IF EXISTS "Members can write group members" ON public.family_members;
DROP POLICY IF EXISTS "Members can read cards" ON public.action_cards;
DROP POLICY IF EXISTS "Members can write cards" ON public.action_cards;

DROP FUNCTION IF EXISTS public.is_group_member(uuid, uuid);

-- Recreate policies using private.is_group_member
CREATE POLICY "Members can rw checklist" ON public.checklist_items FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.action_cards c WHERE c.id = checklist_items.card_id AND private.is_group_member(c.group_id, auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.action_cards c WHERE c.id = checklist_items.card_id AND private.is_group_member(c.group_id, auth.uid())));

CREATE POLICY "Members can rw comments" ON public.card_comments FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.action_cards c WHERE c.id = card_comments.card_id AND private.is_group_member(c.group_id, auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.action_cards c WHERE c.id = card_comments.card_id AND private.is_group_member(c.group_id, auth.uid())));

CREATE POLICY "Members can rw responses" ON public.family_responses FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.action_cards c WHERE c.id = family_responses.card_id AND private.is_group_member(c.group_id, auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.action_cards c WHERE c.id = family_responses.card_id AND private.is_group_member(c.group_id, auth.uid())));

CREATE POLICY "Members can rw gifts" ON public.gift_options FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.action_cards c WHERE c.id = gift_options.card_id AND private.is_group_member(c.group_id, auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.action_cards c WHERE c.id = gift_options.card_id AND private.is_group_member(c.group_id, auth.uid())));

CREATE POLICY "Members can read their groups" ON public.family_groups FOR SELECT TO authenticated
  USING ((created_by = auth.uid()) OR private.is_group_member(id, auth.uid()));

CREATE POLICY "Members can read group members" ON public.family_members FOR SELECT TO authenticated
  USING (private.is_group_member(group_id, auth.uid()));

CREATE POLICY "Members can read cards" ON public.action_cards FOR SELECT TO authenticated
  USING (private.is_group_member(group_id, auth.uid()));

CREATE POLICY "Members can write cards" ON public.action_cards FOR ALL TO authenticated
  USING (private.is_group_member(group_id, auth.uid()))
  WITH CHECK (private.is_group_member(group_id, auth.uid()));

-- family_members: split write policy to prevent privilege escalation
CREATE POLICY "Creator bootstraps self as member" ON public.family_members FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (SELECT 1 FROM public.family_groups g WHERE g.id = group_id AND g.created_by = auth.uid())
  );

CREATE POLICY "Admins can add members" ON public.family_members FOR INSERT TO authenticated
  WITH CHECK (private.is_group_admin(group_id, auth.uid()));

CREATE POLICY "Admins can update members" ON public.family_members FOR UPDATE TO authenticated
  USING (private.is_group_admin(group_id, auth.uid()))
  WITH CHECK (private.is_group_admin(group_id, auth.uid()));

CREATE POLICY "Admins can delete members" ON public.family_members FOR DELETE TO authenticated
  USING (private.is_group_admin(group_id, auth.uid()));

-- beta_signups: explicit deny SELECT + input validation
DROP POLICY IF EXISTS "Anyone can submit beta signup" ON public.beta_signups;

CREATE POLICY "Anyone can submit beta signup" ON public.beta_signups FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 200
    AND length(trim(email)) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

CREATE POLICY "Block reads of beta signups" ON public.beta_signups
  AS RESTRICTIVE FOR SELECT TO anon, authenticated
  USING (false);
