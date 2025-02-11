import React, { useState } from "react";

const PersonalProfilePage = () => {
  const [phone, setPhone] = useState("010-1234-5678");
  // const [email, setEmail] = useState("test@test.com");
  const [address, setAddress] = useState("경기도 성남시 xx구 xx동");
  const [password, setPassword] = useState("");
  const [isEdit, setisEdit] = useState(false);

  const toggleEdit = () => {
    setisEdit(!isEdit);
  };

  return (
    <div className="flex flex-col items-center my-[100px] max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* 프로필 정보 */}
      <div className="flex items-center w-full p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="w-32 h-32 bg-gray-300 rounded-full shadow-inner"></div>
        <div className="px-10">
          <h2 className="text-2xl font-bold text-gray-800 mt-4">테스트 유저</h2>
          {/* <p className="text-md text-gray-500">{email}</p> */}
          <p className="text-md text-gray-500">test@test.com</p>
          <p className="text-md text-gray-500">일반 사용자</p>
          <p className="mt-3 text-sm text-gray-600">가입일: 2025-02-11</p>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex justify-between items-center my-2">
          <h3 className="text-lg font-semibold text-zinc-900">기본 정보</h3>
          <button
            onClick={toggleEdit}
            className={`text-sm px-3 py-2 rounded-lg shadow-md transition-all duration-300 ${
              isEdit
                ? "bg-white text-red-600 border-[1px] border-red-600"
                : "bg-blue-600 text-white"
            }`}
            style={{
              backgroundColor: isEdit ? "#ffffff" : "#3B82F6",
            }}
          >
            {isEdit ? "저장" : "수정"}
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              전화번호
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              주소
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* 비밀번호 변경 필드 */}
      <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex justify-between items-center my-2">
          <h3 className="text-lg font-semibold text-zinc-900">비밀번호</h3>
          <button
            onClick={toggleEdit}
            className={`text-sm px-3 py-2 rounded-lg shadow-md transition-all duration-300 ${
              isEdit
                ? "bg-white text-red-600 border-[1px] border-red-600"
                : "bg-blue-600 text-white"
            }`}
            style={{
              backgroundColor: isEdit ? "#ffffff" : "#3B82F6",
            }}
          >
            {isEdit ? "저장" : "수정"}
          </button>
        </div>
        <input
          type="password"
          placeholder="기존 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="새 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* 설정 */}
      <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-zinc-900">설정</h3>
        <div className="flex justify-between items-center space-x-4">
          <p className="text-sm text-red-600 mb-0">
            탈퇴 시 계정 정보가 삭제되며 복구할 수 없습니다. 신중히 결정해
            주세요.
          </p>
          <button className="max-w-[92px] w-full py-2 bg-white text-sm border-[1px] border-red-600 text-red-500 font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-red-600 hover:text-white">
            회원탈퇴
          </button>
        </div>
      </div>

      {/* 나중에 알림이나 메일 같은거 기능 추가할 때 사용 */}
      {/* <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">알림 설정</h3>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-5 h-5" />
          <span className="text-md text-gray-600">알림 받기</span>
        </label>
      </div> */}
    </div>
  );
};

export default PersonalProfilePage;
