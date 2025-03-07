import React, { useState } from "react";

interface Message {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
}

const messagesData: Message[] = [
  {
    id: 1,
    author: "김청소",
    date: "2025-03-04",
    title: "청소 서비스 문의",
    content:
      "안녕하세요, 거실과 주방 대청소 서비스를 받고 싶은데 가능할까요? 서비스 가능 지역과 비용이 궁금합니다.",
    isRead: false,
  },
  {
    id: 2,
    author: "이정리",
    date: "2025-03-03",
    title: "사무실 청소 일정 협의",
    content:
      "안녕하세요. 저희 회사에서 정기적인 사무실 청소를 고려하고 있습니다. 매주 월요일 오전에 청소가 가능한지 문의드립니다.",
    isRead: false,
  },
  {
    id: 3,
    author: "박깨끗",
    date: "2025-03-02",
    title: "이사 청소",
    content: "이사 청소를 문의 드리고 싶어요",
    isRead: true,
  },
];

const ReceiveMsg: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [showUnread, setShowUnread] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const toggleRead = (id: number) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );
    setSelectedMessage(messages.find((msg) => msg.id === id) || null);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 border-b border-solid border-gray-200 pb-4 w-full text-2xl font-bold ">
        받은 문의
      </h2>
      <div className="flex justify-end items-center space-x-2 mb-4">
        <span className="text-sm text-gray-700">안 본 것만 보기</span>
        <label className="relative inline-block w-16 h-8 cursor-pointer">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0 peer"
            onChange={() => setShowUnread(!showUnread)}
            checked={showUnread}
          />
          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full border border-gray-400 peer-checked:bg-cyan-700 peer-checked:border-transparent transition-all duration-300 ease-in-out"></span>
          <span className="absolute left-1 top-1 block w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-8 transition-all duration-300 ease-in-out"></span>
        </label>
      </div>

      <ul>
        {messages
          .filter((msg) => !showUnread || !msg.isRead)
          .map((msg) => (
            <li
              key={msg.id}
              className={`p-3 border-b border-solid border-gray-200 rounded mb-2 cursor-pointer ${
                msg.isRead ? "bg-white" : "bg-indigo-50"
              }`}
              onClick={() => toggleRead(msg.id)}
            >
              <div className="flex justify-between">
                <p className="text-lg font-semibold">{msg.title}</p>
                <p className="text-zinc-400 text-sm">
                  ({msg.date})<br />
                </p>
              </div>
              <p className="text-zinc-400 font-semibold text-sm mt-1 mb-3">
                {msg.author}
              </p>
              <span className="text-gray-600">
                {msg.content.length > 30
                  ? msg.content.slice(0, 30) + "..."
                  : msg.content}
              </span>
            </li>
          ))}
      </ul>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold">{selectedMessage.title}</h2>
            <p className="text-gray-700">{selectedMessage.content}</p>
            <div className="text-right">
              <button
                className="mt-4 p-2 bg-black text-white rounded"
                onClick={() => setSelectedMessage(null)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiveMsg;
