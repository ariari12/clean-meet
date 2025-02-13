import React from "react";

interface GeneralSignupProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  setAddressName: React.Dispatch<React.SetStateAction<string>>;
}

const GeneralSignup: React.FC<GeneralSignupProps> = ({
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setContact,
  setAddressName,
}) => (
  <>
    <input
      type="text"
      id="name"
      className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_5px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
      onChange={(e) => setName(e.target.value)}
      placeholder="이름"
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
  </>
);

export default GeneralSignup;
