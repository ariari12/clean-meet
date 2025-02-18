import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RequestRegistPage = () => {
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

  const [title, setTitle] = useState("");
  const [cleaningType, setCleaningType] = useState("OFFICE_CLEANING");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [addressName, setAddressName] = useState("");
  // const [region1DepthName, setRegion1DepthName] = useState("");
  // const [region2DepthName, setRegion2DepthName] = useState("");
  // const [region3DepthName, setRegion3DepthName] = useState("");
  // const [roadName, setRoadName] = useState("");
  // const [mainBuildingNo, setMainBuildingNo] = useState("");
  // const [subBuildingNo, setSubBuildingNo] = useState("");
  // const [zoneNo, setZoneNo] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (images.length >= 5) return;

    const files = Array.from(e.target.files).slice(0, 5 - images.length);
    setImages([...images, ...files]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestData = {
      title,
      description,
      startDate,
      endDate,
      addressRequestDto: {
        addressName,
        region1DepthName: "",
        region2DepthName: "",
        region3DepthName: "",
        roadName: "",
        mainBuildingNo: "",
        subBuildingNo: "",
        zoneNo: "",
      },
      serviceCategory: {
        name: cleaningType,
      },
    };

    console.log("데이터 확인:", requestData);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/service/commitsstion`,
        requestData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", 
          },
        }
      );
      console.log("등록 성공:", response.data);
      const requestId = response.data.id; 
      if (requestId) {
        router.push(`/request/${requestId}`);
      }
    } catch (error) {
      console.error("등록 실패:", error);
    }
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
              <option value="OFFICE_CLEANING">사무실 청소</option>
              <option value="HOME_CLEANING">가정 청소</option>
              <option value="MOVE_CLEANING">이사 청소</option>
              <option value="WINDOW_CLEANING">창문 청소</option>
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

        {/* 주소 */}
        <div>
          <label className="block text-gray-700">주소</label>
          <input
            type="text"
            value={addressName}
            onChange={(e) => setAddressName(e.target.value)}
            placeholder="주소명"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
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
