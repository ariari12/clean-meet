import React, { useState } from "react";

// 확인용 임시 컴포넌트
const Notice = () => <div>공지사항 내용</div>;
const QnA = () => <div>QnA 내용</div>;
const FAQ = () => <div>FAQ 내용</div>;

const CustomerInquiryPage = () => {
  const [activeTab, setActiveTab] = useState("notice");

  return (
    <div className="my-[100px] max-w-5xl mx-auto px-6 bg-zinc-50 shadow-lg rounded-lg">
      {/* 탭 메뉴 */}
      <div className="max-w-[500px] h-10 bg-zinc-100 radio-inputs flex px-2 rounded-lg">
        <label
          className={`radio flex-1 text-center cursor-pointer relative flex items-center justify-center`}
          onClick={() => setActiveTab("notice")}
        >
          <input
            type="radio"
            name="radio"
            checked={activeTab === "notice"}
            readOnly
            className="hidden"
          />
          <span
            className={`name py-2 px-4 rounded-lg transition-all duration-150 ${
              activeTab === "notice"
                ? "text-black font-semibold"
                : "text-gray-600"
            }`}
          >
            공지사항
          </span>
          {activeTab === "notice" && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-t-[2px]" />
          )}
        </label>

        <label
          className={`radio flex-1 text-center cursor-pointer relative flex items-center justify-center`}
          onClick={() => setActiveTab("qna")}
        >
          <input
            type="radio"
            name="radio"
            checked={activeTab === "qna"}
            readOnly
            className="hidden"
          />
          <span
            className={`name py-2 px-4 rounded-lg transition-all duration-150 ${
              activeTab === "qna"
                ? "text-black font-semibold"
                : "text-gray-600"
            }`}
          >
            QnA
          </span>
          {activeTab === "qna" && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-t-[2px]" />
          )}
        </label>

        <label
          className={`radio flex-1 text-center cursor-pointer relative flex items-center justify-center`}
          onClick={() => setActiveTab("faq")}
        >
          <input
            type="radio"
            name="radio"
            checked={activeTab === "faq"}
            readOnly
            className="hidden"
          />
          <span
            className={`name py-2 px-4 rounded-lg transition-all duration-150 ${
              activeTab === "faq"
                ? "text-black font-semibold"
                : "text-gray-600"
            }`}
          >
            FAQ
          </span>
          {activeTab === "faq" && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-t-[2px]" />
          )}
        </label>
      </div>

      <div>
        {activeTab === "notice" && <Notice />}
        {activeTab === "qna" && <QnA />}
        {activeTab === "faq" && <FAQ />}
      </div>
    </div>
  );
};

export default CustomerInquiryPage;
