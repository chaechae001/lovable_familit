import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MoreHorizontal } from "lucide-react";
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
      <HowItWorksSection />
      <TrustSection />
      <FAQSection />
      <BetaCTASection />
      <Footer />
    </main>
  );
}

/* ---------------- Shared bits ---------------- */

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[12px] font-semibold text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}

/* ---------------- Header ---------------- */

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

/* ---------------- Hero ---------------- */

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
          <SectionTag>부모님과 떨어져 사는 가족을 위한</SectionTag>
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
          </div>

          <div className="relative mt-3 rounded-2xl bg-accent-soft p-4">
            <div className="absolute right-3 top-3 text-base">🩺</div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-accent-foreground">
              <span className="rounded-full bg-background/70 px-2 py-0.5">D-3</span>
              <span>· 건강검진</span>
            </div>
            <p className="mt-1.5 font-display text-base font-bold">아빠 건강검진</p>
            <p className="mt-1.5 text-[12px] text-muted-foreground">전날 밤 9시 이후 금식 · 신분증 챙기기</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Problem (emoji icon cards) ---------------- */

function ProblemSection() {
  const problems = [
    { e: "🎂", t: "부모님 생신을 매년 급하게 준비하게 됩니다." },
    { e: "🎁", t: "명절 선물과 모임 준비가 늘 한 사람에게 몰립니다." },
    { e: "🩺", t: "건강검진 예약·준비물·결과 확인을 놓치기 쉽습니다." },
    { e: "💬", t: "가족 단톡방에서 같은 질문과 답이 반복됩니다." },
    { e: "📅", t: "캘린더에 적어도 실제 준비 행동으로 이어지지 않습니다." },
  ];
  return (
    <section id="problem" className="bg-surface py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-5">
        <SectionTag>Problem</SectionTag>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          가족을 챙기는 일,<br />마음만으로는 어렵습니다.
        </h2>
        <p className="mt-4 text-muted-foreground">
          바쁜 일상 속에서 가족 일은 걱정은 되지만 쉽게 미뤄지고 흩어집니다.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {problems.map((p) => (
            <li key={p.t} className="flex items-start gap-3 rounded-2xl border border-border bg-background p-5 shadow-[var(--shadow-soft)]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-lg">{p.e}</span>
              <span className="text-sm leading-relaxed pt-1.5">{p.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Comparison (4 grey + 1 dark green) ---------------- */

function ComparisonSection() {
  const olds = [
    { t: "캘린더", d: "날짜는 알려주지만, 무엇을 준비해야 하는지는 알려주지 않습니다." },
    { t: "가족 단톡방", d: "대화는 빠르지만, 결정사항과 할 일이 쉽게 흘러갑니다." },
    { t: "여행 앱", d: "여행 코스는 잘 짜주지만, 가족 간 역할 분담과 부모님 확인에는 어울리지 않습니다." },
    { t: "커머스 앱", d: "선물은 살 수 있지만, 가족 의견과 과거 선물 기록까지 관리하기 어렵습니다." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionTag>Why Familit</SectionTag>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">말해두고, 적어두는 것만으로는 부족합니다.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {olds.map((o) => (
              <div key={o.t} className="rounded-2xl border border-border bg-background p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">기존 방식</p>
                <p className="mt-2 font-display text-lg font-bold">{o.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-[oklch(0.32_0.06_165)] p-6 text-[oklch(0.97_0.02_160)]">
            <p className="text-[12px] font-semibold text-[oklch(0.85_0.1_165)]">Familit</p>
            <p className="mt-3 font-display text-2xl font-bold leading-snug">
              가족이 함께 챙겨야 할 일을<br />카드로 정리하고 완료까지.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "흘러가던 대화를 액션 카드로 남깁니다",
                "해야 할 일을 단계로 나눠줍니다",
                "가족이 확인·응답하며 완료합니다",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1 text-[oklch(0.85_0.1_165)]">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Solution (01/02/03) ---------------- */

function SolutionSection() {
  const steps = [
    { n: "01", t: "가족 이벤트 등록", d: "엄마 생신, 아빠 건강검진, 명절 모임처럼 챙길 일을 한 줄로 등록합니다." },
    { n: "02", t: "AI 체크리스트 생성", d: "선물 후보, 예약 확인, 준비물, 결과 확인을 자동으로 단계로 나눠줍니다." },
    { n: "03", t: "가족 확인 후 완료", d: "부모님과 가족이 확인·응답하면 카드가 완료로 정리됩니다." },
  ];
  return (
    <section id="solution" className="bg-surface py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionTag>Solution</SectionTag>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          Familit은 가족 일을<br />
          <span className="text-primary">'액션 카드'</span>로 바꿉니다.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          AI는 해야 할 일을 체크리스트로 나누고, 가족은 앱 안에서 간단히 확인하고 응답할 수 있습니다.
        </p>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-background p-7 shadow-[var(--shadow-soft)]">
              <span className="font-display text-5xl font-extrabold text-primary/80">{s.n}</span>
              <p className="mt-4 font-display text-lg font-bold">{s.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Features (colored icon squares) ---------------- */

function FeaturesSection() {
  const feats = [
    { icon: "📁", bg: "bg-accent-soft", t: "가족 액션 카드", d: "생신, 명절, 건강검진, 가족 모임처럼 챙겨야 할 일을 한 장의 카드로 정리합니다." },
    { icon: "✅", bg: "bg-primary-soft", t: "AI 체크리스트", d: "'엄마 생신 준비', '아빠 건강검진' 같은 일을 실행 가능한 단계로 나눠줍니다." },
    { icon: "👨‍👩‍👧", bg: "bg-primary-soft", t: "가족 확인 / 응답", d: "부모님과 가족이 '확인했어요', '이 날짜가 좋아요'처럼 한 번에 응답할 수 있습니다." },
    { icon: "🎁", bg: "bg-accent-soft", t: "선물 후보 관리", d: "부모님 취향, 예산, 가족 의견, 과거 선물 기록을 한곳에서 관리합니다." },
    { icon: "🩺", bg: "bg-primary-soft", t: "건강검진 루틴", d: "예약 확인, 검진 전 준비, 결과 확인, 다음 검진 주기까지 놓치지 않게 돕습니다." },
  ];
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionTag>Features</SectionTag>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">가족을 챙기는 일을 더 쉽게.</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {feats.map((f) => (
            <li key={f.t} className="rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${f.bg} text-xl`}>{f.icon}</span>
              <p className="mt-4 font-display text-lg font-bold">{f.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Use cases (icon + badge + checklist) ---------------- */

function UseCasesSection() {
  const cases = [
    { icon: "🎂", badge: "D-14 부터", t: "엄마 생신 준비", items: ["선물 후보 정리", "가족 의견 받기", "식당 예약 체크", "케이크 주문 체크", "축하 메시지 준비"] },
    { icon: "🩺", badge: "예약 후 자동", t: "아빠 건강검진", items: ["예약일 확인", "금식 여부 확인", "신분증 준비", "결과 확인", "다음 검진 주기 등록"] },
    { icon: "🏠", badge: "한 달 전", t: "명절 가족 모임", items: ["가능한 날짜 확인", "선물 준비", "방문 일정 공유", "역할 분담", "완료 확인"] },
  ];
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionTag>Use cases</SectionTag>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">내가 겪는 상황, 그대로.</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {cases.map((c) => (
            <li key={c.t} className="rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-xl">{c.icon}</span>
                <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">{c.badge}</span>
              </div>
              <p className="mt-5 font-display text-lg font-bold">{c.t}</p>
              <ul className="mt-3 space-y-2">
                {c.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
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

/* ---------------- Parent friendly ---------------- */

function ParentSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center">
        <div>
          <SectionTag>Parent friendly</SectionTag>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            부모님은 복잡하게<br />쓰지 않아도 됩니다.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            부모님 화면은 관리 기능 대신, 확인과 응답에 집중합니다.
            큰 글씨, 단순한 버튼, 한 화면에 하나의 목적. 입력보다는 선택으로 진행되는 부드러운 흐름을 지향합니다.
          </p>
          <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
            <li>· 한 번에 한 가지만 묻습니다</li>
            <li>· 글자는 크고, 버튼은 큼직하게</li>
            <li>· 답은 보통 한 번의 터치로 끝납니다</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-background p-6 shadow-[var(--shadow-card)]">
          <p className="text-xs text-muted-foreground">아들 지원이가 보냈어요</p>
          <p className="mt-2 font-display text-2xl font-bold leading-snug">
            엄마, 이번 생신 식당<br />이 날짜 괜찮으세요?
          </p>
          <div className="mt-5 rounded-2xl bg-primary-soft px-4 py-3.5">
            <p className="font-display text-base font-bold">11월 22일 (토) 저녁 6시</p>
            <p className="mt-0.5 text-xs text-muted-foreground">한정식 · 집에서 15분</p>
          </div>
          <button className="mt-4 w-full rounded-2xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground">확인했어요</button>
          <button className="mt-2 w-full rounded-2xl border-2 border-border bg-background px-5 py-4 text-base font-semibold">가능해요</button>
          <button className="mt-2 w-full rounded-2xl border-2 border-border bg-background px-5 py-4 text-base font-semibold">이 날짜가 좋아요</button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">한 번만 누르면 가족이 바로 볼 수 있어요</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

function HowItWorksSection() {
  const steps = [
    { n: 1, t: "가족 일을 등록합니다", d: "엄마 생신, 아빠 건강검진, 명절 모임처럼 챙길 일을 등록합니다." },
    { n: 2, t: "AI가 준비할 일을 나눠줍니다", d: "선물 후보, 예약 확인, 준비물, 결과 확인을 체크리스트로 정리합니다." },
    { n: 3, t: "가족이 함께 확인하고 완료합니다", d: "부모님과 가족이 앱에서 확인하고, 의견을 남기고, 완료를 공유합니다." },
  ];
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionTag>How it works</SectionTag>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">3단계면 충분합니다.</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-soft)]">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">{s.n}</span>
              <p className="mt-4 font-display text-lg font-bold">{s.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Trust ---------------- */

function TrustSection() {
  const items = [
    "의료 판단이나 치료 조언을 제공하지 않습니다.",
    "가족에게 필요한 정보만 간단히 정리할 수 있도록 설계합니다.",
    "부모님이 이해하기 쉽게 복잡한 정보를 직접 입력하지 않아도 사용할 수 있습니다.",
  ];
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-3xl px-5">
        <SectionTag>Trust</SectionTag>
        <h2 className="mt-4 font-display text-3xl font-bold">
          가족 정보를 다루는 만큼,<br />안전하고 신중하게.
        </h2>
        <ul className="mt-6 space-y-3">
          {items.map((t) => (
            <li key={t} className="flex gap-3 rounded-2xl border border-border bg-surface p-4 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQSection() {
  const faqs: Array<[string, string]> = [
    ["FAMILIT은 어떤 앱인가요?", "부모님 생신, 가족 모임, 기념일, 건강검진처럼 가족끼리 챙겨야 할 일을 한곳에 정리하고 가족이 함께 확인하는 앱입니다."],
    ["일반 캘린더와 무엇이 다른가요?", "단순한 일정 기록이 아니라 가능한 날짜, 맡을 사람, 가족 확인 상태까지 함께 관리합니다."],
    ["부모님도 앱을 잘 써야 하나요?", "아니요. 부모님은 큰 버튼으로 확인만 해주시면 됩니다. 자녀가 정리합니다."],
    ["혼자 먼저 사용해도 되나요?", "네. 혼자 챙길 일을 정리하고 나중에 가족을 초대할 수 있습니다."],
    ["어떤 가족 일을 정리할 수 있나요?", "부모님 생신, 가족 모임, 기념일, 건강검진, 선물 준비 등 가족이 함께 챙길 일을 정리합니다."],
    ["가족끼리 맡을 일을 나눌 수 있나요?", "네. 각 할 일에 맡을 사람을 정하고 완료 여부를 함께 볼 수 있습니다."],
    ["선물 준비도 함께 할 수 있나요?", "선물 후보를 정하고 가족 의견을 모을 수 있습니다."],
    ["지금 바로 사용할 수 있나요?", "현재 초기 MVP를 준비 중이며, 베타 신청을 받고 있습니다."],
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-surface py-20 md:py-28">
      <div className="mx-auto w-full max-w-3xl px-5">
        <SectionTag>FAQ</SectionTag>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          궁금하신 점,<br />먼저 답해드릴게요.
        </h2>
        <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-background">
          {faqs.map(([q, a], i) => (
            <li key={q}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                <span className="font-medium">{q}</span>
                <span className="text-lg text-muted-foreground">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Beta CTA ---------------- */

function BetaCTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="rounded-3xl border border-border bg-background p-8 shadow-[var(--shadow-card)] md:p-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <SectionTag>Beta</SectionTag>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
                Familit의 첫 사용자로<br />함께해주세요.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Familit은 현재 초기 MVP를 준비 중입니다. 부모님과 떨어져 살며 생신, 명절, 건강검진을 더 잘 챙기고 싶은 분들의 베타 참여를 기다립니다.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {[
                  "초기 사용자 한정 기능 우선 제공",
                  "제품 방향을 함께 만드는 피드백 채널",
                  "신청 1분 · 언제든 해지 가능",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center gap-4 rounded-2xl bg-surface p-6">
              <p className="font-display text-lg font-bold">베타 신청은 1분이면 충분합니다.</p>
              <p className="text-sm text-muted-foreground">이름, 이메일, 가족 구성 정도만 알려주시면 됩니다.</p>
              <Link to="/beta" className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-cta)]">
                베타 신청하기 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/demo" className="inline-flex items-center justify-center rounded-2xl border-2 border-border bg-background px-6 py-4 text-base font-semibold">
                서비스 미리보기
              </Link>
              <p className="text-center text-[11px] text-muted-foreground">입력 정보는 베타 초대 안내 목적 외에는 사용하지 않습니다.</p>
            </div>
          </div>
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
