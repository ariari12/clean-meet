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
            className={`w-full p-2 text-center font-semibold rounded-lg transition duration-300 ${
              activeTab === "basic"
                ? "bg-teal-500 text-white"
                : "bg-emerald-700 bg-opacity-40 text-white"
            }`}
          >
            기본정보
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full p-2 text-center font-semibold rounded-lg transition duration-300 ${
              activeTab === "messages"
                ? "bg-teal-500 text-white"
                : "bg-emerald-700 bg-opacity-40 text-white"
            }`}
          >
            받은 메시지
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("posts")}
            className={`w-full p-2 text-center font-semibold rounded-lg transition duration-300 ${
              activeTab === "posts"
                ? "bg-teal-500 text-white"
                : "bg-emerald-700 bg-opacity-40 text-white"
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
