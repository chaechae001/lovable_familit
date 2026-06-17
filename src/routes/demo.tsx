import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "FAMILIT 서비스 미리보기" },
      { name: "description", content: "FAMILIT MVP를 직접 클릭해보세요." },
    ],
  }),
  component: DemoStart,
});

function DemoStart() {
  const router = useRouter();
  const steps = [
    "가족 만들기",
    "챙길 일 만들기",
    "AI가 정리한 할 일 보기",
    "가족 확인 받기",
    "부모님 화면 보기",
  ];
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background">
        <header className="flex h-14 items-center gap-3 border-b border-border px-5">
          <button onClick={() => router.history.back()} aria-label="뒤로" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="font-display text-base font-bold">FAMILIT 미리보기</span>
        </header>
        <main className="flex-1 px-6 py-10">
          <h1 className="font-display text-2xl font-bold leading-snug">
            FAMILIT은 이렇게 가족 일을 정리합니다.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            부모님 생신, 가족 모임, 기념일, 건강검진처럼
            <br />챙겨야 할 일을 만들고 가족과 함께 확인해보세요.
          </p>
          <ol className="mt-8 space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft font-display text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{s}</span>
              </li>
            ))}
          </ol>
        </main>
        <div className="sticky bottom-0 border-t border-border bg-background p-5">
          <Link
            to="/onboarding"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground"
          >
            미리보기 시작하기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
