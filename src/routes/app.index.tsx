import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Plus, Bell, User } from "lucide-react";
import { AppLayout, AppHeader } from "@/components/AppLayout";
import { useFamilit, STATUS_LABEL, CATEGORY_LABEL, dDay } from "@/lib/familit-store";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "오늘 챙길 일 — FAMILIT" }] }),
  component: HomePage,
});

function HomePage() {
  const tasks = useFamilit((s) => s.tasks);
  const members = useFamilit((s) => s.members);
  const seed = useFamilit((s) => s.seedIfEmpty);
  const hydrated = useFamilit((s) => s.hydrated);
  const nav = useNavigate();

  useEffect(() => {
    if (hydrated) seed();
  }, [hydrated, seed]);

  const active = tasks.filter((t) => t.status !== "completed");
  const waiting = active.filter((t) => t.status === "waiting_family_confirmation").length;
  const mine = active.filter((t) => t.ownerMemberIds.includes("m_self")).length;

  return (
    <AppLayout>
      <AppHeader
        title={`안녕하세요`}
        right={
          <div className="flex items-center gap-1">
            <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"><Bell className="h-5 w-5" /></button>
            <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"><User className="h-5 w-5" /></button>
          </div>
        }
      />
      <div className="px-5 pt-4">
        <p className="text-sm text-muted-foreground">오늘 챙길 가족 일을 확인해보세요.</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <SummaryCard label="오늘 챙길 일" value={active.length} />
          <SummaryCard label="가족 확인 대기" value={waiting} />
          <SummaryCard label="내가 맡은 일" value={mine} />
        </div>
      </div>
      <section className="mt-6 px-5">
        <h2 className="font-display text-lg font-bold">오늘 챙길 가족 일</h2>
        {active.length === 0 && (
          <p className="mt-6 rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
            아직 챙길 일이 없어요. 첫 가족 일을 만들어보세요.
          </p>
        )}
        <ul className="mt-3 space-y-3">
          {active.map((t) => {
            const confirmed = t.confirmations.filter((c) => c.status === "confirmed").length;
            const total = t.confirmations.length || members.length;
            const owners = t.ownerMemberIds
              .map((id) => members.find((m) => m.id === id)?.name)
              .filter(Boolean)
              .join(", ");
            return (
              <li key={t.id}>
                <Link
                  to="/app/tasks/$id"
                  params={{ id: t.id }}
                  className="block rounded-2xl border border-border bg-surface p-4 hover:border-primary"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-primary">{CATEGORY_LABEL[t.category]}</span>
                    <span className="rounded-full bg-background px-2 py-0.5 text-[11px] text-muted-foreground">{dDay(t.dueDate)}</span>
                  </div>
                  <p className="mt-1.5 font-display text-base font-semibold">{t.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>{STATUS_LABEL[t.status]}</span>
                    {owners && <span>· 맡은 사람: {owners}</span>}
                    <span>· 확인 {confirmed}/{total}명</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <button
        onClick={() => nav({ to: "/app/tasks/new" })}
        className="fixed bottom-24 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-cta)]"
      >
        <Plus className="h-4 w-4" /> 챙길 일 만들기
      </button>
    </AppLayout>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-primary">{value}</p>
    </div>
  );
}
