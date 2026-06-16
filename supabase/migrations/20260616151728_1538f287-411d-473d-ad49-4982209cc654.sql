revoke execute on function public.is_group_member(uuid, uuid) from public, anon;
grant execute on function public.is_group_member(uuid, uuid) to authenticated, service_role;