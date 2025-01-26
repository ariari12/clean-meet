import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Menu Index</h1>
      <ul>
        {/* 회사 CRUD */}
        <li>
          <Link href="/company">회사 목록</Link>
        </li>
        <li>
          <Link href="/company/regist">회사 생성</Link>
        </li>
        <li>
          {/* /company/slug */}
          <Link href="/company/1">회사 상세</Link>
        </li>
        <li>
          <Link href="/company/edit">회사 수정</Link>
        </li>

        {/* 의뢰 CRUD */}
        <li>
          <Link href="/reqeust">의뢰 목록</Link>
        </li>
        <li>
          <Link href="/reqeust/regist">의뢰 생성</Link>
        </li>
        <li>
          {/* /company/slug */}
          <Link href="/reqeust/1">의뢰 상세</Link>
        </li>
        <li>
          <Link href="/reqeust/edit">의뢰 수정</Link>
        </li>

        {/* 유저 */}
        <li>
          <Link href="/users/login">로그인</Link>
        </li>
        <li>
          {/* <Link href="/users/logout">로그아웃</Link> */}
        </li>
        <li>
          <Link href="/users/profile">프로필</Link>
        </li>
        <li>
          <Link href="/users/signup">회원가입</Link>
        </li>
      </ul>
    </div>
  );
}
