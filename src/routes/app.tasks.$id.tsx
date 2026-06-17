import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, MoreHorizontal, CheckCircle2, Circle, Send, Share2 } from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useFamilit, STATUS_LABEL, CATEGORY_LABEL, dDay } from "@/lib/familit-store";

export const Route = createFileRoute("/app/tasks/$id")({
  head: () => ({ meta: [{ title: "챙길 일 상세 — FAMILIT" }] }),
  component: TaskDetail,
});

function TaskDetail() {
  const { id } = Route.useParams();
  const router = useRouter();
  const task = useFamilit((s) => s.tasks.find((t) => t.id === id));
  const members = useFamilit((s) => s.members);
  const toggleChecklist = useFamilit((s) => s.toggleChecklist);
  const setAssignee = useFamilit((s) => s.setChecklistAssignee);
  const addComment = useFamilit((s) => s.addComment);
  const requestConf = useFamilit((s) => s.requestConfirmations);
  const complete = useFamilit((s) => s.completeTask);
  const [comment, setComment] = useState("");

  if (!task) {
    return (
      <AppLayout>
        <div className="p-8 text-center text-sm text-muted-foreground">
          챙길 일을 찾을 수 없어요.
          <div className="mt-4"><Link to="/app" className="text-primary underline">홈으로</Link></div>
        </div>
      </AppLayout>
    );
  }

  const nameOf = (id?: string) => members.find((m) => m.id === id)?.name ?? "미정";
  const confirmedCount = task.confirmations.filter((c) => c.status === "confirmed").length;
  const totalConf = task.confirmations.length || members.length;

  return (
    <AppLayout>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur">
        <button onClick={() => router.history.back()} className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </header>
      <div className="px-5 pt-4 pb-32">
        <p className="text-xs font-medium text-primary">{CATEGORY_LABEL[task.category]}</p>
        <h1 className="mt-1 font-display text-2xl font-bold leading-snug">{task.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">{STATUS_LABEL[task.status]}</span>
          {task.dueDate && <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{dDay(task.dueDate)}</span>}
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat label="대상 가족" value={task.targetMemberIds.map(nameOf).join(", ") || "—"} />
          <Stat label="맡은 사람" value={task.ownerMemberIds.map(nameOf).join(", ") || "미정"} />
          <Stat label="날짜" value={task.confirmedDate ?? (task.dueDate ? new Date(task.dueDate).toLocaleDateString("ko-KR") : "미정")} />
          <Stat label="확인 상태" value={`${confirmedCount}/${totalConf}명`} />
        </dl>

        {(task.dateOptions.length > 0 || task.category === "family_gathering") && (
          <section className="mt-7">
            <h2 className="font-display text-base font-bold">가능한 날짜</h2>
            <ul className="mt-3 space-y-2">
              {task.dateOptions.map((d) => (
                <li key={d.id} className="rounded-xl border border-border bg-surface px-4 py-3 text-sm">{d.label}</li>
              ))}
              {task.dateOptions.length === 0 && <p className="text-xs text-muted-foreground">아직 날짜 후보가 없어요.</p>}
            </ul>
            <Link
              to="/app/tasks/$id/dates"
              params={{ id: task.id }}
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-border px-4 py-2.5 text-sm font-semibold"
            >
              날짜 고르기 보기
            </Link>
          </section>
        )}

        <section className="mt-7">
          <h2 className="font-display text-base font-bold">AI가 정리한 할 일</h2>
          <ul className="mt-3 space-y-2">
            {task.checklist.map((c) => (
              <li key={c.id} className="flex items-start gap-3 rounded-xl border border-border bg-surface px-3 py-3">
                <button onClick={() => toggleChecklist(task.id, c.id)} aria-label="완료 토글" className="mt-0.5">
                  {c.done ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                </button>
                <div className="flex-1">
                  <p className={`text-sm ${c.done ? "text-muted-foreground line-through" : "font-medium"}`}>{c.text}</p>
                  <select
                    value={c.assigneeId ?? ""}
                    onChange={(e) => setAssignee(task.id, c.id, e.target.value || undefined)}
                    className="mt-1.5 rounded-lg border border-border bg-background px-2 py-1 text-xs"
                  >
                    <option value="">맡은 사람: 미정</option>
                    {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </li>
            ))}
            {task.checklist.length === 0 && <p className="text-xs text-muted-foreground">할 일이 없어요.</p>}
          </ul>
        </section>

        <section className="mt-7">
          <h2 className="font-display text-base font-bold">가족 확인</h2>
          <ul className="mt-3 space-y-2">
            {(task.confirmations.length ? task.confirmations : members.map((m) => ({ memberId: m.id, status: "pending" as const }))).map((c) => (
              <li key={c.memberId} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 text-sm">
                <span>{nameOf(c.memberId)}</span>
                <span className={`text-xs font-medium ${c.status === "confirmed" ? "text-primary" : c.status === "later" ? "text-accent-foreground" : "text-muted-foreground"}`}>
                  {c.status === "confirmed" ? "확인 완료" : c.status === "later" ? "나중에 볼게요" : "확인 대기"}
                </span>
              </li>
            ))}
          </ul>
          <Link
            to="/parent/$shareToken"
            params={{ shareToken: task.shareToken }}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold"
          >
            <Share2 className="h-4 w-4" /> 부모님 간편 확인 화면 열기
          </Link>
        </section>

        <section className="mt-7">
          <h2 className="font-display text-base font-bold">가족 의견</h2>
          <ul className="mt-3 space-y-2">
            {task.comments.map((c) => (
              <li key={c.id} className="rounded-xl border border-border bg-surface px-4 py-3 text-sm">
                <p className="text-xs font-medium text-primary">{nameOf(c.memberId)}</p>
                <p className="mt-1">{c.text}</p>
              </li>
            ))}
            {task.comments.length === 0 && <p className="text-xs text-muted-foreground">아직 의견이 없어요.</p>}
          </ul>
          <div className="mt-3 flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="의견을 남겨주세요."
              className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm"
            />
            <button
              onClick={() => {
                if (comment.trim()) {
                  addComment(task.id, "m_self", comment.trim());
                  setComment("");
                }
              }}
              className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground"
              aria-label="보내기"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>

      <div className="fixed bottom-16 left-1/2 z-30 w-full max-w-[440px] -translate-x-1/2 border-t border-border bg-background p-4">
        <div className="flex gap-2">
          <button
            onClick={() => requestConf(task.id)}
            className="flex-1 rounded-2xl border border-border px-4 py-3 text-sm font-semibold"
          >
            가족에게 확인 요청
          </button>
          <button
            onClick={() => complete(task.id)}
            className="flex-1 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
          >
            완료하기
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
