import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const ComReviewSection = () => {
  // 각 리뷰에 대해 개별적인 isVisible 상태를 관리
  const [isVisible, setIsVisible] = useState(Array(6).fill(false)); // 6개의 리뷰 상태

  // 각 리뷰에 대한 ref 선언
  const reviewRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 요소가 화면에 보이면 애니메이션 시작
          setIsVisible((prev) => {
            const newIsVisible = [...prev];
            const index = reviewRefs.findIndex(
              (ref) => ref.current === entry.target
            );
            if (index !== -1) {
              newIsVisible[index] = true; // 해당 리뷰에 대해서만 상태 변경
            }
            return newIsVisible;
          });
        }
      },
      { threshold: 0.5 } // 요소가 화면에 50% 이상 보일 때 트리거
    );

    // 각 리뷰에 대해 observer 적용
    reviewRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      reviewRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
          <div
            ref={reviewRefs[0]}
            className={`absolute bottom-40 right-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl transform ${
              isVisible[0]
                ? "translate-x-0 opacity-100"
                : "translate-x-32 opacity-0"
            } transition-all duration-500 ease-out`}
          >
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

          {/* 두 번째 회원 리뷰 */}
          <div
            ref={reviewRefs[1]}
            className={`absolute bottom-[-40px] right-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl transform ${
              isVisible[1]
                ? "translate-x-0 opacity-100"
                : "translate-x-32 opacity-0"
            } transition-all duration-1000 ease-out`}
          >
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
              예약 과정도 매우 간편했고, 청소 당일에는 직원분들이 정시에 도착해
              주셔서 좋았습니다. 청소 전에 집 상태를 꼼꼼히 체크하시고, 어디를
              중점적으로 청소해야 할지 설명해 주셔서 신뢰가 갔어요. 청소가 끝난
              후에는 집안 구석구석 먼지 하나 없이 반짝반짝 깨끗해졌고, 특히
              창틀과 욕실 청소가 완벽했습니다. 청소 중간중간 진행 상황도 친절히
              알려주시고, 끝난 후에는 청소 결과에 대해 함께 확인해 주셔서 더욱
              안심이 되었습니다. 앞으로도 자주 이용할 계획입니다!
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
          <div
            ref={reviewRefs[2]}
            className={`absolute bottom-32 left-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl transform ${
              isVisible[2]
                ? "translate-x-0 opacity-100"
                : "-translate-x-32 opacity-0"
            } transition-all duration-500 ease-out`}
          >
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

          <div
            ref={reviewRefs[3]}
            className={`absolute bottom-[-50px] left-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl transform ${
              isVisible[3]
                ? "translate-x-0 opacity-100"
                : "-translate-x-32 opacity-0"
            } transition-all duration-1000 ease-out`}
          >
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
              alt="청소지기"
              width={150}
              height={150}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="w-1/3 text-left space-y-4">
            <h3 className="text-xl font-bold">청소지기</h3>
            <p className="text-gray-600">주소: 서울시 강남구</p>
            <p className="text-gray-600">
              집안 구석구석 깨끗하게 청소해 드립니다.
            </p>
          </div>

          {/* 세 번째 회원 리뷰 */}
          <div
            ref={reviewRefs[4]}
            className={`absolute bottom-[170px] right-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl transform ${
              isVisible[4]
                ? "translate-x-0 opacity-100"
                : "translate-x-32 opacity-0"
            } transition-all duration-500 ease-out`}
          >
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
              청소의 퀄리티가 뛰어났습니다. 청소 후 집안이 정말 깨끗해졌고,
              직원분들께서 매우 친절하셨습니다. 청소 진행 시 문제가 있을 경우
              바로 확인해주시고 적절하게 대응해 주셔서 매우 만족스러웠습니다.
              추천합니다!
            </p>
          </div>

          {/* 세 번째 회원 리뷰 */}
          <div
            ref={reviewRefs[5]}
            className={`absolute bottom-[-40px] right-[60px] max-w-[450px] bg-zinc-50 p-6 rounded-lg shadow-xl transform ${
              isVisible[5]
                ? "translate-x-0 opacity-100"
                : "translate-x-32 opacity-0"
            } transition-all duration-1000 ease-out`}
          >
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <span className="ml-2 text-gray-600">5.0</span>
            </div>
            <p className="text-gray-600">박**</p>
            <p className="text-gray-600 mt-2 line-clamp-3 overflow-hidden text-ellipsis">
              서비스가 너무 훌륭해서 청소를 맡겨주고 너무 감사했습니다. 청소하신
              분들이 매우 친절하게 응대해 주셔서 기분 좋게 청소를 맡길 수
              있었습니다. 다만 청소 끝나고 조금 아쉬운 부분이 있었습니다만 다시
              한 번 연락을 드리니 빠르게 대응해 주셨습니다. 좋아요!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComReviewSection;
