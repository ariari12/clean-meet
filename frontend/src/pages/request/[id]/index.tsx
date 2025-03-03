import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useUser } from "@/context/UserContext";

const RequestDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [request, setRequest] = useState<any>(null); // 요청 데이터 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]); // 댓글 데이터
  const [newComment, setNewComment] = useState(""); // 새 댓글 내용
  const [inquiryTitle, setInquiryTitle] = useState(""); // 문의 제목
  const [inquiryContent, setInquiryContent] = useState(""); // 문의 내용
  const [activeTab, setActiveTab] = useState("comment"); // 탭 상태

  const { user } = useUser();

  useEffect(() => {
    // id가 없으면 API 호출을 하지 않음
    if (!id) return;

    const fetchRequestDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_BASE_URL}/api/service/request/${id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        const data = response.data;
        console.log("데이터 확인", data);

        setRequest(data);
      } catch (error) {
        console.error("상세 페이지 로드 오류:", error);
      }
    };

    fetchRequestDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 댓글 작성 핸들러
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      author: "작성자", // 나중에 사용자 이름을 가져오도록 수정
      date: new Date().toISOString().split("T")[0],
      text: newComment,
    };

    setComments([...comments, newCommentData]);
    setNewComment("");
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  // 문의하기 제출 핸들러
  const handleSubmitInquiry = () => {
    console.log("문의 제목:", inquiryTitle);
    console.log("문의 내용:", inquiryContent);
    setInquiryTitle("");
    setInquiryContent("");
  };

  if (!request) {
    return <div>해당 의뢰를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="my-[120px] max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <p className="py-2 text-blue-500">{request.serviceStatus}</p>
      <h1 className="text-2xl font-bold mb-4">{request.title}</h1>

      <div className="mt-6 space-y-2 border-b-[1px] py-5 px-2">
        <p>
          <strong>청소 유형:</strong> {request.serviceCategory.name}
        </p>
        <p>
          {/* 주소는 API에 맞게 수정해야함 */}
          <strong>주소:</strong> {request.address}{" "}
        </p>
        <p>
          <strong>마감일:</strong>{" "}
          {new Date(request.startDate).toLocaleDateString()} ~
          {new Date(request.endDate).toLocaleDateString()}
        </p>
      </div>

      <div className="py-20 text-gray-700 w-full border-b-[1px]">
        {request.description}
      </div>

      {/* 탭 영역, 기업 회원에게 노출 */}
      {user && user.authorities[0].authority !== "ROLE_PERSONAL" && (
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
                activeTab === "comment" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveTab("comment")}
            >
              댓글
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
                rows={5}
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

          {/* 댓글 탭 */}
          {activeTab === "comment" && (
            <div className="mt-5">
              <h2 className="text-xl font-semibold mb-4">
                댓글 ({comments.length})
              </h2>
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-md">{comment.author}</p>
                        <p className="text-sm text-gray-600">{comment.date}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="px-2 py-2 text-gray-500 text-sm cursor-pointer"
                      >
                        삭제
                      </button>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* 댓글 입력 */}
              <div className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={handleAddComment}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    댓글 작성
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestDetailPage;
