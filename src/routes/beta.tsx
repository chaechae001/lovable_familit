import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { submitBetaSignup, type BetaSignupInput } from "@/lib/betaSignup";

export const Route = createFileRoute("/beta")({
  head: () => ({
    meta: [
      { title: "FAMILIT 베타 신청" },
      { name: "description", content: "FAMILIT 초기 사용자와 인터뷰 후보자를 모집합니다." },
    ],
  }),
  component: BetaPage,
});

const AGE_GROUPS = [
  ["20s", "20대"],
  ["30s", "30대"],
  ["40s", "40대"],
  ["50s", "50대"],
  ["60+", "60대 이상"],
] as const;

const HARDEST_OPTIONS = [
  "부모님 생신",
  "가족 모임 날짜 정하기",
  "기념일 챙기기",
  "건강검진 일정 확인",
  "선물 준비",
  "가족 역할 나누기",
  "기타",
];

function BetaPage() {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ageGroup, setAgeGroup] = useState<BetaSignupInput["age_group"] | "">("");
  const [livesApart, setLivesApart] = useState<boolean | null>(null);
  const [familyCount, setFamilyCount] = useState<string>("");
  const [hardest, setHardest] = useState<string>("");
  const [interview, setInterview] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !phone.trim() || !ageGroup || livesApart === null) {
      setError("필수값을 입력해주세요.");
      return;
    }
    setSubmitting(true);
    const res = await submitBetaSignup({
      name,
      email,
      phone,
      age_group: ageGroup,
      lives_separately_from_parents: livesApart,
      family_member_count: familyCount ? Number(familyCount) : null,
      main_pain_point: hardest || null,
      interview_willing: interview,
      source: "beta_page",
    });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center p-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-primary-soft text-primary">
            <CheckCircle2 className="h-9 w-9" />
          </span>
          <h1 className="mt-6 font-display text-2xl font-bold">신청이 완료되었습니다.</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            패밀릿의 초기 사용자 모집에 참여해주셔서 감사합니다.
            <br />추후 베타 테스트 또는 사용자 인터뷰 안내를 드릴 예정입니다.
          </p>
          <Link to="/" className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">처음으로</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center gap-3 px-5">
          <button onClick={() => router.history.back()} aria-label="뒤로" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold">F</span>
            <span className="font-display text-base font-bold tracking-tight">Familit</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl px-5 py-10 md:py-14">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[12px] font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />Beta
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">패밀릿 베타 신청</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            부모님 생신, 가족 모임, 기념일, 건강검진을
            <br />더 잘 챙기고 싶은 분들의 참여를 기다립니다.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="이름 *" value={name} onChange={setName} />
            <Input label="이메일 *" type="email" value={email} onChange={setEmail} />
          </div>
          <Input label="연락처 *" value={phone} onChange={setPhone} placeholder="010-0000-0000" />

          <Field label="연령대 *">
            <div className="flex flex-wrap gap-1.5">
              {AGE_GROUPS.map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setAgeGroup(k)}
                  className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                    ageGroup === k ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >{l}</button>
              ))}
            </div>
          </Field>

          <Field label="부모님과 별도 거주 여부 *">
            <div className="flex gap-2">
              {[[true, "예"], [false, "아니요"]].map(([v, l]) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setLivesApart(v as boolean)}
                  className={`flex-1 rounded-xl border-2 px-3 py-3 text-sm font-semibold transition ${
                    livesApart === v ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >{l as string}</button>
              ))}
            </div>
          </Field>

          <Input label="가족 구성원 수" type="number" value={familyCount} onChange={setFamilyCount} placeholder="예: 4" />

          <Field label="가장 챙기기 어려운 가족 일">
            <div className="flex flex-wrap gap-1.5">
              {HARDEST_OPTIONS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setHardest(o)}
                  className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                    hardest === o ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >{o}</button>
              ))}
            </div>
          </Field>

          <label className="flex items-center gap-2 rounded-xl bg-surface px-4 py-3 text-sm">
            <input type="checkbox" checked={interview} onChange={(e) => setInterview(e.target.checked)} />
            사용자 인터뷰 참여 가능
          </label>

          {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-primary px-4 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-cta)] disabled:opacity-50"
          >
            {submitting ? "신청 중..." : "베타 신청하기"}
          </button>
          <p className="text-center text-[11px] text-muted-foreground">입력 정보는 베타 초대 안내 목적 외에는 사용하지 않습니다.</p>
        </form>
      </main>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base focus:border-primary focus:outline-none"
      />
    </div>
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
