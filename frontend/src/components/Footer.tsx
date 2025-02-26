import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="pt-[72px] relative w-full h-[500px] flex flex-col justify-center items-center text-center bg-gray-900 text-white">
      <div className="relative z-10 mb-6">
        <h2 className="text-2xl font-bold">Clean Meet</h2>
        <p className="text-sm">최고의 청소 서비스를 제공합니다.</p>
      </div>

      <div className="flex justify-center gap-8 mb-6">
        {/* <Link href="/about" className="hover:text-cyan-400">회사 소개</Link> */}
        <Link href="/" className="hover:text-cyan-400">
          회사 소개
        </Link>
        <span className="px-3">|</span>
        {/* <Link href="/contact" className="hover:text-cyan-400">고객센터</Link> */}
        <Link href="/" className="hover:text-cyan-400">
          고객센터
        </Link>
        <span className="px-3">|</span>
        {/* <Link href="/privacy" className="hover:text-cyan-400">개인정보 처리방침</Link> */}
        <Link href="/" className="hover:text-cyan-400">
          개인정보 처리방침
        </Link>
        <span className="px-3">|</span>
        {/* <Link href="/terms" className="hover:text-cyan-400">이용 약관</Link> */}
        <Link href="/" className="hover:text-cyan-400">
          이용 약관
        </Link>
      </div>

      <div className="text-sm text-gray-400">
        <p>&copy; 2025 청소 플랫폼 clean-meet. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
