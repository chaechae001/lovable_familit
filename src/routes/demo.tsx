import { createFileRoute, Link } from "@tanstack/react-router";
import FamilitDemo from "@/components/FamilitDemo";
import { FamilitLogo } from "@/components/FamilitLogo";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Familit 서비스 미리보기 — 클릭 가능한 MVP 데모" },
      {
        name: "description",
        content:
          "Familit의 케어보드, 가족 액션 카드, AI 체크리스트, 부모님 간편 응답까지 직접 눌러보세요.",
      },
      { property: "og:title", content: "Familit 서비스 미리보기" },
      {
        property: "og:description",
        content: "가족 케어 운영 앱 Familit의 MVP를 직접 체험해보세요.",
      },
    ],
  }),
  component: DemoPage,
});

function DemoPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2">
            <FamilitLogo size={28} />
            <span className="font-display text-base font-bold tracking-tight">
              Familit · 미리보기
            </span>
          </Link>
          <Link
            to="/"
            className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40"
          >
            ← 랜딩으로
          </Link>
        </div>
      </header>
      <FamilitDemo />
    </div>
  );
}
