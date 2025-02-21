import React, { useState } from "react";

const Notice = () => {
  // 확인용 임시 데이터
  const notices = [
    {
      id: 1,
      title: "서비스 점검 안내",
      date: "2025-02-20",
      content: "시스템 점검으로 인해 서비스가 일시 중단됩니다.",
    },
    {
      id: 2,
      title: "신규 기능 업데이트",
      date: "2025-02-15",
      content:
        "새로운 기능이 추가되었습니다. 자세한 내용은 공지사항을 확인해 주세요.",
    },
    {
      id: 3,
      title: "설 연휴 서비스 운영 안내",
      date: "2025-02-10",
      content: "설 연휴 기간 동안 서비스 운영방침 변경됩니다.",
    },
    {
      id: 4,
      title: "시스템 업그레이드 공지",
      date: "2025-02-05",
      content: "서비스 품질 향상을 위한 업그레이드가 예정되어 있습니다.",
    },
    {
      id: 5,
      title: "긴급 서버 점검",
      date: "2025-02-01",
      content: "서버 점검으로 인해 일부 서비스 이용이 제한됩니다.",
    },
    {
      id: 6,
      title: "정기 점검 안내",
      date: "2025-01-25",
      content: "정기 점검으로 인한 서비스 중단 안내입니다.",
    },
  ];

  // 페이지네이션 값 세팅
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // 페이지 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = notices.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-6">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">번호</th>
            <th className="border-b p-4">제목</th>
            <th className="border-b p-4">작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.map((notice) => (
            <tr key={notice.id} className="hover:bg-gray-100">
              <td className="border-b p-4">{notice.id}</td>
              <td className="border-b p-4 text-left">{notice.title}</td>
              <td className="border-b p-4">{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(notices.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Notice;
