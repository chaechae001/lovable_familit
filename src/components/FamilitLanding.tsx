import { useState } from "react";

/* ---------- Shared atoms ---------- */

function CtaButton({
  children,
  variant = "primary",
  href = "#beta",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground shadow-[var(--shadow-cta)] hover:translate-y-[-1px] hover:shadow-[0_16px_36px_-8px_color-mix(in_oklab,var(--primary)_38%,transparent)]"
      : "bg-surface-elevated text-foreground border border-border hover:border-primary/40 hover:bg-primary-soft/40";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:py-24 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-base font-bold">
            F
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Familit</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#problem" className="hover:text-foreground">문제</a>
          <a href="#solution" className="hover:text-foreground">해결</a>
          <a href="#features" className="hover:text-foreground">기능</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <a
          href="#beta"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-95"
        >
          베타 신청
        </a>
      </div>
    </header>
  );
}

/* ---------- App mockup (parent dashboard) ---------- */

function AppMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      {/* floating chips */}
      <div className="absolute -left-4 top-10 hidden rounded-2xl bg-surface-elevated px-3 py-2 text-xs font-medium shadow-[var(--shadow-card)] sm:block">
        <span className="mr-1.5">✅</span> 아빠가 확인했어요
      </div>
      <div className="absolute -right-6 top-44 hidden rounded-2xl bg-surface-elevated px-3 py-2 text-xs font-medium shadow-[var(--shadow-card)] sm:block">
        <span className="mr-1.5">🎁</span> 선물 후보 3개
      </div>

      <div className="rounded-[2.2rem] border border-border bg-foreground/90 p-2 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
        <div className="overflow-hidden rounded-[1.8rem] bg-background">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 text-[11px] font-semibold text-muted-foreground">
            <span>9:41</span>
            <span>● ● ●</span>
          </div>

          {/* header */}
          <div className="px-5 pt-3">
            <div className="text-xs text-muted-foreground">오늘의 케어보드</div>
            <h3 className="mt-0.5 font-display text-xl font-bold tracking-tight">
              안녕하세요, 지원님
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              이번 주 챙길 일 <span className="font-semibold text-primary">3건</span>
            </p>
          </div>

          {/* cards */}
          <div className="space-y-3 px-5 pb-5 pt-4">
            {/* mom birthday card */}
            <div className="rounded-2xl border border-primary/20 bg-primary-soft/50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-primary">D-12 · 생신</div>
                  <div className="mt-0.5 text-[15px] font-bold">엄마 생신 준비</div>
                </div>
                <span className="text-lg">🎂</span>
              </div>
              <div className="mt-3 space-y-1.5 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    ✓
                  </span>
                  <span className="text-muted-foreground line-through">선물 후보 정리</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-primary/40" />
                  <span>가족 의견 받기 · 2/3</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-border" />
                  <span>식당 예약 확인</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-background bg-accent text-[9px] font-bold">
                    엄
                  </span>
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-background bg-primary text-[9px] font-bold text-primary-foreground">
                    형
                  </span>
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-background bg-foreground text-[9px] font-bold text-background">
                    나
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">가족 3명 참여중</span>
              </div>
            </div>

            {/* dad health card */}
            <div className="rounded-2xl border border-accent/30 bg-accent-soft/60 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-accent-foreground">D-3 · 건강검진</div>
                  <div className="mt-0.5 text-[15px] font-bold">아빠 건강검진</div>
                </div>
                <span className="text-lg">🩺</span>
              </div>
              <p className="mt-2 text-[12px] text-muted-foreground">
                전날 밤 9시 이후 금식 · 신분증 챙기기
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">아빠 확인 대기</span>
                <button className="rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold text-background">
                  확인했어요
                </button>
              </div>
            </div>

            {/* ai suggestion */}
            <div className="rounded-2xl border border-dashed border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">✨</span>
                <span className="text-[12px] font-semibold">추천 체크리스트</span>
              </div>
              <p className="mt-1 text-[11.5px] text-muted-foreground">
                지난 명절 기록을 바탕으로 5개 항목을 정리했어요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* warm background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%), radial-gradient(50% 50% at 10% 60%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-10">
        <div className="text-center md:text-left">
          <SectionLabel>부모님과 떨어져 사는 30·40대를 위한</SectionLabel>
          <h1 className="mt-5 font-display text-[34px] font-extrabold leading-[1.15] tracking-tight sm:text-5xl md:text-[52px]">
            가족을 챙기는 마음이
            <br />
            <span className="text-primary">실행으로 이어지도록.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground md:mx-0 md:text-base">
            부모님 생신, 명절, 건강검진, 가족 모임까지.
            <br className="hidden sm:block" />
            Familit이 가족이 함께 챙겨야 할 일을 카드로 정리하고,
            체크리스트로 나누고, 함께 확인하며 완료하게 돕습니다.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
            <CtaButton href="#beta">베타 신청하기 →</CtaButton>
            <CtaButton href="#how" variant="ghost">
              어떻게 작동하는지 보기
            </CtaButton>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            ⏱ 신청 1분 · 의료 진단을 하지 않는 가족 케어 도구입니다
          </p>
        </div>

        <div className="relative">
          <AppMockup />
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { e: "🎂", t: "부모님 생신을 매년 급하게 준비하게 됩니다." },
    { e: "🎁", t: "명절 선물과 모임 준비가 늘 한 사람에게 몰립니다." },
    { e: "🩺", t: "건강검진 예약·준비물·결과 확인을 놓치기 쉽습니다." },
    { e: "💬", t: "가족 단톡방에서 같은 질문과 답이 반복됩니다." },
    { e: "📅", t: "캘린더에 적어도 실제 준비 행동으로 이어지지 않습니다." },
  ];
  return (
    <Section id="problem">
      <div className="max-w-2xl">
        <SectionLabel>Problem</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          가족을 챙기는 일,
          <br />
          마음만으로는 자꾸 밀립니다.
        </h2>
        <p className="mt-3 text-muted-foreground">
          바쁜 일상 속에서 중요한 가족 일은 늘 뒤로 밀리고, 결국 급하게 처리하게 됩니다.
        </p>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
          >
            <span className="text-2xl">{i.e}</span>
            <p className="text-[15px] leading-relaxed">{i.t}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Compare() {
  const rows = [
    { name: "캘린더", desc: "날짜는 알려주지만, 무엇을 준비해야 하는지는 알려주지 않습니다." },
    { name: "가족 단톡방", desc: "대화는 빠르지만, 결정사항과 할 일이 쉽게 흘러갑니다." },
    { name: "여행 앱", desc: "여행 코스는 잘 짜주지만, 가족 간 역할 분담과 부모님 확인에는 어울리지 않습니다." },
    { name: "커머스 앱", desc: "선물은 살 수 있지만, 가족 의견과 과거 선물 기록까지 관리하기 어렵습니다." },
  ];
  return (
    <Section id="compare" className="bg-surface">
      <div className="max-w-2xl">
        <SectionLabel>Why now</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          캘린더와 단톡방만으로는
          <br />
          부족했던 이유.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-5">
        <div className="grid gap-3 lg:col-span-3 sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs font-semibold text-muted-foreground">기존 방식</div>
              <div className="mt-1 font-display text-lg font-bold">{r.name}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary p-6 text-primary-foreground shadow-[var(--shadow-cta)] lg:col-span-2">
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          />
          <div className="text-xs font-semibold opacity-80">Familit</div>
          <div className="mt-1 font-display text-2xl font-bold">
            가족이 함께 챙겨야 할 일을
            <br />
            카드로 정리하고 완료까지.
          </div>
          <ul className="mt-5 space-y-2 text-[14px] opacity-95">
            <li className="flex gap-2"><span>✓</span> 흘러가던 대화를 액션 카드로 남깁니다</li>
            <li className="flex gap-2"><span>✓</span> 해야 할 일을 단계로 나눠줍니다</li>
            <li className="flex gap-2"><span>✓</span> 가족이 확인·응답하며 완료합니다</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Solution() {
  const steps = [
    { n: "01", t: "가족 이벤트 등록", d: "엄마 생신, 아빠 건강검진, 명절 모임처럼 챙길 일을 한 줄로 등록합니다." },
    { n: "02", t: "AI 체크리스트 생성", d: "선물 후보, 예약 확인, 준비물, 결과 확인을 자동으로 단계로 나눠줍니다." },
    { n: "03", t: "가족 확인 후 완료", d: "부모님과 가족이 확인·응답하면 카드가 완료로 정리됩니다." },
  ];
  return (
    <Section id="solution">
      <div className="max-w-2xl">
        <SectionLabel>Solution</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Familit은 가족 일을
          <br />
          <span className="text-primary">‘액션 카드’</span>로 바꿉니다.
        </h2>
        <p className="mt-3 text-muted-foreground">
          AI는 해야 할 일을 체크리스트로 나누고, 가족은 앱 안에서 간단히 확인하고 응답할 수 있습니다.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="relative rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
          >
            <div className="font-display text-5xl font-extrabold text-primary-soft">{s.n}</div>
            <div className="mt-3 font-display text-xl font-bold">{s.t}</div>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Features() {
  const feats = [
    { e: "🗂️", t: "가족 액션 카드", d: "생신, 명절, 건강검진, 가족 모임처럼 챙겨야 할 일을 한 장의 카드로 정리합니다." },
    { e: "✅", t: "AI 체크리스트", d: "‘엄마 생신 준비’, ‘아빠 건강검진’ 같은 일을 실행 가능한 단계로 나눠줍니다." },
    { e: "👨‍👩‍👧", t: "가족 확인 / 응답", d: "부모님과 가족이 ‘확인했어요’, ‘이 날짜가 좋아요’처럼 한 번에 응답할 수 있습니다." },
    { e: "🎁", t: "선물 후보 관리", d: "부모님 취향, 예산, 가족 의견, 과거 선물 기록을 한곳에서 관리합니다." },
    { e: "🩺", t: "건강검진 루틴", d: "예약 확인, 검진 전 준비, 결과 확인, 다음 검진 주기까지 놓치지 않게 돕습니다." },
  ];
  return (
    <Section id="features" className="bg-surface">
      <div className="max-w-2xl">
        <SectionLabel>Features</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          가족 케어에 꼭 필요한 5가지.
        </h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feats.map((f, i) => (
          <div
            key={i}
            className="group rounded-3xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-[var(--shadow-card)]"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-2xl">
              {f.e}
            </div>
            <div className="mt-4 font-display text-lg font-bold">{f.t}</div>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function UseCases() {
  const cases = [
    {
      e: "🎂",
      title: "엄마 생신 준비",
      tag: "D-14 부터",
      items: ["선물 후보 정리", "가족 의견 받기", "식당 예약 체크", "케이크 주문 체크", "축하 메시지 준비"],
    },
    {
      e: "🩺",
      title: "아빠 건강검진",
      tag: "예약 후 자동",
      items: ["예약일 확인", "금식 여부 확인", "신분증 준비", "결과 확인", "다음 검진 주기 등록"],
    },
    {
      e: "🏡",
      title: "명절 가족 모임",
      tag: "한 달 전",
      items: ["가능한 날짜 확인", "선물 준비", "방문 일정 공유", "역할 분담", "완료 확인"],
    },
  ];
  return (
    <Section id="usecases">
      <div className="max-w-2xl">
        <SectionLabel>Use cases</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          내가 겪는 상황, 그대로.
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cases.map((c) => (
          <div key={c.title} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-2xl">
                {c.e}
              </span>
              <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {c.tag}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
            <ul className="mt-3 space-y-2">
              {c.items.map((it) => (
                <li key={it} className="flex items-center gap-2 text-[14px]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-[11px] text-primary">
                    ✓
                  </span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ParentFriendly() {
  const replies = ["확인했어요", "가능해요", "이 날짜가 좋아요", "이 선물이 좋아요", "나중에 확인할게요"];
  return (
    <Section id="parent" className="bg-surface">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <SectionLabel>Parent friendly</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            부모님은 복잡하게
            <br />
            쓰지 않아도 됩니다.
          </h2>
          <p className="mt-4 text-muted-foreground">
            부모님 화면은 관리 기능 대신, 확인과 응답에 집중합니다.
            큰 글씨, 단순한 버튼, 한 화면에 하나의 목적.
            입력보다는 선택으로 진행되는 부드러운 흐름을 지향합니다.
          </p>
          <ul className="mt-6 space-y-2 text-[14.5px] text-muted-foreground">
            <li>· 한 번에 한 가지만 묻습니다</li>
            <li>· 글자는 크고, 버튼은 큼직하게</li>
            <li>· 답은 보통 한 번의 터치로 끝납니다</li>
          </ul>
        </div>

        {/* Parent UI mock */}
        <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="text-sm font-semibold text-muted-foreground">아들 지원이가 보냈어요</div>
          <h3 className="mt-2 font-display text-2xl font-bold leading-snug">
            엄마, 이번 생신 식당
            <br />
            이 날짜 괜찮으세요?
          </h3>
          <div className="mt-4 rounded-2xl bg-primary-soft/60 p-4 text-[15px]">
            <div className="font-semibold">11월 22일 (토) 저녁 6시</div>
            <div className="mt-0.5 text-muted-foreground">한정식 · 집에서 15분</div>
          </div>
          <div className="mt-5 space-y-2.5">
            {replies.slice(0, 3).map((r, i) => (
              <button
                key={r}
                className={`w-full rounded-2xl py-4 text-[17px] font-semibold transition ${
                  i === 0
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "border border-border bg-surface-elevated text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            한 번만 누르면 가족이 바로 볼 수 있어요
          </p>
        </div>
      </div>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "1", t: "가족 일을 등록합니다", d: "엄마 생신, 아빠 건강검진, 명절 모임처럼 챙길 일을 등록합니다." },
    { n: "2", t: "AI가 준비할 일을 나눠줍니다", d: "선물 후보, 예약 확인, 준비물, 결과 확인을 체크리스트로 정리합니다." },
    { n: "3", t: "가족이 함께 확인하고 완료합니다", d: "부모님과 가족이 앱에서 확인하고, 의견을 남기고, 완료를 공유합니다." },
  ];
  return (
    <Section id="how">
      <div className="max-w-2xl">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          3단계면 충분합니다.
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-3xl border border-border bg-card p-7">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
              {s.n}
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{s.t}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Trust() {
  const items = [
    { t: "의료 진단은 하지 않습니다", d: "건강검진 관리는 일정·준비사항을 놓치지 않게 돕는 생활 도구입니다." },
    { t: "부모님이 이해하기 쉽게", d: "큰 글씨, 짧은 문장, 단순한 버튼 중심으로 설계합니다." },
    { t: "필요한 만큼만 입력", d: "가족 정보는 꼭 필요한 범위에서만 입력하도록 합니다." },
    { t: "MVP는 단순하게", d: "초기에는 병원 예약 대행, 선물 결제, 외부 앱 연동을 제공하지 않습니다." },
  ];
  return (
    <Section id="trust" className="bg-surface">
      <div className="max-w-2xl">
        <SectionLabel>Trust & privacy</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          가족 정보를 다루는 만큼,
          <br />
          신중하게 설계합니다.
        </h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <div key={i.t} className="rounded-2xl border border-border bg-card p-6">
            <div className="font-display text-lg font-bold">{i.t}</div>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{i.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Beta form ---------- */

const PAIN_OPTIONS = [
  "생신 / 기념일",
  "명절 / 경조사",
  "선물 준비",
  "건강검진",
  "가족 모임 일정 조율",
];

function BetaForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    livesApart: "",
    pain: "",
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: 실제 저장 연동 (Supabase / Airtable 등)
    // await submitBetaApplication(form);
    setSubmitted(true);
  }

  return (
    <Section id="beta">
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card p-7 shadow-[var(--shadow-card)] sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 25%, transparent), transparent 70%)" }}
        />
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <SectionLabel>Beta</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Familit의 첫 사용자로
              <br />
              함께해주세요.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Familit은 현재 초기 MVP를 준비 중입니다.
              부모님과 떨어져 살며 생신, 명절, 건강검진을 더 잘 챙기고 싶은
              30·40대 자녀분들의 베타 참여를 기다립니다.
            </p>
            <ul className="mt-6 space-y-2 text-[14.5px]">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> 초기 사용자 한정 기능 우선 제공</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> 제품 방향을 함께 만드는 피드백 채널</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> 신청 1분 · 언제든 해지 가능</li>
            </ul>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary-soft/40 p-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-2xl text-primary-foreground">
                ✓
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">신청이 접수되었어요</h3>
              <p className="mt-2 text-muted-foreground">
                준비가 되면 입력하신 이메일로 베타 초대장을 보내드릴게요.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl bg-surface-elevated p-6 sm:p-7">
              <div className="space-y-4">
                <Field label="이름">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="홍길동"
                    className={inputCls}
                  />
                </Field>
                <Field label="이메일">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@email.com"
                    className={inputCls}
                  />
                </Field>
                <Field label="부모님과 별도 거주하시나요?">
                  <div className="grid grid-cols-2 gap-2">
                    {["네, 떨어져 살아요", "아니요, 함께 살아요"].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => update("livesApart", opt)}
                        className={`rounded-xl border px-3 py-3 text-[14px] font-medium transition ${
                          form.livesApart === opt
                            ? "border-primary bg-primary-soft text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="가장 챙기기 어려운 항목">
                  <div className="flex flex-wrap gap-2">
                    {PAIN_OPTIONS.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => update("pain", p)}
                        className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
                          form.pain === p
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-2xl bg-primary py-4 text-[16px] font-semibold text-primary-foreground shadow-[var(--shadow-cta)] transition hover:opacity-95"
              >
                베타 신청하기 →
              </button>
              <p className="mt-3 text-center text-[12px] text-muted-foreground">
                입력 정보는 베타 초대 안내 목적 외에는 사용하지 않습니다.
              </p>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[13px] font-semibold text-foreground">{label}</div>
      {children}
    </label>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const faqs = [
    {
      q: "부모님도 앱을 직접 사용해야 하나요?",
      a: "부모님 화면은 ‘확인했어요’, ‘가능해요’ 같은 한 번의 응답 중심으로 설계합니다. 가족 중 한 명이 카드를 만들면 부모님은 큰 버튼으로 답하시면 됩니다.",
    },
    {
      q: "카카오톡이나 캘린더와 무엇이 다른가요?",
      a: "캘린더는 날짜만, 단톡방은 흘러가는 대화를 다룹니다. Familit은 가족이 함께 챙길 일을 카드로 정리하고, 단계로 나누고, 확인·완료까지 한 흐름으로 연결합니다.",
    },
    {
      q: "건강검진 정보를 입력해도 괜찮나요?",
      a: "Familit은 의료 진단을 하지 않으며, 일정과 준비사항을 놓치지 않게 돕는 생활 도구입니다. 필요한 범위에서만 입력하도록 안내합니다.",
    },
    {
      q: "선물 구매까지 가능한가요?",
      a: "초기 MVP에서는 선물 결제 기능을 제공하지 않습니다. 대신 부모님 취향, 예산, 가족 의견, 과거 선물 기록을 한곳에서 관리하도록 돕습니다.",
    },
    {
      q: "지금 바로 사용할 수 있나요?",
      a: "현재 초기 MVP를 준비 중입니다. 베타 신청을 해주시면 준비가 되는 대로 순차적으로 초대장을 보내드립니다.",
    },
  ];
  return (
    <Section id="faq" className="bg-surface">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            궁금하신 점, 먼저 답해드릴게요.
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-[15.5px] font-semibold">
                <span>{f.q}</span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary font-display text-base font-bold text-primary-foreground">
              F
            </span>
            <span className="font-display text-lg font-bold">Familit</span>
          </div>
          <p className="mt-3 max-w-sm text-[13.5px] text-muted-foreground">
            가족이 함께 챙겨야 할 일을 카드로 정리하고, 함께 확인하며 완료하게 돕는 가족 케어 운영 앱.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[13.5px] text-muted-foreground sm:items-end">
          <a href="mailto:hello@familit.app" className="hover:text-foreground">hello@familit.app</a>
          <a href="#" className="hover:text-foreground">개인정보처리방침</a>
          <span>© {new Date().getFullYear()} Familit. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

export default function FamilitLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Compare />
        <Solution />
        <Features />
        <UseCases />
        <ParentFriendly />
        <HowItWorks />
        <Trust />
        <BetaForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
