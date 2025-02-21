import React from "react";
// import PersonalProfilePage from "./profile/personalProfile";
import CompanyProfilePage from "./profile/companyProfile";
import { useUser } from "@/context/UserContext";

const ProfilePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, setUser } = useUser(); // 사용자 정보

  return (
    <div>
      {/* 서버 붙을 때까지 잠시 임시 */}
      {/* {user && user.롤 === "개인" ? (
        <PersonalProfilePage />
      ) : (
        <CompanyProfilePage />
      )} */}
      <CompanyProfilePage />
    </div>
  );
};

export default ProfilePage;
