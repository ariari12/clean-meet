import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SignupPage = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [addressName, setAddressName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const submitData = {
      email,
      password,
      name,
      contact,
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
    };

    try {
      await axios.post("/api/users", submitData);
      alert("회원가입 성공");
      router.push("/user/login")
    } catch (error) {
      alert("회원가입 실패: " + error);
    }
  };

  return (
    <div className="relative w-full h-[100vh] flex justify-center items-center text-center">
      <div className="max-w-[650px] bg-gradient-to-t from-white to-[#f4f7fb] rounded-[40px] p-[25px] px-[35px] border-[5px] border-white shadow-[rgba(133,189,215,0.88)_0px_30px_30px_-20px] m-[20px]">
        <div className="text-center font-black text-[30px] text-[#1089d3]">회원가입11</div>
        <form className="mt-[20px]" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="이메일"
            required
          />
          <input
            type="password"
            id="password"
            className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            placeholder="비밀번호"
            required
          />
          <input
            type="password"
            id="confirmPassword"
            className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="비밀번호 확인"
            required
          />
          <input
            type="text"
            id="name"
            className=""
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="이름"
            required
            />
          <input
            type="text"
            id="contact"
            className=""
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            placeholder="연락처"
            required
            />
          <input
            type="text"
            id="addressName"
            className=""
            onChange={(e) => setAddressName(e.target.value)}
            value={addressName}
            placeholder="주소"
            required
          />

          <input
            type="submit"
            className="block w-full font-bold bg-gradient-to-r from-[#132b39] to-[#085260] text-white py-[15px] mt-[20px] mx-auto rounded-[20px] shadow-[rgba(133,189,215,0.88)_0px_20px_10px_-15px] border-none transition-transform duration-200 ease-in-out hover:scale-[1.03] hover:shadow-[rgba(133,189,215,0.88)_0px_23px_10px_-20px] active:scale-[0.95] active:shadow-[rgba(133,189,215,0.88)_0px_15px_10px_-10px]"
            value="회원가입"
          />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
