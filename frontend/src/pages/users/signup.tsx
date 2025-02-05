import React from "react";

const SignupPage = () => {
  return (
    <div className="relative w-full h-[100vh] flex justify-center items-center text-center">
      <div className="max-w-[650px] bg-gradient-to-t from-white to-[#f4f7fb] rounded-[40px] p-[25px] px-[35px] border-[5px] border-white shadow-[rgba(133,189,215,0.88)_0px_30px_30px_-20px] m-[20px]">
        <div className="text-center font-black text-[30px] text-[#1089d3]">
          회원가입
        </div>
        <form className="mt-[20px]">
          <input
            placeholder="이메일"
            id="email"
            name="email"
            type="email"
            className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
            required
          />
          <input
            placeholder="비밀번호"
            id="password"
            name="password"
            type="password"
            className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
            required
          />
          <input
            placeholder="비밀번호 확인"
            id="password"
            name="password"
            type="password"
            className="w-full bg-white border-none p-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] focus:outline-none focus:border-2 focus:border-[#12b1d1] placeholder:text-[#aaaaaa]"
            required
          />
          <input
            value="회원가입"
            type="submit"
            className="block w-full font-bold bg-gradient-to-r from-[#132b39] to-[#085260] text-white py-[15px] mt-[20px] mx-auto rounded-[20px] shadow-[rgba(133,189,215,0.88)_0px_20px_10px_-15px] border-none transition-transform duration-200 ease-in-out hover:scale-[1.03] hover:shadow-[rgba(133,189,215,0.88)_0px_23px_10px_-20px] active:scale-[0.95] active:shadow-[rgba(133,189,215,0.88)_0px_15px_10px_-10px]"
          />
        </form>
        <div className="mt-[25px]">
          <span className="block text-center text-[10px] text-[#aaaaaa]">
            다른 로그인 방법
          </span>
          <div className="w-full flex justify-center gap-[15px] mt-[5px]">
            <button className="bg-gradient-to-r from-black to-gray-500 border-[5px] border-white p-[5px] rounded-full w-[40px] aspect-square grid place-content-center shadow-[rgba(133,189,215,0.88)_0px_12px_10px_-8px] transition-transform duration-200 ease-in-out hover:scale-[1.2] active:scale-[0.9]">
              <svg
                viewBox="0 0 488 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
