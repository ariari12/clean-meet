import React, { useState } from "react";
import axios from "axios";
import GeneralSignup from "../../component/GeneralSignup";
import CompanySignup from "../../component/CompanySignup";

const SignupPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"general" | "company">("general");
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
      ...(activeTab === "company" && { companyName }),
    };

    try {
      await axios.post("/api/users", submitData);
      alert("회원가입 성공");
    } catch (error) {
      alert("회원가입 실패: " + error);
    }
  };

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

        <form className="mt-[20px]" onSubmit={handleSubmit}>
          {activeTab === "general" ? (
            <GeneralSignup
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              setContact={setContact}
              setAddressName={setAddressName}
            />
          ) : (
            <CompanySignup
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              setContact={setContact}
              setCompanyName={setCompanyName}
              setAddressName={setAddressName}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
