import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, AppHeader } from "@/components/AppLayout";
import { useFamilit, CATEGORY_LABEL, type CategoryKey } from "@/lib/familit-store";

export const Route = createFileRoute("/app/history")({
  head: () => ({ meta: [{ title: "완료한 가족 일 — FAMILIT" }] }),
  component: HistoryPage,
});

const FILTERS: Array<{ k: CategoryKey | "all"; label: string }> = [
  { k: "all", label: "전체" },
  { k: "parent_birthday", label: "부모님 생신" },
  { k: "family_gathering", label: "가족 모임" },
  { k: "anniversary", label: "기념일" },
  { k: "health_checkup", label: "건강검진" },
  { k: "gift_preparation", label: "선물 준비" },
];

function HistoryPage() {
  const tasks = useFamilit((s) => s.tasks.filter((t) => t.status === "completed"));
  const members = useFamilit((s) => s.members);
  const [f, setF] = useState<CategoryKey | "all">("all");
  const list = f === "all" ? tasks : tasks.filter((t) => t.category === f);
  return (
    <AppLayout>
      <AppHeader title="완료한 가족 일" />
      <div className="flex gap-1.5 overflow-x-auto px-5 py-3">
        {FILTERS.map((x) => (
          <button
            key={x.k}
            onClick={() => setF(x.k)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${
              f === x.k ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <ul className="space-y-3 px-5 pb-5">
        {list.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
            완료한 가족 일이 아직 없어요.
          </p>
        )}
        {list.map((t) => (
          <li key={t.id} className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-xs font-medium text-primary">{CATEGORY_LABEL[t.category]}</p>
            <p className="mt-1 font-display text-base font-semibold">{t.title}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              완료일: {t.completedAt ? new Date(t.completedAt).toLocaleDateString("ko-KR") : "—"} · 맡은 사람:{" "}
              {t.ownerMemberIds.map((id) => members.find((m) => m.id === id)?.name).filter(Boolean).join(", ") || "—"} ·
              가족 확인 {t.confirmations.filter((c) => c.status === "confirmed").length}명
            </p>
          </li>
        ))}
      </ul>
    </AppLayout>
  );
}
