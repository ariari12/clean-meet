import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sample1Section = () => {
  return (
    <section className="w-full bg-gray-100 flex justify-center py-32">
      <div className="h-full bg-gray-100 text-center space-y-8 px-40">
        <h2 className="text-3xl font-semibold">
          전문가의 도움이 필요한 혼자 청소하기 힘든 순간들
        </h2>

        <div className="grid grid-cols-4 gap-6 w-full">
          <div className="flex flex-col w-full h-full bg-slate-50 p-6 rounded-lg shadow ">
            <Image
              src={"/clean-main4.jpg"}
              alt={""}
              width={150}
              height={150}
              className="object-cover w-full h-full rounded-t-xl"
            />
            <h3 className="mt-3 text-xl font-medium">일반 이사 청소</h3>
            <p className="text-gray-600 mt-2">
              이사 후 남겨진 먼지와 얼룩, 직접 하기에는 너무 벅찹니다.
            </p>
          </div>

          <div className="flex flex-col w-full bg-slate-50  p-6 rounded-lg shadow h-full">
            <Image
              src={"/clean-main2.jpg"}
              alt={""}
              width={150}
              height={150}
              className="object-cover w-full h-full rounded-t-xl"
            />
            <h3 className="mt-3 text-xl font-medium">사무실 청소</h3>
            <p className="text-gray-600 mt-2">
              이사 후 남겨진 먼지와 얼룩, 직접 하기에는 너무 벅찹니다.
            </p>
          </div>

          <div className="flex flex-col w-full bg-slate-50  p-6 rounded-lg shadow h-full">
            <Image
              src={"/clean-main3.jpg"}
              alt={""}
              width={150}
              height={150}
              className="object-cover w-full h-full rounded-t-xl"
            />
            <h3 className="mt-3 text-xl font-medium">병원 방역 및 청소</h3>
            <p className="text-gray-600 mt-2">
              이사 후 남겨진 먼지와 얼룩, 직접 하기에는 너무 벅찹니다.
            </p>
          </div>

          <div className="flex flex-col w-full bg-slate-50 p-6 rounded-lg shadow h-full">
            <Image
              src={"/clean-main1.png"}
              alt={""}
              width={150}
              height={150}
              className="object-cover w-full h-full rounded-t-xl"
            />
            <h3 className="mt-3 text-xl font-medium">방치된 집 특수 청소</h3>
            <p className="text-gray-600 mt-2">
              이사 후 남겨진 먼지와 얼룩, 직접 하기에는 너무 벅찹니다.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link href="/request/regist" passHref>
            <span className="max-w-[320px] block px-6 py-3 bg-zinc-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-zinc-950 hover:border-[1px] hover:border-zinc-950 transition cursor-pointer">
              의뢰 등록하러 가기
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sample1Section;
