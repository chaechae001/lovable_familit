import { createFileRoute } from "@tanstack/react-router";
import FamilitLanding from "@/components/FamilitLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Familit — 가족을 챙기는 마음이 실행으로" },
      {
        name: "description",
        content:
          "부모님과 떨어져 사는 30·40대 자녀를 위한 가족 케어 운영 앱. 생신, 명절, 건강검진, 가족 모임을 액션 카드로 정리하고 함께 확인·완료하세요. 베타 신청 받는 중.",
      },
      { property: "og:title", content: "Familit — 가족 케어 운영 앱" },
      {
        property: "og:description",
        content: "놓치기 쉬운 가족 일을 가족 액션 카드로. 베타 참여자 모집 중.",
      },
    ],
  }),
  component: FamilitLanding,
});
