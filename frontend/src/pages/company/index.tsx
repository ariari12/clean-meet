import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const CompanyListPage = () => {
  const [search, setSearch] = useState("");
  // 확인용 더미
  const companies = new Array(17).fill(null);

  return (
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
        {companies.map((_, index) => (
          <div
            key={index}
            className="p-1 min-w-[150px] max-h-[370px] rounded-2xl bg-gray-50 shadow-md cursor-pointer border border-gray-300"
          >
            <div className="min-h-[150px] bg-gray-200 rounded-xl shadow-inner"></div>
            <p className="text-lg font-semibold text-zinc-800 mt-4 ml-2">
              새 집처럼 깨끗하게 청소해드립니다.
            </p>
            <p className="mt-3 ml-2 text-md text-zinc-500">
              청소나라
            </p>
            <p className="mt-3 ml-2 text-xs text-gray-800">
              #완벽한 청소 #사무실 전문 #특수 청소 #원룸 청소
            </p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-12 mb-16 space-x-2">
        <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">이전</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">1</button>
        <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">2</button>
        <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">3</button>
        <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">다음</button>
      </div>
    </div>
  );
};

export default CompanyListPage;
