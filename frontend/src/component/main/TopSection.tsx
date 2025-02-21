import Image from "next/image";
import React from "react";

const TopSection = () => {
  return (
    <section className="relative pt-[72px] w-full min-h-[500px] flex flex-col justify-center items-center text-center bg-gray-900 text-white">
      <div className="w-full min-h-[420px] flex items-center justify-center">
        <Image
          src="/clean-bg-01.jpg"
          alt="깨끗한 집 사진"
          // width={100}
          // height={100}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
        <div className="relative z-10">
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
