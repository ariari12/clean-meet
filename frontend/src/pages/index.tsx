import Footer from "@/components/Footer";
import ComReviewSection from "@/components/main/ComReviewSection";
import RequestListSection from "@/components/main/RequestListSection";
import Sample1Section from "@/components/main/Sample1Section";
import TopSection from "@/components/main/TopSection";
// import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center">
      {/* 플랫폼 짧은 슬로건 & 메인 이미지 영역*/}
      <TopSection />

      {/* 청소하기 어려운 사례 예시 영역 */}
      <Sample1Section />

      {/* 회사 소개 및 리뷰 영역*/}
      <ComReviewSection />

      {/* 등록된 협력 업체 소개 영역*/}
      <RequestListSection />

      <Footer />
    </div>
  );
}
