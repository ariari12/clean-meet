import Footer from "@/component/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-16">
      {/* 플랫폼 짧은 슬로건 & 메인 이미지 영역*/}
      <section className="pt-[72px] relative w-full h-[500px] flex flex-col justify-center items-center text-center bg-gray-900 text-white">
        <Image
          src="/clean-img.jpg"
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
      <section className="max-w-4xl text-center space-y-8">
        <h2 className="text-3xl font-semibold">
          전문가의 도움이 필요한 혼자 청소하기 힘든 순간들
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium">이사 후 청소</h3>
            <p className="text-gray-600 mt-2">
              이사 후 남겨진 먼지와 얼룩, 직접 하기에는 너무 벅찹니다.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium">사무실 대청소</h3>
            <p className="text-gray-600 mt-2">
              업무 공간은 깨끗해야 하지만 직원들이 청소하기에는 한계가 있습니다.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium">사무실 대청소</h3>
            <p className="text-gray-600 mt-2">
              업무 공간은 깨끗해야 하지만 직원들이 청소하기에는 한계가 있습니다.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium">사무실 대청소</h3>
            <p className="text-gray-600 mt-2">
              업무 공간은 깨끗해야 하지만 직원들이 청소하기에는 한계가 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 일반 가정청 소, 특수 청소, 방역 같은 플랫폼 제공 서비스 소개 영역*/}
      <section className="max-w-5xl text-center space-y-8">
        <h2 className="text-3xl font-semibold">우리의 서비스</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-medium">가정 청소</h3>
            <p className="text-gray-600 mt-2">
              집안 구석구석 깨끗하게 청소해 드립니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-medium">입주 청소</h3>
            <p className="text-gray-600 mt-2">
              새집 입주 전 완벽한 청소 서비스 제공!
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-medium">상업 공간 청소</h3>
            <p className="text-gray-600 mt-2">
              사무실, 매장 등을 위한 전문적인 청소 서비스
            </p>
          </div>
        </div>
      </section>

      {/* 일반 가정청 소, 특수 청소, 방역 같은 플랫폼 제공 서비스 소개 영역*/}
      <section className="max-w-5xl text-center space-y-8">
        <h2 className="text-3xl font-semibold">서비스 이용 방법</h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-medium">1</h3>
            <p className="text-gray-600 mt-2">
              집안 구석구석 깨끗하게 청소해 드립니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-medium">2</h3>
            <p className="text-gray-600 mt-2">
              새집 입주 전 완벽한 청소 서비스 제공!
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-medium">3</h3>
            <p className="text-gray-600 mt-2">
              사무실, 매장 등을 위한 전문적인 청소 서비스
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-medium">3</h3>
            <p className="text-gray-600 mt-2">
              사무실, 매장 등을 위한 전문적인 청소 서비스
            </p>
          </div>
        </div>
      </section>

      {/* 등록된 협력 업체 소개 영역*/}
      <section className="max-w-4xl text-center space-y-8">
        <h2 className="text-3xl font-semibold">등록 업체</h2>
        <div className="flex justify-center gap-6">
          <Image
            src=""
            alt="업체1"
            width={100}
            height={50}
            className="grayscale hover:grayscale-0 transition"
          />
          <Image
            src=""
            alt="업체2"
            width={100}
            height={50}
            className="grayscale hover:grayscale-0 transition"
          />
          <Image
            src=""
            alt="업체3"
            width={100}
            height={50}
            className="grayscale hover:grayscale-0 transition"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
