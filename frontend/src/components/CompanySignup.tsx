import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CompanySignup = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [addressName, setAddressName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const submitData = {
      companyName,
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
      const apiUrl = `${API_BASE_URL}/api/users/company`; // 기업 회원가입

      await axios.post(apiUrl, submitData);
      alert("회원가입 성공");
      router.push("/users/login");
    } catch (error) {
      alert("회원가입 실패: " + error);
    }
  };

  return (
    <form className="mt-[20px]" onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_5px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
        onChange={(e) => setName(e.target.value)}
        placeholder="담당자 이름"
        required
      />
      <input
        type="email"
        id="email"
        className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_5px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        required
      />
      <input
        type="password"
        id="password"
        className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_5px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <input
        type="password"
        id="confirmPassword"
        className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_5px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        required
      />
      <input
        type="text"
        id="contact"
        className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_5px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
        onChange={(e) => setContact(e.target.value)}
        placeholder="연락처"
        required
      />
      <input
        type="text"
        id="companyName"
        className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_5px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="회사명"
        required
      />
      <input
        type="text"
        id="addressName"
        className="w-full mb-10 bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_5px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
        onChange={(e) => setAddressName(e.target.value)}
        placeholder="주소"
        required
      />
      <input
        type="submit"
        className="block w-full font-bold bg-gradient-to-r from-[#132b39] to-[#085260] text-white py-[15px] mt-[20px] mx-auto rounded-[20px] shadow-[rgba(133,189,215,0.88)_0px_20px_10px_-15px] border-none transition-transform duration-200 ease-in-out hover:scale-[1.03] hover:shadow-[rgba(133,189,215,0.88)_0px_23px_10px_-20px] active:scale-[0.95] active:shadow-[rgba(133,189,215,0.88)_0px_15px_10px_-10px]"
        value="회원가입"
      />
    </form>
  );
};

export default CompanySignup;
