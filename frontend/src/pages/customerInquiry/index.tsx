import React, { useState } from "react";

// 확인용 임시 컴포넌트
const Notice = () => <div>공지사항 내용</div>;
const QnA = () => <div>QnA 내용</div>;
const FAQ = () => <div>FAQ 내용</div>;

const CustomerInquiryPage = () => {
  const [activeTab, setActiveTab] = useState("notice");

  return (
    <div>
      <div
        className="pt-[120px] text-white"
        style={{
          backgroundImage: "url('/qna1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto py-10 px-6 flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-4">
              직접 의뢰를 등록하고 다양한 전문 업체들의 견적을 받아보세요!
            </h1>
            <p className="text-lg mb-6">
              요구에 맞는 최적의 서비스를 선택할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default CustomerInquiryPage;
