"use client";

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("로그인:", 1);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("로그인:", 2);
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // 백엔드와 쿠키/토큰 공유
        }
      );
  
      console.log("로그인 성공:", response.data);

      // JWT 토큰 저장 
      const token = response.data;
      localStorage.setItem("token", token);

      router.push("/")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("로그인 에러:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative w-full h-[100vh] flex flex-col justify-center items-center text-center">
      <div className="max-w-[650px] lg:w-[650px] bg-gradient-to-t from-white to-[#f4f7fb] rounded-[40px] p-[25px] px-[35px] border-[5px] border-white shadow-[rgba(133,189,215,0.88)_0px_30px_30px_-20px] m-[20px]">
        <div className="text-center font-black text-[30px] text-[#1089d3]">
          로그인11
        </div>
        <form className="mt-[20px]" onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
          />

          <input
            type="password"
            className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />

          <input
            type="submit"
            className="block w-full font-bold bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white py-[15px] mt-[20px] mx-auto rounded-[20px] shadow-[rgba(133,189,215,0.88)_0px_20px_10px_-15px] border-none transition-transform duration-200 ease-in-out hover:scale-[1.03]"
            value="로그인"
          />
        </form>

        <Link
          href="/users/signup"
          className="block w-full font-bold bg-gradient-to-r from-[#132b39] to-[#085260] text-white py-[15px] mt-[20px] mx-auto rounded-[20px] shadow-[rgba(133,189,215,0.88)_0px_20px_10px_-15px] border-none transition-transform duration-200 ease-in-out hover:scale-[1.03]"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
