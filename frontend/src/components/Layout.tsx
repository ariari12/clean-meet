"use client";

import React, { ReactNode } from "react";
import Navbar from "./Navbar";
// import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // admin 페이지 내용 잠시 주석
  // const pathname = usePathname(); // 현재 경로 가져오기
  // const isAdminPage = pathname.startsWith("/admin"); // admin 페이지 확인

  return (
    <div className="layout__div">
      {/* 
        admin 페이지 구현되면 주석 풀 예정
        {!isAdminPage && <Navbar />} 
      */}
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
