import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFamilit, type FamilyMember } from "@/lib/familit-store";

export const Route = createFileRoute("/onboarding/family")({
  head: () => ({ meta: [{ title: "가족 그룹 만들기 — FAMILIT" }] }),
  component: OnboardingFamily,
});

const RELATIONS: Array<{ k: FamilyMember["relation"]; label: string; role: FamilyMember["role"]; simple: boolean }> = [
  { k: "self", label: "나", role: "admin", simple: false },
  { k: "mother", label: "엄마", role: "parent", simple: true },
  { k: "father", label: "아빠", role: "parent", simple: true },
  { k: "sibling", label: "형제자매", role: "co_manage", simple: false },
  { k: "spouse", label: "배우자", role: "co_manage", simple: false },
  { k: "other", label: "기타 가족", role: "co_manage", simple: false },
];

const uid = () => Math.random().toString(36).slice(2, 10);

function OnboardingFamily() {
  const setFamilyName = useFamilit((s) => s.setFamilyName);
  const setMembers = useFamilit((s) => s.setMembers);
  const seed = useFamilit((s) => s.seedIfEmpty);
  const existing = useFamilit((s) => s.familyName);
  const existingMembers = useFamilit((s) => s.members);
  const nav = useNavigate();
  const [name, setName] = useState(existing);
  const [list, setList] = useState<FamilyMember[]>(existingMembers);

  const addMember = () => {
    setList((l) => [...l, { id: uid(), name: "새 가족", relation: "other", role: "co_manage", simpleMode: false }]);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background">
        <header className="flex h-14 items-center justify-between border-b border-border px-5">
          <Link to="/onboarding" aria-label="뒤로" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-xs font-medium text-muted-foreground">2 / 4</span>
        </header>
        <main className="flex-1 px-6 py-8">
          <h1 className="font-display text-2xl font-bold leading-snug">함께 챙길 가족을 등록해보세요.</h1>
          <div className="mt-6">
            <label className="text-sm font-semibold">가족 이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 우리 가족"
              className="mt-2 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-base focus:border-primary focus:outline-none"
            />
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold">가족 구성원</p>
            <ul className="mt-3 space-y-3">
              {list.map((m, idx) => (
                <li key={m.id} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center gap-2">
                    <input
                      value={m.name}
                      onChange={(e) => {
                        const v = e.target.value;
                        setList((l) => l.map((x, i) => (i === idx ? { ...x, name: v } : x)));
                      }}
                      className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm"
                    />
                    {list.length > 1 && (
                      <button
                        onClick={() => setList((l) => l.filter((_, i) => i !== idx))}
                        className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted"
                        aria-label="삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {RELATIONS.map((r) => (
                      <button
                        key={r.k}
                        onClick={() =>
                          setList((l) =>
                            l.map((x, i) => (i === idx ? { ...x, relation: r.k, role: r.role, simpleMode: r.simple } : x)),
                          )
                        }
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${
                          m.relation === r.k ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                  <label className="mt-3 flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={m.simpleMode}
                      onChange={(e) =>
                        setList((l) => l.map((x, i) => (i === idx ? { ...x, simpleMode: e.target.checked } : x)))
                      }
                    />
                    부모님 간편 확인 사용
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={addMember}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border px-4 py-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Plus className="h-4 w-4" /> 가족 추가
            </button>
          </div>
        </main>
        <div className="sticky bottom-0 flex gap-2 border-t border-border bg-background p-5">
          <button
            onClick={() => nav({ to: "/app" })}
            className="flex-1 rounded-2xl border border-border px-4 py-4 text-sm font-semibold"
          >
            나중에 할게요
          </button>
          <button
            onClick={() => {
              setFamilyName(name || "우리 가족");
              setMembers(list);
              seed();
              nav({ to: "/app" });
            }}
            className="flex-1 rounded-2xl bg-primary px-4 py-4 text-base font-bold text-primary-foreground"
          >
            가족 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
