import Notice from "@/components/Notice";
import Faq from "@/components/Faq";
import Qna from "@/components/Qna";
import React, { useState } from "react";

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
              고객님의 소중한 의견을 기다립니다.
            </h1>
            <p className="text-lg mb-6">
              저희는 고객님의 편의를 위해 다양한 지원 서비스를 제공합니다.{" "}
              <br />
              궁금한 점은 고객센터를 통해 빠르고 친절하게 해결해 드립니다.
            </p>
          </div>
        </div>
      </div>

      <div className="my-[100px] max-w-5xl mx-auto p-6 bg-zinc-50 shadow-lg rounded-lg">
        {/* 탭 메뉴 */}
        <div className="max-w-[500px] h-16 bg-zinc-100 radio-inputs flex px-2 rounded-lg">
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
              1:1 문의
            </span>
            {activeTab === "qna" && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-t-[2px]" />
            )}
          </label>
        </div>

        <div className="text-left">
          {activeTab === "notice" && <Notice />}
          {activeTab === "faq" && <Faq />}
          {activeTab === "qna" && <Qna />}
        </div>
      </div>
    </div>
  );
};

export default CustomerInquiryPage;
