# Familit (패밀릿)

> 패밀릿 Familit은 부모님과 떨어져 사는 자녀가 가족 모임, 기념일, 선물 준비,
> 건강검진처럼 가족끼리 챙겨야 할 일을 놓치지 않도록 돕는 가족 케어 앱입니다.
> 가족 액션 카드, AI 체크리스트, 가족 확인/응답 기능을 통해
> 카카오톡이나 캘린더에서 흘러가던 가족 일을 **실행 가능한 형태**로 정리합니다.

랜딩페이지: `/` · 클릭 가능한 MVP 데모: `/demo`

---

## 주요 기능

- **랜딩 페이지** — 문제 제기 → 해결 방식 → 부모님 친화 UI → 베타 신청 (PAS/AIDA 구조)
- **클릭 가능한 MVP 목업** — 케어보드, 가족 액션 카드, AI 체크리스트, 부모님 간편 응답
- **베타 신청 폼** — Supabase `beta_signups` 테이블에 저장 (미연결 시 로컬 데모 모드)
- **반응형** — 모바일/태블릿/데스크톱

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| 프레임워크 | TanStack Start v1 (React 19 + Vite 7) |
| 라우팅 | TanStack Router (file-based) |
| 스타일 | Tailwind CSS v4, shadcn/ui |
| 백엔드 | Supabase (Postgres + Auth + RLS) |
| 검증 | Zod |

## 페이지 구조

```
/             랜딩 페이지 (Hero, Problem, Solution, Beta Form, FAQ ...)
/demo         클릭 가능한 MVP 데모 (Care Board / AI 체크리스트 / 부모님 모드)
```

## 폴더 구조

```
src/
├── components/
│   ├── FamilitLanding.tsx     # 랜딩 페이지 전체
│   ├── FamilitDemo.tsx        # 클릭 가능한 MVP 목업
│   └── ui/                    # shadcn/ui
├── lib/
│   ├── supabaseClient.ts      # 브라우저 Supabase 클라이언트
│   └── betaSignup.ts          # 베타 신청 zod 스키마 + 저장 로직
├── routes/
│   ├── __root.tsx
│   ├── index.tsx              # /
│   └── demo.tsx               # /demo
└── styles.css                 # Tailwind v4 + 디자인 토큰
supabase/
└── schema.sql                 # 베타 신청 + MVP 확장 테이블 + RLS
```

---

## 로컬 실행

```bash
# 1) 설치
bun install        # 또는 npm install / pnpm install

# 2) 환경변수 준비
cp .env.example .env
#   → .env 파일에 Supabase URL/Anon Key를 입력합니다.

# 3) 개발 서버
bun run dev        # http://localhost:3000

# 4) 프로덕션 빌드
bun run build
bun run start
```

## 환경변수

`.env.example` 참고. 실제 값은 `.env` 에만 입력하세요. `.env` 는 `.gitignore` 에 포함되어 있습니다.

| 변수 | 설명 |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase **anon (publishable)** 키 |
| `VITE_APP_NAME` | 앱 이름 (선택) |

> ⚠️ **service_role 키는 절대 프론트엔드(.env 의 `VITE_*` 변수)에 넣지 마세요.**
> 서버 전용 작업(이메일 발송, 관리자 통계 등)에는 Supabase Edge Function + Secret 을 사용합니다.

---

## Supabase 연결 방법

### 옵션 A — 기존 Supabase 프로젝트에 연결

1. Lovable 에디터 좌측 하단 **+ (Plus) 메뉴 → Supabase → Connect Supabase** 를 클릭합니다.
2. Supabase 로그인 → 연결할 **기존 프로젝트** 를 선택합니다.
3. 연결되면 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 환경변수가 자동으로 주입됩니다.
4. Supabase Dashboard → **SQL Editor** 에서 [`supabase/schema.sql`](./supabase/schema.sql) 전체를 붙여넣고 실행합니다.
5. 랜딩페이지 `/#beta` 에서 베타 신청을 제출 → Dashboard → Table Editor → `beta_signups` 에 저장 확인.

### 옵션 B — Lovable Cloud 사용 (새 Supabase 자동 생성)

채팅에서 "Lovable Cloud 활성화"를 요청하면 새 Supabase 프로젝트가 자동 생성되어 연결됩니다.

### 생성되는 테이블 (요약)

| 테이블 | 용도 |
| --- | --- |
| `beta_signups` | 베타 신청 폼 (MVP 1차 저장 대상) |
| `family_groups` / `family_members` | 가족 그룹 및 멤버 (확장) |
| `action_cards` / `checklist_items` | 가족 액션 카드 + AI 체크리스트 (확장) |
| `card_comments` / `family_responses` | 가족 의견, "확인했어요/이 날짜 좋아요" 응답 (확장) |
| `gift_options` | 선물 후보 (확장) |

모든 테이블에 RLS 활성화. 비로그인 사용자는 `beta_signups` INSERT 만 가능합니다.

> ⚠️ MVP 단계에서는 **건강검진 수치, 진단명, 처방전, 업로드 파일** 등 민감정보를 저장하지 않습니다.

---

## GitHub 업로드 / 동기화

Lovable 은 GitHub 와 **양방향 자동 동기화** 됩니다.

1. Lovable 에디터 좌측 하단 **+ (Plus) 메뉴 → GitHub → Connect project**.
2. GitHub 인증 후 **계정 또는 조직** 선택.
3. **기존 repository 에 연결** 또는 **새 repository 생성** 선택.
4. 연결 직후 현재 코드가 자동으로 push 됩니다.
5. 이후 Lovable ↔ GitHub 변경 사항은 실시간으로 sync 됩니다.

### GitHub clone 후 로컬 실행

```bash
git clone <your-repo-url>
cd <repo>
bun install
cp .env.example .env   # Supabase 값 입력
bun run dev
```

### ZIP 다운로드

- Lovable 우측 **Code Editor → Download codebase** 버튼으로 전체 코드를 ZIP 으로 받을 수 있습니다 (유료 워크스페이스 한정).
- 또는 GitHub 연결 후 → repo 페이지 → **Code → Download ZIP**.

---

## 배포 전 확인사항

- [ ] `.env` 가 Git 에 커밋되지 않았는지 (`git status` 로 확인)
- [ ] `supabase/schema.sql` 실행 완료 → `beta_signups` 테이블 존재
- [ ] 베타 신청 폼 제출 → Supabase 에 row 가 쌓이는지 확인
- [ ] OG 이미지 / 메타 태그 (`src/routes/__root.tsx`) 가 실제 도메인으로 업데이트됐는지
- [ ] Supabase Auth Provider 설정 (확장 기능 사용 시)

## 민감정보 관리 주의사항

- `.env` / `service_role 키` / 개인 토큰은 **절대 커밋 금지**.
- 프론트엔드에는 publishable(anon) 키만 사용합니다.
- 가족·건강 관련 데이터는 RLS 로 가족 그룹 멤버에게만 노출됩니다.
- MVP 에서는 건강검진 결과·진단명·파일을 저장하지 않습니다.

---

## 라이선스

Private (Familit Team). 외부 사용 전 별도 협의 필요.
