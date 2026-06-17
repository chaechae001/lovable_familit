import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, AppHeader } from "@/components/AppLayout";
import { useFamilit } from "@/lib/familit-store";

export const Route = createFileRoute("/app/family")({
  head: () => ({ meta: [{ title: "우리 가족 — FAMILIT" }] }),
  component: FamilyPage,
});

const RELATION_LABEL: Record<string, string> = {
  self: "관리자",
  mother: "부모님",
  father: "부모님",
  sibling: "함께 관리",
  spouse: "함께 관리",
  other: "함께 관리",
};

function FamilyPage() {
  const members = useFamilit((s) => s.members);
  const name = useFamilit((s) => s.familyName);
  return (
    <AppLayout>
      <AppHeader title={name || "우리 가족"} />
      <ul className="space-y-3 px-5 py-5">
        {members.map((m) => (
          <li key={m.id} className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft font-display text-sm font-bold text-primary">
                {m.name.slice(0, 1)}
              </span>
              <div>
                <p className="font-display text-base font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">
                  {RELATION_LABEL[m.relation]}
                  {m.simpleMode && " · 간편 확인 사용 중"}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </AppLayout>
  );
}
