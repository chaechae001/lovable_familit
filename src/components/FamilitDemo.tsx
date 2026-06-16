import { useMemo, useState } from "react";

/* ============================================================
   Familit — Clickable MVP Demo
   Single-file, dummy-data driven phone-style prototype.
   ============================================================ */

type ScreenId =
  | "onboarding"
  | "group"
  | "board"
  | "create"
  | "ai"
  | "cardDetail"
  | "gift"
  | "meeting"
  | "health"
  | "parent"
  | "beta"
  | "menu";

type Category = "모임" | "기념일" | "명절" | "건강검진" | "선물";

type ActionCard = {
  id: string;
  title: string;
  category: Category;
  due: string;
  status: string;
  owner: string;
  members: string[];
  checklist: { text: string; done: boolean }[];
  comments: { who: string; text: string }[];
};

const DUMMY_CARDS: ActionCard[] = [
  {
    id: "c1",
    title: "어버이날 선물 준비",
    category: "선물",
    due: "5월 1일",
    status: "가족 의견 대기",
    owner: "나",
    members: ["엄마", "아빠", "동생"],
    checklist: [
      { text: "선물 후보 정하기", done: true },
      { text: "가족 의견 받기", done: false },
      { text: "예산 정하기", done: false },
      { text: "구매 여부 확인하기", done: false },
      { text: "부모님께 전달하기", done: false },
    ],
    comments: [
      { who: "동생", text: "마사지기 좋을 것 같아" },
    ],
  },
  {
    id: "c2",
    title: "가족 식사 날짜 조율",
    category: "모임",
    due: "이번 주 일요일",
    status: "날짜 선택 중",
    owner: "나",
    members: ["엄마", "아빠", "동생"],
    checklist: [
      { text: "날짜 후보 정하기", done: true },
      { text: "가족 가능 날짜 확인하기", done: false },
      { text: "식당 후보 정하기", done: false },
      { text: "예약 담당자 정하기", done: false },
      { text: "예약 완료 확인하기", done: false },
    ],
    comments: [
      { who: "엄마", text: "토요일이 좋아요" },
      { who: "동생", text: "일요일 저녁 가능해" },
      { who: "아빠", text: "가까운 곳이면 좋아요" },
    ],
  },
  {
    id: "c3",
    title: "아빠 건강검진 예약 확인",
    category: "건강검진",
    due: "7월 3일",
    status: "확인 필요",
    owner: "나",
    members: ["아빠"],
    checklist: [
      { text: "검진 날짜 확인하기", done: true },
      { text: "예약 여부 확인하기", done: false },
      { text: "준비사항 확인하기", done: false },
      { text: "결과 확인 여부 체크하기", done: false },
      { text: "다음 검진 주기 등록하기", done: false },
    ],
    comments: [],
  },
];

const CATEGORY_META: Record<Category, { emoji: string; tint: string }> = {
  모임: { emoji: "🍽️", tint: "bg-[oklch(0.95_0.04_60)] text-[oklch(0.4_0.08_50)]" },
  기념일: { emoji: "🎂", tint: "bg-primary-soft text-primary" },
  명절: { emoji: "🌕", tint: "bg-[oklch(0.94_0.05_80)] text-[oklch(0.4_0.08_70)]" },
  건강검진: { emoji: "🩺", tint: "bg-[oklch(0.94_0.04_200)] text-[oklch(0.38_0.07_220)]" },
  선물: { emoji: "🎁", tint: "bg-[oklch(0.95_0.04_20)] text-[oklch(0.42_0.1_25)]" },
};

/* ---------- Phone frame ---------- */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[420px] md:max-w-[400px]">
      <div className="md:rounded-[44px] md:border-[10px] md:border-[oklch(0.22_0.02_75)] md:bg-[oklch(0.22_0.02_75)] md:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
        <div className="relative h-[calc(100dvh-3.5rem)] overflow-hidden bg-background md:h-[760px] md:rounded-[34px]">
          {children}
        </div>
      </div>
      <p className="mt-3 hidden text-center text-xs text-muted-foreground md:block">
        모바일 우선 프로토타입 · 실제 화면 흐름을 클릭해보세요
      </p>
    </div>
  );
}

