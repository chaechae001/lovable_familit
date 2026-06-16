// Re-export the auto-generated Lovable Cloud Supabase client.
// Do not create a separate client — keeps a single auth/session instance.
import { supabase } from "@/integrations/supabase/client";

export function getSupabase() {
  return supabase;
}

export const isSupabaseConfigured = () => true;
