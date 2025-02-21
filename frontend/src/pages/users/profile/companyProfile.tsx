import Image from "next/image";
import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";

const CompanyProfilePage = () => {
  const [tags, setTags] = useState(["사무실 청소", "입주 청소", "특수 청소"]);
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  });

  const [companyDetails, setCompanyDetails] =
    useState(`저희 청소 전문 업체는 서울, 경기, 인천 지역에서 다년간 운영되어 온 신뢰할 수 있는 기업입니다. 
    고객 만족을 최우선으로 하며, 상업 및 주거 공간의 청소를 전문적으로 제공합니다. 
    사무실, 주거지, 입주 청소뿐만 아니라 특수 청소 서비스까지 다양한 범위의 서비스를 제공합니다. 
    친환경 세제를 사용하여 건강하고 안전한 청소 환경을 유지하며, 최신 청소 장비와 검증된 전문가들로 구성된 팀이 
    고객의 기대를 뛰어넘는 서비스를 제공하는 것을 목표로 하고 있습니다.`);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleProfileEditClick = () => {
    setIsEditingProfile(true);
  };

  const handleProfileSaveClick = () => {
    setIsEditingProfile(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleAddTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col items-center my-[100px] max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* 프로필 정보 */}
      {/* <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md"> */}
      <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md flex items-center gap-6">
        {/* 프로필 상세 정보 */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">기본 프로필</h3>
            <button
              onClick={
                isEditingProfile
                  ? handleProfileSaveClick
                  : handleProfileEditClick
              }
              className="text-blue-500 hover:text-gray-700"
            >
              {isEditingProfile ? (
                "저장"
              ) : (
                <span className="text-lg text-gray-700">
                  <LuPencil />
                </span>
              )}
            </button>
          </div>

          <div className="flex justify-between items-center gap-16">
            {/* 프로필 이미지 자리 */}
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              {/* 실제 이미지가 있을 경우 src를 적용 */}
              <Image
                // src={profile.imageUrl || "/default-profile.png"}
                src={""}
                // alt="프로필 이미지"
                alt=""
                width={96}
                height={96}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {isEditingProfile ? (
              <div className="space-y-2 w-2/3">
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-md text-gray-600"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-md text-gray-600"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-md text-gray-600"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-md text-gray-600"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
                <textarea
                  className="w-full p-2 border rounded-lg text-md text-gray-600"
                  rows={3}
                  value={profile.description}
                  onChange={(e) =>
                    setProfile({ ...profile, description: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="w-2/3">
                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                  {profile.name}
                </h2>
                <p className="text-md text-gray-500">주소: {profile.address}</p>
                <p className="text-md text-gray-500">
                  대표번호: {profile.phone}
                </p>
                <p className="text-md text-gray-500">이메일: {profile.email}</p>
                <p className="mt-3 text-sm text-gray-600">
                  한줄 소개: {profile.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 상세 기업 정보 */}
      <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-700">회사 상세</h3>

          <button
            onClick={isEditing ? handleSaveClick : handleEditClick}
            className="text-blue-500 hover:text-gray-700"
          >
            {isEditing ? (
              "저장"
            ) : (
              <span className="text-lg text-gray-700">
                <LuPencil />
              </span>
            )}
          </button>
        </div>
        {isEditing ? (
          <textarea
            className="w-full p-2 border rounded-lg text-md text-gray-600"
            rows={5}
            value={companyDetails}
            onChange={(e) => setCompanyDetails(e.target.value)}
          />
        ) : (
          <p className="text-md text-gray-600">{companyDetails}</p>
        )}
      </div>

      {/* 태그 추가 */}
      <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">태그 추가</h3>
        <p className="mt-2 text-gray-400 text-sm">
          플랫폼에 귀사의 회사가 노출될 수 있도록 합니다. 체크 해제 시 회사
          목록에서 제외됩니다.
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-200 text-blue-700 text-sm px-3 py-1 rounded-md"
            >
              <span>{tag}</span>
              <button
                className="ml-2 text-sm text-black"
                onClick={() => handleRemoveTag(tag)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddTag} className="mt-2 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border px-2 rounded-lg w-full"
            placeholder="회사와 함께 보여줄 태그를 입력해주세요."
          />
          <button
            type="submit"
            className="min-w-[50px] text-sm bg-blue-500 p-2 text-white rounded-lg"
          >
            추가
          </button>
        </form>
      </div>

      {/* 회사 목록에 노출 체크박스 */}
      <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="company-list-check"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2 w-5 h-5"
          />
          <label htmlFor="company-list-check" className="text-md text-gray-700">
            회사 목록에 노출
          </label>
        </div>
        <p className="m-2 text-gray-400 text-sm">
          플랫폼에 귀사의 회사가 노출될 수 있도록 합니다. <br />
          체크 해제 시 회사 목록에서 제외됩니다.
        </p>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
