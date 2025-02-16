import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const CompanyListPage = () => {
  const [search, setSearch] = useState("");
  
  // 확인용 더미
  const companies = [
    {
      id: 1,
      name: "청소나라",
      description: "새 집처럼 깨끗하게 청소해드립니다",
    },
    { id: 2, name: "클린마스터", description: "사무실 전문 청소 서비스" },
    { id: 3, name: "청소의 달인", description: "특수 청소, 원룸 청소 전문" },
    { id: 4, name: "청소왕", description: "당일 빠른 청소 서비스" },
  ];

  return (
    <div>
      <div className="pt-[120px] bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto py-10 px-6 flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-4">
            직접 의뢰를 등록하고 다양한 전문 업체들의 견적을 받아보세요!
          </h1>
          <Link href="/request/regist" passHref>
            <span className="max-w-[320px] block px-6 py-3 bg-zinc-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-zinc-950 transition cursor-pointer">
              의뢰 등록하기
            </span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center my-[100px] max-w-5xl mx-auto p-6 bg-zinc-50 shadow-lg rounded-lg">
        {/* 검색 영역 */}
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm w-full mb-6">
          <input
            type="text"
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-blue-600">
            <FaSearch className="mr-2" /> 검색
          </button>
        </div>

        {/* 리스트 영역 */}
        <div className="w-full grid grid-cols-4 gap-6">
          {companies.map((company) => (
            <Link key={company.id} href={`/company/${company.id}`} passHref>
              <div className="flex flex-col justify-between p-1 min-w-[150px] h-full max-h-[370px] rounded-2xl bg-gray-50 shadow-md cursor-pointer border border-gray-300">
                <div>
                  <div className="min-h-[150px] bg-gray-200 rounded-xl shadow-inner"></div>
                  <p className="mt-3 ml-2 text-md text-zinc-500">
                    {company.name}
                  </p>
                  <p className="text-lg font-semibold text-zinc-800 mt-4 ml-2">
                    {company.description}
                  </p>
                </div>

                <p className="mt-5 mx-2 py-2 text-sm text-gray-800">
                  #완벽한 청소 #사무실 전문 #특수 청소 #원룸 청소
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-12 mb-16 space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">
            이전
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            1
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">
            2
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">
            3
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyListPage;
