import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, Database, UserCheck, Mail, FileText } from "lucide-react";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "신뢰와 보안 — Familit" },
      {
        name: "description",
        content:
          "Familit이 가족 정보를 어떻게 보호하는지, 어떤 데이터를 수집하고 어떻게 사용하는지 안내합니다.",
      },
      { property: "og:title", content: "Familit 신뢰와 보안" },
      {
        property: "og:description",
        content: "데이터 보호 정책, 접근 통제, 개인정보 처리 방식에 대한 안내",
      },
    ],
  }),
  component: TrustPage,
});

function TrustPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <Link to="/" className="font-display text-lg font-bold tracking-tight">
            Familit
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← 홈으로
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          신뢰와 보안
        </div>
        <h1
          className="mt-4 font-display font-bold tracking-tight break-keep"
          style={{ fontSize: "clamp(26px, 5vw, 40px)" }}
        >
          가족 정보는 신중하게 다룹니다.
        </h1>
        <p className="mt-4 text-muted-foreground break-keep leading-relaxed">
          이 페이지는 Familit 팀이 직접 작성·관리하는 안내문입니다. 외부 인증이나
          제3자 검증을 의미하지 않으며, 서비스가 발전함에 따라 내용이 갱신될 수
          있습니다. 현재 Familit은 베타 단계이며, 아래는 지금 시점의 실제 운영
          방식을 설명합니다.
        </p>

        <div className="mt-10 space-y-5">
          <TrustCard
            Icon={Lock}
            title="접근 통제 (Row Level Security)"
            body={
              <>
                가족 그룹·액션 카드·체크리스트·코멘트 등 모든 가족 데이터는
                데이터베이스 단의 행 수준 보안(RLS)으로 보호됩니다. 본인이 속한
                가족 그룹의 데이터에만 접근할 수 있으며, 그룹 관리자라도 다른
                구성원의 권한(관리자/부모 모드)을 임의로 변경할 수 없도록 컬럼
                단위로 제한되어 있습니다.
              </>
            }
          />

          <TrustCard
            Icon={UserCheck}
            title="인증과 세션"
            body={
              <>
                로그인은 이메일·소셜 로그인을 통한 표준 인증을 사용합니다. 인증
                토큰은 브라우저에 안전하게 보관되며, 서버로 전달되는 모든 요청은
                해당 사용자의 권한 범위 안에서만 처리됩니다.
              </>
            }
          />

          <TrustCard
            Icon={Database}
            title="수집하는 정보"
            body={
              <>
                베타 신청 시 이름, 이메일, 선택적으로 연락처·연령대·가족 구성·
                주요 어려움을 수집합니다. 서비스 이용 중에는 가족이 함께 챙길
                일(생신·모임·건강검진 등)에 관한 카드와 체크리스트가 저장됩니다.
                의료 진단이나 민감 건강정보는 수집·처리하지 않으며, AI 추천은
                참고용이며 의학적 조언을 대체하지 않습니다.
              </>
            }
          />

          <TrustCard
            Icon={FileText}
            title="데이터 사용과 보관"
            body={
              <>
                수집한 정보는 서비스 제공, 베타 운영 안내, 사용성 개선을 위해
                사용합니다. 사용자의 명시적 동의 없이 제3자에게 판매·공유하지
                않습니다. 계정·가족 그룹 삭제 요청 시 관련 데이터를 합리적인
                기간 안에 삭제합니다.
              </>
            }
          />

          <TrustCard
            Icon={Shield}
            title="인프라"
            body={
              <>
                Familit은 관리형 클라우드 인프라 위에서 운영되며, 데이터는 전송
                구간(TLS) 및 저장 시 암호화됩니다. 운영팀의 데이터베이스 접근은
                최소 권한 원칙에 따라 관리됩니다.
              </>
            }
          />

          <TrustCard
            Icon={Mail}
            title="문의 및 보안 신고"
            body={
              <>
                개인정보 처리·보안 취약점 신고·계정 삭제 요청은 베타 신청 시
                제공하신 이메일 회신 또는 운영팀 안내 채널을 통해 접수해 주세요.
                확인 즉시 검토하여 가능한 한 빠르게 회신드립니다.
              </>
            }
          />
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground break-keep leading-relaxed">
          본 문서는 Familit 팀이 유지·관리하는 안내문으로, 법적 약관 또는
          공식 개인정보처리방침을 대체하지 않습니다. 정식 약관과 처리방침은
          서비스 출시 시 별도로 게시될 예정입니다.
        </div>
      </section>
    </main>
  );
}

function TrustCard({
  Icon,
  title,
  body,
}: {
  Icon: typeof Shield;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="font-display text-lg font-bold tracking-tight break-keep">
          {title}
        </h2>
      </div>
      <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground break-keep">
        {body}
      </p>
    </div>
  );
}
