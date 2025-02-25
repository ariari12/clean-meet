import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

const TopSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // 보이면 활성화
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section className="relative pt-[72px] w-full min-h-[500px] flex flex-col justify-center items-center text-center bg-gray-900 text-white">
      <div className="w-full min-h-[420px] flex items-center justify-center">
        {/* 배경 이미지 */}
        <Image
          src="/clean-bg-01.jpg"
          alt="깨끗한 집 사진"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />

        {/* 텍스트 영역 */}
        <div
          ref={ref}
          className={`relative z-10 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"
          }`}
        >
          <h1 className="text-5xl font-bold drop-shadow-lg">
            &quot;깨끗한 공간, 새로운 시작&quot;
          </h1>
          <p className="text-xl mt-4 opacity-90">
            청소는 이제 전문가에게 맡기세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
