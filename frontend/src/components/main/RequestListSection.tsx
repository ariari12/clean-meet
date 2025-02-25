import Image from "next/image";
import Link from "next/link";
import React from "react";

const RequestListSection = () => {
  return (
    <section className="w-full bg-zinc-100 py-32">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-semibold">등록 업체</h2>
        <p>수많은 업체들이 현재 Clean Meet과 함께하고 있습니다</p>

        {/* 슬라이드 영역 */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-slide-motion whitespace-nowrap">
            {/* 임시로 확인 더미 넣었음 */}
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex gap-6">
                {[
                  { src: "/company-bg-01.jpeg", name: "청소마스터" },
                  { src: "/company-bg-02.webp", name: "깔끔이 서비스" },
                  { src: "/company-bg-03.jpg", name: "프리미엄 클리닝" },
                  { src: "/company-bg-04.avif", name: "스마트 클린" },
                  { src: "/company-bg-05.jpg", name: "한방 청소" },
                ].map((company, index) => (
                  <div key={index} className="w-[280px] flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="w-full h-[180px]">
                        <Image
                          src={company.src}
                          alt={company.name}
                          width={280}
                          height={180}
                          className="object-cover w-full h-full rounded-t-xl"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-gray-800 text-lg font-semibold">
                          {company.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link href="/users/signup" passHref>
            <span className="max-w-[320px] block px-6 py-3 bg-zinc-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-zinc-950 hover:border-[1px] hover:border-zinc-950 transition cursor-pointer">
              협력업체 등록하러 가기
            </span>
          </Link>
        </div>
      </div>

      {/* 커스텀 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes slideMotion {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-slide-motion {
          animation: slideMotion 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default RequestListSection;
