import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useFamilit, type CategoryKey } from "@/lib/familit-store";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "온보딩 — FAMILIT" }] }),
  component: Onboarding,
});

const OPTIONS: Array<{ key: CategoryKey; label: string }> = [
  { key: "parent_birthday", label: "부모님 생신 준비" },
  { key: "family_gathering", label: "가족 모임 날짜 정하기" },
  { key: "anniversary", label: "기념일 챙기기" },
  { key: "health_checkup", label: "건강검진 일정 확인" },
  { key: "gift_preparation", label: "선물 준비" },
  { key: "custom", label: "기타" },
];

function Onboarding() {
  const setPick = useFamilit((s) => s.setOnboardingPick);
  const nav = useNavigate();
  const [pick, setLocal] = useState<CategoryKey | undefined>(undefined);
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background">
        <header className="flex h-14 items-center justify-between border-b border-border px-5">
          <Link to="/demo" aria-label="뒤로" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-xs font-medium text-muted-foreground">1 / 4</span>
        </header>
        <main className="flex-1 px-6 py-8">
          <h1 className="font-display text-2xl font-bold leading-snug">
            가장 먼저 어떤 가족 일을
            <br />챙기고 싶나요?
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">선택한 내용에 맞춰 첫 화면을 만들어드릴게요.</p>
          <div className="mt-7 space-y-2.5">
            {OPTIONS.map((o) => {
              const sel = pick === o.key;
              return (
                <button
                  key={o.key}
                  onClick={() => setLocal(o.key)}
                  className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold transition ${
                    sel ? "border-primary bg-primary-soft text-primary" : "border-border bg-surface hover:border-primary/40"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </main>
        <div className="sticky bottom-0 border-t border-border bg-background p-5">
          <button
            disabled={!pick}
            onClick={() => {
              setPick(pick);
              nav({ to: "/onboarding/family" });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground disabled:opacity-40"
          >
            다음 <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
