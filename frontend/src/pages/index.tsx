import Footer from "@/component/Footer";
// import ComReviewSection from "@/component/main/ComReviewSection";
import RequestListSection from "@/component/main/RequestListSection";
import Sample1Section from "@/component/main/Sample1Section";
import TopSection from "@/component/main/TopSection";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center">
      {/* 플랫폼 짧은 슬로건 & 메인 이미지 영역*/}
      <TopSection />

      {/* 청소하기 어려운 사례 예시 영역 */}
      <Sample1Section />

      {/* 회사 소개 및 리뷰 영역*/}
      {/* <ComReviewSection /> */}
      <section className="w-full text-center space-y-8 px-20 py-32 bg-fixed bg-cover bg-center relative">
        <h2 className="text-3xl font-semibold">
          다양한 업체를 신중히 선택할 수 있어요
        </h2>

        <div className="bg-zinc-100 max-w-6xl mx-auto space-y-16 text-left">
          {/* 첫 번째 업체 소개 */}
          <div className="relative flex gap-10 bg-orange-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="w-2/3">
              <Image
                src="/company-bg-01.jpeg"
                alt="청소마스터"
                width={150}
                height={150}
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <div className="w-1/3 text-left space-y-4">
              <h3 className="text-xl font-bold">청소마스터</h3>
              <p className="text-gray-600">주소: 경기도 성남시</p>
              <p className="text-gray-600">
                집안 구석구석 깨끗하게 청소해 드립니다.
              </p>
            </div>

            {/* 첫 번째 회원 리뷰 */}
            <div className="absolute bottom-40 right-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-600">이**</p>
              <p className="text-gray-600 mt-2 line-clamp-3 overflow-hidden text-ellipsis">
                이번에 처음으로 청소 서비스를 이용해 봤는데, 기대 이상으로
                만족했습니다. 집안 전체를 청소해 주셨는데, 특히 주방과 화장실
                청소가 대단히 꼼꼼했습니다. 기름때가 많아 고민이었는데, 새집처럼
                반짝반짝해졌어요. 침대 밑이나 가구 뒤쪽 같은 평소에 잘 닿지 않는
                곳까지 신경 써 주셔서 너무 감사했습니다. 청소가 끝난 후에는 집안
                공기가 달라졌다고 느낄 정도로 상쾌하고 쾌적했습니다. 친절한
                서비스에 감동받았고, 다음에 또 이용하고 싶습니다!
              </p>
            </div>

            <div className="absolute bottom-[-40px] right-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-600">김**</p>
              <p className="text-gray-600 mt-2 line-clamp-3 overflow-hidden text-ellipsis">
                청소 서비스를 신청했는데 처음부터 끝까지 정말 만족스러웠습니다.
                예약 과정도 매우 간편했고, 청소 당일에는 직원분들이 정시에
                도착해 주셔서 좋았습니다. 청소 전에 집 상태를 꼼꼼히 체크하시고,
                어디를 중점적으로 청소해야 할지 설명해 주셔서 신뢰가 갔어요.
                청소가 끝난 후에는 집안 구석구석 먼지 하나 없이 반짝반짝
                깨끗해졌고, 특히 창틀과 욕실 청소가 완벽했습니다. 청소 중간중간
                진행 상황도 친절히 알려주시고, 끝난 후에는 청소 결과에 대해 함께
                확인해 주셔서 더욱 안심이 되었습니다. 앞으로도 자주 이용할
                계획입니다!
              </p>
            </div>
          </div>

          {/* 두 번째 업체 소개 */}
          <div className="relative flex gap-10 bg-orange-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="w-1/3 text-left space-y-4">
              <h3 className="text-xl font-bold">청소나라</h3>
              <p className="text-gray-600">주소: 경기도 성남시</p>
              <p className="text-gray-600">
                집안 구석구석 깨끗하게 청소해 드립니다.
              </p>
            </div>
            <div className="w-2/3">
              <Image
                src="/company-bg-02.webp"
                alt="청소나라"
                width={150}
                height={150}
                className="object-cover w-full h-full rounded-xl"
              />
            </div>

            {/* 두 번째 회원 리뷰 */}
            <div className="absolute bottom-32 left-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-600">정**</p>
              <p className="text-gray-600 mt-2 line-clamp-2 overflow-hidden text-ellipsis">
                너무너무 깨끗해졌어요 ~ 다음에 또 이용할게요 !
              </p>
            </div>

            <div className="absolute bottom-[-50px] left-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-2">
                {[...Array(4)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400 text-xl" />
                ))}
                {[...Array(1)].map((_, index) => (
                  <FaRegStar key={index} className="text-yellow-400 text-xl" />
                ))}
                <span className="ml-2 text-gray-600">4.0</span>
              </div>
              <p className="text-gray-600">이**</p>
              <p className="text-gray-600 mt-2 line-clamp-2 overflow-hidden text-ellipsis">
                서비스가 전반적으로 만족스러웠습니다. 청소가 매우 꼼꼼하게
                이루어졌고, 직원분들도 친절하셨습니다. 특히 거실 바닥과 주방이
                새집처럼 반짝거려서 기분이 너무 좋았습니다. 청소 중간중간 진행
                상황을 공유해 주셔서 안심할 수 있었고, 끝난 후에는 집안 곳곳을
                함께 확인해 주셔서 더욱 믿음이 갔습니다. 다음에도 반드시 이용할
                계획입니다!
              </p>
            </div>
          </div>

          {/* 세 번째 업체 소개 */}
          <div className="relative flex gap-10 bg-orange-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="w-2/3">
              <Image
                src="/company-bg-03.jpg"
                alt="청소왕"
                width={150}
                height={150}
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <div className="w-1/3 text-left space-y-4">
              <h3 className="text-xl font-bold">청소왕</h3>
              <p className="text-gray-600">주소: 경기도 성남시</p>
              <p className="text-gray-600">
                집안 구석구석 깨끗하게 청소해 드립니다.
              </p>
            </div>

            {/* 세 번째 회원 리뷰 */}
            <div className="absolute bottom-36 right-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400 text-xl" />
                ))}
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-600">최**</p>
              <p className="text-gray-600 mt-2 line-clamp-3 overflow-hidden text-ellipsis">
                정말 만족스러운 경험이었습니다! 청소 전후의 차이를 확연히 느낄
                수 있었습니다. 특히 주방과 창문 틀까지 손이 닿지 않았던 곳까지
                청소가 완벽하게 되어서 감동했습니다. 청소 후 집 안이 새 것처럼
                깔끔해졌고, 서비스 또한 매우 친절하고 전문적이어서 재이용하고
                싶습니다.
              </p>
            </div>

            <div className="absolute bottom-[-60px] right-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(4)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-xl" />
                  ))}
                  {[...Array(1)].map((_, index) => (
                    <FaRegStar
                      key={index}
                      className="text-yellow-400 text-xl"
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">4.0</span>
              </div>
              <p className="text-gray-600">박**</p>
              <p className="text-gray-600 mt-2 line-clamp-3 overflow-hidden text-ellipsis">
                매우 만족스러운 청소 서비스였습니다. 직원분들이 정확한 시간에
                도착하여 청소를 시작했으며, 각 공간마다 꼼꼼하게 작업을
                해주셨습니다. 특히 주방과 욕실이 깔끔하게 청소되어 너무
                기뻤습니다. 전반적으로 정돈된 느낌을 받아서 집안 분위기가 확
                달라졌습니다. 다음에도 재이용할 의향이 있습니다.
              </p>
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

      {/* 등록된 협력 업체 소개 영역*/}
      <RequestListSection />

      <Footer />
    </div>
  );
}
