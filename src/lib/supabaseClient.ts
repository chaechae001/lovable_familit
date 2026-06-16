import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Familit 프론트엔드용 Supabase 브라우저 클라이언트.
 *
 * - VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 가 설정되어 있을 때만 활성화됩니다.
 * - 설정이 없으면 `null` 을 반환하므로, 폼은 "로컬 데모 모드" 로 동작합니다.
 * - service_role 키는 절대 사용하지 않습니다.
 */
let _client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (_client !== undefined) return _client;

  const url =
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "";
  const key =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
    "";

  if (!url || !key) {
    _client = null;
    return null;
  }
  _client = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return _client;
}

export const isSupabaseConfigured = () => getSupabase() !== null;
