import MyWriting from "@/components/profile/MyWriting";
import ReceiveMsg from "@/components/profile/ReceiveMsg";
import SideMenu from "@/components/profile/SideMenu";
import UserInfo from "@/components/profile/UserInfo";
import React, { useState } from "react";

type TabType = "basic" | "messages" | "posts";

const PersonalProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("basic");

  return (
    <div className="flex my-[100px] min-h-[70vh] max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* 사이드 메뉴 */}
      <SideMenu activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-4">
        {/* 기업 정보 */}
        {activeTab === "basic" && <UserInfo />}
        {activeTab === "messages" && <ReceiveMsg />}
        {activeTab === "posts" && <MyWriting />}
      </div>
    </div>
  );
};

export default PersonalProfilePage;
