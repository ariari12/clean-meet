import React, { useState } from "react";

const RequestRegistPage = () => {
  const [title, setTitle] = useState("");
  const [cleaningType, setCleaningType] = useState("일반 청소");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (images.length >= 5) return;

    const files = Array.from(e.target.files).slice(0, 5 - images.length);
    setImages([...images, ...files]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRequest = {
      title,
      cleaningType,
      startDate,
      endDate,
      description,
      images,
      status: "모집중",
      createdAt: new Date().toISOString().split("T")[0],
    };
    console.log("등록 데이터 확인:", newRequest);
  };

  return (
    <div className="my-[100px] max-w-3xl mx-auto p-6 bg-zinc-50 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">의뢰 등록</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 제목 입력 */}
        <div>
          <label className="block text-gray-700">의뢰 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* 청소 유형 & 게시 기간 선택 */}
        <div className="flex space-x-4">
          {/* 청소 유형 */}
          <div className="flex-1">
            <label className="block text-gray-700">청소 유형</label>
            <select
              value={cleaningType}
              onChange={(e) => setCleaningType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="일반 청소">일반 청소</option>
              <option value="특수 청소">특수 청소</option>
              <option value="방역 청소">방역 청소</option>
            </select>
          </div>

          {/* 게시 기간 */}
          <div className="flex-1">
            <label className="block text-gray-700">게시 기간</label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <span className="flex items-center">~</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* 설명 입력 */}
        <div>
          <label className="block text-gray-700">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            rows={4}
          ></textarea>
        </div>

        {/* 이미지 업로드 */}
        <div>
          <label className="block text-gray-700">이미지 첨부 (최대 5개)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="max-w-[120px] w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            의뢰 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestRegistPage;
