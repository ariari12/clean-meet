import React, { useState } from "react";
import { useRouter } from "next/router";

// 리스트 상세 더미 데이터
const requests = [
  {
    id: 1,
    title: "원룸 청소 구합니다",
    status: "모집중",
    cleaningType: "일반 청소",
    createdAt: "2025-02-10",
    description:
      "원룸 청소를 맡기고 싶습니다. 신속하고 깔끔하게 해주실 분 찾습니다",
  },
];

const RequestDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // 댓글 더미 데이터
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "테스터",
      date: "2025-02-10",
      text: "관심 있습니다 연락 주세요.",
    },
    {
      id: 2,
      author: "김김김",
      date: "2025-02-11",
      text: "안녕하세요, 자세한 조건이 궁금합니다!",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const request = requests.find((req) => req.id === Number(id));

  if (!request) {
    return <div>해당 의뢰를 찾을 수 없습니다.</div>;
  }

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

  return (
    <div className="mt-[120px] max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <p className="py-2 text-blue-500">{request.status}</p>
      <h1 className="text-2xl font-bold mb-4">{request.title}</h1>

      <div className="mt-6 space-y-2 border-b-[1px] py-5 px-2">
        <p>
          <strong>청소 유형:</strong> {request.cleaningType}
        </p>
        <p>
          <strong>주소:</strong> 경기도 성남시
        </p>
        <p>
          <strong>마감일:</strong> {request.createdAt}
        </p>
      </div>

      <div className="py-20 text-gray-700 w-full border-b-[1px]">
        {request.description}
      </div>

      {/* 댓글 영역 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">댓글 ({comments.length})</h2>
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
    </div>
  );
};

export default RequestDetailPage;
