-- Restrict UPDATE on family_members to non-privileged columns to prevent
-- admins from escalating is_admin / parent_mode on themselves or others.
REVOKE UPDATE ON public.family_members FROM authenticated;
GRANT UPDATE (display_name, role) ON public.family_members TO authenticated;