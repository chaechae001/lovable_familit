import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import {
  useFamilit,
  AI_TEMPLATES,
  CATEGORY_LABEL,
  type CategoryKey,
  type ChecklistItem,
  type Confirmation,
  type DateOption,
} from "@/lib/familit-store";

export const Route = createFileRoute("/app/tasks/new")({
  head: () => ({ meta: [{ title: "챙길 일 만들기 — FAMILIT" }] }),
  component: NewTask,
});

const uid = () => Math.random().toString(36).slice(2, 10);
const CATS: CategoryKey[] = ["parent_birthday", "family_gathering", "anniversary", "health_checkup", "gift_preparation", "custom"];

function NewTask() {
  const router = useRouter();
  const nav = useNavigate();
  const members = useFamilit((s) => s.members);
  const pick = useFamilit((s) => s.onboardingPick);
  const addTask = useFamilit((s) => s.addTask);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryKey>(pick ?? "parent_birthday");
  const [targets, setTargets] = useState<string[]>([]);
  const [owners, setOwners] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<string>("");
  const [tbd, setTbd] = useState(false);
  const [dates, setDates] = useState<DateOption[]>([]);
  const [newDate, setNewDate] = useState("");
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [requestConfirm, setRequestConfirm] = useState<string[]>([]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const generateChecklist = () => {
    setChecklist(AI_TEMPLATES[category].map((text) => ({ id: uid(), text, done: false })));
  };

  const save = () => {
    if (!title.trim()) return;
    const confirmations: Confirmation[] = requestConfirm.map((id) => ({ memberId: id, status: "pending" }));
    const id = addTask({
      title: title.trim(),
      category,
      targetMemberIds: targets,
      ownerMemberIds: owners,
      dueDate: tbd || !dueDate ? undefined : new Date(dueDate).toISOString(),
      status: requestConfirm.length ? "waiting_family_confirmation" : "preparing",
      dateOptions: dates,
      dateResponses: [],
      checklist,
      confirmations,
      comments: [],
    });
    nav({ to: "/app/tasks/$id", params: { id } });
  };

  return (
    <AppLayout>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-5 backdrop-blur">
        <button onClick={() => router.history.back()} className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-base font-bold">챙길 일 만들기</h1>
      </header>
      <div className="space-y-6 px-5 py-5">
        <Field label="제목">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 엄마 생신 준비하기"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 focus:border-primary focus:outline-none"
          />
        </Field>

        <Field label="분류">
          <div className="flex flex-wrap gap-1.5">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  category === c ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground"
                }`}
              >
                {CATEGORY_LABEL[c]}
              </button>
            ))}
          </div>
        </Field>

        <Field label="대상 가족">
          <div className="flex flex-wrap gap-1.5">
            {members.map((m) => (
              <button
                key={m.id}
                onClick={() => toggle(targets, m.id, setTargets)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  targets.includes(m.id) ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </Field>

        <Field label="날짜 또는 마감일">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="date"
              value={dueDate}
              disabled={tbd}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-xl border border-border bg-surface px-3 py-2 text-sm disabled:opacity-50"
            />
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={tbd} onChange={(e) => setTbd(e.target.checked)} /> 아직 미정
            </label>
          </div>
        </Field>

        <Field label="가능한 날짜 후보">
          <div className="space-y-2">
            {dates.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 text-sm">
                <span>{d.label}</span>
                <button onClick={() => setDates(dates.filter((x) => x.id !== d.id))} aria-label="삭제">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="예: 6월 22일 일요일 점심"
                className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm"
              />
              <button
                onClick={() => {
                  if (newDate.trim()) {
                    setDates([...dates, { id: uid(), label: newDate.trim() }]);
                    setNewDate("");
                  }
                }}
                className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
              >
                추가
              </button>
            </div>
          </div>
        </Field>

        <Field label="맡을 사람">
          <div className="flex flex-wrap gap-1.5">
            {members.map((m) => (
              <button
                key={m.id}
                onClick={() => toggle(owners, m.id, setOwners)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  owners.includes(m.id) ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
          {owners.length === 0 && <p className="mt-2 text-xs text-muted-foreground">아직 정하지 않음</p>}
        </Field>

        <Field label="AI가 정리한 할 일">
          <button
            onClick={generateChecklist}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary bg-primary-soft px-4 py-3 text-sm font-semibold text-primary"
          >
            <Sparkles className="h-4 w-4" /> AI가 할 일 정리하기
          </button>
          {checklist.length > 0 && (
            <ul className="mt-3 space-y-2">
              {checklist.map((c) => (
                <li key={c.id} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                    <Plus className="h-3 w-3 rotate-45" />
                  </span>
                  {c.text}
                </li>
              ))}
            </ul>
          )}
        </Field>

        <Field label="가족 확인 요청">
          <div className="flex flex-wrap gap-1.5">
            {members.map((m) => (
              <button
                key={m.id}
                onClick={() => toggle(requestConfirm, m.id, setRequestConfirm)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  requestConfirm.includes(m.id) ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground"
                }`}
              >
                {m.name}에게 확인 요청
              </button>
            ))}
          </div>
        </Field>
      </div>
      <div className="sticky bottom-20 z-30 border-t border-border bg-background p-5">
        <button
          onClick={save}
          disabled={!title.trim()}
          className="w-full rounded-2xl bg-primary px-4 py-4 text-base font-bold text-primary-foreground disabled:opacity-40"
        >
          저장하기
        </button>
      </div>
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      {children}
    </div>
  );
}
