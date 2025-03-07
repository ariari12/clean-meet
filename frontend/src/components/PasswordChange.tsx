import React, { useState } from "react";
// import Loader from "./Loader";

const PasswordChange = () => {
  const [password, setPassword] = useState<string>("");
  const [isEdit, setisEdit] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(true);

  const toggleEdit = () => {
    setisEdit(!isEdit);
  };

  // if (!loading) {
  //   return <Loader />;
  // }

  return (
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
  );
};

export default PasswordChange;
