import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";

interface Profile {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
}

interface CompanyInfoProps {
  companyDetails: string;
  setCompanyDetails: React.Dispatch<React.SetStateAction<string>>;
}

const CompanyInfo = ({
  companyDetails,
  setCompanyDetails,
}: CompanyInfoProps) => {
  const [tags, setTags] = useState(["사무실 청소", "입주 청소", "특수 청소"]);
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  });

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
    <>
      {/* 프로필 정보 */}
      {/* <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md"> */}
      <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md flex items-center gap-6">
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
            {/* <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <Image
                // src={profile.imageUrl || "/default-profile.png"}
                src={""}
                // alt="프로필 이미지"
                alt=""
                width={96}
                height={96}
                className="w-full h-full rounded-full object-cover"
              />
            </div> */}
            <div className="w-[150px] h-[150px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
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
    </>
  );
};

export default CompanyInfo;
