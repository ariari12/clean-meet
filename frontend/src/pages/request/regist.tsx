import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RequestRegistPage = () => {
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [title, setTitle] = useState("");
  const [cleaningType, setCleaningType] = useState("OFFICE_CLEANING");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [addressName, setAddressName] = useState("");
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

    try {
      const token = localStorage.getItem("token") || "";
      const response = await axios.post(
        `${API_BASE_URL}/api/service/commission`,
        requestData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const requestId = response.data.id;
      if (requestId) {
        router.push(`/request/${requestId}`);
      }
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <div>
      <div className="pt-[120px] bg-gradient-to-r from-teal-600 to-teal-400 text-white">
        <div className="max-w-7xl mx-auto py-10 px-6 flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-4">
              믿을 수 있는 청소 전문 업체를 만나보세요!
            </h1>
            <p className="text-lg mb-6">
              다양한 업체의 서비스와 후기를 확인하고 <br />
              내게 맞는 청소 업체를 선택하세요.
            </p>
          </div>

          <Link href="/company" passHref>
            <span className="max-w-[320px] block px-6 py-3 bg-zinc-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-zinc-950 transition cursor-pointer">
              전문업체 확인하기
            </span>
          </Link>
        </div>
      </div>

      <div className="my-[80px] max-w-4xl mx-auto p-8 bg-zinc-50 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          청소 의뢰 등록
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 의뢰 제목 */}
          <div>
            <label className="block text-lg text-gray-700">의뢰 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* 청소 유형 & 게시 기간 */}
          <div className="flex space-x-6">
            {/* 청소 유형 */}
            <div className="flex-1">
              <label className="block text-lg text-gray-700">청소 유형</label>
              <select
                value={cleaningType}
                onChange={(e) => setCleaningType(e.target.value)}
                className="w-full h-[48px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
              >
                <option value="HOME_CLEANING">가정 청소</option>
                <option value="OFFICE_CLEANING">사무실 청소</option>
                <option value="MOVE_CLEANING">이사 청소</option>
                <option value="WINDOW_CLEANING">창문 청소</option>
              </select>
            </div>

            {/* 게시 기간 */}
            <div className="flex-1">
              <label className="block text-lg text-gray-700">게시 기간</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-1/2 h-[48px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <span className="flex items-center">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-1/2 h-[48px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
          </div>

          {/* 설명 입력 */}
          <div>
            <label className="block text-lg text-gray-700">상세 설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              rows={4}
            ></textarea>
          </div>

          {/* 주소 */}
          <div>
            <label className="block text-lg text-gray-700">주소</label>
            <input
              type="text"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
              placeholder="주소명"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* 이미지 업로드 */}
          <div>
            <label className="block text-lg text-gray-700">
              이미지 첨부 (최대 5개)
            </label>
            <div className="mt-4 flex gap-3 flex-wrap">
              {images.map((img, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-lg shadow-lg"
                />
              ))}
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition duration-200"
            >
              의뢰 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestRegistPage;
