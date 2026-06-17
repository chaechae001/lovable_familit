import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Check, X, Clock, Plus } from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useFamilit } from "@/lib/familit-store";

export const Route = createFileRoute("/app/tasks/$id/dates")({
  head: () => ({ meta: [{ title: "가능한 날짜 고르기 — FAMILIT" }] }),
  component: DatesPage,
});

function DatesPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const task = useFamilit((s) => s.tasks.find((t) => t.id === id));
  const members = useFamilit((s) => s.members);
  const setResp = useFamilit((s) => s.setDateResponse);
  const addOpt = useFamilit((s) => s.addDateOption);
  const confirm = useFamilit((s) => s.confirmDate);
  const [newDate, setNewDate] = useState("");

  if (!task) return <AppLayout><div className="p-8 text-sm">없음</div></AppLayout>;

  const nameOf = (mid: string) => members.find((m) => m.id === mid)?.name ?? "";
  const yesCount = (optId: string) =>
    task.dateResponses.filter((r) => r.optionId === optId && r.response === "yes").length;
  const top = [...task.dateOptions].sort((a, b) => yesCount(b.id) - yesCount(a.id))[0];

  return (
    <AppLayout>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-5 backdrop-blur">
        <button onClick={() => router.history.back()} className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-base font-bold">가능한 날짜 고르기</h1>
      </header>
      <div className="px-5 py-5 pb-32">
        <p className="text-sm text-muted-foreground">가족이 가능한 날짜를 선택하면 가장 좋은 날짜를 쉽게 정할 수 있어요.</p>

        {top && yesCount(top.id) > 0 && (
          <div className="mt-5 rounded-2xl border-2 border-primary bg-primary-soft p-4">
            <p className="text-xs font-semibold text-primary">현재 가장 많이 선택된 날짜</p>
            <p className="mt-1 font-display text-lg font-bold">{top.label}</p>
            <button
              onClick={() => confirm(task.id, top.label)}
              className="mt-3 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
            >
              이 날짜로 확정하기
            </button>
          </div>
        )}

        <ul className="mt-6 space-y-4">
          {task.dateOptions.map((o) => (
            <li key={o.id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-base font-semibold">{o.label}</p>
                <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">선택 {yesCount(o.id)}명</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {members.map((m) => {
                  const r = task.dateResponses.find((x) => x.optionId === o.id && x.memberId === m.id);
                  return (
                    <li key={m.id} className="flex items-center justify-between text-sm">
                      <span>{m.name}</span>
                      <div className="flex gap-1">
                        <Btn active={r?.response === "yes"} onClick={() => setResp(task.id, o.id, m.id, "yes")} icon={Check} label="가능" />
                        <Btn active={r?.response === "no"} onClick={() => setResp(task.id, o.id, m.id, "no")} icon={X} label="어려움" />
                        <Btn active={r?.response === "later"} onClick={() => setResp(task.id, o.id, m.id, "later")} icon={Clock} label="응답 대기" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <p className="text-sm font-semibold">날짜 후보 추가</p>
          <div className="mt-2 flex gap-2">
            <input
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              placeholder="예: 7월 5일 토요일 점심"
              className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm"
            />
            <button
              onClick={() => {
                if (newDate.trim()) {
                  addOpt(task.id, newDate.trim());
                  setNewDate("");
                }
              }}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Btn({ active, onClick, label, icon: Icon }: { active: boolean; onClick: () => void; label: string; icon: typeof Check }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`grid h-8 w-8 place-items-center rounded-full border ${active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
