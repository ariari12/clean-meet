import React, { useState, useEffect } from "react";
import axios from "axios";

const UserInfo = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // 프로필 정보 state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isEdit, setisEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleEdit = () => {
    setisEdit(!isEdit);
  };

  // 프로필 정보 가져오기
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      const profileRes = response.data;
      console.log("profileRes", profileRes)
      setEmail(profileRes.email);
      setName(profileRes.name);
      setContact(profileRes.contact);
      setAddress(profileRes.addressName);

      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error("프로필 정보를 가져오는데 실패했습니다.", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>로딩 </div>;
  }

  return (
    <div className="p-4 bg-white">
      <h2 className="mb-4 border-b border-solid border-gray-200 pb-4 w-full text-2xl font-bold ">
        프로필 정보
      </h2>
      {/* 프로필 정보 */}
      <div className="flex items-center w-full p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="w-32 h-32 bg-gray-300 rounded-full shadow-inner"></div>
        <div className="px-10">
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{name}</h2>
          <p className="text-md text-gray-500">{email}</p>
          {/* <p className="text-md text-gray-500">일반 사용자</p> */}
          <p className="mt-3 text-sm text-gray-600">가입일: 2025-03-05</p>
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
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              전화번호
            </label>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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
        <h3 className="text-lg font-semibold mb-3 text-zinc-900">회원탈퇴</h3>
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

export default UserInfo;
