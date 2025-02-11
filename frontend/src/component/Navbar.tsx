import Link from "next/link";
import React from "react";

{/* <ul>
  <li>
    <Link href="/company">회사 목록</Link>
  </li>
  <li>
    <Link href="/company/regist">회사 생성</Link>
  </li>
  <li>
    <Link href="/company/1">회사 상세</Link>
  </li>
  <li>
    <Link href="/company/edit">회사 수정</Link>
  </li>

  <li>
    <Link href="/reqeust">의뢰 목록</Link>
  </li>
  <li>
    <Link href="/reqeust/regist">의뢰 생성</Link>
  </li>
  <li>
    <Link href="/reqeust/1">의뢰 상세</Link>
  </li>
  <li>
    <Link href="/reqeust/edit">의뢰 수정</Link>
  </li>

  <li>
    <Link href="/users/login">로그인</Link>
  </li>
  <li></li>
  <li>
    <Link href="/users/profile">프로필</Link>
  </li>
  <li>
    <Link href="/users/signup">회원가입</Link>
  </li>
</ul>; */}

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">Clean Meet</Link>
        <div className="navbar__list">
          <Link href="/request" className="navbar__list--item">
            의뢰 목록
          </Link>
          <Link href="/company" className="navbar__list--item">
            회사 목록
          </Link>
          <Link href="/" className="navbar__list--item">
            고객 문의
          </Link>
          <Link href="/users/profile/personalProfile" className="navbar__list--item">
            프로필
          </Link>
          <Link href="/users/login" className="navbar__list--item">
            로그인
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
