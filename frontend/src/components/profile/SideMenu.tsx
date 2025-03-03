import React from "react";

type TabType = "basic" | "messages" | "posts";

interface SideMenuProps {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const SideMenu: React.FC<SideMenuProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => setActiveTab("basic")}
            className={`w-full p-2 text-left font-semibold rounded-lg ${
              activeTab === "basic"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            기본정보
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full p-2 text-left font-semibold rounded-lg ${
              activeTab === "messages"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            받은 메시지
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("posts")}
            className={`w-full p-2 text-left font-semibold rounded-lg ${
              activeTab === "posts"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            내가 쓴 글
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
