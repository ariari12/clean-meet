import Layout from "@/components/Layout";
import "@/styles/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
