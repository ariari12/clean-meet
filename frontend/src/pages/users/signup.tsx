import React, { useState } from "react";
import GeneralSignup from "../../components/GeneralSignup";
import CompanySignup from "../../components/CompanySignup";

type ActiveTab = "general" | "company";

const SignupPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("general");

  return (
    <div className="relative w-full h-[100vh] flex flex-col justify-center items-center text-center">
      <div className="text-center font-black text-[30px] text-[#1089d3]">
        회원가입
      </div>
      <div className="max-w-[650px] bg-gradient-to-t from-white to-[#f4f7fb] rounded-[40px] p-[25px] px-[35px] border-[5px] border-white shadow-[rgba(133,189,215,0.88)_0px_30px_30px_-20px] m-[20px]">
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${
              activeTab === "general" ? "bg-cyan-700 text-white" : "bg-gray-200"
            } rounded-l-lg`}
            onClick={() => setActiveTab("general")}
          >
            개인 회원
          </button>
          <button
            className={`flex-1 py-2 ${
              activeTab === "company" ? "bg-cyan-700 text-white" : "bg-gray-200"
            } rounded-r-lg`}
            onClick={() => setActiveTab("company")}
          >
            기업 회원
          </button>
        </div>

        {/* <form className="mt-[20px]" onSubmit={handleSubmit}> */}
        {activeTab === "general" ? <GeneralSignup /> : <CompanySignup />}
        {/* </form> */}
      </div>
    </div>
  );
};

export default SignupPage;
