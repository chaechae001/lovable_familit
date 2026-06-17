import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ListChecks, Users, History, Settings } from "lucide-react";
import type { ReactNode } from "react";

const NAV: Array<{ to: string; label: string; icon: typeof Home; exact?: boolean }> = [
  { to: "/app", label: "홈", icon: Home, exact: true },
  { to: "/app/tasks/new", label: "챙길 일", icon: ListChecks },
  { to: "/app/family", label: "가족", icon: Users },
  { to: "/app/history", label: "기록", icon: History },
  { to: "/app/settings", label: "설정", icon: Settings },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background pb-24 shadow-[0_0_60px_-30px_rgba(0,0,0,0.15)]">
        {children}
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto grid w-full max-w-[440px] grid-cols-5">
          {NAV.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to as "/app"}
                className={`flex flex-col items-center gap-1 py-3 text-[11px] ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function AppHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur">
      <h1 className="font-display text-lg font-bold">{title}</h1>
      {right}
    </header>
  );
}
