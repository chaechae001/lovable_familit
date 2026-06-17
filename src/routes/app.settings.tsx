import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppLayout, AppHeader } from "@/components/AppLayout";
import { useFamilit } from "@/lib/familit-store";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "설정 — FAMILIT" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const reset = useFamilit((s) => s.reset);
  const nav = useNavigate();
  const items = ["가족 그룹 관리", "알림 설정", "개인정보 안내", "데이터 삭제 요청", "문의하기"];
  return (
    <AppLayout>
      <AppHeader title="설정" />
      <ul className="divide-y divide-border border-y border-border bg-surface">
        {items.map((i) => (
          <li key={i} className="px-5 py-4 text-sm">{i}</li>
        ))}
      </ul>
      <div className="px-5 py-6">
        <p className="rounded-2xl bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
          FAMILIT은 가족 일을 정리하고 함께 확인하기 위한 서비스입니다.
          건강 관련 내용은 일정과 준비사항 확인을 돕는 데 집중하며, 의료 판단이나 치료 조언을 제공하지 않습니다.
        </p>
        <button
          onClick={() => {
            reset();
            nav({ to: "/" });
          }}
          className="mt-6 w-full rounded-2xl border border-destructive/40 px-4 py-3 text-sm font-semibold text-destructive"
        >
          데모 데이터 초기화
        </button>
      </div>
    </AppLayout>
  );
}
