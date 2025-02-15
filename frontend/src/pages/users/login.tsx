"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUser(); // UserContext에서 setUser를 사용

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("로그인:", 1);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    // 데이터 예시
    // {
    //   "accessToken": "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VybmFtZSI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjEiLCJuYW1lIjoic3RyaW5nIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9QRVJTT05BTCJdLCJjYXRlZ29yeSI6ImFjY2Vzc1Rva2VuIiwiaWF0IjoxNzM5NjE4OTQzLCJleHAiOjE3Mzk2MjA3NDN9.nzUZBuj0w8wwcwcan8kgs1TBq7uHph-bVXuAWKQSl1XhaTA1tRe499TzxW7aAeM7",
    //   "email": "test@test.com",
    //   "name": "string",
    //   "authorities": [
    //     {
    //       "authority": "ROLE_PERSONAL"
    //     }
    //   ]
    // }

    try {
      console.log("로그인:", 2);
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // 백엔드와 쿠키/토큰 공유
        }
      );

      console.log("로그인 성공:", response.data);

      // JWT 토큰 저장
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      
      // 사용자 정보 저장
      const user = {
        email: response.data.email,
        name: response.data.name,
        authorities: response.data.authority,
      };
      setUser(user);

      router.push("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("로그인 에러:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative w-full h-[100vh] flex flex-col justify-center items-center text-center">
      <div className="max-w-[650px] lg:w-[650px] bg-gradient-to-t from-white to-[#f4f7fb] rounded-[40px] p-[25px] px-[35px] border-[5px] border-white shadow-[rgba(133,189,215,0.88)_0px_30px_30px_-20px] m-[20px]">
        <div className="text-center font-black text-[30px] text-[#1089d3]">
          로그인
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
