import Footer from "@/component/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* 플랫폼 짧은 슬로건 & 메인 이미지 영역*/}
      <section className="pt-[72px] relative w-full h-[700px] flex flex-col justify-center items-center text-center bg-gray-900 text-white">
        <Image
          src="/clean-bg-01.jpg"
          alt="깨끗한 집 사진"
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
      </section>

      {/* 청소하기 어려운 사례 예시 영역 */}
      <section className="w-full bg-gray-100 flex justify-center py-32">
        <div className="min-w-5xl h-full bg-gray-100  text-center space-y-8 px-96">
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

      {/* 일반 가정청 소, 특수 청소, 방역 같은 플랫폼 제공 서비스 소개 영역*/}
      {/* <section className="max-w-5xl text-center space-y-8 py-16"> */}
      <section className="w-full text-center space-y-8 px-20 py-32 bg-fixed bg-cover bg-center relative">
        <h2 className="text-3xl font-semibold">
          다양한 업체를 신중히 선택할 수 있어요
        </h2>
        {/* <div className="grid grid-cols-3 gap-6"> */}
        <div className="bg-zinc-100 max-w-6xl mx-auto">
          <div className="relative flex justify-between gap-7 px-32 bg-orange-50 h-[680px] min-h-[420px] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="w-[70%] max-w-[580px] max-h-[580px] h-[80%]">
              <Image
                src={"/company-bg-01.jpeg"}
                alt={""}
                width={150}
                height={150}
                className="object-cover w-full h-full rounded-t-xl"
              />
            </div>
            <div className="z-10 absolute bottom-[-28px] right-[120px] bg-zinc-50 w-full max-w-[450px] min-h-[350px] shadow-xl">
              <h3 className="pt-10 text-xl font-bold">청소마스터</h3>
              <p className="text-gray-600 mt-2">주소: 경기도 성남시</p>
              <p className="text-gray-600 mt-2">
                집안 구석구석 깨끗하게 청소해 드립니다.
              </p>
              <div className="mt-10">
                <p className="text-gray-600 mt-2">김**</p>
                <p className="text-gray-600 mt-2">
                  직원분들이 친절하고 청소 후 완전 깨끗해졌어요
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-end gap-7 mt-16 px-32 bg-orange-50 h-[680px] min-h-[420px] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="w-[70%] max-w-[580px] max-h-[580px] h-[80%]">
              <Image
                src={"/company-bg-02.webp"}
                alt={""}
                width={150}
                height={150}
                className="object-cover w-full h-full rounded-t-xl"
              />
            </div>
            <div className="z-10 absolute bottom-[-28px] left-[120px] bg-zinc-50 w-full max-w-[450px] min-h-[350px] shadow-xl">
              <h3 className="pt-10 text-xl font-bold">청소나라</h3>
              <p className="text-gray-600 mt-2">주소: 경기도 성남시</p>
              <p className="text-gray-600 mt-2">
                집안 구석구석 깨끗하게 청소해 드립니다.
              </p>
              <div className="mt-10">
                <p className="text-gray-600 mt-2">김**</p>
                <p className="text-gray-600 mt-2">
                  직원분들이 친절하고 청소 후 완전 깨끗해졌어요
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-between gap-7 mt-16 px-32 bg-orange-50 h-[680px] min-h-[420px] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="w-[70%] max-w-[580px] max-h-[580px] h-[80%]">
              <Image
                src={"/company-bg-03.jpg"}
                alt={""}
                width={150}
                height={150}
                className="object-cover w-full h-full rounded-t-xl"
              />
            </div>
            <div className="z-10 absolute bottom-[-28px] right-[120px] bg-zinc-50 w-full max-w-[450px] min-h-[350px] shadow-xl">
              <h3 className="pt-10 text-xl font-bold">청소왕</h3>
              <p className="text-gray-600 mt-2">주소: 경기도 성남시</p>
              <p className="text-gray-600 mt-2">
                집안 구석구석 깨끗하게 청소해 드립니다.
              </p>
              <div className="mt-10">
                <p className="text-gray-600 mt-2">김**</p>
                <p className="text-gray-600 mt-2">
                  직원분들이 친절하고 청소 후 완전 깨끗해졌어요
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-20">
          <Link href="/company" passHref>
            <span className="max-w-[320px] block px-6 py-3 bg-zinc-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-zinc-950 hover:border-[1px] hover:border-zinc-950 transition cursor-pointer">
              전문 업체 확인하러 가기
            </span>
          </Link>
        </div>
      </section>

      {/* 일반 가정청소, 특수 청소, 방역 같은 플랫폼 제공 서비스 소개 영역*/}
      <section
        className="text-center space-y-8 w-full"
        style={{
          backgroundImage: "url('/clean-bg-03.jpg')",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundBlendMode: "darken",
        }}
      >
        <div className="px-32 pt-32 pb-16">
          <h2 className="text-3xl font-semibold mb-20 text-stone-100">
            전문업체의 도움이 필요한 고객들의 의뢰 목록이에요
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="min-h-[300px] bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-medium">1</h3>
              <p className="text-gray-600 mt-2">
                집안 구석구석 깨끗하게 청소해 드립니다.
              </p>
            </div>
            <div className="min-h-[300px] bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-medium">2</h3>
              <p className="text-gray-600 mt-2">
                새집 입주 전 완벽한 청소 서비스 제공!
              </p>
            </div>
            <div className="min-h-[300px] bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-medium">3</h3>
              <p className="text-gray-600 mt-2">
                사무실, 매장 등을 위한 전문적인 청소 서비스
              </p>
            </div>
            <div className="min-h-[300px] bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-medium">3</h3>
              <p className="text-gray-600 mt-2">
                사무실, 매장 등을 위한 전문적인 청소 서비스
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-20">
            <Link href="/request" passHref>
              <span className="max-w-[320px] block px-6 py-3 bg-zinc-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-zinc-950 hover:border-[1px] hover:border-zinc-950 transition cursor-pointer">
                의뢰 목록 확인하러 가기
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 등록된 협력 업체 소개 영역*/}
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

      <Footer />
    </div>
  );
}
