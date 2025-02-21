import React, { useState } from "react";

const Qna = () => {
  // 확인용 임시 데이터
  const questions = [
    {
      question: "서비스 이용 방법은?",
      answer:
        "서비스 이용 방법은 간단합니다. 회원가입 후 원하는 서비스를 선택하세요.",
      createdAt: "2024-02-25",
    },
    {
      question: "결제는 어떻게 하나요?",
      answer: "결제는 카드 및 계좌이체를 통해 가능합니다.",
      createdAt: "2024-02-25",
    },
    {
      question: "환불 규정은 어떻게 되나요?",
      answer: "환불 규정은 고객센터를 통해 문의해 주시기 바랍니다.",
      createdAt: "2024-02-25",
    },
    {
      question: "서비스 이용 중 문제가 생기면?",
      answer: "문제가 생기면 고객센터로 문의해 주세요.",
      createdAt: "2024-02-25",
    },
    {
      question: "회원정보 수정은 어떻게 하나요?",
      answer: "마이페이지에서 회원정보를 수정할 수 있습니다.",
      createdAt: "2024-02-25",
    },
    {
      question: "리뷰 작성 방법은?",
      answer: "서비스 완료 후 마이페이지에서 리뷰를 작성할 수 있습니다.",
      createdAt: "2024-02-25",
    },
    {
      question: "리뷰 작성 방법은?",
      answer: "서비스 완료 후 마이페이지에서 리뷰를 작성할 수 있습니다.",
      createdAt: "2024-02-25",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 페이지 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-6 relative">
      {/* 테이블 */}
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 border-b">번호</th>
            <th className="p-4 border-b">제목</th>
            <th className="p-4 border-b">작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="border-b text-center">
              <td className="p-4 text-center">
                {indexOfFirstItem + index + 1}
              </td>
              <td className="p-4 cursor-pointer text-left text-blue-600 hover:underline">
                {item.question}
              </td>
              <td className="p-4 cursor-pointer text-blue-600 hover:underline">
                {item.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center mt-4">
        {Array.from(
          { length: Math.ceil(questions.length / itemsPerPage) },
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

      <div className="absolute bottom-0 right-0 flex justify-end mt-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-orange-600">
          1:1 질문하기
        </button>
      </div>
    </div>
  );
};

export default Qna;
