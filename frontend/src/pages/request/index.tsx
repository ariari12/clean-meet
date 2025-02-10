import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const RequestListPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [cleaningType, setCleaningType] = useState("전체");

  // 확인용 더미
  const requests = [
    {
      id: 1,
      title: "원룸 청소 구합니다",
      status: "모집중",
      cleaningType: "일반 청소",
      createdAt: "2025-02-10",
    },
    {
      id: 2,
      title: "사무실 청소 구해요",
      status: "완료",
      cleaningType: "일반 청소",
      createdAt: "2025-02-10",
    },
    {
      id: 3,
      title: "건물 외관 관리 및 청소",
      status: "모집중",
      cleaningType: "특수 청소",
      createdAt: "2025-02-10",
    },
    {
      id: 4,
      title: "병원 방역 의뢰",
      status: "모집중",
      cleaningType: "방역 청소",
      createdAt: "2025-02-10",
    },
    {
      id: 5,
      title: "사무실 청소",
      status: "완료",
      cleaningType: "일반 청소",
      createdAt: "2025-02-10",
    },
    {
      id: 6,
      title: "사무실 청소",
      status: "완료",
      cleaningType: "일반 청소",
      createdAt: "2025-02-10",
    },
    {
      id: 7,
      title: "사무실 청소",
      status: "모집중",
      cleaningType: "일반 청소",
      createdAt: "2025-02-10",
    },
    {
      id: 8,
      title: "사무실 청소",
      status: "모집중",
      cleaningType: "일반 청소",
      createdAt: "2025-02-10",
    },
  ];

  // 리스트 필터
  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.title.includes(search);
    const matchesStatus = status === "전체" || request.status === status;
    const matchesCleaningType =
      cleaningType === "전체" || request.cleaningType === cleaningType;

    return matchesSearch && matchesStatus && matchesCleaningType;
  });

  return (
    <div className="my-[100px] max-w-4xl mx-auto p-6 bg-zinc-50 shadow-lg rounded-lg">
      {/* 검색 */}
      <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm">
        <select
          value={cleaningType}
          onChange={(e) => setCleaningType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="전체">전체</option>
          <option value="일반 청소">일반 청소</option>
          <option value="특수 청소">특수 청소</option>
          <option value="방역 청소">방역 청소</option>
        </select>

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

      <div className="flex items-center justify-between mt-4">
        <div>의뢰: {filteredRequests.length}개</div>

        {/* 진행 토글 */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">모집중만 보기</span>
          <label className="relative inline-block w-16 h-8 cursor-pointer">
            <input
              type="checkbox"
              className="opacity-0 w-0 h-0 peer"
              onChange={() =>
                setStatus(status === "모집중" ? "전체" : "모집중")
              }
              checked={status === "모집중"}
            />
            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full border-1 border-gray-400 peer-checked:bg-cyan-700 peer-checked:border-transparent transition-all duration-300 ease-in-out"></span>
            <span className="absolute left-1 top-1 block w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-8 transition-all duration-300 ease-in-out"></span>
          </label>
        </div>
      </div>

      {/* 리스트 */}
      <div className="mt-6 space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="p-4 bg-gray-50 rounded-lg shadow-md flex flex-col gap-2 border border-gray-200 cursor-pointer"
          >
            <span
              className={`text-sm font-semibold ${
                request.status === "모집중" ? "text-blue-500" : "text-red-500"
              }`}
            >
              {request.status}
            </span>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                {request.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {request.cleaningType}
              </span>
              <span className="text-sm text-gray-600">|</span>
              <span className="text-sm text-gray-600">{request.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 space-x-2">
        <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">
          이전
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          1
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400">
          다음
        </button>
      </div>
    </div>
  );
};

export default RequestListPage;
