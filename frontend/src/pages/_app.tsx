import Layout from "@/components/Layout";
import "@/styles/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/UserContext";
import { useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const REFRESH_URL = "/api/auth/refreshToken";

const refreshToken = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}${REFRESH_URL}`,
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
      }
    );
    localStorage.setItem("token", response.data);
    console.log("토큰 갱신 완료:", response.data);
  } catch (error) {
    console.error("토큰 갱신 실패", error);
    localStorage.removeItem("token");
    window.location.href = "/login"; // 만료되면 로그인 페이지로 이동
  }
};

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 25 * 60 * 1000); // 25분마다 실행

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
