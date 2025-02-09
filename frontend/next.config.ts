import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // output: 'export', // 정적 파일로 내보내기
  output: 'standalone', // 정적 파일로 내보내기
};

export default nextConfig;
