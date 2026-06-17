import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Calendar, Heart, Gift, Stethoscope, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FAMILIT 패밀릿 — 가족끼리 챙겨야 할 일, 한곳에서" },
      {
        name: "description",
        content:
          "부모님 생신, 가족 모임, 기념일, 건강검진처럼 놓치기 쉬운 가족 일을 한곳에 정리하고 가족이 함께 확인하세요. 베타 신청 받는 중.",
      },
      { property: "og:title", content: "FAMILIT — 가족끼리 챙겨야 할 일을 한곳에서" },
      {
        property: "og:description",
        content: "가능한 날짜 모으기, 맡을 사람 정하기, 가족 확인 받기까지. 패밀릿이 함께합니다.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <ProblemSection />
      <ComparisonSection />
      <SolutionSection />
      <FeaturesSection />
      <UseCasesSection />
      <ParentSection />
      <TrustSection />
      <FAQSection />
      <BetaCTASection />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold shadow-[var(--shadow-soft)]">F</span>
          <span className="font-display text-base font-bold tracking-tight">Familit</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#problem" className="hover:text-foreground">문제</a>
          <a href="#solution" className="hover:text-foreground">해결</a>
          <a href="#features" className="hover:text-foreground">기능</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <Link to="/beta" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90">
          베타 신청
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%), radial-gradient(50% 50% at 10% 60%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-10">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            부모님과 떨어져 사는 가족을 위한
          </div>
          <h1 className="mt-5 font-display text-[34px] font-extrabold leading-[1.15] tracking-tight sm:text-5xl md:text-[52px]">
            가족을 챙기는 마음이
            <br />
            <span className="text-primary">행동으로 이어지도록.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground md:mx-0 md:text-base">
            부모님 생신, 가족 모임, 기념일, 건강검진처럼
            <br className="hidden sm:block" />
            놓치기 쉬운 일을 한곳에 정리하여 가족이 함께 확인할 수 있게 도와줍니다.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
            <Link to="/demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[var(--shadow-cta)] transition hover:-translate-y-[1px]">
              서비스 미리보기 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/beta" className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-[15px] font-semibold text-background hover:opacity-90">
              베타 신청하기
            </Link>
          </div>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground md:justify-start">
            <span aria-hidden="true">⏱</span>
            신청 1분 · 의료 진단을 하지 않는 가족 케어 도구입니다
          </p>
        </div>
        <PhoneMockup />
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-accent-soft blur-2xl" />
      <div className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-primary-soft blur-2xl" />
      <div className="relative rounded-[2.5rem] border border-border bg-foreground/10 p-2 shadow-[var(--shadow-card)] ring-1 ring-foreground/5">
        <div className="rounded-[2rem] bg-surface-elevated px-5 pb-6 pt-5">
          <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
            <span>9:41</span>
            <MoreHorizontal className="h-4 w-4" />
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary">
            <CheckCircle2 className="h-3 w-3" /> 아빠가 확인했어요
          </div>
          <p className="mt-4 font-display text-xl font-bold leading-tight">안녕하세요, 민지님</p>
          <p className="mt-1 text-xs text-muted-foreground">이번 주 챙길 일 <span className="font-semibold text-foreground">3건</span></p>

          {/* Task 1 — 생신 */}
          <div className="relative mt-4 rounded-2xl bg-primary-soft p-4">
            <div className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-accent text-base shadow-[var(--shadow-soft)]">🎂</div>
            <span className="absolute -right-3 top-9 inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-[10px] font-semibold text-accent-foreground shadow-[var(--shadow-soft)]">
              🎁 선물 후보 3개
            </span>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-primary">
              <span className="rounded-full bg-background/70 px-2 py-0.5">D-12</span>
              <span>· 생신</span>
            </div>
            <p className="mt-1.5 font-display text-base font-bold">엄마 생신 준비</p>
            <ul className="mt-2.5 space-y-1.5 text-[12px]">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /><span className="text-foreground/80 line-through">선물 후보 정하기</span></li>
              <li className="flex items-center gap-2"><span className="h-3.5 w-3.5 rounded-full border border-primary/40" /><span>가족 의견 받기 · 2/3</span></li>
              <li className="flex items-center gap-2"><span className="h-3.5 w-3.5 rounded-full border border-primary/40" /><span>식당 정하기</span></li>
            </ul>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <div className="flex -space-x-1.5">
                {[
                  { c: "bg-[oklch(0.85_0.09_55)]", t: "엄" },
                  { c: "bg-[oklch(0.82_0.09_140)]", t: "형" },
                  { c: "bg-[oklch(0.85_0.09_25)]", t: "나" },
                ].map((m) => (
                  <span key={m.t} className={`grid h-5 w-5 place-items-center rounded-full border-2 border-surface-elevated text-[9px] font-bold text-foreground ${m.c}`}>{m.t}</span>
                ))}
              </div>
              <span>가족 3명 확인 중</span>
            </div>
          </div>

          {/* Task 2 — 건강검진 */}
          <div className="relative mt-3 rounded-2xl bg-accent-soft p-4">
            <div className="absolute right-3 top-3 text-base">🩺</div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-accent-foreground">
              <span className="rounded-full bg-background/70 px-2 py-0.5">D-3</span>
              <span>· 건강검진</span>
            </div>
            <p className="mt-1.5 font-display text-base font-bold">아빠 건강검진</p>
            <p className="mt-1.5 text-[12px] text-muted-foreground">전날 밤 9시 이후 금식 · 신분증 챙기기</p>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">아빠 확인 대기</span>
              <span className="rounded-full bg-foreground px-3 py-1 font-semibold text-background">확인했어요</span>
            </div>
          </div>

          {/* 추천 체크리스트 */}
          <div className="mt-3 rounded-2xl border border-border bg-background/70 p-3.5">
            <p className="text-[11px] font-semibold text-primary">✨ 추천 체크리스트</p>
            <p className="mt-1 text-[12px] text-muted-foreground">지난 기록을 바탕으로 5개 항목을 정리했어요</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const problems = [
    "바쁜 일상 속에서 부모님 생신을 급하게 준비하는 경우가 생깁니다.",
    "가족 모임 날짜를 정하는 데 오래 걸립니다.",
    "건강검진 일정을 놓치면 더 마음이 쓰입니다.",
    "가족 단톡방에서 얘기를 해도 기억하기 어렵습니다.",
    "캘린더에 적어도 실제 행동으로 이어지기 힘듭니다.",
  ];
  return (
    <section id="problem" className="bg-surface py-20 md:py-28">

      <div className="mx-auto w-full max-w-4xl px-5">
        <h2 className="font-display text-3xl font-bold md:text-4xl">가족을 챙기는 일,<br />마음만으로는 어렵습니다.</h2>
        <p className="mt-4 text-muted-foreground">
          바쁜 일상 속에서 가족 일은 걱정은 되지만 쉽게 미뤄지고 흩어집니다.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {problems.map((p, i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-border bg-background p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent-foreground">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const left = ["날짜만 적어둠", "다시 가족에게 확인", "누가 맡았는지 헷갈림", "준비할 일이 따로 남음"];
  const right = ["날짜와 준비할 일을 함께 정리", "가족 확인 상태 표시", "맡을 사람 표시", "완료 여부 남김"];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-4xl px-5">
        <h2 className="font-display text-3xl font-bold md:text-4xl">말해두고, 적어두는 것만으로는 부족합니다.</h2>
        <p className="mt-4 text-muted-foreground">
          가족 일은 단순한 일정이 아닙니다. 날짜를 정하고, 맡을 일을 나누고, 가족이 확인했는지까지 알아야 합니다.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-sm font-semibold text-muted-foreground">기존 방식</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {left.map((t) => <li key={t} className="flex gap-2"><span>·</span>{t}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-primary bg-primary-soft p-6">
            <p className="text-sm font-semibold text-primary">FAMILIT</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {right.map((t) => <li key={t} className="flex gap-2 font-medium"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const steps = [
    "챙길 일을 정리합니다.",
    "해야 할 일을 나눕니다.",
    "가족이 함께 확인합니다.",
    "완료 여부를 남깁니다.",
  ];
  return (
    <section id="solution" className="bg-surface py-20 md:py-28">

      <div className="mx-auto w-full max-w-5xl px-5">
        <h2 className="font-display text-3xl font-bold md:text-4xl">패밀릿은 가족이 함께 챙길 일을<br />'액션 카드'로 모아줍니다.</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="rounded-2xl border border-border bg-background p-6">
              <span className="font-display text-3xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm font-medium leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const feats = [
    { t: "오늘의 할 일", d: "오늘 무엇을 챙길지 한눈에 봅니다." },
    { t: "가족 일정 정리", d: "흩어진 가족 일을 한곳에 모읍니다." },
    { t: "체크리스트", d: "필요한 할 일을 자동으로 나눠줍니다." },
    { t: "가능한 날짜 고르기", d: "가족이 가능한 날짜를 모아 확인합니다." },
    { t: "담당 일 나누기", d: "누가 무엇을 맡았는지 분명해집니다." },
    { t: "가족 확인/응답", d: "부모님과 가족이 '확인했어요', '이 날짜가 좋아요'처럼 한 번에 응답할 수 있습니다." },
  ];
  return (
    <section id="features" className="py-20 md:py-28">

      <div className="mx-auto w-full max-w-5xl px-5">
        <h2 className="font-display text-3xl font-bold md:text-4xl">가족을 챙기는 일을 더 쉽게.</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {feats.map(({ t, d }) => (
            <li key={t} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-display text-base font-semibold">{t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const cases = [
    { icon: Heart, t: "부모님 생신 준비", items: ["선물 후보 정하기", "가족 의견 받기", "식사 장소 정하기", "케이크 준비하기"] },
    { icon: Calendar, t: "가족 모임 날짜 정하기", items: ["날짜 후보 정하기", "가능한 날짜 확인하기", "장소 정하기", "확정 일정 공유하기"] },
    { icon: Gift, t: "기념일 챙기기", items: ["기념일 날짜 확인하기", "선물 또는 식사 준비하기", "가족 메시지 정하기", "방문 일정 확인하기"] },
    { icon: Stethoscope, t: "건강검진 일정 확인", items: ["검진 날짜 확인하기", "예약 여부 확인하기", "준비사항 확인하기", "결과 확인 날짜 남기기"] },
  ];
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto w-full max-w-5xl px-5">
        <h2 className="font-display text-3xl font-bold md:text-4xl">이런 가족 일부터 체크해보세요.</h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {cases.map(({ icon: Icon, t, items }) => (
            <li key={t} className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-display text-lg font-semibold">{t}</p>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">이렇게 정리돼요</p>
              <ul className="mt-2 space-y-1.5">
                {items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ParentSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">부모님은 어렵게 쓰지 않아도 됩니다.</h2>
          <p className="mt-4 text-muted-foreground">
            FAMILIT은 부모님이 모든 기능을 직접 관리하지 않아도 되도록 설계합니다.
            자녀가 정리하고, 부모님은 필요한 순간에 확인하고 선택하면 됩니다.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {["자녀가 정리", "부모님은 확인", "큰 버튼으로 선택", "간단 댓글 가능"].map((t) => (
              <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6">
          <p className="text-xs text-muted-foreground">오늘 확인할 일</p>
          <p className="mt-2 font-display text-2xl font-bold leading-snug">이번 가족 식사 날짜를 골라주세요.</p>
          <div className="mt-5 space-y-2.5">
            {["6월 22일 일요일 점심이 좋아요", "6월 28일 토요일 점심이 좋아요", "나중에 확인할게요"].map((t) => (
              <button key={t} className="w-full rounded-2xl border-2 border-border bg-background px-5 py-4 text-left text-base font-semibold hover:border-primary">
                {t}
              </button>
            ))}
          </div>
          <button className="mt-3 w-full rounded-2xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground">확인했어요</button>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    "의료 판단이나 치료 조언을 제공하지 않습니다.",
    "가족에게 필요한 정보만 간단히 정리할 수 있도록 설계합니다.",
    "부모님이 이해하기 쉽게 복잡한 정보를 직접 입력하지 않아도 사용할 수 있습니다.",
  ];
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto w-full max-w-3xl px-5">
        <h2 className="font-display text-3xl font-bold">가족 정보를 다루는 만큼,<br />안전하고 신중하게</h2>
        <ul className="mt-6 space-y-3">
          {items.map((t) => (
            <li key={t} className="flex gap-3 rounded-xl bg-background p-4 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs: Array<[string, string]> = [
    ["FAMILIT은 어떤 앱인가요?", "부모님 생신, 가족 모임, 기념일, 건강검진처럼 가족끼리 챙겨야 할 일을 한곳에 정리하고 가족이 함께 확인하는 앱입니다."],
    ["일반 캘린더와 무엇이 다른가요?", "단순한 일정 기록이 아니라 가능한 날짜, 맡을 사람, 가족 확인 상태까지 함께 관리합니다."],
    ["부모님도 앱을 잘 써야 하나요?", "아니요. 부모님은 큰 버튼으로 확인만 해주시면 됩니다. 자녀가 정리합니다."],
    ["혼자 먼저 사용해도 되나요?", "네. 혼자 챙길 일을 정리하고 나중에 가족을 초대할 수 있습니다."],
    ["어떤 가족 일을 정리할 수 있나요?", "부모님 생신, 가족 모임, 기념일, 건강검진, 선물 준비 등 가족이 함께 챙길 일을 정리합니다."],
    ["가족끼리 맡을 일을 나눌 수 있나요?", "네. 각 할 일에 맡을 사람을 정하고 완료 여부를 함께 볼 수 있습니다."],
    ["부모님께도 쉽게 보여줄 수 있나요?", "부모님 간편 확인 화면은 큰 글씨와 단순 버튼으로 만들어져 있습니다."],
    ["선물 준비도 함께 할 수 있나요?", "선물 후보를 정하고 가족 의견을 모을 수 있습니다."],
    ["지금 바로 사용할 수 있나요?", "현재 초기 MVP를 준비 중이며, 베타 신청을 받고 있습니다."],
    ["베타 테스트에 참여하면 무엇을 하나요?", "초기 화면을 함께 사용해보고 의견을 나눠주시면 됩니다. 사용자 인터뷰 참여도 환영합니다."],
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-28">

      <div className="mx-auto w-full max-w-3xl px-5">
        <h2 className="font-display text-3xl font-bold md:text-4xl">궁금하신 점,<br />먼저 답해드릴게요.</h2>
        <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
          {faqs.map(([q, a], i) => (
            <li key={q}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                <span className="font-medium">{q}</span>
                <span className="text-muted-foreground">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BetaCTASection() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto w-full max-w-3xl px-5 text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          가족을 챙기는 일,
          <br />
          혼자 기억하지 않아도 되도록.
        </h2>
        <p className="mt-5 text-base opacity-90">
          FAMILIT은 현재 초기 MVP를 준비 중입니다.
          <br />
          부모님 생신, 가족 모임, 기념일, 건강검진을
          <br />
          더 잘 챙기고 싶은 분들의 참여를 기다립니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/beta" className="rounded-full bg-background px-6 py-3 text-base font-semibold text-foreground hover:opacity-90">
            베타 신청하기
          </Link>
          <Link to="/demo" className="rounded-full border border-primary-foreground/40 px-6 py-3 text-base font-semibold">
            서비스 미리보기
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} FAMILIT · 패밀릿</p>
        <p>가족끼리 챙겨야 할 일, 한곳에서.</p>
      </div>
    </footer>
  );
}
