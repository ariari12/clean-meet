"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

// 사이드바 메뉴 타입 정의
type MenuType = "requests" | "companies" | "support" | "events" | "settings";

// 검색 결과 데이터 타입
interface RequestData {
  id: number;
  title: string;
  status: "PENDING" | "COMPLETED";
  createdAt: string;
}

// 더미 데이터
const requestData: RequestData[] = [
  {
    id: 1,
    title: "사무실 청소 요청",
    status: "PENDING",
    createdAt: "2025-02-26",
  },
  {
    id: 2,
    title: "이사 청소 요청",
    status: "COMPLETED",
    createdAt: "2025-02-25",
  },
];

const Sidebar = ({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: MenuType;
  setActiveMenu: (menu: MenuType) => void;
}) => {
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);

  return (
    <div className="w-64 bg-zinc-500 text-white h-screen p-6">
      <h2 className="navbar__logo mb-6">clean meet</h2>
      <ul className="space-y-4">
        {["requests", "companies", "events", "settings"].map((menu) => (
          <li
            key={menu}
            className={`cursor-pointer p-2 rounded ${
              activeMenu === menu ? "bg-zinc-700" : ""
            }`}
            onClick={() => setActiveMenu(menu as MenuType)}
          >
            {menu === "requests"
              ? "의뢰관리"
              : menu === "companies"
              ? "업체관리"
              : menu === "events"
              ? "이벤트"
              : "설정"}
          </li>
        ))}

        {/* 고객지원 메뉴 */}
        <li>
          <div
            className="flex justify-between items-center p-2 rounded cursor-pointer"
            onClick={() => setIsSupportOpen(!isSupportOpen)}
          >
            고객지원
            {isSupportOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isSupportOpen && (
            <ul className="pl-4 mt-2 space-y-2">
              {["1:1문의", "공지사항", "FAQ"].map((subMenu) => (
                <li
                  key={subMenu}
                  className="cursor-pointer p-2 rounded hover:bg-zinc-700"
                >
                  {subMenu}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

const RequestManagement = () => {
  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-semibold mb-4">의뢰관리</h2>

      {/* 검색 영역 */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <div className="flex space-x-4">
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="검색"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-blue-600">
            <FaSearch className="mr-2" /> 검색
          </button>
        </div>
      </div>

      {/* 테이블 */}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">제목</th>
            <th className="p-3 text-left">상태</th>
            <th className="p-3 text-left">생성일</th>
          </tr>
        </thead>
        <tbody>
          {requestData.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.title}</td>
              <td
                className={`p-3 ${
                  item.status === "PENDING" ? "text-blue-500" : "text-red-500"
                }`}
              >
                {item.status}
              </td>
              <td className="p-3">{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminPage = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>("requests");

  return (
    <div className="flex h-screen">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      {activeMenu === "requests" && <RequestManagement />}
      {activeMenu !== "requests" && (
        <div className="p-6 flex-1">
          <h2 className="text-2xl font-semibold">생성 예정</h2>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
