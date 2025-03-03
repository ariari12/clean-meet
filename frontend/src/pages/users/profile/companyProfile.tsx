// import Image from "next/image";
import CompanyInfo from "@/components/profile/CompanyInfo";
import MyWriting from "@/components/profile/MyWriting";
import ReceiveMsg from "@/components/profile/ReceiveMsg";
import SideMenu from "@/components/profile/SideMenu";
import React, { useState } from "react";
// import { LuPencil } from "react-icons/lu";

type TabType = "basic" | "messages" | "posts";

const CompanyProfilePage = () => {
  const [companyDetails, setCompanyDetails] =
    useState(`저희 청소 전문 업체는 서울, 경기, 인천 지역에서 다년간 운영되어 온 신뢰할 수 있는 기업입니다.
    고객 만족을 최우선으로 하며, 상업 및 주거 공간의 청소를 전문적으로 제공합니다.
    사무실, 주거지, 입주 청소뿐만 아니라 특수 청소 서비스까지 다양한 범위의 서비스를 제공합니다.
    친환경 세제를 사용하여 건강하고 안전한 청소 환경을 유지하며, 최신 청소 장비와 검증된 전문가들로 구성된 팀이
    고객의 기대를 뛰어넘는 서비스를 제공하는 것을 목표로 하고 있습니다.`);

  const [activeTab, setActiveTab] = useState<TabType>("basic");

  return (
    <div className="flex my-[100px] min-h-[70vh] max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* 사이드 메뉴 */}
      <SideMenu activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-4">
        {/* 기업 정보 */}
        {activeTab === "basic" && (
          <CompanyInfo
            companyDetails={companyDetails}
            setCompanyDetails={setCompanyDetails}
          />
        )}
        {activeTab === "messages" && <ReceiveMsg />}
        {activeTab === "posts" && <MyWriting />}
      </div>
    </div>
  );
};

export default CompanyProfilePage;