function ScreenShell({
  title,
  onBack,
  onMenu,
  children,
  footer,
  padded = true,
}: {
  title: string;
  onBack?: () => void;
  onMenu?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border/60 bg-background/95 px-4">
        <button
          onClick={onBack}
          className="grid h-9 w-9 place-items-center rounded-full text-foreground hover:bg-muted disabled:opacity-30"
          disabled={!onBack}
          aria-label="뒤로"
        >
          {onBack ? "←" : ""}
        </button>
        <div className="font-display text-sm font-bold tracking-tight">{title}</div>
        <button
          onClick={onMenu}
          className="grid h-9 w-9 place-items-center rounded-full text-foreground hover:bg-muted"
          aria-label="메뉴"
        >
          ☰
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto ${padded ? "px-5 py-5" : ""}`}>{children}</div>
      {footer ? (
        <div className="shrink-0 border-t border-border/60 bg-background px-5 py-3">{footer}</div>
      ) : null}
    </div>
  );
}

/* ---------- Atoms ---------- */

function Pill({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "primary" | "warn" }) {
  const map = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary-soft text-primary",
    warn: "bg-[oklch(0.95_0.04_60)] text-[oklch(0.4_0.1_50)]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[tone]}`}>
      {children}
    </span>
  );
}

function BigBtn({
  children,
  onClick,
  variant = "primary",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "soft";
  disabled?: boolean;
}) {
  const styles = {
    primary:
      "bg-primary text-primary-foreground shadow-[var(--shadow-cta)] hover:opacity-95",
    ghost:
      "border border-border bg-surface-elevated text-foreground hover:border-primary/40",
    soft: "bg-primary-soft text-primary hover:brightness-95",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-[15px] font-semibold transition active:scale-[0.98] disabled:opacity-50 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  );
}

/* ============================================================
   Screens
   ============================================================ */

