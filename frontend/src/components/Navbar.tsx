import Link from "next/link";
import React from "react";
import { useUser } from "../context/UserContext";
import { TiHome } from "react-icons/ti";
import { IoCreate } from "react-icons/io5";
import { RiFileList3Fill } from "react-icons/ri";
import { PiBuildingsFill } from "react-icons/pi";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaUserGear } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { user, setUser } = useUser(); // 사용자 정보

  const router = useRouter();

  const handleLogout = async () => {
    try {

      // 백쪽 토큰 제거 api 호출
      const token = localStorage.getItem("token") || "";
      await axios.delete(`${API_BASE_URL}/api/auth/logout`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      console.log("로그아웃!");

      // 상태 초기화 및 로컬 스토리지에서 사용자 정보 및 토큰 삭제
      setUser(null); // 로그인 상태 초기화
      localStorage.removeItem("user"); // 사용자 정보 삭제
      localStorage.removeItem("token"); // 토큰 삭제

      // 로그아웃 후 메인으로
      router.push("/");
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          Clean Meet
        </Link>
        <div className="navbar__list">
          <Link href="/request/regist" className="navbar__list--item">
            의뢰등록
          </Link>
          <Link href="/request" className="navbar__list--item">
            의뢰목록
          </Link>
          <Link href="/company" className="navbar__list--item">
            회사목록
          </Link>
          <Link href="/customerInquiry" className="navbar__list--item">
            고객문의
          </Link>
        </div>
        <div className="navbar__settings">
          {user ? (
            <div className="flex items-center">
              {/* <p className="text-lg">
                <span className="font-bold italic">테스트 유저</span>님
                안녕하세요
              </p> */}
              <p className="text-lg">
                <span className="font-bold italic text-white">{user.name}</span>
                님 안녕하세요!
              </p>
              <button onClick={handleLogout} className="navbar__list--item">
                로그아웃
              </button>
              <Link
                // href="/users/profile/personalProfile"
                href="/users/profile"
                className="navbar__list--item"
              >
                프로필
              </Link>
            </div>
          ) : (
            <div>
              {/* <Link href="/admin" className="navbar__list--item">
                관리자 페이지
              </Link> */}
              <Link href="/users/login" className="navbar__list--item">
                로그인
              </Link>
              <Link href="/users/signup" className="navbar__list--item">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="navbar--mobile">
        <div className="navbar__list">
          <Link href="/" className="navbar__list--item">
            <TiHome />
            <span className="navbar__list--name">홈</span>
          </Link>
          <Link href="/request/regist" className="navbar__list--item">
            <IoCreate />
            <span className="navbar__list--name">등록</span>
          </Link>
          <Link href="/request" className="navbar__list--item">
            <RiFileList3Fill />
            <span className="navbar__list--name">의뢰목록</span>
          </Link>
          <Link href="/company" className="navbar__list--item">
            <PiBuildingsFill />
            <span className="navbar__list--name">회사목록</span>
          </Link>
          <Link href="/customerInquiry" className="navbar__list--item">
            <RiQuestionnaireFill />
            <span className="navbar__list--name">고객문의</span>
          </Link>
          {user ? (
            <>
              <Link href="/users/profile" className="navbar__list--item">
                <FaUserGear />
                <span className="navbar__list--name">프로필</span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/users/login" className="navbar__list--item">
                <FaUserGear />
                <span className="navbar__list--name">로그인</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
