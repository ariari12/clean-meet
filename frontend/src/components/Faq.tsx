import React, { useState } from "react";

const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // 확인용 데이터
  const questions = [
    {
      question: "Q: 회원가입은 어떻게 하나요?",
      answer: "A: 회원가입은 홈페이지 상단의 가입 버튼을 통해 가능합니다.",
    },
    {
      question: "Q: 비밀번호를 잊어버렸어요.",
      answer:
        "A: 비밀번호 찾기 페이지에서 이메일을 입력하시면 재설정 링크를 받으실 수 있습니다.",
    },
    {
      question: "Q: 서비스 이용 요금은 어떻게 되나요?",
      answer: "A: 서비스 이용 요금은 상품 페이지에서 확인 가능합니다.",
    },
  ];

  return (
    <div className="mt-6">
      {questions.map((item, index) => (
        <div key={index} className="border-b border-gray-200 text-left">
          <button
            className="w-full h-20 text-left py-4 px-6 text-lg font-semibold focus:outline-none"
            onClick={() => toggleQuestion(index)}
          >
            {item.question}
          </button>
          {openQuestion === index && (
            <div className="p-6 bg-white">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
