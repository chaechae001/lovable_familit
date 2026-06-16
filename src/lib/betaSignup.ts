import { z } from "zod";
import { getSupabase } from "./supabaseClient";

export const betaSignupSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요").max(60),
  email: z.string().trim().email("올바른 이메일을 입력해주세요").max(255),
  phone: z.string().trim().min(1, "연락처를 입력해주세요").max(40),
  age_group: z.enum(["20s", "30s", "40s", "50s", "60+"]),
  lives_separately_from_parents: z.boolean(),
  parent_age_group: z.enum(["50s", "60s", "70s", "80+"]).optional().nullable(),
  family_member_count: z.number().int().min(1).max(20).optional().nullable(),
  main_pain_point: z.string().trim().max(120).optional().nullable(),
  interview_willing: z.boolean().optional().default(false),
  source: z.string().max(40).optional(),
});

export type BetaSignupInput = z.infer<typeof betaSignupSchema>;

export type SubmitResult =
  | { ok: true; mode: "supabase" | "local" }
  | { ok: false; error: string };

export async function submitBetaSignup(
  input: BetaSignupInput,
): Promise<SubmitResult> {
  const parsed = betaSignupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요" };
  }

  const supabase = getSupabase();
  if (!supabase) {
    // 환경변수가 아직 연결되지 않은 상태 → 로컬 데모 모드
    if (typeof window !== "undefined") {
      console.info("[Familit] Supabase 미연결 — 로컬 데모 모드로 처리합니다.", parsed.data);
    }
    return { ok: true, mode: "local" };
  }

  try {
    const payload = {
      ...parsed.data,
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 255) : null,
    };
    const { error } = await supabase.from("beta_signups").insert(payload);
    if (error) {
      console.error("[Familit] beta_signups insert error", error);
      return {
        ok: false,
        error:
          error.message?.includes("permission") || error.code === "42501"
            ? "저장 권한이 없습니다. supabase/schema.sql 를 실행했는지 확인해주세요."
            : "신청 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
      };
    }
    return { ok: true, mode: "supabase" };
  } catch (err) {
    console.error("[Familit] network error", err);
    return { ok: false, error: "네트워크 오류로 신청을 완료하지 못했어요." };
  }
}