function OnboardingScreen({ go }: { go: (s: ScreenId) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const opts = [
    { k: "모임", label: "가족 모임 일정 정하기", emoji: "🍽️" },
    { k: "기념일", label: "생신·기념일 챙기기", emoji: "🎂" },
    { k: "명절", label: "명절·경조사 준비하기", emoji: "🌕" },
    { k: "건강검진", label: "건강검진 챙기기", emoji: "🩺" },
    { k: "선물", label: "선물 준비하기", emoji: "🎁" },
  ];
  return (
    <ScreenShell
      title="시작하기"
      footer={
        <BigBtn onClick={() => go("group")} disabled={!picked}>
          다음
        </BigBtn>
      }
    >
      <div className="mb-6">
        <div className="font-display text-[22px] font-bold leading-snug tracking-tight">
          안녕하세요,
          <br />
          Familit에 오신 걸 환영합니다.
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          어떤 가족 일을 먼저 챙기고 싶나요? 하나만 골라주세요.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        {opts.map((o) => (
          <button
            key={o.k}
            onClick={() => setPicked(o.k)}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
              picked === o.k
                ? "border-primary bg-primary-soft/60"
                : "border-border bg-surface-elevated hover:border-primary/40"
            }`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-background text-xl">
              {o.emoji}
            </span>
            <span className="text-[15px] font-semibold">{o.label}</span>
          </button>
        ))}
      </div>
    </ScreenShell>
  );
}

function GroupScreen({ go, back }: { go: (s: ScreenId) => void; back: () => void }) {
  const [name, setName] = useState("우리 가족");
  const [mode, setMode] = useState<"간편" | "동등">("간편");
  const members = [
    { name: "나", role: "관리자" },
    { name: "엄마", role: "부모님" },
    { name: "아빠", role: "부모님" },
    { name: "동생", role: "공동관리자" },
  ];
  return (
    <ScreenShell
      title="가족 그룹 만들기"
      onBack={back}
      footer={<BigBtn onClick={() => go("board")}>케어보드 시작하기</BigBtn>}
    >
      <div className="space-y-5">
        <Field label="가족 그룹 이름">
          <TextInput value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <div>
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground">가족 구성원</div>
          <div className="space-y-2">
            {members.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated px-3.5 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                    {m.name[0]}
                  </span>
                  <span className="text-[15px] font-semibold">{m.name}</span>
                </div>
                <Pill tone={m.role === "부모님" ? "warn" : "primary"}>{m.role}</Pill>
              </div>
            ))}
            <button className="h-11 w-full rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-primary">
              + 가족 구성원 추가
            </button>
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground">부모님 사용 모드</div>
          <div className="grid grid-cols-2 gap-2">
            {(["간편", "동등"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold ${
                  mode === m
                    ? "border-primary bg-primary-soft/60 text-primary"
                    : "border-border bg-surface-elevated text-foreground"
                }`}
              >
                {m === "간편" ? "간편 응답 모드" : "동등 참여 모드"}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            간편 응답 모드는 부모님이 확인·선택·간단 댓글 중심으로 사용합니다.
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}

function BoardScreen({
  cards,
  go,
  openCard,
  openMenu,
}: {
  cards: ActionCard[];
  go: (s: ScreenId) => void;
  openCard: (id: string) => void;
  openMenu: () => void;
}) {
  return (
    <ScreenShell
      title="우리 가족 케어보드"
      onMenu={openMenu}
      footer={
        <div className="flex gap-2">
          <BigBtn variant="ghost" onClick={() => go("parent")}>
            부모님 화면
          </BigBtn>
          <BigBtn onClick={() => go("create")}>+ 카드 만들기</BigBtn>
        </div>
      }
    >
      <div className="mb-5">
        <div className="text-xs font-semibold text-primary">오늘 · 6월 16일</div>
        <div className="mt-1 font-display text-[20px] font-bold tracking-tight">
          오늘 챙겨야 할 가족 일이 3건 있어요
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-primary/20 bg-primary-soft/50 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          ✨ AI 추천
        </div>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground">
          “가족 식사 날짜”가 흘러가고 있어요. 가족 단톡방에 공유 메시지를 보낼까요?
        </p>
      </div>

      <div className="mb-3 text-xs font-semibold text-muted-foreground">가족 액션 카드</div>
      <div className="space-y-3">
        {cards.map((c) => {
          const meta = CATEGORY_META[c.category];
          const done = c.checklist.filter((x) => x.done).length;
          return (
            <button
              key={c.id}
              onClick={() => openCard(c.id)}
              className="block w-full rounded-2xl border border-border bg-surface-elevated p-4 text-left shadow-[var(--shadow-card)] transition hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`grid h-8 w-8 place-items-center rounded-lg text-base ${meta.tint}`}>
                    {meta.emoji}
                  </span>
                  <Pill>{c.category}</Pill>
                </div>
                <Pill tone="primary">{c.status}</Pill>
              </div>
              <div className="mt-2.5 text-[15.5px] font-bold tracking-tight">{c.title}</div>
              <div className="mt-1 text-[12.5px] text-muted-foreground">
                마감 {c.due} · 담당 {c.owner}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(done / c.checklist.length) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {done}/{c.checklist.length}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-xs font-semibold text-muted-foreground">바로가기</div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <QuickLink emoji="🎁" label="선물 후보" onClick={() => go("gift")} />
        <QuickLink emoji="🍽️" label="모임 조율" onClick={() => go("meeting")} />
        <QuickLink emoji="🩺" label="건강검진" onClick={() => go("health")} />
      </div>
    </ScreenShell>
  );
}

function QuickLink({ emoji, label, onClick }: { emoji: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-surface-elevated px-2 py-3 text-[12px] font-semibold hover:border-primary/40"
    >
      <span className="text-xl">{emoji}</span>
      {label}
    </button>
  );
}

function CreateScreen({
  back,
  goAi,
}: {
  back: () => void;
  goAi: (title: string, category: Category) => void;
}) {
  const [title, setTitle] = useState("어버이날 선물 준비");
  const [cat, setCat] = useState<Category>("선물");
  const [due, setDue] = useState("2026-05-01");
  const cats: Category[] = ["모임", "기념일", "명절", "건강검진", "선물"];

  return (
    <ScreenShell
      title="가족 액션 카드 만들기"
      onBack={back}
      footer={<BigBtn onClick={() => goAi(title, cat)}>✨ AI 체크리스트 생성</BigBtn>}
    >
      <div className="space-y-4">
        <Field label="카드 제목">
          <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <div>
          <div className="mb-1.5 text-xs font-semibold text-muted-foreground">카테고리</div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold ${
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface-elevated text-foreground"
                }`}
              >
                {CATEGORY_META[c].emoji} {c}
              </button>
            ))}
          </div>
        </div>
        <Field label="대상 가족">
          <div className="flex flex-wrap gap-2">
            {["엄마", "아빠", "동생"].map((m) => (
              <Pill key={m} tone="primary">{m}</Pill>
            ))}
          </div>
        </Field>
        <Field label="담당자">
          <TextInput defaultValue="나" />
        </Field>
        <Field label="마감일">
          <TextInput type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        </Field>
        <Field label="반복">
          <div className="flex gap-2">
            {["없음", "매년", "매월"].map((r, i) => (
              <button
                key={r}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold ${
                  i === 0
                    ? "border-primary bg-primary-soft/60 text-primary"
                    : "border-border bg-surface-elevated"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </Field>
      </div>
    </ScreenShell>
  );
}

function AiScreen({
  back,
  title,
  category,
  onUse,
}: {
  back: () => void;
  title: string;
  category: Category;
  onUse: () => void;
}) {
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const presets: Record<Category, string[]> = {
    선물: ["선물 후보 정하기", "가족 의견 받기", "예산 정하기", "구매 여부 확인하기", "부모님께 전달하기"],
    모임: ["날짜 후보 정하기", "가족 가능 날짜 확인하기", "식당 후보 정하기", "예약 담당자 정하기", "예약 완료 확인하기"],
    기념일: ["축하 메시지 정리하기", "선물 정하기", "케이크/식사 예약하기", "가족 일정 공유하기", "사진 정리하기"],
    명절: ["방문 일정 정하기", "선물·용돈 준비하기", "음식 준비 분담하기", "교통편 확인하기", "도착 인사 정리하기"],
    건강검진: ["검진 날짜 확인하기", "예약 여부 확인하기", "준비사항 확인하기", "결과 확인 여부 체크하기", "다음 검진 주기 등록하기"],
  };
  const items = presets[category];

  return (
    <ScreenShell
      title="AI 체크리스트"
      onBack={back}
      footer={
        <div className="flex gap-2">
          <BigBtn variant="ghost" onClick={back}>다시 생성</BigBtn>
          <BigBtn onClick={onUse}>이 체크리스트 사용하기</BigBtn>
        </div>
      }
    >
      <div className="mb-4 rounded-2xl bg-primary-soft/60 p-4">
        <div className="text-xs font-semibold text-primary">✨ AI가 정리했어요</div>
        <div className="mt-1 font-display text-[17px] font-bold tracking-tight">{title}</div>
        <p className="mt-1 text-[12.5px] text-muted-foreground">
          가족과 함께 챙겨야 할 일을 단계별로 나눴어요. 직접 수정하셔도 좋아요.
        </p>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : (
        <ol className="space-y-2">
          {items.map((t, i) => (
            <li
              key={t}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-3.5 py-3"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-[14.5px] font-semibold">{t}</span>
            </li>
          ))}
        </ol>
      )}
      <button className="mt-4 text-sm font-semibold text-primary hover:underline">
        직접 수정하기
      </button>
    </ScreenShell>
  );
}

function CardDetailScreen({
  card,
  back,
  toggle,
  go,
}: {
  card: ActionCard;
  back: () => void;
  toggle: (cardId: string, idx: number) => void;
  go: (s: ScreenId) => void;
}) {
  const meta = CATEGORY_META[card.category];
  const done = card.checklist.filter((x) => x.done).length;
  return (
    <ScreenShell
      title="액션 카드"
      onBack={back}
      footer={
        <div className="flex gap-2">
          <BigBtn variant="ghost" onClick={() => go("parent")}>
            부모님께 보내기
          </BigBtn>
          <BigBtn>완료</BigBtn>
        </div>
      }
    >
      <div className={`rounded-2xl p-4 ${meta.tint}`}>
        <div className="text-xs font-semibold opacity-80">{meta.emoji} {card.category}</div>
        <div className="mt-1 font-display text-[20px] font-bold tracking-tight text-foreground">
          {card.title}
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-foreground/80">
          <span>마감 {card.due}</span>
          <span>·</span>
          <span>담당 {card.owner}</span>
          <span>·</span>
          <span>대상 {card.members.join(", ")}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="font-display text-sm font-bold">체크리스트</div>
        <span className="text-[12px] font-semibold text-muted-foreground">
          {done}/{card.checklist.length} 완료
        </span>
      </div>
      <div className="mt-2 space-y-2">
        {card.checklist.map((it, i) => (
          <button
            key={i}
            onClick={() => toggle(card.id, i)}
            className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
              it.done
                ? "border-primary/40 bg-primary-soft/40"
                : "border-border bg-surface-elevated"
            }`}
          >
            <span
              className={`grid h-6 w-6 place-items-center rounded-md border ${
                it.done ? "border-primary bg-primary text-primary-foreground" : "border-border"
              }`}
            >
              {it.done ? "✓" : ""}
            </span>
            <span className={`text-[14.5px] font-medium ${it.done ? "text-muted-foreground line-through" : ""}`}>
              {it.text}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 font-display text-sm font-bold">가족 의견</div>
      <div className="mt-2 space-y-2">
        {card.comments.length === 0 && (
          <p className="text-[13px] text-muted-foreground">아직 가족 의견이 없어요.</p>
        )}
        {card.comments.map((c, i) => (
          <div key={i} className="rounded-xl bg-muted/60 px-3.5 py-2.5">
            <div className="text-[11.5px] font-semibold text-primary">{c.who}</div>
            <div className="text-[14px] text-foreground">{c.text}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-border p-4">
        <div className="text-xs font-semibold text-muted-foreground">공유 메시지 (단톡방용)</div>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground">
          “{card.title} 진행 중이에요. 아래 링크에서 의견 남겨주세요 🙏”
        </p>
        <button className="mt-2 text-sm font-semibold text-primary hover:underline">
          메시지 복사하기
        </button>
      </div>
    </ScreenShell>
  );
}

function GiftScreen({ back }: { back: () => void }) {
  const [picked, setPicked] = useState<number | null>(0);
  const [purchased, setPurchased] = useState(false);
  const gifts = [
    { name: "마사지기", note: "허리 자주 결리신다고 하심", votes: 2 },
    { name: "건강식품", note: "예산 부담 낮음", votes: 1 },
    { name: "가족 식사 예약", note: "온 가족이 함께", votes: 3 },
    { name: "꽃다발 + 손편지", note: "감성 더하기", votes: 1 },
  ];
  return (
    <ScreenShell title="선물 후보 관리" onBack={back}>
      <div className="rounded-2xl bg-primary-soft/50 p-4">
        <div className="text-xs font-semibold text-primary">어버이날 선물 준비</div>
        <div className="mt-1 font-display text-[18px] font-bold">예산 5~10만원 · 가족 의견 모으는 중</div>
        <p className="mt-1.5 text-[12.5px] text-muted-foreground">
          부모님 취향 메모: 실용적인 것, 부담 없는 것
        </p>
      </div>

      <div className="mt-4 text-xs font-semibold text-muted-foreground">선물 후보</div>
      <div className="mt-2 space-y-2">
        {gifts.map((g, i) => (
          <button
            key={g.name}
            onClick={() => setPicked(i)}
            className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
              picked === i
                ? "border-primary bg-primary-soft/40"
                : "border-border bg-surface-elevated hover:border-primary/40"
            }`}
          >
            <div>
              <div className="text-[15px] font-bold">{g.name}</div>
              <div className="mt-0.5 text-[12px] text-muted-foreground">{g.note}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Pill tone="primary">👍 {g.votes}</Pill>
              {picked === i && <span className="text-[11px] font-semibold text-primary">선택됨</span>}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-border bg-surface-elevated p-4">
        <div>
          <div className="text-[14px] font-semibold">구매 완료 체크</div>
          <div className="text-[12px] text-muted-foreground">실제 결제는 외부에서 진행해주세요</div>
        </div>
        <button
          onClick={() => setPurchased((v) => !v)}
          className={`h-7 w-12 rounded-full p-0.5 transition ${
            purchased ? "bg-primary" : "bg-muted"
          }`}
          aria-label="구매 완료"
        >
          <span
            className={`block h-6 w-6 rounded-full bg-background shadow transition ${
              purchased ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>
      <p className="mt-3 text-[11.5px] text-muted-foreground">
        향후 구매 링크 연동이 추가될 예정이에요. (현재 MVP는 결제 기능을 제공하지 않습니다)
      </p>
    </ScreenShell>
  );
}

function MeetingScreen({ back }: { back: () => void }) {
  const [chosen, setChosen] = useState(1);
  const dates = [
    { d: "6월 21일 토요일 저녁", who: ["동생"] },
    { d: "6월 22일 일요일 점심", who: ["엄마", "아빠"] },
    { d: "6월 28일 토요일 점심", who: ["동생"] },
  ];
  return (
    <ScreenShell title="가족 모임 일정 조율" onBack={back}>
      <div className="rounded-2xl bg-[oklch(0.95_0.04_60)] p-4">
        <div className="text-xs font-semibold text-[oklch(0.42_0.1_50)]">🍽️ 가족 식사</div>
        <div className="mt-1 font-display text-[18px] font-bold">6월 가족 모임</div>
      </div>

      <div className="mt-4 text-xs font-semibold text-muted-foreground">날짜 후보 · 가족 응답</div>
      <div className="mt-2 space-y-2">
        {dates.map((it, i) => (
          <button
            key={it.d}
            onClick={() => setChosen(i)}
            className={`block w-full rounded-2xl border p-4 text-left transition ${
              chosen === i
                ? "border-primary bg-primary-soft/40"
                : "border-border bg-surface-elevated"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-[14.5px] font-bold">{it.d}</div>
              <Pill tone={chosen === i ? "primary" : "default"}>
                {chosen === i ? "확정 예정" : `${it.who.length}명 가능`}
              </Pill>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {it.who.map((w) => (
                <span key={w} className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold">
                  {w}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <BigBtn>최종 날짜 확정하기</BigBtn>
        <BigBtn variant="ghost">예약 담당자 지정 · 나</BigBtn>
        <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-elevated p-4">
          <div className="text-[14px] font-semibold">식당 예약 완료</div>
          <span className="text-[12px] text-muted-foreground">아직</span>
        </div>
      </div>
    </ScreenShell>
  );
}

function HealthScreen({ back }: { back: () => void }) {
  const items = [
    { t: "검진 날짜 확인하기", done: true },
    { t: "예약 여부 확인하기", done: false },
    { t: "준비사항 확인하기 (전날 금식 등)", done: false },
    { t: "결과 확인 여부 체크하기", done: false },
    { t: "다음 검진 주기 등록하기", done: false },
  ];
  return (
    <ScreenShell title="건강검진 일정 관리" onBack={back}>
      <div className="rounded-2xl bg-[oklch(0.94_0.04_200)] p-4">
        <div className="text-xs font-semibold text-[oklch(0.38_0.07_220)]">🩺 건강검진</div>
        <div className="mt-1 font-display text-[18px] font-bold">아빠 건강검진</div>
        <div className="mt-2 grid grid-cols-2 gap-3 text-[12.5px] text-foreground/80">
          <div>
            <div className="text-[11px] text-muted-foreground">검진 날짜</div>
            <div className="font-semibold">7월 3일 (목)</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">병원</div>
            <div className="font-semibold">서울건강검진센터</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">예약 여부</div>
            <div className="font-semibold">예약 완료</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">다음 주기</div>
            <div className="font-semibold">2년 후</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs font-semibold text-muted-foreground">준비 체크리스트</div>
      <div className="mt-2 space-y-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-3.5 py-3"
          >
            <span
              className={`grid h-6 w-6 place-items-center rounded-md border ${
                it.done ? "border-primary bg-primary text-primary-foreground" : "border-border"
              }`}
            >
              {it.done ? "✓" : ""}
            </span>
            <span className="text-[14px] font-medium">{it.t}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-xl bg-muted/60 p-3 text-[12px] leading-relaxed text-muted-foreground">
        Familit은 의료 진단이나 치료 조언을 제공하지 않습니다. 검사 수치·진단서·결과 파일은 입력받지 않으며,
        가족이 일정과 준비를 함께 챙기도록 돕습니다.
      </p>
    </ScreenShell>
  );
}

function ParentScreen({ back, onRespond }: { back: () => void; onRespond: () => void }) {
  const [responded, setResponded] = useState<string | null>(null);
  const opts = ["6월 22일 일요일 점심이 좋아요", "6월 28일 토요일 점심이 좋아요"];
  return (
    <ScreenShell title="부모님 화면" onBack={back}>
      <div className="rounded-3xl bg-primary-soft/60 p-5">
        <div className="text-sm font-semibold text-primary">오늘 확인할 일</div>
        <div className="mt-2 font-display text-[24px] font-bold leading-snug text-foreground">
          이번 가족 식사 날짜를 골라주세요
        </div>
        <p className="mt-2 text-[14px] text-foreground/75">자녀가 정리해뒀어요. 편하신 날을 눌러주세요.</p>
      </div>

      <div className="mt-5 space-y-3">
        {opts.map((o) => {
          const isPicked = responded === o;
          return (
            <button
              key={o}
              onClick={() => {
                setResponded(o);
                setTimeout(onRespond, 800);
              }}
              className={`flex h-16 w-full items-center justify-between rounded-2xl border-2 px-5 text-left text-[17px] font-bold transition ${
                isPicked
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface-elevated text-foreground"
              }`}
            >
              {o}
              {isPicked && <span className="text-2xl">✓</span>}
            </button>
          );
        })}
        <button className="h-14 w-full rounded-2xl border-2 border-border bg-background text-[15px] font-semibold text-muted-foreground">
          나중에 확인할게요
        </button>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold text-muted-foreground">간단 반응</div>
        <div className="mt-2 flex gap-2">
          {["👍", "❤️", "🙏", "😊"].map((e) => (
            <button
              key={e}
              className="h-14 flex-1 rounded-2xl border border-border bg-surface-elevated text-2xl"
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {responded && (
        <div className="mt-5 rounded-2xl bg-primary-soft/50 p-4 text-[14px] font-semibold text-primary">
          ✓ 응답이 가족 액션 카드에 반영되었어요
        </div>
      )}
    </ScreenShell>
  );
}

function BetaScreen({ back }: { back: () => void }) {
  const [step, setStep] = useState<1 | 2 | "done">(1);
  if (step === "done") {
    return (
      <ScreenShell title="신청 완료" onBack={back}>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-primary-soft text-2xl">✓</div>
          <div className="mt-4 font-display text-[22px] font-bold">신청해주셔서 감사합니다</div>
          <p className="mt-2 max-w-xs text-[14px] text-muted-foreground">
            베타 오픈 시 가장 먼저 안내드릴게요. 더 나은 가족 케어 도구를 만들겠습니다.
          </p>
          <button onClick={back} className="mt-6 text-sm font-semibold text-primary hover:underline">
            데모로 돌아가기
          </button>
        </div>
      </ScreenShell>
    );
  }
  return (
    <ScreenShell
      title={step === 1 ? "베타 신청 (1/2)" : "선택 설문 (2/2)"}
      onBack={step === 2 ? () => setStep(1) : back}
      footer={
        <BigBtn onClick={() => setStep(step === 1 ? 2 : "done")}>
          {step === 1 ? "다음" : "신청 완료"}
        </BigBtn>
      }
    >
      {step === 1 ? (
        <div className="space-y-3.5">
          <Field label="이름"><TextInput placeholder="홍길동" /></Field>
          <Field label="이메일"><TextInput type="email" placeholder="you@example.com" /></Field>
          <Field label="연락처"><TextInput placeholder="010-0000-0000" /></Field>
          <Field label="연령대">
            <div className="flex flex-wrap gap-2">
              {["20대", "30대", "40대", "50대+"].map((a) => (
                <button key={a} className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-semibold hover:border-primary/40">
                  {a}
                </button>
              ))}
            </div>
          </Field>
          <Field label="부모님과 별도 거주하시나요?">
            <div className="flex gap-2">
              {["예", "아니오"].map((a) => (
                <button key={a} className="flex-1 rounded-xl border border-border bg-surface-elevated px-3 py-2.5 text-sm font-semibold hover:border-primary/40">
                  {a}
                </button>
              ))}
            </div>
          </Field>
        </div>
      ) : (
        <div className="space-y-4">
          <Field label="부모님 연령대">
            <div className="flex flex-wrap gap-2">
              {["50대", "60대", "70대", "80대+"].map((a) => (
                <button key={a} className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-semibold">
                  {a}
                </button>
              ))}
            </div>
          </Field>
          <Field label="가족 구성원 수">
            <TextInput type="number" defaultValue={4} />
          </Field>
          <Field label="가장 챙기기 어려운 항목">
            <div className="flex flex-wrap gap-2">
              {["가족 모임", "생신·기념일", "명절·경조사", "선물 준비", "건강검진", "기타"].map((a) => (
                <button key={a} className="rounded-full border border-border bg-surface-elevated px-3.5 py-1.5 text-[13px] font-semibold">
                  {a}
                </button>
              ))}
            </div>
          </Field>
          <Field label="사용자 인터뷰 참여 가능 여부">
            <div className="flex gap-2">
              {["참여 가능", "어려움"].map((a) => (
                <button key={a} className="flex-1 rounded-xl border border-border bg-surface-elevated px-3 py-2.5 text-sm font-semibold">
                  {a}
                </button>
              ))}
            </div>
          </Field>
        </div>
      )}
    </ScreenShell>
  );
}

function MenuSheet({
  go,
  close,
}: {
  go: (s: ScreenId) => void;
  close: () => void;
}) {
  const items: { k: ScreenId; label: string; emoji: string }[] = [
    { k: "board", label: "케어보드 홈", emoji: "🏠" },
    { k: "create", label: "카드 만들기", emoji: "➕" },
    { k: "gift", label: "선물 후보 관리", emoji: "🎁" },
    { k: "meeting", label: "가족 모임 조율", emoji: "🍽️" },
    { k: "health", label: "건강검진 일정", emoji: "🩺" },
    { k: "parent", label: "부모님 화면", emoji: "👵" },
    { k: "onboarding", label: "온보딩 다시 보기", emoji: "🔄" },
    { k: "beta", label: "베타 신청하기", emoji: "✉️" },
  ];
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-black/40" onClick={close}>
      <div
        className="mt-auto rounded-t-3xl bg-background p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-muted" />
        <div className="mb-2 text-xs font-semibold text-muted-foreground">화면 이동</div>
        <div className="grid grid-cols-2 gap-2">
          {items.map((i) => (
            <button
              key={i.k}
              onClick={() => {
                go(i.k);
                close();
              }}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface-elevated p-3 text-left text-[14px] font-semibold hover:border-primary/40"
            >
              <span className="text-lg">{i.emoji}</span> {i.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Root Demo Component
   ============================================================ */

export default function FamilitDemo() {
  const [screen, setScreen] = useState<ScreenId>("onboarding");
  const [history, setHistory] = useState<ScreenId[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cards, setCards] = useState<ActionCard[]>(DUMMY_CARDS);
  const [activeCard, setActiveCard] = useState<string>("c2");
  const [draft, setDraft] = useState<{ title: string; category: Category }>({
    title: "어버이날 선물 준비",
    category: "선물",
  });

  const go = (s: ScreenId) => {
    setHistory((h) => [...h, screen]);
    setScreen(s);
  };
  const back = () => {
    setHistory((h) => {
      if (h.length === 0) {
        setScreen("board");
        return h;
      }
      const next = [...h];
      const prev = next.pop()!;
      setScreen(prev);
      return next;
    });
  };

  const card = cards.find((c) => c.id === activeCard) ?? cards[0];

  const toggle = (id: string, idx: number) => {
    setCards((cs) =>
      cs.map((c) =>
        c.id === id
          ? {
              ...c,
              checklist: c.checklist.map((it, i) =>
                i === idx ? { ...it, done: !it.done } : it
              ),
            }
          : c
      )
    );
  };

  const respondToMeeting = () => {
    setCards((cs) =>
      cs.map((c) =>
        c.id === "c2"
          ? {
              ...c,
              status: "엄마 응답 도착",
              comments: [...c.comments, { who: "엄마", text: "6월 22일 점심 좋아요" }],
            }
          : c
      )
    );
  };

  return (
    <div className="px-4 py-6 md:py-10">
      <PhoneFrame>
        {(() => {
          switch (screen) {
            case "onboarding":
              return <OnboardingScreen go={go} />;
            case "group":
              return <GroupScreen go={go} back={back} />;
            case "board":
              return (
                <BoardScreen
                  cards={cards}
                  go={go}
                  openCard={(id) => {
                    setActiveCard(id);
                    go("cardDetail");
                  }}
                  openMenu={() => setMenuOpen(true)}
                />
              );
            case "create":
              return (
                <CreateScreen
                  back={back}
                  goAi={(t, c) => {
                    setDraft({ title: t, category: c });
                    go("ai");
                  }}
                />
              );
            case "ai":
              return (
                <AiScreen
                  back={back}
                  title={draft.title}
                  category={draft.category}
                  onUse={() => {
                    setScreen("board");
                    setHistory([]);
                  }}
                />
              );
            case "cardDetail":
              return <CardDetailScreen card={card} back={back} toggle={toggle} go={go} />;
            case "gift":
              return <GiftScreen back={back} />;
            case "meeting":
              return <MeetingScreen back={back} />;
            case "health":
              return <HealthScreen back={back} />;
            case "parent":
              return (
                <ParentScreen
                  back={back}
                  onRespond={() => {
                    respondToMeeting();
                  }}
                />
              );
            case "beta":
              return <BetaScreen back={back} />;
            default:
              return null;
          }
        })()}
        {menuOpen && <MenuSheet go={(s) => go(s)} close={() => setMenuOpen(false)} />}
      </PhoneFrame>
    </div>
  );
}
