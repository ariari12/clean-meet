import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface ServiceCategoryResponseDto {
  name: string;
}

interface Request {
  id: number;
  title: string;
  serviceStatus: "PENDING" | "COMPLETED"; // 서비스 상태
  serviceCategoryResponseDto: ServiceCategoryResponseDto; // 청소 종류
  createdAt: string; // 생성일
}

const RequestListPage: React.FC = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("전체");
  const [cleaningType, setCleaningType] = useState<string>("전체");
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const getRequestsList = async () => {
      try {
        const token = localStorage.getItem("token") || "";

        const response = await axios.get(
          // "http://localhost:8080/api/service/page?page=1&size=10&sort=createdAt,DESC",
          // `${API_BASE_URL}/api/commission/page?sort=createdAt,desc`,
          // `${API_BASE_URL}/api/service/page?page=1&size=10&sort=createdAt%2CDESC`,
          `${API_BASE_URL}/api/service/page?page=0&size=10&sort=createdAt%2CDESC`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        const data = response.data;
        console.log("data 확인:", data);

        const mappedRequests = data.content.map((item: Request) => ({
          id: item.id,
          title: item.title,
          serviceStatus: item.serviceStatus,
          serviceCategoryResponseDto: {
            name: item.serviceCategoryResponseDto.name,
          },
          createdAt: new Date(item.createdAt).toLocaleDateString(),
        }));

        setRequests(mappedRequests);
      } catch (error) {
        console.error("요청중 에러가 발생했습니다. :", error);
      }
    };

    getRequestsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // 리스트 필터
  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.title.includes(search);
    const matchesStatus = status === "전체" || request.serviceStatus === status;
    const matchesCleaningType =
      cleaningType === "전체" ||
      request.serviceCategoryResponseDto.name === cleaningType;

    return matchesSearch && matchesStatus && matchesCleaningType;
  });

  return (
    <div>
      <div className="pt-[120px] bg-gradient-to-r from-sky-600 to-sky-400 text-white">
        <div className="max-w-7xl mx-auto py-10 px-6 flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-4">
              청소 의뢰를 등록하고 전문가의 견적을 받아보세요!
            </h1>
            <p className="text-lg mb-6">
              간편하게 청소 의뢰를 등록하고, <br />
              다양한 전문가들의 맞춤 견적을 받아보세요.
            </p>
          </div>
          <Link href="/request/regist" passHref>
            <span className="max-w-[320px] block px-6 py-3 bg-zinc-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-zinc-950 transition cursor-pointer">
              의뢰 등록하기
            </span>
          </Link>
        </div>
      </div>

      <div className="my-[100px] max-w-5xl mx-auto p-6 bg-zinc-50 shadow-lg rounded-lg">
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
                  setStatus(status === "PENDING" ? "전체" : "PENDING")
                }
                checked={status === "PENDING"}
              />
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full border-1 border-gray-400 peer-checked:bg-cyan-700 peer-checked:border-transparent transition-all duration-300 ease-in-out"></span>
              <span className="absolute left-1 top-1 block w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-8 transition-all duration-300 ease-in-out"></span>
            </label>
          </div>
        </div>

        {/* 리스트 */}
        <div className="mt-6 space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <Link key={request.id} href={`/request/${request.id}`} passHref>
                <div className="p-4 bg-gray-50 rounded-lg shadow-md flex flex-col gap-2 border border-gray-200 cursor-pointer">
                  <span
                    className={`text-sm font-semibold ${
                      request.serviceStatus === "PENDING"
                        ? "text-blue-500"
                        : "text-red-500"
                    }`}
                  >
                    {request.serviceStatus}
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      {request.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {request.serviceCategoryResponseDto.name}
                    </span>
                    <span className="text-sm text-gray-600">|</span>
                    <span className="text-sm text-gray-600">
                      {request.createdAt}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500">목록이 없습니다.</div>
          )}
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
    </div>
  );
};

export default RequestListPage;
