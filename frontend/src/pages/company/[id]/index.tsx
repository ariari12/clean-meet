import React, { useState } from "react";
import { useRouter } from "next/router";

// 데이터 더미
const companies = [
  {
    id: 1,
    name: "청소나라",
    description: "새 집처럼 깨끗하게 청소해드립니다.",
    // imageUrl: "/images/company1.jpg",
    imageUrl: "",
    services: ["원룸 청소", "사무실 청소", "특수 청소"],
    contact: "010-1234-5678",
    address: "서울특별시 강남구 테헤란로 123",
    rating: 4.8,
  },
];

const CompanyDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [activeTab, setActiveTab] = useState("inquiry");

  const company = companies.find((comp) => comp.id === Number(id));

  if (!company) {
    return <div>해당 회사를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mt-[120px] max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <div className="w-[150px] h-[150px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        {/* {company.image ? (
          <img
            src={company.image}
            alt={company.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )} */}
        <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      </div>

      <p className="mt-4 py-10 text-gray-700">{company.description}</p>
      <div className="space-y-2 border-t pt-4">
        <p>
          <strong>제공 서비스:</strong> {company.services.join(", ")}
        </p>
        <p>
          <strong>연락처:</strong> {company.contact}
        </p>
        <p>
          <strong>주소:</strong> {company.address}
        </p>
        <p>
          <strong>평점:</strong> ⭐ {company.rating} / 5
        </p>
      </div>

      {/* 탭 영역 */}
      <div className="mt-8">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "inquiry" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("inquiry")}
          >
            문의하기
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "review" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("review")}
          >
            리뷰
          </button>
        </div>

        {/* 탭 영역 */}
        <div className="mt-4">
          {activeTab === "inquiry" && (
            <div>
              <h3 className="text-xl font-semibold mb-2">문의하기</h3>
              <p>문의하기 폼 만들 예정</p>
            </div>
          )}

          {activeTab === "review" && (
            <div>
              <h3 className="text-xl font-semibold mb-2">리뷰</h3>
              <p>리뷰 작성 가능하게 만들 예정</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          문의하기
        </button>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
