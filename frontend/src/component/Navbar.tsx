import Link from "next/link";
import React from "react";
import { useUser } from "../context/UserContext"; // UserContext 가져오기

const Navbar = () => {
  const { user, setUser } = useUser(); // 사용자 정보

  const handleLogout = () => {
    setUser(null); // 로그아웃 시 사용자 정보 초기화
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
  };

  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          Clean Meet
        </Link>
        <div className="navbar__list">
          <Link href="/request/regist" className="navbar__list--item">
            의뢰 등록
          </Link>
          <Link href="/request" className="navbar__list--item">
            의뢰 목록
          </Link>
          <Link href="/company" className="navbar__list--item">
            회사 목록
          </Link>
          <Link href="/customerInquiry" className="navbar__list--item">
            고객 문의
          </Link>
          <Link
            href="/users/profile/personalProfile"
            className="navbar__list--item"
          >
            프로필
          </Link>

          {user ? (
            <>
              <button onClick={handleLogout} className="navbar__list--item">
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/users/login" className="navbar__list--item">
              로그인
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
