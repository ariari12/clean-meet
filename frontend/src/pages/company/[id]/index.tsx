import React, { useState } from "react";
import { useRouter } from "next/router";

// 데이터 더미
const companies = [
  {
    id: 1,
    name: "청소나라",
    description: "새 집처럼 깨끗하게 청소해드립니다.",
    imageUrl: "",
    services: ["원룸 청소", "사무실 청소", "특수 청소"],
    contact: "010-1234-5678",
    address: "서울특별시 강남구 테헤란로 123",
    rating: 4.8,
  },
];

const CompanyDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [activeTab, setActiveTab] = useState("inquiry");
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const company = companies.find((comp) => comp.id === Number(id));

  if (!company) {
    return <div>해당 회사를 찾을 수 없습니다.</div>;
  }

  const handleSubmitInquiry = () => {
    console.log("문의 제출:", inquiryTitle, inquiryContent);
    // 여기에 문의 내용 처리 로직 추가
    setInquiryTitle("");
    setInquiryContent("");
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() !== "" && rating > 0) {
      const newReview = { author: "테스트", text: reviewText, rating };
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(0);
    }
  };

  return (
    <div className="my-[120px] max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <div className="w-[150px] h-[150px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      </div>

      <p className="mt-4 py-10 text-gray-700">{company.description}</p>
      <div className="space-y-2 border-t pt-4">
        <p>
          <strong>제공 서비스:</strong> {company.services.join(", ")}
        </p>
        <p>
          <strong>연락처:</strong> {company.contact}
        </p>
        <p>
          <strong>주소:</strong> {company.address}
        </p>
        <p>
          <strong>평점:</strong> ⭐ {company.rating} / 5
        </p>
      </div>

      {/* 탭 영역 */}
      <div className="mt-8">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "inquiry" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("inquiry")}
          >
            문의하기
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "review" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("review")}
          >
            리뷰
          </button>
        </div>

        {/* 문의하기 탭 */}
        {activeTab === "inquiry" && (
          <div className="mt-5">
            <input
              type="text"
              placeholder="문의 제목"
              value={inquiryTitle}
              onChange={(e) => setInquiryTitle(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <textarea
              placeholder="문의 내용"
              value={inquiryContent}
              rows={10}
              onChange={(e) => setInquiryContent(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmitInquiry}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                등록
              </button>
            </div>
          </div>
        )}

        {/* 리뷰 탭 */}
        {activeTab === "review" && (
          <div>
            <h4 className="mt-4 text-lg font-semibold">
              리뷰 {reviews.length}
            </h4>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b-2 p-4 rounded-lg border-gray-300" // 수정된 부분
                >
                  <div className="flex">
                    <p>{review.author}</p>
                    <p className="px-2 text-gray-500">|</p>
                    <p className="text-gray-500 text-sm">2025-02-20</p>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-yellow-500 ${
                          review.rating >= star
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="mt-2">{review.text}</p>
                </div>
              ))}
            </div>

            <h4 className="mt-4 text-lg font-semibold">리뷰 작성</h4>
            <div className="flex items-center space-x-2 my-5">
              <label className="font-semibold">별점:</label>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ⭐
                </span>
              ))}
            </div>
            <textarea
              placeholder="리뷰 내용을 작성해주세요."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSubmitReview}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4"
              >
                등록
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetailPage;
