import React from "react";

interface Writing {
  id: number;
  title: string;
  date: string;
  content: string;
  url: string;
}

const writings: Writing[] = [
  {
    id: 1,
    title: "청소 서비스 예약 방법알려주세요",
    date: "2025-03-04",
    content: "청소 서비스를 예약하는 방법에 대해 알려주세요. 우선...",
    url: "/request/1",
  },
  {
    id: 2,
    title: "예약 시 고려할 점있나요?",
    date: "2025-03-02",
    content: "청소 문의를 드리고 싶은데 예약시 고려할 점이 있나요?",
    url: "/request/2",
  },
  {
    id: 3,
    title: "입주 청소 후기",
    date: "2025-02-28",
    content:
      "최근 입주 청소를 진행한 후기를 공유합니다. 처음에는 걱정이 많았지만...",
    url: "/request/3",
  },
];

const MyWriting = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 border-b border-solid border-gray-200 pb-4 w-full text-2xl font-bold ">
        내가 쓴 글
      </h2>

      <ul className="w-full">
        {writings.map((writing) => (
          <li
            key={writing.id}
            className="p-3 border-b border-solid border-gray-200 rounded mb-2 cursor-pointer bg-white hover:bg-indigo-50"
            onClick={() => (window.location.href = writing.url)}
          >
            <div className="flex justify-between mb-2">
              <p className="text-lg font-semibold">{writing.title}</p>{" "}
              <p className="text-zinc-400 text-sm">({writing.date})</p>
            </div>
            <p className="text-gray-600">
              {writing.content.length > 20
                ? writing.content.slice(0, 20) + "..."
                : writing.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyWriting;
