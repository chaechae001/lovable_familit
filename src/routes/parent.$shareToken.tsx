import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useFamilit } from "@/lib/familit-store";

export const Route = createFileRoute("/parent/$shareToken")({
  head: () => ({ meta: [{ title: "가족 확인 — FAMILIT" }] }),
  component: ParentView,
});

function ParentView() {
  const { shareToken } = Route.useParams();
  const task = useFamilit((s) => s.tasks.find((t) => t.shareToken === shareToken));
  const setResp = useFamilit((s) => s.setDateResponse);
  const setConf = useFamilit((s) => s.setConfirmation);
  const [done, setDone] = useState(false);
  const [later, setLater] = useState(false);
  const [comment, setComment] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  if (!task) {
    return (
      <div className="min-h-screen bg-[var(--surface)] p-6 text-center">
        <p className="mt-20 text-lg">확인할 일을 찾을 수 없어요.</p>
        <Link to="/" className="mt-4 inline-block text-primary underline">처음으로</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[var(--surface)]">
        <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col items-center justify-center bg-background p-8 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-primary">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
          </span>
          <h1 className="mt-6 font-display text-2xl font-bold">확인이 전달되었어요</h1>
          <p className="mt-3 text-base text-muted-foreground">가족에게 응답이 전달되었습니다.</p>
        </div>
      </div>
    );
  }

  if (later) {
    return (
      <div className="min-h-screen bg-[var(--surface)]">
        <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col items-center justify-center bg-background p-8 text-center">
          <h1 className="font-display text-2xl font-bold">나중에 확인할게요</h1>
          <p className="mt-3 text-base text-muted-foreground">언제든 다시 들어와서 응답할 수 있어요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background">
        <header className="border-b border-border px-6 py-5">
          <p className="font-display text-sm font-bold text-primary">FAMILIT</p>
        </header>
        <main className="flex-1 px-6 py-8">
          <p className="text-base text-muted-foreground">오늘 확인할 일</p>
          <h1 className="mt-2 font-display text-[28px] font-bold leading-snug">{task.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            가족들이 가능한 날짜를 모으고 있어요.
            <br />편한 날짜를 선택해주세요.
          </p>

          {task.dateOptions.length > 0 ? (
            <div className="mt-7 space-y-3">
              {task.dateOptions.map((o) => {
                const sel = picked === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => {
                      setPicked(o.id);
                      setResp(task.id, o.id, "m_mom", "yes");
                    }}
                    className={`w-full rounded-2xl border-2 px-5 py-5 text-left text-lg font-semibold leading-snug transition ${
                      sel ? "border-primary bg-primary-soft text-primary" : "border-border bg-surface"
                    }`}
                  >
                    {o.label}이 좋아요
                  </button>
                );
              })}
              <button
                onClick={() => setLater(true)}
                className="w-full rounded-2xl border-2 border-border bg-surface px-5 py-5 text-left text-lg font-semibold text-muted-foreground"
              >
                아직 잘 모르겠어요
              </button>
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border-2 border-border bg-surface p-5">
              <p className="text-lg">{task.title} 확인을 부탁드려요.</p>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm font-semibold">간단 댓글</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="의견을 남겨주세요. 예: 가까운 곳이면 좋아요."
              className="mt-2 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-base"
              rows={3}
            />
          </div>
        </main>
        <div className="sticky bottom-0 border-t border-border bg-background p-5">
          <div className="flex gap-2">
            <button
              onClick={() => setLater(true)}
              className="flex-1 rounded-2xl border-2 border-border px-4 py-5 text-base font-semibold"
            >
              나중에 볼게요
            </button>
            <button
              onClick={() => {
                setConf(task.id, "m_mom", "confirmed", comment || undefined);
                setDone(true);
              }}
              className="flex-[2] rounded-2xl bg-primary px-4 py-5 text-lg font-bold text-primary-foreground"
            >
              확인했어요
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            복잡한 기능은 자녀가 정리합니다. 부모님은 확인만 해주시면 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
