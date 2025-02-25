import Link from "next/link";
import React from "react";

const Sample1Section = () => {
  return (
    <section className="w-full bg-gray-100 flex justify-center py-32">
      <div className="h-full bg-gray-100 text-center space-y-8 px-40">
        <h2 className="text-3xl font-semibold">
          전문가의 도움이 필요한 혼자 청소하기 힘든 순간들
        </h2>

        <div className="grid grid-cols-4 gap-6 w-full px-32">
          {/* 일반 청소 */}
          <div className="relative flex flex-col min-w-[300px] w-full h-full bg-slate-50 rounded-lg shadow-md group">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 rounded-t-xl z-10 transition-opacity"></div>
            <div
              className="relative w-full h-full min-h-[350px] overflow-hidden bg-cover bg-center rounded-t-xl"
              style={{ backgroundImage: "url('/clean-main4.jpg')" }}
            >
              {/* 호버 시 사라짐 */}
              <div className="absolute bg-zinc-50 z-30 bottom-0 opacity-100 group-hover:opacity-0 transition-opacity">
                <h3 className="mt-3 text-xl font-semibold">일반 이사 청소</h3>
                <p className="text-gray-600 my-2 px-5 text-sm">
                  이사 후 남겨진 먼지와 얼룩, 직접 하기에는 너무 벅찹니다.
                </p>
              </div>
            </div>

            {/* 호버 시 보여줄 텍스트 */}
            <div className="absolute top-0 left-0 w-full h-full p-10 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 text-white text-center transition-opacity z-20">
              <h3 className="text-2xl font-medium">일반 이사 청소</h3>
              <p className="mt-2 text-left">
                이사 후 남겨진 먼지와 얼룩, 직접 하기에는 너무 벅찹니다. 바쁜
                일정을 소화하면서 이사 청소를 맡기면, 시간을 절약할 수 있고,
                전문적인 장비와 청소 용품을 사용하여 보다 깔끔한 결과를 얻을 수
                있습니다.
              </p>
            </div>
          </div>

          {/* 사무실 청소 */}
          <div className="relative flex flex-col min-w-[300px] w-full h-full bg-slate-50 rounded-lg shadow-md group">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 rounded-t-xl z-10 transition-opacity"></div>
            <div
              className="relative w-full h-full min-h-[350px] overflow-hidden bg-cover bg-center rounded-t-xl"
              style={{ backgroundImage: "url('/clean-main2.jpg')" }}
            >
              {/* 호버 시 사라짐 */}
              <div className="absolute bg-zinc-50 z-30 bottom-0 opacity-100 group-hover:opacity-0 transition-opacity">
                <h3 className="mt-3 text-xl font-semibold">사무실 청소</h3>
                <p className="text-gray-600 my-2 px-5 text-sm">
                  전문 청소 서비스로 깨끗한 사무실을 유지하세요.
                </p>
              </div>
            </div>

            {/* 호버 시 보여줄 텍스트 */}
            <div className="absolute top-0 left-0 w-full h-full p-10 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 text-white text-center transition-opacity z-20">
              <h3 className="text-2xl font-medium">일반 이사 청소</h3>
              <p className="mt-2 text-left">
                사무실 내 먼지와 오염물질을 제거하고, 쾌적한 업무 환경을
                제공합니다. 바쁜 업무에 방해되지 않도록 빠르고 효율적으로 청소를
                마칩니다.
              </p>
            </div>
          </div>

          {/* 특수 청소 */}
          <div className="relative flex flex-col min-w-[300px] w-full h-full bg-slate-50 rounded-lg shadow-md group">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 rounded-t-xl z-10 transition-opacity"></div>
            <div
              className="relative w-full h-full min-h-[350px] overflow-hidden bg-cover bg-center rounded-t-xl"
              style={{ backgroundImage: "url('/clean-main1.png')" }}
            >
              {/* 호버 시 사라짐 */}
              <div className="absolute bg-zinc-50 z-30 bottom-0 opacity-100 group-hover:opacity-0 transition-opacity">
                <h3 className="mt-3 text-xl font-semibold">특수 청소</h3>
                <p className="text-gray-600 my-2 px-5 text-sm">
                  특수 상황에 필요한 오염이 심한 곳도 전문 장비로 깨끗하게
                  청소합니다.
                </p>
              </div>
            </div>

            {/* 호버 시 보여줄 텍스트 */}
            <div className="absolute top-0 left-0 w-full h-full p-10 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 text-white text-center transition-opacity z-20">
              <h3 className="text-2xl font-medium">특수 청소</h3>
              <p className="mt-2 text-left">
                물이나 화학물질로 인한 오염, 대형 기계나 산업시설 청소 등 특수
                상황에서의 청소도 전문가가 처리합니다. 필요한 청소를 맞춤형으로
                제공합니다.
              </p>
            </div>
          </div>

          {/* 방역 청소 */}
          <div className="relative flex flex-col min-w-[300px] w-full h-full bg-slate-50 rounded-lg shadow-md group">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 rounded-t-xl z-10 transition-opacity"></div>
            <div
              className="relative w-full h-full min-h-[350px] overflow-hidden bg-cover bg-center rounded-t-xl"
              style={{ backgroundImage: "url('/clean-main3.jpg')" }}
            >
              {/* 호버 시 사라짐 */}
              <div className="absolute bg-zinc-50 z-30 bottom-0 opacity-100 group-hover:opacity-0 transition-opacity">
                <h3 className="mt-3 text-xl font-semibold">방역 청소</h3>
                <p className="text-gray-600 my-2 px-5 text-sm">
                  방역이 필요한 공간에서의 청소 서비스를 제공합니다.
                </p>
              </div>
            </div>

            {/* 호버 시 보여줄 텍스트 */}
            <div className="absolute top-0 left-0 w-full h-full p-10 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 text-white text-center transition-opacity z-20">
              <h3 className="text-2xl font-medium">방역 청소</h3>
              <p className="mt-2 text-left">
                코로나19 등 감염병 예방을 위해 방역 청소가 필요합니다. 고도로
                전문화된 방역 장비를 사용하여 방역 작업을 안전하고 철저하게
                수행합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-12">
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
